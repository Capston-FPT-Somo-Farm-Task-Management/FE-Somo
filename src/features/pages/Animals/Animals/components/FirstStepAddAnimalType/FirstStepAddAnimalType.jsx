import { Button, Form, Input, InputNumber, Modal } from 'antd'
import { createHabitantType } from 'features/slice/habitant/habitantTypeSlice'
import { useDispatch } from 'react-redux'

const FirstStepAddAnimalType = ({ isModalOpenType, closeModalType }) => {
  const dispatch = useDispatch()
  const onFinish = (values) => {
    const finalValues = {
      ...values,
      status: 1,
    }
    dispatch(createHabitantType(finalValues))
    closeModalType()
  }

  return (
    <>
      <Modal
        title="Thêm mới loại vật nuôi"
        open={isModalOpenType}
        onCancel={closeModalType}
        footer={[
          <Button form="createAnimalType" type="dashed" htmlType="reset">
            Làm mới
          </Button>,
          <Button
            form="createAnimalType"
            type="primary"
            danger
            onClick={closeModalType}
          >
            Huỷ
          </Button>,
          <Button form="createAnimalType" type="primary" htmlType="submit">
            Hoàn thành
          </Button>,
        ]}
      >
        <Form layout="vertical" id="createAnimalType" onFinish={onFinish}>
          {/* Plant Type Name */}
          <Form.Item
            label="Tên loại vật nuôi"
            name="name"
            rules={[
              { required: true, message: 'Vui lòng nhập tên loại vật nuôi' },
            ]}
          >
            <Input placeholder="Nhập tên loại vật nuôi" />
          </Form.Item>

          <Form.Item
            label="Số lượng"
            name="quantity"
            rules={[{ required: true, message: 'Vui lòng nhập số lượng' }]}
          >
            <InputNumber min={1} addonAfter="Con" />
          </Form.Item>
        </Form>
      </Modal>
    </>
  )
}
export default FirstStepAddAnimalType
