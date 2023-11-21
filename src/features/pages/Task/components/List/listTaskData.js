import { Avatar, Badge, Tooltip } from "antd";
import dayjs from "dayjs";

export const taskTitle = [
  {
    title: <p>Mã công việc</p>,
    dataIndex: "code",
    key: "code",
    render: (code, record) => (
      <p data-name-clicked="true">
        <div>
          {record && record.isHaveEvidence ? (
            <Badge.Ribbon
              color="#8EAD48"
              style={{ top: -20, right: "64%" }}
              text={<p style={{ fontSize: "10px" }}>Có báo cáo</p>}
            />
          ) : null}
          <Tooltip placement="bottomLeft" title={code}>
            <p>#{code.slice(0, 8) + (code.length > 8 ? "..." : "")}</p>
          </Tooltip>
        </div>
      </p>
    ),
  },
  {
    title: <p>Tên công việc</p>,
    dataIndex: "name",
    key: "name",
    render: (text) => (
      <Tooltip placement="bottomLeft" title="Xem chi tiết">
        <h4 className="task-name" data-name-clicked="true">
          {text.slice(0, 15) + (text.length > 15 ? "..." : "")}
        </h4>
      </Tooltip>
    ),
  },
  {
    title: <p>Ngày bắt đầu</p>,
    dataIndex: "startDate",
    key: "startDate",
    render: (date) => {
      return date ? dayjs(date).format("DD/MM/YYYY HH:mm") : "Chưa có";
    },
  },
  {
    title: <p>Ngày kết thúc</p>,
    dataIndex: "endDate",
    key: "endDate",
    render: (date) => {
      return date ? dayjs(date).format("DD/MM/YYYY HH:mm") : "Chưa có";
    },
  },
  {
    title: <p>Ưu tiên</p>,
    dataIndex: "priority",
    key: "priority",
    render: (text) => {
      let colorCircle = "";
      switch (text) {
        case "Cao":
          colorCircle = "#f94144";
          break;
        case "Trung bình":
          colorCircle = "#e09f3e";
          break;
        case "Thấp":
          colorCircle = "#90be6d";
          break;
        default:
          colorCircle = "";
      }
      return (
        <span
          style={{
            width: "75%",
            color: "black",
            border: "1px solid #f5f5f5",
            display: "flex",
            alignItems: "center",
            justifyContent: "flex-start",
            padding: "5px 0px",
            borderRadius: "8px",
            boxShadow: "1px 1px #f5f5f5"
          }}
        >
          <div
            style={{
              display: "inline-block",
              width: "16px",
              height: "16px",
              borderRadius: "50%",
              backgroundColor: colorCircle,
              marginLeft: "5px",
              marginRight: "10px",
            }}
          ></div>
          {text}
        </span>
      );
    },
  },
  {
    title: <p>Người giám sát</p>,
    dataIndex: "supervisorName",
    key: "supervisorName",
    render: (data) => {
      return data ? (
        <Tooltip placement="bottom" title={data}>
          <span
            style={{
              width: "70%",
              border: "1px solid #f5f5f5",
              display: "flex",
              alignItems: "center",
              justifyContent: "flex-start",
              padding: "5px 0px",
              borderRadius: "8px",
              boxShadow: "1px 1px #f5f5f5"
            }}
          >
            <Avatar
              src={data.avatarSupervisor}
              style={{
                width: "16px",
                height: "16px",
                marginLeft: "5px",
                marginRight: "10px",
              }}
            />
            {data.slice(0, 10) + (data.length > 10 ? "..." : "")}
          </span>
        </Tooltip>
      ) : (
        "Chưa có"
      );
    },
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
