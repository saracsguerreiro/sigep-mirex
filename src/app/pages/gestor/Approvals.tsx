import { useState } from "react";
import { CheckCircle, XCircle, Eye, Clock, X } from "lucide-react";

const avatarColors = ["bg-blue-500", "bg-purple-500", "bg-emerald-500", "bg-rose-500", "bg-amber-500"];

const approvals = [
  {
    id: "APR-2026-001",
    employee: "Maria Santos Costa",
    employeeNumber: "001236",
    type: "Actualização de Cadastro",
    submittedDate: "08/06/2026",
    status: "pending",
    priority: "normal",
    avatar: null,
    diff: [
      { field: "Telefone", before: "+244 912 345 678", after: "+244 923 456 789", changed: true },
      { field: "Endereço", before: "Rua da Missão, 12", after: "Av. 4 de Fevereiro, 45", changed: true },
      { field: "Fotografia", before: "foto_antiga.jpg", after: "foto_nova.jpg", changed: true },
      { field: "Email", before: "m.santos@mirex.gov", after: "m.santos@mirex.gov", changed: false },
    ],
  },
  {
    id: "APR-2026-002",
    employee: "João Pedro Neto",
    employeeNumber: "001237",
    type: "Dados Funcionais",
    submittedDate: "08/06/2026",
    status: "pending",
    priority: "high",
    avatar: null,
    diff: [
      { field: "Local de Trabalho", before: "Sede MIREX – Luanda", after: "Embaixada de Lisboa", changed: true },
      { field: "Data de Admissão", before: "01/03/2020", after: "01/03/2019", changed: true },
      { field: "Cargo", before: "Técnico Superior", after: "Técnico Superior", changed: false },
    ],
  },
  {
    id: "APR-2026-003",
    employee: "Isabel Fernandes",
    employeeNumber: "001238",
    type: "Dados Biométricos",
    submittedDate: "07/06/2026",
    status: "pending",
    priority: "normal",
    avatar: null,
    diff: [
      { field: "Fotografia", before: "—", after: "foto_isabel.jpg", changed: true },
      { field: "Impressão Digital", before: "Não registada", after: "Registada", changed: true },
    ],
  },
  {
    id: "APR-2026-004",
    employee: "Ana Paula Silva",
    employeeNumber: "001234",
    type: "Actualização de Cadastro",
    submittedDate: "07/06/2026",
    status: "approved",
    priority: "normal",
    approvedBy: "Dr. António Ferreira",
    approvedDate: "07/06/2026",
    avatar: null,
    diff: [
      { field: "Telefone", before: "+244 912 111 222", after: "+244 934 567 890", changed: true },
      { field: "Email Pessoal", before: "ana.silva@gmail.com", after: "ana.paula@gmail.com", changed: true },
    ],
  },
  {
    id: "APR-2026-005",
    employee: "Carlos Mendes",
    employeeNumber: "001235",
    type: "Dados Pessoais",
    submittedDate: "06/06/2026",
    status: "rejected",
    priority: "normal",
    rejectedBy: "Dr. António Ferreira",
    rejectedDate: "06/06/2026",
    reason: "Documento comprovativo em falta",
    avatar: null,
    diff: [
      { field: "Endereço", before: "Bairro Miramar, 5", after: "Rua Kwame Nkrumah, 22", changed: true },
    ],
  },
];

type Approval = typeof approvals[0];

function Avatar({ name, index }: { name: string; index: number }) {
  const initials = name.split(" ").slice(0, 2).map(n => n[0]).join("");
  return (
    <div className={`w-10 h-10 rounded-full ${avatarColors[index % avatarColors.length]} flex items-center justify-center text-white text-sm font-medium shrink-0`}>
      {initials}
    </div>
  );
}

