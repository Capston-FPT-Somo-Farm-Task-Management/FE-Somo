import {
  Button,
  DatePicker,
  Form,
  Input,
  InputNumber,
  Modal,
  Radio,
  Upload,
  Space,
  Select,
} from 'antd'
import ImgCrop from 'antd-img-crop'
import { useState } from 'react'
import { UploadOutlined } from '@ant-design/icons'
import dayjs from 'dayjs'

const FormAddEmployee = ({
  isModalOpen,
  closeModal,
  onFinishCreate,
  farmId,
  taskTypeActive,
}) => {
  const [fileList, setFileList] = useState([])
  const [uploadError, setUploadError] = useState(false)
  const [form] = Form.useForm()

  const onFileChange = ({ fileList: newFileList }) => {
    setFileList(newFileList)
  }

  const handleFormReset = () => {
    form.resetFields()
    setFileList([])
    setUploadError(false)
  }

  const onFinish = (values) => {
    if (fileList.length === 0) {
      setUploadError(true)
      return
    }
    setUploadError(false)
    const finalValues = {
      ...values,
      imageFile: fileList[0].originFileObj,
      farmId: farmId,
    }

    // onFinishCreate(values)
    console.log(finalValues)
    closeModal()
    handleFormReset()
  }

  const disabledDate = (current) => {
    return current && current > dayjs().endOf('day')
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
          form={form}
        >
          <div className="form-left">
            {/* Area Name */}
            <Form.Item
              label="Tên nhân viên"
              rules={[
                {
                  required: true,
                  message: 'Vui lòng nhập tên nhân viên',
                },
              ]}
              name="name"
            >
              <Input placeholder="Nhập tên nhân viên" />
            </Form.Item>

            {/* Area Code */}
            <Form.Item
              label="Mã nhân viên"
              rules={[
                {
                  required: true,
                  message: 'Vui lòng nhập mã nhân viên',
                },
              ]}
              name="code"
            >
              <Input placeholder="Nhập mã nhân viên" />
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
              <InputNumber min={0} style={{ width: '100%' }} />
            </Form.Item>

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
          <div className="form-right">
            <Form.Item label="Hình ảnh nhân viên" required>
              <ImgCrop rotationSlider>
                <Upload
                  listType="picture-card"
                  maxCount={1}
                  fileList={fileList}
                  onChange={onFileChange}
                  beforeUpload={() => false}
                >
                  <UploadOutlined />
                </Upload>
              </ImgCrop>
              {uploadError && (
                <div style={{ color: 'red' }}>
                  Vui lòng tải lên hình ảnh nhân viên
                </div>
              )}
            </Form.Item>

            <Form.Item
              label="Ngày sinh"
              rules={[
                {
                  required: true,
                  message: 'Vui lòng chọn ngày sinh',
                },
              ]}
              name="dateOfBirth"
            >
              <DatePicker
                format="YYYY-MM-DD"
                disabledDate={disabledDate}
                placeholder="Chọn ngày sinh"
                style={{
                  width: '100%',
                }}
              />
            </Form.Item>

            <Form.Item
              label="Loại nhiệm vụ"
              rules={[
                {
                  required: true,
                  message: 'Vui lòng chọn loại nhiệm vụ',
                },
              ]}
              name="taskTypeIds"
            >
              <Select
                mode="multiple"
                allowClear
                style={{
                  width: '100%',
                }}
                placeholder="Chọn loại nhiệm vụ"
                options={taskTypeActive?.data?.map((taskType) => ({
                  label: taskType.name,
                  value: taskType.id,
                }))}
              />
            </Form.Item>
          </div>
        </Form>
      </Modal>
    </>
  )
}
export default FormAddEmployee
