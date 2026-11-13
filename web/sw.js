// Service worker: shows beeps and opens the notepad. It never sees notes or taps.
const CACHE = "instant-v2";
const FILES = ["./", "index.html", "style.css", "app.js", "config.js", "lib/sampling.js", "manifest.webmanifest", "icon-192.png"];

self.addEventListener("install", (e) => {
  e.waitUntil(caches.open(CACHE).then((c) => c.addAll(FILES)).then(() => self.skipWaiting()));
});
self.addEventListener("activate", (e) => {
  e.waitUntil(caches.keys().then((ks) => Promise.all(ks.filter((k) => k !== CACHE).map((k) => caches.delete(k)))).then(() => self.clients.claim()));
});
self.addEventListener("fetch", (e) => {
  if (e.request.method !== "GET" || new URL(e.request.url).origin !== location.origin) return;
  // Network first so updates arrive; cache as offline fallback.
  e.respondWith(fetch(e.request).then((r) => { const copy = r.clone(); caches.open(CACHE).then((c) => c.put(e.request, copy)); return r; }).catch(() => caches.match(e.request)));
});

// Beeps carry no payload. The beep time is when it arrives, and the timebox counts from there.
self.addEventListener("push", (e) => {
  const at = Date.now();
  e.waitUntil(self.registration.showNotification("Instant", {
    body: "What was in your experience just now?",
    tag: "beep-" + at,
    requireInteraction: true,
    icon: "icon-192.png",
    data: { at },
  }));
});

self.addEventListener("notificationclick", (e) => {
  e.notification.close();
  const url = new URL("./#beep=" + e.notification.data.at, self.registration.scope).href;
  e.waitUntil((async () => {
    const all = await self.clients.matchAll({ type: "window", includeUncontrolled: true });
    for (const c of all) { await c.navigate(url).catch(() => {}); return c.focus(); }
    return self.clients.openWindow(url);
  })());
});
