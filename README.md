# Portfolio de Manuel S. Muñoz Cobos

Portfolio bilingüe construido con Astro, con una interfaz inspirada en Iron Man: reactor ARC, arranque de J.A.R.V.I.S. y asistente interactivo.

## Desarrollo

```sh
npm ci
npm run dev -- --background
npm run astro -- dev status
npm run astro -- dev logs
npm run astro -- dev stop
npm run build
npm run verify:build
npm run preview
```

- Inglés: http://localhost:4321/
- Español: http://localhost:4321/es/

## Contenido y componentes

- `src/components/PortfolioPage.astro`: estructura compartida de ambos idiomas.
- `src/components/Hero.astro`: presentación y reactor.
- `src/components/Profile.astro`: recorrido Conectar → Resolver → Construir con escenas de conversación, arquitectura y entrega; controles por pasos y teclado, transición por barrido y versión sin movimiento.
- `src/components/JarvisBoot.astro`: bienvenida de unos tres segundos con reactor ARC y barra de progreso; se reproduce voluntariamente desde la portada, permite saltar con el botón o Escape y respeta movimiento reducido.
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
- `src/components/FloatingContact.astro`: botones flotantes de correo y WhatsApp, ocultos cuando aparece la sección final de contacto para evitar solapamientos. LinkedIn también está en la portada y el contacto.
- `src/components/EasterEgg.astro`: protocolo de cinco tareas reales; activa el reactor de la portada o el pequeño reactor del pie para descubrirlo. Las tareas se marcan al preguntar al asistente, ampliar una captura, abrir funciones de un puesto, explorar una afición y activar el núcleo. El progreso se conserva en la sesión y se comparte entre idiomas; puede reiniciarse.
- `src/components/SectionMotion.astro`: entradas al desplazarse, con contenido accesible sin JavaScript y respeto por movimiento reducido.
- `docs/visual-assets.md`: procedencia y créditos de las imágenes y logos oficiales. Se sirven versiones WebP optimizadas con carga diferida. Las capturas de proyectos conservan el contenido original de sus webs.

La bienvenida nunca se abre automáticamente. El botón «Reproducir intro» permite verla cuando se desee. Con movimiento reducido muestra el estado final sin animación.

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

## Mejora profesional y GitHub Pages

- [Auditoría y plan](docs/portfolio-improvement-plan.md).
- [Autoría, evidencia y preguntas pendientes](docs/project-evidence.md).
- [Resultados y límites de validación](docs/portfolio-validation.md).
- `src/content/case-studies.ts`: casos ARFE (Laravel/MySQL), API Córdoba Embrujada y ERP MJ. Solo datos confirmados; los campos pendientes no se muestran.
- `src/content/verified-stack.ts`: seis grupos de tecnologías aplicadas, separados del catálogo de conocimientos.
- `src/content/paths.ts`: rutas de recursos y navegación compatibles con subdirectorios.

Las pruebas completas se ejecutan con `npm test`, con el servidor de desarrollo activo en modo background y Edge o Chrome instalado. La verificación adicional es `node scripts/verify-professional.mjs`.

### Despliegue automático

El destino es [msmc98/msmc98.github.io](https://github.com/msmc98/msmc98.github.io) y la URL pública es **https://msmc98.github.io/**. Astro configura `site` con ese dominio, `base: '/'` y salida estática. No se necesitan variables de entorno ni secretos. Se requiere Node.js 22.12 o superior; CI utiliza Node.js 24 y npm con el `package-lock.json` versionado.

1. Incorporar estos cambios, incluido `.github/workflows/deploy.yml`, a la rama **master** del repositorio de destino. La rama principal comprobada en GitHub es `master`; la rama de trabajo local es `mejora-portfolio-profesional`.
2. En el repositorio de destino, abrir **Settings → Pages → Build and deployment → Source → GitHub Actions**.
3. Cada push a `master` ejecuta el workflow **Deploy portfolio to GitHub Pages**. También puede ejecutarse desde **Actions → Deploy portfolio to GitHub Pages → Run workflow**.

El workflow usa `withastro/action@v6` para instalar con npm, compilar, ejecutar `npm run verify:build` y subir el artefacto; `actions/deploy-pages@v5` lo publica en el entorno `github-pages`. Los despliegues se serializan y solo se conceden `contents: read`, `pages: write` e `id-token: write`. La comprobación estática bloquea el despliegue si faltan recursos, fallan las rutas o los metadatos, o aparecen referencias a localhost.

**Remoto local:** durante la auditoría, `origin` apuntaba a `https://github.com/msmc98/portfolio.git`. Publicar allí no actualiza el sitio de usuario. Para conservar ese remoto y añadir el destino, si todavía no existe un remoto llamado `pages`:

```sh
git remote add pages https://github.com/msmc98/msmc98.github.io.git
git fetch pages
```

Revisar e integrar los cambios con la rama `master` del destino antes de subirlos, sin forzar el push ni sobrescribir su historial.

### Verificar la publicación

En **Actions**, comprobar que los jobs `build` y `deploy` terminan en verde y abrir el enlace del entorno `github-pages`. Visitar https://msmc98.github.io/ y https://msmc98.github.io/es/ directamente y recargar ambas rutas. Revisar el cambio de idioma, imágenes, fuentes, CV, contacto, filtros, visor, asistente y animaciones; comprobar en las herramientas del navegador que no aparecen errores JavaScript ni respuestas 404.

El build genera canonical/hreflang por idioma, Open Graph, Twitter, Person JSON-LD, sitemap y robots; utiliza la imagen social PNG existente de 1200×630. Revisar también https://msmc98.github.io/robots.txt y https://msmc98.github.io/sitemap.xml. Puede enviarse el sitemap a Search Console después del despliegue. El workflow sigue la [guía oficial de Astro para GitHub Pages](https://docs.astro.build/en/guides/deploy/github/).

Para verificar interacciones sobre la compilación, ejecutar `npm run preview -- --port 4321` y, en otra terminal, `npm test`. Las pruebas utilizan Edge o Chrome instalado y guardan las capturas en `.astro/`; no modifican la imagen social publicada.

## Documentación completa

Consulta [la guía del portfolio](docs/guia-del-portfolio.md) para conocer cada sección, sus datos, componentes, animaciones y mantenimiento.
