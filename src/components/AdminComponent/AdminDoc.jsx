import { Button, Input, Modal, Popconfirm, Space, Table } from "antd";
import React, { useEffect, useRef, useState } from "react";
import { SearchOutlined } from "@ant-design/icons";
import Highlighter from "react-highlight-words";
import axios from "axios";
import { useSelector } from "react-redux";
import * as msg from "../../components/Message/Message";
import { Helmet } from "react-helmet";

const AdminDoc = () => {
  const user = useSelector((state) => state.user);
  const searchInput = useRef(null);

  const [tableKey, setTableKey] = useState(0);
  const [isLoading, setLoading] = useState(false);
  const [searchText, setSearchText] = useState("");
  const [searchedColumn, setSearchedColumn] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [docs, setDocs] = useState([]);
  const [isAddDocModalOpen, setAddDocModalOpen] = useState(false);
  const [type, setType] = useState([]);

  const [image, setImage] = useState();
  const [file, setFile] = useState();
  const [nameDoc, setNameDoc] = useState("");
  const [authorDoc, setAuthorDoc] = useState("");
  const [typeDoc, setTypeDoc] = useState("");
  const [descriptionDoc, setDescriptionDoc] = useState("");

  const [idDoc, setIdDoc] = useState("");
  const [imageUD, setImageUD] = useState();
  const [fileUD, setFileUD] = useState();
  const [nameDocUD, setNameDocUD] = useState("");
  const [authorDocUD, setAuthorDocUD] = useState("");
  const [typeDocUD, setTypeDocUD] = useState("");
  const [descriptionDocUD, setDescriptionDocUD] = useState("");

  console.log(typeDocUD);

  useEffect(() => {
    setLoading(true);
    getAllDocs();
  }, []);

  const getAllDocs = async () => {
    try {
      const res = await axios.get(
        `${process.env.REACT_APP_API_URL}/document/all`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("access_token")}`,
          },
        }
      );
      setDocs(res?.data?.data);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  const handleResetTable = () => {
    setTableKey(tableKey + 1);
    setLoading(true);
    getAllDocs();
  };

  const getColumnSearchProps = (dataIndex) => ({
    filterDropdown: ({
      setSelectedKeys,
      selectedKeys,
      confirm,
      clearFilters,
      close,
    }) => (
      <div
        style={{
          padding: 8,
        }}
        onKeyDown={(e) => e.stopPropagation()}
      >
        <Input
          ref={searchInput}
          placeholder={`Search ${dataIndex}`}
          value={selectedKeys[0]}
          onChange={(e) =>
            setSelectedKeys(e.target.value ? [e.target.value] : [])
          }
          onPressEnter={() => handleSearch(selectedKeys, confirm, dataIndex)}
          style={{
            marginBottom: 8,
            display: "block",
          }}
        />
        <Space>
          <Button
            type="primary"
            onClick={() => handleSearch(selectedKeys, confirm, dataIndex)}
            icon={<SearchOutlined />}
            size="small"
            style={{
              width: 90,
            }}
          >
            Search
          </Button>
          <Button
            onClick={() => clearFilters && handleReset(clearFilters)}
            size="small"
            style={{
              width: 90,
            }}
          >
            Reset
          </Button>
          <Button
            type="link"
            size="small"
            onClick={() => {
              confirm({
                closeDropdown: false,
              });
              setSearchText(selectedKeys[0]);
              setSearchedColumn(dataIndex);
            }}
          >
            Filter
          </Button>
          <Button
            type="link"
            size="small"
            onClick={() => {
              close();
            }}
          >
            close
          </Button>
        </Space>
      </div>
    ),
    filterIcon: (filtered) => (
      <SearchOutlined
        style={{
          color: filtered ? "#1677ff" : undefined,
        }}
      />
    ),
    onFilter: (value, record) =>
      record[dataIndex] &&
      record[dataIndex].toString().toLowerCase().includes(value.toLowerCase()),
    onFilterDropdownOpenChange: (visible) => {
      if (visible) {
        setTimeout(() => searchInput.current?.select(), 100);
      }
    },
    render: (text) =>
      searchedColumn === dataIndex ? (
        <Highlighter
          highlightStyle={{
            backgroundColor: "#ffc069",
            padding: 0,
          }}
          searchWords={[searchText]}
          autoEscape
          textToHighlight={text ? text.toString() : ""}
        />
      ) : (
        text
      ),
  });

  const columns = [
    {
      title: "Tên tài liệu",
      dataIndex: "title",
      key: "title",
      ...getColumnSearchProps("title"),
    },
    {
      title: "Tác giả",
      dataIndex: "author",
      key: "author",
      ...getColumnSearchProps("author"),
    },
    {
      title: "Thể loại",
      dataIndex: "type",
      key: "type",
      ...getColumnSearchProps("type"),
    },
    {
      title: "Đánh giá",
      dataIndex: "rating",
      key: "rating",
      ...getColumnSearchProps("rating"),
    },
    {
      title: "Lượt xem",
      dataIndex: "view",
      key: "view",
      ...getColumnSearchProps("view"),
    },
    {
      title: "Lượt tải",
      dataIndex: "down",
      key: "down",
      ...getColumnSearchProps("down"),
    },
    {
      title: "Chức năng",
      key: "action",
      render: (record) => (
        <span style={{ display: "flex", gap: "8px" }}>
          <Popconfirm
            title="Bạn muốn xóa à?"
            onConfirm={() => handleDelete(record.key)}
          >
            <Button>Xóa</Button>
          </Popconfirm>
          <Button onClick={() => handleOpenModalUpdate(record)}>
            Cập nhật
          </Button>
        </span>
      ),
    },
  ];

  const handleDelete = async (id) => {
    try {
      await axios
        .delete(`${process.env.REACT_APP_API_URL}/document/delete/${id}`, {
          headers: {
            token: `Bearer ${user?.access_token}`,
          },
        })
        .then((res) => {
          if (res?.data?.status !== "ERROR") {
            msg.success("Xóa tài liệu thành công!");
            handleResetTable();
          } else {
            msg.error(res?.data?.message);
          }
        });
    } catch (error) {
      console.log(error);
    }
  };

  const handleOpenModalUpdate = (this_record) => {
    console.log(this_record);
    setIdDoc(this_record._id);
    setNameDocUD(this_record.title);
    setAuthorDocUD(this_record.author);
    setTypeDocUD(this_record.type._id);
    setDescriptionDocUD(this_record.description);
    setImageUD(this_record.image);
    setFileUD(this_record.data);
    setIsModalOpen(true);
  };

  const handleSearch = (selectedKeys, confirm, dataIndex) => {
    confirm();
    setSearchText(selectedKeys[0]);
    setSearchedColumn(dataIndex);
  };

  const handleReset = (clearFilters) => {
    clearFilters();
    setSearchText("");
  };

  const handlePost = async (e) => {
    e.preventDefault();
    try {
      const formData = new FormData();
      formData.append("title", nameDoc);
      formData.append("author", authorDoc);
      formData.append("type", typeDoc);
      formData.append("description", descriptionDoc);
      if (image === undefined) {
        msg.warning("Chọn hình ảnh cần thêm!!!");
        return;
      } else {
        formData.append("image", image);
      }
      if (file === undefined) {
        msg.warning("Chọn file cần thêm!!!");
        return;
      } else {
        formData.append("data", file);
      }

      await axios
        .post(`${process.env.REACT_APP_API_URL}/document/create`, formData)
        .then((res) => {
          if (res?.data?.status !== "ERROR") {
            msg.success("Thêm tài liệu thành công!");
            handleResetTable();
            resetInput();
          } else {
            msg.error(res?.data?.message);
          }
        });
    } catch (error) {
      console.log(error);
    }
  };

  const resetInput = () => {
    const form = document.getElementById("formAddDoc");
    form.reset();
    setNameDoc("");
    setAuthorDoc("");
    setTypeDoc("");
    setDescriptionDoc("");
  };

  const handleUpdateDoc = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("title", nameDocUD);
    formData.append("author", authorDocUD);
    formData.append("type", typeDocUD);
    formData.append("description", descriptionDocUD);
    formData.append("image", imageUD);
    formData.append("data", fileUD);
    try {
      await axios
        .put(
          `${process.env.REACT_APP_API_URL}/document/update/${idDoc}`,
          formData
        )
        .then((res) => {
          if (res?.data?.status !== "ERROR") {
            msg.success("Cập nhật thành công!");
            setIsModalOpen(false);
            handleResetTable();
          } else {
            msg.error("Cập nhật thất bại!!!");
          }
        });
    } catch (error) {
      console.log(error);
    }
  };

  const calcRating = (reviews) => {
    let sum = 0;
    if (reviews.length !== 0) {
      reviews.forEach((item) => {
        sum += item.rating;
      });
      return sum / reviews.length;
    }
    return 0;
  };

  const data = docs.map((item) => ({
    ...item,
    key: item._id,
    rating: calcRating(item.reviews) + "🤩",
    type: item.type.name,
  }));

  useEffect(() => {
    const getAllType = async () => {
      try {
        const res = await axios.get(
          `${process.env.REACT_APP_API_URL}/category/all`
        );
        setType(res.data);
      } catch (error) {
        console.log(error);
      }
    };
    getAllType();
  }, []);

  return (
    <div>
      <Helmet>
        <title>Admin Page | Quản lý tài liệu</title>
      </Helmet>
      <div style={{ display: "flex", gap: "12px", marginBottom: "12px" }}>
        <Button onClick={() => setAddDocModalOpen(true)} type="primary">
          Thêm tài liệu
        </Button>
        <Button onClick={handleResetTable} type="primary">
          Làm mới
        </Button>
      </div>
      <Table
        pagination={{ pageSize: 4 }}
        key={tableKey}
        loading={isLoading}
        columns={columns}
        dataSource={data}
      />

      {/* Modal add document */}
      <Modal
        open={isAddDocModalOpen}
        onCancel={() => setAddDocModalOpen(false)}
        footer={null}
      >
        <h3 style={{ fontSize: "24px", padding: "12px 0" }}>
          Thêm một tài liệu mới
        </h3>
        <form
          id="formAddDoc"
          style={{
            display: "flex",
            justifyContent: "space-between",
          }}
        >
          <div>
            <div>
              <h3>Tên tài liệu</h3>
              <input
                value={nameDoc}
                onChange={(e) => setNameDoc(e.target.value)}
                type="text"
              />
            </div>
            <div>
              <h3>Tác giả</h3>
              <input
                value={authorDoc}
                onChange={(e) => setAuthorDoc(e.target.value)}
                type="text"
              />
            </div>
            <div>
              <h3>Thể loại</h3>
              <select
                value={typeDoc}
                onChange={(e) => setTypeDoc(e.target.value)}
                name="type"
                id="type"
              >
                {type.map((item) => (
                  <option key={item._id} value={item._id}>
                    {item.name}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <h3>Mô tả</h3>
              <input
                value={descriptionDoc}
                onChange={(e) => setDescriptionDoc(e.target.value)}
                type="text"
              />
            </div>
          </div>
          <div>
            <div>
              <h3>Tải lên ảnh bìa</h3>
              <input
                onChange={(e) => {
                  setImage(e.target.files[0]);
                }}
                type="file"
                accept=".jpeg, .png, .jpg"
              />
            </div>
            <div>
              <h3>Tải lên tài liệu</h3>
              <input
                onChange={(e) => setFile(e.target.files[0])}
                type="file"
                accept=".pdf"
              />
            </div>
            <Button
              style={{ marginTop: "12px" }}
              htmlType="submit"
              onClick={handlePost}
              type="primary"
            >
              Thêm tài liệu
            </Button>
          </div>
        </form>
      </Modal>

      {/* Modal update document info */}
      <Modal
        open={isModalOpen}
        onCancel={() => setIsModalOpen(false)}
        footer={null}
      >
        <h3 style={{ fontSize: "24px", padding: "12px 0" }}>
          Cập nhật thông tin tài liệu
        </h3>
        <form
          style={{
            display: "flex",
            justifyContent: "space-between",
          }}
        >
          <div>
            <div>
              <h3>Tên tài liệu</h3>
              <input
                value={nameDocUD}
                onChange={(e) => setNameDocUD(e.target.value)}
                type="text"
              />
            </div>
            <div>
              <h3>Tác giả</h3>
              <input
                value={authorDocUD}
                onChange={(e) => setAuthorDocUD(e.target.value)}
                type="text"
              />
            </div>
            <div>
              <h3>Thể loại</h3>
              <select
                value={typeDocUD}
                onChange={(e) => setTypeDocUD(e.target.value)}
                name="type"
                id="type"
              >
                {type.map((item) => (
                  <option key={item._id} value={item._id}>
                    {item.name}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <h3>Mô tả</h3>
              <input
                value={descriptionDocUD}
                onChange={(e) => setDescriptionDocUD(e.target.value)}
                type="text"
              />
            </div>
          </div>
          <div>
            <div>
              <h3>Tải lên ảnh bìa</h3>
              <input
                onChange={(e) => setImageUD(e.target.files[0])}
                type="file"
                accept=".jpeg, .png, .jpg"
              />
            </div>
            <div>
              <h3>Tải lên tài liệu</h3>
              <input
                onChange={(e) => setFileUD(e.target.files[0])}
                type="file"
                accept=".pdf"
              />
            </div>
            <Button
              style={{ marginTop: "12px" }}
              onClick={handleUpdateDoc}
              htmlType="submit"
              type="primary"
            >
              Cập nhật tài liệu
            </Button>
          </div>
        </form>
      </Modal>
    </div>
  );
};

export default AdminDoc;
