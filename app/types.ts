export enum Language {
  Finnish = "fin",
  English = "eng",
}

export enum FertiliserProduct {
  Potash = "K (Potash)",
  Nitrogen = "N (Nitrogen)",
  Phosphorus = "P (Phosphorus)",
}

// Correlates with months from api response
export enum ApiResponseMonth {
  January = "Jan",
  February = "Feb",
  March = "Mar",
  April = "Apr",
  May = "May",
  June = "Jun",
  July = "Jul",
  August = "Aug",
  September = "Sep",
  October = "Oct",
  November = "Nov",
  December = "Dec",
}

export type LineChartDataEntry = {
  labelFull: string;
  labelShort: string;
  dataValue: number;
};
