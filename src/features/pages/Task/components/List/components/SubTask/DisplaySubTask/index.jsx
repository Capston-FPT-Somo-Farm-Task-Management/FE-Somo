import { Button, Dropdown, Menu, Modal } from 'antd';
import React from 'react'
import {
    MoreOutlined,
    EditOutlined,
    DeleteOutlined,
  } from "@ant-design/icons";

function DisplaySubTask({subTaskModalVisible, handleSubTaskModalVisible, subTasks, handleMenuSubTaskClick}) {
    let totalSubTaskCount = 0;
  return (
    <Modal
        title="Công việc con"
        visible={subTaskModalVisible}
        onCancel={handleSubTaskModalVisible}
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
              totalSubTaskCount++;
              const SubTaskCount = totalSubTaskCount;
              return (
                <div className="subTask-content">
                  <div className="subTask-header">
                    <div className="subTask-count">
                      <span style={{ textDecoration: "none", color: "red" }}>
                        *{" "}
                      </span>
                      <span>Báo cáo số {SubTaskCount}</span>{" "}
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
                            <Menu.Item key="edit">
                              <EditOutlined
                                style={{ color: "gold", marginRight: "8px" }}
                              />
                              Sửa công việc con
                            </Menu.Item>
                            <Menu.Item key="delete">
                              <DeleteOutlined
                                style={{ color: "red", marginRight: "8px" }}
                              />
                              Xóa công việc con
                            </Menu.Item>
                          </Menu>
                        }
                      >
                        <Button icon={<MoreOutlined />} />
                      </Dropdown>
                    </div>
                  </div>

                  <div
                    className="subTask-container"
                    key={subTaskItem.employeeId}
                  >
                    <div className="subTask-item">
                      <p>Tên: {subTaskItem.name}</p>
                      <p>Người thực hiện: {subTaskItem.employeeName}</p>
                      <p>Mô tả: {subTaskItem.description}</p>
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
  )
}

export default DisplaySubTask