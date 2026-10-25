import { Calibration, Check, Evidence, SubjectId } from "./types";
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
export function commonGround(...subjects: SubjectId[]): string[] {
  return checks
    .filter((c) => subjects.every((s) => c.results[s]?.result === "pass"))
    .map((c) => `${c.name} (${c.tier}, proposed by ${c.origin})`);
}

// Checks that split the given subjects: some pass, some don't. Differences are data.
export function discriminators(...subjects: SubjectId[]): { check: string; pass: SubjectId[]; notPass: SubjectId[] }[] {
  return checks
    .map((c) => ({
      check: c.name,
      pass: subjects.filter((s) => c.results[s]?.result === "pass"),
      notPass: subjects.filter((s) => c.results[s]?.result !== "pass"),
    }))
    .filter((r) => r.pass.length > 0 && r.notPass.length > 0);
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
