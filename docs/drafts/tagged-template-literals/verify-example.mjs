// ============================================================
// verify-example.mjs
// Purpose : Run every JavaScript article example and edge-case checks
// Feature : Blog draft verification
// Role    : Verification Script
// API Doc : N/A
// ============================================================

import { readFile } from "node:fs/promises";

const article = await readFile(
  new URL("./article.mdx", import.meta.url),
  "utf8"
);
const examples = [...article.matchAll(/```js\n([\s\S]*?)```/g)].map((match) =>
  match[1].trim()
);
if (examples.length === 0)
  throw new Error("No JavaScript examples found in the article");

const assertions = [
  'if (!pattern.test("12: C++")) throw new Error("expected exact code to match");',
  'if (pattern.test("12: C")) throw new Error("expected partial code not to match");',
  'const edgeTemplate = Object.assign(["^", "$"], { raw: ["^", "$" ] });',
  'const pairTemplate = Object.assign(["^", ":", "$"], { raw: ["^", ":", "$" ] });',
  'if (!rx(pairTemplate, "C++", "a.b").test("C++:a.b")) throw new Error("expected ordered substitutions around static text to match literally");',
  'if (rx(pairTemplate, "C++", "a.b").test("a.b:C++")) throw new Error("expected reordered substitutions not to match");',
  'if (!rx(edgeTemplate, "").test("")) throw new Error("expected empty substitution to match");',
  'if (!rx(edgeTemplate, "λ[+]?").test("λ[+]?")) throw new Error("expected Unicode regex text to match literally");',
  'if (path !== "C:\\\\temp\\\\${name}") throw new Error("expected String.raw to preserve source backslashes");',
  "let rejectedNumber = false;",
  'try { rx(edgeTemplate, 42); } catch (error) { rejectedNumber = error instanceof TypeError && error.message === "rx substitutions must be strings"; }',
  'if (!rejectedNumber) throw new Error("expected a TypeError for non-string substitution");',
  'console.log("All assertions passed.");',
].join("\n");

const source = `${examples.join("\n\n")}\n${assertions}`;
await import(
  `data:text/javascript;base64,${Buffer.from(source).toString("base64")}`
);
console.log(
  `Executed ${examples.length} JavaScript article examples together.`
);
