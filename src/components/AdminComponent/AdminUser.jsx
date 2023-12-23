import { Avatar, Button, Input, Modal, Popconfirm, Space, Table } from "antd";
import axios from "axios";
import React, { useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";
import { SearchOutlined } from "@ant-design/icons";
import Highlighter from "react-highlight-words";
import avatarDefault from "../../assets/images/avatar-cute.jpg";
import moment from "moment";

const AdminUser = () => {
  const user = useSelector((state) => state.user);
  const searchInput = useRef(null);

  const [users, setUsers] = useState([]);
  const [isLoading, setLoading] = useState(false);
  const [searchText, setSearchText] = useState("");
  const [searchedColumn, setSearchedColumn] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [record, setRecord] = useState({});
  const [tableKey, setTableKey] = useState(0);

  useEffect(() => {
    setLoading(true);
    getAllUser();
    // eslint-disable-next-line react-hooks/exhaustive-deps
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

  const getAllUser = async () => {
    try {
      const res = await axios.get(`${process.env.REACT_APP_API_URL}/user/all`, {
        headers: {
          token: `Bearer ${localStorage.getItem("access_token")}`,
        },
      });
      setUsers(res?.data?.data);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  const columns = [
    {
      title: "Họ & Tên",
      dataIndex: "fullName",
      key: "name",
      ...getColumnSearchProps("fullName"),
    },
    {
      title: "Tài khoản",
      dataIndex: "userName",
      key: "user-name",
      ...getColumnSearchProps("userName"),
    },
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
      ...getColumnSearchProps("email"),
    },
    {
      title: "Địa chỉ",
      dataIndex: "address",
      key: "address",
      ...getColumnSearchProps("address"),
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
          <Button onClick={() => handleShowMore(record)}>Xem thông tin</Button>
        </span>
      ),
    },
  ];

  const handleDelete = async (id) => {
    try {
      await axios.delete(`${process.env.REACT_APP_API_URL}/user/delete/${id}`, {
        headers: {
          token: `Bearer ${localStorage.getItem("access_token")}`,
        },
      });
    } catch (error) {
      console.log(error);
    } finally {
      handleResetTable();
    }
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const handleShowMore = (this_record) => {
    setRecord(this_record);
    setIsModalOpen(true);
  };

  const data = users.map((item) => ({ ...item, key: item._id }));

  const handleResetTable = () => {
    setTableKey(tableKey + 1);
    setLoading(true);
    getAllUser();
  };

  return (
    <div>
      <Button
        onClick={handleResetTable}
        style={{ marginBottom: "12px" }}
        type="primary"
      >
        Làm mới
      </Button>
      <Table
        key={tableKey}
        loading={isLoading}
        columns={columns}
        dataSource={data}
      />
      <Modal open={isModalOpen} onCancel={closeModal} footer={null}>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <h3 style={{ fontSize: "24px", padding: "32px 0" }}>
            Thông tin người dùng
          </h3>
          <div style={{ display: "flex", gap: "24px" }}>
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                gap: "12px",
                alignItems: "center",
              }}
            >
              <Avatar
                shape="square"
                size={240}
                src={record?.avatar || avatarDefault}
              />
              <h3>Ảnh đại diện</h3>
            </div>
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
                {record?.key}
              </div>
              <div>
                <h3>Họ và tên: </h3>
                {record?.fullName}
              </div>
              <div>
                <h3>Tài khoản: </h3>
                {record?.userName}
              </div>
              <div>
                <h3>Email : </h3>
                {record?.email}
              </div>
              <div>
                <h3>Địa chỉ: </h3>
                {record?.address}
              </div>
              <div>
                <h3>
                  Ngày tạo:{" "}
                  {moment(record?.createdAt).format("DD/MM/yyyy HH:mm:ss")}
                </h3>
              </div>
            </div>
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default AdminUser;
