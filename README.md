# 🚀 Axon.App - Sitio Web Corporativo

[![Vite](https://img.shields.io/badge/Vite-6.3.5-646CFF?logo=vite&logoColor=white)](https://vitejs.dev/)
[![React](https://img.shields.io/badge/React-18+-61DAFB?logo=react&logoColor=white)](https://reactjs.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind-3.4+-38B2AC?logo=tailwind-css&logoColor=white)](https://tailwindcss.com/)
[![GitHub Pages](https://img.shields.io/badge/Deploy-GitHub%20Pages-222222?logo=github&logoColor=white)](https://pages.github.com/)

> Sitio web profesional moderno para Axon.App - Soluciones tecnológicas innovadoras

## ✨ Características

- 🎨 **Diseño Moderno** - Interfaz elegante con gradientes y animaciones
- 📱 **Totalmente Responsivo** - Optimizado para móviles, tablets y desktop
- ⚡ **Alto Rendimiento** - Construido con Vite para máxima velocidad
- 🎭 **Animaciones Suaves** - Transiciones y efectos visuales atractivos
- 🧩 **Arquitectura Modular** - Componentes React reutilizables
- 🚀 **Despliegue Automático** - CI/CD con GitHub Actions

## 🛠️ Stack Tecnológico

- **Frontend:** React 18+ con Hooks
- **Build Tool:** Vite 6.3.5
- **Styling:** Tailwind CSS 3.4+
- **Fuentes:** Orbitron + Rajdhani
- **Despliegue:** GitHub Pages
- **CI/CD:** GitHub Actions

## 🏃‍♂️ Inicio Rápido

### Prerrequisitos

- Node.js 18+
- npm o yarn

### Instalación

```bash
# Clonar el repositorio
git clone https://github.com/[tu-usuario]/Axon.app.git
cd Axon

# Instalar dependencias
npm install

# Iniciar servidor de desarrollo
npm run dev

# Abrir http://localhost:5173/Axon.app/
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
│   │   └── 📄 UIComponents.jsx     # Componentes reutilizables
│   ├── 📁 data/
│   │   └── 📄 content.js           # Datos de contenido
│   ├── 📁 assets/                  # Recursos estáticos
│   ├── 📄 App.jsx                  # Componente principal
│   ├── 📄 index.css                # Estilos globales
│   └── 📄 main.jsx                 # Punto de entrada
├── 📁 public/                      # Archivos públicos
├── 📁 .github/workflows/           # GitHub Actions
├── 📄 vite.config.js              # Configuración Vite
├── 📄 tailwind.config.js          # Configuración Tailwind
├── 📄 postcss.config.js           # Configuración PostCSS
└── 📄 CHANGELOG.md                # Historial de cambios
```

## 🎨 Componentes Principales

### UIComponents.jsx

- `AxonLogo` - Logo principal con gradiente
- `AnimatedBackground` - Efectos de fondo animados
- `ServiceCard` - Tarjetas de servicios
- `TestimonialCard` - Tarjetas de testimonios
- `TechItem` - Items de tecnología
- `ContactForm` - Formulario de contacto
- `ScrollToTopButton` - Botón scroll to top

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

1. Crear componente en `src/components/UIComponents.jsx`
2. Exportar el componente
3. Importar en `App.jsx`
4. Actualizar `CHANGELOG.md`

### Modificar Contenido

- Editar `src/data/content.js` para servicios, testimonios, etc.
- Modificar `App.jsx` para contenido estático

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

- **Website:** [axon.app](https://axon.app)
- **Email:** contacto@axon.app
- **GitHub:** [@axon-app](https://github.com/axon-app)

---

⭐ **¡Dale una estrella si te gusta el proyecto!**

_Construido con ❤️ usando React + Vite + Tailwind CSS_
