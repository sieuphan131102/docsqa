import React from "react";
import {
  GroupHeader,
  GroupText,
  WrapperSearchGroup,
} from "./SearchResultStyle";
import ListDocs from "../ListDocs/ListDocs";

const SearchRessult = ({ data }) => {
  return (
    <div>
      <WrapperSearchGroup>
        <GroupHeader>
          <GroupText>{"Kết quả tìm kiếm"}</GroupText>
        </GroupHeader>
        <div>
          <ListDocs data={data} />
        </div>
      </WrapperSearchGroup>
    </div>
  );
};

export default SearchRessult;
