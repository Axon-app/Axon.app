# 🔧 DOCUMENTACIÓN TÉCNICA - Axon.App

## 📋 Registro de Cambios Detallado

_Actualizado: 14 de Junio, 2025 - v1.1.0_

---

## 🆕 ÚLTIMOS CAMBIOS - v1.1.0 (14 Jun 2025)

### 🎭 **MODALES LEGALES MEJORADOS**

#### Nuevos Componentes Implementados:

1. **EnhancedPrivacyModal** (líneas 181-515 en UIComponents.jsx)

   - Props: `{ isOpen, onClose }`
   - Estado interno: `isClosing` para animaciones
   - Características: Tabla de contenido, 8 secciones, función imprimir

2. **EnhancedTermsModal** (líneas 517-815 en UIComponents.jsx)
   - Props: `{ isOpen, onClose }`
   - Estado interno: `isClosing` para animaciones
   - Características: SLA, resolución de disputas, información legal

#### Mejoras Técnicas:

- **Animaciones CSS:** Transiciones de 300ms con easing
- **Z-index:** 9999 para máxima prioridad
- **Backdrop:** Blur effect con opacidad variable
- **Responsive:** max-w-4xl con altura máxima 90vh
- **Scrollbar:** Custom scrollbar con gradientes

#### Correcciones de Bugs:

- **Import Error:** Corregido `React.useState` → `useState`
- **Runtime Error:** Solucionado error que causaba página en blanco
- **State Management:** Mejorado manejo de estados de cierre

### 🎨 **ESTILOS CSS AGREGADOS**

#### Nuevas Clases en index.css:

```css
.custom-scrollbar {
  scrollbar-width: thin;
  scrollbar-color: #4f46e5 #374151;
}

.modal-enter {
  animation: modalSlideIn 0.3s ease-out forwards;
}

.modal-exit {
  animation: modalSlideOut 0.3s ease-out forwards;
}
```

---

## 🏗️ CONFIGURACIÓN INICIAL DEL PROYECTO

### Comandos Ejecutados

```bash
npm create vite@latest Axon -- --template react
cd Axon
npm install
npm install -D tailwindcss postcss autoprefixer
npx tailwindcss init -p
npm install @fontsource/orbitron @fontsource/rajdhani
```

### Archivos de Configuración Creados

#### `tailwind.config.js`

```javascript
/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        orbitron: ["Orbitron", "sans-serif"],
        rajdhani: ["Rajdhani", "sans-serif"],
      },
      animation: {
        fadeIn: "fadeIn 1s ease-in-out",
        slideUp: "slideUp 0.8s ease-out",
        bounceIn: "bounceIn 0.6s ease-out",
        glow: "glow 2s ease-in-out infinite alternate",
      },
      keyframes: {
        fadeIn: {
          "0%": { opacity: "0", transform: "translateY(20px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        slideUp: {
          "0%": { opacity: "0", transform: "translateY(50px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        bounceIn: {
          "0%": { opacity: "0", transform: "scale(0.3)" },
          "50%": { transform: "scale(1.05)" },
          "70%": { transform: "scale(0.9)" },
          "100%": { opacity: "1", transform: "scale(1)" },
        },
        glow: {
          "0%": { textShadow: "0 0 5px #00C9FF, 0 0 10px #00C9FF" },
          "100%": { textShadow: "0 0 10px #92FE9D, 0 0 20px #92FE9D" },
        },
      },
    },
  },
  plugins: [],
};
```

#### `postcss.config.js`

```javascript
export default {
  plugins: {
    tailwindcss: {},
    autoprefixer: {},
  },
};
```

---

## 📂 ESTRUCTURA DE ARCHIVOS DETALLADA

```
Axon/
├── 📄 index.html                    # HTML principal
├── 📄 package.json                 # Dependencias y scripts
├── 📄 vite.config.js               # Configuración Vite
├── 📄 tailwind.config.js           # Configuración Tailwind
├── 📄 postcss.config.js            # Configuración PostCSS
├── 📄 README.md                    # Documentación principal
├── 📄 CHANGELOG.md                 # Historial de cambios
├── 📄 TECH-DOCS.md                 # Este archivo
├── 📁 .github/
│   └── 📁 workflows/
│       ├── 📄 deploy.yml           # Workflow principal
│       └── 📄 static.yml           # Workflow estático
├── 📁 public/
│   └── 📄 vite.svg                 # Favicon por defecto
├── 📁 src/
│   ├── 📄 main.jsx                 # Punto de entrada React
│   ├── 📄 App.jsx                  # Componente principal (643 líneas)
│   ├── 📄 index.css                # Estilos globales + Tailwind imports
│   ├── 📁 components/
│   │   └── 📄 UIComponents.jsx     # Componentes reutilizables (167 líneas)
│   ├── 📁 data/
│   │   └── 📄 content.js           # Datos centralizados
│   └── 📁 assets/
│       └── 📄 react.svg            # Logo React por defecto
└── 📁 node_modules/                # Dependencias instaladas
```

