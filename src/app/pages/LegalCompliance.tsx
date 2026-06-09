import { Scale, FileText, CheckCircle, AlertTriangle, Clock } from "lucide-react";

export function LegalCompliance() {
  const complianceItems = [
    {
      regulation: "Lei 20/19",
      description: "Regime Geral de Trabalho em Funções Públicas",
      affected: 1089,
      compliant: 1045,
      pending: 32,
      issues: 12,
      lastUpdate: "15/05/2026",
    },
    {
      regulation: "Lei 12/11",
      description: "Estatuto dos Agentes Diplomáticos e Consulares",
      affected: 342,
      compliant: 325,
      pending: 14,
      issues: 3,
      lastUpdate: "20/05/2026",
    },
  ];

  const regularizationCases = [
    {
      id: "REG-2026-018",
      employee: "António Silva",
      issue: "Regularização de Contrato",
      regulation: "Lei 20/19",
      status: "Em Processo",
      deadline: "30/06/2026",
      priority: "Alta",
    },
    {
      id: "REG-2026-019",
      employee: "Beatriz Costa",
      issue: "Actualização de Documentos",
      regulation: "Lei 12/11",
      status: "Pendente",
      deadline: "15/07/2026",
      priority: "Média",
    },
    {
      id: "REG-2026-020",
      employee: "Carlos Pereira",
      issue: "Validação de Credenciais",
      regulation: "Lei 20/19",
      status: "Concluído",
      deadline: "01/06/2026",
      priority: "Baixa",
    },
  ];

  const complianceChecks = [
    { check: "Contratos de Trabalho", compliant: 98, total: 100 },
    { check: "Documentação Pessoal", compliant: 94, total: 100 },
    { check: "Credenciais Diplomáticas", compliant: 100, total: 100 },
    { check: "Certificações Profissionais", compliant: 87, total: 100 },
    { check: "Seguros e Benefícios", compliant: 92, total: 100 },
  ];

  return (
    <div className="p-8">
      {/* Header */}
      <div className="mb-6">
        <h1 className="text-3xl mb-2">Conformidade Legal</h1>
        <p className="text-gray-600">
          Atendimento Lei 20/19 e 12/11, regularização de trabalhadores e controlo de conformidade
        </p>
      </div>

      {/* Statistics */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
        <div className="bg-white rounded-lg shadow-sm p-4">
          <div className="flex items-center justify-between mb-2">
            <p className="text-sm text-gray-600">Taxa de Conformidade</p>
            <CheckCircle className="text-green-600" size={20} />
          </div>
          <p className="text-2xl">96.8%</p>
          <p className="text-xs text-gray-500 mt-1">1,370 de 1,415 funcionários</p>
        </div>
        <div className="bg-white rounded-lg shadow-sm p-4">
          <div className="flex items-center justify-between mb-2">
            <p className="text-sm text-gray-600">Em Regularização</p>
            <Clock className="text-blue-600" size={20} />
          </div>
          <p className="text-2xl">46</p>
          <p className="text-xs text-gray-500 mt-1">Casos em processo</p>
        </div>
        <div className="bg-white rounded-lg shadow-sm p-4">
          <div className="flex items-center justify-between mb-2">
            <p className="text-sm text-gray-600">Requer Atenção</p>
            <AlertTriangle className="text-orange-600" size={20} />
          </div>
          <p className="text-2xl">15</p>
          <p className="text-xs text-gray-500 mt-1">Questões urgentes</p>
        </div>
        <div className="bg-white rounded-lg shadow-sm p-4">
          <div className="flex items-center justify-between mb-2">
            <p className="text-sm text-gray-600">Documentos Actualizados</p>
            <FileText className="text-purple-600" size={20} />
          </div>
          <p className="text-2xl">1,289</p>
          <p className="text-xs text-gray-500 mt-1">Últimos 30 dias</p>
        </div>
      </div>

      {/* Compliance Overview */}
      <div className="bg-white rounded-lg shadow-sm mb-6">
        <div className="p-6 border-b border-gray-200">
          <h2 className="text-xl">Panorama de Conformidade Legal</h2>
        </div>
        <div className="p-6">
          <div className="space-y-6">
            {complianceItems.map((item, index) => (
              <div key={index} className="border border-gray-200 rounded-lg p-4">
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <div className="flex items-center gap-2 mb-2">
                      <Scale className="text-blue-600" size={20} />
                      <h3 className="text-lg">{item.regulation}</h3>
                    </div>
                    <p className="text-sm text-gray-600">{item.description}</p>
                    <p className="text-xs text-gray-500 mt-1">
                      Última actualização: {item.lastUpdate}
                    </p>
                  </div>
                  <div className="text-right">
                    <p className="text-2xl text-green-600">
                      {Math.round((item.compliant / item.affected) * 100)}%
                    </p>
                    <p className="text-xs text-gray-600">Conformidade</p>
                  </div>
                </div>

                <div className="grid grid-cols-3 gap-4">
                  <div className="bg-green-50 p-3 rounded-lg">
                    <p className="text-sm text-gray-600 mb-1">Conforme</p>
                    <p className="text-xl text-green-700">{item.compliant}</p>
                  </div>
                  <div className="bg-blue-50 p-3 rounded-lg">
                    <p className="text-sm text-gray-600 mb-1">Pendente</p>
                    <p className="text-xl text-blue-700">{item.pending}</p>
                  </div>
                  <div className="bg-red-50 p-3 rounded-lg">
                    <p className="text-sm text-gray-600 mb-1">Questões</p>
                    <p className="text-xl text-red-700">{item.issues}</p>
                  </div>
                </div>

                <div className="mt-4">
                  <div className="w-full bg-gray-200 rounded-full h-3">
                    <div
                      className="bg-green-600 h-3 rounded-full"
                      style={{ width: `${(item.compliant / item.affected) * 100}%` }}
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Regularization Cases */}
        <div className="bg-white rounded-lg shadow-sm">
          <div className="p-6 border-b border-gray-200">
            <h2 className="text-xl">Casos de Regularização</h2>
          </div>
          <div className="p-6 space-y-4">
            {regularizationCases.map((case_) => (
              <div
                key={case_.id}
                className="p-4 border border-gray-200 rounded-lg hover:border-blue-300 transition-colors"
              >
                <div className="flex items-start justify-between mb-2">
                  <div>
                    <p className="text-sm text-gray-500 mb-1">{case_.id}</p>
                    <p className="mb-1">{case_.employee}</p>
                  </div>
                  <span
                    className={`px-3 py-1 rounded-full text-xs ${
                      case_.priority === "Alta"
                        ? "bg-red-100 text-red-800"
                        : case_.priority === "Média"
                        ? "bg-orange-100 text-orange-800"
                        : "bg-gray-100 text-gray-800"
                    }`}
                  >
                    {case_.priority}
                  </span>
                </div>
                <p className="text-sm text-gray-600 mb-2">{case_.issue}</p>
                <div className="flex items-center justify-between text-sm">
                  <span className="px-2 py-1 bg-blue-50 text-blue-700 rounded text-xs">
                    {case_.regulation}
                  </span>
                  <span
                    className={`px-3 py-1 rounded-full text-xs ${
                      case_.status === "Concluído"
                        ? "bg-green-100 text-green-800"
                        : case_.status === "Em Processo"
                        ? "bg-blue-100 text-blue-800"
                        : "bg-gray-100 text-gray-800"
                    }`}
                  >
                    {case_.status}
                  </span>
                </div>
                <p className="text-xs text-gray-500 mt-2">Prazo: {case_.deadline}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Compliance Checks */}
        <div className="bg-white rounded-lg shadow-sm">
          <div className="p-6 border-b border-gray-200">
            <h2 className="text-xl">Verificações de Conformidade</h2>
          </div>
          <div className="p-6 space-y-4">
            {complianceChecks.map((check, index) => (
              <div key={index} className="p-4 border border-gray-200 rounded-lg">
                <div className="flex items-center justify-between mb-2">
                  <p className="text-sm">{check.check}</p>
                  <span className="text-sm">
                    {check.compliant}/{check.total}
                  </span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div
                    className={`h-2 rounded-full ${
                      check.compliant === check.total
                        ? "bg-green-600"
                        : check.compliant >= 90
                        ? "bg-blue-600"
                        : "bg-orange-600"
                    }`}
                    style={{ width: `${(check.compliant / check.total) * 100}%` }}
                  />
                </div>
                <p className="text-xs text-gray-600 mt-1">
                  {Math.round((check.compliant / check.total) * 100)}% completo
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Alerts */}
      <div className="mt-6 bg-white rounded-lg shadow-sm">
        <div className="p-6 border-b border-gray-200">
          <h2 className="text-xl">Alertas de Conformidade</h2>
        </div>
        <div className="p-6">
          <div className="space-y-3">
            <div className="flex items-start gap-3 p-4 bg-red-50 border-l-4 border-red-500 rounded">
              <AlertTriangle className="text-red-600 flex-shrink-0 mt-1" size={20} />
              <div>
                <p className="text-sm mb-1">
                  <strong>12 funcionários</strong> requerem regularização urgente (Lei 20/19)
                </p>
                <p className="text-xs text-gray-600">Prazo: 30/06/2026</p>
              </div>
            </div>
            <div className="flex items-start gap-3 p-4 bg-orange-50 border-l-4 border-orange-500 rounded">
              <Clock className="text-orange-600 flex-shrink-0 mt-1" size={20} />
              <div>
                <p className="text-sm mb-1">
                  <strong>3 credenciais diplomáticas</strong> próximas do vencimento
                </p>
                <p className="text-xs text-gray-600">Acção necessária nas próximas 2 semanas</p>
              </div>
            </div>
            <div className="flex items-start gap-3 p-4 bg-blue-50 border-l-4 border-blue-500 rounded">
              <FileText className="text-blue-600 flex-shrink-0 mt-1" size={20} />
              <div>
                <p className="text-sm mb-1">
                  <strong>46 documentos</strong> aguardam actualização
                </p>
                <p className="text-xs text-gray-600">Revisão pendente</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
