import { createHashRouter, Navigate, Outlet } from "react-router";
import { Login } from "./pages/Login";
import { ProfileUpdate } from "./pages/user/ProfileUpdate";
import { UserDashboard } from "./pages/user/UserDashboard";
import { UserLayout } from "./components/UserLayout";
import { GestorLayout } from "./components/GestorLayout";
import { GestorDashboard } from "./pages/gestor/GestorDashboard";
import { Approvals } from "./pages/gestor/Approvals";
import { MissionMap } from "./pages/gestor/MissionMap";
import { EmployeeRegistry } from "./pages/EmployeeRegistry";
import { DiplomaticRotation } from "./pages/DiplomaticRotation";
import { CareerEvaluation } from "./pages/CareerEvaluation";
import { LegalCompliance } from "./pages/LegalCompliance";
import { Attendance } from "./pages/Attendance";
import { GestorLeave } from "./pages/gestor/GestorLeave";
import { NotFound } from "./pages/NotFound";

function RequireAuth() {
  const stored = localStorage.getItem("sigep_user");
  if (!stored) return <Navigate to="/login" replace />;
  return <Outlet />;
}

export const router = createHashRouter([
  {
    path: "/",
    element: <Navigate to="/login" replace />,
  },
  {
    path: "/login",
    Component: Login,
  },
  {
    element: <RequireAuth />,
    children: [
      {
        path: "/user/profile-update",
        Component: ProfileUpdate,
      },
      {
        path: "/user",
        Component: UserLayout,
        children: [
          { index: true, element: <Navigate to="/user/dashboard" replace /> },
          { path: "dashboard", Component: UserDashboard },
          { path: "rotation", Component: DiplomaticRotation },
          { path: "career", Component: CareerEvaluation },
          { path: "attendance", Component: Attendance },
        ],
      },
      {
        path: "/gestor",
        Component: GestorLayout,
        children: [
          { index: true, Component: GestorDashboard },
          { path: "approvals", Component: Approvals },
          { path: "mission-map", Component: MissionMap },
          { path: "employees", Component: EmployeeRegistry },
          { path: "rotation", Component: DiplomaticRotation },
          { path: "career", Component: CareerEvaluation },
          { path: "compliance", Component: LegalCompliance },
          { path: "attendance", Component: GestorLeave },
        ],
      },
    ],
  },
  {
    path: "*",
    Component: NotFound,
  },
]);
