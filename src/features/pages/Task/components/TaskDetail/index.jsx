import React, { useState, useEffect } from "react";
import { Modal } from "antd";
import dayjs from "dayjs";

const TaskDetail = ({ visible, onCancel, taskData, option, type }) => {

  if (!taskData) {
    return null;
  }

  const {
    externalId,
    fieldStatus,
    name,
    taskTypeName,
    startDate,
    endDate,
    priority,
    employeeName,
    managerName,
    status,
    areaName,
    zoneName,
    fieldName,
    liveStockName,
    plantName,
    materialName,
    description,
  } = taskData;

  const renderSubFields = () => {
    if (externalId) {
      if (fieldStatus === 'Động vật') {
        return (
          <p>
            <strong>Mã vật nuôi:</strong> {liveStockName}
          </p>
        );
      } else if (fieldStatus === 'Thực vật') {
        return (
          <p>
            <strong>Mã cây trồng:</strong> {plantName}
          </p>
        );
      }
    }
    console.log(plantName)
    return null;
  };

  return (
    <Modal title={name} visible={visible} onCancel={onCancel} footer={null}>
      <p>
        <strong>Loại nhiệm vụ:</strong> {taskTypeName}
      </p>
      <p>
        <strong>Ngày bắt đầu:</strong>{" "}
        {dayjs(startDate).format("HH:mm DD/MM/YYYY")}
      </p>
      <p>
        <strong>Ngày kết thúc:</strong>{" "}
        {dayjs(endDate).format("HH:mm DD/MM/YYYY")}
      </p>
      <p>
        <strong>Ưu tiên:</strong> {priority}
      </p>
      <p>
        <strong>Người thực hiện:</strong> {employeeName}
      </p>
      <p>
        <strong>Người giám sát:</strong> {managerName}
      </p>
      <p>
        <strong>Trạng thái:</strong> {status}
      </p>
      <p>
        <strong>Khu vực:</strong> {areaName}
      </p>
      <p>
        <strong>Vùng:</strong> {zoneName}
      </p>
      {renderSubFields()}
      <p>
        <strong>Vị trí:</strong> {fieldName}
      </p>
      <p>
        <strong>Dụng cụ:</strong> {materialName}
      </p>
      <p>
        <strong>Mô tả:</strong> {description}
      </p>
    </Modal>
  );
};

export default TaskDetail;
