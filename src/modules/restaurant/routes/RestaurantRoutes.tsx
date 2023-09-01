import { Routes, Route, Navigate } from "react-router-dom";
import { RestaurantPage } from "../pages/RestaurantPage";
export const RestaurantRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<RestaurantPage />}></Route>
      <Route path="/*" element={<Navigate to="/" />}></Route>
    </Routes>
  );
};
