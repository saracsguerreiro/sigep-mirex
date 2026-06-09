import { useState } from "react";
import { useNavigate } from "react-router";
import { useAuth } from "../../contexts/AuthContext";
import { User, Phone, MapPin, Calendar, FileText, Fingerprint, Camera, Save } from "lucide-react";

export function ProfileUpdate() {
  const { user, updateProfile } = useAuth();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    // Dados Pessoais
    fullName: user?.name || "",
    email: user?.email || "",
    phone: "",
    birthDate: "",
    nationality: "Angolana",
    idNumber: "",
    address: "",
    city: "",
    province: "",

    // Dados Funcionais
    employeeNumber: user?.employeeNumber || "",
    position: user?.position || "",
    department: user?.department || "",
    entryDate: "",
    contractType: "",
    workLocation: "",

    // Dados Biométricos
    photo: null as File | null,
    fingerprint: false,
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    updateProfile({ isProfileComplete: true });
    navigate("/user/dashboard");
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
          <h1 className="text-2xl mb-2">Actualização de Cadastro</h1>
          <p className="text-gray-600 text-sm">
            Complete ou valide os seus dados pessoais, funcionais e biométricos
          </p>
        </div>

        <form onSubmit={handleSubmit}>
          {/* Dados Pessoais */}
          <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
            <div className="flex items-center gap-3 mb-6 pb-4 border-b border-gray-200">
              <div className="bg-blue-100 p-2 rounded-lg">
                <User className="text-blue-600" size={24} />
              </div>
              <h2 className="text-xl">Dados Pessoais</h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="md:col-span-2">
                <label className="block text-sm mb-2 text-gray-700">
                  Nome Completo <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  name="fullName"
                  value={formData.fullName}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-gray-50"
                  readOnly
                />
              </div>

              <div className="md:col-span-2">
                <label className="block text-sm mb-2 text-gray-700">
                  Email Institucional <span className="text-red-500">*</span>
                </label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-gray-50"
                  readOnly
                />
              </div>

              <div>
                <label className="block text-sm mb-2 text-gray-700">
                  Telefone <span className="text-red-500">*</span>
                </label>
                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  placeholder="+244 900 000 000"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                />
              </div>

              <div>
                <label className="block text-sm mb-2 text-gray-700">
                  Data de Nascimento <span className="text-red-500">*</span>
                </label>
                <input
                  type="date"
                  name="birthDate"
                  value={formData.birthDate}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                />
              </div>

              <div>
                <label className="block text-sm mb-2 text-gray-700">
                  Nacionalidade <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  name="nationality"
                  value={formData.nationality}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                />
              </div>

              <div>
                <label className="block text-sm mb-2 text-gray-700">
                  Nº do Bilhete de Identidade <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  name="idNumber"
                  value={formData.idNumber}
                  onChange={handleChange}
                  placeholder="000000000XX000"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                />
              </div>

              <div className="md:col-span-2">
                <label className="block text-sm mb-2 text-gray-700">
                  Endereço Completo <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  name="address"
                  value={formData.address}
                  onChange={handleChange}
                  placeholder="Rua, Bairro, Município"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                />
              </div>

              <div>
                <label className="block text-sm mb-2 text-gray-700">
                  Cidade <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  name="city"
                  value={formData.city}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                />
              </div>

              <div>
                <label className="block text-sm mb-2 text-gray-700">
                  Província <span className="text-red-500">*</span>
                </label>
                <select
                  name="province"
                  value={formData.province}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                >
                  <option value="">Seleccione...</option>
                  <option value="Luanda">Luanda</option>
                  <option value="Benguela">Benguela</option>
                  <option value="Huíla">Huíla</option>
                  <option value="Huambo">Huambo</option>
                  <option value="Cabinda">Cabinda</option>
                  <option value="Uíge">Uíge</option>
                  <option value="Cuanza Sul">Cuanza Sul</option>
                  <option value="Cuanza Norte">Cuanza Norte</option>
                  <option value="Malanje">Malanje</option>
                  <option value="Lunda Norte">Lunda Norte</option>
                  <option value="Lunda Sul">Lunda Sul</option>
                  <option value="Moxico">Moxico</option>
                  <option value="Cuando Cubango">Cuando Cubango</option>
                  <option value="Cunene">Cunene</option>
                  <option value="Namibe">Namibe</option>
                  <option value="Bié">Bié</option>
                  <option value="Zaire">Zaire</option>
                  <option value="Bengo">Bengo</option>
                </select>
              </div>
            </div>
          </div>

          {/* Dados Funcionais */}
          <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
            <div className="flex items-center gap-3 mb-6 pb-4 border-b border-gray-200">
              <div className="bg-green-100 p-2 rounded-lg">
                <FileText className="text-green-600" size={24} />
              </div>
              <h2 className="text-xl">Dados Funcionais</h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm mb-2 text-gray-700">
                  Nº de Funcionário
                </label>
                <input
                  type="text"
                  name="employeeNumber"
                  value={formData.employeeNumber}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg bg-gray-50"
                  readOnly
                />
              </div>

              <div>
                <label className="block text-sm mb-2 text-gray-700">
                  Cargo/Função
                </label>
                <input
                  type="text"
                  name="position"
                  value={formData.position}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg bg-gray-50"
                  readOnly
                />
              </div>

              <div className="md:col-span-2">
                <label className="block text-sm mb-2 text-gray-700">
                  Departamento/Divisão
                </label>
                <input
                  type="text"
                  name="department"
                  value={formData.department}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg bg-gray-50"
                  readOnly
                />
              </div>

              <div>
                <label className="block text-sm mb-2 text-gray-700">
                  Data de Admissão <span className="text-red-500">*</span>
                </label>
                <input
                  type="date"
                  name="entryDate"
                  value={formData.entryDate}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                />
              </div>

              <div>
                <label className="block text-sm mb-2 text-gray-700">
                  Tipo de Contrato <span className="text-red-500">*</span>
                </label>
                <select
                  name="contractType"
                  value={formData.contractType}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                >
                  <option value="">Seleccione...</option>
                  <option value="Efectivo">Efectivo</option>
                  <option value="Contrato">Contrato</option>
                  <option value="Comissão">Comissão de Serviço</option>
                </select>
              </div>

              <div className="md:col-span-2">
                <label className="block text-sm mb-2 text-gray-700">
                  Local de Trabalho Actual <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  name="workLocation"
                  value={formData.workLocation}
                  onChange={handleChange}
                  placeholder="Ex: Sede MIREX - Luanda"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                />
              </div>
            </div>
          </div>

          {/* Dados Biométricos */}
          <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
            <div className="flex items-center gap-3 mb-6 pb-4 border-b border-gray-200">
              <div className="bg-purple-100 p-2 rounded-lg">
                <Fingerprint className="text-purple-600" size={24} />
              </div>
              <h2 className="text-xl">Dados Biométricos</h2>
            </div>

            <div className="space-y-4">
              <div>
                <label className="block text-sm mb-2 text-gray-700">
                  Fotografia <span className="text-red-500">*</span>
                </label>
                <div className="flex items-center gap-4">
                  <div className="w-32 h-32 bg-gray-100 rounded-lg flex items-center justify-center border-2 border-dashed border-gray-300">
                    {formData.photo ? (
                      <img src={URL.createObjectURL(formData.photo)} alt="Preview" className="w-full h-full object-cover rounded-lg" />
                    ) : (
                      <Camera className="text-gray-400" size={32} />
                    )}
                  </div>
                  <div>
                    <input
                      type="file"
                      id="photo"
                      accept="image/*"
                      onChange={(e) => {
                        const file = e.target.files?.[0];
                        if (file) {
                          setFormData(prev => ({ ...prev, photo: file }));
                        }
                      }}
                      className="hidden"
                      required
                    />
                    <label
                      htmlFor="photo"
                      className="inline-block px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 cursor-pointer transition-colors"
                    >
                      Carregar Fotografia
                    </label>
                    <p className="text-xs text-gray-500 mt-2">Formato: JPG, PNG (máx. 2MB)</p>
                  </div>
                </div>
              </div>

              <div className="p-4 bg-blue-50 border border-blue-200 rounded-lg">
                <div className="flex items-start gap-3">
                  <Fingerprint className="text-blue-600 mt-1" size={20} />
                  <div>
                    <p className="text-sm text-gray-700 mb-2">
                      Registo de Impressão Digital
                    </p>
                    <p className="text-xs text-gray-600 mb-3">
                      Será necessário registar as suas impressões digitais na Direcção de Recursos Humanos
                    </p>
                    <label className="flex items-center gap-2 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={formData.fingerprint}
                        onChange={(e) => setFormData(prev => ({ ...prev, fingerprint: e.target.checked }))}
                        className="w-4 h-4 text-blue-600 rounded focus:ring-2 focus:ring-blue-500"
                      />
                      <span className="text-sm text-gray-700">Confirmo que farei o registo presencialmente</span>
                    </label>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Submit Button */}
          <div className="bg-white rounded-lg shadow-sm p-6">
            <div className="flex items-center justify-between">
              <p className="text-sm text-gray-600">
                Todos os campos marcados com <span className="text-red-500">*</span> são obrigatórios
              </p>
              <button
                type="submit"
                className="flex items-center gap-2 px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
              >
                <Save size={20} />
                Guardar e Continuar
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}
