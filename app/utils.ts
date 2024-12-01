import { ApiResponseMonth, Quarter } from "./types/DataTypes";

export const getQuarterByWeekNumber = (week: number) => {
  if (week >= 1 && week <= 13) {
    return Quarter.Q1;
  } else if (week >= 14 && week <= 26) {
    return Quarter.Q2;
  } else if (week >= 27 && week <= 39) {
    return Quarter.Q3;
  } else if (week >= 40 && week <= 52) {
    return Quarter.Q4;
  }
};

export const getQuarterByMonthOrder = (month: number) => {
  if (month >= 1 && month <= 3) {
    return Quarter.Q1;
  } else if (month >= 4 && month <= 6) {
    return Quarter.Q2;
  } else if (month >= 7 && month <= 9) {
    return Quarter.Q3;
  } else if (month >= 10 && month <= 12) {
    return Quarter.Q4;
  }
};

export const getQuarterByMonthType = (month: ApiResponseMonth) => {
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
};
