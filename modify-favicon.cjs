const fs = require("fs");
const path = require("path");
const { createCanvas, loadImage } = require("canvas");

async function modifyFaviconWithWhiteBackground() {
  try {
    console.log("🚀 Iniciando modificación del favicon...");

    // Cargar el logo principal para usar como base
    const logoPath = path.join(__dirname, "public", "logo1.png");
    console.log("📂 Cargando logo desde:", logoPath);

    const logo = await loadImage(logoPath);

    // Crear canvas de 32x32 (tamaño estándar favicon)
    const canvas = createCanvas(32, 32);
    const ctx = canvas.getContext("2d");

    // Fondo blanco sólido
    ctx.fillStyle = "#ffffff";
    ctx.fillRect(0, 0, 32, 32);

    // Agregar un borde sutil gris claro para mejor definición
    ctx.strokeStyle = "#e5e5e5";
    ctx.lineWidth = 0.5;
    ctx.strokeRect(0, 0, 32, 32);

    // Dibujar el logo centrado con padding
    const padding = 3;
    const logoSize = 32 - padding * 2;

    // Añadir una sombra muy sutil
    ctx.shadowColor = "rgba(0, 0, 0, 0.08)";
    ctx.shadowBlur = 1;
    ctx.shadowOffsetX = 1;
    ctx.shadowOffsetY = 1;

    ctx.drawImage(logo, padding, padding, logoSize, logoSize);

    // Limpiar sombra
    ctx.shadowColor = "transparent";
    ctx.shadowBlur = 0;
    ctx.shadowOffsetX = 0;
    ctx.shadowOffsetY = 0;

    // Convertir a buffer
    const buffer = canvas.toBuffer("image/png");

    // Guardar como PNG temporal
    const tempPngPath = path.join(__dirname, "public", "favicon-white-bg.png");
    fs.writeFileSync(tempPngPath, buffer);

    console.log("✅ Favicon con fondo blanco creado:", tempPngPath);
    console.log("");
    console.log("🔄 SIGUIENTES PASOS:");
    console.log("1. Convertir PNG a ICO usando una herramienta online:");
    console.log("   • https://convertio.co/png-ico/");
    console.log("   • https://favicon.io/favicon-converter/");
    console.log("   • https://www.icoconverter.com/");
    console.log("");
    console.log("2. O instalar ImageMagick y ejecutar:");
    console.log("   magick public/favicon-white-bg.png public/favicon.ico");
    console.log("");
    console.log("3. Sobrescribir el archivo favicon.ico actual");
    console.log("4. Verificar en el navegador que se ve correctamente");
  } catch (error) {
    console.error("❌ Error al modificar el favicon:", error.message);

    // Si no se puede cargar canvas, crear una versión simplificada
    console.log("");
    console.log("💡 SOLUCIÓN ALTERNATIVA:");
    console.log("Puedes usar el logo1.png directamente y convertirlo:");
    console.log("1. Ve a: https://favicon.io/favicon-converter/");
    console.log("2. Sube el archivo public/logo1.png");
    console.log("3. Ajusta el fondo a blanco");
    console.log("4. Descarga el favicon.ico generado");
    console.log("5. Reemplaza public/favicon.ico");
  }
}

modifyFaviconWithWhiteBackground();
