import { Card, Space } from "antd";
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
  GrSync,
} from "react-icons/gr";
import { GiCow, GiFruitTree, GiRingingBell } from "react-icons/gi";

function TaskContent({ taskData }) {
  if (!taskData) {
    return null;
  }

  console.log(taskData);

  const formattedCreateDate = dayjs(taskData.createDate).format(
    "DD-MM-YYYY / HH:mm"
  );

  const formattedStartDate = dayjs(taskData.startDate).format(
    "DD-MM-YYYY / HH:mm"
  );
  const formattedEndDate = dayjs(taskData.endDate).format("DD-MM-YYYY / HH:mm");
  const formattedUpdateDate = dayjs(taskData.updateDate).format(
    "DD-MM-YYYY / HH:mm"
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
            style={{
              display: "flex",
              justifyContent: "space-between",
              padding: "0px 20px",
              borderBotton: "1px solid black",
            }}
          >
            <div className="task-detail-title">
              <Space>
                <h2>#{taskData.code}</h2>
                <h2 className="task-title-name"> - {taskData.name}</h2>
              </Space>
              <p>
                <GrDocumentTime />
                Ngày tạo: {formattedCreateDate}
              </p>
              {taskData.updateDate && taskData.updateDate.length > 0 ? (
                <p>
                  <GrDocumentTime />
                  Ngày cập nhật: {formattedUpdateDate}
                </p>
              ) : (
                <p>
                  <GrDocumentTime />
                  Ngày cập nhật: Chưa có
                </p>
              )}
            </div>
            <div>
              <p className="task-title-priority">
                Độ ưu tiên {taskData.priority} - Trạng thái {taskData.status}
              </p>
            </div>
          </div>
          <div className="task-detail-content">
            {taskData.addressDetail ? (
              <Card title="Nơi thực hiện" bordered={false}>
                <p>
                  <GrMap />
                  Địa điểm cụ thể: {taskData.addressDetail}
                </p>
              </Card>
            ) : (
              <>
                <div className="work-location">
                  <h2>Nơi thực hiện</h2>
                  <div style={{width: "100%", display: "flex", justifyContent: "flex-start"}}>
                    <p>
                      <GrMap />
                      Khu vực: {taskData.areaName}
                    </p>
                    <p>
                      <GrProjects /> Vùng: {taskData.zoneName}
                    </p>
                    {taskData.externalId &&
                    taskData.fieldStatus === "Thực vật" ? (
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
                  </div>
                </div>
                <>
                  <h2>Thời gian</h2>
                  <div className="work-time">
                    <p>
                      <GrAlarm />
                      Ngày bắt đầu: {formattedStartDate}
                    </p>
                    <p>
                      <GrAlarm />
                      Ngày kết thúc: {formattedEndDate}
                    </p>
                    <p>
                      <GrAnnounce />
                      Thời gian dự kiến phải bỏ ra: {
                        taskData.overallEffortHour
                      }{" "}
                      giờ {taskData.overallEfforMinutes} phút
                    </p>
                  </div>
                </>
                <>
                  <h2>Phụ trách</h2>
                  <div className="work-user">
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
                  </div>
                </>
                <>
                  <h2>Loại công việc</h2>
                  <div className="work-taskType">
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
                  </div>
                </>
                <>
                  <h2>Đối tượng</h2>
                  <div className="work-habitant">
                    {taskData.addressDetail ? (
                      <p>Không có đối tượng nào được chọn</p>
                    ) : (
                      <>
                        {taskData.externalId &&
                        taskData.fieldStatus === "Thực vật" ? (
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
                        {taskData.externalId &&
                        taskData.fieldStatus === "Thực vật" ? (
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
                      </>
                    )}
                  </div>
                </>
                <>
                  <h2>Thông báo công việc</h2>
                  <div className="work-notification">
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
                      <p>
                        <GrSync />
                        Lặp lại: Có
                      </p>
                    ) : (
                      <p>
                        <GrSync />
                        Lặp lại: Không
                      </p>
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
                  </div>
                </>
                {/* <Card title="Nơi thực hiện" bordered={false}>
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
              </Card> */}
              </>
            )}

            {/* <Card title="Thời gian" bordered={false}>
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
              {taskData.updateDate && taskData.updateDate.length > 0 ? (
                <p>
                  <GrDocumentTime />
                  Ngày cập nhật: {formattedUpdateDate}
                </p>
              ) : (
                <p>
                  <GrDocumentTime />
                  Ngày cập nhật: Chưa có
                </p>
              )}
              <p>
                <GrAnnounce />
                Thời gian dự kiến phải bỏ ra: {
                  taskData.overallEffortHour
                } giờ {taskData.overallEfforMinutes} phút
              </p>
            </Card>

            <Card title="Phụ trách" bordered={false}>
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
            </Card>
            <Card title="Loại công việc" bordered={false}>
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
            </Card>
            {taskData.addressDetail ? (
              <Card title="Đối tượng" bordered={false}>
                <p>Không có đối tượng nào được chọn</p>
              </Card>
            ) : (
              <Card title="Đối tượng" bordered={false}>
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
              </Card>
            )}

            <Card title="Thông báo công việc" bordered={false}>
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
                <p>
                  <GrSync />
                  Lặp lại: Có
                </p>
              ) : (
                <p>
                  <GrSync />
                  Lặp lại: Không
                </p>
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
            </Card> */}
          </div>
        </div>
      )}{" "}
    </>
  );
}

export default TaskContent;
