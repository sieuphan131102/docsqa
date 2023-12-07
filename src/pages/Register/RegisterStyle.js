import { Link } from "react-router-dom";
import styled from "styled-components";

export const WrapperLogin = styled.div`
  background-color: rgba(0, 0, 0, 0.3);
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 100;
`;

export const RegisterModal = styled.div`
  width: 1000px;
  height: 100vh;
  background-color: #fff;
  float: right;
`;

export const WrapperClose = styled.div`
  font-size: 24px;
  padding: 8px;
  float: right;
  position: relative;
  top: 12px;
  right: 12px;
  color: #7a7a7a;
  &:hover {
    background-color: #f4f4f4;
    cursor: pointer;
  }
`;

export const WrapperGoLogin = styled.p`
  float: left;
  position: relative;
  top: 12px;
  left: 12px;
  font-size: 16px;
  color: #757575;
`;

export const TextRegister = styled.h2`
  padding-bottom: 32px;
  font-size: 32px;
  font-weight: 700;
  text-align: center;
`;

export const HoverLink = styled(Link)`
  color: #0055ff;
  text-decoration: none;
  &:hover {
    text-decoration: underline;
  }
`;
