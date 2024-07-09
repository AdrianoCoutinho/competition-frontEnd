import { Navigate, Route, Routes } from "react-router-dom";
import Competition from "../pages/competition/Competition";
import DashboardClipper from "../pages/dashboard-clipper/DashboardClipper";
import Dashboard from "../pages/dashboard/Dashboard";
import Painel from "../pages/painel/Painel";

export const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Painel />} />
      <Route path="/dashboard" element={<Dashboard />} />
      <Route path="/competition" element={<Competition />} />
      <Route path="/dashboard-clipper" element={<DashboardClipper />} />
      <Route path="*" element={<Navigate to="/" />} />
    </Routes>
  );
};
