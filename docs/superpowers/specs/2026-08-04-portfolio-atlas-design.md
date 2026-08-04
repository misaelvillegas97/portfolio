# Portfolio Atlas de sistemas - Diseño

## Objetivo

Reemplazar la landing nocturna actual por un portfolio profesional, luminoso y bilingüe que presente a David Misael Villegas Sandoval como Senior Software Engineer mediante experiencia verificable y seis productos reales.

## Dirección visual

**Atlas de sistemas**: una superficie marfil con tipografía geométrica, tinta grafito, azul cobalto y bermellón. Una línea topológica conecta hitos, capacidades y productos. No se usan terminales, editores, estrellas, fondos oscuros ni 3D ornamental.

La composición será asimétrica, espaciosa y táctil:

- Hero con propuesta de valor y mapa SVG de sistemas.
- Bloque de principios que explica cómo convierte operaciones complejas en software mantenible.
- Casos de producto grandes, no tarjetas genéricas, con problema, aporte, capacidades, estado y enlace.
- Trayectoria profesional condensada desde 2017.
- Capacidades agrupadas por resultado, no por logotipos.
- Contacto directo y CV descargable.

## Contenido verificable

- Identidad principal: David Misael Villegas Sandoval.
- Rol: Senior Software Engineer / Ingeniero de Software Senior.
- Experiencia: Blaze, Polodev SPA, Falabella, NTT Data, Carpetres e Innoapsion.
- Tecnologías: Angular, TypeScript, NestJS, Node.js, Java/Spring Boot, AWS, PostgreSQL, Docker, CI/CD y SSR.
- Productos: Poultry, WWT, Trackly, Nuptia, Nutry y Medisenda.
- Medisenda se muestra como “en construcción”; no se enlaza como producto disponible mientras el dominio no resuelva.
- No se publican métricas ni estados laborales que no estén respaldados por el CV o repositorios inspeccionados.

## Arquitectura

- React 18, TypeScript, Vite, i18next, Lucide y Framer Motion ya instalados.
- CSS propio sobre Tailwind base; SVG y CSS para identidad visual.
- `react-dom/server` genera HTML estático para español e inglés.
- Español vive en `/`; inglés en `/en/`; el selector usa enlaces reales y funciona sin JavaScript.
- `SITE_URL` configura URLs absolutas de canonical, hreflang, sitemap y Open Graph durante deploy; el build local usa rutas relativas válidas.
- El cliente hidrata el HTML según `document.documentElement.lang`; no detecta ni redirige por IP o navegador.

## SEO, GEO y accesibilidad

- Un H1 descriptivo, jerarquía H2/H3, contenido completo visible y enlaces descriptivos.
- Metadatos localizados: title, description, canonical, hreflang, Open Graph y Twitter.
- JSON-LD `ProfilePage` con `Person`, `alternateName`, `jobTitle`, `sameAs` y proyectos como `CreativeWork`.
- `robots.txt`, `sitemap.xml`, favicon y tarjeta social local.
- Sin `llms.txt`: no existe consumidor objetivo confirmado y Google declara que no lo necesita.
- HTML semántico, skip link, foco visible, nombres accesibles, orden DOM correcto y contraste WCAG AA.
- Motion solo con transform/opacity, desactivado con `prefers-reduced-motion`.

## Performance

- Sin Three.js ni canvas continuo.
- Una fuente variable WOFF2 autoalojada o fallback local; cero fuentes OTF remotas.
- Sin grid de logos remotos ni Calendly cargado durante el inicio.
- SVG decorativo inline, contenido bajo fold con `content-visibility: auto` y tamaños intrínsecos reservados.
- Objetivos de campo p75: LCP <= 2,5 s, INP <= 200 ms y CLS <= 0,1.

## Criterios de aceptación

1. `/` muestra español y `/en/` inglés completo aun con JavaScript desactivado.
2. Los seis productos aparecen; cinco enlazan a sus dominios y Medisenda indica construcción.
3. LinkedIn, GitHub, Instagram, correo y CV son accesibles por teclado y tienen nombres claros.
4. No queda ninguna estética nocturna/editor, canvas, tema oscuro o dependencia visual remota.
5. Canonical, hreflang, JSON-LD, sitemap y robots se generan correctamente con `SITE_URL`.
6. TypeScript, lint, pruebas de contenido/SEO, build y verificador del HTML terminan sin errores.
7. QA real valida desktop y móvil, navegación ES/EN, anchors, enlaces, consola, reduced motion y ausencia de overflow.

