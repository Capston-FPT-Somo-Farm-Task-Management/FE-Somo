import React from 'react'
import { Button, Modal, Descriptions, Avatar, Image } from 'antd'

const DetailMember = ({
  isModalOpenDetail,
  closeModalDetail,
  selectedMember,
}) => {
  return (
    <Modal
      title="Thông tin nhân viên"
      open={isModalOpenDetail}
      onCancel={closeModalDetail}
      footer={[
        <Button key="back" onClick={closeModalDetail}>
          Đóng
        </Button>,
      ]}
    >
      {selectedMember && (
        <Descriptions bordered column={1}>
          <Descriptions.Item>
            <Avatar src={selectedMember.avatar} size="large" />
          </Descriptions.Item>
          <Descriptions.Item label="Họ và tên">
            {selectedMember.name}
          </Descriptions.Item>
          <Descriptions.Item label="Tên đăng nhập">
            {selectedMember.userName}
          </Descriptions.Item>
          <Descriptions.Item label="Ngày sinh">
            {selectedMember.birthday}
          </Descriptions.Item>
          <Descriptions.Item label="Địa chỉ">
            {selectedMember.address}
          </Descriptions.Item>
          <Descriptions.Item label="Chức vụ">
            {selectedMember.roleName}
          </Descriptions.Item>
          <Descriptions.Item label="Số điện thoại">
            {selectedMember.phoneNumber}
          </Descriptions.Item>
          <Descriptions.Item label="Email">
            {selectedMember.email}
          </Descriptions.Item>
        </Descriptions>
      )}
    </Modal>
  )
}

export default DetailMember
