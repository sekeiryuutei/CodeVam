/*
  codevam — internacionalización (ES/EN)
  ---------------------------------------
  Traduce el contenido marcado con [data-i18n] / [data-i18n-html] usando el
  diccionario TRANSLATIONS de abajo. Guarda el idioma elegido en localStorage
  para recordarlo en la siguiente visita.

  Para agregar un texto nuevo al sistema de idiomas:
  1. Agrega data-i18n="mi_clave" al elemento en index.html (o data-i18n-html
     si el texto tiene etiquetas HTML adentro, como <br> o <span>).
  2. Agrega la clave acá abajo con su versión "es" y "en".

  Expone window.codevamLang (idioma activo) y escucha window.codevamTerminal
  (definido en script.js) para actualizar el terminal del hero sin repetir
  la animación de escritura en cada cambio de idioma.
*/

var TRANSLATIONS = {
  nav_servicios: { es: 'servicios', en: 'services' },
  nav_productos: { es: 'productos', en: 'products' },
  nav_clientes:  { es: 'clientes',  en: 'clients' },
  nav_proceso:   { es: 'proceso',   en: 'process' },
  nav_hablemos:  { es: 'hablemos',  en: "let's talk" },

  hero_eyebrow: { es: 'estudio de desarrollo de software', en: 'software development studio' },
  hero_h1: {
    es: 'Software a la medida,<br>escrito para <span class="accent">tu negocio</span>.',
    en: 'Custom software,<br>built for <span class="accent">your business</span>.'
  },
  hero_lead: {
    es: 'Diseñamos y construimos sitios web, aplicaciones y sistemas a la medida de empresas y personas. Sin plantillas, sin atajos: cada proyecto se piensa desde cero.',
    en: 'We design and build custom websites, applications, and systems for businesses and individuals. No templates, no shortcuts: every project is planned from scratch.'
  },
  hero_cta_primary: { es: 'Cuéntame tu proyecto', en: 'Tell me about your project' },
  hero_cta_secondary: { es: 'Ver servicios', en: 'View services' },
  terminal_title: { es: 'codevam — nueva sesión', en: 'codevam — new session' },

  servicios_eyebrow: { es: 'qué hacemos', en: 'what we do' },
  servicios_h2: { es: 'Un equipo técnico para el software que tu negocio necesita.', en: 'A technical team for the software your business needs.' },

  tag_01: { es: '01 · web', en: '01 · web' },
  card1_h3: { es: 'Sitios y aplicaciones web', en: 'Websites and web applications' },
  card1_p: { es: 'Landing pages, portales, paneles internos y plataformas a la medida, rápidas y fáciles de mantener.', en: 'Landing pages, portals, internal dashboards, and custom platforms — fast and easy to maintain.' },

  tag_02: { es: '02 · software', en: '02 · software' },
  card2_h3: { es: 'Software a medida', en: 'Custom software' },
  card2_p: { es: 'Sistemas hechos para tu proceso real: inventarios, reservas, facturación, gestión interna.', en: 'Systems built for your real process: inventory, bookings, billing, internal management.' },

  tag_03: { es: '03 · mobile', en: '03 · mobile' },
  card3_h3: { es: 'Aplicaciones móviles', en: 'Mobile apps' },
  card3_p: { es: 'Apps para iOS y Android conectadas a tu operación, desde el prototipo hasta la publicación.', en: 'iOS and Android apps connected to your operation, from prototype to launch.' },

  tag_04: { es: '04 · automatizacion', en: '04 · automation' },
  card4_h3: { es: 'Automatización e integraciones', en: 'Automation and integrations' },
  card4_p: { es: 'Conectamos tus herramientas y automatizamos tareas repetitivas para que tu equipo gane tiempo.', en: 'We connect your tools and automate repetitive tasks so your team saves time.' },

  tag_05: { es: '05 · consultoria', en: '05 · consulting' },
  card5_h3: { es: 'Consultoría técnica', en: 'Technical consulting' },
  card5_p: { es: 'Revisamos tu idea o tu producto actual y te decimos, en claro, qué construir y cómo.', en: 'We review your idea or current product and tell you, clearly, what to build and how.' },

  tag_06: { es: '06 · soporte', en: '06 · support' },
  card6_h3: { es: 'Mantenimiento y soporte', en: 'Maintenance and support' },
  card6_p: { es: 'Acompañamiento después del lanzamiento: mejoras, correcciones y nuevas funciones.', en: 'Support after launch: improvements, fixes, and new features.' },

  tag_07: { es: '07 · excel', en: '07 · excel' },
  card7_h3: { es: 'Excel y hojas de cálculo', en: 'Excel and spreadsheets' },
  card7_p: { es: 'Fórmulas, tablas dinámicas y automatización de hojas de cálculo — te las armo o te enseño a manejarlas, según lo que necesites.', en: "Formulas, pivot tables, and spreadsheet automation — I'll build them for you or teach you to use them, whatever you need." },

  proceso_eyebrow: { es: 'cómo trabajamos', en: 'how we work' },
  proceso_h2: { es: 'Cuatro pasos, sin sorpresas en el camino.', en: 'Four steps, no surprises along the way.' },
  proc1_h3: { es: 'Diagnóstico', en: 'Discovery' },
  proc1_p: { es: 'Entendemos tu problema, tu proceso actual y qué resultado esperas del proyecto.', en: 'We understand your problem, your current process, and the result you expect from the project.' },
  proc2_h3: { es: 'Propuesta', en: 'Proposal' },
  proc2_p: { es: 'Te compartimos alcance, tiempos y costo claro antes de escribir una sola línea de código.', en: 'We share scope, timeline, and a clear cost before writing a single line of code.' },
  proc3_h3: { es: 'Desarrollo', en: 'Development' },
  proc3_p: { es: 'Construimos por etapas, con avances visibles para que veas el progreso real del producto.', en: "We build in stages, with visible progress so you can see the product's real progress." },
  proc4_h3: { es: 'Entrega y soporte', en: 'Delivery and support' },
  proc4_p: { es: 'Lanzamos, te capacitamos en el uso y quedamos disponibles para ajustes posteriores.', en: 'We launch, train you on how to use it, and stay available for later adjustments.' },

  why_eyebrow: { es: 'por qué codevam', en: 'why codevam' },
  why_h2: { es: 'Un desarrollador que entiende de negocio, no solo de código.', en: 'A developer who understands business, not just code.' },
  why1_h3: { es: 'Hecho a la medida', en: 'Built to fit' },
  why1_p: { es: 'Cada proyecto se diseña desde cero para tu proceso, no se adapta un molde genérico.', en: "Every project is designed from scratch around your process — it's never squeezed into a generic template." },
  why2_h3: { es: 'Comunicación directa', en: 'Direct communication' },
  why2_p: { es: 'Hablas siempre con quien construye tu producto, en un lenguaje claro y sin tecnicismos innecesarios.', en: 'You always talk directly with whoever is building your product, in plain language without unnecessary jargon.' },
  why3_h3: { es: 'Acompañamiento real', en: 'Real support' },
  why3_p: { es: 'No desaparecemos después de la entrega: seguimos disponibles para soporte y mejoras.', en: "We don't disappear after delivery — we stay available for support and improvements." },

  productos_eyebrow: { es: 'nuestros productos', en: 'our products' },
  productos_h2: { es: 'Además de proyectos a la medida, construimos nuestras propias soluciones.', en: 'Besides custom projects, we also build our own products.' },
  badge_dev: { es: 'en desarrollo', en: 'in development' },
  product_tagline: { es: 'Cada negocio tiene su propia página para vender en línea, cobrar y llevar el control del inventario, todo en un solo lugar.', en: 'Every business gets its own page to sell online, take payments, and manage inventory — all in one place.' },
  feat1: { es: 'Página de ventas personalizada para cada negocio', en: 'Custom sales page for each business' },
  feat2: { es: 'Cobro en línea con pagos por PSE', en: 'Online payments via PSE' },
  feat3: { es: 'Módulo de cotizaciones para enviar a clientes', en: 'Quoting module to send to clients' },
  feat4: { es: 'Control de inventarios en tiempo real', en: 'Real-time inventory tracking' },
  feat5: { es: 'Reporte automático de ventas a la DIAN', en: 'Automatic sales reporting to DIAN' },
  feat6: { es: 'Informes y analítica de ventas', en: 'Sales reports and analytics' },
  product_cta: { es: 'Quiero enterarme cuando esté disponible', en: 'Notify me when it launches' },
  mock_title: { es: 'vitriniando — panel de tienda', en: 'vitriniando — store dashboard' },
  mock_label1: { es: 'ventas de hoy', en: "today's sales" },
  mock_value1: { es: '$1.240.000', en: '$1,240,000' },
  mock_label2: { es: 'pago recibido por PSE', en: 'payment received via PSE' },
  mock_value2: { es: 'confirmado ✓', en: 'confirmed ✓' },
  mock_label3: { es: 'cotización enviada', en: 'quote sent' },
  mock_label4: { es: 'factura electrónica DIAN', en: 'DIAN e-invoice' },
  mock_value4: { es: 'enviada ✓', en: 'sent ✓' },

  clientes_eyebrow: { es: 'clientes', en: 'clients' },
  clientes_h2: { es: 'Sitios y sistemas que ya están en producción.', en: 'Sites and systems already in production.' },
  tag_prod: { es: 'en producción', en: 'in production' },
  client1_p: { es: 'Sitio y portafolio profesional de Victor Burbano.', en: "Victor Burbano's professional site and portfolio." },
  client2_p: { es: 'Sitio web a medida para Villa Juana.', en: 'Custom website for Villa Juana.' },
  client3_p: { es: 'Spa y centro de estética.', en: 'Spa and aesthetics center.' },
  client4_p: { es: 'Sitio web corporativo para Intergroup.', en: 'Corporate website for Intergroup.' },

  otros_eyebrow: { es: 'otros proyectos', en: 'other projects' },
  otros_h3: { es: 'Software adicional que también hemos construido.', en: "More software we've also built." },
  proj1_p: { es: 'Sistema de gestión de almacenes (WMS) para la operación logística de Herpo.', en: "Warehouse management system (WMS) for Herpo's logistics operation." },
  ptag2: { es: 'gestión de proyectos', en: 'project management' },
  proj2_p: { es: 'Plataforma web para centralizar la planeación, el seguimiento y el control climático del cronograma de energización de proyectos eléctricos residenciales.', en: 'Web platform to centralize the planning, tracking, and weather-driven control of the energization schedule for residential electrical projects.' },
  ptag3: { es: 'en pruebas', en: 'in testing' },
  proj3_p: { es: 'Sistema para agendar visitas técnicas con freelancers externos: controla el estado de cada cita y envía notificaciones automáticas por correo.', en: 'System for scheduling technical visits with outside freelancers: tracks the status of each visit and sends automatic email notifications.' },
  ptag4: { es: 'servicios técnicos', en: 'technical services' },
  proj4_p: { es: 'Página para vender instalación de cámaras de vigilancia, conexiones eléctricas y redes.', en: 'Page for selling surveillance camera installation, electrical wiring, and networking services.' },

  contacto_eyebrow: { es: 'empecemos', en: "let's start" },
  contacto_h2: { es: '¿Tienes un proyecto en mente?', en: 'Have a project in mind?' },
  contacto_p: { es: 'Cuéntame qué necesitas y te respondo con una primera idea de alcance y tiempos, sin costo.', en: "Tell me what you need and I'll get back to you with an initial idea of scope and timeline, at no cost." },
  wa_cta: { es: 'Escríbenos por WhatsApp', en: 'Message us on WhatsApp' },
  contacto_cta_secondary: { es: 'Ver todos los servicios', en: 'View all services' },

  footer_tagline: { es: 'Software a medida.', en: 'Custom software.' }
};

