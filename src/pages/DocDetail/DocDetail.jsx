import React, { useEffect, useState } from "react";
import { Container } from "./DocDetailStyle";
import NavbarLeft from "../../components/NavbarLeft/NavbarLeft";
import DetailItem from "../../components/DetailItem/DetailItem";
import axios from "axios";
import { Spin } from "antd";
import { Helmet } from "react-helmet";
import { useParams } from "react-router-dom";

const DocDetail = () => {
  const { id } = useParams();
  const [doc, setDoc] = useState({});
  const [isLoading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    const getOneDoc = async () => {
      try {
        await axios
          .get(`${process.env.REACT_APP_API_URL}/document/get/${id}`)
          .then((res) => {
            setDoc(res?.data?.data);
          });
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    };
    getOneDoc();
  }, []);

  return (
    <div style={{ backgroundColor: "#eeefff" }}>
      <Helmet>
        <title>{`DocSQA | ${doc.title} - ${doc.author}`}</title>
      </Helmet>
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
