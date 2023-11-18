import { Badge } from "antd";
import dayjs from "dayjs";

export const taskTitle = [
  {
    title: <p>Mã công việc</p>,
    dataIndex: "code",
    key: "code",
    render: (code, record) => (
      <h4 className="task-name" data-name-clicked="true">
        <div>
          {record && record.isHaveEvidence ? (
            <Badge.Ribbon
              color="#8EAD48"
              style={{ top: -20, right: "64%" }}
              text={<p style={{ fontSize: "10px" }}>Có báo cáo</p>}
            />
          ) : null}
          <h4>#{code}</h4>
        </div>
      </h4>
    ),
  },
  {
    title: <p>Tên công việc</p>,
    dataIndex: "name",
    key: "name",
    render: (text) => (
      <h4 className="task-name" data-name-clicked="true">
        {text}
      </h4>
    ),
  },
  {
    title: <p>Ngày bắt đầu</p>,
    dataIndex: "startDate",
    key: "startDate",
    render: (date) => { return date ? dayjs(date).format("DD/MM/YYYY HH:mm") : "Chưa có"},
  },
  {
    title: <p>Ngày kết thúc</p>,
    dataIndex: "endDate",
    key: "endDate",
    render: (date) => { return date ? dayjs(date).format("DD/MM/YYYY HH:mm") : "Chưa có"},
  },
  {
    title: <p>Ưu tiên</p>,
    dataIndex: "priority",
    key: "priority",
    render: (text) => {
      let color = "";
      switch (text) {
        case "Cao":
          color = "#f94144";
          break;
        case "Trung bình":
          color = "#e09f3e";
          break;
        case "Thấp":
          color = "#90be6d";
          break;
        default:
          color = "";
      }
      return <span style={{ color }}>{text}</span>;
    },
  },
  {
    title: <p>Người giám sát</p>,
    dataIndex: "supervisorName",
    key: "supervisorName",
    render: (text) => {return text ? text : "Chưa có"}
  },
  {
    title: <p>Được tạo bởi</p>,
    dataIndex: "managerName",
    key: "managerName",
    render: (text) => <span>{text ? <p>Tôi</p> : <p>Người giám sát</p>}</span>,
  },
];

export const onChange = (sorter) => {
  console.log("params", sorter);
};
