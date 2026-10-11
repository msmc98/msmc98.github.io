import assert from 'node:assert/strict';
import { mkdir, writeFile } from 'node:fs/promises';
import { launchBrowser, delay } from './lib/browser.mjs';

const browser = await launchBrowser(9341);
await mkdir('.astro', { recursive: true });
try {
  const page = await browser.page();
  const evaluate = page.evaluate;
  const waitFor = async (expression) => {
    for (let attempt = 0; attempt < 50; attempt++) { if (await evaluate(expression)) return; await delay(200); }
    throw new Error(`Condition timed out: ${expression}`);
  };
  const navigate = async (path) => {
    await page.send('Page.navigate', { url: `http://localhost:4321${path}` });
    await waitFor("!!document.querySelector('project-gallery') && !!customElements.get('project-gallery')");
    await waitFor("!!customElements.get('jarvis-boot')");
    await evaluate("document.querySelector('#projects .section-disclosure').open=true; true");
    await evaluate("if (document.querySelector('jarvis-boot dialog').open) document.querySelector('jarvis-boot button').click(); true");
  };
  await page.send('Emulation.setDeviceMetricsOverride', { width: 1440, height: 1000, deviceScaleFactor: 1, mobile: false });
  await navigate('/es/');
  await delay(3300);
  const details = [];
  for (let index = 0; index < 4; index++) {
    await evaluate(`document.querySelector('.project-featured [data-site="${index}"]').click(); true`);
    details.push(await evaluate("document.querySelector('[data-site-detail]').textContent"));
    assert.equal(await evaluate("document.querySelectorAll('[data-site-highlights] li').length"), 3);
    assert(await evaluate(`document.querySelector('[data-site-name]').textContent === JSON.parse(document.querySelector('.project-featured').dataset.sites)[${index}].name`));
  }
  assert.equal(new Set(details).size, 4, 'Each city must have its own description');
  await evaluate("document.querySelector('.project-featured [data-site=\"0\"]').click(); true");
  for (const width of [390, 1440, 1920]) {
    await page.send('Emulation.setDeviceMetricsOverride', { width, height: 1000, deviceScaleFactor: 1, mobile: width < 600 });
    await delay(100);
    const gap = await evaluate("(() => { const s=document.querySelector('#hobbies');return document.querySelector('.contact-dock').getBoundingClientRect().right-(s.getBoundingClientRect().right-parseFloat(getComputedStyle(s).paddingRight)); })()");
    assert(Math.abs(gap) < 1, `Floating contact misaligned by ${gap}px at ${width}`);
  }
  await page.send('Emulation.setDeviceMetricsOverride', { width: 1440, height: 1000, deviceScaleFactor: 1, mobile: false });

  assert.equal(await evaluate("document.querySelectorAll('.project').length"), 13);
  const requestedDomains = ['cordobapie.es','granadatours.com.es','sevillapie.es','malagapie.es','butterflyengineers.com','lanvert.es','tapizadosmape.es','sieinformatica.com','longrock.es','adgencypixel.com','bdebarefoot.com','secretsofcordoba.com','comprasinformatica.com','venoor.es'];
  const domains = await evaluate("Array.from(document.querySelectorAll('.project')).flatMap(card => JSON.parse(card.dataset.sites).map(site => new URL(site.url).hostname))");
  for (const domain of [...requestedDomains, 'bomtie.com', 'arfe.sieinformatica.net']) assert(domains.includes(domain), `Missing project: ${domain}`);
  assert.equal(await evaluate("document.querySelector('#contact-dock .email').getAttribute('href')"), 'mailto:manu998mc@gmail.com');
  assert.equal(await evaluate("document.querySelector('#contact-dock .whatsapp').getAttribute('href')"), 'https://wa.me/34626846294');
  await evaluate("window.scrollTo({top:document.querySelector('#projects').offsetTop,behavior:'instant'}); true");
  await delay(1200);
  await waitFor("document.querySelector('.project-featured [data-device=desktop]').naturalWidth > 0");
  const desktop = await page.send('Page.captureScreenshot', { format: 'png' });
  await writeFile('.astro/gallery-desktop.png', Buffer.from(desktop.data, 'base64'));
  await evaluate("document.querySelector('.project-featured [data-site=\"2\"]').click(); true");
  assert(await evaluate("document.querySelector('.project-featured .project-visit').href.includes('sevillapie.es')"));
  assert(await evaluate("document.querySelector('.project-featured [data-device=desktop]').src.includes('sevilla-pie')"));
  await evaluate("document.querySelector('.project-featured [data-preview=desktop]').click(); true");
  assert(await evaluate("document.querySelector('.preview-dialog').open"));
  assert(await evaluate("document.querySelector('.preview-image').src.includes('sevilla-pie')"));
  await page.send('Input.dispatchKeyEvent', { type: 'keyDown', key: 'Escape', code: 'Escape', windowsVirtualKeyCode: 27 });
  await page.send('Input.dispatchKeyEvent', { type: 'keyUp', key: 'Escape', code: 'Escape', windowsVirtualKeyCode: 27 });
  assert(await evaluate("!document.querySelector('.preview-dialog').open"));
  await evaluate("document.querySelector('.project-featured [data-site=\"1\"]').click(); true");
  assert(await evaluate("document.querySelector('.project-featured .project-visit').href.includes('granadatours.com.es')"));
  assert(await evaluate("document.querySelector('.project-featured [data-device=desktop]').src.includes('granada-tours')"));
  assert(await evaluate("!Array.from(document.querySelectorAll('.project')).find(card => JSON.parse(card.dataset.sites).some(site => site.url === 'https://bomtie.com')).querySelector('[data-preview=desktop]').disabled"));
  assert(await evaluate("!Array.from(document.querySelectorAll('.project')).find(card => JSON.parse(card.dataset.sites).some(site => site.url === 'https://arfe.sieinformatica.net')).querySelector('[data-preview=desktop]').disabled"));
  await evaluate("document.querySelector('[data-filter=apps]').click(); true");
  assert.equal(await evaluate("document.querySelectorAll('.project:not([hidden])').length"), 1);
  await evaluate("document.querySelector('[data-filter=commerce]').click(); true");
  assert.equal(await evaluate("document.querySelectorAll('.project:not([hidden])').length"), 4);
  assert.equal(await evaluate("document.querySelector('[data-count]').textContent"), '4');
  await evaluate("document.querySelector('[data-filter=all]').click(); document.querySelector('.project-featured [data-site=\"0\"]').click(); true");
  await page.send('Emulation.setDeviceMetricsOverride', { width: 390, height: 844, deviceScaleFactor: 1, mobile: true });
  await navigate('/es/');
  await evaluate("window.scrollTo({top:document.querySelector('#projects').offsetTop,behavior:'instant'}); true");
  await delay(1000);
  assert(await evaluate('document.documentElement.scrollWidth <= innerWidth'), 'Mobile must not overflow');
  const mobile = await page.send('Page.captureScreenshot', { format: 'png' });
  await writeFile('.astro/gallery-mobile.png', Buffer.from(mobile.data, 'base64'));
  await page.send('Emulation.setEmulatedMedia', { features: [{ name: 'prefers-reduced-motion', value: 'reduce' }] });
  await navigate('/');
  assert.equal(await evaluate('document.documentElement.lang'), 'en');
  assert(await evaluate("!document.querySelector('project-gallery').classList.contains('motion-enabled')"));
  assert.equal(await evaluate("document.querySelectorAll('.project').length"), 13);
  await page.dispose();
  console.log('PASS: 16 websites, corrected Bomtie and ARFE with captures, custom apps filter, grouped websites, desktop/mobile mockups, screenshot dialog + Escape, filters, mobile overflow, reduced motion, ES/EN, email and WhatsApp.');
} finally { await browser.close(); }
