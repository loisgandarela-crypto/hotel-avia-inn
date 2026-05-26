/* ============================================================================
   HOTEL AVIA INN — script.js
   ----------------------------------------------------------------------------
   Esta es la "fuente de la verdad" del sitio. Si NO sabes programar, puedes
   editar con tranquilidad todo lo que está dentro de los bloques marcados con
   ✏️ EDITABLE. Cambia precios, descripciones y respuestas del asistente sin
   tocar nada más.
   ============================================================================ */


/* ============================================================================
   ✏️ EDITABLE  ·  CONFIGURACIÓN GENERAL
   ============================================================================ */
const CONFIG = {
  // Número de WhatsApp del hotel (solo dígitos, con lada del país: 52 = México)
  whatsappNumber: "525557701918",

  // Mensaje que se pre-escribe cuando alguien abre WhatsApp desde el sitio
  whatsappMessage: "Hola, me gustaría información sobre una habitación en Hotel AVIA Inn",

  // ----- ASISTENTE VIRTUAL -----
  // false = Asistente con respuestas incluidas (FAQ), SIN servidor ni API key.
  //         Funciona en cualquier hosting gratuito. (Recomendado para empezar.)
  // true  = Asistente con IA real de Claude. Requiere desplegar la función
  //         serverless e indicar la URL en chatApiUrl (ver carpetas /netlify o /api
  //         y el archivo README-asistente-ia.md).
  useLiveAI: false,

  // URL de la función serverless cuando useLiveAI = true.
  //   Netlify:  "/.netlify/functions/chat"
  //   Vercel:   "/api/chat"
  chatApiUrl: "/.netlify/functions/chat",
};

// Enlace de WhatsApp ya armado (no hace falta editarlo)
const WHATSAPP_URL =
  `https://wa.me/${CONFIG.whatsappNumber}?text=${encodeURIComponent(CONFIG.whatsappMessage)}`;


/* ============================================================================
   ✏️ EDITABLE  ·  HABITACIONES
   ----------------------------------------------------------------------------
   Cada habitación es un bloque { ... }. Para editar:
     - name:  nombre que se muestra
     - price: precio en pesos (solo el número)
     - img:   ruta de la foto dentro de la carpeta /images
     - desc:  descripción breve y atractiva
   Para agregar una habitación, copia un bloque completo y pégalo dentro de [ ].
   ============================================================================ */
const ROOMS = [
  {
    name: "Habitación Sencilla",
    price: 270,
    img: "./images/avia-2.jpg",
    desc: "Acogedora y cómoda, ideal para una escapada espontánea de pareja. Todo lo esencial para disfrutar en privado.",
  },
  {
    name: "Habitación Doble",
    price: 480,
    img: "./images/avia-room-1.jpg",
    desc: "Espaciosa y versátil, pensada para mayor comodidad. Perfecta para tomarse su tiempo sin prisas.",
  },
  {
    name: "Habitación con Jacuzzi",
    price: 400,
    img: "./images/avia-room-3.jpg",
    desc: "Relájate en un jacuzzi privado. El plan ideal para una noche íntima y diferente.",
  },
  {
    name: "Habitación Pole Dance",
    price: 350,
    img: "./images/avia-room-4.jpg",
    desc: "Diversión y picardía con tubo de pole dance. Atrévete a vivir una noche llena de chispa.",
  },
];


/* ============================================================================
   ✏️ EDITABLE  ·  FOTOS EXTRA PARA LA GALERÍA
   ----------------------------------------------------------------------------
   Además de las fotos de las habitaciones, la galería muestra estas imágenes
   reales del hotel (fachada, instalaciones, servicio a la habitación, etc.).
   Para agregar o quitar, edita la lista. caption = texto alternativo.
   ============================================================================ */
const GALLERY_EXTRA = [
  { img: "./images/avia-2.jpg", caption: "Habitación con cama king size en Hotel AVIA Inn" },
  { img: "./images/avia-1-nocar.jpg", caption: "Fachada del Hotel AVIA Inn sobre Vía Morelos, Ecatepec" },
  { img: "./images/avia-4.jpg", caption: "Entrada y acceso a garage privado del Hotel AVIA Inn" },
  { img: "./images/avia-courtyard.jpg", caption: "Patio interior y acceso a las habitaciones del Hotel AVIA Inn" },
];


