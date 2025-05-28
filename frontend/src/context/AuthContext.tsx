import { createContext, useContext, useState } from "react";
import type { ReactNode } from "react";

interface User {
  id: string;
  email: string;
}

interface AuthContextType {
  user: User | null;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);

  async function login(email: string, password: string) {
    try {
      const response = await fetch("http://localhost:3000/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        credentials: "include",
        body: JSON.stringify({ email, password })
      });

      if (!response.ok) {
        throw new Error("Login inválido.");
      }
      
      const data = await response.json();
      setUser({ id: data.id, email: email });
    } catch (error) {
      console.error("Erro no login:", error);
      throw error;
    }
  }

async function logout() {
  try {
    await fetch("http://localhost:3000/logout", {
      method: "POST",
      credentials: "include",
    });
    setUser(null);
  } catch (error) {
    console.error("Erro ao fazer logout:", error);
  }
}


  return (
    <AuthContext.Provider value={{ user, login, logout }}>
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
