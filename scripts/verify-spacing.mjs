import assert from 'node:assert/strict';
import { writeFile } from 'node:fs/promises';
import { launchBrowser, delay } from './lib/browser.mjs';

const browser = await launchBrowser(9349);
const results = [];
try {
  const page = await browser.page();
  await page.send('Emulation.setEmulatedMedia', { features: [{ name: 'prefers-reduced-motion', value: 'reduce' }] });
  for (const lang of ['es', 'en']) {
    await page.send('Page.navigate', { url: `http://localhost:4321/${lang === 'es' ? 'es/' : ''}` });
    for (let i = 0; i < 100 && !(await page.evaluate("!!customElements.get('hobby-gallery') && document.querySelectorAll('#main-content section[id]').length===7")); i++) await delay(100);
    assert.equal(await page.evaluate("document.querySelector('.archive-stats strong').textContent"), '50+');
    assert((await page.evaluate("document.querySelector('.hero-description').textContent")).includes('50'));
    assert((await page.evaluate("document.querySelector('.header-bottom > p').textContent")).includes('16'));
    assert.equal(await page.evaluate("document.querySelectorAll('.section-disclosure').length"), 5);
    assert(await page.evaluate("!!document.querySelector('#contact .contact-portrait') && !!document.querySelector('#contact .contact-bubble')"));
    assert(await page.evaluate("Array.from(document.querySelectorAll('.section-disclosure')).every(d=>!d.open)"));
    for (const state of ['closed', 'open']) {
    await page.evaluate(`document.querySelectorAll('.section-disclosure').forEach(d=>d.open=${state==='open'}); true`);
    for (const width of [320, 390, 760, 761, 1100, 1101, 1440, 1920]) {
      await page.send('Emulation.setDeviceMetricsOverride', { width, height: 1000, deviceScaleFactor: 1, mobile: width < 600 });
      await delay(100);
      const sections = await page.evaluate(`Array.from(document.querySelectorAll('#main-content section[id]')).map(section => {
        const css=getComputedStyle(section), rect=section.getBoundingClientRect();
        const children=Array.from(section.children).filter(child=>{const s=getComputedStyle(child);return s.display!=='none'&&!['absolute','fixed'].includes(s.position);});
        const bottom=Math.max(...children.map(child=>child.getBoundingClientRect().bottom));
        return { id:section.id, top:Number.parseFloat(css.paddingTop), bottom:Number.parseFloat(css.paddingBottom), trailing:Math.round(rect.bottom-bottom) };
      })`);
      assert.equal(sections.length, 7);
      const contentSections=sections.filter(section=>section.id!=='profile');
      assert.equal(new Set(contentSections.flatMap(section => [section.top, section.bottom])).size, 1, `${lang} ${width}: content section padding must match`);
      const heroBalance=await page.evaluate(`(()=>{
        const body=document.querySelector('.hero-body'),text=document.querySelector('.hero-content').getBoundingClientRect(),visual=document.querySelector('.hero-visual').getBoundingClientRect();
        const hud=document.querySelector('.hud').getBoundingClientRect(),section=document.querySelector('#profile').getBoundingClientRect(),css=getComputedStyle(body);
        const stacked=css.gridTemplateColumns.split(' ').length===1;
        return {above:text.top-hud.bottom,below:section.bottom-(stacked?Math.max(text.bottom,visual.bottom):text.bottom),padding:parseFloat(css.paddingTop),textWidth:text.width,column:parseFloat(css.gridTemplateColumns)};
      })()`);
      assert(Math.abs(heroBalance.above-heroBalance.below)<=1, `Hero must be centered below the HUD line: ${JSON.stringify(heroBalance)}`);
      assert(heroBalance.padding>contentSections[0].top, 'Hero retains extra breathing room');
      assert(Math.abs(heroBalance.textWidth-heroBalance.column)<1, 'Hero text must fill its grid column');
      for (const section of sections) assert(Math.abs(section.trailing-section.bottom) <= 2, `${lang} ${width}: #${section.id} has ${section.trailing}px trailing space instead of ${section.bottom}px`);
      assert(await page.evaluate('document.documentElement.scrollWidth <= innerWidth'), `Overflow at ${width}`);
      const cases=await page.evaluate("Array.from(document.querySelectorAll('.case-study')).map(c=>({top:c.getBoundingClientRect().top,left:c.getBoundingClientRect().left,background:getComputedStyle(c).backgroundImage,color:getComputedStyle(c).backgroundColor,sectionColor:getComputedStyle(document.querySelector('#projects')).backgroundColor}))");
      assert.equal(cases.length,3);
      if (width>1100) assert(cases.every(c=>Math.abs(c.top-cases[0].top)<1), 'Three cases must share a row');
      else assert(cases.every(c=>Math.abs(c.left-cases[0].left)<1), 'Three cases must form one column on smaller screens');
      assert(cases.every(c=>c.background.includes('gradient')||c.color!==c.sectionColor), 'Case cards need a distinct surface');
      const hobbyMargins = await page.evaluate("Array.from(document.querySelectorAll('.hobby-group:not([hidden])')).map(group=>getComputedStyle(group).marginBottom)");
      assert(hobbyMargins.every(value => value==='0px'), 'Visible hobby groups must not add trailing margin');
      if (width>760) {
        assert(await page.evaluate("document.querySelector('.brand-symbol').getBoundingClientRect().width<=76"), 'Logo must remain compact');
        const gaps=await page.evaluate("(()=>{const b=document.querySelector('.brand').getBoundingClientRect(),n=document.querySelector('.navigation').getBoundingClientRect(),l=document.querySelector('.language-selector').getBoundingClientRect();return {above:n.top-b.bottom,below:l.top-n.bottom}})()");
        assert(Math.abs(gaps.above-gaps.below)<=1, `Sidebar must be vertically centered: ${JSON.stringify(gaps)}`);
        const columns=await page.evaluate("Array.from(document.querySelectorAll('.navigation .nav-item > span:last-child, .language-label, .language-code, .status-line > span:nth-child(2), .system-status .location')).map(el=>el.getBoundingClientRect().left)");
        assert(columns.every(left=>Math.abs(left-columns[0])<=1), `Navigation, language and system text must align: ${columns}`);
      }
      results.push({lang,width,state,sections,heroBalance});
      if (width===390 || width===1440) {
        await page.evaluate("window.scrollTo({top:0,behavior:'instant'}); true");
        const shot=await page.send('Page.captureScreenshot',{format:'png'});
        await writeFile(`.astro/spacing-hero-${lang}-${width}-${state}.png`,Buffer.from(shot.data,'base64'));
        if (state==='closed') {
          await page.evaluate("document.querySelector('#projects').scrollIntoView({behavior:'instant'}); true");
          const projects=await page.send('Page.captureScreenshot',{format:'png'});
          await writeFile(`.astro/compact-projects-${lang}-${width}.png`,Buffer.from(projects.data,'base64'));
          await page.evaluate("document.querySelector('#contact').scrollIntoView({behavior:'instant'}); true");
          await delay(200);
          const contact=await page.send('Page.captureScreenshot',{format:'png'});
          await writeFile(`.astro/compact-contact-${lang}-${width}.png`,Buffer.from(contact.data,'base64'));
        }
      }
    }
    }
    const before=await page.evaluate("document.querySelector('#hobbies .section-disclosure').open=false; document.querySelector('#hobbies .section-disclosure summary').focus(); document.querySelector('#hobbies').offsetHeight");
    await delay(100);
    await page.send('Input.dispatchKeyEvent',{type:'keyDown',key:' ',code:'Space',windowsVirtualKeyCode:32,text:' '});
    await page.send('Input.dispatchKeyEvent',{type:'keyUp',key:' ',code:'Space',windowsVirtualKeyCode:32});
    await delay(100);
    assert(await page.evaluate("document.querySelector('#hobbies .section-disclosure').open"), 'Keyboard must open the disclosure');
    assert((await page.evaluate("document.querySelector('#hobbies').offsetHeight"))>before);
    await page.evaluate("document.querySelector('#projects .section-disclosure').open=false; location.hash='case-arfe'; true");
    await page.evaluate("document.querySelector('[data-hobby-filter=all]').click(); true");
    assert(await page.evaluate("Array.from(document.querySelectorAll('.hobby-group:not([hidden])')).every(group=>getComputedStyle(group).marginBottom==='0px')"));
  }
  await writeFile('.astro/spacing-validation.json',JSON.stringify(results,null,2));
  await page.dispose();
  console.log('PASS: full-width hero centered below HUD line; compact logo; uniform content section padding/trailing gaps, disclosures open/closed, 8 widths and ES/EN; centered sidebar; keyboard; 50+ career projects vs 16 selected websites.');
} finally { await browser.close(); }
