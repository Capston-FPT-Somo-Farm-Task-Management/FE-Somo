import React from 'react'
import { Form, Button, Input } from 'antd'
import { LockOutlined, UserOutlined } from '@ant-design/icons'
import { Link, useNavigate } from 'react-router-dom'

import { postLogin } from 'features/slice/user/userSlice'
import { useDispatch } from 'react-redux'
import { authServices } from 'services/authServices'

const SignIn = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const onFinish = (values) => {
    dispatch(postLogin(values)).then(() => {
      if (authServices.getRole() === 'Manager') {
        navigate('/')
      } else if (authServices.getRole() === 'Admin') {
        navigate('/')
      }
    })
  }

  return (
    <div>
      <h1>Đăng nhập</h1>
      <Form name="login" className="login-form" onFinish={onFinish}>
        <Form.Item
          name="username"
          rules={[
            {
              required: true,
              message: 'Please enter your username',
            },
          ]}
        >
          <Input
            prefix={<UserOutlined className="site-form-item-icon" />}
            placeholder="Username"
          />
        </Form.Item>
        <Form.Item
          name="password"
          rules={[
            {
              required: true,
              message: 'Please enter your password',
            },
          ]}
        >
          <Input
            prefix={<LockOutlined className="site-form-item-icon" />}
            type="password"
            placeholder="Password"
          />
        </Form.Item>
        <Form.Item>
          <Link to="/forgot">Forgot password</Link>
        </Form.Item>
        <Form.Item>
          <Button
            type="primary"
            htmlType="submit"
            className="login-form-button"
          >
            Log in
          </Button>
        </Form.Item>
      </Form>
    </div>
  )
}

export default SignIn
