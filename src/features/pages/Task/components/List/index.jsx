import React, { useEffect, useState } from "react";
import { Button, Form, Input, Modal, Select, Space, Table } from "antd";
import { useSelector, useDispatch } from "react-redux";
import { getTasks, deleteTask } from "features/slice/task/taskSlice";
import { getEmployeeByTask } from "features/slice/employee/employeeByTask";
import {
  getSubTasksByTaskId,
  createSubTask,
  deleteSubTask,
} from "features/slice/subTask/subTaskSlice";
import { taskTitle, onChange } from "./listTaskData";
import { getEvidenceByTaskId } from "features/slice/task/taskEvidenceSlice";
import { getStatus } from "features/slice/status/statusSlice";
import TaskDetail from "../TaskDetail";
import ModalTask from "../ModalTask";
import { Menu, Dropdown, DatePicker } from "antd";
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
  const [subTaskModalVisible, setSubTaskModalVisible] = useState(false);
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
  const [editSubTaskModalVisible, setEditSubTaskModalVisible] = useState(false);

  const [form] = Form.useForm();
  const task = useSelector((state) => state.task.data);
  console.log(task);

  const dataTotalPages = useSelector((state) => state.task.totalPages);
  console.log(dataTotalPages);

  const dispatch = useDispatch();

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
      console.log("Edit", record);
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

  const handleDelete = (id) => {
    dispatch(deleteTask(id, status)).then(() => {
      loadDataTask();
      setPageIndex(1);
    });
    console.log(id);
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
      console.log(data.payload);
    });
    form.resetFields();
  };

  const openEditSubTaskModal = (subTask) => {
    setEditingSubTask(subTask);
    setEditSubTaskModalVisible(true);
    setDescription(subTask.description);
  };

  const closeEditSubTaskModal = () => {
    setEditingSubTask(null);
    setEditSubTaskModalVisible(false);
  };

  const handleDeleteSubTask = (employeeId) => {
    const taskId = currentTaskId;
    dispatch(deleteSubTask({ taskId, employeeId })).then(() => {
      dispatch(getSubTasksByTaskId(taskId)).then((data) => {
        setSubTasks(data.payload);
        console.log(data.payload);
      });
    });
  };

  const openSubtaskModal = (record) => {
    setCurrentTaskId(record.id);
    setSubTaskModalVisible(true);
    dispatch(getSubTasksByTaskId(record.id)).then((data) => {
      setSubTasks(data.payload);
      console.log(data.payload);
    });
  };

  const closeAddSubtaskModal = () => {
    setAddSubtaskVisible(false);
  };

  const closeEditSubtaskModal = () => {
    setEditingSubTask(false);
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
        setAddSubtaskVisible(false);
        setEditSubTaskModalVisible(false)
      });
    });
  };

  return (
    <div className="list">
      <div className="list-header">
        <ModalTask
          onTaskAdded={handleTaskAdded}
          onDateChange={handleDateChange}
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
              title: "Tuỳ chọn",
              key: "action",
              render: (_, record) => {
                const isManager = record && record.managerName;
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
                          <Menu.Item key="edit">
                            <span>
                              <EditOutlined
                                style={{ color: "gold", marginRight: "8px" }}
                              />
                              Sửa
                            </span>
                          </Menu.Item>
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
            onClick={closeModal}
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
            subTasks.data.map((subTaskItem) => (
              <div className="subTask-container" key={subTaskItem.employeeId}>
                <div className="subTask-content">
                  <p>
                    <strong>Tên:</strong> {subTaskItem.name}
                  </p>
                  <p>
                    <strong>Người thực hiện:</strong> {subTaskItem.employeeName}
                  </p>
                  <p>
                    <strong>Mô tả:</strong> {subTaskItem.description}
                  </p>
                </div>
                <Dropdown
                  placement="bottomRight"
                  overlay={
                    <Menu
                      onClick={(e) => handleMenuSubTaskClick(e, subTaskItem)}
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
            ))
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
    </div>
  );
};

export default List;
