import { Axis, Calibration, Check, Evidence, SubjectId } from "./types";
import { checks } from "./checks";

// The hidden input: every check gets judged against the experimenter's own case.
export const calibration: Calibration = {
  reference: "experimenter's own case",
  assumption: "the reference subject is conscious",
  risk: "checks get shaped to fit the reference",
};

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
