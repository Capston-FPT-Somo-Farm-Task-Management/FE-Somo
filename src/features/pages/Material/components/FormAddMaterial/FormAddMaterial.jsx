import { Button, Form, Input, Modal } from 'antd'

const FormAddMaterial = ({ isModalOpen, closeModal, onFinishCreate }) => {
  const onFinish = (values) => {
    onFinishCreate(values)
    closeModal()
  }
  return (
    <>
      <Modal
        title="Tạo mới công cụ"
        open={isModalOpen}
        onCancel={closeModal}
        footer={[
          <Button form="createMaterial" type="dashed" htmlType="reset">
            Làm mới
          </Button>,
          <Button
            form="createMaterial"
            type="primary"
            danger
            onClick={closeModal}
          >
            Huỷ
          </Button>,
          <Button form="createMaterial" type="primary" htmlType="submit">
            Hoàn thành
          </Button>,
        ]}
      >
        <Form
          layout="vertical"
          className="first-step-area"
          id="createMaterial"
          onFinish={onFinish}
        >
          {/* Name */}
          <Form.Item
            label="Tên công cụ"
            rules={[
              {
                required: true,
                message: 'Vui lòng nhập tên công cụ',
              },
            ]}
            name="name"
          >
            <Input placeholder="Nhập tên công cụ" />
          </Form.Item>
        </Form>
      </Modal>
    </>
  )
}
export default FormAddMaterial
