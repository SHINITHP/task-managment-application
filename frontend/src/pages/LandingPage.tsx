import { HeroSection } from "@/components/hero-section";
import { useNavigate, useSearchParams } from "react-router-dom";
import AuthPage from "./AuthPage";
import { HeroHeader } from "@/components/header";

const LandingPage = () => {
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
