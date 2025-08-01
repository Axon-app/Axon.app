# Axon.app - Website Empresarial

Sitio web empresarial moderno para Axon.app con animación 3D de fondo usando Three.js.

**Sitio web en vivo:** [https://axon-app.github.io/Axon.app/](https://axon-app.github.io/Axon.app/)
> Utilizando el hosting gratuito de GitHub Pages

## Estructura del Proyecto

```
Axon.app/
├── index.html              # Página principal
├── css/
│   └── styles.css          # Estilos principales
├── js/
│   └── main.js            # JavaScript principal y Three.js
├── assets/
│   └── fonts/             # Fuentes locales (si es necesario)
└── README.md              # Este archivo
```

## Características

- **Animación 3D**: Río cósmico animado con Three.js
- **Diseño Responsivo**: Compatible con todos los dispositivos
- **Efectos Post-procesamiento**: Efectos de bloom y resplandor
- **Formularios Validados**: Validación en tiempo real
- **Modales Interactivos**: Sistema completo de modales
- **Navegación Suave**: Scroll suave entre secciones
- **Optimizado para SEO**: Estructura semántica HTML5

## Dependencias CDN

El proyecto utiliza las siguientes librerías a través de CDN:

- **Three.js r128**: Gráficos 3D
- **Font Awesome 6.5.0**: Iconografía
- **Google Fonts**: Poppins, Inter, Space Grotesk

## Instalación

1. Clone o descargue los archivos del proyecto
2. Abra `index.html` en un navegador web
3. No se requiere servidor, funciona directamente desde el navegador

## Tecnologías Utilizadas

- HTML5
- CSS3 (Grid, Flexbox, Custom Properties)
- JavaScript ES6+
- Three.js para gráficos 3D
- Font Awesome para iconos
- Google Fonts para tipografía

## Funcionalidades

### Navegación
- Header con efecto de transparencia al hacer scroll
- Menú hamburguesa para dispositivos móviles
- Navegación suave entre secciones

### Animación 3D
- Río cósmico con partículas animadas
- Efectos de post-procesamiento (bloom)
- Interacción con movimiento del mouse
- Respuesta al scroll de la página

### Formularios
- Validación en tiempo real
- Iconos de estado de validación
- Mensajes de error personalizados
- Tipos de validación múltiples

### Modales
- Sistema completo de modales para servicios
- Contenido detallado de proyectos
- Artículos de blog expandidos
- Formularios de contacto

## Personalización

### Colores
Los colores principales se definen como variables CSS en `:root`:
- `--color1`: #4361ee (Azul principal)
- `--color2`: #7209b7 (Púrpura)
- `--color3`: #f72585 (Rosa)

### Configuración Three.js
En `main.js`, función `initCosmicRiver()`:
- `particleCount`: Número de partículas (20000)
- `riverLength`: Longitud del río cósmico (4000)
- Velocidad de animación y efectos de bloom

## Soporte del Navegador

- Chrome/Edge 80+
- Firefox 75+
- Safari 13+
- Opera 67+

## Licencia

Este proyecto es propietario de Axon.app.

## Contacto

Para soporte técnico o consultas, contacte a través del formulario en el sitio web.
