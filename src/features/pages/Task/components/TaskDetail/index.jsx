import React, { useState, useEffect } from "react";
import { Modal } from "antd";
import dayjs from "dayjs";
import { useSelector } from "react-redux";

const TaskDetail = ({ visible, onCancel, taskData }) => {
  const evidenceData = useSelector((state) => state.evidence.data);
  const dataEvidence = evidenceData.data;
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

  const renderImages = () => {
    if (dataEvidence && dataEvidence.length > 0) {
      return dataEvidence.map((evidence, index) => (
        <div key={index}>
          <p>{evidence.time}</p>
          <p>{evidence.description}</p>
          <div className="img-evidence">
            <img src={evidence.urlImage} alt={`evidence-${index}`} />
          </div>
        </div>
      ));
    } else {
      return <p>Chưa có bằng chứng báo cáo</p>;
    }
  };

  const renderSubFields = () => {
    if (externalId) {
      if (fieldStatus === "Động vật") {
        return (
          <p>
            <strong>Mã vật nuôi:</strong> {liveStockName}
          </p>
        );
      } else if (fieldStatus === "Thực vật") {
        return (
          <p>
            <strong>Mã cây trồng:</strong> {plantName}
          </p>
        );
      }
    }
    console.log(plantName);
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
      <div className="evidence">
        <h2>Bằng chứng:</h2>
          {dataEvidence && dataEvidence.length > 0 ? (
            dataEvidence.map((evidence) => (
              <div key={evidence.id}>
                <p>{evidence.time}</p>
                <p>{evidence.description}</p>
                <div className="img-evidence">
                  <img src={evidence.urlImage} alt="evidence" />
                </div>
              </div>
            ))
          ) : (
            <p>Chưa có bằng chứng báo cáo</p>
          )}
      </div>
    </Modal>
  );
};

export default TaskDetail;
