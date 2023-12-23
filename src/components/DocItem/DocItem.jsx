import React from "react";
import { Card } from "antd";
import { CardDocItem } from "./DocItemStyle";
const { Meta } = Card;

const DocItem = ({ img, title, author, alt, onClick }) => {
  return (
    <CardDocItem
      onClick={onClick}
      hoverable
      style={{
        padding: "12px",
        border: "1px #ccc solid",
      }}
      cover={<img alt={alt} src={img} />}
    >
      <Meta title={title} />
      <p>{author}</p>
    </CardDocItem>
  );
};

export default DocItem;
