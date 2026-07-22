// app/js/knowledge/career.js
import { db, USER_NODE } from '../core/firebase.js';

export const CAREER_ROADMAP = [
    {
        id: "phase0",
        title: "0. Matematyka & Statystyka (Fundament Analityczny)",
        badge: "Math & Stats",
        color: "#5856D6",
        icon: "calculator",
        goal: "Po tej fazie potrafisz interpretować rozkłady, wnioskować statystycznie z próby, obliczać korelacje i rozumieć macierzowe operacje na wielowymiarowych zbiorach danych.",
        desc: "Ścisłe podstawy ilościowe niezbędne do prawidłowej interpretacji wyników biznesowych, wnioskowania i późniejszego zrozumienia algorytmów ML.",
        resources: [
            { name: "📚 [Baza B-Core] Matematyka & Statystyka", url: "knowledge.html" }
        ],
        milestones: [
            { id: "m0_1", text: "Statystyka Opisowa: Średnia, mediana, odchylenie standardowe i kwartyle", est: "8-10h", test: "Oblicz i zinterpretuj różnicę między średnią a medianą na zbiorze z wartościami odstającymi." },
            { id: "m0_2", text: "Korelacja & Asymetria: Współczynniki korelacji Pearsona/Spearmana i skośność", est: "6-8h", test: "Wyznacz korelację dwóch zmiennych i sprawdź czy relacja jest liniowa." },
            { id: "m0_3", text: "Rachunek Prawdopodobieństwa: Zdarzenia losowe, prawdopodobieństwo warunkowe i wzór Bayesa", est: "10-12h", test: "Rozwiąż zadanie z twierdzenia Bayesa dla testu diagnostycznego." },
            { id: "m0_4", text: "Rozkłady Prawdopodobieństwa: Rozkład normalny, standaryzacja Z-Score i reguła 3-sigm", est: "8-10h", test: "Oblicz prawdopodobieństwo wystąpienia wartości wyższej niż 2 odchylenia standardowe." },
            { id: "m0_5", text: "Statystyka Matematyczna: Testowanie hipotez (p-value, test t, Chi-kwadrat) i przedziały ufności", est: "12-15h", test: "Przeprowadź test t-Studenta dla dwóch prób i zinterpretuj wartość p-value." },
            { id: "m0_6", text: "Algebra Liniowa: Wektory, operacje macierzowe (dodawanie, mnożenie, transpozycja)", est: "10-12h", test: "Wykonaj mnożenie macierzy 3x2 przez 2x3." },
            { id: "m0_7", text: "Analiza Wielowymiarowa: Standaryzacja danych oraz redukcja wymiarowości (PCA)", est: "12-15h", test: "Zredukuj 5-wymiarowy zbiór danych do 2 głównych składowych z zachowaniem wariancji." },
            { id: "m0_8", text: "Analiza Skupień: Algorytmy grupowania danych (K-Means, podział na klastry)", est: "10-12h", test: "Dokonaj segmentacji obiektów na 3 skupienia i opisz profile klastrów." }
        ]
    },
    {
        id: "phase1",
        title: "1. Excel & Dane (Fundament)",
        badge: "Excel & PQ",
        color: "#0A84FF",
        icon: "sheet",
        goal: "Po tej fazie potrafisz bezbłędnie czyścić, przekształcać i łączyć surowe pliki danych bez używania baz danych.",
        desc: "Opanowanie zaawansowanych funkcji Excela, automatyzacji Power Query i dynamicznych formuł tablicowych.",
        resources: [
            { name: "📁 [Folder Lokalny] Programowanie", url: "file:///C:/Users/baluk/OneDrive - Uniwersytet Ekonomiczny we Wrocławiu/hanuenane cz. 3/[-] PROGRAMOWANIE" },
            { name: "🔗 [GitHub Repo] Excel Formulas Guide", url: "https://github.com/mdeering/excel-formulas" }
        ],
        milestones: [
            { id: "m1_1", text: "Wyszukiwanie Danych: Funkcje XLOOKUP oraz INDEX/MATCH w trudnych układach", est: "6-8h", test: "Połącz dwie tabele po 2 kluczach wyszukiwania bez stosowania VLOOKUP." },
            { id: "m1_2", text: "Tabele Przestawne: Tworzenie tabel przestawnych, pól kalkulowanych i fragmentatorów", est: "6-8h", test: "Stwórz raport sprzedaży z podziałem na regiony i wylicz udział procentowy." },
            { id: "m1_3", text: "Power Query Transform: Import plików, rozdzielanie kolumn i operacja Unpivot", est: "8-10h", test: "Przekształć szeroką tabelę miesięczną (Pivot) w wąską strukturę bazodanową." },
            { id: "m1_4", text: "Formuły Tablicowe: Dynamiczne funkcje FILTER, UNIQUE, SORT i SORTBY", est: "6-8h", test: "Zbuduj dynamiczną listę unikalnych klientów spełniających warunek obrotu." }
        ]
    },
    {
        id: "phase2",
        title: "2. SQL & Bazy Danych",
        badge: "SQL Relacyjny",
        color: "#30D158",
        icon: "database",
        goal: "Po tej fazie umiesz samodzielnie wyciągać, filtrować i łączyć dane z wielu relacyjnych tabel transakcyjnych do raportu.",
        desc: "Naturalna progresja SQL: od prostej projekcji danych, przez złączenia relacyjne, po zaawansowane funkcje okienkowe.",
        resources: [
            { name: "🎮 [Praktyczna Gra] SQL Murder Mystery", url: "https://github.com/NUKnightLab/sql-murder-mystery" },
            { name: "🔗 [GitHub Repo] Ultimate SQL Resources Hub", url: "https://github.com/amartinson193/The-Ultimate-List-of-Free-SQL-Resources" },
            { name: "📚 [GitHub Kurs] DataWithBaraa SQL Course", url: "https://github.com/BaraaKhatibSalkini/sql-ultimate-course" }
        ],
        milestones: [
            { id: "m2_1", text: "Podstawy Zapytania: SELECT, WHERE, ORDER BY, GROUP BY oraz HAVING", est: "8-10h", test: "Napisz zapytanie zwracające kategorie z wartością sprzedaży wyższą niż 10,000 PLN." },
            { id: "m2_2", text: "Relacyjne Złączenia: INNER JOIN, LEFT JOIN, RIGHT JOIN i obsługa NULL", est: "10-12h", test: "Znajdź wszystkich klientów, którzy nie złożyli żadnego zamówienia (WHERE IS NULL)." },
            { id: "m2_3", text: "Podzapytania & CTE: Czytelna struktura zapytań z użyciem klauzuli WITH", est: "10-12h", test: "Stwórz CTE wyliczające średnią wartość transakcji i połącz je z tabelą główną." },
            { id: "m2_4", text: "Funkcje Okienkowe: Analityczne funkcje ROW_NUMBER, RANK, DENSE_RANK i OVER", est: "12-15h", test: "Wyznacz 3 najwyższe transakcje dla każdego klienta osobno za pomocą ROW_NUMBER()." }
        ]
    },
    {
        id: "phase3",
        title: "3. Azure & Chmura (Cloud Data Stack)",
        badge: "Chmura Azure",
        color: "#00C7BE",
        icon: "cloud",
        goal: "Po tej fazie rozumiesz architekturę chmury i potrafisz podłączyć się do Azure SQL Database oraz zautomatyzować rury danych w Data Factory.",
        desc: "Fundament chmurowy niezbędny do pracy w dużej skali (Enterprise BI). Bez chmury Power BI działa po omacku przy większych projektach.",
        resources: [
            { name: "📚 [Oficjalny GitHub] Microsoft AZ-900", url: "https://github.com/MicrosoftLearning/AZ-900T0A-MicrosoftAzureFundamentals" },
            { name: "🔗 [GitHub Repo] Azure Data Factory Samples", url: "https://github.com/Azure/Azure-DataFactory" }
        ],
        milestones: [
            { id: "m3_1", text: "Azure Fundamentals: Koncepcje chmury, usługi IaaS/PaaS/SaaS i zasoby Azure (AZ-900)", est: "10-12h", test: "Wyjaśnij różnicę między Azure SQL Database a maszyną wirtualną z SQL Server." },
            { id: "m3_2", text: "Azure SQL Database: Konfiguracja, nawiązanie połączenia i uprawnienia bazodanowe", est: "10-12h", test: "Skonfiguruj zaporę Azure SQL i połącz się z chmurą poprzez SSMS / DBeaver." },
            { id: "m3_3", text: "Azure Data Factory (ADF): Automatyzacja przepływów danych, Pipelines & Copy Activity", est: "15-20h", test: "Zbuduj potok ADF kopiujący plik z Blob Storage do tabeli Azure SQL." }
        ]
    },
    {
        id: "phase4",
        title: "4. Power BI & Business Intelligence",
        badge: "Power BI",
        color: "#FF9F0A",
        icon: "bar-chart-3",
        goal: "Po tej fazie potrafisz zbudować od zera zautomatyzowany, czytelny dashboard KPI z modelowaniem relacji i kalkulacjami DAX.",
        desc: "Nauka Power BI w podziale na rosnącą złożoność: od interfejsu i importu z Azure SQL, po model danych, DAX i publikację z RLS.",
        resources: [
            { name: "🌟 [GitHub Repo] Awesome Power BI Hub", url: "https://github.com/NajiElKotob/Awesome-Power-BI" },
            { name: "📊 [Oficjalny GitHub] MS Power BI Samples (.pbix)", url: "https://github.com/microsoft/powerbi-desktop-samples" },
            { name: "⚡ [GitHub Kurs] 30 Days of Power BI Practice", url: "https://github.com/Prath-Digital/MS_Power_BI_Practice" }
        ],
        milestones: [
            { id: "m4_1", text: "Interfejs & Import: Pobieranie danych z Azure SQL/Excela i edycja w Power Query", est: "6-8h", test: "Zaimportuj dane z dwóch źródeł i poustawiaj typy danych bez błędów w Power Query." },
            { id: "m4_2", text: "Data Model & Star Schema: Relacje 1:N, tabela faktów, wymiarów i automatyczny Kalendarz", est: "10-12h", test: "Zbuduj model danych Star Schema z osobną tabelą wymiaru czasu (Calendar)." },
            { id: "m4_3", text: "Podstawy DAX: Miary kalkulowane z SUM, AVERAGE i zmiana kontekstu CALCULATE", est: "12-15h", test: "Stwórz miarę obliczającą sprzedaż tylko dla wybranej kategorii za pomocą CALCULATE." },
            { id: "m4_4", text: "Time Intelligence DAX: Kalkulacje YTD, QTD, SamePeriodLastYear i wzrost % YoY", est: "12-15h", test: "Napisz miarę obliczającą procentową zmianę sprzedaży w stosunku do ubiegłego roku." },
            { id: "m4_5", text: "Dashboards & RLS: Projektowanie interfejsu, zakłady, publikacja i bezpieczny dostęp RLS", est: "10-12h", test: "Skonfiguruj regułę Row-Level Security ograniczającą podgląd danych dla menedżera." }
        ]
    },
    {
        id: "phase5",
        title: "5. Python & Data Analytics",
        badge: "Python DS",
        color: "#32ADE6",
        icon: "code-2",
        goal: "Po tej fazie umiesz pisać własne skrypty automatyzacji, analizować duże ramki danych w Pandas i zbierać dane przez API/Scraping.",
        desc: "Programowanie analityczne w Pythonie: od składni i operacji na plikach, przez manipulację w Pandas, po zaawansowane zbieranie danych z sieci.",
        resources: [
            { name: "📁 [Folder Lokalny] MS Data Science", url: "file:///C:/Users/baluk/OneDrive - Uniwersytet Ekonomiczny we Wrocławiu/hanuenane cz. 3/[-] PROGRAMOWANIE/Data-Science-For-Beginners-main/Data-Science-For-Beginners-main" },
            { name: "🔗 [GitHub Repo] MS Data Science", url: "https://github.com/microsoft/Data-Science-For-Beginners" }
        ],
        milestones: [
            { id: "m5_1", text: "Python Core: Składnia, funkcje, listy, słowniki i obsługa błędów try/except", est: "10-12h", test: "Napisz funkcję przeliczającą waluty z obsługą błędów niepoprawnego typu danych." },
            { id: "m5_2", text: "Pandas Basics: Tworzenie DataFrames, czytanie CSV/XLSX i operacje loc/iloc", est: "10-12h", test: "Wczytaj plik 50k wierszy i przefiltruj dane według 3 złożonych warunków." },
            { id: "m5_3", text: "Pandas Advanced: Agregacje groupby, scalanie merge/concat i czyszczenie braków", est: "12-15h", test: "Wykonaj odpowiednik SQL-owego LEFT JOIN w Pandas z wypełnieniem wartości brakujących." },
            { id: "m5_4", text: "Wizualizacja Matplotlib/Seaborn: Wykresy liniowe, słupkowe, korelogramy i heatmapy", est: "8-10h", test: "Wygeneruj macierz korelacji w Seaborn i przedstaw ją w formie czytelnej heatmapy." },
            { id: "m5_5", text: "Microsoft Data Science (EN): Czyszczenie danych i cykl życia projektu (Lekcje 1-10)", est: "15-20h", test: "Przejdź 10 lekcji po angielsku i wykonaj notebook z przygotowaniem danych." },
            { id: "m5_6", text: "Scraping & API: Pobieranie danych JSON przez requests i parsowanie BeautifulSoup", est: "12-15h", test: "Napisz skrypt pobierający dane o pogodzie/kursach walut z publicznego API JSON." }
        ]
    },
    {
        id: "phase6",
        title: "6. Machine Learning (Podstawy)",
        badge: "Scikit-Learn",
        color: "#FF375F",
        icon: "activity",
        goal: "Po tej fazie umiesz trenować i ewaluować podstawowe modele uczenia maszynowego w Scikit-Learn do prognozowania i klasyfikacji.",
        desc: "Wejście w uczenie maszynowe przed AI Engineering: nauka innego sposobu myślenia (statystyka predykcyjna zamiast prostego kodowania).",
        resources: [
            { name: "📁 [Folder Lokalny] MS Machine Learning", url: "file:///C:/Users/baluk/OneDrive - Uniwersytet Ekonomiczny we Wrocławiu/hanuenane cz. 3/[-] PROGRAMOWANIE/ML-For-Beginners-main/ML-For-Beginners-main" },
            { name: "🔗 [GitHub Repo] MS Machine Learning", url: "https://github.com/microsoft/ML-For-Beginners" }
        ],
        milestones: [
            { id: "m6_1", text: "Microsoft ML for Beginners (EN): Podział na uczenie z nadzorem i bez nadzoru", est: "10-12h", test: "Zidentyfikuj rodzaj problemu uczenia maszynowego dla 5 opisanych przypadków biznesowych." },
            { id: "m6_2", text: "Regresja Liniowa: Trenowanie modeli predykcyjnych i ocena R^2 / MAE / RMSE", est: "12-15h", test: "Zbuduj model regresji w Scikit-Learn i zinterpretuj błąd średniokwadratowy RMSE." },
            { id: "m6_3", text: "Klasyfikacja: Drzewa decyzyjne, regresja logistyczna i macierz pomyłek (Confusion Matrix)", est: "12-15h", test: "Wytrenuj klasyfikator spamu i wyznacz wskaźniki Precision, Recall oraz F1-Score." },
            { id: "m6_4", text: "Klastrowanie: Uczenie bez nadzoru, algorytm K-Means i grupowanie obiektów", est: "10-12h", test: "Dokonaj podziału klientów na klastry i wyznacz optymalną liczbę skupień k metodą łokcia." }
        ]
    },
    {
        id: "phase7",
        title: "7. AI Engineering & Advanced",
        badge: "AI Engineering",
        color: "#BF5AF2",
        icon: "brain-circuit",
        goal: "Po tej fazie potrafisz budować własne aplikacje wykorzystujące RAG, agentów AI oraz rozumiesz głęboką teorię z OSSU Computer Science.",
        desc: "Zaawansowany etap AI: architektoniczne łączenie modeli językowych z bazami wektorowymi, dostrajaniem wag i teorią akademicką.",
        resources: [
            { name: "📁 [Folder Lokalny] OSSU Computer Science", url: "file:///C:/Users/baluk/OneDrive - Uniwersytet Ekonomiczny we Wrocławiu/hanuenane cz. 3/[-] PROGRAMOWANIE/computer-science-master/computer-science-master" },
            { name: "🔗 [GitHub Repo] OSSU Computer Science", url: "https://github.com/ossu/computer-science" },
            { name: "📁 [Folder Lokalny] ML Curriculum", url: "file:///C:/Users/baluk/OneDrive - Uniwersytet Ekonomiczny we Wrocławiu/hanuenane cz. 3/[-] PROGRAMOWANIE/machine-learning-curriculum-master/machine-learning-curriculum-master" }
        ],
        milestones: [
            { id: "m7_1", text: "Prompt Engineering: Role systemowe, sterowanie kontekstem i eliminacja halucynacji", est: "8-10h", test: "Zbuduj szablon promptu z rygorystycznymi ograniczeniami formatu wyjściowego JSON." },
            { id: "m7_2", text: "Architektura RAG: Podział tekstu (Chunking), wektoryzacja (Embeddings) i Vector Search", est: "15-20h", test: "Przygotuj skrypt indeksujący dokument PDF do wektorowej bazy danych." },
            { id: "m7_3", text: "Frameworki AI: Integracja z LangChain / LlamaIndex i tworzenie agentów narzędziowych", est: "20-25h", test: "Stwórz agenta AI z podpiętym narzędziem wyszukiwania i kalkulatora." },
            { id: "m7_4", text: "Fine-Tuning Modeli: Dostrajanie wag modeli językowych technikami LoRA / QLoRA", est: "20-25h", test: "Przygotuj zbiór danych treningowych w formacie JSONL i przeprowadź testowy fine-tuning." },
            { id: "m7_5", text: "OSSU CS & ML Curriculum: Teoria algebry, statystyka bayesowska i głębokie uczenie", est: "40-60h", test: "Zrealizuj i zalicz wybrane zadanie akademickie z programu OSSU." }
        ]
    },
    {
        id: "phase8",
        title: "8. Portfolio & Capstone Projects (Zwieńczenie)",
        badge: "Portfolio & CV",
        color: "#FF2D55",
        icon: "trophy",
        goal: "Po tej fazie posiadasz publiczne, profesjonalne portfolio na GitHubie oraz gotowe projekty do pokazania rekruterom i pracodawcom.",
        desc: "Praktyczne zwieńczenie nauki: budowanie realnych aplikacji i dashboardów przekształconych w publiczne portfolio.",
        resources: [
            { name: "📁 [Folder Lokalny] Markdown CV", url: "file:///C:/Users/baluk/OneDrive - Uniwersytet Ekonomiczny we Wrocławiu/hanuenane cz. 3/[-] PROGRAMOWANIE/markdown-cv-master" },
            { name: "🔗 [GitHub Topic] #powerbi-projects", url: "https://github.com/topics/powerbi-projects" }
        ],
        milestones: [
            { id: "m8_1", text: "Projekt Enterprise BI: Raport Power BI połączony z Azure SQL Database i RLS Security", est: "20-25h", test: "Opublikuj gotowy dashboard Power BI z dokumentacją architektury relacyjnej." },
            { id: "m8_2", text: "Projekt Python ETL: Automatyczny skrypt pobierający dane z API i zapisujący w bazie", est: "20-25h", test: "Stwórz repozytorium ze skryptem Python uruchamianym automatycznie (np. GitHub Actions)." },
            { id: "m8_3", text: "Projekt Machine Learning: Model klasyfikacji/predykcji na realnym zbiorze z Kaggle", est: "25-30h", test: "Prześlij rozwiązaną analizę na Kaggle z opisem metodologii i wskaźników dokładności." },
            { id: "m8_4", text: "Publiczne Portfolio & CV: Dokumentacja projektów na GitHubie i prezentacja profilowa", est: "15-20h", test: "Przygotuj stronę profilową GitHub Readme z opisem swoich projektów i umieść ją publicznie." }
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
    
    let currentRank = "📐 Student Matematyki & Statystyki";
    let rankColor = "var(--text-secondary)";
    
    if (totalPct >= 89) {
        currentRank = "💎 Master Data & AI Architect";
        rankColor = "#FF2D55";
    } else if (totalPct >= 78) {
        currentRank = "🧬 AI Systems Engineer";
        rankColor = "#BF5AF2";
    } else if (totalPct >= 67) {
        currentRank = "🤖 Machine Learning Engineer";
        rankColor = "#FF375F";
    } else if (totalPct >= 55) {
        currentRank = "🐍 Python Data Scientist";
        rankColor = "#32ADE6";
    } else if (totalPct >= 44) {
        currentRank = "📈 Senior Power BI & Business Analyst";
        rankColor = "#FF9F0A";
    } else if (totalPct >= 33) {
        currentRank = "☁️ Azure Cloud & BI Developer";
        rankColor = "#00C7BE";
    } else if (totalPct >= 22) {
        currentRank = "📊 SQL Data Specialist";
        rankColor = "#30D158";
    } else if (totalPct >= 11) {
        currentRank = "📂 Excel & Data Analyst";
        rankColor = "#0A84FF";
    }

    let html = `
        <div style="background: rgba(255, 255, 255, 0.02); border: 1px solid var(--border-subtle); border-radius: var(--radius-md, 12px); padding: 20px; margin-bottom: 24px;">
            <!-- Nagłówek Poziomu Kariery -->
            <div style="display: flex; justify-content: space-between; align-items: center; flex-wrap: wrap; gap: 16px; margin-bottom: 16px;">
                <div>
                    <div style="display: flex; align-items: center; gap: 10px;">
                        <i data-lucide="trophy" style="width: 22px; height: 22px; color: ${rankColor};"></i>
                        <h3 style="font-size: 1.25rem; font-weight: 700; color: var(--text-primary); margin: 0;">9-Etapowy System Progresu Kariery</h3>
                        <span style="font-size: 0.75rem; font-weight: 700; color: ${rankColor}; background: rgba(255,255,255,0.05); border: 1px solid ${rankColor}; padding: 3px 12px; border-radius: 20px;">${currentRank}</span>
                    </div>
                    <p style="font-size: 0.85rem; color: var(--text-secondary); margin: 6px 0 0 0;">Atomowe kamienie milowe z weryfikacją: Math ➔ Excel ➔ SQL ➔ Azure ➔ Power BI ➔ Python ➔ ML ➔ AI ➔ Portfolio</p>
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

            <!-- Karty 9 Faz Kariery -->
            <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(330px, 1fr)); gap: 16px;">
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
                    <span>Postęp Fazy ${phaseIdx}</span>
                    <span style="font-family: var(--font-mono); color: ${phase.color}; font-weight: 600;">${phasePct}%</span>
                </div>
                <div style="height: 5px; background: rgba(255, 255, 255, 0.05); border-radius: 3px; overflow: hidden; margin-bottom: 12px;">
                    <div style="width: ${phasePct}%; height: 100%; background: ${phase.color}; transition: width 0.3s ease;"></div>
                </div>

                <!-- Zasoby & Linki w ujednoliconym wzorcu -->
                ${phase.resources && phase.resources.length > 0 ? `
                    <div style="display: flex; flex-wrap: wrap; gap: 6px; margin-bottom: 14px; padding-bottom: 10px; border-bottom: 1px dashed var(--border-subtle);">
                        ${phase.resources.map(res => `
                            <a href="${res.url}" target="_blank" rel="noopener" style="font-size: 0.73rem; color: var(--text-primary); background: rgba(255,255,255,0.04); border: 1px solid var(--border-subtle); padding: 3px 8px; border-radius: 4px; text-decoration: none; display: flex; align-items: center; gap: 4px; transition: background 0.2s;" onmouseenter="this.style.background='rgba(255,255,255,0.08)'" onmouseleave="this.style.background='rgba(255,255,255,0.04)'">
                                <span>${res.name}</span>
                            </a>
                        `).join('')}
                    </div>
                ` : ''}

                <!-- Atomowa Lista Kamieni Milowych z Estymacją w Godzinach i Kryterium Weryfikacji -->
                <div style="display: flex; flex-direction: column; gap: 10px; margin-top: auto;">
        `;

        phase.milestones.forEach(m => {
            const isChecked = completedMap[m.id] === true;
            html += `
                <div style="display: flex; flex-direction: column; gap: 3px; background: rgba(255,255,255,0.015); border: 1px solid rgba(255,255,255,0.03); border-radius: 6px; padding: 6px 8px;">
                    <label style="display: flex; align-items: flex-start; justify-content: space-between; gap: 8px; font-size: 0.8rem; color: ${isChecked ? 'var(--text-primary)' : 'var(--text-secondary)'}; cursor: pointer;">
                        <div style="display: flex; align-items: flex-start; gap: 8px; flex: 1;">
                            <input type="checkbox" data-milestone="${m.id}" ${isChecked ? 'checked' : ''} style="margin-top: 2px; accent-color: ${phase.color}; cursor: pointer; flex-shrink: 0;">
                            <span style="font-weight: 600; line-height: 1.35; ${isChecked ? 'text-decoration: line-through; opacity: 0.6;' : ''}">${m.text}</span>
                        </div>
                        <span style="font-size: 0.7rem; font-family: var(--font-mono); color: ${phase.color}; opacity: 0.85; white-space: nowrap; flex-shrink: 0; padding-top: 1px; font-weight: 600;">⏱️ ${m.est}</span>
                    </label>
                    ${m.test ? `
                        <div style="font-size: 0.73rem; color: var(--text-secondary); opacity: 0.8; padding-left: 22px; line-height: 1.3;">
                            <span style="color: ${phase.color}; font-weight: 600;">💡 Weryfikacja:</span> ${m.test}
                        </div>
                    ` : ''}
                </div>
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
