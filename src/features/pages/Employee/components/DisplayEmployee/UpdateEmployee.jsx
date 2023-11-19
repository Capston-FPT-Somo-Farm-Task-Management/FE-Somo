import {
  Button,
  DatePicker,
  Form,
  Input,
  InputNumber,
  Modal,
  Radio,
  Select,
  Upload,
} from 'antd'
import ImgCrop from 'antd-img-crop'
import { useEffect, useState } from 'react'
import { UploadOutlined } from '@ant-design/icons'
import dayjs from 'dayjs'

const UpdateEmployee = ({
  isModalOpen,
  closeModal,
  selectedData,
  onFinishUpdate,
  employeeById,
  taskTypeActive,
}) => {
  console.log(selectedData)
  console.log(employeeById)

  const [fileList, setFileList] = useState([])

  useEffect(() => {
    if (employeeById?.data?.avatar) {
      setFileList([
        {
          uid: '-1',
          name: 'image.png',
          status: 'done',
          url: employeeById?.data?.avatar,
        },
      ])
    }
  }, [employeeById])

  const onFileChange = ({ fileList: newFileList }) => {
    setFileList(newFileList)
  }

  const onFinish = (values) => {
    const finalValues = {
      id: selectedData.id,
      ...values,
    }
    // onFinishUpdate(finalValues)
    closeModal()
  }

  const disabledDate = (current) => {
    return current && current > dayjs().endOf('day')
  }

  return (
    <>
      <Modal
        title="Cập nhật thông tin nhân viên"
        open={isModalOpen}
        closeIcon
        onCancel={closeModal}
        footer={[
          <Button
            form="updateEmployee"
            type="primary"
            htmlType="reset"
            danger
            onClick={closeModal}
          >
            Huỷ
          </Button>,
          <Button form="updateEmployee" type="primary" htmlType="submit">
            Cập nhật
          </Button>,
        ]}
      >
        <Form
          layout="vertical"
          className="first-step-animal"
          id="updateEmployee"
          onFinish={onFinish}
        >
          <div className="form-left">
            <Form.Item
              label="Tên nhân viên"
              rules={[
                {
                  required: true,
                  message: 'Vui lòng nhập tên nhân viên',
                },
              ]}
              name="name"
              initialValue={selectedData ? selectedData.name : ''}
            >
              <Input placeholder="Nhập tên nhân viên" />
            </Form.Item>

            <Form.Item
              label="Mã nhân viên"
              rules={[
                {
                  required: true,
                  message: 'Vui lòng nhập mã nhân viên',
                },
              ]}
              name="code"
              initialValue={selectedData ? selectedData.code : ''}
            >
              <Input placeholder="Nhập mã khu vực" />
            </Form.Item>

            <Form.Item
              label="Số điện thoại"
              rules={[
                {
                  required: true,
                  message: 'Vui lòng nhập số điện thoại nhân viên',
                },
                () => ({
                  validator(_, value) {
                    const phoneRegex = /^(0[3|5|7|8|9])+([0-9]{8})\b/
                    if (!value || phoneRegex.test(value)) {
                      return Promise.resolve()
                    }
                    return Promise.reject(
                      new Error('Số điện thoại không hợp lệ')
                    )
                  },
                }),
              ]}
              initialValue={selectedData ? selectedData.phoneNumber : ''}
              name="phoneNumber"
            >
              <Input />
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
              initialValue={selectedData ? selectedData.gender : ''}
            >
              <Radio.Group>
                <Radio value="Male">Nam</Radio>
                <Radio value="Female">Nữ</Radio>
              </Radio.Group>
            </Form.Item>

            <Form.Item
              label="Địa chỉ"
              rules={[
                {
                  required: true,
                  message: 'Vui lòng chọn địa chỉ',
                },
              ]}
              name="address"
            >
              <div>s</div>
            </Form.Item>
          </div>

          <div className="form-right">
            <Form.Item label="Hình ảnh công cụ" name="avatar">
              <ImgCrop rotationSlider>
                <Upload
                  listType="picture-card"
                  maxCount={1}
                  beforeUpload={() => false}
                  fileList={fileList}
                  onChange={onFileChange}
                >
                  <UploadOutlined />
                </Upload>
              </ImgCrop>
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
              // initialValue={selectedData ? selectedData.dateOfBirth : null}
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
              initialValue={selectedData ? selectedData.taskTypeIds : null}
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
export default UpdateEmployee
