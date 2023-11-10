import React, { useEffect, useState } from 'react'

import { Button, Layout, Menu, Popover } from 'antd'
import {
  DashboardOutlined,
  TeamOutlined,
  CalendarOutlined,
  AimOutlined,
  BorderOutlined,
  BlockOutlined,
  TableOutlined,
  MenuOutlined,
  AppstoreOutlined,
  LogoutOutlined,
  FormatPainterOutlined,
} from '@ant-design/icons'
import logoSomo from '../../../assets/logo_Somo.png'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { authServices } from 'services/authServices'
import { toast } from 'react-toastify'
import {
  useDesktopMediaQuery,
  useTabletMediaQuery,
} from 'common/hooks/responsive'

const { Sider } = Layout

const AdminSideMenu = () => {
  const [userName, setUserName] = useState()
  const [userRole, setUserRole] = useState()
  const [collapsed, setCollapsed] = useState(false)
  const location = useLocation()
  const navigate = useNavigate()

  const isDesktop = useDesktopMediaQuery()
  const isTablet = useTabletMediaQuery()

  useEffect(() => {
    const role = authServices.getRole()
    setUserRole(role)
    const userName = authServices.getUserName()
    setUserName(userName)
  }, [])

  const logout = () => {
    authServices.logOut()
    toast.success('Đăng xuất thành công')
    navigate('/login')
  }

  return (
    <div className="sider">
      {isDesktop && (
        <Sider
          theme="dark"
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
            theme="dark"
            mode="inline"
            defaultSelectedKeys={[location.pathname]}
          >
            <Menu.Item key="/dashboard">
              <BorderOutlined />
              <span>Tổng quan</span>
              <Link to="/dashboard"></Link>
            </Menu.Item>

            <Menu.Item key="/statistic-task">
              <AimOutlined />
              <span>Công việc</span>
              <Link to="/statistic-task"></Link>
            </Menu.Item>

            <Menu.Item key="/statistic-farm">
              <BorderOutlined />
              <span>Trang trại</span>
              <Link to="/statistic-farm"></Link>
            </Menu.Item>

            <Menu.Item key="/statistic-area">
              <BorderOutlined />
              <span>Khu vực</span>
              <Link to="/statistic-area"></Link>
            </Menu.Item>

            <Menu.Item key="/statistic-zone">
              <TableOutlined />
              <span>Vùng</span>
              <Link to="/statistic-zone"></Link>
            </Menu.Item>

            {/* <Menu.Item key="/statistic-animal">
              <TeamOutlined />
              <span>Vật nuôi</span>
              <Link to="/statistic-animal"></Link>
            </Menu.Item> */}

            <Menu.Item key="/statistic-animal-group">
              <AppstoreOutlined />
              <span>Chuồng</span>
              <Link to="/statistic-animal-group"></Link>
            </Menu.Item>

            {/* <Menu.Item key="/statistic-plant">
              <DashboardOutlined />
              <span>Cây trồng</span>
              <Link to="/statistic-plant"></Link>
            </Menu.Item> */}

            <Menu.Item key="/statistic-crop-group">
              <AppstoreOutlined />
              <span>Vườn</span>
              <Link to="/statistic-crop-group"></Link>
            </Menu.Item>

            <Menu.Item key="/statistic-material">
              <FormatPainterOutlined />
              <span>Công cụ</span>
              <Link to="/statistic-material"></Link>
            </Menu.Item>

            {/* <Menu.Item key="/statistic-member">
              <BorderOutlined />
              <span>Thành viên</span>
              <Link to="/statistic-member"></Link>
            </Menu.Item> */}

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
                  theme="dark"
                  mode="inline"
                  defaultSelectedKeys={[location.pathname]}
                >
                  <Menu.Item key="/dashboard">
                    <BorderOutlined />
                    <span>Tổng quan</span>
                    <Link to="/dashboard"></Link>
                  </Menu.Item>

                  <Menu.Item key="/statistic-farm">
                    <BorderOutlined />
                    <span>Trang trại</span>
                    <Link to="/statistic-farm"></Link>
                  </Menu.Item>

                  <Menu.Item key="/statistic-task">
                    <AimOutlined />
                    <span>Công việc</span>
                    <Link to="/statistic-task"></Link>
                  </Menu.Item>

                  <Menu.Item key="/statistic-area">
                    <BorderOutlined />
                    <span>Khu vực</span>
                    <Link to="/statistic-area"></Link>
                  </Menu.Item>

                  <Menu.Item key="/statistic-zone">
                    <TableOutlined />
                    <span>Vùng</span>
                    <Link to="/statistic-zone"></Link>
                  </Menu.Item>

                  <Menu.Item key="/statistic-animal">
                    <TeamOutlined />
                    <span>Vật nuôi</span>
                    <Link to="/statistic-animal"></Link>
                  </Menu.Item>

                  <Menu.Item key="/statistic-animal-group">
                    <AppstoreOutlined />
                    <span>Chuồng</span>
                    <Link to="/statistic-animal-group"></Link>
                  </Menu.Item>

                  <Menu.Item key="/statistic-plant">
                    <DashboardOutlined />
                    <span>Cây trồng</span>
                    <Link to="/statistic-plant"></Link>
                  </Menu.Item>

                  <Menu.Item key="/statistic-crop-group">
                    <AppstoreOutlined />
                    <span>Vườn</span>
                    <Link to="/statistic-crop-group"></Link>
                  </Menu.Item>

                  <Menu.Item key="/statistic-material">
                    <FormatPainterOutlined />
                    <span>Công cụ</span>
                    <Link to="/statistic-material"></Link>
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

export default AdminSideMenu
