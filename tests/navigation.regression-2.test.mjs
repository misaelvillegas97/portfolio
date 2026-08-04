import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import test from 'node:test';

// Regression: ISSUE-002 — deferred section estimates broke mobile deep-link positions
// Found by /qa on 2026-08-04
// Report: .gstack/qa-reports/qa-report-127-0-0-1-2026-08-04.md
test('keeps anchored sections in the normal layout flow', async () => {
  const css = await readFile(new URL('../src/index.css', import.meta.url), 'utf8');
  const deferredSection = css.match(/\.deferred-section\s*\{([^]*?)\}/u)?.[1] ?? '';

  assert.doesNotMatch(deferredSection, /content-visibility|contain-intrinsic/iu);
});
