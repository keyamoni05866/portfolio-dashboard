import { Layout, Menu } from "antd";

import { useAppSelector } from "../Redux/hook";
import { currentUser } from "../Redux/features/auth/authSlice";

import { sidebarItemsGenerator } from "../utils/sidebarItemsGenerator";
import { adminPaths } from "../router/admin.route";

const { Sider } = Layout;
const DashboardSidebar = () => {
  const userRole = {
    ADMIN: "admin",
  };

  const user = useAppSelector(currentUser);

  let sidebarItems;
  switch (user!.role) {
    case userRole.ADMIN:
      sidebarItems = sidebarItemsGenerator(adminPaths, userRole.ADMIN);
      break;
    default:
      break;
  }

  return (
    <Sider
      breakpoint="lg"
      collapsedWidth="0"
      style={{ height: "100vh", position: "sticky", top: "0", left: "0" }}
    >
      <div
        style={{
          color: "white",
          height: "4rem",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      ></div>
      <Menu
        theme="dark"
        mode="inline"
        defaultSelectedKeys={["4"]}
        items={sidebarItems}
        className="mt-5"
      />
    </Sider>
  );
};

export default DashboardSidebar;
