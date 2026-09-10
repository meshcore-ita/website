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

## Risposte AI

Oltre ai comandi fissi, il Worker risponde al testo libero con Workers AI
(`@cf/meta/llama-3.3-70b-instruct-fp8-fast`, binding `AI` in `wrangler.toml`):

- `/chiedi <domanda>` oppure un messaggio che menziona `@meshcore_ita_bot`
- la domanda deve stare fra 3 e 400 caratteri, altrimenti viene ignorata
- il modello riceve come unica fonte i testi di `bot/content.mjs`, ripuliti dai
  tag: non può citare comandi o frequenze che non abbiamo già verificato
- il preset corretto è ripetuto nel system prompt come vincolo esplicito
- se il modello o la quota falliscono, il bot manda un messaggio di fallback e
  i comandi statici continuano a funzionare

Il free tier di Workers AI include 10.000 neuron al giorno; superata la quota
le chiamate AI falliscono ma i comandi restano operativi. Per disattivare la
funzione basta rimuovere la sezione `[ai]` da `wrangler.toml` e rideployare.

## Note

- Il Worker accetta solo POST con header `x-telegram-bot-api-secret-token`
  corrispondente al secret: senza, risponde 403.
- Risponde subito `200` e invia il messaggio in `ctx.waitUntil`, così Telegram
  non ritenta la consegna.
- Con `TELEGRAM_CHAT_ID` impostata gli update di altre chat vengono ignorati.
- Il piano free copre 100.000 richieste al giorno: per un gruppo di community
  è ampiamente sufficiente.
