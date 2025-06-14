import { createCanvas, loadImage } from "canvas";
import fs from "fs";
import process from "process";

async function generateFaviconWithWhiteBackground() {
  try {
    console.log("🎨 Generando favicon con fondo blanco...\n");

    // Verificar que el logo existe
    const logoPath = "./public/logo1.png";
    if (!fs.existsSync(logoPath)) {
      throw new Error("Logo principal logo1.png no encontrado en ./public/");
    }

    // Cargar la imagen del logo
    const logo = await loadImage(logoPath);
    console.log(`✅ Logo cargado: ${logo.width}x${logo.height}px`); // Generar múltiples tamaños de favicon para mejor compatibilidad
    const faviconSizes = [
      { size: 16, filename: "favicon-16.png", description: "Favicon pequeño" },
      { size: 32, filename: "favicon-32.png", description: "Favicon estándar" },
      { size: 48, filename: "favicon-48.png", description: "Favicon grande" },
      {
        size: 64,
        filename: "favicon-64.png",
        description: "Favicon extra grande",
      },
    ];

    console.log("📏 Generando múltiples tamaños de favicon...\n");

    for (const { size, filename, description } of faviconSizes) {
      // Crear canvas para el tamaño específico
      const canvas = createCanvas(size, size);
      const ctx = canvas.getContext("2d");

      // Fondo blanco brillante
      ctx.fillStyle = "#FFFFFF";
      ctx.fillRect(0, 0, size, size);

      // Añadir un sutil borde gris para definición (solo en tamaños grandes)
      if (size >= 32) {
        ctx.strokeStyle = "#E5E7EB";
        ctx.lineWidth = 1;
        ctx.strokeRect(0, 0, size, size);
      }

      // Calcular posición centrada del logo
      const padding = Math.max(1, Math.floor(size * 0.05)); // 5% padding mínimo 1px
      const logoSize = size - padding * 2;
      const x = (size - logoSize) / 2;
      const y = (size - logoSize) / 2;

      // Configurar alta calidad para el rendering
      ctx.imageSmoothingEnabled = true;
      ctx.imageSmoothingQuality = "high";

      // Dibujar el logo centrado
      ctx.drawImage(logo, x, y, logoSize, logoSize);

      // Guardar el archivo
      const buffer = canvas.toBuffer("image/png");
      fs.writeFileSync(`./public/${filename}`, buffer);

      console.log(`✅ ${description}: ${filename} (${size}x${size}px)`);
    }

    // Generar favicon principal (copia del 32x32)
    const mainFavicon = fs.readFileSync("./public/favicon-32.png");
    fs.writeFileSync("./public/favicon-final.png", mainFavicon);

    console.log("\n🎯 Favicon principal actualizado: favicon-final.png");
    console.log("\n📋 Archivos generados:");
    faviconSizes.forEach(({ filename, size }) => {
      console.log(`   • ${filename} (${size}x${size}px)`);
    });
    console.log("   • favicon-final.png (principal)");

    console.log("\n💡 Siguiente paso:");
    console.log("   Ejecuta: node convert-to-ico.cjs");
    console.log("   Para convertir a formato .ico");
  } catch (error) {
    console.error("❌ Error generando favicon:", error.message);
    console.log("\n💡 SOLUCIONES:");
    console.log(
      "1. Asegúrate de que 'canvas' esté instalado: npm install canvas"
    );
    console.log("2. Verifica que logo1.png existe en ./public/");
    console.log("3. Ejecuta el script desde la raíz del proyecto");
    process.exit(1);
  }
}

async function main() {
  try {
    await generateFaviconWithWhiteBackground();
    console.log("\n🎉 ¡Proceso completado exitosamente!");
  } catch (error) {
    console.error("\n❌ Error en el proceso:", error.message);
    process.exit(1);
  }
}

main();
