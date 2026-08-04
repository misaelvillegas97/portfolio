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
