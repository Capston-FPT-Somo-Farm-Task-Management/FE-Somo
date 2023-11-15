import { Form, Select } from 'antd'
import React from 'react'

function SupervisorUpdate({supervisor, editingTask}) {
  return (
    <Form.Item
          label="Người giám sát"
          name="suppervisorId"
          required
          rules={[
            {
              required: true,
              message: "Vui lòng chọn người giám sát",
            },
          ]}
          initialValue={editingTask ? editingTask.suppervisorId : ""}
        >
          <Select
            placeholder="Chọn người giám sát"
            options={
              supervisor && supervisor.data
                ? supervisor.data.map((item) => ({
                    label: item.name,
                    value: item.id,
                  }))
                : null
            }
          />
        </Form.Item>
  )
}

export default SupervisorUpdate
