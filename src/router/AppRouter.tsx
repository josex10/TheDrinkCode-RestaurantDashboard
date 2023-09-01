import { Navigate, Route, Routes } from "react-router-dom";
import { AuthRoutes } from "../modules/auth/routes/AuthRoutes";
import { useAuthStore } from "../hooks";
import { useEffect } from "react";
import { DashboardRoutes } from "../modules/dashboard/routes";
import { RestaurantRoutes } from "../modules/restaurant/routes";
import { ExpenseRoutes } from "../modules/expense/routes";
import { ProviderRoutes } from "../modules/providers/routes";

export const AppRouter = () => {
  const { status, checkAuthToken } = useAuthStore();
  useEffect(() => {
    checkAuthToken();
  }, []);


  if (status === "checking") {
    return <h3>Loading...</h3>;
  }

  return (
    <Routes>
      {status === "not-authenticated" ? (
        <>
          <Route path="/auth/*" element={<AuthRoutes />} />
          <Route path="/*" element={<Navigate to="/auth/login" />} />
        </>
      ) : (
        <>
          <Route path="/dashboard/*" element={<DashboardRoutes />} />
          <Route path="/restaurant/*" element={<RestaurantRoutes />} />
          <Route path="/expense/*" element={<ExpenseRoutes />} />
          <Route path="/provider/*" element={<ProviderRoutes />} />

          
          <Route path="/*" element={<Navigate to="/dashboard" />} />
        </>
      )}
    </Routes>
  );
};
