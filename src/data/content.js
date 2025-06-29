/**
 * content.js - Datos estáticos y utilidades para Axon.App
 * =================================
 * Centraliza tecnologías, testimonios y constantes globales de la aplicación.
 *
 * Estructura:
 * 1. Constantes de configuración (niveles, categorías)
 * 2. Índices para búsqueda optimizada
 * 3. Array de tecnologías con información detallada
 * 4. Array de testimonios de clientes
 * 5. Funciones de utilidad para filtrado y búsqueda
 *
 * @author Axon.app Team
 * @version 2.4.0
 */

/* cspell:disable */
/* Este archivo contiene texto en español que puede ser marcado como error por el linter */

// ===================================================================
// CONSTANTES DE CONFIGURACIÓN
// ===================================================================
/**
 * Niveles de experiencia utilizados para clasificar tecnologías
 * Estos niveles se muestran como badges en las tarjetas de tecnología
 */
const LEVELS = {
  EXPERT: "Expert",        // Nivel experto - dominio completo
  ADVANCED: "Advanced",    // Nivel avanzado - conocimiento profundo
};

/**
 * Categorías de tecnologías para organizar y filtrar
 * Cada categoría tiene un color y estilo específico en la UI
 */
const CATEGORIES = {
  FRONTEND: "Frontend",      // Tecnologías de front-end
  BACKEND: "Backend",        // Tecnologías de back-end
  DEVOPS: "DevOps",         // Herramientas DevOps y CI/CD
  DATABASE: "Database",      // Bases de datos
  CLOUD: "Cloud",           // Servicios en la nube
  AI_ML: "IA/ML",          // Inteligencia Artificial y Machine Learning
  API: "API",              // APIs y servicios web
  PROGRAMMING: "Programming", // Lenguajes de programación
  CACHE: "Cache",          // Sistemas de caché
};

// ===================================================================
// ÍNDICES PARA BÚSQUEDA OPTIMIZADA
// ===================================================================
/**
 * Mapas para búsqueda rápida de tecnologías por categoría y nivel
 * Mejoran el rendimiento en filtros y búsquedas
 */
const categoryIndex = new Map();  // Índice por categoría
const levelIndex = new Map();     // Índice por nivel

// ===================================================================
// ARRAY PRINCIPAL DE TECNOLOGÍAS
// ===================================================================
/**
 * technologies: Array de objetos de tecnología
 * Cada objeto contiene:
 *   - name: string
 *   - category: string
 *   - icon: string (emoji)
 *   - description: string
 *   - gradient: string (clases CSS)
 *   - level: string
 */
