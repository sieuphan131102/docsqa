import React from "react";

import NavbarLeft from "../../components/NavbarLeft/NavbarLeft";
import { Container } from "./HomeStyle";
import DocsGroup from "../../components/DocsGroup/DocsGroup";

import img1 from "../../assets/images/img1.jpeg";
import img2 from "../../assets/images/img2.jpg";
import img3 from "../../assets/images/img3.jpeg";

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

const Home = () => {
  return (
    <div style={{ backgroundColor: "#eeefff" }}>
      <Container>
        <NavbarLeft />
        <div>
          <DocsGroup title={"Sách mới nhất"} data={arrDocs} />
          <DocsGroup title={"Tài liệu học tập"} data={arrDocs} />
          <DocsGroup title={"Báo lá cải"} data={arrDocs} />
        </div>
      </Container>
    </div>
  );
};

export default Home;
