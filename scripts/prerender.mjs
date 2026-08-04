import { mkdir, readFile, writeFile } from 'node:fs/promises';

import { DEFAULT_SITE_URL, buildHead, buildLlms, buildRobots, buildSitemap } from './site-meta.mjs';

const distUrl = new URL('../dist/', import.meta.url);
const template = await readFile(new URL('index.html', distUrl), 'utf8');
const { render } = await import(new URL('../dist-ssr/entry-server.js', import.meta.url));
const siteUrl = process.env.SITE_URL?.trim() || DEFAULT_SITE_URL;

if (!template.includes('<!--seo-head-->') || !template.includes('<!--app-html-->')) {
  throw new Error('Built index.html is missing prerender markers');
}

for (const locale of ['es', 'en']) {
  const html = template
    .replace(/<html lang="[^"]*">/u, `<html lang="${locale === 'es' ? 'es-CL' : 'en'}">`)
    .replace('<!--seo-head-->', buildHead({ locale, siteUrl }))
    .replace('<!--app-html-->', await render(locale));
  const localizedHtml = locale === 'en'
    ? html.replace(/([="'])\.\/assets\//gu, '$1../assets/')
    : html;
  const outputDirectory = locale === 'es' ? distUrl : new URL('en/', distUrl);

  await mkdir(outputDirectory, { recursive: true });
  await writeFile(new URL('index.html', outputDirectory), localizedHtml, 'utf8');
}

await writeFile(new URL('robots.txt', distUrl), buildRobots(siteUrl), 'utf8');
await writeFile(new URL('llms.txt', distUrl), buildLlms(siteUrl), 'utf8');

const sitemap = buildSitemap(siteUrl);
await writeFile(new URL('sitemap.xml', distUrl), sitemap, 'utf8');
