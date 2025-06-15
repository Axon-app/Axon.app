# Technical Documentation

## Axon.App - Technical Implementation Guide

### Architecture Overview

#### Frontend Stack

- **React 19**: Latest version with concurrent features
- **Vite 6**: Ultra-fast build tool and dev server
- **Tailwind CSS 4**: Utility-first CSS framework
- **ES6+ Modules**: Modern JavaScript architecture

#### Development Environment

- **Node.js**: 18+ recommended
- **npm**: Package management
- **ESLint**: Code quality and standards
- **PostCSS**: CSS processing and optimization

### Component Architecture

#### Core Components Structure

```
src/components/
├── forms/
│   └── ContactForm.jsx          # Main contact form
├── modals/
│   ├── CookiesModal.jsx         # Cookie consent
│   ├── PrivacyModal.jsx         # Privacy policy
│   └── TermsModal.jsx           # Terms of service
├── ui/
│   ├── EmailClientSelector.jsx  # Email client detection
│   └── EmailLink.jsx            # Universal email links
└── UIComponents.jsx             # Main UI components
```

#### Component Design Patterns

- **Functional Components**: React hooks exclusively
- **Custom Hooks**: Reusable logic extraction
- **Prop Validation**: Runtime type checking
- **Error Boundaries**: Graceful error handling

### State Management

#### React Hooks Implementation

```javascript
// Example: Email selector hook
const useEmailSelector = () => {
  const [selectedClient, setSelectedClient] = useState("default");
  const [isOpen, setIsOpen] = useState(false);

  const detectEmailClient = useCallback(() => {
    // Client detection logic
  }, []);

  return { selectedClient, isOpen, detectEmailClient };
};
```

#### State Patterns

- **Local State**: useState for component-specific data
- **Effect Hooks**: useEffect for lifecycle management
- **Memoization**: useMemo/useCallback for performance
- **Custom Hooks**: Reusable stateful logic

### API Integration

#### EmailJS Service

```javascript
// Email service implementation
const emailService = {
  async sendEmail(templateParams) {
    try {
      const response = await emailjs.send(
        import.meta.env.VITE_EMAILJS_SERVICE_ID,
        import.meta.env.VITE_EMAILJS_TEMPLATE_ID,
        templateParams,
        import.meta.env.VITE_EMAILJS_PUBLIC_KEY
      );
      return { success: true, data: response };
    } catch (error) {
      return { success: false, error: error.message };
    }
  },
};
```

#### Environment Variables

```env
VITE_EMAILJS_SERVICE_ID=your_service_id
VITE_EMAILJS_TEMPLATE_ID=your_template_id
VITE_EMAILJS_PUBLIC_KEY=your_public_key
```

### Performance Optimization

#### Code Splitting

```javascript
// Lazy loading implementation
const ContactForm = lazy(() => import("./components/forms/ContactForm"));
const CookiesModal = lazy(() => import("./components/modals/CookiesModal"));

// Suspense wrapper
<Suspense fallback={<LoadingSpinner />}>
  <ContactForm />
</Suspense>;
```

#### Bundle Optimization

- **Tree Shaking**: Unused code elimination
- **Chunk Splitting**: Logical code separation
- **Asset Optimization**: Image and font optimization
- **Caching Strategy**: Browser cache optimization

### Build Configuration

#### Vite Configuration

```javascript
// vite.config.js
export default defineConfig({
  plugins: [react()],
  build: {
    rollupOptions: {
      output: {
        manualChunks: {
          vendor: ["react", "react-dom"],
          emailjs: ["@emailjs/browser"],
        },
      },
    },
  },
  optimizeDeps: {
    include: ["react", "react-dom", "@emailjs/browser"],
  },
});
```

#### Tailwind Configuration

```javascript
// tailwind.config.js
export default {
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      fontFamily: {
        orbitron: ["Orbitron", "monospace"],
        rajdhani: ["Rajdhani", "sans-serif"],
      },
    },
  },
  plugins: [],
};
```

