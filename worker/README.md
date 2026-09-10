# Bot su Cloudflare Workers (webhook)

Alternativa serverless al runtime long-polling `bot/bot.mjs`: nessuna macchina
sempre accesa, Telegram consegna gli update al Worker via webhook. I testi
delle risposte restano quelli di `bot/content.mjs`, condivisi dai due runtime.

## Contenuto

| File | Ruolo |
|---|---|
| `worker.mjs` | handler `fetch`: valida il secret, riconosce il comando, risponde |
| `wrangler.toml` | configurazione del Worker (`TELEGRAM_CHAT_ID` come var) |
| `set-webhook.mjs` | registra / rimuove / ispeziona il webhook su Telegram |

## Deploy

```sh
cd worker
npx wrangler login                          # apre il browser, autorizza l'account
npx wrangler secret put TELEGRAM_BOT_TOKEN  # incolla il token di @BotFather
npx wrangler secret put TELEGRAM_WEBHOOK_SECRET   # stringa casuale, es. openssl rand -hex 32
npx wrangler deploy                         # stampa l'URL https://meshcore-ita-bot.<subdomain>.workers.dev
```

Poi si punta Telegram al Worker (dalla radice del repo):

```sh
TELEGRAM_BOT_TOKEN_FILE=~/.config/meshcore-ita/token \
TELEGRAM_WEBHOOK_SECRET=<lo stesso segreto> \
node worker/set-webhook.mjs https://meshcore-ita-bot.<subdomain>.workers.dev
```

Webhook e long-polling si escludono a vicenda: prima di attivare il webhook
ferma il servizio locale, altrimenti Telegram rifiuta `getUpdates`.

```sh
systemctl --user disable --now meshcore-ita-bot
```

## Verifica e rollback

```sh
node worker/set-webhook.mjs --info     # url, update pendenti, ultimo errore
npx wrangler tail                      # log in tempo reale del Worker
node worker/set-webhook.mjs --delete   # rimuove il webhook
systemctl --user enable --now meshcore-ita-bot   # torna al long-polling
```

## Note

- Il Worker accetta solo POST con header `x-telegram-bot-api-secret-token`
  corrispondente al secret: senza, risponde 403.
- Risponde subito `200` e invia il messaggio in `ctx.waitUntil`, così Telegram
  non ritenta la consegna.
- Con `TELEGRAM_CHAT_ID` impostata gli update di altre chat vengono ignorati.
- Il piano free copre 100.000 richieste al giorno: per un gruppo di community
  è ampiamente sufficiente.
