import assert from 'node:assert/strict';
import { createServer } from 'node:http';
import { readFile, stat, mkdir, writeFile } from 'node:fs/promises';
import { resolve, extname, sep } from 'node:path';
import { createRequire } from 'node:module';

const require = createRequire('C:/Users/david/.gstack/repos/gstack/package.json');
const { chromium, firefox, webkit } = require('playwright');
const root = process.cwd();
const dist = resolve(root, 'dist');
const out = resolve(root, 'docs/qa/2026-11-15-captures-motion-corrections');
await mkdir(out, { recursive: true });
const shots = resolve(out, 'screenshots');
await mkdir(shots, { recursive: true });
const csp = (await readFile(resolve(root, 'Caddyfile'), 'utf8')).match(/Content-Security-Policy "([^"]+)"/u)[1];
const mime = { '.html': 'text/html', '.css': 'text/css', '.js': 'text/javascript', '.woff2': 'font/woff2', '.svg': 'image/svg+xml', '.jpg': 'image/jpeg', '.png': 'image/png', '.pdf': 'application/pdf', '.webmanifest': 'application/manifest+json' };
const server = createServer(async (request, response) => {
  try {
    let file = resolve(dist, '.' + decodeURIComponent(new URL(request.url, 'http://localhost').pathname));
    assert.ok(file === dist || file.startsWith(dist + sep));
    if ((await stat(file)).isDirectory()) file = resolve(file, 'index.html');
    response.writeHead(200, { 'Content-Type': mime[extname(file)] ?? 'text/plain', 'Content-Security-Policy': csp });
    response.end(await readFile(file));
  } catch { response.writeHead(404); response.end('Not found'); }
});
await new Promise(accept => server.listen(0, '127.0.0.1', accept));
const origin = `http://127.0.0.1:${server.address().port}`;
const browser = await chromium.launch({ channel: 'chrome', headless: true });
const context = await browser.newContext({ viewport: { width: 1440, height: 900 }, recordVideo: { dir: resolve(out, 'video'), size: { width: 1440, height: 900 } } });
const page = await context.newPage();
const report = { capturedAt: new Date().toISOString(), browser: browser.version(), csp, checks: [], traces: {}, runtimeErrors: [], limitations: [] };
function watch(target) {
  target.on('pageerror', error => report.runtimeErrors.push(error.message));
  target.on('console', message => { if (message.type() === 'error') report.runtimeErrors.push(message.text()); });
}
watch(page);
const settle = async target => { await target.evaluate(() => document.fonts.ready); await target.waitForTimeout(1300); };
const jump = async (target, y) => { await target.evaluate(top => window.scrollTo({ top, behavior: 'instant' }), y); await target.waitForTimeout(750); };
const sample = async (target, selector, duration = 850) => {
  await target.evaluate(({ selector, duration }) => {
    window.motionFrames = [];
    const start = performance.now();
    function frame() {
      const element = document.querySelector(selector);
      const style = getComputedStyle(element);
      const matrix = new DOMMatrixReadOnly(style.transform);
      const details = element.closest('details');
      const rect = element.getBoundingClientRect();
      window.motionFrames.push({ t: +(performance.now() - start).toFixed(2), y: scrollY, height: details && !details.open ? 0 : rect.height, scale: matrix.a, ty: matrix.f, opacity: +style.opacity, open: details?.open, inert: element.inert });
      if (performance.now() - start < duration) requestAnimationFrame(frame);
    }
    requestAnimationFrame(frame);
  }, { selector, duration });
};
const readTrace = async (name, target, field, minimum = 8) => {
  const frames = await target.evaluate(() => window.motionFrames);
  const distinct = new Set(frames.map(f => +f[field].toFixed(2))).size;
  report.traces[name] = frames;
  assert.ok(distinct >= minimum, `${name}: only ${distinct} distinct ${field} values`);
  return distinct;
};
const check = async (name, task) => {
  const evidence = await task();
  report.checks.push({ name, result: 'passed', ...evidence });
  console.log(JSON.stringify(report.checks.at(-1)));
};

