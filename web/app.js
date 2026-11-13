// Instant (web): experience sampling. Notes and taps are stored only on this device.
import { mirror } from "./lib/sampling.js";
import { WORKER_URL, VAPID_PUBLIC_KEY } from "./config.js";

const TIMEBOX_MS = 3 * 60 * 1000;
const $ = (id) => document.getElementById(id);
const views = ["home", "sample", "done", "mirror"];
const show = (v) => views.forEach((x) => $(x).classList.toggle("hidden", x !== v));

// ---------- local storage (per-device; wrapped because it can throw) ----------
const store = {
  get(k, fallback) { try { const v = localStorage.getItem("instant." + k); return v ? JSON.parse(v) : fallback; } catch { return fallback; } },
  set(k, v) { try { localStorage.setItem("instant." + k, JSON.stringify(v)); return true; } catch { return false; } },
};
const DEFAULTS = { name: "me", start: "09:00", end: "21:00", count: 4, beeps: false };
const settings = () => ({ ...DEFAULTS, ...store.get("settings", {}) });
const samples = () => store.get("samples", []);
if (navigator.storage && navigator.storage.persist) navigator.storage.persist().catch(() => {});

const pushReady = Boolean(WORKER_URL && VAPID_PUBLIC_KEY && "serviceWorker" in navigator && "PushManager" in window);
const isStandalone = matchMedia("(display-mode: standalone)").matches || navigator.standalone === true;
const isIOS = /iPad|iPhone|iPod/.test(navigator.userAgent);

let registration = null;
if ("serviceWorker" in navigator) {
  navigator.serviceWorker.register("sw.js").then((r) => (registration = r)).catch(() => {});
}

// ---------- home ----------
function refresh() {
  const s = settings();
  $("start").value = s.start; $("end").value = s.end; $("count").value = s.count; $("name").value = s.name;
  $("beepState").textContent = s.beeps ? "on" : "off";
  $("total").textContent = samples().length;
  $("beepsOn").classList.toggle("hidden", s.beeps);
  $("beepsOff").classList.toggle("hidden", !s.beeps);
  $("serverBeep").classList.toggle("hidden", !s.beeps);
  $("setupNote").classList.toggle("hidden", pushReady);
  $("installNote").classList.toggle("hidden", !(isIOS && !isStandalone));
  $("beepsOn").disabled = !pushReady;
}
const readForm = () => ({
  start: $("start").value, end: $("end").value,
  count: Math.max(1, Math.min(12, Number($("count").value) || 4)),
  name: $("name").value.trim() || "me",
});
const say = (t) => { $("saved").textContent = t; clearTimeout(say.t); say.t = setTimeout(() => ($("saved").textContent = ""), 12000); };

function urlB64ToBytes(b64) {
  const pad = "=".repeat((4 - (b64.length % 4)) % 4);
  const raw = atob((b64 + pad).replace(/-/g, "+").replace(/_/g, "/"));
  return Uint8Array.from(raw, (c) => c.charCodeAt(0));
}

$("beepsOn").onclick = async () => {
  const form = readForm();
  store.set("settings", { ...settings(), ...form });
  try {
    const perm = await Notification.requestPermission();
    if (perm !== "granted") return say("Notifications are blocked, so beeps can't ring.");
    const reg = registration || (await navigator.serviceWorker.ready);
    const sub = (await reg.pushManager.getSubscription()) ||
      (await reg.pushManager.subscribe({ userVisibleOnly: true, applicationServerKey: urlB64ToBytes(VAPID_PUBLIC_KEY) }));
    const tz = Intl.DateTimeFormat().resolvedOptions().timeZone;
    const r = await fetch(WORKER_URL + "/subscribe", {
      method: "POST", headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ subscription: sub.toJSON(), start: form.start, end: form.end, count: form.count, tz }),
    });
    if (!r.ok) throw new Error("server said " + r.status);
    store.set("settings", { ...settings(), beeps: true });
    say("Beeps are on. Today's remaining beeps were drawn on the server.");
  } catch (e) {
    say("Couldn't turn beeps on: " + e.message);
  }
  refresh();
};

$("beepsOff").onclick = async () => {
  try {
    const reg = registration || (await navigator.serviceWorker.ready);
    const sub = await reg.pushManager.getSubscription();
    if (sub) {
      await fetch(WORKER_URL + "/unsubscribe", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ endpoint: sub.endpoint }) }).catch(() => {});
      await sub.unsubscribe();
    }
  } catch {}
  store.set("settings", { ...settings(), beeps: false });
  say("Beeps are off. The server no longer has your schedule.");
  refresh();
};

$("test").onclick = () => openForSample(Date.now(), true);

// Diagnostic: a beep sent through the whole path right now. The beep it produces is treated as a test, not saved.
$("serverBeep").onclick = async () => {
  try {
    const reg = registration || (await navigator.serviceWorker.ready);
    const sub = await reg.pushManager.getSubscription();
    if (!sub) return say("This device has no beep subscription. Turn beeps off and on again.");
    store.set("testUntil", Date.now() + 2 * 60 * 1000);
    const r = await fetch(WORKER_URL + "/test-beep", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ endpoint: sub.endpoint }) });
    const d = await r.json();
    if (d.ok) say(`Sent (push service answered ${d.status}). A beep should arrive in a few seconds.`);
    else say(`Beep failed at ${d.step}${d.status ? " (" + d.status + ")" : ""}: ${d.detail || "no detail"}`);
  } catch (e) {
    say("Couldn't reach the beep server: " + e.message);
  }
};

