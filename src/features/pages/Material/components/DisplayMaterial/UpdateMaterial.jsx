import { Button, Form, Input, InputNumber, Modal, Upload } from 'antd'
import { UploadOutlined } from '@ant-design/icons'
import ImgCrop from 'antd-img-crop'
import { useEffect, useState } from 'react'

const UpdateMaterial = ({
  isModalOpen,
  closeModal,
  selectedData,
  onFinishUpdate,
}) => {
  const [fileList, setFileList] = useState([])

  useEffect(() => {
    if (selectedData && selectedData.imageFile) {
      const file = {
        uid: '-1', // Đảm bảo mỗi file có uid duy nhất
        name: 'image', // Bạn có thể lấy tên thực sự từ selectedData nếu có
        status: 'done',
        url: selectedData.imageFile, // Đường dẫn đến hình ảnh
      }
      setFileList([file])
    }
  }, [selectedData])

  const onFileChange = ({ fileList: newFileList }) => {
    setFileList(newFileList)
  }

  const onFinish = (values) => {
    const finalValues = {
      id: selectedData.id,
      ...values,
      imageFile: fileList.length > 0 ? fileList[0].url : null,
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

          <Form.Item
            label="Hình ảnh công cụ"
            name="imageFile"
            initialValue={selectedData ? selectedData.imageFile : ''}
          >
            <ImgCrop rotationSlider>
              <Upload
                listType="picture-card"
                maxCount={1}
                onChange={onFileChange}
                beforeUpload={() => false}
                fileList={fileList}
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
export default UpdateMaterial
