import React from "react";
import LogoSomo from "../../../assets/logo_Somo.png";
import { Link, useNavigate } from "react-router-dom";
import { UserOutlined, BellOutlined, LogoutOutlined } from "@ant-design/icons";
import { Dropdown, Avatar, Menu, Space } from "antd";
import { useSelector, useDispatch } from "react-redux";
import { deleteHubConnection } from "features/slice/hub/hubSlice";
import { authServices } from "services/authServices";
import { toast } from "react-toastify";

function HeaderComp() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const member = useSelector((state) => state.member.data);
  console.log(member);

  const handleMenuClick = (e) => {
    if (e.key === "logout") {
      // Xử lý logic đăng xuất ở đây
    } else if (e.key === "profile") {
      // Xử lý hiển thị thông tin cá nhân ở đây
    }
  };

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
      label: <Link to="/">Xem thông tin</Link>,
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

  return (
    <>
      <nav className="navBar">
        <div className="navRight">
          <div className="header-notification">
            <Dropdown
              menu={{
                items,
              }}
              trigger={["hover"]}
              placement="bottom"
              arrow
            >
              <BellOutlined />
            </Dropdown>
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
                <Space>
                  <Avatar
                    src={member.avatar}
                    size="large"
                    icon={<UserOutlined />}
                  />
                  {member.name}
                </Space>
              </a>
            </Dropdown>
          </div>
        </div>
      </nav>
    </>
  );
}

export default HeaderComp;
