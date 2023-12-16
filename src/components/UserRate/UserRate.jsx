import { Avatar, Rate } from "antd";
import React from "react";

const UserRate = () => {
  return (
    <div style={{ padding: "12px 0" }}>
      <div style={{ display: "flex", justifyContent: "space-between" }}>
        <div style={{ display: "flex", gap: "12px", alignItems: "center" }}>
          <Avatar style={{ backgroundColor: "#7e3794" }} size={40}>
            TS
          </Avatar>
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              gap: "8px",
            }}
          >
            <h5>Phan Thành Siêu</h5>
            <Rate style={{ fontSize: "14px" }} disabled value={4} />
          </div>
        </div>
        <div style={{ color: "#a59a9f" }}>13/11/2002</div>
      </div>
      <div style={{ padding: "12px 0", marginLeft: "52px" }}>
        <p>Sách hay vãi</p>
      </div>
    </div>
  );
};

export default UserRate;
