import { ModeToggle } from "@/components/mode-toogle";
import { ProfileButton } from "@/components/profile-button";
import { SidebarTrigger } from "@/components/ui/sidebar";



export const AppHeader = ({ handleLogout }: { handleLogout: () => void }) => {
  // const { state } = useSidebar(); // 👈 expanded | collapsed

  // const sidebarWidth = state === "expanded" ? "16rem" : "3rem"; 

  return (
    <header
      className="h-16 bg-background border-b shadow-md flex items-center justify-between px-4 transition-all duration-300"
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

