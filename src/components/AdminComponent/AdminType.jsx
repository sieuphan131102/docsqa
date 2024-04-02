import { Button, Input, Modal, Popconfirm, Space, Table } from "antd";
import React, { useEffect, useRef, useState } from "react";
import { SearchOutlined } from "@ant-design/icons";
import Highlighter from "react-highlight-words";
import axios from "axios";
import * as message from "../../components/Message/Message";
import { Helmet } from "react-helmet";

const AdminType = () => {
  const searchInput = useRef(null);

  const [types, setTypes] = useState([]);
  const [isLoading, setLoading] = useState(false);
  const [searchText, setSearchText] = useState("");
  const [searchedColumn, setSearchedColumn] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [tableKey, setTableKey] = useState(0);
  const [isAddTypeModalOpen, setAddTypeModalOpen] = useState(false);

  const [name, setName] = useState("");
  const [des, setDes] = useState("");

  const [typeId, setTypeId] = useState("");
  const [nameUD, setNameUD] = useState("");
  const [desUD, setDesUD] = useState("");

  useEffect(() => {
    setLoading(true);
    getAllType();
  }, []);

  const handleSearch = (selectedKeys, confirm, dataIndex) => {
    confirm();
    setSearchText(selectedKeys[0]);
    setSearchedColumn(dataIndex);
  };

  const handleReset = (clearFilters) => {
    clearFilters();
    setSearchText("");
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

  const getAllType = async () => {
    try {
      const res = await axios.get(
        `${process.env.REACT_APP_API_URL}/category/all`
      );
      setTypes(res.data);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  const columns = [
    {
      title: "ID",
      dataIndex: "_id",
      key: "_id",
      ...getColumnSearchProps("_id"),
    },
    {
      title: "Tên thể loại",
      dataIndex: "name",
      key: "name",
      ...getColumnSearchProps("name"),
    },
    {
      title: "Mô tả thể loại",
      dataIndex: "des",
      key: "des",
      ...getColumnSearchProps("des"),
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
          <Button onClick={() => handle(record)}>Cập nhật</Button>
        </span>
      ),
    },
  ];

  const handleDelete = async (id) => {
    try {
      await axios.delete(
        `${process.env.REACT_APP_API_URL}/category/delete/${id}`
      );
    } catch (error) {
      console.log(error);
    } finally {
      handleResetTable();
    }
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const handle = (this_record) => {
    setTypeId(this_record._id);
    setNameUD(this_record.name);
    setDesUD(this_record.des);
    setIsModalOpen(true);
  };

  const data = types.map((item) => ({ ...item, key: item._id }));

  const handleResetTable = () => {
    setTableKey(tableKey + 1);
    setLoading(true);
    getAllType();
  };

  const handleError = (err) => message.error(err);

  const handleSuccess = (msg) => message.success(msg);

  const resetInput = () => {
    const form = document.getElementById("formAddUser");
    form.reset();
    setName("");
    setDes("");
  };

  const handleAddType = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      const res = await axios.post(
        `${process.env.REACT_APP_API_URL}/category/create`,
        {
          name,
          des,
        }
      );
      if (res.status === 201) {
        handleSuccess("Thêm thành công");
        resetInput();
        handleResetTable();
      } else {
        handleError("Thêm thất bại!!!");
        console.log(data);
      }
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  const handleUpdateType = async (e) => {
    e.preventDefault();
    try {
      await axios
        .put(`${process.env.REACT_APP_API_URL}/category/update/${typeId}`, {
          name: nameUD,
          des: desUD,
        })
        .then((res) => {
          if (res.status === 200) {
            handleSuccess("Cập nhật thành công!");
            closeModal();
            handleResetTable();
          } else {
            handleError("Cập nhật thất bại!!!");
          }
        });
    } catch (error) {
      console.log("Error: " + error);
    }
  };

  return (
    <div>
      <Helmet>
        <title>Admin Page | Quản lý người dùng</title>
      </Helmet>
      <div style={{ display: "flex", gap: "12px", marginBottom: "12px" }}>
        <Button onClick={() => setAddTypeModalOpen(true)} type="primary">
          Thêm thể loại
        </Button>
        <Button onClick={handleResetTable} type="primary">
          Làm mới
        </Button>
      </div>
      <Table
        key={tableKey}
        loading={isLoading}
        columns={columns}
        dataSource={data}
      />

      {/* Modal show and update category */}
      <Modal open={isModalOpen} onCancel={closeModal} footer={null}>
        <form
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <h3 style={{ fontSize: "24px", padding: "32px 0" }}>
            Thông tin thể loại
          </h3>
          <div style={{ display: "flex", gap: "24px" }}>
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                gap: "4px",
                border: "1px #ccc solid",
                padding: "12px",
              }}
            >
              <div>
                <h3>ID: </h3>
                {typeId}
              </div>
              <div>
                <h3>Tên thể loại: </h3>
                <input
                  type="text"
                  onChange={(e) => setNameUD(e.target.value)}
                  value={nameUD}
                />
              </div>
              <div>
                <h3>Mô tả thể loại: </h3>
                <input
                  type="text"
                  onChange={(e) => setDesUD(e.target.value)}
                  value={desUD}
                />
              </div>
              <div>
                <Button
                  htmlType="submit"
                  onClick={handleUpdateType}
                  type="primary"
                >
                  Cập nhật
                </Button>
              </div>
            </div>
          </div>
        </form>
      </Modal>

      {/* Modal add category */}
      <Modal
        open={isAddTypeModalOpen}
        onCancel={() => setAddTypeModalOpen(false)}
        footer={null}
      >
        <h3 style={{ fontSize: "24px", padding: "12px 0" }}>
          Thêm một thể loại mới
        </h3>
        <form id="formAddUser">
          <div>
            <div>
              <h3>Tên thể loại</h3>
              <input
                value={name}
                onChange={(e) => setName(e.target.value)}
                type="text"
              />
            </div>
            <div>
              <h3>Mô tả thể loại</h3>
              <input
                value={des}
                onChange={(e) => setDes(e.target.value)}
                type="text"
              />
            </div>
            <Button
              style={{ marginTop: "12px" }}
              onClick={handleAddType}
              type="primary"
              htmlType="submit"
            >
              Thêm thể loại
            </Button>
          </div>
        </form>
      </Modal>
    </div>
  );
};

export default AdminType;
