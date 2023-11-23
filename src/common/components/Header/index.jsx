import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  UserOutlined,
  BellOutlined,
  DownOutlined,
  EditOutlined,
} from "@ant-design/icons";
import {
  Dropdown,
  Avatar,
  Space,
  Modal,
  Button,
  Form,
  Input,
  Spin,
  Popover,
} from "antd";
import { useSelector, useDispatch } from "react-redux";
import { deleteHubConnection } from "features/slice/hub/hubSlice";
import { authServices } from "services/authServices";
import { toast } from "react-toastify";
import dayjs from "dayjs";
import { updateMember } from "features/slice/user/memberSlice";
import Notification from "features/pages/Notification";

function HeaderComp() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [isModalEditVisible, setIsModalEditVisible] = useState(false);
  const [isNotificationVisible, setIsNotificationVisible] = useState(false);

  const member = useSelector((state) => state.member.data);
  const loading = useSelector((state) => state.member.loading);

  const handleOpenEditProfile = () => {
    setIsModalEditVisible(true);
    setIsModalVisible(false);
  };

  const closeEditProfile = () => {
    setIsModalEditVisible(false);
    setIsModalVisible(true);
  };

  const showModal = () => {
    setIsModalVisible(true);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  const formattedBirthDay = dayjs(member.birthday).format("DD-MM-YYYY");

  const logout = () => {
    const data = { token: localStorage.getItem("connectionId") };
    dispatch(deleteHubConnection(data));
    authServices.logOut();
    toast.success("Đăng xuất thành công");
    navigate("/login");
  };

  const items = [
    {
      key: "profile",
      label: <div onClick={showModal}>Xem thông tin</div>,
    },
    {
      key: "logout",
      label: (
        <div key="/login" onClick={logout}>
          <span>Đăng xuất</span>
          <Link to="/login"></Link>
        </div>
      ),
    },
  ];

  const handleEditProfile = (
    memberId,
    name,
    code,
    email,
    phoneNumber,
    birthday,
    address,
    imageFile
  ) => {
    const updatedEffort = [
      {
        name: name,
        code: code,
        email: email,
        phoneNumber: phoneNumber,
        birthday: birthday,
        address: address,
      },
    ];

    dispatch(updateMember({ memberId: memberId, body: updatedEffort })).then(
      () => {
        // dispatch(getEffort(currentTaskId)).then((data) => {
        //   setEffort(data.payload.data.subtasks);
        //   setEditEffortVisible(false);
        // });
      }
    );
  };

  return (
    <>
      <nav className="navBar">
        <div className="navRight">
          <div className="header-notification">
            {!loading ? (
              <Popover
                placement="bottomRight"
                title={<h3>Thông báo</h3>}
                content={
                  <div
                    style={{
                      height: "500px",
                      overflowY: "auto",
                      padding: "10px"
                    }}
                  >
                    <Notification />
                  </div>
                } // Thay thế bằng nội dung của thông báo
                trigger="hover"
                open={isNotificationVisible}
                onVisibleChange={(visible) => setIsNotificationVisible(visible)}
              >
                <BellOutlined />
              </Popover>
            ) : null}
          </div>
          <div className="header-profile">
            <Dropdown
              menu={{
                items,
              }}
              trigger={["hover"]}
              placement="bottom"
              arrow
            >
              <a onClick={(e) => e.preventDefault()}>
                {!loading ? (
                  <Space>
                    <Avatar
                      src={member.avatar}
                      size="large"
                      icon={<UserOutlined />}
                    />
                    {member.name}
                    <DownOutlined />
                  </Space>
                ) : null}
              </a>
            </Dropdown>
          </div>
          <Modal
            visible={isModalVisible}
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
                onFinish={(values) => {
                  handleEditProfile(
                    member.id,
                    values.name,
                    values.code,
                    values.email,
                    values.phoneNumber,
                    values.birthday,
                    values.address,
                    values.imageFile
                  );
                }}
                id="updateEffort"
              >
                <Form.Item
                  label="Tên"
                  name="name"
                  required
                  initialValue={member ? member.name : null}
                >
                  <Input placeholder="Nhập tên" />
                </Form.Item>
                <Form.Item
                  label="Tên"
                  name="code"
                  required
                  initialValue={member ? member.code : null}
                >
                  <Input placeholder="Nhập tên" disabled />
                </Form.Item>
                <Form.Item
                  label="Email"
                  name="email"
                  required
                  initialValue={member ? member.email : null}
                >
                  <Input placeholder="Nhập email" />
                </Form.Item>
                <Form.Item
                  label="Số điện thoại"
                  name="phoneNumber"
                  required
                  initialValue={member ? member.phoneNumber : null}
                >
                  <Input placeholder="Nhập số điện thoại" />
                </Form.Item>
                <Form.Item
                  label="Ngày sinh"
                  name="birthday"
                  required
                  initialValue={member ? member.birthday : null}
                >
                  <Input placeholder="Nhập ngày tháng năm sinh" />
                </Form.Item>
                <Form.Item
                  label="Địa chỉ thường trú"
                  name="address"
                  required
                  initialValue={member ? member.address : null}
                >
                  <Input placeholder="Nhập địa chỉ thường trú" />
                </Form.Item>
              </Form>
            </Modal>
          )}
        </div>
      </nav>
    </>
  );
}

export default HeaderComp;
