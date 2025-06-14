# 📱 Guía para Compartir Axon.App en Redes Sociales

## 🔗 URL Principal
`https://axon-app.github.io/Axon.app/`

## 📊 Herramientas de Validación

### Facebook / Meta
1. Ve a: https://developers.facebook.com/tools/debug/
2. Pega tu URL: `https://axon-app.github.io/Axon.app/`
3. Haz clic en "Debug"
4. Si es necesario, haz clic en "Scrape Again" para actualizar

### Twitter / X
1. Ve a: https://cards-dev.twitter.com/validator
2. Pega tu URL: `https://axon-app.github.io/Axon.app/`
3. Haz clic en "Preview card"

### LinkedIn
1. Ve a: https://www.linkedin.com/post-inspector/
2. Pega tu URL: `https://axon-app.github.io/Axon.app/`
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
