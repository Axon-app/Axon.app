const fs = require("fs");
const path = require("path");
const toIco = require("to-ico");

async function convertPngToIco() {
  try {
    console.log("🔄 Convirtiendo PNG a ICO..."); // Leer el archivo PNG con fondo blanco
    const pngPath = path.join(__dirname, "public", "favicon-final.png");
    const icoPath = path.join(__dirname, "public", "favicon.ico");

    console.log("📂 Origen:", pngPath);
    console.log("📂 Destino:", icoPath);

    if (!fs.existsSync(pngPath)) {
      throw new Error("No se encontró el archivo favicon-final.png");
    }

    // Leer el PNG
    const pngBuffer = fs.readFileSync(pngPath);

    // Convertir a ICO (múltiples tamaños)
    const icoBuffer = await toIco([pngBuffer], {
      resize: true,
      sizes: [16, 24, 32, 48, 64],
    });

    // Hacer backup del favicon actual
    const backupPath = path.join(__dirname, "public", "favicon-backup.ico");
    if (fs.existsSync(icoPath)) {
      fs.copyFileSync(icoPath, backupPath);
      console.log("💾 Backup creado:", backupPath);
    }

    // Escribir el nuevo favicon
    fs.writeFileSync(icoPath, icoBuffer);

    console.log("✅ Favicon.ico actualizado exitosamente!");
    console.log(
      "🎯 El favicon ahora tiene fondo blanco para mejor visibilidad"
    );
    console.log("");
    console.log("🔍 VERIFICACIÓN:");
    console.log("1. Abre el navegador y ve a tu sitio");
    console.log("2. Verifica que el favicon se vea claro en la pestaña");
    console.log("3. Verifica que se vea bien en la barra de tareas");
    console.log("");
    console.log("📁 Archivos creados/modificados:");
    console.log("- public/favicon.ico (actualizado)");
    console.log("- public/favicon-backup.ico (backup del original)");
    console.log("- public/favicon-final.png (PNG fuente)");
  } catch (error) {
    console.error("❌ Error al convertir PNG a ICO:", error.message);
    console.log("");
    console.log("💡 SOLUCIÓN MANUAL:");
    console.log("1. Ve a: https://favicon.io/favicon-converter/");
    console.log("2. Sube el archivo public/favicon-final.png");
    console.log("3. Descarga el favicon.ico generado");
    console.log("4. Reemplaza public/favicon.ico manualmente");
  }
}

convertPngToIco();
