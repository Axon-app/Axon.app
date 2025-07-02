# 📋 DOCUMENTACIÓN TÉCNICA COMPLETA - AXON.APP

<!-- Última actualización: 29/06/2025 -->

# 🆕 REGISTRO DE CAMBIOS RECIENTES

- [29/06/2025] Integración de GitHub Copilot y creación de `COPILOT_PROJECT_GUIDE.md` para registro de contexto y cambios.
- [29/06/2025] Revisión y actualización de documentación técnica, mejores prácticas y flujos de trabajo.
- [29/06/2025] Revisión profesional y optimización de todos los archivos fuente y de configuración principales del proyecto (componentes, hooks, datos, servicios, estilos, scripts y configuración).
- [29/06/2025] Mejora y profesionalización de comentarios en todos los archivos revisados, explicando lógica, props, estructura, accesibilidad y funcionamiento.
- [29/06/2025] Inclusión de bloques de sugerencias de mejora profesional al final de cada archivo revisado.
- [29/06/2025] Confirmación de ausencia de código malicioso en todos los archivos revisados.
- [29/06/2025] Limpieza de código malicioso/no usado donde existía (no se detectó en los archivos revisados).
- [29/06/2025] Documentación y sugerencias en archivos vacíos o de utilidad (ej: SuspenseLoader.jsx, ErrorBoundary.jsx, TestComponent.jsx).
- [29/06/2025] Estandarización de documentación y estructura en archivos de configuración y scripts.
- [29/06/2025] Todas las acciones se realizaron mediante herramientas de edición automatizada, asegurando trazabilidad y registro de los cambios.

# 🤖 INTEGRACIÓN DE GITHUB COPILOT

- Copilot está instalado y activo en VS Code.
- Se creó el archivo `COPILOT_PROJECT_GUIDE.md` en la raíz para registrar contexto, cambios y recomendaciones.
- Se recomienda actualizar ese archivo con cada cambio relevante para mantener el contexto claro y evitar errores.

# 🔄 FLUJO DE CI/CD

- El proyecto utiliza GitHub Actions (`.github/workflows/deploy.yml`) para validación, build y despliegue automático a GitHub Pages en cada push a `main`.
- El workflow incluye validación de lint, build, verificación de artefactos y despliegue seguro.

# 🏆 MEJORES PRÁCTICAS Y RECOMENDACIONES

- Ejecutar `npm run lint` y `npm run lint:fix` antes de cada commit.
- Mantener la documentación y comentarios actualizados.
- No exponer secretos ni variables sensibles en el código ni en archivos públicos.
- Usar el archivo `COPILOT_PROJECT_GUIDE.md` como referencia para Copilot y el equipo.

# 📅 FECHA DE ÚLTIMA ACTUALIZACIÓN

- 29 de junio de 2025

---

## 🔍 RESUMEN EJECUTIVO

**Proyecto:** Axon.app - Sitio Web Corporativo
**Versión:** 2.4.0
**Estado:** ✅ Producción Ready
**Tecnología Principal:** React 18 + Vite + Tailwind CSS
**Última Actualización:** 29 de Junio, 2025

---

## 📁 ESTRUCTURA DEL PROYECTO

```
Axon/
├── 📁 public/                           # Archivos estáticos públicos
│   ├── 🖼️ axon-logo-principal.png                      # Logo principal
│   ├── 🖼️ axon-logo-secundario.png                    # Logo alternativo
│   ├── 🖼️ banner-redes-sociales.png                      # Imagen para redes sociales
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
├── 📄 postcss.config.js                 # Configuración PostCSS
├── 📄 jsconfig.json                     # Configuración de paths y autocompletado
├── 📄 package.json                      # Dependencias y scripts
├── 📄 package-lock.json                 # Lockfile de dependencias
├── 📄 index.html                        # Plantilla HTML principal
├── 📄 README.md                         # Documentación del proyecto
├── 📄 TECHNICAL_DOCUMENTATION.md        # Documentación técnica (este archivo)
└── 📄 COPILOT_PROJECT_GUIDE.md          # Registro de contexto y cambios para Copilot
```

---

## 🛠️ TECNOLOGÍAS Y DEPENDENCIAS

### 📦 Dependencias Principales

```json
{
  "react": "^18.2.0",
  "react-dom": "^18.2.0"
}
```

### 🔧 Dependencias de Desarrollo

