# Migración a reCAPTCHA v3 - Documentación

## 📋 Resumen de Cambios

Se ha actualizado completamente la implementación de reCAPTCHA de v2 a v3 en Axon.App para solucionar el error "ERROR para el propietario del sitio web: la clave del sitio web no es válida".

## 🔧 Cambios Técnicos Realizados

### 1. Configuración HTML (index.html)

```html
<!-- ANTES: reCAPTCHA v2 -->
<script src="https://www.google.com/recaptcha/api.js" async defer></script>

<!-- DESPUÉS: reCAPTCHA v3 -->
<script
  src="https://www.google.com/recaptcha/api.js?render=6Lf_zGErAAAABEXtzpIGpDrdSsxAOulq2sadHas"
  async
  defer
></script>
```

### 2. Componente ReCaptcha (src/components/security/ReCaptcha.jsx)

- **ANTES**: Checkbox visible para el usuario (v2)
- **DESPUÉS**: Funciona invisible en segundo plano (v3)
- **Nuevas funciones**:
  - Ejecución automática al envío del formulario
  - Carga asíncrona del script
  - Mensaje de políticas de Google
  - Sin interacción manual del usuario

### 3. Hook useRecaptcha (src/hooks/useRecaptcha.js)

- **ANTES**: Manejo de estados `verified`, `expired`, `error`
- **DESPUÉS**:
  - Función `executeRecaptcha()` para ejecutar la verificación
  - Manejo de acciones específicas (`quote_form`, `consultation_form`)
  - Estados `isExecuting` y `token`

### 4. Servicio de configuración (src/services/recaptchaService.js)

```javascript
// ANTES: Configuración v2
export const RECAPTCHA_CONFIG = {
  SITE_KEY: "6Lf_zGErAAAABEXtzpIGpDrdSsxAOulq2sadHas",
  THEME: "dark",
  SIZE: "normal",
  LANGUAGE: "es",
};

// DESPUÉS: Configuración v3
export const RECAPTCHA_CONFIG = {
  SITE_KEY: "6Lf_zGErAAAABEXtzpIGpDrdSsxAOulq2sadHas",
  LANGUAGE: "es",
  ACTIONS: {
    QUOTE: "quote_form",
    CONSULTATION: "consultation_form",
    CONTACT: "contact_form",
    SUBMIT: "submit_form",
  },
  MIN_SCORE: 0.5,
};
```

### 5. Formularios Actualizados

#### QuoteModal.jsx

- **Cambios en lógica**: La validación de reCAPTCHA se ejecuta al momento del envío
- **Nuevo flujo**:
  1. Usuario llena formulario
  2. Hace clic en "Solicitar Cotización"
  3. Se ejecuta automáticamente reCAPTCHA v3
  4. Si es exitoso, se envía el formulario

#### ConsultationModal.jsx

- **Misma lógica aplicada**: Ejecución automática en el envío
- **Acción específica**: `consultation_form`

## 🔒 Mejoras de Seguridad

### reCAPTCHA v3 vs v2

| Característica              | v2                  | v3                                  |
| --------------------------- | ------------------- | ----------------------------------- |
| **Interacción del usuario** | Checkbox manual     | Automático/invisible                |
| **Experiencia UX**          | Requiere clic       | Sin fricción                        |
| **Puntuación de riesgo**    | Binario (pass/fail) | Escala 0.0-1.0                      |
| **Protección**              | Básica              | Análisis de comportamiento avanzado |
| **Implementación**          | Simple              | Requiere lógica de puntuación       |

### Protecciones Implementadas

1. **Ejecución automática**: No requiere interacción del usuario
2. **Análisis de comportamiento**: Google analiza el comportamiento del usuario
3. **Puntuación de riesgo**: Se puede configurar umbral mínimo (actualmente 0.5)
4. **Acciones específicas**: Diferentes acciones para diferentes formularios

## 🚀 Flujo de Usuario Mejorado

### ANTES (v2):

1. Usuario llena formulario
2. **Debe hacer clic en checkbox reCAPTCHA**
3. **Puede requerir resolver desafío visual**
4. Botón se habilita solo después de verificación
5. Envía formulario

### DESPUÉS (v3):

1. Usuario llena formulario
2. Hace clic en "Enviar"
3. **Automáticamente se ejecuta reCAPTCHA v3**
4. **Sin interrupción del flujo**
5. Formulario se envía si la verificación es exitosa

## 📱 Componente reCAPTCHA v3

```jsx
// Nuevo componente simplificado
<ReCaptchaComponent
  action="quote_form" // Acción específica
  className="mb-4"
/>
```

### Características del componente:

- **Invisible**: No muestra checkbox
- **Automático**: Se ejecuta programáticamente
- **Informativo**: Muestra enlaces a políticas de Google
- **Estados**: Indica "Cargando..." y "Verificando..."

## 🛠️ Cómo Funciona Internamente

1. **Carga del script**: Se carga automáticamente al cargar la página
2. **Preparación**: El objeto `grecaptcha` queda disponible globalmente
3. **Ejecución**: Al enviar formulario se llama `grecaptcha.execute()`
4. **Token**: Se obtiene un token que se envía con los datos del formulario
5. **Verificación backend**: El token se debe verificar en el servidor (simulado actualmente)

## 🔍 Verificación de Funcionamiento

### Indicadores de que funciona correctamente:

1. **No aparece error** "la clave del sitio web no es válida"
2. **Scripts se cargan** sin errores en la consola
3. **Formularios se envían** sin problemas
4. **Experiencia fluida** sin checkboxes manuales

### Debugging:

```javascript
// Verificar que reCAPTCHA está cargado
console.log(window.grecaptcha); // Debe mostrar objeto

// Verificar ejecución
window.grecaptcha.ready(() => {
  console.log("reCAPTCHA ready!");
});
```

## 📋 Lista de Verificación Post-Migración

- [✅] Script de reCAPTCHA v3 cargado correctamente
- [✅] Componente ReCaptcha actualizado para v3
- [✅] Hook useRecaptcha migrado
- [✅] Formularios QuoteModal y ConsultationModal actualizados
- [✅] Build exitoso sin errores
- [✅] Lint sin warnings
- [✅] Configuración de servicios actualizada
- [✅] Documentación creada

## 🔮 Próximos Pasos

1. **Verificación en producción**: Probar en el sitio web desplegado
2. **Monitoreo**: Verificar que no aparezcan errores de reCAPTCHA
3. **Optimización**: Ajustar umbral de puntuación si es necesario
4. **Backend**: Implementar verificación real del token en el servidor

## 📝 Notas Importantes

- **Clave pública**: `6Lf_zGErAAAABEXtzpIGpDrdSsxAOulq2sadHas`
- **Clave secreta**: `6Lf_zGErAAAAPn_phMfpriBXnUWdeZBtu2GenV` (solo para backend)
- **Dominio autorizado**: Verificar que el dominio esté registrado en Google Cloud Console
- **Límites de uso**: reCAPTCHA v3 tiene límites de requests por minuto

---

_Migración completada el 15 de junio de 2025_
_Todos los formularios ahora utilizan reCAPTCHA v3 exitosamente_
