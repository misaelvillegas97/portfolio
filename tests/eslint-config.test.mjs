import assert from 'node:assert/strict';
import test from 'node:test';

import config from '../eslint.config.js';

test('keeps ESLint core and TypeScript recommended rules enabled', () => {
  const sourceConfig = config.find((entry) => entry.files?.includes('**/*.{ts,tsx}'));

  assert.equal(sourceConfig?.rules?.['no-debugger'], 'error');
  assert.equal(sourceConfig?.rules?.['@typescript-eslint/no-explicit-any'], 'error');
});
