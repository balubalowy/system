// js/tasks.js
import { db, USER_NODE } from './firebase.js';

export function initInteractiveTasks() {
    const boxes = [
        { key: 'priority', id: 'suggested-priority', btnColor: 'var(--accent-primary)' },
        { key: 'admin', id: 'suggested-admin', btnColor: 'var(--text-secondary)' },
        { key: 'light', id: 'suggested-light', btnColor: 'var(--accent-info)' },
        { key: 'sensory', id: 'suggested-sensory', btnColor: 'var(--accent-success)' }
    ];

    db.ref(USER_NODE + 'inbox').on('value', snap => {
        db.ref(USER_NODE + 'inbox_active').on('value', snapActive => {
            const data = snap.val() || {};
            const activeData = snapActive.val() || {};

            boxes.forEach(b => {
                const el = document.getElementById(b.id);
                if(!el) return;
                
                let lines = [];
                if(data[b.key]) {
                    lines = data[b.key].split('\n').map(l => l.trim()).filter(l => l.length > 0);
                }
                
                let activeText = activeData[b.key] || "";
                let activeTasks = activeText.split('\n').map(l => l.trim()).filter(l => l.length > 0);
                
                if(activeTasks.length === 0 && lines.length === 0) {
                    el.innerHTML = '<span style="color:var(--text-secondary); opacity:0.5;">Sektor czysty. Brak zadań.</span>';
                    return;
                }

                let html = `<div style="display:flex; flex-direction:column; height: 100%;">`;
                
                if (activeTasks.length > 0) {
                    activeTasks.forEach(activeTask => {
                        html += `
                        <div class="task-active-card" style="border-left: 2px solid ${b.btnColor};">
                            <div style="font-size:0.95rem; font-weight:500; color:var(--text-primary); line-height:1.4; margin-bottom: 12px;">${activeTask}</div>
                            <div style="display:flex; gap:6px;">
                                <button class="btn btn-ghost" onclick="actionTask('${b.key}', 'reject', '${encodeURIComponent(activeTask)}')" style="flex:1; padding: 6px; font-size:0.8rem; color:var(--accent-warning); border:1px solid rgba(255,159,10,0.2);" title="Wyrzuć z powrotem do zrzutni"><i data-lucide="x" style="width:14px; margin-right:4px;"></i> Cofnij</button>
                                <button class="btn btn-secondary" onclick="actionTask('${b.key}', 'complete', '${encodeURIComponent(activeTask)}')" style="flex:1; padding: 6px; font-size:0.8rem; color:var(--accent-success); border:1px solid rgba(43,191,113,0.3);"><i data-lucide="check" style="width:14px; margin-right:4px;"></i> Ukończ</button>
                            </div>
                        </div>`;
                    });
                }

                if (lines.length > 0) {
                    html += `<div style="margin-top: ${activeTasks.length > 0 ? 'auto' : '0'}; padding-top: 8px; border-top: ${activeTasks.length > 0 ? '1px dashed var(--border-subtle)' : 'none'};">`;
                    html += `<div style="margin-bottom: 8px; font-size: 0.75rem; font-weight: 600; color: var(--text-secondary); text-transform: uppercase;">Zrzutnia Zadań:</div>`;
                    html += `<div style="display:flex; flex-direction:column; gap:4px;">`;
                    lines.forEach(line => {
                        let cleanLine = line.startsWith('-') ? line.substring(1).trim() : line;
                        html += `<a href="#" onclick="actionTask('${b.key}', 'activate', '${encodeURIComponent(line)}')" class="task-list-link" title="Wrzut do góry!"><span style="line-height:1.4;">- ${cleanLine}</span> <i data-lucide="arrow-up-right" style="width:14px; height:14px; flex-shrink:0; opacity:0.5; margin-top:2px;"></i></a>`;
                    });
                    html += `</div></div>`;
                }

                html += `</div>`;
                el.innerHTML = html;
            });
            if(window.lucide) window.lucide.createIcons();
        });
    });
}

window.actionTask = function(key, action, encodedTask) {
    let taskStr = decodeURIComponent(encodedTask);
    
    if(action === 'activate') {
        db.ref(USER_NODE + 'inbox_active/' + key).once('value').then(sa => {
            let activeText = sa.val() || "";
            let activeLines = activeText.split('\n').filter(l => l.trim() !== "");
            if (!activeLines.includes(taskStr)) {
                activeLines.push(taskStr);
            }
            db.ref(USER_NODE + 'inbox_active/' + key).set(activeLines.join('\n')).then(() => {
                db.ref(USER_NODE + 'inbox/' + key).once('value').then(s => {
                    let text = s.val() || "";
                    let lines = text.split('\n').filter(l => l.trim() !== taskStr && l.trim() !== "");
                    db.ref(USER_NODE + 'inbox/' + key).set(lines.join('\n'));
                });
            });
        });
    } else if (action === 'reject') {
        db.ref(USER_NODE + 'inbox_active/' + key).once('value').then(sa => {
            let activeText = sa.val() || "";
            let activeLines = activeText.split('\n').filter(l => l.trim() !== taskStr && l.trim() !== "");
            db.ref(USER_NODE + 'inbox_active/' + key).set(activeLines.join('\n')).then(() => {
                db.ref(USER_NODE + 'inbox/' + key).once('value').then(s => {
                    let text = s.val() || "";
                    let lines = text.split('\n').filter(l => l.trim() !== "");
                    lines.push(taskStr);
                    db.ref(USER_NODE + 'inbox/' + key).set(lines.join('\n'));
                });
            });
        });
    } else if (action === 'complete') {
        db.ref(USER_NODE + 'inbox_active/' + key).once('value').then(sa => {
            let activeText = sa.val() || "";
            let activeLines = activeText.split('\n').filter(l => l.trim() !== taskStr && l.trim() !== "");
            db.ref(USER_NODE + 'inbox_active/' + key).set(activeLines.join('\n')).then(() => {
                let cleanTask = taskStr.startsWith('-') ? taskStr.substring(1).trim() : taskStr;
                db.ref(USER_NODE + 'inbox_completed').push({
                    task: cleanTask,
                    category: key,
                    timestamp: new Date().toISOString()
                });
            });
        });
    }
};

window.quickAddTask = function(key) {
    const task = prompt("Wpisz nowe zadanie do: " + key.toUpperCase());
    if(task && task.trim() !== "") {
        db.ref(USER_NODE + 'inbox/' + key).once('value').then(s => {
            let text = s.val() || "";
            let lines = text.split('\n').filter(l => l.trim() !== "");
            lines.push("- " + task.trim());
            db.ref(USER_NODE + 'inbox/' + key).set(lines.join('\n'));
        });
    }
};
