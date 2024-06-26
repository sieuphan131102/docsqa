import React, { useEffect, useState } from "react";

import NavbarLeft from "../../components/NavbarLeft/NavbarLeft";
import { Container } from "./HomeStyle";
import DocsGroup from "../../components/DocsGroup/DocsGroup";
import axios from "axios";
import { Spin } from "antd";
import { Helmet } from "react-helmet";

const Home = () => {
  const [docs, setDocs] = useState([]);
  const [docsView, setDocsView] = useState([]);
  const [isLoading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    getAllDocs();
    getAllDocsView();
  }, []);

  const getAllDocs = async () => {
    try {
      const res = await axios.get(
        `${process.env.REACT_APP_API_URL}/document/all`
      );
      setDocs(res?.data?.data);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  console.log(docsView);

  const getAllDocsView = async () => {
    try {
      const res = await axios.get(
        `${process.env.REACT_APP_API_URL}/document/all?sortBy=view`
      );
      setDocsView(res?.data?.data);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ backgroundColor: "#eeefff" }}>
      <Helmet>
        <title>DocSQA | Trang chủ</title>
      </Helmet>
      <Container>
        <NavbarLeft />
        <Spin spinning={isLoading}>
          <DocsGroup title={"Sách nổi bật"} data={docsView} />
          <DocsGroup title={"Sách hay"} data={docs} />
        </Spin>
      </Container>
    </div>
  );
};

export default Home;
