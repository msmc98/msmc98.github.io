export type ProjectCategory = 'tourism' | 'corporate' | 'commerce' | 'apps';
export interface ProjectSite { slug: string; name: string; url: string; description?: { es: string; en: string }; highlights?: { es: string[]; en: string[] }; }
export interface GalleryProject {
  id: string;
  name: string;
  category: ProjectCategory;
  accent: string;
  description: { es: string; en: string };
  sites: ProjectSite[];
  featured?: boolean;
  // Owner-confirmed case details only. Null/absent fields must never be inferred from a capture.
  professionalContext?: 'professional' | 'personal' | 'academic' | 'collaborative';
  contribution?: { es: string; en: string };
  previewNote?: { es: string; en: string };
  desktopPreview?: { src: string; width: number; height: number };
  technologies?: string[];
  caseStudy?: { problem?: { es: string; en: string }; solution?: { es: string; en: string }; decisions?: { es: string; en: string }; challenges?: { es: string; en: string }; result?: { es: string; en: string }; learnings?: { es: string; en: string } };
}

// Reviewed anonymized preview: independent of automatic public-site captures.
export const arfeDashboardPreview = { src: '/projects/arfe-dashboard-anonymized-v1.webp', width: 1740, height: 904 };
export const galleryProjects: GalleryProject[] = [
  {
    id: 'andalucia', name: 'Cuatro ciudades. Un mismo viaje.', category: 'tourism', accent: '#568bdb', featured: true,
    description: {
      es: 'Un conjunto de cuatro proyectos de turismo para descubrir Córdoba, Granada, Sevilla y Málaga. Visitas guiadas, experiencias y reservas, con una identidad propia para cada destino.',
      en: 'A collection of four tourism projects for exploring Córdoba, Granada, Seville and Málaga. Guided tours, experiences and bookings, with an identity for each destination.',
    },
    sites: [
      { slug: 'cordoba-pie', name: 'Córdoba a Pie', url: 'https://cordobapie.es', description: {"es": "Web turística con visitas a la Mezquita-Catedral, la Judería, Medina Azahara y los patios de Córdoba. Organiza las actividades por recorridos y permite consultar las visitas y reservar.", "en": "A tourism website featuring the Mosque-Cathedral, the Jewish Quarter, Medina Azahara and Córdoba’s courtyards. Activities are organized by tour, with visit information and bookings."}, highlights: {"es": ["Mezquita-Catedral", "Judería y patios", "Medina Azahara"], "en": ["Mosque-Cathedral", "Jewish Quarter & courtyards", "Medina Azahara"]} },
      { slug: 'granada-tours', name: 'Granada Tours', url: 'https://granadatours.com.es', description: {"es": "Proyecto turístico de Granada con visitas a la Alhambra, el Albaicín y el Sacromonte, además de la Catedral y la Capilla Real. Presenta las distintas experiencias y sus opciones de reserva.", "en": "A Granada tourism project covering the Alhambra, Albaicín and Sacromonte, as well as the Cathedral and Royal Chapel. It presents the available experiences and booking options."}, highlights: {"es": ["Alhambra", "Albaicín y Sacromonte", "Catedral y Capilla Real"], "en": ["Alhambra", "Albaicín & Sacromonte", "Cathedral & Royal Chapel"]} },
      { slug: 'sevilla-pie', name: 'Sevilla a Pie', url: 'https://sevillapie.es', description: {"es": "Web de visitas guiadas por Sevilla, con el Real Alcázar, la Catedral y la Giralda como protagonistas. Incluye recorridos por Santa Cruz y Triana y organiza la oferta de tours y reservas.", "en": "A Seville guided-tour website centered on the Royal Alcázar, Cathedral and Giralda. It also features Santa Cruz and Triana walks, organizing tours and booking options."}, highlights: {"es": ["Real Alcázar", "Catedral y Giralda", "Santa Cruz y Triana"], "en": ["Royal Alcázar", "Cathedral & Giralda", "Santa Cruz & Triana"]} },
      { slug: 'malaga-pie', name: 'Málaga a Pie', url: 'https://malagapie.es', description: {"es": "Proyecto de turismo en Málaga con visitas a la Alcazaba, el Teatro Romano, la Catedral y el centro histórico. Integra experiencias relacionadas con Picasso, excursiones y consultas de reserva.", "en": "A Málaga tourism project featuring the Alcazaba, Roman Theatre, Cathedral and historic center. It brings together Picasso-related experiences, excursions and booking information."}, highlights: {"es": ["Alcazaba y Teatro Romano", "Catedral y centro histórico", "Picasso y excursiones"], "en": ["Alcazaba & Roman Theatre", "Cathedral & historic center", "Picasso & excursions"]} },
    ],
  },
  { id: 'lanvert', name: 'Lanvèrt', category: 'corporate', accent: '#ed5265', description: { es: 'Presencia digital para una firma de servicios jurídicos, económicos y de marketing. Una web que organiza sus áreas de actividad y su actualidad.', en: 'A digital presence for a legal, financial and marketing services firm, bringing its areas of expertise and news together.' }, sites: [{ slug: 'lanvert', name: 'Lanvèrt', url: 'https://lanvert.es' }] },
  { id: 'longrock', name: 'Longrock', category: 'corporate', accent: '#568bdb', description: { es: 'Una web de música y ocio para sus espacios en Córdoba y Sevilla. Una identidad visual con personalidad para conectar con su público.', en: 'A music and entertainment website for its venues in Córdoba and Seville, with a distinctive visual identity to connect with its audience.' }, sites: [{ slug: 'longrock', name: 'Longrock', url: 'https://longrock.es' }] },
  { id: 'secrets', name: 'Secrets of Córdoba', category: 'tourism', accent: '#ed5265', description: { es: 'Una experiencia digital para descubrir Córdoba y explorar su oferta turística.', en: 'A digital experience for discovering Córdoba and exploring its tourism offering.' }, sites: [{ slug: 'secrets-of-cordoba', name: 'Secrets of Córdoba', url: 'https://secretsofcordoba.com' }] },
  { id: 'mape', name: 'Tapizados Mape', category: 'corporate', accent: '#568bdb', description: { es: 'Un escaparate digital de sofás, colecciones y acabados. El producto y la fotografía como protagonistas de una marca de mobiliario.', en: 'A digital showcase for sofas, collections and finishes, placing products and photography at the heart of a furniture brand.' }, sites: [{ slug: 'tapizados-mape', name: 'Tapizados Mape', url: 'https://tapizadosmape.es' }] },
  { id: 'compras', name: 'ComprasInformática', category: 'commerce', accent: '#ed5265', description: { es: 'Una tienda de equipos informáticos reacondicionados, con catálogo, fichas de producto y compra online.', en: 'A refurbished computer store with a catalogue, product pages and online shopping.' }, sites: [{ slug: 'compras-informatica', name: 'ComprasInformática', url: 'https://comprasinformatica.com' }] },
  { id: 'bde', name: 'BdeBarefoot', category: 'commerce', accent: '#568bdb', description: { es: 'Una tienda online de calzado barefoot para niños y adultos, con trabajo en la plataforma y la gestión de productos.', en: 'An online barefoot footwear store for children and adults, involving work on the platform and product management.' }, sites: [{ slug: 'bdebarefoot', name: 'BdeBarefoot', url: 'https://bdebarefoot.com' }] },
  { id: 'venoor', name: 'Vénoor Délices', category: 'commerce', accent: '#ed5265', description: { es: 'Una tienda online de dátiles y productos artesanales que une presentación de marca, catálogo y comercio electrónico.', en: 'An online store for dates and artisan products, combining brand presentation, a catalogue and e-commerce.' }, sites: [{ slug: 'venoor', name: 'Vénoor Délices', url: 'https://venoor.es' }] },
  { id: 'butterfly', name: 'Butterfly Engineers', category: 'corporate', accent: '#568bdb', description: { es: 'Una web de ingeniería industrial que presenta servicios de diseño, cálculo y validación, junto a sus proyectos y equipo.', en: 'An industrial engineering website presenting design, calculation and validation services alongside its projects and team.' }, sites: [{ slug: 'butterfly-engineers', name: 'Butterfly Engineers', url: 'https://butterflyengineers.com' }] },
  { id: 'sie', name: 'SIE Informática', category: 'corporate', accent: '#ed5265', description: { es: 'Una web de servicios informáticos: mantenimiento, soporte, consultoría y soluciones para empresas.', en: 'An IT services website covering maintenance, support, consulting and business solutions.' }, sites: [{ slug: 'sie-informatica', name: 'SIE Informática', url: 'https://sieinformatica.com' }] },
  { id: 'pixel', name: 'AdGency Pixel', category: 'corporate', accent: '#568bdb', description: { es: 'La presencia digital de una agencia de marketing y desarrollo. Servicios, creatividad y proyectos en un mismo lugar.', en: 'The digital presence of a marketing and development agency, bringing services, creativity and projects together.' }, sites: [{ slug: 'adgency-pixel', name: 'AdGency Pixel', url: 'https://adgencypixel.com' }] },
  { id: 'bomtie', name: 'Bomtie', category: 'commerce', accent: '#ed5265', description: { es: 'Una tienda online de textiles y accesorios para bebés. Un proyecto de comercio electrónico con trabajo en gestión de productos y administración de la plataforma.', en: 'An online store for baby textiles and accessories. An e-commerce project involving product management and platform administration.' }, sites: [{ slug: 'bomtie', name: 'Bomtie', url: 'https://bomtie.com' }] },
  { id: 'arfe', name: 'ARFE', category: 'apps', accent: '#568bdb', description: { es: 'Desarrollo web a medida de una aplicación de gestión interna. Un proyecto centrado en herramientas para el trabajo diario de la empresa.', en: 'Custom web development for an internal management application, focused on tools for the company’s day-to-day work.' }, sites: [{ slug: 'arfe', name: 'ARFE', url: 'https://arfe.sieinformatica.net' }] },
];