/* ============================================================================
   ✏️ EDITABLE  ·  BASE DE CONOCIMIENTO DEL ASISTENTE (FAQ)
   ----------------------------------------------------------------------------
   Estas son las respuestas automáticas del Asistente Virtual cuando NO usas
   la IA de Claude. Puedes editar libremente los textos de "answer".
     - label:    texto del botón de respuesta rápida
     - keywords: palabras que activan la respuesta si el cliente escribe libre
     - answer:   lo que responde el asistente (puedes usar saltos de línea con \n)
   ============================================================================ */
const FAQ = [
  {
    label: "💵 Precios",
    keywords: ["precio", "precios", "costo", "cuesta", "tarifa", "cuanto", "cuánto", "habitacion", "habitación", "cuarto"],
    answer:
      "Estos son nuestros precios por habitación:\n\n" +
      "• Sencilla — $270\n" +
      "• Doble — $480\n" +
      "• Con Jacuzzi — $400\n" +
      "• Pole Dance — $350\n\n" +
      "Todos los precios son en pesos mexicanos. 💛",
  },
  {
    label: "🚗 ¿Hay estacionamiento?",
    keywords: ["estacionamiento", "garage", "garaje", "carro", "auto", "coche", "parking"],
    answer:
      "¡Sí! Contamos con garage privado por habitación, cómodo y seguro. " +
      "Tu privacidad y la de tu auto están garantizadas. 🚗",
  },
  {
    label: "🛁 ¿Tienen jacuzzi / vapor / sauna?",
    keywords: ["jacuzzi", "vapor", "sauna", "tina", "spa"],
    answer:
      "Claro que sí. 🛁 Tenemos la Habitación con Jacuzzi privado ($400). " +
      "Además contamos con vapor y sauna para que vivan una experiencia de " +
      "relajación total.",
  },
  {
    label: "🕒 ¿Cuál es el horario?",
    keywords: ["horario", "hora", "abierto", "abren", "cierran", "24"],
    answer:
      "Estamos abiertos las 24 horas, todos los días del año. 🕒 " +
      "Llega a la hora que prefieras, ¡siempre te esperamos!",
  },
  {
    label: "📍 ¿Cómo llego?",
    keywords: ["llego", "llegar", "direccion", "dirección", "ubicacion", "ubicación", "donde", "dónde", "mapa", "como llegar"],
    answer:
      "Nos encontrarás en:\n\n" +
      "📍 Vía Morelos 36, Col. San José de Jajalpa (Hogares Mexicanos), " +
      "CP 55030, Ecatepec de Morelos, Estado de México.\n\n" +
      "Estamos sobre Vía Morelos, con acceso fácil y rápido, y bien " +
      "conectados rumbo a Teotihuacán y al AIFA. " +
      'Puedes ver la ruta en la sección "Ubicación" de la página. 🗺️',
  },
  {
    label: "🛍️ ¿Qué hay cerca?",
    keywords: ["cerca", "plaza", "plazas", "comercial", "comerciales", "teotihuacan", "teotihuacán", "piramides", "pirámides", "aifa", "aeropuerto", "centro comercial", "negocios", "familia", "familiar"],
    answer:
      "¡Estamos muy bien ubicados! 🛍️ Nos encuentras a pocos minutos de " +
      "plazas comerciales y estratégicamente rumbo a las Pirámides de " +
      "Teotihuacán 🏛️ y al Aeropuerto Felipe Ángeles (AIFA) ✈️. " +
      "Por eso también somos una gran opción para viajes de negocios y " +
      "estancias familiares. 💛",
  },
  {
    label: "📝 ¿Cómo reservo?",
    keywords: ["reservo", "reservar", "reservacion", "reservación", "apartar", "reserva"],
    answer:
      "¡Reservar es muy fácil! Escríbenos por WhatsApp y con gusto te " +
      "ayudamos a apartar tu habitación al instante. 💬",
    showWhatsApp: true,
  },
  {
    label: "📶 ¿Qué amenidades tienen?",
    keywords: ["amenidades", "servicios", "wifi", "internet", "tv", "television", "televisión", "musica", "música", "servicio"],
    answer:
      "Disfrutarás de: WiFi gratis 📶, garage privado 🚗, jacuzzi 🛁, " +
      "vapor y sauna ♨️, pantalla plana y TV por cable 📺, música ambiental 🎵, " +
      "servicio a la habitación 🍽️ y un ambiente totalmente discreto. 🤫",
  },
];

