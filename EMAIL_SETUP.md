# Configuración de EmailJS para Axon.App

## Información de Contacto

- **Email principal**: axonapp.info@gmail.com
- Todos los formularios del sitio web envían notificaciones a este correo

## Configuración Actual

Actualmente, el sistema está configurado en **modo demo** para desarrollo. Los formularios:

- ✅ Funcionan correctamente
- ✅ Muestran todos los datos en consola
- ✅ Proporcionan feedback al usuario
- ⚠️ Envían emails simulados (modo demo)

## Para Activar Emails Reales (Producción)

### 1. Crear cuenta en EmailJS

1. Ir a [https://www.emailjs.com/](https://www.emailjs.com/)
2. Crear cuenta gratuita
3. Verificar el email axonapp.info@gmail.com

### 2. Configurar Servicio de Email

1. En EmailJS, crear un nuevo servicio
2. Conectar con Gmail usando axonapp.info@gmail.com
3. Copiar el Service ID

### 3. Crear Templates de Email

#### Template para Contacto General (template_contact)

```
Asunto: Nuevo mensaje de contacto desde Axon.App

Nuevo mensaje de contacto:

De: {{from_name}}
Email: {{from_email}}
Mensaje: {{message}}

---
Este mensaje fue enviado desde el formulario de contacto de Axon.App
```

#### Template para Cotizaciones (template_quote)

```
Asunto: Nueva Solicitud de Cotización - {{service_name}}

Nueva solicitud de cotización:

INFORMACIÓN DEL CLIENTE:
- Nombre: {{from_name}}
- Email: {{from_email}}
- Empresa: {{company}}
- Teléfono: {{phone}}

DETALLES DEL PROYECTO:
- Servicio: {{service_name}}
- Descripción: {{project_description}}
- Presupuesto: {{budget}}
- Timeline: {{timeline}}
- Requerimientos: {{requirements}}

---
Solicitud enviada desde Axon.App
```

#### Template para Consultas (template_consultation)

```
Asunto: Nueva Solicitud de Consulta - {{service_name}}

Nueva solicitud de consulta:

INFORMACIÓN DEL CLIENTE:
- Nombre: {{from_name}}
- Email: {{from_email}}
- Empresa: {{company}}
- Teléfono: {{phone}}

DETALLES DE LA CONSULTA:
- Servicio: {{service_name}}
- Fecha preferida: {{preferred_date}}
- Horario preferido: {{preferred_time}}
- Tipo de consulta: {{consultation_type}}
- Temas a tratar: {{topics}}
- Experiencia: {{experience}}

---
Solicitud enviada desde Axon.App
```

### 4. Actualizar Configuración en el Código

Editar `src/services/emailService.js`:

```javascript
// Reemplazar estos valores con los reales de EmailJS
const EMAIL_SERVICE_ID = "service_xxxxxxx"; // Tu Service ID real
const EMAIL_PUBLIC_KEY = "xxxxxxxxxxxxxxx"; // Tu Public Key real
```

### 5. Cambiar a Modo Producción

En los archivos donde se usa `sendEmailDemo`, cambiar por las funciones reales:

```javascript
// Cambiar de:
const { sendEmailDemo } = await import("../services/emailService");
const result = await sendEmailDemo("contact", formData);

// A:
const { sendContactEmail } = await import("../services/emailService");
const result = await sendContactEmail(formData);
```

## Formularios Configurados

### ✅ Formulario de Contacto General

- Ubicación: Sección "Contáctanos"
- Función: `sendContactEmail()`
- Template: `template_contact`

### ✅ Modal de Solicitud de Cotización

- Ubicación: Modal después de "Más Información" → "Solicitar Cotización"
- Función: `sendQuoteRequestEmail()`
- Template: `template_quote`

### ✅ Modal de Agendar Consulta

- Ubicación: Modal después de "Más Información" → "Agendar Consulta"
- Función: `sendConsultationRequestEmail()`
- Template: `template_consultation`

## Backup/Alternativa

Si EmailJS no funciona, el sistema tiene configurado un fallback usando Formspree:

1. Crear cuenta en [https://formspree.io/](https://formspree.io/)
2. Crear formulario apuntando a axonapp.info@gmail.com
3. Actualizar `YOUR_FORM_ID` en `emailService.js`

## Testing

Para probar los emails en desarrollo:

1. Revisar la consola del navegador - todos los datos se logean
2. Las alertas confirman si el envío fue exitoso
3. Los formularios se resetean automáticamente

## Contacto de Soporte

Si hay problemas con la configuración:

- Email: axonapp.info@gmail.com
- Los formularios siempre muestran este email como backup
