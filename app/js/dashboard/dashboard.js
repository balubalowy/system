// js/dashboard.js
import { db, USER_NODE } from '../core/firebase.js';
import { getTodayStr } from '../core/utils.js';

export function initDailyTasks() {
    const todayStr = getTodayStr();
    const taskRef = db.ref(USER_NODE + 'daily_tasks/' + todayStr);
    
    taskRef.once('value').then((snapshot) => {
        let tasks = snapshot.val();
        if(!tasks) {
            db.ref(USER_NODE + 'inbox').once('value').then(inboxSnap => {
                let inbox = inboxSnap.val() || {};
                
                function extractFirstTask(categoryKey, fallbackText) {
                    if(!inbox[categoryKey]) return fallbackText;
                    let lines = inbox[categoryKey].split('\n').filter(l => l.trim().length > 0);
                    if(lines.length === 0) return fallbackText;
                    let firstTask = lines.shift();
                    inbox[categoryKey] = lines.join('\n');
                    return firstTask;
                }

                tasks = {
                    priority: extractFirstTask('priority', "Zdefiniuj zadanie w Zrzutni."),
                    admin: extractFirstTask('admin', "Brak zaplanowanej administracji."),
                    light: extractFirstTask('light', "Brak zadań lekkich w bazie."),
                    sensory: extractFirstTask('sensory', "Mata z kolcami lub spacer.")
                };
                
                taskRef.set(tasks);
                db.ref(USER_NODE + 'inbox').set(inbox);
                renderSuggestedTasks(tasks);
            });
        } else {
            renderSuggestedTasks(tasks);
        }
    });
}

function renderSuggestedTasks(tasks) {
    const p = document.getElementById('suggested-priority');
    if(p) p.textContent = tasks.priority || "Brak zadania.";
    
    const a = document.getElementById('suggested-admin');
    if(a) a.textContent = tasks.admin || "Brak zadania.";
    
    const l = document.getElementById('suggested-light');
    if(l) l.textContent = tasks.light || "Brak zadania.";
    
    const s = document.getElementById('suggested-sensory');
    if(s) s.textContent = tasks.sensory || "Brak zadania.";
}
