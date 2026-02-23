// ===================================================
// EUREKA ESTUDIO CREATIVO — GOOGLE APPS SCRIPT (v2 Robusta)
// Formulario de Contacto - Landing Page
// ===================================================

const CONFIG = {
  EMAIL_DESTINO: 'info@eurekaestudiocreativo.com',      // ← Tú recibes notificaciones aquí
  EMAIL_REMITENTE: 'info@eurekaestudiocreativo.com',      // ← El alias desde donde SE ENVÍAN los correos (debe estar en tu cuenta de Gmail como alias)
  NOMBRE_HOJA: 'Leads Eureka',                        // ← Nombre de la hoja en Google Sheets
  RECAPTCHA_SECRET: 'TU_SECRET_KEY_AQUI',                  // ← Secret Key de reCAPTCHA v3 (en el backend)
  SPREADSHEET_ID: SpreadsheetApp.getActiveSpreadsheet().getId()
};

function doPost(e) {
  var lock = LockService.getScriptLock();
  lock.tryLock(10000); // Evitar conflictos si varias personas envían el formulario exacto al mismo segundo

  try {
    Logger.log('--- NUEVO LEAD RECIBIDO ---');
    Logger.log('Datos raw: ' + e.postData.contents);
    const data = JSON.parse(e.postData.contents);

    // 1. RECAPTCHA
    if (data.recaptcha_token !== 'not_configured' && CONFIG.RECAPTCHA_SECRET !== 'TU_SECRET_KEY_AQUI') {
      if (!verificarRecaptcha(data.recaptcha_token)) throw new Error('Validación reCAPTCHA falló. Eres un bot.');
    }

    // 2. GUARDAR DATOS EN SHEET
    guardarEnSheet(data);

    // 3. EMAILS (try/catch independientes para que si uno falla, no dé error en el frontend ni bloquee al otro)
    try {
      enviarEmailNotificacion(data);
    } catch (err) {
      Logger.log("Error enviando email a Eureka: " + err.message);
    }

    try {
      if (data.email && data.email.trim() !== '') {
        enviarEmailConfirmacion(data);
      }
    } catch (err) {
      Logger.log("Error enviando confirmación al cliente: " + err.message);
    }

    return ContentService.createTextOutput(JSON.stringify({ success: true, message: 'Lead procesado correctamente' })).setMimeType(ContentService.MimeType.JSON);

  } catch (error) {
    Logger.log('❌ ERROR FATAL: ' + error.message);
    return ContentService.createTextOutput(JSON.stringify({ success: false, error: error.message })).setMimeType(ContentService.MimeType.JSON);
  } finally {
    lock.releaseLock();
  }
}

// ===================================================
// VERIFICAR reCAPTCHA
// ===================================================
function verificarRecaptcha(token) {
  try {
    const response = UrlFetchApp.fetch(
      'https://www.google.com/recaptcha/api/siteverify',
      { method: 'post', payload: { secret: CONFIG.RECAPTCHA_SECRET, response: token } }
    );
    const result = JSON.parse(response.getContentText());
    // Score >= 0.5 asegura que sea probablemente un humano (reCAPTCHA v3)
    return result.success && result.score >= 0.5;
  } catch (error) {
    Logger.log('Error de red validando reCAPTCHA: ' + error.message);
    return true; // En caso de fallo de red de Google, dejamos pasar para no perder leads
  }
}

// ===================================================
// GUARDAR EN GOOGLE SHEET
// ===================================================
function guardarEnSheet(data) {
  const ss = SpreadsheetApp.openById(CONFIG.SPREADSHEET_ID);

  let sheet = ss.getSheetByName(CONFIG.NOMBRE_HOJA);
  if (!sheet) {
    Logger.log('⚠️ Hoja "' + CONFIG.NOMBRE_HOJA + '" no encontrada. Usando la primera hoja.');
    sheet = ss.getSheets()[0];
  }

  if (!sheet) throw new Error('No se pudo acceder a ninguna hoja.');

  // Si la hoja está vacía, iniciamos headers
  if (sheet.getLastRow() === 0) {
    sheet.appendRow(['Fecha', 'Nombre', 'WhatsApp', 'Email', 'Plan Interés', 'Rubro', 'Fuente', 'reCAPTCHA Score']);
    sheet.getRange(1, 1, 1, 8).setFontWeight('bold').setBackground('#0a0a0a').setFontColor('#22C6EA');
  }

  sheet.appendRow([
    Utilities.formatDate(new Date(), 'America/Santiago', 'dd/MM/yyyy HH:mm:ss'),
    data.nombre || '',
    data.whatsapp || '',
    data.email || 'No proporcionado',
    data.plan || 'No especificado',
    data.rubro || 'No especificado',
    data.fuente || 'landing_formulario',
    'Validado'
  ]);
  Logger.log('✅ Datos guardados en hoja: ' + sheet.getName());
}

