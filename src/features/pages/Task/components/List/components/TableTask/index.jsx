import { Dropdown, Menu, Table } from "antd";
import React, { useState } from "react";
import {
  MoreOutlined,
  EditOutlined,
  DeleteOutlined,
  PlusCircleOutlined,
  FileTextOutlined,
} from "@ant-design/icons";
import { useDispatch } from "react-redux";
import { getEvidenceByTaskId } from "features/slice/task/taskEvidenceSlice";
import UpdateTask from "../UpdateTask";

function TableTask({
  task,
  pageIndex,
  dataTotalPages,
  taskTitle,
  handleMenuClick,
  editingTask,
  editTaskModalVisible,
  openEditTaskModal,
  closeEditTaskModal,
  openAddSubtaskModal,
  openSubtaskModal,
  openEffortModal,
  onChange,
  openModal,
  handleTaskAdded,
  handleDateChange,
  loadDataTask,
  currentTaskId,
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
                  (record.status === "Bản nháp" || record.status === "Chuẩn bị" ||
                    record.status === "Đang thực hiện");
                const isStatusEffort =
                  record &&
                  (record.status === "Hoàn thành" ||
                    record.status === "Không hoàn thành");
                if (isManager) {
                  return (
                    <Dropdown
                      placement="bottomRight"
                      overlay={
                        <Menu onClick={(e) => handleMenuClick(e, record)}>
                          {!isStatusEffort ? (
                            <Menu.Item key="subTask">
                              <span onClick={() => openAddSubtaskModal(record)}>
                                <PlusCircleOutlined
                                  style={{ color: "green", marginRight: "8px" }}
                                />
                                Thêm công việc con
                              </span>
                            </Menu.Item>
                          ) : null}

                          <Menu.Item key="viewSubTask">
                            <span onClick={() => openSubtaskModal(record)}>
                              <FileTextOutlined
                                style={{ color: "green", marginRight: "8px" }}
                              />
                              Xem công việc con
                            </span>
                          </Menu.Item>
                          {isStatusEffort && isStatusEffort ? (
                            <Menu.Item key="viewEffort">
                              <span onClick={() => openEffortModal(record)}>
                                <FileTextOutlined
                                  style={{ color: "green", marginRight: "8px" }}
                                />
                                Xem chấm công
                              </span>
                            </Menu.Item>
                          ) : null}

                          {isStatus && isStatus ? (
                            <Menu.Item key="edit">
                              <span onClick={() => openEditTaskModal(record)}>
                                <EditOutlined
                                  style={{ color: "gold", marginRight: "8px" }}
                                />
                                Sửa công việc
                              </span>
                            </Menu.Item>
                          ) : null}

                          <Menu.Item key="delete">
                            <span>
                              <DeleteOutlined
                                style={{ color: "red", marginRight: "8px" }}
                              />
                              Xóa công việc
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

      <UpdateTask
        editTaskModalVisible={editTaskModalVisible}
        closeEditTaskModal={closeEditTaskModal}
        key={editingTask ? editingTask.id : null}
        editingTask={editingTask}
        handleTaskAdded={handleTaskAdded}
        handleDateChange={handleDateChange}
        loadDataTask={loadDataTask}
        currentTaskId={currentTaskId}
      />
    </>
  );
}

export default TableTask;
