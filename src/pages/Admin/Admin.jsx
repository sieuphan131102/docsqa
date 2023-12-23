import { Menu } from "antd";
import React, { useState } from "react";
import { UserOutlined, BookOutlined } from "@ant-design/icons";
import { Container } from "./AdminStyle";
import AdminUser from "../../components/AdminComponent/AdminUser";
import AdminDoc from "../../components/AdminComponent/AdminDoc";

function getItem(label, key, icon, children, type) {
  return {
    key,
    icon,
    children,
    label,
    type,
  };
}

const items = [
  getItem("Quản lý người dùng", "user", <UserOutlined />),
  getItem("Quản lý tài liệu", "doc", <BookOutlined />),
];

const Admin = () => {
  const [keySelected, setKeySelected] = useState("user");

  const handleClick = (e) => {
    setKeySelected(e.key);
  };

  const renderPage = (key) => {
    switch (key) {
      case "user":
        return <AdminUser />;
      case "doc":
        return <AdminDoc />;
      default:
        return <AdminUser />;
    }
  };

  return (
    <div style={{ backgroundColor: "#eeefff" }}>
      <Container>
        <Menu
          selectedKeys={keySelected}
          onClick={handleClick}
          mode="inline"
          style={{
            width: 256,
          }}
          items={items}
        />
        <div style={{ width: "100%" }}>{renderPage(keySelected)}</div>
      </Container>
    </div>
  );
};

export default Admin;
