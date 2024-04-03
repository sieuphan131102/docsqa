import axios from "axios";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { DollarTwoTone } from "@ant-design/icons";
import { Button } from "antd";
import * as msg from "../../components/Message/Message";
import { updateUser } from "../../redux/slices/userSlice";

const Buy = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);
  const [doc, setDoc] = useState({});
  const [payment, setPayment] = useState([]);
  const [success, setSuccess] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const getPayments = async () => {
      try {
        const res = await axios.get(
          `${process.env.REACT_APP_API_URL}/user/payment/get/${user.id}`
        );
        setPayment(res.data);
      } catch (error) {
        console.log(error);
      }
    };
    if (user.id) {
      getPayments();
    }
  }, [user, success]);

  useEffect(() => {
    const getDoc = async () => {
      try {
        const res = await axios.get(
          `${process.env.REACT_APP_API_URL}/document/get/${id}`
        );
        setDoc(res.data.data);
      } catch (error) {
        console.log(error);
      }
    };
    getDoc();
  }, [id]);

  const buyDoc = async (coin) => {
    try {
      const formData = new FormData();
      formData.append("coin", user.coin - coin);
      const res = await axios.put(
        `${process.env.REACT_APP_API_URL}/user/update/${user?.id}`,
        formData
      );
      dispatch(
        updateUser({
          ...user,
          _id: user.id,
          coin: res.data.data.coin,
        })
      );
    } catch (error) {
      console.log(error);
    }
  };

  const onClick = async () => {
    try {
      if (user.coin < doc.price) {
        msg.warning("Bạn không đủ xu, vui lòng nạp thêm!");
        navigate("/payment");
        return;
      } else {
        if (success) {
          return;
        }
        for (let i = 0; i < payment.length; i++) {
          if (payment[i].bookId?._id === id) {
            return;
          }
        }
        await axios.post(
          `${process.env.REACT_APP_API_URL}/user/payment/${user.id}`,
          {
            bookId: id,
          }
        );
        msg.success("Mua thành công!");
        buyDoc(doc.price);
        setSuccess(true);
        navigate(`/detail/${id}`);
      }
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div
      style={{
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        marginTop: "24px",
      }}
    >
      <div
        style={{
          fontSize: "24px",
          display: "flex",
          flexDirection: "column",
          gap: "16px",
        }}
      >
        <h1 style={{ textAlign: "center" }}>Thông tin sản phẩm</h1>
        <div>
          <strong>Tên sản phẩm:</strong> {doc.title}
        </div>
        <div>
          <strong>Tác giả:</strong> {doc.author}
        </div>
        <div>
          <strong>Thể loại:</strong> {doc.type?.name}
        </div>
        <div>
          <strong>Giá:</strong> {doc.price} <DollarTwoTone />
        </div>
        <div>
          <strong>Số xu của bạn:</strong> {user.coin} <DollarTwoTone />
        </div>
      </div>
      <div
        style={{
          marginTop: "24px",
          display: "flex",
          gap: "24px",
        }}
      >
        <Button
          onClick={() => {
            navigate("/");
          }}
        >
          Hủy
        </Button>
        <Button onClick={onClick} type="primary">
          Mua
        </Button>
      </div>
    </div>
  );
};

export default Buy;
