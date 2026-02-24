# 📸 Imágenes - Clínica Dental Yany

## 📋 Imágenes Requeridas

Coloca todas las imágenes optimizadas en esta carpeta.

### Logo
- `logo.png` - Logo de Clínica Dental Yany (fondo blanco, 300x100px)
- `google-logo.png` - Logo de Google para ratings (80x30px)

### Tratamientos
- `brackets-metalicos.jpg` - Foto de brackets metálicos (800x600px)
- `brackets-esteticos.jpg` - Foto de brackets estéticos/zafiro (800x600px)
- `invisalign.jpg` - Foto de alineadores Invisalign (800x600px)

### Antes/Después (4 casos)
- `antes-1.jpg` - Caso 1 antes (600x400px)
- `despues-1.jpg` - Caso 1 después (600x400px)
- `antes-2.jpg` - Caso 2 antes (600x400px)
- `despues-2.jpg` - Caso 2 después (600x400px)
- `antes-3.jpg` - Caso 3 antes (600x400px)
- `despues-3.jpg` - Caso 3 después (600x400px)
- `antes-4.jpg` - Caso 4 antes (600x400px)
- `despues-4.jpg` - Caso 4 después (600x400px)

### Redes Sociales
- `og-image.jpg` - Open Graph image para compartir (1200x630px)

## 🎨 Especificaciones

### Formatos
- **Preferido**: WebP (mejor compresión)
- **Fallback**: JPG/PNG

### Tamaños Máximos
- Hero images: <300KB
- Tratamientos: <100KB
- Antes/después: <80KB por imagen
- OG image: <200KB

### Optimización

```bash
# Convertir a WebP
cwebp -q 80 input.jpg -o output.webp

# Reducir tamaño JPG
convert input.jpg -quality 80 -strip output.jpg
```

### Online Tools
- TinyPNG: https://tinypng.com/
- Squoosh: https://squoosh.app/
- Cloudinary: https://cloudinary.com/

## 📦 Estructura Actual

```
images/
├── README.md (este archivo)
├── logo.png
├── google-logo.png
├── brackets-metalicos.jpg
├── brackets-esteticos.jpg
├── invisalign.jpg
├── antes-1.jpg
├── despues-1.jpg
├── antes-2.jpg
├── despues-2.jpg
├── antes-3.jpg
├── despues-3.jpg
├── antes-4.jpg
├── despues-4.jpg
└── og-image.jpg
```

## ✅ Checklist

- [ ] Logo de Yany descargado
- [ ] Logo de Google descargado
- [ ] 3 imágenes de tratamientos
- [ ] 8 imágenes antes/después (4 casos x 2)
- [ ] OG image para redes sociales
- [ ] Todas las imágenes optimizadas
- [ ] Formatos WebP generados (opcional)
- [ ] Todas las imágenes <500KB cada una

## 🚨 Importante

- **NO** subir imágenes con marcas de agua
- **NO** usar imágenes de stock muy genéricas
- Preferir **fotos reales** de pacientes (con permiso)
- Mantener **consistencia visual** en todas las fotos
- Verificar **derechos de uso** de todas las imágenes
