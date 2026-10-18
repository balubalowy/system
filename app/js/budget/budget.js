// app/js/budget/budget.js
// Punkt wejścia modułu budżetu: integracja danych Firebase, nawigacja kategorii i widoki
import { db, USER_NODE } from '../core/firebase.js';
import { initWishlistEngine } from '../inbox/ideas.js';
import { EXPENSE_CATS, INCOME_CATS, INV_CATS } from './constants.js';
import { getFlatData } from './calculations.js';
import { renderSummaryView } from './summary_view.js';
import { renderInvestmentView, renderTransactionView } from './transaction_view.js';
import { initBudgetActions } from './actions.js';

let allExpenses = {};
let allIncomes = {};
let allInvestments = {};
let activeCategory = { type: 'summary', name: 'Podsumowanie' };
let activeHorizonMonths = 12;

window.setBudgetHorizon = function(months) {
    activeHorizonMonths = months;
    renderMainArea();
};

function buildSummaryButton(balance) {
    const btn = document.createElement('button');
    btn.className = 'expense-cat-btn' + (activeCategory.type === 'summary' ? ' active' : '');
    btn.innerHTML = `
        <span style="display:flex; align-items:center; gap:10px;">
            <i data-lucide="bar-chart-3" style="width:16px; height:16px; color:#FF9F0A;"></i>
            <span style="font-weight:600;">Podsumowanie</span>
        </span>
        <span style="font-family:var(--font-mono); font-size:0.8rem; color:${balance >= 0 ? '#30D158' : '#FF375F'}; font-weight:600;">${balance > 0 ? '+' : ''}${balance.toFixed(0)} zł</span>
    `;
    btn.onclick = () => {
        activeCategory = { type: 'summary', name: 'Podsumowanie' };
        renderSidebar();
        renderMainArea();
    };
    return btn;
}

function renderSidebarSection(sidebar, title, dataObj, catDefs, type) {
    const titleEl = document.createElement('div');
    titleEl.className = 'sidebar-section-title';
    titleEl.innerText = title;
    sidebar.appendChild(titleEl);

    catDefs.forEach(cat => {
        const btn = document.createElement('button');
        const isActive = activeCategory.type === type && activeCategory.name === cat.name;
        btn.className = 'expense-cat-btn' + (isActive ? ' active' : '');
        const items = dataObj[cat.name] ? Object.values(dataObj[cat.name]) : [];
        const isInv = type === 'investment';
        const total = items.reduce((sum, e) => sum + (parseFloat(isInv ? e.balance : e.amount) || 0), 0);
        const count = items.length;

        btn.innerHTML = `
            <span style="display:flex; align-items:center; gap:10px;">
                <i data-lucide="${cat.icon}" style="width:16px; height:16px; color:${cat.color};"></i>
                <span>${cat.name}</span>
                ${count > 0 && !isInv ? `<span style="font-size:0.7rem; font-family:var(--font-mono); color:var(--text-secondary);">(${count})</span>` : ''}
            </span>
            ${total > 0 ? `<span style="font-family:var(--font-mono); font-size:0.8rem; color:${cat.color}; font-weight:600;">${total.toFixed(0)} zł</span>` : ''}
        `;
        btn.onclick = () => {
            activeCategory = { type, name: cat.name };
            renderSidebar();
            renderMainArea();
        };
        sidebar.appendChild(btn);
    });
}

function renderSidebar() {
    const sidebar = document.getElementById('exp-sidebar');
    if (!sidebar) return;
    sidebar.innerHTML = '';

    const expFlat = getFlatData(allExpenses, EXPENSE_CATS, 'expense');
    const incFlat = getFlatData(allIncomes, INCOME_CATS, 'income');
    const totalExp = expFlat.filter(e => e.realized !== false).reduce((s, e) => s + (parseFloat(e.amount) || 0), 0);
    const totalInc = incFlat.filter(e => e.realized !== false).reduce((s, e) => s + (parseFloat(e.amount) || 0), 0);

    sidebar.appendChild(buildSummaryButton(totalInc - totalExp));
    renderSidebarSection(sidebar, 'Przychody', allIncomes, INCOME_CATS, 'income');
    renderSidebarSection(sidebar, 'Wydatki', allExpenses, EXPENSE_CATS, 'expense');
    renderSidebarSection(sidebar, 'Portfel Inwestycyjny', allInvestments, INV_CATS, 'investment');

    if (window.lucide) window.lucide.createIcons();
}

function renderMainArea() {
    const main = document.getElementById('exp-main');
    if (!main) return;

    if (activeCategory.type === 'summary') {
        const expFlatRaw = getFlatData(allExpenses, EXPENSE_CATS, 'expense');
        const incFlatRaw = getFlatData(allIncomes, INCOME_CATS, 'income');
        const invFlat = getFlatData(allInvestments, INV_CATS, 'investment');
        renderSummaryView(main, { expFlatRaw, incFlatRaw, invFlat, activeHorizonMonths });
        return;
    }

    const catName = activeCategory.name;
    const type = activeCategory.type;
    const isInv = type === 'investment';
    const catDefs = isInv ? INV_CATS : (type === 'expense' ? EXPENSE_CATS : INCOME_CATS);
    const dbNode = isInv ? 'investments' : (type === 'expense' ? 'expenses' : 'incomes');
    const catMeta = catDefs.find(c => c.name === catName);
    const color = catMeta ? catMeta.color : '#8B949E';
    const sourceData = isInv ? allInvestments : (type === 'expense' ? allExpenses : allIncomes);
    const items = sourceData[catName] ? Object.entries(sourceData[catName]) : [];

    if (isInv) {
        renderInvestmentView(main, { catName, color, items, dbNode });
    } else {
        renderTransactionView(main, { catName, type, color, items, dbNode });
    }
}

document.addEventListener('DOMContentLoaded', () => {
    initWishlistEngine();
    initBudgetActions(() => ({ allExpenses, allIncomes, allInvestments }));
    if (window.lucide) window.lucide.createIcons();

    let loaded = 0;
    const checkRender = () => {
        if (loaded >= 3) {
            renderSidebar();
            renderMainArea();
        }
    };

    db.ref(USER_NODE + 'expenses').on('value', snap => { allExpenses = snap.val() || {}; loaded++; checkRender(); });
    db.ref(USER_NODE + 'incomes').on('value', snap => { allIncomes = snap.val() || {}; loaded++; checkRender(); });
    db.ref(USER_NODE + 'investments').on('value', snap => { allInvestments = snap.val() || {}; loaded++; checkRender(); });
});