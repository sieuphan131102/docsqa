import styled from "styled-components";
import { Link } from "react-router-dom";
import { Input, Space } from "antd";

export const Container = styled.div`
  background-color: #0066ff;
  position: sticky;
  top: 0;
  z-index: 1;
`;

export const WrapperHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 76px;
  max-width: 1200px;
  margin-left: auto;
  margin-right: auto;
`;

export const Logo = styled(Link)`
  display: flex;
  color: #fff;
  text-decoration: none;
  font-size: 32px;
  padding: 8px 16px 8px 0;
  user-select: none;
  &:hover {
    opacity: 0.9;
  }
`;

export const TextLogo = styled.h1`
  padding-left: 4px;
`;

export const SpaceCatagory = styled(Space)`
  padding: 8px 16px 8px 0;
  user-select: none;
  &:hover {
    opacity: 0.9;
    cursor: pointer;
  }
`;

export const AccountGroup = styled.div`
  font-weight: bold;
  .ant-btn {
    font-weight: 700;
  }
`;

export const SearchInput = styled(Input.Search)`
  width: 500px;
  .ant-btn {
    background-color: #fff;
    color: #000;
    border-left: 1px #ccc solid;
  }
  .ant-input {
    background-color: #fff;
    height: 32px;
  }
`;

export const WrapperUser = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  color: #fff;
  font-size: 18px;
  &:hover {
    cursor: pointer;
  }
`;
