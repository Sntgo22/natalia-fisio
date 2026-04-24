const { getStore } = require('@netlify/blobs');

exports.handler = async (event) => {
  const date = event.queryStringParameters?.date;

  if (!date || !/^\d{4}-\d{2}-\d{2}$/.test(date)) {
    return {
      statusCode: 400,
      body: JSON.stringify({ error: 'Parámetro date inválido (esperado YYYY-MM-DD)' }),
    };
  }

  try {
    const store = getStore('slots');
    const { blobs } = await store.list({ prefix: `${date}-` });
    const taken = blobs.map(b => b.key.replace(`${date}-`, ''));

    return {
      statusCode: 200,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ date, taken }),
    };
  } catch (err) {
    console.error('Slots error:', err.message);
    return {
      statusCode: 500,
      body: JSON.stringify({ error: 'Error consultando disponibilidad' }),
    };
  }
};