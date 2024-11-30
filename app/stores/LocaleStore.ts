import { create } from 'zustand';
import { LOCALE, Translations } from '~/locale';
import { Language, LocalStorageKey } from '~/types';

type LocaleStore = {
  language: Language;
  translations: Translations;
  changeLanguage: (newLang: Language) => void;
};

const getStoredLanguage = () => {
  if (typeof window === 'undefined' || !window.localStorage) {
    return Language.English;
  }

  const language = localStorage.getItem(LocalStorageKey.Language);
  if (language) {
    return language as Language;
  }

  return Language.English;
};

const useLocaleStore = create<LocaleStore>((set) => ({
  language: getStoredLanguage(),
  translations: LOCALE[getStoredLanguage()],
  changeLanguage: (newLang: Language) => {
    if (typeof window !== 'undefined' && window.localStorage) {
      localStorage.setItem(LocalStorageKey.Language, newLang);
    }
    set({ language: newLang });
    set({ translations: LOCALE[newLang] });
  },
}));

export const useLocale = () => useLocaleStore();
