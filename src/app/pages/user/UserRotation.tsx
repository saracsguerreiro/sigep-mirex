import { Globe, MapPin, Calendar, CheckCircle, Clock, AlertCircle, ArrowRight } from "lucide-react";

const rotations = [
  {
    id: "ROT-2019-003",
    post: "Consulado de São Paulo",
    country: "Brasil",
    type: "Consulado",
    startDate: "01/03/2019",
    endDate: "28/02/2022",
    era: "past",
    status: "Concluído",
  },
  {
    id: "ROT-2022-007",
    post: "Embaixada de Lisboa",
    country: "Portugal",
    type: "Embaixada",
    startDate: "01/09/2022",
    endDate: "31/08/2025",
    era: "past",
    status: "Concluído",
  },
  {
    id: "ROT-2025-012",
    post: "Ministério - Luanda",
    country: "Angola",
    type: "Sede",
    startDate: "01/09/2025",
    endDate: "31/08/2027",
    era: "current",
    status: "Activo",
  },
  {
    id: "ROT-2027-004",
    post: "Embaixada de Pequim",
    country: "China",
    type: "Embaixada",
    startDate: "01/09/2027",
    endDate: "31/08/2030",
    era: "future",
    status: "Aprovado",
  },
  {
    id: "ROT-2030-001",
    post: "Embaixada de Tóquio",
    country: "Japão",
    type: "Embaixada",
    startDate: "01/09/2030",
    endDate: "31/08/2033",
    era: "future",
    status: "Planeamento",
  },
];

const eraConfig = {
  past:    { label: "Rotações Anteriores", color: "border-gray-300",   bg: "bg-gray-50",   text: "text-gray-500",   dot: "bg-gray-400"   },
  current: { label: "Rotação Actual",      color: "border-blue-500",   bg: "bg-blue-50",   text: "text-blue-700",   dot: "bg-blue-500"   },
  future:  { label: "Rotações Futuras",    color: "border-emerald-400",bg: "bg-emerald-50",text: "text-emerald-700",dot: "bg-emerald-400" },
};

const statusConfig: Record<string, { color: string; icon: React.ReactNode }> = {
  "Concluído":   { color: "bg-gray-100 text-gray-600",   icon: <CheckCircle size={12}/> },
  "Activo":      { color: "bg-blue-100 text-blue-700",   icon: <CheckCircle size={12}/> },
  "Aprovado":    { color: "bg-green-100 text-green-700", icon: <CheckCircle size={12}/> },
  "Planeamento": { color: "bg-amber-100 text-amber-700", icon: <Clock size={12}/> },
  "Pendente":    { color: "bg-orange-100 text-orange-700",icon: <AlertCircle size={12}/> },
};

function duration(start: string, end: string) {
  const [ds, ms, ys] = start.split("/").map(Number);
  const [de, me, ye] = end.split("/").map(Number);
  const months = (ye - ys) * 12 + (me - ms) + (de >= ds ? 0 : -1);
  const y = Math.floor(months / 12);
  const m = months % 12;
  return y > 0 ? `${y} ano${y > 1 ? "s" : ""}${m > 0 ? ` ${m} m` : ""}` : `${m} meses`;
}

export function UserRotation() {
  const past    = rotations.filter(r => r.era === "past");
  const current = rotations.filter(r => r.era === "current");
  const future  = rotations.filter(r => r.era === "future");

  const kpis = [
    { label: "Total de Rotações",      value: rotations.length,                                     icon: Globe,        color: "text-blue-600",   bg: "bg-blue-50"   },
    { label: "Planeadas",              value: future.length,                                         icon: Calendar,     color: "text-emerald-600", bg: "bg-emerald-50"},
    { label: "Missões Internacionais", value: rotations.filter(r=>r.country !== "Angola").length,    icon: MapPin,       color: "text-purple-600", bg: "bg-purple-50" },
    { label: "Pendentes de Aprovação", value: rotations.filter(r=>r.status === "Pendente").length,   icon: AlertCircle,  color: "text-orange-500", bg: "bg-orange-50" },
  ];

  const groups = [
    { era: "current" as const, items: current },
    { era: "future"  as const, items: future  },
    { era: "past"    as const, items: past    },
  ];

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <div className="mb-6">
        <h1 className="text-2xl mb-1">Rotação Diplomática</h1>
        <p className="text-gray-500 text-sm">Histórico completo de rotações e missões atribuídas</p>
      </div>

      {/* KPIs */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 mb-6">
        {kpis.map((k, i) => (
          <div key={i} className="bg-white rounded-xl shadow-sm p-4 flex items-center gap-3">
            <div className={`${k.bg} p-2.5 rounded-lg`}>
              <k.icon size={18} className={k.color} />
            </div>
            <div>
              <p className="text-2xl leading-none">{k.value}</p>
              <p className="text-xs text-gray-500 mt-0.5">{k.label}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Timeline de rotações */}
      <div className="space-y-6">
        {groups.map(({ era, items }) => {
          if (items.length === 0) return null;
          const cfg = eraConfig[era];
          return (
            <div key={era}>
              <div className="flex items-center gap-2 mb-3">
                <span className={`w-2.5 h-2.5 rounded-full ${cfg.dot}`}/>
                <h2 className="text-sm font-semibold text-gray-600 uppercase tracking-wide">{cfg.label}</h2>
              </div>
              <div className="space-y-3">
                {items.map((rot) => {
                  const st = statusConfig[rot.status] ?? statusConfig["Planeamento"];
                  return (
                    <div key={rot.id}
                      className={`bg-white rounded-xl shadow-sm border-l-4 ${cfg.color} p-4`}>
                      <div className="flex items-start justify-between gap-3">

                        {/* Info principal */}
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-2 flex-wrap mb-1">
                            <p className="font-semibold text-gray-900">{rot.post}</p>
                            <span className="text-xs px-2 py-0.5 rounded-full bg-gray-100 text-gray-500">{rot.type}</span>
                          </div>
                          <div className="flex items-center gap-1.5 text-sm text-gray-500 mb-2">
                            <MapPin size={12} className="shrink-0"/>
                            <span>{rot.country}</span>
                          </div>
                          {/* Datas */}
                          <div className={`inline-flex items-center gap-2 text-xs px-3 py-1.5 rounded-lg ${cfg.bg}`}>
                            <Calendar size={11} className={cfg.text}/>
                            <span className={cfg.text}>{rot.startDate}</span>
                            <ArrowRight size={11} className={cfg.text}/>
                            <span className={cfg.text}>{rot.endDate}</span>
                            <span className={`${cfg.text} opacity-60`}>· {duration(rot.startDate, rot.endDate)}</span>
                          </div>
                        </div>

                        {/* Estado + ID */}
                        <div className="flex flex-col items-end gap-2 shrink-0">
                          <span className={`flex items-center gap-1 text-xs px-2.5 py-1 rounded-full ${st.color}`}>
                            {st.icon}{rot.status}
                          </span>
                          <span className="text-xs text-gray-300">{rot.id}</span>
                        </div>

                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
