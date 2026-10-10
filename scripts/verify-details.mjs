import assert from 'node:assert/strict';
import { writeFile } from 'node:fs/promises';
import { launchBrowser, delay } from './lib/browser.mjs';

const browser = await launchBrowser(9343);
try {
  const page = await browser.page();
  const check = page.evaluate;
  const waitFor = async (expression) => {
    for (let i = 0; i < 100; i++) { if (await check(expression)) return; await delay(100); }
    throw new Error(`Timed out: ${expression}`);
  };
  const navigate = async (lang = 'es') => {
    await page.send('Page.navigate', { url: `http://localhost:4321/${lang === 'es' ? 'es/' : ''}` });
    await waitFor("!!customElements.get('jarvis-boot') && !!document.querySelector('#experience')");
  };
  const screenshot = async (name) => {
    const result = await page.send('Page.captureScreenshot', { format: 'png' });
    await writeFile(`.astro/${name}.png`, Buffer.from(result.data, 'base64'));
  };
  await page.send('Emulation.setDeviceMetricsOverride', { width: 1440, height: 1000, deviceScaleFactor: 1, mobile: false });
  await navigate();
  await check("sessionStorage.setItem('jarvis-welcome', 'seen'); true");
  await navigate();
  await waitFor("document.querySelector('jarvis-boot dialog').open");
  assert(await check("!document.querySelector('iron-man-flight')"));
  await screenshot('jarvis-welcome');
  await waitFor("document.querySelector('jarvis-boot progress').value === 100");
  await waitFor("!document.querySelector('jarvis-boot dialog').open");
  await navigate();
  await waitFor("document.querySelector('jarvis-boot dialog').open");
  await check("document.querySelector('jarvis-boot button').click(); true");
  assert.equal(await check("document.querySelectorAll('#experience .timeline > li').length"), 6);
  const jobs = await check("document.querySelector('#experience').textContent");
  for (const company of ['AdGency Pixel', 'Soluciones Informáticas MJ', 'TicTac Comunicación', 'WhiteKong', 'Aventus Online', 'Aicor']) assert(jobs.includes(company));
  assert(jobs.includes('Sept. 2024') && jobs.includes('actualidad') && jobs.includes('Mar. 2022'));
  assert(!jobs.includes('manu98mc@gmail.com'), 'Private CV contact must not be published');
  await screenshot('sidebar-desktop');
  await check("window.scrollTo({top: document.querySelector('#experience').offsetTop, behavior:'instant'}); true");
  await delay(300);
  assert.equal(await check("document.querySelector('.nav-item[aria-current=location]').hash"), '#experience');
  await screenshot('experience-desktop');
  await page.send('Emulation.setDeviceMetricsOverride', { width: 390, height: 844, deviceScaleFactor: 1, mobile: true });
  await delay(200);
  assert(await check('document.documentElement.scrollWidth <= innerWidth'));
  await screenshot('experience-mobile');
  await navigate();
  await waitFor("document.querySelector('jarvis-boot dialog').open");
  await check("document.querySelector('jarvis-boot button').click(); true");
  await delay(400);
  assert(await check("!document.querySelector('jarvis-boot dialog').open && !document.querySelector('iron-man-flight')"));
  await screenshot('sidebar-mobile');
  await page.send('Emulation.setEmulatedMedia', { features: [{ name: 'prefers-reduced-motion', value: 'reduce' }] });
  await navigate('en');
  await waitFor("document.readyState === 'complete'");
  assert(await check("!document.querySelector('jarvis-boot dialog').open && !document.querySelector('iron-man-flight')"));
  assert((await check("document.querySelector('#experience').textContent")).includes('Sept. 2024 — present'));
  await page.dispose();
  console.log('PASS: JARVIS welcome appears again on reload even with a previously seen session; progress reaches 100%; skip and reduced motion; six CV jobs + dates in ES/EN; active navigation; mobile overflow.');
} finally { await browser.close(); }
