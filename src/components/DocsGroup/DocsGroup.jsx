import React from "react";
import ListDocs from "../ListDocs/ListDocs";
import { GroupHeader, GroupText, WrapperDocsGroup } from "./DocsGroupStyle";

const DocsGroup = ({ title, data }) => {
  return (
    <WrapperDocsGroup>
      <GroupHeader>
        <GroupText>{title}</GroupText>
      </GroupHeader>
      <ListDocs data={data} />
    </WrapperDocsGroup>
  );
};

export default DocsGroup;
