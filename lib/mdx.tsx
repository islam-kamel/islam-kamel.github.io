import { unified } from "unified";
import remarkParse from "remark-parse";
import remarkRehype from "remark-rehype";
import rehypeStringify from "rehype-stringify";
import { codeToHtml } from "shiki";

/**
 * Renders markdown string to styled HTML with Shiki syntax highlighting.
 * Returns a static HTML string (zero client JS).
 */
export async function renderMarkdown(source: string): Promise<string> {
  // Step 1: Parse markdown to HTML (without code highlighting)
  const result = await unified()
    .use(remarkParse)
    .use(remarkRehype)
    .use(rehypeStringify)
    .process(source);

  let html = String(result);

  // Step 2: Highlight code blocks with Shiki
  // Match <pre><code class="language-xxx">...</code></pre> blocks
  const codeBlockRegex =
    /<pre><code class="language-(\w+)">([\s\S]*?)<\/code><\/pre>/g;

  let match: RegExpExecArray | null;
  const replacements: Array<[string, string]> = [];

  while ((match = codeBlockRegex.exec(html)) !== null) {
    const [fullMatch, lang, rawCode] = match;
    // Decode HTML entities back to plain text for Shiki
    const code = rawCode
      .replace(/&lt;/g, "<")
      .replace(/&gt;/g, ">")
      .replace(/&amp;/g, "&")
      .replace(/&quot;/g, '"')
      .replace(/&#39;/g, "'")
      .trim();

    const highlighted = await codeToHtml(code, {
      lang,
      theme: "github-dark-default",
    });

    replacements.push([fullMatch, highlighted]);
  }

  for (const [original, replacement] of replacements) {
    html = html.replace(original, replacement);
  }

  return html;
}
