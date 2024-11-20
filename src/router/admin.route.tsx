import AdminDashboard from "../pages/Dashboard/AdminDashboard/AdminDashboard";
import SkillManagement from "../pages/Dashboard/SkillManagement/SkillManagement";
import ProtectedRoute from "./protectedRoute";

export const adminPaths = [
  {
    name: "Dashboard Overview",
    path: "dashboard",
    element: (
      <ProtectedRoute requiredRole={["admin"]}>
        <AdminDashboard />
      </ProtectedRoute>
    ),
  },
  {
    name: "Skill Management",
    path: "skill-management",
    element: (
      <ProtectedRoute requiredRole={["admin"]}>
        <SkillManagement />
      </ProtectedRoute>
    ),
  },
];
