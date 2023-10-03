import React, { useEffect } from "react";
import ModalTask from "../ModalTask";
import { Input, Space } from "antd";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleCheck } from "@fortawesome/free-regular-svg-icons";
import { Link } from "react-router-dom";
import { Dropdown } from "antd";
import {
  MoreOutlined,
  EditOutlined,
  CheckCircleOutlined,
  DeleteOutlined,
} from "@ant-design/icons";
import axios from "axios";

const url = "https://somofarmtaskmanagement.azurewebsites.net/api/FarmTask";

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

  const fetchData = async () => {
    try {
      const resp = await axios(url);
      console.log(resp);
    } catch (error) {}
  };

  useEffect(() => {
    fetchData();
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

      <div className="to-do-list">
        <table className="table">
          <thead>
            <tr>
              <th className="task-color"></th>
              <th className="hidden-print"></th>
              <th className="show-print">Tên công việc</th>
              <th className="show-print">Hạn</th>
              <th className="show-print">Ưu tiên</th>
              <th className="show-print">Trạng thái</th>
              <th className="show-print">Giao cho</th>
              <th className="hidden-print"></th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td
                className="task-color"
                style={{ backgroundColor: "#7e57c2" }}
              ></td>
              <td className="task-complete-icon">
                <FontAwesomeIcon icon={faCircleCheck} />
              </td>
              <td className="main-col">
                <Link to="/task" className="task-title">
                  Cho heo tắm
                </Link>
                <div>
                  <div className="sub-text">Đây là mô tả</div>
                </div>
              </td>
              <td className="show-print">
                <div>16/10/2023 06:50</div>
              </td>
              <td className="show-print">
                <span className="priority">Cao</span>
              </td>
              <td className="show-print">Đang làm</td>
              <td className="show-print">Khanh Trinh</td>
              <td className="grid-actions">
                <Dropdown
                  menu={{
                    items,
                  }}
                  trigger={["click"]}
                >
                  <a onClick={(e) => e.preventDefault()}>
                    <Space>
                      <MoreOutlined />
                    </Space>
                  </a>
                </Dropdown>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default List;
