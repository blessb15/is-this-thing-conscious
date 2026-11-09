# Guards

Rules that keep the project from getting twisted as it grows. Some are enforced by `npm run guard`; the rest rely on us. Each rule names the blind spot it protects against.

## Enforced by code (`npm run guard`)

| # | Rule | Protects against |
|---|---|---|
| G1 | Every result records its `source`: self-report, sampled, claude-judgment, literature-unverified, or literature-verified | Judgments posing as reports or research |
| G2 | Every result about Claude is `claude-judgment` (or verified literature) | Claude grading itself and calling it data |
| G3 | Every unknown says what would settle it (`wouldChange`). An error for Claude, a warning for everyone else | Unknowns posing as differences; vagueness that can't be tested |
| G4 | A firsthand-only check passed on Claude's judgment is flagged | Claude speaking for the experiencer's inside |
| G5 | The sampling questions are fixed; changing them breaks the guard until it's logged here | Questions drifting toward the answers we want |
| — | Unverified studies are counted and reported every run | Claude's memory of research being wrong |

## Enforced by the app (Instant)

| # | Rule | Protects against |
|---|---|---|
| A1 | Beeps are random within a window the user sets; the app never shows when they'll ring | Preparing a moment worth reporting |
| A2 | 3-minute timebox from the beep. Miss it and the beep is dropped completely, not logged late | Reconstructed moments posing as in-the-moment ones |
| A3 | The note is written first and locked before the six taps appear | Structured questions reshaping the free description |
| A4 | Time to first keystroke is recorded automatically | Treating a slow, reconstructed answer like an instant one |
| A5 | All data stays on the computer: no account, no server, no AI reading notes | Private experience leaving the experiencer's hands |
| A6 | If several beeps are due at once (waking from sleep), only the latest is offered | Batch-answering a backlog |

## Written rules

1. **No verdicts.** Nothing in the method returns "conscious: yes/no." It returns markers, splits, and unknowns.
2. **"Human" means Blake (n=1)** until other experiencers add samples. Write "Blake reported," not "humans have."
3. **Sample before you're told what to find.** In the sampling tool, the free description is written before the structured questions. Claude doesn't suggest what a sample "should" contain.
4. **Claude can propose, not certify.** Claude may propose checks and results, including about itself, but those stay `claude-judgment` and get no extra weight for being confident.
5. **Altered and recalled samples are kept apart**, never pooled with in-the-moment, ordinary samples (drift risk: the altered-state finding).
6. **Disagreement gets logged, not smoothed over.** When the mirror contradicts a report Blake made earlier (e.g. "less monologue lately"), the contradiction goes in FINDINGS.md.
7. **Name what's being mapped.** We map correlates and markers. Explaining *why* any of it comes with experience (the hard problem) is out of scope, and we say so.
8. **The experiencer's wellbeing comes before the experiment.** If a practice like the blank or dissolving the self ever turns unpleasant or unreal, stop and talk to someone; don't push through for data.

## Known blind spots (2026-11-09)

- Claude wrote most checks and all Claude results (conflict of interest; trained to sound carefully uncertain).
- Claude introduced concepts (Hurlburt, the blank, flow) before Blake reported matching experiences (demand characteristics).
- Results are judgments, not measurements; the original `test` functions were dropped. The mirror is the first part of the method fed by data rather than opinion.
- One human. Animal results recalled from memory, unverified.
- The ethical stakes (H1′ allows a continuous AI to be conscious) are acknowledged but not yet explored.

## Change log

- 2026-11-09: guards created; sampling questions v1 (7 questions).
- 2026-11-09: Instant app added; app guards A1–A6. App adds a state tap (ordinary/altered), already part of the `Sample` type.
