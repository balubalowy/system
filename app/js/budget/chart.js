// app/js/budget/chart.js
// Obsługa wykresu przepływów finansowych i salda skumulowanego w Chart.js

let summaryChart = null;

function calculateMonthlyAggregates(allItems) {
    const monthlyData = {};
    let minMonth = '9999-99';
    let maxMonth = '0000-00';

    allItems.forEach(item => {
        if (!item.date) return;
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
        } else if (item.type === 'income') {
            if (isReal) monthlyData[monthKey].incReal += amt;
            else monthlyData[monthKey].incPlan += amt;
        }
    });

    return { monthlyData, minMonth, maxMonth };
}

function buildContinuousTimeline(minMonth, maxMonth, horizonMonths, monthlyData) {
    const now = new Date();
    const horizonEndDate = new Date(now.getFullYear(), now.getMonth() + horizonMonths, now.getDate());
    const horizonEndMonth = horizonEndDate.toISOString().substring(0, 7);
    const resolvedMax = maxMonth < horizonEndMonth ? horizonEndMonth : maxMonth;

    const labels = [];
    if (minMonth !== '9999-99' && resolvedMax !== '0000-00') {
        const currentD = new Date(minMonth + '-01');
        const endD = new Date(resolvedMax + '-01');
        while (currentD <= endD) {
            const m = currentD.toISOString().substring(0, 7);
            labels.push(m);
            if (!monthlyData[m]) {
                monthlyData[m] = { expReal: 0, expPlan: 0, incReal: 0, incPlan: 0 };
            }
            currentD.setMonth(currentD.getMonth() + 1);
        }
    }
    return labels;
}

function buildChartDatasets(labels, monthlyData) {
    const series = { incReal: [], incPlan: [], expReal: [], expPlan: [], balance: [] };
    let runningBalance = 0;

    labels.forEach(m => {
        const item = monthlyData[m];
        series.incReal.push(item.incReal);
        series.incPlan.push(item.incPlan);
        series.expReal.push(item.expReal);
        series.expPlan.push(item.expPlan);

        runningBalance += ((item.incReal + item.incPlan) - (item.expReal + item.expPlan));
        series.balance.push(runningBalance);
    });
    return series;
}

function createChartConfig(labels, series) {
    return {
        type: 'bar',
        data: {
            labels,
            datasets: [
                {
                    type: 'line', label: 'Skumulowany Bilans (zł)', data: series.balance,
                    borderColor: '#0A84FF', backgroundColor: 'rgba(10, 132, 255, 0.1)',
                    borderWidth: 2, fill: true, tension: 0.3, pointRadius: 2, yAxisID: 'y'
                },
                {
                    type: 'bar', label: 'Zrealizowane Przychody', data: series.incReal,
                    backgroundColor: '#30D158', stack: 'StackInc', borderRadius: 4, yAxisID: 'y1'
                },
                {
                    type: 'bar', label: 'Planowane Przychody', data: series.incPlan,
                    backgroundColor: 'rgba(48, 209, 88, 0.3)', borderColor: '#30D158',
                    borderWidth: { top: 1, right: 1, bottom: 0, left: 1 }, borderDash: [2, 2],
                    stack: 'StackInc', borderRadius: 4, yAxisID: 'y1'
                },
                {
                    type: 'bar', label: 'Zrealizowane Wydatki', data: series.expReal,
                    backgroundColor: '#FF375F', stack: 'StackExp', borderRadius: 4, yAxisID: 'y1'
                },
                {
                    type: 'bar', label: 'Planowane Wydatki', data: series.expPlan,
                    backgroundColor: 'rgba(255, 55, 95, 0.3)', borderColor: '#FF375F',
                    borderWidth: { top: 1, right: 1, bottom: 0, left: 1 }, borderDash: [2, 2],
                    stack: 'StackExp', borderRadius: 4, yAxisID: 'y1'
                }
            ]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            interaction: { mode: 'index', intersect: false },
            scales: {
                x: {
                    grid: { color: 'rgba(255,255,255,0.05)' },
                    ticks: { color: '#8B949E', font: { family: 'JetBrains Mono', size: 10 }, autoSkip: true, maxTicksLimit: 24, maxRotation: 45, minRotation: 0 }
                },
                y: {
                    type: 'linear', display: true, position: 'left',
                    grid: { color: 'rgba(255,255,255,0.05)' },
                    ticks: { color: '#0A84FF', font: { family: 'JetBrains Mono', size: 10 } }
                },
                y1: {
                    type: 'linear', display: true, position: 'right',
                    grid: { drawOnChartArea: false },
                    ticks: { color: '#8B949E', font: { family: 'JetBrains Mono', size: 10 } }
                }
            },
            plugins: { legend: { labels: { color: '#8B949E', font: { family: 'Inter', size: 11 } } } }
        }
    };
}

export function renderBudgetChart(expFlat, incFlat, activeHorizonMonths) {
    const canvas = document.getElementById('budgetChart');
    if (!canvas) return;

    const { monthlyData, minMonth, maxMonth } = calculateMonthlyAggregates([...expFlat, ...incFlat]);
    const labels = buildContinuousTimeline(minMonth, maxMonth, activeHorizonMonths, monthlyData);
    const series = buildChartDatasets(labels, monthlyData);

    if (summaryChart) {
        summaryChart.destroy();
    }
    const ctx = canvas.getContext('2d');
    summaryChart = new Chart(ctx, createChartConfig(labels, series));
}
