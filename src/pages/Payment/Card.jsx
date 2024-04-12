import { Button, Form, Input, InputNumber } from "antd";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import * as msg from "../../components/Message/Message";
import axios from "axios";
import { updateUser } from "../../redux/slices/userSlice";
import { useNavigate } from "react-router-dom";

const Card = () => {
  const user = useSelector((state) => state.user);
  const [value, setValue] = useState(0);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const onCancel = () => {
    navigate("/");
  };

  const onClick = async () => {
    try {
      if (value === 0) {
        msg.warning("Nhập số tiền cần nạp!");
        return;
      }
      const formData = new FormData();
      formData.append("coin", value + user.coin);
      const res = await axios.put(
        `${process.env.REACT_APP_API_URL}/user/update/${user?.id}`,
        formData
      );
      dispatch(
        updateUser({
          ...user,
          _id: user.id,
          coin: res.data.data.coin,
        })
      );
      msg.success("Nạp thành công");
      navigate("/");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      <Form>
        <Form.Item>
          <label htmlFor="coin-number">Số tiền (1 VND = 1 xu)</label>
          <br />
          <InputNumber
            style={{ width: "100%" }}
            value={value}
            onChange={setValue}
            min={0}
            max={9999999}
            id="coin-number"
          />
        </Form.Item>
        <Form.Item>
          <Input style={{ marginBottom: "4px" }} placeholder="Mã số thẻ" />
          <Input style={{ marginBottom: "4px" }} placeholder="Số seri thẻ" />
          <Input style={{ marginBottom: "4px" }} placeholder="Số điện thoại" />
        </Form.Item>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
          }}
        >
          <Button onClick={onCancel}>Hủy</Button>
          <Button onClick={onClick} type="primary">
            Thanh toán
          </Button>
        </div>
      </Form>
    </div>
  );
};

export default Card;
