# Codevam — landing page

Sitio estático de Codevam: servicios de desarrollo de software a medida y
catálogo de productos propios (SADU, LogistiQR, VamPOS, ComandaPOS, Grumalog,
Codevam Fiscal, VamCore, VECINDAD, GestiónTaxis, SIGE, FruverCopilot, Olfatto
y Vitriniando). Todo el contenido está en español e inglés.

El catálogo y la revisión de los proyectos de `Documents` se documentan en
[`PRODUCTOS.md`](./PRODUCTOS.md). Ese archivo es la fuente de verdad para
estados, precios, CTA y proyectos que no se publican todavía.

## Estructura

```
Pagina/
├── index.html          → página principal
├── gracias.html        → puente de redirección segura a WhatsApp
├── assets/
│   ├── styles.css      → estilos, responsive y componentes
│   ├── script.js       → terminal del hero, menú móvil y modal de WhatsApp
│   ├── i18n.js         → diccionario ES/EN y lógica del selector de idioma
│   ├── og-image.png    → imagen para compartir en redes (1200 × 630)
│   └── favicon.svg
├── robots.txt
├── sitemap.xml
├── PRODUCTOS.md        → catálogo y auditoría de proyectos revisados
└── README.md
```

## Cómo verla

Abre `index.html` con doble clic o sirve la carpeta con cualquier servidor
estático. Para probar el envío a WhatsApp y la redirección de `gracias.html`
conviene usar un servidor local:

```bash
python -m http.server 8080
# luego abre http://localhost:8080
```

Para publicar, sube todo el contenido de `Pagina/` conservando la carpeta
`assets/` al lado de `index.html` (Netlify, Vercel, GitHub Pages, cPanel, etc.).

## Catálogo de productos

Las tarjetas están en la sección `#productos` de `index.html`. Cada una tiene:

| Producto | Estado | Precio de referencia | Intención del CTA |
| --- | --- | --- | --- |
| SADU | demo disponible | $350.000 COP/mes | `demo` |
| LogistiQR | demo disponible | $99.000 COP/mes | `demo` |
| VamPOS | en piloto | a cotizar | `demo` |
| ComandaPOS | en operación | licencia + instalación | `demo` |
| Grumalog | en operación | implementación, a cotizar | `info` |
| Codevam Fiscal | demo técnica | piloto, a cotizar | `demo` |
| VamCore | demo disponible | implementación, a cotizar | `demo` |
| VECINDAD | demo disponible | suscripción, a cotizar | `demo` |
| GestiónTaxis | demo disponible | licencia + instalación | `demo` |
| SIGE | en piloto | a cotizar | `demo` |
| FruverCopilot | prototipo | preventa, a cotizar | `notify` |
| Olfatto | beta | suscripción, a cotizar | `demo` |
| Vitriniando | en desarrollo | preventa, a cotizar | `notify` |

Los estados se controlan con clases de `styles.css`:

- `status-demo` → demo disponible o demo técnica (cian)
- `status-live` → en operación (verde)
- `status-beta` → en piloto o beta (ámbar)
- `status-dev` → prototipo o en desarrollo (violeta)

El estado debe reflejar la realidad del producto. No marques como
“en operación” algo que todavía no esté desplegado y probado con clientes.
Las tarjetas nuevas usan textos honestos: Codevam Fiscal es demo técnica con
habilitación DIAN pendiente; FruverCopilot es prototipo sin validación con
pedidos reales; Olfatto es beta; VamCore y VECINDAD son demos funcionales sin
cliente en producción.

### Cómo agregar o activar un producto

1. Copia una `<article class="product-card ...">` existente y cambia el
   contenido. Para la tarjeta destacada usa además `product-featured`.
2. Ajusta el color de acento con una clase propia, por ejemplo
   `.product-miproducto{ --accent:#38BDF8; }`.
3. En el botón de la tarjeta cambia `data-product` y `data-intent`:

   ```html
   <button type="button" class="btn btn-primary product-cta"
           data-product="MiProducto" data-intent="demo"
           data-i18n="cta_demo">Solicitar demo</button>
   ```

   - `data-product` debe coincidir exactamente con el `value` de una opción
     del `<select id="wa-servicio">` del modal.
   - `data-intent` puede ser `demo`, `notify`, `info` o `quote`. Cambia el
     mensaje que se envía a WhatsApp desde `WA_TEMPLATE` en `assets/i18n.js`.
4. Agrega el producto como `<option>` dentro del `<optgroup>` de productos
   del modal y crea sus claves de traducción en `assets/i18n.js`.
5. Agrega sus textos al diccionario `TRANSLATIONS` (español e inglés).

### Cuando un producto tenga landing pública

El catálogo actual no enlaza a las landings de SADU ni LogistiQR porque
todavía no tienen una URL pública. Cuando exista, agrega un enlace secundario
dentro de la tarjeta, por ejemplo:

