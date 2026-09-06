# Mejora del portafolio — 4 de septiembre de 2026

Este informe documenta la primera iteración. Las descripciones de proyectos, capturas de producto, fechas laborales y CV fueron corregidos el 5 de septiembre: [informe vigente](../2026-09-05-portfolio-corrections/README.md). El comparador muestra los resultados actuales.

[Ver comparador antes/después](comparison.html)

## Resultado

Se conserva el dossier marfil, grafito y cobalto. El perfil presenta a David como ingeniero senior abierto a empleo y consultoría. El contacto confirmado es **david@dvillegas.cl**.

| Observación inicial | Cambio |
|---|---|
| Mucho texto abstracto; poca evidencia visible | Dos casos destacados, Poultry y Nutry, con pantallas reales, problema, aporte y comportamiento concreto. |
| Seis proyectos con la misma jerarquía | Dos casos detallados y cuatro productos compactos. Medisenda queda explícitamente en construcción. |
| Texto y títulos excesivos | Portada más breve, nombre legible, acciones visibles y menor repetición. |
| Recorrido largo antes del contacto | Proyectos → trayectoria → forma de trabajo → contacto, con detalle técnico desplegable. |
| Objetivo profesional ambiguo | Empleo senior y consultoría explícitos en ES/EN. |
| Contacto limitado y correo retirado en el CV | Correo directo, copiar con recuperación, LinkedIn, GitHub y CV actualizado. |
| Desbordamiento a 320 px | Eliminado el ancho mínimo del documento; layouts adaptados. |
| Cambio de idioma perdía contexto | El enlace lleva a la sección visible de la otra versión. |
| Menú cortado en móvil horizontal, detectado durante QA | Panel acotado a la altura disponible, con scroll propio; Escape, selección y clic exterior cierran. |

La trayectoria se describe mediante responsabilidades extraídas del CV, sin añadir porcentajes, logros medidos ni material privado de antiguos empleadores.

## Comparación medible

Mismo Chromium de gstack, escala 1, vista sin desplegables abiertos. La referencia se recompiló desde el commit **5f9ed4091f94acc5cdcc306e0402be1e0762f37d**, en un directorio temporal aislado. Las capturas “before” originales se conservaron.

| Medición | Antes | Después |
|---|---:|---:|
| Altura total, escritorio 1280 × 720 | 9.630 px | 5.191 px |
| Altura total, móvil 390 × 844 | 13.938 px | 7.268 px |
| Borde inferior de acciones iniciales, escritorio | 832 px | 564 px |
| Inicio del contacto, móvil | 12.880 px | 6.472 px |

El recorrido móvil se reduce aproximadamente **48%**. Son mediciones de layout local, no métricas de conversión ni Core Web Vitals de producción. Datos completos: `baseline-es-*.json` y `metrics-*.json`. Las vistas generales PNG fueron reducidas automáticamente por gstack a 2.000 px de alto; las capturas de viewport mantienen 1280 × 720 o 390 × 844.

## Validación

- **47/47 pruebas** existentes pasan tras actualizar los contratos afectados.
- **ESLint** sin errores ni advertencias; **TypeScript, build, SSR, prerender y verify-build** pasan.
- App real de producción local en `http://127.0.0.1:4176/` y `/en/`.
- Ambas versiones a **320 × 640, 390 × 844, 768 × 1024 y 1280 × 720**: sin overflow horizontal, anclas rotas, IDs duplicados ni imágenes fallidas.
- Recursos locales de CV, imágenes y ruta alternativa responden **200** en ambos idiomas.
- Los seis destinos públicos de productos/calculadora responden **200** a HEAD; registro en `external-links.json`. Esto verifica disponibilidad HTTP, no los flujos privados de cada producto.
- Menú a **568 × 320**: antes selector EN terminaba en y=337; después panel termina en y=320 y selector accesible por scroll hasta y=303.
- Teclado: Tab muestra “Saltar al contenido”; Enter enfoca `main`; Enter abre decisiones; Escape cierra menú y devuelve foco al disparador.
- Menú cierra al elegir sección y al pulsar fuera. Enlace de caso continúa al contacto. Idioma conserva contexto de proyecto.
- Correo: destino `mailto:david@dvillegas.cl` con asunto localizado. Recuperación comprobada ante bloqueo real de gstack; estado de éxito y texto comprobados con un sustituto de `clipboard.writeText`. Después se abrió el build en Chrome interactivo: clic real en “Copiar correo” confirmó “Correo copiado”, sin errores y sin sustituir la API. La captura nativa quedó registrada en la conversación. Los archivos de éxito/error de gstack documentan las pruebas controladas iniciales.
- Contraste de tokens: texto secundario **6,39:1**, enlaces **9,59:1**, botón primario **7,70:1**, foco **4,99:1** contra sus fondos. Ver `contrast.json`. Revisión semántica y visual manual; no equivale a certificación de accesibilidad.
- `prefers-reduced-motion` y colores forzados conservados y revisados en CSS; sin animación necesaria para mostrar contenido.
- Consola sin errores en las rutas y acciones probadas. Comparador validado cambiando vistas de escritorio, móvil y CV.
- CV: tres páginas conservadas; texto de páginas 2 y 3 idéntico; contenido de primera página preservado salvo correo. Enlace mailto añadido. Ver `cv-verification.json`.
- Revisión independiente de cumplimiento y calidad sin hallazgos materiales pendientes. `git diff --check` pasa.

