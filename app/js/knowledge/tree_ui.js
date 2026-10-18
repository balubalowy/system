// app/js/knowledge/tree_ui.js
// Renderowanie drzewa wiedzy, obsluga modalu rozbudowy bazy oraz interakcje wezlow
import { escapeHTML } from '../core/utils.js';
import { getTopicDetails } from './parser.js';

function renderTopicDetailsHtml(details, color) {
    const ytBlock = details.yt ? `
        <div style="position:relative; padding-bottom:56.25%; height:0; overflow:hidden; border-radius:6px; border: 1px solid var(--border-subtle);">
            <iframe src="${details.yt}" style="position:absolute; top:0; left:0; width:100%; height:100%; border:0;" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
        </div>
    ` : '';

    const descBlock = details.description ? `
        <p style="font-size: 0.9rem; color: var(--text-secondary); margin: 0; line-height: 1.5; font-family:var(--font-sans);">${escapeHTML(details.description)}</p>
    ` : '';

    const challBlock = details.challenge ? `
        <div style="background: rgba(47, 129, 247, 0.05); border-left: 3px solid ${color}; padding: 12px; border-radius: 0 4px 4px 0;">
            <div style="font-weight: 600; font-size: 0.75rem; color: ${color}; text-transform: uppercase; letter-spacing: 0.05em; margin-bottom: 6px; display:flex; align-items:center; gap:6px;"><i data-lucide="trophy" style="width:12px; height:12px;"></i> Wyzwanie (Challenge)</div>
            <p style="font-size: 0.85rem; color: var(--text-primary); margin: 0; line-height: 1.4; font-family:var(--font-sans);">${escapeHTML(details.challenge)}</p>
        </div>
    ` : '';

    const subtopicsBlock = details.subtopics ? `
        <div style="background: rgba(255, 255, 255, 0.02); border-left: 3px solid ${color}; padding: 12px; border-radius: 0 4px 4px 0;">
            <div style="font-weight: 600; font-size: 0.75rem; color: ${color}; text-transform: uppercase; letter-spacing: 0.05em; margin-bottom: 8px; display:flex; align-items:center; gap:6px;"><i data-lucide="list-checks" style="width:12px; height:12px;"></i> Podtematy do opanowania</div>
            <ul style="font-size: 0.85rem; color: var(--text-primary); margin: 0; padding-left: 20px; line-height: 1.6; font-family:var(--font-sans);">
                ${details.subtopics.map(sub => `<li>${escapeHTML(sub)}</li>`).join('')}
            </ul>
        </div>
    ` : '';

    const resBlock = (details.resources && details.resources.length > 0) ? `
        <div style="background: rgba(10, 132, 255, 0.05); border-left: 3px solid var(--accent-info); padding: 12px; border-radius: 0 4px 4px 0;">
            <div style="font-weight: 600; font-size: 0.75rem; color: var(--accent-info); text-transform: uppercase; letter-spacing: 0.05em; margin-bottom: 8px; display:flex; align-items:center; gap:6px;"><i data-lucide="folder-git-2" style="width:12px; height:12px;"></i> Zasoby i materiały powiązane</div>
            <ul style="font-size: 0.85rem; color: var(--text-primary); margin: 0; padding-left: 20px; line-height: 1.6; font-family:var(--font-sans);">
                ${details.resources.map(res => `<li><a href="${escapeHTML(res.url)}" target="_blank" style="color:var(--accent-info); text-decoration:none;">${escapeHTML(res.name)}</a></li>`).join('')}
            </ul>
        </div>
    ` : '';

    return `${ytBlock}${descBlock}${challBlock}${subtopicsBlock}${resBlock}`;
}

