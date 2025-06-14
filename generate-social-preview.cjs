const { createCanvas, loadImage } = require("canvas");
const fs = require("fs");

async function createSocialPreview() {
  try {
    // Crear canvas con dimensiones óptimas para Open Graph (1200x630)
    // Usar mayor resolución para mejor calidad
    const canvas = createCanvas(1200, 630);
    const ctx = canvas.getContext("2d");

    // Configurar para mejor calidad de renderizado
    ctx.imageSmoothingEnabled = true;
    ctx.imageSmoothingQuality = "high";
    ctx.textRenderingOptimization = "optimizeQuality"; // Fondo con gradiente moderno y suave
    const gradient = ctx.createLinearGradient(0, 0, 1200, 630);
    gradient.addColorStop(0, "#0f172a"); // slate-900
    gradient.addColorStop(0.2, "#1e293b"); // slate-800
    gradient.addColorStop(0.4, "#1e40af"); // blue-800
    gradient.addColorStop(0.6, "#3730a3"); // indigo-800
    gradient.addColorStop(0.8, "#6b21a8"); // purple-800
    gradient.addColorStop(1, "#1e1b4b"); // indigo-900

    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, 1200, 630);

    // Agregar patrón de puntos para textura sutil
    ctx.globalAlpha = 0.03;
    ctx.fillStyle = "#ffffff";
    for (let i = 0; i < 1200; i += 40) {
      for (let j = 0; j < 630; j += 40) {
        ctx.beginPath();
        ctx.arc(i, j, 1, 0, Math.PI * 2);
        ctx.fill();
      }
    }
    ctx.globalAlpha = 1;

    // Efectos de luz y partículas más sutiles
    ctx.globalAlpha = 0.08;
    ctx.fillStyle = "#60a5fa"; // blue-400
    ctx.beginPath();
    ctx.arc(150, 120, 120, 0, Math.PI * 2);
    ctx.fill();

    ctx.fillStyle = "#34d399"; // emerald-400
    ctx.beginPath();
    ctx.arc(1050, 500, 100, 0, Math.PI * 2);
    ctx.fill();

    ctx.fillStyle = "#a78bfa"; // violet-400
    ctx.beginPath();
    ctx.arc(950, 80, 80, 0, Math.PI * 2);
    ctx.fill();

    ctx.globalAlpha = 1; // Cargar y dibujar logos con mejor calidad
    try {
      // Logo principal (logo1.png) - más grande y mejor posicionado
      const logo1 = await loadImage("./public/logo1.png");
      const logo1Size = 160; // Tamaño aumentado

      // Dibujar con antialiasing mejorado
      ctx.save();
      ctx.imageSmoothingEnabled = true;
      ctx.imageSmoothingQuality = "high";
      ctx.drawImage(logo1, 250, 180, logo1Size, logo1Size);
      ctx.restore();

      // Logo 3D (logo231.png) - mejor proporción
      const logo231 = await loadImage("./public/logo231.png");
      const logo231Width = 180; // Tamaño aumentado
      const logo231Height = (logo231.height / logo231.width) * logo231Width;

      ctx.save();
      ctx.imageSmoothingEnabled = true;
      ctx.imageSmoothingQuality = "high";
      ctx.drawImage(logo231, 450, 180, logo231Width, logo231Height);
      ctx.restore();
    } catch (logoError) {
      console.log("No se pudieron cargar los logos, usando texto alternativo");
    } // Texto principal con mejor tipografía
    ctx.fillStyle = "#ffffff";
    ctx.font = "bold 68px 'Segoe UI', Arial, sans-serif";
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";

    // Sombra de texto para mejor legibilidad
    ctx.shadowColor = "rgba(0, 0, 0, 0.5)";
    ctx.shadowBlur = 4;
    ctx.shadowOffsetX = 2;
    ctx.shadowOffsetY = 2;

    ctx.fillText("Axon.App", 600, 400);

    // Resetear sombra
    ctx.shadowColor = "transparent";
    ctx.shadowBlur = 0;
    ctx.shadowOffsetX = 0;
    ctx.shadowOffsetY = 0;

    // Subtítulo con mejor contraste
    ctx.fillStyle = "#e2e8f0"; // slate-200
    ctx.font = "600 28px 'Segoe UI', Arial, sans-serif";
    ctx.fillText("Desarrollo Web Profesional", 600, 450);

    // Texto descriptivo más legible
    ctx.fillStyle = "#7dd3fc"; // sky-300
    ctx.font = "500 22px 'Segoe UI', Arial, sans-serif";
    ctx.fillText(
      "Soluciones Tecnológicas Innovadoras | Desarrollo Full-Stack",
      600,
      485
    );

    // Tecnologías destacadas con mejor espaciado
    ctx.fillStyle = "#34d399"; // emerald-400
    ctx.font = "400 18px 'Segoe UI', Arial, sans-serif";
    ctx.fillText("React • Node.js • Python • IA • Cloud Computing", 600, 520);

    // URL del sitio con mejor visibilidad
    ctx.fillStyle = "#f8fafc"; // slate-50
    ctx.font = "500 20px 'Segoe UI', Arial, sans-serif";
    ctx.fillText("axon-app.github.io/Axon.app", 600, 580); // Guardar la imagen con máxima calidad
    const buffer = canvas.toBuffer("image/png", {
      compressionLevel: 0,
      filters: canvas.PNG_FILTER_NONE,
    });
    const outputPath = "./public/og-image.png";
    fs.writeFileSync(outputPath, buffer);

    console.log(
      "✅ Imagen de preview social HD creada exitosamente: og-image.png"
    );
    console.log(`   Dimensiones: ${canvas.width}x${canvas.height}px`);
    console.log(`   Tamaño: ${(buffer.length / 1024).toFixed(2)} KB`);

    // Crear versión optimizada para Twitter con mejor calidad
    const twitterCanvas = createCanvas(1200, 675); // Proporción 16:9 para Twitter
    const twitterCtx = twitterCanvas.getContext("2d");

    // Configurar calidad para Twitter
    twitterCtx.imageSmoothingEnabled = true;
    twitterCtx.imageSmoothingQuality = "high";

    // Recrear el diseño para Twitter con dimensiones optimizadas
    // Fondo
    const twitterGradient = twitterCtx.createLinearGradient(0, 0, 1200, 675);
    twitterGradient.addColorStop(0, "#0f172a");
    twitterGradient.addColorStop(0.2, "#1e293b");
    twitterGradient.addColorStop(0.4, "#1e40af");
    twitterGradient.addColorStop(0.6, "#3730a3");
    twitterGradient.addColorStop(0.8, "#6b21a8");
    twitterGradient.addColorStop(1, "#1e1b4b");

    twitterCtx.fillStyle = twitterGradient;
    twitterCtx.fillRect(0, 0, 1200, 675);

    // Efectos decorativos para Twitter
    twitterCtx.globalAlpha = 0.08;
    twitterCtx.fillStyle = "#60a5fa";
    twitterCtx.beginPath();
    twitterCtx.arc(150, 135, 120, 0, Math.PI * 2);
    twitterCtx.fill();

    twitterCtx.fillStyle = "#34d399";
    twitterCtx.beginPath();
    twitterCtx.arc(1050, 540, 100, 0, Math.PI * 2);
    twitterCtx.fill();

    twitterCtx.globalAlpha = 1;

    // Dibujar logos en versión Twitter
    try {
      const logo1 = await loadImage("./public/logo1.png");
      const logo231 = await loadImage("./public/logo231.png");

      twitterCtx.imageSmoothingEnabled = true;
      twitterCtx.imageSmoothingQuality = "high";

      twitterCtx.drawImage(logo1, 250, 200, 160, 160);
      twitterCtx.drawImage(
        logo231,
        450,
        200,
        180,
        (logo231.height / logo231.width) * 180
      );
    } catch (logoError) {
      console.log("Logos no disponibles para versión Twitter");
    }

    // Texto para Twitter
    twitterCtx.fillStyle = "#ffffff";
    twitterCtx.font = "bold 68px 'Segoe UI', Arial, sans-serif";
    twitterCtx.textAlign = "center";
    twitterCtx.textBaseline = "middle";
    twitterCtx.shadowColor = "rgba(0, 0, 0, 0.5)";
    twitterCtx.shadowBlur = 4;
    twitterCtx.shadowOffsetX = 2;
    twitterCtx.shadowOffsetY = 2;
    twitterCtx.fillText("Axon.App", 600, 430);

    twitterCtx.shadowColor = "transparent";
    twitterCtx.shadowBlur = 0;
    twitterCtx.shadowOffsetX = 0;
    twitterCtx.shadowOffsetY = 0;

    twitterCtx.fillStyle = "#e2e8f0";
    twitterCtx.font = "600 28px 'Segoe UI', Arial, sans-serif";
    twitterCtx.fillText("Desarrollo Web Profesional", 600, 480);

    twitterCtx.fillStyle = "#7dd3fc";
    twitterCtx.font = "500 22px 'Segoe UI', Arial, sans-serif";
    twitterCtx.fillText("Soluciones Tecnológicas Innovadoras", 600, 515);

    twitterCtx.fillStyle = "#34d399";
    twitterCtx.font = "400 18px 'Segoe UI', Arial, sans-serif";
    twitterCtx.fillText("React • Node.js • Python • IA • Cloud", 600, 550);

    twitterCtx.fillStyle = "#f8fafc";
    twitterCtx.font = "500 20px 'Segoe UI', Arial, sans-serif";
    twitterCtx.fillText("axon-app.github.io/Axon.app", 600, 620);

    const twitterBuffer = twitterCanvas.toBuffer("image/png", {
      compressionLevel: 0,
      filters: canvas.PNG_FILTER_NONE,
    });
    const twitterPath = "./public/twitter-image.png";
    fs.writeFileSync(twitterPath, twitterBuffer);

    console.log("✅ Imagen HD para Twitter creada: twitter-image.png");
    console.log(
      `   Dimensiones: ${twitterCanvas.width}x${twitterCanvas.height}px`
    );
    console.log(`   Tamaño: ${(twitterBuffer.length / 1024).toFixed(2)} KB`);
  } catch (error) {
    console.error("❌ Error creando imagen de preview social:", error); // Crear una imagen básica de respaldo con mejor calidad
    const canvas = createCanvas(1200, 630);
    const ctx = canvas.getContext("2d");

    // Configurar calidad
    ctx.imageSmoothingEnabled = true;
    ctx.imageSmoothingQuality = "high";

    // Fondo con gradiente
    const gradient = ctx.createLinearGradient(0, 0, 1200, 630);
    gradient.addColorStop(0, "#0f172a");
    gradient.addColorStop(0.5, "#1e40af");
    gradient.addColorStop(1, "#6b21a8");
    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, 1200, 630);

    // Texto de respaldo con mejor tipografía
    ctx.fillStyle = "#ffffff";
    ctx.font = "bold 68px 'Segoe UI', Arial, sans-serif";
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";
    ctx.shadowColor = "rgba(0, 0, 0, 0.5)";
    ctx.shadowBlur = 4;
    ctx.shadowOffsetX = 2;
    ctx.shadowOffsetY = 2;
    ctx.fillText("Axon.App", 600, 280);

    ctx.shadowColor = "transparent";
    ctx.shadowBlur = 0;
    ctx.shadowOffsetX = 0;
    ctx.shadowOffsetY = 0;

    ctx.fillStyle = "#7dd3fc";
    ctx.font = "600 32px 'Segoe UI', Arial, sans-serif";
    ctx.fillText("Desarrollo Web Profesional", 600, 330);

    ctx.fillStyle = "#34d399";
    ctx.font = "500 24px 'Segoe UI', Arial, sans-serif";
    ctx.fillText("Soluciones Tecnológicas Innovadoras", 600, 370);

    const buffer = canvas.toBuffer("image/png", {
      compressionLevel: 0,
      filters: canvas.PNG_FILTER_NONE,
    });
    fs.writeFileSync("./public/og-image.png", buffer);

    console.log("⚠️  Imagen básica HD de respaldo creada");
  }
}

createSocialPreview();