---

## 🧩 COMPONENTES DESARROLLADOS

### 1. **UIComponents.jsx** (167 líneas)

#### Componentes Exportados:

1. **`AxonLogo`** (líneas 4-15)

   - Props: ninguna
   - Función: Logo principal con gradiente
   - Fuentes: Orbitron + Rajdhani

2. **`AnimatedBackground`** (líneas 17-25)

   - Props: ninguna
   - Función: Efectos de fondo con blur y animaciones
   - Animaciones: 3 círculos con pulso

3. **`ServiceCard`** (líneas 27-48) ✅ **CORREGIDO**

   - Props: `{ icon, title, description, onOpenModal, id }`
   - Función: Tarjetas de servicios con hover effects
   - Features: Gradientes, transformaciones, botón condicional

4. **`TestimonialCard`** (líneas 50-75)

   - Props: `{ testimonial }`
   - Función: Tarjetas de testimonios con avatar y rating
   - Features: Sistema de estrellas, layout flexible

5. **`TechItem`** (líneas 77-87)

   - Props: `{ tech }`
   - Función: Items de tecnología con icono y nombre
   - Features: Hover effects, scale transforms

6. **`ContactForm`** (líneas 89-135)

   - Props: ninguna
   - Función: Formulario de contacto funcional
   - Features: Validación HTML5, submit handler, responsive grid

7. **`ScrollToTopButton`** (líneas 137-167)

   - Props: `{ isVisible, onClick }`
   - Función: Botón flotante para scroll to top
   - Features: Animaciones de visibilidad, posición fija

8. **`EnhancedPrivacyModal`** (líneas 181-515)

   - Props: `{ isOpen, onClose }`
   - Estado: `isClosing` (interno)
   - Función: Modal de política de privacidad mejorado
   - Features: Tabla de contenido, 8 secciones, función imprimir

9. **`EnhancedTermsModal`** (líneas 517-815)

   - Props: `{ isOpen, onClose }`
   - Estado: `isClosing` (interno)
   - Función: Modal de términos y condiciones mejorado
   - Features: SLA, resolución de disputas, información legal

### 2. **App.jsx** (643 líneas)

#### Estructura Principal:

- **Estado:** `showMenu`, `showPrivacyModal`, `showTermsModal`
- **Imports:** 7 componentes de UIComponents
- **Secciones:** Navbar, Hero, Servicios, Contacto, Footer, Modales

#### Componentes Internos:

1. **`AxonAppLogoSVG`** (líneas 19-38)

   - SVG inline personalizado
   - Gradiente lineal
   - ViewBox optimizado

2. **`NavLink`** (líneas 416-436)

   - Props: `{ href, children, mobile, onClick }`
   - Función: Enlaces de navegación responsivos
   - Features: Estilos condicionales mobile/desktop

3. **`PrivacyPolicyModal`** (líneas 440-520)

   - Props: `{ onClose }`
   - Función: Modal de política de privacidad
   - Features: Overlay, scroll interno, botón cerrar

4. **`TermsModal`** (líneas 522-595)
   - Props: `{ onClose }`
   - Función: Modal de términos y condiciones
   - Features: Similar a PrivacyPolicyModal

---

## 🎨 SISTEMA DE ESTILOS

### Colores Principales

- **Azul Primario:** `#00C9FF` → `blue-400`, `blue-500`, `blue-600`
- **Verde Secundario:** `#92FE9D` → `green-400`, `cyan-400`
- **Púrpura Acento:** `purple-500`, `purple-600`, `purple-900`
- **Grises:** `gray-700`, `gray-800`, `gray-900` (fondos)
- **Transparencias:** `/20`, `/30`, `/50`, `/60`, `/70`, `/80` (opacidades)

### Gradientes Utilizados

- **Fondo Principal:** `from-gray-900 via-blue-900 to-purple-900`
- **Textos:** `from-blue-400 to-green-400`, `from-green-400 to-cyan-400`
- **Botones:** `from-blue-600 to-cyan-600`
- **Hover States:** `from-blue-700 to-cyan-700`

### Animaciones Custom

- **fadeIn:** Aparición suave con translateY
- **slideUp:** Deslizamiento desde abajo
- **bounceIn:** Entrada con rebote
- **glow:** Efecto de brillo en texto

### Fuentes

- **Orbitron:** Títulos y elementos destacados (font-orbitron)
- **Rajdhani:** Subtítulos y texto secundario (font-rajdhani)
- **Inter/Sans-serif:** Texto base y formularios

---

## 🚀 CONFIGURACIÓN DE DESPLIEGUE

### GitHub Actions Workflows

#### `deploy.yml`

