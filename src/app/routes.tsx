import { createHashRouter, Navigate } from "react-router";
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
import { NotFound } from "./pages/NotFound";

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
      { path: "compliance", Component: LegalCompliance },
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
      { path: "attendance", Component: Attendance },
    ],
  },
  {
    path: "*",
    Component: NotFound,
  },
]);
