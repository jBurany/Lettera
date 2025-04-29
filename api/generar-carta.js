export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Método no permitido' });
  }

  const { destinatario, mensaje, estilo } = req.body;

  if (!destinatario || !mensaje) {
    return res.status(400).json({ error: 'Faltan datos necesarios' });
  }

  const prompt = `
Sos un escritor profesional de cartas emocionales. Escribí una carta única, bien redactada y emocional en español, considerando estos datos:

- Destinatario: ${destinatario}
- Estilo: ${estilo}
- Mensaje emocional: ${mensaje}

La carta debe tocar el corazón, tener un inicio directo y un cierre cálido, adaptado al estilo indicado.
`;

  try {
    const response = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${process.env.OPENAI_API_KEY}`
      },
      body: JSON.stringify({
        model: 'gpt-4-turbo',
        messages: [
          { role: 'system', content: 'Sos un escritor de cartas emocionales que redacta textos auténticos y conmovedores.' },
          { role: 'user', content: prompt }
        ],
        temperature: 0.9,
        max_tokens: 800
      })
    });

    const data = await response.json();

    if (!data.choices || !data.choices[0]) {
      return res.status(500).json({ error: 'No se recibió respuesta válida de OpenAI.' });
    }

    const carta = data.choices[0].message.content;

    res.status(200).json({ carta });

  } catch (error) {
    console.error('Error generando la carta:', error);
    res.status(500).json({ error: 'Error al conectarse con OpenAI' });
  }
}
