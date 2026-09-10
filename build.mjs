#!/usr/bin/env node
// MeshCore ITA — static site generator. Node stdlib only, no dependencies.
// Reads templates/layout.html + every content/<slug>.html and writes
// <slug>/index.html, sitemap.xml, robots.txt and 404.html at the repo root.
//
// Usage:
//   node build.mjs           write generated files to disk
//   node build.mjs --check   build in memory, fail if committed output drifts

import { readFileSync, writeFileSync, mkdirSync, readdirSync, existsSync } from 'node:fs';
import { join, dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const ROOT = dirname(fileURLToPath(import.meta.url));

// --- site base resolution ------------------------------------------------
// Every internal link/asset in generated pages is relative, so the site
// works unchanged at any mount point. Only the handful of URLs that must be
// absolute (canonical, og:*, JSON-LD, sitemap <loc>, robots.txt Sitemap:)
// need a real origin, resolved in order from:
//   1. SITE_BASE env var, verbatim (must end with "/").
//   2. GITHUB_REPOSITORY env var, set automatically by GitHub Actions:
//        "<owner>/<owner>.github.io" -> "https://<owner>.github.io/"
//        "<owner>/<repo>"            -> "https://<owner>.github.io/<repo>/"
//   3. Fallback: this repo's current GitHub Pages URL. If the repo is later
//      renamed to meshcore-ita.github.io, case 2 makes this resolve to the
//      root automatically, with no code change.
function resolveSiteBase() {
  const envBase = process.env.SITE_BASE;
  if (envBase) return envBase;
  const repo = process.env.GITHUB_REPOSITORY;
  if (repo) {
    const [owner, repoName] = repo.split('/');
    if (owner && repoName) {
      const host = `${owner}.github.io`;
      return repoName.toLowerCase() === host.toLowerCase()
        ? `https://${host}/`
        : `https://${host}/${repoName}/`;
    }
  }
  return 'https://meshcore-ita.github.io/';
}

export const SITE_BASE = resolveSiteBase();
if (!SITE_BASE.endsWith('/')) {
  throw new Error(`SITE_BASE deve terminare con "/": ${SITE_BASE}`);
}

const REPO_EDIT_BASE =
  'https://github.com/meshcore-ita/meshcore-ita.github.io/edit/main/';
const CONTENT_DIR = join(ROOT, 'content');
const TEMPLATES_DIR = join(ROOT, 'templates');
const LAYOUT_PATH = join(TEMPLATES_DIR, 'layout.html');
const NOT_FOUND_TEMPLATE_PATH = join(TEMPLATES_DIR, '404.html');

const REQUIRED_KEYS = ['slug', 'nav', 'order', 'primary', 'title', 'description', 'h1', 'lede', 'updated'];

const EXTERNAL_NAV_LINKS = [
  { label: 'TELEGRAM', href: 'https://t.me/meshcore_ita' },
  { label: 'GitHub', href: 'https://github.com/meshcore-ita' },
];

const MONTHS_IT = [
  'gennaio', 'febbraio', 'marzo', 'aprile', 'maggio', 'giugno',
  'luglio', 'agosto', 'settembre', 'ottobre', 'novembre', 'dicembre',
];

function escape(value) {
  return String(value)
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;');
}

function humanDate(iso) {
  const m = /^(\d{4})-(\d{2})-(\d{2})$/.exec(iso);
  if (!m) throw new Error(`data "updated" non valida (atteso YYYY-MM-DD): ${iso}`);
  const [, year, month, day] = m;
  const name = MONTHS_IT[Number(month) - 1];
  if (!name) throw new Error(`mese non valido in "updated": ${iso}`);
  return `${Number(day)} ${name} ${year}`;
}

// --- content parsing --------------------------------------------------

function parseContentFile(file) {
  const full = join(CONTENT_DIR, file);
  const raw = readFileSync(full, 'utf8');
  const match = /^<!--meta\s*([\s\S]*?)-->\s*([\s\S]*)$/.exec(raw.trimStart());
  if (!match) {
    throw new Error(`${file}: manca il blocco <!--meta ... --> iniziale`);
  }
  let meta;
  try {
    meta = JSON.parse(match[1]);
  } catch (err) {
    throw new Error(`${file}: JSON non valido nel blocco meta — ${err.message}`);
  }
  for (const key of REQUIRED_KEYS) {
    if (meta[key] === undefined || meta[key] === null || meta[key] === '') {
      throw new Error(`${file}: chiave obbligatoria mancante nel meta: "${key}"`);
    }
  }
  if (typeof meta.order !== 'number' || !Number.isFinite(meta.order)) {
    throw new Error(`${file}: "order" deve essere un numero`);
  }
  if (typeof meta.primary !== 'boolean') {
    throw new Error(`${file}: "primary" deve essere un booleano (true = nav header, false = solo footer)`);
  }
  if (meta.jsonld === undefined) {
    meta.jsonld = [];
  } else if (!Array.isArray(meta.jsonld)) {
    throw new Error(`${file}: "jsonld" deve essere un array`);
  }
  const expectedSlug = file.replace(/\.html$/, '');
  if (meta.slug !== expectedSlug) {
    throw new Error(`${file}: "slug" (${meta.slug}) non corrisponde al nome del file (${expectedSlug})`);
  }
  const fragment = match[2].trim();
  if (!fragment) {
    throw new Error(`${file}: il corpo della pagina è vuoto`);
  }
  return { file, meta, fragment };
}

function readContentFiles() {
  if (!existsSync(CONTENT_DIR)) return [];
  const files = readdirSync(CONTENT_DIR).filter((f) => f.endsWith('.html')).sort();
  return files.map(parseContentFile);
}

// --- knowledge base extraction (worker/kb.generated.mjs) ---------------
// Chunks the visible text of every content page (one per <h2>/<h3> section,
// plus one per FAQ question/answer pair) for the Telegram bot's runtime
// retrieval. Deterministic: same input always yields the same output, so
// `--check` can catch drift the same way it does for the HTML pages.

const KB_CHUNK_MAX_CHARS = 700;
const ENTITY_RE = /&lt;|&gt;|&amp;|&#39;|&quot;|&nbsp;/g;
const ENTITY_MAP = { '&lt;': '<', '&gt;': '>', '&amp;': '&', '&#39;': "'", '&quot;': '"', '&nbsp;': ' ' };
const FAQ_BLOCK_RE = /<details class="faq">([\s\S]*?)<\/details>/g;
const FAQ_QUESTION_RE = /<summary class="faq__q">([\s\S]*?)<\/summary>/;
const HEADING_RE = /<h([23])[^>]*>([\s\S]*?)<\/h\1>/g;

function decodeEntities(text) {
  return text.replace(ENTITY_RE, (m) => ENTITY_MAP[m]);
}

function stripTags(html) {
  return decodeEntities(html.replace(/<[^>]+>/g, ' '))
    .replace(/\s+/g, ' ')
    .trim();
}

function truncateAtWord(text, max = KB_CHUNK_MAX_CHARS) {
  if (text.length <= max) return text;
  const cut = text.slice(0, max);
  const lastSpace = cut.lastIndexOf(' ');
  return `${(lastSpace > 0 ? cut.slice(0, lastSpace) : cut).trim()}…`;
}

function slugify(text) {
  return (
    text
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '')
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/^-+|-+$/g, '') || 'sezione'
  );
}

