import React from 'react'
import { Form, Input, Select } from 'antd'
import {
  animalSex,
  animalStatus,
  animalType,
  plantArea,
  plantField,
  plantZone,
} from '../AddAndSearchAnimals/AddAnimalData'

const FirstStepAddAnimal = () => {
  const showDate = new Date()
  const displayCurrentDate =
    showDate.getDate() +
    '/' +
    (showDate.getMonth() + 1) +
    '/' +
    showDate.getFullYear()
  return (
    <>
      <Form layout="vertical" className="first-step-animal">
        <div className="form-left">
          {/* Animal Id */}
          <Form.Item label="ID" name="Id">
            <Input placeholder="Nhập ID vật nuôi" />
          </Form.Item>

          {/* Animal Name */}
          <Form.Item label="Tên" name="name">
            <Input placeholder="Nhập tên vật nuôi" />
          </Form.Item>

          {/* Animal Type */}
          <Form.Item label="Loại vật nuôi">
            <Select
              placeholder="Chọn loại vật nuôi"
              options={animalType}
            ></Select>
          </Form.Item>

          {/* Animal Quantity */}
          <Form.Item label="Số lượng" name="quantity">
            <Input
              defaultValue={1}
              placeholder="Nhập số lượng (số)"
              type="number"
              min={1}
            />
          </Form.Item>
        </div>

        <div className="form-right">
          {/* Area */}
          <Form.Item label="Khu vực">
            <Select placeholder="Chọn khu vực" options={plantArea}></Select>
          </Form.Item>

          {/* Zone */}
          <Form.Item label="Vùng">
            <Select placeholder="Chọn vùng" options={plantZone}></Select>
          </Form.Item>

          {/* Field */}
          <Form.Item label="Khu đất">
            <Select placeholder="Chọn khu đất" options={plantField}></Select>
          </Form.Item>

          <Form.Item label="Ngày tạo">
            <Input value={displayCurrentDate} />
          </Form.Item>
        </div>
        {/* Animal Sex */}
        {/* <Form.Item label="Giới tính">
          <Select options={animalSex}></Select>
        </Form.Item> */}

        {/* Animal Status */}
        {/* <Form.Item label="Trạng thái">
          <Select options={animalStatus}></Select>
        </Form.Item> */}
      </Form>
    </>
  )
}
export default FirstStepAddAnimal
