import { readFile, writeFile } from 'node:fs/promises';
import { launchBrowser, delay } from './lib/browser.mjs';
const records = JSON.parse(await readFile('src/data/project-captures.json', 'utf8'));
const html = `<!doctype html><html><head><style>body{margin:0;background:#0a101a;color:white;font:14px system-ui;padding:20px}main{display:grid;grid-template-columns:repeat(3,1fr);gap:16px}article{padding:12px;background:#15202f;border:1px solid #34404f}h2{font-size:14px;margin:0 0 12px}.views{display:flex;gap:12px}.desktop{width:340px;height:213px;overflow:hidden}.mobile{width:90px;height:195px;overflow:hidden}img{width:100%;height:auto;display:block}small{display:block;color:#83eaff;margin-top:8px}</style></head><body><main>${Object.entries(records).map(([name, record]) => `<article><h2>${name}</h2><div class="views"><div class="desktop">${record.desktop ? `<img src="http://localhost:4321${record.desktop.src}">` : 'No desktop capture'}</div><div class="mobile">${record.mobile ? `<img src="http://localhost:4321${record.mobile.src}">` : 'No mobile capture'}</div></div><small>Desktop / Mobile</small></article>`).join('')}</main></body></html>`;
const browser = await launchBrowser(9342);
try {
  const page = await browser.page();
  await page.send('Emulation.setDeviceMetricsOverride', { width: 1500, height: 1600, deviceScaleFactor: 1, mobile: false });
  await page.send('Page.navigate', { url: 'http://localhost:4321/' });
  await delay(1000);
  const { frameTree } = await page.send('Page.getFrameTree');
  await page.send('Page.setDocumentContent', { frameId: frameTree.frame.id, html });
  await delay(2500);
  const screenshot = await page.send('Page.captureScreenshot', { format: 'png' });
  await writeFile('.astro/capture-contact-sheet.png', Buffer.from(screenshot.data, 'base64'));
  await page.dispose();
} finally { await browser.close(); }
