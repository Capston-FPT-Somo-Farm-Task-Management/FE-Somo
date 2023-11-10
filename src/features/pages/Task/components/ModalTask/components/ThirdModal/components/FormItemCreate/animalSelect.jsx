import { Form, Select } from 'antd'
import React from 'react'

function AnimalSelect({dataAnimal}) {
  return (
    <Form.Item
          label="Mã vật nuôi"
          name="liveStockId"
          required
          rules={[
            {
              required: true,
              message: "Vui lòng chọn mã vật nuôi",
            },
          ]}
        >
          <Select
            placeholder="Chọn mã vật nuôi"
            options={dataAnimal?.map((item) => ({
              label: item.externalId,
              value: item.id,
            }))}
          />
        </Form.Item>
  )
}

export default AnimalSelect