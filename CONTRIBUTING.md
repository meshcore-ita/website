# Contribuire a MeshCore ITA

Ogni contributo passa da una pull request: niente wiki, niente modifiche
dirette. Così ogni cambiamento resta tracciato e verificabile.

## Correggere o migliorare una pagina

In fondo a ogni pagina del sito c'è il link **"Modifica questa pagina su
GitHub"**: apre l'editor GitHub sul file sorgente corretto e, al salvataggio,
crea una pull request. È il modo più rapido per correggere un refuso o
aggiungere un paragrafo.

I sorgenti delle pagine stanno in `content/<slug>.html`. **Non modificare i
file generati** (`<slug>/index.html`, `sitemap.xml`, `robots.txt`,
`404.html`): vengono riscritti dalla build e la CI rifiuta la PR se
divergono.

## Regola sui fatti

Questo sito è documentazione tecnica, non divulgazione approssimativa.

- Ogni comando, frequenza, parametro radio o modello di board deve essere
  verificabile su una fonte upstream: `https://meshcore.io/`,
  `https://docs.meshcore.io/`, `https://github.com/meshcore-dev/MeshCore`,
  `https://flasher.meshcore.io/`.
- Se un dato non è verificabile, si omette. Meglio una pagina più corta che
  una pagina sbagliata.
- Il preset radio italiano corrente è `869.618 MHz · BW 62.5 kHz · SF8 · CR8`
  (`EU/UK (Narrow)`). Se cambia, va aggiornato ovunque compaia, non solo
  nella pagina del preset.

## Aggiungere una pagina nuova

1. Crea `content/<slug>.html`. Il file inizia con un blocco `<!--meta {...}-->`
   JSON con le chiavi: `slug`, `nav`, `order`, `primary`, `title`,
   `description`, `h1`, `lede`, `updated`, `jsonld`.
2. Il corpo contiene solo `<section class="section">`: niente `<h1>`,
   `<head>`, `<nav>`, `<main>` o `<footer>` (li mette il layout).
3. `primary: true` mette la pagina nell'header; `false` la lascia solo nel
   footer e nei link correlati.
4. Usa solo le classi CSS già esistenti in `assets/css/style.css`.
5. Lancia `node build.mjs` e committa anche i file generati.

## Verifica prima di aprire la PR

```sh
node build.mjs          # rigenera pagine, sitemap, robots, 404
node build.mjs --check  # deve uscire 0: è lo stesso gate della CI
python3 -m http.server 8080   # controlla il risultato nel browser
```

## Stile

Italiano tecnico, diretto, senza marketing ed emoji. Frasi brevi. Il lettore
sa cos'è una radio: non serve spiegargli cos'è un file.
