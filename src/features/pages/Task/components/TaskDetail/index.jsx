import React from "react";
import { Badge, Modal } from "antd";
import dayjs from "dayjs";
import { useSelector } from "react-redux";
import { Descriptions } from "antd";
import { Image } from "antd";
import NoImage from "../../../../../assets/no-image.png";

const TaskDetail = ({ visible, onCancel, taskData }) => {
  const evidenceData = useSelector((state) => state.evidence.data);
  console.log(evidenceData);

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
      } else{
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
            taskData.priority === "Cao nhất"
              ? "red"
              : taskData.priority === "Cao"
              ? "orange"
              : taskData.priority === "Trung bình"
              ? "yellow"
              : taskData.priority === "Thấp"
              ? "green"
              : taskData.priority === "Thấp nhất"
              ? "blue"
              : "default" // Màu mặc định nếu không khớp với bất kỳ điều kiện nào
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
      children: taskData.materialName,
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
          {renderSubFields()}
          <br />
          Mô tả: {taskData.description}
          <br />
        </>
      ),
    },
  ];

  const renderImages = () => {
    let totalEvidenceCount = 0;
    if (evidenceData && evidenceData.data && evidenceData.data.length > 0) {
      return evidenceData.data.map((evidence, index) => {
        totalEvidenceCount++;
        const evidenceCount = totalEvidenceCount;
        return (
          <div key={evidence.id} className="evidence-content">
            <div className="evidence-count">
              <span style={{textDecoration: "none", color: "red"}}>* </span>
              <span>Báo cáo số {evidenceCount}</span>{" "}
            </div>
            <p className="evidence-desc">Mô tả: {evidence.description}</p>
            <p className="evidence-time">Được gửi {evidence.time}</p>
            <div className="img-contain">
              <Image.PreviewGroup>
                {evidence.urlImage && evidence.urlImage ? (
                  evidence.urlImage.map((url, imageIndex) => (
                    <>
                      {evidence.urlImage.length === 1 ? (
                        <div className="img-evidence" key={imageIndex}>
                          <Image src={url} alt={`evidence-${imageIndex}`} />
                        </div>
                      ) : evidence.urlImage.length === 2 ? (
                        <div
                          style={{ width: "45%" }}
                          className="img-evidence"
                          key={imageIndex}
                        >
                          <Image src={url} alt={`evidence-${imageIndex}`} />
                        </div>
                      ) : evidence.urlImage.length === 3 ? (
                        <div
                          style={{ width: "30%" }}
                          className="img-evidence"
                          key={imageIndex}
                        >
                          <Image src={url} alt={`evidence-${imageIndex}`} />
                        </div>
                      ) : evidence.urlImage.length === 4 ? (
                        <div
                          style={{ width: "45%", margin: "10px"}}
                          className="img-evidence"
                          key={imageIndex}
                        >
                          <Image src={url} alt={`evidence-${imageIndex}`} />
                        </div>
                      ) : evidence.urlImage.length > 4 ? (
                        <div
                          style={{
                            width: "45%",
                            margin: "10px",
                            display:
                              imageIndex >= 4 && evidence.urlImage.length > 4
                                ? "none"
                                : "block",
                          }}
                          className={`img-evidence ${
                            imageIndex === 3 && evidence.urlImage.length > 4
                              ? "overlay"
                              : ""
                          }`}
                          key={imageIndex}
                        >
                          <Image src={url} alt={`evidence-${imageIndex}`} />
                          {imageIndex === 3 && evidence.urlImage.length > 4 && (
                            <div className="overlay-text">
                              +{evidence.urlImage.length - 4}
                            </div>
                          )}
                        </div>
                      ) : null}
                    </>
                  ))
                ) : (
                  <img src={NoImage} alt="Không có ảnh" />
                )}
              </Image.PreviewGroup>
            </div>
          </div>
        );
      });
    } else {
      return <p>Chưa có báo cáo nào</p>;
    }
  };

  return (
    <Modal
      title="Chi tiết công việc"
      visible={visible}
      onCancel={onCancel}
      footer={null}
      width={1000}
      className="modal-detail"
      style={{ maxWidth: "90%", margin: "0 auto" }}
    >
      <Descriptions bordered items={dataTask} />

      <div className="evidence">
        <h6 style={{ fontSize: "24px", fontWeight: "500" }}>
          Báo cáo công việc:
        </h6>
        {renderImages()}
      </div>
    </Modal>
  );
};

export default TaskDetail;
