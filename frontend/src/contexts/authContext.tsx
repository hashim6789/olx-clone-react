// src/context/AuthContext.tsx
import React, {
  createContext,
  useState,
  useContext,
  ReactNode,
  useEffect,
} from "react";
import { googleLogout } from "@react-oauth/google";

interface User {
  _id: string;
  name: string;
  picture: string;
  email: string;
  token: string;
}
interface AuthContextType {
  auth: User | null;
  login: (user: User) => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [auth, setAuth] = useState<User | null>(null);

  const login = (user: User) => {
    console.log("user", user);
    setAuth(user);

    localStorage.setItem("user", JSON.stringify(user)); // Save user data in localStorage
  };

  const logout = () => {
    setAuth(null);
    localStorage.removeItem("user");
    googleLogout();
  };

  useEffect(() => {
    // Check if there is a logged-in user from localStorage
    const savedUser = localStorage.getItem("user");
    if (savedUser) {
      setAuth(JSON.parse(savedUser));
    }
  }, []);

  return (
    <AuthContext.Provider value={{ auth, logout, login }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
