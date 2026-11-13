# Instant beep worker (Cloudflare, free tier)

Sends beeps to phones at random times. Stores per person only: a push endpoint, a time window, a time zone, and the day's remaining beep times. It never receives notes or taps. Beeps carry no payload.

## One-time setup

From this folder (`worker/`), with Node 18+:

1. `npx wrangler login`: sign in to your Cloudflare account.
2. `npx wrangler d1 create instant-beeps`: copy the `database_id` it prints into `wrangler.toml`.
3. `npx wrangler d1 execute instant-beeps --remote --file=schema.sql`: create the table.
4. `node vapid-keys.mjs`: generates the key pair. Keep the private key secret; never commit it.
5. `npx wrangler secret put VAPID_PRIVATE_JWK`, then **wait for the prompt** "Enter a secret value:" and paste the whole private key JSON line there (not after the command). Check with `npx wrangler secret list`.
6. Public key: either `npx wrangler secret put VAPID_PUBLIC_KEY` (paste at the prompt) or add `VAPID_PUBLIC_KEY = "..."` under `[vars]` in `wrangler.toml`. It's public, so either is fine.
7. `npx wrangler deploy`: prints the worker URL (`https://instant-beeps.<you>.workers.dev`).
8. In `web/config.js`, set `WORKER_URL` to that URL and `VAPID_PUBLIC_KEY` to the public key. Push to deploy the app.

## Test

`node test.mjs` runs the scheduling, signing, and a simulated beep cycle with a fake database and push service.

## Troubleshooting

The app's **Send a server beep now** button sends one beep immediately and shows where it fails:
- `failed at worker: ... "undefined" is not valid JSON`: the `VAPID_PRIVATE_JWK` secret is missing (see step 5).
- `failed at push-service (4xx)`: Apple or Google rejected the beep; the detail says why.
- `Sent (201)` but no notification: check the phone's notification settings and Focus mode.

`npx wrangler tail` shows each beep's result live.
