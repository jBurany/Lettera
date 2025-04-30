export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Método no permitido' });
  }

  const { tipoCarta, plan } = req.body;

  if (!tipoCarta || !plan) {
    return res.status(400).json({ error: 'Faltan parámetros' });
  }

  // Precios por plan en USD
  const preciosUSD = {
    basico: 4,
    intermedio: 6,
    completo: 9
  };

  // Tipo de cambio: pone aquí el valor actual del dólar
  const tipoCambio = 1000; // ✅ PONÉ ACÁ EL VALOR ACTUAL DEL DÓLAR (ej: blue, MEP, etc.)
  const precioARS = preciosUSD[plan] * tipoCambio;

  // Títulos dinámicos según tipo de carta
  const titulos = {
    amor: "Carta de Amor",
    perdon: "Carta de Perdón",
    felicitacion: "Carta de Felicitación",
    agradecimiento: "Carta de Agradecimiento",
    laboral: "Carta Laboral",
    libro: "Libro Personalizado"
  };

  const itemName = `Lettera - ${titulos[tipoCarta] || "Carta Personalizada"} (${plan})`;

  try {
    const response = await fetch(
      "https://api.mercadopago.com/checkout/preferences",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          // Reemplaza por tu access token de MercadoPago
          "Authorization": "Bearer APP_USR-4959525077462110-043011-2607973452515f59850f7509b12e8c40-391030020"
        },
        body: JSON.stringify({
          items: [
            {
              title: itemName,
              quantity: 1,
              unit_price: parseFloat(precioARS.toFixed(2)),
              currency_id: "ARS"
            }
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
      return res.status(200).json({ link: data.init_point });
    } else {
      console.error("Error de MP:", data);
      return res.status(500).json({ error: "No se pudo crear la preferencia de pago" });
    }

  } catch (error) {
    console.error("Error al conectar con MercadoPago:", error);
    return res.status(500).json({ error: "Error interno del servidor" });
  }
}
