# Configuración de GitHub Copilot para Axon.App

## Contexto del Proyecto

Este es un proyecto React moderno con Vite, TailwindCSS y enfoque en UI/UX profesional.

### Stack Tecnológico Principal:

- **Frontend**: React 18 + Vite 6
- **Estilos**: TailwindCSS 4 + PostCSS
- **Validación**: ESLint + validaciones personalizadas
- **Bundling**: Vite con optimizaciones de producción
- **Deployment**: GitHub Pages (estático)

### Patrones de Código Preferidos:

- Componentes funcionales con hooks
- Custom hooks para lógica reutilizable
- Destructuring en props y estados
- Template literals para strings
- Async/await para promesas
- Memorización con useMemo/useCallback
- Manejo de errores con try/catch

### Convenciones de Nomenclatura:

- Componentes: PascalCase (ej: `ContactForm`)
- Hooks: camelCase con prefijo 'use' (ej: `useModals`)
- Archivos: camelCase (ej: `emailService.js`)
- CSS classes: kebab-case siguiendo TailwindCSS

### Estructura de Archivos:

```
src/
├── components/          # Componentes React
│   ├── forms/          # Formularios específicos
│   ├── modals/         # Modales y overlays
│   ├── sections/       # Secciones de página
│   ├── security/       # Componentes de seguridad
│   └── ui/             # Componentes UI reutilizables
├── data/               # Datos estáticos y configuración
├── hooks/              # Custom hooks
└── services/           # Servicios y APIs
```

### Requerimientos de Calidad:

1. **Accesibilidad**: ARIA labels, roles, keyboard navigation
2. **Seguridad**: Input sanitization, XSS prevention
3. **Rendimiento**: Code splitting, lazy loading, memorización
4. **Mantenibilidad**: Componentes modulares, hooks reutilizables
5. **Testing**: Componentes testables, validaciones robustas

### Patrones de Formularios:

- Validación en tiempo real
- Estados de loading/error/success
- Sanitización de inputs
- Mensajes de error específicos
- Accesibilidad completa (WCAG 2.1 AA)

### Ejemplos de Código Preferido:

```jsx
// ✅ CORRECTO: Componente funcional con hooks
const ContactForm = ({ onSubmit, className = "" }) => {
  const [formData, setFormData] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = useCallback(
    async (e) => {
      e.preventDefault();
      setIsSubmitting(true);
      try {
        await onSubmit(formData);
      } catch (error) {
        console.error("Form submission error:", error);
      } finally {
        setIsSubmitting(false);
      }
    },
    [formData, onSubmit]
  );

  return (
    <form onSubmit={handleSubmit} className={`form-container ${className}`}>
      {/* JSX content */}
    </form>
  );
};

// ❌ EVITAR: Componentes de clase
class ContactForm extends React.Component {
  // No usar este patrón
}
```

### TailwindCSS - Patrones Preferidos:

```jsx
// ✅ Classes organizadas por categoría
<div className="
  // Layout
  flex items-center justify-between
  // Spacing
  p-6 m-4
  // Sizing
  w-full max-w-md
  // Colors
  bg-gradient-to-r from-blue-500 to-purple-600
  text-white
  // Effects
  shadow-lg rounded-xl
  // States
  hover:shadow-2xl focus:outline-none focus:ring-2
  // Responsive
  sm:p-8 md:max-w-lg
">
```

### Manejo de Errores:

```jsx
// ✅ CORRECTO: Try/catch con estados específicos
const handleAction = async () => {
  try {
    setLoading(true);
    const result = await apiCall();
    setData(result);
  } catch (error) {
    setError(error.message || "Error desconocido");
    console.error("Action failed:", error);
  } finally {
    setLoading(false);
  }
};
```

### Validaciones de Seguridad:

```jsx
// ✅ CORRECTO: Sanitización y validación
const sanitizeInput = (input) => {
  return input.trim().replace(/[<>]/g, "").substring(0, 255);
};

const validateEmail = (email) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};
```

## Configuración del Workspace

Para obtener las mejores sugerencias de Copilot:

1. **Mantén archivos relacionados abiertos** - Copilot usa contexto de pestañas abiertas
2. **Escribe comentarios descriptivos** - Ayudan a Copilot entender la intención
3. **Usa nombres descriptivos** - Variables y funciones con nombres claros
4. **Estructura consistente** - Mantén patrones consistentes en el proyecto

## Shortcuts y Comandos Útiles:

- `Ctrl+I`: Abrir Copilot Chat
- `Alt+\` o `Tab`: Aceptar sugerencia
- `Alt+]`: Siguiente sugerencia
- `Alt+[`: Sugerencia anterior
- `Ctrl+Shift+P` > "GitHub Copilot: Toggle"
