# Guía de Uso del Sistema de Imágenes PNG para Axon.app

Este documento explica cómo usar el sistema de manejo de imágenes PNG que hemos implementado para su sitio web.

## Estructura Implementada

Hemos implementado los siguientes archivos:

1. `css/image-sizes.css`: Define reglas CSS para ajustar automáticamente el tamaño de las imágenes según la sección donde se encuentren.
2. `js/image-loader.js`: Proporciona funciones JavaScript para manejar la carga y optimización de imágenes.

## Cómo Usar Imágenes PNG Locales

### 1. Organización de Archivos

Recomendamos organizar sus imágenes de la siguiente manera:

```
assets/
  images/
    logo.png                # Logo principal
    icons/                  # Iconos y pequeñas imágenes decorativas
    portfolio/              # Imágenes para la sección de portafolio
    blog/                   # Imágenes para la sección de blog
    team/                   # Fotos del equipo/testimonios
    services/               # Imágenes para la sección de servicios
    backgrounds/            # Imágenes de fondo grandes
```

### 2. Reemplazo de Imágenes Externas por PNG Locales

Para reemplazar un marcador de posición (placeholder) o una imagen externa por una imagen PNG local, simplemente cambie el atributo `src` en el HTML:

**Antes:**
```html
<img src="https://placehold.co/600x400/4361ee/ffffff?text=FinTrack+Pro" alt="">
```

**Después:**
```html
<img src="assets/images/portfolio/fintrack-pro.png" alt="FinTrack Pro App">
```

### 3. Usar IDs para Manipulación con JavaScript

Si necesita manipular dinámicamente las imágenes, puede usar los IDs que se asignan automáticamente o agregarlos manualmente:

```html
<img id="proyecto-fintrack" src="assets/images/portfolio/fintrack-pro.png" alt="FinTrack Pro App">
```

Y luego en JavaScript:

```javascript
// Cambiar una imagen dinámicamente
imageTools.replacePlaceholder('proyecto-fintrack', 'assets/images/portfolio/fintrack-detalle.png');

// Aplicar estilos personalizados
imageTools.applyStyles('proyecto-fintrack', {width: '100%', objectFit: 'cover'});
```

### 4. Lazy Loading para Mejor Rendimiento

Para mejorar el rendimiento, puede usar el atributo `data-src` para carga diferida:

```html
<img data-src="assets/images/portfolio/fintrack-pro.png" alt="FinTrack Pro App">
```

Esto hará que la imagen se cargue solo cuando el usuario se desplaza hasta ella.

## Recomendaciones para Cada Sección

### Logo

```html
<img src="assets/images/logo.png" alt="Axon.app Logo" class="logo-img">
```

El tamaño se ajustará automáticamente a 55x55px.

### Imágenes de Portafolio

```html
<div class="portfolio-item">
  <img src="assets/images/portfolio/proyecto1.png" alt="Nombre del Proyecto">
  <!-- resto del código -->
</div>
```

Las imágenes se ajustarán automáticamente a un tamaño de 100% de ancho y 250px de alto con object-fit: cover.

### Imágenes de Blog

```html
<div class="blog-img">
  <img src="assets/images/blog/articulo1.png" alt="Título del Artículo">
</div>
```

Las imágenes se ajustarán automáticamente a un tamaño de 100% de ancho y 200px de alto.

### Imágenes de Testimonios (Clientes)

```html
<div class="client">
  <img src="assets/images/team/cliente1.png" alt="Nombre del Cliente">
  <!-- resto del código -->
</div>
```

Las imágenes se redondearán automáticamente y se ajustarán a 50x50px.

### Iconos de Servicios

Si desea usar PNG en lugar de Font Awesome para los iconos de servicios:

```html
<div class="service-icon">
  <img src="assets/images/icons/mobile-app.png" alt="Icono de App Móvil">
</div>
```

Los iconos se ajustarán automáticamente a 60x60px.

## Ventajas de Este Sistema

1. **Consistencia Visual**: Todas las imágenes mantienen proporciones consistentes.
2. **Rendimiento Optimizado**: Lazy loading y optimización de carga.
3. **Mantenimiento Simplificado**: Reglas CSS centralizadas para los tamaños de imágenes.
4. **Flexibilidad**: Fácil alternancia entre imágenes locales y externas.

## Optimización de Imágenes PNG

Para un rendimiento óptimo, recomendamos:

1. Optimizar las imágenes PNG antes de subirlas (usar herramientas como TinyPNG)
2. Usar el tamaño adecuado para cada imagen (no subir imágenes de 2000px si solo se mostrarán a 300px)
3. Considerar WebP como alternativa para imágenes más ligeras (con PNG como respaldo)

---

Si tiene alguna pregunta sobre cómo implementar o ajustar este sistema, no dude en contactarnos.
