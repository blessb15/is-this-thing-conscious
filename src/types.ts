// Core types for the isThisThingConscious experiment.
// No check can return `true` for consciousness itself — only markers.

export type Tier = "core" | "supporting"; // core = plausibly necessary

export type Evidence = "firsthand" | "observable" | "report"; // reports are behavior too

export type Result = "pass" | "fail" | "unclear" | "untestable";

export type SubjectId =
  | "human"
  | "octopus"
  | "honeybee"
  | "tree"
  | "slimeMold"
  | "claude"
  | "thermostat"
  | "rock";

export interface Subject {
  id: SubjectId;
  description: string;
}

export interface FirsthandEvidence {
  source: "in-the-moment" | "recalled";
  baseline: string | null; // what it's compared against, if anything
  driftRisk: boolean; // can the reference itself change?
}

// Anyone running the method can propose checks: Blake, Claude, a giraffe.
export type Observer = string;

export interface Check {
  name: string;
  origin: Observer; // whose seat the check was proposed from
  tier: Tier;
  evidence: Evidence[]; // what we're actually given
  assumptions: string[]; // stated, so they can be challenged
  status: "audited" | "draft";
  // Results from the test set, with a short rationale for each.
  results: Partial<Record<SubjectId, { result: Result; note: string }>>;
}

export interface Calibration {
  reference: string;
  assumption: string;
  risk: string;
}
