# 🚀 Axon.App - Sitio Web Corporativo v2.5.0

[![Vite](https://img.shields.io/badge/Vite-6.3.5-646CFF?logo=vite&logoColor=white)](https://vitejs.dev/)
[![React](https://img.shields.io/badge/React-19+-61DAFB?logo=react&logoColor=white)](https://reactjs.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind-4.1+-38B2AC?logo=tailwind-css&logoColor=white)](https://tailwindcss.com/)
[![EmailJS](https://img.shields.io/badge/EmailJS-Integrated-FF6B35?logo=gmail&logoColor=white)](https://www.emailjs.com/)
[![GitHub Pages](https://img.shields.io/badge/Deploy-GitHub%20Pages-222222?logo=github&logoColor=white)](https://pages.github.com/)

> **Sitio web profesional moderno para Axon.App** - Soluciones tecnológicas innovadoras con sistema completo de formularios y captación de leads

🌐 **[VER SITIO EN VIVO](https://axon-app.github.io/Axon.app/)** ← Click aquí para ver el resultado final

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
- ✅ **Integración EmailJS** - Conectado a `axonapp.info@gmail.com`
- ✅ **Validación Completa** - Validación HTML5 y feedback visual
- ✅ **Modales Profesionales** - Sistema avanzado de modales especializados

- ✅ **Sección Misión y Visión** - Rediseñada con valores y objetivos
- ✅ **6 Servicios Principales** - Desarrollo Web, Apps, AI, etc.
- ✅ **Modales Detallados** - Información completa de cada servicio
- ✅ **Base de Datos de Servicios** - Procesos, tecnologías y características
- ✅ **Información de Contacto** - Visible en múltiples secciones

### ⚡ **Rendimiento y Técnica**

- ✅ **Alto Rendimiento** - Construido con Vite para máxima velocidad
- ✅ **Arquitectura Modular** - Componentes React reutilizables
- ✅ **Despliegue Automático** - CI/CD con GitHub Actions
- ✅ **Configuración Optimizada** - Vite configurado para GitHub Pages

## 🛠️ Stack Tecnológico

- **Frontend:** React 19+ con Hooks modernos y Concurrent Features
- **Build Tool:** Vite 6.3.5 (ultra-rápido)
- **Styling:** Tailwind CSS 4.1+ (utility-first)
- **Email Service:** EmailJS (modo demo funcional)
- **Fuentes:** Orbitron + Rajdhani (Google Fonts)
- **Canvas:** Canvas API para generación de imágenes sociales
- **Despliegue:** GitHub Pages con dominio personalizado
- **CI/CD:** GitHub Actions (despliegue automático)
- **Control de Versiones:** Git + GitHub

## 🏃‍♂️ Inicio Rápido

### Prerrequisitos

- Node.js 18+
- npm o yarn
- Git

### Instalación

```bash
# Clonar el repositorio
git clone https://github.com/axon-app/Axon.app.git
cd Axon

# Instalar dependencias
npm install

# Iniciar servidor de desarrollo
npm run dev

# Abrir http://localhost:5177/
```

### Scripts Disponibles

```bash
npm run dev      # Servidor de desarrollo
npm run build    # Build para producción
npm run preview  # Preview del build
npm run lint     # Linting del código
```

## 📁 Estructura del Proyecto

```
Axon/
├── 📁 src/
│   ├── 📁 components/
│   │   ├── � ui/                  # Componentes UI básicos
│   │   │   ├── BasicComponents.jsx
│   │   │   ├── Cards.jsx
│   │   │   └── Interactive.jsx
│   │   ├── 📁 forms/               # Formularios
│   │   │   └── ContactForm.jsx
│   │   ├── 📁 modals/              # Sistema de modales
│   │   │   ├── PrivacyModal.jsx
│   │   │   ├── TermsModal.jsx
│   │   │   ├── ServiceModal.jsx
│   │   │   ├── QuoteModal.jsx
│   │   │   └── ConsultationModal.jsx
│   │   ├── 📁 utils/               # Utilidades
│   │   │   └── withSuspense.jsx
│   │   └── 📄 index.jsx            # Barrel exports
│   ├── 📁 data/
│   │   ├── 📄 content.js           # Datos de contenido
│   │   └── 📄 servicesData.js      # Datos de servicios
│   ├── 📁 services/
│   │   └── 📄 emailService.js      # EmailJS integration
│   ├── 📁 assets/                  # Recursos estáticos
│   ├── 📄 App.jsx                  # Componente principal
│   ├── 📄 index.css                # Estilos globales
│   └── 📄 main.jsx                 # Punto de entrada
├── 📁 public/                      # Archivos públicos
│   ├── � logo1.png               # Logo principal
│   ├── 📄 favicon.ico             # Favicon
│   ├── 📄 og-image.png            # Imagen social
│   └── 📄 twitter-image.png       # Imagen Twitter
├── �📁 .github/workflows/           # GitHub Actions
├── 📄 vite.config.js              # Configuración Vite
├── 📄 tailwind.config.js          # Configuración Tailwind
├── 📄 postcss.config.js           # Configuración PostCSS
├── 📄 CHANGELOG.md                # Historial de cambios
├── 📄 FINAL_SUMMARY.md            # Resumen completo del proyecto
└── 📄 EMAIL_SETUP.md              # Configuración de emails
```

## 🎨 Componentes Principales

### Arquitectura Modular (v2.5.0)

**Componentes UI Básicos:**

- `AxonLogo` - Logo principal con gradiente
- `AnimatedBackground` - Efectos de fondo animados
- `ScrollToTopButton` - Botón scroll to top

**Componentes de Tarjetas:**

- `ServiceCard` - Tarjetas de servicios interactivas
- `TestimonialCard` - Tarjetas de testimonios
- `TechItem` - Items de tecnología con animaciones

**Componentes Interactivos:**

- `AnimatedCounter` - Contadores animados
- `TestimonialsBanner` - Banner rotativo de testimonios

**Sistema de Formularios:**

- `ContactForm` - Formulario principal de contacto
- Formularios especializados en modales

**Sistema de Modales:**

- `PrivacyModal` - Política de privacidad
- `TermsModal` - Términos y condiciones
- `ServiceModal` - Información detallada de servicios
- `QuoteModal` - Solicitud de propuesta
- `ConsultationModal` - Agendamiento de consultas

### Secciones de la Página

- **Hero** - Presentación principal con CTA
- **Servicios** - 6 servicios principales
- **Contacto** - Formulario funcional
- **Footer** - Información y enlaces

## 🚀 Despliegue

El sitio se despliega automáticamente en GitHub Pages cuando se hace push a la rama `main`.

### Configuración de GitHub Pages

1. Habilitar GitHub Pages en la configuración del repo
2. Configurar source como "GitHub Actions"
3. Los workflows en `.github/workflows/` manejan el despliegue

### Despliegue Manual

```bash
npm run build
npm run preview  # Para probar localmente
```

## 🎯 Servicios Ofrecidos

- 💻 **Desarrollo Web** - Sitios responsivos y optimizados
- 📱 **Apps Móviles** - iOS y Android
- 🎨 **Diseño UI/UX** - Interfaces modernas
- ☁️ **Soluciones Cloud** - Infraestructura escalable
- 🧠 **Inteligencia Artificial** - ML y automatización
- 🔒 **Ciberseguridad** - Protección digital

## 🛠️ Desarrollo

### Agregar Nuevos Componentes

1. Crear componente en la carpeta apropiada (`src/components/ui/`, `forms/`, `modals/`)
2. Exportar el componente en `src/components/index.jsx`
3. Importar en `App.jsx` usando barrel imports
4. Actualizar `CHANGELOG.md`

### Modificar Contenido

- Editar `src/data/content.js` para contenido general
- Modificar `src/data/servicesData.js` para servicios
- Actualizar `App.jsx` para contenido estático

### Personalizar Estilos

- Configurar colores en `tailwind.config.js`
- Añadir estilos globales en `src/index.css`

## 📊 Performance

- ⚡ Vite para builds ultra-rápidos
- 🎨 CSS optimizado con Tailwind
- 📦 Code splitting automático
- 🔄 Hot Module Replacement (HMR)

## 🐛 Solución de Problemas

### Errores Comunes

- **Port ya en uso:** Cambiar puerto en `vite.config.js`
- **Dependencias:** Ejecutar `npm install` para reinstalar
- **Build errors:** Verificar sintaxis JSX y imports

### Logs y Debugging

```bash
npm run dev --debug     # Modo debug
npm run build --debug   # Build con logs detallados
```

## 📝 Contribución

1. Fork el proyecto
2. Crear branch para feature (`git checkout -b feature/NuevaCaracteristica`)
3. Commit cambios (`git commit -m 'Añadir nueva característica'`)
4. Push al branch (`git push origin feature/NuevaCaracteristica`)
5. Abrir Pull Request
6. Actualizar `CHANGELOG.md`

## 📄 Licencia

Este proyecto está bajo la Licencia MIT - ver archivo [LICENSE](LICENSE) para detalles.

## 🤝 Contacto

- **Website:** [axon-app.github.io/Axon.app](https://axon-app.github.io/Axon.app/)
- **Email:** axonapp.info@gmail.com
- **GitHub:** [@axon-app](https://github.com/axon-app)

---

⭐ **¡Dale una estrella si te gusta el proyecto!**

_Construido con ❤️ usando React + Vite + Tailwind CSS_
