# Portfolio Atlas de sistemas Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Construir un portfolio estático bilingüe, distintivo y verificable para David Misael Villegas Sandoval.

**Architecture:** React renderiza una única composición desde recursos i18n. Vite produce el cliente y una entrada SSR; un script Node prerenderiza `/` y `/en/`, genera metadatos localizados y valida el resultado.

**Tech Stack:** React 18, TypeScript, Vite 5, i18next, Framer Motion, Lucide, CSS, Node test runner.

---

### Task 1: Contrato de contenido bilingüe

**Files:**
- Create: `tests/content.test.mjs`
- Modify: `src/i18n/locales/es.json`
- Modify: `src/i18n/locales/en.json`

- [ ] **Step 1: Escribir prueba fallida de paridad y productos**

```js
assert.deepEqual(Object.keys(es.projects.items), Object.keys(en.projects.items));
assert.deepEqual(Object.keys(es.projects.items), ['poultry', 'wwt', 'trackly', 'nuptia', 'nutry', 'medisenda']);
assert.equal(es.projects.items.medisenda.status, 'En construcción');
```

- [ ] **Step 2: Ejecutar RED**

Run: `node --test tests/content.test.mjs`
Expected: FAIL porque el esquema actual no contiene `projects.items`.

- [ ] **Step 3: Reescribir ambos locales**

Definir las mismas claves para navegación, metadata, hero, principios, proyectos, experiencia, capacidades y contacto. Traducir todo el contenido visible; conservar nombres propios y URLs.

- [ ] **Step 4: Ejecutar GREEN**

Run: `node --test tests/content.test.mjs`
Expected: PASS.

### Task 2: Metadatos y prerender

**Files:**
- Create: `tests/site-meta.test.mjs`
- Create: `scripts/site-meta.mjs`
- Create: `scripts/prerender.mjs`
- Create: `src/entry-server.tsx`
- Modify: `src/main.tsx`
- Modify: `src/i18n/config.ts`
- Modify: `index.html`
- Modify: `package.json`

- [ ] **Step 1: Escribir prueba fallida de metadata**

```js
const head = buildHead({ locale: 'es', siteUrl: 'https://portfolio.example' });
assert.match(head, /hreflang="en"/);
assert.match(head, /"@type":"ProfilePage"/);
assert.match(head, /misaelvillegas97/);
```

- [ ] **Step 2: Ejecutar RED**

Run: `node --test tests/site-meta.test.mjs`
Expected: FAIL porque `scripts/site-meta.mjs` todavía no existe.

- [ ] **Step 3: Implementar metadata mínima**

`buildHead()` devuelve title, description, canonical, hreflang, OG/Twitter y JSON-LD. `buildSitemap()` devuelve únicamente `/` y `/en/` con alternates recíprocos.

- [ ] **Step 4: Ejecutar GREEN**

Run: `node --test tests/site-meta.test.mjs`
Expected: PASS.

- [ ] **Step 5: Implementar SSR/SSG**

Crear una instancia i18next por render, envolver `App` en `I18nextProvider`, insertar HTML en `<!--app-html-->` y escribir `dist/index.html`, `dist/en/index.html`, `dist/robots.txt` y `dist/sitemap.xml`.

### Task 3: Composición Atlas de sistemas

**Files:**
- Modify: `src/App.tsx`
- Modify: `src/components/Navigation.tsx`
- Modify: `src/components/LanguageToggle.tsx`
- Modify: `src/components/Hero.tsx`
- Create: `src/components/SystemsMap.tsx`
- Modify: `src/components/About.tsx`
- Modify: `src/components/Projects.tsx`
- Modify: `src/components/Experience.tsx`
- Modify: `src/components/Contact.tsx`
- Modify: `src/index.css`
- Delete: `src/components/SpaceBackground.tsx`
- Delete: `src/components/MouseTrail.tsx`
- Delete: `src/components/ThemeToggle.tsx`

- [ ] **Step 1: Sustituir shell y navegación**

Usar `<header>`, `<nav>`, `<main>` y `<footer>`; añadir skip link, navegación desktop/móvil y enlaces de idioma reales.

- [ ] **Step 2: Construir hero y mapa SVG**

Mostrar propuesta de valor, CTAs, tres señales de experiencia y un SVG decorativo con seis nodos. SVG usa `aria-hidden="true"`; el contenido equivalente permanece en HTML.

- [ ] **Step 3: Construir casos de producto**

Renderizar seis `<article>` en orden fijo. Cada caso expone dominio, problema, aporte, capacidades, estado y CTA; Medisenda no usa enlace activo.

- [ ] **Step 4: Construir trayectoria, capacidades y contacto**

Usar listas semánticas, fechas `<time>`, etiquetas de capacidades, enlaces sociales con texto y CTA de correo.

- [ ] **Step 5: Implementar sistema visual**

Definir tokens, layout de 12 columnas, tipografía fluida, textura CSS, contenedores asimétricos, estados de foco, responsive 360-1440 px, `content-visibility` y reduced motion.

### Task 4: Toolchain y verificación estática

**Files:**
- Modify: `eslint.config.js`
- Modify: `package.json`
- Modify: `tsconfig.app.json`
- Create: `scripts/verify-build.mjs`
- Create: `public/favicon.svg`
- Create: `public/site.webmanifest`

- [ ] **Step 1: Reparar typecheck y lint**

Usar `tsc -b`, configurar ESLint solo con paquetes ya instalados y eliminar imports muertos.

- [ ] **Step 2: Crear verificador de build**

Comprobar que ambos HTML contienen H1, seis proyectos, canonical, hreflang, JSON-LD y scripts; comprobar que sitemap y robots existen.

- [ ] **Step 3: Ejecutar suite técnica**

Run: `npm test && npm run lint && npm run build`
Expected: tres comandos con exit code 0 y verificador final `Portfolio build verified`.

### Task 5: QA production-ready

**Files:**
- Create: `.gstack/qa-reports/qa-report-localhost-2026-08-04.md`

- [ ] **Step 1: Levantar preview real**

Run: `npm run preview -- --host 127.0.0.1`
Expected: Vite sirve el contenido generado sin errores.

- [ ] **Step 2: Validar desktop y móvil**

Abrir `/` y `/en/` en 1440x900 y 375x812. Probar navegación, menú, selector de idioma, anchors, CV y enlaces externos; revisar consola y overflow.

- [ ] **Step 3: Validar HTML sin JavaScript**

Abrir los HTML generados y confirmar H1, casos y contacto sin hidratar React.

- [ ] **Step 4: Cerrar con evidencia**

Guardar screenshots, reporte QA, estado Git y resultados frescos de tests/build.

