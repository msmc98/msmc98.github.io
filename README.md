# Portfolio de Manuel S. Muñoz Cobos

Portfolio bilingüe construido con Astro, con una interfaz inspirada en Iron Man: reactor ARC, arranque de J.A.R.V.I.S. y asistente interactivo.

## Desarrollo

```sh
npm install
npm run dev -- --background
npm run astro -- dev status
npm run astro -- dev logs
npm run astro -- dev stop
npm run build
```

- Inglés: http://localhost:4321/
- Español: http://localhost:4321/es/

## Contenido y componentes

- `src/components/PortfolioPage.astro`: estructura compartida de ambos idiomas.
- `src/components/Hero.astro`: presentación y reactor.
- `src/components/Profile.astro`: recorrido Conectar → Resolver → Construir con escenas de conversación, arquitectura y entrega; controles por pasos y teclado, transición por barrido y versión sin movimiento.
- `src/components/JarvisBoot.astro`: bienvenida de unos tres segundos con reactor ARC y barra de progreso; aparece al abrir o recargar el portfolio, permite saltar con el botón o Escape y respeta movimiento reducido.
- `src/components/Experience.astro` y `src/data/experience.ts`: línea de tiempo bilingüe con los seis puestos, fechas y funciones del CV facilitado (21/06/2026). El CV se publica como PDF descargable en `public/documents/`.
- `src/components/JarvisAssistant.astro`: accesos rápidos y preguntas con respuestas locales sobre el perfil. No necesita una API ni envía consultas a servicios externos.
- `src/content/en.ts` y `src/content/es.ts`: presentación, perfil y etiquetas.
- `src/content/interface.ts`: capacidades y contacto por correo, WhatsApp y LinkedIn. GitHub es opcional.
- `src/content/project-gallery.ts`: proyectos, dominios, sectores y descripciones en español e inglés. Las cuatro webs turísticas se presentan como un conjunto.
- `src/components/ProjectGallery.astro`: filtros por sector, selección de webs, entradas animadas y visor de capturas.
- `src/components/ProjectMockup.astro`: monitores y teléfonos construidos con CSS sobre capturas reales; inclinación y desplazamiento de la captura al interactuar.
- `public/images/employers/` y `src/data/employer-logos.json`: seis logos oficiales de las empresas del CV; el logo y el nombre de cada puesto enlazan a su web corporativa.
- `public/images/hobbies/` y `src/data/hobby-images.json`: imágenes locales con URL original, fuente y crédito; sin montajes generados.
- `public/projects/`: capturas WebP de escritorio y móvil, servidas localmente y con carga diferida.
- `src/data/project-captures.json`: fecha, URL, metadatos públicos y disponibilidad de cada captura. Los errores y páginas provisionales no se muestran como diseños del proyecto.
- `src/styles/global.css`: colores, tipografías y estilos compartidos.
- `src/components/Skills.astro`: núcleo interactivo con nodos Código, Datos y API, reacción al puntero y pestañas accesibles por teclado. Cada área muestra la formación y el centro del CV: MEDAC, Universidad de Córdoba y UNIR.
- `src/components/Hobbies.astro` y `src/content/hobbies.ts`: explorador editorial con índice visual de categorías, imagen protagonista y texto superpuesto, barrido diagonal entre imágenes, navegación por flechas y gestos, 29 tarjetas individuales deslizables y visor de imágenes; fotografías reales y material original de series y videojuegos. La foto de la Kawasaki procede del fabricante.
- `src/components/FloatingContact.astro`: botones flotantes de correo y WhatsApp. LinkedIn se conserva al pie de página.
- `src/components/EasterEgg.astro`: protocolo de cinco tareas reales; activa el reactor de la portada o el pequeño reactor del pie para descubrirlo. Las tareas se marcan al preguntar al asistente, ampliar una captura, abrir funciones de un puesto, explorar una afición y activar el núcleo. El progreso se conserva en la sesión y se comparte entre idiomas; puede reiniciarse.
- `src/components/SectionMotion.astro`: entradas al desplazarse, con contenido accesible sin JavaScript y respeto por movimiento reducido.
- `docs/visual-assets.md`: procedencia y créditos de las imágenes y logos oficiales. Se sirven versiones WebP optimizadas con carga diferida. Las capturas de proyectos conservan el contenido original de sus webs.

La bienvenida vuelve a mostrarse en cada carga de la página. Con movimiento reducido activado, se omite.

Las secciones de experiencia y capacidades usan únicamente la información facilitada. No se incluyen empresas, fechas, niveles de dominio ni titulaciones sin confirmar.

## Actualizar las capturas

El script usa un navegador Chromium instalado (Edge o Chrome en Windows), con un perfil temporal separado, para revisar únicamente las páginas públicas de inicio. Extrae título, descripción y encabezado; captura escritorio y móvil; rechaza avisos de cookies cuando hay una opción visible y espera a que terminen las animaciones de entrada. No inicia sesión ni envía formularios.

```sh
node scripts/capture-projects.mjs
node scripts/capture-projects.mjs lanvert longrock
```

Con el servidor de desarrollo activo, `node scripts/verify-gallery.mjs` comprueba filtros, selección de webs, visor, contacto, idiomas y movimiento reducido, y guarda capturas de revisión en `.astro/`.

`node scripts/verify-details.mjs` comprueba la bienvenida de J.A.R.V.I.S., la omisión de animaciones, los puestos del CV, la navegación y la adaptación a móvil.

`node scripts/verify-interactions.mjs` comprueba el easter egg completo, la recompensa, el progreso entre idiomas, los textos ES/EN, las pestañas con teclado, las aficiones, el contacto flotante y cuatro tamaños de pantalla.

## Actualizar imágenes y logos

```sh
node scripts/fetch-hobby-images.mjs paris
node scripts/fetch-employer-logos.mjs
```

Revisar visualmente los logos descargados antes de publicarlos: las webs pueden incluir marcas de colaboradores. Los archivos de procedencia conservan los enlaces originales.

Las secciones comparten un ancho interior máximo de 1180 px y los mismos márgenes adaptables. Los fondos de laboratorio se guardan en `public/images/laboratory/`; `docs/laboratory-prompts.md` documenta la generación integrada.

Los paneles comparten la clase `glass-panel`: cristal oscuro con desenfoque de 16 px y una alternativa casi opaca cuando no hay soporte. Los radios se centralizan en `--radius-panel` (12 px); el reactor y los controles circulares conservan su forma.

## Documentación completa

Consulta [la guía del portfolio](docs/guia-del-portfolio.md) para conocer cada sección, sus datos, componentes, animaciones y mantenimiento.
