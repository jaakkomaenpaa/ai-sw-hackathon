import { CartesianGrid, Legend, Line, LineChart as LineChartRoot, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts"


const mockData = [

  {
    name: 'tammikuu',
    uv: 4000,
    pv: 2400,
    amt: 2400,
  },
  {
    name: 'helmikuu',
    uv: 3000,
    pv: 1398,
    amt: 2210,
  },
  {
    name: 'maaliskuu',
    uv: 2000,
    pv: 9800,
    amt: 2290,
  },
  {
    name: 'huhtikuu',
    uv: 2780,
    pv: 3908,
    amt: 2000,
  },
  {
    name: 'toukokuu',
    uv: 1890,
    pv: 4800,
    amt: 2181,
  },
  {
    name: 'kesäkuu',
    uv: 2390,
    pv: 3800,
    amt: 2500,
  },
  {
    name: 'heinäkuu',
    uv: 3490,
    pv: 4300,
    amt: 2100,
  },
  {
    name: 'elokuu',
    uv: 3490,
    pv: 4300,
    amt: 2100,
  },
  {
    name: 'syyskuu',
    uv: 3490,
    pv: 4300,
    amt: 2100,
  },
  {
    name: 'lokakuu',
    uv: 3490,
    pv: 4300,
    amt: 2100,
  },
  {
    name: 'marraskuu',
    uv: 3490,
    pv: 4300,
    amt: 2100,
  },
  {
    name: 'joulukuu',
    uv: 3490,
    pv: 4300,
    amt: 2100,
  },

]
export const LineChart = () => {
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
        <Line type="monotone" dataKey="pv" stroke="#8884d8" activeDot={{ r: 8 }} />
        <Line type="monotone" dataKey="uv" stroke="#82ca9d" />
      </LineChartRoot>
    </ResponsiveContainer>
  )
}
