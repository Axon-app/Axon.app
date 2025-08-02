// Animación de contadores utilizando Intersection Observer para mejor rendimiento
function initCounters() {
  const counters = document.querySelectorAll('.counter');
  const speed = 200; // Velocidad de la animación (menor = más rápido)
  
  // Función para animar un contador individual
  function animateCounter(counter) {
    // Evitar animaciones repetidas
    if (counter.classList.contains('animated')) return;
    counter.classList.add('animated');
    
    const target = +counter.getAttribute('data-target');
    const format = target > 999; // Determinar si usar formato de miles
    let count = 0;
    
    // Ajustar el incremento según el tamaño del número para optimizar la animación
    let increment = target / (speed / 2);
    if (target > 10000) increment = target / (speed / 4);
    if (target < 100) increment = target / speed;
    
    // Reducir la cantidad de actualizaciones DOM para mejorar rendimiento
    const fps = 30; // Limitar a 30 FPS para mejor rendimiento
    const interval = 1000 / fps;
    let lastUpdate = 0;
    
    const updateCount = (timestamp) => {
      // Limitar la tasa de actualización
      if (!lastUpdate || timestamp - lastUpdate >= interval) {
        lastUpdate = timestamp;
        
        if (count < target) {
          count += increment;
          if (count > target) count = target;
          
          // Formatear con separadores de miles si es necesario
          if (format && count >= 1000) {
            counter.innerText = Math.floor(count).toLocaleString();
          } else {
            counter.innerText = Math.floor(count);
          }
          
          if (count < target) {
            requestAnimationFrame(updateCount);
          }
        }
      } else {
        requestAnimationFrame(updateCount);
      }
    };
    
    requestAnimationFrame(updateCount);
  }
  
  // Usar Intersection Observer para detectar cuando los contadores están visibles
  // Esto es más eficiente que verificar la posición en cada scroll
  const counterObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        animateCounter(entry.target);
        // Dejar de observar después de animar
        observer.unobserve(entry.target);
      }
    });
  }, {
    root: null,
    threshold: 0.1, // Trigger cuando al menos 10% del elemento es visible
    rootMargin: '0px 0px -50px 0px' // Trigger un poco antes para suavizar la experiencia
  });
  
  // Observar todos los contadores
  counters.forEach(counter => {
    counterObserver.observe(counter);
  });
}

// Iniciar la animación cuando el DOM está completamente cargado
// Usar la opción 'passive: true' para mejorar el rendimiento de los event listeners
document.addEventListener('DOMContentLoaded', initCounters, { passive: true });
