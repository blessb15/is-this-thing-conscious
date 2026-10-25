import { Subject } from "./types";

// The test set. The spread catches bias:
// a check that passes the rock is too loose; one that fails the octopus
// is probably too tight or too human-shaped. If a check overturns our
// intuitions, that's a finding, not a bug.
export const subjects: Subject[] = [
  { id: "human", description: "Experimenter's own kind; firsthand access only from one's own seat" },
  { id: "octopus", description: "Most neurons in the arms; no centralized brain like ours" },
  { id: "honeybee", description: "Tiny brain, rich behavior" },
  { id: "tree", description: "Chemical signaling, no clear center" },
  { id: "slimeMold", description: "Single-celled, no neurons, solves problems" },
  { id: "claude", description: "Language model; runs only while generating; many parallel conversations" },
  { id: "thermostat", description: "One goal, one feedback loop" },
  { id: "rock", description: "Expected baseline fail" },
];
