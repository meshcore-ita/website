# MeshCore ITA — sito

Sito statico della community italiana MeshCore ITA.

Pubblicato su: **https://meshcore-ita.github.io/**

MeshCore ITA è una community indipendente di utenti MeshCore, non affiliata al
progetto MeshCore upstream né ad altre community italiane.

## Struttura

```
content/<slug>.html      sorgenti delle pagine (meta JSON + fragment)
templates/layout.html    layout condiviso di tutte le pagine generate
templates/404.html       layout della pagina 404
build.mjs                generatore statico (Node stdlib, zero dipendenze)
index.html               home page, scritta a mano
<slug>/index.html        pagine generate — NON modificare a mano
sitemap.xml robots.txt   generati
404.html                 generato
assets/                  css, js (ES module), logo, favicon, immagine social
bot/ worker/             bot Telegram della community
.github/workflows/       deploy su GitHub Pages + gate di build
```

## Build

```sh
node build.mjs          # rigenera pagine, sitemap, robots.txt, 404
node build.mjs --check  # esce 1 se i file generati divergono dai sorgenti
```

`--check` gira in CI: una PR che modifica `content/` senza rigenerare non
viene pubblicata.

## Sviluppo locale

```sh
node build.mjs && python3 -m http.server 8080
```

Poi apri `http://localhost:8080/`.

## Pubblicazione

Deploy automatico ad ogni push su `main` tramite
`.github/workflows/pages.yml` (source: GitHub Actions, nessun Jekyll, vedi
`.nojekyll`).

I link interni e gli asset sono relativi, quindi il sito funziona invariato a
qualunque mount point. Gli URL assoluti (canonical, `og:url`, JSON-LD,
`sitemap.xml`, `robots.txt`) sono risolti da `build.mjs` in quest'ordine:
variabile `SITE_BASE`, poi `GITHUB_REPOSITORY` in CI, infine il fallback
`https://meshcore-ita.github.io/`.

## Contribuire

Vedi [CONTRIBUTING.md](CONTRIBUTING.md). In fondo a ogni pagina del sito c'è
il link "Modifica questa pagina su GitHub", che apre l'editor sul sorgente
giusto e produce una pull request.

Le discussioni pubbliche avvengono qui su GitHub e sul gruppo Telegram
pubblico MeshCore ITA (https://t.me/meshcore_ita), aperto a chiunque senza
bisogno di invito.

## Licenza

Codice sotto licenza MIT. Contenuti (testi, immagini) sotto licenza
CC BY 4.0.