$("export").onclick = () => {
  const blob = new Blob([JSON.stringify(samples(), null, 2)], { type: "application/json" });
  const a = Object.assign(document.createElement("a"), { href: URL.createObjectURL(blob), download: `${settings().name}.json` });
  document.body.append(a); a.click(); a.remove();
};

// ---------- sample ----------
let current = null;
let timer = null;

function openForSample(at, test = false) {
  if (!test && at <= store.get("testUntil", 0)) test = true; // a server test beep, not a real sample
  const handled = store.get("handled", []);
  if (!test && handled.includes(at)) return show("home");
  if (!test) store.set("handled", [...handled.slice(-50), at]); // each beep opens once (guard A6)
  if (Date.now() - at > TIMEBOX_MS) {
    return finish(["Dropped.", "More than 3 minutes passed since the beep, so it isn't in your log. A missed beep is better than a reconstructed one."]);
  }
  current = { at, deadline: at + TIMEBOX_MS, test, firstKeyAt: null, answers: { senses: [] } };
  $("describe").value = ""; $("describe").readOnly = false;
  $("step1").classList.remove("hidden"); $("step2").classList.add("hidden");
  document.querySelectorAll(".q button").forEach((b) => b.classList.remove("on"));
  $("submit").disabled = true;
  $("testTag").classList.toggle("hidden", !test);
  show("sample");
  $("describe").focus();
  clearInterval(timer);
  timer = setInterval(tickTimer, 250);
  tickTimer();
}

function tickTimer() {
  if (!current) return;
  const left = current.deadline - Date.now();
  if (left <= 0) return drop();
  const m = Math.floor(left / 60000), s = Math.floor((left % 60000) / 1000);
  $("countdown").textContent = `${m}:${String(s).padStart(2, "0")}`;
  $("countdown").classList.toggle("low", left < 30000);
}

$("describe").addEventListener("input", () => {
  if (current && current.firstKeyAt === null) current.firstKeyAt = Date.now();
});

// Guard A3: the note is locked before the structured questions appear.
$("next").onclick = () => {
  if (!$("describe").value.trim()) return $("describe").focus();
  $("describe").readOnly = true;
  $("lockedNote").textContent = $("describe").value.trim();
  $("step1").classList.add("hidden");
  $("step2").classList.remove("hidden");
  window.scrollTo(0, 0);
};

document.querySelectorAll(".q").forEach((q) => {
  const key = q.dataset.key, multi = q.hasAttribute("data-multi");
  q.querySelectorAll("button").forEach((b) => {
    b.onclick = () => {
      if (!current) return;
      if (multi) {
        b.classList.toggle("on");
        current.answers[key] = [...q.querySelectorAll("button.on")].map((x) => x.dataset.v);
      } else {
        q.querySelectorAll("button").forEach((x) => x.classList.remove("on"));
        b.classList.add("on");
        current.answers[key] = b.dataset.v;
      }
      $("submit").disabled = !["words", "unbidden", "self", "feeling", "absorbed", "state"].every((k) => current.answers[k]);
    };
  });
});

$("submit").onclick = () => {
  if (!current) return;
  if (Date.now() > current.deadline + 5000) return drop();
  if (current.test) return finish(["Test done.", "Nothing was saved."]);
  const a = current.answers;
  const sample = {
    experiencer: settings().name,
    at: new Date(current.at).toISOString(),
    minutesToRecord: ((current.firstKeyAt ?? Date.now()) - current.at) / 60000,
    state: a.state,
    describe: $("describe").value.trim().slice(0, 4000),
    words: a.words, senses: a.senses, unbidden: a.unbidden, self: a.self, feeling: a.feeling, absorbed: a.absorbed,
  };
  const ok = store.set("samples", [...samples(), sample]);
  finish(ok ? ["Saved.", "Back to whatever you were doing."] : ["Couldn't save.", "This browser blocked storage (private mode?)."]);
};

function drop() {
  finish(["Dropped.", "The 3 minutes ran out, so this beep isn't in your log. That's fine: a missed beep is better than a reconstructed one."]);
}
function finish([title, text]) {
  clearInterval(timer); current = null;
  $("doneTitle").textContent = title; $("doneText").textContent = text;
  show("done"); refresh();
}
$("back").onclick = () => { history.replaceState(null, "", location.pathname); show("home"); };

// ---------- mirror ----------
$("openMirror").onclick = () => {
  const m = mirror(samples(), settings().name);
  $("warnings").replaceChildren(...m.warnings.map((w) => Object.assign(document.createElement("li"), { textContent: w })));
  $("lines").replaceChildren(...m.lines.map((l) => {
    const d = Object.assign(document.createElement("div"), { className: "line" });
    d.append(
      Object.assign(document.createElement("div"), { className: "check", textContent: l.check }),
      Object.assign(document.createElement("p"), { textContent: m.usable ? l.reported : "No moments yet." }),
    );
    return d;
  }));
  show("mirror");
};
$("mirrorBack").onclick = () => show("home");

// ---------- opened from a beep ----------
function routeFromHash() {
  const m = location.hash.match(/beep=(\d+)/);
  if (m) openForSample(Number(m[1]));
}
window.addEventListener("hashchange", routeFromHash);

refresh();
routeFromHash();
