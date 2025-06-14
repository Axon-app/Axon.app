// Información detallada de servicios
export const servicesData = {
  "desarrollo-web": {
    title: "Desarrollo Web Full-Stack",
    icon: "🌐",
    subtitle: "Aplicaciones web modernas y escalables",
    description:
      "Creamos soluciones web completas utilizando las tecnologías más avanzadas del mercado.",
    process: [
      {
        step: "1. Análisis & Planificación",
        description:
          "Definimos arquitectura, tecnologías y roadmap del proyecto",
        tools: ["Figma", "Miro", "Notion"],
      },
      {
        step: "2. Diseño & Prototipado",
        description: "Creamos wireframes, mockups y prototipos interactivos",
        tools: ["React", "Tailwind CSS", "Storybook"],
      },
      {
        step: "3. Desarrollo Frontend",
        description: "Implementamos interfaces responsivas y optimizadas",
        tools: ["React", "Next.js", "TypeScript", "Vite"],
      },
      {
        step: "4. Desarrollo Backend",
        description: "APIs robustas, bases de datos y lógica de negocio",
        tools: ["Node.js", "Python", "PostgreSQL", "MongoDB"],
      },
      {
        step: "5. Testing & Deployment",
        description: "Pruebas automatizadas y despliegue en producción",
        tools: ["Jest", "Cypress", "Docker", "Vercel", "AWS"],
      },
    ],
    technologies: [
      "React",
      "Next.js",
      "Node.js",
      "Python",
      "TypeScript",
      "Tailwind CSS",
    ],
    features: [
      "Diseño responsive y mobile-first",
      "Optimización SEO avanzada",
      "Performance de carga ultrarrápida",
      "Integración con APIs y servicios",
      "Panel de administración personalizado",
      "Analytics y métricas en tiempo real",
    ],
  },
  "apps-moviles": {
    title: "Apps Móviles Nativas",
    icon: "📱",
    subtitle: "Experiencias móviles que conquistan usuarios",
    description:
      "Desarrollamos aplicaciones móviles nativas e híbridas que destacan en las tiendas de aplicaciones.",
    process: [
      {
        step: "1. Investigación UX",
        description: "Análisis de usuarios, mercado y competencia",
        tools: ["User Research", "Analytics", "Surveys"],
      },
      {
        step: "2. Diseño de UI/UX",
        description:
          "Prototipos interactivos siguiendo guidelines de iOS/Android",
        tools: ["Figma", "Principle", "InVision"],
      },
      {
        step: "3. Desarrollo Nativo",
        description: "Código nativo optimizado para cada plataforma",
        tools: ["Swift", "Kotlin", "React Native", "Flutter"],
      },
      {
        step: "4. Integración de APIs",
        description: "Conexión con servicios backend y APIs externas",
        tools: ["REST APIs", "GraphQL", "Firebase"],
      },
      {
        step: "5. Testing & Publicación",
        description: "Pruebas en dispositivos reales y publicación en stores",
        tools: ["TestFlight", "Play Console", "Detox"],
      },
    ],
    technologies: [
      "React Native",
      "Flutter",
      "Swift",
      "Kotlin",
      "Firebase",
      "Expo",
    ],
    features: [
      "Experiencia nativa en iOS y Android",
      "Notificaciones push inteligentes",
      "Sincronización offline/online",
      "Integración con hardware del dispositivo",
      "Análisis de comportamiento de usuarios",
      "Actualizaciones OTA (Over-The-Air)",
    ],
  },
  "arquitectura-cloud": {
    title: "Arquitectura Cloud",
    icon: "☁️",
    subtitle: "Infraestructura escalable y segura",
    description:
      "Diseñamos y desplegamos soluciones cloud que crecen con tu negocio.",
    process: [
      {
        step: "1. Auditoría de Infraestructura",
        description: "Análisis de sistemas actuales y necesidades futuras",
        tools: ["AWS Well-Architected", "Cloud Assessment"],
      },
      {
        step: "2. Diseño de Arquitectura",
        description: "Diseño de soluciones escalables y resilientes",
        tools: ["Terraform", "CloudFormation", "Kubernetes"],
      },
      {
        step: "3. Migración y Deployment",
        description: "Migración segura y despliegue de aplicaciones",
        tools: ["Docker", "CI/CD", "Blue-Green Deployment"],
      },
      {
        step: "4. Monitoreo y Optimización",
        description: "Implementación de observabilidad y optimización continua",
        tools: ["CloudWatch", "Prometheus", "Grafana"],
      },
      {
        step: "5. Seguridad y Compliance",
        description: "Implementación de mejores prácticas de seguridad",
        tools: ["IAM", "VPC", "Security Groups", "WAF"],
      },
    ],
    technologies: ["AWS", "Azure", "GCP", "Kubernetes", "Docker", "Terraform"],
    features: [
      "Auto-scaling automático",
      "Alta disponibilidad 99.9%",
      "Backup y disaster recovery",
      "Monitoreo 24/7",
      "Optimización de costos",
      "Compliance y certificaciones",
    ],
  },
  "apis-integracion": {
    title: "APIs & Integración",
    icon: "🔗",
    subtitle: "Conectando sistemas y servicios",
    description:
      "Desarrollamos APIs robustas e integramos sistemas empresariales complejos.",
    process: [
      {
        step: "1. Análisis de Integración",
        description: "Mapeo de sistemas existentes y flujos de datos",
        tools: ["API Documentation", "System Analysis"],
      },
      {
        step: "2. Diseño de API",
        description: "Especificación OpenAPI y arquitectura de endpoints",
        tools: ["OpenAPI", "Postman", "Swagger"],
      },
      {
        step: "3. Desarrollo de APIs",
        description: "Implementación de endpoints seguros y escalables",
        tools: ["Node.js", "Python", "GraphQL", "REST"],
      },
      {
        step: "4. Testing y Documentación",
        description: "Pruebas exhaustivas y documentación completa",
        tools: ["Jest", "Supertest", "API Testing"],
      },
      {
        step: "5. Deployment y Monitoreo",
        description: "Despliegue y monitoreo continuo de APIs",
        tools: ["API Gateway", "Rate Limiting", "Analytics"],
      },
    ],
    technologies: [
      "REST",
      "GraphQL",
      "Node.js",
      "Python",
      "API Gateway",
      "OAuth",
    ],
    features: [
      "Documentación interactiva",
      "Autenticación y autorización",
      "Rate limiting y throttling",
      "Versionado de APIs",
      "Monitoreo y analytics",
      "SDKs personalizados",
    ],
  },
  "inteligencia-artificial": {
    title: "Inteligencia Artificial",
    icon: "🤖",
    subtitle: "Automatización inteligente para tu negocio",
    description:
      "Implementamos soluciones de IA que transforman procesos y generan insights valiosos.",
    process: [
      {
        step: "1. Identificación de Casos de Uso",
        description: "Análisis de procesos susceptibles de automatización",
        tools: ["Business Analysis", "Process Mining"],
      },
      {
        step: "2. Preparación de Datos",
        description: "Limpieza, normalización y preparación de datasets",
        tools: ["Python", "Pandas", "SQL", "ETL"],
      },
      {
        step: "3. Desarrollo de Modelos",
        description: "Entrenamiento y validación de modelos de ML",
        tools: ["TensorFlow", "PyTorch", "Scikit-learn"],
      },
      {
        step: "4. Integración y Deployment",
        description: "Implementación en producción con MLOps",
        tools: ["Docker", "Kubernetes", "MLflow"],
      },
      {
        step: "5. Monitoreo y Reentrenamiento",
        description: "Monitoreo continuo y mejora de modelos",
        tools: ["Model Monitoring", "A/B Testing"],
      },
    ],
    technologies: [
      "Python",
      "TensorFlow",
      "PyTorch",
      "OpenAI",
      "Hugging Face",
      "MLOps",
    ],
    features: [
      "Procesamiento de lenguaje natural",
      "Computer vision y reconocimiento",
      "Análisis predictivo avanzado",
      "Chatbots inteligentes",
      "Automatización de procesos",
      "Dashboards de insights",
    ],
  },
  ciberseguridad: {
    title: "Ciberseguridad",
    icon: "🔒",
    subtitle: "Protección integral de activos digitales",
    description:
      "Implementamos estrategias de seguridad multicapa para proteger tu infraestructura digital.",
    process: [
      {
        step: "1. Auditoría de Seguridad",
        description: "Evaluación completa de vulnerabilidades y riesgos",
        tools: ["Nessus", "OWASP ZAP", "Burp Suite"],
      },
      {
        step: "2. Análisis de Riesgos",
        description: "Identificación y priorización de amenazas",
        tools: ["Risk Assessment", "Threat Modeling"],
      },
      {
        step: "3. Implementación de Controles",
        description: "Despliegue de medidas de seguridad técnicas",
        tools: ["Firewalls", "IDS/IPS", "SIEM"],
      },
      {
        step: "4. Monitoreo Continuo",
        description: "Vigilancia 24/7 de actividades sospechosas",
        tools: ["SOC", "Incident Response", "Forensics"],
      },
      {
        step: "5. Capacitación y Compliance",
        description: "Entrenamiento del equipo y cumplimiento normativo",
        tools: ["Security Training", "Compliance Audits"],
      },
    ],
    technologies: [
      "SIEM",
      "Firewall",
      "IDS/IPS",
      "Encryption",
      "PKI",
      "Zero Trust",
    ],
    features: [
      "Pentesting y ethical hacking",
      "Implementación de ISO 27001",
      "Gestión de identidades (IAM)",
      "Cifrado end-to-end",
      "Respuesta a incidentes 24/7",
      "Compliance GDPR y SOX",
    ],
  },
  // Servicios de Diseño & Estrategia
  "ui-ux-design": {
    title: "UI/UX Design",
    icon: "✨",
    subtitle: "Interfaces intuitivas y experiencias memorables",
    description:
      "Diseñamos experiencias digitales centradas en el usuario que convierten y deleitan.",
    process: [
      {
        step: "1. Research y Discovery",
        description: "Investigación de usuarios y análisis de mercado",
        tools: ["User Interviews", "Surveys", "Analytics"],
      },
      {
        step: "2. Arquitectura de Información",
        description: "Estructuración de contenido y flujos de usuario",
        tools: ["User Journey", "Sitemap", "Card Sorting"],
      },
      {
        step: "3. Wireframing y Prototipado",
        description: "Creación de wireframes y prototipos interactivos",
        tools: ["Figma", "Sketch", "Principle"],
      },
      {
        step: "4. Diseño Visual",
        description: "Aplicación de identidad visual y sistemas de diseño",
        tools: ["Design Systems", "Style Guides", "Figma"],
      },
      {
        step: "5. Testing y Validación",
        description: "Pruebas de usabilidad y optimización iterativa",
        tools: ["Usability Testing", "A/B Testing", "Hotjar"],
      },
    ],
    technologies: [
      "Figma",
      "Sketch",
      "Adobe XD",
      "Principle",
      "InVision",
      "Hotjar",
    ],
    features: [
      "Design systems escalables",
      "Prototipado interactivo",
      "Testing de usabilidad",
      "Diseño responsive",
      "Accessibility (WCAG)",
      "Optimización de conversión",
    ],
  },
  "estrategia-digital": {
    title: "Estrategia Digital",
    icon: "🎯",
    subtitle: "Consultoría tecnológica estratégica",
    description:
      "Desarrollamos roadmaps tecnológicos que alinean la estrategia digital con objetivos de negocio.",
    process: [
      {
        step: "1. Diagnóstico Digital",
        description: "Evaluación del estado actual de madurez digital",
        tools: ["Digital Maturity Assessment", "SWOT Analysis"],
      },
      {
        step: "2. Definición de Objetivos",
        description: "Establecimiento de KPIs y métricas de éxito",
        tools: ["OKRs", "Balanced Scorecard", "KPI Dashboard"],
      },
      {
        step: "3. Roadmap Tecnológico",
        description: "Planificación de iniciativas y proyectos prioritarios",
        tools: ["Roadmap Planning", "Technology Stack Analysis"],
      },
      {
        step: "4. Implementación Ágil",
        description: "Ejecución iterativa con metodologías ágiles",
        tools: ["Scrum", "Kanban", "Agile Ceremonies"],
      },
      {
        step: "5. Medición y Optimización",
        description: "Monitoreo continuo y ajustes estratégicos",
        tools: ["Analytics", "Performance Monitoring", "ROI Analysis"],
      },
    ],
    technologies: [
      "Business Intelligence",
      "Analytics",
      "CRM",
      "ERP",
      "Cloud Platforms",
      "AI/ML",
    ],
    features: [
      "Transformación digital integral",
      "Automatización de procesos",
      "Integración de sistemas legacy",
      "Change management",
      "ROI measurement",
      "Escalabilidad empresarial",
    ],
  },
  "data-analytics": {
    title: "Data Analytics",
    icon: "📊",
    subtitle: "Insights accionables para toma de decisiones",
    description:
      "Convertimos datos en información estratégica mediante análisis avanzado y visualización inteligente.",
    process: [
      {
        step: "1. Auditoría de Datos",
        description: "Evaluación de fuentes de datos y calidad de información",
        tools: ["Data Profiling", "Quality Assessment"],
      },
      {
        step: "2. Diseño de Arquitectura",
        description: "Implementación de data warehouse y pipelines ETL",
        tools: ["Snowflake", "BigQuery", "Apache Airflow"],
      },
      {
        step: "3. Análisis Exploratorio",
        description: "Descubrimiento de patrones y tendencias en los datos",
        tools: ["Python", "R", "SQL", "Jupyter"],
      },
      {
        step: "4. Visualización de Datos",
        description: "Creación de dashboards interactivos y reportes",
        tools: ["Tableau", "Power BI", "D3.js", "Plotly"],
      },
      {
        step: "5. Modelado Predictivo",
        description: "Desarrollo de modelos de machine learning",
        tools: ["Scikit-learn", "TensorFlow", "Prophet"],
      },
    ],
    technologies: ["Python", "R", "SQL", "Tableau", "Power BI", "Apache Spark"],
    features: [
      "Dashboards en tiempo real",
      "Análisis predictivo",
      "Segmentación de clientes",
      "Forecasting de ventas",
      "Optimización de procesos",
      "Reportes automatizados",
    ],
  },
  "devops-automatizacion": {
    title: "DevOps & Automatización",
    icon: "🔄",
    subtitle: "Optimización de procesos de desarrollo",
    description:
      "Implementamos cultura DevOps y automatización para acelerar el ciclo de desarrollo y deployment.",
    process: [
      {
        step: "1. Assessment DevOps",
        description:
          "Evaluación de procesos actuales y identificación de mejoras",
        tools: ["DevOps Maturity Assessment", "Process Analysis"],
      },
      {
        step: "2. Diseño de Pipelines",
        description: "Configuración de CI/CD y automatización de testing",
        tools: ["Jenkins", "GitLab CI", "GitHub Actions"],
      },
      {
        step: "3. Containerización",
        description: "Dockerización de aplicaciones y orquestación",
        tools: ["Docker", "Kubernetes", "Helm"],
      },
      {
        step: "4. Infrastructure as Code",
        description: "Gestión de infraestructura mediante código",
        tools: ["Terraform", "Ansible", "CloudFormation"],
      },
      {
        step: "5. Monitoreo y Observabilidad",
        description: "Implementación de métricas, logs y alertas",
        tools: ["Prometheus", "Grafana", "ELK Stack"],
      },
    ],
    technologies: [
      "Docker",
      "Kubernetes",
      "Jenkins",
      "Terraform",
      "Ansible",
      "Prometheus",
    ],
    features: [
      "CI/CD automatizado",
      "Infrastructure as Code",
      "Monitoreo 24/7",
      "Automated testing",
      "Blue-green deployments",
      "Rollback automático",
    ],
  },
};
