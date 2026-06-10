import { useState } from "react";
import { Star, TrendingUp, BookOpen, Award, CheckCircle, Clock, ArrowRight, Target } from "lucide-react";
import {
  AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip,
  ResponsiveContainer, ReferenceLine,
} from "recharts";

/* ── Dados ──────────────────────────────────────────────────────── */

const evaluations = [
  /* 2024 */
  { year:"2024", quarter:"Q1", period:"Q1 2024", date:"20/03/2024", score:3.7, evaluator:"Dr. Mário Lopes",    status:"Concluída", nextReview:"22/09/2024",
    criteria:[{label:"Desempenho Técnico",score:3.6},{label:"Relações Interpessoais",score:3.9},{label:"Iniciativa & Liderança",score:3.5},{label:"Cumprimento de Prazos",score:3.8},{label:"Adaptabilidade",score:3.7}],
    comment:"Integração positiva na nova função. Margem de melhoria na iniciativa." },
  { year:"2024", quarter:"Q2", period:"Q2 2024", date:"25/06/2024", score:3.8, evaluator:"Dr. Mário Lopes",    status:"Concluída", nextReview:"22/09/2024",
    criteria:[{label:"Desempenho Técnico",score:3.7},{label:"Relações Interpessoais",score:4.0},{label:"Iniciativa & Liderança",score:3.6},{label:"Cumprimento de Prazos",score:3.9},{label:"Adaptabilidade",score:3.8}],
    comment:"Evolução consistente. Destaque para melhoria nas relações interpessoais." },
  { year:"2024", quarter:"Q3", period:"Q3 2024", date:"22/09/2024", score:3.9, evaluator:"Dr. Mário Lopes",    status:"Concluída", nextReview:"18/03/2025",
    criteria:[{label:"Desempenho Técnico",score:3.8},{label:"Relações Interpessoais",score:4.1},{label:"Iniciativa & Liderança",score:3.7},{label:"Cumprimento de Prazos",score:4.0},{label:"Adaptabilidade",score:3.9}],
    comment:"Desempenho satisfatório. Sugerida participação em formação de liderança." },
  { year:"2024", quarter:"Q4", period:"Q4 2024", date:"18/12/2024", score:4.0, evaluator:"Dra. Carla Monteiro", status:"Concluída", nextReview:"18/03/2025",
    criteria:[{label:"Desempenho Técnico",score:3.9},{label:"Relações Interpessoais",score:4.2},{label:"Iniciativa & Liderança",score:3.8},{label:"Cumprimento de Prazos",score:4.1},{label:"Adaptabilidade",score:4.0}],
    comment:"Fecho de ano positivo. Nota-se maior confiança na condução de reuniões." },
  /* 2025 */
  { year:"2025", quarter:"Q1", period:"Q1 2025", date:"18/03/2025", score:4.1, evaluator:"Dra. Carla Monteiro", status:"Concluída", nextReview:"20/09/2025",
    criteria:[{label:"Desempenho Técnico",score:4.0},{label:"Relações Interpessoais",score:4.4},{label:"Iniciativa & Liderança",score:3.8},{label:"Cumprimento de Prazos",score:4.2},{label:"Adaptabilidade",score:4.1}],
    comment:"Desempenho sólido. Evolução positiva nas relações interpessoais." },
  { year:"2025", quarter:"Q2", period:"Q2 2025", date:"24/06/2025", score:4.2, evaluator:"Dra. Carla Monteiro", status:"Concluída", nextReview:"20/09/2025",
    criteria:[{label:"Desempenho Técnico",score:4.1},{label:"Relações Interpessoais",score:4.5},{label:"Iniciativa & Liderança",score:4.0},{label:"Cumprimento de Prazos",score:4.3},{label:"Adaptabilidade",score:4.1}],
    comment:"Trimestre muito positivo. Liderança de projectos com bom resultado." },
  { year:"2025", quarter:"Q3", period:"Q3 2025", date:"20/09/2025", score:4.3, evaluator:"Dra. Carla Monteiro", status:"Concluída", nextReview:"15/03/2026",
    criteria:[{label:"Desempenho Técnico",score:4.3},{label:"Relações Interpessoais",score:4.6},{label:"Iniciativa & Liderança",score:4.0},{label:"Cumprimento de Prazos",score:4.4},{label:"Adaptabilidade",score:4.2}],
    comment:"Bom desempenho. Recomenda-se maior proactividade em contextos multilaterais." },
  { year:"2025", quarter:"Q4", period:"Q4 2025", date:"16/12/2025", score:4.4, evaluator:"Dr. António Ferreira", status:"Concluída", nextReview:"15/03/2026",
    criteria:[{label:"Desempenho Técnico",score:4.4},{label:"Relações Interpessoais",score:4.7},{label:"Iniciativa & Liderança",score:4.2},{label:"Cumprimento de Prazos",score:4.4},{label:"Adaptabilidade",score:4.3}],
    comment:"Excelente evolução ao longo do ano. Pronta para maiores responsabilidades." },
  /* 2026 */
  { year:"2026", quarter:"Q1", period:"Q1 2026", date:"15/03/2026", score:4.5, evaluator:"Dr. António Ferreira", status:"Concluída", nextReview:"01/07/2026",
    criteria:[{label:"Desempenho Técnico",score:4.5},{label:"Relações Interpessoais",score:4.8},{label:"Iniciativa & Liderança",score:4.2},{label:"Cumprimento de Prazos",score:4.5},{label:"Adaptabilidade",score:4.6}],
    comment:"Excelente desempenho. Elevada capacidade de gestão de relações bilaterais e liderança de equipa." },
  { year:"2026", quarter:"Q2", period:"Q2 2026", date:"—",          score:null, evaluator:"Dr. António Ferreira", status:"Em Curso",  nextReview:"01/07/2026",
    criteria:[], comment:"" },
];

