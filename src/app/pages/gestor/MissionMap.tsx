import { useState, useRef } from "react";
import { ComposableMap, Geographies, Geography, Marker, ZoomableGroup } from "react-simple-maps";
import { PieChart, Pie, Cell, ResponsiveContainer } from "recharts";
import { Users, AlertTriangle, Clock, Globe, Building2, Filter, X } from "lucide-react";

const GEO_URL = "https://cdn.jsdelivr.net/npm/world-atlas@2/countries-110m.json";

const missions = [
  { id:"M001", location:"Embaixada de Lisboa",       type:"Embaixada",  country:"Portugal",       continent:"Europa",           coordinates:[-9.14,38.72]   as [number,number], diplomats:[{name:"Ana Paula Silva",months:35,status:"warning",start:"Jul 2023"},{name:"Pedro Alves",months:20,status:"normal",start:"Out 2024"}] },
  { id:"M002", location:"Consulado de Paris",        type:"Consulado",  country:"França",          continent:"Europa",           coordinates:[2.35,48.86]    as [number,number], diplomats:[{name:"Maria Santos",months:32,status:"normal",start:"Out 2023"}] },
  { id:"M003", location:"Embaixada de Brasília",     type:"Embaixada",  country:"Brasil",          continent:"América do Sul",   coordinates:[-47.93,-15.78] as [number,number], diplomats:[{name:"João Neto",months:38,status:"critical",start:"Abr 2023"},{name:"Carlos Mendes",months:15,status:"normal",start:"Mar 2025"}] },
  { id:"M004", location:"Embaixada de Pequim",       type:"Embaixada",  country:"China",           continent:"Ásia",             coordinates:[116.40,39.91]  as [number,number], diplomats:[{name:"Lúcia Costa",months:34,status:"warning",start:"Ago 2023"},{name:"Miguel Santos",months:17,status:"normal",start:"Jan 2025"},{name:"Sofia Almeida",months:6,status:"normal",start:"Dez 2025"}] },
  { id:"M005", location:"Consulado de Luanda",       type:"Consulado",  country:"Angola",          continent:"África",           coordinates:[13.23,-8.84]   as [number,number], diplomats:[{name:"António Silva",months:14,status:"normal",start:"Abr 2025"}] },
  { id:"M006", location:"Embaixada de Washington",   type:"Embaixada",  country:"EUA",             continent:"América do Norte", coordinates:[-77.04,38.91]  as [number,number], diplomats:[{name:"Beatriz Fernandes",months:33,status:"warning",start:"Set 2023"},{name:"Ricardo Gomes",months:40,status:"critical",start:"Fev 2023"}] },
  { id:"M007", location:"Embaixada de Moscovo",      type:"Embaixada",  country:"Rússia",          continent:"Europa",           coordinates:[37.62,55.75]   as [number,number], diplomats:[{name:"Fernando Costa",months:18,status:"normal",start:"Dez 2024"}] },
  { id:"M008", location:"Consulado de Joanesburgo",  type:"Consulado",  country:"África do Sul",   continent:"África",           coordinates:[28.04,-26.20]  as [number,number], diplomats:[{name:"Helena Martins",months:22,status:"normal",start:"Ago 2024"},{name:"Rui Pereira",months:10,status:"normal",start:"Ago 2025"}] },
  { id:"M009", location:"Embaixada de Londres",      type:"Embaixada",  country:"Reino Unido",     continent:"Europa",           coordinates:[-0.12,51.50]   as [number,number], diplomats:[{name:"Graça Lopes",months:28,status:"normal",start:"Fev 2024"},{name:"Nuno Barros",months:11,status:"normal",start:"Jul 2025"}] },
  { id:"M010", location:"Embaixada de Berlim",       type:"Embaixada",  country:"Alemanha",        continent:"Europa",           coordinates:[13.40,52.52]   as [number,number], diplomats:[{name:"Sónia Rocha",months:37,status:"critical",start:"Mai 2023"}] },
  { id:"M011", location:"Embaixada de Madrid",       type:"Embaixada",  country:"Espanha",         continent:"Europa",           coordinates:[-3.70,40.42]   as [number,number], diplomats:[{name:"Tomás Vieira",months:14,status:"normal",start:"Abr 2025"}] },
  { id:"M012", location:"Embaixada de Tóquio",       type:"Embaixada",  country:"Japão",           continent:"Ásia",             coordinates:[139.69,35.69]  as [number,number], diplomats:[{name:"Irene Neves",months:26,status:"normal",start:"Abr 2024"}] },
  { id:"M013", location:"Embaixada de Nova Delhi",   type:"Embaixada",  country:"Índia",           continent:"Ásia",             coordinates:[77.21,28.61]   as [number,number], diplomats:[{name:"Dário Fonseca",months:19,status:"normal",start:"Nov 2024"}] },
  { id:"M014", location:"Embaixada de Cairo",        type:"Embaixada",  country:"Egito",           continent:"África",           coordinates:[31.24,30.06]   as [number,number], diplomats:[{name:"Filipa Serra",months:31,status:"warning",start:"Nov 2023"},{name:"Luís Campos",months:8,status:"normal",start:"Out 2025"}] },
  { id:"M015", location:"Consulado de Toronto",      type:"Consulado",  country:"Canadá",          continent:"América do Norte", coordinates:[-79.38,43.65]  as [number,number], diplomats:[{name:"Conceição Dias",months:13,status:"normal",start:"Mai 2025"}] },
  { id:"M016", location:"Embaixada de Buenos Aires", type:"Embaixada",  country:"Argentina",       continent:"América do Sul",   coordinates:[-58.38,-34.60] as [number,number], diplomats:[{name:"Edmundo Pinto",months:24,status:"warning",start:"Jun 2024"}] },
  { id:"M017", location:"Embaixada de Nairobi",      type:"Embaixada",  country:"Quénia",          continent:"África",           coordinates:[36.82,-1.29]   as [number,number], diplomats:[{name:"Adélia Cruz",months:9,status:"normal",start:"Set 2025"}] },
  { id:"M018", location:"Embaixada de Abidjan",      type:"Embaixada",  country:"Costa do Marfim", continent:"África",           coordinates:[-4.03,5.35]    as [number,number], diplomats:[{name:"Rogério Mata",months:16,status:"normal",start:"Fev 2025"}] },
  { id:"M019", location:"Embaixada de Havana",       type:"Embaixada",  country:"Cuba",            continent:"América do Norte", coordinates:[-82.38,23.13]  as [number,number], diplomats:[{name:"Palmira Gomes",months:29,status:"warning",start:"Jan 2024"}] },
  { id:"M020", location:"Embaixada de Caracas",      type:"Embaixada",  country:"Venezuela",       continent:"América do Sul",   coordinates:[-66.92,10.49]  as [number,number], diplomats:[{name:"Álvaro Sousa",months:7,status:"normal",start:"Nov 2025"}] },
];

