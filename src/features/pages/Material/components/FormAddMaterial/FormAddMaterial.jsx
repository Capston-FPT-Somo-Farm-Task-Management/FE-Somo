import { Button, Form, Image, Input, Modal, Upload, message } from 'antd'
import ImgCrop from 'antd-img-crop'
import React, { useState } from 'react'
import { UploadOutlined } from '@ant-design/icons'

import { useDispatch } from 'react-redux'
import { render } from '@testing-library/react'
const FormAddMaterial = ({
  isModalOpen,
  closeModal,
  onFinishCreate,
  farmId,
}) => {
  const dispatch = useDispatch()
  const onFinish = (values) => {
    const finalValues = {
      ...values,
      // imageFile: image,
      farmId: farmId,
    }
    console.log(finalValues)
    dispatch(onFinishCreate(finalValues))
    closeModal()
  }

  // const [image, setImage] = useState('')
  // const convertToBase64 = (e) => {
  //   console.log(e)
  //   const reader = new FileReader()
  //   reader.readAsDataURL(e.target.files[0])
  //   reader.onload = () => {
  //     console.log(reader.result)
  //     setImage(reader.result)
  //   }
  //   reader.onerror = (error) => {
  //     console.log('Error: ', error)
  //   }
  // }

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

          <Form.Item
            label="Hình ảnh công cụ"
            // rules={[
            //   {
            //     required: true,
            //     message: 'Vui lòng tải lên hình ảnh công cụ',
            //   },
            // ]}
            // name="imageFile"
          >
            {/* <input accept="image/*" onChange={convertToBase64} type="file" /> */}
            {/* <Button icon={<UploadOutlined />}>Upload</Button> */}

            {/* {image && <Image src={image} alt="Công cụ" width={200} />} */}
          </Form.Item>
        </Form>
      </Modal>
    </>
  )
}
export default FormAddMaterial
