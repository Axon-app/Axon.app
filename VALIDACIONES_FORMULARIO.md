# Validaciones Estrictas del Formulario de Contacto

## Resumen de Mejoras Implementadas

Se han implementado validaciones estrictas en el formulario de contacto para garantizar la calidad y validez de los datos ingresados por los usuarios.

## Validaciones por Campo

### 1. Campo Nombre Completo

- **Solo letras permitidas**: Acepta únicamente letras del alfabeto español (a-z, A-Z, À-ÿ, ñ, Ñ)
- **Caracteres especiales**: Permitidos espacios, guiones (-) y apostrofes (')
- **NO números**: Rechaza cualquier dígito (0-9)
- **Longitud**: Mínimo 2 caracteres, máximo 50 caracteres
- **Validación en tiempo real**: Filtra automáticamente caracteres no válidos mientras el usuario escribe
- **Mensajes de error específicos**:
  - "El nombre es requerido" (campo vacío)
  - "El nombre debe tener al menos 2 caracteres"
  - "El nombre solo puede contener letras, espacios y caracteres válidos"
  - "El nombre no puede contener números"
  - "El nombre no puede exceder los 50 caracteres"

### 2. Campo Email

- **Formato estricto**: Validación exhaustiva del formato de email
- **Regex mejorada**: Cumple con estándares RFC para emails válidos
- **Conversión automática**: Convierte a minúsculas automáticamente
- **Longitud máxima**: 254 caracteres (estándar RFC)
- **Autocompletado**: Atributo `autocomplete="email"` para mejor UX
- **Type específico**: `type="email"` para teclado optimizado en móviles
- **Mensajes de error específicos**:
  - "El email es requerido"
  - "Ingrese un email válido (ejemplo: usuario@dominio.com)"
  - "El email es demasiado largo"

### 3. Campo Teléfono

- **Solo números y formato**: Acepta únicamente números, espacios, guiones, paréntesis y signo +
- **NO letras**: Rechaza cualquier letra o carácter especial no válido
- **Longitud**: Mínimo 10 dígitos, máximo 15 dígitos (excluyendo formato)
- **Formateo automático**: Permite separadores comunes (+, -, (), espacios)
- **Validación de longitud**: Cuenta solo los dígitos para la validación de longitud
- **Type específico**: `type="tel"` para teclado numérico en móviles
- **Autocompletado**: Atributo `autocomplete="tel"`
- **Placeholder informativo**: "Ej: +57 300 123 4567 (solo números)"
- **Mensajes de error específicos**:
  - "El teléfono solo puede contener números"
  - "El teléfono debe tener al menos 10 dígitos"
  - "El teléfono no puede tener más de 15 dígitos"
  - "Formato de teléfono inválido"

## Características Adicionales

### Validación en Tiempo Real

- **Filtrado automático**: Los caracteres no válidos se eliminan mientras el usuario escribe
- **Feedback inmediato**: Los errores se muestran y ocultan dinámicamente
- **Indicadores visuales**: Bordes rojos para errores, verdes para campos válidos

### Atributos HTML5 Mejorados

- **Pattern**: Expresiones regulares para validación del navegador
- **MaxLength/MinLength**: Límites de caracteres nativos
- **Required**: Marcado nativo de campos obligatorios
- **Title**: Tooltips informativos sobre los requisitos
- **Autocomplete**: Mejora la experiencia de autocompletado

### Accesibilidad

- **Labels asociados**: Cada campo tiene su label correctamente asociado
- **Mensajes de error**: Claramente vinculados con los campos
- **Indicadores visuales**: Colores y iconos para diferentes estados
- **Navegación por teclado**: Totalmente funcional

### Experiencia de Usuario

- **Placeholders informativos**: Ejemplos claros de formato esperado
- **Mensajes de error específicos**: Explican exactamente qué está mal
- **Validación progresiva**: Los errores se ocultan cuando se corrigen
- **Feedback visual**: Iconos de validación y colores de estado

## Formatos Aceptados

### Nombres Válidos ✅

- "Juan Pérez"
- "María José González-López"
- "José Luis O'Connor"
- "Ana Sofía"

### Nombres Inválidos ❌

- "Juan123" (contiene números)
- "Pedro@gmail" (contiene símbolos)
- "A" (muy corto)
- "Usuario_123" (guiones bajos y números)

### Emails Válidos ✅

- "usuario@dominio.com"
- "nombre.apellido@empresa.co"
- "email+tag@example.org"

### Emails Inválidos ❌

- "email_sin_arroba.com"
- "@dominio.com" (falta parte local)
- "usuario@" (falta dominio)

### Teléfonos Válidos ✅

- "3001234567"
- "+57 300 123 4567"
- "(300) 123-4567"
- "300-123-4567"

### Teléfonos Inválidos ❌

- "abc1234567" (contiene letras)
- "123" (muy corto)
- "12345678901234567" (muy largo)

## Implementación Técnica

### Funciones de Validación

1. **validateForm()**: Validación completa del formulario
2. **handleChange()**: Validación y filtrado en tiempo real
3. **getFieldAttributes()**: Configuración de atributos HTML5 por campo

### Expresiones Regulares Utilizadas

- **Nombre**: `/^[a-zA-ZÀ-ÿ\u00f1\u00d1\s'-]+$/`
- **Email**: `/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)\*$/`
- **Teléfono**: `/^[0-9\s\-()+ ]+$/`

Las validaciones están completamente implementadas y probadas. El formulario ahora garantiza que:

- Los nombres solo contengan letras y caracteres especiales válidos
- Los emails tengan formato válido
- Los teléfonos solo contengan números y formato válido
