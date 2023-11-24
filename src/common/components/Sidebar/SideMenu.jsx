import React, { useEffect, useState } from "react";

import {
  Avatar,
  Badge,
  Button,
  Card,
  Drawer,
  Layout,
  Menu,
  Popconfirm,
  Popover,
  Space,
} from "antd";
import {
  DashboardOutlined,
  TeamOutlined,
  CalendarOutlined,
  AimOutlined,
  BorderOutlined,
  BlockOutlined,
  TableOutlined,
  BellOutlined,
  MenuOutlined,
  AppstoreOutlined,
  LogoutOutlined,
  FormatPainterOutlined,
} from "@ant-design/icons";
import { GiCow, GiPlantRoots } from "react-icons/gi";
import { GrUserWorker } from "react-icons/gr";
import logoSomo from "../../../assets/logo_Somo.png";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { authServices } from "services/authServices";
import { toast } from "react-toastify";
import {
  useDesktopMediaQuery,
  useTabletMediaQuery,
} from 'common/hooks/responsive'
import Notification from 'features/pages/Notification'
import { useDispatch } from 'react-redux'
import { deleteHubConnection } from 'features/slice/hub/hubSlice'
import { changeAllNotifyNewToRead } from 'features/slice/notification/notificationIsNewSlice'
import { useSelector } from 'react-redux'
import { changeNotifyIsReadAll } from 'features/slice/notification/notificationReadSlice'
import { countNewNotify } from 'features/slice/notification/notificationCountSlice'
import SubMenu from 'antd/es/menu/SubMenu'

const { Sider } = Layout;

