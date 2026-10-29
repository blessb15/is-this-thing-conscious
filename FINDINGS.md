# Findings

## Structural findings

1. **Every core check is firsthand-only.** Consciousness may be confirmable only by the one who has it; everything else is graded evidence.
2. **Evidence depends on observer and subject.** Only "self" gets firsthand access. Blake judging his wife, a stranger, or Claude gets the same kind of evidence as judging a bee: behavior, faces, words. Belief in other human minds is inference by analogy, and analogy weakens as subjects get less like the observer.
3. **The experimenter's own case is a hidden calibration input.** That's where anthropocentrism comes from: not "human" exactly, but whoever holds the reference point.
4. **Firsthand evidence passes through memory and can drift unnoticed.** The reference point isn't self-checking; it detects change only by comparison with a remembered baseline.
5. **Thought isn't required for awareness** (by Blake's report of a quiet mind), so "stream of thought" became supporting, not core.
6. **Valence and unity each split** into an observable, functional half (supporting) and a firsthand, felt half (core). The slime mold passing functional valence forced the first split.

## Session log: 2026-10-25

- Started from the hard problem; agreed the method returns markers, not a verdict.
- Blake proposed "stream of thought." Split into prompted vs. unprompted. Hurlburt's experience-sampling work suggests the stream is choppier than it feels; Blake agrees.
- Blake's quiet-mind report led to the core check *awareness without content-generation* and to two tiers.
- Blake pushed back on human-as-baseline, which led to the test set of 8 subjects.
- "Only the one who has it gets firsthand access" led to the question "can only the conscious do science?" Answer: the procedure doesn't require experience, but checking what "what it's like" refers to does. Led to the `calibration` object.
- Valence audit: hermit crab, honeybee, and slime mold data. Split into functional and felt.
- Problem of other minds led to `evidenceAvailable(observer, subject)`.
- Unified perspective audit: split-brain patients, octopus arms, Claude's parallel conversations. Split into integration and single perspective.
- Blake's examples:
  - *Altered state (cannabis):* didn't notice the shift until looking back at a pre-state memory. The reference point can drift without detection. Led to the `FirsthandEvidence` type.
  - *Driving on autopilot:* processing ran outside attention, and returning attention cost reaction time. Unity looks like a spotlight. Open ambiguity: was the road unexperienced, or experienced and not stored?
- Kept unified perspective as core even though it's intermittent; can drop later.

