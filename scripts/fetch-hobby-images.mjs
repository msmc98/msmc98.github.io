import { mkdir, writeFile, readFile } from 'node:fs/promises';
import sharp from 'sharp';

// Curated photographs, original publicity and game captures; never generated assets.
const sources = JSON.parse(await readFile('src/data/hobby-sources.json', 'utf8'));
let manifest = {}; try { manifest = JSON.parse(await readFile('src/data/hobby-images.json', 'utf8')); } catch {}
const selected = process.argv.slice(2);
await mkdir('public/images/hobbies', { recursive: true });
let failures = 0;
for (const [id, asset] of Object.entries(sources)) {
  if (selected.length ? !selected.includes(id) : manifest[id]?.width === 900 && manifest[id]?.height === 675) continue;
  try {
    const response = await fetch(asset.originalUrl, { signal: AbortSignal.timeout(30000) });
    if (!response.ok) throw new Error(`HTTP ${response.status}`);
    const input = Buffer.from(await response.arrayBuffer());
    const original = await sharp(input).metadata();
    if (original.width < 900 || original.height < 675) throw new Error('Source below minimum resolution');
    const output = await sharp(input).rotate().resize(900, 675, {
      fit: 'cover', withoutEnlargement: true,
      position: ['labrador', 'rottweiler', 'attack-on-titan', 'demon-slayer', 'solo-leveling'].includes(id) ? 'attention' : 'centre',
    }).webp({ quality: 90 }).toBuffer({ resolveWithObject: true });
    const filename = `${id}-v${asset.version || 2}.webp`;
    await writeFile(`public/images/hobbies/${filename}`, output.data);
    manifest[id] = { ...asset, src: `/images/hobbies/${filename}`, width: output.info.width, height: output.info.height,
      originalWidth: original.width, originalHeight: original.height, retrievedAt: new Date().toISOString(), generated: false };
    console.log(`SAVED ${id} ${output.info.width}x${output.info.height}`);
  } catch (error) { failures++; console.error(`FAILED ${id}: ${error.message}`); }
}
await writeFile('src/data/hobby-images.json', JSON.stringify(manifest, null, 2) + '\n');
if (failures) process.exitCode = 1;
