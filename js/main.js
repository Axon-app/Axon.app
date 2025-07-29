const header = document.getElementById('header');
const hamburger = document.getElementById('hamburger');
const mobileMenu = document.getElementById('mobile-menu');
const menuOverlay = document.getElementById('menu-overlay');

// Effect on the menu when scrolling
window.addEventListener('scroll', () => {
  if (window.scrollY > 50) {
    header.classList.add('scrolled');
  } else {
    header.classList.remove('scrolled');
  }
});

// Hamburger menu functionality
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

// Scroll animations
const faders = document.querySelectorAll('.fade-in');
const appearOptions = { threshold: 0.1, rootMargin: "0px 0px -100px 0px" };
const appearOnScroll = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      appearOnScroll.unobserve(entry.target); 
    }
  });
}, appearOptions);

faders.forEach(fader => {
  if (fader) appearOnScroll.observe(fader);
});

// Scroll to top button
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

// Smooth scrolling for navigation links
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

// Modal functions
function openModal(id, event) {
  console.log('Abriendo modal:', id);
  // If event parameter is provided, prevent default behavior
  if (event) {
    event.preventDefault();
    event.stopPropagation(); // Stop event propagation to prevent other handlers
  }
  
  const modal = document.getElementById(id);
  if (modal) {
    modal.classList.add('active');
    document.body.style.overflow = 'hidden';
    
    // Log for debugging
    console.log('Modal activado:', id);
  } else {
    console.error('Modal con ID no encontrado:', id);
    
    // Forzar la carga de modales si no están disponibles
    loadModalsContent();
    
    // Intentar nuevamente después de cargar los modales
    setTimeout(() => {
      const retryModal = document.getElementById(id);
      if (retryModal) {
        retryModal.classList.add('active');
        document.body.style.overflow = 'hidden';
        console.log('Modal activado en segundo intento:', id);
      } else {
        console.error('Modal no encontrado incluso después de cargar:', id);
      }
    }, 100);
  }
}

function closeAllModals() {
  console.log('Cerrando todos los modales');
  const modals = document.querySelectorAll('.modal-overlay');
  modals.forEach(modal => {
    modal.classList.remove('active');
  });
  document.body.style.overflow = 'auto';
}

// Close modal when clicking outside and set up project buttons
document.addEventListener('DOMContentLoaded', function() {
  // Load modals content after DOM is ready
  loadModalsContent();
  
  // Add event listeners to close modals when clicking outside
  function setupModalListeners() {
    document.querySelectorAll('.modal-overlay').forEach(modal => {
      // Remove any existing listeners to prevent duplicates
      const newModal = modal.cloneNode(true);
      modal.parentNode.replaceChild(newModal, modal);
      
      // Add new click listener
      newModal.addEventListener('click', function(e) {
        if (e.target === this) {
          closeAllModals();
        }
      });
    });
    
    // Setup enhanced click handlers for project buttons
    document.querySelectorAll('.project-btn').forEach(btn => {
      btn.addEventListener('click', function(e) {
        e.preventDefault();
        e.stopPropagation();
        
        const modalId = this.getAttribute('data-modal');
        console.log('Project button clicked, opening modal:', modalId);
        
        if (modalId) {
          const modal = document.getElementById(modalId);
          if (modal) {
            modal.classList.add('active');
            document.body.style.overflow = 'hidden';
          } else {
            console.error('Modal not found, forcing reload');
            loadModalsContent();
            setTimeout(() => {
              const retryModal = document.getElementById(modalId);
              if (retryModal) {
                retryModal.classList.add('active');
                document.body.style.overflow = 'hidden';
              }
            }, 100);
          }
        }
      });
    });
    
    // Also set up listeners for all portfolio buttons to ensure they work
    document.querySelectorAll('.portfolio-overlay .btn-small').forEach(button => {
      button.style.pointerEvents = 'auto';
      button.style.cursor = 'pointer';
    });
  }
  
  // Set up listeners initially
  setupModalListeners();
  
  // Also set up again after a short delay to ensure all elements are ready
  setTimeout(setupModalListeners, 500);
});

