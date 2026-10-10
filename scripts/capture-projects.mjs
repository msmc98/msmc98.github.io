import { mkdir, writeFile, readFile } from 'node:fs/promises';
import { launchBrowser, delay } from './lib/browser.mjs';

const sites = [
  ['cordoba-pie', 'https://cordobapie.es'], ['granada-tours', 'https://granadatours.com.es'],
  ['sevilla-pie', 'https://sevillapie.es'], ['malaga-pie', 'https://malagapie.es'],
  ['butterfly-engineers', 'https://butterflyengineers.com'], ['lanvert', 'https://lanvert.es'],
  ['tapizados-mape', 'https://tapizadosmape.es'], ['sie-informatica', 'https://sieinformatica.com'],
  ['longrock', 'https://longrock.es'], ['adgency-pixel', 'https://adgencypixel.com'],
  ['bdebarefoot', 'https://bdebarefoot.com'], ['secrets-of-cordoba', 'https://secretsofcordoba.com'],
  ['compras-informatica', 'https://comprasinformatica.com'], ['venoor', 'https://venoor.es'],
  ['bomtie', 'https://bomtie.com'], ['arfe', 'https://arfe.sieinformatica.net'],
];
const requested = process.argv.slice(2);
const selected = requested.length ? sites.filter(([slug]) => requested.includes(slug)) : sites;
await mkdir('public/projects', { recursive: true });
await mkdir('src/data', { recursive: true });
let manifest = {};
try { manifest = JSON.parse(await readFile('src/data/project-captures.json', 'utf8')); } catch {}
const browser = await launchBrowser();
let writes = Promise.resolve();

