import { Users, UserCheck, Globe, AlertCircle, TrendingUp, Calendar } from "lucide-react";

export function GestorDashboard() {
  const stats = [
    { label: "Total de Funcionários", value: "1,247", icon: Users, color: "bg-blue-500", change: "+23" },
    { label: "Cadastros Pendentes", value: "18", icon: UserCheck, color: "bg-orange-500", change: "-5" },
    { label: "Missões Activas", value: "47", icon: Globe, color: "bg-green-500", change: "+2" },
    { label: "Alertas de Conformidade", value: "12", icon: AlertCircle, color: "bg-red-500", change: "-3" },
  ];

  const recentApprovals = [
    { name: "Maria Santos Costa", action: "Actualização de Cadastro", time: "Há 1 hora", status: "pending" },
    { name: "João Pedro Neto", action: "Alteração de Dados Funcionais", time: "Há 2 horas", status: "pending" },
    { name: "Ana Paula Silva", action: "Actualização de Cadastro", time: "Há 3 horas", status: "approved" },
    { name: "Carlos Mendes", action: "Dados Biométricos", time: "Há 4 horas", status: "approved" },
  ];

  const missionAlerts = [
    { diplomat: "Carlos Mendes", mission: "Embaixada de Lisboa", duration: "2 anos, 11 meses", status: "warning", message: "Próximo do limite de 3 anos" },
    { diplomat: "Ana Silva", mission: "Consulado de Paris", duration: "2 anos, 8 meses", status: "normal", message: "Dentro do prazo normal" },
    { diplomat: "Pedro Costa", mission: "Embaixada de Brasília", duration: "3 anos, 2 meses", status: "critical", message: "Excedeu o limite recomendado" },
  ];

  const performanceOverview = [
    { department: "Embaixadas", score: 4.5, employees: 342 },
    { department: "Consulados", score: 4.3, employees: 156 },
    { department: "Ministério", score: 4.2, employees: 589 },
    { department: "Divisões Técnicas", score: 4.4, employees: 160 },
  ];

  return (
    <div className="p-8">
      {/* Header */}
      <div className="mb-6">
        <h1 className="text-3xl mb-2">Dashboard do Gestor</h1>
        <p className="text-gray-600">Visão geral e controlo do sistema SIGEP-MIREX</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
        {stats.map((stat, index) => {
          const Icon = stat.icon;
          return (
            <div key={index} className="bg-white rounded-lg shadow-sm p-6">
              <div className="flex items-start justify-between mb-2">
                <div>
                  <p className="text-sm text-gray-600 mb-1">{stat.label}</p>
                  <p className="text-3xl mb-1">{stat.value}</p>
                  <p className="text-xs text-gray-500">{stat.change} este mês</p>
                </div>
                <div className={`${stat.color} p-3 rounded-lg`}>
                  <Icon className="text-white" size={24} />
                </div>
              </div>
            </div>
          );
        })}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
        {/* Recent Approvals */}
        <div className="bg-white rounded-lg shadow-sm">
          <div className="p-6 border-b border-gray-200 flex items-center justify-between">
            <h2 className="text-xl">Aprovações Pendentes</h2>
            <span className="px-3 py-1 bg-orange-100 text-orange-700 rounded-full text-sm">18 pendentes</span>
          </div>
          <div className="p-6 space-y-4">
            {recentApprovals.map((approval, index) => (
              <div key={index} className="flex items-start justify-between p-4 border border-gray-200 rounded-lg hover:border-blue-300 transition-colors">
                <div>
                  <p className="mb-1">{approval.name}</p>
                  <p className="text-sm text-gray-600">{approval.action}</p>
                  <p className="text-xs text-gray-500 mt-1">{approval.time}</p>
                </div>
                <span
                  className={`px-3 py-1 rounded-full text-xs ${
                    approval.status === "pending"
                      ? "bg-orange-100 text-orange-800"
                      : "bg-green-100 text-green-800"
                  }`}
                >
                  {approval.status === "pending" ? "Pendente" : "Aprovado"}
                </span>
              </div>
            ))}
          </div>
          <div className="p-4 border-t border-gray-200">
            <button className="w-full py-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors text-sm">
              Ver Todas as Aprovações
            </button>
          </div>
        </div>

        {/* Mission Duration Alerts */}
        <div className="bg-white rounded-lg shadow-sm">
          <div className="p-6 border-b border-gray-200 flex items-center justify-between">
            <h2 className="text-xl">Alertas de Duração de Missões</h2>
            <span className="px-3 py-1 bg-red-100 text-red-700 rounded-full text-sm">1 crítico</span>
          </div>
          <div className="p-6 space-y-4">
            {missionAlerts.map((alert, index) => (
              <div
                key={index}
                className={`p-4 border-l-4 rounded-lg ${
                  alert.status === "critical"
                    ? "border-red-500 bg-red-50"
                    : alert.status === "warning"
                    ? "border-orange-500 bg-orange-50"
                    : "border-green-500 bg-green-50"
                }`}
              >
                <div className="flex items-start justify-between mb-2">
                  <div>
                    <p className="mb-1">{alert.diplomat}</p>
                    <p className="text-sm text-gray-600">{alert.mission}</p>
                  </div>
                  <span className="text-sm px-2 py-1 bg-white rounded">{alert.duration}</span>
                </div>
                <p className="text-xs text-gray-600">{alert.message}</p>
              </div>
            ))}
          </div>
          <div className="p-4 border-t border-gray-200">
            <button className="w-full py-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors text-sm">
              Ver Mapa Completo de Missões
            </button>
          </div>
        </div>
      </div>

      {/* Performance by Department */}
      <div className="bg-white rounded-lg shadow-sm mb-6">
        <div className="p-6 border-b border-gray-200 flex items-center gap-3">
          <TrendingUp className="text-blue-600" size={24} />
          <h2 className="text-xl">Desempenho por Departamento</h2>
        </div>
        <div className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {performanceOverview.map((dept, index) => (
              <div key={index} className="p-4 border border-gray-200 rounded-lg">
                <h3 className="mb-2">{dept.department}</h3>
                <div className="flex items-end gap-2 mb-2">
                  <span className="text-2xl">{dept.score}</span>
                  <span className="text-sm text-gray-600 mb-1">/5.0</span>
                </div>
                <p className="text-sm text-gray-600 mb-3">{dept.employees} funcionários</p>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div
                    className="bg-blue-600 h-2 rounded-full"
                    style={{ width: `${(dept.score / 5) * 100}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-white rounded-lg shadow-sm p-6 hover:shadow-md transition-shadow cursor-pointer">
          <div className="flex items-center gap-3 mb-3">
            <div className="bg-blue-100 p-3 rounded-lg">
              <UserCheck className="text-blue-600" size={24} />
            </div>
            <h3 className="text-lg">Aprovar Cadastros</h3>
          </div>
          <p className="text-sm text-gray-600">Revisar e aprovar actualizações de cadastro pendentes</p>
        </div>

        <div className="bg-white rounded-lg shadow-sm p-6 hover:shadow-md transition-shadow cursor-pointer">
          <div className="flex items-center gap-3 mb-3">
            <div className="bg-green-100 p-3 rounded-lg">
              <Globe className="text-green-600" size={24} />
            </div>
            <h3 className="text-lg">Gerir Rotações</h3>
          </div>
          <p className="text-sm text-gray-600">Planejar e aprovar rotações diplomáticas</p>
        </div>

        <div className="bg-white rounded-lg shadow-sm p-6 hover:shadow-md transition-shadow cursor-pointer">
          <div className="flex items-center gap-3 mb-3">
            <div className="bg-purple-100 p-3 rounded-lg">
              <Calendar className="text-purple-600" size={24} />
            </div>
            <h3 className="text-lg">Aprovar Licenças</h3>
          </div>
          <p className="text-sm text-gray-600">Revisar pedidos de férias e licenças</p>
        </div>
      </div>
    </div>
  );
}
