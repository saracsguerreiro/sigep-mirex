export type UserRole = "gestor" | "user";

export interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  employeeNumber?: string;
  position?: string;
  department?: string;
  photo?: string;
  isProfileComplete?: boolean;
}

export interface AuthContextType {
  user: User | null;
  login: (email: string, password: string, role: UserRole) => void;
  logout: () => void;
  updateProfile: (data: Partial<User>) => void;
}
