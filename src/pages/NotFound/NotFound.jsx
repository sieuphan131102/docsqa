import React from "react";

import NotFoundImg from "../../assets/images/page-not-found.jpg";
import { FlexImage, ImageNotFound } from "./NotFoundStyle";

const NotFound = () => {
  return (
    <FlexImage vertical align="center" justify="center">
      <ImageNotFound src={NotFoundImg} preview={false} />
    </FlexImage>
  );
};

export default NotFound;
