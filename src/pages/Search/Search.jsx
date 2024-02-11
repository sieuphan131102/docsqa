import React, { useEffect, useState } from "react";
import { Container } from "./SearchStyle";
import NavbarLeft from "../../components/NavbarLeft/NavbarLeft";
import SearchRessult from "../../components/SearchRessult/SearchRessult";
import { useSelector } from "react-redux";
import axios from "axios";
import { Spin } from "antd";
import { Helmet } from "react-helmet";

const Search = () => {
  const searchText = useSelector((state) => state.search);
  const [result, setResult] = useState([]);
  const [isLoading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    handleSearch(searchText.text);
  }, [searchText.text]);

  const handleSearch = async (searchText) => {
    try {
      await axios
        .get(
          `${process.env.REACT_APP_API_URL}/document/all?title=${
            searchText || localStorage.getItem("search")
          }`
        )
        .then((res) => {
          if (res?.status !== "ERROR") {
            setResult(res?.data?.data);
          }
        });
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ backgroundColor: "#eeefff" }}>
      <Container>
        <Helmet>
          <title>Kết quả tìm kiếm "{localStorage.getItem("search")}"</title>
        </Helmet>
        <NavbarLeft />
        <Spin spinning={isLoading}>
          <SearchRessult data={result} />
        </Spin>
      </Container>
    </div>
  );
};

export default Search;
