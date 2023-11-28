import { Avatar, Modal } from "antd";
import React from "react";
import { useSelector } from "react-redux";

const ViewReject = ({
  viewRejectModalVisible,
  closeViewRejectModal,
  taskData,
}) => {
  const evidence = useSelector((state) => state.evidence.data);
  const evidenceData = evidence.data;
  console.log("evidenceData: ", evidenceData);
  console.log("taskData: ", taskData);
  return (
    <Modal
      open={viewRejectModalVisible}
      onCancel={closeViewRejectModal}
      width={600}
      footer={null}
      title="Lý do từ chối"
    >
      {evidenceData.map((evidence) => {
        return (
          <div className="evidence-item-header" key={evidence.id}>
            <div className="evidence-name">
              <Avatar
                src={taskData ? taskData.avatarSupervisor : null}
                size="large"
              />
              <h3>{taskData ? taskData.supervisorName : null}</h3>
            </div>
            <p className="evidence-time">{evidence.time}</p>
          </div>
        );
      })}
    </Modal>
  );
};

export default ViewReject;
