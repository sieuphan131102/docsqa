import React from "react";

import Home from "../Home/Home";
import {
  HoverLink,
  LoginModal,
  TextLogin,
  WrapperClose,
  WrapperLogin,
  WrapperRegisterNew,
} from "./LoginStyle";
import { CloseOutlined, UserOutlined } from "@ant-design/icons";
import { Button, Flex, Input } from "antd";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const navigate = useNavigate();
  const closeModal = () => {
    navigate("/");
  };
  return (
    <div>
      <Home />
      <WrapperLogin>
        <LoginModal>
          <div>
            <WrapperClose onClick={closeModal}>
              <CloseOutlined />
            </WrapperClose>
            <WrapperRegisterNew>
              Không có tài khoản?{" "}
              <span>
                <HoverLink to={"/register"}>Đăng ký</HoverLink>
              </span>
            </WrapperRegisterNew>
          </div>
          <Flex
            vertical
            align="center"
            style={{ paddingTop: "152px", width: "100%" }}
          >
            <TextLogin>Đăng nhập vào DocSQA</TextLogin>
            <form action="" style={{ width: "500px" }}>
              <Input
                style={{ marginBottom: "12px" }}
                size="large"
                placeholder="Nhập tên tài khoản..."
                prefix={<UserOutlined />}
              />
              <Input.Password
                style={{ marginBottom: "24px" }}
                size="large"
                placeholder="Nhập mật khẩu..."
              />
              <Button
                style={{ width: "100%", marginBottom: "12px" }}
                size="large"
                type="primary"
              >
                Đăng nhập
              </Button>
            </form>
            <a href="#reset">Quên mật khẩu?</a>
          </Flex>
        </LoginModal>
      </WrapperLogin>
    </div>
  );
};

export default Login;
