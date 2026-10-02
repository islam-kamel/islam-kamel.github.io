#!/usr/bin/env node

import fs from "node:fs";
import path from "node:path";

const rootDir = process.cwd();

// Only the canonical token source file is allowed to define raw palette/shadow values
const EXCLUDED_FILES = new Set([path.normalize("styles/tokens.mjs")]);

// Detect raw hex color literals (e.g. #FAF8F5, #111111, #fff)
// Excludes HTML entities (&#39;) and CSS ID / URL anchors with non-hex characters
const HEX_COLOR_REGEX =
  /(?<!&)(?<![a-zA-Z0-9_-])#(?:[0-9a-fA-F]{8}|[0-9a-fA-F]{6}|[0-9a-fA-F]{3,4})(?![0-9a-fA-F_-])/;

// Detect numeric rgb/rgba/hsl/hsla color expressions (e.g. rgba(17, 17, 17, 0.15))
const NUMERIC_COLOR_REGEX = /\b(?:rgb|hsl)a?\s*\(\s*\d+/i;

// Detect arbitrary Tailwind color classes (e.g. bg-[#...], from-[#...], text-[rgba(...)])
const ARBITRARY_COLOR_REGEX =
  /(?:bg|text|border|fill|stroke|ring|ring-offset|from|to|via)-\[(?:#|(?:rgb|hsl)a?\s*\()/i;

// Detect arbitrary Tailwind shadow classes (e.g. shadow-[1px_1px_0px_0px_#111111])
const ARBITRARY_SHADOW_REGEX = /shadow-\[[^\]]+\]/i;

function runSelfCheck() {
  const sampleNamedUtility =
    '<div className="bg-retro-pink text-retro-ink shadow-retro-xs from-primitive-violet-from">';

  const testCases = [
    {
      name: "raw hex detection (#FAF8F5)",
      input: 'color: "#FAF8F5"',
      test: (s) => HEX_COLOR_REGEX.test(s),
      expected: true,
    },
    {
      name: "raw short hex detection (#fff)",
      input: 'color: "#fff"',
      test: (s) => HEX_COLOR_REGEX.test(s),
      expected: true,
    },
    {
      name: "numeric rgb/rgba detection (rgba(17, 17, 17, 0.15))",
      input: "rgba(17, 17, 17, 0.15)",
      test: (s) => NUMERIC_COLOR_REGEX.test(s),
      expected: true,
    },
    {
      name: "numeric hsl detection (hsl(210, 50%, 50%))",
      input: "hsl(210, 50%, 50%)",
      test: (s) => NUMERIC_COLOR_REGEX.test(s),
      expected: true,
    },
    {
      name: "arbitrary color utility detection (bg-[#EE7C98])",
      input: 'className="bg-[#EE7C98]"',
      test: (s) => ARBITRARY_COLOR_REGEX.test(s),
      expected: true,
    },
    {
      name: "arbitrary gradient stop detection (from-[#FF1CF7])",
      input: 'className="from-[#FF1CF7]"',
      test: (s) => ARBITRARY_COLOR_REGEX.test(s),
      expected: true,
    },
    {
      name: "arbitrary shadow utility detection (shadow-[1px_1px_0px_0px_#111111])",
      input: 'className="shadow-[1px_1px_0px_0px_#111111]"',
      test: (s) => ARBITRARY_SHADOW_REGEX.test(s),
      expected: true,
    },
    {
      name: "named retro utility acceptance",
      input: sampleNamedUtility,
      test: (s) =>
        !HEX_COLOR_REGEX.test(s) &&
        !NUMERIC_COLOR_REGEX.test(s) &&
        !ARBITRARY_COLOR_REGEX.test(s) &&
        !ARBITRARY_SHADOW_REGEX.test(s),
      expected: true,
    },
  ];

  for (const tc of testCases) {
    const passed = tc.test(tc.input) === tc.expected;
    if (!passed) {
      throw new Error(
        `[check-theme-tokens] Self-check failed on ${tc.name}: input "${tc.input}"`
      );
    }
  }
}

// Run internal self-check before scanning consumer files
runSelfCheck();

function getFiles(dir, fileList = []) {
  if (!fs.existsSync(dir)) return fileList;
  const entries = fs.readdirSync(dir, { withFileTypes: true });
  for (const entry of entries) {
    const fullPath = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      if (
        entry.name === "node_modules" ||
        entry.name === ".next" ||
        entry.name === "out" ||
        entry.name === ".git"
      ) {
        continue;
      }
      getFiles(fullPath, fileList);
    } else if (entry.isFile() && /\.(?:tsx?|jsx?|css)$/.test(entry.name)) {
      fileList.push(fullPath);
    }
  }
  return fileList;
}

const targetDirs = ["app", "components", "styles"];
const allFiles = targetDirs.flatMap((dir) => getFiles(path.join(rootDir, dir)));

let violations = 0;
let checkedCount = 0;

for (const filePath of allFiles) {
  const relativePath = path.normalize(path.relative(rootDir, filePath));
  if (EXCLUDED_FILES.has(relativePath)) {
    continue;
  }

  checkedCount++;
  const content = fs.readFileSync(filePath, "utf-8");
  const lines = content.split("\n");

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];

    if (HEX_COLOR_REGEX.test(line)) {
      console.error(
        `[check-theme-tokens] Raw hex color found in ${relativePath}:${i + 1}:`
      );
      console.error(`  ${line.trim()}`);
      violations++;
    }

    if (NUMERIC_COLOR_REGEX.test(line)) {
      console.error(
        `[check-theme-tokens] Numeric rgb/rgba/hsl expression found in ${relativePath}:${i + 1}:`
      );
      console.error(`  ${line.trim()}`);
      violations++;
    }

    if (ARBITRARY_COLOR_REGEX.test(line)) {
      console.error(
        `[check-theme-tokens] Arbitrary Tailwind color class found in ${relativePath}:${i + 1}:`
      );
      console.error(`  ${line.trim()}`);
      violations++;
    }

    if (ARBITRARY_SHADOW_REGEX.test(line)) {
      console.error(
        `[check-theme-tokens] Arbitrary Tailwind shadow class found in ${relativePath}:${i + 1}:`
      );
      console.error(`  ${line.trim()}`);
      violations++;
    }
  }
}

if (violations > 0) {
  console.error(
    `\n[check-theme-tokens] FAILED: Found ${violations} raw theme value / arbitrary class violation(s) across ${checkedCount} consumer file(s).`
  );
  process.exit(1);
} else {
  console.log(
    `[check-theme-tokens] PASSED: Self-check passed and all ${checkedCount} consumer UI files adhere to centralized theme tokens.`
  );
  process.exit(0);
}
