// app/js/budget/summary_view.js
// Renderowanie widoku podsumowania finansowego z horyzontem czasowym i wykresem
import { HORIZON_OPTIONS } from './constants.js';
import { expandOccurrences } from './calculations.js';
import { renderBudgetChart } from './chart.js';

export function renderSummaryView(container, { expFlatRaw, incFlatRaw, invFlat, activeHorizonMonths }) {
    const expFlat = expandOccurrences(expFlatRaw, activeHorizonMonths);
    const incFlat = expandOccurrences(incFlatRaw, activeHorizonMonths);

    const expReal = expFlat.filter(e => e.realized !== false).reduce((s, e) => s + (parseFloat(e.amount) || 0), 0);
    const expPlan = expFlat.filter(e => e.realized === false).reduce((s, e) => s + (parseFloat(e.amount) || 0), 0);
    const incReal = incFlat.filter(e => e.realized !== false).reduce((s, e) => s + (parseFloat(e.amount) || 0), 0);
    const incPlan = incFlat.filter(e => e.realized === false).reduce((s, e) => s + (parseFloat(e.amount) || 0), 0);

    const netReal = incReal - expReal;
    const projectedNet = netReal + incPlan - expPlan;
    const totalAssets = invFlat.reduce((s, e) => s + (parseFloat(e.balance) || 0), 0);
    const activeHorizonObj = HORIZON_OPTIONS.find(h => h.months === activeHorizonMonths) || HORIZON_OPTIONS[4];

    const horizonPills = HORIZON_OPTIONS.map(opt => `
        <button class="horizon-btn ${opt.months === activeHorizonMonths ? 'active' : ''}" 
                onclick="window.setBudgetHorizon(${opt.months})">
            ${opt.label}
        </button>
    `).join('');

    container.innerHTML = `
        <div style="display:flex; justify-content:space-between; align-items:center; flex-wrap:wrap; gap:12px; margin-bottom: 16px; padding-bottom: 12px; border-bottom: 1px solid var(--border-subtle);">
            <h2 style="font-size: 1.3rem; color: var(--text-primary); font-weight: 600; display:flex; align-items:center; gap: 10px; margin:0;">
                <div style="width: 10px; height: 22px; background: linear-gradient(180deg, #FF9F0A, #FF375F); border-radius: 3px;"></div>
                Podsumowanie Finansowe
            </h2>
            <div class="horizon-selector">
                <span style="font-size:0.72rem; color:var(--text-secondary); text-transform:uppercase; font-weight:600; margin-right:4px;">Perspektywa:</span>
                ${horizonPills}
            </div>
        </div>
        <div class="expense-summary-bar">
            <div class="expense-summary-card"><span class="label">Bilans Zrealizowany</span><span class="value" style="color:${netReal >= 0 ? '#30D158' : '#FF375F'};">${netReal > 0 ? '+' : ''}${netReal.toFixed(2)} zł</span></div>
            <div class="expense-summary-card"><span class="label">Przychody (Zrealizowane)</span><span class="value" style="color:#30D158;">${incReal.toFixed(2)} zł</span></div>
            <div class="expense-summary-card"><span class="label">Wydatki (Zrealizowane)</span><span class="value" style="color:#FF375F;">${expReal.toFixed(2)} zł</span></div>
            <div class="expense-summary-card" style="border-color: #BF5AF2;"><span class="label">Aktywa Inwestycyjne</span><span class="value" style="color:#BF5AF2;">${totalAssets.toFixed(2)} zł</span></div>
        </div>
        <h3 style="font-size: 0.85rem; font-weight: 600; text-transform: uppercase; letter-spacing: 0.05em; color: var(--text-secondary); margin: 24px 0 12px;">Planowane Operacje (${activeHorizonObj.label})</h3>
        <div style="display:flex; gap: 30px; margin-bottom: 30px;">
            <div style="flex:1; background:rgba(0,0,0,0.15); padding:16px; border-radius:8px; border:1px solid rgba(255,159,10,0.2);">
                <span style="font-size:0.8rem; color:var(--text-secondary); text-transform:uppercase; font-weight:600;">Oczekujące Wydatki</span>
                <div style="font-size:1.5rem; font-family:var(--font-mono); color:#FF9F0A; font-weight:700; margin-top:4px;">${expPlan.toFixed(2)} zł</div>
                <div style="font-size:0.8rem; color:var(--text-secondary); margin-top:4px;">Przewidywany bilans końcowy: <strong style="color:${projectedNet >= 0 ? '#30D158' : '#FF375F'};">${projectedNet.toFixed(2)} zł</strong></div>
            </div>
            <div style="flex:1; background:rgba(0,0,0,0.15); padding:16px; border-radius:8px; border:1px solid rgba(48,209,88,0.2);">
                <span style="font-size:0.8rem; color:var(--text-secondary); text-transform:uppercase; font-weight:600;">Oczekujące Wpływy</span>
                <div style="font-size:1.5rem; font-family:var(--font-mono); color:#30D158; font-weight:700; margin-top:4px;">${incPlan.toFixed(2)} zł</div>
                <div style="font-size:0.8rem; color:var(--text-secondary); margin-top:4px;">Przewidywany bilans końcowy: <strong style="color:${projectedNet >= 0 ? '#30D158' : '#FF375F'};">${projectedNet.toFixed(2)} zł</strong></div>
            </div>
        </div>
        <h3 style="font-size: 0.85rem; font-weight: 600; text-transform: uppercase; letter-spacing: 0.05em; color: var(--text-secondary); margin: 24px 0 12px;">Analiza Przepływów (${activeHorizonObj.label})</h3>
        <div style="background: rgba(0,0,0,0.2); border: 1px solid var(--border-subtle); border-radius: var(--radius-md); padding: 16px;">
            <div style="position: relative; height:300px; width:100%;">
                <canvas id="budgetChart"></canvas>
            </div>
        </div>
    `;

    if (window.lucide) window.lucide.createIcons();
    renderBudgetChart(expFlat, incFlat, activeHorizonMonths);
}
