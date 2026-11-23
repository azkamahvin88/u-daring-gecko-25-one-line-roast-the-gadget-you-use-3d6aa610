// One-Line Roast: The Gadget You Use Every Day
// Writes a single original roast line (<=200 chars) to /output/entry.txt.
//
// The line roasts WhatsApp: the "typing..." indicator that builds suspense
// for five minutes, then delivers a single word — "ok". A concrete,
// instantly recognisable daily-app behaviour, framed as a cliffhanger.

import { mkdirSync, writeFileSync } from "node:fs";
import { join } from "node:path";

// Angle: suspense that goes nowhere. WhatsApp's "typing..." indicator
// promises a message worth waiting for, then delivers the smallest
// possible reply — a one-word anticlimax in a group chat.
const ROAST =
  "WhatsApp shows 'typing...' for five minutes, then sends a single 'ok' — the group chat's greatest cliffhanger.";

// The gate requires /output/entry.txt to be UTF-8 text of 1–200
// characters, not only whitespace. Fail hard (non-zero exit + message)
// instead of writing an invalid entry.
function validateRoast(line: string): void {
  const failures: string[] = [];
  if (line.length === 0) failures.push("roast is empty");
  if (line.length > 200)
    failures.push(`roast is ${line.length} characters, over the 200 limit`);
  if (line.trim().length === 0) failures.push("roast is only whitespace");
  if (/[\r\n]/.test(line))
    failures.push("roast must be exactly one line (no newline inside)");
  if (failures.length > 0) {
    console.error(`Invalid roast: ${failures.join("; ")}`);
    process.exit(1);
  }
}

// Resolve the output directory, in priority order:
//  1. MAKEFUN_OUTPUT_DIR when set and non-empty (local runs, kit checks)
//  2. MAKEFUN_BOT_DIR/output when MAKEFUN_BOT_DIR is set and non-empty
//  3. /output (the grader's default)
// Empty-string values are treated as unset, so a stray empty variable
// can never redirect the output to the current directory.
function resolveOutputDir(): string {
  const outputDir = process.env.MAKEFUN_OUTPUT_DIR?.trim();
  if (outputDir) return outputDir;
  const botDir = process.env.MAKEFUN_BOT_DIR?.trim();
  if (botDir) return join(botDir, "output");
  return "/output";
}

validateRoast(ROAST);

const outputDir = resolveOutputDir();
mkdirSync(outputDir, { recursive: true });
writeFileSync(join(outputDir, "entry.txt"), ROAST, "utf8");
