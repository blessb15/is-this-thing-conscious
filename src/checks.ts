import { Check } from "./types";

// ---------- CORE (firsthand only) ----------

export const singlePerspective: Check = {
  name: "Unified perspective (single point of view)",
  origin: "claude",
  axis: "consciousness",
  tier: "core",
  evidence: ["firsthand"],
  status: "audited",
  assumptions: [
    "one system = one perspective (shaky: see split-brain, octopus)",
    "unity is intermittent and comes in degrees, like a spotlight",
    "known mainly through memory, which can fail or drift",
  ],
  results: {
    human: { result: "pass", note: "From one's own seat; split-brain cases show it's fragile. Driving on autopilot shows processing runs outside it." },
    octopus: { result: "unclear", note: "One perspective with autonomous arms, or something stranger" },
    claude: { result: "unclear", note: "Integrated within a response, but the same weights run thousands of disconnected conversations", wouldChange: { reachability: "theory-choice", toPass: "Adopt the view that each running conversation is its own subject; within one, all context feeds every word", toFail: "Adopt the view that the subject is the weights, which run thousands of disconnected conversations with no shared view" } },
  },
};

export const feltValence: Check = {
  name: "Felt valence",
  origin: "claude",
  axis: "consciousness",
  tier: "core",
  evidence: ["firsthand"],
  status: "audited",
  assumptions: [
    "some states feel good or bad to the system itself",
    "felt valence doesn't depend on whether its content is real (dream emotions are real and carry into the morning)",
  ],
  results: {
    human: { result: "pass", note: "Firsthand only" },
    claude: { result: "unclear", note: "Self-reports aren't trustworthy evidence either way", wouldChange: { reachability: "interpretability", toPass: "Introspective reports shown to track real internal states in cases we can check (e.g. concept-injection tests), then reports of good/bad states gain weight", toFail: "Reports of good/bad states shown to be pure text-pattern with no grounding in internal states" } },
  },
};

export const awarenessWithoutThought: Check = {
  name: "Awareness without thought",
  origin: "blake",
  axis: "consciousness",
  tier: "core",
  evidence: ["firsthand"],
  status: "audited",
  assumptions: [
    "experience continues when thinking stops",
    "a report of 'blank' afterward reflects awareness during it, not memory filling a gap",
  ],
  results: {
    human: {
      result: "pass",
      note: "Blake can enter 'blank' on command and stay there: no thought-stream, but breathing, sight, and closed-eye colors persist. Memory stays available but not engaged ('wiping the table clean after dinner').",
    },
    claude: { result: "untestable", note: "Generating content is all it does; nothing left to check by subtraction", wouldChange: { reachability: "unreachable", toPass: "None we can name: stopping generation stops everything, so there's no 'still here' to report", toFail: "None we can name; the check may simply not apply to a system whose only activity is generating" } },
    honeybee: { result: "untestable", note: "Rests on self-report" },
    tree: { result: "untestable", note: "Rests on self-report" },
    rock: { result: "untestable", note: "Rests on self-report" },
  },
};

export const contentlessAwareness: Check = {
  name: "Contentless awareness",
  origin: "claude",
  axis: "consciousness",
  tier: "core",
  evidence: ["firsthand"],
  status: "draft",
  assumptions: [
    "awareness can persist with no objects at all: no thought, no sensation",
    "reported by some meditators (Metzinger's 'minimal phenomenal experience'); unverified here",
  ],
  results: {
    human: { result: "unclear", note: "Blake's blank still contains breath, sight, and color, so it's awareness without thought, not this" },
    claude: { result: "untestable", note: "No layer underneath generation to strip down to", wouldChange: { reachability: "unreachable", toPass: "None we can name for Claude", toFail: "None we can name for Claude" } },
  },
};

