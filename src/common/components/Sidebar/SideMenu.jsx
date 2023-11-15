import React, { useEffect, useState } from 'react'

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
} from 'antd'
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
} from '@ant-design/icons'
import { GiCow, GiPlantRoots } from 'react-icons/gi'
import { GrUserWorker } from 'react-icons/gr'
import logoSomo from '../../../assets/logo_Somo.png'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { authServices } from 'services/authServices'
import { toast } from 'react-toastify'
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

const { Sider } = Layout

const SideMenu = () => {
  const [userName, setUserName] = useState()
  const [userRole, setUserRole] = useState()
  const [collapsed, setCollapsed] = useState(false)
  const location = useLocation()
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const isDesktop = useDesktopMediaQuery()
  const isTablet = useTabletMediaQuery()

  const countNew = useSelector((state) => state.notificationCount.data)

  useEffect(() => {
    dispatch(countNewNotify(authServices.getUserId()))
  }, [dispatch])

  const changeReadAll = () => {
    dispatch(changeNotifyIsReadAll(authServices.getUserId()))
    console.log('SideMenu')
  }

  // Lớn
  const [open, setOpen] = useState(false)

  const showDrawer = () => {
    setOpen(true)
  }

  const showDrawerNotify = () => {
    dispatch(changeAllNotifyNewToRead(authServices.getUserId()))
    setOpen(true)
  }

  const onClose = () => {
    setOpen(false)
  }

  // Nhỏ
  const [openOnTablet, setOpenOnTablet] = useState(false)

  const showDrawerOnTablet = () => {
    setOpenOnTablet(true)
  }

  const showDrawerNotifyOnTablet = () => {
    dispatch(changeAllNotifyNewToRead(authServices.getUserId()))
    setOpenOnTablet(true)
  }

  const onCloseOnTablet = () => {
    setOpenOnTablet(false)
  }

  useEffect(() => {
    const role = authServices.getRole()
    setUserRole(role)
    const userName = authServices.getUserName()
    setUserName(userName)
  }, [])

  const logout = () => {
    const data = { token: localStorage.getItem('connectionId') }
    dispatch(deleteHubConnection(data))
    authServices.logOut()
    toast.success('Đăng xuất thành công')
    navigate('/login')
  }

  return (
    <div className="sider">
      {isDesktop && (
        <Sider
          theme="light"
          style={{
            overflow: 'auto',
            height: '100vh',
            position: 'fixed',
            left: 0,
            top: 0,
            bottom: 0,
          }}
        >
          <div className="logoSomo">
            <img src={logoSomo} alt="logo" />
          </div>
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

            {countNew?.data !== 0 ? (
              <>
                <Menu.Item onClick={showDrawerNotify}>
                  <Badge.Ribbon text={countNew?.data} color="red">
                    <BellOutlined />
                    <span>Thông báo</span>
                  </Badge.Ribbon>
                </Menu.Item>
              </>
            ) : (
              <>
                <Menu.Item onClick={showDrawer}>
                  <BellOutlined />
                  <span>Thông báo</span>
                </Menu.Item>
              </>
            )}

            <Drawer
              title="Thông báo"
              placement="right"
              onClose={onClose}
              open={open}
            >
              {countNew?.data !== 0 ? (
                <>
                  <Popconfirm
                    title="Đánh dấu tất cả đã đọc"
                    description="Bạn có chắc đánh dấu tất cả đã đọc ?"
                    onConfirm={() => changeReadAll()}
                    // onCancel={cancel}
                    okText="Có"
                    cancelText="Không"
                  >
                    <BellOutlined
                      style={{
                        fontSize: '20px',
                        marginLeft: '90%',
                        color: 'red',
                      }}
                      // onClick={() => console.log('ss')}
                    />
                  </Popconfirm>
                </>
              ) : (
                <>
                  <BellOutlined
                    style={{
                      fontSize: '20px',
                      marginLeft: '90%',
                    }}
                    disabled
                  />
                </>
              )}
              <Notification />
            </Drawer>

            <Menu.Item key="/task">
              <AimOutlined />
              <span>Công việc</span>
              <Link to="/task"></Link>
            </Menu.Item>

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
              <span style={{ marginLeft: '10px' }}>Nhân viên</span>
              <Link to="/employee"></Link>
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
            <img src={logoSomo} alt="logo" />
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

                  {countNew?.data?.length !== 0 ? (
                    <>
                      <Menu.Item onClick={showDrawerNotifyOnTablet}>
                        <Badge.Ribbon text={countNew?.data} color="red">
                          <BellOutlined />
                          <span>Thông báo</span>
                        </Badge.Ribbon>
                      </Menu.Item>
                    </>
                  ) : (
                    <>
                      <Menu.Item onClick={showDrawerOnTablet}>
                        <BellOutlined />
                        <span>Thông báo</span>
                      </Menu.Item>
                    </>
                  )}

                  <Drawer
                    title="Thông báo"
                    placement="right"
                    onClose={onCloseOnTablet}
                    open={openOnTablet}
                  >
                    <BellOutlined
                      style={{ fontSize: '20px', marginLeft: '90%' }}
                      onClick={() => console.log('ss')}
                    />
                    <Notification />
                  </Drawer>

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
                    <span style={{ marginLeft: '10px' }}>Vật nuôi</span>
                    <Link to="/animals"></Link>
                  </Menu.Item>

                  <Menu.Item key="/animal-type">
                    <GiCow />
                    <span style={{ marginLeft: '10px' }}>Loại vật nuôi</span>
                    <Link to="/animal-type"></Link>
                  </Menu.Item>

                  <Menu.Item key="/animal-group">
                    <TeamOutlined />
                    <span>Chuồng</span>
                    <Link to="/animal-group"></Link>
                  </Menu.Item>

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
                    <span style={{ marginLeft: '10px' }}>Nhân viên</span>
                    <Link to="/employee"></Link>
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
  )
}

export default SideMenu
