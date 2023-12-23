import React from "react";
import { GroupHeader, GroupText, WrapperTypeGroup } from "./TypeStyle";
import ListDocs from "../ListDocs/ListDocs";

const Type = ({ data, type }) => {
  return (
    <div>
      <WrapperTypeGroup>
        <GroupHeader>
          <GroupText>{type}</GroupText>
        </GroupHeader>
        <div>
          <ListDocs data={data} />
        </div>
      </WrapperTypeGroup>
    </div>
  );
};

export default Type;
