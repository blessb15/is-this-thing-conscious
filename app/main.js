// Instant: experience sampling for one experiencer. Everything stays on this computer.
const { app, BrowserWindow, ipcMain, Notification, Tray, Menu, nativeImage, dialog, shell } = require("electron");
const path = require("path");
const fs = require("fs");
const { TIMEBOX_MS, generateTimes, due, localDateKey } = require("./scheduler");
const { mirror } = require("../build/sampling.js");

const dataDir = app.getPath("userData");
const files = {
  settings: path.join(dataDir, "settings.json"),
  schedule: path.join(dataDir, "schedule.json"),
  samples: path.join(dataDir, "samples.json"),
};
const read = (f, fallback) => {
  try { return JSON.parse(fs.readFileSync(f, "utf8")); } catch { return fallback; }
};
const write = (f, v) => {
  fs.mkdirSync(dataDir, { recursive: true });
  fs.writeFileSync(f, JSON.stringify(v, null, 2));
};

const DEFAULTS = { name: "me", start: "09:00", end: "21:00", count: 4, enabled: true };
let settings = { ...DEFAULTS, ...read(files.settings, {}) };
let schedule = read(files.schedule, { date: null, alarms: [] });
let win = null;
let tray = null;
let pending = null; // the alarm currently open for sampling

function ensureSchedule(regenerateFromNow = false) {
  const now = new Date();
  const today = localDateKey(now);
  if (schedule.date !== today || regenerateFromNow) {
    const times = settings.enabled
      ? generateTimes({ day: now, start: settings.start, end: settings.end, count: settings.count, from: now })
      : [];
    schedule = { date: today, alarms: times.map((at) => ({ at })) };
    write(files.schedule, schedule);
  }
}

function createWindow() {
  win = new BrowserWindow({
    width: 560,
    height: 760,
    title: "Instant",
    backgroundColor: "#f6f1e7",
    webPreferences: { preload: path.join(__dirname, "preload.js"), contextIsolation: true },
  });
  win.removeMenu();
  win.loadFile(path.join(__dirname, "renderer", "index.html"));
  // Closing hides the window so alarms keep running; quit from the tray.
  win.on("close", (e) => {
    if (!app.isQuitting) { e.preventDefault(); win.hide(); }
  });
}

function openForSample(alarm, test = false) {
  pending = { at: alarm.at, test };
  if (!win) createWindow();
  win.show();
  win.focus();
  win.webContents.send("alarm", { at: alarm.at, deadline: Date.parse(alarm.at) + TIMEBOX_MS, test });
  shell.beep();
  if (Notification.isSupported()) {
    const n = new Notification({ title: "Instant", body: "What was in your experience just now?", silent: false });
    n.on("click", () => { win.show(); win.focus(); });
    n.show();
  }
}

function tick() {
  ensureSchedule();
  const { fire, missed } = due(schedule, Date.now());
  if (!fire.length && !missed.length) return;
  for (const a of missed) a.handled = true; // dropped completely: no record of the content
  // If several are due at once (e.g. waking from sleep), only the latest is offered.
  for (const a of fire.slice(0, -1)) a.handled = true;
  write(files.schedule, schedule);
  const latest = fire[fire.length - 1];
  if (latest && !pending) {
    latest.handled = true;
    write(files.schedule, schedule);
    openForSample(latest);
  }
}

// ---------- IPC ----------
ipcMain.handle("getSettings", () => settings);
ipcMain.handle("saveSettings", (_e, next) => {
  settings = { ...settings, ...next, count: Math.max(1, Math.min(12, Number(next.count) || 4)) };
  write(files.settings, settings);
  ensureSchedule(true);
  return settings;
});
// Guard: never reveal when alarms will ring, only how many remain.
ipcMain.handle("getStatus", () => {
  ensureSchedule();
  const samples = read(files.samples, []);
  return {
    remainingToday: schedule.alarms.filter((a) => !a.handled).length,
    samplesTotal: samples.length,
    enabled: settings.enabled,
  };
});
ipcMain.handle("saveSample", (_e, s) => {
  if (!pending || pending.at !== s.at) return { ok: false, reason: "No open beep for this sample." };
  const wasTest = pending.test;
  pending = null;
  if (Date.now() - Date.parse(s.at) > TIMEBOX_MS + 5000) return { ok: false, reason: "The 3 minutes ran out, so this beep was dropped." };
  if (wasTest) return { ok: true, test: true };
  const sample = {
    experiencer: settings.name,
    at: s.at,
    minutesToRecord: Math.max(0, s.minutesToRecord),
    state: s.state,
    describe: String(s.describe).slice(0, 4000),
    words: s.words,
    senses: s.senses,
    unbidden: s.unbidden,
    self: s.self,
    feeling: s.feeling,
    absorbed: s.absorbed,
  };
  const all = read(files.samples, []);
  all.push(sample);
  write(files.samples, all);
  return { ok: true };
});
ipcMain.handle("dropSample", () => { pending = null; return true; });
ipcMain.handle("getMirror", () => mirror(read(files.samples, []), settings.name));
ipcMain.handle("testAlarm", () => { openForSample({ at: new Date().toISOString() }, true); return true; });
ipcMain.handle("exportSamples", async () => {
  const { filePath } = await dialog.showSaveDialog(win, { defaultPath: `${settings.name}.json` });
  if (!filePath) return false;
  fs.writeFileSync(filePath, JSON.stringify(read(files.samples, []), null, 2));
  return true;
});

// ---------- lifecycle ----------
app.whenReady().then(() => {
  createWindow();
  tray = new Tray(nativeImage.createFromPath(path.join(__dirname, "icon.png")));
  tray.setToolTip("Instant");
  tray.setContextMenu(Menu.buildFromTemplate([
    { label: "Open Instant", click: () => { win.show(); win.focus(); } },
    { type: "separator" },
    { label: "Quit (alarms stop)", click: () => { app.isQuitting = true; app.quit(); } },
  ]));
  tray.on("click", () => { win.show(); win.focus(); });
  ensureSchedule();
  tick();
  setInterval(tick, 15000);
});
app.on("activate", () => { if (win) win.show(); });
app.on("window-all-closed", (e) => e.preventDefault());
