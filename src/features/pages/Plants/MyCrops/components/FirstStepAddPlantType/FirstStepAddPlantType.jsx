import { Button, Form, Input, InputNumber, Modal } from 'antd'
import { createHabitantType } from 'features/slice/habitant/habitantTypeSlice'
import { useDispatch } from 'react-redux'

const FirstStepAddPlantType = ({ isModalOpenType, closeModalType }) => {
  const dispatch = useDispatch()
  const onFinish = (values) => {
    const finalValues = {
      ...values,
      status: 0,
    }
    dispatch(createHabitantType(finalValues))
    closeModalType()
  }

  return (
    <>
      <Modal
        title="Thêm mới loại cây trồng"
        open={isModalOpenType}
        onCancel={closeModalType}
        footer={[
          <Button form="createPlantType" type="dashed" htmlType="reset">
            Làm mới
          </Button>,
          <Button
            form="createPlantType"
            type="primary"
            danger
            onClick={closeModalType}
          >
            Huỷ
          </Button>,
          <Button form="createPlantType" type="primary" htmlType="submit">
            Hoàn thành
          </Button>,
        ]}
      >
        <Form layout="vertical" id="createPlantType" onFinish={onFinish}>
          {/* Plant Type Name */}
          <Form.Item
            label="Tên loại cây trồng"
            name="name"
            rules={[
              { required: true, message: 'Vui lòng nhập tên loại cây trồng' },
            ]}
          >
            <Input placeholder="Nhập tên loại cây trồng" />
          </Form.Item>

          <Form.Item
            label="Số lượng"
            name="quantity"
            rules={[{ required: true, message: 'Vui lòng nhập số lượng' }]}
          >
            <InputNumber min={1} addonAfter="Cây" />
          </Form.Item>
        </Form>
      </Modal>
    </>
  )
}
export default FirstStepAddPlantType
