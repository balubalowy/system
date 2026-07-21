// app/js/knowledge/data/development.js
export const developmentCategory = {
    title: "Specjalistyczne & Rozwój",
    items: [
        { title: "Tworzenie systemowe i planowanie", level: 65 },
        { title: "Samorozwój i ogarnianie życia (by było git)", level: 85 }
    ]
};

export const developmentTree = {
    "Tworzenie systemowe i planowanie": [
        { title: "Systemy osobiste i Time-Grid", desc: "Zarządzanie czasem metodą blokowania czasu (Time Blocking) i GTD.", challenge: "Zadanie: Zbuduj 7-dniowy ramowy plan bloków operacyjnych na siatce czasu." },
        { title: "Projektowanie architektury Serverless i PWA", desc: "Tworzenie lekkich aplikacji bez serwera na obciążeniu klienta.", challenge: "Zadanie: Wymień 3 kluczowe zalety architektury PWA w porównaniu do klasycznego skryptu serwerowego." },
        { title: "Wskaźniki efektywności osobistej (KPI & OKR)", desc: "Wyznaczanie celów kwartalnych i mierzenie kluczowych rezultatów.", challenge: "Zadanie: Zdefiniuj 1 cel główny (Objective) oraz 3 mierzalne rezultaty (Key Results) na najbliższy kwartał." },
        { title: "Zarządzanie wiedzą (Second Brain / PKM)", desc: "Organizacja notatek metodą PARA (Projects, Areas, Resources, Archives).", challenge: "Zadanie: Uporządkuj pliki w wybranym folderze według 4 struktur metody PARA." }
    ],
    "Samorozwój i ogarnianie życia (by było git)": [
        { title: "Układ dopaminergiczny i regulacja ADHD", desc: "Mechanizmy motywacji, redukcja bodźców i unikanie przebodźcowania.", challenge: "Zadanie: Zapisz 3 zasady higieny cyfrowej w celu ochrony skupienia przed dopaminowymi wyzwalaczami." },
        { title: "Higiena snu i optymalizacja energii", desc: "Rytm dobowy, ekspozycja na światło słoneczne rano i suplementacja.", challenge: "Zadanie: Określ swoje stałe okno snu i wprowadź zasadę wygaszania ekranów na 60 minut przed snem." },
        { title: "Odporność psychiczna (Resilience) i Stoicyzm", desc: "Kontrola tego na co masz wpływ (Dichotomy of Control) i zarządzanie stresem.", challenge: "Zadanie: Wymień 3 bieżące problemy i podziel je na zależne oraz niezależne od Ciebie." },
        { title: "Zarządzanie energią życiową i regeneracja", desc: "Praca w głębokim skupieniu (Deep Work) przeplatana pełną regeneracją.", challenge: "Zadanie: Zaplanuj w kalendarzu 1 pełny dzień na całkowity detoks od pracy i urządzeń cyfrowych." }
    ]
};
