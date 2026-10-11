# Resultado de la mejora del portfolio

Implementación iniciada el 10/10/2026; cierre de la revisión el 11/10/2026. Cambios sobre el proyecto Astro existente, sin frameworks ni dependencias nuevas.

## Cambios y decisiones

- **Hero:** rol Full Stack explícito, propuesta sobre aplicaciones/APIs/webs, descripción visible, contacto y proyectos como CTAs, CV/LinkedIn/experiencia como accesos secundarios. ARC permanece como firma visual y ocupa menos espacio. Asistente cerrado inicialmente en `details` nativo; intro voluntaria repetible, sin bloqueo al cargar.
- **Recorrido:** proyectos inmediatamente después del hero. La navegación incluye contacto y calcula la sección activa por su posición real. En móvil se compacta y permanece visible al desplazarse; conserva navegación horizontal nativa y enlaces de idioma con nombre accesible y fragmento.
- **Proyectos:** se conservan 13 grupos, 16 webs, filtros, selector de ciudades, mockups, capturas y visor. Autoría confirmada por Manuel en ES/EN: desarrollo original, mejoras en BdeBarefoot y mantenimiento en Bomtie. El conjunto turístico advierte que Manuel no realizó el rediseño posterior mostrado por las capturas actuales.
- **Evidencia técnica:** tres resúmenes ampliables: ARFE completo con Laravel/MySQL, API Django REST Framework de Córdoba Embrujada y ERP Laravel/MySQL de MJ. ARFE incluye contexto, alcance, entrega y estado en producción. Campos adicionales editables, ausentes hasta confirmación. La imagen privada de ARFE se revisó localmente y no se publica.
- **Experiencia:** seis puestos, empresas, fechas y funciones intactos. Una función principal visible por puesto permite comprender su alcance sin desplegar cada tarjeta.
- **Stack:** seis grupos de experiencia aplicada con referencias a puestos; se conserva el catálogo de conocimientos, formación, núcleo interactivo y pestañas con teclado. No se añaden niveles porcentuales ni Symfony sin evidencia.
- **Contacto:** sección real con intención entrevista/equipo y proyecto/colaboración, asuntos de correo localizados, dirección legible, WhatsApp y LinkedIn. Mensaje neutral, sin disponibilidad inventada. El dock se oculta cuando esta sección está visible; se elimina la flecha continua que señalaba controles flotantes.
- **J.A.R.V.I.S.:** guía local explícita, respuestas sobre Django, ARFE/backend, ERP, stack y CV; sugerencias y navegación. Conserva la interacción del easter egg y abre el desplegable cuando una tarea conduce al campo de preguntas.
- **Diseño/accesibilidad:** materiales opacos más tranquilos, contraste de acentos, objetivos táctiles, foco visible, escenas menos dominantes y supresión de movimiento continuo en órbitas de habilidades y escena del perfil. Conserva rojo/azul, ARC, aficiones, animaciones de entrada y recompensa opcional.
- **SEO/hosting:** títulos y descripciones por idioma, canonical/hreflang, OG/Twitter, Person JSON-LD, imagen social PNG 1200×630 y endpoints robots/sitemap. Recursos, CV, fondos CSS y selector de idioma funcionan bajo `/portfolio/`. Workflow manual preparado para GitHub Pages; no se ha publicado ni hecho push.

## Pruebas ejecutadas

