import Home from "../pages/Home/Home";
import Login from "../pages/Login/Login";
import Register from "../pages/Register/Register";

export const routes = [
  {
    key: "home-page",
    path: "/",
    page: Home,
  },
  {
    key: "login-page",
    path: "/login",
    page: Login,
  },
  {
    key: "register-page",
    path: "/register",
    page: Register,
  },
];
