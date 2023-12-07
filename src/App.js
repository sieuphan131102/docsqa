import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import NotFound from "./pages/NotFound/NotFound";
import Layout from "./components/Layout";
import { routes } from "./routes/routes";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Layout />}>
          {routes.map((route) => {
            const Page = route.page;
            return (
              <Route key={route.key} path={route.path} element={<Page />} />
            );
          })}
        </Route>
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Router>
  );
}

export default App;
