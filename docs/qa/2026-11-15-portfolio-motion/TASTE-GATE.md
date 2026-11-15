GATE: OPEN 54 (rounds used up)

# Hallazgos abiertos del checker de taste

Se ejecutaron tres rondas, sin modificar el kit, ocultar contenido al checker ni aplicar waivers. Este resultado no es un PASS.

La revisión visual independiente evaluó el portafolio contra la dirección elegida por el usuario. El checker aplica además su modelo de página comercial: sección de uno/dos viewports, ubicación exacta de líneas, componentes y loader del kit, titular de categoría y visual en cada sección. El diseño conserva identidad personal, contenido real, composición propia y motion nativo/GSAP; las diferencias permanecen abiertas y se enumeran completas.

## 1. nav

Destino: div.site-shell > header.site-header > nav.wrap.atlas-grid > a.navigation__brand "David Villegas Sandoval"

Anchos: 1440, 390. Fuente: consistency.

nav link wraps to a second line

Indicación del checker: make the nav one bar from the content's left edge to its right edge, with every link and action inside it

## 2. scroll-linked

Destino: div.case-study__body > figure.case-study__figure > a.case-study__image-link > div.case-study__image-stage

Anchos: 1440, 390. Fuente: consistency.

moves with the scroll on a CSS scroll timeline (animation-timeline: view()); 1 more part of this section change with the scroll too (div.case-study__image-stage)

Indicación del checker: remove the scroll-driven motion; motion lives inside a visual as a small loop

## 3. scroll-linked

Destino: h2#principles-title > span.method-word:nth-of-type(1) "Cómo"

Anchos: 1440. Fuente: consistency.

moves with the scroll on a CSS scroll timeline (animation-timeline: view()); 5 more parts of this section change with the scroll too (span.method-word:nth-of-type(2), span.method-word:nth-of-type(3), span.method-word:nth-of-type(4), span.method-word:nth-of-type(6), ...)

Indicación del checker: remove the scroll-driven motion; motion lives inside a visual as a small loop

## 4. no-visual

Destino: section#home "David Villegas Sandoval."

Anchos: 1440, 390. Fuente: consistency.

no picture, effect or mock in this section; a feature section needs a visual

Indicación del checker: give the section a visual: a UI fragment on a ground, real icons, or a photograph that fits

## 5. no-visual

Destino: section#experience "Experiencia en equipos y productos."

Anchos: 1440, 390. Fuente: consistency.

no picture, effect or mock in this section; a feature section needs a visual

Indicación del checker: give the section a visual: a UI fragment on a ground, real icons, or a photograph that fits

## 6. no-visual

Destino: section#principles "Cómo llevo una idea a producción."

Anchos: 1440, 390. Fuente: consistency.

no picture, effect or mock in this section; a feature section needs a visual

Indicación del checker: give the section a visual: a UI fragment on a ground, real icons, or a photograph that fits

## 7. button-styles

Destino: (one screen)

Anchos: 1440. Fuente: consistency.

3 button styles on one screen: pill, fill #e7e3d8 ("EN"); pill, fill #1746c6 ("Explorar mi trabajo"); pill, outline #9e9f95 ("Descargar CV"); the odd one out: "Descargar CV"

Indicación del checker: one primary and one secondary button: one shape, one height per size, one label size

## 8. button-styles

Destino: (the page)

Anchos: 1440, 390. Fuente: consistency.

3 button styles on the page: pill, fill #e7e3d8 x1 ("EN"); pill, fill #1746c6 x1 ("Explorar mi trabajo"); pill, outline #9e9f95 x1 ("Descargar CV")

Indicación del checker: one primary and one secondary button: one shape, one height per size, one label size

## 9. cta

Destino: section#contact "Empleo senior o consultoría."

Anchos: 1440. Fuente: consistency.

the last section before the footer ends with no button

Indicación del checker: add the action: a button in the hero, one on every priced item, one in the closing section

## 10. copy-headline

Destino: h1#hero-title "David Villegas Sandoval."

Anchos: 1440. Fuente: consistency.

"David Villegas Sandoval." does not name what is sold (software engineering, software, engineering, from flags); only the line under it does

Indicación del checker: put the category noun in the h1 (and who it is for, or where), in 2 to 8 words

## 11. copy-headings

Destino: h3#poultry-title "Poultry"

Anchos: 1440. Fuente: consistency.

"Poultry" names no product, part, place or section (12 headings like it; at most one brand line per page) (and 11 more like it: "Nutry", "Blaze", "Polodev SPA", "Falabella", ...)

Indicación del checker: name the thing in every heading: the product, a part, the place or a section noun

## 12. heading-scale

Destino: h3#poultry-title "Poultry"

Anchos: 1440, 390. Fuente: consistency.

