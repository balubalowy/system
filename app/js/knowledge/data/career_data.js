// app/js/knowledge/data/career_data.js
// Definicja 9-etapowej mapy rozwoju kompetencji analitycznych i inzynierii danych

export const CAREER_ROADMAP = [
    {
        id: "phase0",
        title: "0. Matematyka & Statystyka (Fundament Analityczny)",
        badge: "Math & Stats",
        color: "#5856D6",
        icon: "calculator",
        goal: "Po tej fazie potrafisz interpretowac rozklady, wnioskowac statystycznie z proby, obliczac korelacje i rozumiec macierzowe operacje na wielowymiarowych zbiorach danych.",
        desc: "Scisle podstawy ilosciowe niezbedne do prawidlowej interpretacji wynikow biznesowych, wnioskowania i pozniejszego zrozumienia algorytmow ML.",
        resources: [
            { name: "[Lokalny Folder] Rozwoj [0]", url: "file:///C:/Users/baluk/OneDrive - Uniwersytet Ekonomiczny we Wroclawiu/hanuenane cz. 3/[-] ROZWOJ/[0] MATEMATYKA I STATYSTYKA" },
            { name: "[Baza B-Core] Matematyka & Statystyka", url: "knowledge.html" }
        ],
        milestones: [
            { id: "m0_1", text: "Statystyka Opisowa: Srednia, mediana, odchylenie standardowe i kwartyle", est: "8-10h", test: "Oblicz i zinterpretuj roznice miedzy srednia a mediana na zbiorze z wartosciami odstajacymi." },
            { id: "m0_2", text: "Korelacja & Asymetria: Wspolczynniki korelacji Pearsona/Spearmana i skosnosc", est: "6-8h", test: "Wyznacz korelacje dwoch zmiennych i sprawdz czy relacja jest liniowa." },
            { id: "m0_3", text: "Rachunek Prawdopodobienstwa: Zdarzenia losowe, prawdopodobienstwo warunkowe i wzor Bayesa", est: "10-12h", test: "Rozwiaz zadanie z twierdzenia Bayesa dla testu diagnostycznego." },
            { id: "m0_4", text: "Rozklady Prawdopodobienstwa: Rozklad normalny, standaryzacja Z-Score i regula 3-sigm", est: "8-10h", test: "Oblicz prawdopodobienstwo wystapienia wartosci wyzszej niz 2 odchylenia standardowe." },
            { id: "m0_5", text: "Statystyka Matematyczna: Testowanie hipotez (p-value, test t, Chi-kwadrat) i przedzialy ufnosci", est: "12-15h", test: "Przeprowadz test t-Studenta dla dwoch prob i zinterpretuj wartosc p-value." },
            { id: "m0_6", text: "Algebra Liniowa: Wektory, operacje macierzowe (dodawanie, mnozenie, transpozycja)", est: "10-12h", test: "Wykonaj mnozenie macierzy 3x2 przez 2x3." },
            { id: "m0_7", text: "Analiza Wielowymiarowa: Standaryzacja danych oraz redukcja wymiarowosci (PCA)", est: "12-15h", test: "Zredukuj 5-wymiarowy zbior danych do 2 glownych skladowych z zachowaniem wariancji." },
            { id: "m0_8", text: "Analiza Skupien: Algorytmy grupowania danych (K-Means, podzial na klastry)", est: "10-12h", test: "Dokonaj segmentacji obiektow na 3 skupienia i opisz profile klastrow." }
        ]
    },
    {
        id: "phase1",
        title: "1. Excel & Dane (Fundament)",
        badge: "Excel & PQ",
        color: "#0A84FF",
        icon: "sheet",
        goal: "Po tej fazie potrafisz bezblednie czyscic, przeksztalcac i laczyc surowe pliki danych bez uzywania baz danych.",
        desc: "Opanowanie zaawansowanych funkcji Excela, automatyzacji Power Query i dynamicznych formul tablicowych.",
        resources: [
            { name: "[Lokalny Folder] Rozwoj [1]", url: "file:///C:/Users/baluk/OneDrive - Uniwersytet Ekonomiczny we Wroclawiu/hanuenane cz. 3/[-] ROZWOJ/[1] EXCEL I DANE" },
            { name: "[Lokalny Folder] Programowanie", url: "file:///C:/Users/baluk/OneDrive - Uniwersytet Ekonomiczny we Wroclawiu/hanuenane cz. 3/[-] PROGRAMOWANIE" },
            { name: "[GitHub Repo] Excel Formulas Guide", url: "https://github.com/mdeering/excel-formulas" }
        ],
        milestones: [
            { id: "m1_1", text: "Wyszukiwanie Danych: Funkcje XLOOKUP oraz INDEX/MATCH w trudnych ukladach", est: "6-8h", test: "Polacz dwie tabele po 2 kluczach wyszukiwania bez stosowania VLOOKUP." },
            { id: "m1_2", text: "Tabele Przestawne: Tworzenie tabel przestawnych, pol kalkulowanych i fragmentatorow", est: "6-8h", test: "Stworz raport sprzedazy z podzialem na regiony i wylicz udzial procentowy." },
            { id: "m1_3", text: "Power Query Transform: Import plikow, rozdzielanie kolumn i operacja Unpivot", est: "8-10h", test: "Przeksztalc szeroka tabele miesieczna (Pivot) w waska strukture bazodanowa." },
            { id: "m1_4", text: "Formuly Tablicowe: Dynamiczne funkcje FILTER, UNIQUE, SORT i SORTBY", est: "6-8h", test: "Zbuduj dynamiczna liste unikalnych klientow spelniajacych warunek obrotu." }
        ]
    },
    {
        id: "phase2",
        title: "2. SQL & Bazy Danych",
        badge: "SQL Relacyjny",
        color: "#30D158",
        icon: "database",
        goal: "Po tej fazie umiesz samodzielnie wyciagac, filtrowac i laczyc dane z wielu relacyjnych tabel transakcyjnych do raportu.",
        desc: "Naturalna progresja SQL: od prostej projekcji danych, przez zlaczenia relacyjne, po zaawansowane funkcje okienkowe.",
        resources: [
            { name: "[Lokalny Folder] Rozwoj [2]", url: "file:///C:/Users/baluk/OneDrive - Uniwersytet Ekonomiczny we Wroclawiu/hanuenane cz. 3/[-] ROZWOJ/[2] SQL I BAZY DANYCH" },
            { name: "[Praktyczna Gra] SQL Murder Mystery", url: "https://github.com/NUKnightLab/sql-murder-mystery" },
            { name: "[GitHub Repo] Ultimate SQL Resources Hub", url: "https://github.com/amartinson193/The-Ultimate-List-of-Free-SQL-Resources" },
            { name: "[GitHub Kurs] DataWithBaraa SQL Course", url: "https://github.com/BaraaKhatibSalkini/sql-ultimate-course" }
        ],
        milestones: [
            { id: "m2_1", text: "Podstawy Zapytania: SELECT, WHERE, ORDER BY, GROUP BY oraz HAVING", est: "8-10h", test: "Napisz zapytanie zwracajace kategorie z wartoscia sprzedazy wyzsza niz 10,000 PLN." },
            { id: "m2_2", text: "Relacyjne Zlaczenia: INNER JOIN, LEFT JOIN, RIGHT JOIN i obsluga NULL", est: "10-12h", test: "Znajdz wszystkich klientow, ktorzy nie zlozyli zadnego zamowienia (WHERE IS NULL)." },
            { id: "m2_3", text: "Podzapytania & CTE: Czytelna struktura zapytan z uzyciem klauzuli WITH", est: "10-12h", test: "Stworz CTE wyliczajace srednia wartosc transakcji i polacz je z tabela glowna." },
            { id: "m2_4", text: "Funkcje Okienkowe: Analityczne funkcje ROW_NUMBER, RANK, DENSE_RANK i OVER", est: "12-15h", test: "Wyznacz 3 najwyzsze transakcje dla kazdego klienta osobno za pomoca ROW_NUMBER()." }
        ]
    },
    {
        id: "phase3",
        title: "3. Azure & Chmura (Cloud Data Stack)",
        badge: "Chmura Azure",
        color: "#00C7BE",
        icon: "cloud",
        goal: "Po tej fazie rozumiesz architekture chmury i potrafisz podlaczyc sie do Azure SQL Database oraz zautomatyzowac rury danych w Data Factory.",
        desc: "Fundament chmurowy niezbedny do pracy w duzej skali (Enterprise BI). Bez chmury Power BI dziala po omacku przy wiekszych projektach.",
        resources: [
            { name: "[Lokalny Folder] Rozwoj [3]", url: "file:///C:/Users/baluk/OneDrive - Uniwersytet Ekonomiczny we Wroclawiu/hanuenane cz. 3/[-] ROZWOJ/[3] AZURE I CHMURA" },
            { name: "[Oficjalny GitHub] Microsoft AZ-900", url: "https://github.com/MicrosoftLearning/AZ-900T0A-MicrosoftAzureFundamentals" },
            { name: "[GitHub Repo] Azure Data Factory Samples", url: "https://github.com/Azure/Azure-DataFactory" }
        ],
        milestones: [
            { id: "m3_1", text: "Azure Fundamentals: Koncepcje chmury, uslugi IaaS/PaaS/SaaS i zasoby Azure (AZ-900)", est: "10-12h", test: "Wyjasnij roznice miedzy Azure SQL Database a maszyna wirtualna z SQL Server." },
            { id: "m3_2", text: "Azure SQL Database: Konfiguracja, nawiazanie polaczenia i uprawnienia bazodanowe", est: "10-12h", test: "Skonfiguruj zapore Azure SQL i polacz sie z chmura poprzez SSMS / DBeaver." },
            { id: "m3_3", text: "Azure Data Factory (ADF): Automatyzacja przeplywow danych, Pipelines & Copy Activity", est: "15-20h", test: "Zbuduj potok ADF kopiujacy plik z Blob Storage do tabeli Azure SQL." }
        ]
    },
    {
        id: "phase4",
        title: "4. Power BI & Business Intelligence",
        badge: "Power BI",
        color: "#FF9F0A",
        icon: "bar-chart-3",
        goal: "Po tej fazie potrafisz zbudowac od zera zautomatyzowany, czytelny dashboard KPI z modelowaniem relacji i kalkulacjami DAX.",
        desc: "Nauka Power BI w podziale na rosnaca zlozonosc: od interfejsu i importu z Azure SQL, po model danych, DAX i publikacje z RLS.",
        resources: [
            { name: "[Lokalny Folder] Rozwoj [4]", url: "file:///C:/Users/baluk/OneDrive - Uniwersytet Ekonomiczny we Wroclawiu/hanuenane cz. 3/[-] ROZWOJ/[4] POWER BI I BUSINESS INTELLIGENCE" },
            { name: "[GitHub Repo] Awesome Power BI Hub", url: "https://github.com/NajiElKotob/Awesome-Power-BI" },
            { name: "[Oficjalny GitHub] MS Power BI Samples (.pbix)", url: "https://github.com/microsoft/powerbi-desktop-samples" },
            { name: "[GitHub Kurs] 30 Days of Power BI Practice", url: "https://github.com/Prath-Digital/MS_Power_BI_Practice" }
        ],
        milestones: [
            { id: "m4_1", text: "Interfejs & Import: Pobieranie danych z Azure SQL/Excela i edycja w Power Query", est: "6-8h", test: "Zaimportuj dane z dwoch zrodel i poustawiaj typy danych bez bledow w Power Query." },
            { id: "m4_2", text: "Data Model & Star Schema: Relacje 1:N, tabela faktow, wymiarow i automatyczny Kalendarz", est: "10-12h", test: "Zbuduj model danych Star Schema z osobna tabela wymiaru czasu (Calendar)." },
            { id: "m4_3", text: "Podstawy DAX: Miary kalkulowane z SUM, AVERAGE i zmiana kontekstu CALCULATE", est: "12-15h", test: "Stworz miare obliczajaca sprzedaz tylko dla wybranej kategorii za pomoca CALCULATE." },
            { id: "m4_4", text: "Time Intelligence DAX: Kalkulacje YTD, QTD, SamePeriodLastYear i wzrost % YoY", est: "12-15h", test: "Napisz miare obliczajaca procentowa zmiane sprzedazy w stosunku do ubieglego roku." },
            { id: "m4_5", text: "Dashboards & RLS: Projektowanie interfejsu, zakladki, publikacja i bezpieczny dostep RLS", est: "10-12h", test: "Skonfiguruj regule Row-Level Security ograniczajaca podglad danych dla menedzera." }
        ]
    },
    {
        id: "phase5",
        title: "5. Python & Data Analytics",
        badge: "Python DS",
        color: "#32ADE6",
        icon: "code-2",
        goal: "Po tej fazie umiesz pisac wlasne skrypty automatyzacji, analizowac duze ramki danych w Pandas i zbierac dane przez API/Scraping.",
        desc: "Programowanie analityczne w Pythonie: od skladni i operacji na plikach, przez manipulacje w Pandas, po zaawansowane zbieranie danych z sieci.",
        resources: [
            { name: "[Lokalny Folder] Rozwoj [5]", url: "file:///C:/Users/baluk/OneDrive - Uniwersytet Ekonomiczny we Wroclawiu/hanuenane cz. 3/[-] ROZWOJ/[5] PYTHON I DATA ANALYTICS" },
            { name: "[Folder Lokalny] MS Data Science", url: "file:///C:/Users/baluk/OneDrive - Uniwersytet Ekonomiczny we Wroclawiu/hanuenane cz. 3/[-] PROGRAMOWANIE/Data-Science-For-Beginners-main/Data-Science-For-Beginners-main" },
            { name: "[GitHub Repo] MS Data Science", url: "https://github.com/microsoft/Data-Science-For-Beginners" }
        ],
        milestones: [
            { id: "m5_1", text: "Python Core: Skladnia, funkcje, listy, slowniki i obsluga bledow try/except", est: "10-12h", test: "Napisz funkcje przeliczajaca waluty z obsluga bledow niepoprawnego typu danych." },
            { id: "m5_2", text: "Pandas Basics: Tworzenie DataFrames, czytanie CSV/XLSX i operacje loc/iloc", est: "10-12h", test: "Wczytaj plik 50k wierszy i przefiltruj dane wedlug 3 zlozonych warunkow." },
            { id: "m5_3", text: "Pandas Advanced: Agregacje groupby, scalanie merge/concat i czyszczenie brakow", est: "12-15h", test: "Wykonaj odpowiednik SQL-owego LEFT JOIN w Pandas z wypelnieniem wartosci brakujacych." },
            { id: "m5_4", text: "Wizualizacja Matplotlib/Seaborn: Wykresy liniowe, slupkowe, korelogramy i heatmapy", est: "8-10h", test: "Wygeneruj macierz korelacji w Seaborn i przedstaw ja w formie czytelnej heatmapy." },
            { id: "m5_5", text: "Microsoft Data Science (EN): Czyszczenie danych i cykl zycia projektu (Lekcje 1-10)", est: "15-20h", test: "Przejdz 10 lekcji po angielsku i wykonaj notebook z przygotowaniem danych." },
            { id: "m5_6", text: "Scraping & API: Pobieranie danych JSON przez requests i parsowanie BeautifulSoup", est: "12-15h", test: "Napisz skrypt pobierajacy dane o pogodzie/kursach walut z publicznego API JSON." }
        ]
    },
    {
        id: "phase6",
        title: "6. Machine Learning (Podstawy)",
        badge: "Scikit-Learn",
        color: "#FF375F",
        icon: "activity",
        goal: "Po tej fazie umiesz trenowac i ewaluowac podstawowe modele uczenia maszynowego w Scikit-Learn do prognozowania i klasyfikacji.",
        desc: "Wejscie w uczenie maszynowe przed AI Engineering: nauka innego sposobu myslenia (statystyka predykcyjna zamiast prostego kodowania).",
        resources: [
            { name: "[Lokalny Folder] Rozwoj [6]", url: "file:///C:/Users/baluk/OneDrive - Uniwersytet Ekonomiczny we Wroclawiu/hanuenane cz. 3/[-] ROZWOJ/[6] MACHINE LEARNING" },
            { name: "[Folder Lokalny] MS Machine Learning", url: "file:///C:/Users/baluk/OneDrive - Uniwersytet Ekonomiczny we Wroclawiu/hanuenane cz. 3/[-] PROGRAMOWANIE/ML-For-Beginners-main/ML-For-Beginners-main" },
            { name: "[GitHub Repo] MS Machine Learning", url: "https://github.com/microsoft/ML-For-Beginners" }
        ],
        milestones: [
            { id: "m6_1", text: "Microsoft ML for Beginners (EN): Podzial na uczenie z nadzorem i bez nadzoru", est: "10-12h", test: "Zidentyfikuj rodzaj problemu uczenia maszynowego dla 5 opisanych przypadkow biznesowych." },
            { id: "m6_2", text: "Regresja Liniowa: Trenowanie modeli predykcyjnych i ocena R^2 / MAE / RMSE", est: "12-15h", test: "Zbuduj model regresji w Scikit-Learn i zinterpretuj blad sredniokwadratowy RMSE." },
            { id: "m6_3", text: "Klasyfikacja: Drzewa decyzyjne, regresja logistyczna i macierz pomylek (Confusion Matrix)", est: "12-15h", test: "Wytrenuj klasyfikator spamu i wyznacz wskazniki Precision, Recall oraz F1-Score." },
            { id: "m6_4", text: "Klastrowanie: Uczenie bez nadzoru, algorytm K-Means i grupowanie obiektow", est: "10-12h", test: "Dokonaj podzialu klientow na klastry i wyznacz optymalna liczbe skupien k metoda lokcia." }
        ]
    },
    {
        id: "phase7",
        title: "7. AI Engineering & Advanced",
        badge: "AI Engineering",
        color: "#BF5AF2",
        icon: "brain-circuit",
        goal: "Po tej fazie potrafisz budowac wlasne aplikacje wykorzystujace RAG, agentow AI oraz rozumiesz gleboka teorie z OSSU Computer Science.",
        desc: "Zaawansowany etap AI: architektoniczne laczenie modeli jezykowych z bazami wektorowymi, dostrajaniem wag i teoria akademicka.",
        resources: [
            { name: "[Lokalny Folder] Rozwoj [7]", url: "file:///C:/Users/baluk/OneDrive - Uniwersytet Ekonomiczny we Wroclawiu/hanuenane cz. 3/[-] ROZWOJ/[7] AI ENGINEERING" },
            { name: "[Folder Lokalny] OSSU Computer Science", url: "file:///C:/Users/baluk/OneDrive - Uniwersytet Ekonomiczny we Wroclawiu/hanuenane cz. 3/[-] PROGRAMOWANIE/computer-science-master/computer-science-master" },
            { name: "[GitHub Repo] OSSU Computer Science", url: "https://github.com/ossu/computer-science" },
            { name: "[Folder Lokalny] ML Curriculum", url: "file:///C:/Users/baluk/OneDrive - Uniwersytet Ekonomiczny we Wroclawiu/hanuenane cz. 3/[-] PROGRAMOWANIE/machine-learning-curriculum-master/machine-learning-curriculum-master" }
        ],
        milestones: [
            { id: "m7_1", text: "Prompt Engineering: Role systemowe, sterowanie kontekstem i eliminacja halucynacji", est: "8-10h", test: "Zbuduj szablon promptu z rygorystycznymi ograniczeniami formatu wyjsciowego JSON." },
            { id: "m7_2", text: "Architektura RAG: Podzial tekstu (Chunking), wektoryzacja (Embeddings) i Vector Search", est: "15-20h", test: "Przygotuj skrypt indeksujacy dokument PDF do wektorowej bazy danych." },
            { id: "m7_3", text: "Frameworki AI: Integracja z LangChain / LlamaIndex i tworzenie agentow narzedziowych", est: "20-25h", test: "Stworz agenta AI z podpietym narzedziem wyszukiwania i kalkulatora." },
            { id: "m7_4", text: "Fine-Tuning Modeli: Dostrajanie wag modeli jezykowych technikami LoRA / QLoRA", est: "20-25h", test: "Przygotuj zbior danych treningowych w formacie JSONL i przeprowadz testowy fine-tuning." },
            { id: "m7_5", text: "OSSU CS & ML Curriculum: Teoria algebry, statystyka bayesowska i glebokie uczenie", est: "40-60h", test: "Zrealizuj i zalicz wybrane zadanie akademickie z programu OSSU." }
        ]
    },
    {
        id: "phase8",
        title: "8. Portfolio & Capstone Projects (Zwienczenie)",
        badge: "Portfolio & Web Dev",
        color: "#FF2D55",
        icon: "trophy",
        goal: "Po tej fazie posiadasz publiczne, profesjonalne portfolio na GitHubie oraz interaktywne aplikacje webowe do pokazania rekruterom i pracodawcom.",
        desc: "Praktyczne zwienczenie nauki: budowanie gotowych serwisow webowych (HTML/CSS/JS), aplikacji AI oraz raportow przeksztalconych w publiczne portfolio.",
        resources: [
            { name: "[Lokalny Folder] Rozwoj [8]", url: "file:///C:/Users/baluk/OneDrive - Uniwersytet Ekonomiczny we Wroclawiu/hanuenane cz. 3/[-] ROZWOJ/[8] PORTFOLIO I PROJEKTY" },
            { name: "[Folder Lokalny] MS Web Dev", url: "file:///C:/Users/baluk/OneDrive - Uniwersytet Ekonomiczny we Wroclawiu/hanuenane cz. 3/[-] PROGRAMOWANIE/Web-Dev-For-Beginners-main/Web-Dev-For-Beginners-main" },
            { name: "[GitHub Repo] MS Web Dev", url: "https://github.com/microsoft/Web-Dev-For-Beginners" },
            { name: "[Folder Lokalny] Markdown CV", url: "file:///C:/Users/baluk/OneDrive - Uniwersytet Ekonomiczny we Wroclawiu/hanuenane cz. 3/[-] PROGRAMOWANIE/markdown-cv-master" }
        ],
        milestones: [
            { id: "m8_1", text: "Projekt Enterprise BI: Raport Power BI polaczony z Azure SQL Database i RLS Security", est: "20-25h", test: "Opublikuj gotowy dashboard Power BI z dokumentacja architektury relacyjnej." },
            { id: "m8_2", text: "Projekt Python ETL & Web: Automatyczny skrypt API oraz dedykowany interfejs webowy (HTML/JS)", est: "20-25h", test: "Stworz aplikacje webowa pobierajaca dane z API i wyswietlajaca je na interaktywnym wykresie." },
            { id: "m8_3", text: "Projekt Machine Learning: Model klasyfikacji/predykcji na realnym zbiorze z Kaggle", est: "25-30h", test: "Przeslij rozwiazana analize na Kaggle z opisem metodologii i wskaznikow dokladnosci." },
            { id: "m8_4", text: "Publiczne Web Portfolio & CV: Dokumentacja projektow na GitHub Pages i wlasna witryna PWA", est: "15-20h", test: "Przygotuj strone profilowa GitHub Readme oraz witryne portfolio HTML/CSS/JS i umiesc ja publicznie." }
        ]
    }
];
