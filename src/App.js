import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import NotFound from "./pages/NotFound/NotFound";
import Layout from "./components/Layout";
import { routes } from "./routes/routes";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { jwtDecode } from "jwt-decode";
import axios from "axios";
import { updateUser } from "./redux/slices/userSlice";
import { Spin } from "antd";

function App() {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);
  const [isLoading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    try {
      let accessToken =
        user?.access_token || localStorage.getItem("access_token");
      if (accessToken) {
        const decode = jwtDecode(accessToken);
        if (decode?.id) {
          handleGetDetailsUser(decode?.id, accessToken);
        }
      }
    } catch (error) {
      console.log(error);
    }
    setLoading(false);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleGetDetailsUser = async (id, token) => {
    try {
      const res = await axios.get(
        `${process.env.REACT_APP_API_URL}/user/get/${id}`,
        {
          headers: {
            token: `Bearer ${token}`,
          },
        }
      );
      dispatch(
        updateUser({
          ...res?.data.data,
          access_token: token,
        })
      );
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div style={{ height: "100vh", width: "100%" }}>
      <Spin size="large" spinning={isLoading}>
        <Router>
          <Routes>
            <Route path="/" element={<Layout />}>
              {routes.map((route) => {
                const Page = route.page;
                const isCheckAuth = !route.admin || user.isAdmin;
                return (
                  isCheckAuth && (
                    <Route
                      key={route.key}
                      path={route.path}
                      element={<Page />}
                    />
                  )
                );
              })}
            </Route>
            <Route path="*" element={<NotFound />} />
          </Routes>
        </Router>
      </Spin>
    </div>
  );
}

export default App;
