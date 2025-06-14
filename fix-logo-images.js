import { createCanvas, loadImage } from "canvas";
import fs from "fs";

// Script para verificar que las imágenes contienen el logo correcto
async function verifyImagesWithLogo() {
  console.log("🔍 Verificando que las imágenes contengan el logo1.png...\n");

  try {
    // Cargar el logo original para comparar
    const originalLogo = await loadImage("./public/logo1.png");
    console.log(
      `✅ Logo original cargado: ${originalLogo.width}x${originalLogo.height}px`
    );

    // Verificar og-image.png
    if (fs.existsSync("./public/og-image.png")) {
      const ogImage = await loadImage("./public/og-image.png");
      console.log(
        `✅ og-image.png existe: ${ogImage.width}x${ogImage.height}px`
      );
    } else {
      console.log("❌ og-image.png no existe");
    }

    // Verificar twitter-image.png
    if (fs.existsSync("./public/twitter-image.png")) {
      const twitterImage = await loadImage("./public/twitter-image.png");
      console.log(
        `✅ twitter-image.png existe: ${twitterImage.width}x${twitterImage.height}px`
      );
    } else {
      console.log("❌ twitter-image.png no existe");
    }

    // Verificar whatsapp-image.png
    if (fs.existsSync("./public/whatsapp-image.png")) {
      const whatsappImage = await loadImage("./public/whatsapp-image.png");
      console.log(
        `✅ whatsapp-image.png existe: ${whatsappImage.width}x${whatsappImage.height}px`
      );
    } else {
      console.log("❌ whatsapp-image.png no existe");
    }

    console.log("\n🔄 Regenerando todas las imágenes con timestamp...");
  } catch (error) {
    console.error("❌ Error verificando imágenes:", error);
  }
}

// Función para regenerar con timestamp
async function regenerateWithTimestamp() {
  const timestamp = Date.now();

  try {
    // Canvas para og-image con logo grande y centrado
    const canvas = createCanvas(1200, 630);
    const ctx = canvas.getContext("2d");

    // Fondo con gradiente
    const gradient = ctx.createLinearGradient(0, 0, 1200, 630);
    gradient.addColorStop(0, "#1f2937");
    gradient.addColorStop(0.3, "#1e40af");
    gradient.addColorStop(0.7, "#7c3aed");
    gradient.addColorStop(1, "#0f172a");
    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, 1200, 630);

    // Cargar y dibujar logo1.png
    const logo1 = await loadImage("./public/logo1.png");
    const logoSize = 220;
    const logoX = (1200 - logoSize) / 2;
    const logoY = 120;

    // Configurar alta calidad
    ctx.imageSmoothingEnabled = true;
    ctx.imageSmoothingQuality = "high";

    // Fondo circular para el logo
    ctx.globalAlpha = 0.1;
    ctx.fillStyle = "#ffffff";
    ctx.beginPath();
    ctx.arc(
      logoX + logoSize / 2,
      logoY + logoSize / 2,
      logoSize / 2 + 20,
      0,
      Math.PI * 2
    );
    ctx.fill();
    ctx.globalAlpha = 1;

    // Sombra
    ctx.shadowColor = "rgba(0, 0, 0, 0.4)";
    ctx.shadowBlur = 15;
    ctx.shadowOffsetX = 3;
    ctx.shadowOffsetY = 3;

    // Dibujar logo
    ctx.drawImage(logo1, logoX, logoY, logoSize, logoSize);

    // Resetear efectos
    ctx.shadowColor = "transparent";
    ctx.shadowBlur = 0;
    ctx.shadowOffsetX = 0;
    ctx.shadowOffsetY = 0;

    // Textos
    ctx.fillStyle = "#ffffff";
    ctx.font = "bold 58px Arial, sans-serif";
    ctx.textAlign = "center";
    ctx.fillText("Axon.App", 600, 430);

    ctx.fillStyle = "#94a3b8";
    ctx.font = "26px Arial, sans-serif";
    ctx.fillText("Desarrollo Web Profesional", 600, 470);

    ctx.fillStyle = "#60a5fa";
    ctx.font = "20px Arial, sans-serif";
    ctx.fillText(
      "Soluciones Tecnológicas Innovadoras | Desarrollo Full-Stack",
      600,
      500
    );

    ctx.fillStyle = "#10b981";
    ctx.font = "16px Arial, sans-serif";
    ctx.fillText("React • Node.js • Python • IA • Cloud Computing", 600, 530);

    ctx.fillStyle = "#f1f5f9";
    ctx.font = "18px Arial, sans-serif";
    ctx.fillText("axon-app.github.io/Axon.app", 600, 580);

    // Marca de tiempo en la esquina (muy pequeña, casi invisible)
    ctx.fillStyle = "rgba(255,255,255,0.1)";
    ctx.font = "8px Arial";
    ctx.textAlign = "right";
    ctx.fillText(`v${timestamp}`, 1190, 620);

    // Guardar
    const buffer = canvas.toBuffer("image/png");
    fs.writeFileSync("./public/og-image.png", buffer);

    console.log(`✅ og-image.png actualizada con timestamp ${timestamp}`);
    console.log(`   Logo usado: logo1.png (${logoSize}x${logoSize}px)`);
    console.log(`   Posición: centrado en ${logoX}, ${logoY}`);

    // Crear versión para Twitter
    const twitterCanvas = createCanvas(800, 418);
    const twitterCtx = twitterCanvas.getContext("2d");
    twitterCtx.drawImage(canvas, 0, 0, 1200, 630, 0, 0, 800, 418);

    const twitterBuffer = twitterCanvas.toBuffer("image/png");
    fs.writeFileSync("./public/twitter-image.png", twitterBuffer);
    console.log(`✅ twitter-image.png actualizada`);
  } catch (error) {
    console.error("❌ Error regenerando imágenes:", error);
  }
}

async function main() {
  await verifyImagesWithLogo();
  await regenerateWithTimestamp();

  console.log("\n🎯 IMPORTANTE:");
  console.log("1. Sube los cambios a GitHub");
  console.log("2. Espera unos minutos para que GitHub Pages se actualice");
  console.log("3. Limpia la caché del navegador (Ctrl+F5)");
  console.log("4. Usa el Facebook Debugger para forzar la actualización:");
  console.log("   https://developers.facebook.com/tools/debug/");
  console.log("5. Ingresa tu URL: https://axon-app.github.io/Axon.app/");
}

main();
