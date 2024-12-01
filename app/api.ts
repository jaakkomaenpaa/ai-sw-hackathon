import axios from "axios";
import {
  ApiResponseMonth,
  FertiliserProduct,
  LineDataEntry,
} from "./types";
import { getQuarterByMonthType } from "./utils";

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
): Promise<LineDataEntry[]> => {
  const yearString = years.join(",");

  const response = await axios.get(
    `${BASE_URL}/fertiliser/prices?products=${product}&years=${yearString}`
  );

  const modifiedData: LineDataEntry[] = response.data
    .map((entry: FertiliserPriceResponseObject) => {
      return {
        quarter: `${getQuarterByMonthType(entry.month as ApiResponseMonth)} ${
          entry.year
        }`,
        price: entry.price,
      };
    })
    .reverse();

  return modifiedData;
};
