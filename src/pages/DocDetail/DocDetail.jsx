import React, { useEffect, useState } from "react";
import { Container } from "./DocDetailStyle";
import NavbarLeft from "../../components/NavbarLeft/NavbarLeft";
import DetailItem from "../../components/DetailItem/DetailItem";
import { useSelector } from "react-redux";
import axios from "axios";
import { Spin } from "antd";

const DocDetail = () => {
  const searchId = useSelector((state) => state.search);
  const [doc, setDoc] = useState({});
  const [isLoading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    getOneDoc(searchId.text);
  }, [searchId.text]);

  const getOneDoc = async (id) => {
    try {
      await axios
        .get(
          `${process.env.REACT_APP_API_URL}/document/get/${
            id || localStorage.getItem("docId")
          }`
        )
        .then((res) => {
          setDoc(res?.data?.data);
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
        <NavbarLeft />
        <Spin spinning={isLoading}>
          <DetailItem data={doc} />
        </Spin>
      </Container>
    </div>
  );
};

export default DocDetail;
