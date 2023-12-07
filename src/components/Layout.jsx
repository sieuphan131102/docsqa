import React from "react";
import { Outlet } from "react-router-dom";

import Header from "../components/Header/Header";
import { FloatButton } from "antd";
import Footer from "./Footer/Footer";

const Layout = () => {
  return (
    <main>
      <Header />
      <Outlet />
      <Footer />
      <FloatButton.BackTop type="primary" />
    </main>
  );
};

export default Layout;
