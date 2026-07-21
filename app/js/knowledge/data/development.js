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
        { 
            title: "Systemy osobiste i Time-Grid", 
            desc: "Zarządzanie czasem metodą blokowania czasu (Time Blocking) i GTD.", 
            challenge: "Zadanie: Zbuduj 7-dniowy ramowy plan bloków operacyjnych na siatce czasu.",
            subtopics: ["Metodologia Getting Things Done (GTD)", "Planowanie blokowe (Time Blocking / Time-Grid)", "Minimalizacja przełączania kontekstu (Context Switching)"]
        },
        { 
            title: "Projektowanie architektury Serverless i PWA", 
            desc: "Tworzenie lekkich aplikacji bez serwera na obciążeniu klienta.", 
            challenge: "Zadanie: Wymień 3 kluczowe zalety architektury PWA w porównaniu do klasycznego skryptu serwerowego.",
            subtopics: ["Koncepcja architektury Serverless", "Service Workery i tryb Offline PWA", "Wykorzystanie Firebase Realtime DB jako backendu"]
        },
        { 
            title: "Wskaźniki efektywności osobistej (KPI & OKR)", 
            desc: "Wyznaczanie celów kwartalnych i mierzenie kluczowych rezultatów.", 
            challenge: "Zadanie: Zdefiniuj 1 cel główny (Objective) oraz 3 mierzalne rezultaty (Key Results) na najbliższy kwartał.",
            subtopics: ["Zasady wyznaczania celów w metodzie OKR", "Mierzalne rezultaty (Key Results) vs Lista Zadań", "Kwartalny przegląd i ewaluacja postępów"]
        },
        { 
            title: "Zarządzanie wiedzą (Second Brain / PKM)", 
            desc: "Organizacja notatek metodą PARA (Projects, Areas, Resources, Archives).", 
            challenge: "Zadanie: Uporządkuj pliki w wybranym folderze według 4 struktur metody PARA.",
            subtopics: ["Struktura PARA (Projects, Areas, Resources, Archives)", "Metoda Zettelkasten i łączenie notatek", "Zarządzanie wiedzą osobistą (Personal Knowledge Management)"]
        },
        { 
            title: "Automatyzacja procesów (Zapier / Make / Webhooks)", 
            desc: "Łączenie aplikacji i integracja przepływów danych za pomocą no-code/low-code.", 
            challenge: "Zadanie: Zaprojektuj przepływ Webhook wysyłający powiadomienie po utworzeniu nowego rekordu.",
            subtopics: ["Mechanika działania wyzwalaczy (Triggers) i akcji", "Struktura danych JSON w wywołaniach Webhook", "Integracja no-code z arkuszami i powiadomieniami"]
        }
    ],
    "Samorozwój i ogarnianie życia (by było git)": [
        { 
            title: "Układ dopaminergiczny i regulacja ADHD", 
            desc: "Mechanizmy motywacji, redukcja bodźców i unikanie przebodźcowania.", 
            challenge: "Zadanie: Zapisz 3 zasady higieny cyfrowej w celu ochrony skupienia przed dopaminowymi wyzwalaczami.",
            subtopics: ["Rola dopaminy w motywacji i nawykach", "Stymulacja układu nerwowego w ADHD", "Detoks cyfrowy i kontrola bodźców dopaminowych"]
        },
        { 
            title: "Higiena snu i optymalizacja energii", 
            desc: "Rytm dobowy, ekspozycja na światło słoneczne rano i suplementacja.", 
            challenge: "Zadanie: Określ swoje stałe okno snu i wprowadź zasadę wygaszania ekranów na 60 minut przed snem.",
            subtopics: ["Rytm dobowy i produkcja melatoniny", "Ekspozycja na światło słoneczne rano", "Zasady higieny sypialni i optymalnego wypoczynku"]
        },
        { 
            title: "Odporność psychiczna (Resilience) i Stoicyzm", 
            desc: "Kontrola tego na co masz wpływ (Dichotomy of Control) i zarządzanie stresem.", 
            challenge: "Zadanie: Wymień 3 bieżące problemy i podziel je na zależne oraz niezależne od Ciebie.",
            subtopics: ["Dychotomia kontroli stoickiej", "Zarządzanie reakcjami emocjonalnymi w stresie", "Budowanie odporności psychicznej (Resilience)"]
        },
        { 
            title: "Zarządzanie energią życiową i regeneracja", 
            desc: "Praca w głębokim skupieniu (Deep Work) przeplatana pełną regeneracją.", 
            challenge: "Zadanie: Zaplanuj w kalendarzu 1 pełny dzień na całkowity detoks od pracy i urządzeń cyfrowych.",
            subtopics: ["Koncepcja Deep Work (Newport)", "Zarządzanie cyklami energii ultradialnej (90 min)", "Aktywny vs bierny wypoczynek"]
        },
        { 
            title: "Biohacking i optymalizacja funkcji poznawczych", 
            desc: "Nootropiki, zimne prysznice, ekspozycja na zimno i trening siłowy w służbie skupienia.", 
            challenge: "Zadanie: Wprowadź 2-minutowy zimny prysznic na koniec porannej rutyny przez 5 dni z rzędu.",
            subtopics: ["Wpływ termogenezy zimnowej na dopaminę i noradrenalinę", "Optymalizacja żywienia pod kątem ostrości umysłu", "Rola regularnego treningu fizycznego w neuroplastyczności"]
        }
    ]
};
