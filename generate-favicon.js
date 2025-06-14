import fs from "fs";
import { createCanvas } from "canvas";

// Crear canvas de 64x64
const canvas = createCanvas(64, 64);
const ctx = canvas.getContext("2d");

console.log("Generando favicon mejorado para Axon.App...");

// Crear fondo blanco con gradiente suave
const bgGradient = ctx.createRadialGradient(32, 32, 0, 32, 32, 45);
bgGradient.addColorStop(0, "#ffffff"); // Blanco puro en el centro
bgGradient.addColorStop(0.6, "#f8fafc"); // Blanco muy suave
bgGradient.addColorStop(1, "#e2e8f0"); // Gris muy claro en los bordes

ctx.fillStyle = bgGradient;
ctx.fillRect(0, 0, 64, 64);

// Agregar efecto de luz radiante desde el centro
const lightGradient = ctx.createRadialGradient(32, 32, 0, 32, 32, 25);
lightGradient.addColorStop(0, "rgba(6, 214, 160, 0.15)"); // Verde suave en el centro
lightGradient.addColorStop(0.5, "rgba(6, 214, 160, 0.08)");
lightGradient.addColorStop(1, "rgba(6, 214, 160, 0)");

ctx.fillStyle = lightGradient;
ctx.fillRect(0, 0, 64, 64);

// Agregar segundo efecto de luz más concentrado
const innerLight = ctx.createRadialGradient(32, 32, 0, 32, 32, 15);
innerLight.addColorStop(0, "rgba(255, 255, 255, 0.4)");
innerLight.addColorStop(1, "rgba(255, 255, 255, 0)");

ctx.fillStyle = innerLight;
ctx.fillRect(0, 0, 64, 64);

// Agregar borde sutil para definición
ctx.strokeStyle = "rgba(148, 163, 184, 0.3)";
ctx.lineWidth = 1;
ctx.strokeRect(0.5, 0.5, 63, 63);

// Configurar el texto "A" principal
ctx.font = "bold 42px Arial";
ctx.textAlign = "center";
ctx.textBaseline = "middle";

// Crear gradiente para el texto
const textGradient = ctx.createLinearGradient(0, 20, 0, 44);
textGradient.addColorStop(0, "#06d6a0"); // Verde cyan brillante
textGradient.addColorStop(0.5, "#059669"); // Verde medio
textGradient.addColorStop(1, "#047857"); // Verde más oscuro

// Aplicar sombra brillante al texto
ctx.shadowColor = "rgba(6, 214, 160, 0.6)";
ctx.shadowBlur = 12;
ctx.shadowOffsetX = 0;
ctx.shadowOffsetY = 0;

ctx.fillStyle = textGradient;
ctx.fillText("A", 32, 32);

// Resetear sombra para el punto
ctx.shadowBlur = 0;

// Agregar punto distintivo para ".App"
const dotGradient = ctx.createRadialGradient(48, 48, 0, 48, 48, 4);
dotGradient.addColorStop(0, "#10b981"); // Verde brillante
dotGradient.addColorStop(1, "#047857"); // Verde más oscuro

ctx.fillStyle = dotGradient;
ctx.beginPath();
ctx.arc(48, 48, 3.5, 0, Math.PI * 2);
ctx.fill();

// Agregar brillo al punto
ctx.fillStyle = "rgba(255, 255, 255, 0.7)";
ctx.beginPath();
ctx.arc(47, 47, 1.5, 0, Math.PI * 2);
ctx.fill();

// Guardar como PNG
const buffer = canvas.toBuffer("image/png");
fs.writeFileSync("./public/favicon.png", buffer);

console.log("✅ Favicon generado exitosamente como public/favicon.png");
console.log("📏 Tamaño: 64x64 pixels");
console.log("🎨 Características:");
console.log("   - Fondo blanco con gradiente suave");
console.log("   - Efectos de luz radiante");
console.log('   - Logo "A" con gradiente verde');
console.log('   - Punto distintivo para ".App"');
console.log("   - Optimizado para visibilidad en barra de tareas");