| Comprobación | Resultado real |
| --- | --- |
| `npm.cmd run build` en configuración local | PASS: dos páginas y endpoints estáticos |
| Build con `PUBLIC_SITE_URL=https://msmc98.github.io` y `PUBLIC_BASE_PATH=/portfolio` | PASS: salida estática compatible con ruta de proyecto |
| `npm.cmd test` | PASS: los cuatro scripts terminaron con código 0 |
| `verify-gallery.mjs` | PASS: las 16 webs, filtros, selector, mockups, visor/Escape, enlaces de correo/WhatsApp, ES/EN, movimiento reducido y ausencia de desbordamiento móvil |
| `verify-details.mjs` | PASS: intro voluntaria y repetible, progreso completo, salto, movimiento reducido, seis puestos/fechas, navegación activa y móvil |
| `verify-interactions.mjs` | PASS: pestañas/teclado, aficiones/filtros/visor, logos y enlaces, cinco acciones del easter egg/recompensa, persistencia de sesión entre idiomas, traducciones y cuatro tamaños |
| `verify-professional.mjs` en desarrollo y build estático bajo `/portfolio/` | PASS: dos idiomas, cinco anchuras, tres casos, seis grupos de stack, dos intenciones de contacto, respuestas locales, IDs únicos, anclas válidas, recursos locales HTTP 200, Person/metadatos y canonical de Pages |
| Excepciones de ejecución y `console.error` durante la nueva prueba | Ninguna registrada en las ejecuciones que pasaron, incluida producción |
| Navegación móvil al desplazarse y contacto sin dock superpuesto | PASS tras corregir especificidad de `inset` y comportamiento sticky |
| `git diff --check` | PASS, sin errores de espacios; avisos de conversión LF/CRLF propios de la configuración Git |

Tamaños de la verificación adicional: **320, 390, 760, 1440 y 1920 px**. La suite anterior añade **768, 1024 y 1280 px**. Navegador: Chromium de Microsoft Edge, headless, con emulación de pantalla; no dispositivos físicos.

Se revisaron visualmente capturas reales del hero de escritorio y móvil, contacto móvil, casos móviles e imagen social. Se comprobaron tamaño y legibilidad, jerarquía, posición del reactor, navegación persistente y ausencia de solapamiento del dock en contacto. Capturas reproducibles en `.astro/professional-es-1440.png`, `.astro/professional-es-390.png`, `.astro/contact-es-390.png`, `.astro/cases-es-390.png` y equivalentes EN. `.astro/professional-validation.json` conserva el inventario de la prueba adicional; estos archivos son locales e ignorados por Git.

## Incidencias encontradas y resueltas

El navegador se desconectó al ejecutarse dentro del sandbox; se repitieron las comprobaciones con los permisos concedidos. Se actualizaron expectativas antiguas que exigían intro automática y ausencia de contacto real. El helper CDP ahora espera DOMContentLoaded al navegar para evitar evaluar la página anterior. Se corrigió un enlace `#` provisional en el visor de aficiones. La revisión móvil detectó estilos scoped que anulaban la cabecera compacta y el `top` de sticky; se corrigieron y se verificaron en producción.

Los logs históricos del servidor de desarrollo incluían errores del audit de la barra de Astro y un fichero temporal bloqueado en `.astro`; no constituyen una medición de errores del portfolio publicado. Las pruebas finales controlan excepciones/console.error de sus propias sesiones y el build estático separa la validación de la barra de desarrollo.

## Límites y siguientes iteraciones

No se ejecutó Lighthouse ni se midieron Core Web Vitals de campo, LCP, INP o CLS. No se afirma ninguna puntuación ni mejora porcentual. Se preservan capturas WebP con dimensiones, lazy loading y fuentes con swap/preconnect; no se instalaron dependencias de optimización. La revisión de accesibilidad es básica (semántica, anclas, teclado en controles existentes, foco, tamaños y movimiento reducido), no una certificación WCAG ni una prueba con lector de pantalla.

Los recursos locales y CTAs están comprobados; no se enviaron correos, mensajes ni formularios. No se ha auditado en esta fase la disponibilidad HTTP actual de las 16 webs externas ni el estado del perfil de LinkedIn. GitHub permanece opcional sin enlace configurado.

Los casos de Córdoba Embrujada y ERP MJ son resúmenes de contribución documentada, no relatos completos de arquitectura. Faltan decisiones, retos y aprendizajes confirmados; el stack de la mayoría de webs todavía no está acreditado por proyecto. Las preguntas y estructura de edición están en [project-evidence.md](project-evidence.md). Próxima prioridad: capturas originales del turismo y una versión anonimizada de ARFE con permiso de publicación, seguida de detalles técnicos publicables y mediciones Lighthouse en producción.

La URL de Pages está inferida del repositorio y de la intención de hosting indicada: `https://msmc98.github.io/portfolio/`. El workflow es manual y debe habilitarse en Settings → Pages cuando se vaya a publicar. `robots.txt` bajo `/portfolio/` no controla el host: Google exige el archivo en la raíz; la limitación y el envío del sitemap se documentan en [README](../README.md). No se ha añadido analítica.

