const fs = require("fs");
const path = require("path");

// Crear meta tags adicionales para WhatsApp y mejorar compatibilidad
const additionalMetaTags = `
    <!-- WhatsApp específico -->
    <meta property="og:image:type" content="image/png" />
    <meta property="og:image:width" content="1200" />
    <meta property="og:image:height" content="630" />
    
    <!-- Telegram -->
    <meta name="telegram:channel" content="@axonapp_co" />
    
    <!-- Discord -->
    <meta name="theme-color" content="#1f2937" />
    
    <!-- Apple Touch Icons adicionales -->
    <link rel="apple-touch-icon" sizes="57x57" href="/favicon-57.png" />
    <link rel="apple-touch-icon" sizes="60x60" href="/favicon-60.png" />
    <link rel="apple-touch-icon" sizes="72x72" href="/favicon-72.png" />
    <link rel="apple-touch-icon" sizes="76x76" href="/favicon-76.png" />
    <link rel="apple-touch-icon" sizes="114x114" href="/favicon-114.png" />
    <link rel="apple-touch-icon" sizes="120x120" href="/favicon-120.png" />
    <link rel="apple-touch-icon" sizes="144x144" href="/favicon-144.png" />
    <link rel="apple-touch-icon" sizes="152x152" href="/favicon-152.png" />
    <link rel="apple-touch-icon" sizes="180x180" href="/favicon-180.png" />
    
    <!-- Windows Tiles -->
    <meta name="msapplication-TileColor" content="#1f2937" />
    <meta name="msapplication-TileImage" content="/favicon-144.png" />
    
    <!-- Safari Pinned Tab -->
    <link rel="mask-icon" href="/safari-pinned-tab.svg" color="#1f2937" />`;

console.log("📝 Meta tags adicionales para redes sociales:");
console.log(additionalMetaTags);

// Crear archivo de instrucciones para compartir
const sharingInstructions = `# 📱 Guía para Compartir Axon.App en Redes Sociales

## 🔗 URL Principal
\`https://axon-app.github.io/Axon.app/\`

## 📊 Herramientas de Validación

### Facebook / Meta
1. Ve a: https://developers.facebook.com/tools/debug/
2. Pega tu URL: \`https://axon-app.github.io/Axon.app/\`
3. Haz clic en "Debug"
4. Si es necesario, haz clic en "Scrape Again" para actualizar

### Twitter / X
1. Ve a: https://cards-dev.twitter.com/validator
2. Pega tu URL: \`https://axon-app.github.io/Axon.app/\`
3. Haz clic en "Preview card"

### LinkedIn
1. Ve a: https://www.linkedin.com/post-inspector/
2. Pega tu URL: \`https://axon-app.github.io/Axon.app/\`
3. Inspecciona la vista previa

### WhatsApp
WhatsApp usa los meta tags de Open Graph automáticamente.
- La imagen debe ser mínimo 300x200px
- Máximo 8MB de tamaño
- Formatos: JPG, PNG, WEBP

### Instagram
Instagram no muestra vista previa de enlaces en posts regulares, pero sí en Stories con el sticker de enlace.

## 🎨 Imágenes Generadas

- **og-image.png**: 1200x630px para Facebook, LinkedIn, WhatsApp
- **twitter-image.png**: 1200x675px optimizada para Twitter
- **favicon.ico**: Icono del navegador
- **logo1.png**: Logo principal

## ✅ Estado Actual

✓ Meta tags Open Graph configurados
✓ Twitter Cards configurados
✓ Imágenes de preview generadas
✓ Favicon configurado
✓ Schema.org estructurado
✓ URLs canónicas
✓ Optimizado para móviles

## 🧪 Cómo Probar

1. **Desarrollo Local**: http://localhost:5173
2. **Producción**: https://axon-app.github.io/Axon.app/

### Probar en WhatsApp:
1. Abre WhatsApp Web o la app
2. Envía el enlace en un chat
3. Debe aparecer la vista previa con el logo

### Probar en Facebook:
1. Crea un post nuevo
2. Pega el enlace
3. Espera unos segundos para que cargue la vista previa

### Probar en Twitter:
1. Crea un tweet nuevo
2. Pega el enlace
3. La card debe aparecer automáticamente

## 🔧 Solución de Problemas

Si la vista previa no aparece:
1. Usa las herramientas de validación arriba
2. Algunas plataformas cachean las previews por 24-48 horas
3. Fuerza un "scrape" nuevo en las herramientas de debug
4. Verifica que las imágenes sean accesibles públicamente

## 📈 Mejores Prácticas

- **Título**: Máximo 60 caracteres
- **Descripción**: Entre 150-300 caracteres
- **Imagen**: 1200x630px es el estándar
- **URL**: Siempre usa HTTPS
- **Contenido**: Relevante y atractivo
`;

fs.writeFileSync(
  path.join(__dirname, "SOCIAL_SHARING_GUIDE.md"),
  sharingInstructions
);

console.log(
  "\n✅ Archivo SOCIAL_SHARING_GUIDE.md creado con instrucciones completas"
);
console.log("\n🚀 Todo listo para compartir en redes sociales!");
console.log("\n📋 Próximos pasos:");
console.log("1. Despliega tu sitio en GitHub Pages");
console.log("2. Usa las herramientas de validación mencionadas");
console.log("3. Comparte en tus redes sociales");
console.log("4. Opcional: Agrega los meta tags adicionales mostrados arriba");
