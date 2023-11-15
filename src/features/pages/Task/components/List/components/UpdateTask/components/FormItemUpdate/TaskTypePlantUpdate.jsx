import { Form, Select } from 'antd'
import React from 'react'

function TaskTypePlantUpdate({dataTaskTypePlant, handleTaskTypeChange, editingTask}) {
  return (
    <Form.Item
          label="Loại công việc"
          name="taskTypeId"
          required
          rules={[
            {
              required: true,
              message: "Vui lòng chọn loại công việc",
            },
          ]}
          initialValue={editingTask ? editingTask.taskTypeId : 0}
        >
          <Select
            placeholder="Chọn loại công việc"
            options={dataTaskTypePlant?.map((item) => ({
              label: item.name,
              value: item.id,
            }))}
            onChange={handleTaskTypeChange}
          />
        </Form.Item>
  )
}

export default TaskTypePlantUpdate
