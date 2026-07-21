// js/routines.js
import { db, USER_NODE } from '../core/firebase.js';
import { getTodayStr } from '../core/utils.js';

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