function extractPageChunks(meta, fragment) {
  const page = meta.nav;
  const url = `${SITE_BASE}${meta.slug}/`;
  const clean = fragment.replace(/<p class="(?:step|card)__num">[^<]*<\/p>/g, '');
  const chunks = [];
  const usedIds = new Set();

  const addChunk = (title, rawText) => {
    const text = truncateAtWord(rawText);
    if (!title || !text) return;
    const base = `${meta.slug}--${slugify(title)}`;
    let id = base;
    let n = 2;
    while (usedIds.has(id)) {
      id = `${base}-${n}`;
      n += 1;
    }
    usedIds.add(id);
    chunks.push({ id, page, title, url, text });
  };

  // FAQ question/answer pairs become their own chunks first, then get
  // stripped out so the heading pass below doesn't duplicate them.
  FAQ_BLOCK_RE.lastIndex = 0;
  let faqMatch;
  while ((faqMatch = FAQ_BLOCK_RE.exec(clean))) {
    const inner = faqMatch[1];
    const qMatch = FAQ_QUESTION_RE.exec(inner);
    if (!qMatch) continue;
    const answerHtml = inner.slice(qMatch.index + qMatch[0].length);
    addChunk(stripTags(qMatch[1]), stripTags(answerHtml));
  }
  const withoutFaq = clean.replace(FAQ_BLOCK_RE, '');

  // Every <h2>/<h3> owns the text up to the next heading of either level.
  HEADING_RE.lastIndex = 0;
  const headings = [...withoutFaq.matchAll(HEADING_RE)];
  for (let i = 0; i < headings.length; i += 1) {
    const heading = headings[i];
    const start = heading.index + heading[0].length;
    const end = i + 1 < headings.length ? headings[i + 1].index : withoutFaq.length;
    addChunk(stripTags(heading[2]), stripTags(withoutFaq.slice(start, end)));
  }

  return chunks;
}

