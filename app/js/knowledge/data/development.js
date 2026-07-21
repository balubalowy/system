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
        { title: "Projektowanie architektury Serverless i PWA", desc: "Tworzenie lekkich aplikacji bez serwera na obciążeniu klienta.", challenge: "Wymień zalety PWA w porównaniu do aplikacji natywnych." }
    ],
    "Samorozwój i ogarnianie życia (by było git)": [
        { title: "Układ dopaminergiczny i regulacja ADHD", desc: "Mechanizmy motywacji, redukcja bodźców i unikanie przebodźcowania.", challenge: "Zapisz 3 zasady higieny cyfrowej w celu ochrony skupienia." },
        { title: "Higiena snu i optymalizacja energii", desc: "Rytm dobowy, ekspozycja na światło słoneczne rano i suplementacja.", challenge: "Określ swoje okno snu i zasady wygaszania ekranów wieczorem." }
    ]
};
