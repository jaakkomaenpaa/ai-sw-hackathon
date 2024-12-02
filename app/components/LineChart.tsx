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
import {
  fetchCerealPrices,
  fetchFertiliserPrices,
  fetchRicePrices,
} from "~/api";
import {
  ApiQueryOption,
  FertiliserProduct,
  LineDataEntry,
  LineData,
  CombinedLineData,
} from "~/types/DataTypes"
import { Box, Button, CircularProgress } from "@mui/material";
import { useLocale } from "~/stores/LocaleStore";
import { useSelection } from "~/stores/SelectionStore";
import { useEffect, useMemo, useState } from "react";
import { LOCALE } from "~/locale";
import useOpenAI from "~/hooks/useOpenAi";


const callQueryFuntion = (
  option: ApiQueryOption,
  startYear: number,
  endYear: number
) => {
  const queryFunctions: {
    [key in ApiQueryOption]: () => Promise<LineDataEntry[]>;
  } = {
    [ApiQueryOption.Nitrogen]: () =>
      fetchFertiliserPrices(FertiliserProduct.Nitrogen, startYear, endYear),
    [ApiQueryOption.Phosphorus]: () =>
      fetchFertiliserPrices(FertiliserProduct.Phosphorus, startYear, endYear),
    [ApiQueryOption.Potash]: () =>
      fetchFertiliserPrices(FertiliserProduct.Potash, startYear, endYear),
    [ApiQueryOption.Rice]: () => fetchRicePrices(startYear, endYear),
    [ApiQueryOption.FeedOats]: () =>
      fetchCerealPrices(CerealProduct.FeedOats, startYear, endYear),
    [ApiQueryOption.FeedRye]: () =>
      fetchCerealPrices(CerealProduct.FeedRye, startYear, endYear),
    [ApiQueryOption.FeedWheat]: () =>
      fetchCerealPrices(CerealProduct.FeedWheat, startYear, endYear),
    [ApiQueryOption.MaltingBarley]: () =>
      fetchCerealPrices(CerealProduct.MaltingBarley, startYear, endYear),
    [ApiQueryOption.MillingOats]: () =>
      fetchCerealPrices(CerealProduct.MillingOats, startYear, endYear),
    [ApiQueryOption.MillingRye]: () =>
      fetchCerealPrices(CerealProduct.MillingRye, startYear, endYear),
    [ApiQueryOption.MillingWheat]: () =>
      fetchCerealPrices(CerealProduct.MillingWheat, startYear, endYear),
  };

  return queryFunctions[option]();
};

export const LineChart = () => {
  const { language } = useLocale();
  const selection: ApiQueryOption[] = useSelection();

  const { fetchCompletion, result } = useOpenAI()
  const [startYear, setStartYear] = useState<number>(2023);
  const [endYear, setEndYear] = useState<number>(2024);

  const queries = useQueries({
    queries: useMemo(
      () =>
        selection.map((option: ApiQueryOption) => ({
          queryKey: [option, startYear, endYear, language],
          queryFn: () => callQueryFuntion(option, startYear, endYear),
        })),
      [selection, startYear, endYear, language]
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

  //TODO somehow we need to incorporate the ai prediction data into the line chart
  useEffect(() => {
    if (!queriesData.length) return
    console.log("Render")
    const temp = combineLineData(queriesData)
    setCombinedLines(temp)
  }, [queriesData])

  if (isLoading) return <CircularProgress color="success" />;

  if (error) {
    const errorMessage =
      error.error instanceof Error ? error.error.message : "An error occurred";
    return `Error has occurred: ${errorMessage}`;
  }

  return (
    <>
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
            key={option}
            type="monotone"
            dataKey={LOCALE[language].queryItemLabels[option]}
            stroke={LINE_COLORS[index]}
            activeDot={{ r: 8 }}
          />
        ))}
        </LineChartRoot>
      </ResponsiveContainer>
      <Button onClick={
        () => {
          fetchCompletion({
            prompt: queriesData,
            model: 'gpt-4o-mini'
          })
        }}>kysy jotain apilta</Button>
      <Box>{result}</Box>

    </>);
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

  // Sort arrays so that labels show correctly according to
  // the line with most data
  const sortedArrays = lineDataArray.sort(
    (a: LineData, b: LineData) => b.data.length - a.data.length
  );

  sortedArrays.forEach((line: LineData, i: number) => {
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
