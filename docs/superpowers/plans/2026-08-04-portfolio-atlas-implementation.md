# Person-first portfolio hero Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use `superpowers:executing-plans` task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Replace product-map hero with bilingual personal dossier that foregrounds David Misael Villegas and proves cross-industry experience without repeated or fictional claims.

**Architecture:** Existing React/i18next/SSR pipeline stays unchanged. Locales own hero copy and sector names; `Hero.tsx` renders identity plus an evidence sidebar. Delete `SystemsMap.tsx` because products already have their own section.

**Tech Stack:** React 18, TypeScript, i18next, Lucide React, native CSS, Vite 5, Node test runner.

---

### Task 1: Lock bilingual hero content

**Files:**
- Modify: `tests/content.test.mjs:119-125`
- Modify: `src/i18n/locales/es.json:16-37`
- Modify: `src/i18n/locales/en.json:16-37`

- [ ] **Step 1: Write failing content assertions**

Delete the two existing `hero.name` assertions in the factual identity test, then add this test:

```js
test('keeps the hero person-first and preserves cross-industry evidence', () => {
  assert.equal(es.hero.title, 'David Misael Villegas');
  assert.equal(en.hero.title, 'David Misael Villegas');
  assert.equal(es.hero.sectorsLabel, 'Experiencia sectorial');
  assert.equal(en.hero.sectorsLabel, 'Industry experience');
  assert.deepEqual(es.hero.sectors, ['Finanzas', 'Logística', 'Comunicación interna', 'Forestal', 'Telecomunicaciones']);
  assert.deepEqual(en.hero.sectors, ['Finance', 'Logistics', 'Internal communications', 'Forestry', 'Telecommunications']);
  assert.equal('signals' in es.hero, false);
  assert.equal('signals' in en.hero, false);
});
```

- [ ] **Step 2: Run RED**

Run: `node --test tests/content.test.mjs`

Expected: FAIL because current hero has a systems title and `signals`, not `sectors`.

- [ ] **Step 3: Replace the two `hero` objects**

Spanish source of truth:

```json
{"eyebrow":"Perfil / 001","title":"David Misael Villegas","role":"Ingeniero de Software Senior","subtitle":"Distintas industrias. Una misma forma de trabajar: entender la operación antes de diseñar el software.","description":"Construyo productos digitales claros, seguros y mantenibles; desde la arquitectura hasta su operación en producción.","sectorsLabel":"Experiencia sectorial","sectors":["Finanzas","Logística","Comunicación interna","Forestal","Telecomunicaciones"],"careerLabel":"Desde 2017","careerDescription":"Experiencia transferible entre contextos de negocio distintos.","primaryCta":"Ver productos","secondaryCta":"Descargar CV"}
```

English source of truth:

```json
{"eyebrow":"Profile / 001","title":"David Misael Villegas","role":"Senior Software Engineer","subtitle":"Different industries. One way of working: understand the operation before designing the software.","description":"I build clear, secure, maintainable digital products—from architecture through live operations.","sectorsLabel":"Industry experience","sectors":["Finance","Logistics","Internal communications","Forestry","Telecommunications"],"careerLabel":"Since 2017","careerDescription":"Transferable experience across distinct business contexts.","primaryCta":"View products","secondaryCta":"Download résumé"}
```

Keep `meta.title` and `scripts/site-meta.mjs` full name unchanged; they drive metadata and JSON-LD, not visible hero copy.

- [ ] **Step 4: Run GREEN and commit**

Run: `node --test tests/content.test.mjs`

Expected: PASS, including locale-shape and unsupported-metric checks.

```bash
git add tests/content.test.mjs src/i18n/locales/es.json src/i18n/locales/en.json
git commit -m "feat: center hero copy on cross-industry experience"
```

### Task 2: Render semantic dossier and remove false product topology

**Files:**
- Create: `tests/hero-person-first.test.mjs`
- Modify: `src/components/Hero.tsx`
- Delete: `src/components/SystemsMap.tsx`

