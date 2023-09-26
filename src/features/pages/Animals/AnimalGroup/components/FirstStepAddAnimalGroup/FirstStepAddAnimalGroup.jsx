import { Form, Input, Select } from 'antd'
import {
  animalType,
  plantArea,
  plantField,
  plantZone,
} from '../AddAndSearchAnimalGroup/AddAnimalGroupData'

const FirstStepAddAnimalGroup = () => {
  const showDate = new Date()
  const displayCurrentDate =
    showDate.getDate() +
    '/' +
    (showDate.getMonth() + 1) +
    '/' +
    showDate.getFullYear()
  return (
    <>
      <Form layout="vertical" className="first-step-animal-group">
        <div className="form-left">
          {/* Animal Group Name */}
          <Form.Item label="Tên chuồng" name="animalGroupName">
            <Input placeholder="Nhập tên chuồng" />
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
      </Form>
    </>
  )
}
export default FirstStepAddAnimalGroup
