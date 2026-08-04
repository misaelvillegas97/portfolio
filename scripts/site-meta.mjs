import { readFileSync } from 'node:fs';

export const DEFAULT_SITE_URL = 'https://dvillegas.cl';

const localeContent = Object.fromEntries(
  ['es', 'en'].map((locale) => [
    locale,
    JSON.parse(
      readFileSync(new URL(`../src/i18n/locales/${locale}.json`, import.meta.url), 'utf8'),
    ),
  ]),
);

const localeCodes = { es: 'es-CL', en: 'en' };
const socialProfiles = [
  'https://www.linkedin.com/in/misaelv/',
  'https://github.com/misaelvillegas97',
  'https://www.instagram.com/*mslv.*/',
];

const escapeMarkup = (value) => String(value)
  .replaceAll('&', '&amp;')
  .replaceAll('<', '&lt;')
  .replaceAll('>', '&gt;')
  .replaceAll('"', '&quot;')
  .replaceAll("'", '&#39;');

const safeJson = (value) => JSON.stringify(value).replace(
  /[<>&\u2028\u2029]/gu,
  (character) => `\\u${character.charCodeAt(0).toString(16).padStart(4, '0')}`,
);

function normalizeSiteUrl(siteUrl) {
  if (!siteUrl) return undefined;

  let base;
  try {
    base = new URL(siteUrl);
  } catch {
    throw new TypeError('SITE_URL must be a valid http or https URL');
  }

  if (!['http:', 'https:'].includes(base.protocol)) {
    throw new TypeError('SITE_URL must use http or https');
  }

  base.username = '';
  base.password = '';
  base.search = '';
  base.hash = '';
  base.pathname = `${base.pathname.replace(/\/+$/u, '')}/`;
  return base;
}

function absoluteRoutes(siteUrl) {
  const base = normalizeSiteUrl(siteUrl);
  if (!base) return undefined;

  return {
    base,
    es: new URL('./', base).href,
    en: new URL('en/', base).href,
  };
}

function relativeRoutes(locale) {
  return locale === 'en'
    ? { es: '../', en: './' }
    : { es: './', en: './en/' };
}

function requireLocale(locale) {
  if (!Object.hasOwn(localeContent, locale)) throw new TypeError(`Unsupported locale: ${locale}`);
  return localeContent[locale];
}

export function buildHead({ locale, siteUrl } = {}) {
  const content = requireLocale(locale);
  const absolute = absoluteRoutes(siteUrl);
  const routes = absolute ?? relativeRoutes(locale);
  const canonical = routes[locale];
  const asset = (name) => absolute
    ? new URL(name, absolute.base).href
    : `${locale === 'en' ? '../' : './'}${name}`;
  const personId = `${routes.es}#person`;
  const socialImage = asset(locale === 'en' ? 'og-image-en.png' : 'og-image.png');
  const socialImageAlt = locale === 'en'
    ? "Preview of David Misael Villegas Sandoval's portfolio"
    : 'Vista previa del portafolio de David Misael Villegas Sandoval';
  const projects = Object.values(content.projects.items).map((project) => ({
    '@type': 'CreativeWork',
    name: project.title,
    description: project.tagline,
    creator: { '@id': personId },
    ...(project.url ? { url: project.url } : {}),
  }));
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'ProfilePage',
    inLanguage: localeCodes[locale],
    name: content.meta.title,
    description: content.meta.description,
    url: canonical,
    mainEntity: {
      '@id': personId,
      '@type': 'Person',
      name: 'David Misael Villegas Sandoval',
      alternateName: 'Misael Villegas',
      jobTitle: content.hero.role,
      sameAs: socialProfiles,
    },
    hasPart: projects,
  };
  const tags = [
    `<title>${escapeMarkup(content.meta.title)}</title>`,
    `<meta name="description" content="${escapeMarkup(content.meta.description)}">`,
    `<link rel="canonical" href="${escapeMarkup(canonical)}">`,
    `<link rel="alternate" hreflang="es-CL" href="${escapeMarkup(routes.es)}">`,
    `<link rel="alternate" hreflang="en" href="${escapeMarkup(routes.en)}">`,
    `<link rel="alternate" hreflang="x-default" href="${escapeMarkup(routes.es)}">`,
    `<meta property="og:type" content="profile">`,
    `<meta property="og:locale" content="${locale === 'es' ? 'es_CL' : 'en_US'}">`,
    `<meta property="og:title" content="${escapeMarkup(content.meta.title)}">`,
    `<meta property="og:description" content="${escapeMarkup(content.meta.description)}">`,
    `<meta property="og:url" content="${escapeMarkup(canonical)}">`,
    `<meta property="og:image" content="${escapeMarkup(socialImage)}">`,
    `<meta property="og:image:width" content="1200">`,
    `<meta property="og:image:height" content="630">`,
    `<meta property="og:image:alt" content="${escapeMarkup(socialImageAlt)}">`,
    `<meta name="twitter:card" content="summary_large_image">`,
    `<meta name="twitter:title" content="${escapeMarkup(content.meta.title)}">`,
    `<meta name="twitter:description" content="${escapeMarkup(content.meta.description)}">`,
    `<meta name="twitter:image" content="${escapeMarkup(socialImage)}">`,
    `<meta name="twitter:image:alt" content="${escapeMarkup(socialImageAlt)}">`,
    `<link rel="icon" href="${escapeMarkup(asset('favicon.svg'))}" type="image/svg+xml">`,
    `<link rel="manifest" href="${escapeMarkup(asset('site.webmanifest'))}">`,
    `<script type="application/ld+json">${safeJson(jsonLd)}</script>`,
  ];

  return tags.join('\n    ');
}

