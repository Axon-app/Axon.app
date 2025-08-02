# Axon.app - Sistema de Estilizado Modular

Este proyecto implementa un sistema de estilizado modular que permite hacer cambios específicos para dispositivos móviles o de escritorio sin que los cambios en uno afecten al otro.

## Estructura de Archivos

### Archivos CSS Principales

- **config.css**: Variables globales (colores, tipografía, espaciado)
- **styles.css**: Estilos base compartidos por todos los dispositivos
- **desktop.css**: Estilos específicos para computadoras (>992px)
- **mobile.css**: Estilos específicos para dispositivos móviles (≤992px)
- **device-classes.css**: Utilidades para mostrar/ocultar elementos según dispositivo

### Archivos JavaScript de Soporte

- **device-styles.js**: Script que detecta el tipo de dispositivo y aplica clases al HTML

## Características Principales

1. **Separación de Estilos por Dispositivo**
   - Los cambios en estilos para móviles no afectan a computadoras
   - Los cambios en estilos para computadoras no afectan a móviles

2. **Sistema de Clases por Dispositivo**
   - Clases aplicadas automáticamente según el tipo de dispositivo (desktop/tablet/mobile)
   - Utilidades para mostrar/ocultar elementos específicamente en ciertos dispositivos

3. **Animaciones Optimizadas**
   - Las animaciones como la rotación del logo se configuran independientemente para cada dispositivo

4. **Variables Centralizadas**
   - Colores, tipografía y espaciado centralizados en config.css para consistencia

## Cómo Utilizar el Sistema

### Para Desarrolladores

1. **Ver la documentación detallada**: Revisa `css/README.md` para instrucciones completas
2. **Modificar estilos para escritorio**: Editar `desktop.css`
3. **Modificar estilos para móviles**: Editar `mobile.css`
4. **Modificar estilos globales**: Editar `styles.css`

### Para Componentes Específicos por Dispositivo

Puedes usar estas clases en tu HTML:

```html
<!-- Solo visible en computadoras -->
<div class="desktop-only">Contenido solo para desktop</div>

<!-- Solo visible en tablets -->
<div class="tablet-only">Contenido solo para tablets</div>

<!-- Solo visible en móviles -->
<div class="mobile-only">Contenido solo para móviles</div>
```

## Breakpoints Principales

- **Desktop**: >992px
- **Tablet**: 768px-992px
- **Mobile Grande**: 480px-767px
- **Mobile Pequeño**: <480px

## Mantenimiento

- Evita modificar `device-styles.js` y `device-classes.css` a menos que necesites cambiar la lógica de detección de dispositivos
- Mantén las media queries sincronizadas entre `desktop.css` y `mobile.css`
- Prioriza el uso de variables de CSS para mantener consistencia
