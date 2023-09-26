import React from 'react'
import { Form, Input } from 'antd'

const { TextArea } = Input
const AddAnimalGroup = () => {
  return (
    <>
      <div>
        <div>
          <h1>Thêm chuồng</h1>
        </div>
      </div>
      <Form>
        {/* Animal Group Name */}
        <Form.Item label="Tên nhóm" name="animalGroupName">
          <Input />
        </Form.Item>

        {/* Description */}
        <Form.Item label="Mô tả" name="description">
          <TextArea rows={4} />
        </Form.Item>
      </Form>
    </>
  )
}
export default AddAnimalGroup
