/*
 * Auto-fills the blog-post URLs in public/sitemap.xml from src/data/blogs.js.
 *
 * - Runs before `vite build` (see package.json "build" script) so the freshly
 *   built dist/sitemap.xml always lists every /blogs/{slug} URL.
 * - Reads the slugs straight from the blog data file (regex, no import needed)
 *   so adding a new blog post automatically adds it to the sitemap.
 * - Replaces only the content between the <!-- BLOGS:START --> and
 *   <!-- BLOGS:END --> markers; the rest of the sitemap is left untouched.
 */
const fs = require("fs");
const path = require("path");

const blogsFile = path.join("src", "data", "blogs.js");
const sitemapFile = path.join("public", "sitemap.xml");

const blogsSrc = fs.readFileSync(blogsFile, "utf8");
const slugs = [...blogsSrc.matchAll(/slug:\s*["'`]([^"'`]+)["'`]/g)].map((m) => m[1]);

const today = new Date().toISOString().slice(0, 10);
const entries = slugs
  .map(
    (slug) =>
      `  <url><loc>https://thesocial99.com/blogs/${slug}</loc><lastmod>${today}</lastmod><changefreq>monthly</changefreq><priority>0.6</priority></url>`
  )
  .join("\n");

let sitemap = fs.readFileSync(sitemapFile, "utf8");
sitemap = sitemap.replace(
  /<!-- BLOGS:START -->[\s\S]*?<!-- BLOGS:END -->/,
  `<!-- BLOGS:START -->\n${entries}\n  <!-- BLOGS:END -->`
);
fs.writeFileSync(sitemapFile, sitemap);

console.log(`✅ sitemap.xml updated with ${slugs.length} blog URLs`);
