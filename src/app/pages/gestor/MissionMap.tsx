import { useState } from "react";
import { ComposableMap, Geographies, Geography, Marker, ZoomableGroup } from "react-simple-maps";
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer } from "recharts";
import { MapPin, Users, AlertTriangle, Clock, Globe, Building2, Filter } from "lucide-react";

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

const CONTINENT_COLORS: Record<string, string> = {
  "Europa": "#3b82f6",
  "África": "#10b981",
  "América do Sul": "#f59e0b",
  "América do Norte": "#8b5cf6",
  "Ásia": "#ef4444",
};

const continents = ["Todos", "Europa", "África", "América do Sul", "América do Norte", "Ásia"];
const types = ["Todos", "Embaixada", "Consulado"];
const durations = ["Todas", "< 1 ano", "1–2 anos", "2–3 anos", "> 3 anos"];

const statusColor = (s: string) => s === "critical" ? "#ef4444" : s === "warning" ? "#f59e0b" : "#10b981";
const missionStatus = (m: typeof missions[0]) => {
  if (m.diplomats.some(d => d.status === "critical")) return "critical";
  if (m.diplomats.some(d => d.status === "warning")) return "warning";
  return "normal";
};
const matchesDuration = (months: number, f: string) => {
  if (f === "Todas") return true;
  if (f === "< 1 ano") return months < 12;
  if (f === "1–2 anos") return months >= 12 && months < 24;
  if (f === "2–3 anos") return months >= 24 && months < 36;
  return months >= 36;
};

// Donut chart per continent
function ContinentDonut({ name, value, total, color }: { name: string; value: number; total: number; color: string }) {
  const pct = Math.round((value / total) * 100);
  const data = [{ v: value }, { v: total - value }];
  return (
    <div className="flex items-center gap-3">
      <div className="relative w-14 h-14 shrink-0">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie data={data} dataKey="v" cx="50%" cy="50%" innerRadius={18} outerRadius={26} startAngle={90} endAngle={-270} strokeWidth={0}>
              <Cell fill={color} />
              <Cell fill="#e5e7eb" />
            </Pie>
          </PieChart>
        </ResponsiveContainer>
        <span className="absolute inset-0 flex items-center justify-center text-xs font-medium" style={{ color }}>{value}</span>
      </div>
      <div>
        <p className="text-xs font-medium text-gray-700 leading-tight">{name}</p>
        <p className="text-xs text-gray-400">{pct}% do total</p>
      </div>
    </div>
  );
}

