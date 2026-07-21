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
        { title: "Systemy osobiste i Time-Grid", desc: "Zarządzanie czasem metodą blokowania czasu (Time Blocking) i GTD.", challenge: "Zbuduj 7-dniowy ramowy plan bloków operacyjnych." },
        { title: "Projektowanie architektury Serverless i PWA", desc: "Tworzenie lekkich aplikacji bez serwera na obciążeniu klienta.", challenge: "Wymień zalety PWA w porównaniu do aplikacji natywnych." },
        { title: "Wskaźniki efektywności osobistej (KPI & OKR)", desc: "Wyznaczanie celów kwartalnych i mierzenie kluczowych rezultatów.", challenge: "Zdefiniuj 1 cel główny (Objective) i 3 mierzalne rezultaty (Key Results)." },
        { title: "Zarządzanie wiedzą (Second Brain / PKM)", desc: "Organizacja notatek metodą PARA (Projects, Areas, Resources, Archives).", challenge: "Zorganizuj swój cyfrowy dysk według struktury PARA." }
    ],
    "Samorozwój i ogarnianie życia (by było git)": [
        { title: "Układ dopaminergiczny i regulacja ADHD", desc: "Mechanizmy motywacji, redukcja bodźców i unikanie przebodźcowania.", challenge: "Zapisz 3 zasady higieny cyfrowej w celu ochrony skupienia." },
        { title: "Higiena snu i optymalizacja energii", desc: "Rytm dobowy, ekspozycja na światło słoneczne rano i suplementacja.", challenge: "Określ swoje okno snu i zasady wygaszania ekranów wieczorem." },
        { title: "Odporność psychiczna (Resilience) i Stoicyzm", desc: "Kontrola tego na co masz wpływ (Dichotomy of Control) i zarządzanie stresem.", challenge: "Zastosuj zasadę podziału na rzeczy zależne i niezależne od Ciebie." },
        { title: "Zarządzanie energią życiową i regeneracja", desc: "Praca w głębokim skupieniu (Deep Work) przeplatana pełną regeneracją.", challenge: "Zaplanuj 1 dzień w tygodniu na całkowity detoks od pracy i bodźców." }
    ]
};
