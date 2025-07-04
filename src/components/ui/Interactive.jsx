import React from 'react';

// --- TechItem: Componente de ítem de tecnología para carrusel ---
// Props:
//   - tech: objeto { icon, name } con el icono y nombre de la tecnología
// Renderiza un bloque visual con icono y nombre, optimizado para carruseles.
export const TechItem = React.memo(({ tech }) => {
  return (
    <div className="flex-shrink-0 bg-gray-800/50 hover:bg-gray-700/70 rounded-xl p-3 sm:p-4 border border-gray-700/50 hover:border-blue-500/50 transition-all duration-300 hover:shadow-lg hover:shadow-blue-500/20 hover:scale-105 mx-2 sm:mx-3 w-20 sm:w-24">
      <div className="flex flex-col items-center text-center space-y-1 sm:space-y-2">
        {/* Icono visual de la tecnología */}
        <div className="text-2xl sm:text-3xl" aria-hidden>
          {tech.icon}
        </div>
        {/* Nombre de la tecnología */}
        <h3 className="text-xs sm:text-sm font-medium text-white leading-tight">{tech.name}</h3>
      </div>
    </div>
  );
});
TechItem.displayName = 'TechItem';

// --- TechCarousel: Carrusel circular infinito de tecnologías ---
// Props:
//   - technologies: array de objetos tech (ver arriba)
// Renderiza un carrusel animado con efecto fade en los laterales y scroll infinito.
export const TechCarousel = React.memo(({ technologies = [] }) => {
  if (!technologies.length) return null;

  return (
    <div className="relative overflow-hidden">
      {/* Gradientes laterales para efecto fade visual */}
      <div className="absolute left-0 top-0 bottom-0 w-8 sm:w-16 bg-gradient-to-r from-gray-900 to-transparent z-10 pointer-events-none"></div>
      <div className="absolute right-0 top-0 bottom-0 w-8 sm:w-16 bg-gradient-to-l from-gray-900 to-transparent z-10 pointer-events-none"></div>
      {/* Carrusel infinito duplicando la lista para efecto seamless */}
      <div className="flex animate-scroll" style={{ width: 'fit-content' }}>
        {technologies.map((tech, index) => (
          <TechItem key={`first-${tech.name}-${index}`} tech={tech} />
        ))}
        {technologies.map((tech, index) => (
          <TechItem key={`second-${tech.name}-${index}`} tech={tech} />
        ))}
      </div>
    </div>
  );
});
TechCarousel.displayName = 'TechCarousel';

