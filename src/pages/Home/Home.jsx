import React, { useEffect, useState } from "react";

import NavbarLeft from "../../components/NavbarLeft/NavbarLeft";
import { Container } from "./HomeStyle";
import DocsGroup from "../../components/DocsGroup/DocsGroup";
import axios from "axios";
import { Spin } from "antd";

const Home = () => {
  const [docs, setDocs] = useState([]);
  const [isLoading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    getAllDocs();
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

  return (
    <div style={{ backgroundColor: "#eeefff" }}>
      <Container>
        <NavbarLeft />
        <Spin spinning={isLoading}>
          <DocsGroup title={"Sách nổi bật"} data={docs} />
        </Spin>
      </Container>
    </div>
  );
};

export default Home;
