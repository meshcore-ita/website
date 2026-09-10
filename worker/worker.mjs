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
    const command = parseCommand(message?.text);
    if (!command) return new Response('ok');

    const chatId = String(message.chat.id);
    if (env.TELEGRAM_CHAT_ID && chatId !== String(env.TELEGRAM_CHAT_ID)) return new Response('ok');

    const payload = {
      chat_id: message.chat.id,
      text: REPLIES[command],
      parse_mode: 'HTML',
      link_preview_options: { is_disabled: true },
    };
    if (message.message_thread_id) payload.message_thread_id = message.message_thread_id;

    // Telegram ritenta se la risposta tarda: rispondiamo subito, invio in background.
    ctx.waitUntil(sendMessage(env.TELEGRAM_BOT_TOKEN, payload));
    return new Response('ok');
  },
};
