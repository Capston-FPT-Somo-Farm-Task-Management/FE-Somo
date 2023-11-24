import React from "react";
import { Button, Modal } from "antd";
import TaskContent from "./TaskContent";
import Evidence from "./Evidence";

const TaskDetail = ({
  visible,
  onCancel,
  taskData,
  handleRefuseTask,
  openEditTaskModal,
  closeEditTaskModal,
  openChangeDoneToDoingModal,
}) => {
  return (
    <Modal
      title={
        taskData && taskData.status === "Hoàn thành" ? (
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
            <p>Chi tiết công việc</p>
            <Button style={{marginRight: "30px"}} onClick={openChangeDoneToDoingModal}>Chuyển sang thực hiện</Button>
          </div>
        ) : (
          "Chi tiết công việc"
        )
      }
      open={visible}
      onCancel={onCancel}
      footer={null}
      width={1200}
      className="modal-detail"
      style={{ maxWidth: "90%", margin: "0 auto" }}
    >
      <TaskContent taskData={taskData} />
      <Evidence
        taskData={taskData}
        handleRefuseTask={handleRefuseTask}
        openEditTaskModal={openEditTaskModal}
        closeEditTaskModal={closeEditTaskModal}
      />
    </Modal>
  );
};

export default TaskDetail;
