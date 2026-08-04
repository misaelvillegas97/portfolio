import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import test from 'node:test';

// Regression: ISSUE-001 — mobile navigation obscured the selected section
// Found by /qa on 2026-08-04
// Report: .gstack/qa-reports/qa-report-127-0-0-1-2026-08-04.md
test('closes the mobile details menu after selecting a section', async () => {
  const source = await readFile(new URL('../src/components/Navigation.tsx', import.meta.url), 'utf8');
  const mobilePanel = source.match(/<div className="navigation__mobile-panel">([^]*?)<\/div>/u)?.[1];

  assert.ok(mobilePanel, 'mobile navigation panel must exist');
  assert.match(
    mobilePanel,
    /onClick=\{\(event\) => event\.currentTarget\.closest\('details'\)\?\.removeAttribute\('open'\)\}/u,
  );
});

test('uses an explicit personal wordmark instead of an unexplained initialism', async () => {
  const source = await readFile(new URL('../src/components/Navigation.tsx', import.meta.url), 'utf8');

  assert.match(source, /navigation__wordmark/u);
  assert.match(source, /navigation__given[^>]*>David/u);
  assert.match(source, /navigation__family[^>]*>Villegas Sandoval/u);
  assert.doesNotMatch(source, /D\/VM/u);
});
