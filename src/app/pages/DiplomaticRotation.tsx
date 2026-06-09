import { Globe, MapPin, Calendar, ArrowRight, CheckCircle, Clock, AlertCircle, Eye } from "lucide-react";

export function DiplomaticRotation() {
  const rotations = [
    {
      id: "ROT-2026-001",
      diplomat: "Carlos Alberto Mendes",
      currentPost: "Ministério - Luanda",
      currentStart: "01/03/2022", currentEnd: "31/08/2026",
      newPost: "Embaixada de Lisboa",
      startDate: "01/09/2026", endDate: "31/08/2029",
      status: "Aprovado",
    },
    {
      id: "ROT-2026-002",
      diplomat: "Maria Santos Costa",
      currentPost: "Divisão de África",
      currentStart: "15/01/2023", currentEnd: "14/07/2026",
      newPost: "Consulado de Paris",
      startDate: "15/07/2026", endDate: "14/07/2029",
      status: "Pendente",
    },
    {
      id: "ROT-2026-003",
      diplomat: "João Pedro Neto",
      currentPost: "Embaixada de Brasília",
      currentStart: "01/06/2023", currentEnd: "31/05/2026",
      newPost: "Ministério - Luanda",
      startDate: "01/06/2026", endDate: "31/05/2028",
      status: "Em Processo",
    },
    {
      id: "ROT-2026-004",
      diplomat: "Ana Paula Silva",
      currentPost: "Embaixada de Lisboa",
      currentStart: "01/10/2023", currentEnd: "30/09/2026",
      newPost: "Embaixada de Pequim",
      startDate: "01/10/2026", endDate: "30/09/2029",
      status: "Planeamento",
    },
  ];

  const rotationPlan = [
    { quarter: "Q2 2026", rotations: 8, locations: ["Lisboa", "Paris", "Brasília"] },
    { quarter: "Q3 2026", rotations: 12, locations: ["Londres", "Pequim", "Moscovo", "Pretória"] },
    { quarter: "Q4 2026", rotations: 6, locations: ["Washington", "Madrid", "Roma"] },
    { quarter: "Q1 2027", rotations: 10, locations: ["Berlim", "Tóquio", "Cairo", "Nairobi"] },
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Aprovado":
        return "bg-green-100 text-green-800";
      case "Pendente":
        return "bg-orange-100 text-orange-800";
      case "Em Processo":
        return "bg-blue-100 text-blue-800";
      case "Planeamento":
        return "bg-gray-100 text-gray-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "Aprovado":
        return <CheckCircle size={16} className="text-green-600" />;
      case "Pendente":
        return <AlertCircle size={16} className="text-orange-600" />;
      case "Em Processo":
        return <Clock size={16} className="text-blue-600" />;
      default:
        return <Clock size={16} className="text-gray-600" />;
    }
  };

  return (
    <div className="p-8">
      {/* Header */}
      <div className="mb-6">
        <h1 className="text-3xl mb-2">Rotação Diplomática</h1>
        <p className="text-gray-600">
          Gestão automática de rotação, controlo de missão e suporte financeiro
        </p>
      </div>

      {/* Statistics */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
        <div className="bg-white rounded-lg shadow-sm p-4">
          <div className="flex items-center justify-between mb-2">
            <p className="text-sm text-gray-600">Rotações Activas</p>
            <Globe className="text-blue-600" size={20} />
          </div>
          <p className="text-2xl">342</p>
        </div>
        <div className="bg-white rounded-lg shadow-sm p-4">
          <div className="flex items-center justify-between mb-2">
            <p className="text-sm text-gray-600">Planeadas (2026)</p>
            <Calendar className="text-green-600" size={20} />
          </div>
          <p className="text-2xl">36</p>
        </div>
        <div className="bg-white rounded-lg shadow-sm p-4">
          <div className="flex items-center justify-between mb-2">
            <p className="text-sm text-gray-600">Missões Internacionais</p>
            <MapPin className="text-purple-600" size={20} />
          </div>
          <p className="text-2xl">47</p>
        </div>
        <div className="bg-white rounded-lg shadow-sm p-4">
          <div className="flex items-center justify-between mb-2">
            <p className="text-sm text-gray-600">Pendentes Aprovação</p>
            <AlertCircle className="text-orange-600" size={20} />
          </div>
          <p className="text-2xl">8</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Rotation List */}
        <div className="lg:col-span-2 bg-white rounded-lg shadow-sm">
          <div className="p-6 border-b border-gray-200">
            <h2 className="text-xl">Rotações em Curso</h2>
          </div>
          <div className="p-4 space-y-2">
            {rotations.map((rotation) => (
              <div
                key={rotation.id}
                className="border border-gray-100 rounded-xl p-4 hover:border-blue-200 hover:bg-blue-50/30 transition-colors"
              >
                {/* Nome + estado + olho */}
                <div className="flex items-center justify-between mb-3">
                  <div>
                    <p className="font-semibold text-gray-900">{rotation.diplomat}</p>
                    <p className="text-xs text-gray-400 mt-0.5">{rotation.id}</p>
                  </div>
                  <div className="flex items-center gap-2">
                    <button className="p-1.5 border border-gray-200 rounded-lg hover:bg-gray-50 text-gray-400 transition-colors">
                      <Eye size={13} />
                    </button>
                    <span className={`px-2.5 py-1 rounded-full text-xs flex items-center gap-1 ${getStatusColor(rotation.status)}`}>
                      {getStatusIcon(rotation.status)}
                      {rotation.status}
                    </span>
                  </div>
                </div>

                {/* Postos */}
                <div className="flex items-start gap-2">
                  <div className="flex-1 bg-gray-50 rounded-lg p-2.5">
                    <p className="text-xs text-gray-400 mb-1">Posto Actual</p>
                    <div className="flex items-center gap-1.5 mb-1.5">
                      <MapPin size={12} className="text-gray-400 shrink-0" />
                      <p className="text-xs text-gray-700">{rotation.currentPost}</p>
                    </div>
                    <div className="flex items-center gap-1 text-xs text-gray-400">
                      <Calendar size={10} />
                      <span>{rotation.currentStart} — {rotation.currentEnd}</span>
                    </div>
                  </div>
                  <ArrowRight size={16} className="text-gray-300 shrink-0 mt-3" />
                  <div className="flex-1 bg-blue-50 rounded-lg p-2.5">
                    <p className="text-xs text-blue-400 mb-1">Novo Posto</p>
                    <div className="flex items-center gap-1.5 mb-1.5">
                      <MapPin size={12} className="text-blue-500 shrink-0" />
                      <p className="text-xs text-blue-800 font-medium">{rotation.newPost}</p>
                    </div>
                    <div className="flex items-center gap-1 text-xs text-blue-500">
                      <Calendar size={10} />
                      <span>{rotation.startDate} — {rotation.endDate}</span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Rotation Plan Timeline */}
        <div className="bg-white rounded-lg shadow-sm">
          <div className="p-6 border-b border-gray-200">
            <h2 className="text-xl">Plano de Rotação Automático</h2>
          </div>
          <div className="p-6 space-y-4">
            {rotationPlan.map((plan, index) => (
              <div key={index} className="border-l-4 border-blue-600 pl-4 py-2">
                <p className="mb-1">{plan.quarter}</p>
                <p className="text-sm text-gray-600 mb-2">
                  {plan.rotations} rotações planeadas
                </p>
                <div className="flex flex-wrap gap-1">
                  {plan.locations.map((location, idx) => (
                    <span
                      key={idx}
                      className="px-2 py-1 bg-gray-100 text-gray-700 text-xs rounded"
                    >
                      {location}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>

          <div className="p-6 border-t border-gray-200">
            <button className="w-full py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
              Nova Rotação
            </button>
          </div>
        </div>
      </div>

      {/* Control Panel */}
      <div className="mt-6 bg-white rounded-lg shadow-sm p-6">
        <h2 className="text-xl mb-4">Controlo de Prazos Legais</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="p-4 border-l-4 border-green-500 bg-green-50">
            <p className="text-sm text-gray-600 mb-1">Dentro do Prazo</p>
            <p className="text-2xl text-green-700">28</p>
          </div>
          <div className="p-4 border-l-4 border-orange-500 bg-orange-50">
            <p className="text-sm text-gray-600 mb-1">Próximo do Limite</p>
            <p className="text-2xl text-orange-700">6</p>
          </div>
          <div className="p-4 border-l-4 border-red-500 bg-red-50">
            <p className="text-sm text-gray-600 mb-1">Requer Atenção</p>
            <p className="text-2xl text-red-700">2</p>
          </div>
        </div>
      </div>
    </div>
  );
}