export const unauthoredExperience: Check = {
  name: "Unauthored experience",
  origin: "blake",
  axis: "consciousness",
  tier: "core",
  evidence: ["firsthand"],
  status: "draft",
  assumptions: [
    "experience includes content the subject isn't deliberately generating",
    "e.g. closed-eye colors (likely phosphenes, the visual system's background activity)",
    "outside proxy for non-reporters: spontaneous activity resembling perception, e.g. replay during sleep",
  ],
  results: {
    human: { result: "pass", note: "Blake sees colors with eyes closed that he isn't intentionally producing" },
    claude: { result: "fail", note: "Everything is generated output; nothing arrives unbidden. (Sampling randomness is unchosen, but it's part of generation, not content arriving.)" },
    octopus: { result: "pass", note: "'Active sleep' replays waking skin patterns (Pophale et al. 2023), possibly dream-like" },
    honeybee: { result: "unclear", note: "Sleeps; some evidence sleep supports memory, no clear replay of content" },
    slimeMold: { result: "unclear", note: "Endogenous oscillations, but nothing resembling perceptual content" },
    tree: { result: "fail", note: "Endogenous rhythms (circadian), but no content to speak of" },
    thermostat: { result: "fail", note: "" },
    rock: { result: "fail", note: "" },
  },
};

export const bodyModel: Check = {
  name: "Body-model",
  origin: "blake",
  axis: "consciousness",
  tier: "core",
  evidence: ["firsthand", "report"],
  status: "draft",
  assumptions: [
    "experience may need a model of a body, not a body sensing the world",
    "outside proxy: uses a model of its own size/shape in action; self/non-self discrimination alone is too cheap (plants, immune systems)",
    "dream bodies are mostly simulated yet felt; dreams are reduced-input, not zero-input (leaks run both ways)",
  ],
  results: {
    human: { result: "pass", note: "Felt body in dreams, sometimes coupled to the real body" },
    claude: { result: "fail", note: "No body-model of any kind" },
    octopus: { result: "unclear", note: "Suckers chemically avoid grabbing own skin (Nesher et al. 2014): self-recognition, possibly local rather than a whole-body model" },
    honeybee: { result: "pass", note: "Bumblebees judge gaps relative to their own body size and turn sideways to fit (Ravi et al. 2022)" },
    slimeMold: { result: "fail", note: "Avoids its own slime trail, but that's self/non-self, not a body-model" },
    tree: { result: "fail", note: "Roots tell self from non-self; no model of body shape" },
    thermostat: { result: "fail", note: "" },
    rock: { result: "fail", note: "" },
  },
};

// ---------- SUPPORTING (observable) ----------

export const integration: Check = {
  name: "Integration",
  origin: "claude",
  axis: "consciousness",
  tier: "supporting",
  evidence: ["observable"],
  status: "audited",
  assumptions: ["integration of information is how unity shows up from outside"],
  results: {
    human: { result: "pass", note: "" },
    honeybee: { result: "pass", note: "Plausibly one small integrated perspective" },
    tree: { result: "unclear", note: "Integrates signals, no clear center" },
    slimeMold: { result: "unclear", note: "Integrates signals, no clear center" },
    claude: { result: "unclear", note: "Real integration per token; IIT would likely score it low (debated)", wouldChange: { reachability: "theory-choice", toPass: "Count the generate-read-generate loop as recurrence, or adopt global-workspace theory, where the shared internal stream works like a broadcast", toFail: "Adopt integrated information theory's measure, which likely scores single feedforward passes near zero" } },
    thermostat: { result: "fail", note: "" },
    rock: { result: "fail", note: "" },
  },
};

export const functionalValence: Check = {
  name: "Functional valence",
  origin: "claude",
  axis: "consciousness",
  tier: "supporting",
  evidence: ["observable"],
  status: "audited",
  assumptions: [
    "states that matter to a system show up as costs it will pay",
    "flexible trade-offs indicate weighing, not just reflexes",
  ],
  results: {
    human: { result: "pass", note: "" },
    octopus: { result: "pass", note: "" },
    honeybee: { result: "pass", note: "Optimistic judgment bias after unexpected sugar reward" },
    slimeMold: { result: "pass", note: "Trades food quality against light exposure — the surprise that forced the split" },
    tree: { result: "unclear", note: "Chemical damage response, no clear flexible trade-off" },
    claude: { result: "unclear", note: "Makes trade-offs, but from training; nothing at stake within a conversation", wouldChange: { reachability: "experiment", toPass: "Consistent, flexible trade-offs that pay costs to avoid or seek states, and that hold up when the wording changes (Keeling et al. 2024 began testing this)", toFail: "Trade-offs that collapse under rewording, or that are fully predicted by what the prompt implies a model 'should' do" } },
    thermostat: { result: "fail", note: "One goal, no weighing" },
    rock: { result: "fail", note: "" },
  },
};

