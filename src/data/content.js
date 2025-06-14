/* cspell:disable */
/* Este archivo contiene texto en español que puede ser marcado como error por el linter */

// Datos para las secciones de la página

// Constantes para niveles de experiencia
const LEVELS = {
  EXPERT: "Expert",
  ADVANCED: "Advanced",
};

// Constantes para categorías
const CATEGORIES = {
  FRONTEND: "Frontend",
  BACKEND: "Backend",
  DEVOPS: "DevOps",
  DATABASE: "Database",
  CLOUD: "Cloud",
  AI_ML: "IA/ML",
  API: "API",
  PROGRAMMING: "Programming",
  CACHE: "Cache",
};

// Índices para búsqueda rápida
const categoryIndex = new Map();
const levelIndex = new Map();

export const technologies = [
  {
    name: "React",
    category: CATEGORIES.FRONTEND,
    icon: "⚛️",
    description: "Biblioteca para interfaces de usuario",
    gradient: "from-blue-500 to-cyan-400",
    level: LEVELS.EXPERT,
  },
  {
    name: "Node.js",
    category: CATEGORIES.BACKEND,
    icon: "�",
    description: "Runtime de JavaScript del lado del servidor",
    gradient: "from-green-500 to-emerald-400",
    level: LEVELS.EXPERT,
  },
  {
    name: "Python",
    category: CATEGORIES.AI_ML,
    icon: "🐍",
    description: "Lenguaje versátil para desarrollo y análisis",
    gradient: "from-yellow-500 to-orange-400",
    level: LEVELS.EXPERT,
  },
  {
    name: "AWS",
    category: CATEGORIES.CLOUD,
    icon: "☁️",
    description: "Servicios de computación en la nube",
    gradient: "from-orange-500 to-red-400",
    level: LEVELS.ADVANCED,
  },
  {
    name: "Docker",
    category: CATEGORIES.DEVOPS,
    icon: "�",
    description: "Plataforma de containerización",
    gradient: "from-blue-600 to-indigo-500",
    level: LEVELS.EXPERT,
  },
  {
    name: "Kubernetes",
    category: CATEGORIES.DEVOPS,
    icon: "☸️",
    description: "Orquestación de contenedores",
    gradient: "from-purple-500 to-pink-400",
    level: LEVELS.ADVANCED,
  },
  {
    name: "PostgreSQL",
    category: CATEGORIES.DATABASE,
    icon: "🐘",
    description: "Base de datos relacional avanzada",
    gradient: "from-blue-700 to-blue-500",
    level: LEVELS.EXPERT,
  },
  {
    name: "TensorFlow",
    category: CATEGORIES.AI_ML,
    icon: "🧠",
    description: "Framework de machine learning",
    gradient: "from-orange-600 to-yellow-500",
    level: LEVELS.ADVANCED,
  },
  {
    name: "TypeScript",
    category: CATEGORIES.PROGRAMMING,
    icon: "�",
    description: "JavaScript con tipado estático",
    gradient: "from-blue-500 to-blue-700",
    level: LEVELS.EXPERT,
  },
  {
    name: "MongoDB",
    category: CATEGORIES.DATABASE,
    icon: "�",
    description: "Base de datos NoSQL flexible",
    gradient: "from-green-600 to-green-400",
    level: LEVELS.EXPERT,
  },
  {
    name: "Redis",
    category: CATEGORIES.CACHE,
    icon: "�",
    description: "Almacén de datos en memoria",
    gradient: "from-red-500 to-red-400",
    level: LEVELS.ADVANCED,
  },
  {
    name: "GraphQL",
    category: CATEGORIES.API,
    icon: "🔗",
    description: "Lenguaje de consulta para APIs",
    gradient: "from-pink-500 to-purple-500",
    level: LEVELS.ADVANCED,
  },
  // Tecnologías adicionales para completar el ecosistema
  {
    name: "Vue.js",
    category: CATEGORIES.FRONTEND,
    icon: "�",
    description: "Framework progresivo para interfaces",
    gradient: "from-green-400 to-emerald-500",
    level: LEVELS.ADVANCED,
  },
  {
    name: "Angular",
    category: CATEGORIES.FRONTEND,
    icon: "🅰️",
    description: "Plataforma para aplicaciones web",
    gradient: "from-red-500 to-pink-500",
    level: LEVELS.ADVANCED,
  },
  {
    name: "Next.js",
    category: CATEGORIES.FRONTEND,
    icon: "▲",
    description: "Framework de React para producción",
    gradient: "from-gray-800 to-gray-600",
    level: LEVELS.EXPERT,
  },
  {
    name: "Express",
    category: CATEGORIES.BACKEND,
    icon: "🚀",
    description: "Framework web minimalista para Node.js",
    gradient: "from-gray-600 to-gray-800",
    level: LEVELS.EXPERT,
  },
  {
    name: "Django",
    category: CATEGORIES.BACKEND,
    icon: "🎯",
    description: "Framework web de alto nivel para Python",
    gradient: "from-green-700 to-green-900",
    level: LEVELS.ADVANCED,
  },
  {
    name: "FastAPI",
    category: CATEGORIES.BACKEND,
    icon: "⚡",
    description: "Framework moderno y rápido para APIs",
    gradient: "from-teal-500 to-cyan-600",
    level: LEVELS.ADVANCED,
  },
];

