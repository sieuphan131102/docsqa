import React, { useState } from "react";
import { Helmet } from "react-helmet";
import { Container } from "./PaymentStyle";
import { Form, Radio } from "antd";
import Bank from "./Bank";
import Card from "./Card";

const Payment = () => {
  const [selected, setSelected] = useState("bank");

  return (
    <div
      style={{
        backgroundColor: "#eeefff",
        minHeight: "100vh",
        color: "#0066ff",
      }}
    >
      <Helmet>
        <title>DocSQA | Thanh toán</title>
      </Helmet>
      <Container>
        <h1
          style={{
            textAlign: "center",
            fontSize: "24px",
            margin: "24px 0",
          }}
        >
          Thanh toán
        </h1>
        <div
          style={{
            width: "50%",
            backgroundColor: "#fff",
            padding: "24px",
            borderRadius: "8px",
            boxShadow: "0 0 5px 5px rgba(0,0,0,0.05)",
          }}
        >
          <Form>
            <Form.Item>
              <div style={{ display: "flex", justifyContent: "space-between" }}>
                <label style={{ fontSize: "16px", fontWeight: "bold" }}>
                  Chọn phương thức thanh toán
                </label>
                <Radio.Group
                  defaultValue={"bank"}
                  onChange={(e) => setSelected(e.target.value)}
                >
                  <Radio value={"bank"}>Ngân hàng</Radio>
                  <Radio value={"card"}>Thẻ cào</Radio>
                </Radio.Group>
              </div>
            </Form.Item>
          </Form>
          <h1
            style={{
              textAlign: "center",
              fontSize: "18px",
              marginBottom: "8px",
            }}
          >
            Thông tin thanh toán
          </h1>
          {selected === "bank" && <Bank />}
          {selected === "card" && <Card />}
        </div>
      </Container>
    </div>
  );
};

export default Payment;
