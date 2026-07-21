// js/settings.js — Settings modal for notification preferences
import { db, USER_NODE } from './firebase.js';
import { enableNotifications } from './notifications.js';

const DEFAULT_SETTINGS = {
    notifications_enabled: false,
    vapid_key: '',
    overdue_task_days: 3,
    expense_remind_days: 0, // 0 = w dniu wydatku
    morning_routine_hour: 7,
    evening_routine_hour: 21,
    quiet_start: 22,  // nie wysyłaj po 22:00
    quiet_end: 6      // nie wysyłaj przed 6:00
};

let currentSettings = { ...DEFAULT_SETTINGS };

export function initSettings() {
    // Load settings from Firebase
    db.ref(USER_NODE + 'settings/notifications').on('value', snap => {
        const saved = snap.val() || {};
        currentSettings = { ...DEFAULT_SETTINGS, ...saved };
        
        // Sync VAPID key to localStorage for notifications.js
        if (currentSettings.vapid_key) {
            localStorage.setItem('bcore_vapid_key', currentSettings.vapid_key);
        }
    });

    // Inject settings button into topbar
    const topStats = document.querySelector('.top-stats');
    if (topStats) {
        const btn = document.createElement('button');
        btn.className = 'btn btn-ghost';
        btn.id = 'btn-settings';
        btn.title = 'Ustawienia';
        btn.innerHTML = '<i data-lucide="settings"></i>';
        btn.addEventListener('click', openSettingsModal);
        topStats.appendChild(btn);
        if (window.lucide) window.lucide.createIcons();
    }
}

