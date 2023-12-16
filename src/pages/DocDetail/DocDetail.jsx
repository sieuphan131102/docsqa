import React from "react";
import { Container } from "./DocDetailStyle";
import NavbarLeft from "../../components/NavbarLeft/NavbarLeft";
import DetailItem from "../../components/DetailItem/DetailItem";

const DocDetail = () => {
  return (
    <div style={{ backgroundColor: "#eeefff" }}>
      <Container>
        <NavbarLeft />
        <div>
          <DetailItem />
        </div>
      </Container>
    </div>
  );
};

export default DocDetail;
