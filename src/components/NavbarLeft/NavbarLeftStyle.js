import styled from "styled-components";

export const WrapperNavbar = styled.div`
  width: 130px;
  height: 78vh;
  max-height: 78vh;
  position: sticky;
  top: 88px;
  float: right;
  background-color: #fff;
  border-radius: 8px;
  padding: 16px;
  margin-top: 12px;
  overflow: auto;
`;

export const TextNavbar = styled.h1`
  font-size: 18px;
  line-height: 28px;
  padding: 8px 0;
  text-transform: uppercase;
  color: #0066ff;
`;

export const ListNavbar = styled.ul`
  list-style: none;
`;

export const ListItem = styled.li`
  padding: 8px 8px 8px 0;
  font-size: 16px;
  &:hover {
    color: #0066ff;
    cursor: pointer;
    background-color: rgba(0, 0, 0, 0.01);
    transform: translateX(1px);
  }
`;
