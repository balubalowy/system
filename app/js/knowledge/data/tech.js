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
        { title: "Zaawansowane formuły wyszukiwania (XLOOKUP / VLOOKUP)", desc: "Łączenie danych z wielu arkuszy przy użyciu XLOOKUP i INDEX/MATCH.", challenge: "Zapisz formułę XLOOKUP z obsługą braku danych (if_not_found)." },
        { title: "Tabele Przestawne (Pivot Tables) i Plastry", desc: "Agregacja danych, pola kalkulowane, sortowanie i filtry fragmentatora.", challenge: "Stwórz tabelę przestawną z grupowaniem dat według miesięcy i kwartałów." },
        { title: "Power Query i Czyszczenie Danych", desc: "Importowanie danych, unpivot kolumn, filtrowanie i transformacje w PQ.", challenge: "Przekształć kolumny roczne w szereg pionowy za pomocą Unpivot." }
    ],
    "Python": [
        { title: "Składnia, typy danych i kontrolowanie przepływu", desc: "Zmienne, listy, słowniki (dicts), pętle for/while oraz instrukcje if/elif/else.", challenge: "Napisz dict comprehension budujący kwadraty liczb 1..10." },
        { title: "Praca z biblioteką Pandas (DataFrames)", desc: "Wczytywanie CSV/XLSX, filtrowanie `.loc[]`/`.iloc[]` oraz `.groupby()`.", challenge: "Wyznacz średnią wartość sprzedaży pogrupowaną wg kategorii." },
        { title: "Automatyzacja i parsowanie danych", desc: "Operacje na plikach os/pathlib, praca z JSON i wykonywanie skryptów CLI.", challenge: "Napisz skrypt zapisujący słownik Python do pliku JSON." }
    ],
    "VBA": [
        { title: "Składnia VBA i Edytor VBE", desc: "Moduły, procedury Sub i funkcje Function, typy zmiennych Dim.", challenge: "Napisz prostą funkcję kalkulującą podatek z podanej kwoty." },
        { title: "Automatyzacja operacji w Excelu", desc: "Pętla For Each po zakreślonych komórkach Range i warunki w VBA.", challenge: "Napisz makro podświetlające komórki o wartości ujemnej na czerwono." }
    ],
    "Power BI": [
        { title: "Modelowanie Danych i Relacje", desc: "Schemat gwiazdy (Star Schema), tabele faktów i wymiarów, relacje 1:N.", challenge: "Wyjaśnij różnicę między tabelą faktów a tabelą wymiarów." },
        { title: "Podstawy DAX (Calculated Columns & Measures)", desc: "Tworzenie miar za pomocą SUM, CALCULATE, FILTER i ALL.", challenge: "Napisz miarę obliczającą całkowitą sprzedaż ignorując filtry (ALL)." }
    ],
    "SQL": [
        { title: "Podstawowe zapytania DQL (SELECT / WHERE / ORDER BY)", desc: "Filtrowanie wierszy, operatory LIKE, IN, BETWEEN i sortowanie wyników.", challenge: "Napisz zapytanie wyciągające klientów z Polski z zakupami > 500 zł." },
        { title: "Złączenia tabel (INNER, LEFT, RIGHT JOIN)", desc: "Łączenie relacyjnych tabel na podstawie kluczy obcych.", challenge: "Wyjaśnij różnicę w wynikach między INNER JOIN a LEFT JOIN." },
        { title: "Agregacja i grupowanie (GROUP BY / HAVING)", desc: "Funkcje COUNT, SUM, AVG z klauzulami GROUP BY oraz HAVING.", challenge: "Znajdź kategorie produktów posiadające więcej niż 10 produktów." }
    ],
    "R (Język programowania)": [
        { title: "Wprowadzenie do R i struktury danych", desc: "Wektory, ramki danych (data.frame), czyszczenie danych w tidyverse.", challenge: "Utwórz wektor 1..100 i wyznacz z niego średnią." },
        { title: "Wizualizacja danych z ggplot2", desc: "Warstwowe budowanie wykresów w ggplot (aes, geom_point, geom_line).", challenge: "Zbuduj wykres rozrzutu z linią trendu w ggplot2." }
    ],
    "AI (Sztuczna Inteligencja)": [
        { title: "Duże Modele Językowe (LLM) i Prompt Engineering", desc: "Mechanika architektury Transformer, kontekst, rola, Few-Shot Prompting.", challenge: "Zbuduj strukturę prompta typu System/User/Assistant z kontekstem." },
        { title: "Narzędzia GenAI i Agenci AI", desc: "RAG (Retrieval-Augmented Generation), wywoływanie narzędzi (Function Calling).", challenge: "Wyjaśnij mechanizm działania RAG na prywatnych dokumentach PDF." }
    ],
    "Użytkowanie komputera i telefonu (szybkie pisanie)": [
        { title: "Bezdotykowe szybie pisanie na klawiaturze", desc: "Prawidłowe ułożenie palców na klawiszach F/J, pisanie bezpatrzeniowe.", challenge: "Osiągnij prędkość minimum 60 WPM ze skutecznością 95%." },
        { title: "Skróty klawiszowe i zarządzanie okienkami", desc: "Nawigacja w systemie Windows/Mac bez używania myszki.", challenge: "Opanuj skróty Alt+Tab, Win+Arrow, Ctrl+Shift+Esc." }
    ]
};
