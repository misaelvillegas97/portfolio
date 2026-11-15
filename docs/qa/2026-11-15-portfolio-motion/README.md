GATE: OPEN 54 (rounds used up)

# Rediseño editorial y motion del portafolio

Verificación local en main, realizada antes de publicar los cambios. Este informe no acredita un despliegue. Vista de producción local: http://127.0.0.1:4173/ y /en/.

## Resultado

Dirección elegida por el usuario: editorial tecnológico, marfil, tinta y azul, tipografía amplia y motion preciso. Se reconstruyeron navegación, presentación personal, proyectos, trayectoria, método y contacto como un solo sistema. Outfit se sirve localmente con su licencia OFL. Las dos vistas previas sociales son capturas reales del nuevo sitio a 1200 × 630.

Se conservan íntegros los dos archivos de contenido ES/EN: seis productos, seis empleos, fechas, cargos, sectores, capacidades, correo, enlaces y CV. Poultry y Nutry conservan sus capturas reales; sus flujos de imagen y visita llevan a las páginas iniciales. El problema y las capacidades se divulgan mediante controles nativos. Los otros cuatro productos conservan su alcance, aporte y estado; Medisenda sigue sin un enlace inventado.

## Motion y accesibilidad

La entrada personal usa GSAP con contexto React y limpieza. Las capturas se asientan de escala 0.94 a 1; las palabras del método pasan de opacidad 0.65 a 1. Se usan timelines CSS cuando hay soporte conjunto de timeline y range; GSAP ScrollTrigger cubre el caso restante. No hay captura del scroll ni altura de página alterada por pinning JavaScript. El encabezado de trayectoria usa sticky CSS sólo en escritorios adecuados.

La guía modern-web-guidance scrollytelling orientó la mejora progresiva: “ALWAYS use the native CSS implementation”. La implementación comprueba soporte completo, conserva contenido visible y respeta prefers-reduced-motion. La documentación oficial de [GSAP matchMedia](https://gsap.com/docs/v3/GSAP/gsap.matchMedia/) respalda el contexto reversible de preferencias. El navegador verificó ambos caminos y el cambio de preferencia en vivo.

## Verificación

| Comprobación | Resultado |
| --- | --- |
| npm test | 47 pruebas, 47 aprobadas |
| npm run lint | Aprobado |
| TypeScript, build cliente/SSR, prerender y verificador | Aprobados |
| Navegador con la CSP de Caddy | 20 comprobaciones; cero errores de consola, runtime o CSP |
| ES/EN, 320/390/768/820/1024/1440 px | Sin desbordamiento; nombre en dos líneas; seis productos y seis empleos |
| Teclado | Recorrido completo, foco visible, skip link, Escape, cierre del menú y destino bajo el encabezado |
| Continuación | Cambio de idioma conserva la sección; desplegables funcionan sin JavaScript |
| Contacto | Copia correcta y denegada, recuperación mediante correo, CV disponible |
| Motion | Timeline nativo, alternativa GSAP y movimiento reducido verificados |
| Impeccable detect | Ningún hallazgo |
| Revisión visual independiente | Sin hallazgos materiales de UI; único fix documental resuelto |
| Performance del skill | Cero FAIL; tres WARN |
| Gate de taste | OPEN, 54 hallazgos de composición/kit; no aprobado |

La copia del correo se probó con éxito y error simulados en Clipboard API; no se modificó el portapapeles del sistema. Los viewports fueron emulados en Chrome headless, no dispositivos físicos. El revisor visual inspeccionó capturas y fuente; no repitió la sesión de navegador. Su veredicto final ship puntúa únicamente la corrección documental; la revisión completa previa se conserva aparte.

El script de rendimiento observó aproximadamente 459 KiB transferidos y CLS 0 en esa ejecución local. Sus FCP/LCP son tiempos relativos de laboratorio local, sin Lighthouse ni una medición de producción. Los tres avisos corresponden al favicon detectado por el script como imagen no lazy y a las dos capturas de 1280 px mostradas a menor tamaño en móvil. Se mantiene la fuente visual original.

El checker de taste impone además una composición y un runtime de kit específicos. Sus 54 hallazgos permanecen abiertos; no se presentan como resueltos ni se ocultaron con waivers. El detalle completo está en [TASTE-GATE.md](TASTE-GATE.md) y [taste-gate.json](taste-gate.json).

## SEO, GEO y AEO

Se mantienen HTML prerenderizado en ambos idiomas, un H1, jerarquía semántica, anclas, canonical absoluto, hreflang recíproco, sitemap, robots y llms.txt. ProfilePage/Person incorpora correo, URL, descripción y tecnologías de la misma fuente de contenido; los seis CreativeWork incorporan dominio, idioma, aporte e imágenes reales cuando existen. No se añadieron resultados comerciales ni métricas no verificadas.

Se corrigió una causa general detectada con CSP: favicon y manifiesto usaban el dominio de publicación incluso en previews. Ahora se resuelven respecto del documento, también en /en/ y en subrutas, mientras los canonical y metadatos sociales mantienen la URL pública. El generador, el verificador y sus fixtures quedaron alineados. La política de seguridad permanece intacta; no se añadieron variables de entorno ni archivos .env.

## Evidencia y procedencia

- [Navegador](browser-results.json), [activos](assets.json), [rendimiento](performance.txt), [layout](layout-check.txt).
- [Revisión completa](visual-review.md), [veredicto documental](visual-verdict.md), [detector](impeccable-detector.json).
- [Copy ES](copy-es.json), [copy EN](copy-en.json): sin FAIL ni WARN; voz factual, técnica y directa, conservada desde el contenido existente.
- Capturas locales: [1440](screenshots/desktop.png), [390](screenshots/mobile.png), [1024](screenshots/tablet-landscape.png), [820](screenshots/tablet-wide.png), [768](screenshots/tablet.png).
- El flujo IDAT de cada captura destacada es idéntico al de HEAD: no cambiaron sus píxeles. Sólo se añadió procedencia PNG. Las imágenes sociales provienen del sitio real, sin generación de imágenes. Todas las imágenes del directorio público llevan procedencia; dos capturas legacy sin referencias activas se conservaron con su origen original expresamente no establecido.
- DESIGN.md, PRODUCT.md y el sidecar de Impeccable describen el sistema construido. Las capturas de QA son locales y están ignoradas por Git.

## Límites y riesgos

No se probó Safari, Firefox ni hardware físico. No se envió correo, formulario externo ni solicitud a una cuenta de terceros. No hay nuevas APIs, operaciones de datos ni recursos multi-tenant en este portafolio público estático.

npm audit informa 16 avisos previos del toolchain (10 moderados y 6 altos). La comparación del lock confirma que ningún paquete vulnerable cambió de versión; las únicas dependencias nuevas son gsap y @gsap/react. No se hizo una actualización mayor del toolchain dentro del rediseño.
