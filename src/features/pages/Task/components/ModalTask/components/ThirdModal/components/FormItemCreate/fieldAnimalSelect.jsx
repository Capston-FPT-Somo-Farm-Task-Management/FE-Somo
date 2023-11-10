import { Form, Select } from 'antd'
import React from 'react'

function FieldAnimalSelect({handleSelectFieldChange, fieldByZone}) {
  return (
    <Form.Item
          label="Chuồng"
          name="fieldId"
          required
          rules={[
            {
              required: true,
              message: "Vui lòng chọn chuồng",
            },
          ]}
        >
          <Select
            onChange={handleSelectFieldChange}
            placeholder="Chọn chuồng"
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

export default FieldAnimalSelect