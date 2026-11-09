// Random alarm times inside a daily window. Pure functions, so they can be tested.

const TIMEBOX_MS = 3 * 60 * 1000; // from the beep: respond and finish within 3 minutes, or the beep is dropped

function minutesOf(hhmm) {
  const [h, m] = hhmm.split(":").map(Number);
  return h * 60 + m;
}

function localDateKey(d) {
  const p = (n) => String(n).padStart(2, "0");
  return `${d.getFullYear()}-${p(d.getMonth() + 1)}-${p(d.getDate())}`;
}

// Pick `count` random times between start and end on the given day, at least minGap minutes apart.
// If `from` is given, only times after it are used (e.g. settings changed mid-day).
function generateTimes({ day, start, end, count, minGap = 30, from = null, rng = Math.random }) {
  const base = new Date(day.getFullYear(), day.getMonth(), day.getDate());
  let lo = minutesOf(start);
  const hi = minutesOf(end);
  if (from) {
    const fromMin = (from - base) / 60000 + 1;
    lo = Math.max(lo, Math.ceil(fromMin));
  }
  if (hi <= lo || count <= 0) return [];
  // Shrink the gap if the window can't fit it.
  let gap = Math.min(minGap, Math.floor((hi - lo) / Math.max(count, 1)) - 1);
  if (gap < 0) gap = 0;

  for (let attempt = 0; attempt < 500; attempt++) {
    const picks = Array.from({ length: count }, () => lo + rng() * (hi - lo)).sort((a, b) => a - b);
    if (picks.every((m, i) => i === 0 || m - picks[i - 1] >= gap)) {
      return picks.map((m) => new Date(base.getTime() + Math.round(m * 60000)).toISOString());
    }
  }
  // Fallback: evenly spaced slots with jitter.
  const slot = (hi - lo) / count;
  return Array.from({ length: count }, (_, i) =>
    new Date(base.getTime() + Math.round((lo + slot * i + rng() * slot * 0.8) * 60000)).toISOString()
  );
}

// Which alarms are due now? Returns { fire, missed } and never fires one past its timebox.
function due(schedule, now) {
  const fire = [];
  const missed = [];
  for (const a of schedule.alarms) {
    if (a.handled) continue;
    const t = Date.parse(a.at);
    if (t > now) continue;
    if (now - t <= TIMEBOX_MS) fire.push(a);
    else missed.push(a); // e.g. computer was asleep; dropped completely
  }
  return { fire, missed };
}

module.exports = { TIMEBOX_MS, generateTimes, due, localDateKey, minutesOf };
