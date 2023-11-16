import { Button, Form, Modal, Upload, message } from 'antd'
import { InboxOutlined } from '@ant-design/icons'
import { useState } from 'react'

const { Dragger } = Upload
const FormUploadExcel = ({ isModalOpenExcel, closeModalExcel }) => {
  const [form] = Form.useForm()
  const [fileList, setFileList] = useState([])

  const onFinish = (values) => {
    // onFinishCreateTaskType(values)
    closeModalExcel()
    form.resetFields()
  }

  const beforeUpload = (file) => {
    const isExcel =
      file.type ===
        'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' ||
      file.type === 'application/vnd.ms-excel'
    if (!isExcel) {
      message.error(`${file.name} không phải là file Excel.`)
      return Upload.LIST_IGNORE
    }
    // Chỉ cho phép một file trong fileList
    if (fileList.length >= 1) {
      message.error('Chỉ có thể tải lên một file.')
      return Upload.LIST_IGNORE
    }
    return false // Đừng thêm file vào list nếu không phải Excel
  }

  const onChange = ({ fileList: newFileList }) => {
    setFileList(newFileList.slice(-1)) // Chỉ giữ file mới nhất
  }

  const onRemove = (file) => {
    setFileList([]) // Xóa file khỏi fileList
  }
  return (
    <>
      <Modal
        title="Tạo loại công việc bằng tệp excel"
        open={isModalOpenExcel}
        onCancel={closeModalExcel}
        footer={[
          <Button form="uploadExcel" type="dashed" htmlType="reset">
            Làm mới
          </Button>,
          <Button
            form="uploadExcel"
            type="primary"
            danger
            onClick={closeModalExcel}
          >
            Huỷ
          </Button>,
          <Button form="uploadExcel" type="primary" htmlType="submit">
            Hoàn thành
          </Button>,
        ]}
      >
        <Form
          layout="vertical"
          id="uploadExcel"
          className="first-step-plant"
          onFinish={onFinish}
          form={form}
        >
          {/* Plant Type Name */}

          <div className="form-left">
            <Form.Item
              label="Tải lên tệp excel"
              name="excelFile"
              valuePropName="fileList"
              getValueFromEvent={onChange}
              rules={[
                {
                  required: true,
                  message: 'Vui lòng tải lên tệp excel',
                },
              ]}
            >
              <Upload.Dragger
                name="file"
                accept=".xlsx,.xls"
                fileList={fileList}
                beforeUpload={beforeUpload}
                onChange={onChange}
                onRemove={onRemove}
              >
                <p className="ant-upload-drag-icon">
                  <InboxOutlined />
                </p>
                <p className="ant-upload-text">
                  Kéo và thả tệp vào khu vực này, hoặc nhấp để chọn tệp
                </p>
              </Upload.Dragger>
            </Form.Item>
          </div>
        </Form>
      </Modal>
    </>
  )
}
export default FormUploadExcel
