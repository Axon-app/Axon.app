import React from "react";
import { blogPosts, getFeaturedPosts } from "../../data/blogData";

export const BlogSection = ({ onOpenBlogModal }) => {
  const featuredPosts = getFeaturedPosts();
  const recentPosts = blogPosts.slice(0, 3);

  return (
    <section id="blog" className="py-20 bg-gradient-to-br from-gray-900 via-black to-gray-900 relative overflow-hidden">
      {/* Efectos de fondo animados */}
      <div className="absolute inset-0">
        <div className="absolute top-1/4 left-1/4 w-72 h-72 bg-blue-500/10 rounded-full blur-3xl animate-blob"></div>
        <div className="absolute bottom-1/4 right-1/4 w-72 h-72 bg-purple-500/10 rounded-full blur-3xl animate-blob" style={{ animationDelay: '2s' }}></div>
        <div className="absolute top-1/2 left-1/2 w-64 h-64 bg-cyan-500/10 rounded-full blur-3xl animate-blob" style={{ animationDelay: '4s' }}></div>
      </div>

      <div className="container mx-auto px-4 lg:px-6 xl:px-8 relative z-10 max-w-7xl">
        {/* Header de la sección */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-6 text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-400">
            Blog & Insights
          </h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
            Mantente al día con las últimas tendencias en tecnología, desarrollo web y mejores prácticas de la industria
          </p>
        </div>

        {/* Posts destacados */}
        {featuredPosts.length > 0 && (
          <div className="mb-16">
            <h3 className="text-2xl font-semibold mb-8 text-blue-300 text-center">
              📌 Posts Destacados
            </h3>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-8">
              {featuredPosts.map((post) => (
                <BlogCard
                  key={post.id}
                  post={post}
                  onOpenModal={onOpenBlogModal}
                  featured={true}
                />
              ))}
            </div>
          </div>
        )}

        {/* Posts recientes */}
        <div>
          <h3 className="text-2xl font-semibold mb-8 text-blue-300 text-center">
            🕒 Últimas Publicaciones
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
            {recentPosts.map((post) => (
              <BlogCard
                key={post.id}
                post={post}
                onOpenModal={onOpenBlogModal}
                featured={false}
              />
            ))}
          </div>
        </div>


      </div>
    </section>
  );
};

// Componente de tarjeta de blog
const BlogCard = React.memo(({ post, onOpenModal, featured }) => {
  const handleReadMore = () => {
    onOpenModal(post);
  };

  return (
    <article
      className={`bg-slate-800/60 backdrop-blur-sm rounded-xl overflow-hidden transform transition-all duration-300 hover:shadow-blue-500/30 hover:-translate-y-2 shadow-xl border border-blue-500/30 group w-full ${featured ? 'lg:col-span-1' : ''}`}
    >
      {/* Imagen del post */}
      <div className="h-48 bg-gradient-to-br from-blue-600/50 to-purple-600/50 relative overflow-hidden">
        {/* Patrón de fondo decorativo */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-4 right-8 w-16 h-16 border-2 border-white/30 rounded-full animate-spin-slow"></div>
          <div className="absolute top-8 right-16 w-8 h-8 border border-white/20 rounded-full animate-pulse"></div>
          <div className="absolute bottom-8 right-4 w-12 h-12 border border-white/25 rotate-45 animate-bounce-slow"></div>
        </div>

        {/* Gradiente overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-slate-800/80 to-transparent"></div>

        {/* Icono de categoría dinámico - esquina superior derecha */}
        <div className="absolute top-4 right-4 group-hover:scale-110 transition-transform duration-300">
          <div className="w-12 h-12 bg-white/10 backdrop-blur-sm rounded-full flex items-center justify-center border border-white/20 shadow-lg">
            <svg className="w-6 h-6 text-white animate-pulse" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
            </svg>
          </div>
        </div>

        {/* Indicador de nueva tecnología - esquina superior izquierda */}
        <div className="absolute top-4 left-4 group-hover:rotate-12 transition-transform duration-300">
          <div className="w-10 h-10 bg-gradient-to-r from-cyan-400 to-blue-500 rounded-lg flex items-center justify-center shadow-lg animate-pulse">
            <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z" />
            </svg>
          </div>
        </div>

        {/* Badge destacado */}
        <div className="absolute bottom-4 left-4">
          {featured && (
            <span className="bg-gradient-to-r from-yellow-400 to-orange-500 text-black px-3 py-1 rounded-full text-xs font-bold shadow-lg animate-bounce-slow">
              ⭐ Destacado
            </span>
          )}
        </div>

        {/* Elemento decorativo central - solo visible en hover */}
        <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-20 transition-opacity duration-500">
          <div className="w-20 h-20 border-2 border-white rounded-full animate-spin-slow">
            <div className="w-full h-full border-2 border-transparent border-t-white rounded-full animate-reverse-spin"></div>
          </div>
        </div>
      </div>

      {/* Contenido del post */}
      <div className="p-6">
        {/* Tags */}
        <div className="flex flex-wrap gap-2 mb-3">
          {post.tags.slice(0, 2).map((tag, index) => (
            <span
              key={index}
              className="bg-blue-600/20 text-blue-300 px-2 py-1 rounded-full text-xs"
            >
              {tag}
            </span>
          ))}
        </div>

        {/* Título */}
        <h3 className="text-xl font-semibold mb-3 text-blue-300 group-hover:text-blue-200 transition-colors">
          {post.title}
        </h3>

        {/* Excerpt */}
        <p className="text-gray-300 mb-4 leading-relaxed text-sm">
          {post.excerpt}
        </p>

        {/* Footer de la tarjeta */}
        <div className="flex justify-between items-center">
          <div className="text-sm text-gray-400">
            <span>✍️ {post.author}</span>
            <span className="mx-2">•</span>
            <span>📅 {new Date(post.date).toLocaleDateString('es-ES')}</span>
          </div>
          <button
            onClick={handleReadMore}
            className="px-4 py-2 bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700 text-white rounded-lg transition-all duration-300 transform hover:scale-105 text-sm font-semibold"
          >
            Leer más →
          </button>
        </div>
      </div>
    </article>
  );
});

BlogCard.displayName = "BlogCard";

export default BlogSection;
