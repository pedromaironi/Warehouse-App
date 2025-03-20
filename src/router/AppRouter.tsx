import { HashRouter, Routes, Route } from "react-router-dom";
import LoginPage from "../pages/LoginPage";
import App from "../App";

export const AppRouter = () => {
  return (
    <HashRouter>
      <Routes>
        <Route path="/" element={<App />}>
          <Route path="/" />
          <Route path="/Dashboard" Component={<Dashboard />}
          {/* <Route path="*" element={<Error />} /> */}
        </Route>

        <Route path="login" element={<LoginPage />} />
      </Routes>
    </HashRouter>
  );
};
