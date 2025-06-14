import fs from "fs";

console.log("🔍 Validando imágenes de redes sociales...\n");

// Verificar que existan todas las imágenes necesarias
const requiredImages = [
  { file: "./public/og-image.png", description: "Open Graph (Facebook, LinkedIn)" },
  { file: "./public/twitter-image.png", description: "Twitter Card" },
  { file: "./public/whatsapp-image.png", description: "WhatsApp Preview" },
  { file: "./public/logo1.png", description: "Logo principal" }
];

let allGood = true;

requiredImages.forEach(({ file, description }) => {
  if (fs.existsSync(file)) {
    const stats = fs.statSync(file);
    const sizeKB = (stats.size / 1024).toFixed(2);
    console.log(`✅ ${description}: ${file} (${sizeKB} KB)`);
  } else {
    console.log(`❌ FALTA: ${description}: ${file}`);
    allGood = false;
  }
});

console.log("\n📋 URLs para compartir y probar:");
console.log("Facebook Debugger: https://developers.facebook.com/tools/debug/");
console.log("Twitter Card Validator: https://cards-dev.twitter.com/validator");
console.log("LinkedIn Post Inspector: https://www.linkedin.com/post-inspector/");
console.log("WhatsApp: Simplemente comparte el enlace en un chat");

if (allGood) {
  console.log("\n🎉 ¡Todas las imágenes están listas!");
  console.log("🔗 URL a probar: https://axon-app.github.io/Axon.app/");
  console.log("\n💡 Tips:");
  console.log("- Las imágenes pueden tardar unos minutos en actualizarse en las redes sociales");
  console.log("- Usa los validadores de arriba para verificar que se vean correctamente");
  console.log("- El logo debería verse claro y sin pixelación en todas las plataformas");
} else {
  console.log("\n⚠️  Hay imágenes faltantes. Ejecuta los scripts de generación primero.");
}
