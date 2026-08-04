import assert from 'node:assert/strict';
import { mkdtemp, mkdir, readFile, rm, unlink, writeFile } from 'node:fs/promises';
import { tmpdir } from 'node:os';
import { join } from 'node:path';
import test from 'node:test';

import { DEFAULT_SITE_URL } from '../scripts/site-meta.mjs';
import { verifyBuild } from '../scripts/verify-build.mjs';

const projectTitles = ['Poultry', 'WWT', 'Trackly', 'Nuptia', 'Nutry', 'Medisenda'];
const productionUrl = 'https://portfolio.example/david';
const defaultProductionUrl = DEFAULT_SITE_URL;

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
  const socialImage = `${publicPrefix}${english ? 'og-image-en.png' : 'og-image.png'}`;
  const personId = `${routes.es}#person`;
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'ProfilePage',
    mainEntity: { '@id': personId, '@type': 'Person', name: 'David Misael Villegas Sandoval' },
    hasPart: projectTitles.map((name) => ({
      '@type': 'CreativeWork',
      name,
      creator: { '@id': personId },
    })),
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
    <meta property="og:image" content="${socialImage}">
    <meta property="og:image:width" content="1200">
    <meta property="og:image:height" content="630">
    <meta property="og:image:alt" content="${english ? 'Preview of David Misael Villegas Sandoval\'s portfolio' : 'Vista previa del portafolio de David Misael Villegas Sandoval'}">
    <meta name="twitter:card" content="summary_large_image">
    <meta name="twitter:image" content="${socialImage}">
    <meta name="twitter:image:alt" content="${english ? 'Preview of David Misael Villegas Sandoval\'s portfolio' : 'Vista previa del portafolio de David Misael Villegas Sandoval'}">
    <script type="application/ld+json">${JSON.stringify(jsonLd)}</script>
    <script type="module" src="${assetPrefix}app.js"></script>
  </head>
  <body>
    <main><h1>Portfolio</h1>${projectTitles.map((title) => `<article>${title}</article>`).join('')}</main>
  </body>
</html>`;
}

async function createBuild(t, { siteUrl = defaultProductionUrl } = {}) {
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
    writeFile(join(distDir, 'og-image.png'), 'png'),
    writeFile(join(distDir, 'og-image-en.png'), 'png-en'),
    writeFile(join(distDir, 'robots.txt'), `User-agent: *\nAllow: /\nSitemap: ${siteUrl}/sitemap.xml\n`),
    writeFile(join(distDir, 'sitemap.xml'), `${siteUrl}/\n${siteUrl}/en/`),
    writeFile(join(distDir, 'llms.txt'), `# Portfolio\n${siteUrl}/\n${siteUrl}/en/\n`),
  ]);
  t.after(() => rm(distDir, { recursive: true, force: true }));
  return distDir;
}

async function replaceIn(path, from, to) {
  const source = await readFile(path, 'utf8');
  await writeFile(path, source.replace(from, to));
}

test('accepts complete bilingual production output with the canonical default', async (t) => {
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
      mutate: ({ esHtml }) => replaceIn(esHtml, `<link rel="canonical" href="${defaultProductionUrl}/">`, ''),
    },
    {
      name: 'hreflang',
      expected: /hreflang="en"/iu,
      mutate: ({ esHtml }) => replaceIn(esHtml, `<link rel="alternate" hreflang="en" href="${defaultProductionUrl}/en/">`, ''),
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
      name: 'non-empty Spanish social image',
      expected: /og-image\.png/u,
      mutate: ({ distDir }) => writeFile(join(distDir, 'og-image.png'), ''),
    },
    {
      name: 'English social image',
      expected: /og-image-en\.png/u,
      mutate: ({ distDir }) => unlink(join(distDir, 'og-image-en.png')),
    },
    {
      name: 'coherent social image tags',
      expected: /twitter:image/iu,
      mutate: ({ esHtml }) => replaceIn(
        esHtml,
        `<meta name="twitter:image" content="${defaultProductionUrl}/og-image.png">`,
        `<meta name="twitter:image" content="${defaultProductionUrl}/og-image-en.png">`,
      ),
    },
    {
      name: 'localized Twitter image alt',
      expected: /twitter:image:alt/iu,
      mutate: ({ enHtml }) => replaceIn(
        enHtml,
        '<meta name="twitter:image:alt" content="Preview of David Misael Villegas Sandoval\'s portfolio">',
        '',
      ),
    },
    {
      name: 'robots',
      expected: /robots\.txt/u,
      mutate: ({ distDir }) => unlink(join(distDir, 'robots.txt')),
    },
    {
      name: 'LLM context',
      expected: /llms\.txt/u,
      mutate: ({ distDir }) => unlink(join(distDir, 'llms.txt')),
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

test('requires sitemap for every production build', async (t) => {
  const distDir = await createBuild(t);
  await unlink(join(distDir, 'sitemap.xml'));
  await assert.rejects(
    verifyBuild({ distDir }),
    /sitemap\.xml/u,
  );
});
