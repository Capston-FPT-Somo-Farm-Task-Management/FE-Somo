import { Form, Select } from 'antd'
import React from 'react'

function TaskTypeActiveSelect({taskTypeActive, handleTaskTypeChange, isDraft}) {
  return (
    <Form.Item
          label="Loại công việc"
          name="taskTypeId"
          required
          rules={[
            {
              required: !isDraft,
              message: "Vui lòng chọn loại công việc",
            },
          ]}
        >
          <Select
            placeholder="Chọn loại công việc"
            options={
              taskTypeActive && taskTypeActive.data
                ? taskTypeActive.data.map((item) => ({
                    label: item.name,
                    value: item.id,
                  }))
                : null
            }
            onChange={handleTaskTypeChange}
          />
        </Form.Item>
  )
}

export default TaskTypeActiveSelect