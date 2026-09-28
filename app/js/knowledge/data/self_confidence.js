// app/js/knowledge/data/self_confidence.js

export const selfConfidenceCategory = {
    title: "Samorozwój i pewność siebie",
    items: [
        { title: "Fundamenty pewności siebie i rezyliencja poznawcza", level: 0 },
        { title: "Protokół behawioralny i mikro-kontrakty", level: 0 },
        { title: "Evidence Log: Rejestr twardych dowodów sprawczości", level: 0 },
        { title: "Progresywna ekspozycja na dyskomfort społeczny", level: 0 },
        { title: "Wystąpienia publiczne i zarządzanie derealizacją", level: 0 },
        { title: "Zarządzanie układem nerwowym i energią (ADHD & Lęk)", level: 0 }
    ]
};

export const selfConfidenceTree = {
    "Samorozwój i pewność siebie": [
        {
            title: "Fundamenty pewności siebie i rezyliencja poznawcza",
            desc: "Dekonstrukcja mitu niezniszczalności. Zaufanie do własnej rezyliencji zamiast wiary w bezbłędność, rozdzielenie tożsamości od wyników (błędy jako wyjątki w kodzie, nie defekt wartości) oraz neutralizacja wewnętrznego krytyka jako szumu tła.",
            challenge: "Zadanie: Zapisz jedno bieżące niepowodzenie lub obawę w formule debugowania: Stan wejściowy -> Punkt awarii -> Jedna korekta parametru, całkowicie pomijając ocenę własnej osoby.",
            subtopics: [
                "Rezyliencja adaptacyjna vs mit twardego pancerza i perfekcjonizmu",
                "Rozdzielenie tożsamości (Ego) od zmiennych losowych i wyników operacyjnych",
                "Akceptacja szumu poznawczego: technika defuzji poznawczej (wewnętrzny krytyk jako radio w tle)",
                "Reframing błędu: błąd jako informacja zwrotna i punkt danych telemetrycznych"
            ],
            resources: [
                { name: "Beck Institute: Restrukturyzacja poznawcza w CBT", url: "https://beckinstitute.org" },
                { name: "Dychotomia kontroli i stoicka rezyliencja (Irvine)", url: "https://en.wikipedia.org/wiki/Stoicism" }
            ]
        },
        {
            title: "Protokół behawioralny i mikro-kontrakty",
            desc: "Budowanie integralności wewnętrznej przez dotrzymywanie słowa danego samemu sobie. Wdrażanie 2-3 mikro-obietnic dziennie, zasada 3 sekund skracająca latencję decyzyjną oraz protokół debugowania nawyków.",
            challenge: "Zadanie: Wyznacz na jutro dokładnie 2 niepodważalne mikro-kontrakty (np. 15 min lektury, 1 szklanka wody przed uruchomieniem komputera) i zrealizuj je bez względu na poziom motywacji.",
            subtopics: [
                "Integralność osobista: budowa zaufania do siebie poprzez dotrzymywanie mikro-obietnic",
                "Zasada 3 sekund: natychmiastowa inicjacja działania przed aktywacją racjonalizacji lękowej",
                "Pętla nawyku w ADHD: wyzwalacz, mikro-akcja, natychmiastowe domknięcie pętli dopaminowej",
                "Protokół debugowania behawioralnego: izolacja zmiennych zamiast samokrytyki"
            ],
            resources: [
                { name: "Atomowe Nawyki - mechanika mikro-zobowiązań (James Clear)", url: "https://jamesclear.com/atomic-habits" },
                { name: "Huberman Lab: Neurobiologia dopaminy i napędu do działania", url: "https://hubermanlab.com" }
            ]
        },
        {
            title: "Evidence Log: Rejestr twardych dowodów sprawczości",
            desc: "Empiryczne przeciwdziałanie amnezji sukcesu wywołanej przez lęk i Syndrom Oszusta. Prowadzenie systematycznego rejestru faktów, liczb i ukończonych projektów w celu uciszania krytyka twardymi danymi.",
            challenge: "Zadanie: Wpisz do Evidence Logu 3 obiektywne fakty z ostatnich 12 miesięcy, w których poradziłeś sobie mimo początkowego paraliżu lub lęku.",
            subtopics: [
                "Amnezja sukcesu pod wpływem kortyzolu: dlaczego mózg zapomina o własnych osiągnięciach",
                "Struktura wpisu w Evidence Logu: Data, Wyzwanie, Lęk początkowy, Twardy fakt/wynik, Wniosek",
                "Konfrontacja wewnętrznego krytyka twardymi metrykami (Olimpiady, CKE 100%, Parkrun 27 min, B-Core)",
                "Regularna rewizja logu w momentach spadku nastroju i dekompensacji"
            ],
            resources: [
                { name: "CBT: Rejestr faktów i dowodów obiektywnych przeciw zniekształceniom", url: "https://www.apa.org/ptsd-guideline/patients-and-families/cognitive-behavioral" },
                { name: "Koncepcja Cookie Jar jako magazyn odporności psychicznej", url: "https://davidgoggins.com" }
            ]
        },
        {
            title: "Progresywna ekspozycja na dyskomfort społeczny",
            desc: "Stopniowa desensytyzacja układu współczulnego w warunkach kontrolowanego dyskomfortu. Eliminacja zachowań zabezpieczających (ściemnianie ekranu, unikanie kontaktu wzrokowego) i oswajanie bodźców o niskiej stawce.",
            challenge: "Zadanie: Wykonaj w tym tygodniu jedno zadanie analityczne w kawiarni z pełną jasnością ekranu i bez zachowań zabezpieczających przez minimum 45 minut.",
            subtopics: [
                "Mechanika wygaszania lęku: drabina ekspozycyjna od bodźców o niskiej stawce do wyzwań kluczowych",
                "Identyfikacja i wygaszanie subtelnych zachowań zabezpieczających (Safety Behaviors)",
                "Fizjologia tętna i somatyzacji: obserwacja reakcji ciała bez ucieczki i kompensacji",
                "Praca i obecność w przestrzeni publicznej: kawiarnia solo, siłownia w godzinach umiarkowanych"
            ],
            resources: [
                { name: "Protokół ekspozycji in vivo w terapii lęku społecznego (CBT)", url: "https://beckinstitute.org" },
                { name: "Wprowadzenie do współczesnego CBT (Stefan Hofmann)", url: "https://www.wiley.com" }
            ]
        },
        {
            title: "Wystąpienia publiczne i zarządzanie derealizacją",
            desc: "Protokół 14 zasad technicznych opanowania wystąpień przed audytorium. Spowolnienie tempa mowy o 20%, celowe pauzy 2-3 s, wciąganie widowni pytaniami, zarządzanie dysocjacją i fizjologiczny reset po prezentacji.",
            challenge: "Zadanie: Nagraj 2-minutową wypowiedź na wybrany temat analityczny, świadomie utrzymując pauzy 2-sekundowe co drugie zdanie i redukując tempo mowy.",
            subtopics: [
                "14 zasad technicznych wystąpienia: kontakt wzrokowy, kotwiczenie w ciele, struktura slajdu",
                "Zarządzanie tempem mowy: spowolnienie o 20% i strategiczne pauzy 2-3 s zamiast wypełniaczy",
                "Radzenie sobie z derealizacją i mgłą mózgową na scenie: uziemienie somatyczne 5-4-3-2-1",
                "Protokół regeneracji: zabezpieczenie 2-3 godzin po wystąpieniu na wyciszenie układu nerwowego"
            ],
            resources: [
                { name: "Talk Like TED: Techniki retoryczne i struktura narracji (Carmine Gallo)", url: "https://carminegallo.com" },
                { name: "Techniki somatycznego uziemiania w derealizacji i dysocjacji", url: "https://traumahealing.org" }
            ]
        },
        {
            title: "Zarządzanie układem nerwowym i energią (ADHD & Lęk)",
            desc: "Neurobiologia równowagi dopaminowo-noradrenalinowej. Synchronizacja pracy z farmakokinetyką Medikinetu (CR 20-30 mg + 10 mg IR), ochrona przed popołudniowym zjazdem i zarządzanie osią mózgowo-jelitową (IBS/LPR).",
            challenge: "Zadanie: Rozpisz swój typowy rozkład dnia z naniesieniem okien optymalnego skupienia według uwalniania dawek leku oraz wyznacz 60-minutową strefę zero-decyzji.",
            subtopics: [
                "Farmakokinetyka metylofenidatu: fazy działania CR rano i rola dawki IR w zapobieganiu zjazdowi",
                "Wpływ posiłków węglowodanowych vs białkowych na profil wchłaniania i stabilność glikemii",
                "Oś mózgowo-jelitowa: somatyzacja napięcia (IBS), dieta low-FODMAP i profilaktyka LPR przed snem",
                "Strefa zero-decyzji i higiena wieczorna: wygaszanie stymulacji kory przedczołowej"
            ],
            resources: [
                { name: "Taking Charge of Adult ADHD - neurofizjologia wykonawcza (Dr Russell Barkley)", url: "https://www.guilford.com/books/Taking-Charge-of-Adult-ADHD/Russell-Barkley/9781462546855" },
                { name: "Teoria Poliwagalna w regulacji autonomicznego układu nerwowego (Stephen Porges)", url: "https://www.stephenporges.com" }
            ]
        }
    ]
};
