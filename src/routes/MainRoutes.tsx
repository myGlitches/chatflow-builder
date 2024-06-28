import { Routes, Route } from "react-router-dom";
import PrivateRoutes from "./PrivateRoutes";
import Login from "@/components/authentication/Login";
import MainLayout from "@/layouts/MainLayout";

function MainRoutes() {
  const isAuthenticated = true; //TODO: Auth logic

  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route element={<PrivateRoutes isAuthenticated={isAuthenticated} />}>
        <Route path="/" element={<MainLayout />} />
      </Route>
    </Routes>
  );
}

export default MainRoutes;
