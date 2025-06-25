# 📋 DOCUMENTACIÓN TÉCNICA COMPLETA - AXON.APP

## 🔍 RESUMEN EJECUTIVO

**Proyecto:** Axon.app - Sitio Web Corporativo
**Versión:** 2.4.0
**Estado:** ✅ Producción Ready
**Tecnología Principal:** React 18 + Vite + Tailwind CSS
**Última Actualización:** 25 de Junio, 2025

---

## 📁 ESTRUCTURA DEL PROYECTO

```
Axon/
├── 📁 public/                           # Archivos estáticos públicos
│   ├── 🖼️ logo1.png                      # Logo principal
│   ├── 🖼️ logo231.png                    # Logo alternativo
│   ├── 🖼️ redes.png                      # Imagen para redes sociales
│   ├── 📄 favicon.ico & favicon.png     # Favicons
│   └── 📄 site.webmanifest              # Manifiesto PWA
├── 📁 src/                              # Código fuente
│   ├── 📁 components/                   # Componentes React
│   │   ├── 📁 ui/                       # Componentes de UI básicos
│   │   ├── 📁 forms/                    # Formularios
│   │   ├── 📁 modals/                   # Modales del sistema
│   │   └── 📁 sections/                 # Secciones de página
│   ├── 📁 data/                         # Datos estáticos
│   ├── 📁 hooks/                        # Hooks personalizados
│   ├── 📁 services/                     # Servicios y utilidades
│   ├── 📄 App.jsx                       # Componente principal
│   ├── 📄 main.jsx                      # Punto de entrada
│   └── 📄 index.css                     # Estilos globales
├── 📄 vite.config.js                    # Configuración Vite
├── 📄 tailwind.config.js                # Configuración Tailwind
├── 📄 package.json                      # Dependencias y scripts
└── 📄 README.md                         # Documentación del proyecto
```

---

## 🛠️ TECNOLOGÍAS Y DEPENDENCIAS

### 📦 Dependencias Principales
```json
{
  "@fontsource/orbitron": "^5.2.6",     // Fuente principal
  "@fontsource/rajdhani": "^5.2.6",     // Fuente secundaria
  "react": "^18.2.0",                   // Framework principal
  "react-dom": "^18.2.0"                // DOM renderer
}
```

### 🔧 Dependencias de Desarrollo
```json
{
  "@vitejs/plugin-react": "^4.4.1",     // Plugin React para Vite
  "tailwindcss": "^4.1.10",             // Framework CSS
  "eslint": "^9.25.0",                  // Linter de código
  "vite": "^6.3.5",                     // Build tool y dev server
  "terser": "^5.42.0"                   // Minificador de JavaScript
}
```

---

## 📋 COMPONENTES PRINCIPALES

### 🏠 App.jsx - Componente Raíz
**Ubicación:** `src/App.jsx`
**Función:** Componente principal que maneja todo el estado global
**Responsabilidades:**
- ✅ Gestión de estados de modales
- ✅ Navegación y secciones activas
- ✅ Integración de todos los componentes
- ✅ Manejo de eventos globales

### 🎯 Componentes de UI (src/components/ui/)
| Componente | Función | Estado |
|------------|---------|--------|
| `BasicComponents.jsx` | Logo, botones básicos, fondos | ✅ Documentado |
| `Cards.jsx` | Tarjetas de servicios y testimonios | ✅ Documentado |
| `Interactive.jsx` | Contadores, carruseles, animaciones | ✅ Documentado |
| `EmailLink.jsx` | Selector de cliente de email | ✅ Documentado |

### 📝 Formularios (src/components/forms/)
| Componente | Función | Estado |
|------------|---------|--------|
| `UnifiedContactForm.jsx` | Formulario unificado multi-propósito | ✅ Activo |

### 🪟 Modales (src/components/modals/)
| Modal | Función | Estado |
|-------|---------|--------|
| `UnifiedModals.jsx` | Modales de contacto, cotización, consulta | ✅ Activo |
| `PrivacyModal.jsx` | Modal de política de privacidad | ✅ Activo |
| `TermsModal.jsx` | Modal de términos y condiciones | ✅ Activo |
| `CookiesModal.jsx` | Modal de políticas de cookies | ✅ Activo |
| `ServiceModal.jsx` | Modal de detalles de servicios | ✅ Activo |
| `BlogModal.jsx` | Modal para posts del blog | ✅ Activo |

---

## 🔗 HOOKS PERSONALIZADOS

