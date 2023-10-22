import React, { useEffect, useState } from 'react'

import { Layout, Menu } from 'antd'
import {
  DashboardOutlined,
  TeamOutlined,
  CalendarOutlined,
  AimOutlined,
  BorderOutlined,
  BlockOutlined,
  LogoutOutlined,
} from '@ant-design/icons'

import { Link, useLocation, useNavigate } from 'react-router-dom'
import { authServices } from 'services/authServices'
import { toast } from 'react-toastify'

const { Sider } = Layout

const SideMenu = () => {
  const [userName, setUserName] = useState()
  const [userRole, setUserRole] = useState()
  const [collapsed, setCollapsed] = useState(false)
  const location = useLocation()

  useEffect(() => {
    const role = authServices.getRole()
    setUserRole(role)
    const userName = authServices.getUserName()
    setUserName(userName)
  }, [])

  const logout = () => {
    authServices.logOut()
    toast.success('Đăng xuất thành công')
  }

  
  const onCollapse = (collapsed) => setCollapsed(collapsed)
  return (
    <Sider collapsible collapsed={collapsed} onCollapse={onCollapse}>
      <div className="logo" />
      <Menu
        theme="dark"
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
  )
}

export default SideMenu
