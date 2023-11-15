import { Button, Dropdown, Empty, Menu, Modal, notification } from "antd";
import React from "react";
import { MoreOutlined, EditOutlined } from "@ant-design/icons";
import { FrownOutlined } from "@ant-design/icons";

function DisplayEffort({
  effortVisible,
  handleEffortVisible,
  effort,
  handleMenuEffortClick,
  handleMenuSubTaskClick,
  isHaveSubTask,
  openSubtaskModal,
}) {
  let totalEffortCount = 0;
  console.log(isHaveSubTask);
  const [api, contextHolder] = notification.useNotification();
  const openNotification = () => {
    api.open({
      message: "Công việc này có công việc con",
      description: "Bạn vui lòng chấm công ở từng công việc con!",
      icon: <FrownOutlined style={{ color: "red" }} />,
    });
  };
  return (
    <Modal
      title="Xem chấm công tổng"
      visible={effortVisible}
      onCancel={handleEffortVisible}
      footer={[
        <Button type="primary" onClick={handleEffortVisible}>
          Đóng
        </Button>,
      ]}
      className="effort-modal"
    >
      <div className="effort">
        {effort ? (
          effort.map((effortItem) => {
            totalEffortCount++;
            const EffortCount = totalEffortCount;
            return (
              <div className="effort-content">
                <div className="effort-header">
                  <div className="effort-count">
                    <span style={{ textDecoration: "none", color: "red" }}>
                      *{" "}
                    </span>
                    <span>Chấm công theo {effortItem.employeeName}</span>{" "}
                  </div>
                  {isHaveSubTask === false ? (
                    <div className="effort-dropdown">
                      <Dropdown
                        placement="bottomRight"
                        overlay={
                          <Menu
                            onClick={(e) =>
                              handleMenuEffortClick(e, effortItem)
                            }
                          >
                            <Menu.Item key="edit">
                              <EditOutlined
                                style={{ color: "gold", marginRight: "8px" }}
                              />
                              Sửa chấm công
                            </Menu.Item>
                          </Menu>
                        }
                      >
                        <Button icon={<MoreOutlined />} />
                      </Dropdown>
                    </div>
                  ) : (
                    <div className="effort-dropdown">
                      <Dropdown
                        placement="bottomRight"
                        overlay={
                          <Menu onClick={openNotification}>
                            <Menu.Item key="editEffort">
                              <EditOutlined
                                style={{ color: "gold", marginRight: "8px" }}
                              />
                              {contextHolder}
                              Sửa chấm công
                            </Menu.Item>
                          </Menu>
                        }
                      >
                        <Button icon={<MoreOutlined />} />
                      </Dropdown>
                    </div>
                  )}
                </div>

                <div className="effort-container" key={effortItem.employeeId}>
                  <div className="effort-item">
                    {console.log(effortItem)}
                    <p>Mã nhân viên: {effortItem.employeeCode}</p>
                    <p>
                      Thời gian: {effortItem.totalActualEffortHour} giờ{" "}
                      {effortItem.totalActualEfforMinutes} phút
                    </p>
                  </div>
                </div>
              </div>
            );
          })
        ) : (
          <Empty description="Không có người thực hiện để chấm công" />
        )}
      </div>
    </Modal>
  );
}

export default DisplayEffort;
