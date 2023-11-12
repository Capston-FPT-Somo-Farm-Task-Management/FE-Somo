import React from "react";
import { Modal } from "antd";
import TaskContent from "./TaskContent";

const TaskDetail = ({ visible, onCancel, taskData }) => {
  return (
    <Modal
      title="Chi tiết công việc"
      visible={visible}
      onCancel={onCancel}
      footer={null}
      width={550}
      className="modal-detail"
      style={{ maxWidth: "90%", margin: "0 auto" }}
    >
      <TaskContent taskData={taskData} />
    </Modal>
  );
};

export default TaskDetail;
