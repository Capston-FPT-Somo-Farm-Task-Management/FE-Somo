import { Form, Select } from 'antd'
import React from 'react'

function RepeatSelect({repeatValue, handleSelectRepeat}) {
  return (
    <Form.Item label="Lặp lại" name="isRepeat">
          <Select
            value={repeatValue}
            onChange={handleSelectRepeat}
            placeholder="Không"
          >
            <Select.Option value="Không">Không</Select.Option>
            <Select.Option value="Có">Có</Select.Option>
          </Select>
        </Form.Item>
  )
}

export default RepeatSelect