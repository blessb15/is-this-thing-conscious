# isThisThingConscious

A collaborative thought experiment between Blake and Claude: build a method that takes a `potentialConsciousness` and returns the list of checks it passes, from each of our perspectives.

**Ground rule:** no check can return `true` for consciousness itself. Every test inspects behavior or structure, and the hard problem is exactly the gap between those and experience. The method returns markers, not a verdict.

**Second ground rule:** projecting experience onto things is as much an error as denying it. Human isn't the base case; assumptions get stated openly so they can be challenged.

## Layout

- `src/types.ts`: `Check`, `Subject`, evidence and calibration types
- `src/subjects.ts`: the test set (human, octopus, honeybee, tree, slime mold, Claude, thermostat, rock)
- `src/checks.ts`: every check, with tier, evidence, assumptions, and per-subject results
- `src/isThisThingConscious.ts`: the method, plus `evidenceAvailable(observer, subject)`
- `FINDINGS.md`: structural findings and the session log
- `HYPOTHESES.md`: formal hypotheses, tested against our data

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