## Archivos principales modificados o añadidos

| Área | Archivos |
| --- | --- |
| Composición y conversión | `PortfolioPage.astro`, `Hero.astro`, `Sidebar.astro`, `ProjectCTA.astro`, `FloatingContact.astro` |
| Proyectos y evidencia | `ProjectGallery.astro`, `CaseStudies.astro`, `project-gallery.ts`, `case-studies.ts`, `project-evidence.md` |
| Experiencia y habilidades | `Experience.astro`, `Skills.astro`, `verified-stack.ts` |
| Interacciones | `JarvisBoot.astro`, `JarvisAssistant.astro`, `EasterEgg.astro`, `Hobbies.astro` |
| Idiomas y diseño | `es.ts`, `en.ts`, `interface.ts`, `global.css` |
| SEO y Pages | `Layout.astro`, `site.ts`, `paths.ts`, `robots.txt.ts`, `sitemap.xml.ts`, `astro.config.mjs`, `.env.example`, `.github/workflows/pages.yml`, `social-card.svg/png` |
| Validación y documentación | `package.json`, cuatro `verify-*.mjs`, `scripts/lib/browser.mjs`, `serve-built.mjs`, `README.md`, `guia-del-portfolio.md`, este informe y el plan inicial |

`src/data/experience.ts`, los JSON de capturas, el PDF y los datos profesionales existentes se conservan; no se han retirado proyectos, empleos ni aficiones.

## Actualización: dashboard ARFE anonimizado (11/10/2026)

Tras la solicitud posterior de Manuel, se incorporó una versión editada del dashboard con datos ficticios a la galería de escritorio y al caso ampliable. El original sigue privado. Se sustituyeron nombres, DNI, pólizas, cifras operativas, fecha y retenciones; se retiró la barra del navegador. La vista móvil conserva el login real. Esta actualización resuelve el pendiente de captura pública anonimizada: ver [arfe-anonymization.md](arfe-anonymization.md). El build volvió a pasar después de incorporar el recurso.

## Recorrido compacto y espaciado (11/10/2026)

Manuel confirmó más de 50 proyectos empresariales end-to-end, incluyendo webs corporativas, e-commerce, dashboards, backends y apps móviles. `professional-summary.ts` centraliza el dato para ES/EN y J.A.R.V.I.S.; las 16 webs de la galería se identifican como selección, sin inventar nuevas fichas.

Se retiraron subtítulos introductorios y rótulos redundantes del hero, proyectos, casos y contacto. Cinco desplegables nativos, cerrados inicialmente, conservan la galería completa, el proceso de trabajo, los seis empleos, stack/formación y las 29 aficiones. Los tres casos destacados y el contacto permanecen visibles. `SectionDisclosure.astro` comparte presentación, foco y apertura de ancestros al navegar a contenido oculto.

`global.css` controla el padding simétrico de las siete secciones: 64 px en escritorio, 56 px hasta 1100 px y 40 px hasta 760 px. También controla separación de contenidos y elimina márgenes finales de grupos ocultos. Se retiraron paddings locales, altura mínima artificial del hero y escalonado de la experiencia. El menú utiliza márgenes verticales automáticos iguales entre logo e idioma. Los tres casos usan tres columnas o una, y las tarjetas tienen una superficie distinta de la sección.

Pruebas ejecutadas: build y los cuatro scripts existentes pasan; `verify-spacing.mjs` comprueba ES/EN en 320, 390, 760, 761, 1100, 1101, 1440 y 1920 px, desplegables abiertos/cerrados, padding y hueco inferior medidos, ausencia de desbordamiento, centrado del menú y apertura por teclado. Sus capturas y mediciones se guardan en `.astro` (ignorado). Se añade al comando `npm test`.

La fotografía existente de Manuel se integra al final con el título de contacto en un bocadillo. La versión WebP de 600 × 600 conserva transparencia y evita cargar el PNG de 1,4 MB. No se añade texto promocional ni una identidad generada nueva.

## Marca y experiencia freelance (11/10/2026)

