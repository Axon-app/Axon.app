import React from "react";

export const TestModal = ({ isOpen, onClose }) => {
  const [formData, setFormData] = React.useState({
    name: "",
    projectType: "",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/70 z-[9999] flex items-center justify-center p-4">
      <div className="bg-slate-800 rounded-xl max-w-md w-full p-6">
        <h2 className="text-xl font-bold text-white mb-4">Test Modal</h2>

        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              Nombre
            </label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleInputChange}
              className="w-full p-3 bg-slate-700 border border-gray-600 rounded-lg text-white"
              placeholder="Escribe tu nombre"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              Tipo de Proyecto
            </label>
            <select
              name="projectType"
              value={formData.projectType}
              onChange={handleInputChange}
              className="w-full p-3 bg-slate-700 border border-gray-600 rounded-lg text-white"
            >
              <option value="">Selecciona...</option>
              <option value="web">Desarrollo Web</option>
              <option value="mobile">App Móvil</option>
            </select>
          </div>

          <div className="flex justify-end space-x-2">
            <button
              onClick={onClose}
              className="px-4 py-2 bg-gray-600 text-white rounded-lg"
            >
              Cerrar
            </button>
            <button
              onClick={() =>
                alert(
                  `Nombre: ${formData.name}, Proyecto: ${formData.projectType}`
                )
              }
              className="px-4 py-2 bg-blue-600 text-white rounded-lg"
            >
              Test
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
