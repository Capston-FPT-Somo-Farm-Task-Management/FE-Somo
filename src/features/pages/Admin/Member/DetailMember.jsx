import React from 'react'
import { Button, Modal, Descriptions, Avatar } from 'antd'

const DetailMember = ({ isModalOpen, closeModal, selectedMember }) => {
  return (
    <Modal
      title="Thông tin nhân viên"
      open={isModalOpen}
      onCancel={closeModal}
      footer={[
        <Button key="back" onClick={closeModal}>
          Đóng
        </Button>,
      ]}
    >
      {selectedMember && (
        <Descriptions bordered column={1}>
          <Descriptions.Item label="Tên">
            {selectedMember.name}
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
          <Descriptions.Item label="Địa chỉ">
            {selectedMember.address}
          </Descriptions.Item>
          <Descriptions.Item label="Ngày sinh">
            {selectedMember.birthday}
          </Descriptions.Item>
          <Descriptions.Item label="Hình ảnh">
            <Avatar src={selectedMember.avatar} />
          </Descriptions.Item>
        </Descriptions>
      )}
    </Modal>
  )
}

export default DetailMember
