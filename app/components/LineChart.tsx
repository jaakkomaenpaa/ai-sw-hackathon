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
  Language,
  LineDataEntry,
  LineData,
  CombinedLineData,
} from "~/types";
import { Box, CircularProgress } from "@mui/material";
import { useLocale } from "~/stores/LocaleStore";
import { useSelection } from "~/stores/SelectionStore";
import { useEffect, useMemo, useState } from "react";

const SkeletonLoader = () => (
  <ResponsiveContainer width="100%" height="50%">
    <Box style={{ position: "relative" }}>
      <svg viewBox="0 0 500 300" width="100%" height="100%">
        <rect x="0" y="0" width="500" height="300" fill="#f3f3f3" />
        <line
          x1="50"
          y1="10"
          x2="50"
          y2="290"
          stroke="#e0e0e0"
          strokeWidth="2"
        />
        <line
          x1="50"
          y1="290"
          x2="490"
          y2="290"
          stroke="#e0e0e0"
          strokeWidth="2"
        />
        {[1, 2, 3, 4].map((i) => (
          <circle
            key={i}
            cx={50 + i * 100}
            cy={200 - i * 40}
            r="5"
            fill="#ccc"
          />
        ))}
        <text x="200" y="150" fill="#888" fontSize="14" textAnchor="middle">
          Loading...
        </text>
      </svg>
      <Box
        style={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          zIndex: 1000,
        }}
      >
        <CircularProgress />
      </Box>
    </Box>
  </ResponsiveContainer>
);

const callQueryFuntion = (
  option: ApiQueryOption,
  years: number[],
  language: Language
) => {
  const queryFunctions: {
    [key in ApiQueryOption]: () => Promise<LineDataEntry[]>;
  } = {
    [ApiQueryOption.Nitrogen]: () =>
      fetchFertiliserPrices(FertiliserProduct.Nitrogen, years, language),
    [ApiQueryOption.Phosphorus]: () =>
      fetchFertiliserPrices(FertiliserProduct.Phosphorus, years, language),
    [ApiQueryOption.Potash]: () =>
      fetchFertiliserPrices(FertiliserProduct.Potash, years, language),
  };

  return queryFunctions[option]();
};

export const LineChart = () => {
  const { language } = useLocale();
  const selection: ApiQueryOption[] = useSelection();
  const [years, setYears] = useState<number[]>([2023, 2024]);
  const [combinedLines, setCombinedLines] = useState<CombinedLineData[]>([]);

  const queries = useQueries({
    queries: useMemo(
      () =>
        selection.map((option: ApiQueryOption) => ({
          queryKey: [option, years, language],
          queryFn: () => callQueryFuntion(option, years, language),
        })),
      [selection, years, language]
    ),
  });

  useEffect(() => {
    if (selection.length === 0) {
      setCombinedLines([]);
      return;
    }

    const tempLines: LineData[] = [];

    queries.forEach((query, index) => {
      if (query.data) {
        tempLines.push({
          option: selection[index],
          data: query.data,
        });
      }
    });

    console.log("tempLines", tempLines);

    const combinedLines: any[] = [];

    tempLines.forEach((line: LineData, i: number) => {
      line.data.forEach((entry: LineDataEntry, j: number) => {
        if (i === 0) {
          combinedLines[j] = {
            quarter: entry.quarter,
            [line.option]: entry.price,
          };
        } else {
          combinedLines[j] = {
            ...combinedLines[j],
            [line.option]: entry.price,
          };
        }
      });
    });

    console.log("combined lines", combinedLines);
    console.log("selection", selection);

    setCombinedLines(combinedLines);

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selection]);

  const isLoading = queries.some((query) => query.isLoading);
  const error = queries.find((query) => query.error);

  if (isLoading) return <SkeletonLoader />;

  if (error) {
    const errorMessage =
      error.error instanceof Error ? error.error.message : "An error occurred";
    return `Error has occurred: ${errorMessage}`;
  }

  return (
    <ResponsiveContainer width="100%" height="100%">
      <LineChartRoot
        width={500}
        height={300}
        data={combinedLines}
        margin={{
          top: 5,
          right: 30,
          left: 20,
          bottom: 5,
        }}
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
            dataKey={option} // Use dynamic data keys like array1Price, array2Price, etc.
            stroke={LINE_COLORS[index]} // Use an array of colors for the lines
            activeDot={{ r: 8 }}
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
