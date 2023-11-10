import { DatePicker, Form, Space } from "antd";
import dayjs from "dayjs";
import React from "react";

function DateUpdate({
  editingTask,
  disabledDate,
  handleSelectStartDate,
  handleSelectEndDate,
  startDate,
}) {
  return (
    <Space wrap>
      <Form.Item
        label="Chọn thời gian bắt đầu"
        rules={[
          {
            required: true,
            message: "Vui lòng chọn mgày bắt đầu",
          },
        ]}
        name="startDate"
        initialValue={editingTask ? dayjs(editingTask.startDate) : null}
      >
        <DatePicker
          placeholder="Chọn thời gian bắt đầu"
          format="HH:mm DD-MM-YYYY"
          disabledDate={disabledDate}
          showTime={{
            defaultValue: dayjs("00:00", "HH:mm"),
            format: "HH:mm",
          }}
          showSecond="false"
          onChange={handleSelectStartDate}
        />
      </Form.Item>
      <Form.Item
        label="Chọn thời gian kết thúc"
        rules={[
          {
            required: true,
            message: "Vui lòng chọn ngày kết thúc",
          },
        ]}
        name="endDate"
        initialValue={editingTask ? dayjs(editingTask.endDate) : null}
      >
        <DatePicker
          placeholder="Chọn thời gian kết thúc"
          format="HH:mm DD-MM-YYYY"
          disabledDate={disabledDate}
          showTime={{
            defaultValue: dayjs("00:00", "HH:mm"),
            format: "HH:mm",
          }}
          showSecond="false"
          onChange={handleSelectEndDate}
        />
      </Form.Item>
    </Space>
  );
}

export default DateUpdate;
