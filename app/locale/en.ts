import { ApiQueryOption, ApiResponseMonth } from "~/types/DataTypes";
import { Translations } from ".";

export const ENGLISH: Translations = {
  search: "Search...",
  queryItems: {
    [ApiQueryOption.Nitrogen]: "Price of nitrogen",
    [ApiQueryOption.Phosphorus]: "Price of phosphorus",
    [ApiQueryOption.Potash]: "Price of potash",
    [ApiQueryOption.Rice]: "Price of rice",
  },
  queryItemLabels: {
    [ApiQueryOption.Nitrogen]: "Nitrogen",
    [ApiQueryOption.Phosphorus]: "Phosphorus",
    [ApiQueryOption.Potash]: "Potash",
    [ApiQueryOption.Rice]: "Rice",
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
