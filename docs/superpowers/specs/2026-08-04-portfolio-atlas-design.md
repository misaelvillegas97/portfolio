# Portfolio personal — hero centrado en David

## Objetivo

Presentar a David Misael Villegas Sandoval antes que a sus productos: un Senior Software Engineer con experiencia transversal, criterio de producto y ejecución full-stack. La landing permanece luminosa, bilingüe y profesional; el hero deja de insinuar relaciones inexistentes entre productos.

## Decisión aprobada

La dirección combina la tipografía editorial de **Firma tipográfica** con la composición de **Dossier ejecutivo**:

- El H1 es el nombre: `David Villegas Sandoval`.
- El rol aparece inmediatamente después: `Ingeniero de Software Senior` / `Senior Software Engineer`.
- El subtítulo comunica valor transferible, no una lista: `Distintas industrias. Una misma forma de trabajar: entender la operación antes de diseñar el software.`
- El texto de apoyo explica ejecución: `Construyo productos digitales claros, seguros y mantenibles; desde la arquitectura hasta su operación en producción.`
- Una columna lateral titulada `Experiencia sectorial` aporta evidencia específica: Finanzas, Logística, Comunicación interna, Forestal y Telecomunicaciones.
- La columna lateral no repite el subtítulo. El primero explica el valor; la segunda prueba su origen.
- El monograma `DVS` es una marca personal decorativa de bajo peso visual, no un diagrama ni una afirmación funcional.

## Dirección visual

Superficie marfil, tinta grafito, azul cobalto y bermellón. Tipografía serif editorial para el nombre y sans serif precisa para el resto. El hero funciona como una ficha personal contemporánea: espaciosa, asimétrica y sobria.

Se eliminan del hero:

- El mapa SVG y sus nodos/conexiones.
- La leyenda de productos.
- El eyebrow `Ingeniería de producto · Arquitectura · Operación` y su equivalente en inglés.
- Badges o chips de capacidades.

Los seis productos permanecen en su sección propia. Ningún elemento del hero comunica que Poultry, WWT, Trackly, Nuptia, Nutry y Medisenda se conectan entre sí.

## Contenido bilingüe

### Español

- Nombre: `David Villegas Sandoval`.
- Rol: `Ingeniero de Software Senior`.
- Subtítulo: `Distintas industrias. Una misma forma de trabajar: entender la operación antes de diseñar el software.`
- Apoyo: `Construyo productos digitales claros, seguros y mantenibles; desde la arquitectura hasta su operación en producción.`
- Columna: `Experiencia sectorial` con Finanzas, Logística, Comunicación interna, Forestal y Telecomunicaciones.

### Inglés

- Name: `David Villegas Sandoval`.
- Role: `Senior Software Engineer`.
- Subtitle: `Different industries. One way of working: understand the operation before designing the software.`
- Supporting copy: `I build clear, secure, maintainable digital products—from architecture through live operations.`
- Column: `Industry experience` with Finance, Logistics, Internal communications, Forestry and Telecommunications.

## Implementación prevista

- `Hero.tsx` pasa a renderizar una composición de identidad y experiencia sectorial, sin importar `SystemsMap`.
- `SystemsMap.tsx` y estilos asociados se eliminan si no tienen consumidores restantes.
- Las claves `hero` de ambos locales se sustituyen por copy personal y sectores localizados; no se modifica información de productos.
- `index.css` conserva tokens de color, responsive y reduced motion existentes; añade solo reglas del dossier/firma y elimina reglas del mapa.
- Las pruebas de contenido se actualizan para exigir nombre, rol, copy sectorial y ausencia de mapa/conexiones.

## SEO, accesibilidad y rendimiento

- El único H1 conserva la identidad personal visible; los metadatos y JSON-LD mantienen `jobTitle` y contenido profesional verificable.
- La columna es una lista semántica con encabezado; el monograma queda `aria-hidden`.
- Las acciones siguen siendo enlaces accesibles a proyectos y CV.
- No se añaden dependencias, fuentes remotas, canvas, WebGL ni animación continua.
- El hero no aumenta las solicitudes iniciales ni introduce CLS; las animaciones existentes respetan `prefers-reduced-motion`.

## Criterios de aceptación

1. En `/` y `/en/`, nombre es H1 y rol aparece antes de cualquier evidencia sectorial.
2. El hero no contiene `SystemsMap`, nodos, líneas ni leyenda de productos.
3. El subtítulo y la columna lateral no repiten sectores: valor a la izquierda, evidencia a la derecha.
4. Español e inglés contienen las cinco áreas acordadas con traducciones naturales.
5. Hero sigue siendo legible, navegable por teclado, responsive y sin overflow a 320 px.
6. `npm test`, typecheck, lint, build/prerender y QA de navegador terminan sin regresiones.
