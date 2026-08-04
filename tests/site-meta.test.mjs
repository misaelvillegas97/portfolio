import assert from 'node:assert/strict';
import test from 'node:test';

import { buildHead, buildRobots, buildSitemap } from '../scripts/site-meta.mjs';

const readJsonLd = (head) => {
  const match = head.match(/<script type="application\/ld\+json">([^]*?)<\/script>/u);
  assert.ok(match, 'head must contain JSON-LD');
  return { json: JSON.parse(match[1]), source: match[1] };
};

test('buildHead emits localized absolute metadata without losing SITE_URL base path', () => {
  const head = buildHead({
    locale: 'es',
    siteUrl: 'https://portfolio.example/david&portfolio',
  });

  assert.match(head, /<title>David Misael Villegas Sandoval \| Ingeniero de Software Senior<\/title>/u);
  assert.match(head, /<link rel="canonical" href="https:\/\/portfolio\.example\/david&amp;portfolio\/">/u);
  assert.match(head, /hreflang="es-CL" href="https:\/\/portfolio\.example\/david&amp;portfolio\/"/u);
  assert.match(head, /hreflang="en" href="https:\/\/portfolio\.example\/david&amp;portfolio\/en\/"/u);
  assert.match(head, /hreflang="x-default" href="https:\/\/portfolio\.example\/david&amp;portfolio\/"/u);
  assert.match(head, /property="og:title"/u);
  assert.match(head, /name="twitter:card" content="summary"/u);
  assert.match(head, /href="https:\/\/portfolio\.example\/david&amp;portfolio\/favicon\.svg"/u);
  assert.match(head, /href="https:\/\/portfolio\.example\/david&amp;portfolio\/site\.webmanifest"/u);

  const { json, source } = readJsonLd(head);
  assert.equal(json['@type'], 'ProfilePage');
  assert.equal(json.url, 'https://portfolio.example/david&portfolio/');
  assert.equal(json.mainEntity['@type'], 'Person');
  assert.equal(json.mainEntity.name, 'David Misael Villegas Sandoval');
  assert.ok(json.mainEntity.alternateName);
  assert.equal(json.mainEntity.jobTitle, 'Ingeniero de Software Senior');
  assert.deepEqual(json.mainEntity.sameAs, [
    'https://www.linkedin.com/in/misaelv/',
    'https://github.com/misaelvillegas97',
    'https://www.instagram.com/*mslv.*/',
  ]);
  assert.equal(json.hasPart.length, 6);
  assert.ok(json.hasPart.every((project) => project['@type'] === 'CreativeWork'));
  assert.equal(json.hasPart.find((project) => project.name === 'Medisenda').url, undefined);
  assert.equal(json.hasPart.filter((project) => 'url' in project).length, 5);
  assert.match(source, /\\u0026/u, 'JSON-LD must encode markup-sensitive ampersands');
  assert.doesNotMatch(source, /<\/script/iu, 'JSON-LD data must not be able to close its script');
});

test('buildHead emits localized document-relative metadata when SITE_URL is absent', () => {
  const head = buildHead({ locale: 'en' });

  assert.match(head, /<title>David Misael Villegas Sandoval \| Senior Software Engineer<\/title>/u);
  assert.match(head, /<link rel="canonical" href="\.\/">/u);
  assert.match(head, /hreflang="es-CL" href="\.\.\/"/u);
  assert.match(head, /hreflang="en" href="\.\/"/u);
  assert.match(head, /hreflang="x-default" href="\.\.\/"/u);
  assert.match(head, /href="\.\.\/favicon\.svg"/u);
  assert.match(head, /href="\.\.\/site\.webmanifest"/u);
});

test('buildHead rejects unsafe SITE_URL protocols', () => {
  assert.throws(
    () => buildHead({ locale: 'es', siteUrl: 'javascript:alert(1)' }),
    /http or https/u,
  );
});

test('buildHead rejects unsupported locale names', () => {
  assert.throws(
    () => buildHead({ locale: 'toString' }),
    /Unsupported locale: toString/u,
  );
});

test('buildSitemap emits exactly two reciprocal localized URLs under an escaped base path', () => {
  const sitemap = buildSitemap('https://portfolio.example/base&path');

  assert.equal((sitemap.match(/<url>/gu) ?? []).length, 2);
  assert.match(sitemap, /<loc>https:\/\/portfolio\.example\/base&amp;path\/<\/loc>/u);
  assert.match(sitemap, /<loc>https:\/\/portfolio\.example\/base&amp;path\/en\/<\/loc>/u);
  assert.equal((sitemap.match(/hreflang="es-CL"/gu) ?? []).length, 2);
  assert.equal((sitemap.match(/hreflang="en"/gu) ?? []).length, 2);
  assert.equal((sitemap.match(/hreflang="x-default"/gu) ?? []).length, 2);
});

test('sitemap and robots only advertise an absolute sitemap when SITE_URL exists', () => {
  assert.equal(buildSitemap(), '');
  assert.doesNotMatch(buildRobots(), /Sitemap:/u);
  assert.match(
    buildRobots('https://portfolio.example/base'),
    /Sitemap: https:\/\/portfolio\.example\/base\/sitemap\.xml/u,
  );
});
