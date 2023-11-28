import React, { useEffect, useRef, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Divider } from "antd";
import ChartTaskWeek from "./ChartTaskWeek";
import PieChartTaskWeek from "./PieChartTaskWeek";
import { getMemberById } from "features/slice/user/memberSlice";
import { getTaskByWeek } from "features/slice/task/taskByWeekSlice";
import { authServices } from "services/authServices";
import DashboardBox from "./DashboardBox";

const Dashboard = () => {
  const barChartRef = useRef(null);
  const dispatch = useDispatch();
  const member = useSelector((state) => state.member.data);
  const taskByWeek = useSelector((state) => state.taskByWeek.data);
  const memberId = member?.id;

  const [selectedDay, setSelectedDay] = useState(null);

  useEffect(() => {
    dispatch(getMemberById(authServices.getUserId()));
    dispatch(getTaskByWeek(memberId));
  }, [dispatch, memberId]);

  const handleBarClick = (index) => {
    setSelectedDay(index);
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (barChartRef.current && !barChartRef.current.contains(event.target)) {
        setSelectedDay(null);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [barChartRef]);

  return (
    <div className="dashboard">
      <div className="dashboard-header">
        <DashboardBox />
      </div>
      <div className="dashboard-footer">
        <div className="dashboard-chart" ref={barChartRef}>
          <ChartTaskWeek taskByWeek={taskByWeek} onBarClick={handleBarClick} />
        </div>
        <div className="dashboard-piechart">
          <PieChartTaskWeek taskByWeek={taskByWeek} selectedDay={selectedDay} />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