function openSettingsModal() {
    // Remove existing modal if any
    const existing = document.getElementById('settings-modal-overlay');
    if (existing) existing.remove();

    const permStatus = Notification.permission;
    const permLabel = permStatus === 'granted' ? '✅ Przyznane' : 
                      permStatus === 'denied' ? '❌ Zablokowane' : '⏳ Nie pytano';

    const overlay = document.createElement('div');
    overlay.id = 'settings-modal-overlay';
    overlay.className = 'modal-overlay';
    overlay.style.display = 'flex';
    overlay.innerHTML = `
        <div class="modal-content" style="width:520px; max-height:85vh; overflow-y:auto;">
            <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:20px;">
                <h2 style="font-size:1.2rem; display:flex; align-items:center; gap:8px;">
                    <i data-lucide="settings" style="color:var(--accent-primary);"></i> Ustawienia
                </h2>
                <button class="btn btn-ghost" id="settings-close" style="padding:4px;">
                    <i data-lucide="x"></i>
                </button>
            </div>

            <!-- Powiadomienia Push -->
            <div style="margin-bottom:24px;">
                <h3 style="font-size:0.9rem; color:var(--text-secondary); text-transform:uppercase; letter-spacing:0.05em; margin-bottom:12px;">
                    Powiadomienia Push
                </h3>
                <div style="display:flex; align-items:center; justify-content:space-between; margin-bottom:12px; padding:10px; background:var(--bg-tertiary); border-radius:var(--radius-sm);">
                    <span>Status uprawnień</span>
                    <span style="font-family:var(--font-mono); font-size:0.85rem;">${permLabel}</span>
                </div>
                <button class="btn btn-primary" id="btn-enable-notif" style="width:100%; justify-content:center; margin-bottom:12px;">
                    <i data-lucide="bell"></i> ${permStatus === 'granted' ? 'Powiadomienia aktywne' : 'Włącz powiadomienia'}
                </button>
                
                <div style="margin-bottom:8px;">
                    <label style="display:block; font-size:0.85rem; color:var(--text-secondary); margin-bottom:4px;">VAPID Key (z Firebase Console)</label>
                    <input type="text" id="setting-vapid" value="${currentSettings.vapid_key || ''}" 
                        placeholder="BKagOny09..." 
                        style="width:100%; background:var(--bg-tertiary); border:1px solid var(--border-subtle); color:var(--text-primary); padding:8px; font-family:var(--font-mono); font-size:0.75rem; border-radius:var(--radius-sm); outline:none;">
                </div>
            </div>

            <!-- Progi powiadomień -->
            <div style="margin-bottom:24px;">
                <h3 style="font-size:0.9rem; color:var(--text-secondary); text-transform:uppercase; letter-spacing:0.05em; margin-bottom:12px;">
                    Progi powiadomień
                </h3>
                
                <div style="display:grid; grid-template-columns:1fr 80px; gap:8px; align-items:center; margin-bottom:10px;">
                    <label style="font-size:0.85rem;">Zadanie zaległe po (dni)</label>
                    <input type="number" id="setting-overdue-days" value="${currentSettings.overdue_task_days}" min="1" max="30"
                        style="background:var(--bg-tertiary); border:1px solid var(--border-subtle); color:var(--text-primary); padding:8px; font-family:var(--font-mono); border-radius:var(--radius-sm); text-align:center; outline:none;">
                </div>
                
                <div style="display:grid; grid-template-columns:1fr 80px; gap:8px; align-items:center; margin-bottom:10px;">
                    <label style="font-size:0.85rem;">Przypomnienie o wydatku (dni przed)</label>
                    <input type="number" id="setting-expense-days" value="${currentSettings.expense_remind_days}" min="0" max="7"
                        style="background:var(--bg-tertiary); border:1px solid var(--border-subtle); color:var(--text-primary); padding:8px; font-family:var(--font-mono); border-radius:var(--radius-sm); text-align:center; outline:none;">
                </div>
            </div>

            <!-- Godziny rutyn -->
            <div style="margin-bottom:24px;">
                <h3 style="font-size:0.9rem; color:var(--text-secondary); text-transform:uppercase; letter-spacing:0.05em; margin-bottom:12px;">
                    Godziny rutyn
                </h3>
                
                <div style="display:grid; grid-template-columns:1fr 80px; gap:8px; align-items:center; margin-bottom:10px;">
                    <label style="font-size:0.85rem;"><i data-lucide="sun" style="width:14px; height:14px; vertical-align:middle; color:var(--accent-warning);"></i> Poranna rutyna</label>
                    <input type="number" id="setting-morning-hour" value="${currentSettings.morning_routine_hour}" min="4" max="12"
                        style="background:var(--bg-tertiary); border:1px solid var(--border-subtle); color:var(--text-primary); padding:8px; font-family:var(--font-mono); border-radius:var(--radius-sm); text-align:center; outline:none;">
                </div>
                
                <div style="display:grid; grid-template-columns:1fr 80px; gap:8px; align-items:center; margin-bottom:10px;">
                    <label style="font-size:0.85rem;"><i data-lucide="moon" style="width:14px; height:14px; vertical-align:middle; color:var(--accent-info);"></i> Wieczorna rutyna</label>
                    <input type="number" id="setting-evening-hour" value="${currentSettings.evening_routine_hour}" min="18" max="23"
                        style="background:var(--bg-tertiary); border:1px solid var(--border-subtle); color:var(--text-primary); padding:8px; font-family:var(--font-mono); border-radius:var(--radius-sm); text-align:center; outline:none;">
                </div>
            </div>

            <!-- Cisza nocna -->
            <div style="margin-bottom:24px;">
                <h3 style="font-size:0.9rem; color:var(--text-secondary); text-transform:uppercase; letter-spacing:0.05em; margin-bottom:12px;">
                    Cisza nocna
                </h3>
                <div style="display:grid; grid-template-columns:1fr 80px 30px 80px; gap:8px; align-items:center;">
                    <label style="font-size:0.85rem;">Nie wysyłaj między</label>
                    <input type="number" id="setting-quiet-start" value="${currentSettings.quiet_start}" min="0" max="23"
                        style="background:var(--bg-tertiary); border:1px solid var(--border-subtle); color:var(--text-primary); padding:8px; font-family:var(--font-mono); border-radius:var(--radius-sm); text-align:center; outline:none;">
                    <span style="text-align:center; color:var(--text-secondary);">—</span>
                    <input type="number" id="setting-quiet-end" value="${currentSettings.quiet_end}" min="0" max="23"
                        style="background:var(--bg-tertiary); border:1px solid var(--border-subtle); color:var(--text-primary); padding:8px; font-family:var(--font-mono); border-radius:var(--radius-sm); text-align:center; outline:none;">
                </div>
            </div>

            <button class="btn btn-primary" id="btn-save-settings" style="width:100%; justify-content:center; padding:12px;">
                <i data-lucide="save"></i> Zapisz ustawienia
            </button>
        </div>
    `;

    document.body.appendChild(overlay);
    if (window.lucide) window.lucide.createIcons();

    // Close
    document.getElementById('settings-close').addEventListener('click', () => overlay.remove());
    overlay.addEventListener('click', (e) => { if (e.target === overlay) overlay.remove(); });

    // Enable notifications button
    document.getElementById('btn-enable-notif').addEventListener('click', async () => {
        const ok = await enableNotifications();
        if (ok) {
            document.getElementById('btn-enable-notif').textContent = '✅ Powiadomienia aktywne';
        }
    });

    // Save
    document.getElementById('btn-save-settings').addEventListener('click', () => {
        const settings = {
            notifications_enabled: Notification.permission === 'granted',
            vapid_key: document.getElementById('setting-vapid').value.trim(),
            overdue_task_days: parseInt(document.getElementById('setting-overdue-days').value) || 3,
            expense_remind_days: parseInt(document.getElementById('setting-expense-days').value) || 0,
            morning_routine_hour: parseInt(document.getElementById('setting-morning-hour').value) || 7,
            evening_routine_hour: parseInt(document.getElementById('setting-evening-hour').value) || 21,
            quiet_start: parseInt(document.getElementById('setting-quiet-start').value) || 22,
            quiet_end: parseInt(document.getElementById('setting-quiet-end').value) || 6
        };

        // Save VAPID to localStorage
        if (settings.vapid_key) {
            localStorage.setItem('bcore_vapid_key', settings.vapid_key);
        }

        db.ref(USER_NODE + 'settings/notifications').set(settings).then(() => {
            overlay.remove();
        });
    });
}

export function getSettings() {
    return currentSettings;
}
