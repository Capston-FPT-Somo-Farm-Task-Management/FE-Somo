import { Form, Input } from 'antd'

const FirstStepAddPlantType = () => {
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
        {/* Plant Type Name */}
        <Form.Item label="Tên loại cây" name="name">
          <Input />
        </Form.Item>

        {/* Date Create */}
        <Form.Item label="Ngày tạo">
          <Input value={displayCurrentDate} />
        </Form.Item>

        {/* ID Plant Type */}
        <Form.Item label="ID">
          <Input placeholder="Nhập ID loại cây" />
        </Form.Item>
      </Form>
    </>
  )
}
export default FirstStepAddPlantType
