// Configuración de EmailJS
(function() {
    // Inicializar EmailJS con tu clave pública
    emailjs.init("YOUR_PUBLIC_KEY"); // Reemplaza esto con tu clave pública de EmailJS
    
    // IDs de servicio y plantilla
    window.emailjsConfig = {
        serviceID: "YOUR_SERVICE_ID", // Reemplaza con tu ID de servicio de EmailJS
        templateID: "YOUR_TEMPLATE_ID", // Reemplaza con tu ID de plantilla de EmailJS
        recipientEmail: "axonapp.info@gmail.com" // Email del destinatario
    };
})();
