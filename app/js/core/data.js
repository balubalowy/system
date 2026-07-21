window.appData = {
    routines: {
        morning: [
            { id: "m1", title: "Wypić szklankę wody" },
            { id: "m2", title: "Wziąć inhalator astma" },
            { id: "m3", title: "Przepłukać gardło wodą z solą" },
            { id: "m4", title: "Przepłukać buzię płynem do jamy ustnej" },
            { id: "m5", title: "Ew. sport (bieg / siłownia)" },
            { id: "m6", title: "Ciepły prysznic przechodzący w zimny" },
            { id: "m7", title: "Krople do nosa wziąć" },
            { id: "m8", title: "Sprawdzić czy zadania na dziś są wklepane" }
        ],
        evening: [
            { id: "e1", title: "Sprawdzić czy zadania na jutro są wklepane (1. raz) i wklepać" },
            { id: "e2", title: "Wziąć inhalator na astmę" },
            { id: "e3", title: "Przepłukać gardło wodą z solą" },
            { id: "e4", title: "Wziąć tabletkę (rupaller) na alergię" },
            { id: "e5", title: "Umyć się w ciepłej wodzie" },
            { id: "e6", title: "Sprawdzić czy zadania na jutro są wklepane (2. raz)" },
            { id: "e7", title: "Zatyczki do uszu na noc" },
            { id: "e8", title: "Opcjonalnie melatonina / opaska na oczy" }
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
                { title: "Rachunek prawdopodobieństwa", level: 40, topics: ["Podstawy", "Wzór Bayesa"] },
                { title: "Statystyka opisowa", level: 75, topics: ["Miary tendencji centralnej", "Wariancja i odchylenie", "Rozkłady empiryczne"] },
                { title: "Statystyka matematyczna", level: 30, topics: ["Rozkłady teoretyczne", "Estymacja", "Weryfikacja hipotez", "Testy T-test/ANOVA"] },
                { title: "Matematyka wyższa", level: 30, topics: ["Macierze", "Układy równań liniowych", "Całki i pochodne"] }
            ]
        },
        "Ekonomia & Finanse": {
            title: "Ekonomia & Finanse",
            items: [
                { title: "Meteorologia", level: 10, topics: ["Podstawy synoptyki", "Modele numeryczne", "Niże i wyże"] },
                { title: "Finanse", level: 50, topics: ["Mechanika stóp procentowych", "Wycena spółek"] },
                { title: "Rachunkowość", level: 45, topics: ["Bilans", "Rachunek zysków i strat", "Cash Flow"] },
                { title: "Ekonomia", level: 40, topics: ["Mikroekonomia", "Makroekonomia"] }
            ]
        },
        "Technologie & Analityka": {
            title: "Technologie & Analityka",
            items: [
                { title: "Excel", level: 75, topics: ["Tabele Przestawne (Pivot)", "Zaawansowane wykresy"] },
                { title: "Python", level: 5, topics: ["Podstawowe typy", "Operacje Array"] },
                { title: "VBA", level: 5, topics: ["Makra", "Edytor VBE"] },
                { title: "Power BI", level: 2, topics: ["Podstawy DAX", "Wizualizacje"] },
                { title: "SQL", level: 10, topics: ["SELECT/WHERE", "JOINy", "Agregacje"] },
                { title: "R (Język programowania)", level: 4, topics: ["Wizualizacje R", "Czyszczenie danych"] },
                { title: "AI (Sztuczna Inteligencja)", level: 50, topics: ["LLMs", "Generative AI", "Prompty"] },
                { title: "Użytkowanie komputera i telefonu (szybkie pisanie)", level: 80, topics: ["Skróty klawiszowe", "Pisanie bezwzrokowe"] }
            ]
        },
        "Języki & Komunikacja": {
            title: "Języki & Komunikacja",
            items: [
                { title: "Język angielski", level: 35, topics: ["Rozmowa płynna", "Maile formalne"] },
                { title: "Język hiszpański", level: 10, topics: ["Podstawowe słówka", "Rozumienie tekstu"] },
                { title: "Użytkowanie polskiego języka", level: 90, topics: ["Precyzja wysławiania", "Tworzenie opisów"] }
            ]
        },
        "Specjalistyczne & Rozwój": {
            title: "Specjalistyczne & Rozwój",
            items: [
                { title: "Tworzenie systemowe i planowanie", level: 65, topics: ["Zarządzanie czasem", "Time-Grid"] },
                { title: "Samorozwój i ogarnianie życia (by było git)", level: 85, topics: ["Kognitywistyka / ADHD", "Działanie układu dopaminergicznego"] }
            ]
        }
    }
};
