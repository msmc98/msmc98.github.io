import assert from 'node:assert/strict';
import { mkdir, writeFile } from 'node:fs/promises';
import { launchBrowser, delay } from './lib/browser.mjs';

const base = process.env.VERIFY_BASE_URL || 'http://localhost:4321/';
const browser = await launchBrowser(9348);
await mkdir('.astro', { recursive: true });
try {
  const page = await browser.page();
  const errors = [];
  page.onEvent('Runtime.exceptionThrown', event => errors.push(event.exceptionDetails.text));
  page.onEvent('Runtime.consoleAPICalled', event => { if (event.type === 'error') errors.push(event.args.map(arg => arg.value || arg.description).join(' ')); });
  const waitFor = async expression => { for (let n = 0; n < 100; n++) { if (await page.evaluate(expression)) return; await delay(100); } throw new Error(`Timeout: ${expression}`); };
  const shot = async name => { const result = await page.send('Page.captureScreenshot', { format: 'png' }); await writeFile(`.astro/${name}.png`, Buffer.from(result.data, 'base64')); };
  for (const lang of ['es', 'en']) {
    await page.send('Emulation.setDeviceMetricsOverride', { width: 1440, height: 1000, deviceScaleFactor: 1, mobile: false });
    await page.send('Page.navigate', { url: new URL(lang === 'es' ? 'es/' : './', base).href });
    await waitFor("!!customElements.get('jarvis-assistant') && !!customElements.get('jarvis-boot')");
    await page.evaluate("if(document.querySelector('jarvis-boot dialog').open) document.querySelector('jarvis-boot button').click(); true");
    assert.equal(await page.evaluate('document.documentElement.lang'), lang);
    assert(await page.evaluate("!document.querySelector('jarvis-boot dialog').open"));
    assert.equal(await page.evaluate("document.querySelectorAll('#experience .timeline > li').length"), 7);
    assert.equal(await page.evaluate("document.querySelectorAll('.project').length"), 13);
    assert.equal(await page.evaluate("document.querySelectorAll('.hobby-card').length"), 29);
    assert.equal(await page.evaluate("document.querySelectorAll('.case-study').length"), 3);
    assert.equal(await page.evaluate("document.querySelectorAll('.verified-stack article').length"), 6);
    assert.equal(await page.evaluate("document.querySelectorAll('h1').length"), 1);
    const ids = await page.evaluate("Array.from(document.querySelectorAll('[id]')).map(el=>el.id)");
    assert.equal(ids.length, new Set(ids).size, 'IDs must be unique');
    const brokenAnchors = await page.evaluate("Array.from(document.querySelectorAll('a[href^=\"#\"]')).filter(a=>!document.getElementById(a.hash.slice(1))).map(a=>a.getAttribute('href'))");
    assert.deepEqual(brokenAnchors, [], 'All fragment links must resolve');
    assert(await page.evaluate("Array.from(document.querySelectorAll('img')).every(img=>img.hasAttribute('alt'))"));
    assert(await page.evaluate("!!document.querySelector('meta[property=\"og:title\"]') && !!document.querySelector('meta[name=\"twitter:card\"]')"));
    assert.equal(await page.evaluate("JSON.parse(document.querySelector('script[type=\"application/ld+json\"]').textContent)['@type']"), 'Person');
    if (base.includes('/portfolio/')) {
      const canonical = await page.evaluate("document.querySelector('link[rel=canonical]').href");
      assert.equal(canonical, `https://msmc98.github.io/portfolio/${lang === 'es' ? 'es/' : ''}`);
      assert.equal(await page.evaluate("document.querySelector('meta[property=\"og:image\"]').content"), 'https://msmc98.github.io/portfolio/images/brand/social-card.png');
    }
    assert.equal(await page.evaluate("document.querySelectorAll('.contact-intentions a[href^=\"mailto:\"]').length"), 2);
    await page.evaluate("document.querySelector('.assistant-disclosure').open=true; true");
    assert(await page.evaluate("Array.from(document.querySelectorAll('jarvis-assistant .commands a, jarvis-assistant .suggestions button')).every(el=>{const c=getComputedStyle(el);return c.alignItems==='center'&&c.paddingTop===c.paddingBottom&&el.getBoundingClientRect().height>=44})"), 'Assistant controls must have centered labels and symmetric padding');
    assert((await page.evaluate("document.querySelector('#experience').textContent")).includes('PythonAnywhere'));
    assert((await page.evaluate("document.querySelector('#experience .timeline > li:last-child .period').textContent")).includes('2022'));
    assert((await page.evaluate("document.querySelector('#skills .language-record').textContent")).includes('B2'));
    assert(await page.evaluate("!document.querySelector('#profile .language-readiness')"));
    assert.equal(await page.evaluate("document.querySelectorAll('.language-flag').length"),2);
    assert.equal(await page.evaluate("document.querySelectorAll('.role-card').length"),3);
    assert((await page.evaluate("document.querySelector('.role-grid').textContent")).includes('Team Lead'));
    assert.equal(await page.evaluate("getComputedStyle(document.querySelector('.hero-description')).textWrap"),'balance');
    for (const [question, evidence] of [['Django', 'TicTac'], ['backend', 'Laravel'], ['ERP', 'MySQL'], ['CV', 'PDF'], ['contact', 'Email'], ['English', 'B2'], ['Team Lead', 'Team Lead']]) {
      await page.evaluate(`document.querySelector('#jarvis-question').value=${JSON.stringify(question)}; document.querySelector('jarvis-assistant form').requestSubmit(); true`);
      assert((await page.evaluate("document.querySelector('jarvis-assistant [role=status]').textContent")).includes(evidence));
    }
    await page.evaluate("document.querySelector('.assistant-disclosure').open=false; document.querySelector('.case-study details').open=true; true");
    assert(await page.evaluate("document.querySelector('.case-study dl').textContent.length > 100"));
    for (const width of [320, 390, 760, 1440, 1920]) {
      await page.send('Emulation.setDeviceMetricsOverride', { width, height: width < 600 ? 844 : 1000, deviceScaleFactor: 1, mobile: width < 600 });
      await page.evaluate("window.scrollTo({top:0,behavior:'instant'}); true");
      await delay(200);
      assert(await page.evaluate('document.documentElement.scrollWidth <= innerWidth'), `${lang}: overflow at ${width}`);
      assert(await page.evaluate("Array.from(document.querySelectorAll('.hero-actions a')).every(a=>a.getBoundingClientRect().height>=44)"));
      if ([390, 1440].includes(width)) { await delay(400); await shot(`professional-${lang}-${width}`); }
    }
    const paths = await page.evaluate("Array.from(document.querySelectorAll('a[href],img[src],link[rel=icon],link[rel=stylesheet],script[src]')).map(el=>el.href||el.src).filter(url=>url.startsWith(location.origin)&&!url.includes('#'))");
    for (const url of new Set(paths)) assert.equal((await fetch(url)).status, 200, `Local resource unavailable: ${url}`);
    await page.send('Emulation.setDeviceMetricsOverride', { width: 390, height: 844, deviceScaleFactor: 1, mobile: true });
    await page.evaluate("document.querySelector('#contact').scrollIntoView({behavior:'instant'}); true"); await delay(400);
    assert(await page.evaluate("Math.abs(document.querySelector('.sidebar').getBoundingClientRect().top)<1"), 'Mobile navigation stays accessible while scrolling');
    assert(await page.evaluate("document.querySelector('.contact-dock').hidden"), 'Dock must not cover contact CTAs');
    await shot(`contact-${lang}-390`);
    await page.evaluate("document.querySelector('#projects').scrollIntoView({behavior:'instant'}); true"); await delay(400); await shot(`cases-${lang}-390`);
  }
  assert.deepEqual(errors, [], 'No runtime exceptions or console errors');
  await page.send('Emulation.setDeviceMetricsOverride', { width: 1200, height: 630, deviceScaleFactor: 1, mobile: false });
  await page.send('Page.navigate', { url: new URL('images/brand/social-card.svg', base).href });
  const social = await page.send('Page.captureScreenshot', { format: 'png' });
  await writeFile('public/images/brand/social-card.png', Buffer.from(social.data, 'base64'));
  await writeFile('.astro/professional-validation.json', JSON.stringify({ base, languages: ['es', 'en'], widths: [320,390,760,1440,1920], runtimeErrors: errors, jobs: 6, projectGroups: 13, websites: 16, hobbies: 29 }, null, 2));
  await page.dispose();
  console.log('PASS: professional hero, 2 contact intentions, 3 documented cases, 6 stack groups, local assistant, all local resources/anchors, unique IDs, metadata, ES/EN, 5 widths, no runtime errors. Social PNG exported.');
} finally { await browser.close(); }
