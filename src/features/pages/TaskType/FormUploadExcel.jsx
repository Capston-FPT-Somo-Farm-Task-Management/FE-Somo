// import { Button, Form, Modal, Upload, message } from 'antd'
// import { InboxOutlined } from '@ant-design/icons'
// import { useState } from 'react'

// const { Dragger } = Upload
// const FormUploadExcel = ({
//   isModalOpenExcel,
//   closeModalExcel,
//   onFinishCreateTaskTypeExcel,
// }) => {
//   const [form] = Form.useForm()
//   const [fileList, setFileList] = useState([])

//   const onFinish = (values) => {
//     console.log(values)
//     onFinishCreateTaskTypeExcel(values)
//     closeModalExcel()
//     form.resetFields()
//   }

//   const beforeUpload = (file) => {
//     const isExcel =
//       file.type ===
//         'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' ||
//       file.type === 'application/vnd.ms-excel'
//     if (!isExcel) {
//       message.error(`${file.name} không phải là tệp tin Excel.`)
//       return Upload.LIST_IGNORE
//     }

//     if (fileList.length >= 1) {
//       message.error('Chỉ có thể tải lên một tệp tin')
//       return Upload.LIST_IGNORE
//     }
//     return false
//   }

//   const onChange = ({ fileList: newFileList }) => {
//     setFileList(newFileList.slice(-1))
//     if (newFileList.length > 0) {
//       form.setFieldsValue({ excelFile: newFileList })
//     } else {
//       form.setFieldsValue({ excelFile: null })
//     }
//   }

//   const onRemove = () => {
//     setFileList([])
//   }
//   return (
//     <>
//       <Modal
//         title="Tạo loại công việc bằng tệp excel"
//         open={isModalOpenExcel}
//         onCancel={closeModalExcel}
//         footer={[
//           <Button form="uploadExcel" type="dashed" htmlType="reset">
//             Làm mới
//           </Button>,
//           <Button
//             form="uploadExcel"
//             type="primary"
//             danger
//             onClick={closeModalExcel}
//           >
//             Huỷ
//           </Button>,
//           <Button form="uploadExcel" type="primary" htmlType="submit">
//             Hoàn thành
//           </Button>,
//         ]}
//       >
//         <Form
//           layout="vertical"
//           id="uploadExcel"
//           className="first-step-plant"
//           onFinish={onFinish}
//           form={form}
//         >
//           {/* Plant Type Name */}

//           <div className="form-left">
//             <Form.Item
//               label="Tải lên tệp excel"
//               name="excelFile"
//               valuePropName="fileList"
//               getValueFromEvent={onChange}
//               rules={[
//                 {
//                   required: true,
//                   message: 'Vui lòng tải lên tệp excel',
//                 },
//               ]}
//             >
//               <Upload.Dragger
//                 name="file"
//                 accept=".xlsx,.xls"
//                 fileList={fileList}
//                 beforeUpload={beforeUpload}
//                 onChange={onChange}
//                 onRemove={onRemove}
//               >
//                 <p className="ant-upload-drag-icon">
//                   <InboxOutlined />
//                 </p>
//                 <p className="ant-upload-text">
//                   Kéo và thả tệp vào khu vực này hoặc nhấp để chọn tệp
//                 </p>
//               </Upload.Dragger>
//             </Form.Item>
//           </div>
//         </Form>
//       </Modal>
//     </>
//   )
// }
// export default FormUploadExcel

import { Button, Form, Modal, Upload, message } from 'antd'
import { InboxOutlined } from '@ant-design/icons'
import { useEffect, useState } from 'react'

const { Dragger } = Upload
const FormUploadExcel = ({
  isModalOpenExcel,
  closeModalExcel,
  onFinishCreateTaskTypeExcel,
}) => {
  const [form] = Form.useForm()
  const [fileList, setFileList] = useState([])

  useEffect(() => {
    if (!isModalOpenExcel) {
      setFileList([])
      form.resetFields()
    }
  }, [isModalOpenExcel])

  const onFinish = (values) => {
    const fileValue = fileList.length > 0 ? fileList[0] : null
    onFinishCreateTaskTypeExcel({ ...values, excelFile: fileValue })
    console.log({ ...values, excelFile: fileValue })
    closeModalExcel()
    form.resetFields()
  }

  const beforeUpload = (file) => {
    const isExcel =
      file.type ===
        'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' ||
      file.type === 'application/vnd.ms-excel'
    if (!isExcel) {
      message.error(`${file.name} không phải là tệp tin Excel.`)
      return Upload.LIST_IGNORE
    }
    return false
  }

  const onChange = ({ file, fileList: newFileList }) => {
    const latestFile = file.status === 'removed' ? [] : [file]
    setFileList(latestFile)
    form.setFieldsValue({ excelFile: file })
  }

  const onRemove = () => {
    setFileList([])
    form.setFieldsValue({ excelFile: null })
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
          <div className="form-left">
            <Form.Item
              label="Tải lên tệp excel"
              name="excelFile"
              valuePropName="file"
              getValueFromEvent={onChange}
              rules={[
                {
                  required: true,
                  message: 'Vui lòng tải lên tệp excel',
                },
              ]}
            >
              <Dragger
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
                  Kéo và thả tệp vào khu vực này hoặc nhấp để chọn tệp
                </p>
              </Dragger>
            </Form.Item>
          </div>
        </Form>
      </Modal>
    </>
  )
}

export default FormUploadExcel
