import { Button } from "antd";
import React from "react";
import ListDocs from "../ListDocs/ListDocs";
import { GroupHeader, GroupText, WrapperDocsGroup } from "./DocsGroupStyle";

const DocsGroup = ({ title, data }) => {
  return (
    <WrapperDocsGroup>
      <GroupHeader>
        <GroupText>{title}</GroupText>
        <Button type="primary">Xem tất cả</Button>
      </GroupHeader>
      <ListDocs data={data} />
    </WrapperDocsGroup>
  );
};

export default DocsGroup;
