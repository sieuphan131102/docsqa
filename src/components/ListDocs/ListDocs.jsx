import React from "react";

import DocItem from "../../components/DocItem/DocItem";
import { List } from "antd";

const ListDocs = ({ data }) => {
  return (
    <List
      grid={{ gutter: 16, column: 4 }}
      dataSource={data}
      renderItem={(doc, index) => (
        <List.Item>
          <DocItem
            key={index}
            img={doc.src}
            title={doc.title}
            description={doc.description}
            alt={doc.alt}
          />
        </List.Item>
      )}
    />
  );
};

export default ListDocs;