const SideMenu = () => {
  const [userName, setUserName] = useState();
  const [userRole, setUserRole] = useState();
  const location = useLocation();
  const dispatch = useDispatch();
  const isDesktop = useDesktopMediaQuery();
  const isTablet = useTabletMediaQuery();

  const countNew = useSelector((state) => state.notificationCount.data);

  useEffect(() => {
    dispatch(countNewNotify(authServices.getUserId()));
  }, [dispatch]);

  const changeReadAll = () => {
    dispatch(changeNotifyIsReadAll(authServices.getUserId()));
    console.log("SideMenu");
  };

  // Lớn
  const [open, setOpen] = useState(false);

  const showDrawer = () => {
    setOpen(true);
  };

  const showDrawerNotify = () => {
    dispatch(changeAllNotifyNewToRead(authServices.getUserId()));
    setOpen(true);
  };

  const onClose = () => {
    setOpen(false);
  };

  // Nhỏ
  const [openOnTablet, setOpenOnTablet] = useState(false);

  const showDrawerOnTablet = () => {
    setOpenOnTablet(true);
  };

  const showDrawerNotifyOnTablet = () => {
    dispatch(changeAllNotifyNewToRead(authServices.getUserId()));
    setOpenOnTablet(true);
  };

  const onCloseOnTablet = () => {
    setOpenOnTablet(false);
  };

  useEffect(() => {
    const role = authServices.getRole();
    setUserRole(role);
    const userName = authServices.getUserName();
    setUserName(userName);
  }, []);

  return (
    <div className="sider">
      {isDesktop && (
        <Sider
          theme="light"
          style={{
            overflow: "auto",
            height: "100vh",
            position: "fixed",
            left: 0,
            top: 0,
            bottom: 0,
          }}
        >
            <Link to="/" className="logoSomo">
              <img src={logoSomo} alt="logo" />
            </Link>
          <Menu
            theme="light"
            mode="inline"
            defaultSelectedKeys={[location.pathname]}
          >
            <Menu.Item key="/home">
              <CalendarOutlined />
              <span>Trang chủ</span>
              <Link to="/home"></Link>
            </Menu.Item>

            <Menu.Item key="/schedule">
              <CalendarOutlined />
              <span>Lịch trình</span>
              <Link to="/schedule"></Link>
            </Menu.Item>

            <SubMenu key="tasks" icon={<AimOutlined />} title="Công việc">
              <Menu.Item key="/task">
                <AimOutlined />
                <span>Công việc</span>
                <Link to="/task"></Link>
              </Menu.Item>
              <Menu.Item key="/task-type">
                <AimOutlined />
                <span>Loại công việc</span>
                <Link to="/task-type"></Link>
              </Menu.Item>
            </SubMenu>

            <SubMenu key="location" icon={<BorderOutlined />} title="Vị trí">
              <Menu.Item key="area">
                <BorderOutlined />
                <span>Khu vực</span>
                <Link to="/area"></Link>
              </Menu.Item>

              <Menu.Item key="zone">
                <TableOutlined />
                <span>Vùng</span>
                <Link to="/zone"></Link>
              </Menu.Item>
            </SubMenu>

            {/* Động vật */}
            <SubMenu key="animal" icon={<GiCow />} title="Động vật">
              <Menu.Item key="/animals">
                <GiCow />
                <span style={{ marginLeft: '10px' }}>Vật nuôi</span>
                <Link to="/animals"></Link>
              </Menu.Item>

              <Menu.Item key="/animal-type">
                <GiCow />
                <span style={{ marginLeft: '10px' }}>Loại vật nuôi</span>
                <Link to="/animal-type"></Link>
              </Menu.Item>

              <Menu.Item key="/animal-group">
                <AppstoreOutlined />
                <span>Chuồng</span>
                <Link to="/animal-group"></Link>
              </Menu.Item>
            </SubMenu>

            {/* Thực vật */}
            <SubMenu key="plant" icon={<GiPlantRoots />} title="Thực vật">
              <Menu.Item key="/plants">
                <GiPlantRoots />
                <span style={{ marginLeft: '10px' }}>Cây trồng</span>
                <Link to="/plants"></Link>
              </Menu.Item>

              <Menu.Item key="/plant-type">
                <GiPlantRoots />
                <span style={{ marginLeft: '10px' }}>Loại cây trồng</span>
                <Link to="/plant-type"></Link>
              </Menu.Item>

              <Menu.Item key="/crop-group">
                <AppstoreOutlined />
                <span>Vườn</span>
                <Link to="/crop-group"></Link>
              </Menu.Item>
            </SubMenu>

            <Menu.Item key="/material">
              <FormatPainterOutlined />
              <span>Công cụ</span>
              <Link to="/material"></Link>
            </Menu.Item>

            <Menu.Item key="/employee">
              <GrUserWorker />
              <span style={{ marginLeft: "10px" }}>Nhân viên</span>
              <Link to="/employee"></Link>
            </Menu.Item>
          </Menu>
        </Sider>
      )}
      {isTablet && (
        <div className="header-tablet">
            <Link to="/" className="logoSomo">
              <img src={logoSomo} alt="logo" />
            </Link>
          <div className="menu-popover">
            <Popover
              placement="bottomRight"
              content={
                <Menu
                  theme="light"
                  mode="inline"
                  defaultSelectedKeys={[location.pathname]}
                >
                  <Menu.Item key="/home">
                    <CalendarOutlined />
                    <span>Trang chủ</span>
                    <Link to="/home"></Link>
                  </Menu.Item>

                  <Menu.Item key="/schedule">
                    <CalendarOutlined />
                    <span>Lịch trình</span>
                    <Link to="/schedule"></Link>
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
                    <GiCow />
                    <span style={{ marginLeft: "10px" }}>Vật nuôi</span>
                    <Link to="/animals"></Link>
                  </Menu.Item>

                  <Menu.Item key="/animal-type">
                    <GiCow />
                    <span style={{ marginLeft: "10px" }}>Loại vật nuôi</span>
                    <Link to="/animal-type"></Link>
                  </Menu.Item>

                  <Menu.Item key="/animal-group">
                    <TeamOutlined />
                    <span>Chuồng</span>
                    <Link to="/animal-group"></Link>
                  </Menu.Item>

                  <Menu.Item key="/plants">
                    <GiPlantRoots />
                    <span style={{ marginLeft: "10px" }}>Cây trồng</span>
                    <Link to="/plants"></Link>
                  </Menu.Item>

                  <Menu.Item key="/plant-type">
                    <GiPlantRoots />
                    <span style={{ marginLeft: "10px" }}>Loại cây trồng</span>
                    <Link to="/plant-type"></Link>
                  </Menu.Item>

                  <Menu.Item key="/crop-group">
                    <DashboardOutlined />
                    <span>Vườn</span>
                    <Link to="/crop-group"></Link>
                  </Menu.Item>

                  <Menu.Item key="/material">
                    <FormatPainterOutlined />
                    <span>Công cụ</span>
                    <Link to="/material"></Link>
                  </Menu.Item>

                  <Menu.Item key="/employee">
                    <GrUserWorker />
                    <span style={{ marginLeft: "10px" }}>Nhân viên</span>
                    <Link to="/employee"></Link>
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
};

export default SideMenu;
