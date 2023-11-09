import { Form, Select } from 'antd'
import React from 'react'

function AreaUpdate({handleSelectAreaChange, area, editingTask}) {
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
          initialValue={editingTask ? editingTask.areaId : ""}
        >
          <Select
            onChange={handleSelectAreaChange}
            placeholder="Chọn khu vực"
            options={
              area && area.data
                ? area.data.map((item) => ({
                    label: item.name,
                    value: item.id,
                  }))
                : null
            }
          />
        </Form.Item>
  )
}

export default AreaUpdate