```json
{
  "@vitejs/plugin-react": "^4.4.1",
  "tailwindcss": "^4.1.10",
  "eslint": "^9.25.0",
  "vite": "^6.3.5",
  "terser": "^5.42.0",
  "autoprefixer": "^10.4.21",
  "@eslint/js": "^9.25.0",
  "@tailwindcss/postcss": "^4.1.10",
  "eslint-plugin-react-hooks": "^5.2.0",
  "eslint-plugin-react-refresh": "^0.4.19",
  "gh-pages": "^6.3.0",
  "globals": "^16.0.0",
  "postcss": "^8.4.31",
  "prop-types": "^15.8.1",
  "rimraf": "^6.0.1"
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

| Componente            | Función                             | Estado                                   |
| --------------------- | ----------------------------------- | ---------------------------------------- |
| `BasicComponents.jsx` | Logo, botones básicos, fondos       | ✅ Documentado                           |
| `Cards.jsx`           | Tarjetas de servicios y testimonios | ✅ Documentado                           |
| `Interactive.jsx`     | Contadores, carruseles, animaciones | ✅ Documentado                           |
| `EmailLink.jsx`       | Selector de cliente de email        | ✅ Documentado                           |
| `SuspenseLoader.jsx`  | Loader para suspense                | 🟡 Documentado, pendiente implementación |
| `ClientCard.jsx`      | Tarjeta de cliente                  | ✅ Documentado                           |

### 📝 Formularios (src/components/forms/)

| Componente               | Función                              | Estado    |
| ------------------------ | ------------------------------------ | --------- |
| `UnifiedContactForm.jsx` | Formulario unificado multi-propósito | ✅ Activo |

### 🪟 Modales (src/components/modals/)

| Modal                   | Función                                   | Estado    |
| ----------------------- | ----------------------------------------- | --------- |
| `UnifiedModals.jsx`     | Modales de contacto, cotización, consulta | ✅ Activo |
| `PrivacyModal.jsx`      | Modal de política de privacidad           | ✅ Activo |
| `TermsModal.jsx`        | Modal de términos y condiciones           | ✅ Activo |
| `CookiesModal.jsx`      | Modal de políticas de cookies             | ✅ Activo |
| `ServiceModal.jsx`      | Modal de detalles de servicios            | ✅ Activo |
| `BlogModal.jsx`         | Modal para posts del blog                 | ✅ Activo |
| `ConsultationModal.jsx` | Modal de consulta                         | ✅ Activo |
| `QuoteModal.jsx`        | Modal de cotización                       | ✅ Activo |

---

## 🔗 HOOKS PERSONALIZADOS

### useModals.js

**Ubicación:** `src/hooks/useModals.js`
**Función:** Gestión centralizada de estados de modales
**API:**

```javascript
const {
  contactModalOpen, // boolean
  quoteModalOpen, // boolean
  consultationModalOpen, // boolean
  openContactModal, // function
  openQuoteModal, // function
  openConsultationModal, // function
  closeContactModal, // function
  closeQuoteModal, // function
  closeConsultationModal, // function
  closeAllModals, // function
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
- Alias personalizados para imports
- Comentarios profesionales y sugerencias de mejora
```

### Tailwind (tailwind.config.js)

```javascript
// Configuración personalizada
- Fuentes custom (Orbitron, Rajdhani)
- Animaciones personalizadas (blob, fadeIn, etc.)
- Gradientes y colores custom
- Responsive design optimizado
- Comentarios profesionales y sugerencias de mejora
```

### PostCSS (postcss.config.js)

```javascript
// Plugins principales
- Tailwind CSS
- Autoprefixer
- Comentarios profesionales y sugerencias de mejora
```

### jsconfig.json

```jsonc
// Configuración de paths y autocompletado
- Alias para imports (@, @components, @hooks, etc.)
- Comentarios profesionales y sugerencias de mejora
```

### index.html

```html
// Plantilla HTML principal - Metaetiquetas SEO, Open Graph, Twitter, WhatsApp - Política CSP
documentada - Comentarios profesionales y sugerencias de mejora
```

---

## 🧪 TESTING Y CALIDAD

### ✅ Tests Realizados

| Test                   | Resultado | Fecha      |
| ---------------------- | --------- | ---------- |
| ESLint (sin errores)   | ✅ PASS   | 29/06/2025 |
| Build de producción    | ✅ PASS   | 29/06/2025 |
| Carga de dependencias  | ✅ PASS   | 29/06/2025 |
| Optimización de assets | ✅ PASS   | 29/06/2025 |

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

| Script        | Comando                 | Función                                   |
| ------------- | ----------------------- | ----------------------------------------- |
| Desarrollo    | `npm run dev`           | Servidor de desarrollo                    |
| Build         | `npm run build`         | Build de producción                       |
| Preview       | `npm run preview`       | Preview del build                         |
| Lint          | `npm run lint`          | Análisis de código                        |
| Lint Fix      | `npm run lint:fix`      | Corrección automática de lint             |
| Clean         | `npm run clean`         | Limpiar directorio dist                   |
| Clean Modules | `npm run clean:modules` | Limpiar node_modules                      |
| Clean All     | `npm run clean:all`     | Limpieza total (dist, node_modules, lock) |
| Clean Build   | `npm run clean:build`   | Limpia y recompila                        |
| Analyze       | `npm run analyze`       | Visualización de bundle                   |
| Deploy        | `npm run deploy`        | Despliegue a GitHub Pages                 |

---

## 📝 COMENTARIOS EN CÓDIGO

### ✅ Archivos Completamente Documentados:

- [x] `src/App.jsx` - Componente principal con comentarios detallados
- [x] `src/main.jsx` - Punto de entrada documentado
- [x] `src/hooks/useModals.js` - Hook completamente documentado
- [x] `src/components/index.jsx` - Exportaciones documentadas
- [x] `src/data/content.js` - Datos documentados
- [x] `vite.config.js` - Configuración documentada
- [x] `tailwind.config.js` - Configuración documentada
- [x] `postcss.config.js` - Configuración documentada
- [x] `jsconfig.json` - Configuración documentada
- [x] `index.html` - Plantilla HTML documentada
- [x] `generate-social-preview.cjs` - Script documentado y optimizado
- [x] `generate-whatsapp-preview.cjs` - Script documentado y optimizado

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
- [x] Sugerencias de mejora profesional documentadas en cada archivo
- [x] Confirmación de ausencia de código malicioso

### 🔄 Ready para Deploy:

- [x] Build exitoso sin errores
- [x] Linting sin warnings
- [x] Código documentado y seguro
- [x] Assets optimizados
- [x] Configuración limpia y profesional

---

## 📞 INFORMACIÓN DE CONTACTO

**Desarrollado por:** Axon.app Team
**Email:** axonapp.info@gmail.com
**Versión:** 2.4.0
**Fecha:** 29 de Junio, 2025

---

_Documentación generada y actualizada automáticamente por GitHub Copilot - Última actualización: 29/06/2025_
