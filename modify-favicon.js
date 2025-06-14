import fs from "fs";
import path from "path";
import { createCanvas, loadImage } from "canvas";
import { fileURLToPath } from "url";
import { dirname } from "path";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

async function modifyFaviconWithWhiteBackground() {
  try {
    console.log("Iniciando modificación del favicon...");

    // Cargar el logo principal para usar como base
    const logoPath = path.join(__dirname, "public", "logo1.png");
    const logo = await loadImage(logoPath);

    // Crear canvas de 32x32 (tamaño estándar favicon)
    const canvas = createCanvas(32, 32);
    const ctx = canvas.getContext("2d");

    // Fondo blanco sólido
    ctx.fillStyle = "#ffffff";
    ctx.fillRect(0, 0, 32, 32);

    // Agregar un borde sutil gris claro
    ctx.strokeStyle = "#e5e5e5";
    ctx.lineWidth = 1;
    ctx.strokeRect(0, 0, 32, 32);

    // Dibujar el logo centrado con padding
    const padding = 4;
    const logoSize = 32 - padding * 2;

    ctx.drawImage(logo, padding, padding, logoSize, logoSize);

    // Añadir un efecto de sombra sutil
    ctx.globalCompositeOperation = "destination-over";
    ctx.fillStyle = "rgba(0, 0, 0, 0.1)";
    ctx.fillRect(padding + 1, padding + 1, logoSize, logoSize);

    // Convertir a buffer
    const buffer = canvas.toBuffer("image/png");

    // Guardar como PNG temporal
    const tempPngPath = path.join(__dirname, "public", "favicon-temp.png");
    fs.writeFileSync(tempPngPath, buffer);

    console.log("✅ Favicon temporal creado:", tempPngPath);
    console.log("📝 Ahora necesitas convertir favicon-temp.png a favicon.ico");
    console.log("💡 Puedes usar una herramienta online como:");
    console.log("   - https://convertio.co/png-ico/");
    console.log("   - https://favicon.io/favicon-converter/");
    console.log("   - https://www.icoconverter.com/");
    console.log("");
    console.log("⚡ O instalar imagemagick y ejecutar:");
    console.log("   magick favicon-temp.png favicon.ico");
  } catch (error) {
    console.error("❌ Error al modificar el favicon:", error);
  }
}

modifyFaviconWithWhiteBackground();
