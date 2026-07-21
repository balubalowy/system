const admin = require('firebase-admin');

// Parse service account from env var (must be set in GitHub Secrets)
const serviceAccountKey = process.env.FIREBASE_SERVICE_ACCOUNT;
if (!serviceAccountKey) {
  console.error("Missing FIREBASE_SERVICE_ACCOUNT env var.");
  process.exit(1);
}

const serviceAccount = JSON.parse(serviceAccountKey);

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: process.env.FIREBASE_DB_URL
});

const db = admin.database();
const messaging = admin.messaging();

const USER_NODE = 'users/bartek/';

async function run() {
  console.log("Starting notification check...");
  
  // 1. Fetch user settings and FCM tokens
  const settingsSnap = await db.ref(USER_NODE + 'settings/notifications').once('value');
  const settings = settingsSnap.val() || {};
  if (settings.notifications_enabled === false) {
    console.log("Notifications are disabled by user.");
    process.exit(0);
  }

  const tokensSnap = await db.ref(USER_NODE + 'fcm_tokens').once('value');
  const tokensObj = tokensSnap.val();
  if (!tokensObj) {
    console.log("No FCM tokens registered.");
    process.exit(0);
  }
  const fcmTokens = Object.values(tokensObj).map(t => t.token);

  // Parse quiet hours
  const currentHour = new Date().getUTCHours() + 2; // Approx PL time
  const quietStart = settings.quiet_start !== undefined ? settings.quiet_start : 22;
  const quietEnd = settings.quiet_end !== undefined ? settings.quiet_end : 6;
  
  const isQuiet = quietStart > quietEnd 
    ? (currentHour >= quietStart || currentHour < quietEnd)
    : (currentHour >= quietStart && currentHour < quietEnd);

  if (isQuiet) {
    console.log(`Quiet hours active (${currentHour}:00). Skipping.`);
    process.exit(0);
  }

  const overdueDays = settings.overdue_task_days || 3;
  const expenseDays = settings.expense_remind_days || 0;
  const now = new Date();
  
  const notificationsToSend = [];

  // 2. Check Tasks (Inbox)
  const inboxSnap = await db.ref(USER_NODE + 'inbox').once('value');
  const completedSnap = await db.ref(USER_NODE + 'inbox_completed').once('value');
  const inbox = inboxSnap.val() || {};
  
  let overdueTasksCount = 0;
  for (const cat in inbox) {
    if(typeof inbox[cat] === 'string') {
      const tasks = inbox[cat].split('\n').filter(l => l.trim().length > 0);
      for(const t of tasks) {
         // This is a simplification. B-Core currently doesn't store creation date for active tasks in inbox node.
         // We'll just notify if there are any tasks in priority.
         if (cat === 'priority') {
             overdueTasksCount++;
         }
      }
    }
  }

  if (overdueTasksCount > 0) {
      notificationsToSend.push({
          title: "Zaległe zadania",
          body: `Masz ${overdueTasksCount} zadań w sekcji Priorytety. Zrób to!`,
          tag: "bcore-tasks",
          url: "inbox.html"
      });
  }

  // 3. Check Expenses
  const expensesSnap = await db.ref(USER_NODE + 'expenses').once('value');
  const expenses = expensesSnap.val() || {};
  let upcomingExpenses = 0;

  for (const cat in expenses) {
      for (const key in expenses[cat]) {
          const exp = expenses[cat][key];
          if (exp.realized === false && exp.date) {
              const expDate = new Date(exp.date);
              const diffTime = expDate - now;
              const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
              
              if (diffDays >= 0 && diffDays <= expenseDays) {
                  upcomingExpenses++;
                  notificationsToSend.push({
                      title: "Zbliżający się wydatek",
                      body: `${exp.name} (${exp.amount} zł) zaplanowany na ${exp.date}`,
                      tag: `expense-${key}`,
                      url: "budget.html"
                  });
              }
          }
      }
  }

  // 4. Routines (Morning / Evening)
  const morningHour = settings.morning_routine_hour || 7;
  const eveningHour = settings.evening_routine_hour || 21;
  
  if (currentHour === morningHour) {
      notificationsToSend.push({
          title: "Poranna Rutyna",
          body: "Czas na poranną rutynę. Zaczynamy dzień!",
          tag: "bcore-routine-morning",
          url: "index.html"
      });
  }
  
  if (currentHour === eveningHour) {
      notificationsToSend.push({
          title: "Wieczorna Rutyna",
          body: "Podsumuj dzień i zaplanuj jutro.",
          tag: "bcore-routine-evening",
          url: "/app/index.html"
      });
  }

  // 5. Send Notifications
  if (notificationsToSend.length > 0) {
      console.log(`Sending ${notificationsToSend.length} notifications to ${fcmTokens.length} devices...`);
      for (const payload of notificationsToSend) {
          const message = {
              data: {
                  title: payload.title,
                  body: payload.body,
                  tag: payload.tag,
                  url: payload.url
              },
              tokens: fcmTokens
          };
          try {
              const response = await messaging.sendMulticast(message);
              console.log(`Sent "${payload.title}":`, response.successCount, "successes,", response.failureCount, "failures.");
          } catch (e) {
              console.error("Error sending notification:", e);
          }
      }
  } else {
      console.log("No notifications to send right now.");
  }

  process.exit(0);
}

run();
