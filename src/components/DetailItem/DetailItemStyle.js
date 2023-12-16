import styled from "styled-components";

export const WrapperDocsGroup = styled.div`
  width: 1000px;
  padding: 0 12px;
  background-color: #fff;
  border-radius: 8px;
  margin-top: 12px;
`;

export const GroupText = styled.h3`
  text-transform: uppercase;
  line-height: 20px;
  color: #0066ff;
`;

export const GroupHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  border-bottom: 1px #ccc solid;
  padding: 12px 0;
`;

export const ShareIcon = styled.div`
  font-size: "24px";
  line-height: "24px";
  height: "24px";
  color: "#3B5998";
  &:hover {
    opacity: 0.9;
    cursor: pointer;
  }
`;
