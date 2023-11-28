import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import {
  UserOutlined,
  BellOutlined,
  DownOutlined,
  EditOutlined,
  UploadOutlined,
} from '@ant-design/icons'
import {
  Dropdown,
  Avatar,
  Space,
  Modal,
  Button,
  Form,
  Input,
  Popover,
  Upload,
  Badge,
  Menu,
} from 'antd'
import { useSelector, useDispatch } from 'react-redux'
import { deleteHubConnection } from 'features/slice/hub/hubSlice'
import { authServices } from 'services/authServices'
import { toast } from 'react-toastify'
import dayjs from 'dayjs'
import { updateMember } from 'features/slice/user/memberSlice'
import Notification from 'features/pages/Notification'
import { changeAllNotifyNewToRead } from 'features/slice/notification/notificationIsNewSlice'

function HeaderComp() {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const [isModalVisible, setIsModalVisible] = useState(false)
  const [isModalEditVisible, setIsModalEditVisible] = useState(false)
  // const [isNotificationVisible, setIsNotificationVisible] = useState(false)
  const [fileList, setFileList] = useState([])

  const member = useSelector((state) => state.member.data)
  const countNew = useSelector((state) => state.notificationCount.data)
  const loading = useSelector((state) => state.member.loading)

  useEffect(() => {
    if (member?.avatar) {
      setFileList([
        {
          uid: '-1',
          name: 'image.png',
          status: 'done',
          url: member.avatar,
        },
      ])
    }
  }, [member])

  const onFileChange = ({ fileList: newFileList }) => {
    setFileList(newFileList)
  }

  const handleOpenEditProfile = () => {
    setIsModalEditVisible(true)
    setIsModalVisible(false)
  }

  const closeEditProfile = () => {
    setIsModalEditVisible(false)
    setIsModalVisible(true)
  }

  const showModal = () => {
    setIsModalVisible(true)
  }

  const handleCancel = () => {
    setIsModalVisible(false)
  }

  const formattedBirthDay = member
    ? dayjs(member.birthday).format('DD-MM-YYYY')
    : null

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

  const handleEditProfile = (values) => {
    const updatedEffort = {
      ...values,
      id: member.id,
      imageFile: fileList[0].originFileObj,
    }

    dispatch(updateMember(updatedEffort)).then(() => {
      setIsModalEditVisible(false)
      setIsModalVisible(true)
    })
  }

  const changeNewToRead = () => {
    // dispatch(changeAllNotifyNewToRead(authServices.getUserId()))
  }

  return (
    <>
      <nav className="navBar">
        <div className="nav-item">
          <div className="header-notification">
            {!loading ? (
              <Popover
                placement="bottomRight"
                title={<h3>Thông báo</h3>}
                content={
                  <div
                    style={{
                      height: '500px',
                      overflowY: 'auto',
                      padding: '10px',
                    }}
                  >
                    <Notification />
                  </div>
                }
                trigger="click"
                // onVisibleChange={(visible) => setIsNotificationVisible(visible)}
                // open={isNotificationVisible}
              >
                <Badge count={countNew?.data !== 0 ? countNew.data : 0}>
                  <BellOutlined
                    className="notification-icon"
                    onClick={changeNewToRead}
                  />
                </Badge>
              </Popover>
            ) : null}
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
                {!loading ? (
                  <Space>
                    <Avatar
                      src={member.avatar}
                      size="large"
                      icon={<UserOutlined />}
                    />
                    {member.name}
                    <DownOutlined />
                  </Space>
                ) : null}
              </a>
            </Dropdown>
          </div>
          <Modal
            open={isModalVisible}
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
                <h5>
                  Thông tin cá nhân
                  <span onClick={handleOpenEditProfile}>
                    <EditOutlined />
                  </span>
                </h5>

                <div className="user-information">
                  <div
                    className="user-information-text"
                    style={{ width: '100%' }}
                  >
                    <h6>Email</h6>
                    <p>{member.email}</p>
                  </div>
                  <div className="user-information-text">
                    <h6>Số điện thoại</h6>
                    <p>{member.phoneNumber}</p>
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
          {isModalEditVisible && (
            <Modal
              title="Sửa thông tin"
              open={isModalEditVisible}
              onCancel={closeEditProfile}
              footer={[
                <Button form="updateEffort" type="primary" htmlType="submit">
                  Lưu thay đổi
                </Button>,
                <Button type="primary" onClick={closeEditProfile}>
                  Đóng
                </Button>,
              ]}
            >
              <Form
                layout="vertical"
                onFinish={handleEditProfile}
                id="updateEffort"
              >
                <Form.Item label="Hình ảnh" name="imageFile">
                  <Upload
                    listType="picture-circle"
                    maxCount={1}
                    beforeUpload={() => false}
                    fileList={fileList}
                    onChange={onFileChange}
                    onRemove="false"
                  >
                    <UploadOutlined />
                  </Upload>
                </Form.Item>
                <Form.Item
                  label="Tên"
                  name="name"
                  initialValue={member ? member.name : null}
                >
                  <Input placeholder="Nhập tên" />
                </Form.Item>
                <Form.Item
                  label="Mã"
                  name="code"
                  initialValue={member ? member.code : null}
                >
                  <Input placeholder="Nhập tên" disabled />
                </Form.Item>
                <Form.Item
                  label="Email"
                  name="email"
                  initialValue={member ? member.email : null}
                >
                  <Input placeholder="Nhập email" />
                </Form.Item>
                <Form.Item
                  label="Số điện thoại"
                  name="phoneNumber"
                  initialValue={member ? member.phoneNumber : null}
                >
                  <Input placeholder="Nhập số điện thoại" />
                </Form.Item>
                <Form.Item
                  label="Ngày sinh"
                  name="birthday"
                  initialValue={member ? member.birthday : null}
                >
                  <Input placeholder="Nhập ngày tháng năm sinh" />
                </Form.Item>
                <Form.Item
                  label="Địa chỉ thường trú"
                  name="address"
                  initialValue={member ? member.address : null}
                >
                  <Input placeholder="Nhập địa chỉ thường trú" />
                </Form.Item>
              </Form>
            </Modal>
          )}
        </div>
      </nav>
    </>
  )
}

export default HeaderComp
