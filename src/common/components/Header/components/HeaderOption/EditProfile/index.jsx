import React from "react";
import { Button, Form, Input, Modal, Upload } from "antd";
import { UploadOutlined } from "@ant-design/icons";

const EditProfile = ({
  isModalEditVisible,
  closeEditProfile,
  handleEditProfile,
  fileList,
  onFileChange,
  member,
}) => {
  return (
    <>
      {isModalEditVisible && (
        <Modal
          title="Sửa thông tin"
          visible={isModalEditVisible}
          onCancel={closeEditProfile}
          footer={[
            <Button form="updateEffort" type="primary" htmlType="submit">
              Lưu thay đổi
            </Button>,
            <Button type="primary" onClick={closeEditProfile}>
              Đóng
            </Button>,
          ]}
        >
          <Form
            layout="vertical"
            onFinish={handleEditProfile}
            id="updateEffort"
          >
            <Form.Item label="Hình ảnh" name="imageFile">
              <Upload
                listType="picture-circle"
                maxCount={1}
                beforeUpload={() => false}
                fileList={fileList}
                onChange={onFileChange}
                onRemove="false"
              >
                <UploadOutlined />
              </Upload>
            </Form.Item>
            <Form.Item
              label="Tên"
              name="name"
              initialValue={member ? member.name : null}
            >
              <Input placeholder="Nhập tên" />
            </Form.Item>
            <Form.Item
              label="Mã"
              name="code"
              initialValue={member ? member.code : null}
            >
              <Input placeholder="Nhập tên" disabled />
            </Form.Item>
            <Form.Item
              label="Email"
              name="email"
              initialValue={member ? member.email : null}
            >
              <Input placeholder="Nhập email" />
            </Form.Item>
            <Form.Item
              label="Số điện thoại"
              name="phoneNumber"
              initialValue={member ? member.phoneNumber : null}
            >
              <Input placeholder="Nhập số điện thoại" />
            </Form.Item>
            <Form.Item
              label="Ngày sinh"
              name="birthday"
              initialValue={member ? member.birthday : null}
            >
              <Input placeholder="Nhập ngày tháng năm sinh" />
            </Form.Item>
            <Form.Item
              label="Địa chỉ thường trú"
              name="address"
              initialValue={member ? member.address : null}
            >
              <Input placeholder="Nhập địa chỉ thường trú" />
            </Form.Item>
          </Form>
        </Modal>
      )}
    </>
  );
};

export default EditProfile;
