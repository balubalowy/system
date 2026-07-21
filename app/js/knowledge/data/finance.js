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
        { title: "Podstawy synoptyki i elementy pogody", desc: "Temperatura, ciśnienie atmosferyczne, wilgotność i wiatr.", challenge: "Zinterpretuj spadek ciśnienia o 10 hPa w 3 godziny." },
        { title: "Masy powietrza i fronty atmosferyczne", desc: "Front ciepły, zimny, zchłodzony (okluzja) i ich wpływy na pogodę.", challenge: "Opisz zjawiska towarzyszące przejściu frontu zimnego." },
        { title: "Chmury i zjawiska opadowe", desc: "Klasyfikacja chmur (Cumulus, Stratus, Cirrus, Cumulonimbus).", challenge: "Rozpoznaj chmurę burzową i opisujące ją uwarunkowania." },
        { title: "Modele numeryczne i prognozowanie", desc: "Zasady działania modeli GFS, ECMWF i interpretacja map synoptycznych.", challenge: "Odczytaj wiatr i opady z rozkładu izobar na mapie." },
        { title: "Nawigacja pogodowa i łowiectwo burz", desc: "Radar opadowy, detektory wyładowań (Blitzortung) i szacowanie toru burzy.", challenge: "Oblicz odległość od burzy na podstawie różnicy światła i dźwięku." }
    ],
    "Finanse": [
        { title: "Wartość pieniądza w czasie (TVM)", desc: "Procent składany, wartość przyszła (FV), wartość obecna (PV) i dyskontowanie.", challenge: "Oblicz PV dla 10 000 zł otrzymanych za 3 lata przy stopie 8%." },
        { title: "Mechanika stóp procentowych i obligacje", desc: "Stopy WIBOR/WIRON, rentowność obligacji (YTM) i cenowa wrażliwość.", challenge: "Zinterpretuj wpływ podwyżki stóp procentowych na ceny obligacji." },
        { title: "Wycena spółek (Metoda DCF i Wskaźnikowa)", desc: "Model zdyskontowanych przepływów pieniężnych oraz wskaźniki P/E, P/BV, EV/EBITDA.", challenge: "Wyznacz wskaźnik C/Z (P/E) dla spółki z zyskiem 5 zł/akcję i ceną 50 zł." },
        { title: "Struktura kapitału i Koszt Kapitału (WACC)", desc: "Średni ważony koszt kapitału (WACC) oraz dźwignia finansowa.", challenge: "Zapisz wzór na WACC uwzględniający tarczę podatkową." },
        { title: "Teoria Portfelowa Markowitza i CAPM", desc: "Dywersyfikacja ryzyka, portfel optymalny oraz model wyceny aktywów kapitałowych.", challenge: "Wyjaśnij pojęcie wskaźnika Beta dla akcji." },
        { title: "Instrumenty pochodne (Opcje, Futures)", desc: "Kontrakty futures, opcje call/put oraz strategie zabezpieczające (hedging).", challenge: "Opisz profil wypłaty dla nabywcy opcji Call." }
    ],
    "Rachunkowość": [
        { title: "Bilans przedsiębiorstwa (Aktywa i Pasawa)", desc: "Równowaga bilansowa, aktywa trwałe/obrotowe, kapitał własny i obcy.", challenge: "Przyporządkuj należności handlowe i środki trwałe do aktywów." },
        { title: "Rachunek Zysków i Strat (RZiS)", desc: "Przychody ze sprzedaży, EBIT, EBITDA oraz Zysk Netto.", challenge: "Różnica pomiędzy zyskiem operacyjnym EBIT a zyskiem netto." },
        { title: "Rachunek Przepływów Pieniężnych (Cash Flow)", desc: "Przepływy z działalności operacyjnej, inwestycyjnej i finansowej.", challenge: "Wyjaśnij dlaczego dodatni zysk netto nie gwarantuje dodatniego Cash Flow." },
        { title: "Amortyzacja i wycena zapasów", desc: "Amortyzacja liniowa vs degresywna, metody wyceny zapasów (FIFO/LIFO/AVCO).", challenge: "Oblicz roczny odpis amortyzacyjny metodą liniową." },
        { title: "Analiza Wskaźnikowa Płynności i Rentowności", desc: "Wskaźnik bieżącej płynności, ROE, ROA, ROS.", challenge: "Zinterpretuj wskaźnik ROE = 18%." }
    ],
    "Ekonomia": [
        { title: "Mikroekonomia: Popyt, Podaż i Równowaga", desc: "Prawo popytu i podaży, punkt równowagi rynkowej i elastyczność cenowa.", challenge: "Zinterpretuj elastyczność cenową popytu E_p = -2.5." },
        { title: "Teoria Wyboru Konsumenta", desc: "Użyteczność krańcowa, krzywe obojętności i linia budżetowa.", challenge: "Wyjaśnij prawo malejącej użyteczności krańcowej." },
        { title: "Struktury Rynkowe (Monopol, Oligopol, Konkurencja)", desc: "Warunki konkurencji doskonałej, monopoli i duopoli Cournota/Bertranda.", challenge: "Opisz warunek maksymalizacji zysku MR = MC." },
        { title: "Makroekonomia: PKB, Inflacja i Bezrobocie", desc: "Produkt Krajowy Brutto, wskaźnik CPI i krzywa Phillipsa.", challenge: "Różnica pomiędzy PKB nominalnym a realnym (deflator)." },
        { title: "Polityka Monetarna i Fiskalna", desc: "Rola Banku Centralnego, stopa rezerw, stopy procentowe i budżet państwa.", challenge: "Opisz skutki ekspansywnej polityki monetarnej na inflację." }
    ]
};
