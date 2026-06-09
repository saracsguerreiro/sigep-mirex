import { TrendingUp, Award, BookOpen, Target, Star } from "lucide-react";

export function CareerEvaluation() {
  const evaluations = [
    {
      employee: "Ana Paula Silva",
      position: "Diplomata Sénior",
      period: "Q1 2026",
      score: 4.5,
      status: "Concluída",
      nextReview: "01/07/2026",
    },
    {
      employee: "Carlos Alberto Mendes",
      position: "Conselheiro",
      period: "Q1 2026",
      score: 4.8,
      status: "Concluída",
      nextReview: "01/07/2026",
    },
    {
      employee: "Maria Santos Costa",
      position: "Analista de Relações",
      period: "Q2 2026",
      score: null,
      status: "Em Avaliação",
      nextReview: "15/06/2026",
    },
    {
      employee: "João Pedro Neto",
      position: "Secretário Diplomático",
      period: "Q1 2026",
      score: 4.2,
      status: "Concluída",
      nextReview: "01/07/2026",
    },
  ];

  const trainingPrograms = [
    {
      title: "Protocolo Diplomático Avançado",
      participants: 24,
      duration: "6 semanas",
      status: "Em Curso",
      completion: 60,
    },
    {
      title: "Gestão de Crises Internacionais",
      participants: 18,
      duration: "4 semanas",
      status: "Planeado",
      completion: 0,
    },
    {
      title: "Negociação Multilateral",
      participants: 32,
      duration: "8 semanas",
      status: "Em Curso",
      completion: 35,
    },
    {
      title: "Direito Internacional",
      participants: 15,
      duration: "12 semanas",
      status: "Concluído",
      completion: 100,
    },
  ];

  const careerProgressions = [
    {
      employee: "Sofia Almeida",
      from: "Analista Júnior",
      to: "Analista Sénior",
      date: "01/04/2026",
      type: "Promoção",
    },
    {
      employee: "Pedro Martins",
      from: "Secretário",
      to: "Conselheiro",
      date: "15/03/2026",
      type: "Promoção",
    },
    {
      employee: "Lúcia Santos",
      from: "Técnica",
      to: "Técnica Especialista",
      date: "01/05/2026",
      type: "Progressão",
    },
  ];

  return (
    <div className="p-8">
      {/* Header */}
      <div className="mb-6">
        <h1 className="text-3xl mb-2">Avaliação & Carreira</h1>
        <p className="text-gray-600">
          Controlo de desempenho, formação de carreira e progressões profissionais
        </p>
      </div>

      {/* Statistics */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
        <div className="bg-white rounded-lg shadow-sm p-4">
          <div className="flex items-center justify-between mb-2">
            <p className="text-sm text-gray-600">Avaliações Concluídas</p>
            <Star className="text-yellow-500" size={20} />
          </div>
          <p className="text-2xl">156</p>
          <p className="text-xs text-gray-500 mt-1">Este trimestre</p>
        </div>
        <div className="bg-white rounded-lg shadow-sm p-4">
          <div className="flex items-center justify-between mb-2">
            <p className="text-sm text-gray-600">Em Avaliação</p>
            <Target className="text-blue-600" size={20} />
          </div>
          <p className="text-2xl">89</p>
          <p className="text-xs text-gray-500 mt-1">Pendentes</p>
        </div>
        <div className="bg-white rounded-lg shadow-sm p-4">
          <div className="flex items-center justify-between mb-2">
            <p className="text-sm text-gray-600">Programas de Formação</p>
            <BookOpen className="text-green-600" size={20} />
          </div>
          <p className="text-2xl">12</p>
          <p className="text-xs text-gray-500 mt-1">Activos</p>
        </div>
        <div className="bg-white rounded-lg shadow-sm p-4">
          <div className="flex items-center justify-between mb-2">
            <p className="text-sm text-gray-600">Progressões (2026)</p>
            <TrendingUp className="text-purple-600" size={20} />
          </div>
          <p className="text-2xl">34</p>
          <p className="text-xs text-gray-500 mt-1">Aprovadas</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Performance Evaluations */}
        <div className="bg-white rounded-lg shadow-sm">
          <div className="p-6 border-b border-gray-200">
            <h2 className="text-xl">Avaliações de Desempenho</h2>
          </div>
          <div className="p-6">
            <div className="space-y-4">
              {evaluations.map((evaluation, index) => (
                <div
                  key={index}
                  className="p-4 border border-gray-200 rounded-lg hover:border-blue-300 transition-colors"
                >
                  <div className="flex items-start justify-between mb-2">
                    <div>
                      <p className="mb-1">{evaluation.employee}</p>
                      <p className="text-sm text-gray-600">{evaluation.position}</p>
                    </div>
                    {evaluation.score && (
                      <div className="flex items-center gap-2 bg-yellow-50 px-3 py-1 rounded-lg">
                        <Star size={16} className="text-yellow-500 fill-yellow-500" />
                        <span className="text-sm">{evaluation.score}/5.0</span>
                      </div>
                    )}
                  </div>
                  <div className="flex items-center justify-between text-sm mt-3">
                    <span className="text-gray-600">Período: {evaluation.period}</span>
                    <span
                      className={`px-3 py-1 rounded-full text-xs ${
                        evaluation.status === "Concluída"
                          ? "bg-green-100 text-green-800"
                          : "bg-blue-100 text-blue-800"
                      }`}
                    >
                      {evaluation.status}
                    </span>
                  </div>
                  <p className="text-xs text-gray-500 mt-2">
                    Próxima avaliação: {evaluation.nextReview}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Training Programs */}
        <div className="bg-white rounded-lg shadow-sm">
          <div className="p-6 border-b border-gray-200">
            <h2 className="text-xl">Programas de Formação</h2>
          </div>
          <div className="p-6">
            <div className="space-y-4">
              {trainingPrograms.map((program, index) => (
                <div key={index} className="p-4 border border-gray-200 rounded-lg">
                  <div className="flex items-start justify-between mb-3">
                    <div>
                      <p className="mb-1">{program.title}</p>
                      <p className="text-sm text-gray-600">
                        {program.participants} participantes • {program.duration}
                      </p>
                    </div>
                    <span
                      className={`px-3 py-1 rounded-full text-xs ${
                        program.status === "Concluído"
                          ? "bg-green-100 text-green-800"
                          : program.status === "Em Curso"
                          ? "bg-blue-100 text-blue-800"
                          : "bg-gray-100 text-gray-800"
                      }`}
                    >
                      {program.status}
                    </span>
                  </div>
                  {program.completion > 0 && (
                    <div>
                      <div className="flex items-center justify-between text-sm mb-1">
                        <span className="text-gray-600">Progresso</span>
                        <span className="text-gray-900">{program.completion}%</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div
                          className="bg-blue-600 h-2 rounded-full transition-all"
                          style={{ width: `${program.completion}%` }}
                        />
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Career Progressions */}
      <div className="mt-6 bg-white rounded-lg shadow-sm">
        <div className="p-6 border-b border-gray-200 flex items-center justify-between">
          <h2 className="text-xl">Progressões de Carreira Recentes</h2>
          <Award className="text-purple-600" size={24} />
        </div>
        <div className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {careerProgressions.map((progression, index) => (
              <div
                key={index}
                className="p-4 border-l-4 border-purple-500 bg-purple-50 rounded"
              >
                <p className="mb-2">{progression.employee}</p>
                <div className="flex items-center gap-2 text-sm text-gray-700 mb-2">
                  <span>{progression.from}</span>
                  <TrendingUp size={16} className="text-purple-600" />
                  <span>{progression.to}</span>
                </div>
                <div className="flex items-center justify-between text-xs text-gray-600">
                  <span>{progression.date}</span>
                  <span className="px-2 py-1 bg-purple-200 text-purple-800 rounded">
                    {progression.type}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Performance Distribution */}
      <div className="mt-6 bg-white rounded-lg shadow-sm p-6">
        <h2 className="text-xl mb-4">Distribuição de Desempenho (Q1 2026)</h2>
        <div className="grid grid-cols-5 gap-4">
          {[
            { label: "Excepcional (5.0)", count: 12, color: "bg-green-500" },
            { label: "Muito Bom (4.0-4.9)", count: 48, color: "bg-blue-500" },
            { label: "Bom (3.0-3.9)", count: 72, color: "bg-yellow-500" },
            { label: "Satisfatório (2.0-2.9)", count: 18, color: "bg-orange-500" },
            { label: "Requer Melhoria (<2.0)", count: 6, color: "bg-red-500" },
          ].map((item, index) => (
            <div key={index} className="text-center">
              <div className={`${item.color} h-32 rounded-lg mb-2 flex items-end justify-center pb-2 text-white`}>
                <span className="text-2xl">{item.count}</span>
              </div>
              <p className="text-xs text-gray-600">{item.label}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
