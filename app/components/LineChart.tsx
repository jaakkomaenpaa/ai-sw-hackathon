import {
  CartesianGrid,
  Legend,
  Line,
  LineChart as LineChartRoot,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts';
import { useLocale } from '~/stores/LocaleStore';

const getMockData = (months: string[]) => [
  {
    name: months[0],
    uv: 4000,
    pv: 2400,
    amt: 2400,
  },
  {
    name: months[1],
    uv: 3000,
    pv: 1398,
    amt: 2210,
  },
  {
    name: months[2],
    uv: 2000,
    pv: 9800,
    amt: 2290,
  },
  {
    name: months[3],
    uv: 2780,
    pv: 3908,
    amt: 2000,
  },
  {
    name: months[4],
    uv: 1890,
    pv: 4800,
    amt: 2181,
  },
  {
    name: months[5],
    uv: 2390,
    pv: 3800,
    amt: 2500,
  },
  {
    name: months[6],
    uv: 3490,
    pv: 4300,
    amt: 2100,
  },
  {
    name: months[7],
    uv: 3490,
    pv: 4300,
    amt: 2100,
  },
  {
    name: months[8],
    uv: 3490,
    pv: 4300,
    amt: 2100,
  },
  {
    name: months[9],
    uv: 3490,
    pv: 4300,
    amt: 2100,
  },
  {
    name: months[10],
    uv: 3490,
    pv: 4300,
    amt: 2100,
  },
  {
    name: months[11],
    uv: 3490,
    pv: 4300,
    amt: 2100,
  },
];
export const LineChart = () => {
  const { translations } = useLocale();

  const mockData = getMockData(Object.values(translations.months));

  return (
    <ResponsiveContainer width="100%" height="100%">
      <LineChartRoot
        width={500}
        height={300}
        data={mockData}
        margin={{
          top: 5,
          right: 30,
          left: 20,
          bottom: 5,
        }}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="name" />
        <YAxis />
        <Tooltip />
        <Legend />
        <Line
          type="monotone"
          dataKey="pv"
          stroke="#8884d8"
          activeDot={{ r: 8 }}
        />
        <Line type="monotone" dataKey="uv" stroke="#82ca9d" />
      </LineChartRoot>
    </ResponsiveContainer>
  );
};
