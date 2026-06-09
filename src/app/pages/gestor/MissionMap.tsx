import { useState } from "react";
import {
  ComposableMap, Geographies, Geography, Marker, ZoomableGroup,
} from "react-simple-maps";
import { Globe, AlertTriangle, Clock, MapPin, Filter, Users, Building2 } from "lucide-react";

const GEO_URL = "https://cdn.jsdelivr.net/npm/world-atlas@2/countries-110m.json";

const missions = [
  {
    id: "M001", location: "Embaixada de Lisboa", type: "Embaixada",
    country: "Portugal", continent: "Europa",
    coordinates: [-9.14, 38.72] as [number, number],
    diplomats: [
      { name: "Ana Paula Silva", months: 35, status: "warning", start: "Jul 2023" },
      { name: "Pedro Alves", months: 20, status: "normal", start: "Out 2024" },
    ],
  },
  {
    id: "M002", location: "Consulado de Paris", type: "Consulado",
    country: "França", continent: "Europa",
    coordinates: [2.35, 48.86] as [number, number],
    diplomats: [
      { name: "Maria Santos", months: 32, status: "normal", start: "Out 2023" },
    ],
  },
  {
    id: "M003", location: "Embaixada de Brasília", type: "Embaixada",
    country: "Brasil", continent: "América do Sul",
    coordinates: [-47.93, -15.78] as [number, number],
    diplomats: [
      { name: "João Neto", months: 38, status: "critical", start: "Abr 2023" },
      { name: "Carlos Mendes", months: 15, status: "normal", start: "Mar 2025" },
    ],
  },
  {
    id: "M004", location: "Embaixada de Pequim", type: "Embaixada",
    country: "China", continent: "Ásia",
    coordinates: [116.40, 39.91] as [number, number],
    diplomats: [
      { name: "Lúcia Costa", months: 34, status: "warning", start: "Ago 2023" },
      { name: "Miguel Santos", months: 17, status: "normal", start: "Jan 2025" },
      { name: "Sofia Almeida", months: 6, status: "normal", start: "Dez 2025" },
    ],
  },
  {
    id: "M005", location: "Consulado de Luanda", type: "Consulado",
    country: "Angola", continent: "África",
    coordinates: [13.23, -8.84] as [number, number],
    diplomats: [
      { name: "António Silva", months: 14, status: "normal", start: "Abr 2025" },
    ],
  },
  {
    id: "M006", location: "Embaixada de Washington", type: "Embaixada",
    country: "EUA", continent: "América do Norte",
    coordinates: [-77.04, 38.91] as [number, number],
    diplomats: [
      { name: "Beatriz Fernandes", months: 33, status: "warning", start: "Set 2023" },
      { name: "Ricardo Gomes", months: 40, status: "critical", start: "Fev 2023" },
    ],
  },
  {
    id: "M007", location: "Embaixada de Moscovo", type: "Embaixada",
    country: "Rússia", continent: "Europa",
    coordinates: [37.62, 55.75] as [number, number],
    diplomats: [
      { name: "Fernando Costa", months: 18, status: "normal", start: "Dez 2024" },
    ],
  },
  {
    id: "M008", location: "Consulado de Joanesburgo", type: "Consulado",
    country: "África do Sul", continent: "África",
    coordinates: [28.04, -26.20] as [number, number],
    diplomats: [
      { name: "Helena Martins", months: 22, status: "normal", start: "Ago 2024" },
      { name: "Rui Pereira", months: 10, status: "normal", start: "Ago 2025" },
    ],
  },
];

const continents = ["Todos", "Europa", "África", "América do Sul", "América do Norte", "Ásia"];
const types = ["Todos", "Embaixada", "Consulado"];
const durations = ["Todas", "< 1 ano", "1–2 anos", "2–3 anos", "> 3 anos"];

const statusColor = (status: string) =>
  status === "critical" ? "#ef4444" : status === "warning" ? "#f59e0b" : "#10b981";

const statusLabel = (status: string) =>
  status === "critical" ? "Crítico" : status === "warning" ? "Atenção" : "Normal";

const missionStatus = (m: typeof missions[0]) => {
  if (m.diplomats.some(d => d.status === "critical")) return "critical";
  if (m.diplomats.some(d => d.status === "warning")) return "warning";
  return "normal";
};

