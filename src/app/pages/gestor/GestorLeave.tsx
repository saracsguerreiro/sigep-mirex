import { useState } from "react";
import { CheckCircle, XCircle, Clock, AlertCircle, Users, Eye, X } from "lucide-react";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts";

const avatarColors = ["bg-blue-500","bg-purple-500","bg-emerald-500","bg-rose-500","bg-amber-500","bg-sky-500","bg-indigo-500"];

/* Cada pedido mantém o tipo detalhado internamente; para exibir e filtrar usa-se o grupo */
const typeGroup = (t: string) => {
  if (t === "ferias") return "ferias";
  if (t.startsWith("falta")) return "falta";
  return "licenca";
};
const groupLabel: Record<string,string>  = { ferias:"Férias", falta:"Falta", licenca:"Licença" };
const groupColor: Record<string,string>  = {
  ferias:"bg-blue-100 text-blue-700",
  falta:"bg-amber-100 text-amber-700",
  licenca:"bg-purple-100 text-purple-700",
};

const requests = [
  { id:"LV-001", employee:"Ana Paula Silva",   num:"001234", type:"ferias",              start:"01/07/2026", end:"21/07/2026", days:21, status:"approved", submittedDate:"10/05/2026", note:"" },
  { id:"LV-002", employee:"João Pedro Neto",   num:"001237", type:"licenca_medica",      start:"03/06/2026", end:"10/06/2026", days:8,  status:"approved", submittedDate:"02/06/2026", note:"Certidão médica anexada." },
  { id:"LV-003", employee:"Maria Santos Costa",num:"001236", type:"ferias",              start:"15/07/2026", end:"04/08/2026", days:21, status:"pending",  submittedDate:"20/05/2026", note:"" },
  { id:"LV-004", employee:"Carlos Mendes",     num:"001235", type:"falta_justificada",   start:"05/06/2026", end:"05/06/2026", days:1,  status:"pending",  submittedDate:"04/06/2026", note:"Consulta médica urgente." },
  { id:"LV-005", employee:"Isabel Fernandes",  num:"001238", type:"licenca_maternidade", start:"01/08/2026", end:"31/10/2026", days:91, status:"pending",  submittedDate:"25/05/2026", note:"" },
  { id:"LV-006", employee:"Fernando Costa",    num:"001239", type:"ferias",              start:"01/09/2026", end:"21/09/2026", days:21, status:"pending",  submittedDate:"01/06/2026", note:"" },
  { id:"LV-007", employee:"Beatriz Fernandes", num:"001240", type:"licenca_estudo",      start:"01/07/2026", end:"31/07/2026", days:31, status:"rejected", submittedDate:"15/05/2026", note:"Sobreposição com período crítico da equipa." },
  { id:"LV-008", employee:"Ricardo Gomes",     num:"001241", type:"falta_injustificada", start:"09/06/2026", end:"09/06/2026", days:1,  status:"rejected", submittedDate:"09/06/2026", note:"Ausência sem justificação prévia." },
  { id:"LV-009", employee:"Graça Lopes",       num:"001242", type:"licenca_paternidade", start:"10/06/2026", end:"20/06/2026", days:11, status:"approved", submittedDate:"08/06/2026", note:"" },
  { id:"LV-010", employee:"Nuno Barros",       num:"001243", type:"falta_justificada",   start:"11/06/2026", end:"11/06/2026", days:1,  status:"pending",  submittedDate:"10/06/2026", note:"Cerimónia familiar." },
];

const monthlyData = [
  { mes:"Jan", ferias:2, falta:1, licenca:1 },
  { mes:"Fev", ferias:1, falta:2, licenca:2 },
  { mes:"Mar", ferias:3, falta:1, licenca:1 },
  { mes:"Abr", ferias:4, falta:2, licenca:2 },
  { mes:"Mai", ferias:3, falta:1, licenca:2 },
  { mes:"Jun", ferias:4, falta:3, licenca:2 },
  { mes:"Jul", ferias:8, falta:1, licenca:3 },
  { mes:"Ago", ferias:7, falta:2, licenca:4 },
  { mes:"Set", ferias:5, falta:1, licenca:2 },
  { mes:"Out", ferias:3, falta:2, licenca:1 },
  { mes:"Nov", ferias:2, falta:1, licenca:1 },
  { mes:"Dez", ferias:2, falta:0, licenca:1 },
];