function buildKbModule(pages) {
  const sorted = [...pages].sort((a, b) => a.meta.order - b.meta.order);
  const chunks = sorted.flatMap(({ meta, fragment }) => extractPageChunks(meta, fragment));
  const banner = [
    '// File generato automaticamente da build.mjs — NON modificare a mano.',
    '// Per rigenerare: node build.mjs',
    '//',
    '// Frammenti (sezioni <h2>/<h3> e domande FAQ) delle pagine content/*.html,',
    '// usati da worker/worker.mjs come base di conoscenza aggiuntiva per le',
    '// risposte generate dal modello AI del bot Telegram.',
  ].join('\n');
  return `${banner}\nexport const KB_CHUNKS = ${JSON.stringify(chunks, null, 2)};\n`;
}

// --- rendering helpers --------------------------------------------------
// Content pages live at depth 1 (<slug>/index.html), so their nav/footer
// links to other pages are relative ("../<slug>/"). 404.html is served by
// GitHub Pages at arbitrary depths, so it renders the same nav/footer with
// absolute links instead — both share the logic below via `hrefFor`.

const relativeHref = (slug) => `../${slug}/`;
const absoluteHref = (slug) => `${SITE_BASE}${slug}/`;

function buildNav(pages, currentSlug, hrefFor) {
  const sorted = pages
    .filter(({ meta }) => meta.primary)
    .sort((a, b) => a.meta.order - b.meta.order);
  const lines = sorted.map(({ meta }) => {
    const current = meta.slug === currentSlug ? ' aria-current="true"' : '';
    return `      <a class="nav__link" href="${hrefFor(meta.slug)}"${current}>${escape(meta.nav)}</a>`;
  });
  for (const ext of EXTERNAL_NAV_LINKS) {
    lines.push(
      `      <a class="nav__link nav__link--ext" href="${ext.href}" target="_blank" rel="noopener">${ext.label}<span class="ext-arrow">↗</span></a>`
    );
  }
  return lines.join('\n');
}

function buildFooterNav(pages, currentSlug, hrefFor) {
  const sorted = [...pages].sort((a, b) => a.meta.order - b.meta.order);
  const items = sorted.map(({ meta }) => {
    const current = meta.slug === currentSlug ? ' aria-current="true"' : '';
    return `        <li><a href="${hrefFor(meta.slug)}"${current}>${escape(meta.nav)}</a></li>`;
  });
  return `      <p class="foot__nav-label">Documentazione</p>
      <ul class="foot__nav-list">
${items.join('\n')}
      </ul>`;
}

function buildJsonLd(meta) {
  const canonical = `${SITE_BASE}${meta.slug}/`;
  const graph = [
    ...meta.jsonld,
    {
      '@type': 'BreadcrumbList',
      itemListElement: [
        { '@type': 'ListItem', position: 1, name: 'Home', item: SITE_BASE },
        { '@type': 'ListItem', position: 2, name: meta.nav, item: canonical },
      ],
    },
  ];
  const json = JSON.stringify({ '@context': 'https://schema.org', '@graph': graph }, null, 2);
  // Never let a literal "</script" inside a string value close the tag early.
  return json.replace(/<\/script/gi, '<\\/script');
}

function buildRelated(pages, currentSlug) {
  const sorted = [...pages].sort((a, b) => a.meta.order - b.meta.order);
  const current = sorted.find((p) => p.meta.slug === currentSlug);
  const others = sorted.filter((p) => p.meta.slug !== currentSlug);
  others.sort((a, b) => {
    const da = Math.abs(a.meta.order - current.meta.order);
    const db = Math.abs(b.meta.order - current.meta.order);
    return da - db || a.meta.order - b.meta.order;
  });
  const nearest = others.slice(0, 3);

  const card = (href, title, body) => `
      <a class="card" href="${href}">
        <h3 class="card__title">${escape(title)}</h3>
        <p class="card__body">${escape(body)}</p>
      </a>`;

  const cards = nearest.map(({ meta }) => card(relativeHref(meta.slug), meta.nav, meta.lede)).join('');
  const homeCard = card('../', 'Home', 'Torna alla pagina principale di MeshCore ITA.');

  return `<section class="section related" data-reveal>
    <div class="section__head">
      <p class="eyelash">Continua a leggere</p>
      <h2 class="section__title">Altri contenuti MeshCore ITA</h2>
    </div>
    <div class="grid grid--2">${cards}${homeCard}
    </div>
  </section>`;
}

