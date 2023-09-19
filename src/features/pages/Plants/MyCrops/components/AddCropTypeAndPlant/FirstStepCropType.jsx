import { Form, Input, Select } from 'antd'
import { cropType } from './AddCropTypeAndPlantData'

const FirstStepCropType = () => {
  return (
    <>
      <Form>
        {/* Crop Type Name */}
        <Form.Item label="Tên cây trồng" name="name">
          <Input />
        </Form.Item>
        {/* Crop Type */}
        <Form.Item label="Loại cây">
          <Select placeholder="Chọn loại cây" options={cropType}></Select>
        </Form.Item>

        {/* Crop Strain */}
        <Form.Item label="Giống" name="name">
          <Input placeholder="Nam Mỹ" />
        </Form.Item>
      </Form>
    </>
  )
}
export default FirstStepCropType
