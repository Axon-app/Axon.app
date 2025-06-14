# 📋 Documentación Técnica - Axon.App v2.0.0

## 🏗️ Arquitectura del Proyecto

### Estructura de Carpetas

```
src/
├── components/         # Componentes React reutilizables
│   └── UIComponents.jsx  # Todos los componentes UI y modales
├── data/              # Datos estáticos del sitio
│   ├── content.js        # Datos generales (tecnologías, testimonios)
│   └── servicesData.js   # Base de datos completa de servicios
├── services/          # Servicios de integración
│   └── emailService.js   # Servicio de manejo de emails
├── assets/            # Recursos estáticos
│   ├── logo1.png         # Logo principal de Axon
│   └── react.svg         # Logo de React
├── App.jsx            # Componente principal de la aplicación
├── main.jsx           # Punto de entrada de React
└── index.css          # Estilos globales y utilidades
```

## 🧩 Componentes Principales

### `AxonLogo`

- **Función**: Logo principal con gradiente y tipografía personalizada
- **Props**: Ninguna
- **Características**:
  - Logo PNG + texto estilizado
  - Gradiente from-blue-400 to-cyan-400
  - Tipografías: Orbitron (Axon) + Rajdhani (.app)

### `AnimatedBackground`

- **Función**: Fondo animado con efectos visuales
- **Props**: Ninguna
- **Características**:
  - Círculos animados con blur y pulso
  - Colores: blue, purple, indigo
  - Posicionamiento absoluto

### `ServiceCard`

- **Función**: Tarjeta de servicio con hover effects
- **Props**:
  - `icon` (string): Emoji del servicio
  - `title` (string): Título del servicio
  - `description` (string): Descripción del servicio
  - `onOpenModal` (function): Callback para abrir modal
  - `id` (string): ID del servicio en servicesData
- **Características**:
  - Altura uniforme (min-h-[320px])
  - Hover effects con transform y shadow
  - Botón "Más Información"

### `ServiceDetailModal`

- **Función**: Modal detallado de información de servicios
- **Props**:
  - `service` (object): Datos completos del servicio
  - `isOpen` (boolean): Estado de visibilidad
  - `onClose` (function): Callback para cerrar
  - `onOpenQuote` (function): Callback para abrir modal de cotización
  - `onOpenConsultation` (function): Callback para abrir modal de consulta
- **Características**:
  - Información completa: proceso, tecnologías, características
  - Botones CTA integrados
  - Scroll interno para contenido extenso

### `ContactForm`

- **Función**: Formulario de contacto principal
- **Estado**: Formulario controlado con useState
- **Características**:
  - Validación HTML5
  - Integración con emailService
  - Estados de carga (isSubmitting)
  - Reseteo automático tras envío exitoso
  - Email de contacto directo visible

### `QuoteRequestModal`

- **Función**: Modal para solicitudes de cotización
- **Props**:
  - `isOpen` (boolean): Estado de visibilidad
  - `onClose` (function): Callback para cerrar
  - `serviceName` (string): Nombre del servicio específico
- **Campos del Formulario**:
  - Información personal: nombre, email, empresa, teléfono
  - Detalles del proyecto: descripción, presupuesto, timeline, requerimientos
- **Características**:
  - Validación completa
  - Integración con emailService
  - Contexto del servicio específico

### `ConsultationModal`

- **Función**: Modal para agendar consultas
- **Props**:
  - `isOpen` (boolean): Estado de visibilidad
  - `onClose` (function): Callback para cerrar
  - `serviceName` (string): Nombre del servicio específico
- **Campos del Formulario**:
  - Información personal: nombre, email, empresa, teléfono
  - Preferencias: fecha, horario, tipo de consulta
  - Detalles: temas a tratar, experiencia previa
- **Características**:
  - Calendario integrado (HTML5 date input)
  - Selects para horarios y tipos de consulta
  - Integración con emailService

### `ScrollToTopButton`

- **Función**: Botón flotante para scroll hacia arriba
- **Props**:
  - `isVisible` (boolean): Visibilidad del botón
  - `onClick` (function): Callback de click

## 🎨 Sistema de Estilos

### Tailwind CSS

- **Configuración**: `tailwind.config.js`
- **Fuentes personalizadas**: Orbitron, Rajdhani
- **Animaciones custom**: bounceIn, fadeIn, etc.

### Paleta de Colores

- **Primarios**: Azul (#00C9FF) a Cian (#92FE9D)
- **Secundarios**: Grises oscuros para fondos
- **Acentos**: Púrpura, Verde para highlights

## 🚀 Despliegue

### GitHub Pages

- **Workflow**: `.github/workflows/deploy.yml`
- **Build**: `npm run build`
- **Deploy**: Automático en push a main

### Configuración Vite

```javascript
base: "/Axon.app/"; // Para GitHub Pages
```

## 📊 Rendimiento

### Optimizaciones

- **Lazy Loading**: Componentes bajo demanda
- **Bundle Splitting**: Código dividido automáticamente
- **CSS Purging**: Tailwind elimina CSS no usado
- **Image Optimization**: Assets optimizados

## 🔧 Scripts Disponibles

```bash
npm run dev      # Servidor de desarrollo
npm run build    # Build de producción
npm run preview  # Preview del build
npm run lint     # Linting del código
```

## 📱 Responsive Design

### Breakpoints

- **sm**: 640px+
- **md**: 768px+
- **lg**: 1024px+
- **xl**: 1280px+

### Mobile First

- Diseño optimizado primero para móviles
- Progressive enhancement para pantallas grandes
