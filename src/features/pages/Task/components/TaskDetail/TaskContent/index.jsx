import { Badge, Descriptions } from "antd";
import dayjs from "dayjs";
import React from "react";

function TaskContent({ taskData }) {
  if (!taskData) {
    return null;
  }

  const formattedStartDate = dayjs(taskData.startDate).format(
    "HH:mm DD-MM-YYYY"
  );
  const formattedEndDate = dayjs(taskData.endDate).format("HH:mm DD-MM-YYYY");

  const renderSubFields = () => {
    if (externalId) {
      if (fieldStatus === "Thực vật") {
        return <span>Mã cây trồng: {plantName}</span>;
      } else if (fieldStatus === "Động vật") {
        return <span>Mã vật nuôi: {liveStockName}</span>;
      } else {
        <span>Không có mã vật nuôi hoặc cây trồng</span>;
      }
    }
    return null;
  };

  const { externalId, fieldStatus, liveStockName, plantName } = taskData;

  const dataTask = [
    {
      key: "1",
      label: "Tên công việc",
      children: taskData.name,
    },
    {
      key: "2",
      label: "Loại công việc",
      children: taskData.taskTypeName,
    },
    {
      key: "3",
      label: "Trạng thái",
      children: taskData.status,
    },
    {
      key: "4",
      label: "Ưu tiên",
      children: (
        <Badge
          status="processing"
          color={
            taskData.priority === "Cao"
              ? "red"
              : taskData.priority === "Trung bình"
              ? "yellow"
              : taskData.priority === "Thấp"
              ? "green"
              : "default" 
          }
          text={taskData.priority}
        />
      ),
    },
    {
      key: "5",
      label: "Ngày bắt đầu",
      children: formattedStartDate,
    },
    {
      key: "6",
      label: "Ngày kết thúc",
      children: formattedEndDate,
    },
    {
      key: "7",
      label: "Dụng cụ",
      children: taskData.materialName
        ? taskData.materialName
        : "Không có dụng cụ",
      span: 3,
    },
    {
      key: "8",
      label: "Người giám sát",
      children: taskData.supervisorName,
    },
    {
      key: "9",
      label: "Người thực hiện",
      children: taskData.employeeName,
      span: 2,
    },
    {
      key: "10",
      label: "Địa điểm thực hiện",
      children: (
        <>
          Khu vực: {taskData.areaName}
          <br />
          Vùng: {taskData.zoneName}
          <br />
          Vị trí cụ thể: {taskData.fieldName}
          <br />
          {taskData.externalId
            ? renderSubFields()
            : "Không có mã vật nuôi hoặc cây trồng"}
          <br />
          Mô tả:{" "}
          {taskData.description ? taskData.description : "Không có mô tả"}
          <br />
          Thời gian làm việc bỏ ra là {taskData.overallEffortHour} giờ {taskData.overallEfforMinutes} phút
        </>
      ),
    },
  ];
  return <Descriptions bordered items={dataTask} />;
}

export default TaskContent;
