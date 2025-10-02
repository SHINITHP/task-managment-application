import { ModeToggle } from "@/components/mode-toogle";
import { ProfileButton } from "@/components/profile-button";
import { SidebarTrigger } from "@/components/ui/sidebar";
import { useContext } from "react";
import AuthContext from "@/context/AuthContext";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { logout } from "@/api/authApi";

export const AppHeader = () => {
  const { clearlogData } = useContext(AuthContext);

  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("accessToken");
    localStorage.removeItem("email");
    logout();
    clearlogData();
    toast.success('Logged out successful')
    navigate("/?authMode=sign-in", { replace: true });
  };

  return (
    <header className="h-16 bg-background border-b shadow-md flex items-center justify-between px-4 transition-all duration-300">
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
