// `npm run mirror -- <experiencer>`: read data/samples/<experiencer>.json and print the mirror.
import { readFileSync, existsSync } from "fs";
import { mirror, Sample } from "./sampling";

const who = process.argv[2] ?? "blake";
const path = `data/samples/${who}.json`;
if (!existsSync(path)) {
  console.log(`No samples yet at ${path}. See data/samples/README.md.`);
  process.exit(0);
}
const samples: Sample[] = JSON.parse(readFileSync(path, "utf8"));
const m = mirror(samples, who);
console.log(`Mirror for ${m.experiencer}: ${m.usable} usable samples (excluded: ${m.excluded.altered} altered, ${m.excluded.recalled} recalled)\n`);
for (const w of m.warnings) console.log("! " + w);
console.log("");
for (const l of m.lines) console.log(`${l.check}\n  ${l.reported}\n`);
