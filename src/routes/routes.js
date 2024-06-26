import Home from "../pages/Home/Home";
import Login from "../pages/Login/Login";
import Register from "../pages/Register/Register";
import DocDetail from "../pages/DocDetail/DocDetail";
import DocType from "../pages/DocType/DocType";
import Search from "../pages/Search/Search";
import UserProfile from "../pages/UserProfile/UserProfile";
import Admin from "../pages/Admin/Admin";
import ViewPdf from "../pages/ViewPdf/ViewPdf";
import Payment from "../pages/Payment/Payment";
import Buy from "../pages/Payment/Buy";
import History from "../pages/History/History";
import HistoryPayment from "../pages/History/HistoryPayment";

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
  {
    key: "doc-detail-page",
    path: "/detail/:id",
    page: DocDetail,
  },
  {
    key: "doc-type-page",
    path: "/type",
    page: DocType,
  },
  {
    key: "search-result-page",
    path: "/search-result",
    page: Search,
  },
  {
    key: "user-profile",
    path: "/profile/:id",
    page: UserProfile,
  },
  {
    key: "admin",
    path: "/admin",
    admin: true,
    page: Admin,
  },
  {
    key: "view-pdf",
    path: "/view/:id",
    page: ViewPdf,
  },
  {
    key: "payment",
    path: "/payment",
    page: Payment,
  },
  {
    key: "buy",
    path: "/buy/:id",
    page: Buy,
  },
  {
    key: "histoty",
    path: "/history",
    page: History,
  },
  {
    key: "history-payment",
    path: "/history-payment",
    page: HistoryPayment,
  },
];