const matchesDuration = (months: number, filter: string) => {
  if (filter === "Todas") return true;
  if (filter === "< 1 ano") return months < 12;
  if (filter === "1–2 anos") return months >= 12 && months < 24;
  if (filter === "2–3 anos") return months >= 24 && months < 36;
  if (filter === "> 3 anos") return months >= 36;
  return true;
};

export function MissionMap() {
  const [tooltip, setTooltip] = useState<{ mission: typeof missions[0]; x: number; y: number } | null>(null);
  const [selectedMission, setSelectedMission] = useState<typeof missions[0] | null>(null);
  const [filterContinent, setFilterContinent] = useState("Todos");
  const [filterType, setFilterType] = useState("Todos");
  const [filterDuration, setFilterDuration] = useState("Todas");

  const allDiplomats = missions.flatMap(m =>
    m.diplomats.map(d => ({ ...d, location: m.location, country: m.country, continent: m.continent, type: m.type }))
  );

  const filteredMissions = missions.filter(m => {
    if (filterContinent !== "Todos" && m.continent !== filterContinent) return false;
    if (filterType !== "Todos" && m.type !== filterType) return false;
    if (filterDuration !== "Todas" && !m.diplomats.some(d => matchesDuration(d.months, filterDuration))) return false;
    return true;
  });

  const filteredDiplomats = allDiplomats.filter(d => {
    if (filterContinent !== "Todos" && d.continent !== filterContinent) return false;
    if (filterType !== "Todos" && d.type !== filterType) return false;
    if (filterDuration !== "Todas" && !matchesDuration(d.months, filterDuration)) return false;
    return true;
  });

  const stats = {
    total: allDiplomats.length,
    critical: allDiplomats.filter(d => d.status === "critical").length,
    warning: allDiplomats.filter(d => d.status === "warning").length,
    missions: missions.length,
  };

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      {/* Header */}
      <div className="mb-6">
        <h1 className="text-3xl mb-1">Mapa de Missões Diplomáticas</h1>
        <p className="text-gray-500 text-sm">Distribuição geográfica e controlo de duração das missões</p>
      </div>

      {/* KPIs */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        {[
          { label: "Total Diplomatas", value: stats.total, icon: Users, color: "text-blue-600", bg: "bg-blue-50" },
          { label: "Missões Activas", value: stats.missions, icon: Globe, color: "text-emerald-600", bg: "bg-emerald-50" },
          { label: "Em Atenção", value: stats.warning, icon: Clock, color: "text-orange-500", bg: "bg-orange-50" },
          { label: "Crítico", value: stats.critical, icon: AlertTriangle, color: "text-red-500", bg: "bg-red-50" },
        ].map((s, i) => (
          <div key={i} className="bg-white rounded-xl shadow-sm p-4 flex items-center gap-3">
            <div className={`${s.bg} p-2.5 rounded-lg`}>
              <s.icon size={20} className={s.color} />
            </div>
            <div>
              <p className="text-2xl leading-none">{s.value}</p>
              <p className="text-xs text-gray-500 mt-0.5">{s.label}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Mapa */}
      <div className="bg-white rounded-xl shadow-sm mb-6 overflow-hidden">
        <div className="p-4 border-b border-gray-100 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Globe size={18} className="text-blue-600" />
            <span className="text-base">Distribuição Geográfica</span>
          </div>
          <div className="flex items-center gap-4 text-xs text-gray-500">
            {[["#10b981", "Normal"], ["#f59e0b", "Atenção"], ["#ef4444", "Crítico"]].map(([color, label]) => (
              <span key={label} className="flex items-center gap-1">
                <span className="w-3 h-3 rounded-full inline-block" style={{ backgroundColor: color }} />
                {label}
              </span>
            ))}
            <span className="text-gray-400">· clique para detalhes</span>
          </div>
        </div>

        <div className="relative bg-slate-900" style={{ height: 420 }}>
          <ComposableMap
            projectionConfig={{ rotate: [-10, 0, 0], scale: 147 }}
            style={{ width: "100%", height: "100%" }}
          >
            <ZoomableGroup zoom={1}>
              <Geographies geography={GEO_URL}>
                {({ geographies }) =>
                  geographies.map(geo => (
                    <Geography
                      key={geo.rsmKey}
                      geography={geo}
                      fill="#1e293b"
                      stroke="#334155"
                      strokeWidth={0.5}
                      style={{ default: { outline: "none" }, hover: { outline: "none", fill: "#273549" }, pressed: { outline: "none" } }}
                    />
                  ))
                }
              </Geographies>

              {missions.map(m => {
                const status = missionStatus(m);
                const color = statusColor(status);
                const r = 6 + m.diplomats.length * 3;
                const isFiltered = !filteredMissions.includes(m);
                return (
                  <Marker
                    key={m.id}
                    coordinates={m.coordinates}
                    onClick={() => setSelectedMission(m === selectedMission ? null : m)}
                    onMouseEnter={e => setTooltip({ mission: m, x: e.clientX, y: e.clientY })}
                    onMouseLeave={() => setTooltip(null)}
                  >
                    <circle
                      r={r}
                      fill={color}
                      fillOpacity={isFiltered ? 0.2 : 0.85}
                      stroke={isFiltered ? "#475569" : "#fff"}
                      strokeWidth={1.5}
                      style={{ cursor: "pointer", transition: "all 0.2s" }}
                    />
                    <text
                      textAnchor="middle"
                      y={4}
                      style={{ fontSize: 9, fill: "#fff", fontWeight: "bold", pointerEvents: "none" }}
                    >
                      {m.diplomats.length}
                    </text>
                  </Marker>
                );
              })}
            </ZoomableGroup>
          </ComposableMap>

          {/* Tooltip */}
          {tooltip && (
            <div
              className="fixed z-50 bg-white rounded-lg shadow-lg p-3 text-sm pointer-events-none"
              style={{ left: tooltip.x + 12, top: tooltip.y - 40 }}
            >
              <p className="font-medium">{tooltip.mission.location}</p>
              <p className="text-gray-500 text-xs">{tooltip.mission.country} · {tooltip.mission.diplomats.length} diplomata(s)</p>
            </div>
          )}
        </div>

        {/* Continentes por volume */}
        <div className="p-4 border-t border-gray-100">
          <div className="flex flex-wrap gap-3">
            {Object.entries(
              missions.reduce((acc, m) => {
                acc[m.continent] = (acc[m.continent] || 0) + m.diplomats.length;
                return acc;
              }, {} as Record<string, number>)
            ).sort((a, b) => b[1] - a[1]).map(([continent, count]) => (
              <div key={continent} className="flex items-center gap-2 px-3 py-1.5 bg-slate-50 rounded-full">
                <MapPin size={12} className="text-blue-600" />
                <span className="text-xs text-gray-700">{continent}</span>
                <span className="text-xs bg-blue-100 text-blue-700 px-1.5 py-0.5 rounded-full">{count}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Painel de detalhe da missão seleccionada */}
      {selectedMission && (
        <div className="bg-white rounded-xl shadow-sm mb-6 p-5 border-l-4 border-blue-500">
          <div className="flex items-start justify-between mb-3">
            <div>
              <h3 className="text-lg">{selectedMission.location}</h3>
              <p className="text-sm text-gray-500">{selectedMission.country} · {selectedMission.continent}</p>
            </div>
            <button onClick={() => setSelectedMission(null)} className="text-gray-400 hover:text-gray-600 text-lg leading-none">×</button>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
            {selectedMission.diplomats.map((d, i) => (
              <div key={i} className={`p-3 rounded-lg border-l-4 ${
                d.status === "critical" ? "border-red-500 bg-red-50"
                : d.status === "warning" ? "border-orange-400 bg-orange-50"
                : "border-green-500 bg-green-50"
              }`}>
                <p className="text-sm">{d.name}</p>
                <p className="text-xs text-gray-500 mt-0.5">Início: {d.start}</p>
                <div className="flex items-center justify-between mt-2">
                  <span className="text-xs text-gray-600">{d.months} meses</span>
                  <span className={`text-xs px-2 py-0.5 rounded-full ${
                    d.status === "critical" ? "bg-red-200 text-red-800"
                    : d.status === "warning" ? "bg-orange-200 text-orange-800"
                    : "bg-green-200 text-green-800"
                  }`}>{statusLabel(d.status)}</span>
                </div>
                <div className="mt-2 bg-white/60 rounded-full h-1.5">
                  <div className="h-1.5 rounded-full transition-all" style={{
                    width: `${Math.min((d.months / 36) * 100, 100)}%`,
                    backgroundColor: statusColor(d.status),
                  }} />
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Filtros */}
      <div className="bg-white rounded-xl shadow-sm p-5 mb-6">
        <div className="flex items-center gap-2 mb-4">
          <Filter size={16} className="text-gray-500" />
          <span className="text-sm text-gray-700">Filtros</span>
        </div>
        <div className="flex flex-wrap gap-6">
          <div>
            <p className="text-xs text-gray-500 mb-2 uppercase tracking-wide">Continente</p>
            <div className="flex flex-wrap gap-2">
              {continents.map(c => (
                <button key={c} onClick={() => setFilterContinent(c)}
                  className={`px-3 py-1.5 rounded-lg text-xs transition-colors ${
                    filterContinent === c ? "bg-blue-600 text-white" : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                  }`}>
                  {c}
                </button>
              ))}
            </div>
          </div>
          <div>
            <p className="text-xs text-gray-500 mb-2 uppercase tracking-wide">Tipo</p>
            <div className="flex gap-2">
              {types.map(t => (
                <button key={t} onClick={() => setFilterType(t)}
                  className={`px-3 py-1.5 rounded-lg text-xs transition-colors flex items-center gap-1.5 ${
                    filterType === t ? "bg-purple-600 text-white" : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                  }`}>
                  {t !== "Todos" && <Building2 size={11} />}{t}
                </button>
              ))}
            </div>
          </div>
          <div>
            <p className="text-xs text-gray-500 mb-2 uppercase tracking-wide">Duração</p>
            <div className="flex flex-wrap gap-2">
              {durations.map(d => (
                <button key={d} onClick={() => setFilterDuration(d)}
                  className={`px-3 py-1.5 rounded-lg text-xs transition-colors ${
                    filterDuration === d ? "bg-emerald-600 text-white" : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                  }`}>
                  {d}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Tabela de resultados */}
      <div className="bg-white rounded-xl shadow-sm overflow-hidden">
        <div className="p-5 border-b border-gray-100 flex items-center justify-between">
          <span className="text-base">Resultados</span>
          <span className="text-xs text-gray-500">{filteredDiplomats.length} diplomata(s)</span>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                {["Diplomata", "Missão", "Tipo", "País", "Início", "Duração", "Estado"].map(h => (
                  <th key={h} className="px-5 py-3 text-left text-xs uppercase tracking-wide text-gray-500">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {filteredDiplomats.sort((a, b) => b.months - a.months).map((d, i) => (
                <tr key={i} className="hover:bg-gray-50 transition-colors">
                  <td className="px-5 py-3 text-sm">{d.name}</td>
                  <td className="px-5 py-3 text-sm">{d.location}</td>
                  <td className="px-5 py-3">
                    <span className="text-xs px-2 py-1 rounded-full bg-purple-100 text-purple-700 flex items-center gap-1 w-fit">
                      <Building2 size={10} />{d.type}
                    </span>
                  </td>
                  <td className="px-5 py-3 text-sm">{d.country}</td>
                  <td className="px-5 py-3 text-xs text-gray-500">{d.start}</td>
                  <td className="px-5 py-3 text-sm">
                    <div className="flex items-center gap-2">
                      <div className="w-16 bg-gray-200 rounded-full h-1.5">
                        <div className="h-1.5 rounded-full" style={{
                          width: `${Math.min((d.months / 36) * 100, 100)}%`,
                          backgroundColor: statusColor(d.status),
                        }} />
                      </div>
                      <span className="text-xs text-gray-600">{d.months}m</span>
                    </div>
                  </td>
                  <td className="px-5 py-3">
                    <span className={`text-xs px-2 py-1 rounded-full ${
                      d.status === "critical" ? "bg-red-100 text-red-700"
                      : d.status === "warning" ? "bg-orange-100 text-orange-700"
                      : "bg-green-100 text-green-700"
                    }`}>{statusLabel(d.status)}</span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
