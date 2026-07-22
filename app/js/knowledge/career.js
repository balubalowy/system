// app/js/knowledge/career.js
import { db, USER_NODE } from '../core/firebase.js';

export const CAREER_ROADMAP = [
    {
        id: "phase1",
        title: "Faza 1: Business & Financial Analytics (Stos BI)",
        badge: "Fundament",
        color: "var(--accent-primary, #0A84FF)",
        icon: "layout-dashboard",
        desc: "Opanowanie kluczowych narzędzi analitycznych do pracy w biznesie i finansach (Excel + SQL + Power BI).",
        milestones: [
            { id: "m1_1", text: "Excel Advanced: XLOOKUP, INDEX/MATCH, Tabele Przestawne i pola kalkulowane" },
            { id: "m1_2", text: "Power Query: Import, Unpivot, czyszczenie i przekształcanie danych" },
            { id: "m1_3", text: "SQL Core: SELECT, WHERE, ORDER BY, GROUP BY i klauzula HAVING" },
            { id: "m1_4", text: "SQL Relacyjny: Złączenia INNER/LEFT JOIN, CTE (WITH) oraz funkcje okienkowe (OVER)" },
            { id: "m1_5", text: "Power BI Data Model: Relacje 1:N, schemat gwiazdy (Star Schema) i podstawa DAX" },
            { id: "m1_6", text: "Power BI Dashboards: Tworzenie interaktywnych raportów KPI z Time Intelligence (YTD)" }
        ]
    },
    {
        id: "phase2",
        title: "Faza 2: Python & Data Science (Średniozaawansowany)",
        badge: "Automatyzacja",
        color: "var(--accent-success, #30D158)",
        icon: "code-2",
        desc: "Programowanie skryptowe w Pythonie, manipulacja dużymi zbiorami w Pandas i kursy po angielsku.",
        milestones: [
            { id: "m2_1", text: "Python Core: Składnia, funkcje, dict comprehensions i obsługa błędów try/except" },
            { id: "m2_2", text: "Pandas DataFrames: Wczytywanie CSV/XLSX, filtrowanie loc/iloc oraz agregacje groupby" },
            { id: "m2_3", text: "Wizualizacja Statystyczna: Matplotlib i Seaborn (korelogramy, regplot, heatmapy)" },
            { id: "m2_4", text: "Microsoft Data Science (EN): Czyszczenie danych i cykl życia projektu (Lekcje 1-10)" },
            { id: "m2_5", text: "API & Web Scraping: Pobieranie danych JSON za pomocą requests i parsowanie skryptowe" }
        ]
    },
    {
        id: "phase3",
        title: "Faza 3: Machine Learning & AI Engineering (Zaawansowany)",
        badge: "AI & ML",
        color: "var(--accent-warning, #FF9F0A)",
        icon: "brain-circuit",
        desc: "Budowanie modeli predykcyjnych w Scikit-Learn, uczenie maszynowe i zaawansowane frameworki AI.",
        milestones: [
            { id: "m3_1", text: "Microsoft ML for Beginners (EN): Regresja liniowa/logistyczna i ewaluacja modeli" },
            { id: "m3_2", text: "Scikit-Learn: Klasyfikacja, klastrowanie k-means i analiza szeregów czasowych" },
            { id: "m3_3", text: "AI & RAG: Prompt Engineering z rolami, wektorowe bazy danych i architektura RAG" },
            { id: "m3_4", text: "Frameworki AI: LangChain / LlamaIndex oraz optymalne dostrajanie modeli (LoRA)" },
            { id: "m3_5", text: "OSSU CS & ML Curriculum: Teoria algebry, statystyka bayesowska i głębokie uczenie" }
        ]
    }
];

export function initCareerProgress() {
    const container = document.getElementById('career-progress-container');
    if (!container) return;

    db.ref(USER_NODE + 'career_progress').on('value', snap => {
        const completedMap = snap.val() || {};
        renderCareerRoadmap(container, completedMap);
    });
}

