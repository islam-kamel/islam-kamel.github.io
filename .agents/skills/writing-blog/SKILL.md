---
name: writing-blog
description: Write, update, or review technical blog articles for the user's personal engineering site, with real research, tested code, and up-to-date facts. Use this skill whenever the user asks for a new article, a blog post, a tutorial, a draft for a card or section, an update to an old article, or a review of an article for mistakes, even if they only say "write about X", "add an article", or "check this post". Always use it before writing any technical content that will be published, because it forces research, verifying code in an appropriate environment, and a claim-by-claim check.
---

# Writing blog

Write a technical article that a careful reader can trust. The reader runs your code, copies your commands, and quotes your facts. One wrong status name, one stale version, or one example that does not run costs the author trust.

Past articles had small errors: a name that did not match the real output, an edge case that was never tested, a sentence that did not match the code. This skill exists to catch those before publishing. Follow the phases in order. Do not skip Phase 2 or Phase 4.

## Rules that never bend

1. No research, no article. If you have no web access, tell the user (in Arabic) and stop. Do not write a technical article from memory. Your training data is out of date.
2. Never invent personal experience, projects, clients, numbers, benchmarks, or results. First person may be used for a teaching voice ("I like to start with...") or for a specific author story the user supplied or explicitly confirmed.
3. Never claim "tested with X" unless you ran it on X.
4. Never write "latest", a version, a default value, or a status name without checking it today.
5. Never copy text from other sites. Read, understand, and write fresh in your own words.
6. Do not publish a new article without the user's OK; keep new work as a draft. When maintaining an already-published article, keep it published unless the user explicitly asks to change its status.

## Language

- Talk to the user in simple Egyptian Arabic (عامية مصرية بسيطة).
- The article, titles, meta tags, code, and commands stay in English.
- Explain an English technical term in one Arabic sentence the first time you use it in a message.

## Phase 0: Understand what is needed

1. Find the repo's article format. Open two existing articles and read how they are built: file location, frontmatter, date handling, components, how tags and meta are generated.
2. Check the existing articles for overlap. Do not write a topic that already exists, and do not create a page that would compete with another page for the same search.
3. If something important is missing, ask. Questions are a numbered list, max 5. Each has: السؤال, ليه محتاج ده, مثال للإجابة, and options (أ / ب / ج) when it is a choice. Read the code and articles first so you do not ask what you can find yourself.
4. For an existing article, read the whole article and its code before editing. Treat it as maintenance: preserve its published status, slug/URL/canonical/publish date/title/description/Open Graph metadata/layout/styles, and other articles unless the user explicitly unlocks a specific item. Ask before optional additions and skip them if the user does not answer.
5. If prose claims the author routinely does something, confirm it with the user; use neutral wording if they do not answer.
6. If the user requests Jev for a relevant structured judgment, follow the repository's Jev instructions.

## Phase 1: Choose the angle

- One article = one problem the reader has, in the reader's own words ("my PDF looks different on every machine").
- Write the problem in one sentence. If you cannot, the topic is too wide.
- Pick a topic that is useful to search for and does not need private details about the author's past work.
- Decide the reader level and say it in the article's first lines through the way you explain terms.

## Phase 2: Research (required)

Get today's real date from the machine (`date`) and use it for every freshness decision.

### Sources, in order of trust

1. Official docs, specs, RFCs, release notes, changelogs, source code of the project.
2. Maintainers' own posts and issue discussions.
3. Well-known engineering blogs with a clear author and date.
4. Forums and Q&A. Use only as a hint, never as the only proof.

### What to do

1. Search the official docs for the exact feature. Read the page, do not rely on the snippet.
2. Check the current state: latest stable and LTS version, deprecations, breaking changes in the last 12 months. Search "<tool> deprecated", "<tool> breaking change", and read the releases page.
3. Look for a newer way to do the same thing. If the old way is still common but replaced, say so in the article.
4. Every non-trivial claim needs one primary source. A claim that matters a lot (security, data loss, performance numbers) needs two independent sources.
5. When sources disagree, run a small experiment or say clearly that they disagree. Do not pick silently.
6. Keep a research notes file next to the draft with a table: claim | source URL | date read | version. This is for the final report. Do not publish it.

If a fact cannot be verified, delete the sentence or label it clearly as unverified. Never guess.

