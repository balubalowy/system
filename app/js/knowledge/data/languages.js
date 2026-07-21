// app/js/knowledge/data/languages.js
export const languagesCategory = {
    title: "Języki & Komunikacja",
    items: [
        { title: "Język angielski", level: 35 },
        { title: "Język hiszpański", level: 10 },
        { title: "Użytkowanie polskiego języka", level: 90 }
    ]
};

export const languagesTree = {
    "Język angielski": [
        { 
            title: "Słownictwo biznesowe i korespondencja", 
            desc: "Zasady pisania profesjonalnych maili (formal/informal greeting, closing).", 
            challenge: "Zadanie: Napisz krótki mail po angielsku z prośbą o przełożenie terminu spotkania biznesowego.",
            subtopics: ["Struktura profesjonalnego maila (Salutation, Body, Sign-off)", "Zwroty prośby i potwierdzeń (I would appreciate, Regarding...)", "Pisarstwo biznesowe i unikanie potoczności"]
        },
        { 
            title: "Płynna rozmowa i Present/Past Tenses", 
            desc: "Użycie czasów Present Perfect vs Past Simple w praktyce.", 
            challenge: "Zadanie: Wyjaśnij różnicę w znaczeniu zdań 'I have worked here for 2 years' oraz 'I worked here for 2 years'.",
            subtopics: ["Present Perfect vs Past Simple w kontekście pracy", "Konstrukcje Used to / Would dla dawnych nawyków", "Płynne łączenie zdań z użyciem łączników (However, Although)"]
        },
        { 
            title: "Zaawansowane struktury gramatyczne (Conditionals)", 
            desc: "Okresy warunkowe 1st, 2nd, 3rd conditional i Mixed Conditionals.", 
            challenge: "Zadanie: Ułóż zdanie w 3rd conditional opisujące sytuację z przeszłości, która nie zaistniała.",
            subtopics: ["1st i 2nd Conditional w negocjacjach", "3rd Conditional dla hipotez przeszłych", "Mixed Conditionals w analizie przyczynowo-skutkowej"]
        },
        { 
            title: "Mowa zależna i strona bierna (Passive Voice)", 
            desc: "Transformacja zdań na stronę bierną oraz przytaczanie wypowiedzi.", 
            challenge: "Zadanie: Przekształć zdanie aktywne 'The team completed the project on time' na stronę bierną.",
            subtopics: ["Tworzenie strony biernej w czasach Present/Past", "Reported Speech i przesunięcie czasów (Backshift)", "Raportowanie wyników w języku technicznym"]
        },
        { 
            title: "Czasowniki złożone (Phrasal Verbs) i Idiomy", 
            desc: "Popularne czasowniki frazowe w komunikacji biznesowej i technicznej.", 
            challenge: "Zadanie: Użyj czasowników frazowych 'call off', 'bring up' oraz 'figure out' w 3 poprawnych zdaniach.",
            subtopics: ["Rozdzielne i nierozdzielne Phrasal Verbs", "Idiomy korporacyjne (Hit the nail, Cut corners)", "Naturalne frazy używane w branży IT/Finanse"]
        }
    ],
    "Język hiszpański": [
        { 
            title: "Podstawy zwrotów i odmiana czasowników", 
            desc: "Czasowniki ser/estar/tener i podstawowe powitania w języku hiszpańskim.", 
            challenge: "Zadanie: Przedstaw się po hiszpańsku, podaj swój zawód oraz skąd pochodzisz.",
            subtopics: ["Odmiana czasowników regularnych w Presente", "Różnice w zastosowaniu czasowników Ser vs Estar", "Liczebniki i zwroty grzecznościowe"]
        },
        { 
            title: "Czas Presente de Indicativo i słownictwo codzienne", 
            desc: "Opisywanie rutyny dziennej, zakupów i pytania o drogę.", 
            challenge: "Zadanie: Sformułuj 3 pytania po hiszpańsku: o cenę, o drogę do dworca oraz o godzinę otwarcia sklepu.",
            subtopics: ["Czasowniki zwrotne i rutyna dnia", "Opisywanie otoczenia i robienie zakupów", "Pytania o drogę i komunikacja miejska"]
        },
        { 
            title: "Czas przeszły indefinido i imperfecto", 
            desc: "Opisywanie wydarzeń dokonanych i niedokonanych w przeszłości.", 
            challenge: "Zadanie: Wyjaśnij kiedy użyjesz czasu pretérito indefinido, a kiedy pretérito imperfecto.",
            subtopics: ["Pretérito Indefinido dla akcji dokonanych", "Pretérito Imperfecto dla tła i zwyczajów", "Łączenie czasów przeszłych w opowiadaniu"]
        },
        { 
            title: "Czas przyszły i tryb rozkazujący (Imperativo)", 
            desc: "Planowanie wydarzeń i wyrażanie poleceń lub prośb.", 
            challenge: "Zadanie: Sformułuj 2 prośby w formie grzecznościowej (usted) w trybie rozkazującym.",
            subtopics: ["Futuro Próximo (ir a + bezokolicznik)", "Futuro Simple dla prognoz i planów", "Tryb rozkazujący Imperativo Afirmativo/Negativo"]
        }
    ],
    "Użytkowanie polskiego języka": [
        { 
            title: "Precyzja wysławiania i kompozycja wypowiedzi", 
            desc: "Struktura logiczna wypowiedzi, eliminacja pleonazmów i tautologii.", 
            challenge: "Zadanie: Wskaż błędy w sformułowaniach 'aktywizować do działania', 'w miesiącu lipcu' i podaj poprawne wersje.",
            subtopics: ["Eliminacja pleonazmów i masła maślanego", "Zasady zwięzłości i unikania nowomowy", "Poprawny dobór słownictwa naukowego i biznesowego"]
        },
        { 
            title: "Perswazja, retoryka i tworzenie zwięzłych opisów", 
            desc: "Zasada Pyramid Principle (Minto) w przekazywaniu kluczowych wniosków.", 
            challenge: "Zadanie: Napisz zwięzłe podsumowanie (Executive Summary) problemu biznesowego w dokładnie 3 zdaniach.",
            subtopics: ["Zasada piramidy Minto w komunikacji", "Tworzenie chwytliwych nagłówków i podsumowań", "Środki retoryczne w prezentacjach biznesowych"]
        },
        { 
            title: "Etykieta językowa i styl oficjalno-użytkowy", 
            desc: "Tworzenie pism oficjalnych, raportów biznesowych i pism urzędowych.", 
            challenge: "Zadanie: Sformułuj oficjalny nagłówek i wstęp uzasadnienia wniosku formalnego.",
            subtopics: ["Struktura pism oficjalnych i urzędowych", "Etykieta językowa (Savoir-vivre w mailach)", "Styl naukowy vs styl publicystyczny"]
        },
        { 
            title: "Poprawność interpunkcyjna i ortograficzna", 
            desc: "Wstawianie przecinków w zdaniach złożonych i pisownia łączna/rozłączna.", 
            challenge: "Zadanie: Wskaż zasady interpunkcji przed spójnikami podrzędnymi oraz współrzędnymi (że, ale, i, oraz).",
            subtopics: ["Interpunkcja w zdaniach złożonych", "Pisownia 'nie' z różnymi częściami mowy", "Skróty, skrótowce i ich odmiana przez przypadki"]
        }
    ]
};
