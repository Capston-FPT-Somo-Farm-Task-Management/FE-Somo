import { Button, Empty, Modal } from "antd";
import React from "react";

function DisplaySubTask({
  subTaskModalVisible,
  handleSubTaskModalVisible,
  subTasks,
  editingTask,
}) {
  return (
    <Modal
      title={editingTask ? `#${editingTask.code} - ${editingTask.name}` : null}
      open={subTaskModalVisible}
      onCancel={handleSubTaskModalVisible}
      width={1000}
      footer={[
        <Button type="primary" onClick={handleSubTaskModalVisible}>
          Đóng
        </Button>,
      ]}
      className="subTask-modal"
    >
      <div className="subTask">
        {subTasks && subTasks.data ? (
          subTasks.data.map((subTaskItem) => {
            console.log(subTaskItem);
            return (
              <div className="subTask-content">
                <div className="subTask-header">
                  <div className="subTask-count">
                    <span style={{ color: "#8EAD48" }}>
                      #{subTaskItem.code}
                    </span>{" "}
                  </div>
                </div>
                <div className="subTask-container" key={subTaskItem.employeeId}>
                  <div className="subTask-item">
                    <p>
                      <span>Tên:</span> {subTaskItem.name}
                    </p>
                    {console.log(subTaskItem)}
                    <p>
                      <span>Người thực hiện:</span> {subTaskItem.employeeName}
                    </p>
                    <p>
                      <span>Thời gian làm việc:</span>{" "}
                      {subTaskItem.actualEffortHour} giờ{" "}
                      {subTaskItem.actualEfforMinutes} phút
                    </p>
                    {subTaskItem.description ? (
                      <p>
                        <span>Mô tả:</span> {subTaskItem.description}
                      </p>
                    ) : (
                      <p>Chưa có mô tả</p>
                    )}
                  </div>
                </div>
              </div>
            );
          })
        ) : (
          <Empty description="Chưa có công việc con" />
        )}
      </div>
    </Modal>
  );
}

export default DisplaySubTask;
