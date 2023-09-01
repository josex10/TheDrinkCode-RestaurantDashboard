import { Routes, Route, Navigate } from "react-router-dom";
import { MainPage } from "../pages";
export const ExpenseRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<MainPage />}></Route>
      <Route path="/*" element={<Navigate to="/" />}></Route>
    </Routes>
  );
};
