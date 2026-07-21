// app/js/knowledge/data/tech.js
export const techCategory = {
    title: "Technologie & Analityka",
    items: [
        { title: "Excel", level: 75 },
        { title: "Python", level: 5 },
        { title: "VBA", level: 5 },
        { title: "Power BI", level: 2 },
        { title: "SQL", level: 10 },
        { title: "R (Język programowania)", level: 4 },
        { title: "AI (Sztuczna Inteligencja)", level: 50 },
        { title: "Użytkowanie komputera i telefonu (szybkie pisanie)", level: 80 }
    ]
};

export const techTree = {
    "Excel": [
        { 
            title: "Zaawansowane formuły wyszukiwania (XLOOKUP / VLOOKUP)", 
            desc: "Łączenie danych z wielu arkuszy przy użyciu XLOOKUP i INDEX/MATCH.", 
            challenge: "Zadanie: Zapisz formułę XLOOKUP wyszukującą ID w kolumnie A i zwracającą cenę z kolumny C z obsługą braku wyników.",
            subtopics: ["Składnia XLOOKUP i szukanie w lewo", "Zastąpienie VLOOKUP kombinacją INDEX + MATCH", "Zastosowanie dwukierunkowego wyszukiwania XLOOKUP"]
        },
        { 
            title: "Tabele Przestawne (Pivot Tables) i Plastry", 
            desc: "Agregacja danych, pola kalkulowane, sortowanie i filtry fragmentatora.", 
            challenge: "Zadanie: Stwórz tabelę przestawną z grupowaniem dat według miesięcy i dodaj fragmentator (slicer) wg regionu.",
            subtopics: ["Tworzenie tabeli przestawnej ze źródła", "Pola kalkulowane (Calculated Fields)", "Fragmentatory (Slicers) i Oś Czasu (Timeline)"]
        },
        { 
            title: "Power Query i Czyszczenie Danych", 
            desc: "Importowanie danych, unpivot kolumn, filtrowanie i transformacje w PQ.", 
            challenge: "Zadanie: Przekształć 12 kolumn miesięcznych w pionowy szereg dwóch kolumn (Miesiąc, Wartość) za pomocą Unpivot.",
            subtopics: ["Pobieranie danych z plików CSV/XLSX/Web", "Transformacja Unpivot Columns", "Łączenie zapytań (Merge & Append)"]
        },
        { 
            title: "Dynamiczne Formuły Tablicowe (FILTER, UNIQUE, SORT)", 
            desc: "Nowoczesne funkcje tablicowe wylewające się automatycznie do sąsiednich komórek.", 
            challenge: "Zadanie: Stwórz formułę `=SORT(UNIQUE(FILTER(A:A, B:B>100)))` usuwającą duplikaty i sortującą przefiltrowane dane.",
            subtopics: ["Koncepcja rozlewania formuł (Spill Ranges #)", "Funkcje FILTER, UNIQUE, SORT, SORTBY", "Operator powiązania # w odwołaniach tablicowych"]
        },
        { 
            title: "Power Pivot i Modelowanie Danych (Data Model)", 
            desc: "Modelowanie relacji w Excelu i pisanie podstawowych miar DAX.", 
            challenge: "Zadanie: Aktywuj dodatek Power Pivot i utwórz relację 1:N pomiędzy tabelą sprzedaży a wymiarem produktów.",
            subtopics: ["Model danych (Data Model) w Excelu", "Tworzenie relacji 1:N w okienku Power Pivot", "Miary DAX w tabelach przestawnych Excela"]
        },
        { 
            title: "Formatowanie Warunkowe i Budowa Dashboardów", 
            desc: "Tworzenie pasków stanu, ikon i wizualnych wskaźników KPI w komórkach.", 
            challenge: "Zadanie: Ustaw regułę formatowania warunkowego podświetlającą komórki o wartości powyżej średniej całego zakresu.",
            subtopics: ["Paski danych i zestawy ikon w komórkach", "Formuły własne w regułach formatowania warunkowego", "Układ chłodnego interfejsu w dashboardach Excela"]
        }
    ],
    "Python": [
        { 
            title: "Składnia, typy danych i kontrolowanie przepływu", 
            desc: "Zmienne, listy, słowniki (dicts), pętle for/while oraz instrukcje if/elif/else.", 
            challenge: "Zadanie: Napisz dict comprehension `{x: x**2 for x in range(1, 11)}` tworzący słownik kwadratów liczb 1..10.",
            subtopics: ["Struktury danych (list, tuple, dict, set)", "Instrukcje sterujące if/elif/else oraz pętle", "Wyrażenia List i Dict Comprehensions"]
        },
        { 
            title: "Funkcje, moduły i obsługa wyjątków", 
            desc: "Definiowanie funkcji, argumenty *args i **kwargs, bloki try/except.", 
            challenge: "Zadanie: Napisz funkcję dzielenia dwóch liczb z bezpiecznym przechwytywaniem błędu ZeroDivisionError.",
            subtopics: ["Definiowanie funkcji `def` i wartości zwracane", "Przekazywanie argumentów *args i **kwargs", "Obsługa błędów try/except/finally"]
        },
        { 
            title: "Programowanie Obiektowe (OOP)", 
            desc: "Definiowanie klas, metod `__init__`, dziedziczenie i enkapsulacja.", 
            challenge: "Zadanie: Stwórz klasę `BankAccount` z metodami `deposit()` oraz `withdraw()` z weryfikacją salda.",
            subtopics: ["Definiowanie klas i metody konstruktora `__init__`", "Instancje, atrybuty i metody instancyjne", "Dziedziczenie klas (Inheritance)"]
        },
        { 
            title: "Praca z biblioteką Pandas (DataFrames)", 
            desc: "Wczytywanie CSV/XLSX, filtrowanie `.loc[]`/`.iloc[]` oraz `.groupby()`.", 
            challenge: "Zadanie: Oblicz średnią wartość sprzedaży pogrupowaną wg kategorii z użyciem `df.groupby('kategoria')['sprzedaz'].mean()`.",
            subtopics: ["Tworzenie i indeksowanie DataFrames", "Filtrowanie warunkowe z loc[] i iloc[]", "Agregacja danych za pomocą `.groupby()` i `.agg()`"]
        },
        { 
            title: "Pobieranie danych z API (requests & JSON)", 
            desc: "Wysyłanie zapytań HTTP GET/POST, nagłówki, zapytania z autoryzacją API.", 
            challenge: "Zadanie: Pobierz dane pogodowe z darmowego API przy użyciu `requests.get()` i przekształć je do Pandas DataFrame.",
            subtopics: ["Wysyłanie zapytań `requests.get()` i `requests.post()`", "Kody statusu HTTP (200, 404, 500)", "Parsowanie odpowiedzi JSON do słownika Python"]
        },
        { 
            title: "Wizualizacja danych (Matplotlib & Seaborn)", 
            desc: "Tworzenie wykresów liniowych, słupkowych, histogramów i heatmap.", 
            challenge: "Zadanie: Wygeneruj wykres rozrzutu w Seaborn z linią regresji `sns.regplot(x='wiek', y='dochod', data=df)`.",
            subtopics: ["Wykresy w Matplotlib (plt.plot, plt.bar)", "Wykresy statystyczne w Seaborn (sns.scatterplot, sns.heatmap)", "Stylizowanie i zapis do plików PNG/SVG"]
        },
        { 
            title: "Automatyzacja i parsowanie danych", 
            desc: "Operacje na plikach os/pathlib, praca z JSON i wykonywanie skryptów CLI.", 
            challenge: "Zadanie: Napisz skrypt odczytujący plik JSON i wyciągający listę kluczy głównego obiektu.",
            subtopics: ["Menedżer kontekstu `with open()`", "Moduł json (json.loads / json.dumps)", "Scraping i parsowanie skryptowe"]
        }
    ],
    "VBA": [
        { 
            title: "Składnia VBA i Edytor VBE", 
            desc: "Moduły, procedury Sub i funkcje Function, typy zmiennych Dim.", 
            challenge: "Zadanie: Napisz w VBE prostą funkcję `Function Podatek(kwota As Double) As Double` liczącą 19% z kwoty.",
            subtopics: ["Okna VBE (Project Explorer, Properties, Code)", "Deklaracja zmiennych Dim i typy danych", "Różnica między Sub a Function"]
        },
        { 
            title: "Automatyzacja operacji w Excelu", 
            desc: "Pętla For Each po zakreślonych komórkach Range i warunki w VBA.", 
            challenge: "Zadanie: Napisz pętlę `For Each cell In Selection` podświetlającą wartości ujemne na czerwono.",
            subtopics: ["Obiekty Range, Cells, Sheets i Workbooks", "Pętle For Next oraz For Each Cell In Range", "Instrukcje warunkowe If Then Else"]
        },
        { 
            title: "Zdarzenia w arkuszach i skoroszytach (Events)", 
            desc: "Przechwytywanie zdarzeń Worksheet_Change i Workbook_Open.", 
            challenge: "Zadanie: Napisz procedurę `Worksheet_Change` automatycznie wstawiającą aktualny czas modyfikacji w kolumnie B.",
            subtopics: ["Procedury zdarzeniowe Worksheet_Change", "Zdarzenie Workbook_Open i instalatory", "Wyłączanie zdarzeń Application.EnableEvents"]
        },
        { 
            title: "Formularze użytkownika (UserForms)", 
            desc: "Tworzenie interaktywnych okienek UserForm z przyciskami i polami tekstowymi.", 
            challenge: "Zadanie: Zaprojektuj formularz UserForm do wprowadzania nowych rekordów sprzedaży do arkusza.",
            subtopics: ["Projektowanie interfejsu UserForm w VBE", "Obsługa przycisków CommandButton i pól TextBox", "Walidacja danych wprowadzanych przez formularz"]
        },
        { 
            title: "Obsługa błędów i optymalizacja wydajności", 
            desc: "On Error GoTo, wyłączanie odświeżania ekranu (Application.ScreenUpdating = False).", 
            challenge: "Zadanie: Zastosuj przyspieszenie wykonywania makra wyłączając ScreenUpdating oraz Application.Calculation.",
            subtopics: ["Pułapki błędów On Error GoTo ErrorHandler", "Przyspieszanie makr Application.ScreenUpdating = False", "Praca na tablicach w pamięci zamiast komórek Excela"]
        }
    ],
    "Power BI": [
        { 
            title: "Modelowanie Danych i Relacje", 
            desc: "Schemat gwiazdy (Star Schema), tabele faktów i wymiarów, relacje 1:N.", 
            challenge: "Zadanie: Zbuduj relację jednokierunkową 1:N pomiędzy tabelą wymiaru Kalendarz a tabelą faktów Sprzedaż.",
            subtopics: ["Zasady schematu gwiazdy (Star Schema)", "Tabele faktów vs Tabele wymiarów", "Kierunki filtrowania relacji (Single vs Both)"]
        },
        { 
            title: "Podstawy DAX (Calculated Columns & Measures)", 
            desc: "Tworzenie miar za pomocą SUM, CALCULATE, FILTER i ALL.", 
            challenge: "Zadanie: Napisz miarę DAX `Total Sales = CALCULATE(SUM(Sales[Amount]), ALL(Sales[Region]))`.",
            subtopics: ["Kolumny kalkulowane vs Miary (Measures)", "Funkcja CALCULATE i modyfikacja kontekstu filtra", "Funkcje filtrujące ALL, FILTER, ALLEXCEPT"]
        },
        { 
            title: "Inteligencja Czasowa w DAX (Time Intelligence)", 
            desc: "Funkcje YTD, SAMEPERIODLASTYEAR, DATEADD do porównań okresowych.", 
            challenge: "Zadanie: Stwórz miarę `Sales YTD = TOTALYTD(SUM(Sales[Amount]), 'Calendar'[Date])`.",
            subtopics: ["Wymóg ciągłej tabeli Kalendarza", "Miary narastające YTD, QTD, MTD", "Porównania okres do okresu (SAMEPERIODLASTYEAR)"]
        },
        { 
            title: "Język M w Power Query Editor", 
            desc: "Zaawansowana edycja zapytań M, tworzenie własnych funkcji w Power Query.", 
            challenge: "Zadanie: Otwórz Edytor Zaawansowany w Power Query i zmodyfikuj kod M dodając krok filtrujący.",
            subtopics: ["Składnia języka M (`let ... in ...`)", "Tworzenie parametrów i własnych funkcji w M", "Optymalizacja kroków (Query Folding)"]
        },
        { 
            title: "Projektowanie Raportów i RLS (Row Level Security)", 
            desc: "Zasady UI/UX raportów, zakładki (Bookmarks) oraz uprawnienia RLS.", 
            challenge: "Zadanie: Skonfiguruj regułę RLS w Power BI Desktop ograniczającą widok danych do adresu email użytkownika.",
            subtopics: ["Zasady budowy estetycznych dashboardów PBI", "Interaktywne zakłady (Bookmarks) i przyciski", "Zabezpieczenia poziomu wierszy (RLS) w Power BI Service"]
        }
    ],
    "SQL": [
        { 
            title: "Podstawowe zapytania DQL (SELECT / WHERE / ORDER BY)", 
            desc: "Filtrowanie wierszy, operatory LIKE, IN, BETWEEN i sortowanie wyników.", 
            challenge: "Zadanie: Napisz zapytanie `SELECT * FROM Klienci WHERE Kraj = 'Polska' AND Kwota > 500 ORDER BY Data DESC`.",
            subtopics: ["Składnia klauzuli SELECT i projekcja kolumn", "Filtrowanie WHERE z operatorami AND/OR/LIKE/IN", "Sortowanie wyników ORDER BY ASC/DESC"]
        },
        { 
            title: "Złączenia tabel (INNER, LEFT, RIGHT JOIN)", 
            desc: "Łączenie relacyjnych tabel na podstawie kluczy obcych.", 
            challenge: "Zadanie: Połącz tabelę Zamowienia z tabelą Klienci za pomocą `LEFT JOIN Klienci ON Zamowienia.KlientID = Klienci.ID`.",
            subtopics: ["Mechanika złączeń INNER JOIN vs OUTER JOIN", "LEFT JOIN i obsługa wartości NULL z prawej tabeli", "Złączenia wielokrotne (Multiple JOINs)"]
        },
        { 
            title: "Agregacja i grupowanie (GROUP BY / HAVING)", 
            desc: "Funkcje COUNT, SUM, AVG z klauzulami GROUP BY oraz HAVING.", 
            challenge: "Zadanie: Napisz zapytanie grupujące produkty wg kategorii i zwracające tylko te ze średnią ceną > 50 zł (`HAVING AVG(Cena) > 50`).",
            subtopics: ["Funkcje agregujące COUNT, SUM, AVG, MIN, MAX", "Grupowanie wierszy GROUP BY", "Filtrowanie agregatów za pomocą HAVING vs WHERE"]
        },
        { 
            title: "Modyfikacja danych DML (INSERT, UPDATE, DELETE)", 
            desc: "Wstawianie nowych wierszy, aktualizacja i bezpieczne usuwanie rekordów z transakcjami.", 
            challenge: "Zadanie: Napisz zapytanie `UPDATE Produkty SET Cena = Cena * 1.1 WHERE Kategoria = 'Elektronika'`.",
            subtopics: ["Składnia INSERT INTO, UPDATE i DELETE FROM", "Transakcje SQL (BEGIN TRANSACTION, COMMIT, ROLLBACK)", "Sprawdzanie klauzul WHERE przed uruchomieniem DELETE"]
        },
        { 
            title: "Podzapytania i Tabele Tymczasowe (CTE / WITH)", 
            desc: "Klauzula WITH (Common Table Expressions) i podzapytania w klauzuli FROM.", 
            challenge: "Zadanie: Napisz zapytanie z klauzulą `WITH SrednieWydatki AS (...)` obliczające odchylenie klienta od średniej.",
            subtopics: ["Podzapytania skalarne i podzapytania w klauzuli WHERE", "Common Table Expressions (CTE) z klauzulą WITH", "Tworzenie czytelnego i zoptymalizowanego kodu SQL"]
        },
        { 
            title: "Funkcje Analityczne i Okienkowe (OVER, ROW_NUMBER, RANK)", 
            desc: "Partycjonowanie danych i obliczanie narastających sum.", 
            challenge: "Zadanie: Wyznacz numer wiersza wewnątrz kategorii za pomocą `ROW_NUMBER() OVER(PARTITION BY Kategoria ORDER BY Cena DESC)`.",
            subtopics: ["Klauzula OVER() i PARTITION BY", "Funkcje rankingowe ROW_NUMBER(), RANK(), DENSE_RANK()", "Obliczanie sum narastających i średnich kroczących"]
        },
        { 
            title: "Indeksowanie i optymalizacja wydajności bazy", 
            desc: "Indeksy B-Tree, plan zapytania (EXPLAIN ANALYZE) i unikanie czyszczenia Full Table Scan.", 
            challenge: "Zadanie: Stwórz indeks dla kolumny `CREATE INDEX idx_klient_kraj ON Klienci(Kraj)` i przeanalizuj plan wykonania.",
            subtopics: ["Koncepcja indeksów B-Tree i Clustered vs Non-Clustered", "Analiza planu zapytania (EXPLAIN / EXPLAIN ANALYZE)", "Unikanie operacji kosztownych (Full Table Scan)"]
        }
    ],
    "R (Język programowania)": [
        { 
            title: "Wprowadzenie do R i struktury danych", 
            desc: "Wektory, ramki danych (data.frame), czyszczenie danych w tidyverse.", 
            challenge: "Zadanie: Utwórz wektor `vec <- 1:100` i oblicz jego średnią za pomocą `mean(vec)`.",
            subtopics: ["Wektory, listy i ramki danych data.frame", "Praca w środowisku RStudio", "Pakiety z rodziny tidyverse"]
        },
        { 
            title: "Manipulacja danymi z dplyr", 
            desc: "Funkcje select, filter, mutate, summarize i operator pipe `%>%`.", 
            challenge: "Zadanie: Napisz potok w dplyr `df %>% filter(wartość > 10) %>% summarize(srednia = mean(wartość))`.",
            subtopics: ["Filtrowanie i selekcja kolumn z dplyr", "Tworzenie nowych zmiennych z `mutate()`", "Operator potoku `%>%` i agregacja z `summarize()`"]
        },
        { 
            title: "Wizualizacja danych z ggplot2", 
            desc: "Warstwowe budowanie wykresów w ggplot (aes, geom_point, geom_line).", 
            challenge: "Zadanie: Zbuduj wykres rozrzutu w ggplot2: `ggplot(df, aes(x=x, y=y)) + geom_point() + geom_smooth(method='lm')`.",
            subtopics: ["Gramatyka grafiki w ggplot2", "Geometrie (geom_point, geom_line, geom_bar)", "Mapowanie estetyki aes() i motywy (theme)"]
        },
        { 
            title: "Raportowanie automatyczne w R Markdown / Quarto", 
            desc: "Generowanie raportów PDF/HTML bezpośrednio z kodu R i tekstu Markdown.", 
            challenge: "Zadanie: Stwórz plik `.Rmd` wyliczający statystyki i wygeneruj automatyczny raport w HTML.",
            subtopics: ["Struktura nagłówka YAML w R Markdown", "Wstawianie bloków kodu (R Code Chunks)", "Renderowanie raportu z paczką knitr"]
        }
    ],
    "AI (Sztuczna Inteligencja)": [
        { 
            title: "Duże Modele Językowe (LLM) i Prompt Engineering", 
            desc: "Mechanika architektura Transformer, kontekst, rola, Few-Shot Prompting.", 
            challenge: "Zadanie: Zbuduj strukturę prompta systemowego określającego rolę, ograniczenia i format wyjściowy (JSON).",
            subtopics: ["Architektura Transformer i self-attention", "Techniki Zero-Shot, Few-Shot i Chain-of-Thought", "Strukturyzacja kontekstu i eliminacja halucynacji"]
        },
        { 
            title: "Narzędzia GenAI i Agenci AI", 
            desc: "RAG (Retrieval-Augmented Generation), wywoływanie narzędzi (Function Calling).", 
            challenge: "Zadanie: Wyjaśnij krok po kroku schemat RAG: Chunking -> Embeddings -> Vector Search -> Context Injection.",
            subtopics: ["Architektura RAG na bazach wektorowych", "Function Calling i wykonywanie akcji przez AI", "Pętla ReAct i budowa autonomicznych agentów"]
        },
        { 
            title: "Frameworki dla AI (LangChain / LlamaIndex)", 
            desc: "Budowa łańcuchów przetwarzania tekstu i integracja z zewnętrznymi API.", 
            challenge: "Zadanie: Napisz w Pythonie łańcuch LangChain łączący prompt z modelem i parsowaniem wyjścia.",
            subtopics: ["Koncepcja łańcuchów (Chains) w LangChain", "Łączenie modeli z bazami wektorowymi (Vector Stores)", "Parsery odpowiedzi i structured outputs"]
        },
        { 
            title: "Fine-tuning i ewaluacja modeli", 
            desc: "Dostrajanie wag modeli (LoRA/QLoRA) oraz ocena jakości (BENCHMARKS).", 
            challenge: "Zadanie: Wyjaśnij różnicę między dostrajaniem pełnym (Full Fine-Tuning) a metodą adapterów LoRA.",
            subtopics: ["Przygotowanie zbiorów danych do fine-tuningu", "Koncepcja adapterów LoRA i QLoRA", "Ewaluacja modeli (ROUGE, BLEU, MMLU)"]
        }
    ],
    "Użytkowanie komputera i telefonu (szybkie pisanie)": [
        { 
            title: "Bezdotykowe szybkie pisanie na klawiaturze", 
            desc: "Prawidłowe ułożenie palców na klawiszach F/J, pisanie bezpatrzeniowe.", 
            challenge: "Zadanie: Przeprowadź 10-minutowy trening na Monkeytype i osiągnij prędkość > 60 WPM przy dokładności 95%.",
            subtopics: ["Prawidłowe bazowe ułożenie palców na rzędzie domowym", "Eliminacja nawyku patrzenia na klawiaturę", "Mierzenie wskaźników WPM i Accuracy"]
        },
        { 
            title: "Skróty klawiszowe i zarządzanie okienkami", 
            desc: "Nawigacja w systemie Windows/Mac bez używania myszki.", 
            challenge: "Zadanie: Przećwicz bezmyszkowe przypinanie okien (Win + Strzałka) i przełączanie pulpitów (Win + Ctrl + Strzałka).",
            subtopics: ["Skróty systemowe nawigacyjne Windows/Mac", "Zarządzanie wirtualnymi pulpitami", "Nawigacja po formularzach i przeglądarce bez myszy"]
        },
        { 
            title: "Praca z wierszem poleceń (Terminal / PowerShell / Bash)", 
            desc: "Nawigacja w konsoli, zarządzanie plikami, zmienne środowiskowe i proste skrypty shell.", 
            challenge: "Zadanie: Przejdź w konsoli do folderu projektu, utwórz nowy podkatalog i wyświetl jego zawartość.",
            subtopics: ["Komendy nawigacyjne (cd, ls/dir, mkdir, rm)", "Zmienne środowiskowe $env i PATH", "Uruchamianie skryptów i przesyłanie strumieni (Pipes |)"]
        },
        { 
            title: "Kontrola wersji Git dla programistów", 
            desc: "Koncepcje commits, branches, merge, rebase oraz obsługa zdalnych repozytoriów GitHub.", 
            challenge: "Zadanie: Utwórz nową gałąź git `git checkout -b feature/nowa-funkcja`, zrób commit i wypchnij na GitHub.",
            subtopics: ["Komendy git add, commit, status i log", "Tworzenie i scalanie gałęzi (git branch/merge)", "Praca ze zdalnymi repozytoriami git push/pull"]
        },
        { 
            title: "Automatyzacja i higiena pracy w OS", 
            desc: "Używanie menedżerów schowka, automatyzacja tekstu (TextExpander/AutoHotkey).", 
            challenge: "Zadanie: Zainstaluj menedżer schowka (np. Ditto lub Win+V) i skonfiguruj 3 skróty tekstowe.",
            subtopics: ["Menedżery schowka z historią kopiowania", "Ekspandery tekstu i auto-uzupełnianie szablonów", "Skrypty automatyzacji AutoHotkey / Shortcuts"]
        }
    ]
};
