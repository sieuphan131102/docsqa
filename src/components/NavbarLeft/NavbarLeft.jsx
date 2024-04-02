import React, { useEffect, useState } from "react";
import {
  ListItem,
  ListNavbar,
  TextNavbar,
  WrapperNavbar,
} from "./NavbarLeftStyle";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setSearchType } from "../../redux/slices/searchSlice";

const NavbarLeft = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [docs, setDocs] = useState([]);
  const [type, setType] = useState([]);

  useEffect(() => {
    getAllDocs();
  }, []);

  const getAllDocs = async () => {
    try {
      await axios
        .get(`${process.env.REACT_APP_API_URL}/document/all`)
        .then((res) => {
          if (res?.data?.status !== "ERROR") {
            setDocs(res?.data?.data);
          }
        });
    } catch (error) {
      console.log(error);
    }
  };

  const handleGoTypePage = (type) => {
    localStorage.setItem("type", JSON.stringify(type));
    dispatch(setSearchType(type._id));
    navigate(`/type`);
  };

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
    <WrapperNavbar>
      <TextNavbar>Thể loại</TextNavbar>
      <ListNavbar>
        {type.map((type) => {
          return (
            <ListItem onClick={() => handleGoTypePage(type)} key={type._id}>
              {type.name}
            </ListItem>
          );
        })}
      </ListNavbar>
    </WrapperNavbar>
  );
};

export default NavbarLeft;
