import { Form, Select } from 'antd'
import React from 'react'

function ZoneAnimalUpdate({handleSelectZoneChange, zoneAnimal, editingTask}) {
  return (
    <Form.Item
          label="Vùng"
          required
          rules={[
            {
              required: true,
              message: "Vui lòng chọn vùng",
            },
          ]}
          name="zoneId"
          initialValue={
            editingTask
              ? {
                  label: editingTask.zoneName,
                  value: editingTask.zoneId,
                }
              : ""
          }
        >
          <Select
            onChange={handleSelectZoneChange}
            placeholder="Chọn vùng"
            options={
              zoneAnimal && zoneAnimal.data
                ? zoneAnimal.data.map((item) => ({
                    label: item.name,
                    value: item.id,
                  }))
                : null
            }
          />
        </Form.Item>
  )
}

export default ZoneAnimalUpdate