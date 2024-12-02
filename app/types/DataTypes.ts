export enum Language {
  Finnish = "fin",
  English = "eng",
}

export enum FertiliserProduct {
  Potash = "K (Potash)",
  Nitrogen = "N (Nitrogen)",
  Phosphorus = "P (Phosphorus)",
}

export enum CerealProduct {
  FeedOats = "AVO",
  FeedRye = "SEGFOUR",
  MaltingBarley = "ORGBRAS",
  MillingRye = "SEGPAN",
  MillingWheat = "BLTPAN", // Works with PT
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

export type LineDataEntry = {
  quarter: `${Quarter}-${number}`;
  price: number;
};

export type LineData = {
  label: string;
  data: LineDataEntry[];
};

export type CombinedLineData = {
  quarter: `${Quarter}-${number}`;
} & Record<string, number>;

export enum ApiQueryOption {
  Nitrogen = "nitr",
  Phosphorus = "phos",
  Potash = "pot",
  Rice = "rice",
  FeedOats = CerealProduct.FeedOats,
  FeedRye = CerealProduct.FeedRye,
  MaltingBarley = CerealProduct.MaltingBarley,
  MillingRye = CerealProduct.MillingRye,
  MillingWheat = CerealProduct.MillingWheat,
}

export enum Quarter {
  Q1 = "Q1",
  Q2 = "Q2",
  Q3 = "Q3",
  Q4 = "Q4",
}
