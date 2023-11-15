import { Form, Select } from 'antd'
import React from 'react'

function PlantSelect({dataPlant}) {
  return (
    <Form.Item
          label="Mã cây trồng"
          name="plantId"
          required
          rules={[
            {
              required: true,
              message: "Vui lòng nhập mã cây trồng",
            },
          ]}
        >
          <Select
            placeholder="Chọn mã cây trồng"
            options={dataPlant?.map((item) => ({
              label: item.externalId,
              value: item.id,
            }))}
          />
        </Form.Item>
  )
}

export default PlantSelect
