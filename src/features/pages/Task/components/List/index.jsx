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

const List = () => {
  const [subTasks, setSubTasks] = useState([]);
  const [subTaskModalVisible, setSubTaskModalVisible] = useState(false);
  const [addSubtaskVisible, setAddSubtaskVisible] = useState(false);
  // const [employeesValue, setEmployeesValue] = useState(0);
  const [description, setDescription] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [pageIndex, setPageIndex] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [currentTaskId, setCurrentTaskId] = useState(0);
  const [availableEmployees, setAvailableEmployees] = useState([]);
  const [selectedTask, setSelectedTask] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);
  const [status, setStatus] = useState(0);
  const [selectedDate, setSelectedDate] = useState(null);
  const [taskNameSearch, setTaskNameSearch] = useState("");
  const [editingSubTask, setEditingSubTask] = useState(null);
  const [showUpdateForm, setShowUpdateForm] = useState(false);

  const { Search } = Input;

  const [form] = Form.useForm();
  const task = useSelector((state) => state.task.data);

  const dataTotalPages = useSelector((state) => state.task.totalPages);

  // console.log(dataSubTask);
  const dispatch = useDispatch();

  const loadDataTask = () => {
    dispatch(
      getTasks({
        pageIndex,
        pageSize,
        status,
        date: selectedDate,
        taskName: taskNameSearch,
      })
    );
  }

  useEffect(() => {
    loadDataTask();
    dispatch(getStatus());
  }, [pageIndex, pageSize, status, selectedDate, taskNameSearch]);

  useEffect(() => {
    dispatch(getEmployeeByTask(currentTaskId)).then((data) => {
      setAvailableEmployees(data.payload);
    });
  }, [currentTaskId]);

  const onChange = (pagination) => {
    setPageIndex(pagination.current);
    setPageSize(pagination.pageSize);
  };

  const handleMenuClick = (e, record) => {
    if (e.key === "edit") {
      console.log("Edit", record);
    } else if (e.key === "delete") {
      handleDelete(record.id);
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
    setDescription(subTask.description);
    setShowUpdateForm(true);
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

  const handleTabChange = (key) => {
    setPageIndex(1);
    setStatus(Number(key));
  };

  const handleTaskAdded = () => {
    setPageIndex(1);
  };

  const handleResetDate = () => {
    setSelectedDate(null);
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
        setShowUpdateForm(false);
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
        <div>
          <Space direction="vertical">
            <DatePicker
              style={{ marginLeft: "15px" }}
              value={selectedDate}
              onChange={handleDateChange}
            />
            <Button onClick={handleResetDate}>Đặt lại</Button>
            <StatusTabs onTabChange={handleTabChange} />
            <Search
              placeholder="Tìm kiếm theo tên"
              allowClear
              onChange={(e) => handleSearchChange(e.target.value)}
              style={{
                marginLeft: "15px",
                width: 500,
              }}
            />
          </Space>
        </div>
      </div>
      {task && (
        <Table
          rowKey="id"
          pagination={{
            current: pageIndex,
            pageSize: pageSize,
            total: dataTotalPages * pageSize,
            showSizeChanger: true,
            pageSizeOptions: ["10", "20", "30"],
          }}
          columns={[
            ...taskTitle,
            {
              title: "Tuỳ chọn",
              key: "action",
              render: (_, record) => {
                const isManager = record.managerName;
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
                      <a
                        className="ant-dropdown-link"
                        onClick={(e) => e.preventDefault()}
                      >
                        <MoreOutlined className="menu-icon" />
                      </a>
                    </Dropdown>
                  );
                }else{
                  return(
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
                      <a
                        className="ant-dropdown-link"
                        onClick={(e) => e.preventDefault()}
                      >
                        <MoreOutlined className="menu-icon" />
                      </a>
                    </Dropdown>
                  )
                }
              },
            },
          ]}
          dataSource={task}
          onChange={onChange}
          rowSelection={{
            onSelect: (record) => {
              console.log({ record });
            },
          }}
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
      >
        <div className="subTask">
          {subTasks && subTasks.data ? (
            subTasks.data.map((subTaskItem) => (
              <div key={subTaskItem.employeeId}>
                {console.log(subTaskItem.employeeId)}
                <p>{subTaskItem.name}</p>
                <p>{subTaskItem.employeeName}</p>
                <p>{subTaskItem.description}</p>
                <Button onClick={() => openEditSubTaskModal(subTaskItem)}>
                  Sửa công việc con
                </Button>
                <Button
                  onClick={() => handleDeleteSubTask(subTaskItem.employeeId)}
                >
                  Xóa công việc con
                </Button>
              </div>
            ))
          ) : (
            <p>Chưa có công việc con</p>
          )}
        </div>
        {showUpdateForm && editingSubTask && (
          <Form
            layout="vertical"
            onFinish={handleUpdateSubTask}
            id="updateSubTask"
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
            <Form.Item>
              <Button type="primary" htmlType="submit" form="updateSubTask">
                Lưu thay đổi
              </Button>
            </Form.Item>
          </Form>
        )}
      </Modal>
    </div>
  );
};

export default List;
