import { Form, Input, Modal } from 'antd'

const FirstStepAddPlantType = ({ isModalOpenType, closeModalType }) => {
  const handleOk = () => {
    closeModalType()
  }
  const handleCancel = () => {
    closeModalType()
  }
  return (
    <>
      <Modal
        title="Tạo mới loại cây"
        open={isModalOpenType}
        onOk={handleOk}
        onCancel={handleCancel}
        okText="Hoàn thành"
        cancelText="Huỷ"
      >
        <Form layout="vertical">
          {/* Plant Type Name */}
          <Form.Item label="Tên loại cây trồng" name="name">
            <Input placeholder="Nhập tên loại" />
          </Form.Item>
        </Form>
      </Modal>
    </>
  )
}
export default FirstStepAddPlantType
