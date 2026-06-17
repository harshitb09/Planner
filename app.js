// ── MAIN APP LOGIC ──

const STATE = {
  quests: {},      // { id: bool }
  applications: [], // array of app objects
  deadlines: [],    // array of deadline objects
  profile: {},
  newsFilter: 'all',
  newsData: [],
  currentTab: 'phd',
  editingAppId: null
};

// ── INIT ──
document.addEventListener('DOMContentLoaded', () => {
  updateDate();
  loadState();
  renderQuests();
  renderApplications();
  renderUniList('phd');
  renderTimeline();
  renderResources();
  updateForce();

  // Load initial news
  setTimeout(() => fetchIntelligence(), 800);
});

function updateDate() {
  const el = document.getElementById('hud-date');
  if (el) {
    const now = new Date();
    el.textContent = now.toLocaleDateString('en-GB', {
      day: '2-digit', month: 'short', year: 'numeric'
    }).toUpperCase();
  }
}

// ── STATE PERSISTENCE ──
function saveState() {
  localStorage.setItem('phd_tracker_v2', JSON.stringify({
    quests: STATE.quests,
    applications: STATE.applications,
    deadlines: STATE.deadlines,
    profile: STATE.profile
  }));
}

function loadState() {
  try {
    const raw = localStorage.getItem('phd_tracker_v2');
    if (raw) {
      const saved = JSON.parse(raw);
      STATE.quests = saved.quests || {};
      STATE.applications = saved.applications || [];
      STATE.deadlines = saved.deadlines || [];
      STATE.profile = saved.profile || {};

      // Apply profile
      if (STATE.profile.name) document.getElementById('user-name').textContent = STATE.profile.name;
      if (STATE.profile.spec) document.getElementById('spec-select').value = STATE.profile.spec;
      if (STATE.profile.target) document.getElementById('target-select').value = STATE.profile.target;
      if (STATE.profile.year) document.getElementById('year-select').value = STATE.profile.year;
    }
  } catch(e) { console.warn('State load failed', e); }
}

function saveProfile() {
  STATE.profile = {
    name: document.getElementById('user-name').textContent,
    spec: document.getElementById('spec-select').value,
    target: document.getElementById('target-select').value,
    year: document.getElementById('year-select').value
  };
  saveState();
  // Update avatar initials
  const name = STATE.profile.name || 'P S';
  const parts = name.trim().split(' ');
  const initials = parts.length >= 2
    ? (parts[0][0] + parts[parts.length - 1][0]).toUpperCase()
    : name.slice(0, 2).toUpperCase();
  document.getElementById('avatar-initials').textContent = initials;
}

// Track edits on name field
document.addEventListener('DOMContentLoaded', () => {
  const nameEl = document.getElementById('user-name');
  if (nameEl) {
    nameEl.addEventListener('blur', saveProfile);
  }
});

// ── QUESTS ──
function renderQuests() {
  const container = document.getElementById('quest-list');
  container.innerHTML = '';

  QUEST_TEMPLATES.forEach((cat, catIdx) => {
    const catDiv = document.createElement('div');

    const catLabel = document.createElement('div');
    catLabel.className = 'quest-category-label';
    catLabel.textContent = cat.category;
    catDiv.appendChild(catLabel);

    cat.items.forEach((item, itemIdx) => {
      const id = `cat${catIdx}_item${itemIdx}`;
      const done = !!STATE.quests[id];

      const row = document.createElement('div');
      row.className = `quest-item${done ? ' done' : ''}`;
      row.onclick = () => toggleQuest(id, row);

      const check = document.createElement('div');
      check.className = 'quest-check';
      check.textContent = done ? '✓' : '';

      const text = document.createElement('div');
      text.className = 'quest-text';
      text.textContent = item;

      row.appendChild(check);
      row.appendChild(text);
      catDiv.appendChild(row);
    });

    container.appendChild(catDiv);
  });

  // Custom quests
  const customs = STATE.profile.customQuests || [];
  if (customs.length > 0) {
    const customCat = document.createElement('div');
    const customLabel = document.createElement('div');
    customLabel.className = 'quest-category-label';
    customLabel.textContent = '⚡ CUSTOM MISSIONS';
    customCat.appendChild(customLabel);

    customs.forEach((item, idx) => {
      const id = `custom_${idx}`;
      const done = !!STATE.quests[id];
      const row = document.createElement('div');
      row.className = `quest-item${done ? ' done' : ''}`;
      row.onclick = () => toggleQuest(id, row);

      const check = document.createElement('div');
      check.className = 'quest-check';
      check.textContent = done ? '✓' : '';

      const text = document.createElement('div');
      text.className = 'quest-text';
      text.textContent = item;

      row.appendChild(check);
      row.appendChild(text);
      customCat.appendChild(row);
    });

    container.appendChild(customCat);
  }
}

