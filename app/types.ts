export enum Language {
  Finnish = "fin",
  English = "eng",
}

export enum LocalStorageKey {
  Language = "lang",
}

export enum FertiliserProduct {
  Potash = "K (Potash)",
  Nitrogen = "N (Nitrogen)",
  Phosphorus = "P (Phosphorus)",
}

export type LineChartDataEntry = {
  labelFull: string
  labelShort: string
  dataValue: number
}