import React from 'react'
import { Form, Input, Select } from 'antd'
import { animalType, animalSex, animalStatus } from './AddAnimalsData'

const AddAnimals = () => {
  return (
    <>
      <div className="">
        <div>
          <h1>Tạo mới</h1>
        </div>
      </div>
      <Form>
        <div>
          <h1>Thông tin</h1>
        </div>

        {/* Animal Name */}
        <Form.Item label="Tên" name="name">
          <Input placeholder="Nhập tên động vật" />
        </Form.Item>

        {/* Animal Type */}
        <Form.Item label="Loại động vật">
          <Select
            placeholder="Chọn loại động vật"
            options={animalType}
          ></Select>
        </Form.Item>

        {/* Animal Breed */}
        <Form.Item label="Giống" name="name">
          <Input placeholder="Mỹ" />
        </Form.Item>

        {/* Animal Sex */}
        <Form.Item label="Giới tính">
          <Select options={animalSex}></Select>
        </Form.Item>

        {/* Animal Status */}
        <Form.Item label="Trạng thái">
          <Select options={animalStatus}></Select>
        </Form.Item>
      </Form>
    </>
  )
}
export default AddAnimals
