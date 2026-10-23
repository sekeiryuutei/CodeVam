/*
  codevam — interacciones de la landing page
*/

const term = document.getElementById('term');

const terminalScripts = {
  es: [
    { t: 'prompt', text: '$ codevam init proyecto' },
    { t: 'out', text: 'analizando tu idea...' },
    { t: 'ok', text: '✓ alcance definido' },
    { t: 'ok', text: '✓ propuesta lista' },
    { t: 'prompt', text: '$ codevam build' },
    { t: 'out', text: 'construyendo tu producto...' },
    { t: 'ok', text: '✓ listo para lanzar' },
  ],
  en: [
    { t: 'prompt', text: '$ codevam init project' },
    { t: 'out', text: 'analyzing your idea...' },
    { t: 'ok', text: '✓ scope defined' },
    { t: 'ok', text: '✓ proposal ready' },
    { t: 'prompt', text: '$ codevam build' },
    { t: 'out', text: 'building your product...' },
    { t: 'ok', text: '✓ ready to launch' },
  ],
};

const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

let terminalRun = 0;

function getScript(lang){
  return terminalScripts[lang] || terminalScripts.es;
}

function renderStatic(lang){
  if (!term) return;
  terminalRun++;
  term.innerHTML = getScript(lang).map(l => {
    const cls = l.t === 'prompt' ? 'prompt' : (l.t === 'ok' ? 'ok' : 'out');
    return `<div class="line"><span class="${cls}">${l.text}</span></div>`;
  }).join('');
}

async function typeLine(el, text, speed){
  for(let i=0;i<=text.length;i++){
    el.textContent = text.slice(0,i);
    await new Promise(r => setTimeout(r, speed));
  }
}

async function run(lang){
  if (!term) return;
  const runId = ++terminalRun;
  const script = getScript(lang);
  if(reduce){ renderStatic(lang); return; }
  term.innerHTML = '';
  for(const l of script){
    if (runId !== terminalRun) return;
    const row = document.createElement('div');
    row.className = 'line';
    const span = document.createElement('span');
    span.className = l.t === 'prompt' ? 'prompt' : (l.t === 'ok' ? 'ok' : 'out');
    row.appendChild(span);
    term.appendChild(row);
    await typeLine(span, l.text, l.t === 'prompt' ? 38 : 16);
    if (runId !== terminalRun) return;
    await new Promise(r => setTimeout(r, 220));
  }
  if (runId !== terminalRun) return;
  const cur = document.createElement('span');
  cur.className = 'cursor';
  if (term.lastChild) {
    term.lastChild.appendChild(cur);
  }
}

window.codevamTerminal = { renderStatic };
run(window.codevamLang || 'es');

/* -------------------------------------------------------------------------- */
/*                              MENÚ MÓVIL                                    */
/* -------------------------------------------------------------------------- */

document.addEventListener('DOMContentLoaded', () => {
  const header = document.querySelector('header');
  const navToggle = document.querySelector('.nav-toggle');
  const navLinks = document.getElementById('navlinks');

  function setMenu(open) {
    if (!header || !navToggle) return;
    header.classList.toggle('nav-open', open);
    navToggle.setAttribute('aria-expanded', open ? 'true' : 'false');
    const lang = window.codevamLang || 'es';
    const key = open ? 'nav_close_menu' : 'nav_open_menu';
    const entry = (typeof TRANSLATIONS !== 'undefined' && TRANSLATIONS[key]) ? TRANSLATIONS[key] : null;
    const fallback = open ? 'Cerrar menú' : 'Abrir menú';
    navToggle.setAttribute('aria-label', entry ? (entry[lang] || entry.es) : fallback);
  }

  if (navToggle) {
    navToggle.addEventListener('click', () => {
      setMenu(!header.classList.contains('nav-open'));
    });
  }

  if (navLinks) {
    navLinks.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => setMenu(false));
    });
  }

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && header && header.classList.contains('nav-open')) {
      setMenu(false);
      if (navToggle) navToggle.focus();
    }
  });

  document.addEventListener('click', (e) => {
    if (!header || !header.classList.contains('nav-open')) return;
    if (!header.contains(e.target)) setMenu(false);
  });

  window.addEventListener('resize', () => {
    if (window.innerWidth > 900 && header && header.classList.contains('nav-open')) setMenu(false);
  });
});

