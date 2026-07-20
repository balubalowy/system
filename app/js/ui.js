// js/ui.js
import { db, USER_NODE } from './firebase.js';
import { getTodayStr, escapeHTML } from './utils.js';

export function initTopBar() {
    const dateElement = document.getElementById('current-date');
    const todayStr = getTodayStr();
    if(dateElement) dateElement.textContent = todayStr;

    db.ref(USER_NODE + 'energy').once('value').then(snap => {
        const val = snap.val();
        if (typeof val === 'number') {
            const currentVal = val;
            db.ref(USER_NODE + 'energy').set({
                "2026-07-14": 6,
                "2026-07-15": 8,
                [todayStr]: currentVal
            });
        } else if (val && typeof val === 'object') {
            if (!val["2026-07-14"]) db.ref(USER_NODE + 'energy/2026-07-14').set(6);
            if (!val["2026-07-15"]) db.ref(USER_NODE + 'energy/2026-07-15').set(8);
        }
    });

    const track = document.getElementById('energy-track');
    const fill = document.getElementById('energy-fill');
    const display = document.getElementById('energy-val-display');
    
    if(track && fill && display) {
        db.ref(USER_NODE + 'energy/' + todayStr).on('value', (snapshot) => {
            const val = snapshot.val();
            if(val !== null) {
                fill.style.width = `${(val / 10) * 100}%`;
                display.textContent = `${val}/10`;
            }
        });

        track.addEventListener('click', (e) => {
            const rect = track.getBoundingClientRect();
            const clickX = e.clientX - rect.left;
            let percentage = clickX / rect.width;
            if(percentage < 0) percentage = 0;
            if(percentage > 1) percentage = 1;
            
            const newValue = Math.round(percentage * 10);
            const finalValue = Math.max(1, Math.min(10, newValue));
            
            fill.style.width = `${(finalValue / 10) * 100}%`;
            display.textContent = `${finalValue}/10`;
            
            db.ref(USER_NODE + 'energy/' + todayStr).set(finalValue);
        });
    }

    const btnZero = document.getElementById('btn-zero-energy');
    if(btnZero) {
        btnZero.addEventListener('click', () => {
            db.ref(USER_NODE + 'energy/' + todayStr).set(2);
            document.documentElement.style.filter = 'grayscale(100%)';
            setTimeout(() => document.documentElement.style.filter = 'none', 3000); 
        });
    }
}

export function initDayTimeTrack() {
    const timeFill = document.getElementById('time-fill');
    const timeVal = document.getElementById('time-val-display');
    if(!timeFill) return;
    
    function update() {
        const now = new Date();
        const start = 7 * 60; 
        const end = 22 * 60;  
        const current = now.getHours() * 60 + now.getMinutes();
        
        let pct = ((current - start) / (end - start)) * 100;
        if(pct < 0) pct = 0;
        if(pct > 100) pct = 100;
        
        timeFill.style.width = pct + '%';
        timeVal.textContent = now.getHours().toString().padStart(2, '0') + ':' + now.getMinutes().toString().padStart(2, '0');
        
        const timeLine = document.getElementById('current-time-line');
        const sidebarLine = document.getElementById('sidebar-red-line');
        
        if(pct >= 0 && pct <= 100) {
            if(timeLine) { timeLine.style.top = pct + '%'; timeLine.style.display = 'block'; }
            if(sidebarLine) { sidebarLine.style.top = pct + '%'; sidebarLine.style.display = 'block'; }
        } else {
            if(timeLine) timeLine.style.display = 'none';
            if(sidebarLine) sidebarLine.style.display = 'none';
        }
    }
    window._updateTimeTrack = update;
    update();
    setInterval(update, 60000);
}

export function initSidebarToggle() {
    const btnDesktop = document.getElementById('sidebar-toggle-btn');
    const btnMobile = document.getElementById('mobile-menu-btn');
    const sidebar = document.querySelector('.sidebar');
    const body = document.querySelector('body');
    const backdrop = document.getElementById('sidebar-backdrop');
    
    if(!sidebar) return;

    if(btnDesktop) {
        btnDesktop.addEventListener('click', () => {
            sidebar.classList.toggle('collapsed');
            body.classList.toggle('sidebar-collapsed');
        });
    }

    if(btnMobile) {
        btnMobile.addEventListener('click', () => {
            sidebar.classList.add('mobile-open');
            if(backdrop) backdrop.classList.add('active');
        });
    }

    if(backdrop) {
        backdrop.addEventListener('click', () => {
            sidebar.classList.remove('mobile-open');
            backdrop.classList.remove('active');
        });
    }

    const links = sidebar.querySelectorAll('a, .btn:not(#sidebar-toggle-btn)');
    links.forEach(link => {
        link.addEventListener('click', () => {
            if(window.innerWidth <= 1024) {
                sidebar.classList.remove('mobile-open');
                if(backdrop) backdrop.classList.remove('active');
            }
        });
    });
}

