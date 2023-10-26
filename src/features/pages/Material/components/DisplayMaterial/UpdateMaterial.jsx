import { Button, Form, Input, InputNumber, Modal } from 'antd'

const UpdateMaterial = ({
  isModalOpen,
  closeModal,
  selectedData,
  onFinishUpdate,
}) => {
  const onFinish = (values) => {
    const finalValues = {
      id: selectedData.id,
      ...values,
    }
    onFinishUpdate(finalValues)
    closeModal()
  }

  return (
    <>
      <Modal
        title="Cập nhật công cụ"
        open={isModalOpen}
        closeIcon
        onCancel={closeModal}
        footer={[
          <Button
            form="updateMaterial"
            type="primary"
            htmlType="reset"
            danger
            onClick={closeModal}
          >
            Huỷ
          </Button>,
          <Button form="updateMaterial" type="primary" htmlType="submit">
            Cập nhật
          </Button>,
        ]}
      >
        <Form
          layout="vertical"
          className="first-step-area"
          id="updateMaterial"
          onFinish={onFinish}
        >
          {/* Area Name */}
          <Form.Item
            label="Tên công cụ"
            rules={[
              {
                required: true,
                message: 'Vui lòng nhập tên công cụ',
              },
            ]}
            name="name"
            initialValue={selectedData ? selectedData.name : ''}
          >
            <Input placeholder="Nhập tên công cụ" />
          </Form.Item>
        </Form>
      </Modal>
    </>
  )
}
export default UpdateMaterial
