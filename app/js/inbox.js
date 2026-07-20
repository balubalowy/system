import { db, USER_NODE } from './firebase.js';
import { escapeHTML } from './utils.js';
import { initIdeasEngine, initWishlistEngine } from './ideas.js';

document.addEventListener('DOMContentLoaded', () => {
    initIdeasEngine();
    initWishlistEngine();
    const boxes = ['priority', 'admin', 'light', 'sensory'];
    const colors = {
        'priority': '#FF375F',
        'admin': '#0A84FF',
        'light': '#30D158',
        'sensory': '#BF5AF2'
    };
    let timeout = null;

            // Ładowanie
            db.ref(USER_NODE + 'inbox').once('value').then(snap => {
                const data = snap.val() || {};
                boxes.forEach(k => {
                    const listEl = document.getElementById(`list-${k}`);
                    if(!listEl) return;
                    listEl.innerHTML = '';
                    if(data[k]) {
                        let lines = data[k].split('\n').filter(l => l.trim().length > 0);
                        lines.forEach(l => renderTaskRow(listEl, k, l));
                    }
                    if(window.lucide) window.lucide.createIcons();
                });
            });

            function renderTaskRow(container, key, text = "") {
                const row = document.createElement('div');
                row.className = 'inbox-task-item';
                
                const input = document.createElement('input');
                input.className = 'inbox-task-input';
                input.type = 'text';
                input.value = text.startsWith('- ') ? text.substring(2) : text;
                input.placeholder = "Wpisz czynność...";
                
                const delBtn = document.createElement('button');
                delBtn.className = 'inbox-task-remove';
                delBtn.innerHTML = '<i data-lucide="x"></i>';
                
                row.appendChild(input);
                row.appendChild(delBtn);
                container.appendChild(row);
                
                if(window.lucide) window.lucide.createIcons();
                
                input.addEventListener('input', () => autoSave(key));
                input.addEventListener('keydown', (e) => {
                    if(e.key === 'Enter') {
                        e.preventDefault();
                        renderTaskRow(container, key, "");
                        const allInputs = container.querySelectorAll('.inbox-task-input');
                        allInputs[allInputs.length - 1].focus();
                        autoSave(key);
                    }
                });
                
                delBtn.addEventListener('click', () => {
                    row.remove();
                    autoSave(key);
                });
                
                if(text === "") input.focus();
            }

            function autoSave(key) {
                clearTimeout(timeout);
                timeout = setTimeout(() => {
                    const container = document.getElementById(`list-${key}`);
                    const inputs = container.querySelectorAll('.inbox-task-input');
                    const lines = [];
                    inputs.forEach(inp => {
                        const val = inp.value.trim();
                        if(val.length > 0) lines.push("- " + val);
                    });
                    db.ref(USER_NODE + 'inbox/' + key).set(lines.join('\n'));
                }, 800);
            }
            
            window.addTask = function(key) {
                renderTaskRow(document.getElementById(`list-${key}`), key, "");
            };

            // Archiwum
            db.ref(USER_NODE + 'inbox_completed').orderByChild('timestamp').on('value', snap => {
                const data = snap.val();
                const archive = document.getElementById('completed-archive');
                archive.innerHTML = '';
                if(!data) {
                    archive.innerHTML = '<div style="font-size:0.85rem; color:var(--text-secondary);">Brak ukończonych zadań.</div>';
                    return;
                }
                window.restoreTask = function(firebaseKey, cat, encodedTask) {
                    const taskStr = decodeURIComponent(encodedTask);
                    db.ref(USER_NODE + 'inbox_completed/' + firebaseKey).remove().then(() => {
                        db.ref(USER_NODE + 'inbox/' + cat).once('value').then(s => {
                            let text = s.val() || "";
                            let lines = text.split('\n').filter(l => l.trim() !== "");
                            lines.push("- " + taskStr);
                            db.ref(USER_NODE + 'inbox/' + cat).set(lines.join('\n'));
                        });
                    });
                };

                const tasks = Object.entries(data).map(([k,v]) => ({key: k, ...v})).sort((a,b) => new Date(b.timestamp) - new Date(a.timestamp));
                
                tasks.forEach(t => {
                    let d = new Date(t.timestamp);
                    let color = colors[t.category] || '#999';
                    
                    archive.innerHTML += `<div style="padding:10px; background:rgba(0,0,0,0.2); border-radius:var(--radius-sm); border-left: 2px solid ${color}; margin-bottom:8px; display:flex; justify-content:space-between; align-items:flex-start;">
                        <div>
                            <div style="font-size:0.85rem; color:var(--text-primary); margin-bottom:4px; padding-right:8px;">${escapeHTML(t.task)}</div>
                            <div style="font-size:0.7rem; color:var(--text-secondary); font-family:var(--font-mono);">${d.toLocaleDateString()} ${d.toLocaleTimeString().slice(0,5)}</div>
                        </div>
                        <button onclick="restoreTask('${t.key}', '${t.category}', '${encodeURIComponent(t.task)}')" style="background:none; border:none; color:var(--accent-info); cursor:pointer; padding:4px;" title="Przywróć do zrzutni">
                            <i data-lucide="rotate-ccw" style="width:14px; margin-top:2px;"></i>
                        </button>
                    </div>`;
                });
                lucide.createIcons();
            });
        });