async function capture(slug, url) {
  const page = await browser.page();
  const record = { url, capturedAt: new Date().toISOString(), desktop: null, mobile: null, errors: [] };
  try {
    for (const [mode, width, height] of [['desktop', 1440, 900], ['mobile', 390, 844]]) {
      try {
        await page.send('Emulation.setDeviceMetricsOverride', { width, height, deviceScaleFactor: 1, mobile: mode === 'mobile' });
        await page.send('Emulation.setTouchEmulationEnabled', { enabled: mode === 'mobile' });
        await page.send('Emulation.setUserAgentOverride', { userAgent: mode === 'mobile'
          ? 'Mozilla/5.0 (Linux; Android 13; Pixel 7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/131.0.0.0 Mobile Safari/537.36'
          : '' });
        const navigation = await page.send('Page.navigate', { url }, 30000);
        if (navigation.errorText) throw new Error(navigation.errorText);
        await delay(3500);
        // Some sites defer scripts until the first real interaction.
        await page.send('Input.dispatchMouseEvent', { type: 'mouseMoved', x: Math.floor(width / 2), y: Math.floor(height / 2) });
        await page.send('Input.dispatchKeyEvent', { type: 'keyDown', key: 'Tab', code: 'Tab', windowsVirtualKeyCode: 9 });
        await page.send('Input.dispatchKeyEvent', { type: 'keyUp', key: 'Tab', code: 'Tab', windowsVirtualKeyCode: 9 });
        await delay(3000);
        for (let attempt = 0; attempt < 20; attempt++) {
          if (await page.evaluate("document.readyState !== 'loading' && document.body?.innerText.length > 100")) break;
          await delay(500);
        }
        const summary = await page.evaluate(`({ title: document.title, description: document.querySelector('meta[name="description"]')?.content || '', heading: document.querySelector('h1')?.innerText || '', text: document.body?.innerText.slice(0, 650) || '', finalUrl: location.href })`);
        if (/chrome-error:/.test(summary.finalUrl) || /ERR_NAME_NOT_RESOLVED|ERR_CONNECTION|This site can.t be reached|No se puede acceder/.test(summary.text)) throw new Error('Site could not be reached');
        if (/just a moment|verify you are human|checking your browser|access denied|403 forbidden|404 not found|domain is for sale|launching soon|temporarily unavailable|error establishing a database/i.test(summary.title + ' ' + summary.text)) throw new Error('Site returned a holding, block or error page');
        const publicLogin = await page.evaluate("!!document.querySelector('form input[type=password]') && document.querySelector('input[type=password]').getBoundingClientRect().width > 0");
        if (summary.text.length < 70 && !publicLogin) throw new Error('Page did not render enough content');
        const rejectCookies = `(() => {
          for (const element of document.querySelectorAll('button, a, [role="button"], .cmplz-btn, .cky-btn')) {
            if (/^(rechazar( todo| todas)?|denegar|no aceptar|continuar sin aceptar|reject( all)?|deny|decline|solo necesarias|only necessary)$/i.test(element.textContent.trim()) && element.getBoundingClientRect().width) { element.click(); return true; }
          }
          return false;
        })()`;
        await page.evaluate(rejectCookies);
        // Consent dialogs may live in a separate iframe.
        const { frameTree } = await page.send('Page.getFrameTree');
        const dismissFrame = async (tree) => {
          if (tree.frame.id !== frameTree.frame.id) {
            try {
              const { executionContextId } = await page.send('Page.createIsolatedWorld', { frameId: tree.frame.id, worldName: 'portfolio-consent-check' });
              await page.send('Runtime.evaluate', { expression: rejectCookies, contextId: executionContextId, returnByValue: true });
            } catch {}
          }
          for (const child of tree.childFrames || []) await dismissFrame(child);
        };
        await dismissFrame(frameTree);
        await page.evaluate("document.querySelectorAll('img[loading=lazy]').forEach(img => img.loading = 'eager'); true");
        for (const top of [500, 1000, 1600]) {
          await page.evaluate(`window.scrollTo({top:${top}, behavior:'instant'}); true`);
          await delay(600);
        }
        await page.evaluate("window.scrollTo({top:0, behavior:'instant'}); true");
        // Capture the settled content rather than a theme's entrance animation.
        await page.evaluate(`(() => {
          document.activeElement?.blur();
          document.querySelectorAll('.elementor-invisible').forEach(element => element.classList.remove('elementor-invisible'));
          return true;
        })()`);
        await page.evaluate("Promise.race([document.fonts.ready.then(() => true), new Promise(resolve => setTimeout(() => resolve(true), 1500))])");
        await delay(1800);
        await page.evaluate(rejectCookies);
        await dismissFrame((await page.send('Page.getFrameTree')).frameTree);
        await page.evaluate('document.activeElement?.blur(); true');
        await delay(400);
        const metrics = await page.send('Page.getLayoutMetrics');
        const captureHeight = Math.min(Math.max(height, metrics.cssContentSize.height), mode === 'mobile' ? 2200 : 2600);
        const shot = await page.send('Page.captureScreenshot', { format: 'webp', quality: 82, captureBeyondViewport: true, clip: { x: 0, y: 0, width, height: captureHeight, scale: 1 } });
        const path = `/projects/${slug}-${mode}.webp`;
        await writeFile(`public${path}`, Buffer.from(shot.data, 'base64'));
        record[mode] = { src: path, width, height: captureHeight };
        if (mode === 'desktop') Object.assign(record, summary);
        console.log(`CAPTURED ${slug} ${mode}: ${summary.title}`);
      } catch (error) {
        record.errors.push(`${mode}: ${error.message}`);
        console.log(`UNAVAILABLE ${slug} ${mode}: ${error.message}`);
      }
    }
  } finally { await page.dispose(); }
  manifest[slug] = record;
  const snapshot = JSON.stringify(manifest, null, 2) + '\n';
  writes = writes.then(() => writeFile('src/data/project-captures.json', snapshot));
  await writes;
}
try {
  let cursor = 0;
  await Promise.all([0, 1].map(async () => {
    while (cursor < selected.length) {
      const [slug, url] = selected[cursor++];
      await capture(slug, url);
    }
  }));
} finally { await browser.close(); }
console.log(`DONE: ${Object.keys(manifest).length} websites reviewed.`);