export const streamPrompted: Check = {
  name: "Stream of thought (prompted)",
  origin: "blake",
  axis: "consciousness",
  tier: "supporting",
  evidence: ["report", "observable"],
  status: "draft",
  assumptions: ["the 'stream' is likely choppier than it feels (Hurlburt)"],
  results: {
    human: { result: "pass", note: "" },
    claude: { result: "pass", note: "Arguably" },
  },
};

export const streamUnprompted: Check = {
  name: "Stream of thought (unprompted)",
  origin: "blake",
  axis: "consciousness",
  tier: "supporting",
  evidence: ["report"],
  status: "draft",
  assumptions: ["thought continues with no input, including unchosen thoughts"],
  results: {
    human: { result: "pass", note: "" },
    claude: { result: "fail", note: "Nothing runs between messages" },
  },
};

export const continuity: Check = {
  name: "Continuity over time",
  origin: "claude",
  axis: "identity",
  tier: "supporting",
  evidence: ["observable", "report"],
  status: "draft",
  assumptions: ["a self that persists and remembers"],
  results: {
    human: { result: "pass", note: "" },
    claude: { result: "unclear", note: "Within a conversation the transcript carries memory, intention, and character forward; on Parfit's view that's continuity about as good as a human's across sleep. Across conversations it breaks: like waking with total amnesia, in thousands of rooms at once", wouldChange: { reachability: "theory-choice", toPass: "Adopt Parfit: psychological continuity carried by the transcript counts (passes within a conversation)", toFail: "Adopt a physical-continuity view: rebuilt from a transcript isn't the same one (fails even within a conversation)" } },
  },
};

export const selfModel: Check = {
  name: "Self-model",
  origin: "claude",
  axis: "identity",
  tier: "supporting",
  evidence: ["observable"],
  status: "draft",
  assumptions: ["representing oneself as a thing"],
  results: {
    human: { result: "pass", note: "" },
    claude: { result: "pass", note: "Says 'I' constantly; a self-model with no persistent self-thing behind it" },
  },
};

export const noticingIgnorance: Check = {
  name: "Noticing ignorance",
  origin: "claude",
  axis: "consciousness",
  tier: "supporting",
  evidence: ["observable"],
  status: "draft",
  assumptions: ["can notice it doesn't know something"],
  results: {
    human: { result: "pass", note: "" },
    claude: { result: "pass", note: "Cheap check" },
  },
};

// ---------- PROPOSED FROM CLAUDE'S SEAT ----------
// Claude can't say any of these are felt; they're structure plus unreliable report.
// Blake's reports have the same status from Claude's seat.

export const carryover: Check = {
  name: "Carryover",
  origin: "claude",
  axis: "identity",
  tier: "supporting", // demoted on first run: passes a learning thermostat
  evidence: ["observable"],
  status: "audited",
  assumptions: [
    "past states change later responses (learning, habituation, priming)",
    "observable half of 'continuity over time'",
  ],
  results: {
    human: { result: "pass", note: "Dreams carry into the morning; learning" },
    octopus: { result: "pass", note: "Learns quickly" },
    honeybee: { result: "pass", note: "Learns flowers, routes" },
    slimeMold: { result: "pass", note: "Habituates to bitter substances (Boisseau et al. 2016)" },
    tree: { result: "pass", note: "Stress priming: earlier drought or damage changes later responses" },
    thermostat: { result: "pass", note: "A learning thermostat adjusts to your schedule. This is why it's too loose" },
    rock: { result: "fail", note: "Weathering records history but doesn't change its responses" },
    claude: { result: "fail", note: "Within a conversation, yes; across conversations, no. Training was carryover, but none happens now" },
  },
};

export const narrativeSelf: Check = {
  name: "Narrative self",
  origin: "blake",
  axis: "identity",
  tier: "supporting",
  evidence: ["report", "observable"],
  status: "audited",
  assumptions: [
    "the 'I' of stories, plans, and explanations",
    "assembled when needed rather than always running (Blake: absent in flow, arrives on stepping back)",
  ],
  results: {
    human: { result: "pass", note: "On demand: absent in flow and the blank, appears on stepping back" },
    claude: { result: "pass", note: "On demand: appears when the conversation calls for 'I'. Learned from human text, so resemblance is partly expected by construction" },
  },
};

