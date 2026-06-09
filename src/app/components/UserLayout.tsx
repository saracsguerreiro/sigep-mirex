import { Outlet, Link, useLocation, useNavigate } from "react-router";
import { useAuth } from "../contexts/AuthContext";
import { User, Globe, TrendingUp, Calendar, LogOut } from "lucide-react";

export function UserLayout() {
  const location = useLocation();
  const navigate = useNavigate();
  const { user, logout } = useAuth();

  const navItems = [
    { path: "/user/dashboard", label: "Perfil", icon: User },
    { path: "/user/rotation", label: "Rotação Diplomática", icon: Globe },
    { path: "/user/career", label: "Avaliação & Carreira", icon: TrendingUp },
    { path: "/user/attendance", label: "Férias, Faltas & Licenças", icon: Calendar },
  ];

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <div className="flex h-screen bg-gray-50">
      {/* Sidebar */}
      <aside className="w-72 bg-blue-900 text-white flex flex-col">
        <div className="p-6 border-b border-blue-800">
          <h1 className="text-xl mb-1">SIGEP-MIREX</h1>
          <p className="text-xs text-blue-200">Sistema Integrado de Gestão de Pessoal</p>
        </div>

        {/* User Info - Always Visible */}
        <div className="p-6 border-b border-blue-800">
          <div className="flex items-center gap-3 mb-3">
            <div className="w-16 h-16 bg-blue-700 rounded-full flex items-center justify-center text-2xl">
              {user?.name?.charAt(0)}
            </div>
            <div className="flex-1">
              <p className="text-sm mb-1">{user?.name}</p>
              <p className="text-xs text-blue-200">{user?.position}</p>
            </div>
          </div>
          <div className="text-xs text-blue-300">
            <p>Nº Funcionário: {user?.employeeNumber}</p>
          </div>
        </div>

        <nav className="flex-1 p-4 space-y-2 overflow-y-auto">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = location.pathname === item.path;
            return (
              <Link
                key={item.path}
                to={item.path}
                className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
                  isActive
                    ? "bg-blue-800 text-white"
                    : "text-blue-100 hover:bg-blue-800/50"
                }`}
              >
                <Icon size={20} />
                <span className="text-sm">{item.label}</span>
              </Link>
            );
          })}
        </nav>

        <div className="p-4 border-t border-blue-800">
          <button
            onClick={handleLogout}
            className="flex items-center gap-3 px-4 py-3 w-full text-blue-100 hover:bg-blue-800/50 rounded-lg transition-colors"
          >
            <LogOut size={20} />
            <span className="text-sm">Terminar Sessão</span>
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 overflow-y-auto">
        <Outlet />
      </main>
    </div>
  );
}