export function initIdeasEngine() {
    const btn = document.getElementById('btn-save-idea');
    const dump = document.getElementById('ai-dump');
    if(!btn || !dump) return;
    
    btn.addEventListener('click', () => {
        const text = dump.value.trim();
        if(!text) return;
        
        btn.innerHTML = '<i data-lucide="loader"></i> Zapisywanie...';
        if(window.lucide) window.lucide.createIcons();
        
        db.ref(USER_NODE + 'ideas').push({
            text: text,
            date: new Date().toISOString(),
            status: 'idea'
        }).then(() => {
            dump.value = '';
            btn.innerHTML = '<i data-lucide="check"></i> Zapisano w bazie';
            btn.style.color = 'var(--accent-success)';
            if(window.lucide) window.lucide.createIcons();
            setTimeout(() => {
                btn.innerHTML = '<i data-lucide="download-cloud"></i> Wrzuć do Bazy';
                btn.style.color = '';
                if(window.lucide) window.lucide.createIcons();
            }, 3000);
        });
    });
}

export function initChecklists() {
    if(window.appData && window.appData.routines) {
        renderChecklist('morning-routine', window.appData.routines.morning);
        renderChecklist('evening-routine', window.appData.routines.evening);
    }
}

function renderChecklist(elementId, items) {
    const container = document.getElementById(elementId);
    if(!container || !items) return;
    container.innerHTML = '';
    const todayStr = getTodayStr();
    
    items.forEach(item => {
        const div = document.createElement('div');
        div.className = 'notion-item';
        
        const checkbox = document.createElement('input');
        checkbox.type = 'checkbox';
        checkbox.className = 'notion-checkbox';
        checkbox.id = item.id;
        
        db.ref(USER_NODE + 'routines/' + todayStr + '/' + item.id).on('value', (snapshot) => {
            const val = snapshot.val() || false;
            checkbox.checked = val;
            if(val) div.classList.add('checked'); else div.classList.remove('checked');
        });
        
        checkbox.addEventListener('change', (e) => {
            db.ref(USER_NODE + 'routines/' + todayStr + '/' + item.id).set(e.target.checked);
        });

        const label = document.createElement('label');
        label.className = 'notion-label';
        label.htmlFor = item.id;
        label.textContent = item.title;
        label.style.cursor = 'pointer';
        label.style.flexGrow = '1';
        label.style.fontSize = '0.85rem';

        div.appendChild(checkbox);
        div.appendChild(label);
        container.appendChild(div);
    });
}

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

export function initReadingList() {
    const listRef = db.ref(USER_NODE + 'reading_list');
    const container = document.getElementById('reading-list-container');
    const addBtn = document.getElementById('add-reading-btn');

    if(!container) return;

    listRef.on('value', (snapshot) => {
        container.innerHTML = '';
        const data = snapshot.val() || {};
        
        const keys = Object.keys(data);
        if(keys.length === 0) {
            container.innerHTML = '<div style="font-size: 0.85rem; color: var(--text-secondary); padding: 4px 8px;">Brak wpisów w bazie. Dodaj nową pozycję.</div>';
        }

        keys.forEach(key => {
            const item = data[key];
            const div = document.createElement('div');
            div.className = 'notion-item';
            if(item.checked) div.classList.add('checked');

            const cb = document.createElement('input');
            cb.type = 'checkbox';
            cb.className = 'notion-checkbox';
            cb.checked = item.checked || false;
            cb.addEventListener('change', (e) => {
                listRef.child(key).update({ checked: e.target.checked });
            });

            const input = document.createElement('textarea');
            input.className = 'notion-input';
            input.rows = 1;
            input.value = item.text || '';
            input.placeholder = 'Wpisz tytuł książki...';
            
            const autoResize = () => {
                input.style.height = 'auto';
                input.style.height = input.scrollHeight + 'px';
            };
            input.addEventListener('input', autoResize);
            setTimeout(autoResize, 0);

            let saveTimeout;
            input.addEventListener('input', (e) => {
                clearTimeout(saveTimeout);
                saveTimeout = setTimeout(() => {
                    listRef.child(key).update({ text: e.target.value });
                }, 500);
            });
            input.addEventListener('keydown', (e) => {
                if(e.key === 'Enter' && !e.shiftKey) {
                    e.preventDefault();
                    input.blur();
                    if(e.target.value.trim() !== "") {
                        if(addBtn) addBtn.click();
                    }
                }
            });

            div.appendChild(cb);
            div.appendChild(input);
            container.appendChild(div);
        });
    });

    if(addBtn) {
        addBtn.addEventListener('click', () => {
            listRef.push({
                text: '',
                checked: false,
                timestamp: Date.now()
            }).then(() => {
                setTimeout(() => {
                    const inputs = container.querySelectorAll('.notion-input');
                    if(inputs.length > 0) inputs[inputs.length-1].focus();
                }, 50);
            });
        });
    }
}

