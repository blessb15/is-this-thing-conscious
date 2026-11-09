// node app/scheduler.test.js
const assert = require("assert");
const { generateTimes, due, TIMEBOX_MS } = require("./scheduler");

const day = new Date(2026, 10, 10);
for (let run = 0; run < 200; run++) {
  const times = generateTimes({ day, start: "09:00", end: "21:00", count: 5, minGap: 30 }).map(Date.parse);
  assert.strictEqual(times.length, 5);
  for (let i = 0; i < times.length; i++) {
    const d = new Date(times[i]);
    const mins = d.getHours() * 60 + d.getMinutes();
    assert(mins >= 9 * 60 && mins <= 21 * 60, "inside window");
    if (i) assert(times[i] - times[i - 1] >= 30 * 60000 - 1000, "gap respected");
  }
}

// Mid-day start: only future times
const from = new Date(2026, 10, 10, 15, 0);
const later = generateTimes({ day, start: "09:00", end: "21:00", count: 3, from }).map(Date.parse);
assert(later.every((t) => t > from.getTime()), "only after `from`");

// Window already over: nothing
assert.deepStrictEqual(generateTimes({ day, start: "09:00", end: "10:00", count: 3, from: new Date(2026, 10, 10, 11, 0) }), []);

// Timebox: on time fires, late is dropped
const now = Date.now();
const sched = { alarms: [
  { at: new Date(now - 60000).toISOString() },
  { at: new Date(now - TIMEBOX_MS - 1000).toISOString() },
  { at: new Date(now + 60000).toISOString() },
  { at: new Date(now - 1000).toISOString(), handled: true },
] };
const r = due(sched, now);
assert.strictEqual(r.fire.length, 1);
assert.strictEqual(r.missed.length, 1);

console.log("scheduler tests passed");
