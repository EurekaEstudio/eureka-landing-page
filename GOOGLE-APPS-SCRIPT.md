# 📧 Google Apps Script — Formulario de Contacto Eureka

## 🎯 Objetivo
Cuando alguien llena el formulario de la landing:
1. Los datos se guardan en **Google Sheets** automáticamente
2. **Eureka recibe un email** con los datos del lead y el plan de interés
3. **El prospecto recibe un email** confirmando que recibimos su consulta

---

## 📋 PASO 1: Preparar el Google Sheet

1. Crea un nuevo Google Sheet (o usa uno existente)
2. Ponle el nombre que quieras a la pestaña — el script creará los headers automaticamente
3. **Anota el nombre de la pestaña** (por defecto el script usa `Leads Eureka`)

> ✅ No necesitas crear los headers manualmente — el script los genera en la primera ejecución.

---

## 📋 PASO 2: Crear el Apps Script

1. En tu Google Sheet: `Extensiones` → `Apps Script`
2. **Borra todo** el código que aparece por defecto
3. **Copia y pega** todo el contenido del archivo `apps-script-code.js` que está en este proyecto
4. **Edita las 2 líneas de configuración**:

```javascript
const CONFIG = {
  EMAIL_DESTINO:  'info@eurekaestudiocreativo.com',  // ✅ Ya configurado
  NOMBRE_HOJA:    'Leads Eureka',                     // ⚠️ Cambia si tu hoja tiene otro nombre
  RECAPTCHA_SECRET: 'TU_SECRET_KEY_AQUI',             // Dejar así si no usas reCAPTCHA
  ...
};
```

5. **Guarda el proyecto** (Ctrl/Cmd + S)
   - Nómbralo: `"Eureka Landing — Formulario de Contacto"`

---

## 📋 PASO 3: Probar el Script

1. En el menú desplegable del editor, selecciona la función **`testScript`**
2. Click en **▶️ Ejecutar**
3. La primera vez pedirá permisos:
   - Click en **Revisar permisos**
   - Selecciona tu cuenta de Google (`info@eurekaestudiocreativo.com`)
   - Click en **Avanzado** → **Ir a [proyecto] (no seguro)**
   - Click en **Permitir**
4. Verifica:
   - ✅ Se agregó una fila en tu Google Sheet con datos de prueba
   - ✅ Recibiste un email de notificación en `info@eurekaestudiocreativo.com`
   - ✅ Se envió un email de confirmación a `test@ejemplo.com`

---

## 📋 PASO 4: Publicar como Aplicación Web

1. Click en **Implementar** → **Nueva implementación**
2. Configuración:
   - **Tipo**: `Aplicación web`
   - **Descripción**: `Eureka Landing v1`
   - **Ejecutar como**: `Yo` (tu cuenta Google)
   - **Quién tiene acceso**: `Cualquier persona`
3. Click en **Implementar**
4. **⚠️ COPIA LA URL** que aparece — se ve así:
   ```
   https://script.google.com/macros/s/AKfycby.../exec
   ```

---

## 📋 PASO 5: Conectar con la Landing Page

1. Abre el archivo `.env` en la raíz del proyecto (créalo si no existe):
   ```
   .env
   ```
2. Agrega la URL del script:
   ```env
   VITE_FORM_ENDPOINT=https://script.google.com/macros/s/TU_URL_AQUI/exec
   ```
3. Reinicia el servidor de desarrollo con `npm run dev`

> A partir de ese momento, cada vez que alguien envíe el formulario, el script recibirá los datos y ejecutará todo el flujo automáticamente.

---

## 📊 Datos que se guardan en el Sheet

| Columna | Dato | Ejemplo |
|---------|------|---------|
| A | Fecha | `23/02/2026 11:45:00` |
| B | Nombre | `Carlos González` |
| C | WhatsApp | `+56 9 9999 9999` |
| D | Email | `carlos@empresa.cl` |
| E | Plan de Interés | `Pack Agente IA — $499.990` |
| F | Rubro | `Clínica / Salud` |
| G | Fuente | `landing_formulario` |

---

## 📧 Emails configurados

### Email 1 → A Eureka (notificación de lead)
- **Para**: `info@eurekaestudiocreativo.com`
- **Asunto**: `⚡ Nuevo Lead - Eureka Landing: [Nombre]`
- **Contenido**: Todos los datos del formulario, plan elegido, link clickeable al WhatsApp del prospecto
- **Diseño**: HTML con branding dark/cyan de Eureka

### Email 2 → Al prospecto (confirmación automática)
- **Para**: El email que dejó en el formulario
- **Asunto**: `✅ Recibimos tu consulta, [Nombre] — Eureka Estudio Creativo`
- **Contenido**: Confirmación de recepción, datos del plan elegido, botón para escribir por WhatsApp
- **Diseño**: HTML profesional con colores Eureka

---

## 🚨 Troubleshooting

### El formulario envía pero no llegan datos al Sheet
- Verifica que la URL en `.env` es correcta y no tiene espacios
- Verifica que la implementación en Apps Script esté activa (no borrada)
- Revisa `Ver → Ejecuciones` en Apps Script para ver los logs

### No llegan emails
- Revisa la carpeta de Spam
- Verifica que el email en `CONFIG.EMAIL_DESTINO` esté bien escrito
- Revisa los logs de Apps Script: `Ver → Registros`

### Error CORS en desarrollo local
- Es normal en `localhost`. El formulario funciona igual — el error en consola no afecta el envío
- Verifica recibiendo el email de notificación

### "No se encontró la hoja"
- El nombre de la hoja en el Sheet debe coincidir EXACTAMENTE con `CONFIG.NOMBRE_HOJA`
- Respeta mayúsculas y tildes: `Leads Eureka`

---

## ✅ Checklist de activación

- [ ] Google Sheet creado
- [ ] `apps-script-code.js` pegado en Apps Script
- [ ] Email `EMAIL_DESTINO` configurado
- [ ] Script probado con `testScript()` y funcionando
- [ ] Script publicado como Aplicación Web
- [ ] URL copiada en `.env` como `VITE_FORM_ENDPOINT`
- [ ] Servidor reiniciado con `npm run dev`
- [ ] Formulario probado end-to-end: datos en Sheet + emails recibidos

---

## 🔒 Seguridad

- El script no expone ninguna clave en el frontend
- La URL del webhook es segura (solo acepta POST)
- reCAPTCHA v3 disponible si se desea activar (opcional)
- No se almacena ningún dato sensible en el código fuente

---

**¿Necesitas soporte?** Revisa los logs en Apps Script: `Ver → Ejecuciones`
