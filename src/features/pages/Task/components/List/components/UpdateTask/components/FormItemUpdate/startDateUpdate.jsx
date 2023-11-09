import { DatePicker, Form } from 'antd'
import dayjs from 'dayjs'
import React from 'react'

function StartDateUpdate({disabledDate, handleSelectStartDate, editingTask}) {
  return (
    <Form.Item
          label="Chọn thời gian bắt đầu"
          rules={[
            {
              required: true,
              message: "Vui lòng chọn thời gian bắt đầu",
            },
          ]}
          name="startDate"
          initialValue={editingTask ? dayjs(editingTask.startDate) : undefined}
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
  )
}

export default StartDateUpdate