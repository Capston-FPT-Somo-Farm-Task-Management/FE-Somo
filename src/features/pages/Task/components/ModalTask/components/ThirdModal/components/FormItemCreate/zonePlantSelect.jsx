import { Form, Select } from 'antd'
import React from 'react'

function ZonePlantSelect({handleSelectZoneChange, zonePlant}) {
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
        >
          <Select
            onChange={handleSelectZoneChange}
            placeholder="Chọn vùng"
            options={
              zonePlant && zonePlant.data
                ? zonePlant.data.map((item) => ({
                    label: item.name,
                    value: item.id,
                  }))
                : null
            }
          />
        </Form.Item>
  )
}

export default ZonePlantSelect