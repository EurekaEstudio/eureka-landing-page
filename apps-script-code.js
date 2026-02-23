// ===================================================
// EUREKA ESTUDIO CREATIVO — GOOGLE APPS SCRIPT (v2 Robusta)
// Formulario de Contacto - Landing Page
// ===================================================

const CONFIG = {
  EMAIL_DESTINO: 'info@eurekaestudiocreativo.com',  // ← Tú recibes notificaciones aquí
  NOMBRE_HOJA: 'Eureka Landing Page ads',         // ← Nombre exacto de la pestaña
  RECAPTCHA_SECRET: '6LeLlXUsAAAAADUxHJvl33mXaMqjqxAVGz7rS-bQ',
  SPREADSHEET_ID: SpreadsheetApp.getActiveSpreadsheet().getId()
};

// ===================================================
// FUNCIÓN PRINCIPAL
// ===================================================
function doPost(e) {
  var lock = LockService.getScriptLock();
  lock.tryLock(10000);

  // CORS HEADERS (Crucial para requests con application/json desde frontend separado)
  const headers = {
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Methods": "POST, GET, OPTIONS",
    "Access-Control-Allow-Headers": "Content-Type"
  };

  try {
    Logger.log('--- NUEVO LEAD RECIBIDO ---');

    // Si no hay datos (ej. un preflight request fallido que llegó como POST vacío)
    if (!e || !e.postData || !e.postData.contents) {
      throw new Error("No data received");
    }

    Logger.log('Datos raw: ' + e.postData.contents);

    // El script de Yany probablemente procesaba FormData directo o JSON. 
    // Como en nuestro React mandamos JSON, parseamos normal:
    const data = JSON.parse(e.postData.contents);

    // Bypass recaptcha si token es 'not_configured' o la clave no fue configurada
    if (data.recaptcha_token && data.recaptcha_token !== 'not_configured' && CONFIG.RECAPTCHA_SECRET !== 'TU_SECRET_KEY_AQUI') {
      if (!verificarRecaptcha(data.recaptcha_token)) throw new Error('reCAPTCHA inválido');
    }

    // Guardar datos en Sheet (obligatorio)
    guardarEnSheet(data);

    // Emails (independientes — si uno falla no bloquea el otro)
    try { enviarEmailNotificacion(data); } catch (err) { Logger.log("Error email Eureka: " + err.message); }
    try { if (data.email) enviarEmailConfirmacion(data); } catch (err) { Logger.log("Error email cliente: " + err.message); }

    // Respuesta exitosa
    const response = ContentService.createTextOutput(JSON.stringify({ success: true }))
      .setMimeType(ContentService.MimeType.JSON);

    return response;

  } catch (error) {
    Logger.log('❌ ERROR FATAL: ' + error.message);
    const errorResponse = ContentService.createTextOutput(JSON.stringify({ success: false, error: error.message }))
      .setMimeType(ContentService.MimeType.JSON);

    return errorResponse;
  } finally {
    lock.releaseLock();
  }
}

// Función obligatoria para habilitar el Preflight (OPTIONS) de CORS cuando hay 'application/json'
function doOptions(e) {
  const headers = {
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Methods": "POST, GET, OPTIONS",
    "Access-Control-Allow-Headers": "Content-Type"
  };
  return ContentService.createTextOutput("")
    .setMimeType(ContentService.MimeType.JSON);
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
    return result.success && result.score >= 0.5;
  } catch (error) {
    Logger.log('Error reCAPTCHA (red): ' + error.message);
    return true; // En error de red dejamos pasar para no perder leads
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

  // Forzar columna C (WhatsApp) como texto para que el +56 no se lea como fórmula
  sheet.getRange('C:C').setNumberFormat('@');

  // Crear headers si la hoja está vacía
  if (sheet.getLastRow() === 0) {
    sheet.appendRow(['Fecha', 'Nombre', 'WhatsApp', 'Email', 'Plan', 'Rubro', 'Fuente']);
    sheet.getRange(1, 1, 1, 7).setFontWeight('bold').setBackground('#0a0a0a').setFontColor('#22C6EA');
  }

  sheet.appendRow([
    Utilities.formatDate(new Date(), 'America/Santiago', 'dd/MM/yyyy HH:mm'),
    data.nombre || '',
    data.whatsapp || '',
    data.email || 'No proporcionado',
    data.plan || 'No especificado',
    data.rubro || 'No especificado',
    data.fuente || 'landing_formulario'
  ]);
  Logger.log('✅ Datos guardados. Hoja: ' + sheet.getName());
}