/* -------------------------------------------------------------------------- */
/*                          LÓGICA DEL MODAL DE WHATSAPP                      */
/* -------------------------------------------------------------------------- */

document.addEventListener('DOMContentLoaded', () => {
  const modal = document.getElementById('wa-modal');
  const waLinks = document.querySelectorAll('.wa-link');
  const productButtons = document.querySelectorAll('.product-cta');
  const waForm = document.getElementById('wa-form');
  const waClose = document.getElementById('wa-close');
  const serviceSelect = document.getElementById('wa-servicio');
  const nameInput = document.getElementById('wa-nombre');

  const DEFAULT_SERVICE = 'Software a medida';
  const WEBHOOK_URL = ''; // Dejar vacío si no hay backend activo

  let lastFocused = null;

  const pageRegions = document.querySelectorAll(
    'body > header, body > main, body > footer, body > .whatsapp-float, body > .skip-link'
  );

  function setPageInert(value) {
    pageRegions.forEach(el => {
      if (value) el.setAttribute('inert', '');
      else el.removeAttribute('inert');
    });
  }

  function setSelectValue(value) {
    if (!serviceSelect || !value) return;
    const option = Array.from(serviceSelect.options).find(o => o.value === value);
    if (option) {
      serviceSelect.value = value;
    } else {
      const extra = document.createElement('option');
      extra.value = value;
      extra.textContent = value;
      serviceSelect.appendChild(extra);
      serviceSelect.value = value;
    }
  }

  function openModal(intent, product) {
    if (!modal) return;
    if (modal.hidden) lastFocused = document.activeElement;
    if (waForm) {
      waForm.dataset.intent = intent || 'quote';
      waForm.dataset.product = product || '';
    }
    if (product) setSelectValue(product);
    modal.hidden = false;
    document.body.classList.add('modal-open');
    setPageInert(true);
    window.setTimeout(() => {
      if (nameInput) nameInput.focus();
    }, 30);
  }

  function closeModal() {
    if (!modal) return;
    modal.hidden = true;
    document.body.classList.remove('modal-open');
    setPageInert(false);
    if (lastFocused && typeof lastFocused.focus === 'function') lastFocused.focus();
    lastFocused = null;
  }

  /* Abrir desde los botones generales de WhatsApp */
  waLinks.forEach(link => {
    link.addEventListener('click', (e) => {
      e.preventDefault();
      if (waForm) {
        waForm.dataset.intent = 'quote';
        waForm.dataset.product = '';
      }
      if (serviceSelect) serviceSelect.value = DEFAULT_SERVICE;
      openModal('quote', '');
    });
  });

  /* Abrir desde la tarjeta de un producto */
  productButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      const product = btn.getAttribute('data-product') || '';
      const intent = btn.getAttribute('data-intent') || 'demo';
      openModal(intent, product);
    });
  });

  if (waClose) waClose.addEventListener('click', closeModal);

  if (serviceSelect) {
    serviceSelect.addEventListener('change', () => {
      if (!waForm) return;
      if (serviceSelect.value !== waForm.dataset.product) {
        waForm.dataset.intent = 'quote';
        waForm.dataset.product = '';
      }
    });
  }

  if (modal) {
    modal.addEventListener('click', (e) => {
      if (e.target === modal) closeModal();
    });

    modal.addEventListener('keydown', (e) => {
      if (e.key === 'Escape') {
        e.preventDefault();
        closeModal();
        return;
      }
      if (e.key !== 'Tab') return;

      const focusables = Array.from(
        modal.querySelectorAll('button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])')
      ).filter(el => !el.disabled && el.offsetParent !== null);

      if (!focusables.length) return;
      const first = focusables[0];
      const last = focusables[focusables.length - 1];

      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault();
        first.focus();
      }
    });
  }

  /* Enviar formulario */
  if (waForm) {
    waForm.addEventListener('submit', async (e) => {
      e.preventDefault();

      const submitBtn = document.getElementById('wa-submit-btn');
      const nombre = nameInput ? nameInput.value.trim() : '';
      if (!nombre) return;

      let servicio = DEFAULT_SERVICE;
      if (serviceSelect && serviceSelect.selectedIndex !== -1) {
        servicio = serviceSelect.options[serviceSelect.selectedIndex].text;
      }

      const intent = waForm.dataset.intent || 'quote';
      const producto = waForm.dataset.product || '';
      const lang = window.codevamLang || 'es';

      if (submitBtn) {
        submitBtn.disabled = true;
        submitBtn.textContent = (typeof TRANSLATIONS !== 'undefined' && TRANSLATIONS.modal_processing)
          ? (TRANSLATIONS.modal_processing[lang] || 'Procesando...')
          : 'Procesando...';
      }

      try {
        const leadData = {
          nombre,
          servicio,
          producto,
          intent,
          idioma: lang,
          fecha: new Date().toISOString()
        };

        // 1. Guardar copia local en localStorage
        try {
          const existingLeads = JSON.parse(localStorage.getItem('codevam_leads') || '[]');
          existingLeads.push(leadData);
          localStorage.setItem('codevam_leads', JSON.stringify(existingLeads));
        } catch (err) {
          console.error('Error al guardar en localStorage:', err);
        }

        // 2. Enviar a webhook solo si existe una URL configurada
        if (WEBHOOK_URL && WEBHOOK_URL.trim() !== '') {
          await fetch(WEBHOOK_URL, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(leadData)
          }).catch(err => console.error('Error al enviar webhook:', err));
        }

        // 3. Concatenar mensaje dinámico para WhatsApp
        let mensaje = '';
        if (typeof WA_TEMPLATE !== 'undefined' && WA_TEMPLATE[lang]) {
          mensaje = WA_TEMPLATE[lang](nombre, servicio, intent);
        } else {
          mensaje = lang === 'en'
            ? `Hello Codevam, my name is ${nombre}. I would like to get a quote for a project: ${servicio}.`
            : `Hola Codevam, mi nombre es ${nombre}. Quisiera cotizar un proyecto de: ${servicio}.`;
        }

        const textEncoded = encodeURIComponent(mensaje);
        const waUrl = `https://api.whatsapp.com/send/?phone=573156793777&text=${textEncoded}`;

        // 4. Redirigir a gracias.html
        window.location.href = `gracias.html?redirect=${encodeURIComponent(waUrl)}&lang=${lang}`;

      } catch (error) {
        console.error('Error en el envío:', error);
        // Respaldo de redirección directa a WhatsApp
        const fallbackMsg = encodeURIComponent(`Hola Codevam, mi nombre es ${nombre}. Quisiera cotizar: ${servicio}.`);
        window.location.href = `https://api.whatsapp.com/send/?phone=573156793777&text=${fallbackMsg}`;
      } finally {
        // Restaurar estado del botón si permanece en pantalla
        setTimeout(() => {
          if (submitBtn) {
            submitBtn.disabled = false;
            submitBtn.textContent = (typeof TRANSLATIONS !== 'undefined' && TRANSLATIONS.modal_submit_btn)
              ? (TRANSLATIONS.modal_submit_btn[lang] || 'Iniciar chat en WhatsApp')
              : 'Iniciar chat en WhatsApp';
          }
        }, 2500);
      }
    });
  }
});
