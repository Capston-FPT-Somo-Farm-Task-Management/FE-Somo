import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { UserOutlined, BellOutlined, DownOutlined } from '@ant-design/icons'
import { Dropdown, Avatar, Space, Modal } from 'antd'
import { useSelector, useDispatch } from 'react-redux'
import { deleteHubConnection } from 'features/slice/hub/hubSlice'
import { authServices } from 'services/authServices'
import { toast } from 'react-toastify'
import dayjs from 'dayjs'

function HeaderComp() {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const [isModalVisible, setIsModalVisible] = useState(false)
  const member = useSelector((state) => state.member.data)
  console.log(member)

  const showModal = () => {
    setIsModalVisible(true)
  }

  const handleCancel = () => {
    setIsModalVisible(false)
  }

  const formattedBirthDay = dayjs(member.birthday).format('DD-MM-YYYY')

  const logout = () => {
    const data = { token: localStorage.getItem('connectionId') }
    dispatch(deleteHubConnection(data))
    authServices.logOut()
    toast.success('Đăng xuất thành công')
    navigate('/login')
  }

  const items = [
    {
      key: 'profile',
      label: <div onClick={showModal}>Xem thông tin</div>,
    },
    {
      key: 'logout',
      label: (
        <div key="/login" onClick={logout}>
          <span>Đăng xuất</span>
          <Link to="/login"></Link>
        </div>
      ),
    },
  ]

  return (
    <>
      <nav className="navBar">
        <div className="navRight">
          <div className="header-notification">
            <Dropdown
              menu={{
                items,
              }}
              trigger={['hover']}
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
              trigger={['hover']}
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
                  <DownOutlined />
                </Space>
              </a>
            </Dropdown>
          </div>
          <Modal
            visible={isModalVisible}
            onCancel={handleCancel}
            width={800}
            footer={null}
            className="modal-user-profile"
          >
            <div className="user-profile">
              <div className="user-profile-left">
                <Avatar src={member.avatar} size={150} />
                <h4>{member.name}</h4>
                {member.roleName === 'Manager' ? <p>Chức vụ: Quản lý</p> : null}
              </div>
              <div className="user-profile-right">
                <h5>Thông tin cá nhân</h5>
                <div className="user-information">
                  <div className="user-information-text">
                    <h6>Email</h6>
                    <p>{member.email}</p>
                  </div>
                  <div className="user-information-text">
                    <h6>Số điện thoại</h6>
                    <p>{member.phoneNumber}</p>
                  </div>
                  <div className="user-information-text">
                    <h6>Trang trại</h6>
                    <p>{member.farmName}</p>
                  </div>
                  <div className="user-information-text">
                    <h6>Ngày sinh</h6>
                    <p>{formattedBirthDay}</p>
                  </div>
                </div>
                <h5>Địa chỉ</h5>
                <div className="user-address">
                  <div className="user-information-text">
                    <h6>Địa chỉ thường trú</h6>
                    <p>{member.address}</p>
                  </div>
                </div>
              </div>
            </div>
          </Modal>
        </div>
      </nav>
    </>
  )
}

export default HeaderComp