// ===================================================
// EMAIL DE NOTIFICACIÓN (A EUREKA)
// Usamos MailApp — más simple y no necesita alias configurado
// ===================================================
function enviarEmailNotificacion(data) {
  const planesMap = {
    'base': '🚀 Smart Landing Base — $249.990',
    'agente': '🤖 Pack Agente IA — $499.990',
    'growth': '📈 Ecosistema Growth — $999.990',
    'orientacion': '💬 Quiere orientación gratuita'
  };
  const planNombre = planesMap[data.plan] || data.plan || 'No especificado';
  const waLink = 'https://wa.me/' + (data.whatsapp || '').replace(/\D/g, '');

  MailApp.sendEmail({
    to: CONFIG.EMAIL_DESTINO,
    subject: '⚡ Nuevo Lead Eureka: ' + (data.nombre || 'Sin nombre'),
    htmlBody: `
      <div style="font-family:Arial,sans-serif;max-width:600px;margin:0 auto;background:#111;border-radius:12px;overflow:hidden;border:1px solid #222;">
        <div style="background:linear-gradient(135deg,#0a0a0a,#0d1a1f);padding:28px 24px;text-align:center;border-bottom:1px solid #22C6EA33;">
          <h2 style="color:#22C6EA;margin:0;">⚡ Nuevo Lead desde la Landing</h2>
        </div>
        <div style="padding:24px;">
          <div style="background:#22C6EA15;border-left:3px solid #22C6EA;padding:12px;margin-bottom:20px;font-size:13px;color:#22C6EA;">
            Contactar cuanto antes por WhatsApp
          </div>
          <table style="width:100%;border-collapse:collapse;">
            <tr><td style="padding:10px;background:#1a1a1a;border-radius:6px;margin-bottom:8px;">
              <div style="font-size:11px;color:#555;text-transform:uppercase;">👤 Nombre</div>
              <div style="font-size:15px;color:#e0e0e0;">${data.nombre || '—'}</div>
            </td></tr>
            <tr><td style="padding:8px 0;"></td></tr>
            <tr><td style="padding:10px;background:#1a1a1a;border-radius:6px;">
              <div style="font-size:11px;color:#555;text-transform:uppercase;">📱 WhatsApp</div>
              <div style="font-size:15px;"><a href="${waLink}" style="color:#22C6EA;">${data.whatsapp || '—'}</a></div>
            </td></tr>
            <tr><td style="padding:8px 0;"></td></tr>
            <tr><td style="padding:10px;background:#1a1a1a;border-radius:6px;">
              <div style="font-size:11px;color:#555;text-transform:uppercase;">📧 Email</div>
              <div style="font-size:15px;color:#e0e0e0;">${data.email || '—'}</div>
            </td></tr>
            <tr><td style="padding:8px 0;"></td></tr>
            <tr><td style="padding:10px;background:#1a1a1a;border-radius:6px;">
              <div style="font-size:11px;color:#555;text-transform:uppercase;">🎯 Plan de Interés</div>
              <div style="font-size:15px;color:#22C6EA;font-weight:bold;">${planNombre}</div>
            </td></tr>
            <tr><td style="padding:8px 0;"></td></tr>
            <tr><td style="padding:10px;background:#1a1a1a;border-radius:6px;">
              <div style="font-size:11px;color:#555;text-transform:uppercase;">🏢 Rubro</div>
              <div style="font-size:15px;color:#e0e0e0;">${data.rubro || '—'}</div>
            </td></tr>
          </table>
        </div>
        <div style="text-align:center;padding:16px;color:#333;font-size:11px;border-top:1px solid #1a1a1a;">
          © ${new Date().getFullYear()} Eureka Estudio Creativo · landing.eurekaestudiocreativo.com
        </div>
      </div>
    `
  });
  Logger.log('✅ Email de notificación enviado.');
}

