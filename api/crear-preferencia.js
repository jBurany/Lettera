// api/crear-preferencia.js
export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Método no permitido' });
  }

  const { tipoCarta, plan } = req.body;
  if (!tipoCarta || !plan) {
    return res.status(400).json({ error: 'Faltan parámetros' });
  }

  const preciosUSD = { basico: 4, intermedio: 6, completo: 9 };
  const tipoCambio = 1000; // Poné acá tu tipo de cambio actual
  const precioARS = preciosUSD[plan] * tipoCambio;

  const titulos = {
    amor: "Carta de Amor", perdon: "Carta de Perdón",
    felicitacion: "Carta de Felicitación", agradecimiento: "Carta de Agradecimiento",
    laboral: "Carta Laboral", libro: "Libro Personalizado"
  };
  const itemName = `Lettera - ${titulos[tipoCarta] || "Carta Personalizada"} (${plan})`;

  try {
    const response = await fetch(
      "https://api.mercadopago.com/checkout/preferences",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": "Bearer TU_ACCESS_TOKEN_MP"
        },
        body: JSON.stringify({
          items: [
            { title: itemName, quantity: 1, unit_price: parseFloat(precioARS.toFixed(2)), currency_id: "ARS" }
          ],
          back_urls: {
            success: `https://lettera-one.vercel.app/formulario.html?tipoCarta=${tipoCarta}&plan=${plan}&paid=true`,
            failure: "https://lettera-one.vercel.app/",
            pending: "https://lettera-one.vercel.app/"
          },
          auto_return: "approved"
        })
      }
    );

    const data = await response.json();
    if (data.init_point) {
      res.status(200).json({ link: data.init_point });
    } else {
      console.error("MP error:", data);
      res.status(500).json({ error: "No se pudo crear la preferencia" });
    }
  } catch (err) {
    console.error("Error MP:", err);
    res.status(500).json({ error: "Error interno del servidor" });
  }
}
