import React, { useEffect, useState } from "react";
import { Input, Space, Table } from "antd";
import { useSelector, useDispatch } from "react-redux";
import { getTasks, deleteTask } from "features/slice/task/taskSlice";
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

  const handleDelete = (id) => {
    dispatch(deleteTask(id, { status: 4 })).then(() => {
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

  const loadData = () => {
    dispatch(getTasks())
  }

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
                <a onClick={() => handleDelete(record.id)}>Xoá</a>
                <a >Sửa</a>
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
              const isNameClicked = event.target.dataset.nameClicked === "true";

              if (isNameClicked) {
                openModal(record);
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
    </div>
  );
};

export default List;
