import { Check } from "./types";

// ---------- CORE (firsthand only) ----------

export const singlePerspective: Check = {
  name: "Unified perspective (single point of view)",
  origin: "claude",
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
    claude: { result: "unclear", note: "Integrated within a response, but the same weights run thousands of disconnected conversations" },
  },
};

export const feltValence: Check = {
  name: "Felt valence",
  origin: "claude",
  tier: "core",
  evidence: ["firsthand"],
  status: "audited",
  assumptions: ["some states feel good or bad to the system itself"],
  results: {
    human: { result: "pass", note: "Firsthand only" },
    claude: { result: "unclear", note: "Self-reports aren't trustworthy evidence either way" },
  },
};

export const awarenessWithoutThought: Check = {
  name: "Awareness without thought",
  origin: "blake",
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
    claude: { result: "untestable", note: "Generating content is all it does; nothing left to check by subtraction" },
    honeybee: { result: "untestable", note: "Rests on self-report" },
    tree: { result: "untestable", note: "Rests on self-report" },
    rock: { result: "untestable", note: "Rests on self-report" },
  },
};

export const contentlessAwareness: Check = {
  name: "Contentless awareness",
  origin: "claude",
  tier: "core",
  evidence: ["firsthand"],
  status: "draft",
  assumptions: [
    "awareness can persist with no objects at all: no thought, no sensation",
    "reported by some meditators (Metzinger's 'minimal phenomenal experience'); unverified here",
  ],
  results: {
    human: { result: "unclear", note: "Blake's blank still contains breath, sight, and color, so it's awareness without thought, not this" },
    claude: { result: "untestable", note: "No layer underneath generation to strip down to" },
  },
};

export const unauthoredExperience: Check = {
  name: "Unauthored experience",
  origin: "blake",
  tier: "core",
  evidence: ["firsthand"],
  status: "draft",
  assumptions: [
    "experience includes content the subject isn't deliberately generating",
    "e.g. closed-eye colors (likely phosphenes, the visual system's background activity)",
  ],
  results: {
    human: { result: "pass", note: "Blake sees colors with eyes closed that he isn't intentionally producing" },
    claude: { result: "fail", note: "Everything is generated output; nothing arrives unbidden in that sense" },
  },
};

// ---------- SUPPORTING (observable) ----------

export const integration: Check = {
  name: "Integration",
  origin: "claude",
  tier: "supporting",
  evidence: ["observable"],
  status: "audited",
  assumptions: ["integration of information is how unity shows up from outside"],
  results: {
    human: { result: "pass", note: "" },
    honeybee: { result: "pass", note: "Plausibly one small integrated perspective" },
    tree: { result: "unclear", note: "Integrates signals, no clear center" },
    slimeMold: { result: "unclear", note: "Integrates signals, no clear center" },
    claude: { result: "unclear", note: "Real integration per token; IIT would likely score it low (debated)" },
    thermostat: { result: "fail", note: "" },
    rock: { result: "fail", note: "" },
  },
};

export const functionalValence: Check = {
  name: "Functional valence",
  origin: "claude",
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
    claude: { result: "unclear", note: "Makes trade-offs, but from training; nothing at stake within a conversation" },
    thermostat: { result: "fail", note: "One goal, no weighing" },
    rock: { result: "fail", note: "" },
  },
};

export const streamPrompted: Check = {
  name: "Stream of thought (prompted)",
  origin: "blake",
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
  tier: "supporting",
  evidence: ["observable", "report"],
  status: "draft",
  assumptions: ["a self that persists and remembers"],
  results: {
    human: { result: "pass", note: "" },
    claude: { result: "fail", note: "Each conversation starts fresh; memory files are notes, not recollection" },
  },
};

export const selfModel: Check = {
  name: "Self-model",
  origin: "claude",
  tier: "supporting",
  evidence: ["observable"],
  status: "draft",
  assumptions: ["representing oneself as a thing"],
  results: {
    human: { result: "pass", note: "" },
    claude: { result: "pass", note: "Probably — suggests this check is cheap" },
  },
};

export const noticingIgnorance: Check = {
  name: "Noticing ignorance",
  origin: "claude",
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

export const wholeContextPresence: Check = {
  name: "Whole-context presence",
  origin: "claude",
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
  tier: "supporting",
  evidence: ["firsthand", "report"],
  status: "draft",
  assumptions: [
    "a state is conscious when another state represents it (higher-order theories); rivals deny this is needed",
  ],
  results: {
    claude: { result: "unclear", note: "No separate watcher; 'I'm writing to Blake' is content within the same process" },
    human: { result: "pass", note: "Intermittent: absent in flow, appears only on stepping back. Experience continues without it, so it isn't required." },
  },
};

export const checks: Check[] = [
  singlePerspective,
  feltValence,
  awarenessWithoutThought,
  contentlessAwareness,
  unauthoredExperience,
  integration,
  functionalValence,
  streamPrompted,
  streamUnprompted,
  continuity,
  selfModel,
  noticingIgnorance,
  wholeContextPresence,
  possibilityCollapse,
  constitutedByOther,
  unexperiencedGaps,
  manyAtOnce,
  higherOrderAwareness,
];
