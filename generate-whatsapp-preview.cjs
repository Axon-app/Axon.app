#!/usr/bin/env node

// Script profesional para generar una imagen de previsualización para WhatsApp
// Utiliza la librería 'canvas' para crear una imagen cuadrada con fondo degradado, logo y textos
// Guarda la imagen generada en 'public/whatsapp-image.png'

const fs = require("fs").promises;
const path = require("path");

/**
 * Genera una imagen de previsualización para WhatsApp (400x400 px)
 * - Carga el logo desde 'public/logo1.png'
 * - Crea fondo degradado verde-azul moderno
 * - Añade patrón sutil para profundidad visual
 * - Centra el logo con sombra
 * - Añade título y subtítulo con contraste óptimo
 * - Guarda la imagen en formato PNG
 */
async function generateWhatsAppPreview() {
  console.log("📱 Generating WhatsApp sharing preview...");

  // Importa dinámicamente canvas para evitar errores si no está instalado
  const { createCanvas, loadImage } = require("canvas");

  try {
    // Definición de rutas
    const logoPath = path.join(__dirname, "public", "logo1.png");
    const outputPath = path.join(__dirname, "public", "whatsapp-image.png");

    // Carga el logo principal
    const logo = await loadImage(logoPath);

    // Crea el canvas cuadrado para WhatsApp
    const canvas = createCanvas(400, 400);
    const ctx = canvas.getContext("2d");

    // Fondo degradado verde-azul moderno
    const gradient = ctx.createLinearGradient(0, 0, 400, 400);
    gradient.addColorStop(0, "#00ff94"); // Verde brillante arriba
    gradient.addColorStop(0.3, "#00e6aa");
    gradient.addColorStop(0.6, "#00cccc");
    gradient.addColorStop(1, "#00b3e6"); // Azul-verde abajo
    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, 400, 400);

    // Patrón sutil para profundidad visual
    ctx.fillStyle = "rgba(255, 255, 255, 0.03)";
    for (let i = 0; i < 400; i += 30) {
      for (let j = 0; j < 400; j += 30) {
        ctx.fillRect(i, j, 15, 15);
      }
    }

    // Posicionamiento y renderizado del logo centrado con sombra
    const logoSize = 120;
    const logoX = (400 - logoSize) / 2;
    const logoY = (400 - logoSize) / 2 - 25;
    ctx.shadowColor = "rgba(0, 0, 0, 0.2)";
    ctx.shadowBlur = 10;
    ctx.shadowOffsetY = 3;
    ctx.drawImage(logo, logoX, logoY, logoSize, logoSize);
    ctx.shadowColor = "transparent";
    ctx.shadowBlur = 0;
    ctx.shadowOffsetY = 0;

    // Título principal con contraste óptimo
    ctx.fillStyle = "#ffffff";
    ctx.font = "bold 28px Arial, sans-serif";
    ctx.textAlign = "center";
    ctx.fillText("AXON.APP", 200, logoY + logoSize + 40);

    // Subtítulo con ligera transparencia
    ctx.fillStyle = "rgba(255, 255, 255, 0.95)";
    ctx.font = "400 14px Arial, sans-serif";
    ctx.fillText("Professional Web Development", 200, logoY + logoSize + 65);

    // Guarda la imagen generada
    const buffer = canvas.toBuffer("image/png");
    await fs.writeFile(outputPath, buffer);

    // Mensaje final de éxito
    console.log("✅ WhatsApp sharing image created successfully!");
    console.log(`📍 Saved to: ${outputPath}`);
    console.log("📱 Optimized for WhatsApp link previews");
  } catch (error) {
    // Manejo profesional de errores
    console.error("❌ Error generating WhatsApp preview:", error.message);
    console.error(
      "💡 Make sure canvas package is installed: npm install canvas"
    );
    // Sugerencia: aquí se podría enviar un log a un sistema externo si es necesario
  }
}

// Ejecuta la función principal
// Se recomienda ejecutar este script desde la raíz del proyecto
// node generate-whatsapp-preview.cjs
generateWhatsAppPreview();

// --- SUGERENCIAS DE MEJORA PROFESIONAL ---
// 1. Permitir personalización de textos, colores y logo mediante argumentos CLI o variables de entorno.
// 2. Añadir soporte para diferentes idiomas (internacionalización de textos).
// 3. Validar la existencia del logo y mostrar advertencia si no existe.
// 4. Permitir elegir diferentes plantillas o estilos de fondo.
// 5. Añadir tests unitarios para la generación de imágenes (mock de canvas).
// 6. Documentar el script en el README con ejemplos de uso y dependencias.
// 7. Añadir opción para sobrescribir o no archivos existentes.
// 8. Mejorar la accesibilidad de los textos (contraste, fuentes personalizables).
// 9. Integrar con el flujo de CI/CD para generar imágenes automáticamente en despliegues.