### Testing Strategy

#### Unit Testing

- **React Testing Library**: Component testing
- **Jest**: Test runner and assertions
- **MSW**: API mocking for email service
- **Coverage**: 85%+ target coverage

#### Integration Testing

- **User Interactions**: Form submissions
- **Email Flow**: End-to-end email testing
- **Modal Behavior**: User interface testing
- **Responsive Design**: Multi-device testing

### Security Implementation

#### Input Validation

```javascript
// Form validation schema
const validateContactForm = (data) => {
  const errors = {};

  if (!data.name?.trim()) errors.name = "Name is required";
  if (!isValidEmail(data.email)) errors.email = "Valid email required";
  if (!data.message?.trim()) errors.message = "Message is required";

  return errors;
};
```

#### Data Protection

- **Sanitization**: Input cleaning and validation
- **Rate Limiting**: Form submission throttling
- **CORS**: Cross-origin request security
- **Environment Variables**: Sensitive data protection

### Deployment Pipeline

#### GitHub Actions Workflow

```yaml
name: Deploy to GitHub Pages
on:
  push:
    branches: [main]

jobs:
  build-and-deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - name: Setup Node.js
        uses: actions/setup-node@v3
        with:
          node-version: "18"
      - name: Install dependencies
        run: npm ci
      - name: Build
        run: npm run build
      - name: Deploy
        uses: peaceiris/actions-gh-pages@v3
        with:
          github_token: ${{ secrets.GITHUB_TOKEN }}
          publish_dir: ./dist
```

#### Build Process

1. **Dependencies**: Install npm packages
2. **Linting**: Code quality checks
3. **Testing**: Run test suite
4. **Building**: Create production bundle
5. **Deployment**: Deploy to GitHub Pages

### Monitoring & Analytics

#### Performance Monitoring

- **Core Web Vitals**: LCP, FID, CLS tracking
- **Bundle Analysis**: Size and composition monitoring
- **Error Tracking**: Runtime error detection
- **User Analytics**: Interaction tracking

#### Quality Metrics

```javascript
// Performance measurement
const measurePerformance = () => {
  const navigation = performance.getEntriesByType("navigation")[0];
  const metrics = {
    ttfb: navigation.responseStart - navigation.requestStart,
    fcp: performance.getEntriesByName("first-contentful-paint")[0]?.startTime,
    lcp: performance.getEntriesByType("largest-contentful-paint")[0]?.startTime,
  };
  return metrics;
};
```

### Accessibility Features

#### WCAG 2.1 AA Compliance

- **Keyboard Navigation**: Full keyboard support
- **Screen Readers**: ARIA labels and roles
- **Color Contrast**: 4.5:1 minimum ratio
- **Focus Management**: Visible focus indicators

#### Implementation Examples

```jsx
// Accessible modal component
const AccessibleModal = ({ isOpen, onClose, children }) => (
  <div
    role="dialog"
    aria-modal="true"
    aria-labelledby="modal-title"
    className={`modal ${isOpen ? "open" : "closed"}`}
  >
    <button onClick={onClose} aria-label="Close modal" className="modal-close">
      ×
    </button>
    {children}
  </div>
);
```

### Future Architecture Considerations

#### Scalability Patterns

- **Micro-frontends**: Modular architecture
- **State Management**: Redux/Zustand for complex state
- **API Layer**: GraphQL or REST API abstraction
- **Caching**: Advanced caching strategies

#### Technology Roadmap

- **Next.js Migration**: SSR/SSG capabilities
- **TypeScript**: Full type safety
- **PWA Features**: Offline functionality
- **Advanced Testing**: E2E testing with Playwright

---

This technical documentation provides comprehensive guidance for development, deployment, and maintenance of the Axon.App project. It serves as a reference for current and future developers working on the codebase.

**Last Updated**: December 2024  
**Version**: 2.4.0  
**Status**: Production Ready ✅
