import React, { useEffect, useState } from "react";
import { Button, Form, Input, Modal, Select, Space, Table } from "antd";
import { useSelector, useDispatch } from "react-redux";
import { getTasks, deleteTask } from "features/slice/task/taskSlice";
import { getEmployeeByTask } from "features/slice/employee/employeeByTask";
import {
  getSubTasksByTaskId,
  createSubTask,
} from "features/slice/subTask/subTaskSlice";
import { taskTitle, onChange } from "./listTaskData";
import { getEvidenceByTaskId } from "features/slice/task/taskEvidenceSlice";
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

const List = () => {
  const [subTasks, setSubTasks] = useState([]);
  const [subTaskModalVisible, setSubTaskModalVisible] = useState(false);
  const [addSubtaskVisible, setAddSubtaskVisible] = useState(false);
  // const [employeesValue, setEmployeesValue] = useState(0);
  const [description, setDescription] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [pageIndex, setPageIndex] = useState(5);
  const [pageSize, setPageSize] = useState(10);
  const [totalPages, setTotalPages] = useState(1);
  const [currentTaskId, setCurrentTaskId] = useState(0);
  const [availableEmployees, setAvailableEmployees] = useState([]);

  const { Search } = Input;
  const onSearch = (e) => {
    const value = e.target.value;
    setSearchTerm(value);
  };

  const task = useSelector((state) => state.task.data);
  const dataTask = task.data;
  const filteredData =
    dataTask &&
    dataTask.filter((task) =>
      task.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
  const subTask = useSelector((state) => state.subTask.data);

  // console.log(dataSubTask);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getTasks({ pageIndex, pageSize })).then((data) => {
      setTotalPages(Math.ceil(data.total / pageSize));
    });
    
  }, [pageIndex, pageSize ]);

  useEffect(() => {
    dispatch(getEmployeeByTask(currentTaskId)).then((data) => {
      setAvailableEmployees(data.payload); 
      console.log(data.payload);
    });
  },[currentTaskId])

  const onChange = (pagination) => {
    setPageIndex(pagination.current);
    setPageSize(pagination.pageSize);
  };

  const handleMenuClick = (e, record) => {
    if (e.key === "edit") {
      // Xử lý khi người dùng chọn "Sửa"
      console.log("Edit", record);
    } else if (e.key === "delete") {
      // Xử lý khi người dùng chọn "Xóa"
      handleDelete(record.id);
    }
  };

  const handleDelete = (id) => {
    dispatch(deleteTask(id)).then(() => {
      loadData();
    });
  };

  const [selectedTask, setSelectedTask] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);

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
  };
  const openSubtaskModal = (record) => {
    setCurrentTaskId(record.id);
    setSubTaskModalVisible(true);
    dispatch(getSubTasksByTaskId(record.id)).then((data) => {
      setSubTasks(data.payload);
    });
  };

  const closeAddSubtaskModal = () => {
    setAddSubtaskVisible(false);
  };

  const loadData = () => {
    dispatch(getTasks());
  };

  const onFinish = (values) => {
    const finalValues = {
      ...values,
      taskId: currentTaskId,
    };
    console.log(finalValues);
    dispatch(createSubTask(finalValues));
    loadData();
    closeModal();
    closeAddSubtaskModal();
  };

  return (
    <div className="list">
      <div className="list-header">
        <ModalTask />
        <div>
          <Space direction="vertical">
            <Search
              placeholder="Tìm kiếm theo tên"
              allowClear
              onChange={onSearch}
              style={{
                marginLeft: "15px",
                width: 500,
              }}
            />
          </Space>
        </div>
      </div>
      <Table
        rowKey="id"
        pagination={{
          current: pageIndex,
          pageSize: pageSize,
          total: task.total,
          showSizeChanger: true,
          pageSizeOptions: ["10", "20", "30"], // Có thể tùy chỉnh số lượng item mỗi trang ở đây
        }}
        columns={[
          ...taskTitle,
          {
            title: "Tuỳ chọn",
            key: "action",
            render: (_, record) => (
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
            ),
          },
        ]}
        dataSource={filteredData}
        onChange={onChange}
        rowSelection={{
          onSelect: (record) => {
            console.log({ record });
          },
        }}
        onRow={(record, rowIndex) => {
          return {
            onClick: async (event) => {
              const isNameClicked = event.target.dataset.nameClicked === "true";

              if (isNameClicked) {
                openModal(record);
                await dispatch(getEvidenceByTaskId(record.id));
              }
            },
          };
        }}
      />
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
        <Form layout="vertical" id="createSubTask" onFinish={onFinish}>
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
              options={availableEmployees.data?.map((item) => ({
                label: item.name,
                value: item.id,
              }))}
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
          {subTask ? (
            subTask.data?.map((subTask) => (
              <div key={subTask.taskId}>
                <p>{subTask.name}</p>
                <p>{subTask.employeeName}</p>
                <p>{subTask.description}</p>
              </div>
            ))
          ) : (
            <p>Chưa có công việc con</p>
          )}
        </div>
      </Modal>
    </div>
  );
};

export default List;
