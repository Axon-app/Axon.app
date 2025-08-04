# Axon.app - Sitio Web Corporativo

![Logo de Axon.app](../assets/images/logo.png)

## Descripción

Axon.app es un sitio web corporativo moderno e interactivo para una empresa especializada en desarrollo de software, aplicaciones móviles, desarrollo web, integración de IA y servicios tecnológicos. La web está diseñada como una Single Page Application (SPA) con múltiples secciones, un diseño moderno y una experiencia de usuario inmersiva gracias a su fondo animado 3D y efectos visuales.

## Características Principales

- **Diseño Responsivo:** Adaptado a dispositivos móviles, tablets y desktop
- **Fondo 3D Interactivo:** Animación "Cosmic River" utilizando Three.js
- **Navegación Suave:** Scroll entre secciones con animaciones fluidas
- **Modo Oscuro:** Diseño elegante con tema oscuro y efectos de luz
- **Modales Interactivos:** Para detalles de servicios, portafolio y blog
- **Carrusel de Testimonios:** Automático con pausa al interactuar
- **Formulario de Contacto:** Con validación completa
- **Contadores Animados:** Para mostrar estadísticas de la empresa
- **Botones Flotantes:** Acceso rápido a WhatsApp, redes sociales y contacto

## Estructura del Proyecto

```
Axon.app/
│
├── index.html                  # Archivo principal HTML
│
├── assets/                     # Recursos estáticos
│   ├── fonts/                  # Fuentes personalizadas
│   └── images/                 # Imágenes e iconos
│       ├── logo.png
│       └── ...
│
├── css/                        # Archivos CSS
│   ├── config.css              # Variables y configuraciones
│   ├── styles.css              # Estilos principales
│   ├── navbar.css              # Estilos de navegación
│   ├── desktop.css             # Estilos específicos para desktop
│   ├── mobile.css              # Estilos específicos para móvil
│   ├── device-classes.css      # Clases específicas por dispositivo
│   └── ...
│
├── js/                         # Archivos JavaScript
│   ├── main.js                 # Funcionalidades principales
│   ├── counter.js              # Animación de contadores
│   ├── testimonial-carousel.js # Carrusel de testimonios
│   ├── device-styles.js        # Gestión de estilos por dispositivo
│   └── ...
│
└── docs/                       # Documentación
    └── README.md               # Este archivo
```

## Tecnologías Utilizadas

- **HTML5:** Estructura semántica y optimizada para SEO
- **CSS3:** Animaciones, transiciones, variables y diseño responsivo
- **JavaScript (ES6+):** Interactividad y efectos dinámicos
- **Three.js:** Animación 3D de fondo (Cosmic River)
- **Font Awesome:** Iconografía
- **Google Fonts:** Tipografías (Poppins, Inter, Space Grotesk)
- **IntersectionObserver API:** Animaciones scroll-triggered
- **Vanilla JS:** Sin dependencia de frameworks

## Secciones del Sitio

1. **Hero (Inicio):** Presentación principal con fondo 3D y estadísticas
2. **Nosotros:** Información sobre la empresa, misión, visión y valores
3. **Servicios:** Catálogo de servicios ofrecidos con modales detallados
4. **Tecnologías:** Stack tecnológico utilizado por la empresa
5. **Portafolio:** Proyectos destacados con detalles en modales
6. **Blog:** Artículos sobre tecnología y desarrollo
7. **Testimonios:** Opiniones de clientes en carrusel automático
8. **Contacto:** Información de contacto y formulario

## Optimización y Rendimiento

- **Lazy Loading:** Carga diferida de recursos externos
- **Adaptación a Dispositivos:** Reducción de calidad en dispositivos de baja potencia
- **Throttling de Eventos:** Mejora de rendimiento en scroll y resize
- **Optimización de Animaciones:** Limitación de FPS para mejor rendimiento
- **Detección de Dispositivos:** Ajuste automático de características según el dispositivo

## Accesibilidad y SEO

- **Meta Tags:** Optimizados para motores de búsqueda y redes sociales
- **Estructura Semántica:** Uso correcto de elementos HTML5
- **Contraste de Colores:** Adecuado para mejor legibilidad
- **Textos Alternativos:** En imágenes para lectores de pantalla

## Cómo Ejecutar

1. Clona el repositorio:
   ```bash
   git clone https://github.com/Axon-app/Axon.app.git
   ```

2. Abre el archivo `index.html` en tu navegador:
   ```bash
   cd Axon.app
   # Usa un servidor local como Live Server (VS Code) o simplemente abre index.html
   ```

3. Para desarrollo, se recomienda usar un servidor local como Live Server en VS Code.

## Características de Desarrollo

- **Modularidad:** Código organizado en archivos específicos por funcionalidad
- **Comentarios:** Documentación inline en componentes clave
- **Nomenclatura BEM:** Para clases CSS (en la mayoría de componentes)
- **Variables CSS:** Para mantener consistencia en colores y espaciados
- **Código Limpio:** Siguiendo buenas prácticas y patrones de diseño

## Licencia

© 2025 Axon.app. Todos los derechos reservados.

---

Desarrollado con ❤️ por el equipo de Axon.app