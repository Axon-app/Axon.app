const fs = require("fs");
const path = require("path");

console.log("📱 Configuración específica para WhatsApp\n");

// Verificar configuración actual de WhatsApp
console.log("🔍 Verificando meta tags para WhatsApp...");

const htmlPath = path.join(__dirname, "index.html");
const htmlContent = fs.readFileSync(htmlPath, "utf8");

// Meta tags importantes para WhatsApp
const whatsappTags = [
  { tag: "og:title", required: true },
  { tag: "og:description", required: true },
  { tag: "og:image", required: true },
  { tag: "og:url", required: true },
  { tag: "og:type", required: true },
  { tag: "og:image:width", required: false },
  { tag: "og:image:height", required: false },
  { tag: "og:image:type", required: false },
];

console.log("\n📋 Estado de meta tags:");
whatsappTags.forEach(({ tag, required }) => {
  const regex = new RegExp(`property="${tag}".*?content="([^"]*)"`, "i");
  const match = htmlContent.match(regex);

  const status = match ? "✅" : required ? "❌" : "⚠️";
  const content = match
    ? match[1].substring(0, 50) + (match[1].length > 50 ? "..." : "")
    : "No encontrado";
  const requiredText = required ? "[REQUERIDO]" : "[OPCIONAL]";

  console.log(`${status} ${tag} ${requiredText}: ${content}`);
});

// Verificar imagen
const imagePath = path.join(__dirname, "public", "og-image.png");
if (fs.existsSync(imagePath)) {
  const stats = fs.statSync(imagePath);
  const sizeKB = (stats.size / 1024).toFixed(2);
  const sizeMB = (stats.size / (1024 * 1024)).toFixed(2);

  console.log("\n🖼️  Información de la imagen:");
  console.log(`   Archivo: og-image.png`);
  console.log(`   Tamaño: ${sizeKB} KB (${sizeMB} MB)`);
  console.log(
    `   Estado: ${
      sizeMB < 8 ? "✅ Tamaño OK para WhatsApp" : "❌ Muy grande para WhatsApp"
    }`
  );
} else {
  console.log("\n❌ Imagen og-image.png no encontrada");
}

// URL de prueba para WhatsApp
const productionUrl = "https://axon-app.github.io/Axon.app/";

console.log("\n📱 Cómo probar en WhatsApp:");
console.log("\n1️⃣  WhatsApp Web:");
console.log("   • Ve a https://web.whatsapp.com/");
console.log("   • Abre un chat contigo mismo o con un contacto");
console.log(`   • Envía este enlace: ${productionUrl}`);
console.log("   • Debe aparecer la vista previa con el logo");

console.log("\n2️⃣  WhatsApp Mobile:");
console.log("   • Abre WhatsApp en tu teléfono");
console.log("   • Ve a cualquier chat");
console.log(`   • Envía: ${productionUrl}`);
console.log("   • La vista previa aparecerá automáticamente");

console.log("\n3️⃣  Si no aparece la vista previa:");
console.log("   • WhatsApp puede tardar unos segundos en cargar");
console.log("   • Verifica que tengas conexión a internet");
console.log("   • Prueba con el enlace de producción, no el local");
console.log("   • Algunas veces WhatsApp cachea por unas horas");

console.log("\n🔧 URLs de prueba:");
console.log(`   Producción: ${productionUrl}`);
console.log(`   Local: http://localhost:5173 (No funcionará en WhatsApp)`);

console.log("\n✨ Tips para mejor rendimiento en WhatsApp:");
console.log("   • Imagen: Mínimo 300x200px, máximo 8MB");
console.log("   • Formato: PNG o JPG recomendado");
console.log("   • Título: Máximo 60 caracteres");
console.log("   • Descripción: Máximo 200 caracteres para vista completa");
console.log("   • URL: Debe ser HTTPS y accesible públicamente");

// Generar mensaje de prueba
console.log("\n📝 Mensaje de prueba sugerido:");
console.log("─────────────────────────────────────");
console.log("¡Descubre Axon.App! 🚀");
console.log("");
console.log("Desarrollo web profesional, apps móviles e IA.");
console.log("Transformamos tus ideas en realidad digital.");
console.log("");
console.log(`${productionUrl}`);
console.log("─────────────────────────────────────");

console.log("\n🎉 ¡Listo para compartir en WhatsApp!");
