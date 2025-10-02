import { HeroSection } from "@/components/hero-section";
import { Navigate, useNavigate, useSearchParams } from "react-router-dom";
import AuthPage from "./AuthPage";
import { HeroHeader } from "@/components/header";
import AuthContext from "@/context/AuthContext";
import { useContext } from "react";
import { Loader2 } from "lucide-react";

const LandingPage = () => {
  const { user, loading } = useContext(AuthContext);

  if (loading) {
    return (
      <div className="flex justify-center items-center bg-background dark:bg-background h-screen">
        <Loader2 />
      </div>
    );
  }

  if (user) {
    if (user.role === "ADMIN") {
      return <Navigate to="/admin" replace />;
    } else if (user.role === "AGENT") {
      return <Navigate to="/agent" replace />;
    }
  }

  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  type AuthMode =
    | "sign-in"
    | "sign-up"
    | "forgot-password"
    | "verify-otp"
    | "not-found";

  const authModeParam = searchParams.get("authMode");

  const authMode: AuthMode =
    authModeParam === "sign-in"
      ? "sign-in"
      : authModeParam === "forgot-password"
      ? "forgot-password"
      : authModeParam === "verify-otp"
      ? "verify-otp"
      : "not-found";

  const handleCloseModal = () => {
    navigate("/", { replace: true });
  };

  return (
    <>
      <HeroHeader />
      {/* <AppHeader /> */}
      <HeroSection />
      {authModeParam && (
        <AuthPage authMode={authMode} onClose={handleCloseModal} />
      )}
    </>
  );
};

export default LandingPage;
