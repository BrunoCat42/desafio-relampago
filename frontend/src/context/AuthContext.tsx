import { createContext, useContext, useEffect, useState } from "react";
import { useLocation } from "react-router-dom";

interface User {
  id: string;
  email: string;
  name: string;
}

interface AuthContextType {
  user: User | null;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
  setUser: (user: User | null) => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  const location = useLocation();

  useEffect(() => {
    const checkLogin = async () => {
      if (["/login", "/"].includes(location.pathname)) {
        setIsLoading(false);
        return;
      }

      try {
        const res = await fetch("http://localhost:3000/api/login/check", {
          credentials: "include",
        });

        if (!res.ok) throw new Error("Não autenticado");

        const data = await res.json();
        setUser({ id: data.id, email: data.email , name: data.name});
      } catch (error) {
        setUser(null);
        console.log(error)
      } finally {
        setIsLoading(false);
      }
    };

    setIsLoading(true);
    checkLogin();
  }, [location.pathname]);

  const login = async (email: string, password: string) => {
    setIsLoading(true);
    try {
      const response = await fetch("http://localhost:3000/api/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({ email, password }),
      });

      if (!response.ok) throw new Error("Login inválido.");

      const data = await response.json();
      setUser({ id: data.id, email: data.email , name: data.name});
    } finally {
      setIsLoading(false);
    }
  };

  const logout = async () => {
    await fetch("http://localhost:3000/api/login/logout", {
      method: "POST",
      credentials: "include",
    });
    setUser(null);
  };

  return (
    <AuthContext.Provider
      value={{ user, isLoading, login, logout, setUser }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) throw new Error("useAuth deve ser usado dentro de AuthProvider");
  return context;
}
