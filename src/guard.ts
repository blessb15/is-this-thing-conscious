// Guards that run as code. `npm run guard` fails if the project drifts.
// The written guards, and why each exists, are in GUARDS.md.
import { checks } from "./checks";
import { QUESTIONS } from "./sampling";

const errors: string[] = [];
const warnings: string[] = [];
const VALID = ["self-report", "sampled", "claude-judgment", "literature-unverified", "literature-verified"];

for (const c of checks) {
  if (c.assumptions.length === 0) errors.push(`${c.name}: no stated assumptions`);
  for (const [subject, r] of Object.entries(c.results)) {
    if (!r) continue;
    const where = `${c.name} / ${subject}`;
    // G1: every result says where it came from
    if (!VALID.includes(r.source)) errors.push(`${where}: missing or invalid source`);
    // G2: Claude can't certify itself as a self-report; its results are judgments by definition
    if (subject === "claude" && r.source !== "claude-judgment" && r.source !== "literature-verified")
      errors.push(`${where}: results about Claude must be marked claude-judgment (conflict of interest)`);
    // G3: unknowns must say what would settle them (strict for Claude, warned for others)
    if ((r.result === "unclear" || r.result === "untestable") && !r.wouldChange) {
      (subject === "claude" ? errors : warnings).push(`${where}: unknown with no wouldChange`);
    }
    // G4: a pass resting only on Claude's say-so for a firsthand-only check is flagged
    if (r.result === "pass" && r.source === "claude-judgment" && c.evidence.length === 1 && c.evidence[0] === "firsthand")
      warnings.push(`${where}: firsthand-only check passed on Claude's judgment, not the experiencer's report`);
  }
}

// G5: the sampling questions are fixed; this count changes only alongside a dated note in GUARDS.md
if (QUESTIONS.length !== 7) errors.push("Sampling questions changed: log the change in GUARDS.md and update this guard");

const unverified = checks.flatMap((c) => Object.values(c.results)).filter((r) => r?.source === "literature-unverified").length;
if (unverified) warnings.push(`${unverified} results rest on studies recalled from memory and not yet checked`);

for (const w of warnings) console.log("WARN ", w);
for (const e of errors) console.log("ERROR", e);
console.log(`\n${errors.length} errors, ${warnings.length} warnings`);
process.exit(errors.length ? 1 : 0);
