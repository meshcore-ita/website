// Contenuti in italiano per il bot Telegram di MeshCore ITA.
// Modulo puro: nessuna dipendenza, nessuna I/O. Esporta i topic del forum
// e le risposte HTML dei comandi registrati sul bot.

// Elenco canonico dei 28 topic (8 generali + 20 regionali), nell'ordine
// in cui vanno creati nel gruppo. Condiviso da bot.mjs e setup-topics.mjs.
export const TOPICS = [
  { name: 'Annunci', kind: 'general' },
  { name: 'Benvenuti e presentazioni', kind: 'general' },
  { name: 'Supporto e troubleshooting', kind: 'general' },
  { name: 'Hardware e antenne', kind: 'general' },
  { name: 'Firmware e configurazione', kind: 'general' },
  { name: 'Repeater e room server', kind: 'general' },
  { name: 'Mappa e copertura', kind: 'general' },
  { name: 'Off-topic', kind: 'general' },
  { name: 'IT · Abruzzo', kind: 'region' },
  { name: 'IT · Basilicata', kind: 'region' },
  { name: 'IT · Calabria', kind: 'region' },
  { name: 'IT · Campania', kind: 'region' },
  { name: 'IT · Emilia-Romagna', kind: 'region' },
  { name: 'IT · Friuli-Venezia Giulia', kind: 'region' },
  { name: 'IT · Lazio', kind: 'region' },
  { name: 'IT · Liguria', kind: 'region' },
  { name: 'IT · Lombardia', kind: 'region' },
  { name: 'IT · Marche', kind: 'region' },
  { name: 'IT · Molise', kind: 'region' },
  { name: 'IT · Piemonte', kind: 'region' },
  { name: 'IT · Puglia', kind: 'region' },
  { name: 'IT · Sardegna', kind: 'region' },
  { name: 'IT · Sicilia', kind: 'region' },
  { name: 'IT · Toscana', kind: 'region' },
  { name: 'IT · Trentino-Alto Adige', kind: 'region' },
  { name: 'IT · Umbria', kind: 'region' },
  { name: "IT · Valle d'Aosta", kind: 'region' },
  { name: 'IT · Veneto', kind: 'region' },
];

const regionList = TOPICS.filter((t) => t.kind === 'region')
  .map((t) => t.name)
  .join('\n');

