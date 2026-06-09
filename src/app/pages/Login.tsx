import { useState } from "react";
import { useNavigate } from "react-router";
import { useAuth } from "../contexts/AuthContext";
import { UserRole } from "../types/auth";
import { Users, Building2 } from "lucide-react";
import bgImage from "../../imports/plataf.png";

export function Login() {
  const [activeTab, setActiveTab] = useState<UserRole>("user");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    login(email, password, activeTab);

    if (activeTab === "gestor") {
      navigate("/gestor");
    } else {
      // Users go to profile update first, then to dashboard after completing profile
      navigate("/user/profile-update");
    }
  };

  return (
    <div
      className="min-h-screen flex items-center justify-center p-4 relative"
      style={{ backgroundImage: `url(${bgImage})`, backgroundSize: "cover", backgroundPosition: "center" }}
    >
      <div className="absolute inset-0 bg-blue-900/70" />
      <div className="w-full max-w-md relative z-10">
        {/* Logo and Title */}
        <div className="text-center mb-8">
          <div className="inline-block bg-white p-4 rounded-full mb-4">
            <Building2 size={48} className="text-blue-900" />
          </div>
          <h1 className="text-white text-3xl mb-2">SIGEP-MIREX</h1>
          <p className="text-blue-200 text-sm">Sistema Integrado de Gestão de Pessoal</p>
          <p className="text-blue-300 text-xs mt-1">Ministério das Relações Exteriores</p>
        </div>

        {/* Login Card */}
        <div className="bg-white rounded-lg shadow-xl overflow-hidden">
          {/* Tabs */}
          <div className="flex border-b border-gray-200">
            <button
              onClick={() => setActiveTab("user")}
              className={`flex-1 flex items-center justify-center gap-2 py-4 px-6 transition-colors ${
                activeTab === "user"
                  ? "bg-blue-600 text-white border-b-2 border-blue-600"
                  : "bg-gray-50 text-gray-600 hover:bg-gray-100"
              }`}
            >
              <Users size={20} />
              <span>Funcionário</span>
            </button>
            <button
              onClick={() => setActiveTab("gestor")}
              className={`flex-1 flex items-center justify-center gap-2 py-4 px-6 transition-colors ${
                activeTab === "gestor"
                  ? "bg-blue-600 text-white border-b-2 border-blue-600"
                  : "bg-gray-50 text-gray-600 hover:bg-gray-100"
              }`}
            >
              <Building2 size={20} />
              <span>Gestor</span>
            </button>
          </div>

          {/* Login Form */}
          <form onSubmit={handleSubmit} className="p-8">
            <div className="mb-6">
              <label htmlFor="email" className="block text-sm mb-2 text-gray-700">
                Email Institucional
              </label>
              <input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="seu.nome@mirex.gov"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>

            <div className="mb-6">
              <label htmlFor="password" className="block text-sm mb-2 text-gray-700">
                Palavra-passe
              </label>
              <input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>

            <button
              type="submit"
              className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition-colors mb-4"
            >
              Entrar
            </button>

            <div className="text-center">
              <a href="#" className="text-sm text-blue-600 hover:underline">
                Esqueceu a palavra-passe?
              </a>
            </div>
          </form>
        </div>

        <p className="text-center text-blue-200 text-xs mt-6">
          © 2026 MIREX - Todos os direitos reservados
        </p>
      </div>
    </div>
  );
}
