import { createContext, useContext, useState, ReactNode } from "react";
import { User, UserRole, AuthContextType } from "../types/auth";

const AUTH_KEY = "sigep_user";
const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(() => {
    try {
      const stored = localStorage.getItem(AUTH_KEY);
      return stored ? JSON.parse(stored) : null;
    } catch {
      return null;
    }
  });

  const persistUser = (u: User | null) => {
    if (u) localStorage.setItem(AUTH_KEY, JSON.stringify(u));
    else localStorage.removeItem(AUTH_KEY);
    setUser(u);
  };

  const login = (email: string, password: string, role: UserRole) => {
    // Mock login - in production, this would call an API
    if (role === "gestor") {
      persistUser({
        id: "G001",
        name: "Dr. António Ferreira",
        email: "antonio.ferreira@mirex.gov",
        role: "gestor",
        employeeNumber: "DIR-001",
        position: "Director de Recursos Humanos",
        department: "Direcção Geral",
        photo: undefined,
        isProfileComplete: true,
      });
    } else {
      persistUser({
        id: "U001",
        name: "Minka Correia",
        email: "minka.correia@mirex.gov",
        role: "user",
        employeeNumber: "001234",
        position: "Conselheira Principal",
        department: "La Mesa - Carreiras de Negócio",
        photo: undefined,
        isProfileComplete: false,
      });
    }
  };

  const logout = () => {
    persistUser(null);
  };

  const updateProfile = (data: Partial<User>) => {
    if (user) {
      persistUser({ ...user, ...data });
    }
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, updateProfile }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}