- [ ] **Step 1: Write failing component-contract test**

Create this file:

```js
import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import test from 'node:test';

const hero = await readFile(new URL('../src/components/Hero.tsx', import.meta.url), 'utf8');

test('hero is person-first and exposes sectors as evidence', () => {
  assert.match(hero, /hero__subtitle/u);
  assert.match(hero, /hero__sectors/u);
  assert.match(hero, /hero__sectors-list/u);
  assert.match(hero, /hero__monogram/u);
  assert.doesNotMatch(hero, /SystemsMap|projects\.items|hero\.signals/u);
});
```

- [ ] **Step 2: Run RED**

Run: `node --test tests/hero-person-first.test.mjs`

Expected: FAIL because current component imports and renders `SystemsMap`.

- [ ] **Step 3: Replace `Hero.tsx` with the approved semantic structure**

Use `t("hero.sectors", { returnObjects: true }) as string[]`, retain existing CV URL branching and CTAs, and render this body shape:

```tsx
<div className="hero__copy">
  <p className="eyebrow"><span>00</span>{t("hero.eyebrow")}</p>
  <h1 id="hero-title">{t("hero.title")}</h1>
  <p className="hero__role">{t("hero.role")}</p>
  <p className="hero__subtitle">{t("hero.subtitle")}</p>
  <p className="hero__description">{t("hero.description")}</p>
  <div className="hero__actions">
    <a className="action-link action-link--primary" href="#projects">
      {t("hero.primaryCta")}<ArrowDownRight aria-hidden="true" size={19} />
    </a>
    <a
      className="action-link action-link--secondary"
      href={isEnglish ? "../assets/CV David Misael Villegas Sandoval.pdf" : "./assets/CV David Misael Villegas Sandoval.pdf"}
      download
    >
      <Download aria-hidden="true" size={18} />{t("hero.secondaryCta")}
    </a>
  </div>
  <span aria-hidden="true" className="hero__monogram">DM</span>
</div>
<aside className="hero__sectors" aria-labelledby="hero-sectors-title">
  <p id="hero-sectors-title" className="hero__sectors-title">{t("hero.sectorsLabel")}</p>
  <ol className="hero__sectors-list">
    {sectors.map((sector, index) => <li key={sector}><span>{String(index + 1).padStart(2, "0")}</span>{sector}</li>)}
  </ol>
  <p className="hero__sectors-note"><strong>{t("hero.careerLabel")}</strong>{t("hero.careerDescription")}</p>
</aside>
```

Delete `src/components/SystemsMap.tsx`; `rg` confirms `Hero.tsx` is its only live consumer.

- [ ] **Step 4: Run GREEN and commit**

Run: `node --test tests/hero-person-first.test.mjs tests/content.test.mjs`

Expected: PASS. H1 is personal, sidebar is labelled, list is semantic, map import is absent.

```bash
git add tests/hero-person-first.test.mjs src/components/Hero.tsx src/components/SystemsMap.tsx
git commit -m "feat: replace product map with personal dossier hero"
```

### Task 3: Apply responsive signature+dossier styles and verify output

**Files:**
- Modify: `tests/hero-person-first.test.mjs`
- Modify: `src/index.css:97-110,346-584,1105-1163,1211-1235,1306-1329`

- [ ] **Step 1: Extend test with style contract and run RED**

Append this test, then run `node --test tests/hero-person-first.test.mjs`:

```js
const styles = await readFile(new URL('../src/index.css', import.meta.url), 'utf8');
test('styles support dossier and remove map selectors', () => {
  assert.match(styles, /\.hero__sectors\s*\{/u);
  assert.match(styles, /\.hero__monogram\s*\{/u);
  assert.doesNotMatch(styles, /\.systems-map|\.hero__signals|\.hero__identity/u);
});
```

Expected: FAIL because map, signal and identity selectors still exist.

- [ ] **Step 2: Replace only hero-specific CSS**

