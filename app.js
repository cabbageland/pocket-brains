function escapeHtml(s = '') {
  return s.replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
}

function short(text = '', len = 220) {
  return text.length > len ? `${text.slice(0, len).trim()}…` : text;
}

function formatDate(dateStr) {
  if (!dateStr) return 'Unknown date';
  const parsed = new Date(`${dateStr}T12:00:00Z`);
  if (Number.isNaN(parsed.getTime())) return dateStr;
  return parsed.toLocaleDateString(undefined, { year: 'numeric', month: 'short', day: 'numeric' });
}

function getMarked() {
  if (typeof window.marked === 'undefined') throw new Error('marked failed to load');
  return window.marked;
}

function stripLeadingMarkdownTitle(text = '') {
  return text.replace(/^#\s+.+?(\n+|$)/, '');
}

function resolveRepoRelativeUrl(url = '', notePath = '') {
  if (!url) return url;
  if (/^(https?:|data:|mailto:|tel:|#)/i.test(url)) return url;
  const base = notePath ? new URL(notePath, window.location.origin + '/') : new URL(window.location.href);
  return new URL(url, base).pathname;
}

function renderMarkdown(text = '', notePath = '') {
  const marked = getMarked();
  const renderer = new marked.Renderer();

  renderer.image = (token) => {
    const href = token?.href || token?.url || '';
    const title = token?.title || '';
    const text = token?.text || '';
    const src = resolveRepoRelativeUrl(href, notePath);
    const alt = escapeHtml(text);
    const titleAttr = title ? ` title="${escapeHtml(title)}"` : '';
    return `<img src="${src}" alt="${alt}"${titleAttr} loading="lazy" />`;
  };

  renderer.link = (token) => {
    const href = token?.href || token?.url || '';
    const title = token?.title || '';
    const text = token?.text || '';
    const resolved = resolveRepoRelativeUrl(href, notePath);
    const titleAttr = title ? ` title="${escapeHtml(title)}"` : '';
    const isExternal = /^(https?:)?\/\//i.test(resolved);
    const rel = isExternal ? ' rel="noreferrer" target="_blank"' : '';
    return `<a href="${resolved}"${titleAttr}${rel}>${text}</a>`;
  };

  marked.setOptions({ gfm: true, breaks: false, headerIds: false, mangle: false, renderer });
  return marked.parse(stripLeadingMarkdownTitle(text));
}

function githubMarkdownUrl(path = '') {
  const repo = state.content?.repo || 'cabbageland/pocket-brains';
  return `https://github.com/${repo}/blob/main/${path}`;
}

function makeClickableCard(node, path) {
  node.classList.add('clickable-card');
  node.tabIndex = 0;
  node.setAttribute('role', 'link');
  const open = () => openDetailByPath(path);
  node.addEventListener('click', (e) => {
    if (e.target.closest('a, button, summary, select, input')) return;
    open();
  });
  node.addEventListener('keydown', (e) => {
    if (e.target !== node) return;
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      open();
    }
  });
}

const state = {
  content: null,
  view: 'overview',
  query: '',
  previousView: 'overview',
  currentDetailPath: ''
};

const els = {
  hero: document.getElementById('hero'),
  stats: document.getElementById('stats'),
  latestNote: document.getElementById('latestNote'),
  latestNoteDate: document.getElementById('latestNoteDate'),
  recentPicks: document.getElementById('recentPicks'),
  notesList: document.getElementById('notesList'),
  searchInput: document.getElementById('searchInput'),
  detailTitle: document.getElementById('detailTitle'),
  detailKicker: document.getElementById('detailKicker'),
  detailMeta: document.getElementById('detailMeta'),
  detailBody: document.getElementById('detailBody'),
  detailSourceLink: document.getElementById('detailSourceLink'),
  detailBackButton: document.getElementById('detailBackButton')
};

const templates = { note: document.getElementById('noteCardTemplate') };

function noteMeta(item) {
  return [item.authors, item.venue, item.year].filter(Boolean).join(' · ');
}

function itemTags(item) {
  return Array.isArray(item.tags) ? item.tags : [];
}

function firstSentence(text = '') {
  const normalized = text.replace(/\s+/g, ' ').trim();
  if (!normalized) return '';
  const match = normalized.match(/^(.{0,220}?[.!?])(?:\s|$)/);
  return match ? match[1].trim() : short(normalized, 220);
}

function atAGlanceItems(item) {
  if (!item) return [];
  const items = [];
  if (item.verdict) items.push(item.verdict);
  if (item.summary) items.push(firstSentence(item.summary));
  else if (item.whySelected) items.push(firstSentence(item.whySelected));
  if (item.whyItMatters) items.push(firstSentence(item.whyItMatters));
  else if (item.finalDecision) items.push(firstSentence(item.finalDecision));
  return items.filter(Boolean).slice(0, 3);
}

function detailRecord(path) {
  const item = state.content?.notes?.find((entry) => entry.path === path);
  if (item) {
    return {
      kind: 'Paper note',
      title: item.title,
      meta: [noteMeta(item), formatDate(item.dateRead)].filter(Boolean).join(' · ')
    };
  }
  return { kind: 'Markdown', title: path.split('/').pop() || path, meta: '' };
}

function openDetailByPath(path) {
  if (!state.content?.markdown?.[path]) {
    window.open(githubMarkdownUrl(path), '_blank', 'noreferrer');
    return;
  }
  const record = detailRecord(path);
  state.previousView = state.view === 'detail' ? state.previousView : state.view;
  state.currentDetailPath = path;
  els.detailKicker.textContent = record.kind;
  els.detailTitle.textContent = record.title;
  els.detailMeta.textContent = record.meta || '';
  els.detailBody.innerHTML = renderMarkdown(state.content.markdown[path], path);
  els.detailSourceLink.href = githubMarkdownUrl(path);
  els.detailSourceLink.textContent = 'open on GitHub';
  setActiveView('detail');
  window.scrollTo({ top: 0, behavior: 'smooth' });
}

function renderHero() {
  const latest = state.content?.notes?.[0];
  if (!latest) {
    els.hero.innerHTML = '';
    return;
  }
  const glanceItems = atAGlanceItems(latest);
  const subtitle = latest.summary || latest.whySelected || 'A fresh neuro note ready to read.';
  els.hero.innerHTML = `
    <div class="hero-grid">
      <div class="hero-main">
        <div class="kicker">Pocket neuro shelf</div>
        <h2><button class="hero-title-link reset-button" data-open-path="${latest.path}">${escapeHtml(latest.title)}</button></h2>
        <p class="big">${escapeHtml(subtitle)}</p>
        <div class="hero-picks">
          <div class="hero-picks-label">At a glance</div>
          <ol class="hero-picks-list">
            ${glanceItems.map((item) => `<li>${escapeHtml(item)}</li>`).join('') || '<li>Fresh neuro note.</li>'}
          </ol>
        </div>
        <a class="hero-scroll" href="#view-overview">↓ Scroll down for the shelf</a>
      </div>
    </div>
  `;
  els.hero.querySelector('[data-open-path]')?.addEventListener('click', () => openDetailByPath(latest.path));
}

function renderStats() {
  const items = state.content?.notes || [];
  const tagCount = new Set(items.flatMap((item) => itemTags(item))).size;
  const venueCount = new Set(items.map((item) => item.venue).filter(Boolean)).size;
  const statData = [
    ['Neuro notes', items.length],
    ['Tracked venues', venueCount],
    ['Tracked tags', tagCount]
  ];
  els.stats.innerHTML = statData.map(([label, value]) => `
    <article class="stat">
      <div class="label">${label}</div>
      <div class="value">${value}</div>
    </article>
  `).join('');
}

function renderOverview() {
  const latest = state.content.notes[0];
  els.latestNoteDate.textContent = formatDate(latest.dateRead || latest.addedAt);
  els.latestNote.innerHTML = `
    <h3><button class="card-title-link reset-button" data-open-path="${latest.path}">${escapeHtml(latest.title)}</button></h3>
    <p class="theme">${escapeHtml(latest.verdict || 'Neuro note')}</p>
    <p>${escapeHtml(latest.summary || latest.whySelected || '')}</p>
    <p class="why-matters">${escapeHtml(short(latest.whyItMatters || latest.finalDecision || '', 280))}</p>
    <p><button class="button ghost reset-button" data-open-path="${latest.path}">read note here</button></p>
  `;
  els.latestNote.querySelectorAll('[data-open-path]').forEach((node) => node.addEventListener('click', () => openDetailByPath(latest.path)));
  makeClickableCard(els.latestNote, latest.path);

  const recent = state.content.notes.slice(0, 5);
  els.recentPicks.innerHTML = recent.map((note) => `
    <article class="mini-pick" data-href="${note.path}">
      <div class="card-meta-row">
        <button class="chip verdict reset-button" data-open-path="${note.path}">${escapeHtml(note.verdict || 'Unknown')}</button>
        <button class="chip reset-button" data-open-path="${note.path}">${escapeHtml(note.venue || 'Unknown venue')}</button>
      </div>
      <h4><button class="card-title-link reset-button" data-open-path="${note.path}">${escapeHtml(note.title)}</button></h4>
      <p>${escapeHtml(short(note.whySelected || note.verdictText || note.summary, 180))}</p>
    </article>
  `).join('');
  els.recentPicks.querySelectorAll('.mini-pick').forEach((node) => makeClickableCard(node, node.dataset.href));
  els.recentPicks.querySelectorAll('[data-open-path]').forEach((node) => {
    node.addEventListener('click', (e) => {
      e.stopPropagation();
      openDetailByPath(node.dataset.openPath);
    });
  });
}

function renderNotes() {
  const q = state.query.trim().toLowerCase();
  const items = state.content.notes.filter((item) => !q || (item.searchText || '').toLowerCase().includes(q));
  els.notesList.innerHTML = '';

  if (!items.length) {
    els.notesList.innerHTML = '<article class="panel"><p>No neuro notes matched the current search.</p></article>';
    return;
  }

  for (const item of items) {
    const node = templates.note.content.firstElementChild.cloneNode(true);
    const verdict = node.querySelector('.verdict');
    verdict.textContent = item.verdict || 'Open note';
    verdict.href = item.paperUrl || githubMarkdownUrl(item.path);

    const venue = node.querySelector('.venue');
    venue.textContent = item.venue || 'Unknown venue';
    venue.href = item.paperUrl || githubMarkdownUrl(item.path);

    const tagCount = node.querySelector('.tag-count');
    tagCount.textContent = `${itemTags(item).length} tags`;

    node.querySelector('h3').textContent = item.title;
    node.querySelector('.why').textContent = item.whySelected || '';
    node.querySelector('.overview').textContent = item.summary || '';
    node.querySelector('.why-matters').textContent = item.whyItMatters || item.finalDecision || '';

    const tagRow = node.querySelector('.tag-row');
    tagRow.innerHTML = itemTags(item).slice(0, 8).map((tag) => `<span class="chip">${escapeHtml(tag)}</span>`).join('');

    const paperLink = node.querySelector('.paper-link');
    paperLink.href = item.paperUrl || githubMarkdownUrl(item.path);
    paperLink.textContent = 'paper';

    const mdLink = node.querySelector('.md-link');
    mdLink.href = githubMarkdownUrl(item.path);
    mdLink.textContent = 'note markdown';

    makeClickableCard(node, item.path);
    els.notesList.appendChild(node);
  }
}

function setActiveView(view) {
  state.view = view;
  document.querySelectorAll('.view').forEach((node) => node.classList.toggle('active', node.id === `view-${view}`));
  document.querySelectorAll('.tabs [data-view]').forEach((node) => node.classList.toggle('active', node.dataset.view === view));
}

function renderAll() {
  renderHero();
  renderStats();
  renderOverview();
  renderNotes();
}

async function init() {
  const res = await fetch('./data/content.json', { cache: 'no-store' });
  state.content = await res.json();
  renderAll();

  document.querySelectorAll('.tabs [data-view]').forEach((btn) => {
    btn.addEventListener('click', () => setActiveView(btn.dataset.view));
  });

  els.searchInput.addEventListener('input', (e) => {
    state.query = e.target.value;
    renderNotes();
  });

  els.detailBackButton.addEventListener('click', () => setActiveView(state.previousView || 'overview'));
}

init().catch((err) => {
  console.error(err);
  document.body.innerHTML = `<pre style="padding: 24px; color: white;">Failed to load Pocket Brains:\n${escapeHtml(String(err))}</pre>`;
});
