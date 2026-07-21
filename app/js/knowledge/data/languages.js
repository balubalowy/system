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
        { title: "Słownictwo biznesowe i korespondencja", desc: "Zasady pisania profesjonalnych maili (formal/informal greeting, closing).", challenge: "Napisz maila z prośbą o przesunięcie terminu spotkania." },
        { title: "Płynna rozmowa i Present/Past Tenses", desc: "Użycie czasów Present Perfect vs Past Simple w praktyce.", challenge: "Wyjaśnij różnicę między 'I have worked here for 2 years' a 'I worked here'." },
        { title: "Zaawansowane struktury gramatyczne (Conditionals)", desc: "Okresy warunkowe 1st, 2nd, 3rd conditional i Mixed Conditionals.", challenge: "Ułóż zdanie w 3rd conditional o minionym zdarzeniu." },
        { title: "Mowa zależna i strona bierna (Passive Voice)", desc: "Transformacja zdań na stronę bierną oraz przytaczanie wypowiedzi.", challenge: "Przekształć 'They built the house' na stronę bierną." },
        { title: "Czasowniki złożone (Phrasal Verbs) i Idiomy", desc: "Popularne czasowniki frazowe w komunikacji biznesowej i technicznej.", challenge: "Użyj czasownika 'call off' i 'bring up' w zdaniach." }
    ],
    "Język hiszpański": [
        { title: "Podstawy zwrotów i odmiana czasowników", desc: "Czasowniki ser/estar/tener i podstawowe powitania w języku hiszpańskim.", challenge: "Przedstaw się i podaj skąd pochodzisz po hiszpańsku." },
        { title: "Czas Presente de Indicativo i słownictwo codzienne", desc: "Opisywanie rutyny dziennej, zakupów i pytania o drogę.", challenge: "Zapytaj po hiszpańsku o cenę i drogę do dworca." },
        { title: "Czas przeszły indefinido i imperfecto", desc: "Opisywanie wydarzeń dokonanych i niedokonanych w przeszłości.", challenge: "Wyjaśnij różnicę między pretérito indefinido a imperfecto." },
        { title: "Czas przyszły i tryb rozkazujący (Imperativo)", desc: "Planowanie wydarzeń i wyrażanie poleceń lub prośb.", challenge: "Zapisz 2 prośby w formie grzecznościowej." }
    ],
    "Użytkowanie polskiego języka": [
        { title: "Precyzja wysławiania i kompozycja wypowiedzi", desc: "Struktura logiczna wypowiedzi, eliminacja pleonazmów i tautologii.", challenge: "Wskaż i popraw błąd w sformułowaniu 'w miesiącu lipcu'." },
        { title: "Perswazja, retoryka i tworzenie zwięzłych opisów", desc: "Zasada Pyramid Principle (Minto) w przekazywaniu kluczowych wniosków.", challenge: "Napisz podsumowanie trudnego tematu w dokładnie 3 zdaniach." },
        { title: "Etykieta językowa i styl oficjalno-użytkowy", desc: "Tworzenie pism oficjalnych, raportów biznesowych i pism urzędowych.", challenge: "Sformułuj oficjalne uzasadnienie wniosku biznesowego." },
        { title: "Poprawność interpunkcyjna i ortograficzna", desc: "Wstawianie przecinków w zdaniach złożonych i pisownia łączna/rozłączna.", challenge: "Wskaż zasady interpunkcji przed spójnikami że, iż, ponieważ, ale." }
    ]
};
