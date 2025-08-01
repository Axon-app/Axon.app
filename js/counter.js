// Animación de contadores
function initCounters() {
  const counters = document.querySelectorAll('.counter');
  const speed = 200; // Velocidad de la animación (menor = más rápido)
  
  // Función para verificar si un elemento está visible en la ventana
  function isElementInViewport(el) {
    const rect = el.getBoundingClientRect();
    return (
      rect.top >= 0 &&
      rect.left >= 0 &&
      rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
      rect.right <= (window.innerWidth || document.documentElement.clientWidth)
    );
  }
  
  // Función para animar los contadores
  function animateCounters() {
    counters.forEach(counter => {
      // Solo animar si es visible y no ha sido animado
      if (isElementInViewport(counter) && !counter.classList.contains('animated')) {
        counter.classList.add('animated'); // Marcar como animado
        
        const target = +counter.getAttribute('data-target');
        const format = target > 999; // Determinar si usar formato de miles
        let count = 0;
        
        // Ajustar el incremento según el tamaño del número
        let increment = target / (speed / 2);
        if (target > 10000) increment = target / (speed / 4);
        if (target < 100) increment = target / speed;
        
        const updateCount = () => {
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
        };
        
        updateCount();
      }
    });
  }
  
  // Ejecutar al cargar y al hacer scroll
  animateCounters();
  window.addEventListener('scroll', animateCounters);
}

// Iniciar la animación cuando el DOM está completamente cargado
document.addEventListener('DOMContentLoaded', function() {
  initCounters();
});
