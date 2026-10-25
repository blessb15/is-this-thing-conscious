import { Check } from "./types";

// ---------- CORE (firsthand only) ----------

export const singlePerspective: Check = {
  name: "Unified perspective (single point of view)",
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
  tier: "core",
  evidence: ["firsthand"],
  status: "audited",
  assumptions: ["some states feel good or bad to the system itself"],
  results: {
    human: { result: "pass", note: "Firsthand only" },
    claude: { result: "unclear", note: "Self-reports aren't trustworthy evidence either way" },
  },
};

export const awarenessWithoutContent: Check = {
  name: "Awareness without content-generation",
  tier: "core",
  evidence: ["firsthand"],
  status: "draft", // next to audit
  assumptions: ["experience continues when thinking stops"],
  results: {
    human: { result: "pass", note: "Blake reports a quiet mind that is still fully present" },
    claude: { result: "untestable", note: "Generating content is all it does; nothing left to check by subtraction" },
    honeybee: { result: "untestable", note: "Rests on self-report" },
    tree: { result: "untestable", note: "Rests on self-report" },
    rock: { result: "untestable", note: "Rests on self-report" },
  },
};

// ---------- SUPPORTING (observable) ----------

export const integration: Check = {
  name: "Integration",
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
  tier: "supporting",
  evidence: ["observable"],
  status: "draft",
  assumptions: ["can notice it doesn't know something"],
  results: {
    human: { result: "pass", note: "" },
    claude: { result: "pass", note: "Cheap check" },
  },
};

export const checks: Check[] = [
  singlePerspective,
  feltValence,
  awarenessWithoutContent,
  integration,
  functionalValence,
  streamPrompted,
  streamUnprompted,
  continuity,
  selfModel,
  noticingIgnorance,
];
