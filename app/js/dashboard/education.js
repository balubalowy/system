// app/js/dashboard/education.js
import { db, USER_NODE } from '../core/firebase.js';

let currentEduData = null;

function renderEducationUI(edu) {
    currentEduData = edu;
    const grades = edu.grades || {};
    const gKeys = ['g1', 'g2', 'g3', 'g4', 'g5', 'g6'];
    let sum = 0;
    let count = 0;

    gKeys.forEach(key => {
        const el = document.getElementById('edu-' + key);
        const val = grades[key] || '';
        if (el) el.textContent = val || '...';
        if (val) {
            const num = parseFloat(val.toString().replace(',', '.'));
            if (!isNaN(num)) { sum += num; count++; }
        }
    });

    const gTotalEl = document.getElementById('edu-gtotal');
    if (gTotalEl) {
        gTotalEl.textContent = count > 0 ? (sum / count).toFixed(2).replace('.', ',') : '...';
    }

    const majorEl = document.getElementById('edu-major');
    if (majorEl && edu.fieldOfStudy) majorEl.textContent = edu.fieldOfStudy;

    const semTitleEl = document.getElementById('edu-semester-title');
    if (semTitleEl && edu.semester) semTitleEl.textContent = edu.semester;

    const pContainer = document.getElementById('edu-plan');
    if (pContainer) {
        const plan = edu.plan || [];
        if (plan.length === 0) {
            pContainer.innerHTML = '<div style="padding:16px; color:var(--text-secondary); font-size:0.85rem; text-align:center;">Brak przedmiotów w planie. Kliknij "Edytuj", aby dodać.</div>';
            return;
        }
        pContainer.innerHTML = plan.map((p, idx) => {
            const color = p.type === 'E' ? 'var(--accent-danger)' : 'var(--accent-success)';
            const bg = idx % 2 === 0 ? 'transparent' : 'rgba(255,255,255,0.02)';
            return `
                <div style="display:flex; justify-content:space-between; align-items:center; padding:12px 16px; background:${bg}; border-bottom:1px solid var(--border-subtle);">
                    <span style="font-size:0.9rem; color:var(--text-primary); flex:1;">${p.name}</span>
                    <div style="display:flex; gap:8px; align-items:center;">
                        <span style="font-size:0.75rem; color:var(--text-secondary); font-family:var(--font-mono);">${p.ects} ECTS</span>
                        <span style="font-size:0.75rem; font-weight:700; color:${color}; border:1px solid ${color}; border-radius:4px; padding:2px 6px;">${p.type}</span>
                    </div>
                </div>
            `;
        }).join('');
    }
}

export function initEducation() {
    const fallbackEdu = window.localAgentStats ? {
        fieldOfStudy: "AG",
        semester: "Semestr III",
        grades: {
            g1: window.localAgentStats.g1 || '',
            g2: window.localAgentStats.g2 || '',
            g3: window.localAgentStats.g3 || '',
            g4: window.localAgentStats.g4 || '',
            g5: window.localAgentStats.g5 || '',
            g6: window.localAgentStats.g6 || ''
        },
        plan: window.localAgentStats.plan || []
    } : { fieldOfStudy: "Kierunek", semester: "Semestr I", grades: {}, plan: [] };

    if (db && USER_NODE) {
        db.ref(USER_NODE + 'education').on('value', snap => {
            const val = snap.val();
            renderEducationUI(val || fallbackEdu);
        });
    } else {
        renderEducationUI(fallbackEdu);
    }

    bindEducationEditEvents();
}

function bindEducationEditEvents() {
    const btn = document.getElementById('btn-edit-education');
    const modal = document.getElementById('education-modal');
    if (!btn || !modal) return;

    btn.addEventListener('click', () => {
        const edu = currentEduData || {};
        const grades = edu.grades || {};
        
        const setVal = (id, val) => {
            const el = document.getElementById(id);
            if (el) el.value = val || '';
        };

        setVal('modal-edu-major', edu.fieldOfStudy || 'AG');
        setVal('modal-edu-semester', edu.semester || 'Semestr III');
        ['g1', 'g2', 'g3', 'g4', 'g5', 'g6'].forEach(g => setVal('modal-edu-' + g, grades[g] || ''));

        const planText = (edu.plan || []).map(p => `${p.name}; ${p.type}; ${p.ects}`).join('\n');
        setVal('modal-edu-plan-text', planText);

        modal.style.display = 'flex';
    });

    const closeBtn = document.getElementById('btn-close-education-modal');
    if (closeBtn) {
        closeBtn.addEventListener('click', () => { modal.style.display = 'none'; });
    }

    const saveBtn = document.getElementById('btn-save-education');
    if (saveBtn) {
        saveBtn.addEventListener('click', saveEducationData);
    }
}

function saveEducationData() {
    const modal = document.getElementById('education-modal');
    const getVal = id => {
        const el = document.getElementById(id);
        return el ? el.value.trim() : '';
    };

    const lines = getVal('modal-edu-plan-text').split('\n').map(l => l.trim()).filter(Boolean);
    const parsedPlan = lines.map(line => {
        const parts = line.split(';').map(p => p.trim());
        return {
            name: parts[0] || 'Przedmiot',
            type: (parts[1] || 'Z').toUpperCase(),
            ects: parts[2] || '0'
        };
    });

    const payload = {
        fieldOfStudy: getVal('modal-edu-major') || 'AG',
        semester: getVal('modal-edu-semester') || 'Semestr',
        grades: {
            g1: getVal('modal-edu-g1'),
            g2: getVal('modal-edu-g2'),
            g3: getVal('modal-edu-g3'),
            g4: getVal('modal-edu-g4'),
            g5: getVal('modal-edu-g5'),
            g6: getVal('modal-edu-g6')
        },
        plan: parsedPlan
    };

    if (db && USER_NODE) {
        db.ref(USER_NODE + 'education').set(payload).then(() => {
            if (modal) modal.style.display = 'none';
        });
    }
}
