import { Dropdown, Menu, Table } from "antd";
import React, { useState } from "react";
import {
  MoreOutlined,
  EditOutlined,
  DeleteOutlined,
  PlusCircleOutlined,
  FileTextOutlined,
  CloseCircleOutlined,
  PauseCircleOutlined,
  UndoOutlined,
} from "@ant-design/icons";
import { useDispatch } from "react-redux";
import { getEvidenceByTaskId } from "features/slice/task/taskEvidenceSlice";

function TableTask({
  task,
  pageIndex,
  dataTotalPages,
  taskTitle,
  handleMenuClick,
  openEditTaskModal,
  openAddSubtaskModal,
  openSubtaskModal,
  openEffortModal,
  openChangeDoingToPendingModal,
  openChangeDoingToCancelModal,
  onChange,
  openModal,
}) {
  const dispatch = useDispatch();

  return (
    <>
      {task && (
        <Table
          rowKey="id"
          pagination={{
            current: pageIndex,
            pageSize: 10,
            total: dataTotalPages * 10,
            showSizeChanger: false,
          }}
          columns={[
            ...taskTitle,
            {
              title: <p>Tùy chọn</p>,
              key: "action",
              render: (_, record) => {
                const isManager = record && record.managerName;
                const isStatus =
                  record &&
                  (record.status === "Bản nháp" ||
                    record.status === "Chuẩn bị" ||
                    record.status === "Đang thực hiện");
                const isStatusSubTask =
                  record &&
                  (record.status === "Bản nháp" ||
                    record.status === "Chuẩn bị" ||
                    record.status === "Từ chối");
                const isStatusEffortTime =
                  record &&
                  (record.status === "Hoàn thành" ||
                    record.status === "Đã đóng");
                const isStatusChangeToDoing =
                  record && record.status === "Tạm hoãn";
                const isStatusDelete =
                  record &&
                  (record.status === "Bản nháp" ||
                    record.status === "Chuẩn bị");
                if (isManager) {
                  return (
                    <Dropdown
                      placement="bottomRight"
                      overlay={
                        <Menu onClick={(e) => handleMenuClick(e, record)}>
                          {!isStatusSubTask ? (
                            <Menu.Item key="viewSubTask">
                              <span onClick={() => openSubtaskModal(record)}>
                                <FileTextOutlined
                                  style={{ color: "green", marginRight: "8px" }}
                                />
                                Xem công việc con
                              </span>
                            </Menu.Item>
                          ) : null}

                          {isStatusEffortTime && isStatusEffortTime ? (
                            record.isHaveSubtask ? (
                              <Menu.Item key="viewEffort">
                                <span onClick={() => openSubtaskModal(record)}>
                                  <FileTextOutlined
                                    style={{
                                      color: "green",
                                      marginRight: "8px",
                                    }}
                                  />
                                  Xem giờ làm
                                </span>
                              </Menu.Item>
                            ) : (
                              <Menu.Item key="viewEffort">
                                <span onClick={() => openEffortModal(record)}>
                                  <FileTextOutlined
                                    style={{
                                      color: "green",
                                      marginRight: "8px",
                                    }}
                                  />
                                  Xem giờ làm
                                </span>
                              </Menu.Item>
                            )
                          ) : null}

                          {isStatus && isStatus ? (
                            <Menu.Item key="edit">
                              <span onClick={() => openEditTaskModal(record)}>
                                <EditOutlined
                                  style={{ color: "gold", marginRight: "8px" }}
                                />
                                Cập nhật công việc
                              </span>
                            </Menu.Item>
                          ) : null}
                          {isStatusChangeToDoing && isStatusChangeToDoing ? (
                            <Menu.Item key="changeToDoing">
                              <span>
                                <UndoOutlined
                                  style={{
                                    color: "blue",
                                    marginRight: "8px",
                                  }}
                                />
                                Chuyển sang thực hiện
                              </span>
                            </Menu.Item>
                          ) : null}
                          {record.status === "Đang thực hiện" ? (
                            <>
                              <Menu.Item key="pending">
                                <span
                                  onClick={() =>
                                    openChangeDoingToPendingModal(record)
                                  }
                                >
                                  <PauseCircleOutlined
                                    style={{
                                      color: "blue",
                                      marginRight: "8px",
                                    }}
                                  />
                                  Tạm hoãn
                                </span>
                              </Menu.Item>
                              <Menu.Item key="cancel">
                                <span
                                  onClick={() =>
                                    openChangeDoingToCancelModal(record)
                                  }
                                >
                                  <CloseCircleOutlined
                                    style={{
                                      color: "red",
                                      marginRight: "8px",
                                    }}
                                  />
                                  Hủy bỏ
                                </span>
                              </Menu.Item>
                            </>
                          ) : null}
                          {record.status === "Từ chối" ? (
                            <>
                              <Menu.Item key="reAssign">
                                <span onClick={() => openEditTaskModal(record)}>
                                  <PauseCircleOutlined
                                    style={{
                                      color: "blue",
                                      marginRight: "8px",
                                    }}
                                  />
                                  Chỉnh sửa
                                </span>
                              </Menu.Item>
                              <Menu.Item key="reject">
                                <span>
                                  <CloseCircleOutlined
                                    style={{
                                      color: "red",
                                      marginRight: "8px",
                                    }}
                                  />
                                  Không chấp nhận
                                </span>
                              </Menu.Item>
                            </>
                          ) : null}

                          {record.status === "Hoàn thành" ? (
                            <Menu.Item key="close">
                              <span>
                                <CloseCircleOutlined
                                  style={{ color: "gold", marginRight: "8px" }}
                                />
                                Đóng công việc
                              </span>
                            </Menu.Item>
                          ) : null}
                          {isStatusDelete && isStatusDelete ? (
                            <Menu.Item key="delete">
                              <span>
                                <DeleteOutlined
                                  style={{ color: "red", marginRight: "8px" }}
                                />
                                Xóa công việc
                              </span>
                            </Menu.Item>
                          ) : null}
                        </Menu>
                      }
                    >
                      <div
                        className="ant-dropdown-link"
                        onClick={(e) => e.preventDefault()}
                      >
                        <MoreOutlined className="menu-icon" />
                      </div>
                    </Dropdown>
                  );
                } else {
                  return (
                    <Dropdown
                      placement="bottomRight"
                      overlay={
                        <Menu onClick={(e) => handleMenuClick(e, record)}>
                          <Menu.Item key="subTask">
                            <span onClick={() => openAddSubtaskModal(record)}>
                              <PlusCircleOutlined
                                style={{ color: "green", marginRight: "8px" }}
                              />
                              Thêm công việc con
                            </span>
                          </Menu.Item>
                          <Menu.Item key="viewSubTask">
                            <span onClick={() => openSubtaskModal(record)}>
                              <FileTextOutlined
                                style={{ color: "green", marginRight: "8px" }}
                              />
                              Xem công việc con
                            </span>
                          </Menu.Item>
                        </Menu>
                      }
                    >
                      <div
                        className="ant-dropdown-link"
                        onClick={(e) => e.preventDefault()}
                      >
                        <MoreOutlined className="menu-icon" />
                      </div>
                    </Dropdown>
                  );
                }
              },
            },
          ]}
          dataSource={task}
          onChange={onChange}
          onRow={(record) => {
            if (record && record.status) {
              return {
                onClick: async (event) => {
                  const isNameClicked =
                    event.target.dataset.nameClicked === "true";

                  if (isNameClicked) {
                    openModal(record);
                    await dispatch(getEvidenceByTaskId(record.id));
                  }
                },
              };
            }
          }}
        />
      )}
    </>
  );
}

export default TableTask;