export function renderKnowledgeTree(container, { category, color, currentLevel, items, completedMap }) {
    const totalItems = items.length;
    let listHtml = '';

    items.forEach((item, idx) => {
        const isDone = completedMap[idx] === true;
        const icon = isDone ? 'check-circle-2' : 'circle';
        const itemColor = isDone ? color : 'var(--text-secondary)';
        const opacity = isDone ? '1' : '0.5';
        const title = typeof item === 'object' ? item.title : item;
        const details = getTopicDetails(category, title, item);

        listHtml += `
            <div class="knowledge-item interactive" onclick="window.toggleItemDetails(${idx})" style="opacity: ${opacity}; font-size: 0.95rem; padding: 12px 12px; display:flex; flex-direction:column; gap:4px; background: ${isDone ? 'rgba(255,255,255,0.03)' : 'transparent'}; border-radius: 6px; cursor: pointer; transition: all 0.2s; border: 1px solid ${isDone ? 'rgba(255,255,255,0.05)' : 'transparent'}; margin-bottom: 2px;">
                <div style="display:flex; align-items:center; gap:16px; width: 100%;">
                    <span style="color: ${isDone ? 'var(--text-primary)' : 'var(--text-secondary)'}; flex-grow: 1;"><strong>${idx + 1}.</strong> ${escapeHTML(title)}</span>
                    <div style="display:flex; align-items:center; gap:12px; flex-shrink: 0;">
                        <i data-lucide="chevron-down" id="chevron-${idx}" style="width:16px; height:16px; color:var(--text-secondary); transition: transform 0.2s;"></i>
                        <div onclick="event.stopPropagation(); window.updateKnowledgeProgress('${category}', ${idx}, ${totalItems})" style="display:flex; align-items:center; cursor:pointer; padding:4px;" title="${isDone ? 'Oznacz jako nieukonczone' : 'Oznacz jako ukonczone'}">
                            <i data-lucide="${icon}" style="width: 18px; height: 18px; min-width:18px; color: ${itemColor};"></i>
                        </div>
                    </div>
                </div>
                <div id="details-${idx}" style="display:none; width:100%; margin-top:12px; padding:12px; background:rgba(0,0,0,0.3); border-radius:6px; border:1px solid var(--border-subtle); flex-direction:column; gap:12px;" onclick="event.stopPropagation();">
                    ${renderTopicDetailsHtml(details, color)}
                </div>
            </div>
        `;
    });

    container.innerHTML = `
        <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom: 24px; padding-bottom: 16px; border-bottom: 1px solid var(--border-subtle);">
            <h2 style="font-size: 1.5rem; color: var(--text-primary); font-weight: 600; display:flex; align-items:center; gap: 12px;">
                <div style="width: 12px; height: 24px; background-color: ${color}; border-radius: 4px;"></div>
                ${category}
            </h2>
            <span style="font-size: 1rem; font-family: var(--font-mono); color: ${color}; background: rgba(0,0,0,0.2); padding: 4px 10px; border-radius: 4px;">Postep: ${currentLevel}%</span>
        </div>
        <div class="tree-scroll" style="display:flex; flex-direction:column; gap: 4px;">
            ${listHtml}
        </div>
    `;
    if (window.lucide) window.lucide.createIcons();
}

export function initTreeGlobalActions({ db, USER_NODE, getLocalProgress, onProgressSaved }) {
    window.toggleItemDetails = function(idx) {
        const details = document.getElementById(`details-${idx}`);
        const chevron = document.getElementById(`chevron-${idx}`);
        if (!details) return;
        const isClosed = details.style.display === 'none' || details.style.display === '';
        details.style.display = isClosed ? 'flex' : 'none';
        if (chevron) chevron.style.transform = isClosed ? 'rotate(180deg)' : 'rotate(0deg)';
    };

    window.updateKnowledgeProgress = function(category, clickedIdx, totalItems) {
        if (!db || !USER_NODE) return;
        const localProgress = getLocalProgress();
        if (!localProgress[category]) localProgress[category] = { level: 0, completed: {} };
        if (!localProgress[category].completed) localProgress[category].completed = {};

        if (localProgress[category].completed[clickedIdx] === true) {
            delete localProgress[category].completed[clickedIdx];
        } else {
            localProgress[category].completed[clickedIdx] = true;
        }

        const completedCount = Object.keys(localProgress[category].completed).length;
        const newLevel = Math.round((completedCount / totalItems) * 100);
        localProgress[category].level = newLevel;
        localProgress[category].updatedAt = Date.now();

        const mainEl = document.getElementById('k-main');
        if (mainEl) mainEl.style.opacity = '0.7';

        db.ref(`${USER_NODE}knowledge/${category}`).set({
            level: newLevel,
            completed: localProgress[category].completed,
            updatedAt: Date.now()
        }).then(() => {
            if (mainEl) mainEl.style.opacity = '1';
            onProgressSaved(category, newLevel);
        }).catch(() => {
            if (mainEl) mainEl.style.opacity = '1';
        });
    };
}

