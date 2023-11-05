import React, { useEffect, useState } from "react";
import { Button, Form, Input, Modal, Select, Table } from "antd";
import { useSelector, useDispatch } from "react-redux";
import { getTasks, deleteTask } from "features/slice/task/taskSlice";
import { getEmployeeByTask } from "features/slice/employee/employeeByTask";
import {
  getSubTasksByTaskId,
  createSubTask,
  deleteSubTask,
} from "features/slice/subTask/subTaskSlice";
import { getEffort, updateEffort } from "features/slice/subTask/effortSlice";
import { taskTitle } from "./listTaskData";
import { getEvidenceByTaskId } from "features/slice/task/taskEvidenceSlice";
import { getStatus } from "features/slice/status/statusSlice";
import TaskDetail from "../TaskDetail";
import ModalTask from "../ModalTask";
import { Menu, Dropdown } from "antd";
import {
  MoreOutlined,
  EditOutlined,
  DeleteOutlined,
  PlusCircleOutlined,
  FileTextOutlined,
} from "@ant-design/icons";
import TextArea from "antd/es/input/TextArea";
import StatusTabs from "./components/StatusTabs";
import SearchComp from "./components/SearchComp";
import DateSelectionComp from "./components/DateSelection";

const List = () => {
  const [subTasks, setSubTasks] = useState([]);
  const [effort, setEffort] = useState([]);
  const [subTaskModalVisible, setSubTaskModalVisible] = useState(false);
  const [effortVisible, setEffortVisible] = useState(false);
  const [addSubtaskVisible, setAddSubtaskVisible] = useState(false);
  const [description, setDescription] = useState("");
  const [pageIndex, setPageIndex] = useState(1);
  const [currentTaskId, setCurrentTaskId] = useState(0);
  const [availableEmployees, setAvailableEmployees] = useState([]);
  const [selectedTask, setSelectedTask] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);
  const [status, setStatus] = useState(0);
  const [selectedDate, setSelectedDate] = useState(null);
  const [taskNameSearch, setTaskNameSearch] = useState("");
  const [editingSubTask, setEditingSubTask] = useState(null);
  const [editingEffort, setEditingEffort] = useState(null);
  const [editSubTaskModalVisible, setEditSubTaskModalVisible] = useState(false);
  const [editEffortVisible, setEditEffortVisible] = useState(false);

  const [form] = Form.useForm();
  const task = useSelector((state) => state.task.data);

  const dataTotalPages = useSelector((state) => state.task.totalPages);

  const dispatch = useDispatch();

  let totalSubTaskCount = 0;

  let totalEffortCount = 0;

  const loadDataTask = () => {
    dispatch(
      getTasks({
        pageIndex,
        status,
        date: selectedDate,
        taskName: taskNameSearch,
      })
    );
  };

  useEffect(() => {
    loadDataTask();
    dispatch(getStatus());
  }, [pageIndex, status, selectedDate, taskNameSearch]);

  useEffect(() => {
    dispatch(getEmployeeByTask(currentTaskId)).then((data) => {
      setAvailableEmployees(data.payload);
    });
  }, [currentTaskId]);

  const onChange = (pagination) => {
    setPageIndex(pagination.current);
  };

  const handleMenuClick = (e, record) => {
    if (e.key === "edit") {
    } else if (e.key === "delete") {
      handleDelete(record.id);
    }
  };

  const handleMenuSubTaskClick = (e, subTaskItem) => {
    if (e.key === "edit") {
      openEditSubTaskModal(subTaskItem);
    } else if (e.key === "delete") {
      handleDeleteSubTask(subTaskItem.employeeId);
    }
  };

  const handleMenuEffortClick = (e, effortItem) => {
    if (e.key === "edit") {
      openEditEffort(effortItem);
    }
  };

  const handleDelete = (id) => {
    dispatch(deleteTask(id)).then(() => {
      loadDataTask();
      setPageIndex(1);
    });
  };

  const openModal = (record) => {
    setSelectedTask(record);
    setModalVisible(true);
  };

  const closeModal = () => {
    setSelectedTask(null);
    setModalVisible(false);
  };

  const openAddSubtaskModal = (record) => {
    setCurrentTaskId(record.id);
    setAddSubtaskVisible(true);
    const taskId = currentTaskId;
    dispatch(getEmployeeByTask(taskId)).then((data) => {
      setAvailableEmployees(data.payload);
    });
    form.resetFields();
  };

  const openEditSubTaskModal = (subTask) => {
    setEditingSubTask(subTask);
    setEditSubTaskModalVisible(true);
    setDescription(subTask.description);
  };

  const openEditEffort = (effort) => {
    setEditingEffort(effort);
    setEditEffortVisible(true);
    setDescription(effort.description);
  };

  const closeEditSubTaskModal = () => {
    setEditingSubTask(null);
    setEditSubTaskModalVisible(false);
  };

  const closeEditEffortModal = () => {
    setEditingEffort(null);
    setEditEffortVisible(false);
  };

  const handleDeleteSubTask = (employeeId) => {
    const taskId = currentTaskId;
    dispatch(deleteSubTask({ taskId, employeeId })).then(() => {
      dispatch(getSubTasksByTaskId(taskId)).then((data) => {
        setSubTasks(data.payload);
      });
    });
  };

  const openSubtaskModal = (record) => {
    setCurrentTaskId(record.id);
    setSubTaskModalVisible(true);
    dispatch(getSubTasksByTaskId(record.id)).then((data) => {
      setSubTasks(data.payload);
    });
  };

  const openEffortModal = (record) => {
    setCurrentTaskId(record.id);
    setEffortVisible(true);
    dispatch(getEffort(record.id)).then((data) => {
      setEffort(data.payload);
    });
  };
  const closeAddSubtaskModal = () => {
    setAddSubtaskVisible(false);
  };

  const handleTabChange = (key) => {
    setPageIndex(1);
    setStatus(Number(key));
  };

  const handleTaskAdded = () => {
    setPageIndex(1);
  };

  const handleDateChange = (date) => {
    setSelectedDate(date);
    console.log(selectedDate);
    setPageIndex(1);
  };

  const handleSearchChange = (taskName) => {
    setTaskNameSearch(taskName);
    setPageIndex(1);
  };

  const handleAddSubTask = (values) => {
    const finalValues = {
      ...values,
      taskId: currentTaskId,
    };
    dispatch(createSubTask(finalValues)).then(() => {
      dispatch(getSubTasksByTaskId(currentTaskId)).then((data) => {
        setSubTasks(data.payload);
        loadDataTask();
        setAddSubtaskVisible(false);
      });
    });
  };

  const handleUpdateSubTask = (values) => {
    const finalValues = {
      ...values,
      taskId: currentTaskId,
      employeeId: editingSubTask.employeeId,
    };

    dispatch(createSubTask(finalValues)).then(() => {
      dispatch(getSubTasksByTaskId(currentTaskId)).then((data) => {
        setSubTasks(data.payload);
        loadDataTask();
        setEditSubTaskModalVisible(false);
      });
    });
  };

  const handleUpdateEffort = (taskId, employeeId, effortTime) => {
    const updatedEffort = [
      {
        employeeId: employeeId,
        effortTime: parseFloat(effortTime),
      },
    ];

    dispatch(updateEffort({id: taskId, body: updatedEffort})).then(() => {
      dispatch(getEffort(currentTaskId)).then((data) => {
        setEffort(data.payload);
        setEditEffortVisible(false);
      });
    });
  };

  return (
    <div className="list">
      <div className="list-header">
        <ModalTask
          onTaskAdded={handleTaskAdded}
          onDateChange={handleDateChange}
          loadDataTask={loadDataTask}
        />
        <div className="list-header-item-right">
          <DateSelectionComp
            selectedDate={selectedDate}
            handleDateChange={handleDateChange}
          />
          <SearchComp handleSearchChange={handleSearchChange} />
        </div>
      </div>
      <StatusTabs onTabChange={handleTabChange} />

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
              title: <p style={{ textAlign: "center" }}>Tùy chọn</p>,
              key: "action",
              render: (_, record) => {
                const isManager = record && record.managerName;
                const isStatus =
                  record.status === "Chuẩn bị" ||
                  record.status === "Đang thực hiện";
                const isStatusEffort =
                  record.status === "Hoàn thành" ||
                  record.status === "Không hoàn thành";
                if (isManager) {
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
                              <span>
                                <EditOutlined
                                  style={{ color: "gold", marginRight: "8px" }}
                                />
                                Sửa
                              </span>
                            </Menu.Item>
                          ) : null}

                          <Menu.Item key="delete">
                            <span>
                              <DeleteOutlined
                                style={{ color: "red", marginRight: "8px" }}
                              />
                              Xóa
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
          onRow={(record, rowIndex) => {
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
          }}
        />
      )}
      <TaskDetail
        visible={modalVisible}
        onCancel={closeModal}
        taskData={selectedTask}
      />
      <Modal
        title="Thêm công việc con"
        visible={addSubtaskVisible}
        onCancel={closeAddSubtaskModal}
        footer={[
          <Button form="createSubTask" type="dashed" htmlType="reset">
            Làm mới
          </Button>,
          <Button
            form="createSubTask"
            type="primary"
            danger
            onClick={closeAddSubtaskModal}
          >
            Huỷ
          </Button>,
          <Button form="createSubTask" type="primary" htmlType="submit">
            Hoàn thành
          </Button>,
        ]}
      >
        <Form
          layout="vertical"
          form={form}
          id="createSubTask"
          onFinish={handleAddSubTask}
        >
          <Form.Item
            label="Tên công việc con"
            name="name"
            required
            rules={[
              {
                required: true,
                message: "Vui lòng nhập tên công việc con",
              },
            ]}
          >
            <Input placeholder="Nhập tên công việc con" />
          </Form.Item>
          <Form.Item
            label="Người thực hiện"
            name="employeeId"
            required
            rules={[
              {
                required: true,
                message: "Vui lòng chọn người thực hiện",
              },
            ]}
          >
            <Select
              placeholder="Chọn người thực hiện"
              options={
                availableEmployees && availableEmployees.data
                  ? availableEmployees.data.map((item) => ({
                      label: item.name,
                      value: item.id,
                    }))
                  : null
              }
            />
          </Form.Item>
          <Form.Item label="Mô tả" name="description">
            <TextArea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              rows={5}
              placeholder="Thêm mô tả chi tiết cho công việc"
            />
          </Form.Item>
        </Form>
      </Modal>
      <Modal
        title="Công việc con"
        visible={subTaskModalVisible}
        onCancel={() => setSubTaskModalVisible(false)}
        footer={[
          <Button type="primary" onClick={() => setSubTaskModalVisible(false)}>
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
        {editSubTaskModalVisible && (
          <Modal
            title="Sửa công việc con"
            visible={editSubTaskModalVisible}
            onCancel={closeEditSubTaskModal}
            footer={[
              <Button form="updateSubTask" type="primary" htmlType="submit">
                Lưu thay đổi
              </Button>,
              <Button type="primary" onClick={closeEditSubTaskModal}>
                Đóng
              </Button>,
            ]}
          >
            <Form
              layout="vertical"
              onFinish={handleUpdateSubTask}
              id="updateSubTask"
              key={editingSubTask ? editingSubTask.employeeId : "new"}
            >
              <Form.Item
                label="Tên công việc con"
                name="name"
                required
                initialValue={editingSubTask.name}
              >
                <Input placeholder="Nhập tên công việc con" />
              </Form.Item>
              <Form.Item
                label="Mô tả"
                name="description"
                initialValue={description}
              >
                <TextArea
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  rows={5}
                  placeholder="Thêm mô tả chi tiết cho công việc"
                />
              </Form.Item>
            </Form>
          </Modal>
        )}
      </Modal>
      <Modal
        title="Xem chấm công"
        visible={effortVisible}
        onCancel={() => setEffortVisible(false)}
        footer={[
          <Button type="primary" onClick={() => setEffortVisible(false)}>
            Đóng
          </Button>,
        ]}
        className="effort-modal"
      >
        <div className="effort">
          {effort && effort.data ? (
            effort.data.map((effortItem) => {
              totalEffortCount++;
              const EffortCount = totalEffortCount;
              return (
                <div className="effort-content">
                  <div className="effort-header">
                    <div className="effort-count">
                      <span style={{ textDecoration: "none", color: "red" }}>
                        *{" "}
                      </span>
                      <span>Chấm công số {EffortCount}</span>{" "}
                    </div>
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
                  </div>

                  <div
                    className="effort-container"
                    key={effortItem.employeeId}
                  >
                    <div className="effort-item">
                      <p>Mã nhân viên: {effortItem.employeeCode}</p>
                      <p>Người thực hiện: {effortItem.employeeName}</p>
                      <p>Thời gian: {effortItem.effortTime} giờ</p>
                    </div>
                  </div>
                </div>
              );
            })
          ) : (
            <p>Chưa có công việc con</p>
          )}
        </div>
        {editEffortVisible && (
          <Modal
            title="Sửa chấm công"
            visible={editEffortVisible}
            onCancel={closeEditEffortModal}
            footer={[
              <Button form="updateEffort" type="primary" htmlType="submit">
                Lưu thay đổi
              </Button>,
              <Button type="primary" onClick={closeEditEffortModal}>
                Đóng
              </Button>,
            ]}
          >
            <Form
              layout="vertical"
              onFinish={(values) => {
                handleUpdateEffort(
                  currentTaskId,
                  editingEffort.employeeId,
                  values.effortTime
                );
              }}
              id="updateEffort"
              key={editingEffort ? editingEffort.employeeId : "new"}
            >
              <Form.Item
                label="Số giờ chấm công"
                name="effortTime"
                required
                initialValue={editingEffort.effortTime}
              >
                <Input placeholder="Nhập số giờ chấm công" />
              </Form.Item>
            </Form>
          </Modal>
        )}
      </Modal>
    </div>
  );
};

export default List;