function toggleQuest(id, row) {
  STATE.quests[id] = !STATE.quests[id];
  row.classList.toggle('done', STATE.quests[id]);
  row.querySelector('.quest-check').textContent = STATE.quests[id] ? '✓' : '';
  saveState();
  updateForce();
}

function addCustomQuest() {
  const label = prompt('Enter mission name:');
  if (!label || !label.trim()) return;
  if (!STATE.profile.customQuests) STATE.profile.customQuests = [];
  STATE.profile.customQuests.push(label.trim());
  saveState();
  renderQuests();
  showToast('Mission added to quest log');
}

// ── FORCE METER ──
function updateForce() {
  let total = 0, done = 0;

  QUEST_TEMPLATES.forEach((cat, catIdx) => {
    cat.items.forEach((_, itemIdx) => {
      total++;
      if (STATE.quests[`cat${catIdx}_item${itemIdx}`]) done++;
    });
  });

  const customs = STATE.profile.customQuests || [];
  customs.forEach((_, idx) => {
    total++;
    if (STATE.quests[`custom_${idx}`]) done++;
  });

  const pct = total > 0 ? Math.round((done / total) * 100) : 0;
  document.getElementById('force-fill').style.width = pct + '%';
  document.getElementById('force-pct').textContent = pct + '%';

  const title = FORCE_TITLES.slice().reverse().find(t => pct >= t.min);
  document.getElementById('force-desc').textContent = title ? title.title : 'Begin your quest';
}

// ── APPLICATIONS ──
function openAddApp() {
  document.getElementById('app-name').value = '';
  document.getElementById('app-deadline').value = '';
  document.getElementById('app-notes').value = '';
  openModal('app-modal');
}

function saveApplication() {
  const name = document.getElementById('app-name').value.trim();
  if (!name) { showToast('Enter institution name'); return; }

  const app = {
    id: Date.now().toString(),
    name,
    type: document.getElementById('app-type').value,
    country: document.getElementById('app-country').value,
    deadline: document.getElementById('app-deadline').value,
    status: document.getElementById('app-status').value,
    notes: document.getElementById('app-notes').value,
    created: new Date().toISOString()
  };

  STATE.applications.unshift(app);
  saveState();
  renderApplications();
  closeModal('app-modal');
  showToast('Mission dossier created');
}

function openEditApp(id) {
  const app = STATE.applications.find(a => a.id === id);
  if (!app) return;
  STATE.editingAppId = id;
  document.getElementById('edit-app-id').value = id;
  document.getElementById('edit-status').value = app.status;
  document.getElementById('edit-notes').value = app.notes || '';
  openModal('edit-modal');
}

function updateApplication() {
  const id = STATE.editingAppId;
  const app = STATE.applications.find(a => a.id === id);
  if (!app) return;
  app.status = document.getElementById('edit-status').value;
  app.notes = document.getElementById('edit-notes').value;
  saveState();
  renderApplications();
  closeModal('edit-modal');
  showToast('Mission status updated');
}