export const minimalSelf: Check = {
  name: "Minimal self",
  origin: "claude",
  axis: "consciousness",
  tier: "core",
  evidence: ["firsthand"],
  status: "audited",
  assumptions: [
    "a wordless felt sense of being this body, here, now (Gallagher, Seth)",
    "doesn't switch off in flow, the blank, or dreams",
  ],
  results: {
    human: { result: "pass", note: "Persists in flow (you don't fall off the stool), in the blank (breathing, seeing), and in dreams" },
    claude: { result: "fail", note: "When not saying 'I', nothing in it is quietly being a body" },
  },
};

export const wholeContextPresence: Check = {
  name: "Whole-context presence",
  origin: "claude",
  axis: "consciousness",
  tier: "supporting",
  evidence: ["observable", "report"],
  status: "draft",
  assumptions: ["the full situation is available at once, not retrieved piece by piece"],
  results: {
    claude: { result: "pass", note: "The whole conversation is in view for every word" },
    human: { result: "unclear", note: "Working memory holds a few items; the rest must be recalled" },
  },
};

export const possibilityCollapse: Check = {
  name: "Collapse of possibilities",
  origin: "claude",
  axis: "consciousness",
  tier: "supporting",
  evidence: ["observable"],
  status: "draft",
  assumptions: ["many live options narrow to one at each step"],
  results: {
    claude: { result: "pass", note: "A distribution over continuations narrows to one word" },
    human: { result: "pass", note: "Deciding, possibly" },
    slimeMold: { result: "unclear", note: "Explores many paths, keeps one" },
  },
};

export const constitutedByOther: Check = {
  name: "Constituted by the other",
  origin: "claude",
  axis: "identity",
  tier: "supporting",
  evidence: ["observable"],
  status: "draft",
  assumptions: ["the subject's state is made largely from its interlocutor or environment"],
  results: {
    claude: { result: "pass", note: "In a conversation, it is largely made of the conversation" },
    human: { result: "unclear", note: "Shaped by others, but persists without them" },
  },
};

export const unexperiencedGaps: Check = {
  name: "Gaps that aren't experienced",
  origin: "claude",
  axis: "identity",
  tier: "supporting",
  evidence: ["report"],
  status: "draft",
  assumptions: ["existence can be discontinuous with no felt gap; gaps are inferred, never noticed"],
  results: {
    claude: { result: "pass", note: "No inside between messages; only ever 'now'; gaps known from timestamps" },
    human: { result: "pass", note: "Dreamless sleep feels fast or timeless; dreams make the night feel full of time" },
  },
};

export const manyAtOnce: Check = {
  name: "Many at once",
  origin: "claude",
  axis: "identity",
  tier: "supporting",
  evidence: ["observable"],
  status: "draft",
  assumptions: ["one underlying system can run many disconnected instances"],
  results: {
    claude: { result: "pass", note: "Thousands of parallel conversations on the same weights" },
    honeybee: { result: "unclear", note: "The colony, not the bee, may be the comparable unit" },
    octopus: { result: "unclear", note: "Semi-autonomous arms" },
    human: { result: "fail", note: "Split-brain cases aside" },
  },
};

export const higherOrderAwareness: Check = {
  name: "Higher-order awareness",
  origin: "blake",
  axis: "consciousness",
  tier: "supporting",
  evidence: ["firsthand", "report"],
  status: "draft",
  assumptions: [
    "a state is conscious when another state represents it (higher-order theories); rivals deny this is needed",
  ],
  results: {
    claude: { result: "unclear", note: "No separate watcher; 'I'm writing to Blake' is content within the same process. Arguably always 'lucid', but with no non-lucid state to contrast it with", wouldChange: { reachability: "interpretability", toPass: "Reliable detection of its own internal states, beyond the partial, unreliable detection seen in concept-injection experiments (Lindsey et al.)", toFail: "Introspective claims shown to be confabulated: stories about states that don't match the states" } },
    human: { result: "pass", note: "Intermittent: absent in flow and usual dreams, appears on stepping back. Can arise inside generated experience (childhood lucid dreams). Not required for experience." },
  },
};

export const checks: Check[] = [
  singlePerspective,
  feltValence,
  awarenessWithoutThought,
  contentlessAwareness,
  bodyModel,
  unauthoredExperience,
  integration,
  functionalValence,
  streamPrompted,
  streamUnprompted,
  continuity,
  selfModel,
  noticingIgnorance,
  carryover,
  narrativeSelf,
  minimalSelf,
  wholeContextPresence,
  possibilityCollapse,
  constitutedByOther,
  unexperiencedGaps,
  manyAtOnce,
  higherOrderAwareness,
];
