import React, { useEffect, useState } from "react";
import { Helmet } from "react-helmet";
import { Container } from "./HistoryStyle";
import { Spin } from "antd";
import NavbarLeft from "../../components/NavbarLeft/NavbarLeft";
import DocsGroup from "../../components/DocsGroup/DocsGroup";
import axios from "axios";
import { useSelector } from "react-redux";

const History = () => {
  const user = useSelector((state) => state.user);
  const [isLoading, setLoading] = useState(false);
  const [history, setHistory] = useState([]);
  const [render, setRender] = useState([]);

  useEffect(() => {
    setLoading(true);
    const getHistory = async () => {
      try {
        const res = await axios.get(
          `${process.env.REACT_APP_API_URL}/user/history/get/${user.id}`
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
    const filterNull = history.filter((item) => item.bookId !== null);
    const seen = new Map();
    const filterData = filterNull.filter((item) => {
      const { _id } = item.bookId;
      if (seen.has(_id)) {
        return false;
      }
      seen.set(_id, true);
      return true;
    });
    const historyRender = filterData.map((item) => item.bookId);
    setRender(historyRender);
  }, [history]);

  return (
    <div style={{ backgroundColor: "#eeefff" }}>
      <Helmet>
        <title>DocSQA | Lịch sử đọc</title>
      </Helmet>
      <Container>
        <NavbarLeft />
        <Spin spinning={isLoading}>
          <DocsGroup title={"Lịch sử đọc"} data={render} />
        </Spin>
      </Container>
    </div>
  );
};

export default History;
