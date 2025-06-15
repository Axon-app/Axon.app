#!/usr/bin/env node

const fs = require("fs").promises;
const path = require("path");

async function fixLogoImages() {
  console.log("🔧 Fixing logo images...");

  const publicDir = path.join(__dirname, "public");
  const assetsDir = path.join(__dirname, "src", "assets");

  // Check if logo files exist
  const logoFiles = [
    { src: path.join(publicDir, "logo1.png"), name: "logo1.png (public)" },
    { src: path.join(publicDir, "logo231.png"), name: "logo231.png (public)" },
    { src: path.join(assetsDir, "logo1.png"), name: "logo1.png (assets)" },
    { src: path.join(assetsDir, "logo231.png"), name: "logo231.png (assets)" },
  ];

  console.log("\n📋 Checking logo files:");

  for (const logo of logoFiles) {
    try {
      const stats = await fs.stat(logo.src);
      const sizeKB = Math.round(stats.size / 1024);
      console.log(`✅ ${logo.name}: ${sizeKB}KB`);
    } catch (error) {
      console.log(`❌ ${logo.name}: Missing`);
    }
  }

  // Copy logos from public to assets if needed
  try {
    await fs.mkdir(assetsDir, { recursive: true });

    const publicLogo1 = path.join(publicDir, "logo1.png");
    const assetsLogo1 = path.join(assetsDir, "logo1.png");

    try {
      await fs.access(publicLogo1);
      await fs.copyFile(publicLogo1, assetsLogo1);
      console.log("✅ Copied logo1.png to assets directory");
    } catch (error) {
      console.log("⚠️ logo1.png not found in public directory");
    }

    const publicLogo231 = path.join(publicDir, "logo231.png");
    const assetsLogo231 = path.join(assetsDir, "logo231.png");

    try {
      await fs.access(publicLogo231);
      await fs.copyFile(publicLogo231, assetsLogo231);
      console.log("✅ Copied logo231.png to assets directory");
    } catch (error) {
      console.log("⚠️ logo231.png not found in public directory");
    }
  } catch (error) {
    console.error("❌ Error fixing logo images:", error.message);
  }

  console.log("\n🎉 Logo image check complete!");
}

fixLogoImages();
