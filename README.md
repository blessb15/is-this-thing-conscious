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

## Current state

| Check | Tier | Evidence | Status |
|---|---|---|---|
| Unified perspective | core | firsthand | audited |
| Felt valence | core | firsthand | audited |
| Awareness without thought | core | firsthand | audited |
| Contentless awareness | core | firsthand | draft |
| Unauthored experience | core | firsthand | draft |
| Integration | supporting | observable | audited |
| Functional valence | supporting | observable | audited |
| Stream (prompted) | supporting | report, observable | draft |
| Stream (unprompted) | supporting | report | draft |
| Continuity over time | supporting | observable, report | draft |
| Self-model | supporting | observable | draft |
| Noticing ignorance | supporting | observable | draft |
