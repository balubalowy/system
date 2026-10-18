// app/js/budget/constants.js
// Definicje kategorii, etykiet cykliczności i opcji horyzontu budżetowego

export const EXPENSE_CATS = [
    { name: "Mieszkanie", icon: "home", color: "#0A84FF" },
    { name: "Jedzenie", icon: "utensils", color: "#2BBF71" },
    { name: "Transport", icon: "car", color: "#5E5CE6" },
    { name: "Subskrypcje", icon: "credit-card", color: "#FF375F" },
    { name: "Elektronika", icon: "monitor-smartphone", color: "#FF9F0A" },
    { name: "Ubrania", icon: "shirt", color: "#64D2FF" },
    { name: "Zdrowie", icon: "heart-pulse", color: "#FF453A" },
    { name: "Rozrywka", icon: "gamepad-2", color: "#BF5AF2" },
    { name: "Edukacja", icon: "graduation-cap", color: "#30D158" },
    { name: "Inne", icon: "more-horizontal", color: "#8B949E" }
];

export const INCOME_CATS = [
    { name: "Wynagrodzenie", icon: "briefcase", color: "#30D158" },
    { name: "Premie", icon: "gift", color: "#0A84FF" },
    { name: "Odsetki", icon: "trending-up", color: "#BF5AF2" },
    { name: "Inne Wpływy", icon: "plus-circle", color: "#2BBF71" }
];

export const INV_CATS = [
    { name: "Konta Oszczędnościowe", icon: "piggy-bank", color: "#0A84FF" },
    { name: "Obligacje Skarbowe", icon: "landmark", color: "#FF9F0A" },
    { name: "Giełda i ETF", icon: "line-chart", color: "#BF5AF2" },
    { name: "Kryptowaluty", icon: "bitcoin", color: "#FF375F" }
];

export const RECURRING_LABELS = {
    '': 'Jednorazowy',
    'monthly': 'Co miesiąc',
    'weekly': 'Co tydzień',
    'yearly': 'Co rok',
    'quarterly': 'Co kwartał'
};

export const HORIZON_OPTIONS = [
    { months: 1, label: '1 mies.' },
    { months: 2, label: '2 mies.' },
    { months: 3, label: '3 mies.' },
    { months: 6, label: '6 mies.' },
    { months: 12, label: '1 rok' },
    { months: 24, label: '2 lata' },
    { months: 36, label: '3 lata' },
    { months: 48, label: '4 lata' },
    { months: 60, label: '5 lat' },
    { months: 120, label: '10 lat' }
];
