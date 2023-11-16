import { Button, Dropdown, Empty, Menu, Modal } from "antd";
import React from "react";
import { MoreOutlined, EditOutlined, DeleteOutlined } from "@ant-design/icons";
import dayjs from "dayjs";

function DisplaySubTask({
  subTaskModalVisible,
  handleSubTaskModalVisible,
  subTasks,
  handleMenuSubTaskClick,
  statusForEdit,
  editingTask,
}) {
  return (
    <Modal
      title={editingTask ? `#${editingTask.code} - ${editingTask.name}` : null}
      visible={subTaskModalVisible}
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
                  <div className="subTask-dropdown">
                    <Dropdown
                      placement="bottomRight"
                      overlay={
                        <Menu
                          onClick={(e) =>
                            handleMenuSubTaskClick(e, subTaskItem)
                          }
                        >
                          {statusForEdit ? (
                            <>
                              <Menu.Item key="editEffort">
                                <EditOutlined
                                  style={{
                                    color: "gold",
                                    marginRight: "8px",
                                  }}
                                />
                                Sửa chấm công
                              </Menu.Item>
                            </>
                          ) : (
                            <>
                              <Menu.Item key="edit">
                                <EditOutlined
                                  style={{
                                    color: "gold",
                                    marginRight: "8px",
                                  }}
                                />
                                Sửa công việc con
                              </Menu.Item>
                              <Menu.Item key="delete">
                                <DeleteOutlined
                                  style={{ color: "red", marginRight: "8px" }}
                                />
                                Xóa công việc con
                              </Menu.Item>
                            </>
                          )}
                        </Menu>
                      }
                    >
                      <Button icon={<MoreOutlined />} />
                    </Dropdown>
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
                      <span>Ngày bắt đầu:</span>{" "}
                      {dayjs(subTaskItem.startDay).format("DD-MM-YYYY / HH:mm")}
                    </p>
                    <p>
                      <span>Ngày kết thúc:</span>{" "}
                      {dayjs(subTaskItem.endDay).format("DD-MM-YYYY / HH:mm")}
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
