import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";
import { LoginPage } from "@/components/sign-in";
import type { AuthModeProps } from "@/types";

const AuthPage = ({ authMode, onClose }: AuthModeProps) => {
  const navigate = useNavigate();

  useEffect(() => {
    if (authMode === "not-found") {
      navigate("/not-found");
    }
  }, [authMode, navigate]);

  return (
    <div className="fixed z-50 inset-0 bg-black/80 flex items-center justify-center">
      <AnimatePresence>
        <motion.div
          initial={{ y: "-100vh", opacity: 0 }}
          animate={{ y: "0vh", opacity: 1 }}
          exit={{ y: "-100vh", opacity: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className={`w-full ${
            authMode === "verify-otp"
              ? "sm:w-3/4 justify-center h-full sm:h-1/2"
              : "h-[98%]"
          } md:w-[65%] lg:w-1/2 xl:w-1/3 border rounded-sm bg-white dark:bg-background m-0 p-0 relative border-r flex flex-col items-center shadow-2xl overflow-y-auto`}
        >
          <button
            className="absolute top-0 right-0 w-14 h-14 flex justify-center items-center cursor-pointer"
            onClick={onClose}
            aria-label="Close Modal"
          >
            <X className="h-7 w-7 dark:text-white" />
          </button>
          <div className="w-full h-full flex flex-col justify-center items-center">
            <h1 className="w-full mt-10 text-center text-3xl font-bold">
              {authMode === "forgot-password"
                ? "Forgot Password"
                : authMode === "verify-otp"
                ? "Verify OTP"
                : "Welcome Back"}
            </h1>

            {authMode === "sign-in" && <LoginPage />}
          </div>
        </motion.div>
      </AnimatePresence>
    </div>
  );
};

export default AuthPage;