// Custom message box function (replacement for alert)
function showCustomMessage(message) {
  const messageBox = document.createElement('div');
  messageBox.style.cssText = `
    position: fixed;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    background-color: #4361ee;
    color: white;
    padding: 20px 30px;
    border-radius: 10px;
    box-shadow: 0 5px 15px rgba(0,0,0,0.2);
    z-index: 9999;
    font-family: 'Inter', sans-serif;
    font-size: 1.1rem;
    text-align: center;
    opacity: 0;
    transition: opacity 0.3s ease-in-out;
  `;
  messageBox.textContent = message;
  document.body.appendChild(messageBox);

  setTimeout(() => {
    messageBox.style.opacity = '1';
  }, 10); // Small delay to trigger transition

  setTimeout(() => {
    messageBox.style.opacity = '0';
    messageBox.addEventListener('transitionend', () => {
      messageBox.remove();
    });
  }, 3000); // Message disappears after 3 seconds
}

// Social media button functionality
const btnSocialMedia = document.getElementById('btn-social-media');
const socialMediaContainer = document.getElementById('social-media-floating-container');

if (btnSocialMedia && socialMediaContainer) {
    btnSocialMedia.addEventListener('click', () => {
        socialMediaContainer.classList.toggle('active');
    });
}

// Form Validation Logic
document.addEventListener('DOMContentLoaded', function() {
  const contactForm = document.getElementById('main-contact-form');
  const formGroups = contactForm ? contactForm.querySelectorAll('.form-group') : [];

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
              // Basic check for time format HH:MM
              return /^(?:2[0-3]|[01]?[0-9]):(?:[0-5]?[0-9])$/.test(value);
          },
          message: 'Formato de hora inválido (HH:MM).'
      },
      select: {
          validate: (value) => value !== '',
          message: 'Debes seleccionar una opción.'
      },
      textarea: {
          validate: (value) => value.trim().length > 10, // Minimum 10 characters
          message: 'Describe tu proyecto (mínimo 10 caracteres).'
      },
      'optional-text': {
          validate: (value) => true, // Always valid, but can be empty
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

      if (isValid) {
          parentGroup.classList.remove('invalid');
          parentGroup.classList.add('valid');
          messageSpan.textContent = '';
          validationIcon.style.opacity = '1';
          validationIcon.classList.remove('fa-times-circle'); // Remove potential error icon
          validationIcon.classList.add('fa-check-circle'); // Add checkmark icon
          validationIcon.style.color = '#27ae60'; // Green check
      } else {
          parentGroup.classList.remove('valid');
          parentGroup.classList.add('invalid');
          messageSpan.textContent = errorMessage;
          validationIcon.style.opacity = '1';
          validationIcon.classList.remove('fa-check-circle'); // Remove potential checkmark icon
          validationIcon.classList.add('fa-times-circle'); // Add error icon
          validationIcon.style.color = '#e74c3c'; // Red X
      }
      
      // If the field is not required and empty, it's considered valid for the purpose of the icon
      if (!inputElement.hasAttribute('required') && value === '') {
          parentGroup.classList.remove('invalid');
          parentGroup.classList.remove('valid');
          messageSpan.textContent = '';
          validationIcon.style.opacity = '0'; // Hide icon if optional and empty
          validationIcon.classList.remove('fa-check-circle', 'fa-times-circle'); // Ensure no icon class remains
      }
  }

  formGroups.forEach(group => {
      const input = group.querySelector('input, select, textarea');
      if (input) {
          input.addEventListener('input', () => validateField(input));
          input.addEventListener('change', () => validateField(input)); // For select and date/time
          input.addEventListener('blur', () => validateField(input)); // Validate on blur
      }
  });

  if (contactForm) {
      contactForm.addEventListener('submit', function(e) {
          e.preventDefault();
          let formIsValid = true;
          formGroups.forEach(group => {
              const input = group.querySelector('input, select, textarea');
              if (input) {
                  validateField(input); // Validate all fields on submit
                  if (group.classList.contains('invalid')) {
                      formIsValid = false;
                  }
              }
          });

          if (formIsValid) {
              showCustomMessage('¡Gracias por tu mensaje! Te responderemos pronto.');
              this.reset();
              closeAllModals(); // Close the modal after successful submission
              // Reset validation states
              formGroups.forEach(group => {
                  group.classList.remove('valid', 'invalid');
                  group.querySelector('.validation-message').textContent = '';
                  group.querySelector('.validation-icon').style.opacity = '0';
                  group.querySelector('.validation-icon').classList.remove('fa-check-circle', 'fa-times-circle');
              });
          } else {
              showCustomMessage('Por favor, corrige los errores en el formulario.');
          }
      });
  }
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
    let mouse = new THREE.Vector2(); // Vector para almacenar la posición del ratón
    let scrollPercent = 0; // Porcentaje de desplazamiento de la página

    const canvas = document.getElementById('bg-canvas');
    if (!canvas) {
        console.error("No se encontró el elemento canvas con ID 'bg-canvas'.");
        return;
    }
    
    // 1. Configuración de la Escena
    scene = new THREE.Scene();
    clock = new THREE.Clock(); // Para controlar el tiempo en la animación
    
    // 2. Configuración de la Cámara
    // PerspectiveCamera(fov, aspect, near, far)
    // fov: Campo de visión vertical
    // aspect: Relación de aspecto (ancho/alto de la ventana)
    // near: Plano de recorte cercano
    // far: Plano de recorte lejano
    camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 2000);
    camera.position.z = 5; // La cámara comienza un poco adelante en el "río"
    
    // 3. Configuración del Renderer
    renderer = new THREE.WebGLRenderer({ canvas: canvas, antialias: true }); // antialias para bordes suaves
    renderer.setPixelRatio(window.devicePixelRatio); // Ajusta la resolución para pantallas de alta densidad
    renderer.setSize(window.innerWidth, window.innerHeight); // Establece el tamaño del renderizador al tamaño de la ventana

    // 4. Post-procesamiento para el Efecto de Resplandor (Bloom)
    // RenderPass: Renderiza la escena en un buffer
    const renderScene = new THREE.RenderPass(scene, camera);
    // UnrealBloomPass: Aplica un efecto de resplandor a los objetos brillantes
    // (resolución, fuerza, radio, umbral)
    const bloomPass = new THREE.UnrealBloomPass(new THREE.Vector2(window.innerWidth, window.innerHeight), 1.5, 0.4, 0.85);
    bloomPass.threshold = 0; // Umbral de luminosidad para aplicar el resplandor
    bloomPass.strength = 1.5; // Intensidad del resplandor
    bloomPass.radius = 0.5; // Radio del resplandor
    
    // EffectComposer: Encadena los pases de post-procesamiento
    composer = new THREE.EffectComposer(renderer);
    composer.addPass(renderScene); // Primero renderiza la escena
    composer.addPass(bloomPass); // Luego aplica el efecto de resplandor

    // 5. Creación de las Partículas del Río Cósmico
    const particleCount = 20000; // Número total de partículas
    const positions = new Float32Array(particleCount * 3); // Array para las coordenadas x, y, z de cada partícula
    const colors = new Float32Array(particleCount * 3); // Array para los componentes R, G, B de cada partícula
    
    // Obtener los colores definidos en las variables CSS
    const color1 = new THREE.Color(getComputedStyle(document.documentElement).getPropertyValue('--color1').trim());
    const color2 = new THREE.Color(getComputedStyle(document.documentElement).getPropertyValue('--color2').trim());
    const color3 = new THREE.Color(getComputedStyle(document.documentElement).getPropertyValue('--color3').trim());

    const riverLength = 4000; // La "longitud" simulada de nuestro río en unidades 3D

    // Generar posiciones y colores para cada partícula
    for (let i = 0; i < particleCount; i++) {
        const i3 = i * 3; // Índice para acceder a las coordenadas (x, y, z)
        
        // Posición de la partícula
        // z: Distribuir a lo largo del eje Z, desde el fondo del río hasta cerca de la cámara
        const z = THREE.MathUtils.randFloat(-riverLength, 0); 
        const angle = Math.random() * Math.PI * 2; // Ángulo aleatorio para la distribución circular
        // radius: Radio aleatorio, con más partículas cerca del centro para un efecto de "río"
        const radius = 20 + Math.random() * 80 * Math.pow(Math.random(), 2); 

        positions[i3] = Math.cos(angle) * radius; // Coordenada X
        positions[i3 + 1] = Math.sin(angle) * radius; // Coordenada Y
        positions[i3 + 2] = z; // Coordenada Z

        // Color Degradado
        // percent: Normaliza la posición Z de la partícula (0 en el fondo, 1 cerca de la cámara)
        const percent = (z / -riverLength); 
        let color;
        // Interpolar colores para crear un degradado a lo largo del río
        if (percent < 0.5) {
            color = color1.clone().lerp(color2, percent * 2);
        } else {
            color = color2.clone().lerp(color3, (percent - 0.5) * 2);
        }

        colors[i3] = color.r; // Componente rojo
        colors[i3 + 1] = color.g; // Componente verde
        colors[i3 + 2] = color.b; // Componente azul
    }

    const particleGeometry = new THREE.BufferGeometry();
    // Asignar los arrays de posiciones y colores a la geometría de las partículas
    particleGeometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    particleGeometry.setAttribute('color', new THREE.BufferAttribute(colors, 3));

    const particleMaterial = new THREE.PointsMaterial({
        size: 1.5, // Tamaño de cada partícula
        vertexColors: true, // Usar los colores definidos por vértice
        blending: THREE.AdditiveBlending, // Modo de mezcla para un efecto de brillo
        transparent: true, // Permite la transparencia
        opacity: 0.8, // Opacidad de las partículas
        sizeAttenuation: true // El tamaño de las partículas disminuye con la distancia
    });

    particles = new THREE.Points(particleGeometry, particleMaterial); // Crear el objeto de puntos 3D
    scene.add(particles); // Añadir las partículas a la escena

    // 6. Manejo de Eventos
    /**
     * Actualiza el porcentaje de desplazamiento de la página.
     */
    function onScroll() {
        const scrollableHeight = document.documentElement.scrollHeight - window.innerHeight;
        // Limitar el scrollPercent a un máximo de 0.7 para mantener la animación visible incluso en el footer
        scrollPercent = Math.min(0.7, window.scrollY / scrollableHeight); // Calcula el porcentaje de scroll con límite
    }
    window.addEventListener('scroll', onScroll, false); // Escucha el evento de scroll
    
    /**
     * Actualiza la posición del ratón en coordenadas normalizadas (-1 a 1).
     * @param {MouseEvent} event - El evento del ratón.
     */
    function onMouseMove(event) {
        mouse.x = (event.clientX / window.innerWidth) * 2 - 1; // Normaliza la posición X del ratón
        mouse.y = -(event.clientY / window.innerHeight) * 2 + 1; // Normaliza la posición Y del ratón (invertida para Three.js)
    }
    window.addEventListener('mousemove', onMouseMove, false); // Escucha el evento de movimiento del ratón

    /**
     * Ajusta el tamaño del renderizador y la cámara cuando la ventana cambia de tamaño.
     */
    function onWindowResize() {
        camera.aspect = window.innerWidth / window.innerHeight; // Actualiza la relación de aspecto de la cámara
        camera.updateProjectionMatrix(); // Recalcula la matriz de proyección de la cámara
        renderer.setSize(window.innerWidth, window.innerHeight); // Ajusta el tamaño del renderizador
        composer.setSize(window.innerWidth, window.innerHeight); // Ajusta el tamaño del compositor de efectos
    }
    window.addEventListener('resize', onWindowResize, false); // Escucha el evento de redimensionamiento de la ventana
    
    // 7. Bucle de Animación
    /**
     * Bucle principal de animación. Se llama repetidamente para actualizar la escena.
     */
    function animate() {
        requestAnimationFrame(animate); // Solicita el siguiente frame de animación
        const delta = clock.getDelta(); // Tiempo transcurrido desde el último frame
        
        // Mover las partículas para un efecto de "flujo"
        // Esto crea la ilusión de que las partículas se mueven hacia el usuario
        particles.position.z += delta * 20;

        // Reciclar partículas: Si una partícula se mueve demasiado lejos, la teletransportamos
        // al final del río para crear un flujo infinito.
        const positionsArray = particles.geometry.attributes.position.array;
        const currentCameraZ = camera.position.z;
        const particleSpeed = 20; // Velocidad de las partículas (debe coincidir con el movimiento de particles.position.z)

        // Umbral y offset para el reciclaje de partículas
        const resetThreshold = 5; // Qué tan lejos de la cámara antes de reiniciar
        const resetOffset = 10;  // Qué tan atrás de la cámara se reinicia la partícula

        for (let i = 0; i < particleCount; i++) {
            const i3 = i * 3;
            // Mover la partícula hacia adelante
            positionsArray[i3 + 2] += delta * particleSpeed;

            // Si la partícula se mueve más allá de un umbral relativo a la cámara, la reiniciamos
            // Reiniciamos su posición Z al final del río, relativo a la cámara
            // Añadimos un poco de aleatoriedad para evitar un patrón visible
            if (positionsArray[i3 + 2] > currentCameraZ + resetThreshold) {
                positionsArray[i3 + 2] = currentCameraZ - riverLength - resetOffset + (Math.random() * resetOffset * 2);
            }
        }
        // Marcamos que las posiciones de la geometría necesitan ser actualizadas en la GPU
        particles.geometry.attributes.position.needsUpdate = true;


        // Mover la cámara basado en el scroll
        // targetZ: La posición Z deseada de la cámara basada en el porcentaje de scroll
        // Limitamos el movimiento para mantener siempre visible la animación
        const minCameraZ = 5; // Posición inicial de la cámara
        const maxScrollEffect = riverLength * 0.7; // Limitar cuánto afecta el scroll
        const targetZ = minCameraZ - scrollPercent * maxScrollEffect;
        // Lerp (interpolación lineal): Suaviza el movimiento de la cámara hacia el objetivo
        camera.position.z = THREE.MathUtils.lerp(camera.position.z, targetZ, 0.05);

        // Mover la vista de la cámara con el ratón
        // Ajusta la rotación de la cámara para simular una perspectiva con el movimiento del ratón
        camera.rotation.y = THREE.MathUtils.lerp(camera.rotation.y, (-mouse.x * Math.PI) / 20, 0.05);
        camera.rotation.x = THREE.MathUtils.lerp(camera.rotation.x, (mouse.y * Math.PI) / 20, 0.05);
        
        // Ajustar la fuerza del resplandor (bloom) con el scroll
        // Aumenta la fuerza del resplandor a medida que el usuario se desplaza, hasta un máximo
        // Incluso en el footer, mantenemos un valor adecuado para que se siga viendo bien
        const minBloomStrength = 1.5;
        const maxBloomStrength = 3.0; // Reducido ligeramente para mantener visibilidad consistente
        bloomPass.strength = THREE.MathUtils.lerp(minBloomStrength, maxBloomStrength, scrollPercent);


        composer.render(); // Renderiza la escena con los efectos de post-procesamiento
    }
    
    animate(); // Inicia el bucle de animación
}