const CONTINENT_COLORS: Record<string,string> = {
  "Europa":"#3b82f6","África":"#10b981","América do Sul":"#f59e0b",
  "América do Norte":"#8b5cf6","Ásia":"#ef4444",
};
const STATUS_LABELS: Record<string,string> = { normal:"Normal", warning:"Atenção", critical:"Crítico" };
const statusColor = (s:string) => s==="critical"?"#ef4444":s==="warning"?"#f59e0b":"#10b981";
const missionStatus = (m:typeof missions[0]) => {
  if (m.diplomats.some(d=>d.status==="critical")) return "critical";
  if (m.diplomats.some(d=>d.status==="warning")) return "warning";
  return "normal";
};
const matchesDuration = (months:number, f:string) => {
  if (f==="Todas") return true;
  if (f==="< 1 ano") return months<12;
  if (f==="1–2 anos") return months>=12&&months<24;
  if (f==="2–3 anos") return months>=24&&months<36;
  return months>=36;
};

/* ~5% larger donuts: 48px → 50px container, r 15→16 / 22→23 */
function ContinentDonut({name,value,total,color}:{name:string;value:number;total:number;color:string}) {
  const data=[{v:value},{v:total-value}];
  return (
    <div className="flex items-center gap-2.5">
      <div className="relative shrink-0" style={{width:50,height:50}}>
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie data={data} dataKey="v" cx="50%" cy="50%" innerRadius={16} outerRadius={23} startAngle={90} endAngle={-270} strokeWidth={0}>
              <Cell fill={color}/><Cell fill="#e5e7eb"/>
            </Pie>
          </PieChart>
        </ResponsiveContainer>
        <span className="absolute inset-0 flex items-center justify-center text-xs font-semibold" style={{color}}>{value}</span>
      </div>
      <div className="min-w-0">
        <p className="text-xs font-medium text-gray-700 leading-tight truncate">{name}</p>
        <p className="text-xs text-gray-400">{Math.round((value/total)*100)}%</p>
      </div>
    </div>
  );
}

