import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  UserOutlined,
  BellOutlined,
  DownOutlined,
  EditOutlined,
  UploadOutlined,
  LoadingOutlined,
} from "@ant-design/icons";
import {
  Dropdown,
  Avatar,
  Space,
  Modal,
  Button,
  Form,
  Input,
  Popover,
  Upload,
  Badge,
  Menu,
  Skeleton,
  Spin,
} from "antd";
import { useSelector, useDispatch } from "react-redux";
import { deleteHubConnection } from "features/slice/hub/hubSlice";
import { authServices } from "services/authServices";
import { toast } from "react-toastify";
import dayjs from "dayjs";
import {
  getMemberById,
  updateMember,
  updatePassword,
} from "features/slice/user/memberSlice";
import Notification from "features/pages/Notification";
import { countNewNotify } from "features/slice/notification/notificationCountSlice";
import { changeAllNotifyNewToRead } from "features/slice/notification/notifyChangeSlice";
import UserProfile from "./components/HeaderOption/UserProfile";
import EditProfile from "./components/HeaderOption/EditProfile";
import ChangePassword from "./components/HeaderOption/ChangePassword";
import { useMobileMediaQuery, useTabletMediaQuery } from "common/hooks/responsive";
import SidebarOnHeader from "./components/HeaderOption/SidebarOnHeader";

function HeaderComp() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [changePasswordModalVisible, setChangePasswordModalVisible] =
    useState(false);
  const [oldPasswordVisible, setOldPasswordVisible] = useState(false);
  const [newPasswordVisible, setNewPasswordVisible] = useState(false);
  const [confirmPasswordVisible, setConfirmPasswordVisible] = useState(false);
  const [oldPasswordValue, setOldPasswordValue] = useState("");
  const [newPasswordValue, setNewPasswordValue] = useState("");
  const [confirmPasswordValue, setConfirmPasswordValue] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isModalEditVisible, setIsModalEditVisible] = useState(false);
  const [fileList, setFileList] = useState([]);
  const [selectedCityName, setSelectedCityName] = useState("");
  const [selectedDistrictName, setSelectedDistrictName] = useState("");
  const [selectedWardName, setSelectedWardName] = useState("");

  const [form] = Form.useForm();

  const member = useSelector((state) => state.member.data);
  const countNew = useSelector((state) => state.notificationCount.data);
  const loading = useSelector((state) => state.member.loading);

  useEffect(() => {
    dispatch(countNewNotify(member?.id));
    dispatch(getMemberById(authServices.getUserId()));
  }, [dispatch]);

  useEffect(() => {
    if (member?.avatar) {
      setFileList([
        {
          uid: "-1",
          name: "image.png",
          status: "done",
          url: member ? member.avatar : null,
        },
      ]);
    }
  }, [member]);

  const onFileChange = ({ fileList: newFileList }) => {
    setFileList(newFileList);
  };

  const handleChangePassword = (e) => {
    setOldPasswordValue(e.target.value);
  };

  const handleChangeNewPassword = (e) => {
    setNewPasswordValue(e.target.value);
  };

  const handleConfirmPassword = (e) => {
    setConfirmPasswordValue(e.target.value);
  };

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

  const changePasswordModal = () => {
    setChangePasswordModalVisible(true);
  };

  const changePasswordCancel = () => {
    setOldPasswordValue("");
    setNewPasswordValue("");
    setConfirmPasswordValue("");
    setChangePasswordModalVisible(false);
  };

  const formattedBirthDay = member
    ? dayjs(member.birthday).format("DD-MM-YYYY")
    : null;

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
      key: "forgotPassword",
      label: <div onClick={changePasswordModal}>Đổi mật khẩu</div>,
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

  const handleEditProfile = (values) => {
    setIsSubmitting(true);
    const address = `${selectedWardName}, ${selectedDistrictName}, ${selectedCityName}`
    const editProfile = {
      ...values,
      id: member.id,
      imageFile: fileList[0].originFileObj,
      address: address
    };
    dispatch(updateMember(editProfile)).then(() => {
      setIsModalEditVisible(false);
      setIsModalVisible(true);
      setIsSubmitting(false);
    });
  };

  const handleSubmitChangePassword = (values) => {
    setIsSubmitting(true);
    const updatedPassword = {
      ...values,
      id: member.id,
      oldPassword: oldPasswordValue,
      password: newPasswordValue,
      confirmPassword: confirmPasswordValue,
    };
    dispatch(updatePassword(updatedPassword)).then(() => {
      changePasswordCancel();
      setIsSubmitting(false);
    });
  };

  const changeNewToRead = () => {
    dispatch(changeAllNotifyNewToRead(member?.id));
  };
  
  const isMobile = useMobileMediaQuery()

  return (
    <>
      <nav className="navBar">
        <div className="nav-item">
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
                      padding: "10px",
                    }}
                  >
                    <Notification />
                  </div>
                }
                trigger="click"
              >
                <Badge count={countNew ? countNew.data : 0}>
                  <BellOutlined
                    className="notification-icon"
                    onClick={changeNewToRead}
                  />
                </Badge>
              </Popover>
            ) : (
              <Spin
                indicator={
                  <LoadingOutlined
                    style={{
                      fontSize: 24,
                      color: "black",
                    }}
                    spin
                  />
                }
              />
            )}
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
                    <Avatar src={member ? member.avatar : null} size="large" />
                    {member && !isMobile ? member.name : null}
                    <DownOutlined />
                  </Space>
                ) : (
                  <div style={{ display: "flex", alignItems: "center" }}>
                    <Skeleton.Avatar
                      active
                      size="large"
                      shape="circle"
                      style={{
                        display: "flex",
                        alignItems: "center",
                        marginRight: "10px",
                      }}
                    />

                    <Skeleton.Input
                      active
                      style={{ display: "flex", alignItems: "center" }}
                      size="small"
                    />
                    <DownOutlined />
                  </div>
                )}
              </a>
            </Dropdown>
          </div>
          <UserProfile
            isModalVisible={isModalVisible}
            handleCancel={handleCancel}
            member={member}
            handleOpenEditProfile={handleOpenEditProfile}
            formattedBirthDay={formattedBirthDay}
          />
          <EditProfile
            isModalEditVisible={isModalEditVisible}
            closeEditProfile={closeEditProfile}
            handleEditProfile={handleEditProfile}
            fileList={fileList}
            onFileChange={onFileChange}
            member={member}
            isSubmitting={isSubmitting}
            setSelectedCityName={setSelectedCityName}
            setSelectedDistrictName={setSelectedDistrictName}
            setSelectedWardName={setSelectedWardName}
          />
          <ChangePassword
            changePasswordModalVisible={changePasswordModalVisible}
            changePasswordCancel={changePasswordCancel}
            isSubmitting={isSubmitting}
            handleSubmitChangePassword={handleSubmitChangePassword}
            form={form}
            oldPasswordValue={oldPasswordValue}
            handleChangePassword={handleChangePassword}
            oldPasswordVisible={oldPasswordVisible}
            setOldPasswordVisible={setOldPasswordVisible}
            newPasswordValue={newPasswordValue}
            handleChangeNewPassword={handleChangeNewPassword}
            newPasswordVisible={newPasswordVisible}
            setNewPasswordVisible={setNewPasswordVisible}
            confirmPasswordValue={confirmPasswordValue}
            handleConfirmPassword={handleConfirmPassword}
            confirmPasswordVisible={confirmPasswordVisible}
            setConfirmPasswordVisible={setConfirmPasswordVisible}
          />
        </div>
      </nav>
    </>
  );
}

export default HeaderComp;