var WA_MESSAGE = {
  es: 'Hola, quiero contarte sobre mi proyecto',
  en: "Hi, I'd like to tell you about my project"
};

var TITLES = {
  es: 'Codevam — desarrollo de software a medida en Colombia',
  en: 'Codevam — custom software development in Colombia'
};

function applyLanguage(lang){
  document.querySelectorAll('[data-i18n]').forEach(function(el){
    var entry = TRANSLATIONS[el.getAttribute('data-i18n')];
    if(entry) el.textContent = entry[lang] || entry.es;
  });
  document.querySelectorAll('[data-i18n-html]').forEach(function(el){
    var entry = TRANSLATIONS[el.getAttribute('data-i18n-html')];
    if(entry) el.innerHTML = entry[lang] || entry.es;
  });

  document.querySelectorAll('.wa-link').forEach(function(el){
    el.href = 'https://wa.me/573156793777?text=' + encodeURIComponent(WA_MESSAGE[lang] || WA_MESSAGE.es);
  });
  var waFloat = document.querySelector('.whatsapp-float');
  if(waFloat) waFloat.setAttribute('aria-label', TRANSLATIONS.wa_cta[lang] || TRANSLATIONS.wa_cta.es);

  document.documentElement.lang = lang;
  document.title = TITLES[lang] || TITLES.es;

  var toggle = document.querySelector('.lang-toggle');
  if(toggle){
    toggle.querySelectorAll('[data-lang]').forEach(function(opt){
      opt.classList.toggle('is-active', opt.getAttribute('data-lang') === lang);
    });
  }

  if(window.codevamTerminal) window.codevamTerminal.renderStatic(lang);
  window.codevamLang = lang;
}

document.addEventListener('click', function(e){
  var opt = e.target.closest('[data-lang]');
  if(!opt) return;
  var lang = opt.getAttribute('data-lang');
  if(lang === window.codevamLang) return;
  try { localStorage.setItem('codevam_lang', lang); } catch(e2) { /* localStorage no disponible */ }
  applyLanguage(lang);
});

var initialLang = 'es';
try {
  if(localStorage.getItem('codevam_lang') === 'en') initialLang = 'en';
} catch(e3) { /* localStorage no disponible, se usa español por defecto */ }

window.codevamLang = initialLang;
applyLanguage(initialLang);
