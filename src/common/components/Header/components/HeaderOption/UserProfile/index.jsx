import React from "react";
import { Avatar, Modal } from "antd";
import { EditOutlined } from "@ant-design/icons";

const UserProfile = ({
  isModalVisible,
  handleCancel,
  member,
  handleOpenEditProfile,
  formattedBirthDay
}) => {
  return (
    <Modal
      open={isModalVisible}
      onCancel={handleCancel}
      width={800}
      footer={null}
      className="modal-user-profile"
    >
      <div className="user-profile">
        <div className="user-profile-left">
          <Avatar src={member.avatar} size={150} />
          <h4>{member.name}</h4>
          {member.roleName === "Manager" ? <p>Chức vụ: Quản lý</p> : null}
        </div>
        <div className="user-profile-right">
          <h5>
            Thông tin cá nhân{" "}
            <span onClick={handleOpenEditProfile}>
              <EditOutlined />
            </span>
          </h5>

          <div className="user-information">
            <div className="user-information-text">
              <h6>Email</h6>
              <p>{member.email}</p>
            </div>
            <div className="user-information-text">
              <h6>Số điện thoại</h6>
              <p>{member.phoneNumber}</p>
            </div>
            <div className="user-information-text">
              <h6>Trang trại</h6>
              <p>{member.farmName}</p>
            </div>
            <div className="user-information-text">
              <h6>Ngày sinh</h6>
              <p>{formattedBirthDay}</p>
            </div>
          </div>
          <h5>Địa chỉ</h5>
          <div className="user-address">
            <div className="user-information-text">
              <h6>Địa chỉ thường trú</h6>
              <p>{member.address}</p>
            </div>
          </div>
        </div>
      </div>
    </Modal>
  );
};

export default UserProfile;
