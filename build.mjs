#!/usr/bin/env node
// MeshCore ITA — static site generator. Node stdlib only, no dependencies.
// Reads templates/layout.html + every content/<slug>.html and writes
// <slug>/index.html plus sitemap.xml at the repo root.
//
// Usage:
//   node build.mjs           write generated files to disk
//   node build.mjs --check   build in memory, fail if committed output drifts

import { readFileSync, writeFileSync, mkdirSync, readdirSync, existsSync } from 'node:fs';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const ROOT = dirname(fileURLToPath(import.meta.url));
const BASE_URL = 'https://meshcore-ita.github.io/';
const REPO_EDIT_BASE =
  'https://github.com/meshcore-ita/meshcore-ita.github.io/edit/main/';
const CONTENT_DIR = join(ROOT, 'content');
const LAYOUT_PATH = join(ROOT, 'templates', 'layout.html');

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

// --- rendering helpers --------------------------------------------------

function buildNav(pages, currentSlug) {
  const sorted = pages
    .filter(({ meta }) => meta.primary)
    .sort((a, b) => a.meta.order - b.meta.order);
  const lines = sorted.map(({ meta }) => {
    const current = meta.slug === currentSlug ? ' aria-current="true"' : '';
    return `      <a class="nav__link" href="/${meta.slug}/"${current}>${escape(meta.nav)}</a>`;
  });
  for (const ext of EXTERNAL_NAV_LINKS) {
    lines.push(
      `      <a class="nav__link nav__link--ext" href="${ext.href}" target="_blank" rel="noopener">${ext.label}<span class="ext-arrow">↗</span></a>`
    );
  }
  return lines.join('\n');
}

function buildFooterNav(pages, currentSlug) {
  const sorted = [...pages].sort((a, b) => a.meta.order - b.meta.order);
  const items = sorted.map(({ meta }) => {
    const current = meta.slug === currentSlug ? ' aria-current="true"' : '';
    return `        <li><a href="/${meta.slug}/"${current}>${escape(meta.nav)}</a></li>`;
  });
  return `      <p class="foot__nav-label">Documentazione</p>
      <ul class="foot__nav-list">
${items.join('\n')}
      </ul>`;
}

function buildJsonLd(meta) {
  const canonical = `${BASE_URL}${meta.slug}/`;
  const graph = [
    ...meta.jsonld,
    {
      '@type': 'BreadcrumbList',
      itemListElement: [
        { '@type': 'ListItem', position: 1, name: 'Home', item: BASE_URL },
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

  const cards = nearest.map(({ meta }) => card(`/${meta.slug}/`, meta.nav, meta.lede)).join('');
  const homeCard = card('/', 'Home', 'Torna alla pagina principale di MeshCore ITA.');

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
  const canonical = `${BASE_URL}${meta.slug}/`;
  const replacements = {
    '{{TITLE}}': escape(meta.title),
    '{{DESCRIPTION}}': escape(meta.description),
    '{{CANONICAL}}': canonical,
    '{{JSONLD}}': buildJsonLd(meta),
    '{{NAV}}': buildNav(pages, meta.slug),
    '{{FOOTER_NAV}}': buildFooterNav(pages, meta.slug),
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

function buildSitemap(pages) {
  const sorted = [...pages].sort((a, b) => a.meta.order - b.meta.order);
  const urls = [`  <url>\n    <loc>${BASE_URL}</loc>\n  </url>`];
  for (const { meta } of sorted) {
    urls.push(
      `  <url>\n    <loc>${BASE_URL}${meta.slug}/</loc>\n    <lastmod>${meta.updated}</lastmod>\n  </url>`
    );
  }
  return `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls.join('\n')}\n</urlset>\n`;
}

// --- orchestration --------------------------------------------------

function computeOutputs() {
  const pages = readContentFiles();
  const layout = readFileSync(LAYOUT_PATH, 'utf8');
  const outputs = new Map();
  for (const { meta, fragment } of pages) {
    outputs.set(join(meta.slug, 'index.html'), renderPage(layout, meta, fragment, pages));
  }
  outputs.set('sitemap.xml', buildSitemap(pages));
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
    console.log(`OK: ${outputs.size} file generati sono aggiornati (${pages.length} pagine + sitemap.xml).`);
    return;
  }

  writeOutputs(outputs);
  console.log(`Generati ${outputs.size} file (${pages.length} pagine + sitemap.xml).`);
}

main();
