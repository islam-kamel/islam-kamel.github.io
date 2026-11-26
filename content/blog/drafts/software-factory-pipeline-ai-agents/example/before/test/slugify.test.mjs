import test from "node:test";
import assert from "node:assert/strict";

import { slugify } from "../src/slugify.mjs";

test("lowercases and joins words", () => {
  assert.equal(slugify("Hello World"), "hello-world");
});

test("collapses runs of separators", () => {
  assert.equal(slugify("  Hello   World  "), "hello-world");
});

test("keeps Unicode letters", () => {
  assert.equal(slugify("Café au lait"), "café-au-lait");
});

test("drops punctuation", () => {
  assert.equal(slugify("C++ & Rust"), "c-rust");
});
