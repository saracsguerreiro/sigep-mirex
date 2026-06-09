import { useState } from "react";
import { X, User, FileText, Fingerprint, Camera, CheckCircle } from "lucide-react";

interface Props {
  open: boolean;
  onClose: () => void;
}

const steps = [
  { label: "Dados Pessoais", icon: User },
  { label: "Dados Funcionais", icon: FileText },
  { label: "Dados Biométricos", icon: Fingerprint },
];

const emptyForm = {
  fullName: "", email: "", phone: "", birthDate: "",
  nationality: "Angolana", idNumber: "", address: "", city: "", province: "",
  employeeNumber: "", position: "", department: "", entryDate: "",
  contractType: "", workLocation: "",
  photo: null as File | null, fingerprint: false,
};

export function NovoCadastroModal({ open, onClose }: Props) {
  const [step, setStep] = useState(0);
  const [form, setForm] = useState(emptyForm);
  const [done, setDone] = useState(false);

  if (!open) return null;

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setForm(prev => ({ ...prev, [name]: value }));
  };

  const handleClose = () => {
    setStep(0);
    setForm(emptyForm);
    setDone(false);
    onClose();
  };

  const handleSubmit = () => setDone(true);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div className="absolute inset-0 bg-black/50" onClick={handleClose} />
      <div className="relative bg-white rounded-2xl shadow-2xl w-full max-w-2xl mx-4 max-h-[90vh] flex flex-col">

        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-200">
          <h2 className="text-xl">Novo Cadastro de Funcionário</h2>
          <button onClick={handleClose} className="text-gray-400 hover:text-gray-600 transition-colors">
            <X size={22} />
          </button>
        </div>

        {/* Stepper */}
        {!done && (
          <div className="px-8 pt-6 pb-4">
            <div className="flex items-center">
              {steps.map((s, i) => {
                const Icon = s.icon;
                const active = i === step;
                const completed = i < step;
                return (
                  <div key={i} className="flex items-center flex-1 last:flex-none">
                    <div className="flex flex-col items-center">
                      <div className={`w-10 h-10 rounded-full flex items-center justify-center transition-colors ${
                        completed ? "bg-green-500" : active ? "bg-blue-600" : "bg-gray-200"
                      }`}>
                        {completed
                          ? <CheckCircle size={20} className="text-white" />
                          : <Icon size={20} className={active ? "text-white" : "text-gray-400"} />
                        }
                      </div>
                      <span className={`text-xs mt-1.5 whitespace-nowrap ${
                        active ? "text-blue-600 font-medium" : completed ? "text-green-600" : "text-gray-400"
                      }`}>{s.label}</span>
                    </div>
                    {i < steps.length - 1 && (
                      <div className={`flex-1 h-0.5 mx-2 mb-5 transition-colors ${i < step ? "bg-green-400" : "bg-gray-200"}`} />
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* Body */}
        <div className="flex-1 overflow-y-auto px-8 py-4">

          {done ? (
            <div className="flex flex-col items-center justify-center py-12 text-center">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mb-4">
                <CheckCircle size={36} className="text-green-500" />
              </div>
              <h3 className="text-xl mb-2">Cadastro submetido com sucesso!</h3>
              <p className="text-gray-500 text-sm">O registo foi criado e aguarda validação.</p>
            </div>
          ) : step === 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="md:col-span-2">
                <label className="block text-sm mb-1 text-gray-700">Nome Completo</label>
                <input name="fullName" value={form.fullName} onChange={handleChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm" />
              </div>
              <div className="md:col-span-2">
                <label className="block text-sm mb-1 text-gray-700">Email Institucional</label>
                <input name="email" type="email" value={form.email} onChange={handleChange}
                  placeholder="nome.apelido@mirex.gov"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm" />
              </div>
              <div>
                <label className="block text-sm mb-1 text-gray-700">Telefone</label>
                <input name="phone" type="tel" value={form.phone} onChange={handleChange}
                  placeholder="+244 900 000 000"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm" />
              </div>
              <div>
                <label className="block text-sm mb-1 text-gray-700">Data de Nascimento</label>
                <input name="birthDate" type="date" value={form.birthDate} onChange={handleChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm" />
              </div>
              <div>
                <label className="block text-sm mb-1 text-gray-700">Nacionalidade</label>
                <input name="nationality" value={form.nationality} onChange={handleChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm" />
              </div>
              <div>
                <label className="block text-sm mb-1 text-gray-700">Nº Bilhete de Identidade</label>
                <input name="idNumber" value={form.idNumber} onChange={handleChange}
                  placeholder="000000000XX000"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm" />
              </div>
              <div className="md:col-span-2">
                <label className="block text-sm mb-1 text-gray-700">Endereço</label>
                <input name="address" value={form.address} onChange={handleChange}
                  placeholder="Rua, Bairro, Município"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm" />
              </div>
              <div>
                <label className="block text-sm mb-1 text-gray-700">Cidade</label>
                <input name="city" value={form.city} onChange={handleChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm" />
              </div>
              <div>
                <label className="block text-sm mb-1 text-gray-700">Província</label>
                <select name="province" value={form.province} onChange={handleChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm">
                  <option value="">Seleccione...</option>
                  {["Luanda","Benguela","Huíla","Huambo","Cabinda","Uíge","Cuanza Sul","Cuanza Norte","Malanje","Lunda Norte","Lunda Sul","Moxico","Cuando Cubango","Cunene","Namibe","Bié","Zaire","Bengo"].map(p => (
                    <option key={p} value={p}>{p}</option>
                  ))}
                </select>
              </div>
            </div>

          ) : step === 1 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm mb-1 text-gray-700">Nº de Funcionário</label>
                <input name="employeeNumber" value={form.employeeNumber} onChange={handleChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm" />
              </div>
              <div>
                <label className="block text-sm mb-1 text-gray-700">Cargo / Função</label>
                <input name="position" value={form.position} onChange={handleChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm" />
              </div>
              <div className="md:col-span-2">
                <label className="block text-sm mb-1 text-gray-700">Departamento / Divisão</label>
                <input name="department" value={form.department} onChange={handleChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm" />
              </div>
              <div>
                <label className="block text-sm mb-1 text-gray-700">Data de Admissão</label>
                <input name="entryDate" type="date" value={form.entryDate} onChange={handleChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm" />
              </div>
              <div>
                <label className="block text-sm mb-1 text-gray-700">Tipo de Contrato</label>
                <select name="contractType" value={form.contractType} onChange={handleChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm">
                  <option value="">Seleccione...</option>
                  <option value="Efectivo">Efectivo</option>
                  <option value="Contrato">Contrato</option>
                  <option value="Comissão">Comissão de Serviço</option>
                </select>
              </div>
              <div className="md:col-span-2">
                <label className="block text-sm mb-1 text-gray-700">Local de Trabalho</label>
                <input name="workLocation" value={form.workLocation} onChange={handleChange}
                  placeholder="Ex: Sede MIREX – Luanda"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm" />
              </div>
            </div>

          ) : (
            <div className="space-y-6">
              <div>
                <label className="block text-sm mb-2 text-gray-700">Fotografia</label>
                <div className="flex items-center gap-4">
                  <div className="w-28 h-28 bg-gray-100 rounded-xl flex items-center justify-center border-2 border-dashed border-gray-300 overflow-hidden">
                    {form.photo
                      ? <img src={URL.createObjectURL(form.photo)} alt="" className="w-full h-full object-cover" />
                      : <Camera size={28} className="text-gray-400" />
                    }
                  </div>
                  <div>
                    <input type="file" id="modal-photo" accept="image/*" className="hidden"
                      onChange={e => { const f = e.target.files?.[0]; if (f) setForm(p => ({ ...p, photo: f })); }} />
                    <label htmlFor="modal-photo"
                      className="inline-block px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 cursor-pointer transition-colors text-sm">
                      Carregar Fotografia
                    </label>
                    <p className="text-xs text-gray-400 mt-2">JPG ou PNG · máx. 2 MB</p>
                  </div>
                </div>
              </div>
              <div className="p-4 bg-blue-50 border border-blue-200 rounded-xl">
                <div className="flex items-start gap-3">
                  <Fingerprint size={20} className="text-blue-600 mt-0.5 shrink-0" />
                  <div>
                    <p className="text-sm text-gray-700 mb-1">Registo de Impressão Digital</p>
                    <p className="text-xs text-gray-500 mb-3">O funcionário deverá efectuar o registo biométrico presencialmente na Direcção de RH.</p>
                    <label className="flex items-center gap-2 cursor-pointer">
                      <input type="checkbox" checked={form.fingerprint}
                        onChange={e => setForm(p => ({ ...p, fingerprint: e.target.checked }))}
                        className="w-4 h-4 text-blue-600 rounded" />
                      <span className="text-sm text-gray-700">Confirmo que será agendado o registo presencial</span>
                    </label>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="flex items-center justify-between p-6 border-t border-gray-200">
          {!done ? (
            <>
              <button onClick={() => step === 0 ? handleClose() : setStep(s => s - 1)}
                className="px-5 py-2 text-sm text-gray-600 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors">
                {step === 0 ? "Cancelar" : "Anterior"}
              </button>
              {step < steps.length - 1
                ? <button onClick={() => setStep(s => s + 1)}
                    className="px-5 py-2 text-sm bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
                    Próximo
                  </button>
                : <button onClick={handleSubmit}
                    className="px-5 py-2 text-sm bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors">
                    Guardar Cadastro
                  </button>
              }
            </>
          ) : (
            <button onClick={handleClose}
              className="ml-auto px-5 py-2 text-sm bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
              Fechar
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
