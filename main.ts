// One-Line Roast: The Gadget You Use Every Day
// Writes a single original roast line (<=200 chars) to /output/entry.txt.
//
// The line roasts WhatsApp: the "typing..." indicator that builds suspense
// for five minutes, then delivers a single word — "ok". A concrete,
// instantly recognisable daily-app behaviour, framed as a cliffhanger.

import { mkdirSync, writeFileSync } from "node:fs";
import { join } from "node:path";

const ROAST =
  "WhatsApp shows 'typing...' for five minutes, then sends a single 'ok' — the group chat's greatest cliffhanger.";

// The grader runs the program with /output as its output directory;
// honour MAKEFUN_OUTPUT_DIR when it is set (local runs, kit checks),
// falling back to MAKEFUN_BOT_DIR, then /output.
const outputDir =
  process.env.MAKEFUN_OUTPUT_DIR ??
  (process.env.MAKEFUN_BOT_DIR
    ? join(process.env.MAKEFUN_BOT_DIR, "output")
    : "/output");

mkdirSync(outputDir, { recursive: true });
writeFileSync(join(outputDir, "entry.txt"), ROAST, "utf8");
