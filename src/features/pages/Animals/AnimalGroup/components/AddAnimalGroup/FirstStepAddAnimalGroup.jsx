import { Form, Input } from 'antd'

const { TextArea } = Input
const FirstStepAddAnimalGroup = () => {
  return (
    <>
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
export default FirstStepAddAnimalGroup
