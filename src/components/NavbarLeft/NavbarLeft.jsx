import React from "react";
import {
  ListItem,
  ListNavbar,
  TextNavbar,
  WrapperNavbar,
} from "./NavbarLeftStyle";

const NavbarLeft = () => {
  return (
    <WrapperNavbar>
      <TextNavbar>Thể loại</TextNavbar>
      <ListNavbar>
        <ListItem>Sách lập trình</ListItem>
        <ListItem>Tài liệu học tập</ListItem>
        <ListItem>Sách tiếng anh</ListItem>
      </ListNavbar>
    </WrapperNavbar>
  );
};

export default NavbarLeft;
