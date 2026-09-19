# Codevam — landing page

Estructura del proyecto:

```
codevam-web/
├── index.html          → estructura y contenido de la página
├── assets/
│   ├── styles.css       → todos los estilos (colores, tipografía, layout)
│   ├── script.js        → animación del terminal en el hero
│   └── i18n.js          → selector de idioma ES/EN (diccionario + lógica)
└── README.md
```

## Cómo verla

Abre `index.html` directamente en el navegador (doble clic), o súbela a cualquier
hosting estático (Netlify, Vercel, GitHub Pages, cPanel, etc.) manteniendo la
carpeta `assets/` junto al `index.html`.

## Cómo editar contenido

- **Textos, secciones, orden de la página** → `index.html`
- **Colores, tipografía, espaciados, responsive** → `assets/styles.css`
  - Los colores de marca están arriba de todo en `:root` (líneas iniciales),
    cámbialos ahí y se actualizan en toda la página.
  - El archivo está dividido con comentarios `/* ---- sección ---- */` que
    coinciden con las secciones del HTML (hero, servicios, proceso, productos,
    clientes, contacto).
- **Animación del terminal del hero** → `assets/script.js`
  - El guion de texto que se "escribe" está en el objeto `terminalScripts`
    (una versión `es` y una `en`) al inicio del archivo.
- **Clientes y proyectos** → sección `#clientes` en `index.html`
  - Cada cliente en producción es una tarjeta `<a class="card">` con enlace a
    su sitio. Cada proyecto sin sitio público es un `<div class="card
    is-project">` (borde punteado). Copia una tarjeta existente del tipo que
    necesites y cambia el texto para agregar una nueva.
- **Redes sociales** → footer en `index.html`, dentro de `<div class="social-links">`.
  Cada ícono es un `<a>` con su SVG adentro; cambia el `href` para actualizar el
  enlace o copia uno para agregar una red nueva.

## Cómo funciona el selector de idioma (ES/EN)

- El botón está en el nav (`.lang-toggle`, arriba a la derecha). Guarda la
  elección en `localStorage` para recordarla en la próxima visita.
- Todo el texto traducible tiene un atributo `data-i18n="clave"` (o
  `data-i18n-html="clave"` si el texto incluye etiquetas como `<br>`) en
  `index.html`. El diccionario con el texto en español e inglés de cada clave
  vive en `assets/i18n.js`, dentro del objeto `TRANSLATIONS`.
- **Para traducir un texto nuevo**: agrega `data-i18n="mi_clave"` al elemento
  en `index.html`, y agrega `mi_clave: { es: '...', en: '...' }` en
  `TRANSLATIONS` dentro de `assets/i18n.js`.
- Los nombres de dominio (victorburbano.com, etc.), los nombres de proyecto
  (Grumalog, SIGE, GES, SS Tech) y la marca "Codevam"/"vitriniando" se dejaron
  fuera del sistema de idiomas a propósito — son nombres propios y no deberían
  traducirse.
- `assets/i18n.js` se carga antes que `assets/script.js` en `index.html` (ese
  orden importa: así el terminal del hero sabe en qué idioma arrancar).

## Próximos pasos sugeridos

- Confirmar/ajustar las descripciones de victorburbano.com, villajuana.co,
  oceanshapespa.com e intergroup.com.co en `#clientes` — quedaron con una
  frase genérica marcada `<!-- TODO: confirmar descripción -->` porque no
  tengo el detalle exacto de cada sitio.
- Cuando Vitriniando esté listo para lanzar, quitar el badge "en desarrollo"
  en la sección `#productos` y enlazar el botón a la app real.
