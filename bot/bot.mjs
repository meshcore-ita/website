#!/usr/bin/env node
// Runtime del bot Telegram di MeshCore ITA: long polling, zero dipendenze.
// Token: TELEGRAM_BOT_TOKEN (env) oppure TELEGRAM_BOT_TOKEN_FILE (percorso a un file).
// Opzionale: TELEGRAM_CHAT_ID per rispondere solo in quel gruppo.

import { readFileSync } from 'node:fs';
import process from 'node:process';
import { REPLIES } from './content.mjs';

const BOT_USERNAME = 'meshcore_ita_bot';
const COMMANDS = new Set(Object.keys(REPLIES));

function readTokenFile(path) {
  try {
    return readFileSync(path, 'utf8').trim();
  } catch (err) {
    console.error(`Impossibile leggere il token da "${path}": ${err.message}`);
    process.exit(1);
  }
}

function getToken() {
  const envToken = process.env.TELEGRAM_BOT_TOKEN;
  if (envToken && envToken.trim()) return envToken.trim();

  const tokenFile = process.env.TELEGRAM_BOT_TOKEN_FILE;
  if (tokenFile && tokenFile.trim()) return readTokenFile(tokenFile.trim());

  console.error(
    'Token mancante: imposta TELEGRAM_BOT_TOKEN oppure TELEGRAM_BOT_TOKEN_FILE (percorso a un file con il token).'
  );
  process.exit(1);
}

const TOKEN = getToken();
const API = `https://api.telegram.org/bot${TOKEN}`;
const ALLOWED_CHAT_ID = process.env.TELEGRAM_CHAT_ID ? String(process.env.TELEGRAM_CHAT_ID) : null;

async function tg(method, payload, options = {}) {
  const res = await fetch(`${API}/${method}`, {
    method: 'POST',
    headers: { 'content-type': 'application/json' },
    body: JSON.stringify(payload ?? {}),
    signal: options.signal,
  });
  const data = await res.json();
  if (!data.ok) {
    throw new Error(`${method} fallita: ${data.description ?? res.status}`);
  }
  return data.result;
}

function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

// Estrae il nome comando da "/cmd" o "/cmd@meshcore_ita_bot", ignorando
// argomenti successivi. Ritorna null se il testo non è un comando o il
// comando è rivolto esplicitamente a un altro bot.
function parseCommand(text) {
  if (typeof text !== 'string' || text[0] !== '/') return null;
  const firstToken = text.split(/\s/, 1)[0].slice(1);
  const [cmd, mention] = firstToken.split('@');
  if (mention && mention.toLowerCase() !== BOT_USERNAME.toLowerCase()) return null;
  return cmd.toLowerCase();
}

async function handleMessage(message) {
  const chatId = message.chat && message.chat.id;
  if (ALLOWED_CHAT_ID && String(chatId) !== ALLOWED_CHAT_ID) return;

  const cmd = parseCommand(message.text);
  if (!cmd || !COMMANDS.has(cmd)) return;

  const payload = {
    chat_id: chatId,
    text: REPLIES[cmd],
    parse_mode: 'HTML',
    link_preview_options: { is_disabled: true },
  };
  if (message.message_thread_id) payload.message_thread_id = message.message_thread_id;

  await tg('sendMessage', payload);

  const user = message.from && message.from.username
    ? `@${message.from.username}`
    : String((message.from && message.from.id) ?? 'sconosciuto');
  console.log(`${new Date().toISOString()} /${cmd} chat=${chatId} user=${user}`);
}

let running = true;
let offset = 0;
let abortController = new AbortController();

async function pollLoop() {
  let backoff = 3000;
  while (running) {
    let updates;
    try {
      updates = await tg(
        'getUpdates',
        { offset, timeout: 30, allowed_updates: ['message'] },
        { signal: abortController.signal }
      );
      backoff = 3000;
    } catch (err) {
      if (err.name === 'AbortError' || !running) break;
      console.error(`${new Date().toISOString()} errore getUpdates: ${err.message}`);
      await sleep(backoff);
      backoff = Math.min(backoff * 2, 60000);
      continue;
    }

    for (const update of updates) {
      offset = update.update_id + 1;
      if (!update.message) continue;
      try {
        await handleMessage(update.message);
      } catch (err) {
        console.error(`${new Date().toISOString()} errore gestione messaggio: ${err.message}`);
      }
    }
  }
  console.log(`${new Date().toISOString()} loop di polling terminato`);
}

function shutdown(signal) {
  console.log(`${new Date().toISOString()} ricevuto ${signal}, arresto in corso...`);
  running = false;
  abortController.abort();
}

process.on('SIGINT', () => shutdown('SIGINT'));
process.on('SIGTERM', () => shutdown('SIGTERM'));

console.log(`${new Date().toISOString()} meshcore-ita-bot avviato, comandi: ${[...COMMANDS].join(', ')}`);
pollLoop();
