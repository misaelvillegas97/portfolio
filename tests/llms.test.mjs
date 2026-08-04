import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import test from 'node:test';

import { buildLlms } from '../scripts/site-meta.mjs';

const llms = await readFile(new URL('../public/llms.txt', import.meta.url), 'utf8');

test('publishes factual machine-readable portfolio context', () => {
  assert.equal(llms, buildLlms());
  assert.match(llms, /^# David Villegas Sandoval$/mu);
  assert.match(llms, /https:\/\/dvillegas\.cl\//u);
  assert.match(llms, /https:\/\/dvillegas\.cl\/en\//u);
  assert.match(llms, /https:\/\/www\.linkedin\.com\/in\/misaelv\//u);
  assert.match(llms, /https:\/\/github\.com\/misaelvillegas97/u);
  assert.match(llms, /React\.js/u);
  assert.match(llms, /digital entertainment/u);
  assert.match(llms, /Poultry/u);
  assert.match(llms, /Medisenda/u);
});
