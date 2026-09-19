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

function getScript(lang){
  return terminalScripts[lang] || terminalScripts.es;
}

function renderStatic(lang){
  if (!term) return;
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
  const script = getScript(lang);
  if(reduce){ renderStatic(lang); return; }
  term.innerHTML = '';
  for(const l of script){
    const row = document.createElement('div');
    row.className = 'line';
    const span = document.createElement('span');
    span.className = l.t === 'prompt' ? 'prompt' : (l.t === 'ok' ? 'ok' : 'out');
    row.appendChild(span);
    term.appendChild(row);
    await typeLine(span, l.text, l.t === 'prompt' ? 38 : 16);
    await new Promise(r => setTimeout(r, 220));
  }
  const cur = document.createElement('span');
  cur.className = 'cursor';
  if (term.lastChild) {
    term.lastChild.appendChild(cur);
  }
}

window.codevamTerminal = { renderStatic };
run(window.codevamLang || 'es');

/* -------------------------------------------------------------------------- */
/*                          LÓGICA DEL MODAL DE WHATSAPP                      */
/* -------------------------------------------------------------------------- */

document.addEventListener('DOMContentLoaded', () => {
  const modal = document.getElementById('wa-modal');
  const waLinks = document.querySelectorAll('.wa-link');
  const waForm = document.getElementById('wa-form');
  const waClose = document.getElementById('wa-close');

  const WEBHOOK_URL = ''; // Dejar vacío si no hay backend activo

  // Abrir modal al hacer clic en enlaces de WhatsApp
  waLinks.forEach(link => {
    link.addEventListener('click', (e) => {
      e.preventDefault();
      if (modal) {
        modal.style.display = 'flex';
      }
    });
  });

  // Cerrar el modal
  if (waClose) {
    waClose.addEventListener('click', () => {
      if (modal) modal.style.display = 'none';
    });
  }

  if (modal) {
    modal.addEventListener('click', (e) => {
      if (e.target === modal) {
        modal.style.display = 'none';
      }
    });
  }

  // Enviar formulario
  if (waForm) {
    waForm.addEventListener('submit', async (e) => {
      e.preventDefault();
      
      const submitBtn = document.getElementById('wa-submit-btn');
      const nombreInput = document.getElementById('wa-nombre');
      const servicioInput = document.getElementById('wa-servicio');
      
      const nombre = nombreInput ? nombreInput.value.trim() : '';
      if (!nombre) return;

      let servicio = 'Software a medida';
      if (servicioInput && servicioInput.selectedIndex !== -1) {
        servicio = servicioInput.options[servicioInput.selectedIndex].text;
      }
      
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
          mensaje = WA_TEMPLATE[lang](nombre, servicio);
        } else {
          mensaje = lang === 'en' 
            ? `Hello Codevam, my name is ${nombre}. I would like to get a quote for a project: ${servicio}.`
            : `Hola Codevam, mi nombre es ${nombre}. Quisiera cotizar un proyecto de: ${servicio}.`;
        }

        const textEncoded = encodeURIComponent(mensaje);
        const waUrl = `https://api.whatsapp.com/send/?phone=573156793777&text=${textEncoded}`;

        // 4. Redirigir a gracias.html
        window.location.href = `gracias.html?redirect=${encodeURIComponent(waUrl)}`;

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