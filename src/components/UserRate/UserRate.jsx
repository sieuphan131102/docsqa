import { Avatar, Rate } from "antd";
import React from "react";

const UserRate = ({ rating, comment, nameOfUser, datePost, avatar }) => {
  return (
    <div style={{ padding: "12px 0" }}>
      <div style={{ display: "flex", justifyContent: "space-between" }}>
        <div style={{ display: "flex", gap: "12px", alignItems: "center" }}>
          <Avatar
            style={{ backgroundColor: "#7e3794" }}
            src={avatar}
            size={40}
          />
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              gap: "8px",
            }}
          >
            <h5>{nameOfUser}</h5>
            <Rate style={{ fontSize: "14px" }} disabled value={rating} />
          </div>
        </div>
        <div style={{ color: "#a59a9f" }}>{datePost}</div>
      </div>
      <div style={{ padding: "12px 0", marginLeft: "52px" }}>
        <p>{comment}</p>
      </div>
    </div>
  );
};

export default UserRate;
