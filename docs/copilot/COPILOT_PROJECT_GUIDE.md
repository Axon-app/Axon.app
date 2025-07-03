# Guía de Integración y Registro para GitHub Copilot

## Proyecto: Axon.App - Sitio Web Corporativo

### Propósito

Este archivo documenta el contexto, estado actual, integraciones clave y recomendaciones para el uso de GitHub Copilot en el desarrollo de este proyecto. Sirve como referencia para mantener la calidad, evitar errores y facilitar futuras mejoras.

---

## Estado Actual del Proyecto

- **Framework:** React 18 + Vite
- **Estilos:** Tailwind CSS
- **Linting:** ESLint con reglas modernas y plugins para React
- **CI/CD:** Despliegue automático a GitHub Pages vía GitHub Actions (`.github/workflows/deploy.yml`)
- **Estructura:** Código modular, componentes reutilizables, animaciones personalizadas, documentación técnica y de usuario
- **Revisión profesional completa:** Todos los archivos fuente y de configuración han sido revisados, optimizados y documentados profesionalmente (29/06/2025)
- **Sugerencias de mejora profesional:** Incluidas en cada archivo clave para facilitar la evolución del proyecto
- **Confirmación de seguridad:** No se detectó código malicioso ni dependencias inseguras

---

## Integraciones Clave

- **GitHub Copilot:** Extensión instalada y activa en VS Code
- **ESLint:** Configuración estricta para mantener calidad de código
- **Tailwind:** Personalización de theme y animaciones
- **Vite:** Optimización de build, alias y variables de entorno
- **CI/CD:** Validación, build y despliegue automático en cada push a `main`

---

## Buenas Prácticas y Recomendaciones

- Utilizar Copilot para sugerencias, pero siempre revisar y validar el código generado
- Ejecutar `npm run lint` y `npm run lint:fix` antes de cada commit
- Mantener este archivo actualizado con cada cambio relevante
- Documentar nuevas integraciones o cambios importantes aquí
- No exponer secretos ni variables sensibles en el código ni en archivos públicos
- Consultar la documentación técnica y las sugerencias de mejora profesional en cada archivo antes de realizar cambios estructurales

---

## Cambios y Mejoras Realizadas

- [29/06/2025] Revisión y optimización profesional de todos los archivos fuente y de configuración del proyecto
- [29/06/2025] Mejora y profesionalización de comentarios en todos los archivos revisados, explicando lógica, props, estructura, accesibilidad y funcionamiento
- [29/06/2025] Inclusión de bloques de sugerencias de mejora profesional al final de cada archivo revisado
- [29/06/2025] Confirmación de ausencia de código malicioso en todos los archivos revisados
- [29/06/2025] Limpieza de código malicioso/no usado donde existía (no se detectó en los archivos revisados)
- [29/06/2025] Documentación y sugerencias en archivos vacíos o de utilidad (ej: SuspenseLoader.jsx, ErrorBoundary.jsx, TestComponent.jsx)
- [29/06/2025] Estandarización de documentación y estructura en archivos de configuración y scripts
- [29/06/2025] Actualización de la documentación técnica, scripts y estructura del proyecto
- [29/06/2025] Todas las acciones se realizaron mediante herramientas de edición automatizada, asegurando trazabilidad y registro de los cambios
- [29/06/2025] Creación de esta guía para Copilot y registro de contexto inicial

---

## Notas para Copilot

- Este archivo sirve como fuente de contexto para sugerencias y generación de código
- Priorizar la calidad, seguridad y mantenibilidad en todas las sugerencias
- Consultar este archivo y la documentación técnica antes de realizar cambios estructurales o integraciones nuevas

---

> Actualiza este archivo cada vez que se realice un cambio importante en la configuración, dependencias o estructura del proyecto.
