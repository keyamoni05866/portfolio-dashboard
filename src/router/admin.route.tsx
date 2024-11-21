import AdminDashboard from "../pages/Dashboard/AdminDashboard/AdminDashboard";
import BlogManagement from "../pages/Dashboard/BlogManagement/BlogManagement";
import ProjectManagement from "../pages/Dashboard/ProjectManagement/ProjectManagement";
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
  {
    name: "Project Management",
    path: "project-management",
    element: (
      <ProtectedRoute requiredRole={["admin"]}>
        <ProjectManagement />
      </ProtectedRoute>
    ),
  },
  {
    name: "Blog Management",
    path: "blog-management",
    element: (
      <ProtectedRoute requiredRole={["admin"]}>
        <BlogManagement />
      </ProtectedRoute>
    ),
  },
];