// --- TestimonialsBanner: Banner de testimonios de clientes ---
// Props:
//   - testimonials: array de objetos { avatar, name, role, review, rating }
// Renderiza un carrusel infinito de testimonios con gradientes laterales y estrellas de rating.
export const TestimonialsBanner = React.memo(({ testimonials = [] }) => {
  if (!testimonials.length) return null;
  return (
    <div className="py-8 sm:py-16 bg-gradient-to-r from-gray-900 via-black to-gray-900">
      <div className="container mx-auto px-4">
        <h2 className="text-2xl sm:text-4xl font-bold text-center mb-8 sm:mb-12 text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-400">
          Lo Que Dicen Nuestros Clientes
        </h2>
        <div className="relative overflow-hidden">
          {/* Gradientes laterales para efecto fade */}
          <div className="absolute left-0 top-0 bottom-0 w-8 sm:w-20 bg-gradient-to-r from-gray-900 to-transparent z-10 pointer-events-none"></div>
          <div className="absolute right-0 top-0 bottom-0 w-8 sm:w-20 bg-gradient-to-l from-gray-900 to-transparent z-10 pointer-events-none"></div>
          {/* Carrusel infinito de testimonios */}
          <div
            className="flex animate-scroll-testimonials gap-4 sm:gap-6"
            style={{ width: 'fit-content' }}
          >
            {testimonials.map((testimonial, index) => (
              <div key={`first-${index}`} className="flex-shrink-0 w-80 sm:w-96">
                <div className="bg-slate-800/60 backdrop-blur-md rounded-xl p-4 sm:p-6 border border-cyan-500/30 h-48 sm:h-56 flex flex-col justify-between">
                  <div>
                    <div className="flex items-center mb-3 sm:mb-4">
                      <img
                        src={testimonial.avatar}
                        alt={`Avatar de ${testimonial.name}`}
                        className="w-10 h-10 sm:w-12 sm:h-12 rounded-full mr-3 border-2 border-cyan-400"
                        loading="lazy"
                        width="48"
                        height="48"
                      />
                      <div>
                        <h4 className="text-sm sm:text-base font-semibold text-cyan-400">
                          {testimonial.name}
                        </h4>
                        <p className="text-gray-400 text-xs sm:text-sm">{testimonial.role}</p>
                      </div>
                    </div>
                    <p className="text-gray-300 italic text-sm sm:text-base leading-relaxed line-clamp-4">
                      &ldquo;{testimonial.review}&rdquo;
                    </p>
                  </div>
                  <div className="flex items-center text-yellow-400 text-base sm:text-lg mt-3">
                    {Array.from({ length: 5 }, (_, i) => (
                      <span key={i}>{i < testimonial.rating ? '★' : '☆'}</span>
                    ))}
                  </div>
                </div>
              </div>
            ))}
            {testimonials.map((testimonial, index) => (
              <div key={`second-${index}`} className="flex-shrink-0 w-80 sm:w-96">
                <div className="bg-slate-800/60 backdrop-blur-md rounded-xl p-4 sm:p-6 border border-cyan-500/30 h-48 sm:h-56 flex flex-col justify-between">
                  <div>
                    <div className="flex items-center mb-3 sm:mb-4">
                      <img
                        src={testimonial.avatar}
                        alt={`Avatar de ${testimonial.name}`}
                        className="w-10 h-10 sm:w-12 sm:h-12 rounded-full mr-3 border-2 border-cyan-400"
                        loading="lazy"
                        width="48"
                        height="48"
                      />
                      <div>
                        <h4 className="text-sm sm:text-base font-semibold text-cyan-400">
                          {testimonial.name}
                        </h4>
                        <p className="text-gray-400 text-xs sm:text-sm">{testimonial.role}</p>
                      </div>
                    </div>
                    <p className="text-gray-300 italic text-sm sm:text-base leading-relaxed line-clamp-4">
                      &ldquo;{testimonial.review}&rdquo;
                    </p>
                  </div>
                  <div className="flex items-center text-yellow-400 text-base sm:text-lg mt-3">
                    {Array.from({ length: 5 }, (_, i) => (
                      <span key={i}>{i < testimonial.rating ? '★' : '☆'}</span>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
});
TestimonialsBanner.displayName = 'TestimonialsBanner';

// --- AnimatedCounter: Contador animado con visibilidad por scroll ---
// Props:
//   - start: valor inicial (default 0)
//   - end: valor final (requerido)
//   - duration: duración de la animación en ms (default 2000)
//   - suffix, prefix: texto opcional antes/después del número
//   - decimals: decimales a mostrar
// Renderiza un número animado que inicia al entrar en viewport.
export const AnimatedCounter = React.memo(
  ({ start = 0, end, duration = 2000, suffix = '', prefix = '', decimals = 0 }) => {
    const [count, setCount] = React.useState(start);
    const [isVisible, setIsVisible] = React.useState(false);
    const countRef = React.useRef(null);

    React.useEffect(() => {
      const observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting && !isVisible) {
            setIsVisible(true);
          }
        },
        { threshold: 0.1 }
      );
      if (countRef.current) {
        observer.observe(countRef.current);
      }
      return () => observer.disconnect();
    }, [isVisible]);

    React.useEffect(() => {
      if (!isVisible) return;
      let startTime;
      let animationId;
      const animate = timestamp => {
        if (!startTime) startTime = timestamp;
        const progress = Math.min((timestamp - startTime) / duration, 1);
        const easeOutCubic = 1 - Math.pow(1 - progress, 3);
        const currentCount = start + (end - start) * easeOutCubic;
        setCount(currentCount);
        if (progress < 1) {
          animationId = requestAnimationFrame(animate);
        }
      };
      animationId = requestAnimationFrame(animate);
      return () => {
        if (animationId) {
          cancelAnimationFrame(animationId);
        }
      };
    }, [isVisible, start, end, duration]);

    const formatNumber = num => {
      if (decimals > 0) {
        return num.toFixed(decimals);
      }
      return Math.floor(num);
    };

    return (
      <span ref={countRef} className="font-bold text-2xl sm:text-4xl text-cyan-400">
        {prefix}
        {formatNumber(count)}
        {suffix}
      </span>
    );
  }
);
AnimatedCounter.displayName = 'AnimatedCounter';

// --- AnimatedCounterWithProgress: Contador animado con barra de progreso ---
// Props:
//   - start, end, duration, suffix, prefix, decimals: igual que AnimatedCounter
//   - progressColor: clases Tailwind para el gradiente de la barra
//   - progressWidth: porcentaje de progreso (0-100)
//   - title, subtitle: textos descriptivos
//   - hoverColor: color de acento al hacer hover
// Renderiza un bloque con contador animado y barra de progreso visual.
export const AnimatedCounterWithProgress = React.memo(
  ({
    start = 0,
    end,
    duration = 2000,
    suffix = '',
    prefix = '',
    decimals = 0,
    progressColor = 'from-blue-500 to-cyan-500',
    progressWidth = 100,
    title,
    subtitle,
    hoverColor = 'blue-500',
  }) => {
    const [count, setCount] = React.useState(start);
    const [progress, setProgress] = React.useState(0);
    const [isVisible, setIsVisible] = React.useState(false);
    const countRef = React.useRef(null);

    React.useEffect(() => {
      const observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting && !isVisible) {
            setIsVisible(true);
          }
        },
        { threshold: 0.1 }
      );
      if (countRef.current) {
        observer.observe(countRef.current);
      }
      return () => observer.disconnect();
    }, [isVisible]);

    React.useEffect(() => {
      if (!isVisible) return;
      let startTime;
      let animationId;
      const animate = timestamp => {
        if (!startTime) startTime = timestamp;
        const animationProgress = Math.min((timestamp - startTime) / duration, 1);
        const easeOutCubic = 1 - Math.pow(1 - animationProgress, 3);
        const currentCount = start + (end - start) * easeOutCubic;
        const currentProgress = animationProgress * progressWidth;
        setCount(currentCount);
        setProgress(currentProgress);
        if (animationProgress < 1) {
          animationId = requestAnimationFrame(animate);
        }
      };
      animationId = requestAnimationFrame(animate);
      return () => {
        if (animationId) {
          cancelAnimationFrame(animationId);
        }
      };
    }, [isVisible, start, end, duration, progressWidth]);

    const formatNumber = num => {
      if (decimals > 0) {
        return num.toFixed(decimals);
      }
      return Math.floor(num);
    };

    return (
      <div
        className={`bg-gradient-to-br from-gray-800/50 to-gray-900/50 backdrop-blur-sm rounded-xl p-6 border border-gray-700/30 text-center group hover:border-${hoverColor}/50 transition-all duration-300 hover:scale-105`}
      >
        <div className="text-3xl md:text-4xl font-bold mb-2 group-hover:scale-110 transition-transform duration-300">
          <span
            ref={countRef}
            className={`font-bold text-3xl md:text-4xl ${
              hoverColor === 'blue-500'
                ? 'text-blue-400'
                : hoverColor === 'emerald-500'
                  ? 'text-emerald-400'
                  : hoverColor === 'purple-500'
                    ? 'text-purple-400'
                    : hoverColor === 'amber-500'
                      ? 'text-amber-400'
                      : 'text-cyan-400'
            }`}
          >
            {prefix}
            {formatNumber(count)}
            {suffix}
          </span>
        </div>
        <div className="text-gray-300 font-medium mb-1">{title}</div>
        <div className="text-xs text-gray-500 mb-3">{subtitle}</div>
        <div className="w-full bg-gray-700 rounded-full h-1.5">
          <div
            className={`bg-gradient-to-r ${progressColor} h-1.5 rounded-full transition-all duration-300 ease-out`}
            style={{ width: `${progress}%` }}
          ></div>
        </div>
      </div>
    );
  }
);
AnimatedCounterWithProgress.displayName = 'AnimatedCounterWithProgress';

// --- SUGERENCIAS DE MEJORA PROFESIONAL ---
// 1. Añadir PropTypes o migrar a TypeScript para tipado estricto y validación de props.
// 2. Modularizar animaciones y gradientes en archivos CSS/SCSS o plugins de Tailwind para mayor mantenibilidad.
// 3. Internacionalizar textos estáticos y atributos accesibles si la app es multilenguaje.
// 4. Añadir tests unitarios y de integración para cada componente.
// 5. Mejorar accesibilidad: roles ARIA, navegación por teclado, focus management.
// 6. Permitir personalización avanzada de colores, animaciones y textos vía props.
// 7. Documentar ejemplos de uso en Storybook o similar.
