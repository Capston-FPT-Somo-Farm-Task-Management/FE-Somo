import { Button, Form, Input, InputNumber, Modal, Radio, Upload } from 'antd'
import ImgCrop from 'antd-img-crop'
import { useState } from 'react'
import { UploadOutlined } from '@ant-design/icons'

const UpdateEmployee = ({
  isModalOpen,
  closeModal,
  selectedData,
  onFinishUpdate,
}) => {
  const [fileList, setFileList] = useState([])

  // useEffect(() => {
  //   if (materialById?.data?.urlImage) {
  //     setFileList([
  //       {
  //         uid: '-1',
  //         name: 'image.png',
  //         status: 'done',
  //         url: materialById.data.urlImage,
  //       },
  //     ])
  //   }
  // }, [materialById])

  const onFileChange = ({ fileList: newFileList }) => {
    setFileList(newFileList)
  }

  const onFinish = (values) => {
    const finalValues = {
      id: selectedData.id,
      ...values,
    }
    console.log(finalValues)
    // onFinishUpdate(finalValues)
    closeModal()
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
          className="first-step-area"
          id="updateEmployee"
          onFinish={onFinish}
        >
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
                  return Promise.reject(new Error('Số điện thoại không hợp lệ'))
                },
              }),
            ]}
            initialValue={selectedData ? selectedData.phoneNumber : ''}
            name="phoneNumber"
          >
            <Input />
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
                  return Promise.reject(new Error('Số điện thoại không hợp lệ'))
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

          <Form.Item label="Hình ảnh nhân viên" name="imageFile">
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
        </Form>
      </Modal>
    </>
  )
}
export default UpdateEmployee
