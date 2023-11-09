import { Form, Select } from 'antd'
import React from 'react'

function FieldPlantUpdate({handleSelectFieldChange, fieldByZone, editingTask}) {
  return (
    <Form.Item
          label="Vườn"
          name="fieldId"
          required
          rules={[
            {
              required: true,
              message: "Vui lòng chọn vườn",
            },
          ]}
          initialValue={editingTask ? editingTask.fieldId : 0}
        >
          <Select
            onChange={handleSelectFieldChange}
            placeholder="Chọn vườn"
            options={
              fieldByZone && fieldByZone.data
                ? fieldByZone.data.map((item) => ({
                    label: item.nameCode,
                    value: item.id,
                  }))
                : null
            }
          />
        </Form.Item>
  )
}

export default FieldPlantUpdate