import { create } from "zustand";
import { LOCALE, Translations } from "~/locale";
import { Language } from "~/types";

type LocaleStore = {
  language: Language;
  translations: Translations;
  changeLanguage: (newLang: Language) => void;
};

const useLocaleStore = create<LocaleStore>((set) => ({
  language: Language.English,
  translations: LOCALE[Language.English],
  changeLanguage: (newLang: Language) => {
    set({ language: newLang });
    set({ translations: LOCALE[newLang] });
  },
}));

export const useLocale = () => useLocaleStore();
