import React, { useState } from "react";

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
import * as message from "../../components/Message/Message";
import axios from "axios";

const Login = () => {
  const navigate = useNavigate();
  const closeModal = () => {
    navigate("/");
  };

  const [inputValue, setInputValue] = useState({
    userName: "",
    password: "",
  });

  const { userName, password } = inputValue;

  const handleOnChange = (e) => {
    const { name, value } = e.target;
    setInputValue({
      ...inputValue,
      [name]: value,
    });
  };

  const handleError = (err) => message.error(err);

  const handleSuccess = (msg) => message.success(msg);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.post(
        `${process.env.REACT_APP_API_URL}/user/login`,
        {
          ...inputValue,
        },
        { withCredentials: true }
      );
      const { status, message, access_token } = data;

      if (access_token) {
        localStorage.setItem("access_token", access_token);
      }

      if (status !== "ERROR") {
        handleSuccess(message);
        setTimeout(() => {
          navigate("/");
        }, 1000);
      } else {
        handleError(message);
      }
    } catch (error) {
      console.log(error);
    }
    setInputValue({
      ...inputValue,
      password: "",
    });
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
                onChange={handleOnChange}
                value={userName}
                name="userName"
                style={{ marginBottom: "12px" }}
                size="large"
                placeholder="Nhập tên tài khoản..."
                prefix={<UserOutlined />}
              />
              <Input.Password
                onChange={handleOnChange}
                value={password}
                name="password"
                style={{ marginBottom: "24px" }}
                size="large"
                placeholder="Nhập mật khẩu..."
              />
              <Button
                style={{ width: "100%", marginBottom: "12px" }}
                size="large"
                type="primary"
                onClick={handleSubmit}
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
