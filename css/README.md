# Guía de Estructura CSS para Axon.app

## Estructura Modular

Este proyecto utiliza una estructura modular de CSS para separar claramente los estilos específicos para móviles y computadoras, facilitando así el desarrollo y mantenimiento sin que cambios en un entorno afecten al otro.

## Archivos CSS

- **config.css**: Variables globales, colores, tipografía y configuraciones centralizadas
- **styles.css**: Estilos base comunes para todos los dispositivos
- **navbar.css**: Estilos específicos para la navegación
- **desktop.css**: Estilos que solo se aplican a dispositivos desktop (>992px)
- **mobile.css**: Estilos que solo se aplican a dispositivos móviles y tablets (≤992px)
- **device-classes.css**: Clases utilitarias para mostrar/ocultar elementos según el dispositivo

## Características Especiales

### Clases de Dispositivo

El proyecto incluye un sistema para detectar automáticamente el tipo de dispositivo y aplicar una clase correspondiente al elemento HTML:

- `device-desktop`: Para dispositivos con ancho > 992px
- `device-tablet`: Para dispositivos con ancho entre 768px y 992px
- `device-mobile`: Para dispositivos con ancho < 768px

### Utilidades de Visualización

Puedes usar estas clases para controlar qué elementos se muestran en cada dispositivo:

```html
<!-- Este elemento solo aparece en desktop -->
<div class="desktop-only">Solo visible en computadoras</div>

<!-- Este elemento solo aparece en tablets -->
<div class="tablet-only">Solo visible en tablets</div>

<!-- Este elemento solo aparece en móviles -->
<div class="mobile-only">Solo visible en móviles</div>

<!-- Este elemento no aparece en móviles -->
<div class="hide-on-mobile">Visible en tablets y desktop</div>
```

## ¿Cómo Hacer Cambios?

### Para Cambios en Desktop (Computadoras)

Cuando necesites hacer cambios que SOLO deben afectar a computadoras:

1. Modifica **desktop.css**
2. Asegúrate de que tus estilos estén dentro de la media query: `@media screen and (min-width: 993px) { ... }`

### Para Cambios en Móviles

Cuando necesites hacer cambios que SOLO deben afectar a dispositivos móviles:

1. Modifica **mobile.css**
2. Usa la media query apropiada:
   - Tablets + Móviles: `@media screen and (max-width: 992px) { ... }`
   - Solo Móviles: `@media screen and (max-width: 768px) { ... }`
   - Móviles pequeños: `@media screen and (max-width: 480px) { ... }`

### Para Cambios Globales

Cuando necesites hacer cambios que afecten a TODOS los dispositivos:

1. Modifica **styles.css** (estilos generales)
2. Modifica **config.css** (para variables globales, colores, etc.)

## Estrategia de Especificidad

Para evitar conflictos de especificidad:

- Los estilos en **desktop.css** y **mobile.css** deben tener mayor especificidad que los de **styles.css**
- Evita usar `!important` excepto en casos extremadamente necesarios
- Usa selectores claros y específicos

## Flujo de Trabajo Recomendado

1. Primero define estilos comunes en **styles.css**
2. Luego personaliza para desktop en **desktop.css**
3. Finalmente adapta para móviles en **mobile.css**
4. Para elementos que deben mostrarse/ocultarse según dispositivo, usa las clases en **device-classes.css**

Siguiendo esta estructura, podrás modificar los estilos para un tipo de dispositivo sin afectar a los otros.
