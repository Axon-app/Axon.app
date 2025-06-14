const fs = require("fs");
const path = require("path");

// Colores para terminal
const colors = {
  reset: "\x1b[0m",
  bright: "\x1b[1m",
  green: "\x1b[32m",
  red: "\x1b[31m",
  yellow: "\x1b[33m",
  blue: "\x1b[34m",
  cyan: "\x1b[36m",
};

console.log(
  `${colors.cyan}${colors.bright}🔍 Validando configuración de redes sociales...${colors.reset}\n`
);

// Verificar archivos requeridos
const requiredFiles = [
  "public/og-image.png",
  "public/twitter-image.png",
  "public/logo1.png",
  "public/favicon.ico",
  "public/favicon.png",
  "index.html",
];

console.log(`${colors.blue}📁 Verificando archivos requeridos:${colors.reset}`);
requiredFiles.forEach((file) => {
  const filePath = path.join(__dirname, file);
  if (fs.existsSync(filePath)) {
    const stats = fs.statSync(filePath);
    const sizeKB = (stats.size / 1024).toFixed(2);
    console.log(`${colors.green}✓${colors.reset} ${file} (${sizeKB} KB)`);
  } else {
    console.log(
      `${colors.red}✗${colors.reset} ${file} - ${colors.red}NO ENCONTRADO${colors.reset}`
    );
  }
});

// Leer y validar meta tags en index.html
console.log(`\n${colors.blue}🏷️  Verificando meta tags:${colors.reset}`);
try {
  const htmlContent = fs.readFileSync(
    path.join(__dirname, "index.html"),
    "utf8"
  );

  const metaTags = [
    { tag: "og:title", description: "Open Graph Title" },
    { tag: "og:description", description: "Open Graph Description" },
    { tag: "og:image", description: "Open Graph Image" },
    { tag: "og:url", description: "Open Graph URL" },
    { tag: "twitter:card", description: "Twitter Card Type" },
    { tag: "twitter:image", description: "Twitter Image" },
    { tag: "twitter:title", description: "Twitter Title" },
    { tag: "twitter:description", description: "Twitter Description" },
  ];

  metaTags.forEach(({ tag, description }) => {
    const regex = new RegExp(
      `(property|name)="${tag}".*?content="([^"]*)"`,
      "i"
    );
    const match = htmlContent.match(regex);

    if (match) {
      const content = match[2];
      console.log(
        `${colors.green}✓${colors.reset} ${description}: ${
          colors.cyan
        }${content.substring(0, 60)}${content.length > 60 ? "..." : ""}${
          colors.reset
        }`
      );
    } else {
      console.log(
        `${colors.red}✗${colors.reset} ${description} - ${colors.red}NO ENCONTRADO${colors.reset}`
      );
    }
  });
} catch (error) {
  console.log(
    `${colors.red}✗ Error leyendo index.html: ${error.message}${colors.reset}`
  );
}

// URLs para probar el compartir
console.log(
  `\n${colors.blue}🔗 URLs para probar compartir en redes sociales:${colors.reset}`
);
const testUrls = [
  "https://developers.facebook.com/tools/debug/",
  "https://cards-dev.twitter.com/validator",
  "https://www.linkedin.com/post-inspector/",
  "https://search.google.com/test/rich-results",
];

console.log(
  `${colors.yellow}📝 Para probar cómo se ve tu sitio al compartir, usa estas herramientas:${colors.reset}`
);
testUrls.forEach((url, index) => {
  const platforms = [
    "Facebook Debugger",
    "Twitter Card Validator",
    "LinkedIn Post Inspector",
    "Google Rich Results Test",
  ];
  console.log(
    `${colors.cyan}${index + 1}.${colors.reset} ${platforms[index]}: ${url}`
  );
});

console.log(
  `\n${colors.green}${colors.bright}✨ Configuración de redes sociales completada!${colors.reset}`
);
console.log(
  `${colors.yellow}💡 Usa tu URL de producción (https://axon-app.github.io/Axon.app/) en las herramientas de validación.${colors.reset}`
);
