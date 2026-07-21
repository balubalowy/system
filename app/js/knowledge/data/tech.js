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
        { title: "Zaawansowane formuły wyszukiwania (XLOOKUP / VLOOKUP)", desc: "Łączenie danych z wielu arkuszy przy użyciu XLOOKUP i INDEX/MATCH.", challenge: "Zadanie: Zapisz formułę XLOOKUP wyszukującą ID w kolumnie A i zwracającą cenę z kolumny C z obsługą braku wyników." },
        { title: "Tabele Przestawne (Pivot Tables) i Plastry", desc: "Agregacja danych, pola kalkulowane, sortowanie i filtry fragmentatora.", challenge: "Zadanie: Stwórz tabelę przestawną z grupowaniem dat według miesięcy i dodaj fragmentator (slicer) wg regionu." },
        { title: "Power Query i Czyszczenie Danych", desc: "Importowanie danych, unpivot kolumn, filtrowanie i transformacje w PQ.", challenge: "Zadanie: Przekształć 12 kolumn miesięcznych w pionowy szereg dwóch kolumn (Miesiąc, Wartość) za pomocą Unpivot." },
        { title: "Dynamiczne Formuły Tablicowe (FILTER, UNIQUE, SORT)", desc: "Nowoczesne funkcje tablicowe wylewające się automatycznie do sąsiednich komórek.", challenge: "Zadanie: Stwórz formułę `=SORT(UNIQUE(FILTER(A:A, B:B>100)))` usuwającą duplikaty i sortującą przefiltrowane dane." },
        { title: "Formatowanie Warunkowe i Budowa Dashboardów", desc: "Tworzenie pasków stanu, ikon i wizualnych wskaźników KPI w komórkach.", challenge: "Zadanie: Ustaw regułę formatowania warunkowego podświetlającą komórki o wartości powyżej średniej całego zakresu." }
    ],
    "Python": [
        { title: "Składnia, typy danych i kontrolowanie przepływu", desc: "Zmienne, listy, słowniki (dicts), pętle for/while oraz instrukcje if/elif/else.", challenge: "Zadanie: Napisz dict comprehension `{x: x**2 for x in range(1, 11)}` tworzący słownik kwadratów liczb 1..10." },
        { title: "Funkcje, moduły i obsługa wyjątków", desc: "Definiowanie funkcji, argumenty *args i **kwargs, bloki try/except.", challenge: "Zadanie: Napisz funkcję dzielenia dwóch liczb z bezpiecznym przechwytywaniem błędu ZeroDivisionError." },
        { title: "Praca z biblioteką Pandas (DataFrames)", desc: "Wczytywanie CSV/XLSX, filtrowanie `.loc[]`/`.iloc[]` oraz `.groupby()`.", challenge: "Zadanie: Oblicz średnią wartość sprzedaży pogrupowaną wg kategorii z użyciem `df.groupby('kategoria')['sprzedaz'].mean()`." },
        { title: "Wizualizacja danych (Matplotlib & Seaborn)", desc: "Tworzenie wykresów liniowych, słupkowych, histogramów i heatmap.", challenge: "Zadanie: Wygeneruj wykres rozrzutu w Seaborn z linią regresji `sns.regplot(x='wiek', y='dochod', data=df)`." },
        { title: "Automatyzacja i parsowanie danych", desc: "Operacje na plikach os/pathlib, praca z JSON i wykonywanie skryptów CLI.", challenge: "Zadanie: Napisz skrypt odczytujący plik JSON i wyciągający listę kluczy głównego obiektu." }
    ],
    "VBA": [
        { title: "Składnia VBA i Edytor VBE", desc: "Moduły, procedury Sub i funkcje Function, typy zmiennych Dim.", challenge: "Zadanie: Napisz w VBE prostą funkcję `Function Podatek(kwota As Double) As Double` liczącą 19% z kwoty." },
        { title: "Automatyzacja operacji w Excelu", desc: "Pętla For Each po zakreślonych komórkach Range i warunki w VBA.", challenge: "Zadanie: Napisz pętlę `For Each cell In Selection` podświetlającą wartości ujemne na czerwono." },
        { title: "Zdarzenia w arkuszach i skoroszytach (Events)", desc: "Przechwytywanie zdarzeń Worksheet_Change i Workbook_Open.", challenge: "Zadanie: Napisz procedurę `Worksheet_Change` automatycznie wstawiającą aktualny czas modyfikacji w kolumnie B." },
        { title: "Obsługa błędów i optymalizacja wydajności", desc: "On Error GoTo, wyłączanie odświeżania ekranu (Application.ScreenUpdating = False).", challenge: "Zadanie: Zastosuj przyspieszenie wykonywania makra wyłączając ScreenUpdating oraz Application.Calculation." }
    ],
    "Power BI": [
        { title: "Modelowanie Danych i Relacje", desc: "Schemat gwiazdy (Star Schema), tabele faktów i wymiarów, relacje 1:N.", challenge: "Zadanie: Zbuduj relację jednokierunkową 1:N pomiędzy tabelą wymiaru Kalendarz a tabelą faktów Sprzedaż." },
        { title: "Podstawy DAX (Calculated Columns & Measures)", desc: "Tworzenie miar za pomocą SUM, CALCULATE, FILTER i ALL.", challenge: "Zadanie: Napisz miarę DAX `Total Sales = CALCULATE(SUM(Sales[Amount]), ALL(Sales[Region]))`." },
        { title: "Inteligencja Czasowa w DAX (Time Intelligence)", desc: "Funkcje YTD, SAMEPERIODLASTYEAR, DATEADD do porównań okresowych.", challenge: "Zadanie: Stwórz miarę `Sales YTD = TOTALYTD(SUM(Sales[Amount]), 'Calendar'[Date])`." },
        { title: "Projektowanie Raportów i RLS (Row Level Security)", desc: "Zasady UI/UX raportów, zakładki (Bookmarks) oraz uprawnienia RLS.", challenge: "Zadanie: Skonfiguruj regułę RLS w Power BI Desktop ograniczającą widok danych do adresu email użytkownika." }
    ],
    "SQL": [
        { title: "Podstawowe zapytania DQL (SELECT / WHERE / ORDER BY)", desc: "Filtrowanie wierszy, operatory LIKE, IN, BETWEEN i sortowanie wyników.", challenge: "Zadanie: Napisz zapytanie `SELECT * FROM Klienci WHERE Kraj = 'Polska' AND Kwota > 500 ORDER BY Data DESC`." },
        { title: "Złączenia tabel (INNER, LEFT, RIGHT JOIN)", desc: "Łączenie relacyjnych tabel na podstawie kluczy obcych.", challenge: "Zadanie: Połącz tabelę Zamowienia z tabelą Klienci za pomocą `LEFT JOIN Klienci ON Zamowienia.KlientID = Klienci.ID`." },
        { title: "Agregacja i grupowanie (GROUP BY / HAVING)", desc: "Funkcje COUNT, SUM, AVG z klauzulami GROUP BY oraz HAVING.", challenge: "Zadanie: Napisz zapytanie grupujące produkty wg kategorii i zwracające tylko te ze średnią ceną > 50 zł (`HAVING AVG(Cena) > 50`)." },
        { title: "Podzapytania i Tabele Tymczasowe (CTE / WITH)", desc: "Klauzula WITH (Common Table Expressions) i podzapytania w klauzuli FROM.", challenge: "Zadanie: Napisz zapytanie z klauzulą `WITH SrednieWydatki AS (...)` obliczające odchylenie klienta od średniej." },
        { title: "Funkcje Analityczne i Okienkowe (OVER, ROW_NUMBER, RANK)", desc: "Partycjonowanie danych i obliczanie narastających sum.", challenge: "Zadanie: Wyznacz numer wiersza wewnątrz kategorii za pomocą `ROW_NUMBER() OVER(PARTITION BY Kategoria ORDER BY Cena DESC)`." }
    ],
    "R (Język programowania)": [
        { title: "Wprowadzenie do R i struktury danych", desc: "Wektory, ramki danych (data.frame), czyszczenie danych w tidyverse.", challenge: "Zadanie: Utwórz wektor `vec <- 1:100` i oblicz jego średnią za pomocą `mean(vec)`." },
        { title: "Manipulacja danymi z dplyr", desc: "Funkcje select, filter, mutate, summarize i operator pipe `%>%`.", challenge: "Zadanie: Napisz potok w dplyr `df %>% filter(wartość > 10) %>% summarize(srednia = mean(wartość))`." },
        { title: "Wizualizacja danych z ggplot2", desc: "Warstwowe budowanie wykresów w ggplot (aes, geom_point, geom_line).", challenge: "Zadanie: Zbuduj wykres rozrzutu w ggplot2: `ggplot(df, aes(x=x, y=y)) + geom_point() + geom_smooth(method='lm')`." }
    ],
    "AI (Sztuczna Inteligencja)": [
        { title: "Duże Modele Ję روبowe (LLM) i Prompt Engineering", desc: "Mechanika architektury Transformer, kontekst, rola, Few-Shot Prompting.", challenge: "Zadanie: Zbuduj strukturę prompta systemowego określającego rolę, ograniczenia i format wyjściowy (JSON)." },
        { title: "Narzędzia GenAI i Agenci AI", desc: "RAG (Retrieval-Augmented Generation), wywoływanie narzędzi (Function Calling).", challenge: "Zadanie: Wyjaśnij krok po kroku schemat RAG: Chunking -> Embeddings -> Vector Search -> Context Injection." },
        { title: "Fine-tuning i ewaluacja modeli", desc: "Dostrajanie wag modeli (LoRA/QLoRA) oraz ocena jakości (BENCHMARKS).", challenge: "Zadanie: Wyjaśnij różnicę między dostrajaniem pełnym (Full Fine-Tuning) a metodą adapterów LoRA." }
    ],
    "Użytkowanie komputera i telefonu (szybkie pisanie)": [
        { title: "Bezdotykowe szybkie pisanie na klawiaturze", desc: "Prawidłowe ułożenie palców na klawiszach F/J, pisanie bezpatrzeniowe.", challenge: "Zadanie: Przeprowadź 10-minutowy trening na Monkeytype i osiągnij prędkość > 60 WPM przy dokładności 95%." },
        { title: "Skróty klawiszowe i zarządzanie okienkami", desc: "Nawigacja w systemie Windows/Mac bez używania myszki.", challenge: "Zadanie: Przećwicz bezmyszkowe przypinanie okien (Win + Strzałka) i przełączanie pulpitów (Win + Ctrl + Strzałka)." },
        { title: "Automatyzacja i higiena pracy w OS", desc: "Używanie menedżerów schowka, automatyzacja tekstu (TextExpander/AutoHotkey).", challenge: "Zadanie: Zainstaluj menedżer schowka (np. Ditto lub Win+V) i skonfiguruj 3 skróty tekstowe." }
    ]
};
