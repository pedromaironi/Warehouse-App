import { HashRouter, Routes, Route } from "react-router-dom";
import LoginPage from "../features/auth/LoginPage";
import Dashboard from "../features/dashboard/Dashboard";

export const AppRouter = () => {
  return (
    <HashRouter>
      <Routes>
        {/* Default login page */}
        <Route path="/" element={<LoginPage />} />

        {/* Dashboard page */}
        {/* <Route path="/dashboard" element={<Dashboard />} /> */}

        {/* Catch-all (optional for handling 404s) */}
        {/* <Route path="*" element={<Error />} /> */}
        <Route path="/dashboard/*" element={<Dashboard />} />
      </Routes>
    </HashRouter>
  );
};
