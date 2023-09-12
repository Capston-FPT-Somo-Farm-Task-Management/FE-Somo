import React from 'react'
import LogoSomo from '../../../assets/logo_Somo.png'
import { CaretDownOutlined } from '@ant-design/icons'
import { Dropdown, Space, Select, Input } from 'antd'
import { quickAdd, themeMode, userName, userDropdown } from './headerData'

function Header() {
  const handleChange = (value) => {
    console.log(`selected ${value}`)
  }
  const { Search } = Input
  const onSearch = (value, _e, info) => console.log(info?.source, value)

  return (
    <>
      <nav className="navBar">
        <div className="navLeft">
          {/* Logo */}
          <div className="logo">
            <img src={LogoSomo} alt="" />
          </div>

          {/* Search */}
          <div className="searchBar">
            <Space direction="vertical">
              <Search
                placeholder="Tìm kiếm"
                allowClear
                onSearch={onSearch}
                style={{
                  marginLeft: '15px',
                  width: 300,
                }}
              />
            </Space>
          </div>
        </div>

        <div className="navRight">
          {/* quickAdd */}
          <div className="quickAdd">
            <Select
              defaultValue="quickAdd"
              style={{
                width: 150,
              }}
              onChange={handleChange}
              options={quickAdd}
            />
          </div>

          {/* userDropdown */}
          <div className="profile">
            <Dropdown menu={{ items: userDropdown }} trigger={['click']}>
              <a onClick={(e) => e.preventDefault()}>
                <Space>
                  {userName}
                  <CaretDownOutlined />
                </Space>
              </a>
            </Dropdown>
          </div>

          {/* themeMode */}
          <div className="themeMode">
            <Select
              defaultValue="lightMode"
              style={{
                width: 150,
              }}
              onChange={handleChange}
              options={themeMode}
            />
          </div>
        </div>
      </nav>
    </>
  )
}

export default Header
