import { Form, Select } from 'antd'
import React from 'react'

function FieldPlantSelect({handleSelectFieldChange, fieldByZone}) {
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

export default FieldPlantSelect
