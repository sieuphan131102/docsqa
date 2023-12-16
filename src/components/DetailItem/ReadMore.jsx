import { Button } from "antd";
import React, { useState } from "react";

const ReadMore = ({ text, maxLength }) => {
  const [isExpanded, setExpanded] = useState(false);

  const toggleExpand = () => {
    setExpanded(!isExpanded);
  };

  const displayText = isExpanded ? text : text.slice(0, maxLength);

  return (
    <div>
      <p style={{ fontSize: "18px", textAlign: "justify" }}>{displayText}</p>
      {text.length > maxLength && (
        <Button
          style={{ marginTop: "4px" }}
          size="small"
          type="default"
          onClick={toggleExpand}
        >
          {isExpanded ? "Thu gọn" : "Xem thêm"}
        </Button>
      )}
    </div>
  );
};

export default ReadMore;