export function buildSitemap(siteUrl) {
  const routes = absoluteRoutes(siteUrl);
  if (!routes) return '';

  const alternates = [
    ['es-CL', routes.es],
    ['en', routes.en],
    ['x-default', routes.es],
  ];
  const urls = [routes.es, routes.en].map((url) => [
    '  <url>',
    `    <loc>${escapeMarkup(url)}</loc>`,
    ...alternates.map(([hreflang, href]) =>
      `    <xhtml:link rel="alternate" hreflang="${hreflang}" href="${escapeMarkup(href)}" />`),
    '  </url>',
  ].join('\n'));

  return [
    '<?xml version="1.0" encoding="UTF-8"?>',
    '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml">',
    ...urls,
    '</urlset>',
    '',
  ].join('\n');
}

export function buildLlms(siteUrl = DEFAULT_SITE_URL) {
  const routes = absoluteRoutes(siteUrl);
  if (!routes) throw new TypeError('SITE_URL is required to build llms.txt');

  const products = Object.values(localeContent.es.projects.items)
    .map((project) => `- [${project.title}](${project.url ?? 'https://medisenda.cl'}): ${project.tagline}`);

  return [
    '# David Villegas Sandoval',
    '',
    '> Bilingual portfolio for David Villegas Sandoval, Senior Software Engineer. Focused on full-stack products, architecture, and production operations.',
    '',
    '## Canonical pages',
    `- [Spanish portfolio](${routes.es})`,
    `- [English portfolio](${routes.en})`,
    '',
    '## Professional focus',
    '- Full-stack engineering with Angular, NestJS, Node.js, Java / Spring Boot, PostgreSQL, AWS, Docker, CI/CD, and SSR.',
    '- Experience across finance, logistics, internal communications, forestry, telecommunications, retail, payments, and gaming.',
    '- Builds clear, secure, maintainable digital products from architecture through production operation.',
    '',
    '## Selected products',
    ...products,
    '',
    '## Professional profiles',
    '- [LinkedIn](https://www.linkedin.com/in/misaelv/)',
    '- [GitHub](https://github.com/misaelvillegas97)',
    '',
    '## Crawl resources',
    `- [Sitemap](${new URL('sitemap.xml', routes.base).href})`,
    `- [Robots](${new URL('robots.txt', routes.base).href})`,
    '',
  ].join('\n');
}

export function buildRobots(siteUrl) {
  const routes = absoluteRoutes(siteUrl);
  return [
    'User-agent: *',
    'Allow: /',
    ...(routes ? [`Sitemap: ${new URL('sitemap.xml', routes.base).href}`] : []),
    '',
  ].join('\n');
}
