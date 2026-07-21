// app/js/knowledge/data/finance.js
export const financeCategory = {
    title: "Ekonomia & Finanse",
    items: [
        { title: "Meteorologia", level: 10 },
        { title: "Finanse", level: 50 },
        { title: "Rachunkowość", level: 45 },
        { title: "Ekonomia", level: 40 }
    ]
};

export const financeTree = {
    "Meteorologia": [
        { 
            title: "Podstawy synoptyki i elementy pogody", 
            desc: "Temperatura, ciśnienie atmosferyczne, wilgotność i wiatr.", 
            challenge: "Zadanie: Zinterpretuj gwałtowny spadek ciśnienia o 12 hPa w ciągu 3 godzin.",
            subtopics: ["Pomiary ciśnienia hPa i barometry", "Temperatura i punkt rosy (Dew Point)", "Siła i kierunek wiatru (równowaga geostroficzna)"]
        },
        { 
            title: "Masy powietrza i fronty atmosferyczne", 
            desc: "Front ciepły, zimny, zchłodzony (okluzja) i ich wpływy na pogodę.", 
            challenge: "Zadanie: Opisz 3 zjawiska meteorologiczne towarzyszące przejściu frontu zimnego.",
            subtopics: ["Struktura frontu zimnego i ciepłego", "Chmury frontowe i zmiana ciśnienia", "Front okluzji (okluzja zimna i ciepła)"]
        },
        { 
            title: "Chmury i zjawiska opadowe", 
            desc: "Klasyfikacja chmur (Cumulus, Stratus, Cirrus, Cumulonimbus).", 
            challenge: "Zadanie: Rozpoznaj cechy charakterystyczne chmury Cumulonimbus calvus.",
            subtopics: ["Piętra chmur (wysokie, średnie, niskie)", "Chmury konwekcyjne vs warstwowe", "Formowanie opadów i wyładowań"]
        },
        { 
            title: "Modele numeryczne i prognozowanie", 
            desc: "Zasady działania modeli GFS, ECMWF i interpretacja map synoptycznych.", 
            challenge: "Zadanie: Odczytaj kierunek i prędkość wiatru z izobar na mapie synoptycznej.",
            subtopics: ["Siatki modeli numerycznych GFS i ECMWF", "Analiza geopotencjału 500 hPa i 850 hPa", "Interpretacja wiatrów i opadów z izobar"]
        },
        { 
            title: "Nawigacja pogodowa i łowiectwo burz", 
            desc: "Radar opadowy, detektory wyładowań (Blitzortung) i szacowanie toru burzy.", 
            challenge: "Zadanie: Wyznacz szacowaną odległość od burzy przy różnicy czasu 6 sekund między błyskiem a grzmotem.",
            subtopics: ["Echo radarowe odbiciowości (dBZ)", "Sieci detekcji wyładowań Blitzortung", "Szacowanie toru superkomórki burzowej"]
        }
    ],
    "Finanse": [
        { 
            title: "Wartość pieniądza w czasie (TVM)", 
            desc: "Procent składany, wartość przyszła (FV), wartość obecna (PV) i dyskontowanie.", 
            challenge: "Zadanie: Oblicz PV dla kwoty 10 000 zł otrzymanej za 3 lata przy stopie r=8%.",
            subtopics: ["Procent prosty i składany", "Wzory na wartość przyszłą (FV) i obecną (PV)", "Renty kapitałowe i annuities"]
        },
        { 
            title: "Mechanika stóp procentowych i obligacje", 
            desc: "Stopy WIBOR/WIRON, rentowność obligacji (YTM) i cenowa wrażliwość.", 
            challenge: "Zadanie: Zinterpretuj wpływ podwyżki stóp procentowych o 100 pb na cenę rynkową obligacji.",
            subtopics: ["Stopy WIBOR/WIRON i stopy NBP", "Cena obligacji i wycena dyskontowa", "Rentowność YTM i Duration (czas trwania)"]
        },
        { 
            title: "Wycena spółek (Metoda DCF i Wskaźnikowa)", 
            desc: "Model zdyskontowanych przepływów pieniężnych oraz wskaźniki P/E, P/BV, EV/EBITDA.", 
            challenge: "Zadanie: Wyznacz wskaźnik C/Z (P/E) dla spółki z zyskiem 4 zł/akcję i ceną rynkową 48 zł.",
            subtopics: ["Przepływy FCFF i FCFE w wycenie DCF", "Stopa wzrostu g i wartość rezydualna (TV)", "Mnożniki P/E, P/BV, EV/EBITDA i ich interpretacja"]
        },
        { 
            title: "Struktura kapitału i Koszt Kapitału (WACC)", 
            desc: "Średni ważony koszt kapitału (WACC) oraz dźwignia finansowa.", 
            challenge: "Zadanie: Zapisz pełny wzór na WACC uwzględniający tarczę podatkową (1-T).",
            subtopics: ["Koszt kapitału własnego r_e i obcego r_d", "Tarcza podatkowa (Tax Shield)", "Optymalna struktura kapitału i twierdzenie MM"]
        },
        { 
            title: "Teoria Portfelowa Markowitza i CAPM", 
            desc: "Dywersyfikacja ryzyka, portfel optymalny oraz model wyceny aktywów kapitałowych.", 
            challenge: "Zadanie: Wyjaśnij znaczenie współczynnika Beta = 1.4 dla akcji w stosunku do indeksu.",
            subtopics: ["Ryzyko systematyczne i specyficzne", "Granica efektywna portfeli Markowitza", "Współczynnik Beta i linia SML w modelu CAPM"]
        },
        { 
            title: "Instrumenty pochodne (Opcje, Futures)", 
            desc: "Kontrakty futures, opcje call/put oraz strategie zabezpieczające (hedging).", 
            challenge: "Zadanie: Sporządź profil wypłaty dla nabytej opcji Call o cenie wykonania K=100 zł.",
            subtopics: ["Mechanika kontraktów Futures i Forward", "Opcje kupna (Call) i sprzedaży (Put)", "Hedging ryzyka walutowego i stóp procentowych"]
        }
    ],
    "Rachunkowość": [
        { 
            title: "Bilans przedsiębiorstwa (Aktywa i Pasawa)", 
            desc: "Równowaga bilansowa, aktywa trwałe/obrotowe, kapitał własny i obcy.", 
            challenge: "Zadanie: Przyporządkuj 5 podanych pozycji (np. maszyny, kredyt) do Aktywów lub Pasawów.",
            subtopics: ["Zasada podwójnego zapisu", "Podział aktywów (trwałe vs obrotowe)", "Pasawo: kapitały własne i zobowiązania"]
        },
        { 
            title: "Rachunek Zysków i Strat (RZiS)", 
            desc: "Przychody ze sprzedaży, EBIT, EBITDA oraz Zysk Netto.", 
            challenge: "Zadanie: Oblicz marżę zysku operacyjnego EBIT przy przychodach 100k i EBIT 15k.",
            subtopics: ["Wariant porównawczy i kalkulacyjny RZiS", "Koszty operacyjne COGS i koszty ogólnego zarządu", "Wynik operacyjny EBIT, EBITDA i Zysk Netto"]
        },
        { 
            title: "Rachunek Przepływów Pieniężnych (Cash Flow)", 
            desc: "Przepływy z działalności operacyjnej, inwestycyjnej i finansowej.", 
            challenge: "Zadanie: Wyjaśnij dlaczego dodatni zysk netto nie gwarantuje dodatnich przepływów operacyjnych.",
            subtopics: ["Metoda pośrednia i bezpośrednia przygotowania CF", "Korekty zysku netto o amortyzację i kapitał obrotowy", "Analiza przepływów finansowych i inwestycyjnych"]
        },
        { 
            title: "Amortyzacja i wycena zapasów", 
            desc: "Amortyzacja liniowa vs degresywna, metody wyceny zapasów (FIFO/LIFO/AVCO).", 
            challenge: "Zadanie: Oblicz roczną kwotę odpisów amortyzacyjnych środka trwałego o wartości 50k zł (stawka 20%).",
            subtopics: ["Stawki amortyzacyjne i metody rozliczania", "Zasady wyceny rozchodu zapasów FIFO i LIFO", "Odpisy aktualizujące wartość aktywów"]
        },
        { 
            title: "Analiza Wskaźnikowa Płynności i Rentowności", 
            desc: "Wskaźnik bieżącej płynności, ROE, ROA, ROS.", 
            challenge: "Zadanie: Zinterpretuj wskaźnik rentowności kapitału własnego ROE = 18%.",
            subtopics: ["Wskaźniki płynności III stopni (bieżący, szybki, gotówkowy)", "Wskaźniki rentowności ROE, ROA, ROS", "Analiza DuPonta i dekompozycja ROE"]
        }
    ],
    "Ekonomia": [
        { 
            title: "Mikroekonomia: Popyt, Podaż i Równowaga", 
            desc: "Prawo popytu i podaży, punkt równowagi rynkowej i elastyczność cenowa.", 
            challenge: "Zadanie: Zinterpretuj elastyczność cenową popytu E_p = -2.5 (popyt elastyczny).",
            subtopics: ["Krzywa popytu D i krzywa podaży S", "Punkt równowagi rynkowej (Cena P* i Ilość Q*)", "Cenowa, dochodowa i mieszana elastyczność popytu"]
        },
        { 
            title: "Teoria Wyboru Konsumenta", 
            desc: "Użyteczność krańcowa, krzywe obojętności i linia budżetowa.", 
            challenge: "Zadanie: Sformułuj pierwsze prawo Gossena dotyczące malejącej użyteczności krańcowej.",
            subtopics: ["Użyteczność całkowita (TU) i krańcowa (MU)", "Krzywe obojętności i krańcowa stopa substytucji", "Optimum konsumenta przy danej linii budżetowej"]
        },
        { 
            title: "Struktury Rynkowe (Monopol, Oligopol, Konkurencja)", 
            desc: "Warunki konkurencji doskonałej, monopoli i duopoli Cournota/Bertranda.", 
            challenge: "Zadanie: Zapisz warunek maksymalizacji zysku przedsiębiorstwa (Utarg Krańcowy = Koszt Krańcowy).",
            subtopics: ["Równowaga w konkurencji doskonałej", "Monopol naturalny i cena monopolowa", "Modele oligopolu (Cournot, Bertrand, załamana krzywa popytu)"]
        },
        { 
            title: "Makroekonomia: PKB, Inflacja i Bezrobocie", 
            desc: "Produkt Krajowy Brutto, wskaźnik CPI i krzywa Phillipsa.", 
            challenge: "Zadanie: Wyjaśnij różnicę pomiędzy PKB nominalnym a PKB realnym (rola deflatora).",
            subtopics: ["Metody wyliczania PKB (wydatkowa, dochodowa, produkcyjna)", "Inflacja CPI vs PPI i stopa bezrobocia", "Krzywa Phillipsa w krótkim i długim okresie"]
        },
        { 
            title: "Polityka Monetarna i Fiskalna", 
            desc: "Rola Banku Centralnego, stopa rezerw, stopy procentowe i budżet państwa.", 
            challenge: "Zadanie: Opisz wpływ podwyżki stopy rezerwy obowiązkowej na kreację pieniądza w bankach.",
            subtopics: ["Narzędzia banku centralnego (stopy, operacje otwartego rynku)", "Podatki i wydatki rządowe (Polityka fiskalna)", "Mnożnik kreacji pieniądza i mnożnik budżetowy"]
        }
    ]
};
