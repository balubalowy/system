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
        { title: "Podstawy synoptyki i elementy pogody", desc: "Temperatura, ciśnienie atmosferyczne, wilgotność i wiatr.", challenge: "Zadanie: Zinterpretuj gwałtowny spadek ciśnienia o 12 hPa w ciągu 3 godzin." },
        { title: "Masy powietrza i fronty atmosferyczne", desc: "Front ciepły, zimny, zchłodzony (okluzja) i ich wpływy na pogodę.", challenge: "Zadanie: Opisz 3 zjawiska meteorologiczne towarzyszące przejściu frontu zimnego." },
        { title: "Chmury i zjawiska opadowe", desc: "Klasyfikacja chmur (Cumulus, Stratus, Cirrus, Cumulonimbus).", challenge: "Zadanie: Rozpoznaj cechy charakterystyczne chmury Cumulonimbus calvus." },
        { title: "Modele numeryczne i prognozowanie", desc: "Zasady działania modeli GFS, ECMWF i interpretacja map synoptycznych.", challenge: "Zadanie: Odczytaj kierunek i prędkość wiatru z izobar na mapie synoptycznej." },
        { title: "Nawigacja pogodowa i łowiectwo burz", desc: "Radar opadowy, detektory wyładowań (Blitzortung) i szacowanie toru burzy.", challenge: "Zadanie: Wyznacz szacowaną odległość od burzy przy różnicy czasu 6 sekund między błyskiem a grzmotem." }
    ],
    "Finanse": [
        { title: "Wartość pieniądza w czasie (TVM)", desc: "Procent składany, wartość przyszła (FV), wartość obecna (PV) i dyskontowanie.", challenge: "Zadanie: Oblicz PV dla kwoty 10 000 zł otrzymanej za 3 lata przy stopie r=8%." },
        { title: "Mechanika stóp procentowych i obligacje", desc: "Stopy WIBOR/WIRON, rentowność obligacji (YTM) i cenowa wrażliwość.", challenge: "Zadanie: Zinterpretuj wpływ podwyżki stóp procentowych o 100 pb na cenę rynkową obligacji." },
        { title: "Wycena spółek (Metoda DCF i Wskaźnikowa)", desc: "Model zdyskontowanych przepływów pieniężnych oraz wskaźniki P/E, P/BV, EV/EBITDA.", challenge: "Zadanie: Wyznacz wskaźnik C/Z (P/E) dla spółki z zyskiem 4 zł/akcję i ceną rynkową 48 zł." },
        { title: "Struktura kapitału i Koszt Kapitału (WACC)", desc: "Średni ważony koszt kapitału (WACC) oraz dźwignia finansowa.", challenge: "Zadanie: Zapisz pełny wzór na WACC uwzględniający tarczę podatkową (1-T)." },
        { title: "Teoria Portfelowa Markowitza i CAPM", desc: "Dywersyfikacja ryzyka, portfel optymalny oraz model wyceny aktywów kapitałowych.", challenge: "Zadanie: Wyjaśnij znaczenie współczynnika Beta = 1.4 dla akcji w stosunku do indeksu." },
        { title: "Instrumenty pochodne (Opcje, Futures)", desc: "Kontrakty futures, opcje call/put oraz strategie zabezpieczające (hedging).", challenge: "Zadanie: Sporządź profil wypłaty dla nabytej opcji Call o cenie wykonania K=100 zł." }
    ],
    "Rachunkowość": [
        { title: "Bilans przedsiębiorstwa (Aktywa i Pasawa)", desc: "Równowaga bilansowa, aktywa trwałe/obrotowe, kapitał własny i obcy.", challenge: "Zadanie: Przyporządkuj 5 podanych pozycji (np. maszyny, kredyt) do Aktywów lub Pasawów." },
        { title: "Rachunek Zysków i Strat (RZiS)", desc: "Przychody ze sprzedaży, EBIT, EBITDA oraz Zysk Netto.", challenge: "Zadanie: Oblicz marżę zysku operacyjnego EBIT przy przychodach 100k i EBIT 15k." },
        { title: "Rachunek Przepływów Pieniężnych (Cash Flow)", desc: "Przepływy z działalności operacyjnej, inwestycyjnej i finansowej.", challenge: "Zadanie: Wyjaśnij dlaczego dodatni zysk netto nie gwarantuje dodatnich przepływów operacyjnych." },
        { title: "Amortyzacja i wycena zapasów", desc: "Amortyzacja liniowa vs degresywna, metody wyceny zapasów (FIFO/LIFO/AVCO).", challenge: "Zadanie: Oblicz roczną kwotę odpisów amortyzacyjnych środka trwałego o wartości 50k zł (stawka 20%)." },
        { title: "Analiza Wskaźnikowa Płynności i Rentowności", desc: "Wskaźnik bieżącej płynności, ROE, ROA, ROS.", challenge: "Zadanie: Zinterpretuj wskaźnik rentowności kapitału własnego ROE = 18%." }
    ],
    "Ekonomia": [
        { title: "Mikroekonomia: Popyt, Podaż i Równowaga", desc: "Prawo popytu i podaży, punkt równowagi rynkowej i elastyczność cenowa.", challenge: "Zadanie: Zinterpretuj elastyczność cenową popytu E_p = -2.5 (popyt elastyczny)." },
        { title: "Teoria Wyboru Konsumenta", desc: "Użyteczność krańcowa, krzywe obojętności i linia budżetowa.", challenge: "Zadanie: Sformułuj pierwsze prawo Gossena dotyczące malejącej użyteczności krańcowej." },
        { title: "Struktury Rynkowe (Monopol, Oligopol, Konkurencja)", desc: "Warunki konkurencji doskonałej, monopoli i duopoli Cournota/Bertranda.", challenge: "Zadanie: Zapisz warunek maksymalizacji zysku przedsiębiorstwa (Utarg Krańcowy = Koszt Krańcowy)." },
        { title: "Makroekonomia: PKB, Inflacja i Bezrobocie", desc: "Produkt Krajowy Brutto, wskaźnik CPI i krzywa Phillipsa.", challenge: "Zadanie: Wyjaśnij różnicę pomiędzy PKB nominalnym a PKB realnym (rola deflatora)." },
        { title: "Polityka Monetarna i Fiskalna", desc: "Rola Banku Centralnego, stopa rezerw, stopy procentowe i budżet państwa.", challenge: "Zadanie: Opisz wpływ podwyżki stopy rezerwy obowiązkowej na kreację pieniądza w bankach." }
    ]
};
