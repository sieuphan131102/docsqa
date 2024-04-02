import React from "react";

import DocItem from "../../components/DocItem/DocItem";
import { List } from "antd";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setSearchDoc } from "../../redux/slices/searchSlice";

const ListDocs = ({ data }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleDetailDoc = (id) => {
    dispatch(setSearchDoc(id));
    navigate(`/detail/${id}`);
  };

  return (
    <List
      pagination={{ pageSize: 4, style: { padding: "12px" } }}
      grid={{ gutter: 16, column: 4 }}
      dataSource={data}
      renderItem={(doc, index) => (
        <List.Item>
          <DocItem
            onClick={() => handleDetailDoc(doc._id)}
            key={index}
            img={`${process.env.REACT_APP_API_URL}/${doc.image}`}
            title={doc.title}
            alt={doc.alt}
          />
        </List.Item>
      )}
    />
  );
};

export default ListDocs;
