const header = document.getElementById('header');
const hamburger = document.getElementById('hamburger');
const mobileMenu = document.getElementById('mobile-menu');
const menuOverlay = document.getElementById('menu-overlay');

// Efecto en el menú al hacer scroll
window.addEventListener('scroll', () => {
  if (window.scrollY > 50) {
    header.classList.add('scrolled');
  } else {
    header.classList.remove('scrolled');
  }
});

// Funcionalidad del menú hamburguesa
function toggleMenu() {
  hamburger.classList.toggle('open');
  mobileMenu.classList.toggle('active');
  menuOverlay.classList.toggle('active');
  document.body.style.overflow = mobileMenu.classList.contains('active') ? 'hidden' : 'auto';
}

hamburger.addEventListener('click', toggleMenu);
menuOverlay.addEventListener('click', toggleMenu);

function closeMenu() {
  hamburger.classList.remove('open');
  mobileMenu.classList.remove('active');
  menuOverlay.classList.remove('active');
  document.body.style.overflow = 'auto';
}

// Animaciones de scroll
const faders = document.querySelectorAll('.fade-in');
const appearOptions = { 
  threshold: 0.1, 
  rootMargin: "0px 0px -100px 0px" 
};

const appearOnScroll = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      // No dejamos de observar las secciones principales como el blog para que sigan siendo visibles
      if (!entry.target.id || !['blog'].includes(entry.target.id)) {
        appearOnScroll.unobserve(entry.target); 
      }
    } else {
      // Si la sección tiene ID "blog" y sale del viewport, no quitamos la clase visible
      if (entry.target.id && entry.target.id === 'blog') {
        // Mantener visible la sección del blog incluso al salir del viewport
        entry.target.classList.add('visible');
      }
    }
  });
}, appearOptions);

faders.forEach(fader => {
  if (fader) appearOnScroll.observe(fader);
});

// Botón de scroll hacia arriba
const scrollTopBtn = document.getElementById('scroll-top');
window.addEventListener('scroll', () => {
  if (window.scrollY > 500) {
    scrollTopBtn.classList.add('visible');
  } else {
    scrollTopBtn.classList.remove('visible');
  }
});

scrollTopBtn.addEventListener('click', () => {
  window.scrollTo({ top: 0, behavior: 'smooth' });
});

// Scroll suave para enlaces de navegación
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    const href = this.getAttribute('href');
    if (href !== '#' && href.startsWith('#')) {
      e.preventDefault();
      const target = document.querySelector(href);
      if (target) {
        target.scrollIntoView({ behavior: 'smooth' });
        if (mobileMenu.classList.contains('active')) closeMenu();
      }
    }
  });
});

// Funciones para modales
function openModal(id, event) {
  if (event) {
    event.preventDefault();
    event.stopPropagation();
  }
  
  const modal = document.getElementById(id);
  if (modal) {
    modal.classList.add('active');
    document.body.style.overflow = 'hidden';
  } else {
    console.error('Modal no encontrado:', id);
    
    // Si el modal no se encuentra, intentamos cargar el contenido
    loadModalsContent();
    
    // Intentamos nuevamente después de cargar los modales
    setTimeout(() => {
      const retryModal = document.getElementById(id);
      if (retryModal) {
        retryModal.classList.add('active');
        document.body.style.overflow = 'hidden';
      } else {
        console.error('Modal no encontrado después de cargar contenido:', id);
      }
    }, 100);
  }
}

function closeAllModals() {
  const modals = document.querySelectorAll('.modal-overlay');
  modals.forEach(modal => {
    modal.classList.remove('active');
  });
  document.body.style.overflow = 'auto';
}

// Configuración de eventos de modales
document.addEventListener('DOMContentLoaded', function() {
  // Cargar contenido de modales después de que el DOM esté listo
  loadModalsContent();
  
  // Configurar listeners para modales (una sola vez)
  setupModalListeners();
});

// Configura todos los listeners de modales
function setupModalListeners() {
  // Cerrar modal al hacer clic fuera de él
  document.querySelectorAll('.modal-overlay').forEach(modal => {
    // Eliminamos listeners anteriores para evitar duplicados
    const newModal = modal.cloneNode(true);
    modal.parentNode.replaceChild(newModal, modal);
    
    // Añadir nuevo listener
    newModal.addEventListener('click', function(e) {
      if (e.target === this) {
        closeAllModals();
      }
    });
  });
  
  // Configurar botones de proyectos
  document.querySelectorAll('.project-btn').forEach(btn => {
    btn.addEventListener('click', function(e) {
      e.preventDefault();
      e.stopPropagation();
      
      const modalId = this.getAttribute('data-modal');
      if (modalId) {
        openModal(modalId);
      }
    });
  });
  
  // Asegurar que todos los botones en overlays de portfolio funcionen
  document.querySelectorAll('.portfolio-overlay .btn-small').forEach(button => {
    button.style.pointerEvents = 'auto';
    button.style.cursor = 'pointer';
    button.style.zIndex = '20';
  });
}

// Función de mensaje personalizado (reemplaza alert)
function showCustomMessage(message, isSuccess = true) {
  const messageBox = document.createElement('div');
  messageBox.style.cssText = `
    position: fixed;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    background-color: ${isSuccess ? '#4361ee' : '#e74c3c'};
    color: white;
    padding: 30px 40px;
    border-radius: 15px;
    box-shadow: 0 10px 30px rgba(0,0,0,0.3);
    z-index: 9999;
    font-family: 'Inter', sans-serif;
    font-size: 1.2rem;
    text-align: center;
    opacity: 0;
    transition: all 0.4s cubic-bezier(0.34, 1.56, 0.64, 1);
    transform: translate(-50%, -50%) scale(0.8);
    max-width: 90%;
    width: auto;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
  `;
  
  // Añadir icono según el tipo de mensaje
  const icon = document.createElement('div');
  icon.style.cssText = `
    font-size: 2.5rem;
    margin-bottom: 15px;
    height: 60px;
    width: 60px;
    background-color: rgba(255, 255, 255, 0.2);
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    margin-bottom: 15px;
  `;
  
  if (message.includes("enviado")) {
    icon.innerHTML = '<i class="fas fa-check-circle"></i>';
  } else if (message.includes("Enviando")) {
    icon.innerHTML = '<i class="fas fa-spinner fa-spin"></i>';
  } else if (message.includes("problema")) {
    icon.innerHTML = '<i class="fas fa-exclamation-triangle"></i>';
  } else {
    icon.innerHTML = '<i class="fas fa-info-circle"></i>';
  }
  
  const textMessage = document.createElement('div');
  textMessage.textContent = message;
  textMessage.style.fontWeight = '500';
  
  messageBox.appendChild(icon);
  messageBox.appendChild(textMessage);
  document.body.appendChild(messageBox);

  setTimeout(() => {
    messageBox.style.opacity = '1';
    messageBox.style.transform = 'translate(-50%, -50%) scale(1)';
  }, 10);

  setTimeout(() => {
    messageBox.style.opacity = '0';
    messageBox.style.transform = 'translate(-50%, -50%) scale(0.8)';
    messageBox.addEventListener('transitionend', () => {
      document.body.removeChild(messageBox);
    });
  }, 3500);
}

