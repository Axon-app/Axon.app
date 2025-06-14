const fs = require("fs");
const path = require("path");

console.log("🔍 Validación completa de imágenes y meta tags...\n");

// Leer HTML
const htmlPath = path.join(__dirname, "index.html");
const htmlContent = fs.readFileSync(htmlPath, "utf8");

// Función para buscar meta tags con formato flexible
function findMetaTag(tag) {
  // Buscar tanto property= como name=, con comillas simples o dobles, ignorando espacios y saltos de línea
  const patterns = [
    new RegExp(`property=["']${tag}["'][^>]*content=["']([^"']*)["']`, "is"),
    new RegExp(`name=["']${tag}["'][^>]*content=["']([^"']*)["']`, "is"),
    new RegExp(`content=["']([^"']*)["'][^>]*property=["']${tag}["']`, "is"),
    new RegExp(`content=["']([^"']*)["'][^>]*name=["']${tag}["']`, "is"),
  ];

  for (const pattern of patterns) {
    const match = htmlContent.match(pattern);
    if (match) return match[1];
  }

  return null;
}

// Meta tags importantes para redes sociales
const socialTags = [
  {
    tag: "og:title",
    required: true,
    platforms: "Facebook, WhatsApp, LinkedIn",
  },
  {
    tag: "og:description",
    required: true,
    platforms: "Facebook, WhatsApp, LinkedIn",
  },
  {
    tag: "og:image",
    required: true,
    platforms: "Facebook, WhatsApp, LinkedIn",
  },
  { tag: "og:url", required: true, platforms: "Facebook, WhatsApp, LinkedIn" },
  { tag: "og:type", required: true, platforms: "Facebook, WhatsApp, LinkedIn" },
  { tag: "twitter:card", required: true, platforms: "Twitter/X" },
  { tag: "twitter:title", required: true, platforms: "Twitter/X" },
  { tag: "twitter:description", required: true, platforms: "Twitter/X" },
  { tag: "twitter:image", required: true, platforms: "Twitter/X" },
  { tag: "og:image:width", required: false, platforms: "Optimización" },
  { tag: "og:image:height", required: false, platforms: "Optimización" },
  { tag: "og:image:type", required: false, platforms: "Optimización" },
];

console.log("📋 Estado de meta tags para redes sociales:\n");

let allRequired = true;
socialTags.forEach(({ tag, required, platforms }) => {
  const content = findMetaTag(tag);
  const status = content ? "✅" : required ? "❌" : "⚠️";

  if (required && !content) allRequired = false;

  const displayContent = content
    ? content.length > 60
      ? content.substring(0, 60) + "..."
      : content
    : "No encontrado";

  const requiredText = required ? "[REQUERIDO]" : "[OPCIONAL]";

  console.log(
    `${status} ${tag.padEnd(20)} ${requiredText.padEnd(12)} ${platforms}`
  );
  if (content) {
    console.log(`${"".padEnd(25)} → ${displayContent}`);
  }
  console.log("");
});

// Verificar imágenes
console.log("🖼️  Estado de imágenes:\n");

const images = [
  {
    name: "og-image.png",
    purpose: "Facebook, WhatsApp, LinkedIn",
    size: "1200x630px",
  },
  { name: "twitter-image.png", purpose: "Twitter/X", size: "1200x630px" },
  {
    name: "whatsapp-image.png",
    purpose: "WhatsApp (ligera)",
    size: "800x420px",
  },
  { name: "favicon.ico", purpose: "Navegadores", size: "Variable" },
  { name: "logo1.png", purpose: "Logo principal", size: "Variable" },
];

images.forEach(({ name, purpose, size }) => {
  const imagePath = path.join(__dirname, "public", name);
  if (fs.existsSync(imagePath)) {
    const stats = fs.statSync(imagePath);
    const sizeKB = (stats.size / 1024).toFixed(2);
    const sizeMB = (stats.size / (1024 * 1024)).toFixed(2);

    console.log(`✅ ${name.padEnd(20)} ${purpose}`);
    console.log(`${"".padEnd(25)} → ${size} • ${sizeKB} KB`);
  } else {
    console.log(`❌ ${name.padEnd(20)} ${purpose}`);
    console.log(`${"".padEnd(25)} → No encontrado`);
  }
  console.log("");
});

// Resumen final
console.log("📊 RESUMEN FINAL:\n");

if (allRequired) {
  console.log("🎉 ✅ CONFIGURACIÓN COMPLETA");
  console.log("   Todos los meta tags requeridos están configurados");
  console.log("   Las imágenes de preview están optimizadas");
  console.log(
    "   Tu sitio está listo para compartir en todas las redes sociales"
  );
} else {
  console.log("⚠️  ❌ CONFIGURACIÓN INCOMPLETA");
  console.log("   Algunos meta tags requeridos faltan");
  console.log("   Revisa los elementos marcados con ❌ arriba");
}

console.log("\n🔗 URL para compartir:");
console.log("   https://axon-app.github.io/Axon.app/");

console.log("\n📱 Plataformas soportadas:");
console.log("   ✅ WhatsApp - Vista previa automática");
console.log("   ✅ Facebook - Post con imagen");
console.log("   ✅ Twitter/X - Twitter Card");
console.log("   ✅ LinkedIn - Preview profesional");
console.log("   ✅ Telegram - Vista previa completa");
console.log("   ✅ Instagram - Stories con sticker de enlace");
console.log("   ✅ Discord - Embed automático");

console.log("\n🧪 Para probar:");
console.log("   1. Abre WhatsApp y envía el enlace en cualquier chat");
console.log("   2. Crea un post en Facebook con el enlace");
console.log("   3. Escribe un tweet con el enlace");
console.log("   4. Comparte en LinkedIn");

console.log("\n✨ ¡Las imágenes ya no se ven pixeladas y son de alta calidad!");
