import { useNavigate } from "react-router";
import { AlertCircle, Home } from "lucide-react";

export function NotFound() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-900 via-blue-800 to-blue-900 flex items-center justify-center p-4">
      <div className="bg-white rounded-lg shadow-xl p-8 max-w-md text-center">
        <div className="inline-block bg-orange-100 p-4 rounded-full mb-4">
          <AlertCircle className="text-orange-600" size={48} />
        </div>
        <h1 className="text-3xl mb-2">Página Não Encontrada</h1>
        <p className="text-gray-600 mb-6">
          A página que procura não existe ou foi removida.
        </p>
        <button
          onClick={() => navigate("/login")}
          className="flex items-center gap-2 px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors mx-auto"
        >
          <Home size={20} />
          Voltar ao Início
        </button>
      </div>
    </div>
  );
}
