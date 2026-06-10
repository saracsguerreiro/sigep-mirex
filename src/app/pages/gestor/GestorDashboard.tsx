import { useState } from "react";
import { Link } from "react-router";
import {
  BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer,
  PieChart, Pie, Cell, Legend,
  RadialBarChart, RadialBar,
} from "recharts";
import {
  Users, UserCheck, Globe, AlertCircle, TrendingUp,
  Calendar, UserPlus, Clock, CheckCircle,
} from "lucide-react";
import { NovoCadastroModal } from "../../components/NovoCadastroModal";

const deptData = [
  { dept: "Embaixadas", funcionarios: 342, score: 4.5 },
  { dept: "Consulados", funcionarios: 156, score: 4.3 },
  { dept: "Ministério", funcionarios: 589, score: 4.2 },
  { dept: "Div. Técnicas", funcionarios: 160, score: 4.4 },
];

const pieData = [
  { name: "Efectivos", value: 874 },
  { name: "Contrato", value: 248 },
  { name: "Comissão", value: 125 },
];
const PIE_COLORS = ["#2563eb", "#7c3aed", "#059669"];

const performanceRadial = [
  { name: "Geral", value: 86, fill: "#2563eb" },
];

const pendingApprovals = [
  { name: "Maria Santos", type: "Cadastro", time: "1h" },
  { name: "João Neto", type: "Dados Funcionais", time: "2h" },
  { name: "Lúcia Costa", type: "Biométricos", time: "3h" },
];

const pendingLeave = [
  { name: "Ana Silva", type: "Férias", days: 15, dates: "15–29 Jul" },
  { name: "Pedro Alves", type: "Licença", days: 5, dates: "01–05 Jul" },
  { name: "Miguel Santos", type: "Férias", days: 8, dates: "20–27 Jun" },
];

const missionAlerts = [
  { name: "Carlos Mendes", mission: "Lisboa", months: 35, status: "warning" },
  { name: "Pedro Costa", mission: "Brasília", months: 38, status: "critical" },
  { name: "Ana Silva", mission: "Paris", months: 32, status: "normal" },
];

