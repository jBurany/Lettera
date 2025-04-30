export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Método no permitido' });
  }

  const {
    tipoCarta,
    plan,
    destinatario,
    mensaje,
    estilo,
    entrega,
    firmaTipo,
    firmaPersonalizada
  } = req.body;

  // Validación básica
  if (!destinatario || !mensaje || !tipoCarta || !plan) {
    return res.status(400).json({ error: 'Faltan datos necesarios' });
  }

  // Armado del prompt para la IA
  const prompt = `
Sos un escritor profesional de cartas emocionales. Necesito que redactes una carta del tipo "${tipoCarta}" con un estilo "${estilo || 'romántico'}", para una persona llamada "${destinatario}".

El contenido principal que el cliente quiere transmitir es:
"${mensaje}"

El cliente eligió el plan "${plan}" (hasta ${plan === 'basico' ? 200 : plan === 'intermedio' ? 350 : 500} palabras).

La carta debe ser coherente con este nivel, emocionalmente auténtica y adaptada al contexto.

Firma:
- Tipo de firma: ${firmaTipo}
- Texto de firma personalizada: ${firmaPersonalizada || 'No especificada'}

Modo de entrega: ${entrega}

Redactá la carta de forma natural, profunda, y emocional, terminando con una despedida cálida. Si es anónima, evitá cualquier mención de nombre propio en la firma. Si tiene firma personalizada, usala al final.
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
          { role: 'system', content: 'Sos un escritor sensible y profesional de cartas emocionales.' },
          { role: 'user', content: prompt }
        ],
        temperature: 0.9,
        max_tokens: 1000
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
