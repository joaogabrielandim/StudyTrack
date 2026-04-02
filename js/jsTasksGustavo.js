/* ══════════════════════════════════════
   STUDY TRACK — TAREFAS
   scripts/tarefas.js
══════════════════════════════════════ */

// ══ DADOS ══

let tasks = [
  { id: 1, title: 'Estudar Trigonometria',          subject: 'Matemática', priority: 'alta',  done: true  },
  { id: 2, title: 'Ler Capítulo 5',                 subject: 'História',   priority: 'media', done: false },
  { id: 3, title: 'Resolver Exercícios de Gramática',subject: 'Português', priority: 'alta',  done: false },
  { id: 4, title: 'Revisar Fórmulas de Química',    subject: 'Ciências',   priority: 'baixa', done: false },
  { id: 5, title: 'Fazer Redação sobre Atualidades', subject: 'Português', priority: 'media', done: true  },
  { id: 6, title: 'Praticar Equações do 2º Grau',   subject: 'Matemática', priority: 'alta',  done: false },
];

let nextId = 7;
let filter  = 'todas';

const weekData = [
  { day: 'Seg', h: 3 },
  { day: 'Ter', h: 4 },
  { day: 'Qua', h: 2 },
  { day: 'Qui', h: 5 },
  { day: 'Sex', h: 2 },
  { day: 'Sáb', h: 4 },
  { day: 'Dom', h: 2 },
];

const subjectColors = {
  'Matemática': '#14b8a6',
  'Português':  '#10b981',
  'História':   '#059669',
  'Ciências':   '#6ee7b7',
};

// ══ RENDER PRINCIPAL ══

function render() {
  renderTasks();
  renderCompleted();
  updateProgress();
  renderDonut();
  renderBars();
}

// ══ LISTA DE TAREFAS PENDENTES ══

function renderTasks() {
  const list    = document.getElementById('task-list');
  const pending = tasks.filter(t => !t.done && (filter === 'todas' || t.priority === filter));

  list.innerHTML = '';

  pending.forEach((t, i) => {
    const el = document.createElement('div');
    el.className = 'task-item';
    el.style.animationDelay = `${i * 40}ms`;

    el.innerHTML = `
      <div class="task-checkbox" onclick="toggleTask(${t.id})" id="chk-${t.id}">
        <svg fill="none" stroke="currentColor" stroke-width="3" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" d="M5 13l4 4L19 7"/>
        </svg>
      </div>
      <div class="task-info">
        <div class="task-title">${t.title}</div>
        <div class="task-meta">
          <span class="task-subject">${t.subject}</span>
          <span class="dot">•</span>
          <span class="priority ${t.priority}">${capitalize(t.priority)}</span>
        </div>
      </div>
      <button class="task-delete" onclick="deleteTask(${t.id})">
        <svg fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round"
            d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7
               m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"/>
        </svg>
      </button>
    `;

    list.appendChild(el);
  });
}

// ══ TAREFAS CONCLUÍDAS ══

function renderCompleted() {
  const grid = document.getElementById('completed-grid');
  const done = tasks.filter(t => t.done);

  grid.innerHTML = '';

  done.forEach((t, i) => {
    const el = document.createElement('div');
    el.className = 'completed-item';
    el.style.animationDelay = `${i * 60}ms`;

    el.innerHTML = `
      <div class="completed-icon">
        <svg fill="none" stroke="currentColor" stroke-width="2.5" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" d="M5 13l4 4L19 7"/>
        </svg>
      </div>
      <div>
        <div class="completed-title">${t.title}</div>
        <div class="completed-sub">${t.subject}</div>
      </div>
    `;

    grid.appendChild(el);
  });
}

// ══ BARRA DE PROGRESSO ══

function updateProgress() {
  const total = tasks.length;
  const done  = tasks.filter(t => t.done).length;
  const pct   = Math.round((done / total) * 100);

  document.getElementById('progress-bar').style.width    = pct + '%';
  document.getElementById('progress-count').textContent  = `${done}/${total} concluídas`;
  document.getElementById('progress-label').textContent  = `${pct}% das tarefas concluídas`;
}

// ══ GRÁFICO DONUT ══

function renderDonut() {
  const svg = document.getElementById('donut-svg');

  // Remove segmentos anteriores
  svg.querySelectorAll('.seg').forEach(e => e.remove());

  const counts = {};
  tasks.forEach(t => {
    counts[t.subject] = (counts[t.subject] || 0) + 1;
  });

  const total = tasks.length;
  const r     = 44;
  const cx    = 60;
  const cy    = 60;
  const circ  = 2 * Math.PI * r;
  let   offset = 0;

  Object.entries(counts).forEach(([subj, count]) => {
    const pct   = count / total;
    const dash  = pct * circ;
    const gap   = circ - dash;
    const color = subjectColors[subj] || '#14b8a6';

    const circle = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
    circle.setAttribute('class',            'seg');
    circle.setAttribute('cx',              cx);
    circle.setAttribute('cy',              cy);
    circle.setAttribute('r',               r);
    circle.setAttribute('fill',            'none');
    circle.setAttribute('stroke',          color);
    circle.setAttribute('stroke-width',    '16');
    circle.setAttribute('stroke-dasharray', `${dash} ${gap}`);
    circle.setAttribute('stroke-dashoffset', -offset);
    circle.setAttribute('transform',       `rotate(-90 ${cx} ${cy})`);

    svg.appendChild(circle);
    offset += dash + 2;
  });
}

// ══ GRÁFICO DE BARRAS SEMANAL ══

function renderBars() {
  const chart = document.getElementById('bar-chart');
  chart.innerHTML = '';

  const max = Math.max(...weekData.map(d => d.h));

  weekData.forEach(d => {
    const col       = document.createElement('div');
    col.className   = 'bar-col';
    const heightPx  = (d.h / max) * 80;

    col.innerHTML = `
      <div class="bar" style="height:${heightPx}px"></div>
      <span class="bar-label">${d.day}</span>
    `;

    chart.appendChild(col);
  });
}

// ══ AÇÕES ══

/** Marca ou desmarca uma tarefa */
function toggleTask(id) {
  const t = tasks.find(t => t.id === id);
  if (!t) return;
  t.done = !t.done;
  render();
}

/** Remove uma tarefa da lista */
function deleteTask(id) {
  tasks = tasks.filter(t => t.id !== id);
  render();
}

/** Altera o filtro de prioridade */
function setFilter(f, el) {
  filter = f;
  document.querySelectorAll('.filter-tab').forEach(b => b.classList.remove('active'));
  el.classList.add('active');
  renderTasks();
}

// ══ MODAL ══

function openModal() {
  document.getElementById('modal-overlay').classList.add('open');
}

function closeModal() {
  document.getElementById('modal-overlay').classList.remove('open');
}

function closeModalOutside(e) {
  if (e.target === document.getElementById('modal-overlay')) closeModal();
}

/** Cria uma nova tarefa a partir do formulário do modal */
function createTask() {
  const title = document.getElementById('new-title').value.trim();
  if (!title) return;

  tasks.push({
    id:       nextId++,
    title,
    subject:  document.getElementById('new-subject').value,
    priority: document.getElementById('new-priority').value,
    done:     false,
  });

  document.getElementById('new-title').value = '';
  closeModal();
  render();
}

// ══ UTILITÁRIOS ══

/** Capitaliza a primeira letra de uma string */
function capitalize(str) {
  return str.charAt(0).toUpperCase() + str.slice(1);
}

// ══ INICIALIZAÇÃO ══
render();
