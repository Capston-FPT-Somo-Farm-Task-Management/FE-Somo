import { Card, Space } from "antd";
import dayjs from "dayjs";
import React, { useState } from "react";
import {
  GrDocumentTime,
} from "react-icons/gr";
import TaskDetailHabitant from "./components/taskDetailHabitant";
import TaskDetailOther from "./components/taskDetailOther";

function TaskContent({ taskData }) {
  if (!taskData) {
    return null;
  }

  console.log(taskData);

  const formattedCreateDate = dayjs(taskData.createDate).format(
    "DD-MM-YYYY - HH:mm"
  );

  const formattedStartDate = dayjs(taskData.startDate).format(
    "DD-MM-YYYY - HH:mm"
  );
  const formattedEndDate = dayjs(taskData.endDate).format("DD-MM-YYYY - HH:mm");
  const formattedUpdateDate = dayjs(taskData.updateDate).format(
    "DD-MM-YYYY - HH:mm"
  );

  const formattedRepeatDate = taskData.dateRepeate.map((date) =>
    dayjs(date).format("DD-MM-YYYY")
  );

  return (
    <>
      {taskData && (
        <div className="task-detail">
          <div
            className="task-detail-title-row"
          >
            <div className="task-detail-title">
              <Space>
                {taskData.priority === "Cao" ? (
                  <h1 style={{ color: "#f94144" }}>#{taskData.code}</h1>
                ) : taskData.priority === "Trung bình" ? (
                  <h1 style={{ color: "#e09f3e " }}>#{taskData.code}</h1>
                ) : taskData.priority === "Thấp" ? (
                  <h1 style={{ color: "#90be6d  " }}>#{taskData.code}</h1>
                ) : null}
                <h1 className="task-title-name"> - {taskData.name}</h1>
              </Space>
              <p>
                <GrDocumentTime />
                Ngày tạo: {formattedCreateDate}
              </p>
              {taskData.updateDate && taskData.updateDate.length > 0 ? (
                <span>
                  <GrDocumentTime />
                  Ngày cập nhật: {formattedUpdateDate}
                </span>
              ) : (
                <p>
                  <GrDocumentTime />
                  Ngày cập nhật: Chưa có
                </p>
              )}
            </div>
            <div className="task-title-priority-status">
              {taskData.priority === "Cao" ? (
                <p style={{ color: "#f94144" }}>
                  <span>Độ ưu tiên: </span> {taskData.priority}
                </p>
              ) : taskData.priority === "Trung bình" ? (
                <p style={{ color: "#e09f3e" }}>
                  <span>Độ ưu tiên: </span> {taskData.priority}
                </p>
              ) : taskData.priority === "Thấp" ? (
                <p style={{ color: "#90be6d" }}>
                  <span>Độ ưu tiên: </span> {taskData.priority}
                </p>
              ) : null}

              <p>
                <span>Trạng thái: </span> {taskData.status}
              </p>
            </div>
          </div>
          <div className="task-detail-content">
            {taskData.isPlant === null ? (
              <TaskDetailOther
                taskData={taskData}
                formattedStartDate={formattedStartDate}
                formattedEndDate={formattedEndDate}
                formattedRepeatDate={formattedRepeatDate}
              />
            ) : (
              <TaskDetailHabitant
                taskData={taskData}
                formattedStartDate={formattedStartDate}
                formattedEndDate={formattedEndDate}
                formattedRepeatDate={formattedRepeatDate}
              />
            )}
          </div>
        </div>
      )}{" "}
    </>
  );
}

export default TaskContent;
