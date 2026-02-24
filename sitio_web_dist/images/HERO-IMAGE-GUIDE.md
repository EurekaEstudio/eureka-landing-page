# 🖼️ Guía de Imagen Hero - Background

## 📋 Especificaciones

### Archivo Requerido
- **Nombre**: `hero-bg.jpg`
- **Ubicación**: `/images/hero-bg.jpg`
- **Formato**: JPG o WebP
- **Tamaño**: 1920x1080px (Full HD) mínimo
- **Peso**: <500KB (optimizado)
- **Calidad**: 80% JPG compression

## 🎨 Características de la Imagen Ideal

### Contenido
✅ **Debe incluir:**
- Personas sonriendo (si es posible)
- Ambiente clínico profesional
- Colores claros y luminosos
- Enfoque en rostros felices
- Ambiente acogedor

❌ **Evitar:**
- Imágenes muy oscuras
- Demasiado ruido visual
- Procedimientos dentales invasivos
- Sangre o elementos gráficos
- Fondos muy complejos

### Composición
- **Sujeto principal**: Centro o ligeramente a la izquierda/derecha
- **Espacio para texto**: Dejar área central relativamente despejada
- **Profundidad de campo**: Desenfoque de fondo (bokeh) preferible
- **Orientación**: Landscape (horizontal)
- **Aspect ratio**: 16:9

## 🎨 Overlay Aplicado

La imagen tendrá un overlay azul automático:
```css
linear-gradient(135deg, rgba(13, 50, 118, 0.85) 0%, rgba(8, 32, 82, 0.85) 100%)
```

Esto significa:
- La imagen se verá con un filtro azul oscuro (85% de opacidad)
- Los colores originales se mezclarán con el azul
- El texto blanco se leerá perfectamente sobre ella

## 📐 Tamaños Recomendados

### Desktop
- **Ancho**: 1920px
- **Alto**: 1080px
- **Formato**: JPG progresivo o WebP

### Mobile (opcional - responsive)
- **Ancho**: 768px
- **Alto**: 1024px
- **Formato**: JPG o WebP
- **Nombre**: `hero-bg-mobile.jpg`

## 🚀 Optimización

### Herramientas Online
1. **TinyJPG**: https://tinyjpg.com/
2. **Squoosh**: https://squoosh.app/
3. **Cloudinary**: https://cloudinary.com/

### Línea de Comandos
```bash
# Reducir tamaño con ImageMagick
convert hero-original.jpg -quality 80 -strip hero-bg.jpg

# Convertir a WebP
cwebp -q 80 hero-original.jpg -o hero-bg.webp
```

## 💡 Ideas de Imágenes

### Opción 1: Personas Sonriendo
- Doctor/a con paciente feliz
- Familia sonriendo
- Persona mostrando su sonrisa después del tratamiento
- Grupo de profesionales dentales

### Opción 2: Ambiente Clínico
- Consultorio moderno y limpio
- Equipamiento dental de última generación
- Sala de espera acogedora
- Vista general de la clínica

### Opción 3: Close-up Sonrisas
- Sonrisa perfecta después de ortodoncia
- Dientes blancos y alineados
- Persona feliz mostrando sus resultados

## 📁 Bancos de Imágenes Recomendados

### Gratuitos
- **Unsplash**: https://unsplash.com/s/photos/dental-smile
- **Pexels**: https://www.pexels.com/search/dental/
- **Pixabay**: https://pixabay.com/images/search/dentist/

### Pagos (mayor calidad)
- **Shutterstock**: https://www.shutterstock.com/
- **iStock**: https://www.istockphoto.com/
- **Adobe Stock**: https://stock.adobe.com/

## 🔧 Si No Tienes Imagen Todavía

### Solución Temporal
Mientras consigues la imagen perfecta, puedes:

1. **Usar un placeholder**: Crea una imagen sólida con el color azul
2. **Usar solo gradiente**: El sitio ya funciona con gradiente (sin imagen)
3. **Buscar en bancos gratuitos**: Unsplash tiene excelentes opciones

### Código para Solo Gradiente (sin imagen)
Si prefieres NO usar imagen de fondo, cambia en `ortodoncia-style.css`:

```css
.hero {
    /* Sin imagen, solo gradiente */
    background: linear-gradient(135deg, var(--color-primary) 0%, var(--color-primary-dark) 100%);
    color: var(--white);
    min-height: 100vh;
    /* ... resto igual */
}
```

## ✅ Checklist Final

Antes de usar tu imagen:
- [ ] Tamaño correcto (1920x1080px mínimo)
- [ ] Peso optimizado (<500KB)
- [ ] Nombre correcto: `hero-bg.jpg`
- [ ] Ubicada en `/images/`
- [ ] Buena calidad visual
- [ ] Colores claros (para contraste con overlay)
- [ ] Personas sonriendo (si aplica)
- [ ] Sin marcas de agua
- [ ] Derechos de uso verificados

---

**Ejemplo de ruta completa:**
```
/Volumes/External WW/Proyectos VS Code/Landing Page Yanuy/images/hero-bg.jpg
```

Una vez colocada la imagen, recarga la página (Ctrl/Cmd + Shift + R) para ver el resultado! 🎉