const chartData = [
  { period:"Q1 2024",nota:3.7},{ period:"Q2 2024",nota:3.8},
  { period:"Q3 2024",nota:3.9},{ period:"Q4 2024",nota:4.0},
  { period:"Q1 2025",nota:4.1},{ period:"Q2 2025",nota:4.2},
  { period:"Q3 2025",nota:4.3},{ period:"Q4 2025",nota:4.4},
  { period:"Q1 2026",nota:4.5},
];

const trainings = [
  { title:"Direito Internacional",          duration:"12 semanas", completion:100, status:"Concluído", year:"2024" },
  { title:"Gestão de Crises",               duration:"4 semanas",  completion:100, status:"Concluído", year:"2024" },
  { title:"Negociação Multilateral",        duration:"8 semanas",  completion:100, status:"Concluído", year:"2025" },
  { title:"Comunicação Institucional",      duration:"3 semanas",  completion:100, status:"Concluído", year:"2025" },
  { title:"Protocolo Diplomático Avançado", duration:"6 semanas",  completion:60,  status:"Em Curso",  year:"2026" },
  { title:"Análise Geopolítica",            duration:"5 semanas",  completion:0,   status:"Planeado",  year:"2027" },
  { title:"Língua Mandarim – Nível B1",    duration:"16 semanas", completion:0,   status:"Planeado",  year:"2027" },
];

const career = [
  { date:"Mar 2019", role:"Técnica Diplomática",   type:"Entrada",    note:"Integração no Ministério" },
  { date:"Set 2022", role:"Diplomata",              type:"Progressão", note:"Promoção após missão em São Paulo" },
  { date:"Jan 2025", role:"Diplomata Sénior",       type:"Promoção",   note:"Reconhecimento por desempenho Q1 2025" },
  { date:"Set 2027", role:"Conselheira Diplomática",type:"Planeada",   note:"Progressão prevista após missão em Pequim" },
];

/* ── Helpers ─────────────────────────────────────────────────────── */

