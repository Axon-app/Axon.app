import { UnifiedContactForm } from "../components/forms/UnifiedContactForm";

export default function ValidationTest() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-purple-900 to-violet-900 p-8">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-white mb-4">
            🔐 Prueba de Validaciones Estrictas
          </h1>
          <p className="text-gray-300 text-lg">
            Formulario con validaciones implementadas para nombre, email y
            teléfono
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Formulario de Contacto */}
          <div className="bg-gray-800/50 backdrop-blur-sm rounded-2xl p-6 border border-gray-700">
            <h2 className="text-2xl font-bold text-white mb-4">
              📞 Formulario de Contacto
            </h2>
            <UnifiedContactForm mode="contact" />
          </div>

          {/* Guía de Validaciones */}
          <div className="bg-gray-800/50 backdrop-blur-sm rounded-2xl p-6 border border-gray-700">
            <h2 className="text-2xl font-bold text-white mb-4">
              📋 Guía de Validaciones
            </h2>

            <div className="space-y-6">
              {/* Nombre */}
              <div>
                <h3 className="text-lg font-semibold text-green-400 mb-2">
                  ✅ Nombre Válido
                </h3>
                <ul className="text-sm text-gray-300 space-y-1 ml-4">
                  <li>• "Juan Pérez"</li>
                  <li>• "María José González-López"</li>
                  <li>• "Ana Sofía O'Connor"</li>
                </ul>
                <h3 className="text-lg font-semibold text-red-400 mb-2 mt-3">
                  ❌ Nombre Inválido
                </h3>
                <ul className="text-sm text-gray-300 space-y-1 ml-4">
                  <li>• "Juan123" (números)</li>
                  <li>• "Pedro@email" (símbolos)</li>
                  <li>• "A" (muy corto)</li>
                </ul>
              </div>

              {/* Email */}
              <div>
                <h3 className="text-lg font-semibold text-green-400 mb-2">
                  ✅ Email Válido
                </h3>
                <ul className="text-sm text-gray-300 space-y-1 ml-4">
                  <li>• "usuario@dominio.com"</li>
                  <li>• "nombre.apellido@empresa.co"</li>
                </ul>
                <h3 className="text-lg font-semibold text-red-400 mb-2 mt-3">
                  ❌ Email Inválido
                </h3>
                <ul className="text-sm text-gray-300 space-y-1 ml-4">
                  <li>• "email_sin_arroba.com"</li>
                  <li>• "@dominio.com"</li>
                </ul>
              </div>

              {/* Teléfono */}
              <div>
                <h3 className="text-lg font-semibold text-green-400 mb-2">
                  ✅ Teléfono Válido
                </h3>
                <ul className="text-sm text-gray-300 space-y-1 ml-4">
                  <li>• "3001234567"</li>
                  <li>• "+57 300 123 4567"</li>
                  <li>• "(300) 123-4567"</li>
                </ul>
                <h3 className="text-lg font-semibold text-red-400 mb-2 mt-3">
                  ❌ Teléfono Inválido
                </h3>
                <ul className="text-sm text-gray-300 space-y-1 ml-4">
                  <li>• "abc1234567" (letras)</li>
                  <li>• "123" (muy corto)</li>
                </ul>
              </div>
            </div>

            <div className="mt-6 p-4 bg-blue-900/30 rounded-lg border border-blue-500/30">
              <h4 className="text-blue-300 font-semibold mb-2">
                💡 Características:
              </h4>
              <ul className="text-sm text-blue-200 space-y-1">
                <li>• Validación en tiempo real</li>
                <li>• Filtrado automático de caracteres</li>
                <li>• Mensajes de error específicos</li>
                <li>• HTML5 mejorado con pattern y type</li>
              </ul>
            </div>
          </div>
        </div>

        {/* Instrucciones de Prueba */}
        <div className="mt-8 bg-gradient-to-r from-purple-800/30 to-blue-800/30 rounded-2xl p-6 border border-purple-500/30">
          <h2 className="text-2xl font-bold text-white mb-4">
            🧪 Instrucciones de Prueba
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div>
              <h3 className="text-lg font-semibold text-purple-300 mb-2">
                1. Prueba el Nombre
              </h3>
              <p className="text-sm text-gray-300">
                Intenta escribir números o símbolos en el campo nombre. Verás
                que se filtran automáticamente.
              </p>
            </div>
            <div>
              <h3 className="text-lg font-semibold text-blue-300 mb-2">
                2. Prueba el Email
              </h3>
              <p className="text-sm text-gray-300">
                Escribe un email inválido y observa los mensajes de error
                específicos.
              </p>
            </div>
            <div>
              <h3 className="text-lg font-semibold text-green-300 mb-2">
                3. Prueba el Teléfono
              </h3>
              <p className="text-sm text-gray-300">
                Intenta escribir letras en el teléfono. Solo se permiten números
                y caracteres de formato.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
