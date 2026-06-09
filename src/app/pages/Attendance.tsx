import { Calendar, Clock, Plane, FileText, AlertCircle, CheckCircle, XCircle } from "lucide-react";

const absences = [
  {
    id: "AUS-2026-001",
    type: "Férias",
    startDate: "02/01/2026",
    endDate: "10/01/2026",
    days: 7,
    status: "Aprovado",
    used: true,
  },
  {
    id: "AUS-2026-002",
    type: "Falta",
    startDate: "18/02/2026",
    endDate: "18/02/2026",
    days: 1,
    status: "Aprovado",
    used: true,
  },
  {
    id: "AUS-2026-003",
    type: "Licença",
    startDate: "03/03/2026",
    endDate: "07/03/2026",
    days: 5,
    status: "Aprovado",
    used: true,
  },
  {
    id: "AUS-2026-004",
    type: "Férias",
    startDate: "15/07/2026",
    endDate: "24/07/2026",
    days: 7,
    status: "Aprovado",
    used: false,
  },
  {
    id: "AUS-2026-005",
    type: "Licença",
    startDate: "01/09/2026",
    endDate: "02/09/2026",
    days: 2,
    status: "Pendente",
    used: false,
  },
];

const totalDias = 40;
const diasUsados = absences.reduce((sum, a) => sum + a.days, 0);

const typeIcon = (type: string) => {
  if (type === "Férias") return <Plane size={14} className="text-blue-600" />;
  if (type === "Licença") return <FileText size={14} className="text-purple-600" />;
  return <AlertCircle size={14} className="text-orange-500" />;
};

const typeColor = (type: string) => {
  if (type === "Férias") return "bg-blue-100 text-blue-800";
  if (type === "Licença") return "bg-purple-100 text-purple-800";
  return "bg-orange-100 text-orange-800";
};

const statusBadge = (status: string) => {
  if (status === "Aprovado")
    return <span className="flex items-center gap-1 px-2 py-1 rounded-full text-xs bg-green-100 text-green-800"><CheckCircle size={12} />Aprovado</span>;
  if (status === "Pendente")
    return <span className="flex items-center gap-1 px-2 py-1 rounded-full text-xs bg-orange-100 text-orange-800"><Clock size={12} />Pendente</span>;
  return <span className="flex items-center gap-1 px-2 py-1 rounded-full text-xs bg-red-100 text-red-800"><XCircle size={12} />Rejeitado</span>;
};

export function Attendance() {
  const ferias = absences.filter((a) => a.type === "Férias").reduce((s, a) => s + a.days, 0);
  const licencas = absences.filter((a) => a.type === "Licença").reduce((s, a) => s + a.days, 0);
  const pendentes = absences.filter((a) => a.status === "Pendente").length;

  return (
    <div className="p-8">
      <div className="mb-6">
        <h1 className="text-3xl mb-1">Ausências</h1>
        <p className="text-gray-500 text-sm">Resumo pessoal de ausências, férias e licenças</p>
      </div>

      {/* Cartões de resumo */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
        <div className="bg-white rounded-lg shadow-sm p-5">
          <div className="flex items-center justify-between mb-2">
            <p className="text-sm text-gray-600">Taxa de Assiduidade</p>
            <Calendar className="text-green-600" size={20} />
          </div>
          <p className="text-2xl text-green-700">97.6%</p>
          <p className="text-xs text-gray-400 mt-1">Ano 2026</p>
        </div>

        <div className="bg-white rounded-lg shadow-sm p-5">
          <div className="flex items-center justify-between mb-2">
            <p className="text-sm text-gray-600">Férias Marcadas</p>
            <Plane className="text-blue-600" size={20} />
          </div>
          <p className="text-2xl text-blue-700">
            {ferias}<span className="text-base text-gray-400">/{totalDias} dias</span>
          </p>
          <div className="mt-2 bg-gray-200 rounded-full h-1.5">
            <div className="bg-blue-500 h-1.5 rounded-full" style={{ width: `${(ferias / totalDias) * 100}%` }} />
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-sm p-5">
          <div className="flex items-center justify-between mb-2">
            <p className="text-sm text-gray-600">Licenças Solicitadas</p>
            <FileText className="text-purple-600" size={20} />
          </div>
          <p className="text-2xl text-purple-700">{licencas} dias</p>
          <p className="text-xs text-gray-400 mt-1">{absences.filter((a) => a.type === "Licença").length} pedidos</p>
        </div>

        <div className="bg-white rounded-lg shadow-sm p-5">
          <div className="flex items-center justify-between mb-2">
            <p className="text-sm text-gray-600">Total de Dias</p>
            <Clock className="text-orange-500" size={20} />
          </div>
          <p className="text-2xl text-orange-600">
            {diasUsados}<span className="text-base text-gray-400">/{totalDias}</span>
          </p>
          {pendentes > 0 && (
            <p className="text-xs text-orange-500 mt-1">{pendentes} pedido(s) pendente(s)</p>
          )}
        </div>
      </div>

      {/* Tabela de ausências */}
      <div className="bg-white rounded-lg shadow-sm">
        <div className="p-6 border-b border-gray-200 flex items-center justify-between">
          <h2 className="text-xl">Pedidos de Ausência</h2>
          <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-sm">
            Novo Pedido
          </button>
        </div>

        <div className="divide-y divide-gray-100">
          {absences.map((a) => (
            <div key={a.id} className="p-5 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 hover:bg-gray-50 transition-colors">
              <div className="flex items-center gap-4">
                <div className="flex flex-col">
                  <span className="text-xs text-gray-400 mb-1">{a.id}</span>
                  <div className="flex items-center gap-2">
                    {typeIcon(a.type)}
                    <span className={`text-xs px-2 py-0.5 rounded-full ${typeColor(a.type)}`}>{a.type}</span>
                  </div>
                </div>
                <div className="flex items-center gap-1 text-sm text-gray-600">
                  <Calendar size={13} />
                  <span>{a.startDate} — {a.endDate}</span>
                </div>
                <span className="text-sm text-gray-700 font-medium">{a.days} {a.days === 1 ? "dia" : "dias"}</span>
              </div>

              <div className="flex items-center gap-3">
                {statusBadge(a.status)}
                <span className={`text-xs px-2 py-1 rounded-full ${a.used ? "bg-gray-100 text-gray-500" : "bg-teal-50 text-teal-700"}`}>
                  {a.used ? "Utilizado" : "Por utilizar"}
                </span>
              </div>
            </div>
          ))}
        </div>

        <div className="p-5 border-t border-gray-100 bg-gray-50 rounded-b-lg">
          <div className="flex items-center justify-between text-sm text-gray-600">
            <span>Total de dias de ausência registados: <strong>{diasUsados}</strong></span>
            <span>Saldo disponível: <strong className="text-blue-700">{totalDias - diasUsados} dias</strong></span>
          </div>
        </div>
      </div>
    </div>
  );
}