try {
  await page.addInitScript(() => {
    window.heroFrames = [];
    let start;
    function sampleHero(now) {
      const line = document.querySelector('.hero__line');
      if (line && getComputedStyle(line).animationName === 'hero-line-arrive') {
        start ??= now;
        const style = getComputedStyle(line);
        window.heroFrames.push({ t: +(now - start).toFixed(2), ty: new DOMMatrixReadOnly(style.transform).f, opacity: +style.opacity });
      }
      if (!start || now - start < 1450) requestAnimationFrame(sampleHero);
    }
    requestAnimationFrame(sampleHero);
  });
  await page.goto(origin); await settle(page);
  await check('Hero starts before hydration and settles without a reset', async () => {
    const frames = await page.evaluate(() => window.heroFrames);
    report.traces.hero = frames;
    assert.ok(frames.length > 15);
    assert.ok(frames[0].ty > 20, 'entrance missing from first painted frames');
    assert.ok(frames.at(-1).ty < 0.01);
    assert.ok(frames.every((f, i) => !i || f.ty <= frames[i - 1].ty + 0.1), 'hydration restarts hero');
    await page.screenshot({ path: resolve(shots, 'desktop-hero.png') });
    return { frames: frames.length, firstY: frames[0].ty, lastY: frames.at(-1).ty };
  });
  await check('Pointer anchor scroll has intermediate positions', async () => {
    await sample(page, '.hero__line', 1300);
    await page.locator('.hero__actions a[href="#projects"]').click();
    await page.waitForTimeout(1400);
    const positions = await readTrace('anchor', page, 'y');
    assert.equal(new URL(page.url()).hash, '#projects');
    assert.ok(await page.locator('#projects').evaluate(e => e.getBoundingClientRect().top >= 100));
    return { distinctScrollPositions: positions };
  });
  const summary = page.locator('#poultry details > summary');
  await summary.scrollIntoViewIfNeeded(); await page.waitForTimeout(700);
  await check('Disclosure animates both directions and restores its natural height', async () => {
    await sample(page, '#poultry .disclosure-body'); await summary.click(); await page.waitForTimeout(70);
    await page.screenshot({ path: resolve(shots, 'desktop-disclosure-opening.png') }); await page.waitForTimeout(900);
    const opening = await readTrace('disclosureOpen', page, 'height');
    assert.ok(await page.locator('#poultry .disclosure-body').evaluate(e => Math.abs(e.clientHeight - e.scrollHeight) <= 1));
    await page.screenshot({ path: resolve(shots, 'desktop-poultry-open.png') });
    await sample(page, '#poultry .disclosure-body'); await summary.click(); await page.waitForTimeout(50);
    await page.screenshot({ path: resolve(shots, 'desktop-disclosure-closing.png') }); await page.waitForTimeout(900);
    const closing = await readTrace('disclosureClose', page, 'height');
    assert.equal(await page.locator('#poultry details').getAttribute('open'), null);
    return { distinctOpeningHeights: opening, distinctClosingHeights: closing };
  });
  await check('Rapid reversal preserves the latest intent and resize does not crop content', async () => {
    await summary.click(); await page.waitForTimeout(65); await summary.click(); await page.waitForTimeout(45); await summary.click();
    await page.setViewportSize({ width: 1024, height: 768 });
    await page.waitForTimeout(550);
    assert.equal(await page.locator('#poultry details').getAttribute('open'), '');
    assert.equal(await summary.getAttribute('aria-expanded'), 'true');
    assert.ok(await page.locator('#poultry .disclosure-body').evaluate(e => !e.inert && Math.abs(e.clientHeight - e.scrollHeight) <= 1 && e.getAnimations().length === 0));
    await summary.click(); await page.waitForTimeout(350);
    await page.setViewportSize({ width: 1440, height: 900 });
    return { opening: 'open-close-open', resize: '1440 to 1024 during opening' };
  });
  await check('Product scroll motion interpolates the whole frame and settles', async () => {
    const figure = page.locator('.case-study__figure').first();
    const top = await figure.evaluate(e => e.getBoundingClientRect().top + scrollY);
    await jump(page, top - 1000);
    const before = await figure.evaluate(e => ({ scale: new DOMMatrixReadOnly(getComputedStyle(e).transform).a, top: e.getBoundingClientRect().top, scrollY }));
    assert.ok(before.scale < 0.92 && before.top > 900, JSON.stringify(before));
    await sample(page, '.case-study__figure', 1100);
    await page.mouse.wheel(0, 800); await page.waitForTimeout(1200);
    const scales = await readTrace('figure', page, 'scale');
    assert.ok(await figure.evaluate(e => new DOMMatrixReadOnly(getComputedStyle(e).transform).a > 0.999));
    await page.screenshot({ path: resolve(shots, 'desktop-poultry.png') });
    return { distinctScales: scales, entryScaleAfterResize: before.scale };
  });
  await check('Method emphasis progresses while its heading is visible', async () => {
    const top = await page.locator('#principles-title').evaluate(e => e.getBoundingClientRect().top + scrollY);
    await jump(page, top - 1000);
    await sample(page, '.method-word', 1100);
    await page.mouse.wheel(0, 600); await page.waitForTimeout(1200);
    const values = await readTrace('method', page, 'opacity');
    assert.ok(await page.locator('.method-word').first().evaluate(e => +getComputedStyle(e).opacity > 0.99));
    return { distinctOpacities: values };
  });

  await check('Mobile menu opens, reverses, exits and preserves navigation context', async () => {
    await page.setViewportSize({ width: 390, height: 844 }); await page.goto(origin); await settle(page);
    const toggle = page.locator('.navigation__mobile > summary');
    await sample(page, '.navigation__mobile-panel'); await toggle.click(); await page.waitForTimeout(900);
    const opening = await readTrace('mobileMenuOpen', page, 'opacity');
    await sample(page, '.navigation__mobile-panel'); await page.keyboard.press('Escape'); await page.waitForTimeout(900);
    const closing = await readTrace('mobileMenuClose', page, 'opacity');
    assert.equal(await page.locator('.navigation__mobile').getAttribute('open'), null);
    assert.ok(await toggle.evaluate(e => e === document.activeElement));
    await toggle.click(); await page.waitForTimeout(450);
    await page.locator('.navigation__mobile-panel a[href="#experience"]').click(); await page.waitForTimeout(1400);
    assert.equal(new URL(page.url()).hash, '#experience');
    assert.equal(await page.locator('.navigation__mobile').getAttribute('open'), null);
    assert.ok(await page.locator('#experience').evaluate(e => e.getBoundingClientRect().top >= 100));
    await toggle.click(); await page.waitForTimeout(450);
    await page.locator('.navigation__mobile-panel .language-link').click(); await settle(page);
    assert.equal(new URL(page.url()).pathname, '/en/'); assert.equal(new URL(page.url()).hash, '#experience');
    await toggle.click(); await page.waitForTimeout(450); await page.mouse.click(380, 800); await page.waitForTimeout(350);
    assert.equal(await page.locator('.navigation__mobile').getAttribute('open'), null);
    return { distinctOpeningOpacities: opening, distinctClosingOpacities: closing, escape: 'focus restored', outside: 'dismissed', language: 'anchor retained' };
  });
  await context.close();
  await page.video().saveAs(resolve(out, 'video/motion-walkthrough.webm'));
  assert.ok((await stat(resolve(out, 'video/motion-walkthrough.webm'))).size > 0);
  report.video = 'video/motion-walkthrough.webm';

  const responsive = await browser.newContext();
  const view = await responsive.newPage(); watch(view);
  for (const locale of ['es', 'en']) {
    for (const [width, height] of [[1440, 900], [1024, 768], [820, 1180], [768, 1024], [390, 844], [320, 640]]) {
      await check(`${locale} ${width} responsive, content and fresh images`, async () => {
        await view.setViewportSize({ width, height }); await view.goto(origin + (locale === 'en' ? '/en/' : '/')); await settle(view);
        assert.equal(await view.locator('h1').count(), 1);
        assert.equal(await view.locator('.case-study, .other-project').count(), 6);
        assert.equal(await view.locator('.experience-list > li').count(), 6);
        assert.ok(await view.evaluate(() => document.documentElement.scrollWidth <= innerWidth));
        assert.ok(await view.locator('h1').evaluate(e => e.getBoundingClientRect().height / parseFloat(getComputedStyle(e).lineHeight) < 2.1));
        assert.ok(await view.locator('.hero__actions').evaluate(e => e.getBoundingClientRect().bottom <= innerHeight));
        await view.screenshot({ path: resolve(shots, `${locale}-${width}-hero.png`) });
        const images = await view.locator('.case-study__image-link img').evaluateAll(imgs => imgs.map(img => ({ src: img.src, loaded: img.complete && img.naturalWidth === 1280 })));
        assert.ok(images.every(img => img.src.endsWith('20261115.jpg')));
        await view.locator('#nutry').scrollIntoViewIfNeeded(); await view.waitForTimeout(300);
        await view.evaluate(() => window.scrollTo({ top: document.querySelector('#nutry').getBoundingClientRect().top + scrollY - 112, behavior: 'instant' }));
        await view.waitForTimeout(750);
        assert.ok(await view.locator('.case-study__image-link img').evaluateAll(imgs => imgs.every(img => img.complete && img.naturalWidth === 1280)));
        await view.screenshot({ path: resolve(shots, `${locale}-${width}-nutry.png`) });
        await view.evaluate(() => { for (const details of document.querySelectorAll('details')) details.open = true; });
        assert.ok(await view.evaluate(() => document.documentElement.scrollWidth <= innerWidth), 'expanded overflow');
        return { projects: 6, employments: 6, h1Lines: 2, images: images.map(img => img.src.split('/').at(-1)) };
      });
    }
  }
  await check('Keyboard focus stays visible with immediate scrolling', async () => {
    for (const [width, height] of [[1440, 900], [390, 844]]) {
      await view.setViewportSize({ width, height }); await view.goto(origin); await settle(view);
      let count = 0;
      for (let n = 0; n < 70; n++) {
        await view.keyboard.press('Tab'); await view.waitForTimeout(25);
        const focus = await view.evaluate(() => {
          const e = document.activeElement, r = e.getBoundingClientRect();
          return { body: e === document.body, skip: e.classList.contains('skip-link'), visible: r.bottom > 0 && r.top < innerHeight && r.width > 0, ring: getComputedStyle(e).outlineStyle, behavior: getComputedStyle(document.documentElement).scrollBehavior, focusVisible: e.matches(':focus-visible'), hasFocus: document.documentElement.matches(':has(:focus-visible)'), label: e.textContent.trim().slice(0, 70) };
        });
        if (focus.body || (focus.skip && count)) break;
        assert.ok(focus.visible, `offscreen focus: ${focus.label}`); assert.equal(focus.ring, 'solid'); assert.equal(focus.behavior, 'auto', JSON.stringify(focus)); count++;
      }
      assert.ok(count > 20);
    }
  });
  await check('Fresh direct section URLs land below the header in both locales', async () => {
    const destinations = [];
    for (const width of [320, 1440]) for (const locale of ['es', 'en']) for (const anchor of ['nutry', 'experience']) {
      await view.setViewportSize({ width, height: width === 320 ? 640 : 900 });
      await view.goto('about:blank');
      await view.goto(origin + (locale === 'en' ? '/en/' : '/') + '#' + anchor); await settle(view);
      const top = await view.locator('#' + anchor).evaluate(e => e.getBoundingClientRect().top);
      assert.ok(top >= 110 && top <= 114, `${locale} ${width} #${anchor}: ${top}`);
      destinations.push({ locale, width, anchor, top });
    }
    return { destinations };
  });
  await check('Reduced motion settles an interrupted disclosure and disables transforms', async () => {
    await view.setViewportSize({ width: 390, height: 844 }); await view.goto(origin); await settle(view);
    await view.locator('#poultry details > summary').click(); await view.waitForTimeout(70);
    await view.emulateMedia({ reducedMotion: 'reduce' }); await view.waitForTimeout(200);
    assert.ok(await view.locator('#poultry .disclosure-body').evaluate(e => !e.inert && !e.getAnimations().length && Math.abs(e.clientHeight - e.scrollHeight) <= 1));
    assert.equal(await view.locator('#poultry details > summary').getAttribute('aria-expanded'), null);
    await view.locator('#poultry details > summary').click();
    assert.equal(await view.locator('#poultry details').getAttribute('open'), null);
    assert.ok(await view.locator('.case-study__figure, .method-word, .hero__line').evaluateAll(es => es.every(e => getComputedStyle(e).transform === 'none' && +getComputedStyle(e).opacity === 1)));
    assert.equal(await view.evaluate(() => getComputedStyle(document.documentElement).scrollBehavior), 'auto');
    await view.emulateMedia({ reducedMotion: 'no-preference' }); await view.waitForTimeout(200);
  });
  await check('Contact copy success, failure recovery and CV download remain intact', async () => {
    await view.goto(origin); await settle(view);
    await view.evaluate(() => Object.defineProperty(navigator, 'clipboard', { configurable: true, value: { writeText: async text => { window.copiedEmail = text; } } }));
    await view.locator('.copy-email').click();
    assert.ok((await view.locator('.copy-status').innerText()).includes('copiado'));
    assert.equal(await view.evaluate(() => window.copiedEmail), 'david@dvillegas.cl');
    await view.evaluate(() => Object.defineProperty(navigator, 'clipboard', { configurable: true, value: { writeText: async () => { throw Error('denied'); } } }));
    await view.locator('.copy-email').click(); assert.ok((await view.locator('.copy-status').innerText()).length > 15);
    const cv = await view.locator('.hero__actions a[download]').getAttribute('href');
    assert.equal((await view.request.get(origin + '/' + cv)).status(), 200);
  });
  await responsive.close();
  const nativeContext = await browser.newContext({ javaScriptEnabled: false, viewport: { width: 390, height: 844 }, reducedMotion: 'reduce' });
  const native = await nativeContext.newPage();
  await check('Both prerendered locales and native disclosures work without JavaScript', async () => {
    for (const path of ['/', '/en/']) {
      await native.goto(origin + path);
      assert.equal(await native.locator('.case-study, .other-project').count(), 6);
      await native.locator('#poultry details > summary').click();
      assert.equal(await native.locator('#poultry details').getAttribute('open'), '');
      await native.locator('#poultry details > summary').click();
      assert.equal(await native.locator('#poultry details').getAttribute('open'), null);
    }
  });
  await nativeContext.close();
  for (const [name, engine] of [['firefox', firefox], ['webkit', webkit]]) {
    let other;
    try { other = await engine.launch({ headless: true }); }
    catch (error) { report.limitations.push(`${name}: ${error.message.split('\n')[0]}`); continue; }
    try {
      await check(`${name} native scroll and disclosure continuity`, async () => {
        const target = await other.newPage({ viewport: { width: 390, height: 844 } }); watch(target);
        await target.goto(origin); await settle(target);
        await target.locator('#poultry details > summary').scrollIntoViewIfNeeded(); await target.waitForTimeout(500);
        await sample(target, '#poultry .disclosure-body'); await target.locator('#poultry details > summary').click(); await target.waitForTimeout(900);
        const frames = await target.evaluate(() => window.motionFrames);
        assert.ok(new Set(frames.map(f => Math.round(f.height))).size >= 8);
        assert.ok(await target.locator('#poultry .disclosure-body').evaluate(e => Math.abs(e.clientHeight - e.scrollHeight) <= 1));
        await target.screenshot({ path: resolve(shots, `${name}-mobile.png`) });
        return { version: other.version(), distinctOpeningHeights: new Set(frames.map(f => Math.round(f.height))).size };
      });
    } finally { await other.close(); }
  }
  assert.deepEqual(report.runtimeErrors, [], 'runtime or CSP errors');
  report.result = 'passed';
} catch (error) {
  report.result = 'failed'; report.failure = error.stack;
  if (!page.isClosed()) await page.screenshot({ path: resolve(shots, 'failure.png') });
  console.error(error); process.exitCode = 1;
} finally {
  await writeFile(resolve(out, 'results.json'), JSON.stringify(report, null, 2));
  await browser.close(); await new Promise(accept => server.close(accept));
  console.log(JSON.stringify({ result: report.result, passed: report.checks.length, runtimeErrors: report.runtimeErrors, limitations: report.limitations }));
}
