import { createBrowserRouter } from "react-router-dom";

import Login from "../pages/Login/Login";
import ProtectedRoute from "./protectedRoute";
import DashboardLayout from "../layout/DashboardLayout";
import { routeGenerator } from "../utils/routesGenerator";
import { adminPaths } from "./admin.route";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Login />,
  },
  {
    path: "/admin",
    element: (
      <ProtectedRoute requiredRole={["admin"]}>
        <DashboardLayout />
      </ProtectedRoute>
    ),
    children: routeGenerator(adminPaths),
  },
]);

export default router;
