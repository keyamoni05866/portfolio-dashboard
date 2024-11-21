import AdminDashboard from "../pages/Dashboard/AdminDashboard/AdminDashboard";
import BlogManagement from "../pages/Dashboard/BlogManagement/BlogManagement";
import BlogUpdate from "../pages/Dashboard/BlogManagement/BlogUpdate";
import ProjectManagement from "../pages/Dashboard/ProjectManagement/ProjectManagement";
import ProjectUpdate from "../pages/Dashboard/ProjectManagement/ProjectUpdate";
import SkillManagement from "../pages/Dashboard/SkillManagement/SkillManagement";
import SkillUpdate from "../pages/Dashboard/SkillManagement/SkillUpdate";
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
  {
    name: "",
    path: "blogUpdate/:id",
    element: (
      <ProtectedRoute requiredRole={["admin"]}>
        <BlogUpdate />
      </ProtectedRoute>
    ),
  },
  {
    name: "",
    path: "skillUpdate/:id",
    element: (
      <ProtectedRoute requiredRole={["admin"]}>
        <SkillUpdate />
      </ProtectedRoute>
    ),
  },
  {
    name: "",
    path: "projectUpdate/:id",
    element: (
      <ProtectedRoute requiredRole={["admin"]}>
        <ProjectUpdate />
      </ProtectedRoute>
    ),
  },
];
