import type { Language, Locales } from "../types/locales";

export function generateMonths(locale: Language): string[] {
    return [...Array(12)].map((_, i) =>
        new Intl.DateTimeFormat(locale, { month: "short" }).format(new Date(2025, i))
    );
}

export function generateWeekdays(locale: Language): string[] {
    const base = new Date(1970, 0, 5);
    return [...Array(7)].map((_, i) =>
        new Intl.DateTimeFormat(locale, { weekday: "short" })
            .format(new Date(base.getTime() + i * 86400000))
    );
}

function capitalizeFirst(str: string): string {
    if (!str) return '';
    return str[0].toUpperCase() + str.slice(1);
}


export const locales: Locales = {
    ru: {
        months: generateMonths("ru").map(capitalizeFirst),
        weekdays: generateWeekdays("ru").map(capitalizeFirst),
    },
    en: {
        months: generateMonths("en").map(capitalizeFirst),
        weekdays: generateWeekdays("en").map(capitalizeFirst),
    },
};