### useModals.js
**Ubicación:** `src/hooks/useModals.js`
**Función:** Gestión centralizada de estados de modales
**API:**
```javascript
const {
  contactModalOpen,           // boolean
  quoteModalOpen,            // boolean
  consultationModalOpen,     // boolean
  openContactModal,          // function
  openQuoteModal,           // function
  openConsultationModal,    // function
  closeContactModal,        // function
  closeQuoteModal,          // function
  closeConsultationModal,   // function
  closeAllModals           // function
} = useModals();
```

### useEmailSelector.js
**Ubicación:** `src/hooks/useEmailSelector.js`
**Función:** Manejo de selección de clientes de email
**Estado:** ✅ Activo

---

## 📊 DATOS Y CONFIGURACIÓN

### content.js
**Ubicación:** `src/data/content.js`
**Contenido:**
- ✅ Array de tecnologías (55+ items)
- ✅ Testimonios de clientes
- ✅ Constantes de categorías y niveles
- ✅ Índices optimizados para búsqueda

### servicesData.js
**Ubicación:** `src/data/servicesData.js`
**Contenido:**
- ✅ Servicios completos con descripciones
- ✅ Precios y características
- ✅ Tecnologías por servicio

---

## ⚙️ CONFIGURACIÓN

### Vite (vite.config.js)
```javascript
// Características principales
- Base path configurable por entorno
- Servidor dev optimizado (puerto 3000)
- Build optimizado con Terser
- Separación automática de chunks
- Sourcemaps en desarrollo
- HMR con overlay de errores
```

### Tailwind (tailwind.config.js)
```javascript
// Configuración personalizada
- Fuentes custom (Orbitron, Rajdhani)
- Animaciones personalizadas (blob, fadeIn, etc.)
- Gradientes y colores custom
- Responsive design optimizado
```

---

## 🧪 TESTING Y CALIDAD

### ✅ Tests Realizados

| Test | Resultado | Fecha |
|------|-----------|-------|
| ESLint (sin errores) | ✅ PASS | 25/06/2025 |
| Build de producción | ✅ PASS | 25/06/2025 |
| Carga de dependencias | ✅ PASS | 25/06/2025 |
| Optimización de assets | ✅ PASS | 25/06/2025 |

### 📈 Métricas de Build
```
📦 Tamaño de archivos finales:
- index.html: 5.85 kB (1.72 kB gzipped)
- CSS: 138.31 kB (17.72 kB gzipped)
- React vendor: 140.21 kB (45.24 kB gzipped)
- App bundle: 258.54 kB (54.39 kB gzipped)
```

---

## 🔧 SCRIPTS DISPONIBLES

| Script | Comando | Función |
|--------|---------|---------|
| Desarrollo | `npm run dev` | Servidor de desarrollo |
| Build | `npm run build` | Build de producción |
| Preview | `npm run preview` | Preview del build |
| Lint | `npm run lint` | Análisis de código |
| Clean | `npm run clean` | Limpiar directorio dist |

---

## 📝 COMENTARIOS EN CÓDIGO

### ✅ Archivos Completamente Documentados:
- [x] `src/App.jsx` - Componente principal con comentarios detallados
- [x] `src/main.jsx` - Punto de entrada documentado
- [x] `src/hooks/useModals.js` - Hook completamente documentado
- [x] `src/components/index.jsx` - Exportaciones documentadas
- [x] `src/data/content.js` - Datos documentados
- [x] `vite.config.js` - Configuración documentada

### 📋 Convenciones de Comentarios:
```javascript
/**
 * TÍTULO DEL COMPONENTE/FUNCIÓN
 * =============================
 *
 * Descripción detallada del propósito y funcionamiento
 *
 * @param {Type} param - Descripción del parámetro
 * @returns {Type} Descripción del retorno
 * @author Axon.app Team
 * @version 2.4.0
 */
```

---

## 🚀 ESTADO ACTUAL DEL PROYECTO

### ✅ Completado:
- [x] Limpieza completa de código
- [x] Documentación técnica exhaustiva
- [x] Comentarios en archivos principales
- [x] Optimizaciones de build
- [x] Eliminación de dependencias innecesarias
- [x] Estructura de archivos organizada
- [x] Testing y validación completa

### 🔄 Ready para Deploy:
- [x] Build exitoso sin errores
- [x] Linting sin warnings
- [x] Código documentado
- [x] Assets optimizados
- [x] Configuración limpia

---

## 📞 INFORMACIÓN DE CONTACTO

**Desarrollado por:** Axon.app Team
**Email:** axonapp.info@gmail.com
**Versión:** 2.4.0
**Fecha:** 25 de Junio, 2025

---

*Documentación generada automáticamente - Última actualización: 25/06/2025*
