# Evidencia y mantenimiento de casos de estudio

Actualizado el 10/10/2026 con las confirmaciones directas de Manuel durante esta revisión.

## Autoría confirmada

- Manuel creó desde cero las webs de la galería salvo BdeBarefoot y Bomtie.
- BdeBarefoot: mejoras y optimización sobre una tienda existente.
- Bomtie: mantenimiento como parte del trabajo en empresa.
- Conjunto turístico: creación de las versiones originales durante TicTac Comunicación. Manuel no participó en el rediseño posterior. Las capturas actuales se conservan con una advertencia de alcance; no se atribuye el rediseño a Manuel.
- ARFE: desarrollo completo desde cero con Laravel y MySQL. Aplicación en producción; dashboard de gestión de seguros revisado en la captura facilitada.
- Córdoba Embrujada y ERP MJ: contribuciones descritas en el CV, conservando el alcance literal de las responsabilidades.

La imagen original encontrada en Descargas es ARFE, no Córdoba a Pie. Contiene datos personales de clientes e información operativa y permanece fuera del repositorio. El 11/10/2026 Manuel autorizó anonimizarla: la versión pública utiliza nombres ficticios, DNI y pólizas con `XXXXXXX` y cifras de ejemplo. Ver [registro de anonimización](arfe-anonymization.md). No usar estas cifras como métricas de impacto.

## Completar sin inventar

Los estudios de ARFE, Córdoba Embrujada y ERP MJ se editan en `src/content/case-studies.ts`. Los campos `null` no se muestran: problema, decisiones, retos, resultados y aprendizajes solo se completan con confirmación. Las contribuciones del CV no constituyen estudios completos de arquitectura.

Cada web admite estos campos opcionales en `src/content/project-gallery.ts`, y la galería los renderiza en ambos idiomas:

```ts
professionalContext: 'professional', // personal | academic | collaborative
contribution: { es: 'Alcance confirmado', en: 'Confirmed scope' },
technologies: [], // Solo stack confirmado para ESTA web
caseStudy: {
  problem: { es: '', en: '' },
  solution: { es: '', en: '' },
  decisions: { es: '', en: '' },
  challenges: { es: '', en: '' },
  result: { es: '', en: '' },
  learnings: { es: '', en: '' },
},
```

La asignación común de autoría al final del archivo debe respetar cualquier contribución más detallada añadida en un proyecto. No inferir tecnologías por el aspecto o el dominio de una web.

## Preguntas pendientes por proyecto

| Grupo | Confirmado | Pendiente |
| --- | --- | --- |
| Andalucía (4 ciudades) | Versiones originales en TicTac, sin participación en rediseño | Stack original, capturas originales, retos y decisiones |
| Lanvèrt, Longrock, Secrets of Córdoba, Tapizados Mape | Desde cero | Empresa/periodo, stack, responsabilidades concretas, retos y resultados |
| ComprasInformática, Vénoor Délices | Desde cero | Stack, catálogo/pagos/integraciones desarrolladas, decisiones y resultados |
| Butterfly Engineers, SIE Informática, AdGency Pixel | Desde cero | Stack, empresa/periodo, decisiones y resultados |
| BdeBarefoot | Mejoras y optimización | Qué mejoras, herramientas y métricas medidas si existen |
| Bomtie | Mantenimiento en empresa | Tareas concretas, stack y alcance publicable |
| ARFE | Todo el desarrollo, Laravel, MySQL, producción y dashboard anonimizado | Retos, decisiones internas publicables, aprendizajes y vista móvil interna |
| Córdoba Embrujada | API Django REST Framework en TicTac | Endpoints publicables, arquitectura, retos y aprendizajes |
| ERP MJ | Funcionalidades/módulos/formularios Laravel y MySQL | Módulos publicables, decisiones, retos y aprendizajes |

No se han añadido métricas, tarifas, disponibilidad, clientes nuevos ni certificaciones. Confirmar vigencia del puesto actual y del máster respecto al CV de junio de 2026 en la próxima revisión.
