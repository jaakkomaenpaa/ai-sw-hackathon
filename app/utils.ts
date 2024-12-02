import { ApiResponseMonth, CombinedLineData, LineData, LineDataEntry, Quarter } from "./types/DataTypes";

export const getQuarterByWeekNumber = (week: number): Quarter => {
  if (week >= 1 && week <= 13) {
    return Quarter.Q1;
  } else if (week >= 14 && week <= 26) {
    return Quarter.Q2;
  } else if (week >= 27 && week <= 39) {
    return Quarter.Q3;
  } else {
    return Quarter.Q4;
  }
};

export const getQuarterByMonthOrder = (month: number): Quarter => {
  if (month >= 1 && month <= 3) {
    return Quarter.Q1;
  } else if (month >= 4 && month <= 6) {
    return Quarter.Q2;
  } else if (month >= 7 && month <= 9) {
    return Quarter.Q3;
  } else {
    return Quarter.Q4;
  }
};

export const getQuarterByMonthType = (month: ApiResponseMonth): Quarter => {
  if (
    [
      ApiResponseMonth.January,
      ApiResponseMonth.February,
      ApiResponseMonth.March,
    ].includes(month)
  ) {
    return Quarter.Q1;
  } else if (
    [
      ApiResponseMonth.April,
      ApiResponseMonth.May,
      ApiResponseMonth.June,
    ].includes(month)
  ) {
    return Quarter.Q2;
  } else if (
    [
      ApiResponseMonth.July,
      ApiResponseMonth.August,
      ApiResponseMonth.September,
    ].includes(month)
  ) {
    return Quarter.Q3;
  } else if (
    [
      ApiResponseMonth.October,
      ApiResponseMonth.November,
      ApiResponseMonth.December,
    ].includes(month)
  ) {
    return Quarter.Q4;
  }

  // Default, should not be needed
  return Quarter.Q1;
};

export const quarterToNumber: Record<Quarter, number> = {
  [Quarter.Q1]: 1,
  [Quarter.Q2]: 2,
  [Quarter.Q3]: 3,
  [Quarter.Q4]: 4,
};

export const numberToQuarter = (num: number): Quarter => {
  if (num === 1) {
    return Quarter.Q1;
  } else if (num === 2) {
    return Quarter.Q2;
  } else if (num === 3) {
    return Quarter.Q3;
  } else {
    return Quarter.Q4;
  }
};

export const getWeekNumberByDate = (dateString: string): number => {
  const [day, month, year] = dateString.split("/").map(Number);
  const date = new Date(year, month - 1, day);

  // Calculate the ISO week number
  const startOfYear = new Date(date.getFullYear(), 0, 1);
  const days = Math.floor(
    (date.getTime() - startOfYear.getTime()) / (24 * 60 * 60 * 1000)
  );

  // Adjust for ISO week starting on Monday
  const isoDay = (startOfYear.getDay() || 7) - 1; // Make Sunday = 7
  const weekNumber = Math.ceil((days + isoDay) / 7);

  return weekNumber;
};

export const transformMonthsToQuarters = <
  T extends { month: string; price: number; year: number }
>(
  data: T[]
): LineDataEntry[] => {
  const lineEntries: LineDataEntry[] = [];

  let currentQuarter = 1;
  let currentQuarterPrices: number[] = [];

  data.forEach((entry: T, index: number) => {
    const quarter =
      quarterToNumber[getQuarterByMonthType(entry.month as ApiResponseMonth)];

    if (quarter === currentQuarter) {
      currentQuarterPrices.push(entry.price);
    } else if (quarter !== currentQuarter) {
      const sum = currentQuarterPrices.reduce((acc, num) => acc + num, 0);
      const avgPrice = sum / currentQuarterPrices.length || 0;

      let prevEntryYear = entry.year;
      if (data[index - 1]) {
        prevEntryYear = data[index - 1].year;
      }

      lineEntries.push({
        quarter: `${numberToQuarter(currentQuarter)}-${prevEntryYear}`,
        price: parseInt(avgPrice.toFixed(0)),
      });

      currentQuarter = quarter;
      currentQuarterPrices = [];
    }
  });

  return lineEntries;
};

export const transformWeeksToQuarters = <
  T extends { weekNumber: number; year: number; priceInt: number }
>(
  data: T[]
): LineDataEntry[] => {
  const lineEntries: LineDataEntry[] = [];

  let currentQuarter = 1;
  let currentQuarterPrices: number[] = [];

  data.forEach((entry: T, index: number) => {
    const quarter = quarterToNumber[getQuarterByWeekNumber(entry.weekNumber)];

    if (quarter === currentQuarter) {
      currentQuarterPrices.push(entry.priceInt);
    } else if (quarter !== currentQuarter) {
      const sum = currentQuarterPrices.reduce((acc, num) => acc + num, 0);
      const avgPrice = sum / currentQuarterPrices.length || 0;

      let prevEntryYear = entry.year;
      if (data[index - 1]) {
        prevEntryYear = data[index - 1].year;
      }

      lineEntries.push({
        quarter: `${numberToQuarter(currentQuarter)}-${prevEntryYear}`,
        price: parseInt(avgPrice.toFixed(0)),
      });

      currentQuarter = quarter;
      currentQuarterPrices = [];
    }
  });

  return lineEntries;
};

export const parsePredictionData = (data: any): Record<string, LineData> => {
  const result: Record<string, LineData> = {};

  for (const key in data.data) {
    const label = key;
    const entries = data.data[key];
    const formattedEntries: LineDataEntry[] = entries.map((entry: any) => ({
      quarter: entry.quarter,
      price: entry.price,
    }));

    result[label] = {
      label,
      data: formattedEntries,
    };
  }

  return result;
};

type ParsedData = {
  message: { [key: string]: string };
  data: { [key: string]: { quarter: string; price: number }[] };
};

export const parseDataForLineChart = (data: ParsedData): CombinedLineData[] => {
  const combinedData: CombinedLineData[] = [];

  // Loop through all datasets
  const datasetKeys = Object.keys(data.data); // Get all dataset keys
  console.log(datasetKeys);

  datasetKeys.forEach((dataKey) => {
    const entries = data.data[dataKey]; // Entries for the current dataset

    entries.forEach((entry, index) => {
      // Ensure the index exists in the combinedData array
      if (!combinedData[index]) {
        // @ts-ignore horrible, I know
        combinedData[index] = { quarter: entry.quarter }; // Use quarter for the field
      }

      // Dynamically add the value for the current dataset
      combinedData[index][dataKey] = entry.price;
    });
  });

  return combinedData;
};