La marca del menú pasa a «mzdev», dibujada en SVG con blanco, azul y rojo; el favicon usa «mz» para conservar legibilidad a pequeño tamaño. El logo no carga fuentes ni imágenes rasterizadas. Se mantiene el centrado de la navegación respecto al logo y al idioma.

Manuel confirmó experiencia freelance desde 2022 y vigente: desarrollo de proyectos a medida, principalmente con Django, y despliegue en PythonAnywhere. Se incorpora como séptima entrada junto a los seis empleos originales, sin inventar clientes, métricas ni responsabilidades. PythonAnywhere se añade al stack de despliegue, sin referencias a empresas. Las fechas se muestran como «2022 — actualidad» / «2022 — present».

Otros ajustes solicitados: se eliminan los enlaces repetidos «Ver funciones» del stack y los nombres de empresas en esa sección; se añade Instagram @manu98mz al contacto; el correo se muestra como «Email» conservando `mailto:`; el footer elimina LinkedIn, añade autoría/derechos reservados y reduce su padding inferior a 32 px en escritorio y 24 px en móvil.

## Hero con mayor ancho de texto (11/10/2026)

A petición de Manuel, la columna izquierda ocupa todo el ancho disponible: se eliminan el límite de 660 px del contenedor y el de 55 caracteres del párrafo. El reactor reserva 210 px y el hueco central baja de 40 a 32 px en escritorio. El hero usa un token de padding simétrico propio (96/80/48 px según pantalla) para dar más aire arriba y abajo; el resto conserva el espaciado uniforme de 64/56/40 px. La prueba de espaciado comprueba esa excepción intencional, el ancho completo del texto, ambos idiomas y ocho anchuras. Build y prueba de espaciado pasan.

## Introducción automática restaurada (11/10/2026)

Manuel solicitó restaurar la intro automática al entrar y retirar el botón de reproducción del hero. La secuencia se inicia en cada carga, mantiene el botón «Saltar intro» y Escape, y se omite con `prefers-reduced-motion: reduce`. Esta decisión sustituye la reproducción exclusivamente voluntaria documentada en la auditoría inicial. La prueba de detalles comprueba entrada y recarga, ES/EN, progreso, salto, movimiento reducido y ausencia del botón manual.

## Idiomas, diseño y alineación lateral (11/10/2026)

Manuel confirmó inglés B2, capacidad para trabajar en entornos internacionales europeos y nociones de diseño adquiridas en proyectos profesionales. Se muestran B2 en el hero, el contexto internacional dentro de stack/formación y el diseño como conocimientos básicos aplicados, sin certificación ni nivel avanzado supuesto. J.A.R.V.I.S. responde consultas de idiomas con esa misma información.

El menú comparte tokens para padding lateral, ancho de icono y separación. Idioma, opciones EN/ES y texto de sistema/localización se alinean con la columna de etiquetas de navegación; el icono de contacto también tiene el mismo ancho que los demás. En móvil se mantiene la cabecera compacta. La prueba de espaciado mide la alineación horizontal además del centrado vertical.

## Roles, liderazgo y selector de idiomas (11/10/2026)

Por indicación posterior de Manuel, inglés B2 queda en stack/formación y se retira del hero. Titular, puesto y descripción del hero usan `text-wrap: balance`. «Cómo trabajo» muestra tres roles (Full Stack, Backend y Team Lead) en una fila en escritorio o una columna en pantallas pequeñas; sus datos se separan en `professional-roles.ts`.

Manuel confirmó que actualmente lleva el departamento de desarrollo y lidera equipos internos y becarios. Se añade esa responsabilidad al puesto vigente, conservando el título y fechas del CV. Team Lead se presenta como capacidad respaldada por esa responsabilidad actual; no se inventan tamaño del equipo, fecha de promoción o resultados. J.A.R.V.I.S. también responde consultas sobre liderazgo.

`LanguageFlag.astro` dibuja las banderas de Reino Unido y España como SVG locales decorativos. Se conservan etiquetas y nombres accesibles EN/ES; los iconos comparten la columna de los iconos de navegación y el texto de idioma sigue alineado con las demás etiquetas.

## Logo compacto y centrado del hero (11/10/2026)

