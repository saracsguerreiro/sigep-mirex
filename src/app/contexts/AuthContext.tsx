import { createContext, useContext, useState, ReactNode } from "react";
import { User, UserRole, AuthContextType } from "../types/auth";

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);

  const login = (email: string, password: string, role: UserRole) => {
    // Mock login - in production, this would call an API
    if (role === "gestor") {
      setUser({
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
      setUser({
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
    setUser(null);
  };

  const updateProfile = (data: Partial<User>) => {
    if (user) {
      setUser({ ...user, ...data });
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