function ScoreBar({ score, max = 5 }: { score: number; max?: number }) {
  const pct   = (score / max) * 100;
  const color = score >= 4.5 ? "#10b981" : score >= 4 ? "#3b82f6" : score >= 3 ? "#f59e0b" : "#ef4444";
  return (
    <div className="flex items-center gap-2">
      <div className="flex-1 bg-gray-100 rounded-full h-1.5">
        <div className="h-1.5 rounded-full" style={{ width:`${pct}%`, backgroundColor:color }} />
      </div>
      <span className="text-xs font-medium w-6 text-right" style={{ color }}>{score}</span>
    </div>
  );
}

function Stars({ score }: { score: number }) {
  return (
    <div className="flex gap-0.5">
      {[1,2,3,4,5].map(i=>(
        <Star key={i} size={13}
          className={i<=Math.round(score)?"text-yellow-400 fill-yellow-400":"text-gray-200 fill-gray-200"}/>
      ))}
    </div>
  );
}

function YearTabs({ years, active, onChange }: { years:string[]; active:string; onChange:(y:string)=>void }) {
  return (
    <div className="flex gap-1 p-1 bg-gray-100 rounded-lg w-fit">
      {years.map(y=>(
        <button key={y} onClick={()=>onChange(y)}
          className={`px-3 py-1 rounded-md text-xs transition-colors ${
            active===y ? "bg-white text-gray-800 shadow-sm font-medium" : "text-gray-500 hover:text-gray-700"
          }`}>
          {y}
        </button>
      ))}
    </div>
  );
}

const statusBadge = (s:string) =>
  s==="Concluída"||s==="Concluído" ? "bg-green-100 text-green-700"
  : s==="Em Curso"                 ? "bg-blue-100 text-blue-700"
  :                                  "bg-gray-100 text-gray-500";

/* ── Componente ─────────────────────────────────────────────────── */

const QUARTERS = ["Q1","Q2","Q3","Q4"];

