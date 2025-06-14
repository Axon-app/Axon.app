# 📋 Documentación Técnica - Axon.App

## 🏗️ Arquitectura del Proyecto

### Estructura de Carpetas

```
src/
├── components/         # Componentes React reutilizables
│   └── UIComponents.jsx
├── data/              # Datos estáticos del sitio
│   └── content.js
├── assets/            # Recursos estáticos
├── App.jsx            # Componente principal
├── main.jsx           # Punto de entrada
└── index.css          # Estilos globales
```

## 🧩 Componentes Principales

### `AxonLogo`

- **Función**: Logo principal de la aplicación
- **Props**: Ninguna
- **Uso**: Navbar y footer

### `AnimatedBackground`

- **Función**: Fondo animado con efectos visuales
- **Props**: Ninguna
- **Características**: Círculos animados con blur

### `ServiceCard`

- **Función**: Tarjeta de servicio individual
- **Props**:
  - `icon` (string): Emoji del servicio
  - `title` (string): Título del servicio
  - `description` (string): Descripción del servicio
  - `onOpenModal` (function): Callback para modal
  - `id` (string): Identificador único

### `ContactForm`

- **Función**: Formulario de contacto
- **Características**: Validación HTML5, diseño responsivo
- **Estado**: Formulario controlado

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
