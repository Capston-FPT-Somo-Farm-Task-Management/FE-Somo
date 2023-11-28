import React from "react";
import { GrBarChart } from "react-icons/gr";

const DashboardBox = () => {
  return (
    <>
      <div className="dashboard-content">
        <div className="dashboard-text">
          <p>Chuẩn bị</p>
          <h5>Tổng: 2</h5>
        </div>
        <div className="dashboard-logo" style={{backgroundColor: "#ef233c"}}>
          <GrBarChart />
        </div>
      </div>
      <div className="dashboard-content">
        <div className="dashboard-text">
          <p>Đang làm</p>
          <h5>Tổng: 2</h5>
        </div>
        <div className="dashboard-logo" style={{backgroundColor: "rgb(130, 202, 157)"}}>
          <GrBarChart />
        </div>
      </div>
      <div className="dashboard-content">
        <div className="dashboard-text">
          <p>Đã đóng</p>
          <h5>Tổng: 2</h5>
        </div>
        <div className="dashboard-logo" style={{backgroundColor: "#fbb02d"}}>
          <GrBarChart />
        </div>
      </div>
      <div className="dashboard-content">
        <div className="dashboard-text">
          <p>Tạm hoãn</p>
          <h5>Tổng: 2</h5>
        </div>
        <div className="dashboard-logo" style={{backgroundColor: "#9b5de5"}}>
          <GrBarChart />
        </div>
      </div>
    </>
  );
};

export default DashboardBox;
