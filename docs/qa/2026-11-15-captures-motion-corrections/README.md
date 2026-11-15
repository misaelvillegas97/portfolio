# Capturas actuales y continuidad del movimiento

Verificación local en `main`, sobre el rediseño editorial aprobado, realizada antes de publicar los cambios. Este informe no acredita un despliegue. Se conservan los seis productos, seis empleos, contenido ES/EN, destinos y estructura SEO/GEO/AEO.

## Pantallas de los productos

Las dos imágenes destacadas ahora muestran las páginas públicas actuales de [Poultry](https://poultry.cl/) y [Nutry](https://nutry.cl/), capturadas el 15 de noviembre de 2026 a 1280 × 900. Sus nombres nuevos evitan reutilizar las URLs de las versiones antiguas. Los archivos JPEG incluyen procedencia y se verificó su carga en ambos idiomas.

Son capturas de las páginas públicas que ya representaban estos proyectos, no pantallas autenticadas ni interfaces generadas. Para Nutry se omitió localmente el aviso de analítica, sin pulsar consentimiento ni cambiar preferencias. [Origen y hora de las capturas](captures.json).

## Causas y correcciones

- Los enlaces saltaban directamente y los detalles cambiaban de altura sin transición. Ahora las anclas activadas con puntero usan scroll nativo suave y los detalles abren/cierran desde su altura actual.
- El cierre nativo ocultaba el contenido antes de la salida. El controlador compartido lo mantiene renderizado hasta terminar, lo retira del orden de tabulación durante el cierre y admite inversiones rápidas.
- La entrada del hero se aplica desde CSS en el primer pintado: la hidratación no reinicia la posición. Los marcos completos de producto y las palabras del método tienen un único controlador GSAP, con interpolación de 0.6 s y scroll nativo.
- Resize retargetea una apertura y las expansiones completadas actualizan las posiciones de los efectos siguientes.
- El scroll suave global podía interrumpir la llegada inicial a una sección. Ahora se activa sólo tras el puntero en una ancla interna; las URLs directas y el teclado llegan inmediatamente. Movimiento reducido también fuerza scroll inmediato, incluso frente a estilos restaurados por GSAP.

## Verificación

`npm test`: **48/48**. `npm run lint`: **sin errores**. `npm run build`: **correcto**, incluido prerender ES/EN y verificación de metadatos, sitemap, robots y llms.txt.

**24 comprobaciones reales de navegador**, Chrome 157.0.8103.78, build de producción local, con la CSP de Caddy aplicada. Cero errores de consola, runtime o CSP. [Resultados y muestras rAF](results.json).

| Interacción | Antes: valores distintos | Después: valores distintos |
| --- | ---: | ---: |
| Scroll del enlace principal | 2 posiciones | 71 posiciones |
| Apertura de detalle | 2 alturas | 61 alturas |
| Cierre de detalle | 2 alturas | 38 alturas |

Los conteos prueban estados intermedios; no son un benchmark de FPS. [Resumen anterior](before-summary.json).

La matriz cubre 320, 390, 768, 820, 1024 y 1440 px en ES/EN: sin desbordamiento horizontal, nombre en dos líneas, acciones principales visibles y ambas imágenes actuales cargadas. Se probaron interrupción, resize durante apertura, menú móvil, Escape y foco, cierre exterior, cambio de idioma conservando sección, recorrido con teclado, movimiento reducido durante una animación y fallback sin JavaScript. Copiar correo, error de portapapeles y descarga del CV conservan su recorrido.

Ocho cargas nuevas de `#nutry`/`#experience`, en ambos idiomas y a 320/1440 px, dejan la sección entre 111.59 y 112.47 px desde arriba, bajo la cabecera. Las capturas de producto se posicionan con esa misma separación; no pretenden mostrar la página completa.

[Revisión independiente](visual-review.md): **ship**, sin correcciones materiales pendientes en este alcance. El detector actual no reportó hallazgos primarios; mantiene 41 avisos de tamaños/color frente al inventario documental, sin cambio de identidad para satisfacerlos: [detalle](impeccable-detect.json). El gate estilístico anterior **OPEN 54** sigue registrado en [su informe histórico](../2026-11-15-portfolio-motion/TASTE-GATE.md); estas correcciones no se presentan como un pase de ese gate.

## Reproducción y límites

Ejecutar `node docs/qa/2026-11-15-captures-motion-corrections/reproduce.mjs` desde la raíz, después de `npm run build`. Usa Playwright de la instalación global existente de gstack y Chrome instalado. Inicia un servidor efímero con la CSP real, guarda resultados y cierra sus procesos.

Las capturas y `video/motion-walkthrough.webm` son evidencia local ignorada por Git. Los dos nuevos JPEG de producto sí forman parte del cambio. DESIGN.md y su sidecar documentan el controlador, fallback y navegación actuales.

No se verificaron Firefox, Safari/WebKit ni dispositivos físicos: faltan las versiones de navegador compatibles con el Playwright instalado. Los binarios antiguos también rechazaron el protocolo antes de crear una página ([detalle](installed-engines.json)); no se contabilizan como pruebas del producto. No se afirma fluidez universal ni rendimiento de producción. No se añadieron variables de entorno, dependencias ni cambios en servicios externos en esta corrección.
