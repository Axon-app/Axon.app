import React from 'react';

// Componente del Logo de Axon
export const AxonLogo = () => {
  return (
    <div className="flex items-center">
      <span className="text-2xl font-orbitron font-bold tracking-widest text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-400">
        Axon
      </span>
      <span className="text-lg font-rajdhani font-semibold text-white/80">
        .app
      </span>
    </div>
  );
};

// Componente de animación de fondo
export const AnimatedBackground = () => {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      <div className="absolute top-10 left-10 w-32 h-32 bg-blue-500/20 rounded-full blur-2xl animate-pulse"></div>
      <div className="absolute bottom-20 right-20 w-40 h-40 bg-purple-500/20 rounded-full blur-2xl animate-pulse" style={{animationDelay: '0.5s'}}></div>
      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-60 h-60 bg-indigo-500/10 rounded-full blur-3xl"></div>
    </div>
  );
};

// Componente de tarjeta de servicio
export const ServiceCard = ({ icon, title, description, onOpenModal, id }) => {
  return (
    <div className="bg-slate-800/60 backdrop-blur-sm rounded-xl p-6 flex flex-col items-center text-center transform transition-all duration-300 hover:shadow-blue-500/30 hover:-translate-y-2 shadow-xl border border-blue-500/30 group">
      <div className="w-20 h-20 mb-6 text-blue-400 flex items-center justify-center text-4xl transition-transform duration-300 group-hover:scale-110">
        {icon}
      </div>
      <h3 className="text-2xl font-semibold mb-4 text-blue-300">
        {title}
      </h3>
      <p className="text-gray-300 mb-6 leading-relaxed flex-grow">
        {description}
      </p>
      {onOpenModal && (
        <button
          onClick={() => onOpenModal(id)}
          className="px-8 py-3 bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700 text-white rounded-lg transition-all duration-300 transform hover:scale-105 text-lg font-semibold shadow-lg"
        >
          Más Información
        </button>
      )}
    </div>
  );
};

// Componente de tarjeta de testimonio
export const TestimonialCard = ({ testimonial }) => {
  return (
    <div className="bg-slate-800/60 backdrop-blur-md rounded-xl p-8 transform transition-all duration-300 hover:shadow-cyan-500/30 hover:-translate-y-2 shadow-xl border border-cyan-500/30">
      <div className="flex items-center mb-6">
        <img 
          src={testimonial.avatar} 
          alt={testimonial.name}
          className="w-16 h-16 rounded-full mr-5 border-2 border-cyan-400 shadow-lg"
        />
        <div>
          <h4 className="text-xl font-semibold text-cyan-400">
            {testimonial.name}
          </h4>
          <p className="text-gray-400 text-sm">
            {testimonial.role}
          </p>
        </div>
      </div>
      <p className="text-gray-300 italic text-lg mb-6 leading-relaxed">
        "{testimonial.review}"
      </p>
      <div className="flex items-center text-yellow-400 text-2xl">
        {"★".repeat(testimonial.rating)}
        {"☆".repeat(5 - testimonial.rating)}
      </div>
    </div>
  );
};

// Componente de tecnología
export const TechItem = ({ tech }) => {
  return (
    <div className="flex flex-col items-center p-3 hover:bg-purple-900/30 rounded-lg transition-all duration-300 transform hover:scale-110">
      <span className="text-4xl mb-2 transition-transform duration-300">
        {tech.icon}
      </span>
      <span className="text-sm text-gray-300 text-center">
        {tech.name}
      </span>
    </div>
  );
};

// Componente de formulario de contacto
export const ContactForm = () => {
  const handleSubmit = (e) => {
    e.preventDefault();
    // Aquí puedes agregar la lógica de envío del formulario
    alert('Mensaje enviado! (Esto es una demostración)');
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-2xl mx-auto bg-slate-800/50 backdrop-blur-sm rounded-xl p-8 shadow-xl">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="block text-gray-300 mb-2" htmlFor="name">
            Nombre
          </label>
          <input 
            type="text" 
            id="name" 
            required
            className="w-full bg-slate-700/50 text-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
          />
        </div>
        <div>
          <label className="block text-gray-300 mb-2" htmlFor="email">
            Email
          </label>
          <input 
            type="email" 
            id="email" 
            required
            className="w-full bg-slate-700/50 text-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
          />
        </div>
      </div>
      <div className="mt-6">
        <label className="block text-gray-300 mb-2" htmlFor="message">
          Mensaje
        </label>
        <textarea 
          id="message" 
          rows="4" 
          required
          className="w-full bg-slate-700/50 text-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
        ></textarea>
      </div>
      <button 
        type="submit"
        className="mt-6 w-full px-6 py-3 bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700 text-white rounded-lg transition-all duration-300 transform hover:scale-105 shadow-lg"
      >
        Enviar Mensaje
      </button>
    </form>
  );
};

// Componente de botón scroll to top
export const ScrollToTopButton = ({ isVisible, onClick }) => {
  return (
    <button
      onClick={onClick}
      className={`fixed bottom-8 right-8 p-3 bg-blue-600 text-white rounded-full transition-all duration-300 hover:bg-blue-700 transform hover:scale-110 shadow-lg z-50 ${
        isVisible ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
      }`}
    >
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 10l7-7m0 0l7 7m-7-7v18"></path>
      </svg>
    </button>
  );
};
