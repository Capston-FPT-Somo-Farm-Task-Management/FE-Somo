import { Dropdown, Menu, Table } from "antd";
import React, { useState } from "react";
import {
  MoreOutlined,
  EditOutlined,
  DeleteOutlined,
  ArrowRightOutlined,
  FileTextOutlined,
  CloseCircleOutlined,
  PauseCircleOutlined,
  UndoOutlined,
  SolutionOutlined,
  FormOutlined
} from "@ant-design/icons";
import { useDispatch } from "react-redux";
import { getEvidenceByTaskId } from "features/slice/task/taskEvidenceSlice";
import { useDesktopMediaQuery, useDesktopXLMediaQuery, useMobileMediaQuery, useTabletMediaQuery } from "common/hooks/responsive";

function TableTask({
  task,
  pageIndex,
  dataTotalPages,
  taskTitle,
  handleMenuClick,
  openEditTaskModal,
  openViewRejectModal,
  openSubtaskModal,
  openEffortModal,
  openDeleteModal,
  openCloseModal,
  openChangeDoingToPendingModal,
  openChangeDoingToCancelModal,
  onChange,
  openModal,
}) {
  const dispatch = useDispatch();

  const isMobile = useMobileMediaQuery()

  const isTablet = useTabletMediaQuery()

  const isDesktopXL = useDesktopXLMediaQuery()

  const columns = taskTitle?.filter((column) => {
    // Nếu là màn hình Mobile, ẩn cột ngày bắt đầu và ngày kết thúc
    if (isMobile) {
      return column.dataIndex !== 'startDate' && column.dataIndex !== 'endDate' && column.dataIndex !== 'supervisorName' && column.dataIndex !== 'priority';
    }else if (isTablet) {
      return column.dataIndex !== 'startDate' && column.dataIndex !== 'endDate' && column.dataIndex !== 'supervisorName';
    }else if(isDesktopXL){
      return column.dataIndex !== 'startDate' && column.dataIndex !== 'endDate';
    }
    // Cho các màn hình khác, hiển thị tất cả các cột
    return true;
  });
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
            ...columns,
            {
              title: <p>Tùy chọn</p>,
              key: "action",
              render: (_, record) => {
                const isManager =
                  record && (record.managerName || record.supervisorName);
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

                          {record.status === "Bản nháp" ? (
                            <Menu.Item key="changeToToDo">
                              <span onClick={() => openEditTaskModal(record)}>
                                <ArrowRightOutlined
                                  style={{ color: "green", marginRight: "8px" }}
                                />
                                Chuyển sang chuẩn bị
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

                          {record.status === "Từ chối" ? (
                            <>
                            <Menu.Item key="viewReject">
                                <span onClick={() => dispatch(getEvidenceByTaskId(record.id))}>
                                  <SolutionOutlined
                                    style={{
                                      color: "blue",
                                      marginRight: "8px",
                                    }}
                                  />
                                  Xem lý do từ chối
                                </span>
                              </Menu.Item>
                              <Menu.Item key="reAssign">
                                <span onClick={() => openEditTaskModal(record)}>
                                  <FormOutlined 
                                    style={{
                                      color: "gold",
                                      marginRight: "8px",
                                    }}
                                  />
                                  Giao lại
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
                              <span onClick={() => openCloseModal(record)}>
                                <CloseCircleOutlined
                                  style={{ color: "gold", marginRight: "8px" }}
                                />
                                Đóng công việc
                              </span>
                            </Menu.Item>
                          ) : null}
                          {record.status === "Bản nháp" ||
                          record.status === "Chuẩn bị" ? (
                            <Menu.Item key="delete">
                              <span onClick={() => openDeleteModal(record)}>
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
