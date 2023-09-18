import React from "react";
import ModalTask from "../ModalTask";
import { Input, Space } from "antd";

function List() {
  const { Search } = Input;
  const onSearch = (value, _e, info) => console.log(info?.source, value);
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
                width: 300,
              }}
            />
          </Space>
        </div>
      </div>

      <div>Danh sách</div>
    </div>
  );
}

export default List;
