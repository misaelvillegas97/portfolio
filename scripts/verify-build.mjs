import { readFile, stat } from 'node:fs/promises';
import { dirname, isAbsolute, join, relative, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const defaultDistDir = fileURLToPath(new URL('../dist/', import.meta.url));
const locales = [
  { key: 'es', lang: 'es-CL', file: 'index.html' },
  { key: 'en', lang: 'en', file: join('en', 'index.html') },
];

const decodeMarkup = (value) => value
  .replaceAll('&amp;', '&')
  .replaceAll('&quot;', '"')
  .replaceAll('&#39;', "'")
  .replaceAll('&lt;', '<')
  .replaceAll('&gt;', '>');

function getAttribute(tag, name) {
  const match = tag.match(new RegExp(`\\b${name}\\s*=\\s*(["'])(.*?)\\1`, 'iu'));
  return match ? decodeMarkup(match[2]) : undefined;
}

function normalizeRoutes(siteUrl) {
  if (!siteUrl) return undefined;

  const base = new URL(siteUrl);
  if (!['http:', 'https:'].includes(base.protocol)) {
    throw new TypeError('SITE_URL must use http or https');
  }
  base.username = '';
  base.password = '';
  base.search = '';
  base.hash = '';
  base.pathname = `${base.pathname.replace(/\/+$/u, '')}/`;

  return { es: new URL('./', base).href, en: new URL('en/', base).href };
}

function expectedRoutes(locale, siteUrl) {
  const absolute = normalizeRoutes(siteUrl);
  if (absolute) return absolute;
  return locale === 'en' ? { es: '../', en: './' } : { es: './', en: './en/' };
}

function assertLink(html, file, { rel: expectedRel, hreflang, href }) {
  const links = html.match(/<link\b[^>]*>/giu) ?? [];
  const matches = links.filter((link) => {
    const rels = getAttribute(link, 'rel')?.split(/\s+/u) ?? [];
    return rels.includes(expectedRel) && (!hreflang || getAttribute(link, 'hreflang') === hreflang);
  });
  const label = hreflang ? `hreflang="${hreflang}"` : expectedRel;

  if (matches.length !== 1 || getAttribute(matches[0], 'href') !== href) {
    throw new Error(`${file}: expected one ${label} link with href="${href}"`);
  }
}

function assertMeta(html, file, { attribute, value, content }) {
  const metas = html.match(/<meta\b[^>]*>/giu) ?? [];
  const matches = metas.filter((meta) => getAttribute(meta, attribute) === value);
  if (matches.length !== 1 || getAttribute(matches[0], 'content') !== content) {
    throw new Error(`${file}: expected one ${attribute}="${value}" meta with content="${content}"`);
  }
}

async function requireFile(path, label) {
  try {
    const details = await stat(path);
    if (!details.isFile() || details.size === 0) throw new Error();
  } catch {
    throw new Error(`${label} is missing or empty`);
  }
}

async function requireAsset(distDir, htmlPath, reference) {
  if (!reference || /^(?:[a-z]+:)?\/\//iu.test(reference)) {
    throw new Error(`${htmlPath}: bundled asset must use a local path`);
  }

  const cleanReference = decodeURIComponent(reference.split(/[?#]/u, 1)[0]);
  const assetPath = cleanReference.startsWith('/')
    ? resolve(distDir, cleanReference.slice(1))
    : resolve(dirname(htmlPath), cleanReference);
  const relativePath = relative(distDir, assetPath);
  if (relativePath.startsWith('..') || isAbsolute(relativePath)) {
    throw new Error(`${htmlPath}: asset escapes dist: ${reference}`);
  }
  await requireFile(assetPath, `Referenced asset ${reference}`);
}

async function verifyDocument({ distDir, htmlPath, locale, lang, projectTitles, siteUrl }) {
  const html = await readFile(htmlPath, 'utf8');
  const file = relative(distDir, htmlPath);
  const htmlTag = html.match(/<html\b[^>]*>/iu)?.[0];
  if (!htmlTag || getAttribute(htmlTag, 'lang') !== lang) {
    throw new Error(`${file}: expected <html lang="${lang}">`);
  }

  const headingCount = (html.match(/<h1\b/giu) ?? []).length;
  if (headingCount !== 1) throw new Error(`${file}: expected exactly one h1, found ${headingCount}`);

  const body = html.match(/<body\b[^>]*>([^]*?)<\/body>/iu)?.[1] ?? '';
  for (const title of projectTitles) {
    if (!body.includes(title)) throw new Error(`${file}: rendered project is missing: ${title}`);
  }

  if (/<!--\s*(?:seo-head|app-html)\s*-->/iu.test(html)) {
    throw new Error(`${file}: unresolved prerender marker`);
  }

  const routes = expectedRoutes(locale, siteUrl);
  assertLink(html, file, { rel: 'canonical', href: routes[locale] });
  assertLink(html, file, { rel: 'alternate', hreflang: 'es-CL', href: routes.es });
  assertLink(html, file, { rel: 'alternate', hreflang: 'en', href: routes.en });
  assertLink(html, file, { rel: 'alternate', hreflang: 'x-default', href: routes.es });
  assertLink(html, file, { rel: 'icon', href: siteUrl ? `${normalizeRoutes(siteUrl).es}favicon.svg` : `${locale === 'en' ? '../' : './'}favicon.svg` });
  assertLink(html, file, { rel: 'manifest', href: siteUrl ? `${normalizeRoutes(siteUrl).es}site.webmanifest` : `${locale === 'en' ? '../' : './'}site.webmanifest` });
  const socialImage = siteUrl
    ? `${routes.es}${locale === 'en' ? 'og-image-en.png' : 'og-image.png'}`
    : `${locale === 'en' ? '../og-image-en.png' : './og-image.png'}`;
  const socialImageAlt = locale === 'en'
    ? "Preview of David Misael Villegas Sandoval's portfolio"
    : 'Vista previa del portafolio de David Misael Villegas Sandoval';
  assertMeta(html, file, { attribute: 'property', value: 'og:image', content: socialImage });
  assertMeta(html, file, { attribute: 'property', value: 'og:image:width', content: '1200' });
  assertMeta(html, file, { attribute: 'property', value: 'og:image:height', content: '630' });
  assertMeta(html, file, { attribute: 'property', value: 'og:image:alt', content: socialImageAlt });
  assertMeta(html, file, { attribute: 'name', value: 'twitter:card', content: 'summary_large_image' });
  assertMeta(html, file, { attribute: 'name', value: 'twitter:image', content: socialImage });
  assertMeta(html, file, { attribute: 'name', value: 'twitter:image:alt', content: socialImageAlt });

  const scripts = [...html.matchAll(/<script\b([^>]*)>([^]*?)<\/script>/giu)];
  const jsonLd = scripts
    .filter((match) => getAttribute(match[0], 'type') === 'application/ld+json')
    .map((match) => {
      try {
        return JSON.parse(match[2]);
      } catch {
        throw new Error(`${file}: JSON-LD must be valid JSON`);
      }
    });
  const profile = jsonLd.find((value) => value?.['@type'] === 'ProfilePage');
  if (!profile) throw new Error(`${file}: JSON-LD ProfilePage is missing`);
  if (profile.mainEntity?.['@type'] !== 'Person') {
    throw new Error(`${file}: JSON-LD ProfilePage mainEntity must be Person`);
  }
  const personId = `${routes.es}#person`;
  if (profile.mainEntity['@id'] !== personId) {
    throw new Error(`${file}: JSON-LD Person must use @id="${personId}"`);
  }
  if (!Array.isArray(profile.hasPart) || profile.hasPart.length !== projectTitles.length
    || profile.hasPart.some((project) => (
    project?.['@type'] !== 'CreativeWork' || project.creator?.['@id'] !== personId
  ))) {
    throw new Error(`${file}: JSON-LD CreativeWork entries must reference the Person creator`);
  }

  const moduleScripts = scripts.filter((match) => getAttribute(match[0], 'type') === 'module');
  if (moduleScripts.length === 0) throw new Error(`${file}: module script is missing`);
  const stylesheets = (html.match(/<link\b[^>]*>/giu) ?? [])
    .filter((link) => getAttribute(link, 'rel')?.split(/\s+/u).includes('stylesheet'));
  if (stylesheets.length === 0) throw new Error(`${file}: stylesheet asset is missing`);

  await Promise.all([
    ...moduleScripts.map((match) => requireAsset(distDir, htmlPath, getAttribute(match[0], 'src'))),
    ...stylesheets.map((link) => requireAsset(distDir, htmlPath, getAttribute(link, 'href'))),
  ]);
}

export async function verifyBuild({ distDir = defaultDistDir, siteUrl = process.env.SITE_URL } = {}) {
  const resolvedDistDir = resolve(distDir);
  const configuredSiteUrl = siteUrl?.trim() || undefined;
  const content = await Promise.all(locales.map(async ({ key }) => JSON.parse(
    await readFile(new URL(`../src/i18n/locales/${key}.json`, import.meta.url), 'utf8'),
  )));
  const projects = content.map((locale) => Object.values(locale.projects.items).map(({ title }) => title));

  if (projects.some((titles) => titles.length !== 6)) {
    throw new Error('Each locale must define exactly six projects');
  }

  await Promise.all([
    requireFile(join(resolvedDistDir, 'robots.txt'), 'robots.txt'),
    requireFile(join(resolvedDistDir, 'favicon.svg'), 'favicon.svg'),
    requireFile(join(resolvedDistDir, 'site.webmanifest'), 'site.webmanifest'),
    requireFile(join(resolvedDistDir, 'og-image.png'), 'og-image.png'),
    requireFile(join(resolvedDistDir, 'og-image-en.png'), 'og-image-en.png'),
    ...locales.map((locale, index) => verifyDocument({
      distDir: resolvedDistDir,
      htmlPath: join(resolvedDistDir, locale.file),
      locale: locale.key,
      lang: locale.lang,
      projectTitles: projects[index],
      siteUrl: configuredSiteUrl,
    })),
  ]);

  if (configuredSiteUrl) {
    const sitemapPath = join(resolvedDistDir, 'sitemap.xml');
    await requireFile(sitemapPath, 'sitemap.xml');
    const sitemap = decodeMarkup(await readFile(sitemapPath, 'utf8'));
    for (const route of Object.values(normalizeRoutes(configuredSiteUrl))) {
      if (!sitemap.includes(route)) throw new Error(`sitemap.xml is missing ${route}`);
    }
  }
}

if (process.argv[1] && resolve(process.argv[1]) === fileURLToPath(import.meta.url)) {
  await verifyBuild();
  console.log('Production build verified.');
}
