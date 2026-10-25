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
