import { Routes, Route, Navigate } from "react-router-dom";
import { MainPage } from "../pages";
export const ProviderRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<MainPage />}></Route>
      <Route path="/*" element={<Navigate to="/" />}></Route>
    </Routes>
  );
};