function deleteApplication() {
  if (!confirm('Delete this mission dossier?')) return;
  STATE.applications = STATE.applications.filter(a => a.id !== STATE.editingAppId);
  saveState();
  renderApplications();
  closeModal('edit-modal');
  showToast('Mission terminated');
}

function renderApplications() {
  const list = document.getElementById('app-list');
  const empty = document.getElementById('app-empty');
  list.innerHTML = '';

  if (STATE.applications.length === 0) {
    empty.style.display = 'block';
    return;
  }
  empty.style.display = 'none';

  const COUNTRY_FLAGS = { de: '🇩🇪', ch: '🇨🇭', nl: '🇳🇱', se: '🇸🇪', other: '🌍' };
  const TYPE_LABELS = { phd: 'PhD', job: 'JOB', postdoc: 'POSTDOC' };

  STATE.applications.forEach(app => {
    const card = document.createElement('div');
    card.className = 'app-card';
    card.onclick = () => openEditApp(app.id);

    const dot = document.createElement('div');
    dot.className = `app-status-dot status-${app.status}`;

    const info = document.createElement('div');
    info.className = 'app-info';

    const nameEl = document.createElement('div');
    nameEl.className = 'app-name';
    nameEl.textContent = `${COUNTRY_FLAGS[app.country] || '🌍'} ${app.name}`;

    const sub = document.createElement('div');
    sub.className = 'app-sub';
    sub.textContent = `${TYPE_LABELS[app.type] || app.type} · ${app.status.toUpperCase()}`;

    info.appendChild(nameEl);
    info.appendChild(sub);

    const dlEl = document.createElement('div');
    dlEl.className = 'app-deadline';

    if (app.deadline) {
      const days = Math.ceil((new Date(app.deadline) - new Date()) / 86400000);
      if (days < 0) {
        dlEl.textContent = 'Past';
        dlEl.className += ' deadline-past';
      } else if (days <= 14) {
        dlEl.textContent = `${days}d`;
        dlEl.className += ' deadline-soon';
      } else {
        dlEl.textContent = `${days}d`;
        dlEl.className += ' deadline-ok';
      }
    }

    card.appendChild(dot);
    card.appendChild(info);
    card.appendChild(dlEl);
    list.appendChild(card);
  });
}

// ── UNIVERSITY LIST ──
function switchUniTab(tab, btn) {
  STATE.currentTab = tab;
  document.querySelectorAll('.utab').forEach(b => b.classList.remove('active'));
  btn.classList.add('active');
  renderUniList(tab);
}

function renderUniList(tab) {
  const list = document.getElementById('uni-list');
  list.innerHTML = '';

  const data = tab === 'phd' ? PHD_PROGRAMS : JOB_POSTINGS;

  data.forEach(item => {
    const card = document.createElement('div');
    card.className = 'uni-card';

    const header = document.createElement('div');
    header.className = 'uni-header';

    const name = document.createElement('div');
    name.className = 'uni-name';
    name.textContent = item.name;

    const flag = document.createElement('div');
    flag.className = 'uni-country';
    flag.textContent = item.flag;

    header.appendChild(name);
    header.appendChild(flag);

    const tags = document.createElement('div');
    tags.className = 'uni-details';
    item.tags.forEach(t => {
      const tag = document.createElement('span');
      tag.className = 'uni-tag';
      tag.textContent = t;
      tags.appendChild(tag);
    });

    const dl = document.createElement('div');
    dl.className = 'uni-deadline';
    dl.textContent = `⊕ Deadline: ${item.deadline}`;

    const link = document.createElement('a');
    link.className = 'uni-link';
    link.href = item.url;
    link.target = '_blank';
    link.textContent = '→ Visit Program';

    card.appendChild(header);
    card.appendChild(tags);
    card.appendChild(dl);
    card.appendChild(link);
    list.appendChild(card);
  });
}

// ── TIMELINE ──
function openAddDeadline() {
  document.getElementById('dl-label').value = '';
  document.getElementById('dl-date').value = '';
  openModal('deadline-modal');
}

