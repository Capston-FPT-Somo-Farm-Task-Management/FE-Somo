import { Form, Input, Select } from 'antd'
import {
  plantArea,
  plantField,
  plantType,
  plantZone,
} from './AddPlantAndPlantTypeData'

const FirstStepAddPlant = () => {
  const showDate = new Date()
  const displayCurrentDate =
    showDate.getDate() +
    '/' +
    (showDate.getMonth() + 1) +
    '/' +
    showDate.getFullYear()

  return (
    <>
      <Form>
        {/* Plant  Name */}
        <Form.Item label="Tên cây trồng" name="name">
          <Input />
        </Form.Item>

        {/* Plant Type */}
        <Form.Item label="Loại cây">
          <Select placeholder="Chọn loại cây" options={plantType}></Select>
        </Form.Item>

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

        {/* Date Create */}
        <Form.Item label="Ngày tạo">
          <Input value={displayCurrentDate} />
        </Form.Item>

        {/* ID Plant */}
        <Form.Item label="ID">
          <Input placeholder="Nhập ID cây trồng" />
        </Form.Item>
      </Form>
    </>
  )
}
export default FirstStepAddPlant
