// Beep worker. Stores per person: a push endpoint, a time window, a time zone, and today's beep times.
// It never receives notes, taps, or anything else about experience.
import { TIMEBOX_MS, nextSchedule } from "./schedule.js";
import { sendBeep } from "./vapid.js";

const json = (body, status, cors) => new Response(JSON.stringify(body), { status, headers: { "Content-Type": "application/json", ...cors } });
const valid = (s) => /^\d{2}:\d{2}$/.test(s);

async function idFor(endpoint) {
  const h = await crypto.subtle.digest("SHA-256", new TextEncoder().encode(endpoint));
  return [...new Uint8Array(h)].map((b) => b.toString(16).padStart(2, "0")).join("");
}

export default {
  async fetch(req, env) {
    const cors = {
      "Access-Control-Allow-Origin": env.ALLOWED_ORIGIN,
      "Access-Control-Allow-Methods": "POST, OPTIONS",
      "Access-Control-Allow-Headers": "Content-Type",
    };
    if (req.method === "OPTIONS") return new Response(null, { headers: cors });
    const url = new URL(req.url);
    if (req.method !== "POST") return json({ ok: true, service: "instant-beeps" }, 200, cors);

    let body;
    try { body = await req.json(); } catch { return json({ error: "bad json" }, 400, cors); }

    if (url.pathname === "/subscribe") {
      const { subscription, start, end, tz } = body;
      const count = Math.max(1, Math.min(12, Number(body.count) || 4));
      if (!subscription?.endpoint?.startsWith("https://") || !valid(start) || !valid(end)) return json({ error: "invalid" }, 400, cors);
      try { new Intl.DateTimeFormat("en", { timeZone: tz }); } catch { return json({ error: "bad tz" }, 400, cors); }
      const prefs = { start, end, count, tz };
      const { day, times } = nextSchedule(prefs, Date.now());
      const id = await idFor(subscription.endpoint);
      await env.DB.prepare(
        `INSERT INTO subs (id, sub, start, "end", count, tz, day, times, next_at) VALUES (?1, ?2, ?3, ?4, ?5, ?6, ?7, ?8, ?9)
         ON CONFLICT(id) DO UPDATE SET sub=?2, start=?3, "end"=?4, count=?5, tz=?6, day=?7, times=?8, next_at=?9`
      ).bind(id, JSON.stringify(subscription), start, end, count, tz, day, JSON.stringify(times), times[0] ?? null).run();
      return json({ ok: true }, 200, cors); // never returns the times (guard A1)
    }

    // Diagnostic: send one beep right now and report what the push service answered.
    if (url.pathname === "/test-beep") {
      if (!body.endpoint) return json({ error: "invalid" }, 400, cors);
      const row = await env.DB.prepare("SELECT sub FROM subs WHERE id = ?1").bind(await idFor(body.endpoint)).first();
      if (!row) return json({ ok: false, step: "server", detail: "This device isn't registered for beeps. Turn beeps off and on again." }, 200, cors);
      try {
        const vapid = { privateJwk: JSON.parse(env.VAPID_PRIVATE_JWK), publicKey: env.VAPID_PUBLIC_KEY, subject: env.VAPID_SUBJECT };
        const r = await sendBeep(JSON.parse(row.sub), vapid);
        const text = r.ok ? "" : (await r.text()).slice(0, 300);
        console.log("test-beep", r.status, text);
        return json({ ok: r.ok, step: "push-service", status: r.status, detail: text }, 200, cors);
      } catch (e) {
        console.log("test-beep error", String(e));
        return json({ ok: false, step: "worker", detail: String(e).slice(0, 300) }, 200, cors);
      }
    }

    if (url.pathname === "/unsubscribe") {
      if (!body.endpoint) return json({ error: "invalid" }, 400, cors);
      await env.DB.prepare("DELETE FROM subs WHERE id = ?1").bind(await idFor(body.endpoint)).run();
      return json({ ok: true }, 200, cors);
    }
    return json({ error: "not found" }, 404, cors);
  },

  // Runs every minute.
  async scheduled(_event, env) {
    const now = Date.now();
    const vapid = { privateJwk: JSON.parse(env.VAPID_PRIVATE_JWK), publicKey: env.VAPID_PUBLIC_KEY, subject: env.VAPID_SUBJECT };
    const { results } = await env.DB.prepare("SELECT * FROM subs WHERE next_at IS NOT NULL AND next_at <= ?1").bind(now).all();
    for (const row of results) {
      let times = JSON.parse(row.times);
      const due = times.filter((t) => t <= now);
      times = times.filter((t) => t > now);
      // Only the latest due beep rings, and only if still inside the timebox (guards A2, A6).
      const latest = due[due.length - 1];
      if (latest && now - latest <= TIMEBOX_MS) {
        const r = await sendBeep(JSON.parse(row.sub), vapid).catch((e) => { console.log("beep error", String(e)); return null; });
        if (r) console.log("beep", r.status, r.ok ? "" : (await r.clone().text()).slice(0, 200));
        if (r && (r.status === 404 || r.status === 410)) {
          await env.DB.prepare("DELETE FROM subs WHERE id = ?1").bind(row.id).run();
          continue;
        }
      }
      let day = row.day;
      if (!times.length) ({ day, times } = nextSchedule({ start: row.start, end: row.end, count: row.count, tz: row.tz }, now));
      await env.DB.prepare("UPDATE subs SET day = ?2, times = ?3, next_at = ?4 WHERE id = ?1")
        .bind(row.id, day, JSON.stringify(times), times[0] ?? null).run();
    }
  },
};