// Authorship confirmed directly by Manuel on 10/10/2026. Do not infer per-site stacks.
for (const project of galleryProjects) {
  project.professionalContext = 'professional';
  project.contribution ??= project.id === 'bde'
    ? { es: 'Mejoras y optimización de una tienda existente; no desarrollé la versión inicial.', en: 'Improvements and optimization of an existing store; I did not build its initial version.' }
    : project.id === 'bomtie'
      ? { es: 'Mantenimiento de la tienda como parte de mi trabajo en empresa; no desarrollé la versión inicial.', en: 'Store maintenance as part of my work at a company; I did not build its initial version.' }
      : { es: 'Desarrollo desde cero.', en: 'Development from scratch.' };
  if (project.id === 'andalucia') {
    project.contribution = { es: 'Creación de las webs originales durante mi etapa en TicTac Comunicación. No participé en el rediseño posterior.', en: 'Creation of the original websites during my time at TicTac Comunicación. I did not participate in the later redesign.' };
    project.previewNote = { es: 'Las capturas muestran las webs actuales y pueden incluir el rediseño posterior. No representan exclusivamente mi trabajo original.', en: 'The screenshots show the current websites and may include the later redesign. They do not exclusively represent my original work.' };
  }
  if (project.id === 'arfe') {
    project.technologies = ['Laravel', 'MySQL'];
    project.desktopPreview = arfeDashboardPreview;
    project.previewNote = { es: 'Dashboard anonimizado con nombres y cifras ficticios; DNI y pólizas ocultos. La vista móvil corresponde al acceso público.', en: 'Anonymized dashboard with fictional names and figures; IDs and policy numbers masked. The mobile view shows the public sign-in screen.' };
  }
}