export function showKnowledgeModal(meta) {
    const modal = document.getElementById('knowledge-modal');
    const title = document.getElementById('modal-title');
    const body = document.getElementById('modal-body-content');
    const currentNode = document.getElementById('modal-current-node');
    
    if(!modal) return;
    
    if(title) {
        title.textContent = meta.categoryTitle;
        title.style.color = meta.baseColor;
    }
    window.ACTIVE_SRS_TOPIC = meta.categoryTitle;
    window.ACTIVE_SRS_CATEGORY = meta.parentTopic;
    if(window.refreshSRS) window.refreshSRS();
    
    const treeArr = window.KnowledgeTree ? window.KnowledgeTree[meta.categoryTitle] : null;
    let currentTopicStr = "Oczekuje na wgranie etapów...";
    let totalNodes = 0;
    let index = 0;
    
    if (treeArr && treeArr.length > 0) {
        totalNodes = treeArr.length;
        index = Math.floor((meta.currentLevel / 100) * totalNodes);
        if(index >= totalNodes) index = totalNodes - 1;
        if(index < 0) index = 0;
        const nodeItem = treeArr[index];
        const nodeTitle = typeof nodeItem === 'object' ? nodeItem.title : nodeItem;
        currentTopicStr = `Etap ${index+1}/${totalNodes}: ${escapeHTML(nodeTitle)}`;
    }

    if(currentNode) {
        currentNode.textContent = currentTopicStr;
        currentNode.style.color = meta.baseColor;
    }
    
    let html = `<p style="margin-bottom: 5px;">Rodzina dziedziny: <strong>${escapeHTML(meta.parentTopic)}</strong></p>`;
    html += `<p style="margin-bottom: 16px;">Osiągnięta biegłość bazowa: <strong style="color:${meta.baseColor}; font-size:1.1rem;">${meta.currentLevel}%</strong></p>`;
    
    html += `<h3 style="font-size:0.85rem; color:var(--text-secondary); margin-bottom:8px;">Lista ustrukturyzowanych etapów edukacyjnych:</h3>`;
    html += `<ul style="list-style:none; padding:0; margin:0; display:flex; flex-direction:column; gap:4px; max-height:200px; overflow-y:auto; border:1px solid var(--border-subtle); padding:10px; border-radius:var(--radius-sm); background:rgba(0,0,0,0.1);">`;
    if (treeArr && treeArr.length > 0) {
        treeArr.forEach((node, i) => {
            let isDone = i <= index;
            let nTitle = typeof node === 'object' ? node.title : node;
            html += `<li style="font-size:0.8rem; color:${isDone ? 'var(--text-primary)' : 'var(--text-secondary)'}; opacity:${isDone?1:0.5};"><i data-lucide="${isDone?'check-circle-2':'circle'}" style="width:12px; height:12px; margin-right:6px; color:${isDone?'var(--accent-success)':'inherit'};"></i> ${i+1}. ${escapeHTML(nTitle)}</li>`;
        });
    } else {
        html += `<li style="font-size:0.8rem; color:var(--text-secondary);">Brak danych w bazie dla tego przedmiotu</li>`;
    }
    html += `</ul>`;
    
    if(body) body.innerHTML = html;
    modal.style.display = 'flex';
    if(window.lucide) window.lucide.createIcons();
}