function DetailModal({ approval, onClose, onApprove, onReject }: {
  approval: Approval;
  onClose: () => void;
  onApprove: () => void;
  onReject: () => void;
}) {
  const changed = approval.diff.filter(d => d.changed);
  const unchanged = approval.diff.filter(d => !d.changed);
  const idx = approvals.findIndex(a => a.id === approval.id);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div className="absolute inset-0 bg-black/50" onClick={onClose} />
      <div className="relative bg-white rounded-2xl shadow-2xl w-full max-w-lg mx-4 max-h-[85vh] flex flex-col">

        {/* Header */}
        <div className="flex items-center justify-between p-5 border-b border-gray-200">
          <div className="flex items-center gap-3">
            <Avatar name={approval.employee} index={idx} />
            <div>
              <p className="font-medium text-sm">{approval.employee}</p>
              <p className="text-xs text-gray-500">Nº {approval.employeeNumber} · {approval.type}</p>
            </div>
          </div>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-600">
            <X size={20} />
          </button>
        </div>

        {/* Body */}
        <div className="flex-1 overflow-y-auto p-5 space-y-4">

          {/* Alterações */}
          {changed.length > 0 && (
            <div>
              <p className="text-xs font-medium text-gray-500 uppercase tracking-wide mb-2">
                Campos alterados ({changed.length})
              </p>
              <div className="space-y-2">
                {changed.map((d, i) => (
                  <div key={i} className="rounded-lg border border-amber-200 bg-amber-50 overflow-hidden">
                    <div className="px-3 py-1.5 bg-amber-100 border-b border-amber-200">
                      <span className="text-xs font-medium text-amber-800">{d.field}</span>
                    </div>
                    <div className="grid grid-cols-2 divide-x divide-amber-200">
                      <div className="px-3 py-2">
                        <p className="text-xs text-gray-400 mb-0.5">Anterior</p>
                        <p className="text-sm text-red-600 line-through">{d.before}</p>
                      </div>
                      <div className="px-3 py-2">
                        <p className="text-xs text-gray-400 mb-0.5">Novo</p>
                        <p className="text-sm text-green-700 font-medium">{d.after}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Sem alteração */}
          {unchanged.length > 0 && (
            <div>
              <p className="text-xs font-medium text-gray-400 uppercase tracking-wide mb-2">
                Sem alteração ({unchanged.length})
              </p>
              <div className="space-y-1">
                {unchanged.map((d, i) => (
                  <div key={i} className="flex items-center justify-between px-3 py-2 bg-gray-50 rounded-lg">
                    <span className="text-xs text-gray-500">{d.field}</span>
                    <span className="text-xs text-gray-600">{d.before}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Motivo de rejeição */}
          {approval.reason && (
            <div className="p-3 bg-red-50 border-l-4 border-red-400 rounded">
              <p className="text-xs text-red-700"><strong>Motivo da rejeição:</strong> {approval.reason}</p>
            </div>
          )}

          <p className="text-xs text-gray-400">Submetido em {approval.submittedDate}</p>
        </div>

        {/* Footer */}
        {approval.status === "pending" && (
          <div className="flex gap-2 p-5 border-t border-gray-200">
            <button onClick={onReject}
              className="flex-1 flex items-center justify-center gap-1.5 py-2.5 bg-red-50 text-red-600 border border-red-200 rounded-lg hover:bg-red-100 transition-colors text-sm">
              <XCircle size={15} /> Rejeitar
            </button>
            <button onClick={onApprove}
              className="flex-1 flex items-center justify-center gap-1.5 py-2.5 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors text-sm">
              <CheckCircle size={15} /> Aprovar
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

export function Approvals() {
  const [filter, setFilter] = useState("all");
  const [selected, setSelected] = useState<Approval | null>(null);
  const [statuses, setStatuses] = useState<Record<string, string>>({});

  const getStatus = (a: Approval) => statuses[a.id] ?? a.status;

  const stats = {
    pending: approvals.filter(a => getStatus(a) === "pending").length,
    approved: approvals.filter(a => getStatus(a) === "approved").length,
    rejected: approvals.filter(a => getStatus(a) === "rejected").length,
  };

  const filtered = approvals.filter(a => filter === "all" || getStatus(a) === filter);

  const handleApprove = (id: string) => {
    setStatuses(s => ({ ...s, [id]: "approved" }));
    setSelected(null);
  };
  const handleReject = (id: string) => {
    setStatuses(s => ({ ...s, [id]: "rejected" }));
    setSelected(null);
  };

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      {selected && (
        <DetailModal
          approval={selected}
          onClose={() => setSelected(null)}
          onApprove={() => handleApprove(selected.id)}
          onReject={() => handleReject(selected.id)}
        />
      )}

      <div className="mb-5">
        <h1 className="text-2xl mb-1">Aprovações de Cadastro</h1>
        <p className="text-gray-500 text-sm">Revisar e validar actualizações submetidas pelos funcionários</p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-3 gap-3 mb-5">
        {[
          { label: "Pendentes", value: stats.pending, icon: Clock, color: "text-orange-500", bg: "bg-orange-50" },
          { label: "Aprovados", value: stats.approved, icon: CheckCircle, color: "text-green-600", bg: "bg-green-50" },
          { label: "Rejeitados", value: stats.rejected, icon: XCircle, color: "text-red-500", bg: "bg-red-50" },
        ].map((s, i) => (
          <div key={i} className="bg-white rounded-xl shadow-sm p-4 flex items-center gap-3">
            <div className={`${s.bg} p-2 rounded-lg`}>
              <s.icon size={18} className={s.color} />
            </div>
            <div>
              <p className="text-xl leading-none">{s.value}</p>
              <p className="text-xs text-gray-500 mt-0.5">{s.label}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Filters */}
      <div className="flex gap-2 mb-5">
        {[
          { key: "all", label: `Todos (${approvals.length})`, active: "bg-blue-600 text-white" },
          { key: "pending", label: `Pendentes (${stats.pending})`, active: "bg-orange-500 text-white" },
          { key: "approved", label: `Aprovados (${stats.approved})`, active: "bg-green-600 text-white" },
          { key: "rejected", label: `Rejeitados (${stats.rejected})`, active: "bg-red-500 text-white" },
        ].map(f => (
          <button key={f.key} onClick={() => setFilter(f.key)}
            className={`px-3 py-1.5 rounded-lg text-xs transition-colors ${
              filter === f.key ? f.active : "bg-white text-gray-600 hover:bg-gray-100 shadow-sm"
            }`}>
            {f.label}
          </button>
        ))}
      </div>

      {/* Cards */}
      <div className="space-y-2">
        {filtered.map((approval, idx) => {
          const status = getStatus(approval);
          const changedCount = approval.diff.filter(d => d.changed).length;
          return (
            <div key={approval.id}
              className={`bg-white rounded-xl shadow-sm p-4 flex items-center gap-4 border-l-4 ${
                status === "pending" ? "border-orange-400"
                : status === "approved" ? "border-green-500"
                : "border-red-400"
              }`}>

              {/* Avatar */}
              <Avatar name={approval.employee} index={idx} />

              {/* Info */}
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 flex-wrap">
                  <p className="text-sm font-medium truncate">{approval.employee}</p>
                  {approval.priority === "high" && (
                    <span className="text-xs px-1.5 py-0.5 bg-red-100 text-red-700 rounded">Alta Prioridade</span>
                  )}
                </div>
                <p className="text-xs text-gray-500 mt-0.5">
                  {approval.employeeNumber} · {approval.type} · {approval.submittedDate}
                </p>
                <div className="flex gap-1 mt-1.5 flex-wrap">
                  {approval.diff.filter(d => d.changed).map((d, i) => (
                    <span key={i} className="text-xs px-2 py-0.5 bg-gray-100 text-gray-500 rounded-full">{d.field}</span>
                  ))}
                </div>
              </div>

              {/* Status + Actions */}
              <div className="flex items-center gap-2 shrink-0">
                <span className={`text-xs px-2 py-1 rounded-full ${
                  status === "pending" ? "bg-orange-100 text-orange-700"
                  : status === "approved" ? "bg-green-100 text-green-700"
                  : "bg-red-100 text-red-700"
                }`}>
                  {status === "pending" ? "Pendente" : status === "approved" ? "Aprovado" : "Rejeitado"}
                </span>

                <button
                  onClick={() => setSelected(approval)}
                  className="flex items-center gap-1 px-3 py-1.5 border border-gray-200 rounded-lg hover:bg-gray-50 text-xs transition-colors">
                  <Eye size={13} />
                  {changedCount} alteraç{changedCount === 1 ? "ão" : "ões"}
                </button>

                {status === "pending" && (
                  <>
                    <button onClick={() => handleApprove(approval.id)}
                      className="p-1.5 bg-green-100 text-green-700 rounded-lg hover:bg-green-200 transition-colors">
                      <CheckCircle size={16} />
                    </button>
                    <button onClick={() => handleReject(approval.id)}
                      className="p-1.5 bg-red-100 text-red-600 rounded-lg hover:bg-red-200 transition-colors">
                      <XCircle size={16} />
                    </button>
                  </>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
