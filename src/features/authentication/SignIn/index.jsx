import React from "react";
import { Form, Button, Input } from "antd";
import { LockOutlined, UserOutlined } from "@ant-design/icons";
import { Link, useNavigate } from "react-router-dom";
import logoSomo from "../../../assets/logo_Somo.png";
import { postLogin } from "features/slice/user/userSlice";
import { useDispatch } from "react-redux";
import { authServices } from "services/authServices";

const SignIn = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const onFinish = (values) => {
    dispatch(postLogin(values)).then(() => {
      if (authServices.getRole() === "Manager") {
        navigate("/");
      } else if (authServices.getRole() === "Admin") {
        navigate("/");
      }
    });
  };

  return (
    <>
      <div className="wrapper fadeInDown">
        <div id="formContent">
          <h2 className="active">Đăng nhập</h2>
          <h2 className="inactive underlineHover">Đăng ký</h2>
          <div className="fadeIn first">
            <img src={logoSomo} id="icon" alt="User Icon" />
          </div>

          <Form name="login" className="login-form" onFinish={onFinish} >
            <Form.Item
              name="username"
              rules={[
                {
                  required: true,
                  message: "Please enter your username",
                },
              ]}
              style={{margin: 0}}
            >
              <Input
                className="fadeIn second"
                placeholder="Tên đăng nhập"
              />
            </Form.Item>
            <Form.Item
              name="password"
              rules={[
                {
                  required: true,
                  message: "Please enter your password",
                },
              ]}
            >
              <Input
                className="fadeIn third"
                type="password"
                placeholder="Mật khẩu"
              />
            </Form.Item>
            <Form.Item>
              <Button
                type="primary"
                htmlType="submit"
                className="btn-login"
                style={{margin: 0}}
              >
                Đăng nhập
              </Button>
            </Form.Item>
          </Form>
          <div id="formFooter">
            <Link className="underlineHover" to="/forgot">
              Quên mật khẩu ?
            </Link>
          </div>
        </div>
      </div>
    </>
  );
};

export default SignIn;
