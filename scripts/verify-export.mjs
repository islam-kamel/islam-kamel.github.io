import assert from "node:assert/strict";
import fs from "node:fs";
import path from "node:path";

function readCandidate(...candidates) {
  for (const candidate of candidates) {
    const fullPath = path.resolve(process.cwd(), candidate);
    if (fs.existsSync(fullPath)) {
      return fs.readFileSync(fullPath, "utf8");
    }
  }
  assert.fail(`Missing required export file: ${candidates.join(" or ")}`);
}

function findFile(...candidates) {
  for (const candidate of candidates) {
    const fullPath = path.resolve(process.cwd(), candidate);
    if (fs.existsSync(fullPath)) {
      return fullPath;
    }
  }
  assert.fail(`Missing required export file: ${candidates.join(" or ")}`);
}

function parseSitemapEntries(xml) {
  const entries = [];
  const urlRegex = /<url>([\s\S]*?)<\/url>/g;
  let match;
  while ((match = urlRegex.exec(xml)) !== null) {
    const locMatch = match[1].match(/<loc>([\s\S]*?)<\/loc>/);
    const lastmodMatch = match[1].match(/<lastmod>([\s\S]*?)<\/lastmod>/);
    if (locMatch) {
      entries.push({
        loc: locMatch[1].trim(),
        lastmod: lastmodMatch ? lastmodMatch[1].trim() : null,
      });
    }
  }
  return entries;
}

// 1. Validate vercel.json rewrite and header rules
const vercelPath = path.resolve(process.cwd(), "vercel.json");
assert(fs.existsSync(vercelPath), "vercel.json must exist");
const vercelConfig = JSON.parse(fs.readFileSync(vercelPath, "utf8"));

const ogRewrite = vercelConfig.rewrites?.find(
  (r) =>
    r.source === "/:path*/opengraph-image.png" &&
    r.destination === "/:path*/opengraph-image"
);
assert(
  ogRewrite,
  "vercel.json must rewrite /:path*/opengraph-image.png to /:path*/opengraph-image"
);

for (const src of ["/:path*/opengraph-image", "/:path*/opengraph-image.png"]) {
  const headerRule = vercelConfig.headers?.find((h) => h.source === src);
  assert(headerRule, `vercel.json must define headers for ${src}`);
  const hasContentType = headerRule.headers?.some(
    (h) => h.key.toLowerCase() === "content-type" && h.value === "image/png"
  );
  assert(
    hasContentType,
    `vercel.json must set Content-Type: image/png for ${src}`
  );
}

const home = readCandidate("out/index.html");
const blog = readCandidate("out/blog.html", "out/blog/index.html");
const article = readCandidate(
  "out/blog/migrating-github-pages-to-vercel.html",
  "out/blog/migrating-github-pages-to-vercel/index.html"
);
const sitemap = readCandidate("out/sitemap.xml");
const robots = readCandidate("out/robots.txt");

const articleUrl = "https://islamkamel.com/blog/migrating-github-pages-to-vercel";
const expectedTitle = "Migrating GitHub Pages to Vercel Without SEO Drift";
const expectedDescription =
  "A practical DevOps case study on moving a static site to Vercel behind Cloudflare while preserving HTTPS canonicals, redirects, analytics, and indexing signals.";

// 2. Canonical tag on article
assert(
  article.includes(`<link rel="canonical" href="${articleUrl}"/>`),
  "Article must specify its exact canonical URL"
);

// 3. Open Graph metadata
assert(
  article.includes(`<meta property="og:url" content="${articleUrl}"/>`),
  "Article must specify its exact og:url"
);
assert(
  article.includes(`<meta property="og:title" content="${expectedTitle}"/>`),
  "Article must specify its exact og:title"
);
assert(
  article.includes(`<meta property="og:description" content="${expectedDescription}"/>`),
  "Article must specify its exact og:description"
);
assert(
  article.includes('<meta property="og:image:width" content="1200"/>'),
  "Article must specify og:image:width 1200"
);
assert(
  article.includes('<meta property="og:image:height" content="630"/>'),
  "Article must specify og:image:height 630"
);
assert(
  article.includes(`<meta property="og:image" content="${articleUrl}/opengraph-image`),
  "Article must specify its own dynamic og:image URL"
);

// 4. Twitter card metadata
assert(
  article.includes(`<meta name="twitter:title" content="${expectedTitle}"/>`),
  "Article must specify its exact twitter:title"
);
assert(
  article.includes(`<meta name="twitter:description" content="${expectedDescription}"/>`),
  "Article must specify its exact twitter:description"
);
assert(
  article.includes(`<meta name="twitter:image" content="${articleUrl}/opengraph-image`),
  "Article must specify its own dynamic twitter:image URL"
);

// 5. BlogPosting structured data (JSON-LD)
const ldJsonMatch = article.match(
  /<script\s+id="ld-json-blog-posting"[^>]*>([\s\S]*?)<\/script>/
);
assert(ldJsonMatch, "Missing ld-json-blog-posting script element in article");

let ldData;
try {
  ldData = JSON.parse(ldJsonMatch[1]);
} catch (err) {
  assert.fail(`Failed to parse ld-json-blog-posting JSON: ${err.message}`);
}

