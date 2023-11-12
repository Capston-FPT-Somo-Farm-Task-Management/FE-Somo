import { Button, Dropdown, Menu, Modal } from "antd";
import React from "react";
import { MoreOutlined, EditOutlined } from "@ant-design/icons";

function DisplayEffort({
  effortVisible,
  handleEffortVisible,
  effort,
  handleMenuEffortClick,
}) {
  let totalEffortCount = 0;
  return (
    <Modal
      title="Xem chấm công"
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
                    <span>Chấm công theo công việc tổng</span>{" "}
                  </div>
                  <div className="effort-dropdown">
                    <Dropdown
                      placement="bottomRight"
                      overlay={
                        <Menu
                          onClick={(e) => handleMenuEffortClick(e, effortItem)}
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
                </div>

                <div className="effort-container" key={effortItem.employeeId}>
                  <div className="effort-item">
                  {console.log(effortItem)}
                    <p>Mã nhân viên: {effortItem.employeeCode}</p>
                    <p>Người thực hiện: {effortItem.employeeName}</p>
                    <p>Thời gian: {effortItem.totalActualEffortHour} giờ {effortItem.totalActualEfforMinutes} phút</p>
                  </div>
                </div>
              </div>
            );
          })
        ) : (
          <p>Chưa có công việc con</p>
        )}
      </div>
    </Modal>
  );
}

export default DisplayEffort;
