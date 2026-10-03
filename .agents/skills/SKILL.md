---
name: writing-blog
description: Write, update, or review technical blog articles for the user's personal engineering site, with real research, tested code, and up-to-date facts. Use this skill whenever the user asks for a new article, a blog post, a tutorial, a draft for a card or section, an update to an old article, or a review of an article for mistakes, even if they only say "write about X", "add an article", or "check this post". Always use it before writing any technical content that will be published, because it forces research, running every code block, and a claim-by-claim check.
---

# Writing blog

Write a technical article that a careful reader can trust. The reader runs your code, copies your commands, and quotes your facts. One wrong status name, one stale version, or one example that does not run costs the author trust.

Past articles had small errors: a name that did not match the real output, an edge case that was never tested, a sentence that did not match the code. This skill exists to catch those before publishing. Follow the phases in order. Do not skip Phase 2 or Phase 4.

## Rules that never bend
1. No research, no article. If you have no web access, tell the user (in Arabic) and stop. Do not write a technical article from memory. Your training data is out of date.
2. Never invent personal experience, projects, clients, numbers, benchmarks, or results. First person is only for a teaching voice ("I like to start with...").
3. Never claim "tested with X" unless you ran it on X.
4. Never write "latest", a version, a default value, or a status name without checking it today.
5. Never copy text from other sites. Read, understand, and write fresh in your own words.
6. Never publish. Save as a draft and wait for the user's OK.

## Language
- Talk to the user in simple Egyptian Arabic (عامية مصرية بسيطة).
- The article, titles, meta tags, code, and commands stay in English.
- Explain an English technical term in one Arabic sentence the first time you use it in a message.

## Phase 0: Understand what is needed
1. Find the repo's article format. Open two existing articles and read how they are built: file location, frontmatter, date handling, components, how tags and meta are generated.
2. Check the existing articles for overlap. Do not write a topic that already exists, and do not create a page that would compete with another page for the same search.
3. If something important is missing, ask. Questions are a numbered list, max 5. Each has: السؤال, ليه محتاج ده, مثال للإجابة, and options (أ / ب / ج) when it is a choice. Read the code and articles first so you do not ask what you can find yourself.

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
1. Open with the reader's problem in 1-2 plain sentences.
2. Define each technical term once, in one plain sentence, the first time it appears.
3. Show the solution step by step. One idea per section.
4. Show the complete working code, then how to test it.
5. End with a short, useful close: what to try next or what to watch out for. No "In conclusion".

### Voice
- Write like a real person talking to another person. Short sentences. Everyday words a smart 15-year-old understands. Technical names are fine.
- Add small, honest human feeling: the annoyance before the fix, the relief after. Do not use big claims like "I am passionate about...".
- Banned words: leverage, seamless, robust, cutting-edge, innovative, passionate, crafting, elevate, empower, solutions, ecosystem, synergy, delve, streamline, holistic, best-in-class, state-of-the-art, world-class.
- Read each paragraph out loud in your head. If a normal person would not say it to a friend, rewrite it.
- Length: usually 700-1,100 words. One clear idea.

### Code
- Complete, runnable, and as small as possible. Prefer few or no dependencies.
- State the runtime and library versions you used.
- Do not leave secrets, private paths, or stack traces in examples.

### Freshness inside the text
- Do not write "latest" or "new". Write the version or the date: "As of <Month Year>, Node.js 22 is...".
- For fast-changing details, link to the official docs page instead of copying the details.
- Add a "Last checked" line with the month and year at the end, and name the versions you used.

## Phase 4: Verify (this is what makes it error-free)
Do all of these. Write down what you found.

1. **Run the article's code.** Extract every code block and command from the final article text and run them as written. Do not run separate scratch copies.
2. **Compare the real output with the text.** If the article says a status line, error message, or result, it must match what you saw. Fix the article, not the output.
3. **Edge cases.** For code that handles input, test: the happy path, every error path, an empty input, and one unusual input (Unicode, BOM, query string, very large input if sizes are limited). Add the important ones to the article if readers will hit them.
4. **Claim audit.** Highlight every sentence that has a number, version, name, default, status code, or words like "always", "never", "all", "only". Verify each against a source or an experiment. List them in a table in the notes.
5. **Text matches code.** Check: numbers in prose against the real list ("five checks"), headings, function and file names, the order of steps, and that every behavior sentence is still true for the final code.
6. **One name per thing.** If a name changed between versions or specs, use the current official name plus the number, and mention the old name once. Check the real output on the stated version.
7. **Links.** Open every URL. Prefer stable official docs links. No dead or redirected links.
8. **Hostile reader pass.** List 5 ways a reader could get a different result (other OS, other version, Windows shell, different input). Fix the article or add a short note for each real risk.
9. **Language pass.** Spelling, grammar, banned words, and the read-out-loud check for voice.
10. **Facts about the author.** Remove any sentence that claims experience you cannot confirm. List what the author could add in the report.

## Phase 5: Wire it into the site
- Use the same file format, frontmatter, and date mechanism as existing articles. Do not make up a publish date: tell the user what the mechanism gave.
- Unique title. Unique meta description (about 150 characters, plain words, no keyword stuffing).
- Canonical URL that points to itself. Never copy another page's canonical.
- No `keywords` meta tag.
- Add it to the sitemap and the blog list. Link it from the related card if there is one.
- Save as a draft. If the blog does not support drafts, say so and keep it out of production.
- Run lint, type-check, and build. Nothing else on the site should change.

## Phase 6: Final report (in Egyptian Arabic)
1. العنوان، ومكان الملف، وحالته (draft).
2. المصادر اللي اتستخدمت (الرابط + تاريخ القراءة).
3. اللي اتجرب فعلاً: الأوامر، والنسخ (Node أو الـ library)، والنتايج.
4. جدول الـ claims اللي اتراجعت.
5. أي حاجة ما اتأكدتش منها أو اتجربت جزئياً.
6. "معلومات محتاجها منك": أسئلة مرقمة بسيطة عن تجارب حقيقية ممكن تخلي المقال شخصي أكتر.
7. تاريخ مقترح لمراجعة المقال تاني (غالباً بعد 6 شهور).

## Quick checklist before saying "done"
- [ ] Research notes exist, every claim has a source and a date
- [ ] Versions and "latest" statements checked today
- [ ] All code and commands run from the final article text
- [ ] Real outputs match the text
- [ ] Edge cases tested
- [ ] Numbers, headings, and names in the text match the code
- [ ] One name per thing, status or spec names checked
- [ ] All links open
- [ ] No invented experience or numbers
- [ ] Plain words, no banned words, honest feeling
- [ ] Meta tags unique, canonical points to itself, no keywords tag, sitemap updated
- [ ] Saved as draft, nothing published