an h3 at 56px, as large as the smallest h2 (56px) or larger (and 1 more like it: "Nutry")

Indicación del checker: size headings by level: the h1 largest, one size per level, each level below the one above

## 13. heading-scale

Destino: h2#principles-title "Cómo llevo una idea a producción."

Anchos: 1440. Fuente: consistency.

h2 headings in 4 sizes, 56px ("Experiencia en equipos y") to 86.4px (x1.54)

Indicación del checker: size headings by level: the h1 largest, one size per level, each level below the one above

## 14. off-grid

Destino: li:nth-of-type(1) > div.experience-list__content > ul.chip-list > li:nth-of-type(2) "Node.js"

Anchos: 1440, 390. Fuente: consistency.

left edge at 708px, 6px off a common edge of its section at 714px (6 elements, like time:nth-of-type(2))

Indicación del checker: move it onto the page margin, or the column edge its section uses

## 15. effect-kind

Destino: (the page)

Anchos: 1440. Fuente: consistency.

a service page (--type) moves with the scroll: scroll libraries or timelines (animation-timeline: view, view-timeline, ScrollTrigger, ScrollSmoother): effects fit tech, gaming and software pages and a product with a technical subject, never a place, shop or service page (house rule)

Indicación del checker: take the scroll-driven motion off: on a place, shop or service page the page scrolls plainly and the parts sit still

## 16. motion-layer

Destino: html[data-motion]

Anchos: 1440. Fuente: consistency.

the page marks <html data-motion> but motion.css is not loaded: buttons, links, cards and photos answer nothing on hover

Indicación del checker: link assets/motion/motion.css after cards.css and keep data-motion on <html> (both, or neither)

## 17. hero-enter

Destino: section#home

Anchos: 1440. Fuente: consistency.

