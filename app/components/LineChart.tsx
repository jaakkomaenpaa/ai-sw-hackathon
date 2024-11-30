import { useQuery } from "@tanstack/react-query";
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
import { FertiliserProduct } from "~/types";
import { Box, CircularProgress } from "@mui/material";

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

export const LineChart = () => {
  const product = FertiliserProduct.Potash;
  const years = [2023, 2024];

  const { data, isLoading, error } = useQuery({
    queryKey: ["fertiliserPrices"],
    queryFn: () => fetchFertiliserPrices(product, years),
  });

  if (isLoading) return <SkeletonLoader />;

  if (error) return "Error has occurred: " + error.message;

  return (
    <ResponsiveContainer width="100%" height="100%">
      <LineChartRoot
        width={500}
        height={300}
        data={data}
        margin={{
          top: 5,
          right: 30,
          left: 20,
          bottom: 5,
        }}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="labelShort" />
        <YAxis />
        <Tooltip />
        <Legend />
        <Line
          type="monotone"
          dataKey="dataValue"
          stroke="#8884d8"
          activeDot={{ r: 8 }}
        />
        <Line type="monotone" dataKey="uv" stroke="#82ca9d" />
      </LineChartRoot>
    </ResponsiveContainer>
  );
};
