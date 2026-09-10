// Cloudflare Worker: bot Telegram MeshCore ITA in modalità webhook.
// Stessi testi del runtime long-polling (bot/content.mjs), nessuna dipendenza.
//
// Secret richiesti (wrangler secret put ...):
//   TELEGRAM_BOT_TOKEN     token del bot
//   TELEGRAM_WEBHOOK_SECRET valore passato a setWebhook come secret_token
// Variabile opzionale:
//   TELEGRAM_CHAT_ID       se impostata, il bot risponde solo in quella chat
import { REPLIES } from '../bot/content.mjs';

const BOT_USERNAME = 'meshcore_ita_bot';
const COMMANDS = new Set(Object.keys(REPLIES));

// '/cli', '/cli@meshcore_ita_bot arg' -> 'cli'; comando rivolto ad altro bot -> null
function parseCommand(text) {
  if (typeof text !== 'string' || text[0] !== '/') return null;
  const [cmd, mention] = text.split(/\s/, 1)[0].slice(1).split('@');
  if (mention && mention.toLowerCase() !== BOT_USERNAME) return null;
  const name = cmd.toLowerCase();
  return COMMANDS.has(name) ? name : null;
}

// Testo libero rivolto al bot: "/chiedi <domanda>" oppure una menzione
// @meshcore_ita_bot. Con privacy mode attiva sono gli unici messaggi che il
// bot riceve, quindi non serve altro filtro.
function parseQuestion(text) {
  if (typeof text !== 'string') return null;
  const asked = /^\/chiedi(@meshcore_ita_bot)?\b/i.test(text)
    ? text.replace(/^\/chiedi(@meshcore_ita_bot)?\s*/i, '')
    : text.includes(`@${BOT_USERNAME}`)
      ? text.replaceAll(`@${BOT_USERNAME}`, ' ').trim()
      : null;
  if (!asked) return null;
  const q = asked.trim();
  return q.length >= 3 && q.length <= 400 ? q : null;
}

const stripTags = (s) => s.replace(/<[^>]+>/g, '');

// La knowledge base è la stessa dei comandi: il modello non deve sapere
// niente che non sia già stato verificato e pubblicato.
const KB = Object.entries(REPLIES)
  .map(([k, v]) => `### /${k}\n${stripTags(v)}`)
  .join('\n\n');

const SYSTEM = `Sei l'assistente del gruppo Telegram MeshCore ITA, community italiana indipendente di MeshCore (rete mesh LoRa off-grid).
Rispondi SOLO in italiano, in massimo 6 righe, senza saluti né chiacchiere.
Usa esclusivamente le informazioni nella BASE DI CONOSCENZA qui sotto.
Regole non negoziabili:
- Non inventare MAI frequenze, parametri radio, limiti di potenza o comandi. Se un valore non è nella base di conoscenza, dì che non lo sai e rimanda a https://docs.meshcore.io/ .
- Il preset corretto è esattamente 869.618 MHz / SF8 / BW 62.5 kHz / CR8 (EU/UK Narrow). Riportalo alla lettera quando serve.
- Quando esiste un comando che copre la domanda, suggeriscilo (es. /preset, /cli, /problemi, /app, /hardware, /ruoli, /nomi, /normativa, /link, /regole, /regioni).
- Niente Markdown e niente tag HTML: solo testo semplice.

BASE DI CONOSCENZA
${KB}`;

async function answerWithAI(env, question) {
  const res = await env.AI.run('@cf/meta/llama-3.3-70b-instruct-fp8-fast', {
    messages: [
      { role: 'system', content: SYSTEM },
      { role: 'user', content: question },
    ],
    max_tokens: 320,
    temperature: 0.2,
  });
  const text = (res?.response ?? '').trim();
  return text || 'Non ho una risposta affidabile. Prova con /link oppure scrivi nel topic Supporto e troubleshooting.';
}

async function sendMessage(token, payload) {
  const res = await fetch(`https://api.telegram.org/bot${token}/sendMessage`, {
    method: 'POST',
    headers: { 'content-type': 'application/json' },
    body: JSON.stringify(payload),
  });
  if (!res.ok) console.error(`sendMessage ${res.status}: ${await res.text()}`);
}

export default {
  async fetch(request, env, ctx) {
    if (request.method !== 'POST') return new Response('ok', { status: 200 });
    if (request.headers.get('x-telegram-bot-api-secret-token') !== env.TELEGRAM_WEBHOOK_SECRET) {
      return new Response('forbidden', { status: 403 });
    }

    const update = await request.json().catch(() => null);
    const message = update?.message;
    if (!message?.chat) return new Response('ok');

    const chatId = String(message.chat.id);
    if (env.TELEGRAM_CHAT_ID && chatId !== String(env.TELEGRAM_CHAT_ID)) return new Response('ok');

    const command = parseCommand(message.text);
    const question = command ? null : parseQuestion(message.text);
    if (!command && !question) return new Response('ok');

    const base = {
      chat_id: message.chat.id,
      parse_mode: 'HTML',
      link_preview_options: { is_disabled: true },
    };
    if (message.message_thread_id) base.message_thread_id = message.message_thread_id;

    if (command) {
      ctx.waitUntil(sendMessage(env.TELEGRAM_BOT_TOKEN, { ...base, text: REPLIES[command] }));
      return new Response('ok');
    }

    // Risposta AI: testo semplice, nessun tag da escapare.
    ctx.waitUntil(
      answerWithAI(env, question)
        .then((text) => sendMessage(env.TELEGRAM_BOT_TOKEN, { ...base, text, parse_mode: undefined }))
        .catch(async (err) => {
          console.error(`AI error: ${err.message}`);
          await sendMessage(env.TELEGRAM_BOT_TOKEN, {
            ...base,
            text: 'Al momento non riesco a rispondere. Usa /link o scrivi nel topic Supporto e troubleshooting.',
            parse_mode: undefined,
          });
        }),
    );
    return new Response('ok');
  },
};
