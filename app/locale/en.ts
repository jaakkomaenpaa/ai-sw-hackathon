import { ApiResponseMonth } from "~/types";
import { Translations } from ".";

export const ENGLISH: Translations = {
  search: "Search...",
  listItems: {
    electricity: "price of electricity",
    oat: "price of oat",
    fertilizers: "price of fertilizers",
  },
  months: {
    [ApiResponseMonth.January]: "Jan",
    [ApiResponseMonth.February]: "Feb",
    [ApiResponseMonth.March]: "Mar",
    [ApiResponseMonth.April]: "Apr",
    [ApiResponseMonth.May]: "May",
    [ApiResponseMonth.June]: "Jun",
    [ApiResponseMonth.July]: "Jul",
    [ApiResponseMonth.August]: "Aug",
    [ApiResponseMonth.September]: "Sep",
    [ApiResponseMonth.October]: "Oct",
    [ApiResponseMonth.November]: "Nov",
    [ApiResponseMonth.December]: "Dec",
  },
};
