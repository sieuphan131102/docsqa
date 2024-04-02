import React, { useEffect, useState } from "react";
import { Container } from "../Home/HomeStyle";
import NavbarLeft from "../../components/NavbarLeft/NavbarLeft";
import Type from "../../components/Type/Type";
import { useSelector } from "react-redux";
import axios from "axios";
import { Spin } from "antd";
import { Helmet } from "react-helmet";

const DocType = () => {
  const searchType = useSelector((state) => state.search);
  const [result, setResult] = useState([]);
  const [isLoading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    getDocWithType(searchType.text);
  }, [searchType.text]);

  const getDocWithType = async (type) => {
    try {
      await axios
        .get(
          `${process.env.REACT_APP_API_URL}/document/all?type=${
            type || JSON.parse(localStorage.getItem("type"))._id
          }`
        )
        .then((res) => {
          setResult(res?.data?.data);
        });
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ backgroundColor: "#eeefff" }}>
      <Helmet>
        <title>
          DocSQA | Thể loại {JSON.parse(localStorage.getItem("type")).name}
        </title>
      </Helmet>
      <Container>
        <NavbarLeft />
        <Spin spinning={isLoading}>
          <Type
            data={result}
            type={JSON.parse(localStorage.getItem("type")).name}
          />
        </Spin>
      </Container>
    </div>
  );
};

export default DocType;
