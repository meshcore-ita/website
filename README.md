# MeshCore ITA — sito

Sito statico della community italiana MeshCore ITA.

Pubblicato su: **https://meshcore-ita.github.io/**

MeshCore ITA è una community indipendente di utenti MeshCore, non affiliata al
progetto MeshCore upstream né ad altre community italiane.

## Struttura

```
index.html               markup della pagina
assets/css/style.css     stili
assets/js/main.js        comportamento (ES module)
assets/img/              logo, favicon, immagine social
.github/workflows/       deploy automatico su GitHub Pages
```

## Sviluppo locale

Nessun build step, nessuna dipendenza da installare. Basta un server statico:

```sh
python3 -m http.server 8080
```

Poi apri `http://localhost:8080/`.

## Pubblicazione

Il deploy è automatico: ad ogni push su `main`, il workflow
`.github/workflows/pages.yml` pubblica la root del repository su GitHub
Pages (source: GitHub Actions). Nessuna build, nessun Jekyll (vedi
`.nojekyll`).

I link interni e gli asset generati sono sempre relativi, quindi il sito
funziona invariato a qualunque mount point. Gli URL assoluti (canonical,
og:url, sitemap, robots.txt) sono risolti da `build.mjs` da `SITE_BASE` o,
in CI, da `GITHUB_REPOSITORY`: rinominare il repo in
`meshcore-ita.github.io` sposterebbe il sito alla root senza modifiche al
codice.

## Contribuire

Per proporre contenuti o correzioni: apri una issue o una pull request
(fork del repo). Le discussioni pubbliche avvengono qui su GitHub e sul
gruppo Telegram pubblico MeshCore ITA (https://t.me/meshcore_ita), aperto
a chiunque senza bisogno di invito.

## Licenza

Codice sotto licenza MIT. Contenuti (testi, immagini) sotto licenza
CC BY 4.0.