export function UserCareerEvaluation() {
  const evalYears  = [...new Set(evaluations.map(e=>e.year))].sort((a,b)=>+b-+a);
  const trainYears = [...new Set(trainings.map(t=>t.year))].sort((a,b)=>+b-+a);

  const [evalYear,  setEvalYear]  = useState(evalYears[0]);
  const [trainYear, setTrainYear] = useState(trainYears[0]);

  const concluded  = evaluations.filter(e=>e.status==="Concluída");
  const latest     = concluded[0];
  const avgScore   = concluded.reduce((s,e)=>s+(e.score??0),0)/concluded.length;
  const trainingsOk= trainings.filter(t=>t.status==="Concluído").length;

  const yearEvals  = evaluations.filter(e=>e.year===evalYear);
  const yearTrains = trainings.filter(t=>t.year===trainYear);

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <div className="mb-5">
        <h1 className="text-2xl mb-1">Avaliação & Carreira</h1>
        <p className="text-gray-500 text-sm">O seu histórico de desempenho, formação e progressão profissional</p>
      </div>

      {/* KPIs */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 mb-5">
        {[
          { label:"Última Nota",          value: latest?.score ? `${latest.score}/5`:"—", icon:Star,     color:"text-yellow-500", bg:"bg-yellow-50" },
          { label:"Média Histórica",      value: avgScore.toFixed(1),                      icon:Target,   color:"text-blue-600",   bg:"bg-blue-50"   },
          { label:"Formações Concluídas", value: trainingsOk,                              icon:BookOpen, color:"text-emerald-600",bg:"bg-emerald-50"},
          { label:"Próxima Avaliação",    value: latest?.nextReview??"—",                  icon:Clock,    color:"text-purple-600", bg:"bg-purple-50" },
        ].map((k,i)=>(
          <div key={i} className="bg-white rounded-xl shadow-sm p-4 flex items-center gap-3">
            <div className={`${k.bg} p-2.5 rounded-lg shrink-0`}><k.icon size={18} className={k.color}/></div>
            <div className="min-w-0">
              <p className="text-xl leading-none truncate">{k.value}</p>
              <p className="text-xs text-gray-500 mt-0.5">{k.label}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Gráfico evolução */}
      <div className="bg-white rounded-2xl shadow-sm p-5 mb-5">
        <p className="text-sm font-medium text-gray-700 mb-4">Evolução de Desempenho</p>
        <ResponsiveContainer width="100%" height={160}>
          <AreaChart data={chartData} margin={{top:8,right:16,bottom:0,left:-20}}>
            <defs>
              <linearGradient id="scoreGrad" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%"  stopColor="#3b82f6" stopOpacity={0.15}/>
                <stop offset="95%" stopColor="#3b82f6" stopOpacity={0}/>
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke="#f3f4f6" vertical={false}/>
            <XAxis dataKey="period" tick={{fontSize:11,fill:"#9ca3af"}} axisLine={false} tickLine={false}/>
            <YAxis domain={[3,5]} tick={{fontSize:11,fill:"#9ca3af"}} axisLine={false} tickLine={false}/>
            <ReferenceLine y={4} stroke="#e5e7eb" strokeDasharray="4 4"/>
            <Tooltip contentStyle={{fontSize:12,borderRadius:10,border:"none",boxShadow:"0 4px 12px rgba(0,0,0,0.08)"}}
              formatter={(v:number)=>[`${v}/5`,"Nota"]}/>
            <Area type="monotone" dataKey="nota" stroke="#3b82f6" strokeWidth={2} fill="url(#scoreGrad)"
              dot={{r:4,fill:"#3b82f6",strokeWidth:0}}/>
          </AreaChart>
        </ResponsiveContainer>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-5 mb-5">

        {/* ── Histórico de Avaliações ── */}
        <div className="bg-white rounded-2xl shadow-sm overflow-hidden flex flex-col">
          <div className="px-5 py-4 border-b border-gray-100 flex items-center justify-between gap-3 flex-wrap">
            <p className="text-sm font-medium text-gray-700">Histórico de Avaliações</p>
            <YearTabs years={evalYears} active={evalYear} onChange={setEvalYear}/>
          </div>

          {/* Sub-tabs Q1…Q4 */}
          <div className="flex border-b border-gray-100">
            {QUARTERS.map(q=>{
              const ev = yearEvals.find(e=>e.quarter===q);
              const exists = !!ev;
              return (
                <div key={q} className={`flex-1 py-2.5 text-center text-xs border-r last:border-r-0 border-gray-100 font-medium
                  ${exists ? "text-gray-700 bg-white" : "text-gray-300 bg-gray-50"}`}>
                  {q}
                  {ev?.score && (
                    <span className="block text-xs font-semibold text-blue-600 leading-tight">{ev.score}</span>
                  )}
                  {ev?.status==="Em Curso" && (
                    <span className="block text-xs text-amber-500 leading-tight">Em curso</span>
                  )}
                  {!exists && <span className="block text-xs text-gray-300 leading-tight">—</span>}
                </div>
              );
            })}
          </div>

          {/* Conteúdo dos trimestres */}
          <div className="flex-1 overflow-y-auto divide-y divide-gray-50">
            {QUARTERS.map(q=>{
              const ev = yearEvals.find(e=>e.quarter===q);
              if (!ev) return (
                <div key={q} className="px-5 py-3 flex items-center gap-2 text-xs text-gray-300">
                  <span className="font-medium w-8">{q}</span>
                  <span>Avaliação não realizada</span>
                </div>
              );
              return (
                <div key={q} className="p-4">
                  <div className="flex items-start justify-between mb-2">
                    <div>
                      <p className="text-sm font-medium text-gray-800">{ev.period}</p>
                      <p className="text-xs text-gray-400 mt-0.5">{ev.date!=="—"?ev.date:"Em curso"} · {ev.evaluator}</p>
                    </div>
                    <div className="flex flex-col items-end gap-1">
                      <span className={`text-xs px-2 py-0.5 rounded-full ${statusBadge(ev.status)}`}>{ev.status}</span>
                      {ev.score&&<Stars score={ev.score}/>}
                    </div>
                  </div>
                  {ev.score&&(
                    <div className="space-y-1.5 mt-3">
                      {ev.criteria.map((c,j)=>(
                        <div key={j}>
                          <p className="text-xs text-gray-500 mb-0.5">{c.label}</p>
                          <ScoreBar score={c.score}/>
                        </div>
                      ))}
                      {ev.comment&&(
                        <p className="text-xs text-gray-400 italic mt-2 pt-2 border-t border-gray-50">"{ev.comment}"</p>
                      )}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>

        {/* ── Formações ── */}
        <div className="bg-white rounded-2xl shadow-sm overflow-hidden flex flex-col">
          <div className="px-5 py-4 border-b border-gray-100 flex items-center justify-between gap-3 flex-wrap">
            <div className="flex items-center gap-2">
              <BookOpen size={14} className="text-gray-400"/>
              <p className="text-sm font-medium text-gray-700">Formações</p>
            </div>
            <YearTabs years={trainYears} active={trainYear} onChange={setTrainYear}/>
          </div>

          <div className="flex-1 divide-y divide-gray-50">
            {yearTrains.length === 0 ? (
              <div className="px-5 py-6 text-center text-xs text-gray-300">Nenhuma formação em {trainYear}</div>
            ) : yearTrains.map((t,i)=>(
              <div key={i} className="p-4">
                <div className="flex items-start justify-between mb-2">
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-gray-800">{t.title}</p>
                    <p className="text-xs text-gray-400 mt-0.5">{t.duration}</p>
                  </div>
                  <span className={`text-xs px-2 py-0.5 rounded-full ml-2 shrink-0 ${statusBadge(t.status)}`}>{t.status}</span>
                </div>
                {t.completion>0&&(
                  <div>
                    <div className="flex justify-between text-xs text-gray-400 mb-1">
                      <span>Progresso</span><span>{t.completion}%</span>
                    </div>
                    <div className="w-full bg-gray-100 rounded-full h-1.5">
                      <div className="h-1.5 rounded-full bg-blue-500" style={{width:`${t.completion}%`}}/>
                    </div>
                  </div>
                )}
                {t.status==="Concluído"&&(
                  <div className="flex items-center gap-1 mt-1.5 text-xs text-emerald-600">
                    <CheckCircle size={11}/><span>Certificado emitido</span>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Progressão de carreira */}
      <div className="bg-white rounded-2xl shadow-sm p-5">
        <div className="flex items-center gap-2 mb-5">
          <Award size={14} className="text-purple-500"/>
          <p className="text-sm font-medium text-gray-700">Progressão de Carreira</p>
        </div>
        <div className="relative">
          <div className="absolute left-3.5 top-0 bottom-0 w-px bg-gray-100"/>
          <div className="space-y-5">
            {career.map((c,i)=>{
              const isLast   = i===career.length-1;
              const isFuture = c.type==="Planeada";
              return (
                <div key={i} className="flex gap-4 items-start relative">
                  <div className={`w-7 h-7 rounded-full flex items-center justify-center shrink-0 z-10
                    ${isFuture?"bg-emerald-100 border-2 border-emerald-300":isLast&&!isFuture?"bg-blue-600":"bg-gray-200"}`}>
                    {isFuture
                      ? <TrendingUp size={13} className="text-emerald-600"/>
                      : isLast&&!isFuture
                      ? <Star size={13} className="text-white fill-white"/>
                      : <CheckCircle size={13} className="text-gray-400"/>
                    }
                  </div>
                  <div className="flex-1 pb-1">
                    <div className="flex items-center gap-2 flex-wrap">
                      <p className={`text-sm font-semibold ${isFuture?"text-emerald-700":"text-gray-800"}`}>{c.role}</p>
                      <span className={`text-xs px-2 py-0.5 rounded-full
                        ${c.type==="Promoção"?"bg-purple-100 text-purple-700"
                          :c.type==="Planeada"?"bg-emerald-100 text-emerald-700"
                          :c.type==="Progressão"?"bg-blue-100 text-blue-700"
                          :"bg-gray-100 text-gray-500"}`}>{c.type}</span>
                    </div>
                    <p className="text-xs text-gray-400 mt-0.5">{c.date}</p>
                    <p className="text-xs text-gray-500 mt-0.5">{c.note}</p>
                  </div>
                  {i<career.length-1&&!isFuture&&(
                    <ArrowRight size={12} className="text-gray-200 mt-2 shrink-0"/>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
