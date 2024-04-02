import React, { useEffect, useState } from "react";
import { Helmet } from "react-helmet";
import { Container } from "./HistoryStyle";
import NavbarLeft from "../../components/NavbarLeft/NavbarLeft";
import { Spin } from "antd";
import DocsGroup from "../../components/DocsGroup/DocsGroup";
import axios from "axios";
import { useSelector } from "react-redux";

const HistoryPayment = () => {
  const user = useSelector((state) => state.user);
  const [isLoading, setLoading] = useState(false);
  const [history, setHistory] = useState([]);
  const [render, setRender] = useState([]);

  useEffect(() => {
    setLoading(true);
    const getHistory = async () => {
      try {
        const res = await axios.get(
          `${process.env.REACT_APP_API_URL}/user/payment/get/${user.id}`
        );
        setHistory(res.data);
        setLoading(false);
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    };
    if (user.id) {
      getHistory();
    }
  }, [user]);

  useEffect(() => {
    const historyRender = history.map((item) => item.bookId);
    setRender(historyRender);
  }, [history]);

  return (
    <div style={{ backgroundColor: "#eeefff" }}>
      <Helmet>
        <title>DocSQA | Lịch sử mua</title>
      </Helmet>
      <Container>
        <NavbarLeft />
        <Spin spinning={isLoading}>
          <DocsGroup title={"Lịch sử mua"} data={render} />
        </Spin>
      </Container>
    </div>
  );
};

export default HistoryPayment;
