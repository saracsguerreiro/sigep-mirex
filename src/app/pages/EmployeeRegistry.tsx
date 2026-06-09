import { useState } from "react";
import { Search, Plus, Filter, Download, Upload, Edit, Eye } from "lucide-react";

export function EmployeeRegistry() {
  const [searchTerm, setSearchTerm] = useState("");
  const [filterCategory, setFilterCategory] = useState("all");

  const employees = [
    {
      id: "001234",
      name: "Ana Paula Silva",
      position: "Diplomata Sénior",
      department: "Embaixada de Lisboa",
      status: "Activo",
      email: "ana.silva@mirex.gov",
      phone: "+244 923 456 789",
      joinDate: "15/03/2018",
    },
    {
      id: "001235",
      name: "Carlos Alberto Mendes",
      position: "Conselheiro",
      department: "Ministério - Luanda",
      status: "Activo",
      email: "carlos.mendes@mirex.gov",
      phone: "+244 923 456 790",
      joinDate: "22/07/2019",
    },
    {
      id: "001236",
      name: "Maria Santos Costa",
      position: "Analista de Relações",
      department: "Divisão de África",
      status: "Em Rotação",
      email: "maria.santos@mirex.gov",
      phone: "+244 923 456 791",
      joinDate: "10/01/2020",
    },
    {
      id: "001237",
      name: "João Pedro Neto",
      position: "Secretário Diplomático",
      department: "Embaixada de Brasília",
      status: "Activo",
      email: "joao.neto@mirex.gov",
      phone: "+244 923 456 792",
      joinDate: "05/09/2017",
    },
    {
      id: "001238",
      name: "Isabel Fernandes",
      position: "Técnica Administrativa",
      department: "Recursos Humanos",
      status: "De Licença",
      email: "isabel.fernandes@mirex.gov",
      phone: "+244 923 456 793",
      joinDate: "18/11/2021",
    },
  ];

  const filteredEmployees = employees.filter((emp) => {
    const matchesSearch =
      emp.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      emp.id.includes(searchTerm) ||
      emp.department.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFilter = filterCategory === "all" || emp.status === filterCategory;
    return matchesSearch && matchesFilter;
  });

  return (
    <div className="p-8">
      {/* Header */}
      <div className="mb-6">
        <h1 className="text-3xl mb-2">Registo & Perfil de Funcionários</h1>
        <p className="text-gray-600">
          Base de dados única, fiável e actualizada de todos os funcionários do MIREX
        </p>
      </div>

      {/* Action Bar */}
      <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
        <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
          <div className="flex-1 w-full md:w-auto">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
              <input
                type="text"
                placeholder="Pesquisar por nome, ID ou departamento..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>

          <div className="flex gap-2 w-full md:w-auto">
            <select
              value={filterCategory}
              onChange={(e) => setFilterCategory(e.target.value)}
              className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="all">Todos os Estados</option>
              <option value="Activo">Activo</option>
              <option value="Em Rotação">Em Rotação</option>
              <option value="De Licença">De Licença</option>
            </select>

            <button className="flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors">
              <Filter size={20} />
              Filtros
            </button>

            <button className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
              <Plus size={20} />
              Novo Funcionário
            </button>
          </div>
        </div>

        <div className="flex gap-2 mt-4">
          <button className="flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors text-sm">
            <Upload size={18} />
            Importar Dados
          </button>
          <button className="flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors text-sm">
            <Download size={18} />
            Exportar
          </button>
        </div>
      </div>

      {/* Statistics */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
        <div className="bg-white rounded-lg shadow-sm p-4">
          <p className="text-sm text-gray-600 mb-1">Total de Funcionários</p>
          <p className="text-2xl">1,247</p>
        </div>
        <div className="bg-white rounded-lg shadow-sm p-4">
          <p className="text-sm text-gray-600 mb-1">Activos</p>
          <p className="text-2xl text-green-600">1,089</p>
        </div>
        <div className="bg-white rounded-lg shadow-sm p-4">
          <p className="text-sm text-gray-600 mb-1">Em Rotação</p>
          <p className="text-2xl text-blue-600">142</p>
        </div>
        <div className="bg-white rounded-lg shadow-sm p-4">
          <p className="text-sm text-gray-600 mb-1">De Licença</p>
          <p className="text-2xl text-orange-600">16</p>
        </div>
      </div>

      {/* Employee Table */}
      <div className="bg-white rounded-lg shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
                <th className="px-6 py-3 text-left text-xs uppercase tracking-wider text-gray-600">
                  ID
                </th>
                <th className="px-6 py-3 text-left text-xs uppercase tracking-wider text-gray-600">
                  Nome
                </th>
                <th className="px-6 py-3 text-left text-xs uppercase tracking-wider text-gray-600">
                  Cargo
                </th>
                <th className="px-6 py-3 text-left text-xs uppercase tracking-wider text-gray-600">
                  Departamento
                </th>
                <th className="px-6 py-3 text-left text-xs uppercase tracking-wider text-gray-600">
                  Estado
                </th>
                <th className="px-6 py-3 text-left text-xs uppercase tracking-wider text-gray-600">
                  Contacto
                </th>
                <th className="px-6 py-3 text-left text-xs uppercase tracking-wider text-gray-600">
                  Acções
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {filteredEmployees.map((employee) => (
                <tr key={employee.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {employee.id}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div>
                      <div className="text-sm text-gray-900">{employee.name}</div>
                      <div className="text-xs text-gray-500">Desde {employee.joinDate}</div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {employee.position}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {employee.department}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span
                      className={`px-3 py-1 inline-flex text-xs rounded-full ${
                        employee.status === "Activo"
                          ? "bg-green-100 text-green-800"
                          : employee.status === "Em Rotação"
                          ? "bg-blue-100 text-blue-800"
                          : "bg-orange-100 text-orange-800"
                      }`}
                    >
                      {employee.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">{employee.email}</div>
                    <div className="text-xs text-gray-500">{employee.phone}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm">
                    <div className="flex gap-2">
                      <button className="p-2 hover:bg-gray-100 rounded-lg transition-colors" title="Ver detalhes">
                        <Eye size={16} className="text-gray-600" />
                      </button>
                      <button className="p-2 hover:bg-gray-100 rounded-lg transition-colors" title="Editar">
                        <Edit size={16} className="text-blue-600" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="px-6 py-4 border-t border-gray-200 flex items-center justify-between">
          <p className="text-sm text-gray-600">
            Mostrando {filteredEmployees.length} de {employees.length} funcionários
          </p>
          <div className="flex gap-2">
            <button className="px-3 py-1 border border-gray-300 rounded hover:bg-gray-50 text-sm">
              Anterior
            </button>
            <button className="px-3 py-1 bg-blue-600 text-white rounded hover:bg-blue-700 text-sm">
              1
            </button>
            <button className="px-3 py-1 border border-gray-300 rounded hover:bg-gray-50 text-sm">
              2
            </button>
            <button className="px-3 py-1 border border-gray-300 rounded hover:bg-gray-50 text-sm">
              Próximo
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
