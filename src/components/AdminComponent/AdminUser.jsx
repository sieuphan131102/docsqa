import { Avatar, Button, Input, Modal, Popconfirm, Space, Table } from "antd";
import axios from "axios";
import React, { useEffect, useRef, useState } from "react";
import { SearchOutlined } from "@ant-design/icons";
import Highlighter from "react-highlight-words";
import { Helmet } from "react-helmet";
import * as message from "../../components/Message/Message";

const AdminUser = () => {
  const searchInput = useRef(null);

  const [users, setUsers] = useState([]);
  const [isLoading, setLoading] = useState(false);
  const [searchText, setSearchText] = useState("");
  const [searchedColumn, setSearchedColumn] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [tableKey, setTableKey] = useState(0);
  const [isAddUserModalOpen, setAddUserModalOpen] = useState(false);

  const [fullName, setFullName] = useState("");
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [address, setAddress] = useState("");
  const [email, setEmail] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [userId, setUserId] = useState("");
  const [fullNameUD, setFullNameUD] = useState("");
  const [userNameUD, setUserNameUD] = useState("");
  const [emailUD, setEmailUD] = useState("");
  const [addressUD, setAddressUD] = useState("");
  const [avatar, setAvatar] = useState("");

  useEffect(() => {
    setLoading(true);
    getAllUser();
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
          <Button onClick={() => handle(record)}>Cập nhật</Button>
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

  const handle = (this_record) => {
    setUserId(this_record._id);
    setFullNameUD(this_record.fullName);
    setUserNameUD(this_record.userName);
    setAddressUD(this_record.address);
    setEmailUD(this_record.email);
    setAvatar(this_record.avatar);
    setIsModalOpen(true);
  };

  const data = users.map((item) => ({ ...item, key: item._id }));

  const handleResetTable = () => {
    setTableKey(tableKey + 1);
    setLoading(true);
    getAllUser();
  };

  const handleError = (err) => message.error(err);

  const handleSuccess = (msg) => message.success(msg);

  const resetInput = () => {
    const form = document.getElementById("formAddUser");
    form.reset();
    setFullName("");
    setUserName("");
    setAddress("");
    setEmail("");
    setPassword("");
    setConfirmPassword("");
  };

  const handleAddUser = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      const { data } = await axios.post(
        `${process.env.REACT_APP_API_URL}/user/register`,
        {
          fullName,
          userName,
          password,
          confirmPassword,
          email,
          address,
        }
      );
      const { status } = data;
      if (status !== "ERROR") {
        handleSuccess("Thêm người dùng thành công");
        resetInput();
        handleResetTable();
      } else {
        handleError("Thêm người dùng thất bại!!!");
        console.log(data);
      }
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
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
            `${process.env.REACT_APP_API_URL}/user/update/${userId}`,
            formData
          )
          .then((res) => {
            if (res?.data?.status !== "ERROR") {
              handleSuccess("Cập avatar thành công!");
              setAvatar(res?.data?.data?.avatar);
              handleResetTable();
            } else {
              handleError("Lỗi cập nhật avatar người dùng");
            }
          });
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleUpdateInfoUser = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("fullName", fullNameUD);
    formData.append("userName", userNameUD);
    formData.append("address", addressUD);
    formData.append("email", emailUD);
    try {
      await axios
        .put(`${process.env.REACT_APP_API_URL}/user/update/${userId}`, formData)
        .then((res) => {
          if (res?.data?.status !== "ERROR") {
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
        <Button onClick={() => setAddUserModalOpen(true)} type="primary">
          Thêm người dùng
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

      {/* Modal show and update user */}
      <Modal open={isModalOpen} onCancel={closeModal} footer={null}>
        <form
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
                src={`${process.env.REACT_APP_API_URL}/avatar/${
                  avatar || "avatar.jpg"
                }`}
              />
              <input
                onChange={handleOnChange}
                type="file"
                accept=".jpeg, .png, .jpg"
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
                {userId}
              </div>
              <div>
                <h3>Họ và tên: </h3>
                <input
                  type="text"
                  onChange={(e) => setFullNameUD(e.target.value)}
                  value={fullNameUD}
                />
              </div>
              <div>
                <h3>Tài khoản: </h3>
                <input
                  type="text"
                  onChange={(e) => setUserNameUD(e.target.value)}
                  value={userNameUD}
                />
              </div>
              <div>
                <h3>Email : </h3>
                <input
                  type="text"
                  onChange={(e) => setEmailUD(e.target.value)}
                  value={emailUD}
                />
              </div>
              <div>
                <h3>Địa chỉ: </h3>
                <input
                  type="text"
                  onChange={(e) => setAddressUD(e.target.value)}
                  value={addressUD}
                />
              </div>
              <div>
                <Button
                  htmlType="submit"
                  onClick={handleUpdateInfoUser}
                  type="primary"
                >
                  Cập nhật
                </Button>
              </div>
            </div>
          </div>
        </form>
      </Modal>

      {/* Modal add user */}
      <Modal
        open={isAddUserModalOpen}
        onCancel={() => setAddUserModalOpen(false)}
        footer={null}
      >
        <h3 style={{ fontSize: "24px", padding: "12px 0" }}>
          Thêm một người dùng mới
        </h3>
        <form id="formAddUser">
          <div>
            <div>
              <h3>Tên người dùng</h3>
              <input
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                type="text"
              />
            </div>
            <div>
              <h3>Tên tài khoản</h3>
              <input
                value={userName}
                onChange={(e) => setUserName(e.target.value)}
                type="text"
              />
            </div>
            <div>
              <h3>Mật khẩu</h3>
              <input
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                type="password"
              />
            </div>
            <div>
              <h3>Nhập lại mật khẩu</h3>
              <input
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                type="password"
              />
            </div>
            <div>
              <h3>Email</h3>
              <input
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                type="text"
              />
            </div>
            <div>
              <h3>Địa chỉ</h3>
              <input
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                type="text"
              />
            </div>
            <Button
              style={{ marginTop: "12px" }}
              onClick={handleAddUser}
              type="primary"
              htmlType="submit"
            >
              Thêm người dùng
            </Button>
          </div>
        </form>
      </Modal>
    </div>
  );
};

export default AdminUser;
