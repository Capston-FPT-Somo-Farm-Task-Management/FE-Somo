import { DatePicker, Form } from 'antd'
import dayjs from 'dayjs'
import React from 'react'

function EndDateUpdate({disabledDate, handleSelectEndDate, startDate, editingTask}) {
  return (
    <Form.Item
          label="Chọn thời gian kết thúc"
          rules={[
            {
              required: true,
              message: "Vui lòng chọn khoảng thời gian kết thúc",
            },
          ]}
          name="endDate"
          initialValue={editingTask ? dayjs(editingTask.endDate) : undefined}
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
            disabled={!startDate}
          />
        </Form.Item>
  )
}

export default EndDateUpdate