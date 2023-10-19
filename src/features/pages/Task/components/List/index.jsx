import React, { useEffect, useState } from "react";
import { Input, Space, Table } from "antd";
import dayjs from "dayjs";
import { EditOutlined, CheckCircleOutlined, DeleteOutlined } from "@ant-design/icons";
import { useSelector, useDispatch } from "react-redux";
import { getTasks } from "features/slice/task/taskSlice";
import { taskTitle, onChange } from "./listTaskData"; // Đảm bảo bạn đã import TaskDetailModal
import TaskDetail from "../TaskDetail";
import ModalTask from "../ModalTask";

const List = () => {
  const { Search } = Input;
  const onSearch = (value, _e, info) => console.log(info?.source, value);

  const task = useSelector((state) => state.task.data);
  const dataTask = task.data;
  console.log(dataTask);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getTasks());
  }, []);

  const [selectedTask, setSelectedTask] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);

  const openModal = (task) => {
    setSelectedTask(task);
    setModalVisible(true);
  };

  const closeModal = () => {
    setSelectedTask(null);
    setModalVisible(false);
  };

  return (
    <div className="list">
      <div className="list-header">
        <ModalTask />
        <div>
          <Space direction="vertical">
            <Search
              placeholder="Tìm kiếm"
              allowClear
              onSearch={onSearch}
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
        columns={[
          ...taskTitle,
          {
            title: "Tuỳ chọn",
            key: "action",
            render: (_, record) => (
              <Space size="small">
                <a onClick={() => console.log("Xoá", record)}>Xoá</a>
                <a onClick={() => console.log("Sửa", record)}>Sửa</a>
              </Space>
            ),
          },
        ]}
        dataSource={dataTask}
        onChange={onChange}
        rowSelection={{
          onSelect: (record) => {
            console.log({ record });
          },
        }}
        onRow={(record, rowIndex) => {
          return {
            onClick: (event) => {
              openModal(record);
            },
          };
        }}
      />
      <TaskDetail visible={modalVisible} onCancel={closeModal} taskData={selectedTask}  />
    </div>
  );
};

export default List;
