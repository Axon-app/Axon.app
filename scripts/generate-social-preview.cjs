#!/usr/bin/env node

// Script profesional para generar imágenes de previsualización para redes sociales
// Utiliza la librería 'canvas' para crear imágenes para Open Graph, Twitter y WhatsApp
// Guarda las imágenes generadas en el directorio 'public/'

const fs = require('fs').promises;
const path = require('path');
const { createCanvas, loadImage } = require('canvas');

/**
 * Genera imágenes de previsualización para redes sociales (Open Graph, Twitter, WhatsApp)
 * - Carga el logo desde 'public/axon-logo-principal.png'
 * - Crea imágenes con fondo degradado, logo centrado y textos personalizados
 * - Guarda las imágenes en formato PNG en el directorio 'public/'
 */
async function generateSocialPreview() {
  console.log('🎨 Generating social media preview images...');

  // Definición de rutas
  const logoPath = path.join(__dirname, 'public', 'axon-logo-principal.png');
  const publicDir = path.join(__dirname, 'public');

  try {
    // Carga el logo principal
    const logo = await loadImage(logoPath);

    // --- Open Graph (1200x630) ---
    console.log('📸 Creating Open Graph image (1200x630)...');
    const ogCanvas = createCanvas(1200, 630);
    const ogCtx = ogCanvas.getContext('2d');

    // Fondo degradado lineal
    const gradient = ogCtx.createLinearGradient(0, 0, 1200, 630);
    gradient.addColorStop(0, '#1a1a2e');
    gradient.addColorStop(1, '#16213e');
    ogCtx.fillStyle = gradient;
    ogCtx.fillRect(0, 0, 1200, 630);

    // Posicionamiento y renderizado del logo con glow
    const logoSize = 200;
    const logoX = (1200 - logoSize) / 2;
    const logoY = (630 - logoSize) / 2 - 50;
    ogCtx.shadowColor = '#4338ca';
    ogCtx.shadowBlur = 20;
    ogCtx.drawImage(logo, logoX, logoY, logoSize, logoSize);
    ogCtx.shadowColor = 'transparent';
    ogCtx.shadowBlur = 0;

    // Texto principal y subtítulo
    ogCtx.fillStyle = '#ffffff';
    ogCtx.font = 'bold 48px Arial';
    ogCtx.textAlign = 'center';
    ogCtx.fillText('AXON.APP', 600, logoY + logoSize + 80);
    ogCtx.fillStyle = '#a0a0a0';
    ogCtx.font = '24px Arial';
    ogCtx.fillText('Professional Web Development', 600, logoY + logoSize + 120);

    // Guarda la imagen Open Graph
    const ogBuffer = ogCanvas.toBuffer('image/png');
    await fs.writeFile(path.join(publicDir, 'og-image.png'), ogBuffer);
    console.log('✅ og-image.png created');

    // --- Twitter Card (1200x600) ---
    console.log('📸 Creating Twitter Card image (1200x600)...');
    const twitterCanvas = createCanvas(1200, 600);
    const twitterCtx = twitterCanvas.getContext('2d');
    const twitterGradient = twitterCtx.createLinearGradient(0, 0, 1200, 600);
    twitterGradient.addColorStop(0, '#1a1a2e');
    twitterGradient.addColorStop(1, '#16213e');
    twitterCtx.fillStyle = twitterGradient;
    twitterCtx.fillRect(0, 0, 1200, 600);
    const twitterLogoSize = 180;
    const twitterLogoX = (1200 - twitterLogoSize) / 2;
    const twitterLogoY = (600 - twitterLogoSize) / 2 - 40;
    twitterCtx.shadowColor = '#4338ca';
    twitterCtx.shadowBlur = 20;
    twitterCtx.drawImage(logo, twitterLogoX, twitterLogoY, twitterLogoSize, twitterLogoSize);
    twitterCtx.shadowColor = 'transparent';
    twitterCtx.shadowBlur = 0;
    twitterCtx.fillStyle = '#ffffff';
    twitterCtx.font = 'bold 44px Arial';
    twitterCtx.textAlign = 'center';
    twitterCtx.fillText('AXON.APP', 600, twitterLogoY + twitterLogoSize + 70);
    twitterCtx.fillStyle = '#a0a0a0';
    twitterCtx.font = '22px Arial';
    twitterCtx.fillText('Professional Web Development', 600, twitterLogoY + twitterLogoSize + 105);
    const twitterBuffer = twitterCanvas.toBuffer('image/png');
    await fs.writeFile(path.join(publicDir, 'twitter-image.png'), twitterBuffer);
    console.log('✅ twitter-image.png created');

    // --- WhatsApp (400x400) ---
    console.log('📸 Creating WhatsApp image (400x400)...');
    const whatsappCanvas = createCanvas(400, 400);
    const whatsappCtx = whatsappCanvas.getContext('2d');
    const whatsappGradient = whatsappCtx.createRadialGradient(200, 200, 0, 200, 200, 200);
    whatsappGradient.addColorStop(0, '#2d1b69');
    whatsappGradient.addColorStop(1, '#16213e');
    whatsappCtx.fillStyle = whatsappGradient;
    whatsappCtx.fillRect(0, 0, 400, 400);
    const whatsappLogoSize = 120;
    const whatsappLogoX = (400 - whatsappLogoSize) / 2;
    const whatsappLogoY = (400 - whatsappLogoSize) / 2 - 20;
    whatsappCtx.shadowColor = '#4338ca';
    whatsappCtx.shadowBlur = 15;
    whatsappCtx.drawImage(logo, whatsappLogoX, whatsappLogoY, whatsappLogoSize, whatsappLogoSize);
    whatsappCtx.shadowColor = 'transparent';
    whatsappCtx.shadowBlur = 0;
    whatsappCtx.fillStyle = '#ffffff';
    whatsappCtx.font = 'bold 28px Arial';
    whatsappCtx.textAlign = 'center';
    whatsappCtx.fillText('AXON.APP', 200, whatsappLogoY + whatsappLogoSize + 40);
    whatsappCtx.fillStyle = '#a0a0a0';
    whatsappCtx.font = '14px Arial';
    whatsappCtx.fillText('Web Development', 200, whatsappLogoY + whatsappLogoSize + 65);
    const whatsappBuffer = whatsappCanvas.toBuffer('image/png');
    await fs.writeFile(path.join(publicDir, 'whatsapp-image.png'), whatsappBuffer);
    console.log('✅ whatsapp-image.png created');

    // Mensaje final de éxito
    console.log('\n🎉 All social media preview images generated successfully!');
    console.log('📍 Images saved to public/ directory');
    console.log('🌐 Ready for social media sharing');
  } catch (error) {
    // Manejo profesional de errores
    console.error('❌ Error generating social preview images:', error.message);
    // Sugerencia: aquí se podría enviar un log a un sistema externo si es necesario
  }
}

// Ejecuta la función principal
// Se recomienda ejecutar este script desde la raíz del proyecto
// node generate-social-preview.cjs

generateSocialPreview();

// --- SUGERENCIAS DE MEJORA PROFESIONAL ---
// 1. Permitir personalización de textos y colores mediante argumentos CLI o variables de entorno.
// 2. Añadir soporte para diferentes idiomas (internacionalización de textos).
// 3. Validar la existencia del logo y mostrar advertencia si no existe.
// 4. Permitir elegir diferentes logos o plantillas.
// 5. Añadir tests unitarios para la generación de imágenes (mock de canvas).
// 6. Documentar el script en el README con ejemplos de uso y dependencias.
// 7. Permitir generación de imágenes para otras redes sociales o formatos.
// 8. Añadir opción para sobrescribir o no archivos existentes.
// 9. Mejorar la accesibilidad de los textos (contraste, fuentes personalizables).
// 10. Integrar con el flujo de CI/CD para generar imágenes automáticamente en despliegues.
