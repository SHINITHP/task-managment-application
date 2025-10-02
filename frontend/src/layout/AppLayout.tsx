import { Outlet } from "react-router-dom";
import { SidebarProvider } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/app-sidebar";
import { AppHeader } from "./AppHeader";

const AppLayout = () => {

  return (
    <SidebarProvider>
      <AppSidebar />
      <main className="w-full">
        <AppHeader />
        <div className="pt-8 px-4 md:px-8">
          <Outlet />
        </div>
      </main>
    </SidebarProvider>
  );
};

export default AppLayout;
