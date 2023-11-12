import { Form, Select } from 'antd'
import React from 'react'

function AreaPlantSelect({handleSelectAreaChange, areaPlantByZone}) {
  return (
    <Form.Item
          label="Khu vực"
          required
          rules={[
            {
              required: true,
              message: "Vui lòng chọn khu vực",
            },
          ]}
          name="areaId"
        >
          <Select
            onChange={handleSelectAreaChange}
            placeholder="Chọn khu vực"
            options={
              areaPlantByZone && areaPlantByZone.data
                ? areaPlantByZone.data.map((item) => ({
                    label: item.name,
                    value: item.id,
                  }))
                : null
            }
          />
        </Form.Item>
  )
}

export default AreaPlantSelect