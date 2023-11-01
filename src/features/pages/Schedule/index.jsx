import { Badge, Calendar, Modal, Table } from "antd";
import React, { useEffect, useState } from "react";
import { useMobileMediaQuery } from "common/hooks/responsive";
import { useDispatch, useSelector } from "react-redux";
import { getTaskForCalendar } from "features/slice/task/taskSlice";
import { getMemberById } from "features/slice/user/memberSlice";
import { authServices } from "services/authServices";
import { WalletOutlined } from "@ant-design/icons";


const getMonthData = (value) => {
  if (value.month() === 8) {
    return 1394;
  }
};

function Schedule() {
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedDateData, setSelectedDateData] = useState(null);
  const [pageIndex, setPageIndex] = useState(3);
  const [status, setStatus] = useState(0);

  const dispatch = useDispatch();

  const taskForCalendarData = useSelector((state) => state.task.data);
  const dataTask = taskForCalendarData.data
  console.log(taskForCalendarData);

  useEffect(() => {
    dispatch(getTaskForCalendar((authServices.getUserId()), pageIndex, status));
    dispatch(getMemberById(authServices.getUserId()));
    console.log(authServices.getUserId());
  }, [pageIndex, status]);

  const getListData = (value) => {
    const dateString = value.format("YYYY-MM-DD");
    const tasksForDate = dataTask ? dataTask.filter(
      (task) => task.startDate <= dateString && task.endDate >= dateString
    ) : null;
  
    return tasksForDate ? tasksForDate.map((task) => {
      return {
        type: "success",
        name: task.name,
        id: task.id
      };
    }) : null;
  };

  const handleDateClick = (value) => {
    const listData = getListData(value);
    if (listData.length > 0) {
      setSelectedDateData(listData);
      console.log("listdata", listData);
      setModalVisible(true);
    }
  };

  const dateRender = (current) => {
    const listData = getListData(current);
    return (
      <div className="ant-picker-cellphone-inner">
        {listData.length > 0 && <Badge count={listData.length} />}
        {listData.length > 0 && <WalletOutlined style={{ fontSize: "16px", color: "#08c" }} />} 
      </div>
    );
  };

  const isMobile = useMobileMediaQuery();

  useEffect(() => {
    const handleResize = () => {
      if (isMobile) {
        document
          .querySelector(".ant-picker-calendar")
          .classList.add("small-calendar");
      } else {
        document
          .querySelector(".ant-picker-calendar")
          .classList.remove("small-calendar");
      }
    };

    window.addEventListener("resize", handleResize);
    handleResize();

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, [isMobile]);

  

  

  const monthCellRender = (value) => {
    const num = getMonthData(value);
    return num ? (
      <div className="notes-month">
        <section>{num}</section>
        <span>Backlog number</span>
      </div>
    ) : null;
  };
  const dateCellRender = (value) => {
    const listData = getListData(value);
    const tasksForDate = dataTask ? dataTask.filter(
      (task) => task.date === value.format("YYYY-MM-DD")
    ) :null;
  
    return (
      <ul className="events">
        {listData ? listData.map((item) => (
          <li key={item.id}>
            <Badge status={item.type} text={item.name} />
          </li>
        )) : null}
        {tasksForDate ? tasksForDate.map((task) => (
          <li key={task.id}>
            {task.name}
          </li>
        )) : null}
      </ul>
    );
  };
  const cellRender = (current, info) => {
    if (info.type === "date") return dateCellRender(current);
    if (info.type === "month") return monthCellRender(current);
    return info.originNode;
  };
  return (
    <div className="content">
      <h3>Lịch trình</h3>
      {isMobile ? (
        <Calendar cellRender={dateRender} onSelect={handleDateClick} />
      ) : (
        <Calendar cellRender={cellRender} onSelect={handleDateClick} />
      )}

      <Modal
        title="Chi tiết công việc trong ngày"
        visible={modalVisible}
        onCancel={() => setModalVisible(false)}
        footer={null}
      >
        {selectedDateData && (
          <div className="events">
            {selectedDateData? selectedDateData.map((item) => (
              <div key={item.id}>
              {console.log(item)}
                <Badge status={item.type} text={item.name} />
              </div>
            )) : null}
          </div>
        )}
      </Modal>
    </div>
  );
}

export default Schedule;