// Funcionalidad del botón de redes sociales
document.addEventListener('DOMContentLoaded', function() {
    const btnSocialMedia = document.getElementById('btn-social-media');
    const socialMediaContainer = document.getElementById('social-media-floating-container');
    
    if (!btnSocialMedia || !socialMediaContainer) {
        console.error('No se encontraron los elementos necesarios para las redes sociales.');
        return;
    }
    
    // Función mejorada para calcular y actualizar la posición del contenedor
    function updateSocialContainerPosition() {
        if (!btnSocialMedia || !socialMediaContainer) return;
        
        // El botón flotante siempre mantiene su posición fija en la pantalla
        // por lo que podemos obtener su posición visual actual
        const btnRect = btnSocialMedia.getBoundingClientRect();
        
        // Calculamos la posición vertical del centro del botón
        const btnCenterY = btnRect.top + btnRect.height / 2;
        
        // Obtenemos la altura del contenedor de redes sociales
        let containerHeight = 150; // Valor estimado por defecto
        
        // Si el contenedor está activo, podemos obtener su altura real
        if (socialMediaContainer.classList.contains('active')) {
            containerHeight = socialMediaContainer.offsetHeight;
        } else {
            // Para obtener una altura precisa, lo hacemos temporalmente visible pero transparente
            const originalVisibility = socialMediaContainer.style.visibility || '';
            const originalOpacity = socialMediaContainer.style.opacity || '';
            const originalDisplay = socialMediaContainer.style.display || '';
            
            socialMediaContainer.style.visibility = 'hidden';
            socialMediaContainer.style.opacity = '0';
            socialMediaContainer.style.display = 'flex';
            
            containerHeight = socialMediaContainer.offsetHeight;
            
            // Restauramos los estilos originales
            socialMediaContainer.style.visibility = originalVisibility;
            socialMediaContainer.style.opacity = originalOpacity;
            socialMediaContainer.style.display = originalDisplay;
        }
        
        // Ajustamos la posición del contenedor para que se alinee verticalmente con el botón
        // y se mantenga en posición fija relativa a la ventana, no al documento
        socialMediaContainer.style.position = 'fixed';
        socialMediaContainer.style.top = (btnCenterY - containerHeight / 2) + 'px';
        socialMediaContainer.style.left = (btnRect.left - socialMediaContainer.offsetWidth - 10) + 'px';
    }
    
    // Manejar clic en el botón de redes sociales
    function handleSocialButtonClick(e) {
        e.preventDefault();
        e.stopPropagation();
        
        console.log('Botón de redes sociales clickeado');
        
        // Aplicamos las clases para activar/desactivar
        const isActive = !socialMediaContainer.classList.contains('active');
        
        // Aplicar o quitar la clase active
        if (isActive) {
            socialMediaContainer.classList.add('active');
            btnSocialMedia.classList.add('active');
            console.log('Activando menú de redes sociales');
        } else {
            socialMediaContainer.classList.remove('active');
            btnSocialMedia.classList.remove('active');
            console.log('Desactivando menú de redes sociales');
        }
        
        // Actualizamos la posición después de cambiar el estado
        setTimeout(updateSocialContainerPosition, 10);
    }
    
    // Cerrar al hacer clic fuera
    function handleDocumentClick(e) {
        if (socialMediaContainer.classList.contains('active') && 
            !socialMediaContainer.contains(e.target) && 
            e.target !== btnSocialMedia) {
            socialMediaContainer.classList.remove('active');
            btnSocialMedia.classList.remove('active');
            console.log('Cerrando menú por clic fuera');
        }
    }
    
    // Actualizar posición cuando sea necesario
    window.addEventListener('load', updateSocialContainerPosition);
    window.addEventListener('resize', updateSocialContainerPosition);
    window.addEventListener('scroll', updateSocialContainerPosition);
    
    // Limpiar event listeners antiguos para prevenir duplicados
    btnSocialMedia.removeEventListener('click', handleSocialButtonClick);
    document.removeEventListener('click', handleDocumentClick);
    
    // Añadir event listeners
    btnSocialMedia.addEventListener('click', handleSocialButtonClick);
    document.addEventListener('click', handleDocumentClick);
    
    // Evitar que los clics en los enlaces cierren el menú
    socialMediaContainer.querySelectorAll('a').forEach(link => {
        link.addEventListener('click', (e) => {
            e.stopPropagation();
        });
    });
    
    // Inicializar la posición después de que todo esté cargado
    setTimeout(updateSocialContainerPosition, 300);
    
    console.log('Funcionalidad de redes sociales inicializada');
});

// Lógica de validación de formularios
document.addEventListener('DOMContentLoaded', function() {
  const contactForm = document.getElementById('main-contact-form');
  if (!contactForm) return;
  
  const formGroups = contactForm.querySelectorAll('.form-group');
  
  const validationRules = {
      text: {
          regex: /^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s'-]+$/,
          message: 'Solo letras, espacios, guiones y apóstrofes.'
      },
      email: {
          regex: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
          message: 'Formato de correo electrónico inválido.'
      },
      phone: {
          regex: /^\+?\d{1,3}?[-.\s]?\(?\d{1,4}\)?[-.\s]?\d{1,4}[-.\s]?\d{1,9}$/,
          message: 'Número de contacto inválido.'
      },
      date: {
          validate: (value) => {
              const today = new Date();
              today.setHours(0, 0, 0, 0);
              const inputDate = new Date(value);
              return inputDate >= today;
          },
          message: 'La fecha debe ser hoy o en el futuro.'
      },
      time: {
          validate: (value) => {
              return /^(?:2[0-3]|[01]?[0-9]):(?:[0-5]?[0-9])$/.test(value);
          },
          message: 'Formato de hora inválido (HH:MM).'
      },
      select: {
          validate: (value) => value !== '',
          message: 'Debes seleccionar una opción.'
      },
      textarea: {
          validate: (value) => value.trim().length > 10,
          message: 'Describe tu proyecto (mínimo 10 caracteres).'
      },
      'optional-text': {
          validate: (value) => true,
          message: ''
      }
  };

  function validateField(inputElement) {
      const value = inputElement.value.trim();
      const validationType = inputElement.dataset.validationType;
      const parentGroup = inputElement.closest('.form-group');
      const messageSpan = parentGroup.querySelector('.validation-message');
      const validationIcon = parentGroup.querySelector('.validation-icon');
      let isValid = true;
      let errorMessage = '';

      if (inputElement.hasAttribute('required') && value === '') {
          isValid = false;
          errorMessage = 'Este campo es obligatorio.';
      } else if (validationRules[validationType]) {
          const rule = validationRules[validationType];
          if (rule.regex && !rule.regex.test(value) && value !== '') {
              isValid = false;
              errorMessage = rule.message;
          } else if (rule.validate && !rule.validate(value) && value !== '') {
              isValid = false;
              errorMessage = rule.message;
          }
      }

      parentGroup.classList.remove('invalid', 'valid');
      if (isValid) {
          if (value !== '' || inputElement.hasAttribute('required')) {
              parentGroup.classList.add('valid');
              validationIcon.style.opacity = '1';
              validationIcon.className = 'fas fa-check-circle validation-icon';
              validationIcon.style.color = '#27ae60';
          } else {
              validationIcon.style.opacity = '0';
          }
          messageSpan.textContent = '';
      } else {
          parentGroup.classList.add('invalid');
          messageSpan.textContent = errorMessage;
          validationIcon.style.opacity = '1';
          validationIcon.className = 'fas fa-times-circle validation-icon';
          validationIcon.style.color = '#e74c3c';
      }
  }

  formGroups.forEach(group => {
      const input = group.querySelector('input, select, textarea');
      if (input) {
          ['input', 'change', 'blur'].forEach(eventType => {
              input.addEventListener(eventType, () => validateField(input));
          });
      }
  });

  contactForm.addEventListener('submit', function(e) {
      // Validamos el formulario pero sin prevenir el envío si es válido
      let formIsValid = true;
      
      formGroups.forEach(group => {
          const input = group.querySelector('input, select, textarea');
          if (input) {
              validateField(input);
              if (group.classList.contains('invalid')) {
                  formIsValid = false;
              }
          }
      });

      if (!formIsValid) {
          e.preventDefault(); // Solo prevenimos el envío si hay errores
          showCustomMessage('Por favor, corrige los errores en el formulario.');
          return;
      }
      
      // Mostrar mensaje de carga mientras se envía el formulario
      showCustomMessage('Enviando mensaje...');
      
      // Si el formulario es válido, permitimos que se envíe a Formspree
      // El manejo del formulario será mediante el action definido en el form
      
      // Después del envío, Formspree redirigirá a la página especificada en _next
      // o mostrará un mensaje de éxito
      
      // Nota: Para ver el progreso de envío y mostrar mensajes personalizados, 
      // podríamos usar fetch API, pero eso requeriría prevenir el envío predeterminado
      // y manejar todo mediante AJAX, lo cual implementaremos si es necesario.
  });
});

// Three.js Cosmic River Animation
'use strict';

/**
 * Inicializa y ejecuta la animación 3D del "Río Cósmico".
 * Esta función configura la escena, cámara, renderizador, post-procesamiento,
 * crea las partículas y maneja los eventos de usuario (scroll y movimiento del ratón).
 */
