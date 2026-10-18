// app/js/knowledge/knowledge.js
// Glowny punkt wejscia bazy wiedzy: nawigacja kategorii, synchronizacja Firebase i zarzadzanie stanem
import { db, USER_NODE } from '../core/firebase.js';
import { DEFAULT_KNOWLEDGE_TREE } from './data/index.js';
import { initCareerProgress } from './career.js';
import { PREFERRED_ORDER, getCatColor, migrateKnowledgeProgress } from './parser.js';
import { renderKnowledgeTree, initTreeGlobalActions, openAddNodeModal } from './tree_ui.js';

let localProgress = {};
let globalTree = {};
let activeCategoryName = null;

function updateSidebarBadge(category, newLevel) {
    const sidebar = document.getElementById('k-sidebar');
    if (!sidebar) return;
    const btns = sidebar.querySelectorAll('.category-btn');
    btns.forEach(btn => {
        if (btn.innerHTML.includes(category)) {
            const levelSpan = btn.querySelector('span > span');
            if (levelSpan) levelSpan.innerText = `(${newLevel}%)`;
            const circle = btn.querySelector('div');
            if (circle) {
                const newSize = 6 + (newLevel / 100) * 12;
                circle.style.width = `${newSize}px`;
                circle.style.height = `${newSize}px`;
                circle.style.opacity = newLevel === 0 ? '0.3' : '1';
            }
        }
    });
}

function renderMainArea(category, color, currentLevel) {
    activeCategoryName = category;
    const main = document.getElementById('k-main');
    if (!main) return;
    const items = globalTree[category] || [];
    const completedMap = (localProgress[category] && localProgress[category].completed) || {};
    renderKnowledgeTree(main, { category, color, currentLevel, items, completedMap });
}

function sortCategories(keys) {
    return [...keys].sort((a, b) => {
        const idxA = PREFERRED_ORDER.indexOf(a);
        const idxB = PREFERRED_ORDER.indexOf(b);
        if (idxA !== -1 && idxB !== -1) return idxA - idxB;
        if (idxA !== -1) return -1;
        if (idxB !== -1) return 1;
        return a.localeCompare(b);
    });
}

function buildCategoryButton(cat, idx) {
    const btn = document.createElement('button');
    btn.className = 'category-btn';
    const color = getCatColor(cat);
    const level = (localProgress[cat] && localProgress[cat].level !== undefined) ? localProgress[cat].level : 0;
    const circleSize = 6 + (level / 100) * 12;

    btn.innerHTML = `
        <span>${cat} <span style="font-family: var(--font-mono); font-size:0.75rem; color:var(--text-secondary); margin-left:8px;">(${level}%)</span></span>
        <div style="width: ${circleSize}px; height: ${circleSize}px; background-color: ${color}; border-radius: 50%; opacity: ${level === 0 ? 0.3 : 1}; transition: all 0.3s; margin-left:auto;"></div>
    `;
    btn.onclick = () => {
        document.querySelectorAll('.category-btn').forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        renderMainArea(cat, color, level);
    };
    return { btn, isFirst: idx === 0 };
}

function renderSidebar() {
    const sidebar = document.getElementById('k-sidebar');
    if (!sidebar) return;
    const keys = sortCategories(Object.keys(globalTree));
    if (keys.length === 0) {
        sidebar.innerHTML = '<div style="color:var(--text-secondary); text-align:center;">Oczekuje na zapis bazy przez Agenta w tle... (Odśwież)</div>';
        return;
    }
    sidebar.innerHTML = '';

    keys.forEach((cat, idx) => {
        const { btn, isFirst } = buildCategoryButton(cat, idx);
        sidebar.appendChild(btn);
        if ((!activeCategoryName && isFirst) || activeCategoryName === cat) {
            btn.click();
        }
    });

    const addBtnDiv = document.createElement('div');
    addBtnDiv.style.cssText = 'padding:12px; margin-top:20px; border-top:1px dashed var(--border-subtle);';
    addBtnDiv.innerHTML = '<button id="btn-add-node" class="btn btn-primary" style="width:100%; justify-content:center;"><i data-lucide="plus"></i> Rozbuduj Drzewo Wiedzy</button>';
    sidebar.appendChild(addBtnDiv);
    if (window.lucide) window.lucide.createIcons();

    setTimeout(() => {
        document.getElementById('btn-add-node')?.addEventListener('click', () => {
            openAddNodeModal(globalTree, (cat, nodeData, onSuccess) => {
                const targetArr = globalTree[cat] ? [...globalTree[cat]] : [];
                targetArr.push(nodeData);
                db.ref(`${USER_NODE}knowledge_tree/${cat}`).set(targetArr).then(onSuccess);
            });
        });
    }, 50);
}

document.addEventListener('DOMContentLoaded', () => {
    initCareerProgress();
    initTreeGlobalActions({
        db,
        USER_NODE,
        getLocalProgress: () => localProgress,
        onProgressSaved: (cat, newLevel) => {
            renderMainArea(cat, getCatColor(cat), newLevel);
            updateSidebarBadge(cat, newLevel);
        }
    });

    const themeBtn = document.getElementById('theme-toggle-btn');
    if (themeBtn) {
        themeBtn.addEventListener('click', () => {
            const next = document.documentElement.getAttribute('data-theme') === 'dark' ? 'light' : 'dark';
            document.documentElement.setAttribute('data-theme', next);
            localStorage.setItem('theme', next);
        });
    }
    if (window.lucide) window.lucide.createIcons();

    db.ref(USER_NODE + 'knowledge_tree').on('value', snapTree => {
        const val = snapTree.val();
        globalTree = (val && Object.keys(val).length > 0) ? val : DEFAULT_KNOWLEDGE_TREE;

        db.ref(USER_NODE + 'knowledge').once('value').then(snap => {
            localProgress = snap.val() || {};
            migrateKnowledgeProgress(localProgress, globalTree);
            renderSidebar();
        }).catch(() => {
            renderSidebar();
        });
    });
});