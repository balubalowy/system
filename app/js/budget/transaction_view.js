// app/js/budget/transaction_view.js
// Renderowanie widoków portfela inwestycyjnego oraz transakcji (przychody / wydatki)
import { escapeHTML } from '../core/utils.js';
import { RECURRING_LABELS } from './constants.js';

export function renderInvestmentView(container, { catName, color, items, dbNode }) {
    const totalBalance = items.reduce((s, [, e]) => s + (parseFloat(e.balance) || 0), 0);
    const sorted = [...items].sort((a, b) => (b[1].updatedAt || 0) - (a[1].updatedAt || 0));

    const rows = sorted.map(([key, inv]) => {
        const dateStr = new Date(inv.updatedAt || Date.now()).toISOString().split('T')[0];
        return `
            <tr>
                <td style="font-weight:500;">${escapeHTML(inv.name)}</td>
                <td style="font-family:var(--font-mono); font-size:0.8rem; color:var(--text-secondary);">${dateStr}</td>
                <td style="display:flex; gap:8px; align-items:center;">
                    <input type="number" id="update-bal-${key}" value="${inv.balance}" style="width:100px; background:rgba(0,0,0,0.2); border:1px solid var(--border-subtle); border-radius:4px; padding:4px 8px; font-family:var(--font-mono); font-weight:600; color:${color};">
                    <button onclick="window.updateInvestment('${catName}', '${key}')" style="background:none; border:none; color:var(--text-secondary); cursor:pointer;" title="Zapisz nowe saldo"><i data-lucide="save" style="width:16px; height:16px;"></i></button>
                </td>
                <td>
                    <button class="expense-delete-btn" onclick="window.deleteItem('${dbNode}', '${catName}', '${key}')" title="Usuń aktywo"><i data-lucide="trash-2" style="width:14px; height:14px;"></i></button>
                </td>
            </tr>
        `;
    }).join('');

    container.innerHTML = `
        <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom: 16px; padding-bottom: 12px; border-bottom: 1px solid var(--border-subtle);">
            <h2 style="font-size: 1.3rem; color: var(--text-primary); font-weight: 600; display:flex; align-items:center; gap: 10px;">
                <div style="width: 10px; height: 22px; background-color: ${color}; border-radius: 3px;"></div>
                ${catName} (Inwestycje)
            </h2>
        </div>
        <div class="expense-summary-bar">
            <div class="expense-summary-card"><span class="label">Suma Aktywów</span><span class="value" style="color:${color};">${totalBalance.toFixed(2)} zł</span></div>
            <div class="expense-summary-card"><span class="label">Aktywne pozycje</span><span class="value" style="color:var(--text-primary);">${items.length}</span></div>
        </div>
        <div class="expense-add-row">
            <input type="text" id="inv-name" placeholder="Nazwa aktywa (np. Obligacje EDO)..." style="flex:2;">
            <input type="number" id="inv-balance" placeholder="Aktualne saldo (zł)" step="0.01" min="0">
            <button onclick="window.addInvestment('${catName}')"><i data-lucide="plus" style="width:14px; height:14px; vertical-align:middle; margin-right:4px;"></i> Dodaj Aktywo</button>
        </div>
        ${items.length === 0 ? '<p style="color:var(--text-secondary); text-align:center; padding: 30px 0;">Brak aktywów w tej kategorii.</p>' : `
            <table class="expense-table">
                <thead><tr><th>Nazwa Aktywa</th><th style="width:150px;">Ostatnia aktualizacja</th><th style="width:200px;">Aktualne Saldo</th><th style="width:40px;"></th></tr></thead>
                <tbody>${rows}</tbody>
            </table>
        `}
    `;
    if (window.lucide) window.lucide.createIcons();
}

function buildTransactionRows(items, color, dbNode, catName) {
    return items.map(([key, txn]) => {
        const isRealized = txn.realized !== false;
        const recurKey = txn.recurring || txn.recurringOrigin;
        const recurLabel = recurKey ? RECURRING_LABELS[recurKey] || recurKey : '';
        let recurDetails = recurLabel;
        if (recurLabel && txn.recurring) {
            if (txn.recurCount) recurDetails += ` (x${txn.recurCount})`;
            else if (txn.recurEnd) recurDetails += ` (do ${txn.recurEnd})`;
        }
        return `
            <tr class="${isRealized ? '' : 'row-planned'}">
                <td style="font-weight:500;">${escapeHTML(txn.name) || '—'}</td>
                <td style="font-family:var(--font-mono); font-weight:600; color:${color};">${parseFloat(txn.amount || 0).toFixed(2)} zł</td>
                <td style="font-family:var(--font-mono); font-size:0.85rem; color:var(--text-secondary);">${txn.date || '—'}</td>
                <td>
                    <span class="status-badge ${isRealized ? 'status-realized' : 'status-planned'}" onclick="window.toggleStatus('${dbNode}', '${catName}', '${key}', ${isRealized})">
                        ${isRealized ? '<i data-lucide="check" style="width:10px; height:10px; vertical-align:middle;"></i> Zrealizowane' : '<i data-lucide="clock" style="width:10px; height:10px; vertical-align:middle;"></i> Planowane'}
                    </span>
                </td>
                <td>${recurDetails ? `<span style="font-size:0.7rem; padding:2px 8px; border-radius:10px; background:rgba(255,255,255,0.05); color:var(--text-secondary); font-weight:500; white-space:nowrap;" title="Cykliczność"><i data-lucide="repeat" style="width:10px; height:10px; vertical-align:middle;"></i> ${recurDetails}</span>` : '<span style="font-size:0.75rem; color:var(--text-secondary); opacity:0.5;">—</span>'}</td>
                <td style="font-size:0.85rem; color:var(--text-secondary);">${escapeHTML(txn.note) || '—'}</td>
                <td style="display:flex; gap: 4px;">
                    <button class="expense-delete-btn" onclick="window.editItem('${dbNode}', '${catName}', '${key}')" title="Edytuj pozycję"><i data-lucide="edit-3" style="width:14px; height:14px;"></i></button>
                    <button class="expense-delete-btn" onclick="window.deleteItem('${dbNode}', '${catName}', '${key}')" title="Usuń pozycję"><i data-lucide="trash-2" style="width:14px; height:14px;"></i></button>
                </td>
            </tr>
        `;
    }).join('');
}

