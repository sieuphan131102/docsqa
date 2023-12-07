import React from "react";

import {
  AccountGroup,
  Container,
  Logo,
  SearchInput,
  SpaceCatagory,
  TextLogo,
  WrapperHeader,
} from "./HeaderStyle";
import {
  FilePdfOutlined,
  CaretDownOutlined,
  SearchOutlined,
} from "@ant-design/icons";
import { Button, Dropdown, Space } from "antd";

const items = [
  {
    key: "1",
    label: "Item 1",
  },
  {
    key: "2",
    label: "Item 2",
  },
];

const Header = () => {
  return (
    <Container>
      <WrapperHeader>
        <Logo to={"/"}>
          <FilePdfOutlined />
          <TextLogo>DocSQA</TextLogo>
        </Logo>
        <Dropdown
          menu={{
            items,
          }}
        >
          <SpaceCatagory
            style={{
              display: "flex",
              gap: "2px",
              alignItems: "center",
              fontSize: "18px",
              fontWeight: "500",
              color: "#fff",
            }}
          >
            Danh mục
            <CaretDownOutlined />
          </SpaceCatagory>
        </Dropdown>
        <SearchInput
          bordered={false}
          placeholder="Nhập từ khóa..."
          enterButton={<SearchOutlined />}
        />
        <AccountGroup>
          <Button
            size="large"
            style={{
              borderRadius: "28px",
              zIndex: "1",
              width: "112px",
              borderColor: "#0066ff",
            }}
          >
            Đăng ký
          </Button>
          <Button
            size="large"
            style={{
              transform: "translateX(-38px)",
              paddingLeft: "48px",
              borderRadius: "28px",
              borderColor: "#0066ff",
            }}
          >
            Đăng nhập
          </Button>
        </AccountGroup>
      </WrapperHeader>
    </Container>
  );
};

export default Header;
