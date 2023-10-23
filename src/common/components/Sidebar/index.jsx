import React, { useEffect, useState } from "react";
import { Button, Menu, Popover } from "antd";
import LogoSomo from "../../../assets/logo_Somo.png";
import {
  useDesktopMediaQuery,
  useTabletMediaQuery,
} from "common/hooks/responsive";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { menuItem, rootSubmenuKeys } from "./sidebarData";
import Sider from "antd/es/layout/Sider";
import { MenuOutlined } from "@ant-design/icons";
import {
  DashboardOutlined,
  TeamOutlined,
  CalendarOutlined,
  AimOutlined,
  BorderOutlined,
  BlockOutlined,
  LogoutOutlined,
} from "@ant-design/icons";
import { authServices } from "services/authServices";
import { toast } from "react-toastify";

function Sidebar() {
  const [openKeys, setOpenKeys] = useState(["sub1"]);
  const isDesktop = useDesktopMediaQuery();
  const isTablet = useTabletMediaQuery();

  const [userName, setUserName] = useState();
  const [userRole, setUserRole] = useState();
  const [collapsed, setCollapsed] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const role = authServices.getRole();
    setUserRole(role);
    const userName = authServices.getUserName();
    setUserName(userName);
  }, []);

  const logout = () => {
    authServices.logOut();
    toast.success("Đăng xuất thành công");
  };

  const onCollapse = (collapsed) => setCollapsed(collapsed);
  return (
    <div className="sider">
      {isDesktop && (
        <Sider collapsible collapsed={collapsed} onCollapse={onCollapse}>
          <div className="logoSomo">
            <img src={LogoSomo} alt="logo" />
          </div>
          <Menu
            theme="light"
            mode="inline"
            defaultSelectedKeys={[location.pathname]}
          >
            <Menu.Item key="/">
              <CalendarOutlined />
              <span>Lịch trình</span>
              <Link to="/"></Link>
            </Menu.Item>

            <Menu.Item key="/task">
              <AimOutlined />
              <span>Công việc</span>
              <Link to="/task"></Link>
            </Menu.Item>

            <Menu.Item key="/area">
              <BorderOutlined />
              <span>Khu vực</span>
              <Link to="/area"></Link>
            </Menu.Item>

            <Menu.Item key="/zone">
              <BlockOutlined />
              <span>Vùng</span>
              <Link to="/zone"></Link>
            </Menu.Item>

            <Menu.Item key="/animals">
              <TeamOutlined />
              <span>Vật nuôi</span>
              <Link to="/animals"></Link>
            </Menu.Item>

            <Menu.Item key="/animal-group">
              <TeamOutlined />
              <span>Chuồng</span>
              <Link to="/animal-group"></Link>
            </Menu.Item>

            <Menu.Item key="/plants">
              <DashboardOutlined />
              <span>Cây trồng</span>
              <Link to="/plants"></Link>
            </Menu.Item>

            <Menu.Item key="/crop-group">
              <DashboardOutlined />
              <span>Vườn</span>
              <Link to="/crop-group"></Link>
            </Menu.Item>

            <Menu.Item key="/login" onClick={logout}>
              <LogoutOutlined />
              <span>Đăng xuất</span>
              <Link to="/login"></Link>
            </Menu.Item>
          </Menu>
        </Sider>
      )}
      {isTablet && (
        <div className="header-tablet">
          <div className="logoSomo">
            <img src={LogoSomo} alt="logo" />
          </div>
          <div className="menu-popover">
            <Popover
              placement="bottomRight"
              content={
                <Menu
                  theme="light"
                  mode="inline"
                  defaultSelectedKeys={[location.pathname]}
                >
                  <Menu.Item key="/">
                    <CalendarOutlined />
                    <span>Lịch trình</span>
                    <Link to="/"></Link>
                  </Menu.Item>

                  <Menu.Item key="/task">
                    <AimOutlined />
                    <span>Công việc</span>
                    <Link to="/task"></Link>
                  </Menu.Item>

                  <Menu.Item key="/area">
                    <BorderOutlined />
                    <span>Khu vực</span>
                    <Link to="/area"></Link>
                  </Menu.Item>

                  <Menu.Item key="/zone">
                    <BlockOutlined />
                    <span>Vùng</span>
                    <Link to="/zone"></Link>
                  </Menu.Item>

                  <Menu.Item key="/animals">
                    <TeamOutlined />
                    <span>Vật nuôi</span>
                    <Link to="/animals"></Link>
                  </Menu.Item>

                  <Menu.Item key="/animal-group">
                    <TeamOutlined />
                    <span>Chuồng</span>
                    <Link to="/animal-group"></Link>
                  </Menu.Item>

                  <Menu.Item key="/plants">
                    <DashboardOutlined />
                    <span>Cây trồng</span>
                    <Link to="/plants"></Link>
                  </Menu.Item>

                  <Menu.Item key="/crop-group">
                    <DashboardOutlined />
                    <span>Vườn</span>
                    <Link to="/crop-group"></Link>
                  </Menu.Item>

                  <Menu.Item key="/login" onClick={logout}>
                    <LogoutOutlined />
                    <span>Đăng xuất</span>
                    <Link to="/login"></Link>
                  </Menu.Item>
                </Menu>
              }
              trigger="click"
            >
              <Button>
                <MenuOutlined />
              </Button>
            </Popover>
          </div>
        </div>
      )}
    </div>
  );
}

export default Sidebar;