assert.equal(ldData["@type"], "BlogPosting");
assert.equal(ldData.headline, expectedTitle);
assert.equal(ldData.description, expectedDescription);
assert.equal(ldData.datePublished, "2026-09-12T00:00:00.000Z");
assert.equal(ldData.dateModified, "2026-09-12T00:00:00.000Z");
assert.equal(
  ldData.mainEntityOfPage?.["@id"],
  articleUrl,
  "mainEntityOfPage @id must equal the canonical article URL"
);
assert.equal(
  ldData.author?.name,
  "Islam Kamel",
  "author name must equal Islam Kamel"
);
assert.equal(
  ldData.image,
  `${articleUrl}/opengraph-image.png`,
  "image must equal the article opengraph-image.png URL"
);

// 6. Mermaid blocks: exactly 2 diagram blocks
assert.match(article, /class="mermaid\b/, "Article must contain mermaid class");
const mermaidBlocks = article.match(/<pre class="mermaid\b/g) || [];
assert.equal(
  mermaidBlocks.length,
  2,
  `Expected exactly 2 Mermaid diagram blocks, found ${mermaidBlocks.length}`
);

// 7. Generated Open Graph PNG exists and has valid PNG signature + dimensions
const ogImagePath = findFile(
  "out/blog/migrating-github-pages-to-vercel/opengraph-image",
  "out/blog/migrating-github-pages-to-vercel/opengraph-image.png"
);
const ogBytes = fs.readFileSync(ogImagePath);
const pngSignature = Buffer.from([0x89, 0x50, 0x4e, 0x47, 0x0d, 0x0a, 0x1a, 0x0a]);
assert.equal(
  ogBytes.subarray(0, 8).equals(pngSignature),
  true,
  "Generated Open Graph image must be a valid PNG"
);
const width = ogBytes.readUInt32BE(16);
const height = ogBytes.readUInt32BE(20);
assert.equal(width, 1200, `Expected OG image width 1200, got ${width}`);
assert.equal(height, 630, `Expected OG image height 630, got ${height}`);

// 8. Sitemap entries and truthful dates
const sitemapEntries = parseSitemapEntries(sitemap);

const homeEntry = sitemapEntries.find((e) => e.loc === "https://islamkamel.com");
assert(homeEntry, "Homepage entry must exist in sitemap");
assert.equal(
  homeEntry.lastmod,
  null,
  "Homepage must omit lastmod in sitemap to prevent ungrounded deployment timestamps"
);

const articleEntry = sitemapEntries.find((e) => e.loc === articleUrl);
assert(articleEntry, "Sitemap must contain the article URL");
assert(
  articleEntry.lastmod && articleEntry.lastmod.startsWith("2026-09-12"),
  "Article sitemap entry must have truthful lastmod matching its publication date"
);

const blogEntry = sitemapEntries.find((e) => e.loc === "https://islamkamel.com/blog");
assert(blogEntry, "Blog index entry must exist in sitemap");
assert(blogEntry.lastmod, "Blog index entry must have lastmod in sitemap");

const postEntries = sitemapEntries.filter((e) =>
  e.loc.startsWith("https://islamkamel.com/blog/")
);
assert(postEntries.length > 0, "Expected at least one blog post entry in sitemap");

const maxPostTime = Math.max(
  ...postEntries.map((post) => {
    assert(post.lastmod, `Post ${post.loc} must have lastmod in sitemap`);
    return new Date(post.lastmod).getTime();
  })
);
assert.equal(
  new Date(blogEntry.lastmod).getTime(),
  maxPostTime,
  "Blog index lastmod must equal the maximum lastmod across all post entries"
);

// 9. Robots sitemap reference
assert(
  robots.includes("Sitemap: https://islamkamel.com/sitemap.xml"),
  "robots.txt must reference sitemap.xml"
);

// 10. Tag Manager noscript fallback and executable script validation
const pagesWithNoscript = [
  { name: "homepage", html: home },
  { name: "blog", html: blog },
  { name: "article", html: article },
];

for (const { name, html } of pagesWithNoscript) {
  const noscriptMatch = html.match(/<noscript>([\s\S]*?)<\/noscript>/);
  assert(noscriptMatch, `${name} must contain a <noscript> block`);
  const noscriptContent = noscriptMatch[1];
  assert(
    noscriptContent.includes(
      'src="https://www.googletagmanager.com/ns.html?id=GTM-NPFLTNVW"'
    ),
    `${name} noscript block must contain exact active iframe source https://www.googletagmanager.com/ns.html?id=GTM-NPFLTNVW`
  );
  assert(
    !noscriptContent.includes("GTM-T3GSTK22"),
    `${name} noscript block must not contain retired GTM ID GTM-T3GSTK22`
  );
}

// On the homepage, assert the executable/preload GTM URL uses GTM-NPFLTNVW and no gtm.js?id=GTM-T3GSTK22 appears
assert(
  home.includes("gtm.js?id=GTM-NPFLTNVW"),
  "Homepage must include executable/preload GTM URL with active GTM-NPFLTNVW"
);
assert(
  !home.includes("gtm.js?id=GTM-T3GSTK22"),
  "Homepage must not contain executable/preload GTM URL with retired GTM-T3GSTK22"
);

console.log("Static export verification passed: all invariants verified.");
