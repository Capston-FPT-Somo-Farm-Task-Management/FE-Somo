import { Button, Form, Input, InputNumber, Modal, Radio } from 'antd'

const FormAddEmployee = ({ isModalOpen, closeModal, onFinishCreate }) => {
  const onFinish = (values) => {
    onFinishCreate(values)
    closeModal()
  }

  return (
    <>
      <Modal
        title="Thêm nhân viên"
        open={isModalOpen}
        onCancel={closeModal}
        footer={[
          <Button form="createEmployee" type="dashed" htmlType="reset">
            Làm mới
          </Button>,
          <Button
            form="createEmployee"
            type="primary"
            danger
            onClick={closeModal}
          >
            Huỷ
          </Button>,
          <Button form="createEmployee" type="primary" htmlType="submit">
            Hoàn thành
          </Button>,
        ]}
      >
        <Form
          layout="vertical"
          className="first-step-animal"
          id="createEmployee"
          onFinish={onFinish}
        >
          <div className="form-left">
            {/* Area Name */}
            <Form.Item
              label="Tên nhân viên"
              rules={[
                {
                  required: true,
                  message: 'Vui lòng nhập tên khu vực',
                },
              ]}
              name="name"
            >
              <Input placeholder="Nhập tên khu vực" />
            </Form.Item>

            {/* Area Code */}
            <Form.Item
              label="Mã nhân viên"
              rules={[
                {
                  required: true,
                  message: 'Vui lòng nhập mã khu vực',
                },
              ]}
              name="code"
            >
              <Input placeholder="Nhập mã cây trồng" />
            </Form.Item>

            <Form.Item
              label="Số điện thoại"
              rules={[
                {
                  required: true,
                  message: 'Vui lòng nhập số điện thoại nhân viên',
                },
              ]}
              name="phoneNumber"
            >
              <InputNumber
                min={0}
                style={{ width: '100%' }}
                addonBefore="+84"
              />
            </Form.Item>
          </div>
          <div className="form-right">
            <Form.Item
              label="Giới tính"
              rules={[
                {
                  required: true,
                  message: 'Vui lòng chọn giới tính',
                },
              ]}
              name="gender"
            >
              <Radio.Group>
                <Radio value={true}>Nam</Radio>
                <Radio value={false}>Nữ</Radio>
              </Radio.Group>
            </Form.Item>

            <Form.Item
              label="Địa chỉ"
              rules={[
                {
                  required: true,
                  message: 'Vui lòng chọn giới tính',
                },
              ]}
              name="gender"
            >
              <div>s</div>
            </Form.Item>
          </div>
        </Form>
      </Modal>
    </>
  )
}
export default FormAddEmployee
