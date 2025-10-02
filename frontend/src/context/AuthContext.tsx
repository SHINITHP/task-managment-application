// AuthProvider.tsx
import React, {
  createContext,
  useState,
  useEffect,
  type ReactNode,
} from "react";
import { jwtDecode } from "jwt-decode";
import { type JwtPayload } from "@/types";

interface AuthContextType {
  user: JwtPayload | null;
  setUser: (token: string | null) => void;
  logout: () => void;
  loading: boolean;  // 👈 add loading state
}

const AuthContext = createContext<AuthContextType>({
  user: null,
  setUser: () => {},
  logout: () => {},
  loading: true,
});

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [user, setUserState] = useState<JwtPayload | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem("accessToken");
    if (token) {
      try {
        const decoded = jwtDecode<JwtPayload>(token);
        setUserState(decoded);
      } catch (error) {
        localStorage.removeItem("accessToken");
        setUserState(null);
      }
    }
    setLoading(false);
  }, []);

  const setUser = (token: string | null) => {
    if (token) {
      localStorage.setItem("accessToken", token);
      const decoded = jwtDecode<JwtPayload>(token);
      setUserState(decoded);
    } else {
      localStorage.removeItem("accessToken");
      setUserState(null);
    }
  };

  const logout = () => {
    localStorage.removeItem("accessToken");
    setUserState(null);
  };

  return (
    <AuthContext.Provider value={{ user, setUser, logout, loading }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
