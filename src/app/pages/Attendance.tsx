import { Calendar, Clock, Briefcase, Plane, FileText } from "lucide-react";

export function Attendance() {
  const leaveRequests = [
    {
      id: "LIC-2026-045",
      employee: "Ana Paula Silva",
      type: "Férias",
      startDate: "15/07/2026",
      endDate: "29/07/2026",
      days: 15,
      status: "Aprovado",
      approver: "Dir. Recursos Humanos",
    },
    {
      id: "LIC-2026-046",
      employee: "Carlos Mendes",
      type: "Licença Médica",
      startDate: "10/06/2026",
      endDate: "12/06/2026",
      days: 3,
      status: "Pendente",
      approver: "Chefe de Departamento",
    },
    {
      id: "LIC-2026-047",
      employee: "Maria Santos",
      type: "Licença Parental",
      startDate: "01/08/2026",
      endDate: "30/11/2026",
      days: 120,
      status: "Aprovado",
      approver: "Dir. Recursos Humanos",
    },
    {
      id: "LIC-2026-048",
      employee: "João Neto",
      type: "Férias",
      startDate: "20/06/2026",
      endDate: "27/06/2026",
      days: 8,
      status: "Em Análise",
      approver: "Chefe de Departamento",
    },
  ];

  const attendanceStats = [
    {
      month: "Janeiro",
      present: 98.2,
      sick: 1.2,
      vacation: 0.4,
      other: 0.2,
    },
    {
      month: "Fevereiro",
      present: 97.8,
      sick: 1.5,
      vacation: 0.5,
      other: 0.2,
    },
    {
      month: "Março",
      present: 98.5,
      sick: 0.9,
      vacation: 0.4,
      other: 0.2,
    },
    {
      month: "Abril",
      present: 96.2,
      sick: 1.1,
      vacation: 2.5,
      other: 0.2,
    },
    {
      month: "Maio",
      present: 97.1,
      sick: 1.3,
      vacation: 1.4,
      other: 0.2,
    },
  ];

  const upcomingAbsences = [
    { employee: "Ana Paula Silva", type: "Férias", dates: "15-29 Jul", days: 15 },
    { employee: "Pedro Alves", type: "Formação", dates: "01-05 Jul", days: 5 },
    { employee: "Lúcia Costa", type: "Férias", dates: "08-22 Ago", days: 15 },
    { employee: "Miguel Santos", type: "Licença", dates: "12-14 Jun", days: 3 },
  ];

  return (
    <div className="p-8">
      {/* Header */}
      <div className="mb-6">
        <h1 className="text-3xl mb-2">Férias, Faltas & Licenças</h1>
        <p className="text-gray-600">
          Gestão de ausências, aprovação em tempo real e cálculo automático de saldos
        </p>
      </div>

      {/* Statistics */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
        <div className="bg-white rounded-lg shadow-sm p-4">
          <div className="flex items-center justify-between mb-2">
            <p className="text-sm text-gray-600">Taxa de Assiduidade</p>
            <Calendar className="text-green-600" size={20} />
          </div>
          <p className="text-2xl">97.6%</p>
          <p className="text-xs text-gray-500 mt-1">Maio 2026</p>
        </div>
        <div className="bg-white rounded-lg shadow-sm p-4">
          <div className="flex items-center justify-between mb-2">
            <p className="text-sm text-gray-600">Pedidos Pendentes</p>
            <Clock className="text-orange-600" size={20} />
          </div>
          <p className="text-2xl">12</p>
          <p className="text-xs text-gray-500 mt-1">Aguardam aprovação</p>
        </div>
        <div className="bg-white rounded-lg shadow-sm p-4">
          <div className="flex items-center justify-between mb-2">
            <p className="text-sm text-gray-600">Férias Este Mês</p>
            <Plane className="text-blue-600" size={20} />
          </div>
          <p className="text-2xl">34</p>
          <p className="text-xs text-gray-500 mt-1">Funcionários</p>
        </div>
        <div className="bg-white rounded-lg shadow-sm p-4">
          <div className="flex items-center justify-between mb-2">
            <p className="text-sm text-gray-600">Licenças Activas</p>
            <Briefcase className="text-purple-600" size={20} />
          </div>
          <p className="text-2xl">8</p>
          <p className="text-xs text-gray-500 mt-1">Em curso</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Leave Requests */}
        <div className="lg:col-span-2 bg-white rounded-lg shadow-sm">
          <div className="p-6 border-b border-gray-200 flex items-center justify-between">
            <h2 className="text-xl">Pedidos de Licença</h2>
            <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-sm">
              Novo Pedido
            </button>
          </div>
          <div className="p-6">
            <div className="space-y-4">
              {leaveRequests.map((request) => (
                <div
                  key={request.id}
                  className="p-4 border border-gray-200 rounded-lg hover:border-blue-300 transition-colors"
                >
                  <div className="flex items-start justify-between mb-3">
                    <div>
                      <p className="text-sm text-gray-500 mb-1">{request.id}</p>
                      <p className="mb-1">{request.employee}</p>
                    </div>
                    <span
                      className={`px-3 py-1 rounded-full text-xs ${
                        request.status === "Aprovado"
                          ? "bg-green-100 text-green-800"
                          : request.status === "Pendente"
                          ? "bg-orange-100 text-orange-800"
                          : "bg-blue-100 text-blue-800"
                      }`}
                    >
                      {request.status}
                    </span>
                  </div>

                  <div className="grid grid-cols-2 gap-4 mb-3">
                    <div>
                      <p className="text-xs text-gray-600 mb-1">Tipo</p>
                      <p className="text-sm flex items-center gap-2">
                        {request.type === "Férias" ? (
                          <Plane size={14} className="text-blue-600" />
                        ) : request.type === "Licença Médica" ? (
                          <FileText size={14} className="text-red-600" />
                        ) : (
                          <Briefcase size={14} className="text-purple-600" />
                        )}
                        {request.type}
                      </p>
                    </div>
                    <div>
                      <p className="text-xs text-gray-600 mb-1">Duração</p>
                      <p className="text-sm">{request.days} dias</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-2 text-sm text-gray-600 mb-2">
                    <Calendar size={14} />
                    <span>
                      {request.startDate} - {request.endDate}
                    </span>
                  </div>

                  <div className="pt-3 border-t border-gray-100 flex items-center justify-between">
                    <p className="text-xs text-gray-600">
                      Aprovador: {request.approver}
                    </p>
                    {request.status !== "Aprovado" && (
                      <div className="flex gap-2">
                        <button className="px-3 py-1 bg-green-600 text-white rounded text-xs hover:bg-green-700">
                          Aprovar
                        </button>
                        <button className="px-3 py-1 bg-red-600 text-white rounded text-xs hover:bg-red-700">
                          Rejeitar
                        </button>
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Upcoming Absences */}
        <div className="bg-white rounded-lg shadow-sm">
          <div className="p-6 border-b border-gray-200">
            <h2 className="text-xl">Próximas Ausências</h2>
          </div>
          <div className="p-6 space-y-3">
            {upcomingAbsences.map((absence, index) => (
              <div
                key={index}
                className="p-3 border-l-4 border-blue-500 bg-blue-50 rounded"
              >
                <p className="text-sm mb-1">{absence.employee}</p>
                <div className="flex items-center justify-between text-xs text-gray-600">
                  <span>{absence.type}</span>
                  <span>{absence.days} dias</span>
                </div>
                <p className="text-xs text-gray-500 mt-1">{absence.dates}</p>
              </div>
            ))}
          </div>

          <div className="p-6 border-t border-gray-200">
            <div className="bg-gray-50 p-4 rounded-lg">
              <p className="text-sm text-gray-600 mb-2">Impacto na Capacidade</p>
              <div className="flex items-center gap-2 mb-1">
                <div className="flex-1 bg-gray-200 rounded-full h-3">
                  <div
                    className="bg-blue-600 h-3 rounded-full"
                    style={{ width: "92%" }}
                  />
                </div>
                <span className="text-sm">92%</span>
              </div>
              <p className="text-xs text-gray-500">Capacidade disponível em Julho</p>
            </div>
          </div>
        </div>
      </div>

      {/* Attendance Trend */}
      <div className="mt-6 bg-white rounded-lg shadow-sm">
        <div className="p-6 border-b border-gray-200">
          <h2 className="text-xl">Tendência de Assiduidade (2026)</h2>
        </div>
        <div className="p-6">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-4 py-3 text-left text-xs uppercase tracking-wider text-gray-600">
                    Mês
                  </th>
                  <th className="px-4 py-3 text-left text-xs uppercase tracking-wider text-gray-600">
                    Presente
                  </th>
                  <th className="px-4 py-3 text-left text-xs uppercase tracking-wider text-gray-600">
                    Baixa Médica
                  </th>
                  <th className="px-4 py-3 text-left text-xs uppercase tracking-wider text-gray-600">
                    Férias
                  </th>
                  <th className="px-4 py-3 text-left text-xs uppercase tracking-wider text-gray-600">
                    Outros
                  </th>
                  <th className="px-4 py-3 text-left text-xs uppercase tracking-wider text-gray-600">
                    Visual
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {attendanceStats.map((stat, index) => (
                  <tr key={index} className="hover:bg-gray-50">
                    <td className="px-4 py-3 text-sm">{stat.month}</td>
                    <td className="px-4 py-3 text-sm text-green-600">
                      {stat.present}%
                    </td>
                    <td className="px-4 py-3 text-sm text-red-600">{stat.sick}%</td>
                    <td className="px-4 py-3 text-sm text-blue-600">
                      {stat.vacation}%
                    </td>
                    <td className="px-4 py-3 text-sm text-gray-600">{stat.other}%</td>
                    <td className="px-4 py-3">
                      <div className="flex gap-1 h-6">
                        <div
                          className="bg-green-500 rounded"
                          style={{ width: `${stat.present}%` }}
                          title={`Presente: ${stat.present}%`}
                        />
                        <div
                          className="bg-red-500 rounded"
                          style={{ width: `${stat.sick * 10}%` }}
                          title={`Baixa Médica: ${stat.sick}%`}
                        />
                        <div
                          className="bg-blue-500 rounded"
                          style={{ width: `${stat.vacation * 10}%` }}
                          title={`Férias: ${stat.vacation}%`}
                        />
                        <div
                          className="bg-gray-400 rounded"
                          style={{ width: `${stat.other * 10}%` }}
                          title={`Outros: ${stat.other}%`}
                        />
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* Leave Balance Summary */}
      <div className="mt-6 bg-white rounded-lg shadow-sm p-6">
        <h2 className="text-xl mb-4">Resumo de Saldos de Férias</h2>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="p-4 bg-blue-50 rounded-lg border-l-4 border-blue-500">
            <p className="text-sm text-gray-600 mb-1">Saldo Total Disponível</p>
            <p className="text-2xl text-blue-700">18,456</p>
            <p className="text-xs text-gray-500 mt-1">dias de férias</p>
          </div>
          <div className="p-4 bg-orange-50 rounded-lg border-l-4 border-orange-500">
            <p className="text-sm text-gray-600 mb-1">Saldo Utilizado (2026)</p>
            <p className="text-2xl text-orange-700">4,328</p>
            <p className="text-xs text-gray-500 mt-1">dias de férias</p>
          </div>
          <div className="p-4 bg-green-50 rounded-lg border-l-4 border-green-500">
            <p className="text-sm text-gray-600 mb-1">Saldo Agendado</p>
            <p className="text-2xl text-green-700">2,145</p>
            <p className="text-xs text-gray-500 mt-1">dias de férias</p>
          </div>
          <div className="p-4 bg-purple-50 rounded-lg border-l-4 border-purple-500">
            <p className="text-sm text-gray-600 mb-1">Média por Funcionário</p>
            <p className="text-2xl text-purple-700">14.8</p>
            <p className="text-xs text-gray-500 mt-1">dias disponíveis</p>
          </div>
        </div>
      </div>
    </div>
  );
}
