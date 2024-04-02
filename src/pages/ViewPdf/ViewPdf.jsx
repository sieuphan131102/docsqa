import React, { useEffect, useState } from "react";
import { Container } from "./ViewPdfStyle";
import NavbarLeft from "../../components/NavbarLeft/NavbarLeft";
import { Document, Page } from "react-pdf";
import { pdfjs } from "react-pdf";
import "react-pdf/dist/Page/AnnotationLayer.css";
import "react-pdf/dist/Page/TextLayer.css";
import { Button, FloatButton, Input } from "antd";
import * as msg from "../../components/Message/Message";
import { ZoomInOutlined, ZoomOutOutlined } from "@ant-design/icons";
import { Helmet } from "react-helmet";
import { useParams } from "react-router-dom";
import axios from "axios";
import { useSelector } from "react-redux";

pdfjs.GlobalWorkerOptions.workerSrc = new URL(
  "pdfjs-dist/build/pdf.worker.min.js",
  import.meta.url
).toString();

const ViewPdf = () => {
  const { id } = useParams();
  const [numPages, setNumPages] = useState();
  const [pageNumber, setPageNumber] = useState(1);
  const [scale, setScale] = useState(1);
  const [doc, setDoc] = useState(null);
  const [payment, setPayment] = useState([]);
  const user = useSelector((state) => state.user);

  useEffect(() => {
    const getDoc = async () => {
      try {
        const res = await axios.get(
          `${process.env.REACT_APP_API_URL}/document/get/${id}`
        );
        setDoc(res.data.data);
      } catch (error) {
        console.log(error);
      }
    };
    getDoc();
  }, [id]);

  useEffect(() => {
    const handleKeyPress = (event) => {
      if (event.key === "ArrowLeft" && pageNumber > 1) {
        setPageNumber((prevPageNumber) => prevPageNumber - 1);
        window.scrollTo({
          top: 0,
          behavior: "smooth",
        });
      } else if (event.key === "ArrowRight" && pageNumber < numPages) {
        setPageNumber((prevPageNumber) => prevPageNumber + 1);
        window.scrollTo({
          top: 0,
          behavior: "smooth",
        });
      }
    };
    document.addEventListener("keydown", handleKeyPress);
    return () => {
      document.removeEventListener("keydown", handleKeyPress);
    };
  }, [numPages, pageNumber]);

  const onDocumentLoadSuccess = ({ numPages }) => {
    if (doc?.price === 0 || isPaymented(id)) {
      setNumPages(numPages);
    } else {
      setNumPages(10);
    }
  };

  const handlePrevious = () => {
    if (pageNumber > 1) {
      setPageNumber(pageNumber - 1);
      window.scrollTo({
        top: 0,
        behavior: "smooth",
      });
    }
  };

  const handleNext = () => {
    if (pageNumber < numPages) {
      setPageNumber(pageNumber + 1);
      window.scrollTo({
        top: 0,
        behavior: "smooth",
      });
    }
  };

  const handleChangePage = (e) => {
    const num = Number(e.target.value);
    if (isNaN(num)) {
      msg.warning("Số trang không hợp lệ!");
      return;
    }
    if (num < 1 || num > numPages) {
      msg.warning("Số trang không hợp lệ!");
      return;
    } else {
      setPageNumber(num);
      window.scrollTo({
        top: 0,
        behavior: "smooth",
      });
    }
  };

  const handleFocus = (event) => {
    event.target.select();
  };

  const handleZoomIn = () => {
    const bodyDoc = document.querySelector(".bodyDoc");
    if (bodyDoc.clientWidth >= 928) {
      return;
    }
    setScale(scale + 0.1);
  };

  const handleZoomOut = () => {
    if (scale <= 1) {
      return;
    }
    setScale(scale - 0.1);
  };

  useEffect(() => {
    const getPayments = async () => {
      try {
        const res = await axios.get(
          `${process.env.REACT_APP_API_URL}/user/payment/get/${user.id}`
        );
        setPayment(res.data);
      } catch (error) {
        console.log(error);
      }
    };
    if (user.id) {
      getPayments();
    }
  }, [user]);

  const isPaymented = (docId) => {
    for (let i = 0; i < payment.length; i++) {
      if (payment[i].bookId._id === docId) {
        return true;
      }
    }
    return false;
  };

  return (
    <div style={{ backgroundColor: "#eeefff" }}>
      <Helmet>
        <title>{`Xem tài liệu`}</title>
      </Helmet>
      <Container>
        <NavbarLeft />
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            width: "976px",
            marginTop: "12px",
            padding: "24px",
            border: "1px #ccc solid",
            borderRadius: "8px",
            boxShadow: "0 0 10px rgba(0, 0, 0, 0.1)",
          }}
        >
          <Document
            className={"bodyDoc"}
            file={`${process.env.REACT_APP_API_URL}/${doc?.data}`}
            onLoadSuccess={onDocumentLoadSuccess}
          >
            <Page scale={scale} pageNumber={pageNumber} />
          </Document>
          <div
            style={{
              display: "flex",
              width: "280px",
              gap: "8px",
              marginTop: "12px",
              alignItems: "center",
            }}
          >
            <Button onClick={handlePrevious} size="small">
              Trang trước
            </Button>
            <Input
              onClick={handleFocus}
              style={{ textAlign: "center" }}
              value={pageNumber}
              onChange={handleChangePage}
              size="small"
            />
            /{numPages}
            <Button onClick={handleNext} size="small">
              Trang sau
            </Button>
          </div>
          <FloatButton.Group>
            <FloatButton onClick={handleZoomIn} icon={<ZoomInOutlined />} />
            <FloatButton onClick={handleZoomOut} icon={<ZoomOutOutlined />} />
          </FloatButton.Group>
        </div>
      </Container>
    </div>
  );
};

export default ViewPdf;
