import assert from 'node:assert/strict';
import { mkdtemp, mkdir, readFile, rm, unlink, writeFile } from 'node:fs/promises';
import { tmpdir } from 'node:os';
import { join } from 'node:path';
import test from 'node:test';

import { verifyBuild } from '../scripts/verify-build.mjs';

const projectTitles = ['Poultry', 'WWT', 'Trackly', 'Nuptia', 'Nutry', 'Medisenda'];
const productionUrl = 'https://portfolio.example/david';

function buildHtml(locale, siteUrl) {
  const english = locale === 'en';
  const base = siteUrl ? `${siteUrl}/` : undefined;
  const routes = base
    ? { es: base, en: `${base}en/` }
    : english
      ? { es: '../', en: './' }
      : { es: './', en: './en/' };
  const assetPrefix = english ? '../assets/' : './assets/';
  const publicPrefix = base ?? (english ? '../' : './');
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'ProfilePage',
    mainEntity: { '@type': 'Person', name: 'David Misael Villegas Sandoval' },
  };

  return `<!doctype html>
<html lang="${english ? 'en' : 'es-CL'}">
  <head>
    <link rel="canonical" href="${routes[locale]}">
    <link rel="alternate" hreflang="es-CL" href="${routes.es}">
    <link rel="alternate" hreflang="en" href="${routes.en}">
    <link rel="alternate" hreflang="x-default" href="${routes.es}">
    <link rel="icon" href="${publicPrefix}favicon.svg" type="image/svg+xml">
    <link rel="manifest" href="${publicPrefix}site.webmanifest">
    <link rel="stylesheet" href="${assetPrefix}app.css">
    <script type="application/ld+json">${JSON.stringify(jsonLd)}</script>
    <script type="module" src="${assetPrefix}app.js"></script>
  </head>
  <body>
    <main><h1>Portfolio</h1>${projectTitles.map((title) => `<article>${title}</article>`).join('')}</main>
  </body>
</html>`;
}

async function createBuild(t, { siteUrl } = {}) {
  const distDir = await mkdtemp(join(tmpdir(), 'portfolio-build-'));
  const enDir = join(distDir, 'en');
  const assetsDir = join(distDir, 'assets');
  await Promise.all([mkdir(enDir), mkdir(assetsDir)]);
  await Promise.all([
    writeFile(join(distDir, 'index.html'), buildHtml('es', siteUrl)),
    writeFile(join(enDir, 'index.html'), buildHtml('en', siteUrl)),
    writeFile(join(assetsDir, 'app.js'), 'console.log("portfolio")'),
    writeFile(join(assetsDir, 'app.css'), 'body{}'),
    writeFile(join(distDir, 'favicon.svg'), '<svg xmlns="http://www.w3.org/2000/svg"/>'),
    writeFile(join(distDir, 'site.webmanifest'), '{}'),
    writeFile(join(distDir, 'robots.txt'), 'User-agent: *\nAllow: /\n'),
    ...(siteUrl ? [writeFile(join(distDir, 'sitemap.xml'), `${siteUrl}/\n${siteUrl}/en/`)] : []),
  ]);
  t.after(() => rm(distDir, { recursive: true, force: true }));
  return distDir;
}

async function replaceIn(path, from, to) {
  const source = await readFile(path, 'utf8');
  await writeFile(path, source.replace(from, to));
}

test('accepts complete bilingual output without requiring a sitemap when SITE_URL is absent', async (t) => {
  const distDir = await createBuild(t);
  await assert.doesNotReject(verifyBuild({ distDir }));
});

test('accepts complete output with absolute metadata and sitemap when SITE_URL is configured', async (t) => {
  const distDir = await createBuild(t, { siteUrl: productionUrl });
  await assert.doesNotReject(verifyBuild({ distDir, siteUrl: productionUrl }));
});

test('rejects incomplete or malformed production output', async (t) => {
  const cases = [
    {
      name: 'English lang',
      expected: /lang="en"/u,
      mutate: ({ enHtml }) => replaceIn(enHtml, 'lang="en"', 'lang="es-CL"'),
    },
    {
      name: 'single h1',
      expected: /exactly one h1/iu,
      mutate: ({ esHtml }) => replaceIn(esHtml, '</h1>', '</h1><h1>Duplicate</h1>'),
    },
    {
      name: 'six rendered projects',
      expected: /Medisenda/u,
      mutate: ({ esHtml }) => replaceIn(esHtml, '<article>Medisenda</article>', ''),
    },
    {
      name: 'canonical',
      expected: /canonical/iu,
      mutate: ({ esHtml }) => replaceIn(esHtml, '<link rel="canonical" href="./">', ''),
    },
    {
      name: 'hreflang',
      expected: /hreflang="en"/iu,
      mutate: ({ esHtml }) => replaceIn(esHtml, '<link rel="alternate" hreflang="en" href="./en/">', ''),
    },
    {
      name: 'ProfilePage and Person JSON-LD',
      expected: /Person/u,
      mutate: ({ esHtml }) => replaceIn(esHtml, '"@type":"Person"', '"@type":"Organization"'),
    },
    {
      name: 'prerender markers',
      expected: /prerender marker/iu,
      mutate: ({ esHtml }) => replaceIn(esHtml, '<main>', '<main><!--app-html-->'),
    },
    {
      name: 'referenced script asset',
      expected: /app\.js/u,
      mutate: ({ distDir }) => unlink(join(distDir, 'assets', 'app.js')),
    },
    {
      name: 'favicon',
      expected: /favicon/u,
      mutate: ({ distDir }) => unlink(join(distDir, 'favicon.svg')),
    },
    {
      name: 'manifest',
      expected: /manifest/u,
      mutate: ({ distDir }) => unlink(join(distDir, 'site.webmanifest')),
    },
    {
      name: 'robots',
      expected: /robots\.txt/u,
      mutate: ({ distDir }) => unlink(join(distDir, 'robots.txt')),
    },
  ];

  for (const scenario of cases) {
    await t.test(scenario.name, async (subtest) => {
      const distDir = await createBuild(subtest);
      await scenario.mutate({
        distDir,
        esHtml: join(distDir, 'index.html'),
        enHtml: join(distDir, 'en', 'index.html'),
      });
      await assert.rejects(verifyBuild({ distDir }), scenario.expected);
    });
  }
});

test('requires sitemap only when SITE_URL is configured', async (t) => {
  const distDir = await createBuild(t, { siteUrl: productionUrl });
  await unlink(join(distDir, 'sitemap.xml'));
  await assert.rejects(
    verifyBuild({ distDir, siteUrl: productionUrl }),
    /sitemap\.xml/u,
  );
});