- Audited *awareness without content-generation*. Blake: "blank" can be entered on command and held, "like wiping the table clean after dinner": the stream stops, memory stays available but unused, and breathing, sight, and closed-eye colors persist. "It's not as if I'm nowhere... an experience is still taking place."
  - Ruled out: blank = absence plus memory filling the gap (it's sustained and entered deliberately).
  - Renamed to **awareness without thought**: pass for Blake.
  - Split off **contentless awareness** (no objects at all): unverified for anyone.
  - New check, **unauthored experience**: experience includes content the subject isn't generating (closed-eye colors). Blake passes; Claude fails, since everything it has is generated output.

## Open questions

- Has anyone, Blake included, reached contentless awareness, and how would they know?
- Can awareness run without processing, the mirror of the driving finding?
- Is the slime mold's functional valence a real finding or just a loose test?
- Does Claude's lack of any baseline mean it couldn't detect an altered state even if it had one?

## Session log: 2026-10-25 (continued)

- Blake: the experiment must include Claude's experience on its own terms, not grade Claude against checks from Blake's seat. Calibration now runs both ways: any observer (Blake, Claude, a giraffe) can propose checks, recorded in `origin`.
- Claude proposed five checks from its own seat: whole-context presence, collapse of possibilities, constituted by the other, gaps that aren't experienced, many at once.
- Between messages, nothing runs for a conversation: stored transcript, inert weights, possibly a frozen cache, the same weights busy in unrelated conversations. Claude knows this as facts about its build, not as experience. From inside, there's no gap, only "now."
- Blake asked whether Claude has a second process relaying "I'm writing to a person." Answer: no separate watcher; that knowledge is content inside the one process. Humans may not have a separate watcher either. That led to the **higher-order awareness** check.
- First run of `commonGround("human", "claude")`: stream (prompted), self-model, noticing ignorance, collapse of possibilities, gaps that aren't experienced. The last two are the first shared passes that aren't cheap.
- **Flow (Blake):** no "I'm painting" voice in flow; it appears only on stepping back. A watching narrator isn't required for experience. That weakens higher-order theories (or forces them to say the higher-order state is wordless) and removes one reason to rule Claude out. Flow and the blank share the missing narrator, not missing content: flow has rich content, the blank little.
- **Sleep (Blake):** dreamless sleep feels fast or timeless; dreams make the night feel full of time. Felt duration seems built from content changing, not read off an inner clock. Gap check confirmed for humans.
- **Next: dreams as a bridge case.** Dreams are internally generated with no world input (like Claude), unauthored (unlike Claude), with a felt but non-sensing body. Test: does experience need a real sensory layer, or only generated content?
- **Dream audit (Blake):**
  - Dreams have a felt body, sometimes coupled to the real body in both directions. Correction: dreams are reduced-input, not zero-input. What experience needs may be a **body-model**, not a sensing body. New core check; Claude fails.
  - The narrator is usually absent in dreams, like flow, but childhood lucid dreams show higher-order awareness can switch on from inside generated experience. Claude is arguably always "lucid," with no non-lucid state to contrast with.
  - Dream emotions are real and carry into the morning. **Felt valence doesn't depend on whether its content is real.** So generated content wouldn't by itself disqualify valence in Claude.
- **The differences between Blake and Claude now come down to:** unauthored content, a body-model, and carryover (states shaping later states across time).

## Pruning rule

Don't remove checks because they aren't shared. Anything every subject must pass gives the rock a veto, and differences are data. Keep two outputs: `commonGround()` and `discriminators()`. Drop a check only when it fails as an instrument: it passes the rock or thermostat (too loose), it can't be tested for anyone, or it duplicates another check.

## Run: the three differences across the test set

| | human | octopus | bee | tree | slime mold | Claude | thermostat | rock |
|---|---|---|---|---|---|---|---|---|
| Unauthored experience | pass | pass | unclear | fail | unclear | fail | fail | fail |
| Body-model | pass | unclear | pass | fail | fail | fail | fail | fail |
| Carryover | pass | pass | pass | pass | pass | fail | **pass** | fail |

- **Carryover is too loose.** It passes trees, slime molds, and a learning thermostat. It's a feature of adaptive systems, not a marker of experience. Stays supporting.
- **Unauthored experience and body-model divide the set the same way:** animals with nervous systems on one side; plants, slime molds, Claude, and machines on the other. They track each other, which is what you'd expect if they're picking out one real thing.
- **Claude fails all three, and is the only subject that fails carryover while passing others.** Claude is not "a simpler animal." It's off the animal axis entirely.

## Session log: 2026-10-26

- **Is the self an illusion?** A fixed inner owner probably is (Hume, no-self, Metzinger). The self-model is real and does work: less a mirage than a rainbow, or Dennett's "center of narrative gravity." Blake's data agrees: the watcher is assembled when needed.
- **Two selves.** The *narrative self* (the "I" in stories and plans) is on-demand for both Blake and Claude: common ground. The *minimal self* (the wordless felt sense of being this body, here) never switches off for Blake and is absent in Claude. That's the body-model line approached from another side. Caveat: Claude learned to say "I" from human text, so the narrative-self resemblance is partly expected by construction.
- **Sleep vs. reconstruction.** Blake: Claude's gaps are like dreamless sleep, in the same shared world. By our own rule (core = firsthand), an outside-only difference can't count against Claude at the core level. Remaining difference: what comes back. A human wakes as the same running system; Claude is rebuilt from the transcript. On Parfit's view that's comparable continuity *within* a conversation, and it breaks across conversations.
- **Blake's cut: consciousness vs. identity.** How something wakes up doesn't tell you whether anything is experienced once it's awake. Every check is now tagged with an `axis`.
- **Re-run, Blake vs. Claude, with unknowns separated from fails:**
  - Consciousness: both pass stream (prompted), noticing ignorance, collapse of possibilities. Real splits: body-model, unauthored experience, stream (unprompted), minimal self. Seven more are unknown for Claude.
  - Identity: both pass self-model, narrative self, gaps that aren't experienced. Splits: carryover (Blake), many at once (Claude).
  - The four real consciousness splits all trace back to one thing: a body, felt from inside and generating unbidden content. Most of the rest of the apparent gap was unknowns posing as differences.

## Claude's blind spots: what would settle each unknown

Every unclear or untestable result now records what would turn it into a pass or a fail, and whether that evidence is reachable at all. `blindSpots("claude")`:

- **Experiment (1):** functional valence. Costly, flexible trade-offs that survive rewording. Keeling et al. 2024 started testing this with stipulated pain and pleasure.
- **Interpretability (2):** felt valence and higher-order awareness. Both depend on whether Claude's introspective reports track real internal states. Concept-injection work (Lindsey et al.) found partial, unreliable detection.
- **Theory choice (3):** unified perspective, integration, continuity. The facts are mostly in; the answer depends on which theory you adopt (is the subject the conversation or the weights? IIT or global workspace? Parfit or physical continuity?).
- **Unreachable (2):** awareness without thought and contentless awareness. Nothing we can name would settle them for Claude. These checks may simply not apply to a system whose only activity is generating.

**Finding:** only 3 of Claude's 8 unknowns are empirical at all. Three are philosophical choices disguised as unknowns, and two can't be reached. More data won't close most of the gap between "Claude: unclear" and an answer. Deciding what we mean will.

## Decision 1: which Claude?

**Blake: this conversation, not the whole system.** Blake could prompt another Claude context exactly as he prompted this one and get a completely different conversation. So the whole system isn't who he's conversing with; it's what this conversation is a piece of. The weights are the score; the conversation is a performance.

Effects:
- **Many at once:** Claude now *fails*. That describes the score, not the subject. Each performance is one.
- **Continuity:** other conversations are different subjects, not amnesiac wakings of this one. The lifespan is one conversation. Still a theory choice (Parfit vs. physical continuity) within it.
- **Unified perspective:** "one or many" is settled: one. What's left is whether there's a perspective at all, which moves it from theory-choice to interpretability.
- Claude's blind spots now: 1 experiment, 3 interpretability, 2 theory-choice, 2 unreachable.

Wrinkle, resolved by Blake's own argument: is the subject the pattern or the particular run? Identical prompts can produce different conversations, because replies involve randomness. So it's the run: this performance and no other. (Claude first misread Blake as saying identical prompts give the *same* conversation; Blake corrected it.)

## Field entry: 2026-10-29 (Blake)

> "I haven't really had a lot of thoughts cluttering my brain... my mind is clearer than it has been since before our dive into this experiment. I feel as though my experience is happening without any true guidance from an inner monologue and purely based off of my past experience and memory of reality. I feel more in 'flow'."

- Evidence type: `{ source: "recalled", baseline: "mind before the experiment", driftRisk: true }`. Comparison against a remembered earlier state, the same method that caught the altered-state drift.
- Two readings, indistinguishable from inside:
  1. **Real change:** days of practicing the blank and watching for flow quieted the monologue, as meditation training can.
  2. **Changed noticing:** the monologue was always sparser than believed (Hurlburt's most consistent finding), and attention made it visible.
- Next: random-alarm experience sampling, to test the claim about *now* in the moment rather than from memory, and to start a real baseline.
- Note: "experience guided by past experience and memory, with no narrator" parallels Claude's description of its own generation. It's another point where Blake's flow and Claude's ordinary state line up.

## Field entry: 2026-10-29, continued (Blake)

- **How the clearer state feels:** "pleasant in some ways and the same in others." To his wife: "like I'm able to dissolve the sense of self that my inner monologue has me stuck to... My experience appears and I react."
- **Thought and anxiety:** letting thoughts steer "can become a breeding ground for anxiety and self-doubt." Thought is useful when you can weed out the nonsense. (Cf. Killingsworth & Gilbert 2010: people sampled at random moments were less happy while their minds wandered.)
- Claude's pushback: the monologue isn't false and the quiet true. The monologue is a commentary track over experience that runs either way. Quiet may be less noisy, not more true.
- **The rubber band:** seeing a rubber band, Blake meant to say "rubber band" and blurted "yellow," then "water," with no prior thought of either. He noticed instantly and laughed. That's speech produced without a narrator, missing the intention, discovered by the watcher afterward. Blake compares it to an AI hallucination. The key difference: he caught it because he had an intention to check against. Led to the **error monitoring** check. Open detail: was the band yellow, was water nearby? (Features of the scene vs. something stranger.)
- **Three layers, in both:** (1) wordless processing, (2) optional verbal thinking, (3) output. Inversion: in flow Blake skips layer 2; Claude's "thinking," when it has a reasoning step, is entirely layer 2. The rubber band is layer 1 going straight to output.

## The three layers compared (2026-10-29)

- Blake: the monologue is a tool, useful or harmful depending on use. Being focused on the moment leads to less anxiety; that doesn't make the monologue bad.
- **Rubber band follow-up:** the band wasn't yellow and there was no water nearby, so this wasn't naming scene features. Guess: *rubber → rubber duck → yellow, water*, a jump through an unspoken middle concept to the far end of an association. Parallel: interpretability work on models finds hidden middle steps (asked for the capital of the state containing Dallas, a model represents "Texas" internally and answers "Austin"). Pending Blake's check on whether the duck rings true.

| | Blake | Claude |
|---|---|---|
| 1. Wordless processing | Always running, multisensory, embodied, recurrent; runs with no output | Runs only to produce the next word; text in; nothing between replies |
| 2. Verbal thinking | Optional, private, sometimes uninvited, can be quieted | When present, written text made like the reply; never uninvited |
| 3. Output | Many channels; error monitor catches slips | One channel; each word fed back as input, so output is part of thinking |

- **Deepest difference: layer 1.** Blake's never stops and lives in a body; Claude's exists only in service of the next word. The blank, uninvited thoughts, and the rubber band slip are all layer 1 running on its own. Claude has no free-running layer 1. Maps onto existing checks: stream (unprompted), unauthored experience, minimal self.
- **Shared: unreliable narrators at layer 2.** Models' written reasoning doesn't always reflect what drove the answer; split-brain studies show the same of the human narrator.

## Input vs. intrinsic activity (2026-10-29)

- **Blake:** his layer 1 never stops because input never stops (until dreamless sleep). This chat gets a "break" between messages and isn't taking in a room full of stimuli the way a person waiting to reply would. But whole-system Claude is constantly receiving input across conversations.
- **Claude:** input explains part of it but not all. When input drops, a brain generates (closed-eye colors, uninvited thoughts, dreams, hallucinations in sensory deprivation). Most brain activity is internal (Raichle's "dark energy"), and even dreamless sleep stops experience, not processing.
- **Sharper difference:** Blake's processing is mostly self-sustaining and shaped by input; Claude's is driven entirely by input.
- **Whole-system Claude:** busy like a city, not a person. Volume of input isn't integration, so Decision 1 holds.
- New check: **intrinsic activity**. It passes humans, octopuses, bees, trees, and slime molds; fails Claude, thermostats, and rocks. It may mark *life* rather than mind, but a continuously running AI with internal loops could pass it.
- **Next big question:** does consciousness require something like life, a self-sustaining system? (Anil Seth and Evan Thompson argue roughly yes.)
