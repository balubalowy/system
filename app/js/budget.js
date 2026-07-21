import { db, USER_NODE } from './firebase.js';
import { escapeHTML } from './utils.js';
import { initWishlistEngine } from './ideas.js';
import { dismissNotification } from './notifications.js';

document.addEventListener('DOMContentLoaded', () => {
    initWishlistEngine();
    if(window.lucide) window.lucide.createIcons();

            const EXPENSE_CATS = [
                { name: "Mieszkanie", icon: "home", color: "#0A84FF" },
                { name: "Jedzenie", icon: "utensils", color: "#2BBF71" },
                { name: "Transport", icon: "car", color: "#5E5CE6" },
                { name: "Subskrypcje", icon: "credit-card", color: "#FF375F" },
                { name: "Elektronika", icon: "monitor-smartphone", color: "#FF9F0A" },
                { name: "Ubrania", icon: "shirt", color: "#64D2FF" },
                { name: "Zdrowie", icon: "heart-pulse", color: "#FF453A" },
                { name: "Rozrywka", icon: "gamepad-2", color: "#BF5AF2" },
                { name: "Edukacja", icon: "graduation-cap", color: "#30D158" },
                { name: "Inne", icon: "more-horizontal", color: "#8B949E" }
            ];

            const INCOME_CATS = [
                { name: "Wynagrodzenie", icon: "briefcase", color: "#30D158" },
                { name: "Premie", icon: "gift", color: "#0A84FF" },
                { name: "Odsetki", icon: "trending-up", color: "#BF5AF2" },
                { name: "Inne Wpływy", icon: "plus-circle", color: "#2BBF71" }
            ];

            const INV_CATS = [
                { name: "Konta Oszczędnościowe", icon: "piggy-bank", color: "#0A84FF" },
                { name: "Obligacje Skarbowe", icon: "landmark", color: "#FF9F0A" },
                { name: "Giełda i ETF", icon: "line-chart", color: "#BF5AF2" },
                { name: "Kryptowaluty", icon: "bitcoin", color: "#FF375F" }
            ];

            const RECURRING_LABELS = {
                '': 'Jednorazowy',
                'monthly': 'Co miesiąc',
                'weekly': 'Co tydzień',
                'yearly': 'Co rok',
                'quarterly': 'Co kwartał'
            };

            let allExpenses = {};
            let allIncomes = {};
            let allInvestments = {};
            let activeCategory = null; // object: {type: 'summary'|'expense'|'income'|'investment', name: string}

            // Inicjalizacja kategorii
            activeCategory = { type: 'summary', name: 'Podsumowanie' };

            // Pobieranie z bazy (3 węzły)
            let loaded = 0;
            const checkRender = () => {
                if(loaded >= 3) {
                    renderSidebar();
                    renderMainArea();
                }
            };

            db.ref(USER_NODE + 'expenses').on('value', snap => { allExpenses = snap.val() || {}; loaded++; checkRender(); });
            db.ref(USER_NODE + 'incomes').on('value', snap => { allIncomes = snap.val() || {}; loaded++; checkRender(); });
            db.ref(USER_NODE + 'investments').on('value', snap => { allInvestments = snap.val() || {}; loaded++; checkRender(); });

            function getFlatData(sourceObj, categoryDefs, type) {
                let all = [];
                categoryDefs.forEach(cat => {
                    const items = sourceObj[cat.name] ? Object.entries(sourceObj[cat.name]) : [];
                    items.forEach(([key, item]) => {
                        all.push({ ...item, key, category: cat.name, color: cat.color, icon: cat.icon, type: type });
                    });
                });
                return all;
            }

            function renderSidebar() {
                const sidebar = document.getElementById('exp-sidebar');
                sidebar.innerHTML = '';

                // Podsumowanie
                const sumBtn = document.createElement('button');
                sumBtn.className = 'expense-cat-btn' + (activeCategory.type === 'summary' ? ' active' : '');
                
                const expFlat = getFlatData(allExpenses, EXPENSE_CATS, 'expense');
                const incFlat = getFlatData(allIncomes, INCOME_CATS, 'income');
                const invFlat = getFlatData(allInvestments, INV_CATS, 'investment');

                const totalExp = expFlat.filter(e => e.realized !== false).reduce((s, e) => s + (parseFloat(e.amount) || 0), 0);
                const totalInc = incFlat.filter(e => e.realized !== false).reduce((s, e) => s + (parseFloat(e.amount) || 0), 0);
                const balance = totalInc - totalExp;

                sumBtn.innerHTML = `
                    <span style="display:flex; align-items:center; gap:10px;">
                        <i data-lucide="bar-chart-3" style="width:16px; height:16px; color:#FF9F0A;"></i>
                        <span style="font-weight:600;">Podsumowanie</span>
                    </span>
                    <span style="font-family:var(--font-mono); font-size:0.8rem; color:${balance >= 0 ? '#30D158' : '#FF375F'}; font-weight:600;">${balance > 0 ? '+' : ''}${balance.toFixed(0)} zł</span>
                `;
                sumBtn.onclick = () => {
                    activeCategory = { type: 'summary', name: 'Podsumowanie' };
                    renderSidebar();
                    renderMainArea();
                };
                sidebar.appendChild(sumBtn);

                // Helper do sekcji
                const createSection = (title, dataObj, catDefs, type) => {
                    const titleEl = document.createElement('div');
                    titleEl.className = 'sidebar-section-title';
                    titleEl.innerText = title;
                    sidebar.appendChild(titleEl);

                    catDefs.forEach(cat => {
                        const btn = document.createElement('button');
                        const isActive = activeCategory.type === type && activeCategory.name === cat.name;
                        btn.className = 'expense-cat-btn' + (isActive ? ' active' : '');
                        
                        const items = dataObj[cat.name] ? Object.values(dataObj[cat.name]) : [];
                        // Inwestycje - sumujemy balance, pozostale amount
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
                            activeCategory = { type: type, name: cat.name };
                            renderSidebar();
                            renderMainArea();
                        };
                        sidebar.appendChild(btn);
                    });
                };

                createSection('Przychody', allIncomes, INCOME_CATS, 'income');
                createSection('Wydatki', allExpenses, EXPENSE_CATS, 'expense');
                createSection('Portfel Inwestycyjny', allInvestments, INV_CATS, 'investment');

                if(window.lucide) window.lucide.createIcons();
            }

            function expandOccurrences(items) {
                const expanded = [];
                items.forEach(item => {
                    let currentDt = new Date(item.date || new Date());
                    
                    // Always add the first occurrence.
                    expanded.push({ ...item, date: currentDt.toISOString().split('T')[0] });
                    
                    if (!item.recurring) return;
                    
                    let count = 1;
                    const maxCount = item.recurCount ? parseInt(item.recurCount) : null;
                    const endDtStr = item.recurEnd ? item.recurEnd : null;
                    const endDt = endDtStr ? new Date(endDtStr) : null;
                    
                    // Fallback to exactly 12 occurrences for infinite loops
                    const fallbackCount = 12;

                    while (true) {
                        if (maxCount && count >= maxCount) break;
                        if (!maxCount && !endDt && count >= fallbackCount) break;
                        
                        if (item.recurring === 'weekly') currentDt.setDate(currentDt.getDate() + 7);
                        else if (item.recurring === 'monthly') currentDt.setMonth(currentDt.getMonth() + 1);
                        else if (item.recurring === 'quarterly') currentDt.setMonth(currentDt.getMonth() + 3);
                        else if (item.recurring === 'yearly') currentDt.setFullYear(currentDt.getFullYear() + 1);
                        
                        if (endDt && currentDt > endDt) break;
                        
                        expanded.push({ 
                            ...item, 
                            date: currentDt.toISOString().split('T')[0],
                            realized: false // Future generated occurrences are always planned
                        });
                        count++;
                    }
                });
                return expanded;
            }

            let summaryChart = null;

            function renderSummary() {
                const main = document.getElementById('exp-main');
                const expFlatRaw = getFlatData(allExpenses, EXPENSE_CATS, 'expense');
                const incFlatRaw = getFlatData(allIncomes, INCOME_CATS, 'income');
                const invFlat = getFlatData(allInvestments, INV_CATS, 'investment');

                const expFlat = expandOccurrences(expFlatRaw);
                const incFlat = expandOccurrences(incFlatRaw);

                const expReal = expFlat.filter(e => e.realized !== false).reduce((s, e) => s + (parseFloat(e.amount) || 0), 0);
                const expPlan = expFlat.filter(e => e.realized === false).reduce((s, e) => s + (parseFloat(e.amount) || 0), 0);
                
                const incReal = incFlat.filter(e => e.realized !== false).reduce((s, e) => s + (parseFloat(e.amount) || 0), 0);
                const incPlan = incFlat.filter(e => e.realized === false).reduce((s, e) => s + (parseFloat(e.amount) || 0), 0);

                const netReal = incReal - expReal;
                const projectedNet = netReal + incPlan - expPlan;
                const totalAssets = invFlat.reduce((s, e) => s + (parseFloat(e.balance) || 0), 0);

                let html = `
                    <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom: 16px; padding-bottom: 12px; border-bottom: 1px solid var(--border-subtle);">
                        <h2 style="font-size: 1.3rem; color: var(--text-primary); font-weight: 600; display:flex; align-items:center; gap: 10px;">
                            <div style="width: 10px; height: 22px; background: linear-gradient(180deg, #FF9F0A, #FF375F); border-radius: 3px;"></div>
                            Podsumowanie Finansowe
                        </h2>
                    </div>

                    <div class="expense-summary-bar">
                        <div class="expense-summary-card">
                            <span class="label">Bilans Zrealizowany</span>
                            <span class="value" style="color:${netReal >= 0 ? '#30D158' : '#FF375F'};">${netReal > 0 ? '+' : ''}${netReal.toFixed(2)} zł</span>
                        </div>
                        <div class="expense-summary-card">
                            <span class="label">Przychody (Zrealizowane)</span>
                            <span class="value" style="color:#30D158;">${incReal.toFixed(2)} zł</span>
                        </div>
                        <div class="expense-summary-card">
                            <span class="label">Wydatki (Zrealizowane)</span>
                            <span class="value" style="color:#FF375F;">${expReal.toFixed(2)} zł</span>
                        </div>
                        <div class="expense-summary-card" style="border-color: #BF5AF2;">
                            <span class="label">Aktywa Inwestycyjne</span>
                            <span class="value" style="color:#BF5AF2;">${totalAssets.toFixed(2)} zł</span>
                        </div>
                    </div>

                    <h3 style="font-size: 0.85rem; font-weight: 600; text-transform: uppercase; letter-spacing: 0.05em; color: var(--text-secondary); margin: 24px 0 12px;">Planowane Operacje</h3>
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
                    
                    <h3 style="font-size: 0.85rem; font-weight: 600; text-transform: uppercase; letter-spacing: 0.05em; color: var(--text-secondary); margin: 24px 0 12px;">Analiza Przepływów</h3>
                    <div style="background: rgba(0,0,0,0.2); border: 1px solid var(--border-subtle); border-radius: var(--radius-md); padding: 16px;">
                        <div style="position: relative; height:300px; width:100%;">
                            <canvas id="budgetChart"></canvas>
                        </div>
                    </div>
                `;

                main.innerHTML = html;
                if(window.lucide) window.lucide.createIcons();

                const monthlyData = {};
                const allItems = [...expFlat, ...incFlat];
                
                let minMonth = "9999-99";
                let maxMonth = "0000-00";

                allItems.forEach(item => {
                    if(!item.date) return;
                    const monthKey = item.date.substring(0, 7);
                    if (monthKey < minMonth) minMonth = monthKey;
                    if (monthKey > maxMonth) maxMonth = monthKey;

                    if (!monthlyData[monthKey]) {
                        monthlyData[monthKey] = { expReal: 0, expPlan: 0, incReal: 0, incPlan: 0 };
                    }
                    const amt = parseFloat(item.amount) || 0;
                    const isReal = item.realized !== false;
                    
                    if (item.type === 'expense') {
                        if (isReal) monthlyData[monthKey].expReal += amt;
                        else monthlyData[monthKey].expPlan += amt;
                    }
                    if (item.type === 'income') {
                        if (isReal) monthlyData[monthKey].incReal += amt;
                        else monthlyData[monthKey].incPlan += amt;
                    }
                });

                // Generate continuous labels
                const labels = [];
                if (minMonth !== "9999-99" && maxMonth !== "0000-00") {
                    let currentD = new Date(minMonth + "-01");
                    const endD = new Date(maxMonth + "-01");
                    while (currentD <= endD) {
                        const m = currentD.toISOString().substring(0, 7);
                        labels.push(m);
                        if (!monthlyData[m]) monthlyData[m] = { expReal: 0, expPlan: 0, incReal: 0, incPlan: 0 };
                        currentD.setMonth(currentD.getMonth() + 1);
                    }
                }

                const incRealData = [];
                const incPlanData = [];
                const expRealData = [];
                const expPlanData = [];
                const balanceData = [];
                let runningBalance = 0;

                labels.forEach(m => {
                    const ir = monthlyData[m].incReal;
                    const ip = monthlyData[m].incPlan;
                    const er = monthlyData[m].expReal;
                    const ep = monthlyData[m].expPlan;
                    
                    incRealData.push(ir);
                    incPlanData.push(ip);
                    expRealData.push(er);
                    expPlanData.push(ep);
                    
                    runningBalance += ((ir + ip) - (er + ep));
                    balanceData.push(runningBalance);
                });

                if(summaryChart) {
                    summaryChart.destroy();
                }

                const ctx = document.getElementById('budgetChart').getContext('2d');
                summaryChart = new Chart(ctx, {
                    type: 'bar',
                    data: {
                        labels: labels,
                        datasets: [
                            {
                                type: 'line',
                                label: 'Skumulowany Bilans (zł)',
                                data: balanceData,
                                borderColor: '#0A84FF',
                                backgroundColor: 'rgba(10, 132, 255, 0.1)',
                                borderWidth: 2,
                                fill: true,
                                tension: 0.3,
                                pointRadius: 2,
                                yAxisID: 'y'
                            },
                            {
                                type: 'bar',
                                label: 'Zrealizowane Przychody',
                                data: incRealData,
                                backgroundColor: '#30D158',
                                stack: 'StackInc',
                                borderRadius: 4,
                                yAxisID: 'y1'
                            },
                            {
                                type: 'bar',
                                label: 'Planowane Przychody',
                                data: incPlanData,
                                backgroundColor: 'rgba(48, 209, 88, 0.3)',
                                borderColor: '#30D158',
                                borderWidth: { top: 1, right: 1, bottom: 0, left: 1 },
                                borderDash: [2, 2],
                                stack: 'StackInc',
                                borderRadius: 4,
                                yAxisID: 'y1'
                            },
                            {
                                type: 'bar',
                                label: 'Zrealizowane Wydatki',
                                data: expRealData,
                                backgroundColor: '#FF375F',
                                stack: 'StackExp',
                                borderRadius: 4,
                                yAxisID: 'y1'
                            },
                            {
                                type: 'bar',
                                label: 'Planowane Wydatki',
                                data: expPlanData,
                                backgroundColor: 'rgba(255, 55, 95, 0.3)',
                                borderColor: '#FF375F',
                                borderWidth: { top: 1, right: 1, bottom: 0, left: 1 },
                                borderDash: [2, 2],
                                stack: 'StackExp',
                                borderRadius: 4,
                                yAxisID: 'y1'
                            }
                        ]
                    },
                    options: {
                        responsive: true,
                        maintainAspectRatio: false,
                        interaction: {
                            mode: 'index',
                            intersect: false,
                        },
                        scales: {
                            x: {
                                grid: { color: 'rgba(255,255,255,0.05)' },
                                ticks: { color: '#8B949E', font: { family: 'JetBrains Mono', size: 10 } }
                            },
                            y: {
                                type: 'linear',
                                display: true,
                                position: 'left',
                                grid: { color: 'rgba(255,255,255,0.05)' },
                                ticks: { color: '#0A84FF', font: { family: 'JetBrains Mono', size: 10 } }
                            },
                            y1: {
                                type: 'linear',
                                display: true,
                                position: 'right',
                                grid: { drawOnChartArea: false },
                                ticks: { color: '#8B949E', font: { family: 'JetBrains Mono', size: 10 } }
                            }
                        },
                        plugins: {
                            legend: {
                                labels: { color: '#8B949E', font: { family: 'Inter', size: 11 } }
                            }
                        }
                    }
                });
            }

            function renderMainArea() {
                if(activeCategory.type === 'summary') {
                    return renderSummary();
                }

                const main = document.getElementById('exp-main');
                const catName = activeCategory.name;
                const type = activeCategory.type;

                let catDefs, dbNode;
                if(type === 'expense') { catDefs = EXPENSE_CATS; dbNode = 'expenses'; }
                else if(type === 'income') { catDefs = INCOME_CATS; dbNode = 'incomes'; }
                else if(type === 'investment') { catDefs = INV_CATS; dbNode = 'investments'; }

                const catMeta = catDefs.find(c => c.name === catName);
                const color = catMeta ? catMeta.color : '#8B949E';
                
                const sourceData = type === 'expense' ? allExpenses : (type === 'income' ? allIncomes : allInvestments);
                const items = sourceData[catName] ? Object.entries(sourceData[catName]) : [];
                
                if(type === 'investment') {
                    // Inwestycje - portfel
                    const totalBalance = items.reduce((s, [, e]) => s + (parseFloat(e.balance) || 0), 0);

                    let html = `
                        <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom: 16px; padding-bottom: 12px; border-bottom: 1px solid var(--border-subtle);">
                            <h2 style="font-size: 1.3rem; color: var(--text-primary); font-weight: 600; display:flex; align-items:center; gap: 10px;">
                                <div style="width: 10px; height: 22px; background-color: ${color}; border-radius: 3px;"></div>
                                ${catName} (Inwestycje)
                            </h2>
                        </div>

                        <div class="expense-summary-bar">
                            <div class="expense-summary-card">
                                <span class="label">Suma Aktywów</span>
                                <span class="value" style="color:${color};">${totalBalance.toFixed(2)} zł</span>
                            </div>
                            <div class="expense-summary-card">
                                <span class="label">Aktywne pozycje</span>
                                <span class="value" style="color:var(--text-primary);">${items.length}</span>
                            </div>
                        </div>

                        <div class="expense-add-row">
                            <input type="text" id="inv-name" placeholder="Nazwa aktywa (np. Obligacje EDO)..." style="flex:2;">
                            <input type="number" id="inv-balance" placeholder="Aktualne saldo (zł)" step="0.01" min="0">
                            <button onclick="window.addInvestment('${catName}')"><i data-lucide="plus" style="width:14px; height:14px; vertical-align:middle; margin-right:4px;"></i> Dodaj Aktywo</button>
                        </div>
                    `;

                    if(items.length === 0) {
                        html += `<p style="color:var(--text-secondary); text-align:center; padding: 30px 0;">Brak aktywów w tej kategorii.</p>`;
                    } else {
                        html += `
                            <table class="expense-table">
                                <thead>
                                    <tr>
                                        <th>Nazwa Aktywa</th>
                                        <th style="width:150px;">Ostatnia aktualizacja</th>
                                        <th style="width:200px;">Aktualne Saldo</th>
                                        <th style="width:40px;"></th>
                                    </tr>
                                </thead>
                                <tbody>
                        `;
                        items.sort((a,b) => b[1].updatedAt - a[1].updatedAt).forEach(([key, inv]) => {
                            const dateStr = new Date(inv.updatedAt || Date.now()).toISOString().split('T')[0];
                            html += `
                                <tr>
                                    <td style="font-weight:500;">${inv.name}</td>
                                    <td style="font-family:var(--font-mono); font-size:0.8rem; color:var(--text-secondary);">${dateStr}</td>
                                    <td style="display:flex; gap:8px; align-items:center;">
                                        <input type="number" id="update-bal-${key}" value="${inv.balance}" style="width:100px; background:rgba(0,0,0,0.2); border:1px solid var(--border-subtle); border-radius:4px; padding:4px 8px; color:var(--text-primary); font-family:var(--font-mono); font-weight:600; color:${color};">
                                        <button onclick="window.updateInvestment('${catName}', '${key}')" style="background:none; border:none; color:var(--text-secondary); cursor:pointer;" title="Zapisz nowe saldo"><i data-lucide="save" style="width:16px; height:16px;"></i></button>
                                    </td>
                                    <td>
                                        <button class="expense-delete-btn" onclick="window.deleteItem('${dbNode}', '${catName}', '${key}')" title="Usuń aktywo">
                                            <i data-lucide="trash-2" style="width:14px; height:14px;"></i>
                                        </button>
                                    </td>
                                </tr>
                            `;
                        });
                        html += `</tbody></table>`;
                    }
                    main.innerHTML = html;
                } else {
                    // Przychody / Wydatki
                    items.sort((a, b) => (b[1].date || '').localeCompare(a[1].date || ''));

                    const realTotal = items.filter(e => e[1].realized !== false).reduce((s, e) => s + (parseFloat(e[1].amount) || 0), 0);
                    const planTotal = items.filter(e => e[1].realized === false).reduce((s, e) => s + (parseFloat(e[1].amount) || 0), 0);

                    let html = `
                        <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom: 16px; padding-bottom: 12px; border-bottom: 1px solid var(--border-subtle);">
                            <h2 style="font-size: 1.3rem; color: var(--text-primary); font-weight: 600; display:flex; align-items:center; gap: 10px;">
                                <div style="width: 10px; height: 22px; background-color: ${color}; border-radius: 3px;"></div>
                                ${catName} <span style="font-size:0.8rem; color:var(--text-secondary); font-weight:400;">(${type === 'expense' ? 'Wydatki' : 'Przychody'})</span>
                            </h2>
                        </div>

                        <div class="expense-summary-bar">
                            <div class="expense-summary-card">
                                <span class="label">Suma Zrealizowana</span>
                                <span class="value" style="color:${color};">${realTotal.toFixed(2)} zł</span>
                            </div>
                            <div class="expense-summary-card">
                                <span class="label">Suma Planowana</span>
                                <span class="value" style="color:#FF9F0A;">${planTotal.toFixed(2)} zł</span>
                            </div>
                            <div class="expense-summary-card">
                                <span class="label">Pozycji</span>
                                <span class="value" style="color:var(--text-primary);">${items.length}</span>
                            </div>
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
                    `;

                    if(items.length === 0) {
                        html += `<p style="color:var(--text-secondary); text-align:center; padding: 30px 0;">Brak zapisanych pozycji w tej kategorii.</p>`;
                    } else {
                        html += `
                            <table class="expense-table">
                                <thead>
                                    <tr>
                                        <th>Nazwa</th>
                                        <th style="width:110px;">Kwota</th>
                                        <th style="width:100px;">Data</th>
                                        <th style="width:110px;">Status</th>
                                        <th style="width:90px;">Cykl</th>
                                        <th>Notatka</th>
                                        <th style="width:40px;"></th>
                                    </tr>
                                </thead>
                                <tbody>
                        `;

                        items.forEach(([key, txn]) => {
                            const isRealized = txn.realized !== false;
                            const recurLabel = txn.recurring ? RECURRING_LABELS[txn.recurring] || txn.recurring : '';
                            let recurDetails = recurLabel;
                            if (recurLabel) {
                                if (txn.recurCount) recurDetails += ` (x${txn.recurCount})`;
                                else if (txn.recurEnd) recurDetails += ` (do ${txn.recurEnd})`;
                            }
                            const rowClass = isRealized ? '' : 'row-planned';
                            
                            html += `
                                <tr class="${rowClass}">
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
                                        <button class="expense-delete-btn" onclick="window.editItem('${dbNode}', '${catName}', '${key}')" title="Edytuj pozycję">
                                            <i data-lucide="edit-3" style="width:14px; height:14px;"></i>
                                        </button>
                                        <button class="expense-delete-btn" onclick="window.deleteItem('${dbNode}', '${catName}', '${key}')" title="Usuń pozycję">
                                            <i data-lucide="trash-2" style="width:14px; height:14px;"></i>
                                        </button>
                                    </td>
                                </tr>
                            `;
                        });
                        html += `</tbody></table>`;
                    }
                    main.innerHTML = html;
                }
                if(window.lucide) window.lucide.createIcons();
            }

            // Automatyczne odznaczanie "Zrealizowane" dla dat w przyszłości
            document.addEventListener('change', (e) => {
                if (e.target.id === 'txn-date') {
                    const today = new Date().toISOString().split('T')[0];
                    const realizedCheckbox = document.getElementById('txn-realized');
                    if (realizedCheckbox) {
                        realizedCheckbox.checked = e.target.value <= today;
                    }
                }
            });

            window.editState = null;

            window.editItem = function(dbNode, category, key) {
                const sourceData = dbNode === 'expenses' ? allExpenses : allIncomes;
                if(!sourceData[category] || !sourceData[category][key]) return;
                const txn = sourceData[category][key];
                
                document.getElementById('txn-name').value = txn.name || '';
                document.getElementById('txn-amount').value = txn.amount || '';
                document.getElementById('txn-date').value = txn.date || '';
                document.getElementById('txn-realized').checked = txn.realized !== false;
                document.getElementById('txn-recurring').value = txn.recurring || '';
                
                const opts = document.getElementById('recurring-opts');
                if(opts) {
                    opts.style.display = txn.recurring ? 'flex' : 'none';
                    if(document.getElementById('txn-recur-count')) document.getElementById('txn-recur-count').value = txn.recurCount || '';
                    if(document.getElementById('txn-recur-end')) document.getElementById('txn-recur-end').value = txn.recurEnd || '';
                }

                document.getElementById('txn-note').value = txn.note || '';
                
                const btn = document.getElementById('btn-add-txn');
                if(btn) {
                    btn.innerHTML = '<i data-lucide="save" style="width:14px; height:14px; vertical-align:middle; margin-right:4px;"></i> Zapisz';
                    btn.style.background = '#0A84FF';
                }
                
                window.editState = { dbNode, category, key };
                window.scrollTo({top: 0, behavior: 'smooth'});
                if(window.lucide) window.lucide.createIcons();
            };

            window.addTransaction = function(dbNode, category) {
                const name = document.getElementById('txn-name').value.trim();
                const amount = document.getElementById('txn-amount').value;
                const date = document.getElementById('txn-date').value;
                const realized = document.getElementById('txn-realized').checked;
                const recurring = document.getElementById('txn-recurring').value;
                const recurCount = document.getElementById('txn-recur-count') ? document.getElementById('txn-recur-count').value : '';
                const recurEnd = document.getElementById('txn-recur-end') ? document.getElementById('txn-recur-end').value : '';
                const note = document.getElementById('txn-note').value.trim();

                if(!name || !amount) {
                    document.getElementById('txn-name').style.borderColor = !name ? 'var(--accent-warning)' : '';
                    document.getElementById('txn-amount').style.borderColor = !amount ? 'var(--accent-warning)' : '';
                    return;
                }

                const data = {
                    name: name,
                    amount: parseFloat(amount),
                    date: date || new Date().toISOString().split('T')[0],
                    realized: realized,
                    note: note || '',
                    createdAt: Date.now()
                };
                if(recurring) {
                    data.recurring = recurring;
                    if(recurCount) data.recurCount = parseInt(recurCount);
                    if(recurEnd) data.recurEnd = recurEnd;
                }

                if(window.editState) {
                    delete data.createdAt; // Nie nadpisujemy daty utworzenia
                    db.ref(USER_NODE + window.editState.dbNode + '/' + window.editState.category + '/' + window.editState.key).update(data);
                    window.editState = null;
                    const btn = document.getElementById('btn-add-txn');
                    if(btn) {
                        btn.innerHTML = '<i data-lucide="plus" style="width:14px; height:14px; vertical-align:middle; margin-right:4px;"></i> Dodaj';
                        btn.style.background = 'var(--accent-primary)';
                    }
                } else {
                    db.ref(USER_NODE + dbNode + '/' + category).push().set(data);
                }
                
                // wyczysc pola
                document.getElementById('txn-name').value = '';
                document.getElementById('txn-amount').value = '';
                document.getElementById('txn-note').value = '';
                document.getElementById('txn-recurring').value = '';
                if(document.getElementById('recurring-opts')) document.getElementById('recurring-opts').style.display = 'none';
                if(document.getElementById('txn-recur-count')) document.getElementById('txn-recur-count').value = '';
                if(document.getElementById('txn-recur-end')) document.getElementById('txn-recur-end').value = '';
            };

            window.addInvestment = function(category) {
                const name = document.getElementById('inv-name').value.trim();
                const balance = document.getElementById('inv-balance').value;

                if(!name || !balance) {
                    document.getElementById('inv-name').style.borderColor = !name ? 'var(--accent-warning)' : '';
                    document.getElementById('inv-balance').style.borderColor = !balance ? 'var(--accent-warning)' : '';
                    return;
                }

                const data = {
                    name: name,
                    balance: parseFloat(balance),
                    updatedAt: Date.now()
                };
                db.ref(USER_NODE + 'investments/' + category).push().set(data);
            };

            window.updateInvestment = function(category, key) {
                const val = document.getElementById('update-bal-' + key).value;
                if(!val) return;
                db.ref(USER_NODE + 'investments/' + category + '/' + key).update({
                    balance: parseFloat(val),
                    updatedAt: Date.now()
                });
            };

            window.toggleStatus = function(dbNode, category, key, currentRealized) {
                const newRealized = !currentRealized;
                db.ref(USER_NODE + dbNode + '/' + category + '/' + key).update({
                    realized: newRealized
                }).then(() => {
                    if(newRealized) dismissNotification('expense-' + key);
                });
            };

            window.deleteItem = function(dbNode, category, key) {
                db.ref(USER_NODE + dbNode + '/' + category + '/' + key).remove();
            };
        });