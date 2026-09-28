// js/routines.js
import { db, USER_NODE } from '../core/firebase.js';
import { getTodayStr } from '../core/utils.js';

export function initChecklists() {
    const defaultRoutines = (window.appData && window.appData.routines) ? window.appData.routines : { morning: [], evening: [] };
    
    if (db && USER_NODE) {
        db.ref(USER_NODE + 'routine_definitions').on('value', (snapshot) => {
            const routines = snapshot.val() || defaultRoutines;
            renderChecklist('morning-routine', routines.morning || []);
            renderChecklist('evening-routine', routines.evening || []);
        });
    } else {
        renderChecklist('morning-routine', defaultRoutines.morning || []);
        renderChecklist('evening-routine', defaultRoutines.evening || []);
    }
}

function renderChecklist(elementId, items) {
    const container = document.getElementById(elementId);
    if(!container || !items) return;
    container.innerHTML = '';
    const todayStr = getTodayStr();
    
    if (items.length === 0) {
        container.innerHTML = '<div style="font-size:0.8rem; color:var(--text-secondary); padding:4px 0;">Brak zdefiniowanych zadań.</div>';
        return;
    }
    
    items.forEach(item => {
        const div = document.createElement('div');
        div.className = 'notion-item';
        
        const checkbox = document.createElement('input');
        checkbox.type = 'checkbox';
        checkbox.className = 'notion-checkbox';
        checkbox.id = item.id;
        
        if (db && USER_NODE) {
            db.ref(USER_NODE + 'routines/' + todayStr + '/' + item.id).on('value', (snapshot) => {
                const val = snapshot.val() || false;
                checkbox.checked = val;
                if(val) div.classList.add('checked'); else div.classList.remove('checked');
            });
            
            checkbox.addEventListener('change', (e) => {
                db.ref(USER_NODE + 'routines/' + todayStr + '/' + item.id).set(e.target.checked);
            });
        }

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