Los encabezados de seguridad de Caddy y los contratos SEO se mantienen; la prueba visual utilizó Vite Preview, no un despliegue con Caddy. No se hicieron pruebas de carga: el alcance es un sitio estático, sin nuevos tenants, APIs, bases de datos ni flujos con autorización. No se envió correo ni se publicó el cambio.

## Capturas

| Superficie | Antes | Después |
|---|---|---|
| Inicio escritorio | [PNG](screenshots/before-desktop-home.png) | [PNG](screenshots/after-desktop-home.png) |
| Proyectos escritorio | [PNG](screenshots/before-desktop-projects.png) | [PNG](screenshots/after-desktop-projects.png) |
| Inicio móvil | [PNG](screenshots/before-mobile-home.png) | [PNG](screenshots/after-mobile-home.png) |
| Proyectos móvil | [PNG](screenshots/before-mobile-projects.png) | [PNG](screenshots/after-mobile-projects.png) |
| Vista general escritorio | [PNG](screenshots/before-desktop-full.png) | [PNG](screenshots/after-desktop-full.png) |
| Vista general móvil | [PNG](screenshots/before-mobile-full.png) | [PNG](screenshots/after-mobile-full.png) |
| Correo en CV | [PNG](screenshots/before-cv-contact.png) | [PNG](screenshots/after-cv-contact.png) |
| Menú horizontal, defecto intermedio | [PNG](screenshots/issue-landscape-menu.png) | [PNG](screenshots/after-landscape-menu.png) |

Evidencia adicional: [contacto](screenshots/after-contact.png), [contacto móvil](screenshots/after-mobile-contact.png), [Nutry](screenshots/after-nutry.png), [decisiones](screenshots/after-case-decisions.png), [foco](screenshots/after-keyboard-focus.png), [320 px](screenshots/after-narrow-home.png), [tablet](screenshots/after-tablet-home.png), [inglés](screenshots/after-english-home.png).

## Procedencia de las imágenes del sitio

### Poultry

Archivo publicado: `public/assets/projects/poultry-quotation.png`.

Copia sin modificar de:
`E:/projects/devly/erp-poultry/erp-poultry-frontend/docs/marketing/social/poultry/launch-kit-imagegen/assets/evidence/commercial/02-quotation-detail.png`

El README del kit, líneas 54–55, identifica el entorno como demostración local con datos ficticios. La captura muestra “Avícola Demo Los Robles” y correo bajo `example.com`. Es una pantalla real; no una interfaz generada.

El comportamiento descrito se contrastó con `erp-poultry-backend/src/quotations/infrastructure/persistence/typeorm-quotation.store.ts`: prefill en líneas 576–606 y comprobación/conversión en líneas 663–688. Código y captura prueban comportamiento, no resultados comerciales ni autoría exclusiva.

### Nutry

Archivo publicado: `public/assets/projects/nutry-calculator.png`.

Captura real de **https://nutry.cl/calculator/food/arroz-integral**, 1280 × 900, con el aviso inicial cerrado. Contenido público; sin información de pacientes. El pie y el alcance del caso aclaran que esta imagen muestra la calculadora y que ficha e informes pertenecen al área profesional.

Las decisiones se contrastaron con:

- `nutry-frontend/src/app/domains/pro/modules/patients/pages/patient-record-shell.ts:142`: contexto y regreso a agenda.
- `nutry-backend/src/nutrition/reports/reports.service.ts:363`: finalización e informe asociado a PDF.
- `nutry-backend/src/nutrition/reports/documents/application/send-report-pdf-email.use-case.ts:26`: estado de envío y reintentos.

No se reutilizaron mockups como prueba de producto. No se ejecutaron pruebas clínicas autenticadas dentro de esta tarea de portafolio.

### CV y empleadores

Las responsabilidades provienen del CV existente. Se excluyeron sus porcentajes del texto nuevo del sitio, dado que el usuario no dispone de evidencia independiente. El PDF descargable conserva su trayectoria y redacción original; se corrigió únicamente el correo y se añadió su enlace.

`evidence-manifest.json` registra dimensiones y SHA-256 de todas las capturas y assets entregados.
