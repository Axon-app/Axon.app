// image-loader.js - Carga optimizada de imágenes con lazy loading

document.addEventListener('DOMContentLoaded', function() {
  // Configuración de Intersection Observer para lazy loading
  const imageObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const img = entry.target;
        
        // Cargar la imagen real
        if (img.dataset.src) {
          img.src = img.dataset.src;
          img.removeAttribute('data-src');
        }
        
        // Agregar clase de cargado
        img.classList.add('loaded');
        
        // Dejar de observar esta imagen
        observer.unobserve(img);
      }
    });
  }, {
    // Cargar imágenes cuando estén a 50px de ser visibles
    rootMargin: '50px 0px',
    threshold: 0.01
  });

  // Observar todas las imágenes con data-src
  const lazyImages = document.querySelectorAll('img[data-src]');
  lazyImages.forEach(img => {
    imageObserver.observe(img);
  });

  // Función para optimizar imágenes ya cargadas
  function optimizeLoadedImages() {
    const images = document.querySelectorAll('img:not([data-src])');
    
    images.forEach(img => {
      // Agregar evento de carga para animación
      if (!img.complete) {
        img.addEventListener('load', function() {
          this.classList.add('loaded');
        });
      } else {
        img.classList.add('loaded');
      }
      
      // Agregar evento de error para manejar imágenes rotas
      img.addEventListener('error', function() {
        console.warn('Error loading image:', this.src);
        this.style.display = 'none';
      });
    });
  }

  // Optimizar imágenes existentes
  optimizeLoadedImages();

  // Precargar imágenes críticas solo si es necesario
  function preloadCriticalImages() {
    // Verificar si el logo ya está siendo usado en la página
    const logoImages = document.querySelectorAll('img[src*="logo.png"]');
    
    if (logoImages.length > 0) {
      // Si hay imágenes de logo en la página, no necesitamos precargar
      return;
    }
    
    // Solo precargar si no está ya precargado en el HTML
    const existingPreloads = document.querySelectorAll('link[rel="preload"][href*="logo.png"]');
    if (existingPreloads.length > 0) {
      return;
    }
    
    // Crear precarga solo si es necesario
    const link = document.createElement('link');
    link.rel = 'preload';
    link.as = 'image';
    link.href = 'assets/images/logo.png';
    document.head.appendChild(link);
  }

  // Ejecutar precarga de imágenes críticas solo si es necesario
  requestAnimationFrame(() => {
    preloadCriticalImages();
    
    // Forzar el uso inmediato del logo precargado
    const logoImages = document.querySelectorAll('img[src*="logo.png"]');
    logoImages.forEach(img => {
      if (!img.complete) {
        img.addEventListener('load', function() {
          this.classList.add('loaded');
        });
      } else {
        img.classList.add('loaded');
      }
    });
  });

  // Función para manejar cambios de tamaño de ventana
  function handleResize() {
    // Aquí puedes agregar lógica para cambiar imágenes según el tamaño de pantalla
    const isMobile = window.innerWidth <= 768;
    const images = document.querySelectorAll('img[data-mobile-src]');
    
    images.forEach(img => {
      if (isMobile && img.dataset.mobileSrc) {
        img.src = img.dataset.mobileSrc;
      } else if (!isMobile && img.dataset.desktopSrc) {
        img.src = img.dataset.desktopSrc;
      }
    });
  }

  // Escuchar cambios de tamaño de ventana
  window.addEventListener('resize', debounce(handleResize, 250));

  // Función de debounce para optimizar rendimiento
  function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
      const later = () => {
        clearTimeout(timeout);
        func(...args);
      };
      clearTimeout(timeout);
      timeout = setTimeout(later, wait);
    };
  }
});

// Función para agregar fadeIn a las imágenes cuando se cargan
document.addEventListener('DOMContentLoaded', function() {
  const style = document.createElement('style');
  style.textContent = `
    img {
      opacity: 0;
      transition: opacity 0.3s ease-in-out;
    }
    
    img.loaded, img[src*="logo.png"] {
      opacity: 1;
    }
    
    /* Excepciones para imágenes que no necesitan fade */
    .logo-img,
    .hero-logo-img,
    .client img {
      opacity: 1 !important;
    }
  `;
  document.head.appendChild(style);
  
  // Asegurar que todas las imágenes de logo estén visibles inmediatamente
  const logoImages = document.querySelectorAll('img[src*="logo.png"], .logo-img, .hero-logo-img');
  logoImages.forEach(img => {
    img.classList.add('loaded');
    img.style.opacity = '1';
  });
});