type Request = typeof requests[0];

function Avatar({ name, index }: { name: string; index: number }) {
  const initials = name.split(" ").slice(0,2).map(n=>n[0]).join("");
  return (
    <div className={`w-9 h-9 rounded-full ${avatarColors[index%avatarColors.length]} flex items-center justify-center text-white text-xs font-medium shrink-0`}>
      {initials}
    </div>
  );
}

function DetailModal({ req, onClose, onApprove, onReject }: {
  req: Request; onClose:()=>void; onApprove:()=>void; onReject:()=>void;
}) {
  const idx = requests.findIndex(r=>r.id===req.id);
  const group = typeGroup(req.type);
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div className="absolute inset-0 bg-black/50" onClick={onClose}/>
      <div className="relative bg-white rounded-2xl shadow-2xl w-full max-w-md mx-4 flex flex-col max-h-[85vh]">
        <div className="flex items-center justify-between p-5 border-b border-gray-100">
          <div className="flex items-center gap-3">
            <Avatar name={req.employee} index={idx}/>
            <div>
              <p className="font-medium text-sm">{req.employee}</p>
              <p className="text-xs text-gray-500">Nº {req.num} · {req.id}</p>
            </div>
          </div>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-600"><X size={18}/></button>
        </div>
        <div className="flex-1 overflow-y-auto p-5 space-y-4">
          <div className="grid grid-cols-2 gap-3">
            <div className="bg-gray-50 rounded-xl p-3">
              <p className="text-xs text-gray-400 mb-1">Tipo</p>
              <span className={`text-xs px-2 py-0.5 rounded-full ${groupColor[group]}`}>{groupLabel[group]}</span>
            </div>
            <div className="bg-gray-50 rounded-xl p-3">
              <p className="text-xs text-gray-400 mb-1">Duração</p>
              <p className="text-sm font-medium text-gray-700">{req.days} dia(s)</p>
            </div>
            <div className="bg-gray-50 rounded-xl p-3">
              <p className="text-xs text-gray-400 mb-1">Início</p>
              <p className="text-sm text-gray-700">{req.start}</p>
            </div>
            <div className="bg-gray-50 rounded-xl p-3">
              <p className="text-xs text-gray-400 mb-1">Fim</p>
              <p className="text-sm text-gray-700">{req.end}</p>
            </div>
          </div>
          {req.note && (
            <div className="bg-blue-50 border-l-4 border-blue-400 rounded p-3">
              <p className="text-xs text-blue-700"><strong>Observação:</strong> {req.note}</p>
            </div>
          )}
          <p className="text-xs text-gray-400">Submetido em {req.submittedDate}</p>
        </div>
        {req.status==="pending" && (
          <div className="flex gap-2 p-5 border-t border-gray-100">
            <button onClick={onReject} className="flex-1 flex items-center justify-center gap-1.5 py-2.5 bg-red-50 text-red-600 border border-red-200 rounded-lg hover:bg-red-100 text-sm">
              <XCircle size={15}/> Rejeitar
            </button>
            <button onClick={onApprove} className="flex-1 flex items-center justify-center gap-1.5 py-2.5 bg-green-600 text-white rounded-lg hover:bg-green-700 text-sm">
              <CheckCircle size={15}/> Aprovar
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

export function GestorLeave() {
  const [filterStatus,   setFilterStatus]   = useState("all");
  const [filterType,     setFilterType]     = useState("all");
  const [selected,       setSelected]       = useState<Request|null>(null);
  const [statuses,       setStatuses]       = useState<Record<string,string>>({});

  const getStatus = (r: Request) => statuses[r.id] ?? r.status;

  const pending   = requests.filter(r=>getStatus(r)==="pending").length;
  const approved  = requests.filter(r=>getStatus(r)==="approved").length;
  const rejected  = requests.filter(r=>getStatus(r)==="rejected").length;
  const totalDays = requests.filter(r=>getStatus(r)==="approved").reduce((s,r)=>s+r.days,0);

  const filtered = requests.filter(r=>{
    if (filterStatus!=="all" && getStatus(r)!==filterStatus) return false;
    if (filterType!=="all"   && typeGroup(r.type)!==filterType) return false;
    return true;
  });

  const handleApprove = (id:string) => { setStatuses(s=>({...s,[id]:"approved"})); setSelected(null); };
  const handleReject  = (id:string) => { setStatuses(s=>({...s,[id]:"rejected"})); setSelected(null); };

  const statusBadge  = (s:string) => s==="approved"?"bg-green-100 text-green-700":s==="rejected"?"bg-red-100 text-red-700":"bg-orange-100 text-orange-700";
  const statusLabel  = (s:string) => s==="approved"?"Aprovado":s==="rejected"?"Rejeitado":"Pendente";
  const borderColor  = (s:string) => s==="approved"?"border-green-400":s==="rejected"?"border-red-400":"border-orange-400";

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      {selected && (
        <DetailModal req={selected} onClose={()=>setSelected(null)}
          onApprove={()=>handleApprove(selected.id)} onReject={()=>handleReject(selected.id)}/>
      )}

      <div className="mb-5">
        <h1 className="text-2xl mb-1">Ausências</h1>
        <p className="text-gray-500 text-sm">Gestão de ausências e pedidos de todos os funcionários</p>
      </div>

      {/* KPIs */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 mb-5">
        {[
          { label:"Pedidos Pendentes", value:pending,   icon:Clock,       color:"text-orange-500", bg:"bg-orange-50" },
          { label:"Aprovados",         value:approved,  icon:CheckCircle, color:"text-green-600",  bg:"bg-green-50"  },
          { label:"Rejeitados",        value:rejected,  icon:XCircle,     color:"text-red-500",    bg:"bg-red-50"    },
          { label:"Dias Aprovados",    value:totalDays, icon:Users,       color:"text-blue-600",   bg:"bg-blue-50"   },
        ].map((s,i)=>(
          <div key={i} className="bg-white rounded-xl shadow-sm p-4 flex items-center gap-3">
            <div className={`${s.bg} p-2.5 rounded-lg`}><s.icon size={18} className={s.color}/></div>
            <div><p className="text-2xl leading-none">{s.value}</p><p className="text-xs text-gray-500 mt-0.5">{s.label}</p></div>
          </div>
        ))}
      </div>

      {/* Dashboard mensal */}
      <div className="bg-white rounded-2xl shadow-sm p-5 mb-5">
        <p className="text-sm font-medium text-gray-700 mb-4">Ausências por mês · 2026</p>
        <ResponsiveContainer width="100%" height={200}>
          <BarChart data={monthlyData} barSize={14} barCategoryGap="30%">
            <CartesianGrid strokeDasharray="3 3" stroke="#f3f4f6" vertical={false}/>
            <XAxis dataKey="mes" tick={{fontSize:11,fill:"#9ca3af"}} axisLine={false} tickLine={false}/>
            <YAxis tick={{fontSize:11,fill:"#9ca3af"}} axisLine={false} tickLine={false} allowDecimals={false}/>
            <Tooltip
              contentStyle={{fontSize:12,borderRadius:10,border:"none",boxShadow:"0 4px 12px rgba(0,0,0,0.08)"}}
              cursor={{fill:"#f9fafb"}}
            />
            <Legend iconType="circle" iconSize={8} wrapperStyle={{fontSize:12,paddingTop:8}}/>
            <Bar dataKey="ferias"  name="Férias"  fill="#3b82f6" radius={[3,3,0,0]} stackId="a"/>
            <Bar dataKey="falta"   name="Falta"   fill="#f59e0b" radius={[3,3,0,0]} stackId="a"/>
            <Bar dataKey="licenca" name="Licença" fill="#8b5cf6" radius={[3,3,0,0]} stackId="a"/>
          </BarChart>
        </ResponsiveContainer>
      </div>

      {/* Filtros — estado e tipo na mesma linha */}
      <div className="bg-white rounded-2xl shadow-sm px-5 py-4 mb-5 flex flex-wrap items-center gap-6">
        <div>
          <p className="text-xs text-gray-400 uppercase tracking-wide mb-1.5">Estado</p>
          <div className="flex gap-1.5">
            {[["all","Todos"],["pending","Pendentes"],["approved","Aprovados"],["rejected","Rejeitados"]].map(([k,l])=>(
              <button key={k} onClick={()=>setFilterStatus(k)}
                className={`px-2.5 py-1 rounded-lg text-xs transition-colors ${filterStatus===k?"bg-slate-700 text-white":"bg-gray-100 text-gray-600 hover:bg-gray-200"}`}>
                {l}
              </button>
            ))}
          </div>
        </div>

        <div className="w-px h-8 bg-gray-100 hidden sm:block"/>

        <div>
          <p className="text-xs text-gray-400 uppercase tracking-wide mb-1.5">Tipo</p>
          <div className="flex gap-1.5">
            {[["all","Todos"],["ferias","Férias"],["falta","Falta"],["licenca","Licença"]].map(([k,l])=>(
              <button key={k} onClick={()=>setFilterType(k)}
                className={`px-2.5 py-1 rounded-lg text-xs transition-colors ${filterType===k?"bg-slate-700 text-white":"bg-gray-100 text-gray-600 hover:bg-gray-200"}`}>
                {l}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Lista */}
      <div className="space-y-2">
        {filtered.map((req,idx)=>{
          const st    = getStatus(req);
          const group = typeGroup(req.type);
          return (
            <div key={req.id} className={`bg-white rounded-xl shadow-sm p-4 flex items-center gap-4 border-l-4 ${borderColor(st)}`}>
              <Avatar name={req.employee} index={idx}/>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 flex-wrap">
                  <p className="text-sm font-medium text-gray-800">{req.employee}</p>
                  <span className={`text-xs px-2 py-0.5 rounded-full ${groupColor[group]}`}>{groupLabel[group]}</span>
                </div>
                <p className="text-xs text-gray-500 mt-0.5">{req.num} · {req.start} → {req.end} · {req.days} dia(s)</p>
              </div>
              <div className="flex items-center gap-2 shrink-0">
                <span className={`text-xs px-2 py-1 rounded-full ${statusBadge(st)}`}>{statusLabel(st)}</span>
                <button onClick={()=>setSelected(req)} className="p-1.5 border border-gray-200 rounded-lg hover:bg-gray-50 text-gray-500 transition-colors">
                  <Eye size={14}/>
                </button>
                {st==="pending" && (
                  <>
                    <button onClick={()=>handleApprove(req.id)} className="p-1.5 bg-green-100 text-green-700 rounded-lg hover:bg-green-200 transition-colors"><CheckCircle size={15}/></button>
                    <button onClick={()=>handleReject(req.id)} className="p-1.5 bg-red-100 text-red-600 rounded-lg hover:bg-red-200 transition-colors"><XCircle size={15}/></button>
                  </>
                )}
              </div>
            </div>
          );
        })}
        {filtered.length===0 && (
          <div className="bg-white rounded-xl shadow-sm p-8 text-center text-gray-400">
            <AlertCircle size={24} className="mx-auto mb-2 opacity-40"/>
            <p className="text-sm">Nenhum pedido encontrado para os filtros seleccionados.</p>
          </div>
        )}
      </div>
    </div>
  );
}