// ===================================================
// EMAIL DE NOTIFICACIÓN (A EUREKA)
// ===================================================
function enviarEmailNotificacion(data) {
  const planesMap = {
    'base': '🚀 Smart Landing Base — $249.990',
    'agente': '🤖 Pack Agente IA — $499.990',
    'growth': '📈 Ecosistema Growth — $999.990',
    'orientacion': '💬 Quiere orientación gratuita'
  };
  const planNombre = planesMap[data.plan] || data.plan || 'No especificado';
  const asunto = '⚡ Nuevo Lead - Eureka Landing: ' + (data.nombre || 'Sin nombre');

  const html = `
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="UTF-8">
      <style>
        body { font-family: Arial, sans-serif; background: #0a0a0a; color: #e0e0e0; margin: 0; padding: 20px; }
        .container { max-width: 600px; margin: 0 auto; background: #111; border-radius: 12px; overflow: hidden; border: 1px solid #222; }
        .header { background: linear-gradient(135deg, #0a0a0a 0%, #0d1a1f 100%); padding: 32px 30px; text-align: center; border-bottom: 1px solid #22C6EA33; }
        .header h1 { color: #22C6EA; font-size: 22px; margin: 0 0 6px; }
        .alert { background: #22C6EA15; border-left: 3px solid #22C6EA; padding: 14px; margin-bottom: 24px; font-size: 13px; color: #22C6EA; }
        .field { background: #1a1a1a; padding: 14px; margin-bottom: 12px; border-radius: 8px; border: 1px solid #2a2a2a; }
        .label { font-size: 11px; text-transform: uppercase; color: #555; margin-bottom: 4px; }
        .value { font-size: 15px; color: #e0e0e0; font-weight: 500; }
        a { color: #22C6EA; text-decoration: none; }
      </style>
    </head>
    <body>
      <div class="container">
        <div class="header">
          <h1>⚡ Nuevo Lead de Landing Page</h1>
        </div>
        <div style="padding: 30px;">
          <div class="alert">
            Contactar cuanto antes por WhatsApp
          </div>
          <div class="field"><div class="label">👤 Nombre</div><div class="value">${data.nombre}</div></div>
          <div class="field"><div class="label">📱 WhatsApp</div><div class="value"><a href="https://wa.me/${(data.whatsapp || '').replace(/\\D/g, '')}">${data.whatsapp}</a></div></div>
          <div class="field"><div class="label">📧 Email</div><div class="value">${data.email || '—'}</div></div>
          <div class="field"><div class="label">🎯 Plan</div><div class="value" style="color:#22C6EA;font-weight:bold;">${planNombre}</div></div>
          <div class="field"><div class="label">🏢 Rubro</div><div class="value">${data.rubro}</div></div>
        </div>
      </div>
    </body>
    </html>
  `;

  // USAMOS GMAILAPP Y EL ALIAS (CONFIG.EMAIL_REMITENTE)
  GmailApp.sendEmail(CONFIG.EMAIL_DESTINO, asunto, "", {
    from: CONFIG.EMAIL_REMITENTE,
    htmlBody: html,
    name: "Sistema Eureka"
  });
  Logger.log('✅ Email notificación enviado a Eureka.');
}

// ===================================================
// EMAIL DE CONFIRMACIÓN (AL PROSPECTO)
// ===================================================
function enviarEmailConfirmacion(data) {
  const planesMap = {
    'base': 'Smart Landing Base ($249.990 CLP)',
    'agente': 'Pack Agente IA ($499.990 CLP)',
    'growth': 'Ecosistema Growth ($999.990 CLP)',
    'orientacion': 'Auditoría Gratuita'
  };
  const planNombre = planesMap[data.plan] || data.plan || 'nuestros servicios';
  const asunto = '✅ Recibimos tu consulta, ' + (data.nombre || '') + ' — Eureka Estudio Creativo';

  const html = `
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="UTF-8">
      <style>
        body { font-family: Arial, sans-serif; background: #f4f4f5; margin: 0; padding: 20px; }
        .container { max-width: 600px; margin: 0 auto; background: #ffffff; border-radius: 12px; overflow: hidden; border: 1px solid #e4e4e7; }
        .header { background: linear-gradient(135deg, #000000 0%, #0a1014 100%); padding: 36px 30px; text-align: center; }
        .header h1 { color: #22C6EA; font-size: 22px; margin: 0; }
        .body { padding: 36px 30px; color: #333; line-height: 1.6; }
        .box { background: #f8f8f8; border-radius: 10px; padding: 20px; margin: 24px 0; border-left: 3px solid #22C6EA; }
        .cta { text-align: center; margin: 30px 0; }
        .cta a { background: #22C6EA; color: #000; font-weight: bold; padding: 14px 32px; border-radius: 50px; text-decoration: none; }
      </style>
    </head>
    <body>
      <div class="container">
        <div class="header">
          <!-- Logo Opcional si tienes uno alojado en web pública -->
          <h1>Eureka Estudio Creativo</h1>
        </div>
        <div class="body">
          <p>Hola <strong>${data.nombre}</strong>,</p>
          <p>Gracias por contactarnos. Ya tenemos tu consulta registrada y el equipo de Eureka te escribirá por WhatsApp a la brevedad.</p>

          <div class="box">
            <p style="margin:0 0 8px; font-size:12px; color:#666; text-transform:uppercase;">Tus datos de contacto:</p>
            <p style="margin:0 0 5px;"><strong>Plan:</strong> ${planNombre}</p>
            <p style="margin:0;"><strong>WhatsApp:</strong> ${data.whatsapp}</p>
          </div>

          <p>Si tienes alguna duda urgente, escríbenos directo:</p>

          <div class="cta">
            <a href="https://wa.me/56972865954?text=Hola%20Eureka%2C%20acabo%20de%20llenar%20el%20formulario%20y%20quería%20consultar">
              Escribir por WhatsApp
            </a>
          </div>
          
          <p style="font-size:12px; color:#999; text-align:center; border-top: 1px solid #eee; padding-top: 20px;">
            © ${new Date().getFullYear()} Eureka Estudio Creativo · Este es un correo automático.
          </p>
        </div>
      </div>
    </body>
    </html>
  `;

  // USAMOS GMAILAPP Y EL ALIAS (CONFIG.EMAIL_REMITENTE)
  GmailApp.sendEmail(data.email, asunto, "", {
    from: CONFIG.EMAIL_REMITENTE,
    htmlBody: html,
    name: "Eureka Estudio Creativo"
  });
  Logger.log('✅ Email de confirmación enviado a cliente.');
}