const continents = ["Todos","Europa","África","América do Sul","América do Norte","Ásia"];
const types      = ["Todos","Embaixada","Consulado"];
const durations  = ["Todas","< 1 ano","1–2 anos","2–3 anos","> 3 anos"];
const statuses   = ["Todos","Normal","Atenção","Crítico"];
const statusKeyMap: Record<string,string> = {"Normal":"normal","Atenção":"warning","Crítico":"critical"};

export function MissionMap() {
  const [tooltip, setTooltip]                 = useState<{mission:typeof missions[0];x:number;y:number}|null>(null);
  const [selected, setSelected]               = useState<typeof missions[0]|null>(null);
  const [filterContinent, setFilterContinent] = useState("Todos");
  const [filterCountry,   setFilterCountry]   = useState("Todos");
  const [filterType,      setFilterType]      = useState("Todos");
  const [filterDuration,  setFilterDuration]  = useState("Todas");
  const [filterStatus,    setFilterStatus]    = useState("Todos");

  const tableRef = useRef<HTMLDivElement>(null);

  const allDiplomats = missions.flatMap(m=>m.diplomats.map(d=>({...d,location:m.location,country:m.country,continent:m.continent,type:m.type,missionStatus:missionStatus(m)})));
  const total = allDiplomats.length;

  const continentCounts = Object.entries(
    missions.reduce((acc,m)=>{ acc[m.continent]=(acc[m.continent]||0)+m.diplomats.length; return acc; },{} as Record<string,number>)
  ).sort((a,b)=>b[1]-a[1]);

  const matchesFilters = (m: typeof missions[0]) => {
    if (filterContinent!=="Todos" && m.continent!==filterContinent) return false;
    if (filterCountry!=="Todos"   && m.country!==filterCountry)     return false;
    if (filterType!=="Todos"      && m.type!==filterType)           return false;
    if (filterStatus!=="Todos"    && missionStatus(m)!==statusKeyMap[filterStatus]) return false;
    if (filterDuration!=="Todas"  && !m.diplomats.some(d=>matchesDuration(d.months,filterDuration))) return false;
    return true;
  };

  const filteredMissions  = missions.filter(matchesFilters);
  const filteredDiplomats = allDiplomats.filter(d=>{
    const m = missions.find(x=>x.location===d.location)!;
    if (!matchesFilters(m)) return false;
    if (filterDuration!=="Todas" && !matchesDuration(d.months,filterDuration)) return false;
    return true;
  });

  const handlePinClick = (m: typeof missions[0]) => {
    const isDeselect = selected?.id === m.id;
    setSelected(isDeselect ? null : m);
    setFilterCountry(isDeselect ? "Todos" : m.country);
    if (!isDeselect) {
      setTimeout(() => {
        tableRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
      }, 120);
    }
  };

  const clearFilters = () => {
    setFilterContinent("Todos"); setFilterCountry("Todos");
    setFilterType("Todos"); setFilterDuration("Todas"); setFilterStatus("Todos");
    setSelected(null);
  };

  const hasActiveFilter = filterContinent!=="Todos"||filterCountry!=="Todos"||filterType!=="Todos"||filterDuration!=="Todas"||filterStatus!=="Todos";

  return (
    <div className="p-6 bg-gray-50 min-h-screen">

      {/* Keyframe animations for selected pin */}
      <style>{`
        @keyframes pin-blink {
          0%, 100% { opacity: 1; }
          50%       { opacity: 0.2; }
        }
        @keyframes pin-ring-expand {
          0%   { transform: scale(1);   opacity: 0.7; }
          100% { transform: scale(2.8); opacity: 0;   }
        }
        .pin-blink    { animation: pin-blink       0.85s ease-in-out infinite; }
        .pin-ring-exp { animation: pin-ring-expand  1.2s  ease-out     infinite;
                        transform-box: fill-box; transform-origin: center; }
      `}</style>

      <div className="mb-5">
        <h1 className="text-2xl mb-1">Mapa de Missões Diplomáticas</h1>
        <p className="text-gray-500 text-sm">Distribuição geográfica dos diplomatas em missão · clique num pin para ver detalhes</p>
      </div>

      {/* KPIs */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 mb-5">
        {[
          {label:"Diplomatas",value:total,                                                icon:Users,        color:"text-blue-600",  bg:"bg-blue-50"},
          {label:"Missões",   value:missions.length,                                      icon:Globe,        color:"text-emerald-600",bg:"bg-emerald-50"},
          {label:"Em Atenção",value:allDiplomats.filter(d=>d.status==="warning").length,  icon:Clock,        color:"text-amber-500", bg:"bg-amber-50"},
          {label:"Crítico",   value:allDiplomats.filter(d=>d.status==="critical").length, icon:AlertTriangle,color:"text-red-500",   bg:"bg-red-50"},
        ].map((s,i)=>(
          <div key={i} className="bg-white rounded-xl shadow-sm p-4 flex items-center gap-3">
            <div className={`${s.bg} p-2.5 rounded-lg`}><s.icon size={18} className={s.color}/></div>
            <div><p className="text-2xl leading-none">{s.value}</p><p className="text-xs text-gray-500 mt-0.5">{s.label}</p></div>
          </div>
        ))}
      </div>

      {/* Mapa + gráficos */}
      <div className="bg-white rounded-2xl shadow-sm mb-5 overflow-hidden flex flex-col lg:flex-row">

        {/* Mapa */}
        <div className="flex-1 relative" style={{minHeight:184}}>
          <ComposableMap projectionConfig={{rotate:[-10,0,0],scale:147}} style={{width:"100%",height:"100%",background:"#fff"}}>
            <ZoomableGroup zoom={1}>
              <Geographies geography={GEO_URL}>
                {({geographies})=>geographies.map(geo=>(
                  <Geography key={geo.rsmKey} geography={geo} fill="#d1d5db" stroke="#f3f4f6" strokeWidth={0.5}
                    style={{default:{outline:"none"},hover:{outline:"none",fill:"#9ca3af"},pressed:{outline:"none"}}}/>
                ))}
              </Geographies>

              {missions.map(m=>{
                const st         = missionStatus(m);
                const cc         = CONTINENT_COLORS[m.continent]??"#6b7280";
                const isSelected = selected?.id === m.id;
                const pinR       = isSelected ? 10 : 7;
                const dotR       = isSelected ? 3.5 : 2.5;
                const lineEnd    = isSelected ? 16 : 13;

                return (
                  <Marker key={m.id} coordinates={m.coordinates}
                    onClick={()=>handlePinClick(m)}
                    onMouseEnter={e=>setTooltip({mission:m,x:e.clientX,y:e.clientY})}
                    onMouseLeave={()=>setTooltip(null)}>
                    <g style={{cursor:"pointer"}}>

                      {/* Expanding ring — only when selected */}
                      {isSelected && (
                        <circle r={pinR} fill={cc} className="pin-ring-exp"/>
                      )}

                      {/* Critical ring — only when not selected */}
                      {st==="critical" && !isSelected && (
                        <circle r={13} fill="none" stroke="#ef4444" strokeWidth={1.5} opacity={0.45}/>
                      )}

                      {/* Main pin body — blinks when selected */}
                      <g className={isSelected ? "pin-blink" : ""}>
                        <circle r={pinR} fill={cc} stroke="#fff" strokeWidth={1.5}/>
                        <circle r={dotR} fill="#fff"/>
                        <line x1={0} y1={pinR} x2={0} y2={lineEnd} stroke={cc} strokeWidth={1.5}/>
                      </g>

                    </g>
                  </Marker>
                );
              })}
            </ZoomableGroup>
          </ComposableMap>

          {tooltip&&(
            <div className="fixed z-50 bg-white rounded-xl shadow-lg border border-gray-100 p-3 text-sm pointer-events-none"
              style={{left:tooltip.x+14,top:tooltip.y-50}}>
              <p className="font-medium text-gray-800">{tooltip.mission.location}</p>
              <p className="text-gray-400 text-xs mt-0.5">{tooltip.mission.country} · {tooltip.mission.type} · {tooltip.mission.diplomats.length} diplomata(s)</p>
            </div>
          )}
        </div>

        {/* Gráficos por continente — painel 5% mais largo (w-52→~218px) */}
        <div className="shrink-0 border-t lg:border-t-0 lg:border-l border-gray-100 p-5 flex flex-col gap-4" style={{width:218}}>
          <p className="text-xs font-semibold text-gray-500 uppercase tracking-wide">Por Continente</p>
          <div className="space-y-3">
            {continentCounts.map(([name,count])=>(
              <ContinentDonut key={name} name={name} value={count} total={total} color={CONTINENT_COLORS[name]??"#6b7280"}/>
            ))}
          </div>
          <div className="pt-3 border-t border-gray-100 space-y-1.5">
            <p className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-2">Estado</p>
            {[["#10b981","Normal"],["#f59e0b","Atenção"],["#ef4444","Crítico"]].map(([c,l])=>(
              <div key={l} className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full shrink-0" style={{backgroundColor:c}}/>
                <span className="text-xs text-gray-600">{l}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Detalhe da missão seleccionada */}
      {selected&&(
        <div className="bg-white rounded-2xl shadow-sm mb-5 p-5 border-l-4" style={{borderColor:CONTINENT_COLORS[selected.continent]}}>
          <div className="flex items-start justify-between mb-3">
            <div>
              <h3 className="text-base font-medium">{selected.location}</h3>
              <p className="text-sm text-gray-500">{selected.country} · {selected.continent} · {selected.type}</p>
            </div>
            <button onClick={()=>{setSelected(null);setFilterCountry("Todos");}} className="text-gray-400 hover:text-gray-600"><X size={16}/></button>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
            {selected.diplomats.map((d,i)=>(
              <div key={i} className="p-3 rounded-xl border border-gray-100 bg-gray-50">
                <p className="text-sm font-medium text-gray-800">{d.name}</p>
                <p className="text-xs text-gray-500 mt-0.5">Início: {d.start}</p>
                <div className="flex items-center justify-between mt-2">
                  <span className="text-xs text-gray-500">{d.months} meses</span>
                  <span className="text-xs px-2 py-0.5 rounded-full" style={{backgroundColor:statusColor(d.status)+"22",color:statusColor(d.status)}}>
                    {STATUS_LABELS[d.status]}
                  </span>
                </div>
                <div className="mt-2 bg-gray-200 rounded-full h-1">
                  <div className="h-1 rounded-full" style={{width:`${Math.min((d.months/36)*100,100)}%`,backgroundColor:statusColor(d.status)}}/>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Filtros — dropdowns */}
      <div className="bg-white rounded-2xl shadow-sm px-5 py-4 mb-5">
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-2">
            <Filter size={14} className="text-gray-400"/>
            <span className="text-sm text-gray-600">Filtros</span>
            {filterCountry!=="Todos"&&(
              <span className="text-xs px-2 py-0.5 rounded-full bg-blue-100 text-blue-700 flex items-center gap-1">
                {filterCountry}
                <button onClick={()=>{setFilterCountry("Todos");setSelected(null);}} className="ml-0.5 hover:text-blue-900"><X size={10}/></button>
              </span>
            )}
          </div>
          {hasActiveFilter&&(
            <button onClick={clearFilters} className="text-xs text-gray-400 hover:text-gray-600 flex items-center gap-1">
              <X size={12}/>Limpar
            </button>
          )}
        </div>
        <div className="flex flex-wrap gap-3">
          {/* Continente */}
          <div className="flex flex-col gap-1">
            <label className="text-xs text-gray-400 uppercase tracking-wide">Continente</label>
            <select value={filterContinent}
              onChange={e=>{setFilterContinent(e.target.value);setFilterCountry("Todos");}}
              className="border border-gray-200 rounded-lg text-xs text-gray-700 px-3 py-1.5 bg-white focus:outline-none focus:ring-2 focus:ring-blue-100 cursor-pointer">
              {continents.map(c=><option key={c} value={c}>{c}</option>)}
            </select>
          </div>
          {/* Tipo */}
          <div className="flex flex-col gap-1">
            <label className="text-xs text-gray-400 uppercase tracking-wide">Tipo</label>
            <select value={filterType} onChange={e=>setFilterType(e.target.value)}
              className="border border-gray-200 rounded-lg text-xs text-gray-700 px-3 py-1.5 bg-white focus:outline-none focus:ring-2 focus:ring-blue-100 cursor-pointer">
              {types.map(t=><option key={t} value={t}>{t}</option>)}
            </select>
          </div>
          {/* Estado */}
          <div className="flex flex-col gap-1">
            <label className="text-xs text-gray-400 uppercase tracking-wide">Estado</label>
            <select value={filterStatus} onChange={e=>setFilterStatus(e.target.value)}
              className="border border-gray-200 rounded-lg text-xs text-gray-700 px-3 py-1.5 bg-white focus:outline-none focus:ring-2 focus:ring-blue-100 cursor-pointer">
              {statuses.map(s=><option key={s} value={s}>{s}</option>)}
            </select>
          </div>
          {/* Duração */}
          <div className="flex flex-col gap-1">
            <label className="text-xs text-gray-400 uppercase tracking-wide">Duração</label>
            <select value={filterDuration} onChange={e=>setFilterDuration(e.target.value)}
              className="border border-gray-200 rounded-lg text-xs text-gray-700 px-3 py-1.5 bg-white focus:outline-none focus:ring-2 focus:ring-blue-100 cursor-pointer">
              {durations.map(d=><option key={d} value={d}>{d}</option>)}
            </select>
          </div>
        </div>
      </div>

      {/* Tabela — ref para scroll automático */}
      <div ref={tableRef} className="bg-white rounded-2xl shadow-sm overflow-hidden">
        <div className="p-5 border-b border-gray-100 flex items-center justify-between">
          <span className="text-sm font-medium text-gray-700">Resultados</span>
          <span className="text-xs text-gray-400">{filteredDiplomats.length} diplomata(s)</span>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                {["Diplomata","Missão","Tipo","País","Início","Duração","Estado"].map(h=>(
                  <th key={h} className="px-5 py-3 text-left text-xs uppercase tracking-wide text-gray-400">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {filteredDiplomats.sort((a,b)=>b.months-a.months).map((d,i)=>(
                <tr key={i} className="hover:bg-gray-50 transition-colors">
                  <td className="px-5 py-3 text-sm text-gray-800">{d.name}</td>
                  <td className="px-5 py-3 text-sm text-gray-600">{d.location}</td>
                  <td className="px-5 py-3"><span className="text-xs px-2 py-0.5 rounded-full bg-gray-100 text-gray-500 flex items-center gap-1 w-fit"><Building2 size={10}/>{d.type}</span></td>
                  <td className="px-5 py-3 text-sm text-gray-600">{d.country}</td>
                  <td className="px-5 py-3 text-xs text-gray-400">{d.start}</td>
                  <td className="px-5 py-3">
                    <div className="flex items-center gap-2">
                      <div className="w-14 bg-gray-100 rounded-full h-1.5">
                        <div className="h-1.5 rounded-full" style={{width:`${Math.min((d.months/36)*100,100)}%`,backgroundColor:statusColor(d.status)}}/>
                      </div>
                      <span className="text-xs text-gray-500">{d.months}m</span>
                    </div>
                  </td>
                  <td className="px-5 py-3">
                    <span className="text-xs px-2 py-0.5 rounded-full" style={{backgroundColor:statusColor(d.status)+"22",color:statusColor(d.status)}}>
                      {STATUS_LABELS[d.status]}
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
