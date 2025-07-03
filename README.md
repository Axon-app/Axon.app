# 🚀 Axon.App - Sitio Web Corporativo v2.4.0

> **🌐 Sitio live**: [https://axon-app.github.io/Axon.app/](https://axon-app.github.io/Axon.app/)

[![Vite](https://img.shields.io/badge/Vite-6.3.5-646CFF?logo=vite&logoColor=white)](https://vitejs.dev/)
[![React](https://img.shields.io/badge/React-18+-61DAFB?logo=react&logoColor=white)](https://reactjs.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind-4.1+-38B2AC?logo=tailwind-css&logoColor=white)](https://tailwindcss.com/)

> **Sitio web profesional moderno para Axon.App** - Soluciones tecnológicas innovadoras con sistema completo de formularios, modales y captación de leads. Documentación, código y configuración revisados y optimizados profesionalmente.

---

## ✨ Características Principales

### 🎨 **Diseño y UX**

- ✅ **Diseño Moderno y Profesional** - Interfaz elegante con gradientes y animaciones
- ✅ **Totalmente Responsivo** - Optimizado para móviles, tablets y desktop
- ✅ **Animaciones Suaves** - Transiciones y efectos visuales atractivos
- ✅ **Logo y Branding Integrado** - Identidad visual consistente

### 🎯 **Contenido Empresarial**

- ✅ **Sección Misión y Visión** - Rediseñada con valores y objetivos
- ✅ **6 Servicios Principales** - Desarrollo Web, Apps, AI, etc.
- ✅ **Modales Detallados** - Información completa de cada servicio
- ✅ **Base de Datos de Servicios** - Procesos, tecnologías y características
- ✅ **Sección de Tecnologías** - Stack técnico organizado por categorías
- ✅ **Contadores Animados** - Estadísticas de proyectos y logros
- ✅ **Banner de Testimonios** - Carrusel automático con opiniones de clientes
- ✅ **Sección de Contacto Profesional** - Formulario avanzado con WhatsApp integrado
- ✅ **Información de Contacto Completa** - Email axonapp.info@gmail.com y ubicación

## 📧 **Sistema de Formularios Avanzado**

- ✅ **Formulario de Contacto** - Contacto directo desde el sitio
- ✅ **Solicitud de Propuesta** - Formulario detallado para presupuestos
- ✅ **Agendar Consulta** - Sistema de agendamiento de citas
- ✅ **Validación Completa** - Validación HTML5 y feedback visual
- ✅ **Modales Profesionales** - Sistema avanzado de modales especializados

### ⚡ **Rendimiento y Técnica**

- ✅ **Alto Rendimiento** - Construido con Vite para máxima velocidad
- ✅ **Arquitectura Modular** - Componentes React reutilizables
- ✅ **Configuración Optimizada** - Vite, Tailwind y PostCSS revisados y documentados
- ✅ **Build profesional** - Separación de chunks, minificación, assets optimizados

## 🛠️ Stack Tecnológico

- **Frontend:** React 18+ con Hooks modernos
- **Build Tool:** Vite 6.3.5 (ultra-rápido)
- **Styling:** Tailwind CSS 4.1+ (utility-first)
- **Contact System:** Sistema de formularios (modo demo funcional)
- **Fuentes:** Orbitron + Rajdhani (Google Fonts)
- **Canvas:** Canvas API para generación de imágenes sociales
- **Control de Versiones:** Git

## 🏃‍♂️ Inicio Rápido

### Prerrequisitos

- Node.js 18+
- npm o yarn
- Git

### Instalación

```bash
# Clonar el repositorio
git clone [URL_DEL_REPOSITORIO]
cd Axon

# Instalar dependencias
npm install

# Iniciar servidor de desarrollo
npm run dev

# Abrir http://localhost:3000/
```

### Scripts Disponibles

```bash
npm run dev                 # Servidor de desarrollo
npm run build               # Build para producción
npm run preview             # Preview del build
npm run lint                # Linting del código
npm run lint:fix            # Corrección automática de lint
npm run clean               # Limpiar archivos build
npm run clean:modules       # Limpiar node_modules
npm run clean:all           # Limpieza total (dist, node_modules, lock)
npm run clean:build         # Limpia y recompila
npm run analyze             # Visualización de bundle
npm run deploy              # Despliegue a GitHub Pages
```

---

## 📁 Estructura del Proyecto

```
Axon/
├── 📁 public/                      # Archivos públicos
│   ├── 🖼️ axon-logo-principal.png               # Logo principal
│   ├── 📄 favicon.ico             # Favicon
│   ├── 📄 og-image.png            # Imagen social
│   ├── 📄 twitter-image.png       # Imagen Twitter
│   └── 📄 whatsapp-image.png      # Imagen WhatsApp
├── 📁 src/
│   ├── 📁 components/
│   │   ├── 📁 ui/                  # Componentes UI básicos
│   │   ├── 📁 forms/               # Formularios
│   │   ├── 📁 modals/              # Sistema de modales
│   │   ├── 📁 sections/            # Secciones de página
│   │   └── 📄 index.jsx            # Barrel exports
│   ├── 📁 data/                    # Datos de contenido y servicios
│   ├── 📁 hooks/                   # Hooks personalizados
│   ├── 📁 services/                # Servicios y utilidades
│   ├── 📄 App.jsx                  # Componente principal
│   ├── 📄 index.css                # Estilos globales
│   └── 📄 main.jsx                 # Punto de entrada
├── 📄 vite.config.js               # Configuración Vite
├── 📄 tailwind.config.js           # Configuración Tailwind
├── 📄 postcss.config.js            # Configuración PostCSS
├── 📄 jsconfig.json                # Configuración de paths
├── 📄 package.json                 # Dependencias y scripts
├── 📄 index.html                   # Plantilla HTML principal
├── 📄 TECHNICAL_DOCUMENTATION.md   # Documentación técnica
└── 📄 COPILOT_PROJECT_GUIDE.md     # Registro de contexto y cambios
```

## 🎨 Componentes Principales

### Arquitectura Modular

- `BasicComponents.jsx`, `Cards.jsx`, `Interactive.jsx`, `EmailLink.jsx`, `ClientCard.jsx`, `SuspenseLoader.jsx` (documentados y optimizados)
- Formularios: `UnifiedContactForm.jsx`
- Modales: `UnifiedModals.jsx`, `PrivacyModal.jsx`, `TermsModal.jsx`, `CookiesModal.jsx`, `ServiceModal.jsx`, `BlogModal.jsx`, `ConsultationModal.jsx`, `QuoteModal.jsx`
- Secciones: `BlogSection.jsx`, `ClientsSection.jsx`
- Hooks: `useModals.js`, `useEmailSelector.js`
- Servicios: `emailService.js`
- Datos: `content.js`, `servicesData.js`, `blogData.js`, `clientsData.js`

## ⚙️ Configuración y Scripts

- Todos los archivos de configuración (`vite.config.js`, `tailwind.config.js`, `postcss.config.js`, `jsconfig.json`, `index.html`) han sido revisados, optimizados y documentados profesionalmente.
- Scripts de build, limpieza, análisis y despliegue listos para CI/CD.

## 🧪 Testing y Calidad

- ✅ ESLint sin errores (29/06/2025)
- ✅ Build de producción exitoso (29/06/2025)
- ✅ Optimización de assets y dependencias
- ✅ Comentarios y sugerencias de mejora profesional en cada archivo clave
- ✅ Confirmación de ausencia de código malicioso

## 📝 Convenciones de Comentarios

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

## 🚀 Estado Actual del Proyecto

- [x] Limpieza completa de código y dependencias
- [x] Documentación técnica exhaustiva y actualizada
- [x] Comentarios y sugerencias de mejora profesional en todos los archivos clave
- [x] Build y linting sin errores
- [x] Listo para despliegue y mantenimiento profesional

## 🤝 Contacto

- **Email:** axonapp.info@gmail.com
- **LinkedIn:** [@axonapp](https://linkedin.com/company/axonapp)

---

⭐ **¡Dale una estrella si te gusta el proyecto!**

_Construido con ❤️ usando React + Vite + Tailwind CSS_

# Deploy - 2025-06-29

# Última revisión y optimización profesional: 29/06/2025