function initCosmicRiver() {
    let scene, camera, renderer, composer, clock;
    let particles;
    let mouse = new THREE.Vector2();
    let scrollPercent = 0;

    const canvas = document.getElementById('bg-canvas');
    if (!canvas) {
        console.error("No se encontró el elemento canvas con ID 'bg-canvas'.");
        return;
    }
    
    // 1. Configuración de la Escena
    scene = new THREE.Scene();
    clock = new THREE.Clock();
    
    // 2. Configuración de la Cámara
    camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 2000);
    camera.position.z = 5;
    
    // 3. Configuración del Renderer
    renderer = new THREE.WebGLRenderer({ 
        canvas: canvas, 
        antialias: true,
        powerPreference: 'high-performance' // Optimización para rendimiento
    });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2)); // Limitar ratio de píxeles para mejor rendimiento
    renderer.setSize(window.innerWidth, window.innerHeight);

    // 4. Post-procesamiento para el Efecto de Resplandor (Bloom)
    const renderScene = new THREE.RenderPass(scene, camera);
    const bloomPass = new THREE.UnrealBloomPass(
        new THREE.Vector2(window.innerWidth / 2, window.innerHeight / 2), // Reducir resolución para mejor rendimiento
        1.5, 0.4, 0.85
    );
    bloomPass.threshold = 0;
    bloomPass.strength = 1.5;
    bloomPass.radius = 0.5;
    
    composer = new THREE.EffectComposer(renderer);
    composer.addPass(renderScene);
    composer.addPass(bloomPass);

    // 5. Creación de las Partículas del Río Cósmico
    // Ajustar la cantidad de partículas según el dispositivo
    const isMobile = window.innerWidth < 768;
    const particleCount = isMobile ? 10000 : 20000; // Menos partículas en móviles
    
    const positions = new Float32Array(particleCount * 3);
    const colors = new Float32Array(particleCount * 3);
    
    const color1 = new THREE.Color(getComputedStyle(document.documentElement).getPropertyValue('--color1').trim());
    const color2 = new THREE.Color(getComputedStyle(document.documentElement).getPropertyValue('--color2').trim());
    const color3 = new THREE.Color(getComputedStyle(document.documentElement).getPropertyValue('--color3').trim());

    const riverLength = 4000;

    for (let i = 0; i < particleCount; i++) {
        const i3 = i * 3;
        
        const z = THREE.MathUtils.randFloat(-riverLength, 0);
        const angle = Math.random() * Math.PI * 2;
        const radius = 20 + Math.random() * 80 * Math.pow(Math.random(), 2);

        positions[i3] = Math.cos(angle) * radius;
        positions[i3 + 1] = Math.sin(angle) * radius;
        positions[i3 + 2] = z;

        const percent = (z / -riverLength);
        let color;
        if (percent < 0.5) {
            color = color1.clone().lerp(color2, percent * 2);
        } else {
            color = color2.clone().lerp(color3, (percent - 0.5) * 2);
        }

        colors[i3] = color.r;
        colors[i3 + 1] = color.g;
        colors[i3 + 2] = color.b;
    }

    const particleGeometry = new THREE.BufferGeometry();
    particleGeometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    particleGeometry.setAttribute('color', new THREE.BufferAttribute(colors, 3));

    const particleMaterial = new THREE.PointsMaterial({
        size: isMobile ? 1.2 : 1.5, // Tamaño más pequeño en móviles
        vertexColors: true,
        blending: THREE.AdditiveBlending,
        transparent: true,
        opacity: 0.8,
        sizeAttenuation: true
    });

    particles = new THREE.Points(particleGeometry, particleMaterial);
    scene.add(particles);

    // 6. Manejo de Eventos con throttling para mejorar rendimiento
    let ticking = false;
    
    function onScroll() {
        if (!ticking) {
            requestAnimationFrame(() => {
                const scrollableHeight = document.documentElement.scrollHeight - window.innerHeight;
                scrollPercent = Math.min(0.7, window.scrollY / scrollableHeight);
                ticking = false;
            });
            ticking = true;
        }
    }
    window.addEventListener('scroll', onScroll, { passive: true });
    
    function onMouseMove(event) {
        if (!ticking) {
            requestAnimationFrame(() => {
                mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
                mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;
                ticking = false;
            });
            ticking = true;
        }
    }
    window.addEventListener('mousemove', onMouseMove, { passive: true });

    function onWindowResize() {
        const width = window.innerWidth;
        const height = window.innerHeight;
        
        camera.aspect = width / height;
        camera.updateProjectionMatrix();
        
        renderer.setSize(width, height);
        composer.setSize(width, height);
        
        // Reducir calidad en dispositivos móviles
        const isMobile = width < 768;
        renderer.setPixelRatio(isMobile ? 1 : Math.min(window.devicePixelRatio, 2));
        
        // Ajustar bloom pass para dispositivos móviles
        bloomPass.resolution.set(width / (isMobile ? 4 : 2), height / (isMobile ? 4 : 2));
    }
    window.addEventListener('resize', onWindowResize, { passive: true });
    
    // 7. Bucle de Animación con optimizaciones
    let lastTime = 0;
    const frameRate = 1000 / 60; // Limitar a 60 FPS
    
    function animate(currentTime) {
        requestAnimationFrame(animate);
        
        // Limitar la tasa de fotogramas
        const deltaTime = currentTime - lastTime;
        if (deltaTime < frameRate) return;
        lastTime = currentTime - (deltaTime % frameRate);
        
        const delta = clock.getDelta();
        
        // Mover las partículas para un efecto de "flujo"
        particles.position.z += delta * 20;

        // Reciclar partículas
        const positionsArray = particles.geometry.attributes.position.array;
        const currentCameraZ = camera.position.z;
        const particleSpeed = 20;
        const resetThreshold = 5;
        const resetOffset = 10;

        // Optimización: procesar partículas en lotes para reducir la carga de CPU
        const batchSize = 1000; // Procesar 1000 partículas por fotograma
        const startIndex = Math.floor(Math.random() * (particleCount - batchSize));
        
        for (let i = startIndex; i < startIndex + batchSize && i < particleCount; i++) {
            const i3 = i * 3;
            positionsArray[i3 + 2] += delta * particleSpeed;

            if (positionsArray[i3 + 2] > currentCameraZ + resetThreshold) {
                positionsArray[i3 + 2] = currentCameraZ - riverLength - resetOffset + (Math.random() * resetOffset * 2);
            }
        }
        
        particles.geometry.attributes.position.needsUpdate = true;

        // Mover la cámara basado en el scroll
        const minCameraZ = 5;
        const maxScrollEffect = riverLength * 0.7;
        const targetZ = minCameraZ - scrollPercent * maxScrollEffect;
        camera.position.z = THREE.MathUtils.lerp(camera.position.z, targetZ, 0.05);

        // Mover la vista de la cámara con el ratón
        camera.rotation.y = THREE.MathUtils.lerp(camera.rotation.y, (-mouse.x * Math.PI) / 20, 0.05);
        camera.rotation.x = THREE.MathUtils.lerp(camera.rotation.x, (mouse.y * Math.PI) / 20, 0.05);
        
        // Ajustar la fuerza del resplandor (bloom) con el scroll
        const minBloomStrength = 1.5;
        const maxBloomStrength = 3.0;
        bloomPass.strength = THREE.MathUtils.lerp(minBloomStrength, maxBloomStrength, scrollPercent);

        composer.render();
    }
    
    animate(0);
}

// Inicializar Three.js solo cuando la ventana se haya cargado completamente
window.addEventListener('load', function() {
  if (typeof THREE === 'undefined') {
      console.error("Three.js no se ha cargado.");
      return;
  }
  
  // Detectar si es un dispositivo de baja potencia
  const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
  const isLowPower = isMobile && (navigator.deviceMemory < 4 || navigator.hardwareConcurrency < 4);
  
  if (isLowPower || isMobile) { // Extendemos la condición a todos los móviles para mejorar el rendimiento
    // En dispositivos de baja potencia, usamos un fondo estático en lugar de la animación 3D
    const canvas = document.getElementById('bg-canvas');
    if (canvas) {
      canvas.style.background = 'radial-gradient(circle at 50% 50%, rgba(67, 97, 238, 0.15) 0%, rgba(13, 19, 33, 0.95) 70%)';
    }
    
    // Aseguramos que todas las secciones fade-in sean visibles en dispositivos móviles
    document.querySelectorAll('section.fade-in').forEach(section => {
      section.classList.add('visible');
    });
    
    // Específicamente aseguramos que el blog sea visible
    const blogSection = document.getElementById('blog');
    if (blogSection) {
      blogSection.classList.add('visible');
      blogSection.style.opacity = '1';
      blogSection.style.transform = 'translateY(0)';
    }
  } else {
    // Solo iniciar la animación en dispositivos con suficiente potencia
    initCosmicRiver();
  }
});