```yaml
name: Deploy to GitHub Pages
on:
  push:
    branches: [main]
  pull_request:
    branches: [main]
jobs:
  build-and-deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - uses: actions/setup-node@v3
        with:
          node-version: "18"
      - run: npm ci
      - run: npm run build
      - uses: actions/deploy-pages@v2
        with:
          token: ${{ secrets.GITHUB_TOKEN }}
          publish_dir: ./dist
```

#### `static.yml`

```yaml
name: Deploy static content to Pages
on:
  push:
    branches: ["main"]
  workflow_dispatch:
permissions:
  contents: read
  pages: write
  id-token: write
concurrency:
  group: "pages"
  cancel-in-progress: false
jobs:
  deploy:
    environment:
      name: github-pages
      url: ${{ steps.deployment.outputs.page_url }}
    runs-on: ubuntu-latest
    steps:
      - name: Checkout
        uses: actions/checkout@v4
      - name: Setup Node
        uses: actions/setup-node@v4
        with:
          node-version: 20
          cache: "npm"
      - name: Install dependencies
        run: npm ci
      - name: Build
        run: npm run build
      - name: Setup Pages
        uses: actions/configure-pages@v4
      - name: Upload artifact
        uses: actions/upload-pages-artifact@v3
        with:
          path: "./dist"
      - name: Deploy to GitHub Pages
        id: deployment
        uses: actions/deploy-pages@v4
```

---

## 🔧 COMANDOS Y SCRIPTS UTILIZADOS

### Scripts package.json

```json
{
  "scripts": {
    "dev": "vite",
    "build": "vite build",
    "lint": "eslint . --ext js,jsx --report-unused-disable-directives --max-warnings 0",
    "preview": "vite preview"
  }
}
```

### Comandos de Desarrollo

```bash
# Servidor de desarrollo
npm run dev                          # Puerto 5173

# Build y preview
npm run build                        # Genera /dist
npm run preview                      # Previsualiza build

# Git workflow
git add .
git commit -m "feat: descripción"
git push origin main                 # Dispara deploy automático
```

---

## 🐛 ERRORES RESUELTOS Y SOLUCIONES

### 1. **ServiceCard Duplicado** ✅

**Error:** `Parsing error: Identifier 'ServiceCard' has already been declared`
**Causa:** Componente definido en UIComponents.jsx e importado + redefinido en App.jsx
**Solución:** Eliminada definición duplicada en App.jsx (líneas 439-467)

### 2. **Props Mismatch** ✅

**Error:** `Cannot read properties of undefined`
**Causa:** ServiceCard esperaba `service.icon` pero recibía `icon` directo
**Solución:** Modificado componente para recibir props individuales: `{ icon, title, description, onOpenModal, id }`

### 3. **Imports No Utilizados** ✅

**Error:** `'useEffect' is defined but never used`
**Causa:** Imports de desarrollo no limpiados
**Solución:** Eliminados `useEffect`, `technologies`, `testimonials`, `services` de imports

### 4. **JSX Syntax Error** ✅

**Error:** `Expected corresponding JSX closing tag`
**Causa:** Problemas de cache del servidor con hot reload
**Solución:** Reinicio completo del servidor (`taskkill` + `npm run dev`)

---

## 📊 MÉTRICAS DE DESARROLLO

### Líneas de Código

- **App.jsx:** 442 líneas (↓ limpieza modales antiguos)
- **UIComponents.jsx:** 815 líneas (↑ +650 modales mejorados)
- **Total React:** ~1,257 líneas (↑ +447 líneas)
- **Archivos de config:** ~180 líneas (↑ CSS custom)
- **Documentación:** ~800+ líneas (↑ +400 líneas)

### Tiempo de Build

- **Desarrollo:** ~200ms (Vite HMR)
- **Producción:** ~2-3 segundos
- **Despliegue:** ~30-60 segundos (GitHub Actions)

### Dependencias

- **Producción:** React, React-DOM
- **Desarrollo:** Vite, Tailwind, PostCSS, Autoprefixer, ESLint
- **Fuentes:** @fontsource/orbitron, @fontsource/rajdhani

---

## 🔄 PRÓXIMOS PASOS TÉCNICOS

### Optimizaciones Pendientes

- [ ] **Code Splitting:** Lazy loading de componentes
- [ ] **Image Optimization:** WebP, lazy loading de imágenes
- [ ] **PWA:** Service workers, manifest.json
- [ ] **Bundle Analysis:** webpack-bundle-analyzer
- [ ] **Performance Monitoring:** Web Vitals

### Funcionalidades Técnicas

- [ ] **TypeScript Migration:** Tipado estático
- [ ] **Testing:** Jest/Vitest + React Testing Library
- [ ] **Storybook:** Documentación de componentes
- [ ] **Cypress:** E2E testing
- [ ] **Husky:** Git hooks para calidad

---

_Documento técnico actualizado con cada cambio significativo_
_Úsalo como referencia para futuros desarrollos y debugging_
