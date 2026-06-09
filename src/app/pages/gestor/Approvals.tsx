import { useState } from "react";
import { CheckCircle, XCircle, Eye, Clock, User } from "lucide-react";

export function Approvals() {
  const [filter, setFilter] = useState("all");

  const approvals = [
    {
      id: "APR-2026-001",
      employee: "Maria Santos Costa",
      employeeNumber: "001236",
      type: "Actualização de Cadastro",
      submittedDate: "08/06/2026",
      status: "pending",
      changes: ["Telefone", "Endereço", "Fotografia"],
      priority: "normal",
    },
    {
      id: "APR-2026-002",
      employee: "João Pedro Neto",
      employeeNumber: "001237",
      type: "Dados Funcionais",
      submittedDate: "08/06/2026",
      status: "pending",
      changes: ["Local de Trabalho", "Data de Admissão"],
      priority: "high",
    },
    {
      id: "APR-2026-003",
      employee: "Isabel Fernandes",
      employeeNumber: "001238",
      type: "Dados Biométricos",
      submittedDate: "07/06/2026",
      status: "pending",
      changes: ["Fotografia", "Impressão Digital"],
      priority: "normal",
    },
    {
      id: "APR-2026-004",
      employee: "Ana Paula Silva",
      employeeNumber: "001234",
      type: "Actualização de Cadastro",
      submittedDate: "07/06/2026",
      status: "approved",
      changes: ["Telefone", "Email Pessoal"],
      priority: "normal",
      approvedBy: "Dr. António Ferreira",
      approvedDate: "07/06/2026",
    },
    {
      id: "APR-2026-005",
      employee: "Carlos Mendes",
      employeeNumber: "001235",
      type: "Dados Pessoais",
      submittedDate: "06/06/2026",
      status: "rejected",
      changes: ["Endereço"],
      priority: "normal",
      rejectedBy: "Dr. António Ferreira",
      rejectedDate: "06/06/2026",
      reason: "Documento comprovativo em falta",
    },
  ];

  const filteredApprovals = approvals.filter((approval) => {
    if (filter === "all") return true;
    return approval.status === filter;
  });

  const stats = {
    pending: approvals.filter((a) => a.status === "pending").length,
    approved: approvals.filter((a) => a.status === "approved").length,
    rejected: approvals.filter((a) => a.status === "rejected").length,
  };

  return (
    <div className="p-8">
      {/* Header */}
      <div className="mb-6">
        <h1 className="text-3xl mb-2">Aprovações de Cadastro</h1>
        <p className="text-gray-600">
          Revisar e aprovar actualizações de cadastro dos funcionários
        </p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        <div className="bg-white rounded-lg shadow-sm p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600 mb-1">Pendentes</p>
              <p className="text-3xl">{stats.pending}</p>
            </div>
            <Clock className="text-orange-600" size={32} />
          </div>
        </div>
        <div className="bg-white rounded-lg shadow-sm p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600 mb-1">Aprovados</p>
              <p className="text-3xl">{stats.approved}</p>
            </div>
            <CheckCircle className="text-green-600" size={32} />
          </div>
        </div>
        <div className="bg-white rounded-lg shadow-sm p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600 mb-1">Rejeitados</p>
              <p className="text-3xl">{stats.rejected}</p>
            </div>
            <XCircle className="text-red-600" size={32} />
          </div>
        </div>
      </div>

      {/* Filters */}
      <div className="bg-white rounded-lg shadow-sm p-4 mb-6">
        <div className="flex gap-2">
          <button
            onClick={() => setFilter("all")}
            className={`px-4 py-2 rounded-lg transition-colors ${
              filter === "all"
                ? "bg-blue-600 text-white"
                : "bg-gray-100 text-gray-700 hover:bg-gray-200"
            }`}
          >
            Todos ({approvals.length})
          </button>
          <button
            onClick={() => setFilter("pending")}
            className={`px-4 py-2 rounded-lg transition-colors ${
              filter === "pending"
                ? "bg-orange-600 text-white"
                : "bg-gray-100 text-gray-700 hover:bg-gray-200"
            }`}
          >
            Pendentes ({stats.pending})
          </button>
          <button
            onClick={() => setFilter("approved")}
            className={`px-4 py-2 rounded-lg transition-colors ${
              filter === "approved"
                ? "bg-green-600 text-white"
                : "bg-gray-100 text-gray-700 hover:bg-gray-200"
            }`}
          >
            Aprovados ({stats.approved})
          </button>
          <button
            onClick={() => setFilter("rejected")}
            className={`px-4 py-2 rounded-lg transition-colors ${
              filter === "rejected"
                ? "bg-red-600 text-white"
                : "bg-gray-100 text-gray-700 hover:bg-gray-200"
            }`}
          >
            Rejeitados ({stats.rejected})
          </button>
        </div>
      </div>

      {/* Approvals List */}
      <div className="bg-white rounded-lg shadow-sm">
        <div className="p-6 space-y-4">
          {filteredApprovals.map((approval) => (
            <div
              key={approval.id}
              className={`p-6 border-2 rounded-lg transition-colors ${
                approval.status === "pending"
                  ? "border-orange-200 hover:border-orange-300"
                  : approval.status === "approved"
                  ? "border-green-200"
                  : "border-red-200"
              }`}
            >
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-start gap-4">
                  <div className="bg-gray-100 p-3 rounded-full">
                    <User className="text-gray-600" size={24} />
                  </div>
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <h3 className="text-lg">{approval.employee}</h3>
                      {approval.priority === "high" && (
                        <span className="px-2 py-1 bg-red-100 text-red-700 text-xs rounded">
                          Prioridade Alta
                        </span>
                      )}
                    </div>
                    <p className="text-sm text-gray-600">
                      Nº Funcionário: {approval.employeeNumber}
                    </p>
                    <p className="text-sm text-gray-600">{approval.type}</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-xs text-gray-500 mb-2">{approval.id}</p>
                  <span
                    className={`px-3 py-1 rounded-full text-xs ${
                      approval.status === "pending"
                        ? "bg-orange-100 text-orange-800"
                        : approval.status === "approved"
                        ? "bg-green-100 text-green-800"
                        : "bg-red-100 text-red-800"
                    }`}
                  >
                    {approval.status === "pending"
                      ? "Pendente"
                      : approval.status === "approved"
                      ? "Aprovado"
                      : "Rejeitado"}
                  </span>
                </div>
              </div>

              <div className="mb-4">
                <p className="text-sm text-gray-600 mb-2">Alterações solicitadas:</p>
                <div className="flex flex-wrap gap-2">
                  {approval.changes.map((change, index) => (
                    <span
                      key={index}
                      className="px-3 py-1 bg-blue-50 text-blue-700 text-sm rounded"
                    >
                      {change}
                    </span>
                  ))}
                </div>
              </div>

              <div className="flex items-center justify-between pt-4 border-t border-gray-200">
                <p className="text-sm text-gray-600">
                  Submetido em {approval.submittedDate}
                  {approval.approvedBy && (
                    <span className="ml-2">• Aprovado por {approval.approvedBy} em {approval.approvedDate}</span>
                  )}
                  {approval.rejectedBy && (
                    <span className="ml-2">• Rejeitado por {approval.rejectedBy} em {approval.rejectedDate}</span>
                  )}
                </p>

                {approval.status === "pending" ? (
                  <div className="flex gap-2">
                    <button className="flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors text-sm">
                      <Eye size={16} />
                      Ver Detalhes
                    </button>
                    <button className="flex items-center gap-2 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors text-sm">
                      <CheckCircle size={16} />
                      Aprovar
                    </button>
                    <button className="flex items-center gap-2 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors text-sm">
                      <XCircle size={16} />
                      Rejeitar
                    </button>
                  </div>
                ) : (
                  <button className="flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors text-sm">
                    <Eye size={16} />
                    Ver Detalhes
                  </button>
                )}
              </div>

              {approval.reason && (
                <div className="mt-3 p-3 bg-red-50 border-l-4 border-red-500 rounded">
                  <p className="text-sm text-gray-700">
                    <strong>Motivo da rejeição:</strong> {approval.reason}
                  </p>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
