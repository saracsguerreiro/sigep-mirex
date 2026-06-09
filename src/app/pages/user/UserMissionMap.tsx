import { useState } from "react";
import { ComposableMap, Geographies, Geography, Marker, ZoomableGroup } from "react-simple-maps";
import { MapPin, Calendar, Globe, Clock, ArrowRight, CheckCircle } from "lucide-react";

const GEO_URL = "https://cdn.jsdelivr.net/npm/world-atlas@2/countries-110m.json";

const myMissions = [
  {
    id: "M-2019-001",
    post: "Consulado de São Paulo",
    country: "Brasil",
    continent: "América do Sul",
    type: "Consulado",
    startDate: "01/03/2019",
    endDate: "28/02/2022",
    months: 36,
    era: "past",
    coordinates: [-46.63, -23.55] as [number, number],
    note: "Primeira missão internacional. Apoio consular e serviços de documentação.",
  },
  {
    id: "M-2022-007",
    post: "Embaixada de Lisboa",
    country: "Portugal",
    continent: "Europa",
    type: "Embaixada",
    startDate: "01/09/2022",
    endDate: "31/08/2025",
    months: 36,
    era: "past",
    coordinates: [-9.14, 38.72] as [number, number],
    note: "Secção consular e relações bilaterais Angola–Portugal.",
  },
  {
    id: "M-2025-012",
    post: "Ministério – Luanda",
    country: "Angola",
    continent: "África",
    type: "Sede",
    startDate: "01/09/2025",
    endDate: "31/08/2027",
    months: 24,
    era: "current",
    coordinates: [13.23, -8.84] as [number, number],
    note: "Regresso à sede. Coordenação de assuntos multilaterais.",
  },
  {
    id: "M-2027-004",
    post: "Embaixada de Pequim",
    country: "China",
    continent: "Ásia",
    type: "Embaixada",
    startDate: "01/09/2027",
    endDate: "31/08/2030",
    months: 36,
    era: "future",
    coordinates: [116.40, 39.91] as [number, number],
    note: "Missão aprovada. Área económica e cooperação bilateral.",
  },
  {
    id: "M-2030-001",
    post: "Embaixada de Tóquio",
    country: "Japão",
    continent: "Ásia",
    type: "Embaixada",
    startDate: "01/09/2030",
    endDate: "31/08/2033",
    months: 36,
    era: "future",
    coordinates: [139.69, 35.69] as [number, number],
    note: "Em fase de planeamento.",
  },
];

const eraColors: Record<string, string> = {
  past:    "#9ca3af",
  current: "#3b82f6",
  future:  "#10b981",
};
const eraLabels: Record<string, string> = {
  past:    "Anterior",
  current: "Actual",
  future:  "Futura",
};
const eraBorder: Record<string, string> = {
  past:    "border-gray-300",
  current: "border-blue-500",
  future:  "border-emerald-400",
};
const eraTagColor: Record<string, string> = {
  past:    "bg-gray-100 text-gray-500",
  current: "bg-blue-100 text-blue-700",
  future:  "bg-emerald-100 text-emerald-700",
};

function durationStr(months: number) {
  const y = Math.floor(months / 12);
  const m = months % 12;
  return y > 0 ? `${y} ano${y > 1 ? "s" : ""}${m > 0 ? ` ${m}m` : ""}` : `${m} meses`;
}

