import React from "react";
import { Container } from "../Home/HomeStyle";
import NavbarLeft from "../../components/NavbarLeft/NavbarLeft";
import Type from "../../components/Type/Type";

const DocType = () => {
  return (
    <div style={{ backgroundColor: "#eeefff" }}>
      <Container>
        <NavbarLeft />
        <div>
          <Type />
        </div>
      </Container>
    </div>
  );
};

export default DocType;
