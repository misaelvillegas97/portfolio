import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import test from 'node:test';

const loadLocale = async (locale) =>
  JSON.parse(await readFile(new URL(`../src/i18n/locales/${locale}.json`, import.meta.url), 'utf8'));

const [es, en] = await Promise.all(['es', 'en'].map(loadLocale));
const sections = [
  'meta',
  'navigation',
  'hero',
  'principles',
  'projects',
  'experience',
  'capabilities',
  'contact',
];
const productKeys = ['poultry', 'wwt', 'trackly', 'nuptia', 'nutry', 'medisenda'];
const projectUrls = {
  poultry: 'https://poultry.cl',
  wwt: 'https://wwt.devly.cl',
  trackly: 'https://trackly.cl',
  nuptia: 'https://nuptia.cl',
  nutry: 'https://nutry.cl',
};
const experience = {
  blaze: ['2024-11', 'present'],
  polodev: ['2024-02', 'present'],
  falabella: ['2021-09', '2023-12'],
  nttdata: ['2019-09', '2021-09'],
  carpetres: ['2018-07', '2019-09'],
  innoapsion: ['2017-07', '2018-01'],
};
const technologies = [
  'Angular',
  'TypeScript',
  'NestJS',
  'Node.js',
  'Java / Spring Boot',
  'AWS',
  'PostgreSQL',
  'Docker',
  'CI/CD',
  'SSR',
];
const unsupportedMetricPatterns = [
  /\b\d+(?:[.,]\d+)?\s*%/iu,
  /\b(?:million(?:s)?|millón|millones)\b/iu,
  /(?:\b\d+(?:[.,]\d+)?\s*(?:x\b|×)|(?:\bx|×)\s*\d+(?:[.,]\d+)?\b)/iu,
  /\b\d+(?:[.,\s]\d+)*(?:\s*k)?\+?(?:\s+(?:active|concurrent|monthly|activos?|concurrentes?|mensuales?))*\s+(?:users?|customers?|usuarios?|clientes?)\b/iu,
  /\$\s*\d+(?:[.,]\d+)?\s*m\b/iu,
];

const containsUnsupportedMetric = (value) =>
  unsupportedMetricPatterns.some((pattern) => pattern.test(value));

function collectStrings(value) {
  if (typeof value === 'string') return [value];
  if (Array.isArray(value)) return value.flatMap(collectStrings);
  if (value && typeof value === 'object') return Object.values(value).flatMap(collectStrings);
  return [];
}

function assertSameShape(left, right, path = 'locale') {
  assert.equal(Array.isArray(left), Array.isArray(right), `${path} must use the same value type`);

  if (Array.isArray(left)) {
    assert.equal(left.length, right.length, `${path} arrays must have equal length`);
    left.forEach((value, index) => assertSameShape(value, right[index], `${path}[${index}]`));
    return;
  }

  if (left && typeof left === 'object') {
    assert.deepEqual(Object.keys(left), Object.keys(right), `${path} must expose identical keys`);
    Object.keys(left).forEach((key) => assertSameShape(left[key], right[key], `${path}.${key}`));
    return;
  }

  assert.equal(typeof left, typeof right, `${path} must use the same value type`);
}

test('defines the complete bilingual content sections with matching shape', () => {
  assert.deepEqual(Object.keys(es), sections);
  assert.deepEqual(Object.keys(en), sections);
  assertSameShape(es, en);
});

test('defines six products in contractual order and only active URLs', () => {
  assert.ok(es.projects.items, 'Spanish locale must define projects.items');
  assert.ok(en.projects.items, 'English locale must define projects.items');
  assert.deepEqual(Object.keys(es.projects.items), productKeys);
  assert.deepEqual(Object.keys(en.projects.items), productKeys);

  for (const [key, url] of Object.entries(projectUrls)) {
    assert.equal(es.projects.items[key].url, url);
    assert.equal(en.projects.items[key].url, url);
  }

  assert.equal(es.projects.items.medisenda.status, 'En construcción');
  assert.equal(en.projects.items.medisenda.status, 'Building');
  assert.equal('url' in es.projects.items.medisenda, false);
  assert.equal('url' in en.projects.items.medisenda, false);
});

test('keeps identity, career dates, and supported stack factual', () => {
  assert.equal(es.hero.name, 'David Misael Villegas Sandoval');
  assert.equal(en.hero.name, 'David Misael Villegas Sandoval');
  assert.equal(es.hero.role, 'Ingeniero de Software Senior');
  assert.equal(en.hero.role, 'Senior Software Engineer');

  for (const [key, [start, end]] of Object.entries(experience)) {
    assert.deepEqual(Object.keys(es.experience.items[key].period), ['start', 'end']);
    assert.deepEqual(Object.keys(en.experience.items[key].period), ['start', 'end']);
    assert.equal(es.experience.items[key].period.start, start);
    assert.equal(es.experience.items[key].period.end, end);
    assert.equal(en.experience.items[key].period.start, start);
    assert.equal(en.experience.items[key].period.end, end);
  }

  assert.deepEqual(es.capabilities.technologies, technologies);
  assert.deepEqual(en.capabilities.technologies, technologies);
});

test('detects unsupported metrics without rejecting factual context', () => {
  const unsupported = [
    'Improved conversion by 40%',
    'Used by one million customers',
    'Adoptado por un millón de usuarios',
    'Delivered 3x growth',
    'Reached 10× growth',
    'Crecimiento x4',
    'Serving 1,000 concurrent users',
    'Serving 1 000 users',
    'Used by 25k customers',
    'Más de 100+ clientes',
    'Atiende a 250 clientes',
    '$12M in revenue',
  ];
  const allowed = ['Since 2017', '6 products', 'Angular 18', 'Node.js 22'];

  unsupported.forEach((claim) => assert.equal(containsUnsupportedMetric(claim), true, claim));
  allowed.forEach((fact) => assert.equal(containsUnsupportedMetric(fact), false, fact));
});

test('contains complete copy without unsupported numeric claims', () => {

  for (const [locale, content] of Object.entries({ es, en })) {
    const unsupported = collectStrings(content).find(containsUnsupportedMetric);
    const serialized = JSON.stringify(content);
    assert.equal(unsupported, undefined, `${locale} contains an unsupported metric: ${unsupported}`);
    assert.doesNotMatch(serialized, /""/, `${locale} contains empty copy`);
  }
});
