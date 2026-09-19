/*
  codevam — interacciones de la landing page
  --------------------------------------------
  Anima el bloque de terminal del hero escribiendo el guion línea por línea,
  en el idioma activo (window.codevamLang, definido por assets/i18n.js, que
  se carga antes que este archivo). Respeta prefers-reduced-motion: si el
  usuario lo tiene activado, muestra el contenido final sin animar.

  Expone window.codevamTerminal.renderStatic(lang) para que i18n.js pueda
  actualizar el terminal cuando cambia el idioma, sin repetir la animación.
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
  term.lastChild.appendChild(cur);
}

// assets/i18n.js llama a esto en cada cambio de idioma (sin re-animar)
window.codevamTerminal = { renderStatic };

run(window.codevamLang || 'es');
