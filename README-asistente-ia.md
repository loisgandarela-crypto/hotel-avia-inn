# Activar el Asistente con IA real (Claude) — Opcional

Por defecto, el Asistente Virtual del sitio responde con respuestas incluidas
(no necesita servidor ni API key). Esta guía es **solo si quieres** mejorarlo a
un asistente con **inteligencia artificial real de Claude**, que entiende
preguntas escritas con palabras propias y responde de forma más natural.

Las dos versiones se ven **idénticas** para el cliente. La única diferencia es
qué tan "inteligentes" son las respuestas.

---

## ¿Qué necesitas?

1. Una cuenta en **[console.anthropic.com](https://console.anthropic.com)** con
   crédito y una **API key** (clave secreta).
2. Hospedar el sitio en **Netlify** o **Vercel** (ambos tienen plan gratis).
   GitHub Pages NO sirve para esto porque no ejecuta funciones de servidor.

> 🔒 **Importante:** la API key se guarda en el servidor como *variable de
> entorno*. NUNCA se escribe en el código del navegador. Así nadie puede verla
> ni usarla desde el sitio.

---

## Paso 1 — Activar la bandera en el sitio

Abre `script.js` y, en el bloque `CONFIG` (arriba del archivo), cambia:

```js
useLiveAI: true,                          // antes estaba en false

// y deja la URL según tu hosting:
chatApiUrl: "/.netlify/functions/chat",   // si usas Netlify
// chatApiUrl: "/api/chat",               // si usas Vercel
```

---

## Paso 2 — Desplegar

### Si usas **Netlify**
1. Sube el proyecto a Netlify (puedes conectar un repositorio de GitHub, o usar
   la app de Netlify). La función ya está en `netlify/functions/chat.js`.
2. Ve a **Site settings → Environment variables → Add a variable**.
3. Agrega:
   - **Key:** `ANTHROPIC_API_KEY`
   - **Value:** tu clave de Anthropic (empieza con `sk-ant-...`)
4. Vuelve a desplegar el sitio (*Deploys → Trigger deploy*).

### Si usas **Vercel**
1. Sube el proyecto a Vercel. La función ya está en `api/chat.js`.
2. Ve a **Project → Settings → Environment Variables**.
3. Agrega `ANTHROPIC_API_KEY` con tu clave.
4. Vuelve a desplegar (*Deployments → Redeploy*).

---

## Paso 3 — Probar

Abre tu sitio, haz clic en el Asistente Virtual y escribe algo como
*"¿tienen cuartos con tina para dos?"*. Si responde con naturalidad, ¡funciona!

Si algo falla, el asistente automáticamente ofrece un botón de WhatsApp para
que el cliente no se quede sin atención.

---

## ¿Cuánto cuesta?

La función usa el modelo **Claude Haiku 4.5**, el más económico y rápido,
ideal para responder preguntas frecuentes.

- El costo es por uso (tokens). Cada conversación de un cliente cuesta una
  fracción de centavo de dólar.
- Como referencia, **miles de conversaciones cortas** suelen costar solo unos
  pocos dólares al mes. Para un sitio de hotel con tráfico normal, el gasto es
  muy bajo.
- Puedes poner un **límite de gasto mensual** en tu cuenta de Anthropic
  (*Billing → Limits*) para no llevarte sorpresas.

> Consejo: para bajar aún más el costo, en `chat.js` ya limitamos el historial
> a los últimos 12 mensajes y la respuesta a 400 tokens. Puedes ajustar esos
> números si lo deseas.

---

## ¿Cómo regresar a la versión sin servidor?

Solo cambia en `script.js`:

```js
useLiveAI: false,
```

Y vuelve a desplegar. El asistente volverá a usar las respuestas incluidas.
