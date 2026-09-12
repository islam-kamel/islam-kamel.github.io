import { unified } from "unified";
import remarkParse from "remark-parse";
import remarkRehype from "remark-rehype";
import rehypeStringify from "rehype-stringify";
import { codeToHtml } from "shiki";

const HTML_ENTITIES: Record<string, string> = {
  "&lt;": "<",
  "&gt;": ">",
  "&amp;": "&",
  "&quot;": '"',
  "&apos;": "'",
};

function decodeHtmlEntities(text: string): string {
  return text.replace(
    /&(?:#x([0-9a-fA-F]+)|#([0-9]+)|([a-zA-Z0-9]+));/g,
    (match, hex, dec) => {
      if (hex) return String.fromCodePoint(parseInt(hex, 16));
      if (dec) return String.fromCodePoint(parseInt(dec, 10));

      return HTML_ENTITIES[match] || match;
    }
  );
}

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
    /<pre><code(?: class="language-([a-zA-Z0-9_-]+)")?>([\s\S]*?)<\/code><\/pre>/g;

  let match: RegExpExecArray | null;
  const replacements: Array<[string, string]> = [];

  while ((match = codeBlockRegex.exec(html)) !== null) {
    const [fullMatch, lang = "text", rawCode] = match;
    // Decode all HTML entities (named, hex, and decimal) back to raw text for Shiki
    const code = decodeHtmlEntities(rawCode).trim();

    if (lang === "mermaid") {
      const mermaidHtml = `<div class="mermaid-block my-8 overflow-x-auto"><pre class="mermaid text-sm text-[#8899A6]">${code}</pre></div>`;

      replacements.push([fullMatch, mermaidHtml]);
      continue;
    }

    const highlighted = await codeToHtml(code, {
      lang,
      theme: "github-dark-default",
    });

    replacements.push([fullMatch, highlighted]);
  }

  for (const [original, replacement] of replacements) {
    html = html.replace(original, () => replacement);
  }

  return html;
}
