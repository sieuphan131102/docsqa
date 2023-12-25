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
import { useDispatch, useSelector } from "react-redux";
import { resetUser } from "../../redux/slices/userSlice";
import { setSearchText } from "../../redux/slices/searchSlice";
import * as msg from "../Message/Message";

const Header = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = useSelector((state) => state.user);
  const [username, setUsername] = useState(user?.userName);

  useEffect(() => {
    setUsername(user?.userName);
  }, [user?.userName]);

  const showLoginPage = () => {
    navigate("/login");
  };

  const showRegisterPage = () => {
    navigate("/register");
  };

  const handleLogout = () => {
    localStorage.removeItem("access_token");
    setUsername("");
    dispatch(resetUser(user));
    navigate("/login");
  };

  const handleGoProfile = () => {
    navigate(`/profile/${user?.id}`);
  };

  const handleSearch = (value) => {
    if (value) {
      localStorage.setItem("search", value);
      dispatch(setSearchText(value));
      navigate("/search-result");
    } else {
      msg.warning("Nhập từ khóa!");
    }
  };

  return (
    <Container>
      <WrapperHeader>
        <Logo to={"/"}>
          <FilePdfOutlined />
          <TextLogo>DocSQA</TextLogo>
        </Logo>
        <SearchInput
          onSearch={handleSearch}
          bordered={false}
          placeholder="Nhập từ khóa..."
          enterButton={<SearchOutlined />}
        />
        {username ? (
          <div style={{ display: "flex", gap: "4px", alignItems: "center" }}>
            <WrapperUser onClick={handleGoProfile}>
              <Avatar
                size={40}
                src={`${process.env.REACT_APP_API_URL}/avatar/${
                  user?.avatar || "avatar.jpg"
                }`}
              />
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
