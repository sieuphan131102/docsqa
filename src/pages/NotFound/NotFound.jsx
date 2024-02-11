import React from "react";

import NotFoundImg from "../../assets/images/page-not-found.jpg";
import { FlexImage, ImageNotFound } from "./NotFoundStyle";
import { Button } from "antd";
import { Helmet } from "react-helmet";
import { useNavigate } from "react-router-dom";

const NotFound = () => {
  const navigate = useNavigate();
  const goHome = () => {
    navigate("/");
  };

  return (
    <FlexImage vertical align="center" justify="center">
      <Helmet>
        <title>Page Not Found</title>
      </Helmet>
      <ImageNotFound src={NotFoundImg} preview={false} />
      <Button onClick={goHome} type="primary" style={{ marginTop: "12px" }}>
        Trở về trang chủ
      </Button>
    </FlexImage>
  );
};

export default NotFound;
