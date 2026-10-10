import { readFile, writeFile } from 'node:fs/promises';
import sharp from 'sharp';
const file = 'src/data/employer-logos.json';
const manifest = JSON.parse(await readFile(file, 'utf8'));
for (const [id, logo] of Object.entries(manifest)) {
  const response = await fetch(logo.originalUrl, { signal: AbortSignal.timeout(30000) });
  if (!response.ok) throw new Error(`${id}: ${response.status}`);
  const output = await sharp(Buffer.from(await response.arrayBuffer()), { density: 180 }).resize({ width: 480, height: 160, fit: 'inside', withoutEnlargement: true }).png().toBuffer({ resolveWithObject: true });
  await writeFile(`public${logo.src}`, output.data);
  Object.assign(logo, { width: output.info.width, height: output.info.height, retrievedAt: new Date().toISOString() });
  console.log(`SAVED ${id}`);
}
await writeFile(file, JSON.stringify(manifest, null, 2) + '\n');
