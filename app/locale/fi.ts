import { ApiResponseMonth } from "~/types";
import { Translations } from ".";

export const FINNISH: Translations = {
  search: "Hae...",
  listItems: {
    electricity: "sähkön hinta",
    oat: "kauran hinta",
    fertilizers: "lannoitteiden hinta",
  },
  months: {
    [ApiResponseMonth.January]: "Tammi",
    [ApiResponseMonth.February]: "Helmi",
    [ApiResponseMonth.March]: "Maalis",
    [ApiResponseMonth.April]: "Huhti",
    [ApiResponseMonth.May]: "Touko",
    [ApiResponseMonth.June]: "Kesä",
    [ApiResponseMonth.July]: "Heinä",
    [ApiResponseMonth.August]: "Elo",
    [ApiResponseMonth.September]: "Syys",
    [ApiResponseMonth.October]: "Loka",
    [ApiResponseMonth.November]: "Marras",
    [ApiResponseMonth.December]: "Joulu",
  },
};
