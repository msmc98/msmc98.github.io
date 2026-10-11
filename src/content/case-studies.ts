import { arfeDashboardPreview } from './project-gallery';
type Localized = { es: string; en: string };
export interface CaseStudy {
  id: string;
  name: string;
  employer: string;
  source: string;
  technologies: string[];
  preview?: { src: string; width: number; height: number };
  context: Localized;
  contribution: Localized;
  deliverable: Localized;
  // Complete only with owner-confirmed, publishable information.
  problem: Localized | null;
  decisions: Localized | null;
  challenges: Localized | null;
  outcome: Localized | null;
  learnings: Localized | null;
}
export const caseStudies: CaseStudy[] = [
  {
    id: 'arfe', name: 'ARFE', employer: 'ARFE',
    source: 'Confirmación de Manuel, 10/10/2026; original de producción privado. Versión anonimizada autorizada el 11/10/2026.',
    technologies: ['Laravel', 'MySQL'],
    preview: arfeDashboardPreview,
    context: { es: 'Aplicación de gestión interna de seguros en producción. La captura facilitada muestra un dashboard y áreas de clientes, pólizas, recibos y siniestros.', en: 'An insurance management application in production. The supplied screenshot shows a dashboard and areas for clients, policies, receipts and claims.' },
    contribution: { es: 'Desarrollo completo desde cero con Laravel y MySQL.', en: 'Complete development from scratch with Laravel and MySQL.' },
    deliverable: { es: 'Aplicación empresarial a medida con panel de gestión, importaciones, exportaciones y configuración de retenciones por periodo.', en: 'A custom business application with a management dashboard, imports, exports and withholding configuration by period.' },
    problem: { es: 'Gestión de información de seguros: colaboradores, clientes, vínculos entre clientes, pólizas, recibos y siniestros.', en: 'Managing insurance information: collaborators, clients, client relationships, policies, receipts and claims.' },
    decisions: { es: 'Laravel para la aplicación y MySQL como base de datos. La estructura interna y los detalles de seguridad no se publican sin documentación adicional.', en: 'Laravel for the application and MySQL for the database. Internal structure and security details require additional documentation before publication.' },
    challenges: null,
    outcome: { es: 'Aplicación en producción, acreditada por la captura aportada. No se publican cifras operativas ni datos de clientes.', en: 'Application in production, evidenced by the supplied screenshot. Operational figures and client data remain private.' },
    learnings: null,
  },
  {
    id: 'cordoba-embrujada', name: 'Córdoba Embrujada', employer: 'TicTac Comunicación',
    source: 'src/data/experience.ts · tictac · CV 21/06/2026',
    technologies: ['Python', 'Django REST Framework'],
    context: { es: 'Proyecto realizado durante el puesto en TicTac Comunicación, entre abril y octubre de 2023.', en: 'Work carried out at TicTac Comunicación, between April and October 2023.' },
    contribution: { es: 'Creación de una API con Django REST Framework para Córdoba Embrujada.', en: 'API development with Django REST Framework for Córdoba Embrujada.' },
    deliverable: { es: 'Una API: contribución backend documentada en la experiencia profesional.', en: 'An API: a backend contribution documented in the professional experience.' },
    problem: null, decisions: null, challenges: null, outcome: null, learnings: null,
  },
  {
    id: 'erp-mj', name: 'ERP · Soluciones Informáticas MJ', employer: 'Soluciones Informáticas MJ',
    source: 'src/data/experience.ts · simj · CV 21/06/2026',
    technologies: ['Laravel', 'MySQL'],
    context: { es: 'ERP propio de la empresa, con trabajo realizado entre febrero y abril de 2024.', en: 'The company’s in-house ERP, with work carried out between February and April 2024.' },
    contribution: { es: 'Creación de funcionalidades, módulos y formularios a medida; mantenimiento de MySQL, corrección de errores y soporte técnico.', en: 'Development of features, custom modules and forms; MySQL maintenance, bug fixes and technical support.' },
    deliverable: { es: 'Funcionalidades para una aplicación empresarial existente y trabajo de mejora de procesos internos.', en: 'Features for an existing business application and work on internal process improvements.' },
    problem: null, decisions: null, challenges: null, outcome: null, learnings: null,
  },
];
export const caseLabels = {
  es: { title: 'Detrás de la interfaz', intro: 'Contribuciones profesionales documentadas: backend y aplicaciones empresariales.', type: 'Contribución profesional', expand: 'Ver alcance documentado', context: 'Contexto', role: 'Mi contribución', deliverable: 'Entrega documentada', problem: 'Problema', decisions: 'Decisiones técnicas', challenges: 'Retos', outcome: 'Resultado', learnings: 'Aprendizajes', scope: 'Estos resúmenes recogen el alcance del CV. No incluyen código interno, métricas ni decisiones de arquitectura sin documentar.', experience: 'Ver experiencia relacionada' },
  en: { title: 'Behind the interface', intro: 'Documented professional contributions: backend and business applications.', type: 'Professional contribution', expand: 'View documented scope', context: 'Context', role: 'My contribution', deliverable: 'Documented delivery', problem: 'Problem', decisions: 'Technical decisions', challenges: 'Challenges', outcome: 'Outcome', learnings: 'Learnings', scope: 'These summaries reflect the scope recorded in the CV. Internal code, metrics and undocumented architecture decisions are omitted.', experience: 'View related experience' },
};