// Mensaje de bienvenida del asistente
const CHAT_WELCOME =
  "¡Hola! 💛 Bienvenido a Hotel AVIA Inn. Soy tu asistente virtual y estoy " +
  "para ayudarte. ¿Sobre qué te gustaría saber?";

// Respuesta cuando el asistente (modo FAQ) no entiende la pregunta
const CHAT_FALLBACK =
  "Con gusto te ayudamos con eso. 💬 Para darte la mejor atención, " +
  "escríbenos por WhatsApp y una persona del hotel te responderá enseguida.";


/* ============================================================================
   A PARTIR DE AQUÍ ES CÓDIGO TÉCNICO.
   No necesitas editarlo para cambiar precios o textos.
   ============================================================================ */

// Imagen de respaldo (1200x630) por si alguna foto falta: degradado elegante.
const PLACEHOLDER =
  "data:image/svg+xml;charset=UTF-8," +
  encodeURIComponent(
    `<svg xmlns='http://www.w3.org/2000/svg' width='1200' height='630'>
      <defs><linearGradient id='g' x1='0' y1='0' x2='1' y2='1'>
        <stop offset='0' stop-color='#7d1f2e'/><stop offset='1' stop-color='#2a0c12'/>
      </linearGradient></defs>
      <rect width='1200' height='630' fill='url(#g)'/>
      <text x='600' y='300' font-family='Georgia, serif' font-size='64' fill='#c8a45c'
        text-anchor='middle' font-style='italic'>AVIA Inn</text>
      <text x='600' y='370' font-family='Arial, sans-serif' font-size='28' fill='#e3cf9f'
        text-anchor='middle'>Foto próximamente</text>
    </svg>`
  );

// Helper: si una imagen no carga, muestra el placeholder en su lugar.
function withFallback(imgEl) {
  imgEl.addEventListener("error", () => { imgEl.src = PLACEHOLDER; }, { once: true });
}

document.addEventListener("DOMContentLoaded", () => {
  renderRooms();
  renderGallery();
  initHeader();
  initMobileNav();
  initReveal();
  initChat();
  document.getElementById("year").textContent = new Date().getFullYear();
});


/* ---------- Habitaciones: genera las tarjetas ---------- */
function renderRooms() {
  const grid = document.getElementById("roomsGrid");
  if (!grid) return;

  ROOMS.forEach((room) => {
    const card = document.createElement("article");
    card.className = "room-card reveal";

    const reserveMsg = encodeURIComponent(
      `Hola, me interesa la ${room.name} ($${room.price}) de Hotel AVIA Inn. ¿Está disponible?`
    );
    const reserveUrl = `https://wa.me/${CONFIG.whatsappNumber}?text=${reserveMsg}`;

    card.innerHTML = `
      <div class="room-media">
        <img alt="Foto de la ${room.name} en Hotel AVIA Inn, Ecatepec" loading="lazy" />
        <span class="room-price">$${room.price} <small>MXN</small></span>
      </div>
      <div class="room-body">
        <h3 class="room-name">${room.name}</h3>
        <p class="room-desc">${room.desc}</p>
        <div class="room-actions">
          <a class="btn btn-accent" href="${reserveUrl}" target="_blank" rel="noopener">Reservar</a>
          <a class="btn btn-outline" href="${WHATSAPP_URL}" target="_blank" rel="noopener">Más info</a>
        </div>
      </div>`;

    const img = card.querySelector("img");
    img.src = room.img;
    withFallback(img);

    grid.appendChild(card);
  });
}


