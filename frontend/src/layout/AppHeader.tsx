import { ModeToggle } from "@/components/mode-toogle";
import { ProfileButton } from "@/components/profile-button";
import { SidebarTrigger, useSidebar } from "@/components/ui/sidebar";



export const AppHeader = ({ handleLogout }: { handleLogout: () => void }) => {
  const { state } = useSidebar(); // 👈 expanded | collapsed

  const sidebarWidth = state === "expanded" ? "16rem" : "3rem"; // same as your SIDEBAR_WIDTH / SIDEBAR_WIDTH_ICON

  return (
    <header
      className="fixed top-0 right-0 z-50 h-16 bg-background border-b shadow-md flex items-center justify-between px-4 transition-all duration-300"
      style={{ left: sidebarWidth }} // 👈 dynamic offset
    >
      <SidebarTrigger />
      <div className="flex gap-5 items-center justify-center pr-4">
        <ModeToggle />
        <ProfileButton
          name="Shinith N"
          email="shinith@example.com"
          avatarUrl={""}
          onProfile={() => console.log("Go to profile")}
          onSettings={() => console.log("Go to settings")}
          onLogout={handleLogout}
        />
      </div>
    </header>
  );
};

