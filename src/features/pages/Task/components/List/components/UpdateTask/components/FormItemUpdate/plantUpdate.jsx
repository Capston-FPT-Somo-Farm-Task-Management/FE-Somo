import { Form, Select } from 'antd'
import React from 'react'

function PlantUpdate({dataPlant, editingTask}) {
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
          initialValue={
            editingTask
              ? {
                  label: editingTask.externalId,
                  value: editingTask.id,
                }
              : ""
          }
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

export default PlantUpdate