export function renderTransactionView(container, { catName, type, color, items, dbNode }) {
    const sorted = [...items].sort((a, b) => (b[1].date || '').localeCompare(a[1].date || ''));
    const realTotal = sorted.filter(e => e[1].realized !== false).reduce((s, e) => s + (parseFloat(e[1].amount) || 0), 0);
    const planTotal = sorted.filter(e => e[1].realized === false).reduce((s, e) => s + (parseFloat(e[1].amount) || 0), 0);
    const rows = buildTransactionRows(sorted, color, dbNode, catName);

    container.innerHTML = `
        <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom: 16px; padding-bottom: 12px; border-bottom: 1px solid var(--border-subtle);">
            <h2 style="font-size: 1.3rem; color: var(--text-primary); font-weight: 600; display:flex; align-items:center; gap: 10px;">
                <div style="width: 10px; height: 22px; background-color: ${color}; border-radius: 3px;"></div>
                ${catName} <span style="font-size:0.8rem; color:var(--text-secondary); font-weight:400;">(${type === 'expense' ? 'Wydatki' : 'Przychody'})</span>
            </h2>
        </div>
        <div class="expense-summary-bar">
            <div class="expense-summary-card"><span class="label">Suma Zrealizowana</span><span class="value" style="color:${color};">${realTotal.toFixed(2)} zł</span></div>
            <div class="expense-summary-card"><span class="label">Suma Planowana</span><span class="value" style="color:#FF9F0A;">${planTotal.toFixed(2)} zł</span></div>
            <div class="expense-summary-card"><span class="label">Pozycji</span><span class="value" style="color:var(--text-primary);">${items.length}</span></div>
        </div>
        <div class="expense-add-row">
            <input type="text" id="txn-name" placeholder="Nazwa..." style="flex:2;">
            <input type="number" id="txn-amount" placeholder="Kwota (zł)" step="0.01" min="0">
            <input type="date" id="txn-date" value="${new Date().toISOString().split('T')[0]}">
            <label class="toggle-switch" title="Zrealizowane czy Planowane?">
                <input type="checkbox" id="txn-realized" checked>
                <div class="toggle-slider"></div>
                Zrealizowane
            </label>
            <select id="txn-recurring" style="max-width:120px;" onchange="const el = document.getElementById('recurring-opts'); if(el) el.style.display = this.value ? 'flex' : 'none';">
                <option value="">Jednorazowy</option>
                <option value="weekly">Co tydzień</option>
                <option value="monthly">Co miesiąc</option>
                <option value="quarterly">Co kwartał</option>
                <option value="yearly">Co rok</option>
            </select>
            <div id="recurring-opts" style="display:none; gap:6px; align-items:center;">
                <input type="number" id="txn-recur-count" placeholder="Rat" style="max-width:70px;" min="1" title="Zakończ po X wpłatach">
                <span style="color:var(--text-secondary); font-size:0.75rem;">lub do</span>
                <input type="date" id="txn-recur-end" style="max-width:120px;" title="Zakończ po tej dacie">
            </div>
            <input type="text" id="txn-note" placeholder="Notatka..." style="flex:1.5;">
            <button id="btn-add-txn" onclick="window.addTransaction('${dbNode}', '${catName}')"><i data-lucide="plus" style="width:14px; height:14px; vertical-align:middle; margin-right:4px;"></i> Dodaj</button>
        </div>
        ${items.length === 0 ? '<p style="color:var(--text-secondary); text-align:center; padding: 30px 0;">Brak zapisanych pozycji w tej kategorii.</p>' : `
            <table class="expense-table">
                <thead><tr><th>Nazwa</th><th style="width:110px;">Kwota</th><th style="width:100px;">Data</th><th style="width:110px;">Status</th><th style="width:90px;">Cykl</th><th>Notatka</th><th style="width:40px;"></th></tr></thead>
                <tbody>${rows}</tbody>
            </table>
        `}
    `;
    if (window.lucide) window.lucide.createIcons();
}
