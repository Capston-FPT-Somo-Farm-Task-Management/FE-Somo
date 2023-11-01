import { Badge, Calendar, Modal, Table } from "antd";
import React, { useEffect, useState } from "react";
import { useMobileMediaQuery } from "common/hooks/responsive";
import { useDispatch, useSelector } from "react-redux";
import { getTaskForCalendar } from "features/slice/task/taskForCalendarSlice";
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
  const [tasksForDate, setTasksForDate] = useState({});


  const dispatch = useDispatch();

  const taskForCalendarData = useSelector((state) => state.taskForCalendar.data);
  const dataTask = taskForCalendarData.data
  console.log(taskForCalendarData);

  useEffect(() => {
    dispatch(getTaskForCalendar((authServices.getUserId())));
    dispatch(getMemberById(authServices.getUserId()));
  }, []);

  const getListData = (value) => {
    const dateString = value.format("YYYY-MM-DD");
    return tasksForDate[dateString] || [];
  };

  const handleDateClick = (value) => {
    const dateString = value.format("YYYY-MM-DD");
  
    dispatch(getTaskForCalendar({
      date: dateString,
      pageIndex: 1, // Trang đầu tiên
      pageSize: 3, // Giới hạn 3 công việc
      managerId: authServices.getUserId() // ID của người quản lý
    }))
      .unwrap()
      .then((data) => {
        const tasks = data.farmTasks.map((task) => {
          return {
            type: "success",
            name: task.name,
            id: task.id,
          };
        });
  
        setSelectedDateData(tasks);
        setModalVisible(true);
      })
      .catch((error) => {
        console.error("Error fetching tasks:", error);
      });
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
