import { Form, Select } from 'antd'
import React from 'react'

function AreaByFarmSelect({handleSelectAreaChange, areaByFarm}) {
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
          name="areaName"
        >
          <Select
            onChange={handleSelectAreaChange}
            placeholder="Chọn khu vực"
            options={
              areaByFarm && areaByFarm.data
                ? areaByFarm.data.map((item) => ({
                    label: item.name,
                    value: item.id,
                  }))
                : null
            }
          />
        </Form.Item>
  )
}

export default AreaByFarmSelect