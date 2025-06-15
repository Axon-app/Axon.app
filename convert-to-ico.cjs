#!/usr/bin/env node

const fs = require("fs").promises;
const path = require("path");
const { createCanvas, loadImage } = require("canvas");

async function convertToICO() {
  console.log("🔄 Converting PNG to ICO format...");

  const logoPath = path.join(__dirname, "public", "logo1.png");
  const outputPath = path.join(__dirname, "public", "favicon.ico");

  try {
    // Load the original image
    const image = await loadImage(logoPath);

    // Create canvas for favicon
    const canvas = createCanvas(32, 32);
    const ctx = canvas.getContext("2d");

    // Fill with white background
    ctx.fillStyle = "white";
    ctx.fillRect(0, 0, 32, 32);

    // Draw logo centered
    const size = 24;
    const x = (32 - size) / 2;
    const y = (32 - size) / 2;

    ctx.drawImage(image, x, y, size, size);

    // Convert to buffer
    const buffer = canvas.toBuffer("image/png");

    // Save as favicon
    await fs.writeFile(outputPath, buffer);

    console.log("✅ Favicon.ico created successfully");
    console.log(`📍 Saved to: ${outputPath}`);
  } catch (error) {
    console.error("❌ Error converting to ICO:", error.message);
  }
}

convertToICO();
