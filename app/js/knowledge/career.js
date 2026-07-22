// app/js/knowledge/career.js
import { db, USER_NODE } from '../core/firebase.js';

export const CAREER_ROADMAP = [
    {
        id: "phase1",
        title: "1. Excel & Dane (Fundament)",
        badge: "Fundament",
        color: "var(--accent-primary, #0A84FF)",
        icon: "sheet",
        goal: "Po tej fazie potrafisz bezbłędnie czyścić, przekształcać i łączyć surowe pliki danych bez używania baz danych.",
        desc: "Opanowanie zaawansowanych funkcji Excela, automatyzacji Power Query i dynamicznych formuł tablicowych.",
        resources: [
            { name: "📁 Otwórz folder programowania", url: "file:///C:/Users/baluk/OneDrive - Uniwersytet Ekonomiczny we Wrocławiu/hanuenane cz. 3/[-] PROGRAMOWANIE" },
            { name: "🔗 GitHub: Excel Formulas Guide", url: "https://github.com/mdeering/excel-formulas" }
        ],
        milestones: [
            { id: "m1_1", text: "Excel Advanced: XLOOKUP, INDEX/MATCH, Tabele Przestawne i pola kalkulowane", est: "~1 tyg." },
            { id: "m1_2", text: "Power Query: Importowanie danych, Unpivot, czyszczenie i przekształcanie kolumn", est: "~1 tyg." },
            { id: "m1_3", text: "Formuły Tablicowe: Dynamiczne tablice FILTER, UNIQUE, SORT i SORTBY", est: "~1 tyg." }
        ]
    },
    {
        id: "phase2",
        title: "2. SQL & Bazy Danych",
        badge: "Bazy Danych",
        color: "var(--accent-info, #54A0FF)",
        icon: "database",
        goal: "Po tej fazie umiesz samodzielnie wyciągać, filtrować i łączyć dane z wielu relacyjnych tabel transakcyjnych do raportu.",
        desc: "Naturalna progresja SQL: od prostej projekcji danych, przez złączenia relacyjne, po zaawansowane funkcje okienkowe.",
        resources: [
            { name: "🎮 SQL Murder Mystery (Gra z zapytaniami)", url: "https://github.com/NUKnightLab/sql-murder-mystery" },
            { name: "🔗 Ultimate SQL Resources Hub", url: "https://github.com/amartinson193/The-Ultimate-List-of-Free-SQL-Resources" },
            { name: "📊 DataWithBaraa SQL Course", url: "https://github.com/BaraaKhatibSalkini/sql-ultimate-course" }
        ],
        milestones: [
            { id: "m2_1", text: "Podstawy SQL: Zapytania SELECT, WHERE, ORDER BY, GROUP BY oraz HAVING", est: "~1-2 tyg." },
            { id: "m2_2", text: "SQL Relacyjny: Złączenia tabel INNER JOIN, LEFT JOIN, RIGHT JOIN i obsługa NULL", est: "~2 tyg." },
            { id: "m2_3", text: "Zaawansowany SQL: Podzapytania, CTE (z klauzulą WITH) oraz funkcje okienkowe (OVER)", est: "~2-3 tyg." }
        ]
    },
    {
        id: "phase3",
        title: "3. Azure & Chmura (Cloud Data Stack)",
        badge: "Chmura Azure",
        color: "var(--accent-secondary, #5E5CE6)",
        icon: "cloud",
        goal: "Po tej fazie rozumiesz architekturę chmury i potrafisz podłączyć się do Azure SQL Database oraz zautomatyzować rury danych w Data Factory.",
        desc: "Fundament chmurowy niezbędny do pracy w dużej skali (Enterprise BI). Bez chmury Power BI działa po omacku przy większych projektach.",
        resources: [
            { name: "☁️ Microsoft AZ-900 Official Repo", url: "https://github.com/MicrosoftLearning/AZ-900T0A-MicrosoftAzureFundamentals" },
            { name: "🔗 Azure Data Factory Samples", url: "https://github.com/Azure/Azure-DataFactory" }
        ],
        milestones: [
            { id: "m3_1", text: "Azure Fundamentals (AZ-900): Koncepcje chmury, usługi IaaS/PaaS/SaaS i zasoby Azure", est: "~2 tyg." },
            { id: "m3_2", text: "Azure SQL Database: Tworzenie, zarządzanie i odczyt chmurowej bazy relacyjnej", est: "~2 tyg." },
            { id: "m3_3", text: "Azure Data Factory (ADF): Automatyzacja przepływów danych (Pipelines, ETL i data orchestration)", est: "~2-3 tyg." }
        ]
    },
    {
        id: "phase4",
        title: "4. Power BI & Business Intelligence",
        badge: "Power BI",
        color: "var(--accent-success, #30D158)",
        icon: "bar-chart-3",
        goal: "Po tej fazie potrafisz zbudować od zera zautomatyzowany, czytelny dashboard KPI z modelowaniem relacji i kalkulacjami DAX.",
        desc: "Nauka Power BI w podziale na rosnącą złożoność: od interfejsu i importu z Azure SQL, po model danych, DAX i publikację z RLS.",
        resources: [
            { name: "🌟 Awesome Power BI Hub", url: "https://github.com/NajiElKotob/Awesome-Power-BI" },
            { name: "📊 MS Power BI Official Samples (.pbix)", url: "https://github.com/microsoft/powerbi-desktop-samples" },
            { name: "⚡ 30 Days of Power BI Learning", url: "https://github.com/Prath-Digital/MS_Power_BI_Practice" }
        ],
        milestones: [
            { id: "m4_1", text: "Interfejs & Import: Pobieranie danych z Azure SQL/Excela i praca w Edytorze Power Query", est: "~1 tyg." },
            { id: "m4_2", text: "Data Model & Star Schema: Tworzenie relacji 1:N, tabele faktów i wymiarów (Kalendarz)", est: "~2 tyg." },
            { id: "m4_3", text: "Podstawy DAX: Tworzenie miar z SUM, CALCULATE, ALL, FILTER i ALLEXCEPT", est: "~2 tyg." },
            { id: "m4_4", text: "Time Intelligence & Dashboards: Miary YTD/QTD, zakłady, RLS Security i publikacja raportu", est: "~2 tyg." }
        ]
    },
    {
        id: "phase5",
        title: "5. Python & Data Analytics",
        badge: "Python",
        color: "var(--accent-warning, #FF9F0A)",
        icon: "code-2",
        goal: "Po tej fazie umiesz pisać własne skrypts automatyzacji, analizować duże ramki danych w Pandas i zbierać dane przez API/Scraping.",
        desc: "Programowanie analityczne w Pythonie: od składni i operacji na plikach, przez manipulację w Pandas, po zaawansowane zbieranie danych z sieci.",
        resources: [
            { name: "📁 MS Data Science (Lokalny folder)", url: "file:///C:/Users/baluk/OneDrive - Uniwersytet Ekonomiczny we Wrocławiu/hanuenane cz. 3/[-] PROGRAMOWANIE/Data-Science-For-Beginners-main/Data-Science-For-Beginners-main" },
            { name: "🔗 MS Data Science (GitHub)", url: "https://github.com/microsoft/Data-Science-For-Beginners" }
        ],
        milestones: [
            { id: "m5_1", text: "Python Core: Składnia, pętle, funkcje, dict comprehensions i obsługa try/except", est: "~2 tyg." },
            { id: "m5_2", text: "Pandas DataFrames: Wczytywanie CSV/XLSX, filtrowanie loc/iloc oraz agregacje groupby", est: "~2 tyg." },
            { id: "m5_3", text: "Wizualizacja Statystyczna: Matplotlib i Seaborn (korelogramy, regplot, heatmapy)", est: "~1-2 tyg." },
            { id: "m5_4", text: "Microsoft Data Science (EN): Czyszczenie danych i cykl życia projektu (Lekcje 1-10)", est: "~3 tyg." },
            { id: "m5_5", text: "Scraping & API: Pobieranie danych JSON przez requests oraz parsowanie tekstowe", est: "~2-3 tyg." }
        ]
    },
    {
        id: "phase6",
        title: "6. Machine Learning (Podstawy)",
        badge: "Machine Learning",
        color: "var(--accent-danger, #FF375F)",
        icon: "activity",
        goal: "Po tej fazie umiesz trenować i ewaluować podstawowe modele uczenia maszynowego w Scikit-Learn do prognozowania i klasyfikacji.",
        desc: "Wejście w uczenie maszynowe przed AI Engineering: nauka innego sposobu myślenia (statystyka predykcyjna zamiast prostego kodowania).",
        resources: [
            { name: "📁 MS Machine Learning (Lokalny folder)", url: "file:///C:/Users/baluk/OneDrive - Uniwersytet Ekonomiczny we Wrocławiu/hanuenane cz. 3/[-] PROGRAMOWANIE/ML-For-Beginners-main/ML-For-Beginners-main" },
            { name: "🔗 MS Machine Learning (GitHub)", url: "https://github.com/microsoft/ML-For-Beginners" }
        ],
        milestones: [
            { id: "m6_1", text: "Microsoft ML for Beginners (EN): Wprowadzenie do uczenia z nadzorem i bez nadzoru", est: "~2 tyg." },
            { id: "m6_2", text: "Regresja & Przewidywanie: Regresja liniowa, wieloraka i wskaźniki R^2 / MAE / RMSE", est: "~2 tyg." },
            { id: "m6_3", text: "Klasyfikacja & Klastrowanie: Drzewa decyzyjne, macierz pomyłek (Confusion Matrix) i k-means", est: "~3 tyg." }
        ]
    },
    {
        id: "phase7",
        title: "7. AI Engineering & Advanced",
        badge: "AI Engineering",
        color: "var(--accent-purple, #BF5AF2)",
        icon: "brain-circuit",
        goal: "Po tej fazie potrafisz budować własne aplikacje wykorzystujące RAG, agentów AI oraz rozumiesz głęboką teorię z OSSU Computer Science.",
        desc: "Zaawansowany etap AI: architektoniczne łączenie modeli językowych z bazami wektorowymi, dostrajaniem wag i teorią akademicką.",
        resources: [
            { name: "📁 OSSU Computer Science (Lokalny folder)", url: "file:///C:/Users/baluk/OneDrive - Uniwersytet Ekonomiczny we Wrocławiu/hanuenane cz. 3/[-] PROGRAMOWANIE/computer-science-master/computer-science-master" },
            { name: "🔗 OSSU Computer Science (GitHub)", url: "https://github.com/ossu/computer-science" },
            { name: "📁 ML Curriculum (Lokalny folder)", url: "file:///C:/Users/baluk/OneDrive - Uniwersytet Ekonomiczny we Wrocławiu/hanuenane cz. 3/[-] PROGRAMOWANIE/machine-learning-curriculum-master/machine-learning-curriculum-master" }
        ],
        milestones: [
            { id: "m7_1", text: "Prompt Engineering & AI: Role systemowe, eliminacja halucynacji i nadrzędny kontekst", est: "~1-2 tyg." },
            { id: "m7_2", text: "RAG & Bazy Wektorowe: Architektura Chunking -> Embeddings -> Vector Search", est: "~3 tyg." },
            { id: "m7_3", text: "Frameworki AI: LangChain / LlamaIndex oraz optymalne dostrajanie modeli (LoRA / QLoRA)", est: "~3-4 tyg." },
            { id: "m7_4", text: "OSSU CS & ML Curriculum: Teoria algebry liniowej, statystyka bayesowska i głębokie uczenie", est: "~2-3 mies." }
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
    
    let currentRank = "Nowicjusz Analityki (Excel & Power Query)";
    let rankColor = "var(--text-secondary)";
    
    if (totalPct >= 86) {
        currentRank = "🔥 Master AI & Cloud Architect";
        rankColor = "var(--accent-purple, #BF5AF2)";
    } else if (totalPct >= 72) {
        currentRank = "🤖 Machine Learning Engineer";
        rankColor = "var(--accent-danger, #FF375F)";
    } else if (totalPct >= 58) {
        currentRank = "🐍 Python Data Scientist";
        rankColor = "var(--accent-warning, #FF9F0A)";
    } else if (totalPct >= 43) {
        currentRank = "📈 Senior Power BI & Business Analyst";
        rankColor = "var(--accent-success, #30D158)";
    } else if (totalPct >= 29) {
        currentRank = "☁️ Azure Cloud & BI Developer";
        rankColor = "var(--accent-secondary, #5E5CE6)";
    } else if (totalPct >= 15) {
        currentRank = "📊 SQL Data Specialist";
        rankColor = "var(--accent-info, #54A0FF)";
    } else if (totalPct > 0) {
        currentRank = "📂 Excel & Data Analyst";
        rankColor = "var(--accent-primary, #0A84FF)";
    }

    let html = `
        <div style="background: rgba(255, 255, 255, 0.02); border: 1px solid var(--border-subtle); border-radius: var(--radius-md, 12px); padding: 20px; margin-bottom: 24px;">
            <!-- Nagłówek Poziomu Kariery -->
            <div style="display: flex; justify-content: space-between; align-items: center; flex-wrap: wrap; gap: 16px; margin-bottom: 16px;">
                <div>
                    <div style="display: flex; align-items: center; gap: 10px;">
                        <i data-lucide="trophy" style="width: 22px; height: 22px; color: ${rankColor};"></i>
                        <h3 style="font-size: 1.25rem; font-weight: 700; color: var(--text-primary); margin: 0;">7-Etapowy System Progresu Kariery</h3>
                        <span style="font-size: 0.75rem; font-weight: 700; color: ${rankColor}; background: rgba(255,255,255,0.05); border: 1px solid ${rankColor}; padding: 3px 12px; border-radius: 20px;">${currentRank}</span>
                    </div>
                    <p style="font-size: 0.85rem; color: var(--text-secondary); margin: 6px 0 0 0;">Spójna progresja trudności: Excel ➔ SQL ➔ Azure ➔ Power BI ➔ Python ➔ ML ➔ AI Engineering</p>
                </div>
                <div style="text-align: right; min-width: 140px;">
                    <div style="font-size: 1.4rem; font-family: var(--font-mono); font-weight: 700; color: ${rankColor};">${totalPct}%</div>
                    <div style="font-size: 0.75rem; color: var(--text-secondary);">${completedCount} z ${totalMilestones} kamieni milowych</div>
                </div>
            </div>

            <!-- Pasek Całkowitego Postępu -->
            <div style="height: 8px; background: rgba(255, 255, 255, 0.05); border-radius: 4px; overflow: hidden; margin-bottom: 24px;">
                <div style="width: ${totalPct}%; height: 100%; background: ${rankColor}; transition: width 0.4s ease;"></div>
            </div>

            <!-- Karty 7 Faz Kariery -->
            <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(320px, 1fr)); gap: 16px;">
    `;

    CAREER_ROADMAP.forEach((phase, phaseIdx) => {
        let phaseDone = 0;
        phase.milestones.forEach(m => {
            if (completedMap[m.id] === true) phaseDone++;
        });
        const phasePct = Math.round((phaseDone / phase.milestones.length) * 100);

        html += `
            <div style="background: rgba(0, 0, 0, 0.2); border: 1px solid var(--border-subtle); border-radius: 10px; padding: 18px; display: flex; flex-direction: column;">
                <div style="display: flex; justify-content: space-between; align-items: flex-start; margin-bottom: 8px;">
                    <div style="display: flex; align-items: center; gap: 8px;">
                        <div style="width: 28px; height: 28px; border-radius: 6px; background: rgba(255,255,255,0.05); display: flex; align-items: center; justify-content: center; color: ${phase.color}; flex-shrink: 0;">
                            <i data-lucide="${phase.icon}" style="width: 16px; height: 16px;"></i>
                        </div>
                        <span style="font-size: 0.95rem; font-weight: 700; color: var(--text-primary);">${phase.title}</span>
                    </div>
                </div>

                <!-- Cel Praktyczny / Rezultat -->
                <div style="background: rgba(255,255,255,0.02); border-left: 3px solid ${phase.color}; padding: 8px 10px; border-radius: 0 4px 4px 0; margin-bottom: 12px;">
                    <div style="font-size: 0.72rem; font-weight: 700; color: ${phase.color}; text-transform: uppercase; letter-spacing: 0.04em; margin-bottom: 2px;">Sprawdzalny Rezultat:</div>
                    <div style="font-size: 0.78rem; color: var(--text-primary); line-height: 1.35;">${phase.goal}</div>
                </div>

                <div style="display: flex; justify-content: space-between; font-size: 0.75rem; color: var(--text-secondary); margin-bottom: 4px;">
                    <span>Postęp Fazy ${phaseIdx + 1}</span>
                    <span style="font-family: var(--font-mono); color: ${phase.color}; font-weight: 600;">${phasePct}%</span>
                </div>
                <div style="height: 5px; background: rgba(255, 255, 255, 0.05); border-radius: 3px; overflow: hidden; margin-bottom: 12px;">
                    <div style="width: ${phasePct}%; height: 100%; background: ${phase.color}; transition: width 0.3s ease;"></div>
                </div>

                <!-- Zasoby & Linki do Folderów / GitHub -->
                ${phase.resources && phase.resources.length > 0 ? `
                    <div style="display: flex; flex-wrap: wrap; gap: 6px; margin-bottom: 14px; padding-bottom: 10px; border-bottom: 1px dashed var(--border-subtle);">
                        ${phase.resources.map(res => `
                            <a href="${res.url}" target="_blank" rel="noopener" style="font-size: 0.73rem; color: var(--text-primary); background: rgba(255,255,255,0.04); border: 1px solid var(--border-subtle); padding: 3px 8px; border-radius: 4px; text-decoration: none; display: flex; align-items: center; gap: 4px; transition: background 0.2s;" onmouseenter="this.style.background='rgba(255,255,255,0.08)'" onmouseleave="this.style.background='rgba(255,255,255,0.04)'">
                                <span>${res.name}</span>
                            </a>
                        `).join('')}
                    </div>
                ` : ''}

                <!-- Lista Kamieni Milowych z Estymacją Czasu -->
                <div style="display: flex; flex-direction: column; gap: 8px; margin-top: auto;">
        `;

        phase.milestones.forEach(m => {
            const isChecked = completedMap[m.id] === true;
            html += `
                <label style="display: flex; align-items: flex-start; justify-content: space-between; gap: 8px; font-size: 0.8rem; color: ${isChecked ? 'var(--text-primary)' : 'var(--text-secondary)'}; cursor: pointer; padding: 4px; border-radius: 4px; transition: background 0.2s;" onmouseenter="this.style.background='rgba(255,255,255,0.03)'" onmouseleave="this.style.background='transparent'">
                    <div style="display: flex; align-items: flex-start; gap: 8px; flex: 1;">
                        <input type="checkbox" data-milestone="${m.id}" ${isChecked ? 'checked' : ''} style="margin-top: 2px; accent-color: ${phase.color}; cursor: pointer; flex-shrink: 0;">
                        <span style="line-height: 1.35; ${isChecked ? 'text-decoration: line-through; opacity: 0.6;' : ''}">${m.text}</span>
                    </div>
                    <span style="font-size: 0.7rem; font-family: var(--font-mono); color: var(--text-secondary); opacity: 0.75; white-space: nowrap; flex-shrink: 0; padding-top: 1px;">⏱️ ${m.est}</span>
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

    // Nasłuchiwanie zmian w checkboxach
    container.querySelectorAll('input[data-milestone]').forEach(input => {
        input.addEventListener('change', (e) => {
            const mId = e.target.getAttribute('data-milestone');
            const isChecked = e.target.checked;
            db.ref(USER_NODE + 'career_progress/' + mId).set(isChecked);
        });
    });
}
