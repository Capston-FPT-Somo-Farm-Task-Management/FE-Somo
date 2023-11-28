import React from 'react'
import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts'

const PieChartTaskWeek = ({ taskByWeek, selectedDay }) => {
  const COLORS = ['#0088FE', '#00C49F', '#FFBB28']

  const calculateTotalTasks = () => {
    if (selectedDay !== null) {
      const dayTask = taskByWeek?.data[selectedDay]
      return [
        { name: 'Nhiệm vụ vật nuôi', value: dayTask.totalTaskOfLivestock },
        { name: 'Nhiệm vụ cây trồng', value: dayTask.totalTaskOfPlant },
        { name: 'Nhiệm vụ khác', value: dayTask.totalTaskOfOther },
      ]
    } else {
      let totalLivestock = 0
      let totalPlant = 0
      let totalOther = 0

      taskByWeek?.data?.forEach((task) => {
        totalLivestock += task.totalTaskOfLivestock
        totalPlant += task.totalTaskOfPlant
        totalOther += task.totalTaskOfOther
      })

      return [
        { name: 'Nhiệm vụ vật nuôi', value: totalLivestock },
        { name: 'Nhiệm vụ cây trồng', value: totalPlant },
        { name: 'Nhiệm vụ khác', value: totalOther },
      ]
    }
  }

  const totalTaskCount =
    selectedDay !== null
      ? taskByWeek?.data[selectedDay].taskCount
      : taskByWeek?.data?.reduce((acc, task) => acc + task.taskCount, 0)

  // Lọc hoặc điều chỉnh dữ liệu dựa vào selectedDay
  let filteredData = taskByWeek?.data
    ? calculateTotalTasks(taskByWeek.data)
    : []

  if (selectedDay !== null && taskByWeek?.data) {
    const selectedTasks = taskByWeek.data[selectedDay]
    filteredData = calculateTotalTasks([selectedTasks])
  }

  const RADIAN = Math.PI / 180
  // const renderCustomizedLabel = ({
  //   cx,
  //   cy,
  //   midAngle,
  //   innerRadius,
  //   outerRadius,
  //   value,
  //   index,
  // }) => {
  //   if (value === 0) return null

  //   const radius = innerRadius + (outerRadius - innerRadius) * 0.5
  //   const x = cx + radius * Math.cos(-midAngle * RADIAN)
  //   const y = cy + radius * Math.sin(-midAngle * RADIAN)

  //   return (
  //     <text
  //       x={x}
  //       y={y}
  //       fill="white"
  //       textAnchor={x > cx ? 'start' : 'end'}
  //       dominantBaseline="central"
  //     >
  //       {/* {value} */}
  //     </text>
  //   )
  // }

  const styles = {
    container: {
      width: '100%',
    },
    tooltip: {
      backgroundColor: 'white',
      border: '1px solid #dddddd',
      padding: '10px',
      borderRadius: '5px',
      boxShadow: '0px 0px 5px #aaaaaa',
    },
  }

  const CustomTooltip = ({ active, payload }) => {
    if (active && payload && payload.length) {
      return (
        <div className="custom-tooltip" style={styles.tooltip}>
          <p className="label">{`${payload[0].name} : ${payload[0].value}`}</p>
        </div>
      )
    }
    return null
  }

  return (
    <div style={styles.container}>
      <h1>Tổng nhiệm vụ: {totalTaskCount} </h1>
      <ResponsiveContainer width="100%" height={200}>
        <PieChart width={400} height={400}>
          <Pie
            data={filteredData}
            cx="50%"
            cy="50%"
            outerRadius={80}
            startAngle={360}
            endAngle={0}
            innerRadius={60}
            fill="#8884d8"
            dataKey="value"
            // label={renderCustomizedLabel}
            labelLine={false}
          >
            {filteredData.map((entry, index) => (
              <Cell
                key={`cell-${index}`}
                fill={COLORS[index % COLORS.length]}
              />
            ))}
          </Pie>
          <Tooltip content={<CustomTooltip />} />
          <Legend />
        </PieChart>
      </ResponsiveContainer>
    </div>
  )
}

export default PieChartTaskWeek
