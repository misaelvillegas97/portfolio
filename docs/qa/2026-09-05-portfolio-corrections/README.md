# Correcciones del portafolio — 5 de septiembre de 2026

[Comparador actualizado](../2026-09-04-portfolio/comparison.html)

## Cambios solicitados

- **Hero conservado**: componente, textos ES/EN y reglas CSS sin cambios respecto de la iteración aprobada. Evidencia: [hero-verification.json](hero-verification.json).
- **Productos completos**: se recuperaron las descripciones, problemas y aportes de los seis proyectos desde la versión anterior al rediseño (`5f9ed4091f94acc5cdcc306e0402be1e0762f37d`). Poultry y Nutry presentan capacidades generales y capturas de sus páginas iniciales. Los otros productos conservan su alcance y aporte en desplegables nativos.
- **Enlaces de inicio**: tanto las imágenes como los botones de visita llevan a [Poultry](https://poultry.cl/), [Nutry](https://nutry.cl/), [WWT](https://wwt.devly.cl/), [Trackly](https://trackly.cl/) y [Nuptia](https://nuptia.cl/). Medisenda mantiene el estado de construcción sin inventar un destino público.
- **Fechas**: Blaze termina en julio de 2026; Polodev en agosto de 2026, en ambos idiomas.
- **Cargos en inglés**, tomados del CV adjunto: Senior Software Engineer, Senior Software Engineering Consultant, Semi Senior Software Engineer, Junior Software Engineer y Entry Software Engineer. Marcados con `lang="en"` también en la versión española.
- **Nuevo CV de una página**: reemplazado el archivo descargable por el documento adjunto. En la copia publicada localmente se corrigió únicamente la fecha de Polodev, de “Present” a “Aug 2026”. El adjunto original permanece intacto. Se conserva la URL de descarga existente.

## Validación

- 47/47 pruebas, lint, TypeScript, build de cliente/SSR, prerender y verificación de build pasan.
- App real de producción local en `http://127.0.0.1:4176/` y `/en/`.
- ES/EN a 320 × 640, 390 × 844, 768 × 1024 y 1280 × 720: sin desbordamiento horizontal, anclas rotas, IDs duplicados ni imágenes fallidas. Los recursos de CV y ruta alternativa responden 200.
- Los destinos del DOM coinciden con las cinco páginas iniciales esperadas; títulos y fechas comprobados en las dos rutas. Evidencia: `runtime-es.json` y `runtime-en.json`.
- Desplegable de WWT: apertura con clic y cierre con Enter comprobados; texto de alcance y aporte disponible. Consola sin errores en los recorridos probados.
- PDF descargado por HTTP idéntico a la copia actual de `public` y `dist` mediante SHA-256. Una página; texto y coordenadas fuera de la fecha de Polodev idénticos al adjunto; enlaces originales conservados. Revisión visual del PDF renderizado completada. Evidencia: [verification.json](verification.json).
- Hero verificado sin cambios respecto del inicio de esta corrección. Las capturas en móvil muestran cargos, fechas y capacidades sin recortes horizontales.
- Comparador: todas sus opciones cargan las dos imágenes correspondientes, sin errores de consola ni desbordamiento. Evidencia: [comparison-check.json](comparison-check.json).

Altura actual, sin desplegables abiertos: 5.214 px en escritorio 1280 × 720 y 7.428 px en móvil 390 × 844. Son medidas de layout local; no resultados comerciales ni métricas de producción.

## Capturas

| Superficie | Antes de esta corrección | Después |
|---|---|---|
| Proyectos, 1280 × 720 | [PNG](screenshots/before-projects.png) | [PNG](screenshots/after-projects.png) |
| Experiencia, 1280 × 720 | [PNG](screenshots/before-experience.png) | [PNG](screenshots/after-experience.png) |
| CV adjunto / copia descargable corregida | [PNG](screenshots/cv-supplied.png) | [PNG](screenshots/after-cv.png) |

Más evidencia: [Nutry](screenshots/after-nutry.png), [proyectos móvil](screenshots/after-mobile-projects.png), [experiencia móvil](screenshots/after-mobile-experience.png), [inicio](screenshots/after-home.png), [vista general](screenshots/after-full.png).

El comparador mantiene las capturas del diseño original para inicio, móvil, vistas generales y CV anterior. Identifica expresamente la referencia de cada vista; no se reemplazaron los archivos históricos de capturas.

## Procedencia

- `public/assets/projects/poultry-home.png`: captura real de `https://poultry.cl/`, viewport 1280 × 900.
- `public/assets/projects/nutry-home.png`: captura real de `https://nutry.cl/`, viewport 1280 × 900, tras cerrar el aviso inicial.
- CV fuente: `C:/Users/david/OneDrive/Escritorio/Documentos/Personal/David_Villegas_Sandoval_CV.pdf`.
- CV descargable: `public/assets/CV David Misael Villegas Sandoval.pdf`.

Estas correcciones reemplazan el enfoque de funcionalidades particulares y el CV de la primera iteración. No incorporan métricas de empleadores al sitio. Validación local; no se realizó push ni despliegue.