## Phase 3: Write

### Structure

- Choose a shape that fits the material: an incident timeline, a decision record, a comparison, an annotated example, or a technical walkthrough can all work.
- Start with the concrete problem, event, or question when possible. Do not force a preview, numbered recipe, or concluding section. Use steps only when the work itself has meaningful steps, and stop when the useful information ends.
- Define each technical term once, in one plain sentence, the first time it appears.
- Include complete, runnable code when the article needs it, then show how to check it.

### Voice

- Write like a real person talking to another person. Use everyday words a smart 15-year-old understands, natural contractions, and varied sentence lengths. Technical names are fine.
- Avoid stock filler and repeated generic phrases such as "It is important to note" and "plays a vital role". Replace them with the specific fact or remove them.
- Use real author experiences, mistakes, and anecdotes only when the user has supplied or explicitly confirmed them. External sources can verify facts, but they do not confirm that an event happened to the author. Do not invent a story or force a personal aside into an article that does not need one.
- Prefer examples grounded in an authorized project, its real constraints, or a verified failure, with private details removed. For an illustrative scenario, use natural framing such as “A small catalog example”; do not call it a “constructed teaching example” or add setup that does not help readers understand or run it. Never imply an illustrative example is a real author project or experience; examples must remain runnable.
- For focused technical advice, open with concrete friction and follow its cause and effect through one running example to the reader’s decision. Address the reader directly when useful, then state a practical preference, when it applies, and why. A first-person opinion is fine, but do not turn it into a claim about the author’s usual practice or project history unless confirmed. Use a question only when it helps, and answer it immediately; avoid a forced Q&A pattern and exhaustive edge-case surveys. Keep caveats that change the decision, and cut repeated explanations.
- Banned words: leverage, seamless, robust, cutting-edge, innovative, passionate, crafting, elevate, empower, solutions, ecosystem, synergy, delve, streamline, holistic, best-in-class, state-of-the-art, world-class.
- Read each paragraph out loud in your head. If a normal person would not say it to a friend, rewrite it.
- Do not add defensive asides about validation or testing choices an example does not need. Explain real constraints where readers need them; keep methodology caveats in unpublished verification notes.
- Length: usually 700-1,100 words. One clear idea.

### Code

- Choose an example form and runtime appropriate to the intended audience and normal use (for React application readers, use plain JSX and an ordinary browser or framework application setup unless the topic specifically covers Node or headless React). State prerequisites concisely.
- Complete, accurate, and as small as possible. Prefer few or no dependencies.
- Verify the complete set of final article snippets together in an appropriate environment instead of requiring each snippet to be standalone or forcing an in-article test harness.
- Keep verification scaffolding and assertions outside the article unless testing is the subject; do not add complexity unrelated to the teaching goal.
- State the runtime and library versions you used.
- Do not leave secrets, private paths, or stack traces in examples.

### Freshness inside the text

- Do not write "latest" or "new". Write the version or the date: "As of <Month Year>, Node.js 22 is...".
- For fast-changing details, link to the official docs page instead of copying the details.
- Never add a "Last checked," "Last reviewed," "Verified on," or equivalent freshness stamp to public article prose unless the owner explicitly asks for that specific stamp. Keep research dates and exact tested versions in unpublished verification notes; retain the version-truth requirements above.

## Phase 4: Verify (this is what makes it error-free)

Do all of these. Write down what you found.

