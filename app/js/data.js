window.appData = {
    routines: {
        morning: [
            { id: "m1", title: "Szklanka wody z solą i cytryną (Nawodnienie po śnie)" },
            { id: "m2", title: "Rozciąganie / Joga (5 min na rozruch stawów)" },
            { id: "m3", title: "Odsłonięcie okien - naturalne światło (Regulacja rytmu dobowego)" },
            { id: "m4", title: "Sprawdzenie agendy kalendarza (Tylko plan, zero social mediów)" }
        ],
        evening: [
            { id: "e1", title: "Wyciszenie i blokada ekranów (Godzinę przed snem)" },
            { id: "e2", title: "Przygotowanie ubrań i miejsca pracy na jutro" },
            { id: "e3", title: "Refleksja: Co poszło dobrze, co do poprawy (3 zdania)" },
            { id: "e4", title: "Trening Reaktor Pamięci (Fiszki przed snem - konsolidacja pamięci)" }
        ]
    },
    paths: {
        priority: [
            "Zbuduj model wyceny DCF od zera z makrami",
            "Napisz skrypt w Pythonie analizujący giełdę (Pandas)",
            "Nauka Statystyki Bayesowskiej (1 rozdział z notatkami)",
            "Zrób analizę techniczną i fundamentalną spółki X",
            "Trening zaawansowanych funkcji Excel (XLOOKUP, PIVOT z DAX)"
        ],
        light: [
            "Odpisanie na maile i wyczyszczenie Inboxa (Zero Inbox)",
            "Przeczytanie 15 stron książki biznesowej / biografii",
            "Uporządkowanie folderów na pulpicie i w chmurze",
            "Szybki research branżowy (Nowości Tech/Finanse) - 15 min max",
            "Przegląd i zaplanowanie finansów domowych w budżecie"
        ]
    },
    knowledgeAreas: {
        "Matematyka & Statystyka": {
            title: "Matematyka & Statystyka",
            items: [
                { title: "Matematyka", level: 40, topics: ["Podstawy", "Analiza matematyczna", "Całki i pochodne"] },
                { title: "Algebra liniowa", level: 30, topics: ["Macierze", "Wektory", "Układy równań liniowych", "Przestrzenie wektorowe"] },
                { title: "Statystyka opisowa", level: 75, topics: ["Miary tendencji centralnej", "Wariancja i odchylenie", "Rozkłady empiryczne"] },
                { title: "Statystyka matematyczna", level: 30, topics: ["Rozkłady teoretyczne", "Estymacja", "Weryfikacja hipotez", "Testy T-test/ANOVA"] },
                { title: "Ekonometria", level: 20, topics: ["Modele regresji liniowej", "Szeregi czasowe", "Heteroskedastyczność"] }
            ]
        },
        "Ekonomia & Finanse": {
            title: "Ekonomia & Finanse",
            items: [
                { title: "Ekonomia", level: 50, topics: ["Mikroekonomia", "Makroekonomia"] },
                { title: "Rachunkowość finansowa", level: 45, topics: ["Bilans", "Rachunek zysków i strat", "Przepływy pieniężne (Cash Flow)"] },
                { title: "Rynki finansowe", level: 40, topics: ["Mechanika stóp procentowych", "Akcje i indeksy", "Obligacje"] },
                { title: "Wycena spółek (Corporate Finance)", level: 75, topics: ["DCF", "WACC", "Wycena mnożnikowa"] },
                { title: "Makroekonomia zaawansowana", level: 40, topics: ["Polityka monetarna", "Inflacja", "Cykle koniunkturalne"] }
            ]
        },
        "Technologie & Analityka": {
            title: "Technologie & Analityka",
            items: [
                { title: "Python (Pandas/Numpy)", level: 5, topics: ["Podstawowe typy", "Operacje Array", "Manipulacja DataFrame"] },
                { title: "Bazy Danych (SQL)", level: 10, topics: ["SELECT/WHERE", "JOINy", "Agregacje"] },
                { title: "Power BI / R", level: 2, topics: ["Podstawy DAX", "Wizualizacje R", "Czyszczenie danych"] },
                { title: "Excel Zaawansowany", level: 75, topics: ["Tabele Przestawne (Pivot)", "Zaawansowane wykresy", "Makra i VBA"] },
                { title: "Uczenie Maszynowe (ML)", level: 5, topics: ["Regresja", "Klasyfikacja", "Drzewa decyzyjne"] }
            ]
        },
        "Języki & Komunikacja": {
            title: "Języki & Komunikacja",
            items: [
                { title: "Angielski (Biznesowy)", level: 35, topics: ["Rozmowa płynna", "Maile formalne", "Terminologia finansowa"] },
                { title: "Prezentacja Danych", level: 55, topics: ["Piramida Minto", "Storytelling analityczny", "Przygotowywanie Executive Summary"] },
                { title: "Negocjacje biznesowe", level: 50, topics: ["Techniki BATNA", "Radzenie sobie z oporem", "Zamykanie transakcji"] }
            ]
        },
        "Specjalistyczne & Rozwój": {
            title: "Specjalistyczne & Rozwój",
            items: [
                { title: "Kognitywistyka / ADHD", level: 85, topics: ["Działanie układu dopaminergicznego", "Zjawisko oporu", "Odżywianie neuroprzekaźników"] },
                { title: "Zarządzanie czasem", level: 65, topics: ["Zasada 2 minut", "Zasada Pomodoro i wariacje", "Planowanie Time-Grid"] },
                { title: "Zarządzanie projektami (Agile)", level: 35, topics: ["Sprinty", "Daily Standup", "Śledzenie KANBAN"] }
            ]
        }
    }
};
