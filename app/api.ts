import axios from "axios";
import { FertiliserProduct, LineDataEntry } from "./types";
import {
  getWeekNumberByDate,
  transformMonthsToQuarters,
  transformWeeksToQuarters,
} from "./utils";

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
  startYear: number,
  endYear: number
): Promise<LineDataEntry[]> => {
  if (startYear > endYear) {
    startYear = endYear;
  }

  const yearString = Array.from(
    { length: endYear - startYear + 1 },
    (_, i) => startYear + i
  ).join(",");

  const response = await axios.get(
    `${BASE_URL}/fertiliser/prices?products=${product}&years=${yearString}`
  );

  const modifiedData: LineDataEntry[] =
    transformMonthsToQuarters<FertiliserPriceResponseObject>(
      response.data.reverse()
    );

  return modifiedData;
};

type RicePriceResponseObject = {
  memberStateCode: string;
  memberStateName: string;
  beginDate: string;
  endDate: string;
  weekNumber: number;
  price: string;
  unit: string;
  marketingYear: string;
  stage: string;
  type: string;
  variety: string;
};

interface EditedRicePriceResponse extends RicePriceResponseObject {
  year: number;
  priceInt: number;
}

export const fetchRicePrices = async (startYear: number, endYear: number) => {
  const countryCodes = "FR";
  const beginDate = `01/01/${startYear}`;
  const endDate = `31/12/${endYear}`;
  const varieties = "Avg";
  const stages = "Broken";

  const response = await axios.get(
    `${BASE_URL}/rice/prices?memberStateCodes=${countryCodes}&beginDate=${beginDate}&endDate=${endDate}&varieties=${varieties}&stages=${stages}`
  );

  const modifiedData: EditedRicePriceResponse[] = response.data
    .reverse()
    .map((entry: RicePriceResponseObject) => {
      const year = parseInt(entry.beginDate.split("/")[2]);
      const priceInt = parseInt(entry.price.split("€")[1]);
      const weekNumber = getWeekNumberByDate(entry.beginDate);

      return {
        ...entry,
        year,
        priceInt,
        weekNumber,
      };
    });

  const transformedData: LineDataEntry[] =
    transformWeeksToQuarters<EditedRicePriceResponse>(modifiedData);

  console.log("modified rice", transformedData);

  return transformedData;
};
