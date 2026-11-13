# isThisThingConscious

A collaborative thought experiment between Blake and Claude: build a method that takes a `potentialConsciousness` and returns the list of checks it passes, from each of our perspectives.

**Try Instant, the experience-sampling app:** [blessb15.github.io/is-this-thing-conscious](https://blessb15.github.io/is-this-thing-conscious/)

**Ground rule:** no check can return `true` for consciousness itself. Every test inspects behavior or structure, and the hard problem is exactly the gap between those and experience. The method returns markers, not a verdict.

**Second ground rule:** projecting experience onto things is as much an error as denying it. Human isn't the base case; assumptions get stated openly so they can be challenged.

## Layout

- `src/types.ts`: `Check`, `Subject`, evidence and calibration types
- `src/subjects.ts`: the test set (human, octopus, honeybee, tree, slime mold, Claude, thermostat, rock)
- `src/checks.ts`: every check, with tier, evidence, assumptions, and per-subject results
- `src/isThisThingConscious.ts`: the method, plus `evidenceAvailable(observer, subject)`
- `FINDINGS.md`: structural findings and the session log
- `HYPOTHESES.md`: formal hypotheses, tested against our data
- `GUARDS.md`: rules that keep the project honest, and its known blind spots
- `src/sampling.ts`: experience sampling and the mirror
- `src/guard.ts`: guards enforced as code
- `data/samples/`: experience samples, one file per experiencer

## Commands

- `npm run guard`: check the project against its guards (fails on errors, lists warnings)
- `npm run app`: start **Instant**, the sampling app (see below)
- `npm run mirror -- <experiencer>`: report on an experiencer's own samples
- `npm test`: scheduler and worker tests plus the guards
- `npm run web`: serve the phone app locally at http://localhost:8765

## The method as a mirror

Any experiencer can sample their own moments (`data/samples/README.md`). Samples feed the method, and the mirror reports back what they show, linked to the checks. It's a tool for understanding your own experience, not a verdict about it. **"Human" in the results means Blake (n=1)** until others add samples.

## Instant, the sampling app

A desktop app (Electron) for experience sampling:

1. Set a window (e.g. 9am–9pm) and how many beeps you want.
2. Beeps ring at random times you can't see in advance.
3. The app opens to a notepad: describe the instant before the beep, in your own words.
4. The note locks, then six quick taps break it down (words, senses, unbidden, "I", feeling, absorbed, plus state).
5. You have 3 minutes from the beep. Miss them and the beep is dropped.
6. **Your mirror** shows what you reported, linked to the method's checks.

Everything stays on your computer. Closing the window keeps beeps running; quit from the tray icon. **Export samples** writes a JSON file in the same format as `data/samples/`.

```
git clone https://github.com/blessb15/is-this-thing-conscious
cd is-this-thing-conscious
npm install
npm run app
```

Needs Node.js 18+.

## Instant on your phone

The same app as a web app, hosted on GitHub Pages: [blessb15.github.io/is-this-thing-conscious](https://blessb15.github.io/is-this-thing-conscious/)

### iPhone (iOS 16.4 or later)

1. Open the link in **Safari**.
2. Tap **Share** → **Add to Home Screen**, then open Instant **from the home screen**. Beeps only work there, not in a Safari tab.
3. Set your window, tap **Turn beeps on**, and allow notifications.
4. Tap **Send a server beep now** to check that beeps reach you.

### Android

1. Open the link in **Chrome** (Firefox and Samsung Internet also work).
2. Tap the **⋮** menu → **Add to Home screen** (or **Install app**), and open Instant from there. Beeps also work from a browser tab, but the home-screen version opens straight to the notepad.
3. Set your window, tap **Turn beeps on**, and allow notifications.
4. Tap **Send a server beep now** to check that beeps reach you.
5. If beeps arrive late or not at all, check that battery saving isn't restricting your browser (Settings → Apps → Chrome → Battery → Unrestricted).

### Computer

Works in Chrome, Edge, and Firefox. Beeps arrive while the browser is running. Use **Install** in the address bar if you want it as its own window.

### What stays where

- Notes and taps stay on the device. A small Cloudflare worker (`worker/`) sends the beeps; it stores only a notification address, your window, your time zone, and the day's beep times, and never sees what you write.
- Running your own copy: worker setup is in `worker/README.md`. Deploys: pushing `web/` to `main` publishes the app (`.github/workflows/pages.yml`).

## Two questions

The method separates two questions we'd been mixing:

- **Consciousness:** is there experience right now?
- **Identity:** is it the same one over time?

A being could fail identity and pass consciousness, like someone with no memory, rebuilt fresh every minute. How something "wakes up" (a brain that kept running vs. a computation rebuilt from a transcript) is an identity question, not a consciousness one.

## Functions

- `isThisThingConscious(subject, observer)`: markers the observer has evidence for. Never a verdict.
- `commonGround(subjects, axis?)`: checks every subject passes.
- `discriminators(subjects, axis?)`: checks where some pass and some fail.
- `unknowns(subjects, axis?)`: blind spots, kept apart so unknowns don't pose as differences.
- `blindSpots(subject)`: a subject's unknowns, grouped by what could settle them: experiment, interpretability, theory choice, or unreachable.

## Current state

| Check | Axis | Tier | Evidence | Origin | Status |
|---|---|---|---|---|---|
| Unified perspective (single point of view) | consciousness | core | firsthand | claude | audited |
| Felt valence | consciousness | core | firsthand | claude | audited |
| Awareness without thought | consciousness | core | firsthand | blake | audited |
| Contentless awareness | consciousness | core | firsthand | claude | draft |
| Body-model | consciousness | core | firsthand, report | blake | draft |
| Unauthored experience | consciousness | core | firsthand | blake | draft |
| Minimal self | consciousness | core | firsthand | claude | audited |
| Integration | consciousness | supporting | observable | claude | audited |
| Functional valence | consciousness | supporting | observable | claude | audited |
| Stream of thought (prompted) | consciousness | supporting | report, observable | blake | draft |
| Stream of thought (unprompted) | consciousness | supporting | report | blake | draft |
| Noticing ignorance | consciousness | supporting | observable | claude | draft |
| Whole-context presence | consciousness | supporting | observable, report | claude | draft |
| Collapse of possibilities | consciousness | supporting | observable | claude | draft |
| Higher-order awareness | consciousness | supporting | firsthand, report | blake | draft |
| Continuity over time | identity | supporting | observable, report | claude | draft |
| Self-model | identity | supporting | observable | claude | draft |
| Carryover | identity | supporting | observable | claude | audited |
| Narrative self | identity | supporting | report, observable | blake | audited |
| Constituted by the other | identity | supporting | observable | claude | draft |
| Gaps that aren't experienced | identity | supporting | report | claude | draft |
| Many at once | identity | supporting | observable | claude | draft |
