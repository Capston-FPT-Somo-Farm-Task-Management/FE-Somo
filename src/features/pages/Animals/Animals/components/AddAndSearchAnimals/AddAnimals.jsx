import React from 'react'
import { Form, Input, Select } from 'antd'
import { animalSex, animalStatus, animalType } from './AddAndSearchAnimalsData'

const AddAnimals = () => {
  return (
    <>
      <Form>
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