Remove `.systems-map*`, `.hero__signals*`, `.hero__identity*` and their breakpoint overrides. Remove `.systems-map__legend` from the shared list reset. Add a 12-column dossier layout:

```css
.hero__layout { align-items: stretch; row-gap: clamp(2rem, 5vw, 4rem); }
.hero__copy { position: relative; z-index: 0; grid-column: 1 / 9; min-inline-size: 0; padding-block: clamp(1rem, 3vw, 3rem); }
.hero__copy h1 { max-inline-size: 8ch; font-family: Georgia, "Times New Roman", serif; font-size: clamp(3.8rem, 7.2vw, 7.85rem); font-weight: 500; letter-spacing: -0.08em; line-height: 0.8; }
.hero__role, .hero__sectors-title { color: var(--cobalt-deep); font-size: .78rem; font-weight: 800; letter-spacing: .1em; text-transform: uppercase; }
.hero__subtitle { max-inline-size: 35rem; margin-block-start: 1.75rem; font-family: Georgia, "Times New Roman", serif; font-size: clamp(1.35rem, 2.2vw, 1.9rem); line-height: 1.24; }
.hero__monogram { position: absolute; z-index: -1; right: 0; bottom: 0; color: rgb(185 55 34 / .15); font-family: Georgia, "Times New Roman", serif; font-size: clamp(7rem, 15vw, 13rem); pointer-events: none; }
.hero__sectors { display: flex; grid-column: 9 / -1; min-inline-size: 0; flex-direction: column; justify-content: space-between; border-inline-start: 1px solid var(--line-strong); background: rgb(229 222 206 / .45); }
.hero__sectors-title, .hero__sectors-note { padding: 1.25rem clamp(1rem, 2vw, 1.7rem); }
.hero__sectors-list { margin: 0; padding: 0; list-style: none; }
.hero__sectors-list li { display: grid; grid-template-columns: 2rem 1fr; gap: .5rem; padding: 1rem clamp(1rem, 2vw, 1.7rem); border-block-start: 1px solid var(--line); font-weight: 750; }
.hero__sectors-note { margin: 0; border-block-start: 1px solid var(--line); color: var(--ink-soft); font-family: Georgia, "Times New Roman", serif; line-height: 1.45; }
.hero__sectors-note strong { display: block; margin-block-end: .5rem; color: var(--ink); font-family: inherit; font-size: .78rem; letter-spacing: .08em; text-transform: uppercase; }
@media (max-width: 62rem) { .hero__copy, .hero__sectors { grid-column: 1 / -1; } .hero__sectors { border-block-start: 1px solid var(--line-strong); border-inline-start: 0; } }
@media (max-width: 38rem) { .hero__copy h1 { font-size: clamp(3.65rem, 18vw, 5.3rem); } }
```

Keep existing CSS tokens, `text-wrap: balance`/`pretty`, CTAs, focus styles and `prefers-reduced-motion` rules. Use native `<aside>` and `<ol>` rather than ARIA roles; `aria-hidden` stays only on the decorative monogram. No package, font download, canvas or WebGL change, so no font-loading fallback work is needed.

- [ ] **Step 3: Run GREEN, production build and required browser QA**

Run:

```bash
node --test tests/hero-person-first.test.mjs
npm test
npm run typecheck
npm run lint
$env:SITE_URL="https://portfolio.example/david"; npm run build
npm audit --omit=dev --audit-level=high
```

Then run required `/qa` against `http://localhost:5173/` and `/en/` at 1440×900, 375×812 and 320×568. Confirm: name H1 before role, subtitle does not list sectors, sidebar lists five sectors, no map/connections, no horizontal overflow, working CTAs/language links, clean console and reduced-motion visibility.

- [ ] **Step 4: Commit styling and leave generated output ignored**

```bash
git add tests/hero-person-first.test.mjs src/index.css
git commit -m "style: compose responsive personal dossier hero"
git diff --check
git status --short
```

Expected: source commits only; `dist/`, `dist-ssr/`, `.gstack/` and `.superpowers/` remain ignored.
