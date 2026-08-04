import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import test from 'node:test';

const [dockerfile, caddyfile, railwayConfig] = await Promise.all([
  readFile(new URL('../Dockerfile', import.meta.url), 'utf8'),
  readFile(new URL('../Caddyfile', import.meta.url), 'utf8'),
  readFile(new URL('../railway.json', import.meta.url), 'utf8').then(JSON.parse),
]);

test('builds the prerendered site and lets Railway select the runtime port', () => {
  assert.match(dockerfile, /^FROM node:22-alpine AS build$/mu);
  assert.match(dockerfile, /^RUN npm ci$/mu);
  assert.match(dockerfile, /^RUN npm run build$/mu);
  assert.match(dockerfile, /^FROM caddy:2\.10\.2-alpine$/mu);
  assert.match(dockerfile, /adduser -S -D -H -G caddy caddy/u);
  assert.match(dockerfile, /^COPY --chown=caddy:caddy --from=build \/app\/dist \/srv$/mu);
  assert.match(dockerfile, /^USER caddy$/mu);
  assert.match(caddyfile, /^:\{\$PORT:8080\} \{$/mu);
});

test('enforces browser security headers without weakening the script policy', () => {
  assert.match(caddyfile, /Content-Security-Policy "default-src 'self'; base-uri 'self'; form-action 'self'; object-src 'none'; frame-ancestors 'none'; script-src 'self' https:\/\/static\.cloudflareinsights\.com; style-src 'self'; img-src 'self' data:; font-src 'self'; connect-src 'self' https:\/\/cloudflareinsights\.com; manifest-src 'self'; require-trusted-types-for 'script'; trusted-types 'none'; upgrade-insecure-requests"/u);
  assert.doesNotMatch(caddyfile, /unsafe-(?:inline|eval)/u);
  assert.match(caddyfile, /Strict-Transport-Security "max-age=31536000"/u);
  assert.match(caddyfile, /Cross-Origin-Opener-Policy "same-origin"/u);
  assert.match(caddyfile, /X-Frame-Options "DENY"/u);
  assert.match(caddyfile, /X-Content-Type-Options "nosniff"/u);
  assert.match(caddyfile, /Referrer-Policy "strict-origin-when-cross-origin"/u);
});

test('keeps static locale routes and client fallbacks available', () => {
  assert.match(caddyfile, /^\s*root \* \/srv$/mu);
  assert.match(caddyfile, /^\s*try_files \{path\} \{path\}\/ \/index\.html$/mu);
  assert.match(caddyfile, /^\s*file_server$/mu);
});

test('forces Railway to use Caddy instead of a stale dashboard start command', () => {
  assert.deepEqual(railwayConfig.build, {
    builder: 'DOCKERFILE',
    dockerfilePath: 'Dockerfile',
  });
  assert.equal(
    railwayConfig.deploy.startCommand,
    'caddy run --config /etc/caddy/Caddyfile --adapter caddyfile',
  );
  assert.equal(railwayConfig.deploy.healthcheckPath, '/');
  assert.equal(railwayConfig.deploy.healthcheckTimeout, 100);
});
