import React, { useEffect } from "react";
import ModalTask from "../ModalTask";
import { Input, Space, Table } from "antd";

import {
  EditOutlined,
  CheckCircleOutlined,
  DeleteOutlined,
} from "@ant-design/icons";
import { useSelector, useDispatch } from "react-redux";
import { getTasks } from "features/slice/task/taskSlice";
import { taskTitle, onChange } from "./listTaskData";

const items = [
  {
    icon: <EditOutlined />,
    label: <a href="https://www.antgroup.com">Sửa công việc</a>,
    key: "0",
  },
  {
    icon: <CheckCircleOutlined />,
    label: <a href="https://www.aliyun.com">Đánh dấu hoàn thành</a>,
    key: "1",
  },
  {
    icon: <DeleteOutlined />,
    label: <a href="https://www.aliyun.com">Xóa</a>,
    key: "2",
  },
];

function List() {
  const { Search } = Input;
  const onSearch = (value, _e, info) => console.log(info?.source, value);

  const task = useSelector((state) => state.task.data);
  const dataTask = task.data;
  console.log(dataTask);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getTasks());
  }, []);
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
        columns={taskTitle}
        dataSource={dataTask}
        onChange={onChange}
        rowSelection={{
          onSelect: (record) => {
            console.log({ record });
          },
        }}
      />
    </div>
  );
}

export default List;
