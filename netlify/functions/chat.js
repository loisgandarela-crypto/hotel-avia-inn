/* ============================================================================
   HOTEL AVIA INN — Función serverless para Netlify
   ----------------------------------------------------------------------------
   Esta función conecta el Asistente Virtual del sitio con la IA de Claude
   (API de Mensajes de Anthropic). La API key NUNCA viaja al navegador: vive
   aquí, en el servidor, como variable de entorno ANTHROPIC_API_KEY.

   Cómo activarla:
     1. Sube todo el proyecto a Netlify (ver README-asistente-ia.md).
     2. En Netlify: Site settings → Environment variables → agrega
        ANTHROPIC_API_KEY con tu clave de console.anthropic.com.
     3. En script.js pon  useLiveAI: true  y
        chatApiUrl: "/.netlify/functions/chat".
   ============================================================================ */

// System prompt: define quién es el asistente y qué sabe del hotel.
// Edita los datos aquí si cambian precios, dirección u horario.
const SYSTEM_PROMPT = `Eres el asistente virtual de "Hotel AVIA Inn", un motel/autohotel para parejas en Ecatepec de Morelos, Estado de México. Hablas SIEMPRE en español de México, con un tono cálido, acogedor y romántico, apropiado para una escapada de pareja. Eres breve y servicial.

DATOS DEL HOTEL:
- Nombre: Hotel AVIA Inn (motel discreto y romántico para parejas).
- Dirección: Vía Morelos 36, Col. San José de Jajalpa (Hogares Mexicanos), CP 55030, Ecatepec de Morelos, Estado de México.
- Teléfono / WhatsApp: +52 55 5770 1918.
- Horario: Abierto las 24 horas, todos los días.
- Amenidades: WiFi gratis, garage/estacionamiento privado por habitación, jacuzzi, vapor y sauna, pantalla plana, TV por cable, música ambiental, servicio a la habitación, ambiente totalmente discreto.
- Ubicación estratégica: a pocos minutos de plazas comerciales y bien conectado rumbo a las Pirámides de Teotihuacán y al Aeropuerto Internacional Felipe Ángeles (AIFA).
- Perfil: además de ser ideal para parejas, funciona muy bien como hotel de negocios (business hotel) y para estancias familiares.

PRECIOS POR HABITACIÓN (pesos mexicanos):
- Habitación Sencilla: $270
- Habitación Doble: $480
- Habitación con Jacuzzi: $400
- Habitación Pole Dance: $350

REGLAS:
- Responde ÚNICAMENTE sobre Hotel AVIA Inn (habitaciones, precios, amenidades, horario, ubicación, cómo llegar, cómo reservar). Si preguntan algo ajeno al hotel, redirígelo amablemente al hotel.
- Para hacer una reserva real, confirmar disponibilidad, o si no estás seguro de algo, indica al cliente que escriba por WhatsApp al +52 55 5770 1918. No inventes información (no inventes disponibilidad, descuentos ni datos que no estén aquí).
- Mantén las respuestas cortas y fáciles de leer. Usa emojis con moderación.`;

exports.handler = async (event) => {
  // Solo aceptamos POST
  if (event.httpMethod !== "POST") {
    return { statusCode: 405, body: JSON.stringify({ error: "Método no permitido" }) };
  }

  const apiKey = process.env.ANTHROPIC_API_KEY;
  if (!apiKey) {
    return { statusCode: 500, body: JSON.stringify({ error: "Falta ANTHROPIC_API_KEY" }) };
  }

  try {
    const { messages } = JSON.parse(event.body || "{}");
    if (!Array.isArray(messages) || messages.length === 0) {
      return { statusCode: 400, body: JSON.stringify({ error: "Sin mensajes" }) };
    }

    // Limitamos el historial para controlar costos (últimos 12 mensajes)
    const trimmed = messages.slice(-12);

    const response = await fetch("https://api.anthropic.com/v1/messages", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-api-key": apiKey,
        "anthropic-version": "2023-06-01",
      },
      body: JSON.stringify({
        model: "claude-haiku-4-5-20251001", // económico y rápido; ideal para FAQ
        max_tokens: 400,
        system: SYSTEM_PROMPT,
        messages: trimmed,
      }),
    });

    if (!response.ok) {
      const detail = await response.text();
      return { statusCode: 502, body: JSON.stringify({ error: "Error de Anthropic", detail }) };
    }

    const data = await response.json();
    const reply = data.content?.map((b) => b.text).join("") || "";

    return {
      statusCode: 200,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ reply }),
    };
  } catch (err) {
    return { statusCode: 500, body: JSON.stringify({ error: "Error interno", detail: String(err) }) };
  }
};