export function GestorDashboard() {
  const [modalOpen, setModalOpen] = useState(false);

  return (
    <div className="p-8 bg-gray-50 min-h-screen">
      <NovoCadastroModal open={modalOpen} onClose={() => setModalOpen(false)} />

      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl mb-1">Dashboard</h1>
          <p className="text-gray-500 text-sm">Visão geral do sistema SIGEP-MIREX · Junho 2026</p>
        </div>
        <button
          onClick={() => setModalOpen(true)}
          className="flex items-center gap-2 px-5 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors shadow-md text-sm font-medium"
        >
          <UserPlus size={18} />
          Novo Cadastro
        </button>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        {[
          { label: "Total de Funcionários", value: "1.247", icon: Users, color: "bg-blue-600", change: "+23 este mês" },
          { label: "Cadastros Pendentes", value: "18", icon: UserCheck, color: "bg-orange-500", change: "Aguardam aprovação" },
          { label: "Missões Activas", value: "47", icon: Globe, color: "bg-emerald-600", change: "+2 este mês" },
          { label: "Contratos", value: "343", icon: AlertCircle, color: "bg-red-500", change: "Activos" },
        ].map((s, i) => (
          <div key={i} className="bg-white rounded-xl shadow-sm p-5 flex items-center gap-4">
            <div className={`${s.color} p-3 rounded-lg shrink-0`}>
              <s.icon className="text-white" size={22} />
            </div>
            <div>
              <p className="text-2xl leading-none mb-1">{s.value}</p>
              <p className="text-xs text-gray-500">{s.label}</p>
              <p className="text-xs text-gray-400 mt-0.5">{s.change}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Charts row */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">

        {/* Bar chart – funcionários por departamento */}
        <div className="lg:col-span-2 bg-white rounded-xl shadow-sm p-6">
          <div className="flex items-center gap-2 mb-4">
            <Users className="text-blue-600" size={18} />
            <h2 className="text-base">Funcionários por Departamento</h2>
          </div>
          <ResponsiveContainer width="100%" height={200}>
            <BarChart data={deptData} barSize={32}>
              <XAxis dataKey="dept" tick={{ fontSize: 12 }} />
              <YAxis tick={{ fontSize: 12 }} />
              <Tooltip />
              <Bar dataKey="funcionarios" fill="#2563eb" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Pie chart – tipo de vínculo */}
        <div className="bg-white rounded-xl shadow-sm p-6">
          <div className="flex items-center gap-2 mb-4">
            <TrendingUp className="text-purple-600" size={18} />
            <h2 className="text-base">Tipo de Vínculo</h2>
          </div>
          <ResponsiveContainer width="100%" height={200}>
            <PieChart>
              <Pie data={pieData} cx="50%" cy="50%" innerRadius={50} outerRadius={80} paddingAngle={3} dataKey="value">
                {pieData.map((_, i) => <Cell key={i} fill={PIE_COLORS[i]} />)}
              </Pie>
              <Tooltip />
              <Legend iconSize={10} wrapperStyle={{ fontSize: 12 }} />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Performance + Pending rows */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">

        {/* Avaliação de desempenho geral */}
        <div className="bg-white rounded-xl shadow-sm p-6 flex flex-col items-center justify-center">
          <h2 className="text-base mb-1 self-start">Taxa de Avaliação de Desempenho</h2>
          <p className="text-xs text-gray-400 mb-4 self-start">Média geral · 2026</p>
          <ResponsiveContainer width="100%" height={150}>
            <RadialBarChart cx="50%" cy="50%" innerRadius={40} outerRadius={70} data={performanceRadial} startAngle={180} endAngle={0}>
              <RadialBar dataKey="value" cornerRadius={8} />
              <Tooltip formatter={(v) => `${v}%`} />
            </RadialBarChart>
          </ResponsiveContainer>
          <p className="text-3xl text-blue-700 -mt-4">86%</p>
          <p className="text-xs text-gray-400 mt-1">4.3 / 5.0 média</p>
          <div className="w-full mt-4 space-y-2">
            {deptData.map((d, i) => (
              <div key={i} className="flex items-center gap-2 text-xs">
                <span className="w-24 text-gray-600 truncate">{d.dept}</span>
                <div className="flex-1 bg-gray-100 rounded-full h-1.5">
                  <div className="bg-blue-500 h-1.5 rounded-full" style={{ width: `${(d.score / 5) * 100}%` }} />
                </div>
                <span className="text-gray-500 w-6">{d.score}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Aprovações pendentes */}
        <div className="bg-white rounded-xl shadow-sm p-6">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
              <UserCheck className="text-orange-500" size={18} />
              <h2 className="text-base">Aprovações Pendentes</h2>
            </div>
            <span className="text-xs bg-orange-100 text-orange-700 px-2 py-0.5 rounded-full">18</span>
          </div>
          <div className="space-y-3">
            {pendingApprovals.map((a, i) => (
              <div key={i} className="flex items-center justify-between py-2 border-b border-gray-100 last:border-0">
                <div>
                  <p className="text-sm">{a.name}</p>
                  <p className="text-xs text-gray-400">{a.type}</p>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-xs text-gray-400 flex items-center gap-1"><Clock size={10} />{a.time}</span>
                  <button className="text-xs px-2 py-1 bg-green-100 text-green-700 rounded hover:bg-green-200 transition-colors flex items-center gap-1">
                    <CheckCircle size={10} />Aprovar
                  </button>
                </div>
              </div>
            ))}
          </div>
          <Link to="/gestor/approvals" className="mt-4 block text-center text-xs text-blue-600 hover:underline">
            Ver todas →
          </Link>
        </div>

        {/* Pedidos de férias pendentes */}
        <div className="bg-white rounded-xl shadow-sm p-6">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
              <Calendar className="text-blue-500" size={18} />
              <h2 className="text-base">Férias Pendentes</h2>
            </div>
            <span className="text-xs bg-blue-100 text-blue-700 px-2 py-0.5 rounded-full">3</span>
          </div>
          <div className="space-y-3">
            {pendingLeave.map((l, i) => (
              <div key={i} className="flex items-center justify-between py-2 border-b border-gray-100 last:border-0">
                <div>
                  <p className="text-sm">{l.name}</p>
                  <p className="text-xs text-gray-400">{l.dates} · {l.days} dias</p>
                </div>
                <div className="flex gap-1">
                  <button className="text-xs px-2 py-1 bg-green-100 text-green-700 rounded hover:bg-green-200 transition-colors">✓</button>
                  <button className="text-xs px-2 py-1 bg-red-100 text-red-600 rounded hover:bg-red-200 transition-colors">✕</button>
                </div>
              </div>
            ))}
          </div>
          <Link to="/gestor/attendance" className="mt-4 block text-center text-xs text-blue-600 hover:underline">
            Ver todas →
          </Link>
        </div>
      </div>

      {/* Alertas de missões */}
      <div className="bg-white rounded-xl shadow-sm p-6">
        <div className="flex items-center gap-2 mb-4">
          <Globe className="text-emerald-600" size={18} />
          <h2 className="text-base">Alertas de Duração de Missões</h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {missionAlerts.map((m, i) => (
            <div key={i} className={`p-4 rounded-lg border-l-4 ${
              m.status === "critical" ? "border-red-500 bg-red-50"
              : m.status === "warning" ? "border-orange-400 bg-orange-50"
              : "border-green-500 bg-green-50"
            }`}>
              <p className="text-sm mb-0.5">{m.name}</p>
              <p className="text-xs text-gray-500 mb-2">{m.mission}</p>
              <div className="flex items-center justify-between">
                <div className="flex-1 bg-white/60 rounded-full h-1.5 mr-2">
                  <div className={`h-1.5 rounded-full ${
                    m.status === "critical" ? "bg-red-500"
                    : m.status === "warning" ? "bg-orange-400"
                    : "bg-green-500"
                  }`} style={{ width: `${Math.min((m.months / 36) * 100, 100)}%` }} />
                </div>
                <span className="text-xs text-gray-600 shrink-0">{m.months} meses</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
