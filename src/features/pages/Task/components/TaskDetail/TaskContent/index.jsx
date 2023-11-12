import { Badge, Card, Collapse, Descriptions } from "antd";
import dayjs from "dayjs";
import React, { useState } from "react";
import {
  GrMap,
  GrProjects,
  GrObjectGroup,
  GrDocumentTime,
  GrAlarm,
  GrCycle,
  GrAnnounce,
  GrUserManager,
  GrUser,
  GrUserWorker,
  GrTools,
  GrHostMaintenance,
  GrSync
} from "react-icons/gr";
import { GiCow, GiFruitTree, GiRingingBell } from "react-icons/gi";

function TaskContent({ taskData }) {
  const [activePanels, setActivePanels] = useState(["0", "1"]);
  const { Panel } = Collapse;
  if (!taskData) {
    return null;
  }

  const formattedCreateDate = dayjs(taskData.createDate).format(
    "DD-MM-YYYY / HH:mm"
  );

  const formattedStartDate = dayjs(taskData.startDate).format(
    "DD-MM-YYYY / HH:mm"
  );
  const formattedEndDate = dayjs(taskData.endDate).format("DD-MM-YYYY / HH:mm");

  const formattedRepeatDate = taskData.dateRepeate.map((date) =>
    dayjs(date).format("DD-MM-YYYY")
  );

  const { externalId, fieldStatus, liveStockName, plantName } = taskData;

  return (
    <>
      {taskData && (
        <>
          <div className="task-detail-title">
            <h3>#{taskData.code}</h3>
            <h2 className="task-title-item">{taskData.name}</h2>
            <p className="task-title-item" style={{ color: "#f3722c " }}>
              {taskData.priority} - {taskData.status}
            </p>
          </div>
          <Collapse
            activeKey={activePanels}
            onChange={setActivePanels}
            className="task-detail-content"
          >
            <Panel header="Nơi thực hiện" key="0">
              <p>
                <GrMap />
                Khu vực: {taskData.areaName}
              </p>
              <p>
                <GrProjects /> Vùng: {taskData.zoneName}
              </p>
              {taskData.externalId && taskData.fieldStatus === "Thực vật" ? (
                <p>
                  <GrObjectGroup />
                  Vườn: {taskData.fieldName}
                </p>
              ) : taskData.fieldStatus === "Động vật" ? (
                <p>
                  <GrObjectGroup />
                  Chuồng: {taskData.fieldName}
                </p>
              ) : null}
            </Panel>
            <Panel header="Thời gian" key="1">
              <p>
                <GrDocumentTime />
                Ngày tạo: {formattedCreateDate}
              </p>
              <p>
                <GrAlarm />
                Ngày bắt đầu: {formattedStartDate}
              </p>
              <p>
                <GrAlarm />
                Ngày kết thúc: {formattedEndDate}
              </p>
              {taskData.dateRepeate && taskData.dateRepeate.length > 0 ? (
                <p>
                  <GrCycle />
                  Ngày lặp lại: {formattedRepeatDate.join(", ")}
                </p>
              ) : (
                <p>
                  <GrCycle />
                  Chưa có ngày lặp lại
                </p>
              )}
              <p>
                <GrAnnounce />
                Thời gian dự kiến phải bỏ ra: {
                  taskData.overallEffortHour
                } giờ {taskData.overallEfforMinutes} phút
              </p>
            </Panel>
            <Panel header="Đối tượng">
              {taskData.externalId && taskData.fieldStatus === "Thực vật" ? (
                <p>
                  <GiFruitTree />
                  Cây trồng: {taskData.plantName}
                </p>
              ) : taskData.fieldStatus === "Động vật" ? (
                <p>
                  <GiCow />
                  Con vật: {taskData.liveStockName}
                </p>
              ) : null}
              {taskData.externalId && taskData.fieldStatus === "Thực vật" ? (
                <p>
                  <GiFruitTree />
                  Mã cây trồng: {taskData.externalId}
                </p>
              ) : taskData.fieldStatus === "Động vật" ? (
                <p>
                  <GiCow />
                  Mã con vật: {taskData.externalId}
                </p>
              ) : null}
            </Panel>
            <Panel header="Phụ trách">
              <p>
                <GrUserManager />
                Người quản lý: {taskData.managerName}
              </p>
              <p>
                <GrUser />
                Người giám sát: {taskData.supervisorName}
              </p>
              <p>
                <GrUserWorker />
                Người thực hiện: {taskData.employeeName}
              </p>
            </Panel>
            <Panel header="Loại công việc">
              <p>
                <GrHostMaintenance />
                Loại công việc: {taskData.taskTypeName}
              </p>
              {taskData.materialName ? (
                <p>
                  <GrTools />
                  Dụng cụ: {taskData.materialName}
                </p>
              ) : (
                <p>
                  <GrTools />
                  Chưa có dụng cụ
                </p>
              )}
            </Panel>
            <Panel header="Thông báo công việc">
              {taskData.remind === 0 ? (
                <p>
                  <GiRingingBell />
                  Nhắc nhở trước khi bắt đầu: Không
                </p>
              ) : (
                <p>
                  <GiRingingBell />
                  Nhắc nhở trước khi bắt đầu: Có
                </p>
              )}
              {taskData.isRepeat === true ? (
                <p><GrSync/>Lặp lại: Có</p>
              ) : (
                <p><GrSync/>Lặp lại: Không</p>
              )}
              {taskData.dateRepeate && taskData.dateRepeate.length > 0 ? (
                <p>
                  <GrCycle />
                  Ngày lặp lại: {formattedRepeatDate.join(", ")}
                </p>
              ) : (
                <p>
                  <GrCycle />
                  Chưa có ngày lặp lại
                </p>
              )}
            </Panel>
          </Collapse>
        </>
      )}{" "}
    </>
  );
}

export default TaskContent;
