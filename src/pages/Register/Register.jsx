import React, { useState } from "react";
import Home from "../Home/Home";
import { CloseOutlined, UserOutlined } from "@ant-design/icons";
import {
  HoverLink,
  RegisterModal,
  TextRegister,
  WrapperClose,
  WrapperGoLogin,
  WrapperRegister,
} from "./RegisterStyle";
import { Button, Flex, Input } from "antd";
import { useNavigate } from "react-router-dom";
import * as message from "../../components/Message/Message";
import axios from "axios";

const Register = () => {
  const navigate = useNavigate();
  const closeModal = () => {
    navigate("/");
  };

  const [inputValue, setInputValue] = useState({
    userName: "",
    password: "",
    confirmPassword: "",
  });

  const { userName, password, confirmPassword } = inputValue;

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
        `${process.env.REACT_APP_API_URL}/user/register`,
        {
          ...inputValue,
        },
        { withCredentials: true }
      );
      const { status, message } = data;
      if (status !== "ERROR") {
        handleSuccess(message);
        setTimeout(() => {
          navigate("/login");
        }, 1000);
      } else {
        handleError(message);
      }
    } catch (error) {
      console.log(error);
    }
    setInputValue({
      ...inputValue,
      confirmPassword: "",
      password: "",
    });
  };

  return (
    <div>
      <Home />
      <WrapperRegister>
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
            <form style={{ width: "500px" }}>
              <Input
                value={userName}
                name="userName"
                onChange={handleOnChange}
                style={{ marginBottom: "12px" }}
                size="large"
                placeholder="Nhập tên tài khoản..."
                prefix={<UserOutlined />}
              />
              <Input.Password
                value={password}
                name="password"
                onChange={handleOnChange}
                style={{ marginBottom: "12px" }}
                size="large"
                placeholder="Nhập mật khẩu..."
              />
              <Input.Password
                value={confirmPassword}
                name="confirmPassword"
                onChange={handleOnChange}
                style={{ marginBottom: "24px" }}
                size="large"
                placeholder="Nhập lại mật khẩu..."
              />
              <Button
                style={{ width: "100%", marginBottom: "12px" }}
                size="large"
                type="primary"
                onClick={handleSubmit}
              >
                Đăng ký
              </Button>
            </form>
          </Flex>
        </RegisterModal>
      </WrapperRegister>
    </div>
  );
};

export default Register;
