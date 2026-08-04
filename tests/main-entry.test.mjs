import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import test from 'node:test';

test('ignores the dev marker comment and only hydrates prerendered elements', async () => {
  const [source, template] = await Promise.all([
    readFile(new URL('../src/main.tsx', import.meta.url), 'utf8'),
    readFile(new URL('../index.html', import.meta.url), 'utf8'),
  ]);
  const devRoot = template.match(/<div id="root">([^]*?)<\/div>/u);

  assert.equal(devRoot?.[1], '<!--app-html-->');
  assert.match(source, /import \{ createRoot, hydrateRoot \} from 'react-dom\/client'/u);
  assert.match(source, /root\.childElementCount > 0/u);
  assert.match(source, /window\.location\.pathname/u);
  assert.match(source, /\^\\\/en\(\?:\\\/\|\$\)/u);
  assert.match(source, /document\.documentElement\.lang = locale === 'en' \? 'en' : 'es-CL'/u);
  assert.doesNotMatch(source, /root\.hasChildNodes\(\)/u);
  assert.match(source, /hydrateRoot\(root,/u);
  assert.match(source, /createRoot\(root\)\.render\(/u);
});
