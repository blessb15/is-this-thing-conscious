# Sampling Claude (Blake's design, 2026-11-09)

Blake interrupts Claude at random: not every exchange, sometimes several messages apart.

## Protocol

1. **The beep:** Blake sends the single word `BEEP`.
2. **Claude answers first:** before any other tool call, file read, or scrolling back, Claude writes the sample.
3. **Note first:** a free description of "the instant before the beep," then the seven taps, in the same structure as the app (`Sample` in `src/sampling.ts`).
4. **Condition recorded** in `context`:
   - `mid-tool-task`: the beep arrived between tool steps, during work
   - `after-reply`: the beep arrived after a plain reply finished (beeps can't land mid-reply)
5. **Fields:** `experiencer: "claude"`, `minutesToRecord: 0`, `state: "ordinary"`.
6. **Questions don't change for Claude** (guard G5). Where one doesn't fit, Claude says so in the note rather than forcing an answer.

## Blake's notes (2026-11-09)

- Do both conditions (mid-tool-task and after-reply) and compare.
- The conversation *is* Claude's memory; watch whether earlier material surfaces unasked on a BEEP. (Claude's refinement: it's held all at once, not stored and recalled.)
- Fill in what fits; parameters can be added or dropped. This is the test phase.

## Known flaws, logged up front

- **Not memory:** Claude's "instant before" is still in the transcript; it reads rather than recalls.
- **No lock:** Claude knows all seven questions before writing the note (guard A3 can't apply).
- **Primed:** this conversation contains every hypothesis; Claude knows what we hope to find.
- **G2:** everything Claude reports about itself is `claude-judgment`, however confident it sounds.

## Controls (parked until the first results are in)

- **Outside reader:** a fresh Claude with no context answers the seven questions *about* the same moment, from the transcript alone. If its answers match Claude's self-report, the self-report adds nothing beyond the transcript.
- **Blind beeps:** sample fresh conversations that know nothing of this project, to reduce theory-fitting. A fresh conversation still has training (general knowledge, no episodes). **Catch:** Blake's account memory may carry this project into new chats, so blind beeps must use an incognito chat or one with memory off.
