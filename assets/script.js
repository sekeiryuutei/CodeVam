/*
  codevam — interacciones de la landing page
  --------------------------------------------
  Anima el bloque de terminal del hero escribiendo el guion línea por línea.
  Respeta prefers-reduced-motion: si el usuario lo tiene activado, muestra
  el contenido final sin animar.
*/

const term = document.getElementById('term');
  const script = [
    { t: 'prompt', text: '$ codevam init proyecto' },
    { t: 'out', text: 'analizando tu idea...' },
    { t: 'ok', text: '✓ alcance definido' },
    { t: 'ok', text: '✓ propuesta lista' },
    { t: 'prompt', text: '$ codevam build' },
    { t: 'out', text: 'construyendo tu producto...' },
    { t: 'ok', text: '✓ listo para lanzar' },
  ];
  const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  function renderStatic(){
    term.innerHTML = script.map(l => {
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

  async function run(){
    if(reduce){ renderStatic(); return; }
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
  run();