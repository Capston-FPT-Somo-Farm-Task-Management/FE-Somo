import { Form, Select } from 'antd'
import React from 'react'

function AnimalUpdate({dataAnimal, editingTask}) {
  
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
          initialValue={editingTask ? editingTask.externalId : 0}
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

export default AnimalUpdate