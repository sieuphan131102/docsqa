import React, { useEffect, useState } from "react";

import {
  AccountGroup,
  Container,
  Logo,
  SearchInput,
  TextLogo,
  WrapperHeader,
  WrapperUser,
} from "./HeaderStyle";
import { FilePdfOutlined, SearchOutlined } from "@ant-design/icons";
import { Avatar, Button } from "antd";
import { useNavigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";
import axios from "axios";

const Header = () => {
  const navigate = useNavigate();
  const showLoginPage = () => {
    navigate("/login");
  };

  const showRegisterPage = () => {
    navigate("/register");
  };

  const [username, setUsername] = useState("");

  useEffect(() => {
    const accessToken = localStorage.getItem("access_token");
    if (accessToken) {
      const decode = jwtDecode(accessToken);
      if (decode?.id) {
        getUserById(decode?.id, accessToken);
      }
    }
  });

  const getUserById = async (id, token) => {
    const { data } = await axios.get(
      `${process.env.REACT_APP_API_URL}/user/get/${id}`,
      {
        headers: {
          token: `Bearer ${token}`,
        },
      }
    );
    let userName = data.data.userName;
    setUsername(userName);
  };

  const handleLogout = () => {
    localStorage.removeItem("access_token");
    setUsername("");
    navigate("/login");
  };

  return (
    <Container>
      <WrapperHeader>
        <Logo to={"/"}>
          <FilePdfOutlined />
          <TextLogo>DocSQA</TextLogo>
        </Logo>
        <Button
          size="large"
          style={{ fontSize: "16px", borderRadius: "28px", fontWeight: "500" }}
        >
          Tải lên
        </Button>
        <SearchInput
          bordered={false}
          placeholder="Nhập từ khóa..."
          enterButton={<SearchOutlined />}
        />
        {username ? (
          <div style={{ display: "flex", gap: "4px", alignItems: "center" }}>
            <WrapperUser>
              <Avatar size={40}>{username.slice(0, 1)}</Avatar>
              {username}
            </WrapperUser>
            <Button size="small" onClick={handleLogout}>
              Đăng xuất
            </Button>
          </div>
        ) : (
          <AccountGroup>
            <Button
              onClick={showRegisterPage}
              size="large"
              style={{
                borderRadius: "28px",
                zIndex: "1",
                width: "120px",
                borderColor: "#0066ff",
              }}
            >
              Đăng ký
            </Button>
            <Button
              onClick={showLoginPage}
              size="large"
              style={{
                marginLeft: "-38px",
                paddingLeft: "42px",
                borderRadius: "28px",
                borderColor: "#0066ff",
              }}
            >
              Đăng nhập
            </Button>
          </AccountGroup>
        )}
      </WrapperHeader>
    </Container>
  );
};

export default Header;
