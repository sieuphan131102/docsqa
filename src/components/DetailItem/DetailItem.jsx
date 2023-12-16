import React, { useState } from "react";
import {
  GroupHeader,
  GroupText,
  ShareIcon,
  WrapperDocsGroup,
} from "./DetailItemStyle";
import { Button, Image, Modal, Rate } from "antd";
import { IoCloudDownloadOutline } from "react-icons/io5";
import { FaFacebook } from "react-icons/fa";

import img1 from "../../assets/images/img1.jpeg";
import ReadMore from "./ReadMore";
import UserRate from "../UserRate/UserRate";
import TextAreaWithValidation from "./TextAreaWithWarning";

const text = `Hai cuộc cách mạng công nghiệp đầu tiên đã mang đến những tiến
bộ vượt bậc và vĩ đại trong lịch sử nhân loại bằng việc sử dụng
động cơ hơi nước, động cơ đốt trong và sự phát triển của các
ngành công nghiệp dầu mỏ, hoá chất, thép và điện lực. Nhưng thực
tế, nhân loại và mọi nền kinh tế đang quá phụ thuộc vào nguồn
năng lượng có hạn và đang suy tàn ở mức báo dộng của Trái Đất.
Từ việc khai thác vô tội vạ những nguồn tài nguyên của môi
trường, đến việc sản xuất hàng hoá hay những hành dộng đơn giản
như ăn uống và hấp thụ để góp phần tạo ra sự phát thải CO2 và
những loại khí cùng chất thải gây ô nhiễm - với số lượng ngày
một gia tăng gây nên hiện trạng quá tải cho việc tái tạo của bầu
sinh quyển. Cuốn Cuộc cách mạng công nghiệp lần thứ III này sẽ
cung cấp cho chúng ta những phân tích về thực trạng hiện nay của
môi trường cũng như sự tồn vong của trái đất.Thông quá đó,
chúng ta sẽ biết được vai trò tất yếu của việc phát dộng một
cuộc cách mạng mới. Một cuộc cách mạng trong đó, mọi người đều
có thể tự tạo ra những nhà máy phát điện mini tại nhà hoặc tại
cơ quan bằng việc sử dụng những nguồn năng lượng tái tạo - từ
nguồn năng lượng thiên nhiên vô hạn như nước, gió, và mặt
trời...Tận dụng công nghệ hydro và Internet để lưu trữ, chia sẻ
và phân phát năng lượng một cách rộng rãi dồng thời thay đổi các
loại phương tiện hiện tại thành phương tiện sử dụng pin nhiên
liệu có thể mua và bán điện thông qua một lưới điện thông minh.
Tất cả sẽ tạo nên một cuộc cách mạng công nghiệp lần thứ III -
một hành trình nỗ lực để cải cách năng lượng xanh.`;

const DetailItem = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const showModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
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
            src={img1}
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
                6 Phát Minh Làm Nên Thời Đại
              </h3>
              <h4
                style={{
                  fontSize: "16px",
                  color: "#959395",
                  lineHeight: "24px",
                  paddingBottom: "12px",
                }}
              >
                Steven Johnson
              </h4>
              <div style={{ display: "flex", justifyContent: "space-between" }}>
                <div>
                  <div style={{ height: "24px" }}>
                    <Rate disabled value={4} />
                  </div>
                  <h5 style={{ fontSize: "14px", color: "#0066FF" }}>
                    1 đánh giá
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
                    13 lượt tải
                  </h5>
                </div>
              </div>
              <div style={{ paddingTop: "12px" }}>
                <ReadMore text={text} maxLength={500} />
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
              <Button type="primary">Đọc sách</Button>
              <Button type="primary">Tải sách</Button>
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
        <div style={{ padding: "12px 0" }}>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              paddingBottom: "12px",
            }}
          >
            <Rate disabled value={4} />
            <h5 style={{ marginLeft: "12px", color: "#0066ff" }}>1 đánh giá</h5>
          </div>
          <div>
            <UserRate />
            <UserRate />
            <UserRate />
          </div>
          <div style={{ textAlign: "center", display: "block" }}>
            <Button type="primary">Xem thêm</Button>
          </div>
        </div>
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
            style={{ padding: "12px", textAlign: "center", fontSize: "32px" }}
          />
          <TextAreaWithValidation />
          <Button
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
