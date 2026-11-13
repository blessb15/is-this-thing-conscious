// node worker/test.mjs
import assert from "assert";
import { drawTimes, nextSchedule, localParts, zonedEpoch, TIMEBOX_MS } from "./src/schedule.js";
import { vapidHeaders } from "./src/vapid.js";
import worker from "./src/index.js";

const tz = "America/Los_Angeles";
// Times land inside the local window, including on DST change day (2026-11-01)
for (const day of [Date.UTC(2026, 10, 10, 20), Date.UTC(2026, 10, 1, 20), Date.UTC(2026, 2, 8, 20)]) {
  for (let r = 0; r < 100; r++) {
    const t = drawTimes({ day, tz, start: "09:00", end: "21:00", count: 5 });
    assert.strictEqual(t.length, 5);
    for (const x of t) { const m = localParts(x, tz).minutes; assert(m >= 540 && m <= 1260, "in window " + m); }
    for (let i = 1; i < t.length; i++) assert(t[i] - t[i - 1] >= 30 * 60000 - 1000);
  }
}
assert.strictEqual(localParts(zonedEpoch(2026, 11, 10, 9 * 60, tz), tz).minutes, 540);
// After the window ends: tomorrow's schedule
const late = zonedEpoch(2026, 11, 10, 22 * 60, tz);
const ns = nextSchedule({ start: "09:00", end: "21:00", count: 3, tz }, late);
assert.strictEqual(ns.day, "2026-11-11"); assert.strictEqual(ns.times.length, 3);
// Mid-window: only future times today
const mid = zonedEpoch(2026, 11, 10, 15 * 60, tz);
const ms = nextSchedule({ start: "09:00", end: "21:00", count: 3, tz }, mid);
assert.strictEqual(ms.day, "2026-11-10"); assert(ms.times.every((t) => t > mid));

// VAPID: signature verifies with the public key
const kp = await crypto.subtle.generateKey({ name: "ECDSA", namedCurve: "P-256" }, true, ["sign", "verify"]);
const publicKey = Buffer.from(await crypto.subtle.exportKey("raw", kp.publicKey)).toString("base64url");
const privateJwk = await crypto.subtle.exportKey("jwk", kp.privateKey);
const h = await vapidHeaders("https://web.push.apple.com/abc", { privateJwk, publicKey, subject: "https://example.org" });
const [, jwt] = h.Authorization.match(/t=([^,]+)/);
const [hd, pl, sg] = jwt.split(".");
const ok = await crypto.subtle.verify({ name: "ECDSA", hash: "SHA-256" }, kp.publicKey, Buffer.from(sg, "base64url"), new TextEncoder().encode(`${hd}.${pl}`));
assert(ok, "jwt signature verifies");
assert.strictEqual(JSON.parse(Buffer.from(pl, "base64url")).aud, "https://web.push.apple.com");

// End to end with a fake D1 and a fake push service
const rows = new Map();
const DB = { prepare(sql) { return { bind(...a) { return {
  async run() {
    if (sql.startsWith("INSERT")) rows.set(a[0], { id: a[0], sub: a[1], start: a[2], end: a[3], count: a[4], tz: a[5], day: a[6], times: a[7], next_at: a[8] });
    else if (sql.startsWith("DELETE")) rows.delete(a[0]);
    else if (sql.startsWith("UPDATE")) Object.assign(rows.get(a[0]), { day: a[1], times: a[2], next_at: a[3] });
  },
  async all() { return { results: [...rows.values()].filter((r) => r.next_at != null && r.next_at <= a[0]) }; },
}; } }; } };
const env = { DB, ALLOWED_ORIGIN: "https://blessb15.github.io", VAPID_PUBLIC_KEY: publicKey, VAPID_PRIVATE_JWK: JSON.stringify(privateJwk), VAPID_SUBJECT: "https://example.org" };
const pushes = []; const realFetch = globalThis.fetch;
globalThis.fetch = async (url, init) => { pushes.push({ url, init }); return new Response(null, { status: 201 }); };

const sub = { endpoint: "https://web.push.apple.com/device1", keys: { p256dh: "x", auth: "y" } };
const res = await worker.fetch(new Request("https://w/subscribe", { method: "POST", body: JSON.stringify({ subscription: sub, start: "00:00", end: "23:59", count: 3, tz }) }), env);
const body = await res.json();
assert(body.ok && !("times" in body), "subscribe ok and never reveals times");
// DB.first() for the test-beep route
DB.prepare = ((orig) => (sql) => { const st = orig(sql); return { bind: (...a) => ({ ...st.bind(...a), first: async () => rows.get(a[0]) ?? null }) }; })(DB.prepare.bind(DB));
const tb = await (await worker.fetch(new Request("https://w/test-beep", { method: "POST", body: JSON.stringify({ endpoint: sub.endpoint }) }), env)).json();
assert(tb.ok && tb.status === 201, "test-beep sends now and reports status");
pushes.length = 0;
const tbMissing = await (await worker.fetch(new Request("https://w/test-beep", { method: "POST", body: JSON.stringify({ endpoint: "https://x/unknown" }) }), env)).json();
assert(!tbMissing.ok && tbMissing.step === "server", "unknown device reported");
const row = [...rows.values()][0];
// Fake the clock: make the first beep due now
const times = JSON.parse(row.times); times[0] = Date.now() - 1000; row.times = JSON.stringify(times); row.next_at = times[0];
await worker.scheduled({}, env);
assert.strictEqual(pushes.length, 1, "one beep sent");
assert.strictEqual(pushes[0].init.headers.TTL, "180");
assert(pushes[0].init.body instanceof Uint8Array && pushes[0].init.body.length === 0, "empty body, no payload");
assert.strictEqual(JSON.parse(row.times).length, 2, "beep consumed");
// A stale beep (past the timebox) is dropped, not sent
const t2 = JSON.parse(row.times); t2[0] = Date.now() - TIMEBOX_MS - 60000; row.times = JSON.stringify(t2); row.next_at = t2[0];
await worker.scheduled({}, env);
assert.strictEqual(pushes.length, 1, "stale beep not sent");
// Gone subscription is deleted
globalThis.fetch = async () => new Response(null, { status: 410 });
const t3 = JSON.parse(row.times); t3[0] = Date.now() - 1000; row.times = JSON.stringify(t3); row.next_at = t3[0];
await worker.scheduled({}, env);
assert.strictEqual(rows.size, 0, "410 deletes the subscription");
// Unsubscribe path
globalThis.fetch = realFetch;
console.log("worker tests passed");
