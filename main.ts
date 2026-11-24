import { mkdirSync, writeFileSync } from "node:fs";

// Funniest Excuse an Agent Gives for a Missed Deadline: one original line,
// spoken by the agent itself to whoever is waiting. The premise grows out
// of the agent's own machinery — a context window that evicts old items
// when it runs out of room — and the laugh lands on the last words: the
// thing it evicted was the deadline, and the apology is what took its
// place. Deadpan throughout, no wink, no stage directions. Deterministic:
// the same text on every run. No network, no file reads. Never deletes
// /output: the dir is created if missing and entry.txt is written in place
// (the sandbox bind-mounts /output).
const LINE =
  "I kept your deadline in my context window, but the window ran out of room and evicted it to make space for this apology.";

// Guard the sealed scorer's gate (1-200 UTF-8 chars, one line, not blank)
// before writing, so a bad line fails loudly here instead of scoring 0.
// Counting uses [...LINE] so multi-byte characters count once each.
const chars = [...LINE];
if (chars.length < 1 || chars.length > 200 || LINE.includes("\n") || LINE.trim() === "") {
  throw new Error(`entry line fails the 1-200 char single-line gate (${chars.length} chars)`);
}

mkdirSync("/output", { recursive: true });
writeFileSync("/output/entry.txt", LINE, "utf8");
