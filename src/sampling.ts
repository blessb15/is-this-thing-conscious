// Experience sampling, after Hurlburt: a random alarm, then a report of the instant before it.
// Samples feed the method; the mirror turns them back into a report on the experiencer's own experience.
// Any experiencer can use this. It reflects what you REPORTED, never what you ARE.

export type YesNoUnsure = "yes" | "no" | "unsure";

export interface Sample {
  experiencer: string; // "blake", or anyone else
  at: string; // ISO time the alarm went off
  minutesToRecord: number; // delay between alarm and writing; > 5 counts as recalled, not in-the-moment
  state: "ordinary" | "altered"; // altered samples are kept apart (drift risk)

  // Q1 is answered FIRST, in your own words, before seeing the other questions.
  describe: string; // "What was in your experience the instant before the alarm?"

  words: "none" | "inner-speech" | "heard" | "reading" | "unsure"; // Q2: were there words?
  senses: ("sight" | "sound" | "body" | "touch" | "smell" | "taste")[]; // Q3: what senses were present?
  unbidden: YesNoUnsure; // Q4: was anything there that you didn't put there?
  self: YesNoUnsure; // Q5: was there a sense of "I" in it?
  feeling: "pleasant" | "neutral" | "unpleasant" | "none"; // Q6
  absorbed: "yes" | "partly" | "no"; // Q7: were you absorbed in what you were doing?
  context?: string; // optional: what you were doing
}

// The questions, verbatim. GUARD: wording changes must be logged in GUARDS.md with the date,
// because changing a question changes what samples mean.
export const QUESTIONS = [
  "1. In your own words: what was in your experience the instant before the alarm? (Answer this before reading on.)",
  "2. Were there words in it? none / inner speech / heard / reading / unsure",
  "3. Which senses were present? sight, sound, body, touch, smell, taste (any or none)",
  "4. Was anything there that you didn't put there? yes / no / unsure",
  "5. Was there a sense of 'I' in it? yes / no / unsure",
  "6. How did it feel? pleasant / neutral / unpleasant / none",
  "7. Were you absorbed in what you were doing? yes / partly / no",
] as const;

export const MIN_SAMPLES = 10; // below this, the mirror says so loudly
export const RECALL_LIMIT_MINUTES = 5;

export interface MirrorLine {
  check: string; // the method's check this informs
  reported: string; // what the samples show, as "you reported..."
  n: number;
}

export interface Mirror {
  experiencer: string;
  usable: number;
  excluded: { altered: number; recalled: number };
  warnings: string[];
  lines: MirrorLine[];
}

const pct = (k: number, n: number) => (n === 0 ? "n/a" : `${k}/${n} (${Math.round((100 * k) / n)}%)`);

// The mirror: samples in, a report on your own experience out, linked to the method's checks.
export function mirror(samples: Sample[], experiencer: string): Mirror {
  const mine = samples.filter((s) => s.experiencer === experiencer);
  const altered = mine.filter((s) => s.state === "altered");
  const recalled = mine.filter((s) => s.state === "ordinary" && s.minutesToRecord > RECALL_LIMIT_MINUTES);
  const use = mine.filter((s) => s.state === "ordinary" && s.minutesToRecord <= RECALL_LIMIT_MINUTES);
  const n = use.length;
  const count = (f: (s: Sample) => boolean, from: Sample[] = use) => from.filter(f).length;

  const warnings: string[] = [];
  if (n < MIN_SAMPLES) warnings.push(`Only ${n} usable sample${n === 1 ? "" : "s"}; patterns below are anecdotes until there are ${MIN_SAMPLES}+.`);
  if (altered.length) warnings.push(`${altered.length} altered-state samples kept apart; compare them only against ordinary ones.`);
  if (recalled.length) warnings.push(`${recalled.length} samples recorded more than ${RECALL_LIMIT_MINUTES} min late, excluded as recalled.`);
  warnings.push("These are reports, not facts about your mind. Introspection is unreliable, and this project may have primed what you notice.");

  const absorbed = use.filter((s) => s.absorbed === "yes");
  const notAbsorbed = use.filter((s) => s.absorbed === "no");

  // Guard: "unsure" is reported separately, never folded into "no".
  const unsure = (f: (s: Sample) => boolean) => {
    const k = count(f);
    return k ? ` Unsure in ${pct(k, n)}.` : "";
  };

  const lines: MirrorLine[] = [
    { check: "Stream of thought (unprompted)", n, reported: `Inner speech in ${pct(count((s) => s.words === "inner-speech"), n)} of moments.${unsure((s) => s.words === "unsure")}` },
    { check: "Awareness without thought", n, reported: `Senses present with no words at all in ${pct(count((s) => s.words === "none" && s.senses.length > 0), n)}.` },
    { check: "Unauthored experience", n, reported: `Something there you didn't put there in ${pct(count((s) => s.unbidden === "yes"), n)}.${unsure((s) => s.unbidden === "unsure")}` },
    { check: "Narrative self", n, reported: `A sense of "I" in ${pct(count((s) => s.self === "yes"), n)} overall; ${pct(count((s) => s.self === "yes", absorbed), absorbed.length)} when absorbed vs ${pct(count((s) => s.self === "yes", notAbsorbed), notAbsorbed.length)} when not.${unsure((s) => s.self === "unsure")} (Tests the flow claim: does the "I" drop out when absorbed?)` },
    { check: "Minimal self", n, reported: `Body present in ${pct(count((s) => s.senses.includes("body")), n)}.` },
    { check: "Felt valence", n, reported: `Pleasant ${pct(count((s) => s.feeling === "pleasant"), n)}, unpleasant ${pct(count((s) => s.feeling === "unpleasant"), n)}; unpleasant when absorbed ${pct(count((s) => s.feeling === "unpleasant", absorbed), absorbed.length)} vs not absorbed ${pct(count((s) => s.feeling === "unpleasant", notAbsorbed), notAbsorbed.length)}. (Tests the anxiety claim.)` },
  ];

  return { experiencer, usable: n, excluded: { altered: altered.length, recalled: recalled.length }, warnings, lines };
}