function renderPage(layout, meta, fragment, pages) {
  const canonical = `${SITE_BASE}${meta.slug}/`;
  const replacements = {
    '{{TITLE}}': escape(meta.title),
    '{{DESCRIPTION}}': escape(meta.description),
    '{{CANONICAL}}': canonical,
    '{{OG_IMAGE}}': `${SITE_BASE}assets/img/og-image.png`,
    '{{JSONLD}}': buildJsonLd(meta),
    '{{NAV}}': buildNav(pages, meta.slug, relativeHref),
    '{{FOOTER_NAV}}': buildFooterNav(pages, meta.slug, relativeHref),
    '{{BREADCRUMB_LABEL}}': escape(meta.nav),
    '{{EYELASH}}': escape(meta.nav),
    '{{H1}}': escape(meta.h1),
    '{{LEDE}}': escape(meta.lede),
    '{{CONTENT}}': fragment,
    '{{RELATED}}': buildRelated(pages, meta.slug),
    '{{UPDATED_HUMAN}}': humanDate(meta.updated),
    '{{EDIT_URL}}': `${REPO_EDIT_BASE}content/${meta.slug}.html`,
  };
  let html = layout;
  for (const [token, value] of Object.entries(replacements)) {
    html = html.split(token).join(value);
  }
  return html;
}

function renderNotFound(template, pages) {
  const replacements = {
    '{{BASE}}': SITE_BASE,
    '{{NAV}}': buildNav(pages, null, absoluteHref),
    '{{FOOTER_NAV}}': buildFooterNav(pages, null, absoluteHref),
  };
  let html = template;
  for (const [token, value] of Object.entries(replacements)) {
    html = html.split(token).join(value);
  }
  return html;
}

function buildSitemap(pages) {
  const sorted = [...pages].sort((a, b) => a.meta.order - b.meta.order);
  const urls = [`  <url>\n    <loc>${SITE_BASE}</loc>\n  </url>`];
  for (const { meta } of sorted) {
    urls.push(
      `  <url>\n    <loc>${SITE_BASE}${meta.slug}/</loc>\n    <lastmod>${meta.updated}</lastmod>\n  </url>`
    );
  }
  return `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls.join('\n')}\n</urlset>\n`;
}

function buildRobots() {
  return `User-agent: *\nAllow: /\n\nSitemap: ${SITE_BASE}sitemap.xml\n`;
}

// --- orchestration --------------------------------------------------

function computeOutputs() {
  const pages = readContentFiles();
  const layout = readFileSync(LAYOUT_PATH, 'utf8');
  const notFoundTemplate = readFileSync(NOT_FOUND_TEMPLATE_PATH, 'utf8');
  const outputs = new Map();
  for (const { meta, fragment } of pages) {
    outputs.set(join(meta.slug, 'index.html'), renderPage(layout, meta, fragment, pages));
  }
  outputs.set('sitemap.xml', buildSitemap(pages));
  outputs.set('robots.txt', buildRobots());
  outputs.set('404.html', renderNotFound(notFoundTemplate, pages));
  outputs.set(join('worker', 'kb.generated.mjs'), buildKbModule(pages));
  return { pages, outputs };
}

function writeOutputs(outputs) {
  for (const [rel, content] of outputs) {
    const full = join(ROOT, rel);
    mkdirSync(dirname(full), { recursive: true });
    writeFileSync(full, content, 'utf8');
  }
}

function checkOutputs(outputs) {
  const problems = [];
  for (const [rel, content] of outputs) {
    const full = join(ROOT, rel);
    if (!existsSync(full)) {
      problems.push(`mancante: ${rel}`);
      continue;
    }
    if (readFileSync(full, 'utf8') !== content) {
      problems.push(`non aggiornato: ${rel}`);
    }
  }
  return problems;
}

function main() {
  const checkMode = process.argv.includes('--check');
  let pages;
  let outputs;
  try {
    ({ pages, outputs } = computeOutputs());
  } catch (err) {
    console.error(`Errore di build: ${err.message}`);
    process.exitCode = 1;
    return;
  }

  if (checkMode) {
    const problems = checkOutputs(outputs);
    if (problems.length) {
      console.error('Il contenuto generato non corrisponde a quello committato:');
      for (const problem of problems) console.error(`  - ${problem}`);
      console.error('Esegui `node build.mjs` e committa i file generati.');
      process.exitCode = 1;
      return;
    }
    console.log(`OK: ${outputs.size} file generati sono aggiornati (${pages.length} pagine + sitemap.xml + robots.txt + 404.html + worker/kb.generated.mjs).`);
    return;
  }

  writeOutputs(outputs);
  console.log(`Generati ${outputs.size} file (${pages.length} pagine + sitemap.xml + robots.txt + 404.html + worker/kb.generated.mjs).`);
}

// Eseguito solo da riga di comando: importare questo modulo (per SITE_BASE
// o per le funzioni) non deve rigenerare il sito come effetto collaterale.
if (process.argv[1] && resolve(process.argv[1]) === fileURLToPath(import.meta.url)) {
  main();
}
