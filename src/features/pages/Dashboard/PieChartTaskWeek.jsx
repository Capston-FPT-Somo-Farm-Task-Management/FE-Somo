import React from "react";
import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

const PieChartTaskWeek = ({ taskByWeek, selectedDay }) => {
  const COLORS = ["#1a659e", "#52b788", "#fbb02d", "#ef233c"];

  const calculateTotalTasks = () => {
    if (selectedDay !== null) {
      const dayTask = taskByWeek?.data[selectedDay];
      return [
        { name: "Chuẩn bị", value: dayTask.totalTaskToDo },
        { name: "Đang làm", value: dayTask.totalTaskDoing },
        { name: "Tạm hoãn", value: dayTask.totalTaskPending },
        { name: "Đã đóng", value: dayTask.totalTaskClose },
      ];
    } else {
      let totalTaskToDo = 0;
      let totalTaskDoing = 0;
      let totalTaskClose = 0;
      let totalTaskPending = 0;

      taskByWeek?.data?.forEach((task) => {
        totalTaskToDo += task.totalTaskToDo;
        totalTaskDoing += task.totalTaskDoing;
        totalTaskClose += task.totalTaskClose;
        totalTaskPending += task.totalTaskPending;
      });

      return [
        { name: "Chuẩn bị", value: totalTaskToDo },
        { name: "Đang làm", value: totalTaskDoing },
        { name: "Tạm hoãn", value: totalTaskPending },
        { name: "Đã đóng", value: totalTaskClose },
      ];
    }
  };

  // const totalTaskCount =
  //   selectedDay !== null
  //     ? taskByWeek?.data[selectedDay].taskCount
  //     : taskByWeek?.data?.reduce((acc, task) => acc + task.taskCount, 0)

  let filteredData = taskByWeek?.data
    ? calculateTotalTasks(taskByWeek.data)
    : [];

  if (selectedDay !== null && taskByWeek?.data) {
    const selectedTasks = taskByWeek.data[selectedDay];
    filteredData = calculateTotalTasks([selectedTasks]);
  }

  // const calculateTotalTasks = () => {
  //   if (selectedDay !== null) {
  //     const dayTask = taskByWeek?.data[selectedDay]
  //     return [
  //       { name: 'Chuẩn bị', value: dayTask.totalTaskToDo },
  //       { name: 'Nhiệm vụ cây trồng', value: dayTask.totalTaskOfPlant },
  //       { name: 'Nhiệm vụ khác', value: dayTask.totalTaskOfOther },
  //     ]
  //   } else {
  //     let totalLivestock = 0
  //     let totalPlant = 0
  //     let totalOther = 0

  //     taskByWeek?.data?.forEach((task) => {
  //       totalLivestock += task.totalTaskOfLivestock
  //       totalPlant += task.totalTaskOfPlant
  //       totalOther += task.totalTaskOfOther
  //     })

  //     return [
  //       { name: 'Nhiệm vụ vật nuôi', value: totalLivestock },
  //       { name: 'Nhiệm vụ cây trồng', value: totalPlant },
  //       { name: 'Nhiệm vụ khác', value: totalOther },
  //     ]
  //   }
  // }

  // const totalTaskCount =
  //   selectedDay !== null
  //     ? taskByWeek?.data[selectedDay].taskCount
  //     : taskByWeek?.data?.reduce((acc, task) => acc + task.taskCount, 0)

  // // Lọc hoặc điều chỉnh dữ liệu dựa vào selectedDay
  // let filteredData = taskByWeek?.data
  //   ? calculateTotalTasks(taskByWeek.data)
  //   : []

  // if (selectedDay !== null && taskByWeek?.data) {
  //   const selectedTasks = taskByWeek.data[selectedDay]
  //   filteredData = calculateTotalTasks([selectedTasks])
  // }

  const RADIAN = Math.PI / 180;

  const styles = {
    container: {
      width: "100%",
    },
    tooltip: {
      backgroundColor: "white",
      border: "1px solid #dddddd",
      padding: "10px",
      borderRadius: "5px",
      boxShadow: "0px 0px 5px #aaaaaa",
    },
  };

  const CustomTooltip = ({ active, payload }) => {
    if (active && payload && payload.length) {
      return (
        <div className="custom-tooltip" style={styles.tooltip}>
          <p className="label">{`${payload[0].name} : ${payload[0].value}`}</p>
        </div>
      );
    }
    return null;
  };

  return (
    <div style={styles.container}>
      <h3 style={{marginBottom: 0}}>Biểu đồ tròn</h3>
      <ResponsiveContainer height={400}>
        <PieChart width={400} height={200}>
          <Pie
            data={filteredData}
            cx="50%"
            cy="50%"
            outerRadius={110}
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
  );
};

export default PieChartTaskWeek;
