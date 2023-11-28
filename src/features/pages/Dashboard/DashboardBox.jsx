import React from "react";
import { GrBarChart } from "react-icons/gr";

const DashboardBox = ({ taskByWeek, selectedDay }) => {
  const calculateTotalTasks = () => {
    if (selectedDay !== null) {
      const dayTask = taskByWeek?.data[selectedDay];
      return {
        totalTaskToDo: dayTask.totalTaskToDo,
        totalTaskDoing: dayTask.totalTaskDoing,
        totalTaskClose: dayTask.totalTaskClose,
        totalTaskPending: dayTask.totalTaskPending,
      };
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

      return {
        totalTaskToDo,
        totalTaskDoing,
        totalTaskClose,
        totalTaskPending,
      };
    }
  };

  let filteredData = taskByWeek?.data
    ? calculateTotalTasks(taskByWeek.data)
    : [];

  if (selectedDay !== null && taskByWeek?.data) {
    const selectedTasks = taskByWeek.data[selectedDay];
    filteredData = calculateTotalTasks([selectedTasks]);
  }

  console.log(filteredData);

  return (
    <>
      <div className="dashboard-content">
        <div className="dashboard-text">
          <p>Chuẩn bị</p>
          <h5>Tổng: {filteredData?.totalTaskToDo}</h5>
        </div>
        <div className="dashboard-logo" style={{ backgroundColor: "#1a659e" }}>
          <GrBarChart />
        </div>
      </div>
      <div className="dashboard-content">
        <div className="dashboard-text">
          <p>Đang làm</p>
          <h5>Tổng: {filteredData?.totalTaskDoing}</h5>
        </div>
        <div
          className="dashboard-logo"
          style={{ backgroundColor: "#52b788" }}
        >
          <GrBarChart />
        </div>
      </div>
      <div className="dashboard-content">
        <div className="dashboard-text">
          <p>Tạm hoãn</p>
          <h5>Tổng: {filteredData?.totalTaskPending}</h5>
        </div>
        <div className="dashboard-logo" style={{ backgroundColor: "#fbb02d" }}>
          <GrBarChart />
        </div>
      </div>
      <div className="dashboard-content">
        <div className="dashboard-text">
          <p>Đã đóng</p>
          <h5>Tổng: {filteredData?.totalTaskClose}</h5>
        </div>
        <div className="dashboard-logo" style={{ backgroundColor: "#ef233c" }}>
          <GrBarChart />
        </div>
      </div>
    </>
  );
};

export default DashboardBox;
