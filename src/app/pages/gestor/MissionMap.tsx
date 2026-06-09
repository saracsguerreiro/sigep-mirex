import { useState } from "react";
import { MapPin, Globe, Clock, AlertTriangle, Filter } from "lucide-react";

export function MissionMap() {
  const [filterStatus, setFilterStatus] = useState("all");

  const missions = [
    {
      id: "M001",
      location: "Embaixada de Lisboa",
      country: "Portugal",
      continent: "Europa",
      diplomats: [
        { name: "Ana Paula Silva", duration: "2 anos, 11 meses", status: "warning", startDate: "01/07/2023" },
        { name: "Pedro Alves", duration: "1 ano, 8 meses", status: "normal", startDate: "01/10/2024" },
      ],
    },
    {
      id: "M002",
      location: "Consulado de Paris",
      country: "França",
      continent: "Europa",
      diplomats: [
        { name: "Maria Santos", duration: "2 anos, 8 meses", status: "normal", startDate: "01/10/2023" },
      ],
    },
    {
      id: "M003",
      location: "Embaixada de Brasília",
      country: "Brasil",
      continent: "América do Sul",
      diplomats: [
        { name: "João Neto", duration: "3 anos, 2 meses", status: "critical", startDate: "01/04/2023" },
        { name: "Carlos Mendes", duration: "1 ano, 3 meses", status: "normal", startDate: "01/03/2025" },
      ],
    },
    {
      id: "M004",
      location: "Embaixada de Pequim",
      country: "China",
      continent: "Ásia",
      diplomats: [
        { name: "Lúcia Costa", duration: "2 anos, 10 meses", status: "warning", startDate: "01/08/2023" },
        { name: "Miguel Santos", duration: "1 ano, 5 meses", status: "normal", startDate: "01/01/2025" },
        { name: "Sofia Almeida", duration: "6 meses", status: "normal", startDate: "01/12/2025" },
      ],
    },
    {
      id: "M005",
      location: "Consulado de Luanda",
      country: "Angola",
      continent: "África",
      diplomats: [
        { name: "António Silva", duration: "1 ano, 2 meses", status: "normal", startDate: "01/04/2025" },
      ],
    },
    {
      id: "M006",
      location: "Embaixada de Washington",
      country: "Estados Unidos",
      continent: "América do Norte",
      diplomats: [
        { name: "Beatriz Fernandes", duration: "2 anos, 9 meses", status: "warning", startDate: "01/09/2023" },
        { name: "Ricardo Gomes", duration: "3 anos, 4 meses", status: "critical", startDate: "01/02/2023" },
      ],
    },
  ];

  const getDurationStatus = (duration: string) => {
    if (duration.includes("3 anos") || duration.startsWith("3 anos")) {
      return "critical";
    }
    if (duration.includes("2 anos, 10") || duration.includes("2 anos, 11")) {
      return "warning";
    }
    return "normal";
  };

  const allDiplomats = missions.flatMap((mission) =>
    mission.diplomats.map((d) => ({
      ...d,
      location: mission.location,
      country: mission.country,
      continent: mission.continent,
    }))
  );

  const filteredDiplomats =
    filterStatus === "all"
      ? allDiplomats
      : allDiplomats.filter((d) => d.status === filterStatus);

  const stats = {
    total: allDiplomats.length,
    critical: allDiplomats.filter((d) => d.status === "critical").length,
    warning: allDiplomats.filter((d) => d.status === "warning").length,
    normal: allDiplomats.filter((d) => d.status === "normal").length,
  };

  return (
    <div className="p-8">
      {/* Header */}
      <div className="mb-6">
        <h1 className="text-3xl mb-2">Mapa de Controlo de Missões</h1>
        <p className="text-gray-600">
          Controlo da duração das missões diplomáticas e consulares
        </p>
      </div>

      {/* Statistics */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
        <div className="bg-white rounded-lg shadow-sm p-4">
          <div className="flex items-center justify-between mb-2">
            <p className="text-sm text-gray-600">Total de Diplomatas</p>
            <Globe className="text-blue-600" size={20} />
          </div>
          <p className="text-3xl">{stats.total}</p>
          <p className="text-xs text-gray-500 mt-1">Em {missions.length} missões</p>
        </div>
        <div className="bg-white rounded-lg shadow-sm p-4">
          <div className="flex items-center justify-between mb-2">
            <p className="text-sm text-gray-600">Crítico</p>
            <AlertTriangle className="text-red-600" size={20} />
          </div>
          <p className="text-3xl text-red-600">{stats.critical}</p>
          <p className="text-xs text-gray-500 mt-1">Excederam 3 anos</p>
        </div>
        <div className="bg-white rounded-lg shadow-sm p-4">
          <div className="flex items-center justify-between mb-2">
            <p className="text-sm text-gray-600">Atenção</p>
            <Clock className="text-orange-600" size={20} />
          </div>
          <p className="text-3xl text-orange-600">{stats.warning}</p>
          <p className="text-xs text-gray-500 mt-1">Próximos do limite</p>
        </div>
        <div className="bg-white rounded-lg shadow-sm p-4">
          <div className="flex items-center justify-between mb-2">
            <p className="text-sm text-gray-600">Normal</p>
            <MapPin className="text-green-600" size={20} />
          </div>
          <p className="text-3xl text-green-600">{stats.normal}</p>
          <p className="text-xs text-gray-500 mt-1">Dentro do prazo</p>
        </div>
      </div>

      {/* Filters */}
      <div className="bg-white rounded-lg shadow-sm p-4 mb-6">
        <div className="flex items-center gap-3">
          <Filter size={20} className="text-gray-600" />
          <div className="flex gap-2">
            <button
              onClick={() => setFilterStatus("all")}
              className={`px-4 py-2 rounded-lg transition-colors ${
                filterStatus === "all"
                  ? "bg-blue-600 text-white"
                  : "bg-gray-100 text-gray-700 hover:bg-gray-200"
              }`}
            >
              Todos ({stats.total})
            </button>
            <button
              onClick={() => setFilterStatus("critical")}
              className={`px-4 py-2 rounded-lg transition-colors ${
                filterStatus === "critical"
                  ? "bg-red-600 text-white"
                  : "bg-gray-100 text-gray-700 hover:bg-gray-200"
              }`}
            >
              Crítico ({stats.critical})
            </button>
            <button
              onClick={() => setFilterStatus("warning")}
              className={`px-4 py-2 rounded-lg transition-colors ${
                filterStatus === "warning"
                  ? "bg-orange-600 text-white"
                  : "bg-gray-100 text-gray-700 hover:bg-gray-200"
              }`}
            >
              Atenção ({stats.warning})
            </button>
            <button
              onClick={() => setFilterStatus("normal")}
              className={`px-4 py-2 rounded-lg transition-colors ${
                filterStatus === "normal"
                  ? "bg-green-600 text-white"
                  : "bg-gray-100 text-gray-700 hover:bg-gray-200"
              }`}
            >
              Normal ({stats.normal})
            </button>
          </div>
        </div>
      </div>

      {/* Missions Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
        {missions.map((mission) => (
          <div key={mission.id} className="bg-white rounded-lg shadow-sm">
            <div className="p-6 border-b border-gray-200">
              <div className="flex items-start justify-between">
                <div>
                  <div className="flex items-center gap-2 mb-2">
                    <MapPin className="text-blue-600" size={20} />
                    <h3 className="text-lg">{mission.location}</h3>
                  </div>
                  <p className="text-sm text-gray-600">
                    {mission.country} • {mission.continent}
                  </p>
                </div>
                <span className="px-3 py-1 bg-blue-100 text-blue-700 text-sm rounded">
                  {mission.diplomats.length} diplomata{mission.diplomats.length > 1 ? "s" : ""}
                </span>
              </div>
            </div>
            <div className="p-6">
              <div className="space-y-3">
                {mission.diplomats.map((diplomat, index) => (
                  <div
                    key={index}
                    className={`p-4 border-l-4 rounded-lg ${
                      diplomat.status === "critical"
                        ? "border-red-500 bg-red-50"
                        : diplomat.status === "warning"
                        ? "border-orange-500 bg-orange-50"
                        : "border-green-500 bg-green-50"
                    }`}
                  >
                    <div className="flex items-start justify-between mb-2">
                      <div>
                        <p className="mb-1">{diplomat.name}</p>
                        <p className="text-sm text-gray-600">Início: {diplomat.startDate}</p>
                      </div>
                      <span
                        className={`px-2 py-1 rounded text-xs ${
                          diplomat.status === "critical"
                            ? "bg-red-200 text-red-800"
                            : diplomat.status === "warning"
                            ? "bg-orange-200 text-orange-800"
                            : "bg-green-200 text-green-800"
                        }`}
                      >
                        {diplomat.duration}
                      </span>
                    </div>
                    {diplomat.status === "critical" && (
                      <p className="text-xs text-red-700 flex items-center gap-1">
                        <AlertTriangle size={12} />
                        Excedeu o limite recomendado de 3 anos
                      </p>
                    )}
                    {diplomat.status === "warning" && (
                      <p className="text-xs text-orange-700 flex items-center gap-1">
                        <Clock size={12} />
                        Próximo do limite de 3 anos
                      </p>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Timeline View */}
      <div className="bg-white rounded-lg shadow-sm p-6">
        <h2 className="text-xl mb-4">Lista Completa por Duração</h2>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
                <th className="px-6 py-3 text-left text-xs uppercase tracking-wider text-gray-600">
                  Diplomata
                </th>
                <th className="px-6 py-3 text-left text-xs uppercase tracking-wider text-gray-600">
                  Missão
                </th>
                <th className="px-6 py-3 text-left text-xs uppercase tracking-wider text-gray-600">
                  País
                </th>
                <th className="px-6 py-3 text-left text-xs uppercase tracking-wider text-gray-600">
                  Início
                </th>
                <th className="px-6 py-3 text-left text-xs uppercase tracking-wider text-gray-600">
                  Duração
                </th>
                <th className="px-6 py-3 text-left text-xs uppercase tracking-wider text-gray-600">
                  Estado
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {filteredDiplomats
                .sort((a, b) => {
                  const getMonths = (duration: string) => {
                    const match = duration.match(/(\d+)\s*anos?,?\s*(\d+)?\s*meses?|(\d+)\s*meses?/);
                    if (!match) return 0;
                    const years = parseInt(match[1] || "0") || 0;
                    const months = parseInt(match[2] || match[3] || "0");
                    return years * 12 + months;
                  };
                  return getMonths(b.duration) - getMonths(a.duration);
                })
                .map((diplomat, index) => (
                  <tr key={index} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap text-sm">
                      {diplomat.name}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm">
                      {diplomat.location}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm">
                      {diplomat.country}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                      {diplomat.startDate}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm">
                      {diplomat.duration}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span
                        className={`px-3 py-1 inline-flex text-xs rounded-full ${
                          diplomat.status === "critical"
                            ? "bg-red-100 text-red-800"
                            : diplomat.status === "warning"
                            ? "bg-orange-100 text-orange-800"
                            : "bg-green-100 text-green-800"
                        }`}
                      >
                        {diplomat.status === "critical"
                          ? "Crítico"
                          : diplomat.status === "warning"
                          ? "Atenção"
                          : "Normal"}
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
