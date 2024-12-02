import { ApiQueryOption, ApiResponseMonth } from "~/types/DataTypes";
import { Translations } from ".";

export const ENGLISH: Translations = {
  search: "Search...",
  makePredictions: "Make predictions",
  queryItems: {
    [ApiQueryOption.Nitrogen]: "Price of nitrogen",
    [ApiQueryOption.Phosphorus]: "Price of phosphorus",
    [ApiQueryOption.Potash]: "Price of potash",
    [ApiQueryOption.Rice]: "Price of rice",
    [ApiQueryOption.FeedOats]: "Price of feed oats",
    [ApiQueryOption.FeedRye]: "Price of feed rye",
    [ApiQueryOption.MaltingBarley]: "Price of malting barley",
    [ApiQueryOption.MillingRye]: "Price of milling rye",
    [ApiQueryOption.MillingWheat]: "Price of milling wheat",
  },
  queryItemLabels: {
    [ApiQueryOption.Nitrogen]: "Nitrogen",
    [ApiQueryOption.Phosphorus]: "Phosphorus",
    [ApiQueryOption.Potash]: "Potash",
    [ApiQueryOption.Rice]: "Rice",
    [ApiQueryOption.FeedOats]: "Feed oats",
    [ApiQueryOption.FeedRye]: "Feed rye",
    [ApiQueryOption.MaltingBarley]: "Malting barley",
    [ApiQueryOption.MillingRye]: "Milling rye",
    [ApiQueryOption.MillingWheat]: "Milling wheat",
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
