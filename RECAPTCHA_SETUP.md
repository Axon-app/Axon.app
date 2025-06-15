# Configuración de Google reCAPTCHA v2

## 🛡️ Implementación Completada

Se ha implementado Google reCAPTCHA v2 en los formularios de Axon.App para protección contra bots y ataques automatizados.

## 📋 Archivos Creados/Modificados

### Nuevos Archivos:

- `src/components/security/ReCaptcha.jsx` - Componente reutilizable de reCAPTCHA
- `src/hooks/useRecaptcha.js` - Hook personalizado para manejo de estado
- `src/services/recaptchaService.js` - Funciones de validación y configuración
- `RECAPTCHA_SETUP.md` - Esta documentación

### Archivos Modificados:

- `index.html` - Script de reCAPTCHA agregado
- `src/components/modals/QuoteModal.jsx` - Integración completa
- `src/components/modals/ConsultationModal.jsx` - Integración completa
- `package.json` - Dependencia react-google-recaptcha agregada

## 🔧 Configuración de Producción

### 1. Obtener Claves de Google reCAPTCHA

1. Ve a [Google reCAPTCHA Admin Console](https://www.google.com/recaptcha/admin/)
2. Haz clic en "+" para agregar un nuevo sitio
3. Completa el formulario:
   - **Etiqueta**: Axon.App
   - **Tipo**: reCAPTCHA v2 ("No soy un robot")
   - **Dominios**:
     - `localhost` (para desarrollo)
     - `axon-app.github.io` (para producción)
     - Tu dominio personalizado si tienes uno
4. Acepta los términos de servicio
5. Copia las claves generadas

### 2. Reemplazar Claves de Prueba

Actualizar en `src/services/recaptchaService.js`:

```javascript
export const RECAPTCHA_CONFIG = {
  // Reemplazar por tu clave pública real
  SITE_KEY: "TU_CLAVE_PUBLICA_AQUI",

  THEME: "dark",
  SIZE: "normal",
  LANGUAGE: "es",
};
```

### 3. Configurar Backend (Recomendado)

Para máxima seguridad, implementa validación del lado del servidor:

```javascript
// Ejemplo de endpoint Node.js/Express
app.post("/api/verify-recaptcha", async (req, res) => {
  const { token } = req.body;
  const secretKey = "TU_CLAVE_SECRETA_AQUI";

  try {
    const response = await fetch(
      "https://www.google.com/recaptcha/api/siteverify",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
        body: `secret=${secretKey}&response=${token}`,
      }
    );

    const data = await response.json();
    res.json({ success: data.success });
  } catch (error) {
    res.status(500).json({ success: false });
  }
});
```

Luego actualizar `verifyRecaptchaToken` en `recaptchaService.js`:

```javascript
export const verifyRecaptchaToken = async (token) => {
  try {
    const response = await fetch("/api/verify-recaptcha", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ token }),
    });

    const result = await response.json();
    return result.success;
  } catch (error) {
    return false;
  }
};
```

## 🔒 Características de Seguridad Implementadas

### Validación Frontend:

- ✅ Token requerido antes del envío
- ✅ Validación de expiración automática
- ✅ Reset automático en errores
- ✅ Botones deshabilitados sin verificación
- ✅ Mensajes de error específicos

### Protección contra Bots:

- ✅ reCAPTCHA v2 invisible hasta interacción sospechosa
- ✅ Rate limiting (max 2-3 envíos por minuto)
- ✅ Validación de entrada sanitizada
- ✅ Detección de patrones de inyección SQL
- ✅ Protección XSS integrada

## 🎨 UI/UX

### Diseño:

- ✅ Tema oscuro que coincide con el sitio
- ✅ Centrado y responsive
- ✅ Mensajes de error claros
- ✅ Integración visual perfecta

### Accesibilidad:

- ✅ Labels apropiados
- ✅ Soporte de teclado
- ✅ Mensajes de error legibles
- ✅ Contraste de color adecuado

## 🧪 Testing

### Para Desarrollo:

- La clave de prueba actual permite testing local
- reCAPTCHA siempre será exitoso en localhost
- No requiere interacción real del usuario

### Para Producción:

- Usar claves reales de Google
- Testear en diferentes navegadores
- Verificar funcionamiento en móviles
- Monitorear logs de validación

## 📊 Monitoreo

Considera implementar:

- Analytics de intentos fallidos
- Logs de tokens expirados
- Alertas de múltiples intentos sospechosos
- Dashboard de métricas de seguridad

## 🚀 Despliegue

1. Actualizar claves en variables de entorno
2. Configurar backend de validación
3. Testear en ambiente de staging
4. Monitorear logs post-despliegue
5. Verificar métricas de Google reCAPTCHA Console

## 🔄 Mantenimiento

- Revisar métricas mensuales en Google Console
- Actualizar dominios si cambia la URL
- Monitorear tasas de éxito/fallo
- Mantener dependencias actualizadas
