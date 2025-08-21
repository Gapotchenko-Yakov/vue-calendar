export type Language = 'ru' | 'en';

export type Locale = {
    months: string[];
    weekdays: string[];
};

export type Locales = Record<Language, Locale>;