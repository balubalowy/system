// js/charts.js
import { db, USER_NODE } from '../core/firebase.js';
import { showKnowledgeModal } from '../knowledge/knowledge-modal.js';

const KNOWLEDGE_CATEGORIES = [
    { title: 'Finanse i rachunkowość', color: '#0A84FF' },
    { title: 'Excel i Power BI', color: '#2BBF71' },
    { title: 'Statystyka matematyczna i opisowa', color: '#FF9F0A' },
    { title: 'SQL', color: '#BF5AF2' },
    { title: 'Python', color: '#32ADE6' },
    { title: 'Język Angielski', color: '#FF375F' },
    { title: 'Samorozwój i pewność siebie', color: '#FFD60A' }
];

let skillsChartInstance = null;
let cachedKnowledgeData = {};
let currentSortBy = 'section';

export function initCharts() {
    const canvas = document.getElementById('skillsBarChart');
    if (!canvas) return;

    function renderSkillsChart() {
        const ctxBar = canvas.getContext('2d');
        let itemsList = KNOWLEDGE_CATEGORIES.map((cat, idx) => ({
            title: cat.title,
            color: cat.color,
            level: (cachedKnowledgeData[cat.title] && cachedKnowledgeData[cat.title].level !== undefined)
                ? cachedKnowledgeData[cat.title].level
                : 0,
            sectionOrder: idx
        }));

        if (currentSortBy === 'desc') {
            itemsList.sort((a, b) => b.level - a.level);
        } else if (currentSortBy === 'asc') {
            itemsList.sort((a, b) => a.level - b.level);
        } else if (currentSortBy === 'alpha') {
            itemsList.sort((a, b) => a.title.localeCompare(b.title, 'pl'));
        } else {
            itemsList.sort((a, b) => a.sectionOrder - b.sectionOrder);
        }

        const labels = itemsList.map(i => i.title);
        const data = itemsList.map(i => i.level);
        const bgColors = itemsList.map(i => i.color);

        if (skillsChartInstance) {
            skillsChartInstance.destroy();
        }

        skillsChartInstance = new window.Chart(ctxBar, {
            type: 'bar',
            data: {
                labels: labels,
                datasets: [{
                    label: 'Poziom wiedzy (%)',
                    data: data,
                    backgroundColor: bgColors,
                    borderRadius: 3
                }]
            },
            options: {
                indexAxis: 'y',
                responsive: true,
                maintainAspectRatio: false,
                scales: {
                    x: {
                        min: 0,
                        max: 100,
                        grid: { color: 'rgba(255, 255, 255, 0.05)' },
                        ticks: {
                            color: '#8B949E',
                            font: { family: 'JetBrains Mono' },
                            callback: value => value + '%'
                        }
                    },
                    y: {
                        grid: { display: false },
                        ticks: { color: '#C9D1D9', font: { family: 'Inter', size: 12 } }
                    }
                },
                plugins: {
                    legend: { display: false },
                    tooltip: {
                        callbacks: {
                            label: context => context.parsed.x + '% opanowania'
                        }
                    }
                },
                onClick: (e, activeElements) => {
                    if (activeElements.length > 0) {
                        window.location.href = 'knowledge.html';
                    }
                }
            }
        });
    }

    if (db && USER_NODE) {
        db.ref(USER_NODE + 'knowledge').on('value', snap => {
            cachedKnowledgeData = snap.val() || {};
            renderSkillsChart();
        });
    } else {
        renderSkillsChart();
    }

    const sortSelect = document.getElementById('chart-sort');
    if (sortSelect) {
        sortSelect.onchange = (e) => {
            currentSortBy = e.target.value;
            renderSkillsChart();
        };
    }

    // WYKRES ENERGII Z CHMURY (Wzdłużny)
    const lineCanvas = document.getElementById('energyLineChart');
    if(lineCanvas) {
        db.ref(USER_NODE + 'energy/').once('value').then(snap => {
            const energyData = snap.val();
            if(!energyData) return;
            
            let eLabels = [];
            let eData = [];
            
            const sortedDates = Object.keys(energyData).sort();
            const recentDates = sortedDates.slice(-14);
            
            recentDates.forEach(date => {
                eLabels.push(date.slice(5)); 
                eData.push(energyData[date]);
            });
            
            const ctxLine = lineCanvas.getContext('2d');
            new window.Chart(ctxLine, {
                type: 'line',
                data: {
                    labels: eLabels,
                    datasets: [{
                        label: 'Energia Aktywacji',
                        data: eData,
                        borderColor: '#2F81F7',
                        backgroundColor: 'rgba(47, 129, 247, 0.1)',
                        borderWidth: 2,
                        tension: 0.3,
                        fill: true,
                        pointBackgroundColor: '#2F81F7'
                    }]
                },
                options: {
                    responsive: true,
                    maintainAspectRatio: false,
                    scales: {
                        x: { grid: { display: false }, ticks: { color: '#8B949E', font: { family: 'JetBrains Mono', size: 10 } } },
                        y: { min: 0, max: 10, grid: { color: 'rgba(255, 255, 255, 0.05)' }, ticks: { color: '#8B949E', font: { family: 'JetBrains Mono' } } }
                    },
                    plugins: {
                        legend: { display: false },
                        tooltip: {
                            callbacks: {
                                label: function(context) { return context.parsed.y + ' / 10 Energii'; }
                            }
                        }
                    }
                }
            });
        });
    }
}
