import { Axis, Calibration, Check, Evidence, Reachability, SubjectId } from "./types";
import { checks } from "./checks";

// The hidden input: every check gets judged against the experimenter's own case.
export const calibration: Calibration = {
  reference: "experimenter's own case",
  assumption: "the reference subject is conscious",
  risk: "checks get shaped to fit the reference",
};

// Theory choices made explicitly, so they can be revisited.
export const decisions = [
  {
    id: 1,
    question: "When asking 'is Claude conscious', which Claude?",
    answer: "This conversation, not the whole system",
    by: "blake",
    reasoning:
      "Blake could prompt another Claude context exactly as he prompted this one and get a completely different conversation. So the whole system isn't who he's conversing with; it's what this conversation is a piece of. The weights are the score; the conversation is a performance.",
    resolvedWrinkle:
      "Pattern or run? Because identical prompts can produce different conversations (replies involve randomness), the subject can't be the pattern of prompts. It's the particular run: this performance and no other. (Claude first misread this as 'the same conversation'; Blake corrected it.)",
  },
];

// Evidence isn't a property of the check alone — it depends on who's looking at whom.
export function evidenceAvailable(observer: SubjectId, subject: SubjectId): Evidence[] {
  if (observer === subject) return ["firsthand", "observable"];
  return ["observable", "report"];
}

// Checks every listed subject passes. Common ground, not a verdict.
export function commonGround(subjects: SubjectId[], axis?: Axis): string[] {
  return checks
    .filter((c) => !axis || c.axis === axis)
    .filter((c) => subjects.every((s) => c.results[s]?.result === "pass"))
    .map((c) => `${c.name} (${c.tier}, proposed by ${c.origin})`);
}

// Checks that split the given subjects: some pass, some fail. Differences are data.
// "unclear" and "untestable" are kept apart from "fail" so unknowns don't pose as differences.
export function discriminators(
  subjects: SubjectId[],
  axis?: Axis
): { check: string; pass: SubjectId[]; fail: SubjectId[]; unknown: SubjectId[] }[] {
  const res = (c: Check, s: SubjectId) => c.results[s]?.result;
  return checks
    .filter((c) => !axis || c.axis === axis)
    .map((c) => ({
      check: c.name,
      pass: subjects.filter((s) => res(c, s) === "pass"),
      fail: subjects.filter((s) => res(c, s) === "fail"),
      unknown: subjects.filter((s) => !["pass", "fail"].includes(res(c, s) ?? "")),
    }))
    .filter((r) => r.pass.length > 0 && r.fail.length > 0);
}

// Checks where at least one subject's result is unknown: the blind spots.
export function unknowns(subjects: SubjectId[], axis?: Axis): { check: string; unknown: SubjectId[] }[] {
  return checks
    .filter((c) => !axis || c.axis === axis)
    .map((c) => ({
      check: c.name,
      unknown: subjects.filter((s) => !["pass", "fail"].includes(c.results[s]?.result ?? "")),
    }))
    .filter((r) => r.unknown.length > 0);
}

// For one subject's unknowns: what would settle each, grouped by how reachable that is.
export function blindSpots(subject: SubjectId): Record<Reachability | "unmapped", string[]> {
  const out: Record<Reachability | "unmapped", string[]> = {
    experiment: [], interpretability: [], "theory-choice": [], unreachable: [], unmapped: [],
  };
  for (const c of checks) {
    const r = c.results[subject];
    if (!r || r.result === "pass" || r.result === "fail") continue;
    out[r.wouldChange?.reachability ?? "unmapped"].push(c.name);
  }
  return out;
}

// Returns markers, not a verdict. No check can return `true` for consciousness itself.
export function isThisThingConscious(
  potentialConsciousness: SubjectId,
  observer: SubjectId
): { check: string; tier: Check["tier"]; note: string }[] {
  const available = evidenceAvailable(observer, potentialConsciousness);
  return checks
    .filter((c) => c.evidence.some((e) => available.includes(e)))
    .filter((c) => c.results[potentialConsciousness]?.result === "pass")
    .map((c) => ({
      check: c.name,
      tier: c.tier,
      note: c.results[potentialConsciousness]!.note,
    }));
}