the hero does not enter on load: no head line setting html.m-enter (motion.md, The hero's entrance)

Indicación del checker: put data-enter on the hero <section> and keep the head line from starter.html that sets html.m-enter

## 18. moment-none

Destino: (the page)

Anchos: 1440. Fuente: consistency.

a service page (--type) deals no moment: every kind carries one, two on a long page (moments.md)

Indicación del checker: deal one (moments.mjs pick --page service --photo) and mount it in its own section

## 19. section-height

Destino: section#projects "Productos que conectan la operación.Seis"

Anchos: 1440, 390. Fuente: consistency.

the section is 2820px tall (3.1 screens), 1020px over two screens (1800px): every section after the hero is one screen or two, 2px either way (SR-2)

Indicación del checker: set the section to one screen or two (height: calc(var(--h,1) * 100vh), --h 1 or 2) and cut or split its content to fit

## 20. section-height

Destino: div#root > div.site-shell > footer.site-footer "© 2026 David Misael Villegas SandovalIng"

Anchos: 1440. Fuente: consistency.

the section is 101px tall (0.1 screens), 799px short of one screen (900px): every section after the hero is one screen or two, 2px either way (SR-2)

Indicación del checker: set the section to one screen or two (height: calc(var(--h,1) * 100vh), --h 1 or 2) and cut or split its content to fit

## 21. section-height

Destino: section#experience "Experiencia en equipos y productos.Desde"

Anchos: 1440, 390. Fuente: consistency.

the section is 1851px tall (2.1 screens), 51px over two screens (1800px): every section after the hero is one screen or two, 2px either way (and 2 more like it: "Empleo senior o consulto", "Cómo llevo una idea a pr") (SR-2)

Indicación del checker: set the section to one screen or two (height: calc(var(--h,1) * 100vh), --h 1 or 2) and cut or split its content to fit

## 22. section-height

Destino: section#contact "Empleo senior o consultoría.¿Buscas suma"

Anchos: 1440, 390. Fuente: consistency.

the section starts at 6474px, 174px below the screen grid (7 x 900px): sections start on whole screens (SR-2)

Indicación del checker: make every section above it exactly one or two screens tall, so this one starts on a whole screen

## 23. section-height

Destino: section#principles "Cómo llevo una idea a producción. Un pro"

Anchos: 1440. Fuente: consistency.

the section starts at 5571px, 171px below the screen grid (6 x 900px): sections start on whole screens (SR-2)

Indicación del checker: make every section above it exactly one or two screens tall, so this one starts on a whole screen

## 24. section-air

Destino: article#poultry "PoultryERP avícolaTrazabilidad operativa"

Anchos: 1440. Fuente: consistency.

a top border across 100% of the container, between the section's content: sections and their parts are told apart by air and ground, not lines (SR-3)

Indicación del checker: take the rule out: sections and their parts are parted by their ground and the air between them

## 25. section-air

Destino: article#nutry "NutrySoftware nutricionalConsulta nutric"

Anchos: 1440. Fuente: consistency.

a top border across 100% of the container, between the section's content: sections and their parts are told apart by air and ground, not lines (SR-3)

Indicación del checker: take the rule out: sections and their parts are parted by their ground and the air between them

## 26. section-air

Destino: div#capabilities "Herramientas con las que trabajoElijo la"

Anchos: 1440. Fuente: consistency.

a top border across 100% of the container, between the section's content: sections and their parts are told apart by air and ground, not lines (and 1 more like it: "david@dvillegas.cl") (SR-3)

Indicación del checker: take the rule out: sections and their parts are parted by their ground and the air between them

## 27. one-section

Destino: section#principles "Cómo llevo una idea a producción. Un pro"

Anchos: 1440. Fuente: consistency.

the screen at scroll 6300px (stride 7) shows 174px of section 4 beside section 5: a screen shows one section (another may peek 8px, 24px WARN) (SR-4)

Indicación del checker: make each section exactly one screen or two, so a screen shows one section and no neighbour peeks

## 28. one-section

Destino: section#experience "Experiencia en equipos y productos.Desde"

Anchos: 1440, 390. Fuente: consistency.

the screen at scroll 5400px (stride 6) shows 171px of section 3 beside section 4: a screen shows one section (another may peek 8px, 24px WARN) (SR-4)

Indicación del checker: make each section exactly one screen or two, so a screen shows one section and no neighbour peeks

## 29. one-section

Destino: section#projects "Productos que conectan la operación.Seis"

Anchos: 1440. Fuente: consistency.

the screen at scroll 3600px (stride 4) shows 120px of section 2 beside section 3: a screen shows one section (another may peek 8px, 24px WARN) (and 2 more like it: scroll 6552px, scroll 6474px) (SR-4)

Indicación del checker: make each section exactly one screen or two, so a screen shows one section and no neighbour peeks

## 30. container-edges

Destino: div#root > div.site-shell > header.site-header "DavidVillegas SandovalTrabajoTrayectoria"

Anchos: 1440. Fuente: consistency.

the nav's first box starts at 104px and its last ends at 1336px, not on its .wrap at 80-1360px (SR-6)

Indicación del checker: use one container on every section and the nav (.wrap): one margin left and right, 64-120px on a desktop, 16-24px on a phone

## 31. container-edges

Destino: div#root "Saltar al contenidoDavidVillegas Sandova"

Anchos: 1440. Fuente: consistency.

a <div> at the top of the page, outside header.nav, main, footer.closing and nav.actionbar (SR-6)

Indicación del checker: build the page as header.nav, a main of sections (each one in-flow .wrap plus background layers) and footer.closing

## 32. container-edges

Destino: section#home > div.wrap.page-width "David Villegas Sandoval.Ingeniero de Sof"

Anchos: 1440. Fuente: consistency.

the hero's .wrap holds 2 children, 0 of them .hero-text: one .hero-text and at most one strip (SR-6)

Indicación del checker: build the page as header.nav, a main of sections (each one in-flow .wrap plus background layers) and footer.closing

## 33. container-edges

Destino: article#poultry > div.case-study__body > div.case-study__copy > p.case-study__tagline "Trazabilidad operativa desde la nave has"

Anchos: 1440. Fuente: consistency.

6 text blocks start on a left line at x 845, 765px from the container's left: text starts on the container's left, or on one split line (x 623, 732, 841) (also "Mi aporte", "Diseño y desarrollo de una base ", "Consulta nutricional, recetas y ") (SR-6)

Indicación del checker: start the text on the container's left, or on the one split line every split shares

## 34. container-edges

Destino: section#experience > div.wrap.atlas-grid > ol.experience-list > li:nth-of-type(1) "2024 / 11—2026 / 07BlazeSenior Software "

Anchos: 1440. Fuente: consistency.

36 text blocks start on a left line at x 631, 551px from the container's left: text starts on the container's left, or on one split line (x 623, 732, 841) (also "2024 / 11", "Blaze", "Senior Software Engineer") (SR-6)

Indicación del checker: start the text on the container's left, or on the one split line every split shares

## 35. row-lines

Destino: article#medisenda "MedisendaProducto de saludPróximamente e"

Anchos: 1440. Fuente: consistency.

a row of 3 items: its items are 60/115/46px tall, not one height (2px either way) (SR-7)

Indicación del checker: start the row's first item on the container's left line and end its last on the right line, every item one height

## 36. split-pair

Destino: article#poultry > div.case-study__body "Trazabilidad operativa desde la nave has"

Anchos: 1440. Fuente: consistency.

the two columns of the split start 101px apart at the top (centred on each other): a split's columns are top-aligned, 8px either way (SR-8)

Indicación del checker: top-align both columns of the split (align-items: start)

## 37. split-pair

Destino: article#nutry > div.case-study__body "Consulta nutricional, recetas y planific"

Anchos: 1440. Fuente: consistency.

the two columns of the split start 101px apart at the top (centred on each other): a split's columns are top-aligned, 8px either way (SR-8)

Indicación del checker: top-align both columns of the split (align-items: start)

## 38. split-pair

Destino: section#experience > div.wrap.atlas-grid "Experiencia en equipos y productos.Desde"

Anchos: 1440. Fuente: consistency.

the split's columns are off the page's one pair of lines: its right column starts at x 631, the first split's at 845; its right column starts at x 631, on none of the split lines 623 (k=5), 732 (k=6), 841 (k=7) (SR-8)

Indicación del checker: start every split's right column on one shared line (wrap.left + k x (width + 24) / 12, k 5, 6 or 7; 6 on a place page) and end the left one 24px before it

## 39. row-gap

Destino: section#home > div.wrap.page-width > div.hero__baseline > a.hero__scroll

Anchos: 390. Fuente: consistency.

fills 14% of its grid row and leaves 86% of it empty on the left

Indicación del checker: fill the row at this width: span the columns, or stack the split

## 40. text-only

Destino: section#contact "Empleo senior o consultoría."

Anchos: 390. Fuente: consistency.

the closing section is only text: no picture, icon, mock or effect in it

Indicación del checker: give the section a visual: a photograph that fits, the real icons, or a UI fragment on a ground

## 41. edge-left

Destino: header.section-heading.section-heading--inline p "Seis productos construidos alred"

Anchos: 1440. Fuente: layout.

starts at x 844.7; the lines are 80 and the column starts

Indicación del checker: start it on the .wrap left line

## 42. edge-left

Destino: header.case-study__heading p "ERP avícola"

Anchos: 1440, 390. Fuente: layout.

starts at x 1281.4; the lines are 80 and the column starts

Indicación del checker: start it on the .wrap left line

## 43. edge-right

Destino: #projects figure.case-study__figure

Anchos: 1440. Fuente: layout.

ends at x 801.5; the right line is 1360

Indicación del checker: end it on the .wrap right line

## 44. edge-left

Destino: #projects p.case-study__tagline "Trazabilidad operativa desde la "

Anchos: 1440. Fuente: layout.

starts at x 844.7; the lines are 80 and the column starts

Indicación del checker: start it on the .wrap left line

## 45. edge-left

Destino: #projects p "Diseño y desarrollo de una base "

Anchos: 1440. Fuente: layout.

starts at x 844.7; the lines are 80 and the column starts

Indicación del checker: start it on the .wrap left line

## 46. edge-left

Destino: header.case-study__heading p "Software nutricional"

Anchos: 1440, 390. Fuente: layout.

starts at x 1223.5; the lines are 80 and the column starts

Indicación del checker: start it on the .wrap left line

## 47. edge-left

Destino: #projects p.case-study__tagline "Consulta nutricional, recetas y "

Anchos: 1440. Fuente: layout.

starts at x 844.7; the lines are 80 and the column starts

Indicación del checker: start it on the .wrap left line

## 48. edge-left

Destino: #projects p "Arquitectura y desarrollo de ges"

Anchos: 1440. Fuente: layout.

starts at x 844.7; the lines are 80 and the column starts

Indicación del checker: start it on the .wrap left line

## 49. edge-left

Destino: #experience ol.experience-list "2024 / 11—2026 / 07BlazeSenior S"

Anchos: 1440. Fuente: layout.

starts at x 631.3; the lines are 80 and the column starts

Indicación del checker: start it on the .wrap left line

## 50. edge-left

Destino: header p "¿Buscas sumar un ingeniero a tu "

Anchos: 1440. Fuente: layout.

starts at x 844.7; the lines are 80 and the column starts

Indicación del checker: start it on the .wrap left line

## 51. edge-left

Destino: header p.contact__availability "Trabajo remoto y colaboración co"

Anchos: 1440. Fuente: layout.

starts at x 844.7; the lines are 80 and the column starts

Indicación del checker: start it on the .wrap left line

## 52. edge-left

Destino: footer.site-footer p "Ingeniero de Software Senior"

Anchos: 1440. Fuente: layout.

starts at x 1195.5; the lines are 80 and the column starts

Indicación del checker: start it on the .wrap left line

## 53. one-sided

Destino: #projects section.section-shell.deferred-section "Productos que conectan la operac"

Anchos: 1440. Fuente: layout.

its visuals end at x 801.5, short of the right line 1360

Indicación del checker: let the row reach both .wrap edges

## 54. neighbour

Destino: #contact section.contact.deferred-section "Empleo senior o consultoría.¿Bus"

Anchos: 390. Fuente: layout.

framed, 26px of #principles section.section-shell.deferred-section "Cómo llevo una idea a producción" shows

Indicación del checker: keep the next section's heading and picture out of this screen
