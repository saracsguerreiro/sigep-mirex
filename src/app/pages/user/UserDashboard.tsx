import { useAuth } from "../../contexts/AuthContext";
import { TrendingUp, Calendar, CheckCircle, FileText, Download, AlertCircle, XCircle } from "lucide-react";

export function UserDashboard() {
  const { user } = useAuth();

  const metrics = [
    { label: "Tempo de Serviço", value: "4 anos", subtext: "Desde 2022" },
    { label: "Pontuação do Desempenho", value: "78%", subtext: "Última Avaliação" },
    { label: "Score da Avaliação", value: "3/5", subtext: "Muito Bom" },
  ];

  const careerTimeline = [
    { position: "Directora", level: "L5 Nível 1", date: "Futuro", type: "future", status: "Em 3-4 anos" },
    { position: "Conselheira Especialista", level: "L4 Nível 1", date: "Futuro", type: "next", status: "~10 meses", requirements: "Avaliação 4.0 + 1 ano" },
    { position: "Conselheira Principal", level: "L3 Nível 2", date: "Jan 2024", type: "current", status: "Actual" },
    { position: "Conselheira", level: "L3 Nível 1", date: "Jan 2022", type: "achieved", status: "Alcançado" },
    { position: "Analista Sénior", level: "L2 Nível 3", date: "Jan 2020", type: "achieved", status: "Alcançado" },
  ];

  const progressCriteria = [
    {
      name: "Tempo de Serviço",
      required: "3 anos",
      current: "2 anos",
      percentage: 67,
      status: "em_progresso"
    },
    {
      name: "Avaliação de Desempenho",
      required: "Mínimo 4.0",
      current: "3.8",
      percentage: 95,
      status: "atencao"
    },
    {
      name: "Formação Obrigatória",
      required: "3 cursos",
      current: "3 cursos",
      percentage: 100,
      status: "concluido"
    },
  ];

  const eligibilityCriteria = [
    {
      criterion: "Tempo mínimo no cargo actual",
      requirement: "2 anos completos",
      currentStatus: "2 anos, 4 meses",
      met: true
    },
    {
      criterion: "Avaliação de desempenho média",
      requirement: "Mínimo 4.0 nos últimos 2 anos",
      currentStatus: "3.8 (abaixo do mínimo)",
      met: false
    },
    {
      criterion: "Ausência de sanções disciplinares",
      requirement: "Sem sanções nos últimos 12 meses",
      currentStatus: "Sem ocorrências",
      met: true
    },
  ];

  const objectives = [
    { text: "Formação em Gestão de Projectos", date: "Set 2023", status: "completed" },
    { text: "Certificação ✓", date: "Dez 2023", status: "completed" },
    { text: "Projecto Piloto ✓", date: "Jan 2024", status: "completed" },
  ];

  const lastEvaluation = {
    score: "78%",
    date: "Vazio (Em)",
    details: "Última avaliação - Melhor",
  };

  const nextEvaluation = {
    month: "Set 2025",
    date: "Sep 2025",
  };

  return (
    <div className="p-8">
      {/* Header */}
      <div className="mb-6">
        <h1 className="text-3xl mb-2">Meu Perfil</h1>
      </div>

      {/* Top Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        {metrics.map((metric, index) => (
          <div key={index} className="bg-white rounded-lg shadow-sm p-6">
            <p className="text-sm text-gray-600 mb-2">{metric.label}</p>
            <p className="text-4xl mb-1">{metric.value}</p>
            <p className="text-xs text-gray-500">{metric.subtext}</p>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Column - 2/3 width */}
        <div className="lg:col-span-2 space-y-6">
          {/* Critérios de Progressão */}
          <div className="bg-white rounded-lg shadow-sm p-4">
            <h2 className="text-lg mb-3">Critérios de Progressão</h2>
            <div className="space-y-2">
              {progressCriteria.map((criterion, index) => (
                <div key={index} className="p-3 bg-gray-50 rounded-lg">
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-2 flex-1">
                      {criterion.status === 'concluido' ? (
                        <CheckCircle className="text-green-600 flex-shrink-0" size={18} />
                      ) : criterion.status === 'atencao' ? (
                        <AlertCircle className="text-orange-600 flex-shrink-0" size={18} />
                      ) : (
                        <TrendingUp className="text-blue-600 flex-shrink-0" size={18} />
                      )}
                      <span className="text-sm font-medium">{criterion.name}</span>
                    </div>
                    <span className={`text-sm font-medium ml-2 ${
                      criterion.status === 'concluido' ? 'text-green-600' :
                      criterion.status === 'atencao' ? 'text-orange-600' :
                      'text-blue-600'
                    }`}>{criterion.percentage}%</span>
                  </div>
                  <div className="flex items-center gap-2 text-xs text-gray-600">
                    <span>{criterion.current}</span>
                    <span>de</span>
                    <span>{criterion.required}</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-1.5 mt-2">
                    <div
                      className={`h-1.5 rounded-full transition-all ${
                        criterion.status === 'concluido' ? 'bg-green-600' :
                        criterion.status === 'atencao' ? 'bg-orange-600' :
                        'bg-blue-600'
                      }`}
                      style={{ width: `${criterion.percentage}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Elegibilidade */}
          <div className="bg-white rounded-lg shadow-sm p-4">
            <div className="flex items-center justify-between mb-3">
              <h2 className="text-lg">Elegibilidade</h2>
              <span className="text-xs px-2 py-1 bg-blue-100 text-blue-700 rounded">
                {eligibilityCriteria.filter(c => c.met).length}/{eligibilityCriteria.length} cumpridos
              </span>
            </div>
            <div className="space-y-2">
              {eligibilityCriteria.map((item, index) => (
                <div key={index} className="p-2 bg-gray-50 rounded-lg">
                  <div className="flex items-start gap-2">
                    {item.met ? (
                      <CheckCircle className="text-green-600 flex-shrink-0 mt-0.5" size={16} />
                    ) : (
                      <XCircle className="text-red-600 flex-shrink-0 mt-0.5" size={16} />
                    )}
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium mb-1">{item.criterion}</p>
                      <p className="text-xs text-gray-600">
                        {item.requirement} · <span className={item.met ? 'text-green-700' : 'text-red-700'}>{item.currentStatus}</span>
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            {!eligibilityCriteria.every(c => c.met) && (
              <p className="text-xs text-orange-700 mt-3 px-2">
                ⚠️ Requisitos pendentes para progressão
              </p>
            )}
          </div>

          {/* Progressão de Carreira */}
          <div className="bg-white rounded-lg shadow-sm p-6">
            <h2 className="text-lg mb-4">Progressão de Carreira</h2>
            <div className="relative">
              {/* Timeline Line */}
              <div className="absolute left-3 top-0 bottom-0 w-0.5 bg-gray-200" />

              <div className="space-y-6">
                {careerTimeline.map((item, index) => (
                  <div key={index} className="relative flex gap-4">
                    {/* Timeline Dot */}
                    <div className="relative z-10 flex-shrink-0">
                      <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center ${
                        item.type === 'current'
                          ? 'bg-green-500 border-green-500'
                          : item.type === 'next'
                          ? 'bg-blue-500 border-blue-500'
                          : item.type === 'future'
                          ? 'bg-white border-blue-300 border-dashed'
                          : 'bg-gray-400 border-gray-400'
                      }`}>
                        {item.type === 'current' && <div className="w-2 h-2 bg-white rounded-full" />}
                      </div>
                    </div>

                    {/* Content */}
                    <div className={`flex-1 pb-2 ${
                      item.type === 'future' ? 'opacity-60' : ''
                    }`}>
                      <div className="flex items-start justify-between mb-1">
                        <div>
                          <p className={`font-medium ${
                            item.type === 'current' ? 'text-green-700' :
                            item.type === 'next' ? 'text-blue-700' :
                            item.type === 'future' ? 'text-gray-600' :
                            'text-gray-800'
                          }`}>{item.position}</p>
                          <p className="text-sm text-gray-500">{item.level}</p>
                        </div>
                        <div className="text-right">
                          <p className="text-xs text-gray-500">{item.date}</p>
                          <span className={`text-xs px-2 py-0.5 rounded-full ${
                            item.type === 'current' ? 'bg-green-100 text-green-700' :
                            item.type === 'next' ? 'bg-blue-100 text-blue-700' :
                            item.type === 'future' ? 'bg-gray-100 text-gray-600' :
                            'bg-gray-100 text-gray-600'
                          }`}>{item.status}</span>
                        </div>
                      </div>
                      {item.requirements && (
                        <p className="text-xs text-orange-600 mt-1">
                          📋 {item.requirements}
                        </p>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Right Column - 1/3 width */}
        <div className="space-y-6">
          {/* Pró-Activos */}
          <div className="bg-white rounded-lg shadow-sm p-6">
            <h2 className="text-xl mb-4">Pró Activos</h2>
            <div className="space-y-3">
              {objectives.map((obj, index) => (
                <div key={index} className="flex items-start gap-2">
                  <CheckCircle size={16} className="text-green-500 mt-1 flex-shrink-0" />
                  <div>
                    <p className="text-sm">{obj.text}</p>
                    <p className="text-xs text-gray-500">{obj.date}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Última Avaliação */}
          <div className="bg-white rounded-lg shadow-sm p-6">
            <h2 className="text-xl mb-4">Última Avaliação</h2>
            <div className="bg-blue-50 rounded-lg p-4">
              <div className="flex items-center justify-between mb-2">
                <p className="text-3xl text-blue-600">{lastEvaluation.score}</p>
                <TrendingUp className="text-blue-600" size={24} />
              </div>
              <p className="text-sm text-gray-700 mb-1">{lastEvaluation.date}</p>
              <p className="text-xs text-gray-600">{lastEvaluation.details}</p>
            </div>
          </div>

          {/* Próxima Avaliação */}
          <div className="bg-white rounded-lg shadow-sm p-6">
            <h2 className="text-xl mb-4">Próxima Avaliação</h2>
            <div className="bg-purple-50 rounded-lg p-4">
              <div className="flex items-center gap-3 mb-2">
                <Calendar className="text-purple-600" size={24} />
                <p className="text-2xl text-purple-600">{nextEvaluation.month}</p>
              </div>
              <p className="text-sm text-gray-700">{nextEvaluation.date}</p>
              <button className="mt-3 w-full py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 text-sm">
                Criar Chat para acolhedor 5/5 [29]
              </button>
            </div>
          </div>

          {/* Documentos de Referência */}
          <div className="bg-white rounded-lg shadow-sm p-6">
            <h2 className="text-xl mb-4 flex items-center gap-2">
              <FileText size={20} />
              Documentos de Referência
            </h2>
            <div className="p-4 bg-gray-50 rounded-lg">
              <p className="text-sm text-gray-600 mb-2">
                A Avaliação ocorreu tendo documento a confidência e se em outra, do acesso na avaliação
              </p>
              <button className="flex items-center gap-2 text-sm text-blue-600 hover:text-blue-700">
                <Download size={16} />
                Descarregar Documento
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