function renderCareerRoadmap(container, completedMap) {
    let totalMilestones = 0;
    let completedCount = 0;

    CAREER_ROADMAP.forEach(phase => {
        totalMilestones += phase.milestones.length;
        phase.milestones.forEach(m => {
            if (completedMap[m.id] === true) completedCount++;
        });
    });

    const totalPct = totalMilestones > 0 ? Math.round((completedCount / totalMilestones) * 100) : 0;
    
    // Określenie bieżącego poziomu kariery
    let currentRank = "Nowicjusz Analityki";
    let rankColor = "var(--text-secondary)";
    if (totalPct >= 85) {
        currentRank = "🔥 Master AI & Data Scientist";
        rankColor = "var(--accent-warning, #FF9F0A)";
    } else if (totalPct >= 50) {
        currentRank = "🐍 Python Data Scientist";
        rankColor = "var(--accent-success, #30D158)";
    } else if (totalPct >= 20) {
        currentRank = "📊 Senior Business & Financial Analyst";
        rankColor = "var(--accent-primary, #0A84FF)";
    } else if (totalPct > 0) {
        currentRank = "📈 Junior Data & BI Analyst";
        rankColor = "var(--accent-primary, #0A84FF)";
    }

    let html = `
        <div style="background: rgba(255, 255, 255, 0.02); border: 1px solid var(--border-subtle); border-radius: var(--radius-md, 12px); padding: 20px; margin-bottom: 24px;">
            <!-- Nagłówek Poziomu Kariery -->
            <div style="display: flex; justify-content: space-between; align-items: center; flex-wrap: wrap; gap: 16px; margin-bottom: 16px;">
                <div>
                    <div style="display: flex; align-items: center; gap: 10px;">
                        <i data-lucide="trophy" style="width: 22px; height: 22px; color: ${rankColor};"></i>
                        <h3 style="font-size: 1.25rem; font-weight: 700; color: var(--text-primary); margin: 0;">System Progresu Kariery</h3>
                        <span style="font-size: 0.75rem; font-weight: 700; color: ${rankColor}; background: rgba(255,255,255,0.05); border: 1px solid ${rankColor}; padding: 2px 10px; border-radius: 20px;">${currentRank}</span>
                    </div>
                    <p style="font-size: 0.85rem; color: var(--text-secondary); margin: 4px 0 0 0;">Ustrukturyzowana ścieżka od Analityka BI do Inżyniera AI & Data Science (English Tech Curriculums)</p>
                </div>
                <div style="text-align: right; min-width: 140px;">
                    <div style="font-size: 1.4rem; font-family: var(--font-mono); font-weight: 700; color: ${rankColor};">${totalPct}%</div>
                    <div style="font-size: 0.75rem; color: var(--text-secondary);">${completedCount} z ${totalMilestones} kamieni milowych</div>
                </div>
            </div>

            <!-- Pasek Całkowitego Postępu -->
            <div style="height: 8px; background: rgba(255, 255, 255, 0.05); border-radius: 4px; overflow: hidden; margin-bottom: 20px;">
                <div style="width: ${totalPct}%; height: 100%; background: ${rankColor}; transition: width 0.4s ease;"></div>
            </div>

            <!-- Karty 3 Faz Kariery -->
            <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(300px, 1fr)); gap: 16px;">
    `;

    CAREER_ROADMAP.forEach((phase, phaseIdx) => {
        let phaseDone = 0;
        phase.milestones.forEach(m => {
            if (completedMap[m.id] === true) phaseDone++;
        });
        const phasePct = Math.round((phaseDone / phase.milestones.length) * 100);

        html += `
            <div style="background: rgba(0, 0, 0, 0.2); border: 1px solid var(--border-subtle); border-radius: 8px; padding: 16px; display: flex; flex-direction: column;">
                <div style="display: flex; justify-content: space-between; align-items: flex-start; margin-bottom: 8px;">
                    <div style="display: flex; align-items: center; gap: 8px;">
                        <div style="width: 28px; height: 28px; border-radius: 6px; background: rgba(255,255,255,0.05); display: flex; align-items: center; justify-content: center; color: ${phase.color};">
                            <i data-lucide="${phase.icon}" style="width: 16px; height: 16px;"></i>
                        </div>
                        <span style="font-size: 0.95rem; font-weight: 600; color: var(--text-primary);">${phase.title}</span>
                    </div>
                </div>
                <p style="font-size: 0.78rem; color: var(--text-secondary); margin: 0 0 12px 0; line-height: 1.4;">${phase.desc}</p>
                
                <div style="display: flex; justify-content: space-between; font-size: 0.75rem; color: var(--text-secondary); margin-bottom: 4px;">
                    <span>Postęp Fazy ${phaseIdx + 1}</span>
                    <span style="font-family: var(--font-mono); color: ${phase.color}; font-weight: 600;">${phasePct}%</span>
                </div>
                <div style="height: 5px; background: rgba(255, 255, 255, 0.05); border-radius: 3px; overflow: hidden; margin-bottom: 12px;">
                    <div style="width: ${phasePct}%; height: 100%; background: ${phase.color}; transition: width 0.3s ease;"></div>
                </div>

                <!-- Lista Kamieni Milowych -->
                <div style="display: flex; flex-direction: column; gap: 6px; margin-top: auto;">
        `;

        phase.milestones.forEach(m => {
            const isChecked = completedMap[m.id] === true;
            html += `
                <label style="display: flex; align-items: flex-start; gap: 8px; font-size: 0.8rem; color: ${isChecked ? 'var(--text-primary)' : 'var(--text-secondary)'}; cursor: pointer; padding: 4px; border-radius: 4px; transition: background 0.2s;" onmouseenter="this.style.background='rgba(255,255,255,0.03)'" onmouseleave="this.style.background='transparent'">
                    <input type="checkbox" data-milestone="${m.id}" ${isChecked ? 'checked' : ''} style="margin-top: 2px; accent-color: ${phase.color}; cursor: pointer;">
                    <span style="line-height: 1.35; ${isChecked ? 'text-decoration: line-through; opacity: 0.6;' : ''}">${m.text}</span>
                </label>
            `;
        });

        html += `
                </div>
            </div>
        `;
    });

    html += `
            </div>
        </div>
    `;

    container.innerHTML = html;
    if (window.lucide) window.lucide.createIcons();

    // Nasłuchiwanie kliknięć checkboxów kamieni milowych
    container.querySelectorAll('input[data-milestone]').forEach(input => {
        input.addEventListener('change', (e) => {
            const mId = e.target.getAttribute('data-milestone');
            const isChecked = e.target.checked;
            db.ref(USER_NODE + 'career_progress/' + mId).set(isChecked);
        });
    });
}
