import React from "react";
import { Container } from "./SearchStyle";
import NavbarLeft from "../../components/NavbarLeft/NavbarLeft";
import SearchRessult from "../../components/SearchRessult/SearchRessult";

const Search = () => {
  return (
    <div style={{ backgroundColor: "#eeefff" }}>
      <Container>
        <NavbarLeft />
        <div>
          <SearchRessult />
        </div>
      </Container>
    </div>
  );
};

export default Search;
