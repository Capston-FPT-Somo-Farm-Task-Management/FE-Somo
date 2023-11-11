import { Tooltip } from 'antd'
import {
  Bar,
  BarChart,
  CartesianGrid,
  Legend,
  Rectangle,
  ResponsiveContainer,
  XAxis,
  YAxis,
} from 'recharts'

const ChartTaskWeek = ({ taskByWeek }) => {
  const dayNames = [
    'Chủ nhật',
    'Thứ hai',
    'Thứ ba',
    'Thứ tư',
    'Thứ năm',
    'Thứ sáu',
    'Thứ bảy',
  ]

  const data = taskByWeek?.data?.map((task, index) => ({
    name: dayNames[index],
    uv: task.taskCount,
    // amt: 2000,
  }))

  return (
    // <ResponsiveContainer width="100%" height="100%">
    <BarChart
      data={data ? data : null}
      margin={{
        top: 5,
        right: 30,
        left: 20,
        bottom: 5,
      }}
      width={800}
      height={400}
    >
      <CartesianGrid strokeDasharray="3 3" />
      <XAxis dataKey="name" />
      <YAxis />
      <Tooltip />
      {/* <Legend /> */}
      <Bar
        dataKey="uv"
        fill="#82ca9d"
        activeBar={<Rectangle fill="gold" stroke="purple" />}
      />
    </BarChart>
    // </ResponsiveContainer>
  )
}
export default ChartTaskWeek
