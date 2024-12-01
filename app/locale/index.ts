import { ApiQueryOption, ApiResponseMonth, Language } from "../types";
import { ENGLISH } from "./en";
import { FINNISH } from "./fi";

export type Translations = {
  search: string;
  queryItems: {
    [key in ApiQueryOption]: string;
  };
  queryItemLabels: {
    [key in ApiQueryOption]: string;
  };
  months: {
    [key in ApiResponseMonth]: string;
  };
  [key: string]: string | { [key: string]: string };
};

export const LOCALE: { [key in Language]: Translations } = {
  [Language.English]: ENGLISH,
  [Language.Finnish]: FINNISH,
};