El logo pasa a un hexágono de seis lados con «mz» y «dev» debajo, sin marca horizontal adicional. Usa trazos ligeros y conserva blanco, azul y rojo. Su ancho baja de 200 a 76 px (68 px hasta 1100 px). El favicon comparte la nueva geometría; no se añaden fuentes ni dependencias.

La línea HUD entra en el flujo normal, seguida de `hero-body` con padding simétrico de 96/80/48 px. En escritorio el bloque de texto queda centrado entre esa línea y el final del hero. En pantallas de una columna se equilibra el conjunto texto/reactor. Esto sustituye el padding simétrico medido desde el borde superior de toda la sección. Se conserva el ancho completo de la columna y el alineado del menú.

Validación ejecutada: `npm.cmd run build` y `npm.cmd test`, ambos con salida 0. Las cinco pruebas pasan; espaciado comprueba distancias desde la línea HUD, tamaño compacto del logo, ocho anchuras (320, 390, 760, 761, 1100, 1101, 1440 y 1920), ambos idiomas y desplegables abiertos/cerrados. Se revisaron visualmente las capturas de escritorio y móvil generadas en `.astro/`.

## Celosía de relojes de arena (11/10/2026)

Se añade `src/assets/textures/time-lattice.svg`, una trama vectorial original de relojes de arena geométricos con filas alternadas y líneas diagonales. La referencia estética solicitada es la AVT de Loki, adaptada a la paleta azul del portfolio. El material se comparte en tarjetas de casos, galería, roles, experiencia, stack, formación, catálogo y aficiones, además del panel de proceso. Las capturas de proyectos y fotografías conservan su presentación.

La textura se coloca como fondo decorativo sobre el degradado, sin elementos interactivos, animación ni cambios de padding. Vite la integra como data URL en el CSS del build, evitando peticiones adicionales y problemas con el prefijo de GitHub Pages. `--card-texture` controla el recurso compartido; tamaño y repetición se definen en una única regla de `global.css`.

Validación de esta iteración: build y `node scripts/verify-spacing.mjs` con salida 0. La prueba cubre ambos idiomas y ocho anchuras, con desplegables abiertos y cerrados, sin desbordamiento horizontal ni cambios en el espaciado. Se inspeccionaron las capturas nuevas de las tarjetas de proyectos en 1440 y 390 px para revisar trama y legibilidad.

La revisión posterior sustituye el reloj genérico por la silueta angular en «Z» de la [referencia aportada por Manuel](https://prostitcher.com/shop/tva-hourglass/), con triángulos abiertos y orientaciones vertical/horizontal alternadas. Se dibuja como SVG local en azul oscuro `#0a2344`, en un módulo de 144 × 144 px y 726 bytes. La previsualización consultada permanece en `.astro/`, sin incluirse en los recursos publicados. Se repitieron build y prueba de espaciado con salida 0 y se revisaron las nuevas capturas de 1440 y 390 px.

## Favicon transparente y desplegables compactos (11/10/2026)

El favicon conserva «mz / dev» y el hexágono sobre fondo transparente. Usa tonos oscuros para el tema claro y claros para el oscuro mediante `prefers-color-scheme`, con trazos algo más gruesos para tamaños pequeños. La previsualización local confirma transparencia en ambos temas y genera capturas de 16, 32, 64 y 128 px, inspeccionadas visualmente. El enlace usa la versión 8 para renovar la caché.

Todos los `summary` del contenido principal comparten un botón ajustado al texto, con área táctil mínima de 44 px y padding uniforme de 10 × 14 px. Se retiran las barras de ancho completo, los bordes largos y los signos «+». Un triángulo decorativo CSS gira al abrir; se mantienen `details` nativos, teclado, foco y enlaces a contenido oculto. La transición se omite con movimiento reducido.

La trama de relojes mantiene su geometría y color; su opacidad baja de .85 a .26 y las conexiones de .60 a .18, reduciendo aproximadamente un 70 % su intensidad. No cambia el espaciado de las tarjetas ni se añaden filtros de desenfoque o animaciones.

Build final y las cinco pruebas de `npm.cmd test` pasan con salida 0, incluyendo interacción, teclado, recursos, ambos idiomas y responsive. Las previsualizaciones del favicon son comprobaciones locales adicionales, no pruebas de la barra de pestañas de todos los navegadores.
