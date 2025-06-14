import { createCanvas, loadImage } from "canvas";
import fs from "fs";

async function createSocialPreview() {
  try {
    // Crear canvas con dimensiones óptimas para Open Graph (1200x630)
    const canvas = createCanvas(1200, 630);
    const ctx = canvas.getContext("2d");

    // Fondo con gradiente similar al sitio web
    const gradient = ctx.createLinearGradient(0, 0, 1200, 630);
    gradient.addColorStop(0, "#1f2937"); // gray-800
    gradient.addColorStop(0.3, "#1e40af"); // blue-800
    gradient.addColorStop(0.7, "#7c3aed"); // purple-600
    gradient.addColorStop(1, "#0f172a"); // slate-900

    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, 1200, 630);

    // Efectos de partículas/círculos decorativos
    ctx.globalAlpha = 0.1;
    ctx.fillStyle = "#60a5fa"; // blue-400
    ctx.beginPath();
    ctx.arc(200, 150, 80, 0, Math.PI * 2);
    ctx.fill();

    ctx.fillStyle = "#34d399"; // emerald-400
    ctx.beginPath();
    ctx.arc(1000, 480, 60, 0, Math.PI * 2);
    ctx.fill();

    ctx.fillStyle = "#a78bfa"; // violet-400
    ctx.beginPath();
    ctx.arc(900, 120, 40, 0, Math.PI * 2);
    ctx.fill();

    ctx.globalAlpha = 1; // Cargar y dibujar logo principal centrado con alta calidad
    try {
      // Logo principal (logo1.png) - optimizado para redes sociales
      const logo1 = await loadImage("./public/logo1.png");
      const logo1Size = 220; // Tamaño aún más grande para mejor visibilidad
      const logoX = (1200 - logo1Size) / 2; // Centrado horizontalmente
      const logoY = 120; // Posición vertical superior

      // Configurar alta calidad de renderizado
      ctx.imageSmoothingEnabled = true;
      ctx.imageSmoothingQuality = "high";

      // Agregar un fondo circular suave detrás del logo para mejor contraste
      ctx.globalAlpha = 0.1;
      ctx.fillStyle = "#ffffff";
      ctx.beginPath();
      ctx.arc(
        logoX + logo1Size / 2,
        logoY + logo1Size / 2,
        logo1Size / 2 + 20,
        0,
        Math.PI * 2
      );
      ctx.fill();
      ctx.globalAlpha = 1;

      // Sombra del logo para mejor contraste
      ctx.shadowColor = "rgba(0, 0, 0, 0.4)";
      ctx.shadowBlur = 15;
      ctx.shadowOffsetX = 3;
      ctx.shadowOffsetY = 3;

      // Dibujar el logo con alta calidad
      ctx.drawImage(logo1, logoX, logoY, logo1Size, logo1Size);

      // Resetear configuraciones
      ctx.shadowColor = "transparent";
      ctx.shadowBlur = 0;
      ctx.shadowOffsetX = 0;
      ctx.shadowOffsetY = 0;
      ctx.imageSmoothingEnabled = true;

      console.log(
        "✅ Logo principal cargado con alta calidad y centrado correctamente"
      );
    } catch (error) {
      console.log("❌ Error cargando logo1.png:", error.message);
      console.log("Usando texto alternativo");
    } // Texto principal - ajustado para el logo más grande
    ctx.fillStyle = "#ffffff";
    ctx.font = "bold 58px Arial, sans-serif";
    ctx.textAlign = "center";
    ctx.fillText("Axon.App", 600, 430);

    // Subtítulo
    ctx.fillStyle = "#94a3b8"; // slate-400
    ctx.font = "26px Arial, sans-serif";
    ctx.fillText("Desarrollo Web Profesional", 600, 470);

    // Texto descriptivo
    ctx.fillStyle = "#60a5fa"; // blue-400
    ctx.font = "20px Arial, sans-serif";
    ctx.fillText(
      "Soluciones Tecnológicas Innovadoras | Desarrollo Full-Stack",
      600,
      500
    );

    // Tecnologías destacadas
    ctx.fillStyle = "#10b981"; // emerald-500
    ctx.font = "16px Arial, sans-serif";
    ctx.fillText("React • Node.js • Python • IA • Cloud Computing", 600, 530);

    // URL del sitio
    ctx.fillStyle = "#f1f5f9"; // slate-100
    ctx.font = "18px Arial, sans-serif";
    ctx.fillText("axon-app.github.io/Axon.app", 600, 580);

    // Guardar la imagen
    const buffer = canvas.toBuffer("image/png");
    const outputPath = "./public/og-image.png";
    fs.writeFileSync(outputPath, buffer);

    console.log(
      "✅ Imagen de preview social creada exitosamente: og-image.png"
    );
    console.log(`   Dimensiones: ${canvas.width}x${canvas.height}px`);
    console.log(`   Tamaño: ${(buffer.length / 1024).toFixed(2)} KB`);

    // Crear también una versión más pequeña para Twitter
    const twitterCanvas = createCanvas(800, 418);
    const twitterCtx = twitterCanvas.getContext("2d");

    // Redimensionar el contenido para Twitter
    twitterCtx.drawImage(canvas, 0, 0, 1200, 630, 0, 0, 800, 418);

    const twitterBuffer = twitterCanvas.toBuffer("image/png");
    const twitterPath = "./public/twitter-image.png";
    fs.writeFileSync(twitterPath, twitterBuffer);

    console.log("✅ Imagen para Twitter creada: twitter-image.png");
    console.log(
      `   Dimensiones: ${twitterCanvas.width}x${twitterCanvas.height}px`
    );
  } catch (error) {
    console.error("❌ Error creando imagen de preview social:", error);

    // Crear una imagen básica de respaldo
    const canvas = createCanvas(1200, 630);
    const ctx = canvas.getContext("2d");

    // Fondo sólido
    ctx.fillStyle = "#1f2937";
    ctx.fillRect(0, 0, 1200, 630);

    // Texto básico
    ctx.fillStyle = "#ffffff";
    ctx.font = "bold 72px Arial, sans-serif";
    ctx.textAlign = "center";
    ctx.fillText("Axon.App", 600, 280);

    ctx.fillStyle = "#60a5fa";
    ctx.font = "32px Arial, sans-serif";
    ctx.fillText("Desarrollo Web Profesional", 600, 330);

    ctx.fillStyle = "#94a3b8";
    ctx.font = "24px Arial, sans-serif";
    ctx.fillText("Soluciones Tecnológicas Innovadoras", 600, 370);

    const buffer = canvas.toBuffer("image/png");
    fs.writeFileSync("./public/og-image.png", buffer);

    console.log("⚠️  Imagen básica de respaldo creada");
  }
}

createSocialPreview();
