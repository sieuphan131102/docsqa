import React from "react";
import Home from "../Home/Home";
import { CloseOutlined, UserOutlined } from "@ant-design/icons";
import {
  HoverLink,
  RegisterModal,
  TextRegister,
  WrapperClose,
  WrapperGoLogin,
  WrapperLogin,
} from "./RegisterStyle";
import { Button, Flex, Input } from "antd";
import { useNavigate } from "react-router-dom";

const Register = () => {
  const navigate = useNavigate();
  const closeModal = () => {
    navigate("/");
  };
  return (
    <div>
      <Home />
      <WrapperLogin>
        <RegisterModal>
          <div>
            <WrapperClose onClick={closeModal}>
              <CloseOutlined />
            </WrapperClose>
            <WrapperGoLogin>
              Đã có tài khoản?{" "}
              <span>
                <HoverLink to={"/login"}>Đăng nhập</HoverLink>
              </span>
            </WrapperGoLogin>
          </div>
          <Flex
            vertical
            align="center"
            style={{ paddingTop: "152px", width: "100%" }}
          >
            <TextRegister>Đăng ký tài khoản DocSQA</TextRegister>
            <form action="" style={{ width: "500px" }}>
              <Input
                style={{ marginBottom: "12px" }}
                size="large"
                placeholder="Nhập tên tài khoản..."
                prefix={<UserOutlined />}
              />
              <Input.Password
                style={{ marginBottom: "12px" }}
                size="large"
                placeholder="Nhập mật khẩu..."
              />
              <Input.Password
                style={{ marginBottom: "24px" }}
                size="large"
                placeholder="Nhập lại mật khẩu..."
              />
              <Button
                style={{ width: "100%", marginBottom: "12px" }}
                size="large"
                type="primary"
              >
                Đăng ký
              </Button>
            </form>
          </Flex>
        </RegisterModal>
      </WrapperLogin>
    </div>
  );
};

export default Register;
