import { Avatar, Button } from "antd";
import React, { useEffect, useState } from "react";

import { Container } from "./UserProfileStyle";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { updateUser } from "../../redux/slices/userSlice";
import * as msg from "../../components/Message/Message";
import { useNavigate } from "react-router-dom";

const UserProfile = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);

  const [address, setAddress] = useState("");
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [avatar, setAvatar] = useState();

  useEffect(() => {
    setAddress(user?.address || "");
    setFullName(user?.fullName || "");
    setEmail(user?.email || "");
    setAvatar(user?.avatar);
  }, [user?.address, user?.avatar, user?.email, user?.fullName, user.userName]);

  const handleUpdate = async () => {
    try {
      const formData = new FormData();
      formData.append("fullName", fullName);
      formData.append("email", email);
      formData.append("address", address);
      await axios
        .put(
          `${process.env.REACT_APP_API_URL}/user/update/${user?.id}`,
          formData
        )
        .then((res) => {
          if (res?.data?.status !== "ERROR") {
            msg.success("Cập nhật thông tin người dùng thành công!");
          } else {
            msg.error("Lỗi cập nhật thông tin người dùng");
          }
          dispatch(updateUser(res?.data?.data));
        });
    } catch (error) {
      console.log(error);
    }
  };

  const handleOnChange = async (e) => {
    const img = e.target.files[0];
    try {
      if (img) {
        const formData = new FormData();
        formData.append("avatar", img);
        await axios
          .put(
            `${process.env.REACT_APP_API_URL}/user/update/${user?.id}`,
            formData
          )
          .then((res) => {
            if (res?.data?.status !== "ERROR") {
              msg.success("Cập nhật avatar thành công!");
            } else {
              msg.error("Lỗi cập nhật avatar người dùng");
            }
            dispatch(updateUser(res?.data?.data));
            setAvatar(img);
          });
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleAdminPage = () => {
    navigate("/admin");
  };

  return (
    <div style={{ background: "#eeefff" }}>
      <Container>
        <h3 style={{ fontSize: "24px", paddingTop: "48px" }}>
          Thông tin người dùng
        </h3>
        <div style={{ display: "flex", gap: "24px" }}>
          <div
            style={{ display: "flex", flexDirection: "column", gap: "12px" }}
          >
            <Avatar
              size={240}
              src={`${process.env.REACT_APP_API_URL}/avatar/${
                avatar || "avatar.jpg"
              }`}
            />
            <input
              onChange={handleOnChange}
              type="file"
              accept=".jpeg, .png, .jpg"
            />
          </div>
          <form
            style={{ display: "flex", flexDirection: "column", gap: "14px" }}
          >
            <div>
              <h3>Họ và tên: </h3>
              <input
                onChange={(e) => setFullName(e.target.value)}
                type="text"
                value={fullName}
              />
            </div>
            <div>
              <h3>Email :</h3>
              <input
                onChange={(e) => setEmail(e.target.value)}
                type="text"
                value={email}
              />
            </div>
            <div>
              <h3>Địa chỉ</h3>
              <input
                onChange={(e) => setAddress(e.target.value)}
                type="text"
                value={address}
              />
            </div>
            <div style={{ display: "flex", gap: "24px" }}>
              <Button onClick={handleUpdate}>Cập nhật</Button>
              {user?.isAdmin ? (
                <Button onClick={handleAdminPage} type="primary">
                  Quản trị viên
                </Button>
              ) : (
                ""
              )}
            </div>
          </form>
        </div>
      </Container>
    </div>
  );
};

export default UserProfile;