// Crear índices para búsqueda rápida
technologies.forEach((tech) => {
  // Índice por categoría
  if (!categoryIndex.has(tech.category)) {
    categoryIndex.set(tech.category, []);
  }
  categoryIndex.get(tech.category).push(tech);

  // Índice por nivel
  if (!levelIndex.has(tech.level)) {
    levelIndex.set(tech.level, []);
  }
  levelIndex.get(tech.level).push(tech);
});

// Funciones de ayuda para filtrado rápido
export const getTechnologiesByCategory = (category) =>
  categoryIndex.get(category) || [];
export const getTechnologiesByLevel = (level) => levelIndex.get(level) || [];
export const getCategories = () => Object.values(CATEGORIES);
export const getLevels = () => Object.values(LEVELS);
export const TECH_CATEGORIES = CATEGORIES;
export const TECH_LEVELS = LEVELS;

export const testimonials = [
  {
    name: "María González",
    role: "CEO de TechStart",
    avatar:
      "https://images.unsplash.com/photo-1494790108755-2616b612b5bc?w=100&h=100&fit=crop&crop=face",
    rating: 5,
    review:
      "Axon.App transformó completamente nuestra presencia digital. Su equipo no solo entregó un producto excepcional, sino que nos acompañó en todo el proceso de digitalización.",
  },
  {
    name: "Carlos Ruiz",
    role: "Fundador de InnovaCorp",
    avatar:
      "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop&crop=face",
    rating: 5,
    review:
      "La aplicación móvil que desarrollaron superó todas nuestras expectativas. La atención al detalle y la calidad del código son impresionantes.",
  },
  {
    name: "Ana Martín",
    role: "Directora de Marketing Digital",
    avatar:
      "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop&crop=face",
    rating: 5,
    review:
      "Profesionales excepcionales. Nos ayudaron a automatizar nuestros procesos y aumentar la eficiencia del equipo en un 300%.",
  },
  {
    name: "Luis Herrera",
    role: "CTO de DataFlow",
    avatar:
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=face",
    rating: 5,
    review:
      "Su expertise en inteligencia artificial nos permitió implementar soluciones que pensábamos eran imposibles. Altamente recomendados.",
  },
  {
    name: "Sofia Ramírez",
    role: "Gerente de Operaciones",
    avatar:
      "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&h=100&fit=crop&crop=face",
    rating: 5,
    review:
      "La plataforma e-commerce que crearon nos ha permitido triplicar nuestras ventas online. Su soporte post-lanzamiento es excelente.",
  },
  {
    name: "Roberto Silva",
    role: "Director de Producto",
    avatar:
      "https://images.unsplash.com/photo-1560250097-0b93528c311a?w=100&h=100&fit=crop&crop=face",
    rating: 5,
    review:
      "Trabajar con Axon.App fue una experiencia increíble. Su enfoque ágil y comunicación constante hicieron que el proyecto fuera un éxito total.",
  },
];

export const services = [
  {
    id: "desarrollo-web",
    title: "Desarrollo Web",
    icon: "💻",
    description:
      "Creamos sitios web y aplicaciones web modernas, responsivas y optimizadas para SEO, utilizando las últimas tecnologías.",
  },
  {
    id: "desarrollo-movil",
    title: "Desarrollo Móvil",
    icon: "📱",
    description:
      "Aplicaciones móviles nativas e híbridas para iOS y Android que ofrecen experiencias de usuario excepcionales.",
  },
  {
    id: "ui-ux-design",
    title: "Diseño UI/UX",
    icon: "🎨",
    description:
      "Diseños centrados en el usuario que combinan estética moderna con funcionalidad intuitiva y accesible.",
  },
  {
    id: "cloud-solutions",
    title: "Soluciones Cloud",
    icon: "☁️",
    description:
      "Infraestructura escalable y segura en la nube para optimizar el rendimiento y reducir costos operativos.",
  },
  {
    id: "inteligencia-artificial",
    title: "Inteligencia Artificial",
    icon: "🧠",
    description:
      "Implementamos IA y Machine Learning para automatizar procesos y extraer insights valiosos de los datos.",
  },
  {
    id: "ciberseguridad",
    title: "Ciberseguridad",
    icon: "🔒",
    description:
      "Protección integral de activos digitales con las mejores prácticas de seguridad y monitoreo continuo.",
  },
];