/* ---------- Galería: fotos de habitaciones + fotos reales del hotel ---------- */
function renderGallery() {
  const grid = document.getElementById("galleryGrid");
  if (!grid) return;

  // Combina las fotos de las habitaciones con las fotos extra del hotel
  const combined = [
    ...ROOMS.map((r) => ({ img: r.img, caption: `${r.name} en Hotel AVIA Inn` })),
    ...GALLERY_EXTRA,
  ];
  // Evita repetir la misma foto en la galería (algunas se usan en varias habitaciones)
  const seen = new Set();
  const items = combined.filter((it) => (seen.has(it.img) ? false : seen.add(it.img)));

  items.forEach((it) => {
    const item = document.createElement("div");
    item.className = "gallery-item reveal";
    item.innerHTML = `<img alt="${it.caption}" loading="lazy" />`;
    const img = item.querySelector("img");
    img.src = it.img;
    withFallback(img);
    item.addEventListener("click", () => openLightbox(img.src, it.caption));
    grid.appendChild(item);
  });
}

/* ---------- Visor de imagen ampliada (lightbox) ---------- */
function openLightbox(src, alt) {
  let box = document.getElementById("lightbox");
  if (!box) {
    box = document.createElement("div");
    box.className = "lightbox";
    box.id = "lightbox";
    box.innerHTML = `<button class="lightbox-close" aria-label="Cerrar">✕</button><img alt="" />`;
    document.body.appendChild(box);
    box.addEventListener("click", (e) => {
      if (e.target === box || e.target.classList.contains("lightbox-close")) {
        box.classList.remove("open");
      }
    });
  }
  box.querySelector("img").src = src;
  box.querySelector("img").alt = alt;
  box.classList.add("open");
}


/* ---------- Header: sombra al hacer scroll ---------- */
function initHeader() {
  const header = document.querySelector(".site-header");
  const onScroll = () => header.classList.toggle("scrolled", window.scrollY > 30);
  onScroll();
  window.addEventListener("scroll", onScroll, { passive: true });
}


/* ---------- Menú móvil ---------- */
function initMobileNav() {
  const toggle = document.getElementById("navToggle");
  const menu = document.getElementById("mobileNav");
  if (!toggle || !menu) return;

  toggle.addEventListener("click", () => {
    const open = menu.classList.toggle("open");
    toggle.classList.toggle("open", open);
    toggle.setAttribute("aria-expanded", String(open));
  });
  menu.querySelectorAll("a").forEach((link) =>
    link.addEventListener("click", () => {
      menu.classList.remove("open");
      toggle.classList.remove("open");
      toggle.setAttribute("aria-expanded", "false");
    })
  );
}


/* ---------- Animación de aparición al hacer scroll ---------- */
function initReveal() {
  const els = document.querySelectorAll(".reveal");
  if (!("IntersectionObserver" in window)) {
    els.forEach((el) => el.classList.add("visible"));
    return;
  }
  const io = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("visible");
          io.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.12 }
  );
  els.forEach((el) => io.observe(el));
}


/* ============================================================================
   ASISTENTE VIRTUAL
   ============================================================================ */
