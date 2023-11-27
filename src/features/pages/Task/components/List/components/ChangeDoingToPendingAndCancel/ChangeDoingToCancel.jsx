import React from "react";
import { Button, Form, Input, Modal, Upload } from "antd";
import TextArea from "antd/es/input/TextArea";
import ImgCrop from "antd-img-crop";
import { UploadOutlined } from "@ant-design/icons";

const ChangeDoingToCancel = ({
  currentTaskId,
  taskDoingToCancelModalVisible,
  closeChangeDoingToCancelModal,
  handleChangeDoingToCancelTask,
  description,
  handleDescription,
  fileList,
  onFileChange,
}) => {
  return (
    <>
      {taskDoingToCancelModalVisible && (
        <Modal
          title="Hủy bỏ"
          open={taskDoingToCancelModalVisible}
          onCancel={closeChangeDoingToCancelModal}
          footer={[
            <Button form="doingToCancel" type="primary" htmlType="submit">
              Đồng ý
            </Button>,
          ]}
        >
          <Form
            layout="vertical"
            onFinish={() => handleChangeDoingToCancelTask(currentTaskId)}
            id="doingToCancel"
          >
            <Form.Item
              label="Lý do hủy bỏ"
              name="description"
              required
              rules={[
                {
                  required: true,
                  message: "Vui lòng nhập lý do hủy bỏ",
                },
              ]}
            >
              <TextArea
                placeholder="Nhập lý do hủy bỏ"
                value={description}
                onChange={handleDescription}
              />
            </Form.Item>
            <Form.Item label="Hình ảnh" name="imageFile">
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
      )}
    </>
  );
};

export default ChangeDoingToCancel;
