const { exec } = require("child_process");
const path = require("path");

console.log("🚀 Abriendo herramientas de validación para redes sociales...\n");

const validationUrls = [
  {
    name: "Facebook Debugger",
    url: "https://developers.facebook.com/tools/debug/",
    description: "Para probar cómo se ve en Facebook, WhatsApp, Messenger",
  },
  {
    name: "Twitter Card Validator",
    url: "https://cards-dev.twitter.com/validator",
    description: "Para probar cómo se ve en Twitter/X",
  },
  {
    name: "LinkedIn Post Inspector",
    url: "https://www.linkedin.com/post-inspector/",
    description: "Para probar cómo se ve en LinkedIn",
  },
  {
    name: "Google Rich Results Test",
    url: "https://search.google.com/test/rich-results",
    description: "Para probar el markup estructurado",
  },
];

console.log("📝 Instrucciones rápidas:");
console.log("1. Se abrirán las herramientas de validación en tu navegador");
console.log(
  "2. En cada una, pega tu URL: https://axon-app.github.io/Axon.app/"
);
console.log('3. Haz clic en "Debug", "Preview" o "Test"');
console.log("4. Verifica que aparezca tu logo y descripción\n");

// Función para abrir URLs
function openUrl(url) {
  const command =
    process.platform === "win32"
      ? "start"
      : process.platform === "darwin"
      ? "open"
      : "xdg-open";

  exec(`${command} "${url}"`, (error) => {
    if (error) {
      console.log(`❌ Error abriendo ${url}: ${error.message}`);
    }
  });
}

// Abrir herramientas con retraso para no saturar
validationUrls.forEach((tool, index) => {
  setTimeout(() => {
    console.log(`🔗 Abriendo: ${tool.name}`);
    console.log(`   ${tool.description}`);
    console.log(`   URL: ${tool.url}\n`);
    openUrl(tool.url);
  }, index * 2000); // 2 segundos entre cada una
});

console.log("⏳ Esperando 2 segundos entre cada herramienta...");

// Mensaje final después de abrir todas
setTimeout(() => {
  console.log("\n✅ Todas las herramientas de validación abiertas!");
  console.log("\n📱 Para probar en aplicaciones móviles:");
  console.log("• WhatsApp: Envía el enlace en cualquier chat");
  console.log("• Telegram: Envía el enlace en cualquier chat");
  console.log("• Instagram: Usa el sticker de enlace en Stories");
  console.log("• Facebook: Crea un post con el enlace");
  console.log("• Twitter: Escribe un tweet con el enlace");
  console.log("• LinkedIn: Crea un post con el enlace");

  console.log("\n🎯 URL a probar: https://axon-app.github.io/Axon.app/");
  console.log(
    "\n🏆 Tu sitio está listo para compartir en todas las redes sociales!"
  );
}, validationUrls.length * 2000 + 1000);
