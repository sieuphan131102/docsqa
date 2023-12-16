import React from "react";
import {
  CopyrightText,
  FooterBody,
  Logo,
  SocialIcon,
  TextLogo,
  WrapperFooter,
} from "./FooterStyle";

import {
  FilePdfOutlined,
  FacebookOutlined,
  GithubOutlined,
  InstagramOutlined,
} from "@ant-design/icons";

const Footer = () => {
  return (
    <WrapperFooter>
      <FooterBody>
        <SocialIcon>
          <FacebookOutlined />
          <GithubOutlined />
          <InstagramOutlined />
        </SocialIcon>
        <Logo to={"/"}>
          <FilePdfOutlined />
          <TextLogo>DocSQA</TextLogo>
        </Logo>
        <CopyrightText>&copy; 2023 My team</CopyrightText>
      </FooterBody>
    </WrapperFooter>
  );
};

export default Footer;