// Función para cargar el contenido de los modales
function loadModalsContent() {
  const modalsContainer = document.getElementById('modals-container');
  if (!modalsContainer) return;

  // Evitar duplicar los modales si ya se han cargado
  if (modalsContainer.children.length > 0) return;
  
  // El contenido HTML de los modales va aquí...
  const modalsHTML = `
    <!-- Service Modals -->
    <div class="modal-overlay" id="modal-mobile-overlay">
      <div class="modal">
        <div class="modal-header">
          <h3>Aplicaciones Móviles</h3>
        </div>
        <div class="modal-body">
          <p>Desarrollamos aplicaciones móviles nativas e híbridas que ofrecen un rendimiento excepcional y una experiencia de usuario fluida en iOS y Android.</p>
          <h4>Herramientas que usamos</h4>
          <ul>
            <li>React Native, Flutter, Swift, Kotlin</li>
            <li>Firebase, AWS Amplify</li>
            <li>Figma, Zeplin para diseño</li>
          </ul>
          <h4>Implementación empresarial</h4>
          <p>Integramos con sistemas CRM, ERP y análisis en tiempo real. Ideal para startups y empresas que buscan escalar rápido.</p>
        </div>
        <div class="modal-footer">
          <button class="btn" onclick="closeAllModals()">Cerrar</button>
        </div>
      </div>
    </div>

    <!-- Resto del código de modales... -->

    <div class="modal-overlay" id="modal-web-overlay">
      <div class="modal">
        <div class="modal-header">
          <h3>Desarrollo Web</h3>
        </div>
        <div class="modal-body">
          <p>Construimos sitios web y plataformas web de alto rendimiento, SEO-friendly y escalables.</p>
          <h4>Herramientas que usamos</h4>
          <ul>
            <li>React, Vue, Next.js, Nuxt.js</li>
            <li>Node.js, Express, Django</li>
            <li>PostgreSQL, MongoDB</li>
          </ul>
          <h4>Implementación empresarial</h4>
          <p>Perfecto para e-commerce, dashboards, y plataformas B2B. Integración con pago, autenticación y analítica.</p>
        </div>
        <div class="modal-footer">
          <button class="btn" onclick="closeAllModals()">Cerrar</button>
        </div>
      </div>
    </div>

    <div class="modal-overlay" id="modal-custom-overlay">
      <div class="modal">
        <div class="modal-header">
          <h3>Software a Medida</h3>
        </div>
        <div class="modal-body">
          <p>Sistemas personalizados que se adaptan exactamente a tus procesos de negocio.</p>
          <h4>Herramientas que usamos</h4>
          <ul>
            <li>.NET, Java, Python</li>
            <li>Microservicios, Docker, Kubernetes</li>
            <li>API REST y GraphQL</li>
          </ul>
          <h4>Implementación empresarial</h4>
          <p>Automatizamos flujos de trabajo, reducimos costos operativos y mejoramos la eficiencia.</p>
        </div>
        <div class="modal-footer">
          <button class="btn" onclick="closeAllModals()">Cerrar</button>
        </div>
      </div>
    </div>

    <div class="modal-overlay" id="modal-cloud-overlay">
      <div class="modal">
        <div class="modal-header">
          <h3>Cloud & DevOps</h3>
        </div>
        <div class="modal-body">
          <p>Infraestructura en la nube segura, escalable y con despliegue continuo.</p>
          <h4>Herramientas que usamos</h4>
          <ul>
            <li>AWS, Azure, Google Cloud</li>
            <li>Docker, Kubernetes, Terraform</li>
            <li>Jenkins, GitHub Actions</li>
          </ul>
          <h4>Implementación empresarial</h4>
          <p>Optimizamos costos, mejoramos la seguridad y garantizamos alta disponibilidad.</p>
        </div>
        <div class="modal-footer">
          <button class="btn" onclick="closeAllModals()">Cerrar</button>
        </div>
      </div>
    </div>

    <div class="modal-overlay" id="modal-ux-overlay">
      <div class="modal">
        <div class="modal-header">
          <h3>UX/UI Design</h3>
        </div>
        <div class="modal-body">
          <p>Diseñamos interfaces centradas en el usuario, intuitivas y visualmente impactantes.</p>
          <h4>Herramientas que usamos</h4>
          <ul>
            <li>Figma, Adobe XD, Sketch</li>
            <li>Usability testing, prototipado</li>
            <li>Design Systems</li>
          </ul>
          <h4>Implementación empresarial</h4>
          <p>Mejoramos la conversión, reducimos la curva de aprendizaje y aumentamos la satisfacción del usuario.</p>
        </div>
        <div class="modal-footer">
          <button class="btn" onclick="closeAllModals()">Cerrar</button>
        </div>
      </div>
    </div>

    <div class="modal-overlay" id="modal-consulting-overlay">
      <div class="modal">
        <div class="modal-header">
          <h3>Consultoría Tech</h3>
        </div>
        <div class="modal-body">
          <p>Asesoramos en arquitectura, stack tecnológico y estrategia digital.</p>
          <h4>Herramientas que usamos</h4>
          <ul>
            <li>Arquitectura de software</li>
            <li>Evaluación de stacks</li>
            <li>Planificación de MVP</li>
          </ul>
          <h4>Implementación empresarial</h4>
          <p>Ayudamos a startups y corporaciones a tomar decisiones tecnológicas estratégicas.</p>
        </div>
        <div class="modal-footer">
          <button class="btn" onclick="closeAllModals()">Cerrar</button>
        </div>
      </div>
    </div>

    <div class="modal-overlay" id="modal-ai-overlay">
      <div class="modal">
        <div class="modal-header">
          <h3>Integración de IA</h3>
        </div>
        <div class="modal-body">
          <p>Automatizamos procesos con inteligencia artificial y machine learning.</p>
          <h4>Herramientas que usamos</h4>
          <ul>
            <li>Python, TensorFlow, PyTorch</li>
            <li>OpenAI, Hugging Face</li>
            <li>LangChain, LLMs</li>
          </ul>
          <h4>Implementación empresarial</h4>
          <p>Chatbots, análisis predictivo, procesamiento de documentos, recomendaciones.</p>
        </div>
        <div class="modal-footer">
          <button class="btn" onclick="closeAllModals()">Cerrar</button>
        </div>
      </div>
    </div>

    <div class="modal-overlay" id="modal-support-overlay">
      <div class="modal">
        <div class="modal-header">
          <h3>Mantenimiento y Soporte</h3>
        </div>
        <div class="modal-body">
          <p>Soporte técnico continuo, actualizaciones y monitoreo 24/7.</p>
          <h4>Herramientas que usamos</h4>
          <ul>
            <li>Zendesk, Jira, Sentry</li>
            <li>Monitoreo con Datadog, New Relic</li>
            <li>Backups y recuperación</li>
          </ul>
          <h4>Implementación empresarial</h4>
          <p>Garantizamos estabilidad, seguridad y rendimiento continuo de tus aplicaciones.</p>
        </div>
        <div class="modal-footer">
          <button class="btn" onclick="closeAllModals()">Cerrar</button>
        </div>
      </div>
    </div>

    <div class="modal-overlay" id="modal-enterprise-overlay">
      <div class="modal">
        <div class="modal-header">
          <h3>Aplicaciones para Empresas</h3>
        </div>
        <div class="modal-body">
          <p>Soluciones ERP, CRM y herramientas internas para mejorar la gestión.</p>
          <h4>Herramientas que usamos</h4>
          <ul>
            <li>Dynamics 365, SAP, Odoo</li>
            <li>Power BI, Tableau</li>
            <li>Integración con SAP, Salesforce</li>
          </ul>
          <h4>Implementación empresarial</h4>
          <p>Automatizamos ventas, inventario, recursos humanos y finanzas.</p>
        </div>
        <div class="modal-footer">
          <button class="btn" onclick="closeAllModals()">Cerrar</button>
        </div>
      </div>
    </div>

    <div class="modal-overlay" id="modal-backend-overlay">
      <div class="modal">
        <div class="modal-header">
          <h3>Desarrollo Backend</h3>
        </div>
        <div class="modal-body">
          <p>APIs robustas, bases de datos y lógica de negocio escalable.</p>
          <h4>Herramientas que usamos</h4>
          <ul>
            <li>Node.js, Python, Java, Go</li>
            <li>PostgreSQL, MongoDB, Redis</li>
            <li>GraphQL, REST, WebSockets</li>
          </ul>
          <h4>Implementación empresarial</h4>
          <p>Construimos la base sólida para tus aplicaciones web y móviles.</p>
        </div>
        <div class="modal-footer">
          <button class="btn" onclick="closeAllModals()">Cerrar</button>
        </div>
      </div>
    </div>

    <div class="modal-overlay" id="modal-frontend-overlay">
      <div class="modal">
        <div class="modal-header">
          <h3>Desarrollo Frontend</h3>
        </div>
        <div class="modal-body">
          <p>Interfaces modernas, responsivas y con alto rendimiento.</p>
          <h4>Herramientas que usamos</h4>
          <ul>
            <li>React, Vue, Angular</li>
            <li>Next.js, Nuxt.js</li>
            <li>Tailwind, SCSS, Framer Motion</li>
          </ul>
          <h4>Implementación empresarial</h4>
          <p>Optimizamos velocidad, SEO y experiencia del usuario en todas las plataformas.</p>
        </div>
        <div class="modal-footer">
          <button class="btn" onclick="closeAllModals()">Cerrar</button>
        </div>
      </div>
    </div>

    <div class="modal-overlay" id="modal-cross-overlay">
      <div class="modal">
        <div class="modal-header">
          <h3>Aplicaciones Multiplataforma</h3>
        </div>
        <div class="modal-body">
          <p>Una sola base de código para iOS, Android, Web y escritorio.</p>
          <h4>Herramientas que usamos</h4>
          <ul>
            <li>Flutter, React Native</li>
            <li>Electron, Capacitor</li>
            <li>Firebase, Supabase</li>
          </ul>
          <h4>Implementación empresarial</h4>
          <p>Reducimos costos de desarrollo y mantenimiento sin sacrificar calidad.</p>
        </div>
        <div class="modal-footer">
          <button class="btn" onclick="closeAllModals()">Cerrar</button>
        </div>
      </div>
    </div>

    <!-- Contact Form Modal -->
    <div class="modal-overlay" id="modal-contact-form-overlay">
      <div class="modal">
        <div class="modal-header">
          <h3>Envíanos un Mensaje</h3>
        </div>
        <div class="modal-body">
          <p>Completa el siguiente formulario y nos pondremos en contacto contigo a la brevedad posible.</p>
          <form class="contact-form" id="main-contact-form" action="https://formspree.io/f/xrgnoqej" method="POST">
            <div class="form-group">
              <label for="nombre"><i class="fas fa-user"></i> Nombre:</label>
              <input type="text" id="nombre" name="nombre" placeholder="Tu nombre" required data-validation-type="text">
              <span class="validation-message"></span>
              <i class="fas fa-check-circle validation-icon"></i>
            </div>
            <div class="form-group">
              <label for="apellido"><i class="fas fa-user-tag"></i> Apellido:</label>
              <input type="text" id="apellido" name="apellido" placeholder="Tu apellido" required data-validation-type="text">
              <span class="validation-message"></span>
              <i class="fas fa-check-circle validation-icon"></i>
            </div>
            <div class="form-group">
              <label for="email"><i class="fas fa-envelope"></i> Correo Electrónico:</label>
              <input type="email" id="email" name="email" placeholder="tu.email@ejemplo.com" required data-validation-type="email">
              <span class="validation-message"></span>
              <i class="fas fa-check-circle validation-icon"></i>
            </div>
            <div class="form-group">
              <label for="tipo-cliente"><i class="fas fa-building"></i> Tipo de Cliente:</label>
              <select id="tipo-cliente" name="tipo_cliente" required data-validation-type="select">
                <option value="">Selecciona una opción</option>
                <option value="empresa">Empresa</option>
                <option value="particular">Particular</option>
              </select>
              <span class="validation-message"></span>
              <i class="fas fa-check-circle validation-icon"></i>
            </div>
            <div class="form-group">
              <label for="telefono"><i class="fas fa-phone-alt"></i> Número de Contacto:</label>
              <input type="tel" id="telefono" name="telefono" placeholder="+XX XXX XXX XXXX" required data-validation-type="phone">
              <span class="validation-message"></span>
              <i class="fas fa-check-circle validation-icon"></i>
            </div>
            <div class="form-group">
              <label for="fecha-contacto"><i class="far fa-calendar-alt"></i> Fecha Preferida:</label>
              <input type="date" id="fecha-contacto" name="fecha_contacto" required data-validation-type="date">
              <span class="validation-message"></span>
              <i class="fas fa-check-circle validation-icon"></i>
            </div>
            <div class="form-group">
              <label for="hora-contacto"><i class="far fa-clock"></i> Hora Preferida:</label>
              <input type="time" id="hora-contacto" name="hora_contacto" required data-validation-type="time">
              <span class="validation-message"></span>
              <i class="fas fa-check-circle validation-icon"></i>
            </div>
            <div class="form-group">
              <label for="direccion"><i class="fas fa-map-marker-alt"></i> Dirección:</label>
              <input type="text" id="direccion" name="direccion" placeholder="Tu dirección (opcional)" data-validation-type="optional-text">
              <span class="validation-message"></span>
              <i class="fas fa-check-circle validation-icon"></i>
            </div>
            <div class="form-group full-width">
              <label for="tipo-proyecto"><i class="fas fa-laptop-code"></i> Tipo de Proyecto:</label>
              <select id="tipo-proyecto" name="tipo_proyecto" required data-validation-type="select">
                <option value="">Selecciona un servicio</option>
                <option value="movil">Aplicaciones Móviles</option>
                <option value="web">Desarrollo Web</option>
                <option value="medida">Software a Medida</option>
                <option value="cloud">Cloud & DevOps</option>
                <option value="ux-ui">UX/UI Design</option>
                <option value="consultoria">Consultoría Tech</option>
                <option value="ia">Integración de IA</option>
                <option value="mantenimiento">Mantenimiento y Soporte</option>
                <option value="empresas">Aplicaciones para Empresas</option>
                <option value="backend">Desarrollo Backend</option>
                <option value="frontend">Desarrollo Frontend</option>
                <option value="multiplataforma">Aplicaciones Multiplataforma</option>
              </select>
              <span class="validation-message"></span>
              <i class="fas fa-check-circle validation-icon"></i>
            </div>
            <div class="form-group full-width">
              <label for="mensaje"><i class="fas fa-comment-alt"></i> Cuéntanos sobre tu proyecto:</label>
              <textarea id="mensaje" name="mensaje" placeholder="Describe tu proyecto..." required data-validation-type="textarea"></textarea>
              <span class="validation-message"></span>
              <i class="fas fa-check-circle validation-icon"></i>
            </div>
            <input type="hidden" name="_subject" value="Nuevo contacto desde Axon.app">
            <input type="hidden" name="_next" value="https://axon-app.github.io/Axon.app/gracias.html">
            <input type="text" name="_gotcha" style="display:none">

            <button type="submit" class="btn">Enviar Mensaje</button>
          </form>
        </div>
        <div class="modal-footer">
          <button class="btn" onclick="closeAllModals()">Cerrar</button>
        </div>
      </div>
    </div>

    <!-- Legal Modals -->
    <div class="modal-overlay" id="modal-privacy-policy-overlay">
      <div class="modal">
        <div class="modal-header">
          <h3>Política de Privacidad</h3>
        </div>
        <div class="modal-body">
          <h4>Introducción</h4>
          <p>En Axon.app, nos comprometemos a proteger su privacidad. Esta política de privacidad explica cómo recopilamos, usamos y protegemos su información personal.</p>
          <h4>Información que Recopilamos</h4>
          <ul>
            <li><strong>Información Personal:</strong> Nombre, dirección de correo electrónico, número de teléfono, etc., que usted nos proporciona voluntariamente.</li>
            <li><strong>Datos de Uso:</strong> Información sobre cómo interactúa con nuestro sitio web, como páginas visitadas, tiempo de permanencia, etc.</li>
            <li><strong>Cookies:</strong> Pequeños archivos de texto que se almacenan en su dispositivo para mejorar su experiencia de navegación.</li>
          </ul>
          <h4>Uso de la Información</h4>
          <p>Utilizamos su información para:</p>
          <ul>
            <li>Proveer y mejorar nuestros servicios.</li>
            <li>Comunicarnos con usted sobre su proyecto o consultas.</li>
            <li>Personalizar su experiencia en nuestro sitio web.</li>
            <li>Cumplir con nuestras obligaciones legales.</li>
          </ul>
        </div>
        <div class="modal-footer">
          <button class="btn" onclick="closeAllModals()">Cerrar</button>
        </div>
      </div>
    </div>

    <div class="modal-overlay" id="modal-terms-conditions-overlay">
      <div class="modal">
        <div class="modal-header">
          <h3>Términos y Condiciones</h3>
        </div>
        <div class="modal-body">
          <h4>Aceptación de los Términos</h4>
          <p>Al acceder y utilizar los servicios de Axon.app, usted acepta estar sujeto a estos Términos y Condiciones, así como a nuestra Política de Privacidad y Política de Cookies.</p>
          <h4>Servicios Ofrecidos</h4>
          <p>Axon.app ofrece servicios de desarrollo de software, incluyendo aplicaciones móviles, desarrollo web, software a medida, consultoría tecnológica, entre otros.</p>
        </div>
        <div class="modal-footer">
          <button class="btn" onclick="closeAllModals()">Cerrar</button>
        </div>
      </div>
    </div>

    <div class="modal-overlay" id="modal-cookies-policy-overlay">
      <div class="modal">
        <div class="modal-header">
          <h3>Política de Cookies</h3>
        </div>
        <div class="modal-body">
          <h4>¿Qué son las Cookies?</h4>
          <p>Las cookies son pequeños archivos de texto que los sitios web que visita colocan en su ordenador o dispositivo móvil.</p>
          <h4>¿Cómo Usamos las Cookies?</h4>
          <p>Utilizamos cookies para mejorar su experiencia de navegación, recordar sus preferencias y analizar el tráfico del sitio.</p>
        </div>
        <div class="modal-footer">
          <button class="btn" onclick="closeAllModals()">Cerrar</button>
        </div>
      </div>
    </div>

    <div class="modal-overlay" id="modal-legal-notice-overlay">
      <div class="modal">
        <div class="modal-header">
          <h3>Aviso Legal</h3>
        </div>
        <div class="modal-body">
          <h4>Información General</h4>
          <p>Este aviso legal regula el uso del sitio web de Axon.app. Al acceder y utilizar este sitio web, usted acepta los términos y condiciones establecidos en este aviso.</p>
        </div>
        <div class="modal-footer">
          <button class="btn" onclick="closeAllModals()">Cerrar</button>
        </div>
      </div>
    </div>

    <div class="modal-overlay" id="modal-faq-overlay">
      <div class="modal">
        <div class="modal-header">
          <h3>Preguntas Frecuentes (FAQ)</h3>
        </div>
        <div class="modal-body">
          <h4>¿Qué servicios ofrece Axon.app?</h4>
          <p>Ofrecemos desarrollo de aplicaciones móviles, desarrollo web, software a medida, consultoría tecnológica, servicios de Cloud & DevOps, diseño UX/UI, integración de IA, mantenimiento y soporte.</p>
          <h4>¿Cuál es el proceso de desarrollo de un proyecto?</h4>
          <p>Nuestro proceso incluye: consulta inicial, análisis de requisitos, diseño y prototipado, desarrollo ágil, pruebas de calidad, lanzamiento y soporte post-lanzamiento.</p>
        </div>
        <div class="modal-footer">
          <button class="btn" onclick="closeAllModals()">Cerrar</button>
        </div>
      </div>
    </div>

    <!-- Portfolio Project Modals -->
    <div class="modal-overlay" id="modal-project-1-overlay">
      <div class="modal">
        <div class="modal-header">
          <h3>FinTrack Pro</h3>
        </div>
        <div class="modal-body">
          <img src="assets/images/FinTrackPro.png" alt="FinTrack Pro - App de finanzas personales para iOS y Android" style="width:100%; border-radius:10px; margin-bottom:1rem;">
          <p>Aplicación móvil multiplataforma para gestión integral de finanzas personales que permite visualizar gastos, establecer presupuestos, generar informes avanzados y proyecciones financieras personalizadas.</p>
          <h4>Tecnologías usadas</h4>
          <ul>
            <li>React Native</li>
            <li>Firebase</li>
            <li>Node.js</li>
            <li>Chart.js</li>
            <li>Redux</li>
          </ul>
        </div>
        <div class="modal-footer">
          <button class="btn" onclick="closeAllModals()">Cerrar</button>
        </div>
      </div>
    </div>
    
    <div class="modal-overlay" id="modal-project-2-overlay">
      <div class="modal">
        <div class="modal-header">
          <h3>EduLearn Platform</h3>
        </div>
        <div class="modal-body">
          <img src="assets/images/EduLearnPlatform.png" alt="EduLearn Platform - Sistema de aprendizaje en línea con IA" style="width:100%; border-radius:10px; margin-bottom:1rem;">
          <p>Sistema de aprendizaje en línea con inteligencia artificial para personalizar la experiencia educativa.</p>
          <h4>Tecnologías usadas</h4>
          <ul>
            <li>React</li>
            <li>TensorFlow.js</li>
            <li>Node.js</li>
            <li>PostgreSQL</li>
            <li>AWS</li>
          </ul>
        </div>
        <div class="modal-footer">
          <button class="btn" onclick="closeAllModals()">Cerrar</button>
        </div>
      </div>
    </div>
    
    <div class="modal-overlay" id="modal-project-3-overlay">
      <div class="modal">
        <div class="modal-header">
          <h3>CoreERP</h3>
        </div>
        <div class="modal-body">
          <img src="assets/images/CoreERP.png" alt="CoreERP - Sistema de gestión empresarial modular" style="width:100%; border-radius:10px; margin-bottom:1rem;">
          <p>Sistema integrado de gestión empresarial modular que optimiza procesos de negocios, incluyendo inventario, finanzas, recursos humanos y CRM.</p>
          <h4>Tecnologías usadas</h4>
          <ul>
            <li>Java Spring Boot</li>
            <li>Angular</li>
            <li>PostgreSQL</li>
            <li>Docker</li>
            <li>Redis</li>
          </ul>
        </div>
        <div class="modal-footer">
          <button class="btn" onclick="closeAllModals()">Cerrar</button>
        </div>
      </div>
    </div>
    
    <div class="modal-overlay" id="modal-project-4-overlay">
      <div class="modal">
        <div class="modal-header">
          <h3>HealthSync</h3>
        </div>
        <div class="modal-body">
          <img src="assets/images/HealthSync.png" alt="HealthSync - App de gestión de salud y citas médicas" style="width:100%; border-radius:10px; margin-bottom:1rem;">
          <p>Aplicación móvil para gestión integral de salud personal, reserva de citas médicas, seguimiento de tratamientos y acceso a expedientes médicos digitales.</p>
          <h4>Tecnologías usadas</h4>
          <ul>
            <li>React Native</li>
            <li>Firebase</li>
            <li>Node.js</li>
            <li>MongoDB</li>
            <li>WebRTC</li>
          </ul>
        </div>
        <div class="modal-footer">
          <button class="btn" onclick="closeAllModals()">Cerrar</button>
        </div>
      </div>
    </div>
    
    <div class="modal-overlay" id="modal-project-5-overlay">
      <div class="modal">
        <div class="modal-header">
          <h3>ShopFlow</h3>
        </div>
        <div class="modal-body">
          <img src="assets/images/ShopFlow.png" alt="ShopFlow - Plataforma de comercio electrónico con pagos seguros" style="width:100%; border-radius:10px; margin-bottom:1rem;">
          <p>Solución integral de e-commerce que ofrece una experiencia de compra personalizada, gestión de inventario en tiempo real, integración con múltiples métodos de pago y análisis avanzado del comportamiento del consumidor.</p>
          <h4>Tecnologías usadas</h4>
          <ul>
            <li>Next.js</li>
            <li>Stripe</li>
            <li>Node.js</li>
            <li>MongoDB</li>
            <li>AWS S3</li>
          </ul>
        </div>
        <div class="modal-footer">
          <button class="btn" onclick="closeAllModals()">Cerrar</button>
        </div>
      </div>
    </div>
    
    <div class="modal-overlay" id="modal-project-6-overlay">
      <div class="modal">
        <div class="modal-header">
          <h3>DataDash</h3>
        </div>
        <div class="modal-body">
          <img src="assets/images/DataDash.png" alt="DataDash - Dashboard de analítica en tiempo real para empresas" style="width:100%; border-radius:10px; margin-bottom:1rem;">
          <p>Plataforma empresarial de análisis de datos en tiempo real que transforma datos complejos en visualizaciones interactivas, permitiendo a las organizaciones tomar decisiones estratégicas basadas en información precisa y actualizada.</p>
          <h4>Tecnologías usadas</h4>
          <ul>
            <li>React</li>
            <li>D3.js</li>
            <li>Node.js</li>
            <li>MongoDB</li>
            <li>Socket.IO</li>
          </ul>
        </div>
        <div class="modal-footer">
          <button class="btn" onclick="closeAllModals()">Cerrar</button>
        </div>
      </div>
    </div>
    
    <div class="modal-overlay" id="modal-project-7-overlay">
      <div class="modal">
        <div class="modal-header">
          <h3>LogiTrack</h3>
        </div>
        <div class="modal-body">
          <img src="assets/images/LogiTrack.png" alt="LogiTrack - Sistema de seguimiento de envíos y logística" style="width:100%; border-radius:10px; margin-bottom:1rem;">
          <p>Sistema avanzado de gestión logística con seguimiento en tiempo real de envíos, optimización de rutas, gestión de inventario en almacenes y generación de informes detallados para mejorar la cadena de suministro.</p>
          <h4>Tecnologías usadas</h4>
          <ul>
            <li>React</li>
            <li>Node.js</li>
            <li>GraphQL</li>
            <li>PostgreSQL</li>
            <li>Azure Maps</li>
          </ul>
        </div>
        <div class="modal-footer">
          <button class="btn" onclick="closeAllModals()">Cerrar</button>
        </div>
      </div>
    </div>
    
    <div class="modal-overlay" id="modal-project-8-overlay">
      <div class="modal">
        <div class="modal-header">
          <h3>SocialHub</h3>
        </div>
        <div class="modal-body">
          <img src="assets/images/SocialHub.png" alt="SocialHub - Red social para profesionales del sector tecnológico" style="width:100%; border-radius:10px; margin-bottom:1rem;">
          <p>Plataforma de networking profesional especializada para el sector tecnológico que facilita la conexión entre desarrolladores, diseñadores y profesionales IT, con funcionalidades para compartir proyectos, oportunidades laborales y eventos de la industria.</p>
          <h4>Tecnologías usadas</h4>
          <ul>
            <li>React</li>
            <li>TypeScript</li>
            <li>Firebase</li>
            <li>Node.js</li>
            <li>WebSockets</li>
          </ul>
        </div>
        <div class="modal-footer">
          <button class="btn" onclick="closeAllModals()">Cerrar</button>
        </div>
      </div>
    </div>
    
    <div class="modal-overlay" id="modal-project-9-overlay">
      <div class="modal">
        <div class="modal-header">
          <h3>InvestPro</h3>
        </div>
        <div class="modal-body">
          <img src="assets/images/InvestPro.png" alt="InvestPro - App de inversión automatizada con IA" style="width:100%; border-radius:10px; margin-bottom:1rem;">
          <p>Aplicación de inversión inteligente que utiliza algoritmos de aprendizaje automático para analizar tendencias del mercado, optimizar carteras de inversión y recomendar estrategias personalizadas según el perfil de riesgo del usuario.</p>
          <h4>Tecnologías usadas</h4>
          <ul>
            <li>React Native</li>
            <li>Python (scikit-learn)</li>
            <li>TensorFlow</li>
            <li>Django REST</li>
            <li>PostgreSQL</li>
          </ul>
        </div>
        <div class="modal-footer">
          <button class="btn" onclick="closeAllModals()">Cerrar</button>
        </div>
      </div>
    </div>
    
    <div class="modal-overlay" id="modal-project-10-overlay">
      <div class="modal">
        <div class="modal-header">
          <h3>TravelMate</h3>
        </div>
        <div class="modal-body">
          <img src="assets/images/TravelMate.png" alt="TravelMate - App de planificación de viajes y reservas" style="width:100%; border-radius:10px; margin-bottom:1rem;">
          <p>App de planificación de viajes y reservas que facilita la organización de itinerarios y reservas de hoteles.</p>
          <h4>Tecnologías usadas</h4>
          <ul>
            <li>Swift</li>
            <li>HealthKit</li>
            <li>Node.js</li>
            <li>MongoDB</li>
          </ul>
        </div>
        <div class="modal-footer">
          <button class="btn" onclick="closeAllModals()">Cerrar</button>
        </div>
      </div>
    </div>
    
    <div class="modal-overlay" id="modal-project-11-overlay">
      <div class="modal">
        <div class="modal-header">
          <h3>AgroSmart</h3>
        </div>
        <div class="modal-body">
          <img src="assets/images/AgroSmart.png" alt="AgroSmart - Sistema de monitoreo agrícola con IoT" style="width:100%; border-radius:10px; margin-bottom:1rem;">
          <p>Sistema de monitoreo agrícola con IoT que permite a los agricultores controlar y optimizar sus cultivos.</p>
          <h4>Tecnologías usadas</h4>
          <ul>
            <li>Angular</li>
            <li>Java</li>
            <li>Blockchain</li>
            <li>Azure</li>
          </ul>
        </div>
        <div class="modal-footer">
          <button class="btn" onclick="closeAllModals()">Cerrar</button>
        </div>
      </div>
    </div>
    
    <div class="modal-overlay" id="modal-project-12-overlay">
      <div class="modal">
        <div class="modal-header">
          <h3>Learnly</h3>
        </div>
        <div class="modal-body">
          <img src="assets/images/Learnly.png" alt="Learnly - Plataforma educativa con gamificación" style="width:100%; border-radius:10px; margin-bottom:1rem;">
          <p>Plataforma educativa con elementos de gamificación que transforma el aprendizaje en una experiencia interactiva y motivadora.</p>
          <h4>Tecnologías usadas</h4>
          <ul>
            <li>Unity</li>
            <li>WebXR</li>
            <li>C#</li>
            <li>Three.js</li>
          </ul>
        </div>
        <div class="modal-footer">
          <button class="btn" onclick="closeAllModals()">Cerrar</button>
        </div>
      </div>
    </div>

    <!-- Blog Modals -->
    <div class="modal-overlay" id="modal-blog-1-overlay">
      <div class="modal">
        <div class="modal-header">
          <h3>10 Tendencias de desarrollo web en 2025</h3>
        </div>
        <div class="modal-body">
          <img src="https://images.unsplash.com/photo-1498050108023-c5249f4df085?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80" alt="" style="width:100%; border-radius:10px; margin-bottom:1rem;">
          <p>El desarrollo web sigue evolucionando a un ritmo vertiginoso. En 2025, las tendencias clave incluyen la inteligencia artificial en la interfaz de usuario, la adopción masiva de WebAssembly para un rendimiento cercano al nativo, y la creciente importancia de las Progressive Web Apps (PWAs).</p>
          <h4>Puntos Clave:</h4>
          <ul>
            <li>IA en UX/UI y personalización.</li>
            <li>WebAssembly para rendimiento.</li>
            <li>PWAs y arquitecturas JAMstack/Micro Frontends.</li>
            <li>Ciberseguridad y privacidad de datos.</li>
          </ul>
        </div>
        <div class="modal-footer">
          <button class="btn" onclick="closeAllModals()">Cerrar</button>
        </div>
      </div>
    </div>
    
    <div class="modal-overlay" id="modal-blog-2-overlay">
      <div class="modal">
        <div class="modal-header">
          <h3>Cómo elegir el stack tecnológico ideal</h3>
        </div>
        <div class="modal-body">
          <img src="assets/images/stacktecnológico.png" alt="Cómo elegir el stack tecnológico ideal" style="width:100%; border-radius:10px; margin-bottom:1rem;">
          <p>La elección del stack tecnológico para tu proyecto es una decisión crítica que impactará todo el ciclo de desarrollo. Debes considerar factores como la escalabilidad futura, el talento disponible, la comunidad de soporte y la madurez de las tecnologías.</p>
          <h4>Consideraciones clave:</h4>
          <ul>
            <li>Tipo de aplicación y requisitos funcionales.</li>
            <li>Escalabilidad y rendimiento esperados.</li>
            <li>Presupuesto y plazos del proyecto.</li>
            <li>Habilidades del equipo actual o facilidad para contratar.</li>
            <li>Seguridad y cumplimiento normativo.</li>
          </ul>
        </div>
        <div class="modal-footer">
          <button class="btn" onclick="closeAllModals()">Cerrar</button>
        </div>
      </div>
    </div>

    <div class="modal-overlay" id="modal-blog-3-overlay">
      <div class="modal">
        <div class="modal-header">
          <h3>El poder del diseño UX en aplicaciones móviles</h3>
        </div>
        <div class="modal-body">
          <img src="https://images.unsplash.com/photo-1551288049-bebda4e38f71?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80" alt="" style="width:100%; border-radius:10px; margin-bottom:1rem;">
          <p>El diseño UX es mucho más que estética; es la diferencia entre una app que los usuarios aman y una que abandonan. Las aplicaciones móviles exitosas priorizan la usabilidad, la accesibilidad y la experiencia emocional del usuario.</p>
          <h4>Elementos fundamentales:</h4>
          <ul>
            <li>Flujos de navegación intuitivos y optimizados.</li>
            <li>Tiempo de carga y retroalimentación inmediata.</li>
            <li>Consistencia en patrones de diseño y micro-interacciones.</li>
            <li>Accesibilidad para todos los usuarios.</li>
          </ul>
        </div>
        <div class="modal-footer">
          <button class="btn" onclick="closeAllModals()">Cerrar</button>
        </div>
      </div>
    </div>

    <div class="modal-overlay" id="modal-blog-4-overlay">
      <div class="modal">
        <div class="modal-header">
          <h3>IA Generativa: Revolución en el Desarrollo de Software</h3>
        </div>
        <div class="modal-body">
          <img src="assets/images/inteligencia_artificial.png" alt="IA Generativa: Revolución en el Desarrollo de Software" style="width:100%; border-radius:10px; margin-bottom:1rem;">
          <p>La inteligencia artificial generativa está transformando el desarrollo de software, permitiendo a los programadores aumentar su productividad y creatividad. Herramientas como Copilot y otros asistentes basados en IA pueden generar código, sugerir soluciones y ayudar en el debugging.</p>
          <h4>Impacto en el desarrollo:</h4>
          <ul>
            <li>Aceleración del ciclo de desarrollo.</li>
            <li>Reducción de tareas repetitivas y código boilerplate.</li>
            <li>Nuevos paradigmas de pair programming con IA.</li>
            <li>Democratización del desarrollo para no expertos.</li>
          </ul>
        </div>
        <div class="modal-footer">
          <button class="btn" onclick="closeAllModals()">Cerrar</button>
        </div>
      </div>
    </div>

    <div class="modal-overlay" id="modal-blog-5-overlay">
      <div class="modal">
        <div class="modal-header">
          <h3>Web3 y Contratos Inteligentes en Aplicaciones Reales</h3>
        </div>
        <div class="modal-body">
          <img src="https://images.unsplash.com/photo-1620712943543-bcc4688e7485?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80" alt="" style="width:100%; border-radius:10px; margin-bottom:1rem;">
          <p>Web3 está llevando la descentralización al siguiente nivel, creando aplicaciones que funcionan en blockchains como Ethereum, Solana y otras redes. Los contratos inteligentes permiten automatizar procesos de negocio sin intermediarios, garantizando transparencia y seguridad.</p>
          <h4>Casos de uso:</h4>
          <ul>
            <li>DeFi (Finanzas descentralizadas).</li>
            <li>Tokenización de activos físicos y digitales.</li>
            <li>Gobernanza descentralizada para organizaciones (DAOs).</li>
            <li>Verificación de identidad y credenciales.</li>
          </ul>
        </div>
        <div class="modal-footer">
          <button class="btn" onclick="closeAllModals()">Cerrar</button>
        </div>
      </div>
    </div>

    <div class="modal-overlay" id="modal-blog-6-overlay">
      <div class="modal">
        <div class="modal-header">
          <h3>Edge Computing: El Futuro de la Latencia Ultra Baja</h3>
        </div>
        <div class="modal-body">
          <img src="https://images.unsplash.com/photo-1518770660439-4636190af475?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80" alt="" style="width:100%; border-radius:10px; margin-bottom:1rem;">
          <p>Edge computing lleva el procesamiento de datos más cerca del usuario final, reduciendo la latencia y mejorando la experiencia en aplicaciones que requieren respuestas en tiempo real. Esta arquitectura distribuida es clave para IoT, AR/VR y aplicaciones móviles de alto rendimiento.</p>
          <h4>Ventajas principales:</h4>
          <ul>
            <li>Reducción drástica de la latencia.</li>
            <li>Menor consumo de ancho de banda.</li>
            <li>Mayor privacidad al procesar datos localmente.</li>
            <li>Resiliencia frente a problemas de conectividad.</li>
          </ul>
        </div>
        <div class="modal-footer">
          <button class="btn" onclick="closeAllModals()">Cerrar</button>
        </div>
      </div>
    </div>

    <div class="modal-overlay" id="modal-blog-7-overlay">
      <div class="modal">
        <div class="modal-header">
          <h3>Quantum Computing: ¿Está Listo para el Mainstream?</h3>
        </div>
        <div class="modal-body">
          <img src="https://images.unsplash.com/photo-1563986768609-322da13575f3?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80" alt="" style="width:100%; border-radius:10px; margin-bottom:1rem;">
          <p>La computación cuántica está avanzando rápidamente, ofreciendo posibilidades para resolver problemas que serían imposibles para ordenadores clásicos. Sin embargo, aún existen desafíos significativos antes de que veamos aplicaciones cuánticas generalizadas.</p>
          <h4>Estado actual y perspectivas:</h4>
          <ul>
            <li>Avances en la reducción de errores cuánticos.</li>
            <li>Simulaciones en química y ciencia de materiales.</li>
            <li>Impacto potencial en criptografía y seguridad.</li>
            <li>Acceso a computación cuántica a través de APIs en la nube.</li>
          </ul>
        </div>
        <div class="modal-footer">
          <button class="btn" onclick="closeAllModals()">Cerrar</button>
        </div>
      </div>
    </div>

    <div class="modal-overlay" id="modal-blog-8-overlay">
      <div class="modal">
        <div class="modal-header">
          <h3>Ciberseguridad en la Era de la IA</h3>
        </div>
        <div class="modal-body">
          <img src="assets/images/Ciberseguridad.png" alt="Ciberseguridad en la Era de la IA" style="width:100%; border-radius:10px; margin-bottom:1rem;">
          <p>La inteligencia artificial está cambiando el panorama de la ciberseguridad, tanto para atacantes como para defensores. Los sistemas de seguridad basados en IA pueden detectar amenazas en tiempo real, pero también surgen nuevos vectores de ataque como el adversarial machine learning.</p>
          <h4>Desafíos emergentes:</h4>
          <ul>
            <li>Detección de deepfakes y contenido sintético malicioso.</li>
            <li>Ataques automatizados a gran escala.</li>
            <li>Protección de modelos de IA contra manipulación.</li>
            <li>Balance entre privacidad y análisis de comportamiento.</li>
          </ul>
        </div>
        <div class="modal-footer">
          <button class="btn" onclick="closeAllModals()">Cerrar</button>
        </div>
      </div>
    </div>

    <div class="modal-overlay" id="modal-blog-9-overlay">
      <div class="modal">
        <div class="modal-header">
          <h3>Low-Code/No-Code: ¿Amenaza o Oportunidad para los Desarrolladores?</h3>
        </div>
        <div class="modal-body">
          <img src="https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80" alt="" style="width:100%; border-radius:10px; margin-bottom:1rem;">
          <p>Las plataformas low-code y no-code están democratizando el desarrollo de software, permitiendo que personas sin formación técnica creen aplicaciones. Lejos de ser una amenaza, representan una oportunidad para que los desarrolladores profesionales se enfoquen en problemas más complejos.</p>
          <h4>Tendencias y oportunidades:</h4>
          <ul>
            <li>Integración de soluciones low-code con sistemas empresariales.</li>
            <li>Extensibilidad mediante plugins y componentes personalizados.</li>
            <li>Gobierno y seguridad en el desarrollo citizen developer.</li>
            <li>Evolución hacia roles de arquitectura y diseño de plataformas.</li>
          </ul>
        </div>
        <div class="modal-footer">
          <button class="btn" onclick="closeAllModals()">Cerrar</button>
        </div>
      </div>
    </div>

    <div class="modal-overlay" id="modal-blog-10-overlay">
      <div class="modal">
        <div class="modal-header">
          <h3>DevOps y GitOps: La Evolución de la Entrega Continua</h3>
        </div>
        <div class="modal-body">
          <img src="https://images.unsplash.com/photo-1519389950473-47ba0277781c?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80" alt="" style="width:100%; border-radius:10px; margin-bottom:1rem;">
          <p>El paradigma DevOps continúa evolucionando hacia GitOps, donde Git se convierte en la fuente única de verdad para toda la infraestructura y configuración. Este enfoque declarativo mejora la auditabilidad, la reproducibilidad y la velocidad de recuperación ante fallos.</p>
          <h4>Principios fundamentales:</h4>
          <ul>
            <li>Infraestructura como código (IaC) y gestión de configuración.</li>
            <li>Operadores y controladores para reconciliación automática.</li>
            <li>Pull vs. push: nuevo modelo de despliegue.</li>
            <li>Observabilidad integrada en el ciclo de vida completo.</li>
          </ul>
        </div>
        <div class="modal-footer">
          <button class="btn" onclick="closeAllModals()">Cerrar</button>
        </div>
      </div>
    </div>

    <div class="modal-overlay" id="modal-blog-11-overlay">
      <div class="modal">
        <div class="modal-header">
          <h3>Realidad Aumentada en Aplicaciones Comerciales</h3>
        </div>
        <div class="modal-body">
          <img src="assets/images/RealidadAumentada.png" alt="Realidad Aumentada en Aplicaciones Comerciales" style="width:100%; border-radius:10px; margin-bottom:1rem;">
          <p>La realidad aumentada (AR) está madurando más allá de aplicaciones de entretenimiento, encontrando casos de uso valiosos en retail, educación, manufactura y atención médica. Las mejoras en hardware y APIs como ARKit y ARCore facilitan la creación de experiencias AR inmersivas.</p>
          <h4>Aplicaciones prácticas:</h4>
          <ul>
            <li>Visualización de productos en entornos reales antes de comprar.</li>
            <li>Formación y asistencia técnica con instrucciones superpuestas.</li>
            <li>Navegación interior mejorada en espacios complejos.</li>
            <li>Herramientas colaborativas para diseño y planificación espacial.</li>
          </ul>
        </div>
        <div class="modal-footer">
          <button class="btn" onclick="closeAllModals()">Cerrar</button>
        </div>
      </div>
    </div>

    <div class="modal-overlay" id="modal-blog-12-overlay">
      <div class="modal">
        <div class="modal-header">
          <h3>Arquitectura de Microservicios vs. Monolitos Modernos</h3>
        </div>
        <div class="modal-body">
          <img src="assets/images/Arquitectura.png" alt="Arquitectura de Microservicios vs. Monolitos Modernos" style="width:100%; border-radius:10px; margin-bottom:1rem;">
          <p>El péndulo arquitectónico está encontrando un equilibrio entre microservicios puros y monolitos. Mientras los microservicios ofrecen escalabilidad y despliegue independiente, los "monolitos modulares" están ganando popularidad por su menor complejidad operativa y mejor rendimiento inicial.</p>
          <h4>Factores de decisión:</h4>
          <ul>
            <li>Tamaño y madurez del equipo de desarrollo.</li>
            <li>Complejidad de dominio y límites de contexto.</li>
            <li>Requisitos de escalabilidad diferenciada.</li>
            <li>Costos operativos y overhead de comunicación.</li>
            <li>Capacidad para gestionar la complejidad distribuida.</li>
          </ul>
        </div>
        <div class="modal-footer">
          <button class="btn" onclick="closeAllModals()">Cerrar</button>
        </div>
      </div>
    </div>
  `;

  modalsContainer.innerHTML = modalsHTML;
}
