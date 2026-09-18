# Codevam — landing page

Estructura del proyecto:

```
codevam-web/
├── index.html          → estructura y contenido de la página
├── assets/
│   ├── styles.css       → todos los estilos (colores, tipografía, layout)
│   └── script.js        → animación del terminal en el hero
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
  - El guion de texto que se "escribe" está en el arreglo `script` al inicio
    del archivo; puedes cambiar las líneas ahí sin tocar el resto del código.
- **Clientes y proyectos** → sección `#clientes` en `index.html`
  - Cada cliente en producción es una tarjeta `<a class="card">` con enlace a
    su sitio. Cada proyecto sin sitio público es un `<div class="card
    is-project">` (borde punteado). Copia una tarjeta existente del tipo que
    necesites y cambia el texto para agregar una nueva.

## Próximos pasos sugeridos

- El contacto principal ahora es WhatsApp (3156793777). Cuando tengas correo
  corporativo, puedes agregarlo de nuevo en la sección `#contacto` de `index.html`.
- Confirmar/ajustar las descripciones de victorburbano.com, villajuana.co,
  oceanshapespa.com e intergroup.com.co en `#clientes` — quedaron con una
  frase genérica marcada `<!-- TODO: confirmar descripción -->` porque no
  tengo el detalle exacto de cada sitio.
- Cuando Vitriniando esté listo para lanzar, quitar el badge "en desarrollo"
  en la sección `#productos` y enlazar el botón a la app real.
