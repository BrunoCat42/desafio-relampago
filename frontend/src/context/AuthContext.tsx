import { createContext, useContext, useState } from "react";
import type { ReactNode } from "react";

interface User {
  id: string;
  email: string;
}

interface AuthContextType {
  user: User | null;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
  setUser: (user: User | null) => void;
  setIsLoading: (isLoading: boolean) => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  async function login(email: string, password: string) {
    setIsLoading(true);
    try {
      const response = await fetch("http://localhost:3000/api/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify({ email, password }),
      });

      if (!response.ok) {
        throw new Error("Login inválido.");
      }

      const data = await response.json();
      setUser({ id: data.id, email: email });
    } catch (error) {
      console.error("Erro no login:", error);
      setUser(null);
      throw error;
    } finally {
      setIsLoading(false)
    }
  }

  async function logout() {
    try {
      setUser(null);
      await fetch("http://localhost:3000/api/logout", {
        method: "POST",
        credentials: "include",
      });
    } catch (error) {
      console.error("Erro ao fazer logout:", error);
    }
  }

  return (
    <AuthContext.Provider
      value={{ user, isLoading, login, logout, setUser, setIsLoading }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth deve ser usado dentro de AuthProvider");
  }
  return context;
}
