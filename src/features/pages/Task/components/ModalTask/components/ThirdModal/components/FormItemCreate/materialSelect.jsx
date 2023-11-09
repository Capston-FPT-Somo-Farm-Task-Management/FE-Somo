import { Form, Select } from 'antd'
import React from 'react'

function MaterialSelect({materialsValue, handleMaterialChange, dataMaterial}) {
  return (
    <Form.Item label="Dụng cụ" name="materialIds">
          <Select
            placeholder="Chọn dụng cụ"
            mode="multiple"
            value={materialsValue}
            onChange={handleMaterialChange}
            options={dataMaterial?.map((item) => ({
              label: item.name,
              value: item.id,
            }))}
          />
        </Form.Item>
  )
}

export default MaterialSelect