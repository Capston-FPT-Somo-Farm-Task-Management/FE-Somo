import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { deleteHubConnection } from "features/slice/hub/hubSlice";
import { authServices } from "services/authServices";
import { toast } from "react-toastify";
import dayjs from "dayjs";
import { updateMember } from "features/slice/user/memberSlice";
import HeaderOption from "./components/HeaderOption";

function HeaderComp() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [isModalEditVisible, setIsModalEditVisible] = useState(false);
  const [isNotificationVisible, setIsNotificationVisible] = useState(false);
  const [fileList, setFileList] = useState([]);

  const member = useSelector((state) => state.member.data);
  const countNew = useSelector((state) => state.notificationCount.data);
  console.log(countNew);
  const loading = useSelector((state) => state.member.loading);

  useEffect(() => {
    if (member?.avatar) {
      setFileList([
        {
          uid: "-1",
          name: "image.png",
          status: "done",
          url: member.avatar,
        },
      ]);
    }
  }, [member]);

  const onFileChange = ({ fileList: newFileList }) => {
    setFileList(newFileList);
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

  const handleEditProfile = (values) => {
    const updatedEffort = {
      ...values,
      id: member.id,
      imageFile: fileList[0].originFileObj,
    };

    dispatch(updateMember(updatedEffort)).then(() => {
      setIsModalEditVisible(false);
      setIsModalVisible(true);
    });
  };

  return (
    <>
      <nav className="navBar">
        <HeaderOption
          loading={loading}
          isNotificationVisible={isNotificationVisible}
          setIsNotificationVisible={setIsNotificationVisible}
          countNew={countNew}
          items={items}
          member={member}
          isModalVisible={isModalVisible}
          handleCancel={handleCancel}
          handleOpenEditProfile={handleOpenEditProfile}
          formattedBirthDay={formattedBirthDay}
          isModalEditVisible={isModalEditVisible}
          closeEditProfile={closeEditProfile}
          handleEditProfile={handleEditProfile}
          fileList={fileList}
          onFileChange={onFileChange}
        />
      </nav>
    </>
  );
}

export default HeaderComp;
