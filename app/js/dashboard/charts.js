// js/charts.js
import { db, USER_NODE } from '../core/firebase.js';
import { showKnowledgeModal } from '../knowledge/knowledge-modal.js';

const CATEGORY_COLORS = {
    "Matematyka & Statystyka": "#2F81F7", 
    "Ekonomia & Finanse": "#3FB950",      
    "Technologie & Analityka": "#A371F7", 
    "Języki & Komunikacja": "#D29922",    
    "Specjalistyczne & Rozwój": "#F85149" 
};

let skillsChartInstance = null;

export function initCharts() {
    function buildSkillsChart(sortBy = 'section') {
        const areas = window.appData ? window.appData.knowledgeAreas : null;
        const canvas = document.getElementById('skillsBarChart');
        if(!areas || !canvas) return; // Fail-safe
        const ctxBar = canvas.getContext('2d');
        
        let itemsList = [];
        let keyIdx = 0;
        for (const key in areas) {
            const categoryColor = CATEGORY_COLORS[areas[key].title] || "#8B949E";
            areas[key].items.forEach((item, indexWithinCategory) => {
                itemsList.push({
                    title: item.title,
                    level: item.level,
                    color: categoryColor,
                    parentTopic: areas[key].title,
                    sectionOrder: keyIdx * 1000 + indexWithinCategory
                });
            });
            keyIdx++;
        }

        if (sortBy === 'desc') {
            itemsList.sort((a, b) => b.level - a.level);
        } else if (sortBy === 'asc') {
            itemsList.sort((a, b) => a.level - b.level);
        } else if (sortBy === 'alpha') {
            itemsList.sort((a, b) => a.title.localeCompare(b.title, 'pl'));
        } else if (sortBy === 'priority') {
            const customPriorityOrder = [
                "wycena spółek (corporate finance)", "finanse", "rachunkowość", "rachunkowość finansowa", "rynki finansowe",
                "python", "python (pandas/numpy)", "sql", "bazy danych (sql)", "r (język programowania)", "power bi / r", "excel", "excel zaawansowany", "vba", "power bi", "automatyzacja (vba)", "ai (sztuczna inteligencja)",
                "statystyka opisowa", "statystyka matematyczna", "matematyka", "algebra liniowa", "matematyka wyższa", "rachunek prawdopodobieństwa",
                "język angielski", "angielski (biznesowy)", "język hiszpański", "samorozwój i ogarnianie życia (by było git)", "tworzenie systemowe i planowanie", "samorozwój i ogarnianie życia", "samorozwój", "kognitywistyka / adhd", "meteorologia"
            ];
            itemsList.sort((a, b) => {
                let idxA = customPriorityOrder.findIndex(p => a.title.toLowerCase().includes(p) || p.includes(a.title.toLowerCase()));
                let idxB = customPriorityOrder.findIndex(p => b.title.toLowerCase().includes(p) || p.includes(b.title.toLowerCase()));
                if (idxA === -1) idxA = 999;
                if (idxB === -1) idxB = 999;
                return idxA - idxB;
            });
        } else {
            itemsList.sort((a, b) => a.sectionOrder - b.sectionOrder);
        }

        let labels = [];
        let data = [];
        let bgColors = [];
        let modalDataMap = [];

        itemsList.forEach(item => {
            labels.push(item.title);
            data.push(item.level);
            bgColors.push(item.color);
            modalDataMap.push({
                categoryTitle: item.title,
                baseColor: item.color,
                currentLevel: item.level,
                parentTopic: item.parentTopic
            });
        });

        const legendContainer = document.getElementById('skills-legend');
        if(legendContainer) {
            legendContainer.innerHTML = '';
            labels.forEach((lbl, idx) => {
                legendContainer.innerHTML += `<span style="display:flex; align-items:center; gap:4px;"><span style="width:8px; height:8px; border-radius:50%; background:${bgColors[idx]};"></span> ${lbl} <span style="font-family:var(--font-mono); opacity:0.5; margin-left:2px;">(${data[idx]}%)</span></span>`;
            });
        }

        if (skillsChartInstance) {
            skillsChartInstance.destroy();
        }

        skillsChartInstance = new window.Chart(ctxBar, {
            type: 'bar',
            data: {
                labels: labels,
                datasets: [{
                    label: 'Poziom wiedzy / Umiejętności (%)',
                    data: data,
                    backgroundColor: bgColors,
                    borderRadius: 2
                }]
            },
            options: {
                indexAxis: 'y',
                responsive: true,
                maintainAspectRatio: false,
                scales: {
                    x: { max: 100, grid: { color: 'rgba(255, 255, 255, 0.05)' }, ticks: { color: '#8B949E', font: { family: 'JetBrains Mono' }, callback: function(value) { return value + '%'; } } },
                    y: { grid: { display: false }, ticks: { color: '#C9D1D9', font: { family: 'Inter', size: 11 } } }
                },
                plugins: {
                    legend: { display: false },
                    tooltip: {
                        callbacks: {
                            label: function(context) { return context.parsed.x + '%'; }
                        }
                    }
                },
                onClick: (e, activeElements) => {
                    if (activeElements.length > 0) {
                        const idx = activeElements[0].index;
                        const meta = modalDataMap[idx];
                        showKnowledgeModal(meta);
                    }
                }
            }
        });
    }

    buildSkillsChart('section');

    const sortSelect = document.getElementById('chart-sort');
    if (sortSelect) {
        sortSelect.onchange = (e) => {
            buildSkillsChart(e.target.value);
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
