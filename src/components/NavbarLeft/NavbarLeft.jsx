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
    localStorage.setItem("type", type);
    dispatch(setSearchType(type));
    navigate(`/type/${type}`);
  };

  const arrType = [...new Set(docs.map((item) => item.type))];

  return (
    <WrapperNavbar>
      <TextNavbar>Thể loại</TextNavbar>
      <ListNavbar>
        {arrType.map((type) => {
          return (
            <ListItem onClick={() => handleGoTypePage(type)} key={type}>
              {type}
            </ListItem>
          );
        })}
      </ListNavbar>
    </WrapperNavbar>
  );
};

export default NavbarLeft;
