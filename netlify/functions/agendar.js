const nodemailer = require('nodemailer');
const { getStore } = require('@netlify/blobs');

const NATALIA_EMAIL = 'nataliabj777@gmail.com';

function buildTransport() {
  return nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.GMAIL_USER,
      pass: process.env.GMAIL_APP_PASSWORD,
    },
  });
}

function bookingHtml(data) {
  const { nombre, telefono, consulta, fecha, hora, mensaje } = data;
  return `
    <h2 style="color:#534AB7">Nueva solicitud de cita 📅</h2>
    <table style="border-collapse:collapse;width:100%;font-family:sans-serif">
      <tr><td style="padding:8px;font-weight:bold;color:#534AB7">Paciente</td><td style="padding:8px">${nombre}</td></tr>
      <tr style="background:#f5f0e8"><td style="padding:8px;font-weight:bold;color:#534AB7">Teléfono</td><td style="padding:8px">${telefono}</td></tr>
      <tr><td style="padding:8px;font-weight:bold;color:#534AB7">Consulta</td><td style="padding:8px">${consulta}</td></tr>
      <tr style="background:#f5f0e8"><td style="padding:8px;font-weight:bold;color:#534AB7">Fecha preferida</td><td style="padding:8px">${fecha || 'No especificada'}</td></tr>
      <tr><td style="padding:8px;font-weight:bold;color:#534AB7">Hora preferida</td><td style="padding:8px">${hora || 'No especificada'}</td></tr>
      ${mensaje ? `<tr style="background:#f5f0e8"><td style="padding:8px;font-weight:bold;color:#534AB7">Mensaje</td><td style="padding:8px">${mensaje}</td></tr>` : ''}
    </table>
  `;
}

function contactHtml(data) {
  const { nombre, correo, mensaje } = data;
  return `
    <h2 style="color:#534AB7">Nueva pregunta desde la página ✉️</h2>
    <table style="border-collapse:collapse;width:100%;font-family:sans-serif">
      <tr><td style="padding:8px;font-weight:bold;color:#534AB7">Nombre</td><td style="padding:8px">${nombre}</td></tr>
      <tr style="background:#f5f0e8"><td style="padding:8px;font-weight:bold;color:#534AB7">Correo</td><td style="padding:8px">${correo}</td></tr>
      <tr><td style="padding:8px;font-weight:bold;color:#534AB7">Mensaje</td><td style="padding:8px">${mensaje}</td></tr>
    </table>
  `;
}

exports.handler = async (event) => {
  if (event.httpMethod !== 'POST') {
    return { statusCode: 405, body: 'Method Not Allowed' };
  }

  let data;
  try {
    data = JSON.parse(event.body);
  } catch {
    return { statusCode: 400, body: JSON.stringify({ error: 'Invalid JSON' }) };
  }

  const isContacto = data.tipo === 'contacto';

  // ── Guardar slot ocupado en Netlify Blobs (solo para citas) ──
  if (!isContacto && data.fecha && data.hora) {
    try {
      const store = getStore('slots');
      await store.set(`${data.fecha}-${data.hora}`, JSON.stringify({
        nombre: data.nombre,
        consulta: data.consulta,
        at: new Date().toISOString(),
      }));
    } catch (err) {
      console.error('Blobs error (non-fatal):', err.message);
    }
  }

  // ── Guardar archivo adjunto en Blobs (si lo hay) ──
  let attachments = [];
  if (!isContacto && data.fileData && data.fileName) {
    try {
      const store = getStore('archivos');
      const key = `${Date.now()}-${data.fileName}`;
      await store.set(key, Buffer.from(data.fileData, 'base64'));
      attachments = [{
        filename: data.fileName,
        content: Buffer.from(data.fileData, 'base64'),
        contentType: data.fileType || 'application/octet-stream',
      }];
    } catch (err) {
      console.error('File upload error (non-fatal):', err.message);
    }
  }

  // ── Enviar correo ──
  const subject = isContacto
    ? `Pregunta de ${data.nombre} — natalia-fisio`
    : `Nueva cita: ${data.nombre} — ${data.consulta}`;

  const html = isContacto ? contactHtml(data) : bookingHtml(data);

  try {
    const transporter = buildTransport();
    await transporter.sendMail({
      from: `"Web Natalia Fisio" <${process.env.GMAIL_USER}>`,
      to: NATALIA_EMAIL,
      replyTo: data.correo || undefined,
      subject,
      html,
      attachments,
    });
  } catch (err) {
    console.error('Email error:', err.message);
    return {
      statusCode: 500,
      body: JSON.stringify({ error: 'No se pudo enviar el correo', detail: err.message }),
    };
  }

  return {
    statusCode: 200,
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ success: true }),
  };
};