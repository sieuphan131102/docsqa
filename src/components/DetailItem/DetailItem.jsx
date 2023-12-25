import React, { useEffect, useState } from "react";
import {
  GroupHeader,
  GroupText,
  ShareIcon,
  WrapperDocsGroup,
} from "./DetailItemStyle";
import { Button, Image, List, Modal, Rate, Spin } from "antd";
import { IoCloudDownloadOutline } from "react-icons/io5";
import { FaFacebook } from "react-icons/fa";

import ReadMore from "./ReadMore";
import UserRate from "../UserRate/UserRate";
import TextAreaWithValidation from "./TextAreaWithWarning";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useSelector } from "react-redux";
import moment from "moment";
import * as msg from "../../components/Message/Message";

const DetailItem = ({ data }) => {
  const user = useSelector((state) => state.user);
  const navigate = useNavigate();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [reviews, setReviews] = useState([]);
  const [isLoading, setLoading] = useState(false);

  const [userRating, setUserRating] = useState(0);
  const [userComment, setUserComment] = useState("");

  useEffect(() => {
    setLoading(true);
    getAllReview();
  }, []);

  const getAllReview = async () => {
    try {
      await axios
        .get(
          `${process.env.REACT_APP_API_URL}/review/get/${localStorage.getItem(
            "docId"
          )}`
        )
        .then((res) => {
          setReviews(res?.data?.data);
        });
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  const showModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const handleRead = () => {
    localStorage.setItem("doc", data.data);
    navigate(`/view/${data._id}`);
  };

  const handleDownload = async () => {
    const downloadLink = `${process.env.REACT_APP_API_URL}/${data.data}`;
    const link = document.createElement("a");
    link.href = downloadLink;
    link.target = "_blank";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    handleUpdateCountDownload();
  };

  const handleRate = async () => {
    try {
      const userRate = {
        rating: userRating,
        comment: userComment,
        user: user?.id,
        document: localStorage.getItem("docId"),
      };
      await axios
        .post(`${process.env.REACT_APP_API_URL}/review/post-review`, userRate)
        .then((res) => {
          if (res?.data?.status !== "ERROR") {
            msg.success("Đánh giá thành công!");
            setIsModalOpen(false);
            getAllReview();
          }
        });
    } catch (error) {
      console.log(error);
    }
  };

  const handleReviewChange = (newText) => {
    setUserComment(newText);
  };

  const sortedComments = reviews.sort(
    (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
  );

  const calcRating = () => {
    let sum = 0;
    reviews.forEach((item) => {
      sum += item.rating;
    });
    return sum / reviews.length;
  };

  const handleUpdateCountDownload = async () => {
    const formData = new FormData();
    formData.append("down", data?.down + 1);
    try {
      await axios.put(
        `${
          process.env.REACT_APP_API_URL
        }/document/update/${localStorage.getItem("docId")}`,
        formData
      );
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      <WrapperDocsGroup>
        <GroupHeader>
          <GroupText>{"Thông tin tài liệu"}</GroupText>
        </GroupHeader>
        <div style={{ padding: "12px 0", display: "flex" }}>
          <Image
            preview={false}
            style={{
              width: "320px",
              height: "448px",
              borderRadius: "12px",
              boxShadow: "0 0 5px rgba(0,0,0,0.3)",
            }}
            src={`${process.env.REACT_APP_API_URL}/${
              data?.image || "load.gif"
            }`}
          />
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "space-between",
              marginLeft: "16px",
            }}
          >
            <div>
              <h3 style={{ fontSize: "18px", lineHeight: "24px" }}>
                {data?.title}
              </h3>
              <h4
                style={{
                  fontSize: "16px",
                  color: "#959395",
                  lineHeight: "24px",
                  paddingBottom: "12px",
                }}
              >
                {data?.author}
              </h4>
              <div style={{ display: "flex", justifyContent: "space-between" }}>
                <div>
                  <div style={{ height: "24px" }}>
                    <Rate allowHalf disabled value={calcRating()} />
                  </div>
                  <h5 style={{ fontSize: "14px", color: "#0066FF" }}>
                    {reviews.length} đánh giá
                  </h5>
                </div>
                <div>
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "4px",
                      lineHeight: "24px",
                    }}
                  >
                    Lượt tải
                    <IoCloudDownloadOutline />
                  </div>
                  <h5 style={{ fontSize: "14px", color: "#0066FF" }}>
                    {data?.down} lượt tải
                  </h5>
                </div>
              </div>
              <div style={{ paddingTop: "12px" }}>
                <ReadMore text={data?.description || ""} maxLength={500} />
              </div>
            </div>
            <div
              style={{
                display: "flex",
                marginTop: "12px",
                alignItems: "center",
                gap: "12px",
              }}
            >
              <Button onClick={handleRead} type="primary">
                Đọc sách
              </Button>
              <Button onClick={handleDownload} type="primary">
                Tải sách
              </Button>
              <div
                style={{
                  fontSize: "18px",
                  display: "flex",
                  gap: "8px",
                  alignItems: "center",
                }}
              >
                Chia sẻ:
                <ShareIcon
                  style={{
                    fontSize: "24px",
                    lineHeight: "24px",
                    height: "24px",
                    color: "#3B5998",
                  }}
                >
                  <FaFacebook />
                </ShareIcon>
              </div>
            </div>
          </div>
        </div>
      </WrapperDocsGroup>

      <WrapperDocsGroup>
        <GroupHeader>
          <GroupText>{"Đánh giá sách"}</GroupText>
          <Button onClick={showModal} type="primary">
            Đánh giá
          </Button>
        </GroupHeader>
        <Spin spinning={isLoading} style={{ padding: "12px 0" }}>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              paddingBottom: "12px",
            }}
          >
            <Rate allowHalf disabled value={calcRating()} />
            <h5 style={{ marginLeft: "12px", color: "#0066ff" }}>
              {reviews.length} đánh giá
            </h5>
          </div>
          <List
            dataSource={sortedComments}
            pagination={{ pageSize: 3 }}
            renderItem={(doc, index) => (
              <UserRate
                key={index}
                rating={doc.rating}
                comment={doc.comment}
                datePost={moment(doc.createdAt).format("DD/MM/yyy HH:mm:ss")}
                avatar={`${process.env.REACT_APP_API_URL}/avatar/${
                  doc?.user?.avatar || "avatar.jpg"
                }`}
                nameOfUser={doc?.user?.fullName || doc?.user?.userName}
              />
            )}
          />
        </Spin>
      </WrapperDocsGroup>
      <Modal open={isModalOpen} footer={null} onCancel={closeModal}>
        <h1
          style={{
            fontSize: "24px",
            textTransform: "uppercase",
            textAlign: "center",
            color: "#0066ff",
            marginBottom: "24px",
          }}
        >
          Đánh giá của bạn
        </h1>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Rate
            value={userRating}
            onChange={setUserRating}
            style={{ padding: "12px", textAlign: "center", fontSize: "32px" }}
          />
          <TextAreaWithValidation onReviewChange={handleReviewChange} />
          <Button
            onClick={handleRate}
            style={{ marginTop: "12px", width: "fit-content" }}
            type="primary"
          >
            Đánh giá
          </Button>
        </div>
      </Modal>
    </div>
  );
};

export default DetailItem;