function initChat() {
  const launcher = document.getElementById("chatLauncher");
  const panel = document.getElementById("chatPanel");
  const closeBtn = document.getElementById("chatClose");
  const body = document.getElementById("chatBody");
  const quick = document.getElementById("chatQuick");
  const form = document.getElementById("chatForm");
  const input = document.getElementById("chatText");

  let started = false;

  function openChat() {
    panel.classList.add("open");
    panel.setAttribute("aria-hidden", "false");
    launcher.classList.add("hidden");
    if (!started) {
      started = true;
      botSay(CHAT_WELCOME);
      renderQuickButtons();
    }
    setTimeout(() => input.focus(), 300);
  }
  function closeChat() {
    panel.classList.remove("open");
    panel.setAttribute("aria-hidden", "true");
    launcher.classList.remove("hidden");
  }

  launcher.addEventListener("click", openChat);
  closeBtn.addEventListener("click", closeChat);

  // Botones de respuesta rápida (uno por cada FAQ)
  function renderQuickButtons() {
    quick.innerHTML = "";
    FAQ.forEach((item) => {
      const b = document.createElement("button");
      b.className = "quick-btn";
      b.type = "button";
      b.textContent = item.label;
      b.addEventListener("click", () => {
        userSay(item.label.replace(/^[^\wáéíóúñ¿]+/i, "").trim());
        respondFromFaq(item);
      });
      quick.appendChild(b);
    });
  }

  // Pinta un mensaje del bot. `html=true` permite incluir botones/enlaces.
  function botSay(text, html = false) {
    const el = document.createElement("div");
    el.className = "msg msg-bot";
    if (html) el.innerHTML = text;
    else el.textContent = text;
    body.appendChild(el);
    body.scrollTop = body.scrollHeight;
  }
  function userSay(text) {
    const el = document.createElement("div");
    el.className = "msg msg-user";
    el.textContent = text;
    body.appendChild(el);
    body.scrollTop = body.scrollHeight;
  }

  // Indicador "escribiendo…"
  function showTyping() {
    const el = document.createElement("div");
    el.className = "msg msg-bot typing";
    el.id = "typingDots";
    el.innerHTML = "<span></span><span></span><span></span>";
    body.appendChild(el);
    body.scrollTop = body.scrollHeight;
  }
  function hideTyping() {
    const t = document.getElementById("typingDots");
    if (t) t.remove();
  }

  // Botón de WhatsApp en formato HTML para insertar en un mensaje
  const waButtonHtml =
    `<br><a class="chat-wa-btn" href="${WHATSAPP_URL}" target="_blank" rel="noopener">` +
    `<svg viewBox="0 0 32 32"><path d="M16 .4C7.4.4.4 7.4.4 16c0 2.8.7 5.5 2.1 7.9L.3 31.7l8-2.1c2.3 1.2 4.9 1.9 7.7 1.9 8.6 0 15.6-7 15.6-15.6S24.6.4 16 .4z"/></svg>` +
    `Abrir WhatsApp</a>`;

  // Convierte saltos de línea en <br> para mostrarlos en el chat
  function nl2br(t) { return t.replace(/\n/g, "<br>"); }

  // Responde usando una entrada de la FAQ
  function respondFromFaq(item) {
    showTyping();
    setTimeout(() => {
      hideTyping();
      let html = nl2br(item.answer);
      if (item.showWhatsApp) html += waButtonHtml;
      botSay(html, true);
    }, 600);
  }

  // Busca en la FAQ por palabras clave (modo offline)
  function findFaq(text) {
    const q = text.toLowerCase();
    let best = null, bestScore = 0;
    FAQ.forEach((item) => {
      let score = 0;
      item.keywords.forEach((k) => { if (q.includes(k)) score++; });
      if (score > bestScore) { bestScore = score; best = item; }
    });
    return bestScore > 0 ? best : null;
  }

  // Envío del formulario (cuando el cliente escribe libremente)
  form.addEventListener("submit", async (e) => {
    e.preventDefault();
    const text = input.value.trim();
    if (!text) return;
    userSay(text);
    input.value = "";

    if (CONFIG.useLiveAI) {
      await respondWithAI(text);
    } else {
      const match = findFaq(text);
      if (match) {
        respondFromFaq(match);
      } else {
        showTyping();
        setTimeout(() => {
          hideTyping();
          botSay(nl2br(CHAT_FALLBACK) + waButtonHtml, true);
        }, 600);
      }
    }
  });

  // Historial para la IA en vivo (memoria de la conversación)
  const aiHistory = [];

  // Responde usando la IA de Claude (modo en vivo)
  async function respondWithAI(text) {
    aiHistory.push({ role: "user", content: text });
    showTyping();
    try {
      const res = await fetch(CONFIG.chatApiUrl, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ messages: aiHistory }),
      });
      hideTyping();
      if (!res.ok) throw new Error("Respuesta no válida");
      const data = await res.json();
      const reply = (data.reply || "").trim() || CHAT_FALLBACK;
      aiHistory.push({ role: "assistant", content: reply });
      botSay(nl2br(reply), true);
    } catch (err) {
      hideTyping();
      // Si la IA falla, ofrecemos WhatsApp para no dejar al cliente sin respuesta
      botSay(nl2br(CHAT_FALLBACK) + waButtonHtml, true);
    }
  }
}
