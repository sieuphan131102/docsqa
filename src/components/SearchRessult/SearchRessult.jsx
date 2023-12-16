import React from "react";
import {
  GroupHeader,
  GroupText,
  WrapperSearchGroup,
} from "./SearchResultStyle";
import ListDocs from "../ListDocs/ListDocs";

import img1 from "../../assets/images/img1.jpeg";
import img2 from "../../assets/images/img2.jpg";
import img3 from "../../assets/images/img3.jpeg";
import { Pagination } from "antd";

const arrDocs = [
  {
    src: img1,
    title: "6 Phát Minh Làm Nên Thời Đại",
    description: "Steven Jonhson",
    alt: "img1",
  },
  {
    src: img2,
    title: "6 Phát Minh Làm Nên Thời Đại",
    description: "Steven Jonhson",
    alt: "img1",
  },
  {
    src: img3,
    title: "6 Phát Minh Làm Nên Thời Đại",
    description: "Steven Jonhson",
    alt: "img1",
  },
  {
    src: img1,
    title: "6 Phát Minh Làm Nên Thời Đại",
    description: "Steven Jonhson",
    alt: "img1",
  },
  {
    src: img2,
    title: "6 Phát Minh Làm Nên Thời Đại",
    description: "Steven Jonhson",
    alt: "img1",
  },
  {
    src: img3,
    title: "6 Phát Minh Làm Nên Thời Đại",
    description: "Steven Jonhson",
    alt: "img1",
  },
  {
    src: img1,
    title: "6 Phát Minh Làm Nên Thời Đại",
    description: "Steven Jonhson",
    alt: "img1",
  },
  {
    src: img2,
    title: "6 Phát Minh Làm Nên Thời Đại",
    description: "Steven Jonhson",
    alt: "img1",
  },
];

const SearchRessult = () => {
  return (
    <div>
      <WrapperSearchGroup>
        <GroupHeader>
          <GroupText>{"Kết quả tìm kiếm"}</GroupText>
        </GroupHeader>
        <div>
          <ListDocs data={arrDocs} />
          <Pagination
            style={{ padding: "12px", textAlign: "center" }}
            defaultCurrent={1}
            total={50}
          />
        </div>
      </WrapperSearchGroup>
    </div>
  );
};

export default SearchRessult;
