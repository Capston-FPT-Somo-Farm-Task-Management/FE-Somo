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

const SideMenu = () => {
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
              <TableOutlined />
              <span>Vùng</span>
              <Link to="/zone"></Link>
            </Menu.Item>

            <Menu.Item key="/animals">
              <TeamOutlined />
              <span>Vật nuôi</span>
              <Link to="/animals"></Link>
            </Menu.Item>

            <Menu.Item key="/animal-group">
              <AppstoreOutlined />
              <span>Chuồng</span>
              <Link to="/animal-group"></Link>
            </Menu.Item>

            <Menu.Item key="/plants">
              <DashboardOutlined />
              <span>Cây trồng</span>
              <Link to="/plants"></Link>
            </Menu.Item>

            <Menu.Item key="/crop-group">
              <AppstoreOutlined />
              <span>Vườn</span>
              <Link to="/crop-group"></Link>
            </Menu.Item>

            <Menu.Item key="/material">
              <FormatPainterOutlined />
              <span>Công cụ</span>
              <Link to="/material"></Link>
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

                  <Menu.Item key="/material">
                    <FormatPainterOutlined />
                    <span>Công cụ</span>
                    <Link to="/material"></Link>
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
