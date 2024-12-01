import { useQueries } from "@tanstack/react-query";
import {
  CartesianGrid,
  Legend,
  Line,
  LineChart as LineChartRoot,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { fetchFertiliserPrices } from "~/api";
import {
  ApiQueryOption,
  FertiliserProduct,
  LineDataEntry,
  LineData,
  CombinedLineData,
} from "~/types";
import { CircularProgress } from "@mui/material";
import { useLocale } from "~/stores/LocaleStore";
import { useSelection } from "~/stores/SelectionStore";
import { useMemo, useState } from "react";
import { LOCALE } from "~/locale";


const callQueryFuntion = (option: ApiQueryOption, years: number[]) => {
  const queryFunctions: {
    [key in ApiQueryOption]: () => Promise<LineDataEntry[]>;
  } = {
    [ApiQueryOption.Nitrogen]: () =>
      fetchFertiliserPrices(FertiliserProduct.Nitrogen, years),
    [ApiQueryOption.Phosphorus]: () =>
      fetchFertiliserPrices(FertiliserProduct.Phosphorus, years),
    [ApiQueryOption.Potash]: () =>
      fetchFertiliserPrices(FertiliserProduct.Potash, years),
  };

  return queryFunctions[option]();
};

export const LineChart = () => {
  const { language } = useLocale();
  const selection: ApiQueryOption[] = useSelection();
  const [years, setYears] = useState<number[]>([2023, 2024]);

  const queries = useQueries({
    queries: useMemo(
      () =>
        selection.map((option: ApiQueryOption) => ({
          queryKey: [option, years, language],
          queryFn: () => callQueryFuntion(option, years),
        })),
      [selection, years, language]
    ),
  });

  const isLoading = queries.some((query) => query.isLoading);
  const error = queries.find((query) => query.error);


  const queriesData: LineData[] = useMemo(() =>
    queries.map((query, index) => {
      if (query.data) {
        return ({
          label: LOCALE[language].queryItemLabels[selection[index]],
          data: query.data,
        }) as LineData;
      }
      return undefined
    })
      .filter((item): item is LineData => item !== undefined),
    [language, queries, selection])

  const combinedLines: CombinedLineData[] = useMemo(() =>
    combineLineData(queriesData), [queriesData])

  if (isLoading) return <CircularProgress color="success" />;

  if (error) {
    const errorMessage =
      error.error instanceof Error ? error.error.message : "An error occurred";
    return `Error has occurred: ${errorMessage}`;
  }

  return (
    <ResponsiveContainer height="100%" width="100%">
      <LineChartRoot
        data={combinedLines}
        height={300}
        margin={{
          top: 5,
          right: 30,
          left: 20,
          bottom: 5,
        }}
        width={500}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="quarter" />
        <YAxis />
        <Tooltip />
        <Legend />

        {selection.map((option, index) => (
          <Line
            activeDot={{ r: 8 }}
            dataKey={LOCALE[language].queryItemLabels[option]} // Use dynamic data keys like array1Price, array2Price, etc.
            key={option}
            stroke={LINE_COLORS[index]} // Use an array of colors for the lines
            type="monotone"
          />
        ))}
      </LineChartRoot>
    </ResponsiveContainer>
  );
};

const LINE_COLORS = [
  "#8884d8", // Blue
  "#82ca9d", // Green
  "#FF7300", // Orange
  "#ff6f61", // Coral
  "#6a5acd", // Slate Blue
  "#f2c14e", // Golden Yellow
  "#49b3a2", // Teal
  "#e0aaff", // Lavender
  "#c7d8a7", // Light Green
  "#ffb347", // Light Orange
];

const combineLineData = (lineDataArray: LineData[]): CombinedLineData[] => {
  const combinedData: any[] = [];

  lineDataArray.forEach((line: LineData, i: number) => {
    line.data.forEach((entry: LineDataEntry, j: number) => {
      if (i === 0) {
        combinedData[j] = {
          quarter: entry.quarter,
          [line.label]: entry.price,
        };
      } else {
        combinedData[j] = {
          ...combinedData[j],
          [line.label]: entry.price,
        };
      }
    });
  });

  return combinedData as CombinedLineData[];
};
