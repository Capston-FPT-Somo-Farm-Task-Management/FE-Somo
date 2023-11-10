import { Card } from 'antd'
import React from 'react'
import {
  PieChart,
  Pie,
  Tooltip,
  ResponsiveContainer,
  Cell,
  Legend,
  CartesianGrid,
} from 'recharts'

const CustomTooltip = ({ active, payload }) => {
  if (active) {
    return (
      <Card title={payload[0].name}>
        <p>Số lượng: {payload[0].value}</p>
      </Card>
    )
  }
  return null
}

const PieChartZone = ({
  activeAnimalZoneCount,
  activePlantZoneCount,
  activeOtherZoneCount,
}) => {
  const data = [
    { name: 'Vùng chăn nuôi mở', value: activeAnimalZoneCount },
    { name: 'Vùng trồng trọt mở', value: activePlantZoneCount },
    { name: 'Vùng khác mở', value: activeOtherZoneCount },
  ]
  const colors = ['#ff4318', '#ff9200', '#00aece']

  return (
    <ResponsiveContainer width="100%" height={350}>
      <PieChart>
        <Pie
          dataKey="value"
          isAnimationActive={false}
          data={data}
          cx="45%"
          cy="50%"
          outerRadius={110}
          fill="#8884d8"
          label
        >
          {data.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={colors[index % colors.length]} />
          ))}
        </Pie>
        <Legend
          align="right"
          verticalAlign="middle"
          layout="vertical"
          wrapperStyle={{ fontSize: '20px', marginLeft: '45px' }}
        />
        <Tooltip content={<CustomTooltip />} />
      </PieChart>
    </ResponsiveContainer>
  )
}

export default PieChartZone
