# Instant beep worker (Cloudflare, free tier)

Sends beeps to phones at random times. Stores per person only: a push endpoint, a time window, a time zone, and the day's remaining beep times. It never receives notes or taps. Beeps carry no payload.

## One-time setup

From this folder (`worker/`), with Node 18+:

1. `npx wrangler login`: sign in to your Cloudflare account.
2. `npx wrangler d1 create instant-beeps`: copy the `database_id` it prints into `wrangler.toml`.
3. `npx wrangler d1 execute instant-beeps --remote --file=schema.sql`: create the table.
4. `node vapid-keys.mjs`: generates the key pair. Keep the private key secret; never commit it.
5. `npx wrangler secret put VAPID_PRIVATE_JWK`: paste the private key (the JSON).
6. `npx wrangler secret put VAPID_PUBLIC_KEY`: paste the public key.
7. `npx wrangler deploy`: prints the worker URL (`https://instant-beeps.<you>.workers.dev`).
8. In `web/config.js`, set `WORKER_URL` to that URL and `VAPID_PUBLIC_KEY` to the public key. Push to deploy the app.

## Test

`node test.mjs` runs the scheduling, signing, and a simulated beep cycle with a fake database and push service.
