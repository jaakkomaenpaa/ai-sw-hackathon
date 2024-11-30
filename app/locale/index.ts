import { Language } from "../types";
import { ENGLISH } from "./en";
import { FINNISH } from "./fi";

export type Translations = {
  search: string;
  listItems: {
    [key: string]: string;
  };
  months: {
    [key: string]: string;
  };
  [key: string]: string | { [key: string]: string };
};

export const LOCALE: { [key in Language]: Translations } = {
  [Language.English]: ENGLISH,
  [Language.Finnish]: FINNISH,
};