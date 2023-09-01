import { Routes, Route, Navigate } from "react-router-dom";
import { DashboardPage } from "../pages/DashboardPage";
export const DashboardRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<DashboardPage />}></Route>
      <Route path="/*" element={<Navigate to="/" />}></Route>
    </Routes>
  );
};