export function openAddNodeModal(globalTree, onSaveNode) {
    let m = document.getElementById('add-node-modal');
    if (!m) {
        m = document.createElement('div');
        m.id = 'add-node-modal';
        m.className = 'modal-overlay';
        m.style.display = 'flex';
        m.style.zIndex = '3000';
        m.innerHTML = `
            <div class="modal-content" style="max-width: 500px;">
                <div class="modal-header">
                    <h2>Rozbuduj Drzewo Wiedzy</h2>
                    <button class="btn btn-ghost" onclick="document.getElementById('add-node-modal').style.display='none'"><i data-lucide="x"></i></button>
                </div>
                <div class="modal-body" style="display:flex; flex-direction:column; gap:12px;">
                    <label style="font-size:0.8rem; color:var(--text-secondary);">Wybierz kategorie lub wpisz nowa:</label>
                    <input type="text" id="an-category" list="an-categories" class="inbox-task-input" placeholder="Np. Excel, Python, Finanse...">
                    <datalist id="an-categories"></datalist>
                    <label style="font-size:0.8rem; color:var(--text-secondary); margin-top:8px;">Tytul nowego tematu / lekcji:</label>
                    <input type="text" id="an-title" class="inbox-task-input" placeholder="Tytul zagadnienia">
                    <label style="font-size:0.8rem; color:var(--text-secondary); margin-top:8px;">Link YouTube (opcjonalnie, format /embed/):</label>
                    <input type="text" id="an-yt" class="inbox-task-input" placeholder="https://www.youtube.com/embed/XXXXX">
                    <label style="font-size:0.8rem; color:var(--text-secondary); margin-top:8px;">Wyzwanie praktyczne (opcjonalnie):</label>
                    <textarea id="an-challenge" class="inbox-task-input" rows="3" placeholder="Zadanie do wykonania po lekcji..."></textarea>
                    <button id="an-save-btn" class="btn btn-primary" style="margin-top: 16px; justify-content:center;"><i data-lucide="save"></i> Zapisz do bazy</button>
                </div>
            </div>
        `;
        document.body.appendChild(m);
        if (window.lucide) window.lucide.createIcons();
    }

    const dl = document.getElementById('an-categories');
    dl.innerHTML = '';
    Object.keys(globalTree).forEach(k => {
        const opt = document.createElement('option');
        opt.value = k;
        dl.appendChild(opt);
    });

    document.getElementById('an-category').value = '';
    document.getElementById('an-title').value = '';
    document.getElementById('an-yt').value = '';
    document.getElementById('an-challenge').value = '';
    m.style.display = 'flex';

    document.getElementById('an-save-btn').onclick = () => {
        const cat = document.getElementById('an-category').value.trim();
        const tit = document.getElementById('an-title').value.trim();
        const yt = document.getElementById('an-yt').value.trim();
        const chall = document.getElementById('an-challenge').value.trim();
        if (!cat || !tit) return alert('Kategoria i tytul sa wymagane!');

        let nodeData = tit;
        if (yt || chall) {
            nodeData = { title: tit };
            if (yt) nodeData.yt = yt;
            if (chall) nodeData.challenge = chall;
        }
        onSaveNode(cat, nodeData, () => { m.style.display = 'none'; });
    };
}
