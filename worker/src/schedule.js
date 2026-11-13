// Random beep times in the person's own time zone. Pure functions, testable in Node.
export const TIMEBOX_MS = 3 * 60 * 1000;

const minutesOf = (hhmm) => { const [h, m] = hhmm.split(":").map(Number); return h * 60 + m; };

// Local calendar parts of an instant in a time zone.
export function localParts(epoch, tz) {
  const f = new Intl.DateTimeFormat("en-CA", { timeZone: tz, year: "numeric", month: "2-digit", day: "2-digit", hour: "2-digit", minute: "2-digit", second: "2-digit", hourCycle: "h23" });
  const p = Object.fromEntries(f.formatToParts(new Date(epoch)).map((x) => [x.type, x.value]));
  return { y: +p.year, m: +p.month, d: +p.day, minutes: +p.hour * 60 + +p.minute, seconds: +p.second, key: `${p.year}-${p.month}-${p.day}` };
}

// Epoch for a local date + minutes-after-midnight in a time zone (handles DST by iterating).
export function zonedEpoch(y, m, d, minutes, tz) {
  let guess = Date.UTC(y, m - 1, d, 0, minutes);
  for (let i = 0; i < 3; i++) {
    const p = localParts(guess, tz);
    const asUtc = Date.UTC(p.y, p.m - 1, p.d, 0, p.minutes, p.seconds);
    const want = Date.UTC(y, m - 1, d, 0, minutes);
    if (asUtc === want) break;
    guess += want - asUtc;
  }
  return guess;
}

// count random times between start and end on the local day containing `day`, after `from`, >= minGap apart.
export function drawTimes({ day, tz, start, end, count, from = 0, minGap = 30, rng = Math.random }) {
  const p = localParts(day, tz);
  const base = (mins) => zonedEpoch(p.y, p.m, p.d, mins, tz);
  let lo = minutesOf(start), hi = minutesOf(end);
  if (hi <= lo || count <= 0) return [];
  const lowEpoch = Math.max(base(lo), from + 60000);
  const hiEpoch = base(hi);
  if (hiEpoch <= lowEpoch) return [];
  const span = hiEpoch - lowEpoch;
  const gap = Math.max(0, Math.min(minGap * 60000, Math.floor(span / count) - 60000));
  for (let attempt = 0; attempt < 500; attempt++) {
    const t = Array.from({ length: count }, () => lowEpoch + Math.round(rng() * span)).sort((a, b) => a - b);
    if (t.every((x, i) => i === 0 || x - t[i - 1] >= gap)) return t;
  }
  const slot = span / count;
  return Array.from({ length: count }, (_, i) => Math.round(lowEpoch + slot * i + rng() * slot * 0.8));
}

// Times for the rest of today; if none remain, the whole of the next day.
export function nextSchedule(prefs, now, rng) {
  let times = drawTimes({ day: now, ...prefs, from: now, rng });
  let dayEpoch = now;
  if (!times.length) {
    dayEpoch = now + 24 * 3600 * 1000;
    // Move to local noon of the next day so DST shifts can't skip a day.
    const p = localParts(dayEpoch, prefs.tz);
    dayEpoch = zonedEpoch(p.y, p.m, p.d, 12 * 60, prefs.tz);
    times = drawTimes({ day: dayEpoch, ...prefs, from: now, rng });
  }
  return { day: localParts(dayEpoch, prefs.tz).key, times };
}
