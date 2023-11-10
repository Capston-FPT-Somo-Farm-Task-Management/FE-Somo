import { Card } from 'antd'
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from 'recharts'

const ChartZone = ({
  activeAnimalZoneCount,
  inActiveAnimalZoneCount,
  activePlantZoneCount,
  inActivePlantZoneCount,
  activeOtherZoneCount,
  inActiveOtherZoneCount,
}) => {
  const data = [
    {
      name: 'CN-M',
      uv: activeAnimalZoneCount,
    },
    {
      name: 'CN-D',
      uv: inActiveAnimalZoneCount,
    },
    {
      name: 'TT-M',
      uv: activePlantZoneCount,
    },
    {
      name: 'TT-D',
      uv: inActivePlantZoneCount,
    },
    {
      name: 'K-M',
      uv: activeOtherZoneCount,
    },
    {
      name: 'K-D',
      uv: inActiveOtherZoneCount,
    },
  ]

  const getIntroOfPage = (label) => {
    if (label === 'CN-M') {
      return 'Các vùng chăn nuôi đang mở'
    }
    if (label === 'CN-D') {
      return 'Các vùng chăn nuôi đang đóng'
    }
    if (label === 'TT-M') {
      return 'Các vùng trồng trọt đang mở'
    }
    if (label === 'TT-D') {
      return 'Các vùng trồng trọt đang đóng'
    }
    if (label === 'K-M') {
      return 'Các vùng khác đang mở'
    }
    if (label === 'K-D') {
      return 'Các vùng khác đang đóng'
    }
    return ''
  }

  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      return (
        <Card title={getIntroOfPage(label)}>
          <p>{`Số lượng ${label}: ${payload[0].value}`}</p>
        </Card>
      )
    }
    return null
  }

  return (
    <ResponsiveContainer width={500} height={300}>
      <BarChart
        data={data}
        margin={{
          top: 20,
          right: 30,
          left: 20,
          bottom: 20,
        }}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="name" />
        <YAxis />
        <Tooltip content={<CustomTooltip />} />
        {/* <Bar dataKey="pv" stackId="a" fill="#8884d8" /> */}
        <Bar dataKey="uv" stackId="a" fill="#82ca9d" />
      </BarChart>
    </ResponsiveContainer>
  )
}
export default ChartZone
