import fs from "fs";
import { createCanvas, loadImage } from "canvas";

async function generateFaviconWithWhiteBackground() {
  try {
    console.log("Generando favicon con fondo blanco...");

    // Cargar la imagen del logo
    const logo = await loadImage("./public/logo1.png");

    // Crear canvas para favicon (32x32 - tamaño estándar de favicon)
    const canvas = createCanvas(32, 32);
    const ctx = canvas.getContext("2d");

    // Fondo blanco brillante
    ctx.fillStyle = "#FFFFFF";
    ctx.fillRect(0, 0, 32, 32);

    // Añadir un sutil borde gris para definición
    ctx.strokeStyle = "#E5E7EB";
    ctx.lineWidth = 1;
    ctx.strokeRect(0, 0, 32, 32); // Calcular posición centrada del logo (logo más grande)
    const logoSize = 30; // Dejar solo 1px de padding en cada lado
    const x = (32 - logoSize) / 2;
    const y = (32 - logoSize) / 2;

    // Dibujar el logo centrado
    ctx.drawImage(logo, x, y, logoSize, logoSize);

    // Guardar como PNG
    const buffer = canvas.toBuffer("image/png");
    fs.writeFileSync("./public/favicon-final.png", buffer);
    console.log("Favicon PNG generado exitosamente");

    // Crear también un favicon de 16x16 para mayor compatibilidad
    const canvas16 = createCanvas(16, 16);
    const ctx16 = canvas16.getContext("2d");

    // Fondo blanco
    ctx16.fillStyle = "#FFFFFF";
    ctx16.fillRect(0, 0, 16, 16); // Logo más grande para mejor visibilidad
    const logoSize16 = 15; // Casi todo el tamaño disponible
    const x16 = (16 - logoSize16) / 2;
    const y16 = (16 - logoSize16) / 2;

    ctx16.drawImage(logo, x16, y16, logoSize16, logoSize16);

    const buffer16 = canvas16.toBuffer("image/png");
    fs.writeFileSync("./public/favicon-16.png", buffer16);
    console.log("Favicon 16x16 PNG generado exitosamente");

    console.log("Favicons generados con éxito!");
  } catch (error) {
    console.error("Error generando favicon:", error);
  }
}

generateFaviconWithWhiteBackground();
