import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import test from 'node:test';

// Regression: ISSUE-003 — the primary contact email used an NXDOMAIN host
// Found by /qa on 2026-08-04
// Report: .gstack/qa-reports/qa-report-127-0-0-1-2026-08-04.md
test('uses the supplied LinkedIn profile as the primary contact channel', async () => {
  const [component, es, en] = await Promise.all([
    readFile(new URL('../src/components/Contact.tsx', import.meta.url), 'utf8'),
    readFile(new URL('../src/i18n/locales/es.json', import.meta.url), 'utf8'),
    readFile(new URL('../src/i18n/locales/en.json', import.meta.url), 'utf8'),
  ]);

  assert.doesNotMatch(component, /davidmisael\.me|mailto:/iu);
  assert.equal((component.match(/https:\/\/www\.linkedin\.com\/in\/misaelv\//gu) ?? []).length, 1);
  assert.match(component, /contact\.primaryLabel/u);
  assert.match(es, /"primaryLabel": "Contactar por LinkedIn"/u);
  assert.match(en, /"primaryLabel": "Contact on LinkedIn"/u);
});
