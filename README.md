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

## Próximos pasos sugeridos

- El contacto principal ahora es WhatsApp (3156793777). Cuando tengas correo
  corporativo, puedes agregarlo de nuevo en la sección `#contacto` de `index.html`.
- Cuando tengas clientes reales, reemplazar la sección "clientes" (`#clientes`
  en `index.html`) por casos de éxito o logos reales.
- Cuando Vitriniando esté listo para lanzar, quitar el badge "en desarrollo"
  en la sección `#productos` y enlazar el botón a la app real.
