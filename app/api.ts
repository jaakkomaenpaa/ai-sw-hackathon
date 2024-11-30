import axios from "axios";
import { FertiliserProduct, LineChartDataEntry } from "./types";

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
  years: number[]
): Promise<LineChartDataEntry[]> => {
  const yearString = years.join(",");

  const response = await axios.get(
    `${BASE_URL}/fertiliser/prices?products=${product}&years=${yearString}`
  );

  const modifiedData: LineChartDataEntry[] = response.data
    .map((entry: FertiliserPriceResponseObject) => ({
      labelFull: `${entry.month} ${entry.year}`,
      labelShort: `${entry.month} ${entry.year.toString().slice(2)}`,
      dataValue: entry.price,
    }))
    .reverse();

  return modifiedData;
};