export function UserMissionMap() {
  const [selected, setSelected] = useState<typeof myMissions[0] | null>(null);
  const [tooltip,  setTooltip]  = useState<{ m: typeof myMissions[0]; x: number; y: number } | null>(null);

  const past    = myMissions.filter(m => m.era === "past");
  const current = myMissions.filter(m => m.era === "current");
  const future  = myMissions.filter(m => m.era === "future");
  const totalMonthsAbroad = myMissions.filter(m => m.country !== "Angola").reduce((s, m) => s + m.months, 0);
  const totalYears = Math.floor(totalMonthsAbroad / 12);

  const kpis = [
    { label: "Total de Missões",    value: myMissions.length,         icon: Globe,        color: "text-blue-600",   bg: "bg-blue-50"   },
    { label: "Países Visitados",    value: new Set(myMissions.filter(m=>m.country!=="Angola").map(m=>m.country)).size, icon: MapPin, color: "text-purple-600", bg: "bg-purple-50" },
    { label: "Anos no Exterior",    value: `${totalYears}`,           icon: Clock,        color: "text-amber-500",  bg: "bg-amber-50"  },
    { label: "Missões Futuras",     value: future.length,             icon: Calendar,     color: "text-emerald-600",bg: "bg-emerald-50"},
  ];

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <style>{`
        @keyframes pin-blink { 0%,100%{opacity:1} 50%{opacity:0.2} }
        @keyframes pin-ring-expand { 0%{transform:scale(1);opacity:0.7} 100%{transform:scale(2.8);opacity:0} }
        .pin-blink     { animation: pin-blink       0.85s ease-in-out infinite; }
        .pin-ring-exp  { animation: pin-ring-expand  1.2s  ease-out     infinite;
                         transform-box:fill-box; transform-origin:center; }
      `}</style>

      <div className="mb-5">
        <h1 className="text-2xl mb-1">Mapa de Missões</h1>
        <p className="text-gray-500 text-sm">Histórico pessoal de missões diplomáticas · clique num pin para ver detalhes</p>
      </div>

      {/* KPIs */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 mb-5">
        {kpis.map((k, i) => (
          <div key={i} className="bg-white rounded-xl shadow-sm p-4 flex items-center gap-3">
            <div className={`${k.bg} p-2.5 rounded-lg`}><k.icon size={18} className={k.color}/></div>
            <div><p className="text-2xl leading-none">{k.value}</p><p className="text-xs text-gray-500 mt-0.5">{k.label}</p></div>
          </div>
        ))}
      </div>

      {/* Mapa + legenda */}
      <div className="bg-white rounded-2xl shadow-sm mb-5 overflow-hidden flex flex-col lg:flex-row">

        {/* Mapa */}
        <div className="flex-1 relative">
          <ComposableMap projectionConfig={{rotate:[-10,0,0],scale:147}} width={800} height={440} style={{width:"100%",background:"#fff"}}>
            <ZoomableGroup zoom={1}>
              <Geographies geography={GEO_URL}>
                {({geographies})=>geographies.map(geo=>(
                  <Geography key={geo.rsmKey} geography={geo} fill="#d1d5db" stroke="#f3f4f6" strokeWidth={0.5}
                    style={{default:{outline:"none"},hover:{outline:"none",fill:"#9ca3af"},pressed:{outline:"none"}}}/>
                ))}
              </Geographies>

              {myMissions.map(m=>{
                const cc = eraColors[m.era];
                const isSel = selected?.id === m.id;
                const pinR = isSel ? 10 : 7;
                return (
                  <Marker key={m.id} coordinates={m.coordinates}
                    onClick={()=>setSelected(isSel ? null : m)}
                    onMouseEnter={e=>setTooltip({m,x:e.clientX,y:e.clientY})}
                    onMouseLeave={()=>setTooltip(null)}>
                    <g style={{cursor:"pointer"}}>
                      {isSel && <circle r={pinR} fill={cc} className="pin-ring-exp"/>}
                      <g className={isSel ? "pin-blink" : ""}>
                        <circle r={pinR} fill={cc} stroke="#fff" strokeWidth={1.5}/>
                        <circle r={isSel?3.5:2.5} fill="#fff"/>
                        <line x1={0} y1={pinR} x2={0} y2={isSel?16:13} stroke={cc} strokeWidth={1.5}/>
                      </g>
                    </g>
                  </Marker>
                );
              })}
            </ZoomableGroup>
          </ComposableMap>

          {tooltip && (
            <div className="fixed z-50 bg-white rounded-xl shadow-lg border border-gray-100 p-3 text-sm pointer-events-none"
              style={{left:tooltip.x+14,top:tooltip.y-50}}>
              <p className="font-medium text-gray-800">{tooltip.m.post}</p>
              <p className="text-gray-400 text-xs mt-0.5">{tooltip.m.country} · {eraLabels[tooltip.m.era]}</p>
            </div>
          )}
        </div>

        {/* Painel lateral — legenda + resumo */}
        <div className="shrink-0 border-t lg:border-t-0 lg:border-l border-gray-100 p-5 flex flex-col gap-5" style={{width:218}}>
          <div>
            <p className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-3">Legenda</p>
            <div className="space-y-2.5">
              {[["past","Missão Anterior"],["current","Missão Actual"],["future","Missão Futura"]].map(([era,label])=>(
                <div key={era} className="flex items-center gap-2.5">
                  <span className="w-3 h-3 rounded-full shrink-0" style={{backgroundColor:eraColors[era]}}/>
                  <span className="text-xs text-gray-600">{label}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="border-t border-gray-100 pt-4 space-y-3">
            <p className="text-xs font-semibold text-gray-500 uppercase tracking-wide">Resumo</p>
            <div className="space-y-2">
              <div className="flex justify-between text-xs">
                <span className="text-gray-500">Anteriores</span>
                <span className="font-medium text-gray-700">{past.length}</span>
              </div>
              <div className="flex justify-between text-xs">
                <span className="text-gray-500">Actual</span>
                <span className="font-medium text-blue-600">{current.length}</span>
              </div>
              <div className="flex justify-between text-xs">
                <span className="text-gray-500">Futuras</span>
                <span className="font-medium text-emerald-600">{future.length}</span>
              </div>
              <div className="border-t border-gray-100 pt-2 flex justify-between text-xs">
                <span className="text-gray-500">Total no exterior</span>
                <span className="font-medium text-gray-700">{durationStr(totalMonthsAbroad)}</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Detalhe da missão seleccionada */}
      {selected && (
        <div className={`bg-white rounded-2xl shadow-sm mb-5 p-5 border-l-4 ${eraBorder[selected.era]}`}>
          <div className="flex items-start justify-between mb-3">
            <div>
              <h3 className="text-base font-medium">{selected.post}</h3>
              <p className="text-sm text-gray-500">{selected.country} · {selected.continent} · {selected.type}</p>
            </div>
            <span className={`text-xs px-2.5 py-1 rounded-full ${eraTagColor[selected.era]}`}>{eraLabels[selected.era]}</span>
          </div>
          <div className="flex items-center gap-2 text-sm text-gray-600 mb-3">
            <Calendar size={13} className="text-gray-400"/>
            <span>{selected.startDate}</span>
            <ArrowRight size={12} className="text-gray-300"/>
            <span>{selected.endDate}</span>
            <span className="text-gray-400 text-xs">· {durationStr(selected.months)}</span>
          </div>
          {selected.note && (
            <p className="text-xs text-gray-500 bg-gray-50 rounded-lg p-3">{selected.note}</p>
          )}
        </div>
      )}

      {/* Timeline / lista */}
      <div className="bg-white rounded-2xl shadow-sm overflow-hidden">
        <div className="p-5 border-b border-gray-100">
          <p className="text-sm font-medium text-gray-700">Histórico de Missões</p>
        </div>
        <div className="divide-y divide-gray-50">
          {myMissions.map((m, i) => (
            <div key={m.id}
              onClick={()=>setSelected(selected?.id===m.id ? null : m)}
              className="flex items-center gap-4 px-5 py-3.5 hover:bg-gray-50 transition-colors cursor-pointer">
              {/* Número / ordem */}
              <span className="w-6 h-6 rounded-full flex items-center justify-center text-xs font-medium shrink-0"
                style={{backgroundColor: eraColors[m.era]+"22", color: eraColors[m.era]}}>
                {i+1}
              </span>
              {/* Info */}
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-gray-800">{m.post}</p>
                <div className="flex items-center gap-1.5 text-xs text-gray-400 mt-0.5">
                  <MapPin size={10}/>
                  <span>{m.country}</span>
                  <span>·</span>
                  <Calendar size={10}/>
                  <span>{m.startDate} → {m.endDate}</span>
                </div>
              </div>
              {/* Duração */}
              <span className="text-xs text-gray-400 shrink-0">{durationStr(m.months)}</span>
              {/* Badge era */}
              <span className={`text-xs px-2 py-0.5 rounded-full shrink-0 ${eraTagColor[m.era]}`}>
                {eraLabels[m.era]}
              </span>
              {/* Ícone se concluído */}
              {m.era === "past" && <CheckCircle size={14} className="text-gray-300 shrink-0"/>}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
