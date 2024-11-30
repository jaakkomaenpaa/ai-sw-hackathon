import axios from "axios";
import {
  ApiResponseMonth,
  FertiliserProduct,
  Language,
  LineChartDataEntry,
} from "./types";
import { LOCALE } from "./locale";

const BASE_URL = "/api";

type FertiliserPriceResponseObject = {
  memberStateName: string;
  month: string;
  price: number;
  product: FertiliserProduct;
  quarter: string;
  unit: string;
  year: number;
};

export const fetchFertiliserPrices = async (
  product: FertiliserProduct,
  years: number[],
  language: Language
): Promise<LineChartDataEntry[]> => {
  const yearString = years.join(",");

  const response = await axios.get(
    `${BASE_URL}/fertiliser/prices?products=${product}&years=${yearString}`
  );

  const months = LOCALE[language].months;

  const modifiedData: LineChartDataEntry[] = response.data
    .map((entry: FertiliserPriceResponseObject) => {
      const month = months[entry.month as ApiResponseMonth];

      return {
        labelFull: `${month} ${entry.year}`,
        labelShort: `${month} ${entry.year.toString().slice(2)}`,
        dataValue: entry.price,
      };
    })
    .reverse();

  return modifiedData;
};
