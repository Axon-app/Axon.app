import { createCanvas, loadImage } from "canvas";
import fs from "fs";

async function createWhatsAppPreview() {
  try {
    // Canvas cuadrado optimizado para WhatsApp (400x400)
    const canvas = createCanvas(400, 400);
    const ctx = canvas.getContext("2d");

    // Fondo con gradiente similar al sitio web pero más suave
    const gradient = ctx.createLinearGradient(0, 0, 400, 400);
    gradient.addColorStop(0, "#1f2937"); // gray-800
    gradient.addColorStop(0.5, "#1e40af"); // blue-800
    gradient.addColorStop(1, "#7c3aed"); // purple-600

    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, 400, 400);

    // Cargar y dibujar logo principal centrado
    try {
      const logo1 = await loadImage("./public/logo1.png");
      const logoSize = 250; // Logo grande para WhatsApp
      const logoX = (400 - logoSize) / 2;
      const logoY = (400 - logoSize) / 2;

      // Configurar alta calidad
      ctx.imageSmoothingEnabled = true;
      ctx.imageSmoothingQuality = "high";

      // Fondo circular sutil detrás del logo
      ctx.globalAlpha = 0.15;
      ctx.fillStyle = "#ffffff";
      ctx.beginPath();
      ctx.arc(200, 200, logoSize / 2 + 15, 0, Math.PI * 2);
      ctx.fill();
      ctx.globalAlpha = 1;

      // Sombra para el logo
      ctx.shadowColor = "rgba(0, 0, 0, 0.3)";
      ctx.shadowBlur = 10;
      ctx.shadowOffsetX = 2;
      ctx.shadowOffsetY = 2;

      // Dibujar logo
      ctx.drawImage(logo1, logoX, logoY, logoSize, logoSize);

      // Resetear efectos
      ctx.shadowColor = "transparent";
      ctx.shadowBlur = 0;
      ctx.shadowOffsetX = 0;
      ctx.shadowOffsetY = 0;

      console.log("✅ Logo para WhatsApp cargado correctamente");
    } catch (error) {
      console.log("❌ Error cargando logo para WhatsApp:", error.message);

      // Fallback: texto centrado
      ctx.fillStyle = "#ffffff";
      ctx.font = "bold 48px Arial, sans-serif";
      ctx.textAlign = "center";
      ctx.fillText("Axon.App", 200, 200);
    }

    // Guardar imagen para WhatsApp
    const buffer = canvas.toBuffer("image/png");
    const outputPath = "./public/whatsapp-image.png";
    fs.writeFileSync(outputPath, buffer);

    console.log("✅ Imagen para WhatsApp creada: whatsapp-image.png");
    console.log(`   Dimensiones: ${canvas.width}x${canvas.height}px`);
    console.log(`   Tamaño: ${(buffer.length / 1024).toFixed(2)} KB`);
  } catch (error) {
    console.error("❌ Error creando imagen para WhatsApp:", error);
  }
}

createWhatsAppPreview();