// Risposte HTML (parse_mode: 'HTML'), solo tag <b>, <code>, <a href>.
// Chiavi = nome comando senza slash, come registrato su BotFather.
export const REPLIES = {
  preset:
    '<b>Preset radio IT</b>\n\n' +
    'Frequenza: <code>869.525 MHz</code>\n' +
    'Larghezza di banda: <code>250 kHz</code>\n' +
    'Spreading Factor: <code>SF11</code>\n' +
    'Coding Rate: <code>CR5</code>\n\n' +
    'Imposta questo preset su ogni nodo per restare compatibile con la mesh italiana.',

  inizia:
    '<b>Come iniziare con MeshCore</b>\n\n' +
    '1. Procurati un nodo supportato: vedi /hardware\n' +
    '2. Flasha il firmware con <a href="https://flasher.meshcore.io/">flasher.meshcore.io</a>\n' +
    '3. Imposta il preset italiano: vedi /preset\n' +
    '4. Assegna un nome al nodo seguendo la convenzione: vedi /nomi\n' +
    '5. Leggi la documentazione ufficiale: <a href="https://docs.meshcore.io/">docs.meshcore.io</a>\n' +
    '6. Controlla la copertura sulla mappa: <a href="https://map.meshcore.io/">map.meshcore.io</a>\n\n' +
    'Per dubbi usa il topic Supporto e troubleshooting o quello della tua regione (vedi /regioni).',

  hardware:
    '<b>Schede supportate</b>\n\n' +
    '- Heltec V3 / T114 / T190\n' +
    '- LilyGO T-Deck / T-Beam / T3S3\n' +
    '- RAK4631 WisBlock\n' +
    '- Seeed XIAO nRF52840 + Wio-SX1262\n' +
    '- Station G2\n\n' +
    'Domande e consigli d\'acquisto nel topic Hardware e antenne.',

  ruoli:
    '<b>Ruoli dei nodi MeshCore</b>\n\n' +
    '<b>Companion</b>: collegato via BLE/USB a un\'app, non ripete i messaggi altrui\n' +
    '<b>Repeater</b>: inoltra i messaggi per estendere la copertura della mesh\n' +
    '<b>Room Server</b>: punto di ritrovo per canali/gruppi, conserva fino a 32 messaggi non letti per utente\n' +
    '<b>Sensor</b>: nodo che pubblica dati di sensori sulla mesh\n\n' +
    'Routing: ibrido, flood per advert e canali ogni 12 ore, path-discovery per i messaggi diretti, limite interno di 64 hop.\n' +
    'Crittografia: Ed25519 + X25519 + AES-128.',

  nomi:
    '<b>Convenzione nomi nodo</b>\n\n' +
    'Companion: <code>IT-&lt;citta&gt;-NN</code>\n' +
    'Repeater: <code>IT-&lt;citta&gt;-RPT-NN</code>\n' +
    'Room server: <code>IT-&lt;citta&gt;-ROOM-NN</code>\n\n' +
    'Esempi: <code>IT-Roma-01</code>, <code>IT-Milano-RPT-02</code>, <code>IT-Torino-ROOM-01</code>.',

  normativa:
    '<b>Normativa radio (banda 869 MHz)</b>\n\n' +
    'Sotto-banda: <code>869.4–869.65 MHz</code>\n' +
    'Potenza massima: <code>500 mW ERP</code>\n' +
    'Duty cycle: <code>10%</code> (massimo 6 minuti/ora)\n\n' +
    'Riferimenti normativi: ETSI EN 300 220 e Piano Nazionale di Ripartizione delle Frequenze.\n\n' +
    'Rispetta questi limiti per evitare interferenze e restare in regola.',

  link:
    '<b>Link utili</b>\n\n' +
    'Sito MeshCore: <a href="https://meshcore.co.uk/">meshcore.co.uk</a>\n' +
    'Documentazione: <a href="https://docs.meshcore.io/">docs.meshcore.io</a>\n' +
    'Flasher: <a href="https://flasher.meshcore.io/">flasher.meshcore.io</a>\n' +
    'Mappa copertura: <a href="https://map.meshcore.io/">map.meshcore.io</a>\n' +
    'Firmware (repo): <a href="https://github.com/meshcore-dev/MeshCore">github.com/meshcore-dev/MeshCore</a>\n' +
    'Community (repo): <a href="https://github.com/meshcore-ita">github.com/meshcore-ita</a>\n' +
    'Sito community: <a href="https://meshcore-ita.github.io/website/">meshcore-ita.github.io/website</a>\n' +
    'Gruppo Telegram: <a href="https://t.me/meshcore_ita">t.me/meshcore_ita</a>',

  regole:
    '<b>Regole del gruppo</b>\n\n' +
    '- Rispetto reciproco: niente spam, pubblicità non richiesta o offese\n' +
    '- Usa il topic giusto per l\'argomento, compreso quello della tua regione (vedi /regioni)\n' +
    '- Rispetta la normativa radio quando operi in banda 869 MHz (vedi /normativa)\n' +
    '- Niente contenuti illegali\n\n' +
    'MeshCore ITA è una community indipendente, non affiliata al progetto upstream MeshCore.\n' +
    'Il regolamento completo è nel messaggio fissato in cima al gruppo.',

  regioni:
    '<b>Topic regionali</b>\n\n' +
    'Ogni regione italiana ha un topic dedicato, con prefisso <code>IT ·</code>, per organizzare copertura, nodi e incontri locali:\n\n' +
    regionList +
    '\n\nUsa il topic della tua regione per parlare di nodi, copertura e incontri; lascia i topic generali per gli argomenti trasversali.',
};