// ===================================================
// EMAIL DE CONFIRMACIÓN (AL PROSPECTO)
// ===================================================
function enviarEmailConfirmacion(data) {
  if (!data.email) return;
  const planesMap = {
    'base': 'Smart Landing Base ($249.990 CLP)',
    'agente': 'Pack Agente IA ($499.990 CLP)',
    'growth': 'Ecosistema Growth ($999.990 CLP)',
    'orientacion': 'Auditoría Gratuita'
  };
  const planNombre = planesMap[data.plan] || 'nuestros servicios';

  MailApp.sendEmail({
    to: data.email,
    subject: '✅ Recibimos tu consulta, ' + (data.nombre || '') + ' — Eureka Estudio Creativo',
    htmlBody: `
      <div style="font-family:Arial,sans-serif;background:#f4f4f5;margin:0;padding:20px;">
        <div style="max-width:600px;margin:0 auto;background:#fff;border-radius:12px;overflow:hidden;border:1px solid #e4e4e7;">
          <div style="background:linear-gradient(135deg,#000,#0a1014);padding:32px 24px;text-align:center;">
            <h2 style="color:#22C6EA;margin:0;font-size:20px;">Eureka Estudio Creativo</h2>
          </div>
          <div style="padding:32px 24px;color:#333;line-height:1.6;">
            <p>Hola <strong>${data.nombre || 'allí'}</strong>,</p>
            <p>¡Ya tenemos tu consulta registrada! El equipo de Eureka te escribirá por WhatsApp a la brevedad con toda la información sobre el <strong>${planNombre}</strong>.</p>
            <div style="background:#f8f8f8;border-radius:10px;padding:20px;margin:24px 0;border-left:3px solid #22C6EA;">
              <p style="margin:0 0 6px;font-size:12px;color:#666;text-transform:uppercase;">Tu solicitud</p>
              <p style="margin:0 0 4px;"><strong>Plan:</strong> ${planNombre}</p>
              <p style="margin:0;"><strong>WhatsApp:</strong> ${data.whatsapp || '—'}</p>
            </div>
            <div style="text-align:center;margin:24px 0;">
              <a href="https://wa.me/56972865954?text=Hola%20Eureka%2C%20acabo%20de%20llenar%20el%20formulario"
                 style="background:#22C6EA;color:#000;font-weight:bold;padding:14px 32px;border-radius:50px;text-decoration:none;display:inline-block;">
                Escribir por WhatsApp
              </a>
            </div>
            <p style="font-size:12px;color:#999;text-align:center;border-top:1px solid #eee;padding-top:16px;margin:0;">
              © ${new Date().getFullYear()} Eureka Estudio Creativo · Este correo fue generado automáticamente.
            </p>
          </div>
        </div>
      </div>
    `
  });
  Logger.log('✅ Email de confirmación enviado a: ' + data.email);
}

// ===================================================
// FUNCIÓN DE TEST (ejecutar manualmente)
// ===================================================
function testScript() {
  const datosTest = {
    nombre: 'Test Usuario',
    whatsapp: '+56 9 9999 9999',
    email: 'test@ejemplo.com',
    plan: 'agente',
    rubro: 'Clínica / Salud',
    fuente: 'test_manual',
    recaptcha_token: 'not_configured'
  };
  guardarEnSheet(datosTest);
  enviarEmailNotificacion(datosTest);
  enviarEmailConfirmacion(datosTest);
  Logger.log('✅ Test completado. Revisa tu Sheet y bandeja de correo.');
}
