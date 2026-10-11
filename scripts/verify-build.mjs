import assert from 'node:assert/strict';
import { readdir, readFile } from 'node:fs/promises';
import { posix } from 'node:path';

const origin = 'https://msmc98.github.io';
async function filesIn(directory, prefix = '') {
  const entries = await readdir(directory, { withFileTypes: true });
  const files = await Promise.all(entries.map(entry => {
    const path = posix.join(prefix, entry.name);
    return entry.isDirectory() ? filesIn(`${directory}/${entry.name}`, path) : [path];
  }));
  return files.flat();
}
const files = new Set(await filesIn('dist'));
const checked = new Set();
function checkReference(reference, source) {
  const value = reference.replace(/&amp;/g, '&').trim();
  if (!value || /^(?:data:|mailto:|tel:|javascript:)/i.test(value)) return;
  const url = new URL(value, new URL(source, `${origin}/`));
  if (url.origin !== origin) return;
  const path = decodeURIComponent(url.pathname).slice(1);
  const candidates = [path, posix.join(path, 'index.html')];
  assert(candidates.some(candidate => files.has(candidate)), `${source}: missing resource ${value} (case-sensitive)`);
  checked.add(url.pathname);
}

for (const path of await filesIn('public')) {
  assert(files.has(path), `Public asset missing from build: ${path}`);
}
for (const path of files) {
  if (!/\.(html|css|js|xml|txt)$/.test(path)) continue;
  const content = await readFile(`dist/${path}`, 'utf8');
  assert(!/(?:localhost|127\.0\.0\.1|0\.0\.0\.0)/i.test(content), `Local server reference in ${path}`);
  if (path.endsWith('.html')) {
    for (const tag of content.matchAll(/<(?:a|img|link|script|source|video|use)\b[^>]*>/g)) {
      for (const attr of tag[0].matchAll(/\b(?:href|src|poster)="([^"]*)"/g)) checkReference(attr[1], path);
      for (const attr of tag[0].matchAll(/\bsrcset="([^"]*)"/g)) {
        for (const item of attr[1].split(',')) checkReference(item.trim().split(/\s+/)[0], path);
      }
    }
    const ids = new Set([...content.matchAll(/\bid="([^"]+)"/g)].map(match => match[1]));
    for (const link of content.matchAll(/<a\b[^>]*\bhref="#([^"]+)"/g)) {
      assert(ids.has(link[1]), `${path}: broken anchor #${link[1]}`);
    }
  }
  if (path.endsWith('.css')) {
    for (const match of content.matchAll(/url\(\s*["']?([^\s"')]+)["']?\s*\)/g)) checkReference(match[1], path);
  }
}

for (const [path, language, route] of [['index.html', 'en', '/'], ['es/index.html', 'es', '/es/']]) {
  const html = await readFile(`dist/${path}`, 'utf8');
  assert(/<!doctype html>/i.test(html), `${path}: missing doctype`);
  assert(html.includes(`<html lang="${language}"`), `${path}: incorrect language`);
  assert(html.includes(`rel="canonical" href="${origin}${route}"`), `${path}: incorrect canonical`);
  assert(html.includes(`property="og:url" content="${origin}${route}"`), `${path}: incorrect Open Graph URL`);
  assert(html.includes(`property="og:image" content="${origin}/images/brand/social-card.png"`), `${path}: incorrect social image`);
  for (const [lang, route] of [['en', '/'], ['es', '/es/'], ['x-default', '/']]) {
    assert(html.includes(`hreflang="${lang}" href="${origin}${route}"`), `${path}: incorrect hreflang ${lang}`);
  }
}
const sitemap = await readFile('dist/sitemap.xml', 'utf8');
for (const route of ['/', '/es/']) assert(sitemap.includes(`<loc>${origin}${route}</loc>`));
const robots = await readFile('dist/robots.txt', 'utf8');
assert(robots.includes(`Sitemap: ${origin}/sitemap.xml`));
console.log(`PASS: static EN/ES routes, ${checked.size} local resource paths, all public assets, CSS URLs, anchors, canonical, hreflang, Open Graph, sitemap and robots; no localhost references.`);
