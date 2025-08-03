/**
 * image-loader.js - Script para manejar la carga y ajuste de imágenes PNG
 * 
 * Este script proporciona funciones para:
 * 1. Cargar imágenes de forma óptima
 * 2. Implementar lazy loading para mejorar el rendimiento
 * 3. Ayudar con la organización de las imágenes locales vs. externas
 */

document.addEventListener('DOMContentLoaded', function() {
    // Implementación de lazy loading para imágenes
    const lazyImages = document.querySelectorAll('img[data-src]');
    
    if ('IntersectionObserver' in window) {
        const imageObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    img.src = img.dataset.src;
                    
                    // Si hay un srcset definido, establecerlo también
                    if (img.dataset.srcset) {
                        img.srcset = img.dataset.srcset;
                    }
                    
                    img.classList.add('loaded');
                    imageObserver.unobserve(img);
                }
            });
        });
        
        lazyImages.forEach(img => {
            imageObserver.observe(img);
        });
    } else {
        // Fallback para navegadores que no soportan IntersectionObserver
        lazyImages.forEach(img => {
            img.src = img.dataset.src;
            if (img.dataset.srcset) {
                img.srcset = img.dataset.srcset;
            }
            img.classList.add('loaded');
        });
    }
    
    // Funciones auxiliares para trabajar con imágenes
    window.imageTools = {
        /**
         * Cambia una imagen de un placeholder a una imagen local
         * @param {string} elementId - El ID del elemento img
         * @param {string} localPath - La ruta a la imagen local (ej. "assets/images/portfolio/project1.png")
         */
        replacePlaceholder: function(elementId, localPath) {
            const imgElement = document.getElementById(elementId);
            if (imgElement) {
                // Guardar el src original como respaldo
                if (!imgElement.dataset.originalSrc) {
                    imgElement.dataset.originalSrc = imgElement.src;
                }
                imgElement.src = localPath;
            }
        },
        
        /**
         * Revierte una imagen a su placeholder original
         * @param {string} elementId - El ID del elemento img
         */
        restorePlaceholder: function(elementId) {
            const imgElement = document.getElementById(elementId);
            if (imgElement && imgElement.dataset.originalSrc) {
                imgElement.src = imgElement.dataset.originalSrc;
            }
        },
        
        /**
         * Aplica estilos personalizados a una imagen
         * @param {string} elementId - El ID del elemento img
         * @param {object} styles - Objeto con estilos CSS (ej. {width: '200px', objectFit: 'contain'})
         */
        applyStyles: function(elementId, styles) {
            const imgElement = document.getElementById(elementId);
            if (imgElement) {
                Object.assign(imgElement.style, styles);
            }
        }
    };
    
    // Añadir IDs a todas las imágenes que no los tengan para facilitar su manipulación
    document.querySelectorAll('img:not([id])').forEach((img, index) => {
        // Solo añadir ID si la imagen está en una sección conocida
        const parentSection = img.closest('section');
        if (parentSection && parentSection.id) {
            const sectionId = parentSection.id;
            const imgClass = img.classList.length > 0 ? img.classList[0] : 'img';
            img.id = `${sectionId}-${imgClass}-${index}`;
        }
    });
});