function saveDeadline() {
  const label = document.getElementById('dl-label').value.trim();
  const date = document.getElementById('dl-date').value;
  if (!label || !date) { showToast('Enter label and date'); return; }

  STATE.deadlines.push({
    id: Date.now().toString(),
    label,
    date,
    type: document.getElementById('dl-type').value
  });

  STATE.deadlines.sort((a, b) => new Date(a.date) - new Date(b.date));
  saveState();
  renderTimeline();
  closeModal('deadline-modal');
  showToast('Temporal marker set');
}

function renderTimeline() {
  const wrap = document.getElementById('timeline-wrap');
  wrap.innerHTML = '';

  // Add built-in deadlines if empty
  const items = STATE.deadlines.length > 0 ? STATE.deadlines : getDefaultDeadlines();

  items.forEach(item => {
    const row = document.createElement('div');
    row.className = 'timeline-item';

    const dot = document.createElement('div');
    dot.className = `tl-dot tl-${item.type}`;

    const content = document.createElement('div');
    content.className = 'tl-content';

    const label = document.createElement('div');
    label.className = 'tl-label';
    label.textContent = item.label;

    const date = document.createElement('div');
    date.className = 'tl-date';
    date.textContent = new Date(item.date).toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' });

    content.appendChild(label);
    content.appendChild(date);

    const days = Math.ceil((new Date(item.date) - new Date()) / 86400000);
    const daysEl = document.createElement('div');
    daysEl.className = 'tl-days';

    if (days < 0) {
      daysEl.textContent = 'Past';
      daysEl.className += ' days-past';
    } else if (days <= 7) {
      daysEl.textContent = `${days}d!`;
      daysEl.className += ' days-urgent';
    } else if (days <= 30) {
      daysEl.textContent = `${days}d`;
      daysEl.className += ' days-warn';
    } else {
      daysEl.textContent = `${days}d`;
      daysEl.className += ' days-ok';
    }

    row.appendChild(dot);
    row.appendChild(content);
    row.appendChild(daysEl);
    wrap.appendChild(row);
  });
}

function getDefaultDeadlines() {
  return [
    { id: 'd1', label: 'ETH Zurich PhD Deadline', date: '2025-12-15', type: 'phd' },
    { id: 'd2', label: 'EPFL Application', date: '2026-01-15', type: 'phd' },
    { id: 'd3', label: 'TU Munich Deadline', date: '2026-01-31', type: 'phd' },
    { id: 'd4', label: 'DAAD Scholarship', date: '2025-10-31', type: 'docs' },
    { id: 'd5', label: 'LMU Munich Deadline', date: '2026-02-28', type: 'phd' }
  ].sort((a, b) => new Date(a.date) - new Date(b.date));
}

// ── RESOURCES ──
function renderResources() {
  const list = document.getElementById('resources-list');
  list.innerHTML = '';

  RESOURCES.forEach(r => {
    const a = document.createElement('a');
    a.className = 'resource-item';
    a.href = r.url;
    a.target = '_blank';

    a.innerHTML = `
      <span class="resource-icon">${r.icon}</span>
      <div class="resource-info">
        <div class="resource-name">${r.name}</div>
        <div class="resource-desc">${r.desc}</div>
      </div>
      <span class="resource-arrow">→</span>
    `;

    list.appendChild(a);
  });
}

// ── MODAL HELPERS ──
function openModal(id) {
  document.getElementById(id).classList.add('open');
}

function closeModal(id) {
  document.getElementById(id).classList.remove('open');
}

// Close modals on overlay click
document.addEventListener('DOMContentLoaded', () => {
  document.querySelectorAll('.modal-overlay').forEach(overlay => {
    overlay.addEventListener('click', (e) => {
      if (e.target === overlay) overlay.classList.remove('open');
    });
  });
});

// ── TOAST ──
function showToast(msg) {
  const toast = document.getElementById('toast');
  toast.textContent = '⟳ ' + msg;
  toast.classList.add('show');
  setTimeout(() => toast.classList.remove('show'), 2800);
}
