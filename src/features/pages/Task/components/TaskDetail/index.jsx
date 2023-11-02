import React from "react";
import { Modal } from "antd";
import dayjs from "dayjs";
import { useSelector } from "react-redux";
import AccessAlarmIcon from "@mui/icons-material/AccessAlarm";
import AlarmOnIcon from "@mui/icons-material/AlarmOn";
import ListAltIcon from "@mui/icons-material/ListAlt";
import CleaningServicesOutlinedIcon from "@mui/icons-material/CleaningServicesOutlined";
import EngineeringOutlinedIcon from "@mui/icons-material/EngineeringOutlined";
import SupervisorAccountOutlinedIcon from "@mui/icons-material/SupervisorAccountOutlined";
import HandymanOutlinedIcon from "@mui/icons-material/HandymanOutlined";
import PriorityHighOutlinedIcon from "@mui/icons-material/PriorityHighOutlined";
import PendingActionsOutlinedIcon from "@mui/icons-material/PendingActionsOutlined";
import PinDropOutlinedIcon from "@mui/icons-material/PinDropOutlined";
import SpaceDashboardOutlinedIcon from "@mui/icons-material/SpaceDashboardOutlined";
import CropDinOutlinedIcon from "@mui/icons-material/CropDinOutlined";
import DescriptionOutlinedIcon from "@mui/icons-material/DescriptionOutlined";
import ParkOutlinedIcon from "@mui/icons-material/ParkOutlined";
import { Descriptions } from "antd";

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
    supervisorName,
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
      if (fieldStatus === "Thực vật") {
        return (
          <p>
            <ParkOutlinedIcon />
            <strong>Mã cây trồng:</strong> {plantName}
          </p>
        );
      } else if (fieldStatus === "Động vật") {
        return (
          <p>
            <strong>Mã vật nuôi:</strong> {liveStockName}
          </p>
        );
      }
    }
    console.log(plantName);
    console.log(fieldStatus);
    return null;
  };

  return (
    <Modal
      title="Chi tiết công việc"
      visible={visible}
      onCancel={onCancel}
      footer={null}
      width={700}
      className="modal-detail"
    >
      <Descriptions column={1} bordered>
        <Descriptions.Item label={<ListAltIcon />}>
          Tên công việc
        </Descriptions.Item>
        <Descriptions.Item label={<CleaningServicesOutlinedIcon />}>
          Loại công việc
        </Descriptions.Item>
        {/* ... Thêm các item khác tương tự */}
      </Descriptions>
      <div className="task-detail-group">
        <p>
          <ListAltIcon />
          <strong>Tên công việc:</strong> {name}
        </p>
        <p>
          <CleaningServicesOutlinedIcon />
          <strong>Loại công việc:</strong> {taskTypeName}
        </p>
        <p>
          <EngineeringOutlinedIcon />
          <strong>Người thực hiện:</strong> {employeeName}
        </p>
        <p>
          <SupervisorAccountOutlinedIcon />
          <strong>Người giám sát:</strong> {supervisorName}
        </p>
        <p>
          <HandymanOutlinedIcon />
          <strong>Dụng cụ sử dụng:</strong> {materialName}
        </p>
        {description ? (
          <p>
            <DescriptionOutlinedIcon />
            <strong>Mô tả:</strong> {description}
          </p>
        ) : (
          <p>
            <DescriptionOutlinedIcon />
            <strong>Chưa có mô tả chi tiết</strong>
          </p>
        )}
      </div>
      <div className="task-detail-group">
        <p>
          <PriorityHighOutlinedIcon />
          <strong>Ưu tiên:</strong> {priority}
        </p>
        <p>
          <PendingActionsOutlinedIcon />
          <strong>Trạng thái:</strong> {status}
        </p>
        <p>
          <AccessAlarmIcon />
          <strong>Ngày bắt đầu:</strong>{" "}
          {dayjs(startDate).format("HH:mm DD/MM/YYYY")}
        </p>
        <p>
          <AlarmOnIcon />
          <strong>Ngày kết thúc:</strong>{" "}
          {dayjs(endDate).format("HH:mm DD/MM/YYYY")}
        </p>
      </div>
      <div className="task-detail-group">
        <p>
          <CropDinOutlinedIcon />
          <strong>Khu vực:</strong> {areaName}
        </p>
        <p>
          <SpaceDashboardOutlinedIcon />
          <strong>Vùng:</strong> {zoneName}
        </p>
        {renderSubFields()}
        <p>
          <PinDropOutlinedIcon />
          <strong>Vị trí:</strong> {fieldName}
        </p>
      </div>

      <div className="evidence">
        <h2>Báo cáo:</h2>
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
          <p>Chưa có báo cáo nào</p>
        )}
      </div>
    </Modal>
  );
};

export default TaskDetail;