export function MissionMap() {
  const [tooltip, setTooltip] = useState<{ mission: typeof missions[0]; x: number; y: number } | null>(null);
  const [selected, setSelected] = useState<typeof missions[0] | null>(null);
  const [filterContinent, setFilterContinent] = useState("Todos");
  const [filterType, setFilterType] = useState("Todos");
  const [filterDuration, setFilterDuration] = useState("Todas");

  const allDiplomats = missions.flatMap(m => m.diplomats.map(d => ({ ...d, location: m.location, country: m.country, continent: m.continent, type: m.type })));
  const totalDiplomats = allDiplomats.length;

  const continentCounts = Object.entries(
    missions.reduce((acc, m) => {
      acc[m.continent] = (acc[m.continent] || 0) + m.diplomats.length;
      return acc;
    }, {} as Record<string, number>)
  ).sort((a, b) => b[1] - a[1]);

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

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      {/* Header */}
      <div className="mb-5">
        <h1 className="text-2xl mb-1">Mapa de Missões Diplomáticas</h1>
        <p className="text-gray-500 text-sm">Distribuição geográfica dos diplomatas em missão</p>
      </div>

      {/* KPIs */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 mb-6">
        {[
          { label: "Diplomatas", value: totalDiplomats, icon: Users, color: "text-blue-600", bg: "bg-blue-50" },
          { label: "Missões", value: missions.length, icon: Globe, color: "text-emerald-600", bg: "bg-emerald-50" },
          { label: "Em Atenção", value: allDiplomats.filter(d => d.status === "warning").length, icon: Clock, color: "text-amber-500", bg: "bg-amber-50" },
          { label: "Crítico", value: allDiplomats.filter(d => d.status === "critical").length, icon: AlertTriangle, color: "text-red-500", bg: "bg-red-50" },
        ].map((s, i) => (
          <div key={i} className="bg-white rounded-xl shadow-sm p-4 flex items-center gap-3">
            <div className={`${s.bg} p-2.5 rounded-lg`}><s.icon size={18} className={s.color} /></div>
            <div>
              <p className="text-2xl leading-none">{s.value}</p>
              <p className="text-xs text-gray-500 mt-0.5">{s.label}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Infographic: gráficos esquerda + mapa direita */}
      <div className="bg-white rounded-2xl shadow-sm mb-6 overflow-hidden flex flex-col lg:flex-row">

        {/* Painel esquerdo – gráficos por continente */}
        <div className="lg:w-56 shrink-0 p-6 border-b lg:border-b-0 lg:border-r border-gray-100 flex flex-col justify-between gap-5">
          <div>
            <p className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-4">Por Continente</p>
            <div className="space-y-4">
              {continentCounts.map(([name, count]) => (
                <ContinentDonut
                  key={name}
                  name={name}
                  value={count}
                  total={totalDiplomats}
                  color={CONTINENT_COLORS[name] ?? "#6b7280"}
                />
              ))}
            </div>
          </div>

          {/* Legenda status */}
          <div className="pt-4 border-t border-gray-100 space-y-2">
            <p className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-2">Estado</p>
            {[["#10b981", "Normal"], ["#f59e0b", "Atenção"], ["#ef4444", "Crítico"]].map(([color, label]) => (
              <div key={label} className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full shrink-0" style={{ backgroundColor: color }} />
                <span className="text-xs text-gray-600">{label}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Mapa */}
        <div className="flex-1 relative" style={{ minHeight: 380 }}>
          <ComposableMap
            projectionConfig={{ rotate: [-10, 0, 0], scale: 147 }}
            style={{ width: "100%", height: "100%", background: "#fff" }}
          >
            <ZoomableGroup zoom={1}>
              <Geographies geography={GEO_URL}>
                {({ geographies }) =>
                  geographies.map(geo => (
                    <Geography
                      key={geo.rsmKey}
                      geography={geo}
                      fill="#d1d5db"
                      stroke="#f3f4f6"
                      strokeWidth={0.5}
                      style={{
                        default: { outline: "none" },
                        hover: { outline: "none", fill: "#9ca3af" },
                        pressed: { outline: "none" },
                      }}
                    />
                  ))
                }
              </Geographies>

              {missions.map(m => {
                const status = missionStatus(m);
                const color = statusColor(status);
                const isFiltered = !filteredMissions.includes(m);
                const continentColor = CONTINENT_COLORS[m.continent] ?? "#6b7280";
                return (
                  <Marker
                    key={m.id}
                    coordinates={m.coordinates}
                    onClick={() => setSelected(m === selected ? null : m)}
                    onMouseEnter={e => setTooltip({ mission: m, x: e.clientX, y: e.clientY })}
                    onMouseLeave={() => setTooltip(null)}
                  >
                    {/* Pin shape */}
                    <g style={{ cursor: "pointer", opacity: isFiltered ? 0.25 : 1, transition: "opacity 0.2s" }}>
                      <circle r={8} fill={continentColor} stroke="#fff" strokeWidth={1.5} />
                      <circle r={3} fill="#fff" />
                      {/* pulse ring for critical */}
                      {status === "critical" && (
                        <circle r={12} fill="none" stroke="#ef4444" strokeWidth={1.5} opacity={0.5} />
                      )}
                      <line x1={0} y1={8} x2={0} y2={14} stroke={continentColor} strokeWidth={1.5} />
                    </g>
                  </Marker>
                );
              })}
            </ZoomableGroup>
          </ComposableMap>

          {/* Tooltip */}
          {tooltip && (
            <div
              className="fixed z-50 bg-white rounded-xl shadow-lg border border-gray-100 p-3 text-sm pointer-events-none"
              style={{ left: tooltip.x + 14, top: tooltip.y - 50 }}
            >
              <p className="font-medium text-gray-800">{tooltip.mission.location}</p>
              <p className="text-gray-400 text-xs mt-0.5">
                {tooltip.mission.country} · {tooltip.mission.type} · {tooltip.mission.diplomats.length} diplomata(s)
              </p>
            </div>
          )}
        </div>
      </div>

      {/* Detalhe da missão seleccionada */}
      {selected && (
        <div className="bg-white rounded-2xl shadow-sm mb-6 p-5 border-l-4" style={{ borderColor: CONTINENT_COLORS[selected.continent] }}>
          <div className="flex items-start justify-between mb-4">
            <div>
              <h3 className="text-base font-medium">{selected.location}</h3>
              <p className="text-sm text-gray-500">{selected.country} · {selected.continent} · {selected.type}</p>
            </div>
            <button onClick={() => setSelected(null)} className="text-gray-400 hover:text-gray-600 text-xl leading-none">×</button>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
            {selected.diplomats.map((d, i) => (
              <div key={i} className="p-3 rounded-xl border border-gray-100 bg-gray-50">
                <p className="text-sm font-medium text-gray-800">{d.name}</p>
                <p className="text-xs text-gray-500 mt-0.5">Início: {d.start}</p>
                <div className="flex items-center justify-between mt-2">
                  <span className="text-xs text-gray-500">{d.months} meses</span>
                  <span className="text-xs px-2 py-0.5 rounded-full" style={{
                    backgroundColor: statusColor(d.status) + "22",
                    color: statusColor(d.status),
                  }}>
                    {d.status === "critical" ? "Crítico" : d.status === "warning" ? "Atenção" : "Normal"}
                  </span>
                </div>
                <div className="mt-2 bg-gray-200 rounded-full h-1">
                  <div className="h-1 rounded-full transition-all" style={{
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
      <div className="bg-white rounded-2xl shadow-sm p-5 mb-5">
        <div className="flex items-center gap-2 mb-4">
          <Filter size={15} className="text-gray-400" />
          <span className="text-sm text-gray-600">Filtros</span>
        </div>
        <div className="flex flex-wrap gap-6">
          <div>
            <p className="text-xs text-gray-400 mb-2 uppercase tracking-wide">Continente</p>
            <div className="flex flex-wrap gap-1.5">
              {continents.map(c => (
                <button key={c} onClick={() => setFilterContinent(c)}
                  className={`px-3 py-1 rounded-lg text-xs transition-colors ${
                    filterContinent === c
                      ? "text-white"
                      : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                  }`}
                  style={filterContinent === c ? { backgroundColor: CONTINENT_COLORS[c] ?? "#3b82f6" } : {}}>
                  {c}
                </button>
              ))}
            </div>
          </div>
          <div>
            <p className="text-xs text-gray-400 mb-2 uppercase tracking-wide">Tipo</p>
            <div className="flex gap-1.5">
              {types.map(t => (
                <button key={t} onClick={() => setFilterType(t)}
                  className={`px-3 py-1 rounded-lg text-xs transition-colors flex items-center gap-1 ${
                    filterType === t ? "bg-slate-700 text-white" : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                  }`}>
                  {t !== "Todos" && <Building2 size={10} />}{t}
                </button>
              ))}
            </div>
          </div>
          <div>
            <p className="text-xs text-gray-400 mb-2 uppercase tracking-wide">Duração</p>
            <div className="flex flex-wrap gap-1.5">
              {durations.map(d => (
                <button key={d} onClick={() => setFilterDuration(d)}
                  className={`px-3 py-1 rounded-lg text-xs transition-colors ${
                    filterDuration === d ? "bg-slate-700 text-white" : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                  }`}>
                  {d}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Tabela */}
      <div className="bg-white rounded-2xl shadow-sm overflow-hidden">
        <div className="p-5 border-b border-gray-100 flex items-center justify-between">
          <span className="text-sm font-medium text-gray-700">Resultados</span>
          <span className="text-xs text-gray-400">{filteredDiplomats.length} diplomata(s)</span>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                {["Diplomata", "Missão", "Tipo", "País", "Início", "Duração", "Estado"].map(h => (
                  <th key={h} className="px-5 py-3 text-left text-xs uppercase tracking-wide text-gray-400">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {filteredDiplomats.sort((a, b) => b.months - a.months).map((d, i) => (
                <tr key={i} className="hover:bg-gray-50 transition-colors">
                  <td className="px-5 py-3 text-sm text-gray-800">{d.name}</td>
                  <td className="px-5 py-3 text-sm text-gray-600">{d.location}</td>
                  <td className="px-5 py-3">
                    <span className="text-xs px-2 py-0.5 rounded-full bg-gray-100 text-gray-500 flex items-center gap-1 w-fit">
                      <Building2 size={10} />{d.type}
                    </span>
                  </td>
                  <td className="px-5 py-3 text-sm text-gray-600">{d.country}</td>
                  <td className="px-5 py-3 text-xs text-gray-400">{d.start}</td>
                  <td className="px-5 py-3">
                    <div className="flex items-center gap-2">
                      <div className="w-14 bg-gray-100 rounded-full h-1.5">
                        <div className="h-1.5 rounded-full" style={{
                          width: `${Math.min((d.months / 36) * 100, 100)}%`,
                          backgroundColor: statusColor(d.status),
                        }} />
                      </div>
                      <span className="text-xs text-gray-500">{d.months}m</span>
                    </div>
                  </td>
                  <td className="px-5 py-3">
                    <span className="text-xs px-2 py-0.5 rounded-full" style={{
                      backgroundColor: statusColor(d.status) + "22",
                      color: statusColor(d.status),
                    }}>
                      {d.status === "critical" ? "Crítico" : d.status === "warning" ? "Atenção" : "Normal"}
                    </span>
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