export const technologies = [
  // === FRONTEND & FRAMEWORKS ===
  // Stack principal utilizado en Axon para desarrollo frontend
  {
    name: "React",
    category: CATEGORIES.FRONTEND,
    icon: "⚛️",
    description: "Biblioteca para interfaces de usuario",
    gradient: "from-blue-500 to-cyan-400",
    level: LEVELS.EXPERT,
  },
  {
    name: "Vite",
    category: CATEGORIES.FRONTEND,
    icon: "⚡",
    description: "Build tool ultrarrápido para desarrollo",
    gradient: "from-purple-500 to-indigo-500",
    level: LEVELS.EXPERT,
  },
  {
    name: "Tailwind CSS",
    category: CATEGORIES.FRONTEND,
    icon: "🎨",
    description: "Framework CSS utility-first",
    gradient: "from-cyan-400 to-blue-500",
    level: LEVELS.EXPERT,
  },
  {
    name: "TypeScript",
    category: CATEGORIES.PROGRAMMING,
    icon: "🔷",
    description: "JavaScript con tipado estático",
    gradient: "from-blue-500 to-blue-700",
    level: LEVELS.EXPERT,
  },
  {
    name: "Next.js",
    category: CATEGORIES.FRONTEND,
    icon: "▲",
    description: "Framework de React para producción",
    gradient: "from-gray-800 to-gray-600",
    level: LEVELS.EXPERT,
  },

  // Backend & APIs - Tecnologías del lado del servidor
  {
    name: "Node.js",
    category: CATEGORIES.BACKEND,
    icon: "🟢",
    description: "Runtime de JavaScript del lado del servidor",
    gradient: "from-green-500 to-emerald-400",
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
    name: "Python",
    category: CATEGORIES.BACKEND,
    icon: "🐍",
    description: "Lenguaje versátil para desarrollo y análisis",
    gradient: "from-yellow-500 to-orange-400",
    level: LEVELS.EXPERT,
  },
  {
    name: "FastAPI",
    category: CATEGORIES.BACKEND,
    icon: "⚡",
    description: "Framework moderno y rápido para APIs",
    gradient: "from-teal-500 to-cyan-600",
    level: LEVELS.ADVANCED,
  },
  {
    name: "GraphQL",
    category: CATEGORIES.API,
    icon: "💜",
    description: "Lenguaje de consulta para APIs",
    gradient: "from-pink-500 to-purple-500",
    level: LEVELS.ADVANCED,
  },

  // Cloud & DevOps - Infraestructura y despliegue
  {
    name: "AWS",
    category: CATEGORIES.CLOUD,
    icon: "☁️",
    description: "Servicios de computación en la nube",
    gradient: "from-orange-500 to-red-400",
    level: LEVELS.EXPERT,
  },
  {
    name: "Docker",
    category: CATEGORIES.DEVOPS,
    icon: "🐋",
    description: "Plataforma de containerización",
    gradient: "from-blue-600 to-indigo-500",
    level: LEVELS.EXPERT,
  },
  {
    name: "CI/CD Pipelines",
    category: CATEGORIES.DEVOPS,
    icon: "🔄",
    description: "Integración y despliegue continuo",
    gradient: "from-gray-700 to-gray-500",
    level: LEVELS.EXPERT,
  },
  {
    name: "Static Hosting",
    category: CATEGORIES.CLOUD,
    icon: "📄",
    description: "Hosting gratuito para sitios estáticos",
    gradient: "from-gray-800 to-purple-600",
    level: LEVELS.EXPERT,
  },

  // Databases & Storage - Almacenamiento de datos
  {
    name: "PostgreSQL",
    category: CATEGORIES.DATABASE,
    icon: "🐘",
    description: "Base de datos relacional avanzada",
    gradient: "from-blue-700 to-blue-500",
    level: LEVELS.EXPERT,
  },
  {
    name: "MongoDB",
    category: CATEGORIES.DATABASE,
    icon: "🍃",
    description: "Base de datos NoSQL flexible",
    gradient: "from-green-600 to-green-400",
    level: LEVELS.EXPERT,
  },
  {
    name: "Redis",
    category: CATEGORIES.CACHE,
    icon: "🔴",
    description: "Almacén de datos en memoria",
    gradient: "from-red-500 to-red-400",
    level: LEVELS.ADVANCED,
  },

  // AI & Analytics - Inteligencia Artificial y análisis
  {
    name: "TensorFlow",
    category: CATEGORIES.AI_ML,
    icon: "🧠",
    description: "Framework de machine learning",
    gradient: "from-orange-600 to-yellow-500",
    level: LEVELS.ADVANCED,
  },
  {
    name: "OpenAI API",
    category: CATEGORIES.AI_ML,
    icon: "🤖",
    description: "Integración con modelos de IA",
    gradient: "from-green-400 to-blue-500",
    level: LEVELS.ADVANCED,
  },

  // Services & Integrations - Servicios utilizados
  {
    name: "Canvas API",
    category: CATEGORIES.FRONTEND,
    icon: "🎨",
    description: "API para generación de imágenes dinámicas",
    gradient: "from-indigo-500 to-purple-600",
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

// ===================================================================
// FUNCIONES DE UTILIDAD PARA FILTRADO Y BÚSQUEDA
// ===================================================================
/**
 * Obtiene tecnologías por categoría
 * @param {string} category
 * @returns {Array}
 */
export const getTechnologiesByCategory = (category) =>
  categoryIndex.get(category) || [];

/**
 * Obtiene tecnologías por nivel de experiencia
 * @param {string} level
 * @returns {Array}
 */
export const getTechnologiesByLevel = (level) => levelIndex.get(level) || [];

/**
 * Obtiene todas las categorías disponibles
 * @returns {Array}
 */
export const getCategories = () => Object.values(CATEGORIES);

/**
 * Obtiene todos los niveles de experiencia disponibles
 * @returns {Array}
 */
export const getLevels = () => Object.values(LEVELS);

export const TECH_CATEGORIES = CATEGORIES;
export const TECH_LEVELS = LEVELS;

// ===================================================================
// TESTIMONIOS DE CLIENTES
// ===================================================================
/**
 * testimonials: Array de testimonios de clientes
 * Cada objeto contiene:
 *   - id, name, role, company, avatar, rating, review, project, gradient
 */
export const testimonials = [
  {
    id: 1,
    name: "María González",
    role: "CEO - TechStart Solutions",
    company: "TechStart Solutions",
    avatar:
      "https://ui-avatars.com/api/?name=Maria+Gonzalez&background=0ea5e9&color=fff&size=128&bold=true",
    rating: 5,
    review:
      "Axon transformó completamente nuestra presencia digital. Su equipo no solo entregó una plataforma excepcional, sino que superó todas nuestras expectativas. El nivel de profesionalismo y atención al detalle es impresionante.",
    project: "Plataforma E-commerce",
    gradient: "from-blue-500 to-cyan-500",
  },
  {
    id: 2,
    name: "Carlos Mendoza",
    role: "CTO - InnovateLab",
    company: "InnovateLab",
    avatar:
      "https://ui-avatars.com/api/?name=Carlos+Mendoza&background=10b981&color=fff&size=128&bold=true",
    rating: 5,
    review:
      "La experiencia trabajando con Axon ha sido extraordinaria. Desarrollaron una aplicación web compleja con integraciones avanzadas en tiempo récord. Su expertise técnico es de clase mundial.",
    project: "Sistema de Gestión Empresarial",
    gradient: "from-emerald-500 to-green-500",
  },
  {
    id: 3,
    name: "Ana Rodríguez",
    role: "Directora de Marketing - Digital Boost",
    company: "Digital Boost",
    avatar:
      "https://ui-avatars.com/api/?name=Ana+Rodriguez&background=a855f7&color=fff&size=128&bold=true",
    rating: 5,
    review:
      "Axon no solo construyó nuestro sitio web, creó una experiencia digital que convierte visitantes en clientes. El ROI ha sido increíble y el soporte post-lanzamiento es excepcional.",
    project: "Landing Page & Marketing",
    gradient: "from-purple-500 to-pink-500",
  },
  {
    id: 4,
    name: "Roberto Silva",
    role: "Fundador - StartupX",
    company: "StartupX",
    avatar:
      "https://ui-avatars.com/api/?name=Roberto+Silva&background=f59e0b&color=fff&size=128&bold=true",
    rating: 5,
    review:
      "Como startup, necesitábamos un socio tecnológico confiable. Axon nos ayudó a escalar desde una idea hasta una plataforma robusta con miles de usuarios. Su visión estratégica es invaluable.",
    project: "MVP & Escalamiento",
    gradient: "from-amber-500 to-orange-500",
  },
  {
    id: 5,
    name: "Lucía Fernández",
    role: "Gerente General - RetailPro",
    company: "RetailPro",
    avatar:
      "https://ui-avatars.com/api/?name=Lucia+Fernandez&background=6366f1&color=fff&size=128&bold=true",
    rating: 5,
    review:
      "La migración a la nube que realizó Axon mejoró nuestra eficiencia operativa en un 40%. Su enfoque en la seguridad y la escalabilidad nos da total tranquilidad para el futuro.",
    project: "Migración Cloud & DevOps",
    gradient: "from-indigo-500 to-blue-500",
  },
  {
    id: 6,
    name: "Diego Morales",
    role: "VP Technology - FinanceNext",
    company: "FinanceNext",
    avatar:
      "https://ui-avatars.com/api/?name=Diego+Morales&background=06b6d4&color=fff&size=128&bold=true",
    rating: 5,
    review:
      "Implementaron un sistema de IA que revolucionó nuestro análisis de datos. Los insights que obtenemos ahora nos permiten tomar decisiones más inteligentes y oportunas.",
    project: "IA & Machine Learning",
    gradient: "from-teal-500 to-cyan-500",
  },
];

/**
 * Obtiene testimonios aleatorios
 * @param {number} count - cantidad de testimonios a devolver
 * @returns {Array}
 */
export const getRandomTestimonials = (count = 3) => {
  const shuffled = [...testimonials].sort(() => 0.5 - Math.random());
  return shuffled.slice(0, count);
};

// ===================================================================
// SUGERENCIAS DE MEJORA PROFESIONAL
// ===================================================================
/**
 * 1. Migrar a TypeScript para tipado estricto y validación de datos.
 * 2. Validar la estructura de tecnologías y testimonios (zod/yup).
 * 3. Permitir internacionalización de textos y categorías.
 * 4. Añadir utilidades para búsqueda avanzada y paginación.
 * 5. Añadir tests unitarios para todas las funciones de filtrado.
 * 6. Documentar ejemplos de uso en la documentación técnica.
 * 7. Considerar cargar los datos desde una API o CMS si la app crece.
 */
