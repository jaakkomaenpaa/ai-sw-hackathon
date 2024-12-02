import { ApiQueryOption, ApiResponseMonth } from "~/types/DataTypes";
import { Translations } from ".";

export const FINNISH: Translations = {
  search: "Hae...",
  queryItems: {
    [ApiQueryOption.Nitrogen]: "Typen hinta",
    [ApiQueryOption.Phosphorus]: "Fosforin hinta",
    [ApiQueryOption.Potash]: "Potaskan hinta",
    [ApiQueryOption.Rice]: "Riisin hinta",
    [ApiQueryOption.FeedOats] :"Rehukauran hinta",
    [ApiQueryOption.FeedRye] :"Rehurukiin hinta",
    [ApiQueryOption.MaltingBarley] :"Mallasohran hinta",
    [ApiQueryOption.MillingRye] :"Myllyrukiin hinta",
    [ApiQueryOption.MillingWheat] :"Myllyvehnän hinta",
  },
  queryItemLabels: {
    [ApiQueryOption.Nitrogen]: "Typpi",
    [ApiQueryOption.Phosphorus]: "Fosfori",
    [ApiQueryOption.Potash]: "Potaska",
    [ApiQueryOption.Rice]: "Riisi",
    [ApiQueryOption.FeedOats] :"Rehukaura",
    [ApiQueryOption.FeedRye] :"Rehuruis",
    [ApiQueryOption.MaltingBarley] :"Mallasohra",
    [ApiQueryOption.MillingRye] :"Myllyruis",
    [ApiQueryOption.MillingWheat] :"Myllyvehnä",
  },
  months: {
    [ApiResponseMonth.January]: "Tammi",
    [ApiResponseMonth.February]: "Helmi",
    [ApiResponseMonth.March]: "Maalis",
    [ApiResponseMonth.April]: "Huhti",
    [ApiResponseMonth.May]: "Touko",
    [ApiResponseMonth.June]: "Kesä",
    [ApiResponseMonth.July]: "Heinä",
    [ApiResponseMonth.August]: "Elo",
    [ApiResponseMonth.September]: "Syys",
    [ApiResponseMonth.October]: "Loka",
    [ApiResponseMonth.November]: "Marras",
    [ApiResponseMonth.December]: "Joulu",
  },
};