1. **Verify the article's code.** Extract the complete set of final article snippets and commands into an appropriate verification environment matching the intended reader's runtime (such as an ordinary JSX application for React components, rather than artificially forcing Node or static rendering). Verify the snippets together as written without running divergent scratch copies or requiring an in-article test harness.
2. **Compare the real output with the text.** If the article says a status line, error message, or result, it must match what you saw. Fix the article, not the output.
3. **Edge cases.** Match verification depth to behaviors and input boundaries. Do not add arbitrary validation or error scaffolding for trusted fixed fixtures, but retain validation at real untrusted boundaries and test meaningful user interactions, empty, no-match, and unusual cases when claimed. If a browser interaction is material and browser tooling exists, actually test it; never substitute SSR or static markup for client interaction claims. For network handlers, check routing and any relevant encoding, streaming, or framing cases. When input size is limited, test an over-limit input using the applicable transport modes and confirm the client receives the intended error.
4. **Claim audit.** Highlight sentences with numbers, versions, names, defaults, status codes, or absolute terms. Verify each from a source or experiment and record the result.
5. **Text matches code.** Distinguish validation checks from actions and success outputs. Check counts, headings, function/file names, order, and every behavior claim against the final code.
6. **Versioned names and labels.** Check the current official name in primary documentation. Preserve stable numeric or code identifiers where readers or clients rely on them, compare documented labels with actual output from the tool or runtime used, and mention older labels when relevant.
7. **Links.** Open every URL. Prefer stable official docs links. No dead or redirected links.
8. **Hostile reader pass.** List 5 ways a reader could get a different result (other OS, other version, Windows shell, different input). Fix the article or add a short note for each real risk.
9. **Language pass.** Spelling, grammar, banned words, and the read-out-loud check for voice.
10. **Facts about the author.** Remove any sentence that claims experience you cannot confirm. For claims about the author's usual habits, ask or use neutral wording.
11. **Prose-only edits.** Snapshot protected frontmatter, metadata, and fenced code/commands; compare them exactly after editing and review the prose-only diff. If a specific field is explicitly unlocked, verify the remaining protected fields stayed unchanged.
12. **Diagrams.** Add one when requested or when it clarifies real behavior. Match actual functions, repeated events, and early exits; inspect rendered labels at desktop and mobile sizes.
13. **Runtime versions.** Get the exact interpreter, compiler, runtime, or library version with its version command. Add a “Tested with …” line only after verifying the final article code in its appropriate runtime environment with that exact version.

## Phase 5: Wire it into the site

- Use the same file format, frontmatter, and date mechanism as existing articles. Do not make up a publish date: tell the user what the mechanism gave.
- For a new article, use a unique title and plain, unique meta description (about 150 characters, no keyword stuffing), set its canonical to itself, omit `keywords`, and add it to the sitemap and blog list. Link it from a related card if there is one.
- For a new article, save as a draft. If the blog does not support drafts, say so and keep it out of production. For maintenance, preserve an existing published article's status.
- For an existing article, change protected metadata only when explicitly authorized. After any page edit, compare the built page head and confirm every protected, non-authorized title, description, canonical, Open Graph, and Twitter value stayed unchanged.
- Run lint, type-check, and build. Nothing else on the site should change.

## Phase 6: Final report (in Egyptian Arabic)

1. العنوان، ومكان الملف، وحالته (draft للمقال الجديد؛ المقال المنشور يفضل منشوراً وقت الصيانة).
2. اذكر التغييرات بصيغة قبل/بعد؛ وفي تعديلات النص، وضّح الجمل اللي اتغيرت.
3. المصادر اللي اتستخدمت (الرابط + تاريخ القراءة).
4. اللي اتجرب فعلاً: الأوامر، ونسخ الـ interpreters أو الـ runtimes أو الـ libraries المستخدمة، والنتايج.
5. جدول الـ claims اللي اتراجعت.
6. أي حاجة ما اتأكدتش منها أو اتجربت جزئياً.
7. "معلومات محتاجها منك": أسئلة مرقمة بسيطة عن تجارب حقيقية ممكن تخلي المقال شخصي أكتر.
8. تاريخ مقترح لمراجعة المقال تاني (غالباً بعد 6 شهور).

## Quick checklist before saying "done"

- [ ] Structure fits the material; no automatic intro, numbered recipe, or conclusion was added
- [ ] No generic filler or repeated stock phrases remain
- [ ] Personal stories are supplied or verified; examples have honest provenance and are runnable
- [ ] Conclusions take an evidence-backed position and state real limits
- [ ] Research notes exist, every claim has a source and a date
- [ ] Versions and "latest" statements checked today
- [ ] Final article snippets verified together in an appropriate runtime
- [ ] Real outputs match the text
- [ ] Edge cases and claimed interactions tested
- [ ] Numbers, headings, and names in the text match the code
- [ ] One name per thing, status or spec names checked
- [ ] All links open
- [ ] No invented experience or numbers
- [ ] Plain words, no banned words, honest feeling
- [ ] New article has unique metadata, a self canonical, no keywords tag, and a sitemap entry
- [ ] Existing article status and protected metadata were preserved except for explicitly authorized changes
- [ ] New article saved as draft; existing published status and locked metadata preserved during maintenance
