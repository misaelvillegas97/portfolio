import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import test from 'node:test';

const hero = await readFile(new URL('../src/components/Hero.tsx', import.meta.url), 'utf8');
const styles = await readFile(new URL('../src/index.css', import.meta.url), 'utf8');

test('hero is person-first and exposes sectors as evidence', () => {
  assert.match(hero, /hero__subtitle/u);
  assert.match(hero, /hero__sectors/u);
  assert.match(hero, /hero__sectors-list/u);
  assert.match(hero, /hero__monogram/u);
  assert.doesNotMatch(hero, /SystemsMap|projects\.items|hero\.signals/u);
});

test('hero styles support the dossier and remove map selectors', () => {
  assert.match(styles, /\.hero__sectors\s*\{/u);
  assert.match(styles, /\.hero__monogram\s*\{/u);
  assert.doesNotMatch(styles, /\.systems-map|\.hero__signals|\.hero__identity/u);
});
