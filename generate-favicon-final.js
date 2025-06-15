/* eslint-env node */
/* eslint-disable no-console */

import { createCanvas, loadImage } from "canvas";
import { promises as fs } from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

async function generateFaviconFinal() {
  console.log("🎯 Generating final favicon...");

  const logoPath = path.join(__dirname, "public", "logo1.png");
  const publicDir = path.join(__dirname, "public");

  try {
    const logo = await loadImage(logoPath);

    // Generate multiple favicon sizes
    const faviconSizes = [
      { size: 16, name: "favicon-16.png" },
      { size: 32, name: "favicon-32.png" },
      { size: 48, name: "favicon-48.png" },
      { size: 64, name: "favicon-64.png" },
    ];

    for (const favicon of faviconSizes) {
      const canvas = createCanvas(favicon.size, favicon.size);
      const ctx = canvas.getContext("2d");

      // White background
      ctx.fillStyle = "white";
      ctx.fillRect(0, 0, favicon.size, favicon.size);

      // Draw logo with padding
      const padding = favicon.size * 0.1;
      const logoSize = favicon.size - padding * 2;
      ctx.drawImage(logo, padding, padding, logoSize, logoSize);

      // Save PNG
      const buffer = canvas.toBuffer("image/png");
      const outputPath = path.join(publicDir, favicon.name);
      await fs.writeFile(outputPath, buffer);

      console.log(
        `✅ ${favicon.name} created (${favicon.size}x${favicon.size})`
      );
    }

    // Create main favicon.png
    const mainCanvas = createCanvas(32, 32);
    const mainCtx = mainCanvas.getContext("2d");

    mainCtx.fillStyle = "white";
    mainCtx.fillRect(0, 0, 32, 32);

    const mainPadding = 4;
    const mainSize = 32 - mainPadding * 2;
    mainCtx.drawImage(logo, mainPadding, mainPadding, mainSize, mainSize);

    const mainBuffer = mainCanvas.toBuffer("image/png");
    await fs.writeFile(path.join(publicDir, "favicon.png"), mainBuffer);

    console.log("✅ favicon.png created (32x32)");
    console.log("🎉 All favicon files generated successfully!");
  } catch (error) {
    console.error("❌ Error generating favicons:", error);
  }
}

generateFaviconFinal();
