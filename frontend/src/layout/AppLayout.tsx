import { Outlet, useNavigate } from "react-router-dom";
import {
  SidebarProvider,
} from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/app-sidebar";
import { AppHeader } from "./AppHeader";

const AppLayout = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("accessToken");
    localStorage.removeItem("email");
    navigate("/?authMode=sign-in", { replace: true });
  };

  return (
    <SidebarProvider>
      <AppSidebar />
      <main className="w-full">
        <AppHeader handleLogout={handleLogout} />
        <div className="pt-8 px-4 md:px-8">
          <Outlet />
        </div>
      </main>
    </SidebarProvider>
  );
};

export default AppLayout;
