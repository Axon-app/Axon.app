import { createCanvas, loadImage } from "canvas";
import fs from "fs";

async function updateFavicon() {
  try {
    console.log("🔄 Actualizando favicon.ico con fondo blanco...");

    // Cargar el logo original
    const logo = await loadImage("./public/logo1.png");

    // Crear canvas para favicon 32x32
    const canvas = createCanvas(32, 32);
    const ctx = canvas.getContext("2d");

    // Fondo blanco
    ctx.fillStyle = "#ffffff";
    ctx.fillRect(0, 0, 32, 32);

    // Calcular dimensiones para centrar el logo
    const size = 28; // Dejar un margen de 2px
    const x = (32 - size) / 2;
    const y = (32 - size) / 2;

    // Dibujar logo centrado
    ctx.drawImage(logo, x, y, size, size);

    // Agregar un sutil efecto de sombra/borde para mejorar la visibilidad
    ctx.globalCompositeOperation = "multiply";
    ctx.globalAlpha = 0.1;
    ctx.fillStyle = "#000000";
    ctx.fillRect(0, 0, 32, 32);

    // Resetear composición
    ctx.globalCompositeOperation = "source-over";
    ctx.globalAlpha = 1.0;

    // Generar buffer PNG
    const buffer = canvas.toBuffer("image/png");

    // Guardar como PNG temporal
    fs.writeFileSync("./public/favicon-temp.png", buffer);

    console.log("✅ Favicon temporal generado (favicon-temp.png)");
    console.log("📝 Ahora convertiremos PNG a ICO...");

    // Nota: Para convertir PNG a ICO, necesitamos usar una herramienta adicional
    // o biblioteca específica. Por ahora, generamos un PNG de alta calidad
    // que puede ser convertido manualmente a ICO si es necesario.
  } catch (error) {
    console.error("❌ Error al actualizar favicon:", error);
  }
}

updateFavicon();