```html
<a class="product-link" href="https://sadu.codevam.dev"
   target="_blank" rel="noopener">Ver landing</a>
```

Mantén el botón de WhatsApp como acción principal y el enlace a la landing
como acción secundaria.

## Cómo funciona el modal de WhatsApp

- Los botones `.wa-link` (sección de contacto y botón flotante) abren el
  modal con el servicio genérico.
- Los botones `.product-cta` abren el modal con el producto preseleccionado.
- Al enviar, se guarda una copia del lead en `localStorage` (`codevam_leads`),
  se envía al webhook si `WEBHOOK_URL` tiene una URL configurada y se redirige
  a `gracias.html`.
- `gracias.html` solo acepta redirecciones `https` a `api.whatsapp.com`,
  `wa.me` o `web.whatsapp.com`; cualquier otro valor cae en el mensaje
  genérico. Esto evita redirecciones abiertas.
- `gracias.html` muestra el mensaje de redirección en el mismo idioma de la
  consulta (parámetro `lang`) y usa `codevam_lang` como respaldo.

Configuración pendiente:

- `WEBHOOK_URL` está vacío en `assets/script.js`. Si tienes un backend o un
  endpoint de automatización, colócalo ahí.
- El número de WhatsApp está en `assets/script.js` y en las dos URLs de
  `gracias.html` (fallback y enlace manual). Cámbialo en todos esos lugares
  si cambia.

## Selector de idioma (ES/EN)

- El selector está en el nav (`.lang-toggle`) y guarda la elección en
  `localStorage` (`codevam_lang`).
- Los textos usan `data-i18n`, `data-i18n-html`, `data-i18n-placeholder`,
  `data-i18n-aria-label` o `data-i18n-label`.
- Para traducir un texto nuevo: agrega el atributo en `index.html` y la clave
  correspondiente en `TRANSLATIONS` dentro de `assets/i18n.js`.
- Los nombres propios (Codevam, SADU, LogistiQR, VamPOS, Vitriniando,
  ComandaPOS, Grumalog, Codevam Fiscal, VamCore, VECINDAD, GestiónTaxis, SIGE,
  FruverCopilot, Olfatto y dominios de clientes) no se traducen.
- `i18n.js` se carga antes que `script.js`; ese orden es necesario para que
  la terminal del hero arranque en el idioma correcto.

## Accesibilidad y SEO

- El menú móvil expone `aria-expanded`, se cierra con `Escape` y devuelve el
  foco al botón.
- El modal es un diálogo accesible: enfoca el primer campo, atrapa el foco
  con `Tab`, se cierra con `Escape` y restaura el foco al botón que lo abrió.
- Hay enlace “Saltar al contenido”, estilos de foco visibles y soporte para
  `prefers-reduced-motion`.
- `index.html` incluye datos estructurados `ProfessionalService` e `ItemList`
  de productos. Si cambias precios o estados, actualiza también el JSON-LD.
- `assets/og-image.png` es la imagen de Open Graph/Twitter. Si cambias la
  propuesta de valor, conviene regenerarla.
- `gracias.html` tiene `noindex, nofollow`; no debe aparecer en buscadores.

## Checklist antes de publicar

- [ ] Confirmar número de WhatsApp en `assets/script.js` y `gracias.html`.
- [ ] Configurar `WEBHOOK_URL` si hay backend.
- [ ] Agregar aviso de privacidad/tratamiento de datos si se almacenan leads.
- [ ] Revisar precios, estados y textos de cada producto.
- [ ] Actualizar el JSON-LD si cambian precios o disponibilidad.
- [ ] Verificar `canonical`, `og:url` y `sitemap.xml` con el dominio final.
- [ ] Probar el flujo completo en móvil: menú, modal, envío y `gracias.html`.
- [ ] Probar el cambio ES/EN en todas las secciones.
- [ ] Validar que las landings públicas (cuando existan) abran en una pestaña
  nueva y tengan `rel="noopener"`.

## Pendientes de contenido

- Confirmar las descripciones de los clientes en `#clientes` (victorburbano.com,
  villajuana.co, oceanshapespa.com e intergroup.com.co).
- Enlazar las landings públicas de SADU y LogistiQR cuando estén desplegadas.
- Confirmar con cada proyecto el paso a producción antes de cambiar su estado:
  VamPOS, SIGE, Codevam Fiscal, VamCore, VECINDAD, GestiónTaxis, FruverCopilot,
  Olfatto y Vitriniando.
- Definir precios de lanzamiento para los productos que hoy dicen “a cotizar”.
- Confirmar si Grumalog se puede ofrecer como implementación a terceros o si
  debe quedar solo como caso de cliente.
- Revisar la situación contractual de GES antes de promoverlo públicamente.
- Actualizar `assets/og-image.png` si cambia la lista de productos destacados.
