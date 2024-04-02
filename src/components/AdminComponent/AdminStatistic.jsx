import { Button, Card, Statistic } from "antd";
import React, { useEffect, useState } from "react";
import { Helmet } from "react-helmet";
import {
  EyeTwoTone,
  FilePdfTwoTone,
  MessageTwoTone,
  CloudDownloadOutlined,
  DollarTwoTone,
  UserOutlined,
} from "@ant-design/icons";
import axios from "axios";

const AdminStats = () => {
  const [isLoading, setLoading] = useState(true);
  const [users, setUsers] = useState([]);
  const [docs, setDocs] = useState([]);
  const [reviews, setReviews] = useState([]);

  useEffect(() => {
    getAllUser();
    getAllDocs();
    getAllReviews();
  }, []);

  const getAllUser = async () => {
    try {
      const res = await axios.get(`${process.env.REACT_APP_API_URL}/user/all`, {
        headers: {
          token: `Bearer ${localStorage.getItem("access_token")}`,
        },
      });
      setUsers(res?.data?.data);
    } catch (error) {
      console.log("Error: " + error);
    } finally {
      setLoading(false);
    }
  };

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

  const getAllReviews = async () => {
    try {
      const res = await axios.get(
        `${process.env.REACT_APP_API_URL}/review/all`
      );
      setReviews(res?.data?.data);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  const calcTotalView = () => {
    let sum = 0;
    docs.forEach((item) => {
      sum += item.view;
    });
    return sum;
  };

  const calcTotalDown = () => {
    let sum = 0;
    docs.forEach((item) => {
      sum += item.down;
    });
    return sum;
  };

  const calcTotalRevenue = () => {
    let sum = 0;
    docs.forEach((item) => {
      sum += item.down * item.price;
    });
    return sum;
  };

  const calcTotalRevenueCoin = () => {
    let sum = 0;
    users.forEach((user) => {
      sum += user.coin;
    });
    return sum;
  };

  const handleReset = () => {
    setLoading(true);
    getAllDocs();
    getAllReviews();
    getAllUser();
  };

  return (
    <div
      style={{ display: "flex", flexDirection: "column", alignItems: "center" }}
    >
      <Helmet>
        <title>Admin Page | Thống kê</title>
      </Helmet>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: "12px",
          marginTop: "48px",
        }}
      >
        <div style={{ display: "flex", gap: "12px" }}>
          <Card bordered={false} style={{ width: "240px", height: "120px" }}>
            <Statistic
              loading={isLoading}
              title="Tổng lượt xem"
              value={calcTotalView()}
              valueStyle={{
                color: "#000",
              }}
              prefix={<EyeTwoTone />}
            />
          </Card>
          <Card bordered={false} style={{ width: "240px", height: "120px" }}>
            <Statistic
              loading={isLoading}
              title="Tổng số tài liệu"
              value={docs.length}
              valueStyle={{
                color: "#000",
              }}
              prefix={<FilePdfTwoTone />}
            />
          </Card>
          <Card bordered={false} style={{ width: "240px", height: "120px" }}>
            <Statistic
              loading={isLoading}
              title="Tổng số bình luận"
              value={reviews.length}
              valueStyle={{
                color: "#000",
              }}
              prefix={<MessageTwoTone />}
            />
          </Card>
        </div>
        <div style={{ display: "flex", gap: "12px" }}>
          <Card bordered={false} style={{ width: "240px", height: "120px" }}>
            <Statistic
              loading={isLoading}
              title="Tổng doanh thu bán sách"
              value={calcTotalRevenue()}
              valueStyle={{
                color: "#000",
              }}
              prefix={<DollarTwoTone />}
              suffix="VNĐ"
            />
          </Card>
          <Card bordered={false} style={{ width: "240px", height: "120px" }}>
            <Statistic
              loading={isLoading}
              title="Tổng doanh thu nạp xu"
              value={calcTotalRevenueCoin()}
              valueStyle={{
                color: "#000",
              }}
              prefix={<DollarTwoTone />}
              suffix="VNĐ"
            />
          </Card>
          <Card bordered={false} style={{ width: "240px", height: "120px" }}>
            <Statistic
              loading={isLoading}
              title="Tổng người dùng"
              value={users.length}
              valueStyle={{
                color: "#000",
              }}
              prefix={<UserOutlined style={{ color: "#1677ff" }} />}
            />
          </Card>
        </div>
        <div style={{ display: "flex", gap: "12px" }}>
          <Card bordered={false} style={{ width: "240px", height: "120px" }}>
            <Statistic
              loading={isLoading}
              title="Tổng số lượt tải"
              value={calcTotalDown()}
              valueStyle={{
                color: "#000",
              }}
              prefix={<CloudDownloadOutlined style={{ color: "#1677ff" }} />}
            />
          </Card>
        </div>
      </div>
      <Button
        onClick={handleReset}
        style={{ width: "104px", marginTop: "12px" }}
        type="primary"
      >
        Làm mới
      </Button>
    </div>
  );
};

export default AdminStats;
