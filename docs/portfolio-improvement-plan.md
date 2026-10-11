# Auditoría y plan de mejora del portfolio

Fecha: 10 de octubre de 2026. Auditoría del código local anterior a esta implementación; las mediciones de navegador se documentarán por separado.

## Base y evidencia

Astro 7.3.2, salida estática, TypeScript estricto, sin frameworks de cliente ni dependencias adicionales. Dos rutas (`/` inglés y `/es/` español), componentes compartidos y contenido bilingüe en TypeScript. `src/data/projects.ts` y `skills.ts` están vacíos: la fuente activa es `src/content/`. Se han inspeccionado configuración, layout, estilos, hero, sidebar, perfil, experiencia, habilidades, catálogo tecnológico, galería, mockups, contacto, arranque, asistente, movimientos, aficiones, easter egg y scripts de verificación.

La experiencia transcrita del CV de junio de 2026 acredita seis puestos desde 2022, Django REST Framework para Córdoba Embrujada, módulos y formularios de un ERP Laravel, WordPress a medida, React/React Native, Angular/Ionic, Odoo, MySQL, Linux, Plesk y cPanel. El catálogo incluye conocimientos adicionales confirmados, pero no justifica presentarlos todos como experiencia profesional equivalente. Symfony no aparece acreditado en las fuentes locales: no se añadirá.

La galería conserva 13 grupos y 16 webs, capturas locales WebP de escritorio/móvil, filtros, selector de ciudades y visor. Las descripciones explican el producto, pero en general no identifican autoría, stack o arquitectura. Las capturas públicas no prueban la contribución individual. No se inferirá stack desde una captura ni se atribuirá a Manuel todo el desarrollo.

## Cuatro recorridos

| Visitante | Fricción observada en código | Mejora prioritaria |
| --- | --- | --- |
| Reclutador, 30 segundos | Nombre y CV visibles; propuesta de valor ausente del hero, intro modal en cada carga, proyectos tras perfil y seis puestos | Rol full stack, propuesta concreta, contacto/CV/proyectos inmediatos y proyectos después del hero |
| Tech Lead | Galería visual con escasa evidencia técnica; responsabilidades ocultas y catálogo de 18 categorías sin contexto de uso | Casos de contribución acreditada, síntesis visible por puesto y stack vinculado a empleadores |
| Cliente | CTA final conduce a un dock flotante, sin correo legible ni distinción entrevista/proyecto; disponibilidad afirmada sin fuente actual | Sección de contacto real, dos intenciones y mensaje neutral |
| Móvil desde LinkedIn | Cabecera extensa, hero de más de una pantalla, asistente abierto, navegación horizontal y objetivos pequeños | Cabecera compacta, navegación persistente, controles de 44 px y asistente desplegable |

## Hallazgos y prioridades

- P0: el arranque usa `showModal()` y bloquea unos 3,1 s en cada visita. Convertirlo en secuencia voluntaria repetible. Conservar Escape, salto y movimiento reducido.
- P0: mostrar descripción profesional y CTAs en el hero; ARC subordinado a la composición. LinkedIn configurado; GitHub vacío, mantenerlo opcional.
- P0: acercar proyectos al inicio, conservar todas las webs y capturas. Añadir estudios basados en tareas explícitas del CV y estructura editable de datos para ampliar los casos.
- P0: crear contacto semántico al final y actualizar referencias del dock; evitar IDs duplicados. Correo, WhatsApp y LinkedIn existentes, sin formulario externo.
- P1: destacar una responsabilidad por empleo sin cambiar fechas, empresas ni tareas; seis grupos de stack con referencias verificables. Mantener catálogo/formación como información complementaria.
- P1: disminuir el material glass global, fondos y animaciones continuas; mejorar legibilidad, foco y tamaños táctiles. Conservar estética rojo/azul, ARC y escenas.
- P2: asistente local explícito, respuestas específicas Django/ERP/backend/CV y enlaces de navegación. Mantener easter egg opcional con sus cinco acciones, sin añadir tareas.
- P3: metadatos sociales traducidos, imagen social SVG propia, datos Person veraces y endpoints estáticos sitemap/robots condicionados a un dominio confirmado. No inventar dominio canónico.

## Riesgos y controles

Los tests actuales exigen la intro automática y ausencia de sección de contacto; actualizar esas expectativas junto al comportamiento, preservando las demás comprobaciones. Mover secciones exige ordenar el seguimiento de navegación por posición real. El servidor debe usar `astro dev --background`. PowerShell bloquea `npm.ps1`: usar `npm.cmd`. Git no está en PATH; no sobrescribir cambios mediante checkout/reset. No agregar servicios, analítica ni dependencias. No prometer métricas Lighthouse/Core Web Vitals sin medición.

## Información pendiente de confirmar

1. Dominio público definitivo para canonical, hreflang absoluto, sitemap y tarjetas sociales.
2. Por cada web: empresa/periodo, tipo profesional/personal/académico/colaborativo, alcance exacto, tecnologías, decisiones, retos, resultados y autorización para documentarlos.
3. Córdoba Embrujada y ERP MJ: endpoints/módulos concretos, colaboración, arquitectura, retos y aprendizajes publicables; no publicar detalles internos sin confirmación.
4. Enlace público GitHub deseado y vigencia de puesto actual/formación respecto al CV de junio de 2026. No cambiar datos por suposición.

## Validación prevista

Build; tres scripts existentes actualizados; comprobaciones adicionales de CTAs, respuestas locales, teclado, metadatos, ausencia de errores de ejecución y tamaños 320/390/760/1440/1920. Capturas reales de escritorio/móvil y revisión visual. Inventario antes/después: seis puestos, 13 grupos/16 webs, 29 aficiones y PDF. Registrar resultados y limitaciones en `docs/portfolio-validation.md`.

Documentación consultada: [componentes](https://docs.astro.build/en/basics/astro-components/), [estilos](https://docs.astro.build/en/guides/styling/), [idiomas](https://docs.astro.build/en/guides/internationalization/) y [rutas](https://docs.astro.build/en/guides/routing/).
