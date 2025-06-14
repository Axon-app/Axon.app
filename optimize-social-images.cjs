const { createCanvas, loadImage } = require("canvas");
const fs = require("fs");

async function optimizeSocialImages() {
  console.log("🎨 Optimizando imágenes de redes sociales...\n");

  try {
    // Crear imagen principal optimizada (1200x630)
    const canvas = createCanvas(1200, 630);
    const ctx = canvas.getContext("2d");

    // Configurar para mejor calidad pero optimizada
    ctx.imageSmoothingEnabled = true;
    ctx.imageSmoothingQuality = "high";

    // Fondo con gradiente profesional
    const gradient = ctx.createLinearGradient(0, 0, 1200, 630);
    gradient.addColorStop(0, "#0f172a"); // slate-900
    gradient.addColorStop(0.3, "#1e40af"); // blue-800
    gradient.addColorStop(0.7, "#7c3aed"); // purple-600
    gradient.addColorStop(1, "#1e1b4b"); // indigo-900

    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, 1200, 630);

    // Efectos decorativos sutiles
    ctx.globalAlpha = 0.06;
    ctx.fillStyle = "#60a5fa";
    ctx.beginPath();
    ctx.arc(150, 120, 100, 0, Math.PI * 2);
    ctx.fill();

    ctx.fillStyle = "#34d399";
    ctx.beginPath();
    ctx.arc(1050, 500, 80, 0, Math.PI * 2);
    ctx.fill();

    ctx.fillStyle = "#a78bfa";
    ctx.beginPath();
    ctx.arc(950, 80, 60, 0, Math.PI * 2);
    ctx.fill();
    ctx.globalAlpha = 1;

    // Cargar y dibujar logos optimizados
    try {
      const logo1 = await loadImage("./public/logo1.png");
      const logo231 = await loadImage("./public/logo231.png");

      // Logo principal
      ctx.save();
      ctx.imageSmoothingEnabled = true;
      ctx.imageSmoothingQuality = "high";
      ctx.drawImage(logo1, 250, 200, 140, 140);

      // Logo 3D
      const logo231Width = 160;
      const logo231Height = (logo231.height / logo231.width) * logo231Width;
      ctx.drawImage(logo231, 440, 200, logo231Width, logo231Height);
      ctx.restore();
    } catch (logoError) {
      console.log("⚠️  Logos no disponibles, usando diseño solo texto");
    }

    // Texto principal con sombra sutil
    ctx.fillStyle = "#ffffff";
    ctx.font = "bold 64px 'Segoe UI', system-ui, Arial, sans-serif";
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";

    // Sombra sutil para mejor legibilidad
    ctx.shadowColor = "rgba(0, 0, 0, 0.3)";
    ctx.shadowBlur = 3;
    ctx.shadowOffsetX = 1;
    ctx.shadowOffsetY = 1;

    ctx.fillText("Axon.App", 600, 390);

    // Resetear sombra
    ctx.shadowColor = "transparent";
    ctx.shadowBlur = 0;
    ctx.shadowOffsetX = 0;
    ctx.shadowOffsetY = 0;

    // Subtítulo
    ctx.fillStyle = "#e2e8f0";
    ctx.font = "600 28px 'Segoe UI', system-ui, Arial, sans-serif";
    ctx.fillText("Desarrollo Web Profesional", 600, 440);

    // Descripción
    ctx.fillStyle = "#7dd3fc";
    ctx.font = "500 20px 'Segoe UI', system-ui, Arial, sans-serif";
    ctx.fillText(
      "Soluciones Tecnológicas Innovadoras • Full-Stack Development",
      600,
      475
    );

    // Tecnologías
    ctx.fillStyle = "#34d399";
    ctx.font = "400 16px 'Segoe UI', system-ui, Arial, sans-serif";
    ctx.fillText("React • Node.js • Python • IA • Cloud Computing", 600, 505);

    // URL
    ctx.fillStyle = "#f1f5f9";
    ctx.font = "500 18px 'Segoe UI', system-ui, Arial, sans-serif";
    ctx.fillText("axon-app.github.io/Axon.app", 600, 570);

    // Guardar imagen principal optimizada
    const buffer = canvas.toBuffer("image/png", { compressionLevel: 6 });
    fs.writeFileSync("./public/og-image.png", buffer);

    console.log("✅ Imagen principal optimizada creada:");
    console.log(`   📏 Dimensiones: ${canvas.width}x${canvas.height}px`);
    console.log(`   📦 Tamaño: ${(buffer.length / 1024).toFixed(2)} KB`);

    // Crear imagen para Twitter optimizada (1200x630 - Twitter acepta este tamaño)
    const twitterCanvas = createCanvas(1200, 630);
    const twitterCtx = twitterCanvas.getContext("2d");

    // Copiar el contenido de la imagen principal
    twitterCtx.drawImage(canvas, 0, 0);

    // Guardar imagen de Twitter
    const twitterBuffer = twitterCanvas.toBuffer("image/png", {
      compressionLevel: 6,
    });
    fs.writeFileSync("./public/twitter-image.png", twitterBuffer);

    console.log("\n✅ Imagen de Twitter optimizada creada:");
    console.log(
      `   📏 Dimensiones: ${twitterCanvas.width}x${twitterCanvas.height}px`
    );
    console.log(`   📦 Tamaño: ${(twitterBuffer.length / 1024).toFixed(2)} KB`);

    // Crear versión adicional para WhatsApp (más pequeña)
    const whatsappCanvas = createCanvas(800, 420);
    const whatsappCtx = whatsappCanvas.getContext("2d");

    whatsappCtx.imageSmoothingEnabled = true;
    whatsappCtx.imageSmoothingQuality = "high";
    whatsappCtx.drawImage(canvas, 0, 0, 1200, 630, 0, 0, 800, 420);

    const whatsappBuffer = whatsappCanvas.toBuffer("image/png", {
      compressionLevel: 6,
    });
    fs.writeFileSync("./public/whatsapp-image.png", whatsappBuffer);

    console.log("\n✅ Imagen adicional para WhatsApp creada:");
    console.log(
      `   📏 Dimensiones: ${whatsappCanvas.width}x${whatsappCanvas.height}px`
    );
    console.log(
      `   📦 Tamaño: ${(whatsappBuffer.length / 1024).toFixed(2)} KB`
    );

    console.log(
      "\n🎉 ¡Todas las imágenes optimizadas han sido creadas exitosamente!"
    );
    console.log("\n📊 Resumen:");
    console.log("   • og-image.png - Para Facebook, LinkedIn, WhatsApp");
    console.log("   • twitter-image.png - Para Twitter/X");
    console.log("   • whatsapp-image.png - Versión ligera adicional");

    console.log("\n✨ Mejoras aplicadas:");
    console.log("   • Calidad HD sin pixelado");
    console.log("   • Tamaño de archivo optimizado");
    console.log("   • Mejor tipografía y contraste");
    console.log("   • Sombras sutiles para mejor legibilidad");
    console.log("   • Efectos visuales profesionales");
  } catch (error) {
    console.error("❌ Error optimizando imágenes:", error);
  }
}

optimizeSocialImages();
