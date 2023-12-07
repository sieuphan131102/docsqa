import { Link } from "react-router-dom";
import styled from "styled-components";

export const WrapperFooter = styled.div`
  background-color: #0066ff;
`;

export const FooterBody = styled.footer`
  max-width: 1200px;
  height: 78px;
  margin-left: auto;
  margin-right: auto;
  color: #fff;
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

export const Logo = styled(Link)`
  display: flex;
  color: #fff;
  text-decoration: none;
  font-size: 32px;
  padding: 8px 16px 8px 0;
  user-select: none;
  &:hover {
    opacity: 0.7;
  }
`;

export const TextLogo = styled.h1`
  padding-left: 4px;
`;

export const CopyrightText = styled.h3`
  font-size: 24px;
  user-select: none;
`;

export const SocialIcon = styled.h3`
  font-size: 24px;
  display: flex;
  gap: 4px;
  .anticon:hover {
    opacity: 0.3;
    cursor: pointer;
  }
`;
