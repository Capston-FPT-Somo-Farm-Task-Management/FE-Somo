import { Form, Select } from 'antd'
import React from 'react'

function AreaLivestockSelect({handleSelectAreaChange, areaLivestockByZone}) {
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
              areaLivestockByZone && areaLivestockByZone.data
                ? areaLivestockByZone.data.map((item) => ({
                    label: item.name,
                    value: item.id,
                  }))
                : null
            }
          />
        </Form.Item>
  )
}

export default AreaLivestockSelect