// Inicializa Three.js cuando la ventana se haya cargado completamente
window.onload = function() {
  // Asegura que Three.js se haya cargado antes de intentar inicializar la animación
  if (typeof THREE === 'undefined') {
      console.error("Three.js no se ha cargado.");
  } else {
      initCosmicRiver();
  }
};

// Function to load modals content
function loadModalsContent() {
  const modalsContainer = document.getElementById('modals-container');
  if (!modalsContainer) return;

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
          <form class="contact-form" id="main-contact-form">
            <div class="form-group">
              <label for="nombre">Nombre:</label>
              <input type="text" id="nombre" placeholder="Tu nombre" required data-validation-type="text">
              <span class="validation-message"></span>
              <i class="fas fa-check-circle validation-icon"></i>
            </div>
            <div class="form-group">
              <label for="apellido">Apellido:</label>
              <input type="text" id="apellido" placeholder="Tu apellido" required data-validation-type="text">
              <span class="validation-message"></span>
              <i class="fas fa-check-circle validation-icon"></i>
            </div>
            <div class="form-group">
              <label for="email">Correo Electrónico:</label>
              <input type="email" id="email" placeholder="tu.email@ejemplo.com" required data-validation-type="email">
              <span class="validation-message"></span>
              <i class="fas fa-check-circle validation-icon"></i>
            </div>
            <div class="form-group">
              <label for="tipo-cliente">Tipo de Cliente:</label>
              <select id="tipo-cliente" required data-validation-type="select">
                <option value="">Selecciona una opción</option>
                <option value="empresa">Empresa</option>
                <option value="particular">Particular</option>
              </select>
              <span class="validation-message"></span>
              <i class="fas fa-check-circle validation-icon"></i>
            </div>
            <div class="form-group">
              <label for="telefono">Número de Contacto:</label>
              <input type="tel" id="telefono" placeholder="+XX XXX XXX XXXX" required data-validation-type="phone">
              <span class="validation-message"></span>
              <i class="fas fa-check-circle validation-icon"></i>
            </div>
            <div class="form-group">
              <label for="fecha-contacto">Fecha Preferida de Contacto:</label>
              <input type="date" id="fecha-contacto" required data-validation-type="date">
              <span class="validation-message"></span>
              <i class="fas fa-check-circle validation-icon"></i>
            </div>
            <div class="form-group">
              <label for="hora-contacto">Hora Preferida de Contacto:</label>
              <input type="time" id="hora-contacto" required data-validation-type="time">
              <span class="validation-message"></span>
              <i class="fas fa-check-circle validation-icon"></i>
            </div>
            <div class="form-group">
              <label for="direccion">Dirección:</label>
              <input type="text" id="direccion" placeholder="Tu dirección (opcional)" data-validation-type="optional-text">
              <span class="validation-message"></span>
              <i class="fas fa-check-circle validation-icon"></i>
            </div>
            <div class="form-group">
              <label for="tipo-proyecto">Tipo de Proyecto Requerido:</label>
              <select id="tipo-proyecto" required data-validation-type="select">
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
            <div class="form-group">
              <label for="mensaje">Cuéntanos sobre tu proyecto:</label>
              <textarea id="mensaje" placeholder="Describe tu proyecto..." required data-validation-type="textarea"></textarea>
              <span class="validation-message"></span>
              <i class="fas fa-check-circle validation-icon"></i>
            </div>

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
          <img src="https://placehold.co/600x400/4361ee/ffffff?text=FinTrack+Pro" alt="" style="width:100%; border-radius:10px; margin-bottom:1rem;">
          <p>Desarrollamos una app de finanzas personales con seguimiento de gastos, metas de ahorro y reportes automáticos.</p>
          <h4>Tecnologías usadas</h4>
          <ul>
            <li>React Native</li>
            <li>Firebase</li>
            <li>Node.js</li>
            <li>Figma</li>
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
          <h3>EcoStore</h3>
        </div>
        <div class="modal-body">
          <img src="https://images.unsplash.com/photo-1555423835-04428314e367?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80" alt="" style="width:100%; border-radius:10px; margin-bottom:1rem;">
          <p>Plataforma e-commerce para productos ecológicos con integración de pagos y gestión de inventario.</p>
          <h4>Tecnologías usadas</h4>
          <ul>
            <li>Next.js</li>
            <li>Stripe</li>
            <li>MongoDB</li>
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
          <h3>WorkSmart</h3>
        </div>
        <div class="modal-body">
          <img src="https://images.unsplash.com/photo-1545239351-cefa43af60f3?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80" alt="" style="width:100%; border-radius:10px; margin-bottom:1rem;">
          <p>Software de gestión de proyectos y equipos con seguimiento de tiempo, tareas y colaboración en tiempo real.</p>
          <h4>Tecnologías usadas</h4>
          <ul>
            <li>Vue.js</li>
            <li>Socket.io</li>
            <li>Express</li>
            <li>PostgreSQL</li>
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
          <h3>MediConnect</h3>
        </div>
        <div class="modal-body">
          <img src="https://images.unsplash.com/photo-1576091160550-2173dba999ef?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80" alt="" style="width:100%; border-radius:10px; margin-bottom:1rem;">
          <p>Aplicación de telemedicina para consultas virtuales, agendamiento y seguimiento médico.</p>
          <h4>Tecnologías usadas</h4>
          <ul>
            <li>Flutter</li>
            <li>WebRTC</li>
            <li>Go</li>
            <li>PostgreSQL</li>
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
          <h3>LearnHub</h3>
        </div>
        <div class="modal-body">
          <img src="https://images.unsplash.com/photo-1509475826633-fed577a2c71b?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80" alt="" style="width:100%; border-radius:10px; margin-bottom:1rem;">
          <p>Plataforma de educación online con cursos interactivos, evaluaciones y certificados digitales.</p>
          <h4>Tecnologías usadas</h4>
          <ul>
            <li>React</li>
            <li>Django</li>
            <li>Redis</li>
            <li>FFmpeg</li>
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
          <h3>SmartHome</h3>
        </div>
        <div class="modal-body">
          <img src="https://images.unsplash.com/photo-1518770660439-4636190af475?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80" alt="" style="width:100%; border-radius:10px; margin-bottom:1rem;">
          <p>Sistema IoT para hogares inteligentes con control de dispositivos, automatización y análisis de consumo.</p>
          <h4>Tecnologías usadas</h4>
          <ul>
            <li>MQTT</li>
            <li>Node.js</li>
            <li>React Native</li>
            <li>InfluxDB</li>
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
          <h3>TravelBuddy</h3>
        </div>
        <div class="modal-body">
          <img src="https://images.unsplash.com/photo-1503457574462-bd27054394c1?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80" alt="" style="width:100%; border-radius:10px; margin-bottom:1rem;">
          <p>Aplicación de viajes con planificación de itinerarios, recomendaciones personalizadas y mapas offline.</p>
          <h4>Tecnologías usadas</h4>
          <ul>
            <li>Kotlin</li>
            <li>MapBox</li>
            <li>Spring Boot</li>
            <li>Neo4j</li>
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
          <h3>FoodDelivery</h3>
        </div>
        <div class="modal-body">
          <img src="https://images.unsplash.com/photo-1576458088548-035a13a11b8e?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80" alt="" style="width:100%; border-radius:10px; margin-bottom:1rem;">
          <p>Plataforma de delivery con seguimiento en tiempo real, pagos integrados y sistema de reseñas.</p>
          <h4>Tecnologías usadas</h4>
          <ul>
            <li>React Native</li>
            <li>GraphQL</li>
            <li>Elixir</li>
            <li>PostgreSQL</li>
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
          <h3>AIAnalytics</h3>
        </div>
        <div class="modal-body">
          <img src="https://images.unsplash.com/photo-1518186285589-2f7649de83e0?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80" alt="" style="width:100%; border-radius:10px; margin-bottom:1rem;">
          <p>Dashboard de análisis de datos con IA para predicciones de mercado y detección de patrones.</p>
          <h4>Tecnologías usadas</h4>
          <ul>
            <li>Python</li>
            <li>TensorFlow</li>
            <li>D3.js</li>
            <li>FastAPI</li>
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
          <h3>FitLife</h3>
        </div>
        <div class="modal-body">
          <img src="https://images.unsplash.com/photo-1534258936925-c58bed479fcb?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80" alt="" style="width:100%; border-radius:10px; margin-bottom:1rem;">
          <p>App de fitness con planes personalizados, seguimiento de progreso y comunidad de usuarios.</p>
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
          <h3>LegalTech</h3>
        </div>
        <div class="modal-body">
          <img src="https://images.unsplash.com/photo-1589994965851-a1f84c3bbd0a?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80" alt="" style="width:100%; border-radius:10px; margin-bottom:1rem;">
          <p>Plataforma legal para generación de contratos, firma digital y gestión documental.</p>
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
          <h3>VRExperience</h3>
        </div>
        <div class="modal-body">
          <img src="https://images.unsplash.com/photo-1622979135225-d2ba269cf1ac?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80" alt="" style="width:100%; border-radius:10px; margin-bottom:1rem;">
          <p>Experiencias inmersivas en realidad virtual para entrenamiento corporativo y educación.</p>
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
          <img src="https://placehold.co/600x400/4361ee/ffffff?text=Elegir+Stack+Tecnologico" alt="" style="width:100%; border-radius:10px; margin-bottom:1rem;">
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
          <img src="https://placehold.co/600x400/4cc9f0/ffffff?text=IA+Generativa+Software" alt="" style="width:100%; border-radius:10px; margin-bottom:1rem;">
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
          <img src="https://placehold.co/600x400/8d5bff/ffffff?text=Ciberseguridad+IA" alt="" style="width:100%; border-radius:10px; margin-bottom:1rem;">
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
          <img src="https://images.unsplash.com/photo-1522542550221-31fd19575a2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80" alt="" style="width:100%; border-radius:10px; margin-bottom:1rem;">
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
          <img src="https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80" alt="" style="width:100%; border-radius:10px; margin-bottom:1rem;">
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
