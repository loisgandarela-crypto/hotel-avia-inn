# Hotel AVIA Inn — Sitio web

Sitio web de una sola página (one-page) para **Hotel AVIA Inn**, motel romántico
y discreto en Ecatepec de Morelos. Hecho con HTML, CSS y JavaScript puro: no
necesita compilación ni instalación, se hospeda en cualquier lado.

---

## 1. Estructura de archivos

```
hotel-avia-inn/
├── index.html                 ← la página
├── styles.css                 ← diseño y colores
├── script.js                  ← habitaciones, galería y asistente virtual
├── images/                    ← AQUÍ van tus 7 fotos
├── netlify/functions/chat.js  ← (opcional) asistente con IA real, para Netlify
├── api/chat.js                ← (opcional) asistente con IA real, para Vercel
├── README.md                  ← este archivo
└── README-asistente-ia.md     ← guía para activar la IA de Claude
```

---

## 2. Las fotos (paso importante)

Las fotos de las habitaciones ya están incluidas en la carpeta `images/`.
Cada habitación usa este archivo (puedes cambiarlo en la lista `ROOMS` de
`script.js`):

| Archivo              | Habitación                       |
|----------------------|----------------------------------|
| `avia-2.jpg`         | Sencilla — $270                  |
| `avia-room-1.jpg`    | Doble — $480                     |
| `avia-room-3.jpg`    | Con Jacuzzi — $400               |
| `avia-room-4.jpg`    | Pole Dance — $350                |

> Para cambiar una foto, reemplaza el archivo o edita la ruta `img` de esa
> habitación en la lista `ROOMS` de `script.js`.

> Si falta alguna foto, el sitio muestra automáticamente un recuadro elegante
> que dice "Foto próximamente", así el diseño nunca se rompe.

**Fotos reales ya incluidas:** la carpeta `images/` ya trae 5 fotos reales del
hotel (`avia-1.jpg` a `avia-7.jpg`: fachada, habitación, entrada/garage, pasillo
y servicio a la habitación) que se muestran en la **Galería**. El **fondo del
hero (portada)** usa `avia-1.jpg` (la fachada exterior del hotel) por defecto.
Para cambiarlo, edita la línea `background: url("./images/avia-1.jpg")` en
`styles.css` (sección `.hero`). Para cambiar las fotos de la galería, edita la
lista `GALLERY_EXTRA` en `script.js`.

**Logotipo:** el logo oficial de la marca está en `images/logo-avia.png` (versión
con fondo transparente). Se usa en el encabezado, el pie de página, el favicon y
el avatar del asistente. Como el logo es de texto blanco + morado, está pensado
para fondos oscuros (por eso el encabezado es oscuro). El color violeta de la
marca (#8a12e0) es el acento del sitio; puedes cambiarlo en la variable
`--accent` al inicio de `styles.css`.

**Consejo de velocidad:** guarda las fotos en buena calidad pero no enormes
(ancho de ~1600 px y peso menor a ~300 KB cada una es ideal).

---

## 3. Cómo verlo en tu computadora

La forma más fácil: **doble clic en `index.html`** y se abre en tu navegador.

Para que todo funcione igual que en producción (incluido el mapa), puedes
levantar un servidor local sencillo. Con Python instalado:

```bash
cd hotel-avia-inn
python3 -m http.server 8000
```

Luego abre `http://localhost:8000` en tu navegador.

---

## 4. Editar precios y textos (sin saber programar)

Abre `script.js` con cualquier editor de texto. Busca los bloques marcados con
**✏️ EDITABLE** al inicio del archivo:

- **Precios y descripciones de habitaciones** → lista `ROOMS`.
- **Respuestas del asistente virtual** → lista `FAQ`.
- **Número de WhatsApp** → `CONFIG.whatsappNumber`.

Cambia solo el texto entre comillas, guarda y recarga la página.

---

## 5. Publicarlo gratis

### Opción A — Netlify (la más fácil, arrastrar y soltar)
1. Entra a [app.netlify.com/drop](https://app.netlify.com/drop).
2. Arrastra la carpeta `hotel-avia-inn` completa a la página.
3. ¡Listo! Te darán una dirección como `https://tu-sitio.netlify.app`.
4. (Opcional) Conecta tu propio dominio en *Domain settings*.

### Opción B — GitHub Pages
1. Crea un repositorio en GitHub y sube todos los archivos.
2. Ve a *Settings → Pages*, elige la rama `main` y carpeta `/root`.
3. En unos minutos estará en `https://tu-usuario.github.io/hotel-avia-inn`.

> Nota: GitHub Pages solo sirve archivos estáticos, así que el asistente con
> **IA real** (sección 6) NO funciona ahí. Para la IA usa Netlify o Vercel.
> El asistente normal (FAQ) sí funciona en cualquier lado.

---

## 6. Asistente Virtual: dos versiones

El sitio incluye un **Asistente Virtual** (chat, esquina inferior izquierda).

- **Versión incluida (por defecto):** responde al instante con la información
  del hotel sin necesidad de servidor ni API key. Funciona en cualquier
  hosting gratis. Para lo que no sabe, ofrece un botón de WhatsApp.

- **Versión con IA real de Claude (opcional):** respuestas más naturales.
  Requiere unos pasos extra. Todo está explicado en
  **`README-asistente-ia.md`**.

¡Eso es todo! Cualquier duda, el sitio ya está listo para recibir clientes. 💛
