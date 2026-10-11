import { publicPath } from './paths';
// Public contact channels supplied by the portfolio owner.
export const contact = {
  profilePhoto: publicPath('/images/profile/manuel-cutout-v1.webp'),
  email: 'manu998mc@gmail.com',
  whatsapp: 'https://wa.me/34626846294',
  linkedin: 'https://www.linkedin.com/in/manuel-s-mu%C3%B1oz-cobos-63b1781b7/',
  instagram: 'https://www.instagram.com/manu98mz/',
  github: '',
};

export const interfaceContent = {
  es: {
    experience: { eyebrow: 'Registro de actividad', title: 'De la idea a la entrega', description: 'Desarrollo web, diseño y gestión de productos digitales. Un proceso que conecta los requisitos del cliente con la experiencia final.', items: [
      { title: 'Entender', description: 'Comunicación con clientes y análisis de requisitos para dar forma a cada proyecto.' },
      { title: 'Construir', description: 'Desarrollo web integral, decisiones de diseño y atención a la usabilidad.' },
      { title: 'Entregar', description: 'Entrega de proyectos y gestión de productos en plataformas de comercio electrónico.' },
    ] },
    skills: { eyebrow: 'Módulos del sistema', title: 'Un perfil híbrido', description: 'Desarrollo web, administración y Ciencia de datos: distintas perspectivas para entender y resolver un mismo problema.', groups: [
      { title: 'Desarrollo web', items: ['Django y FastAPI', 'Laravel y WordPress', 'React y Angular', 'Aplicaciones web y móviles'] },
      { title: 'Administración', items: ['Administración y dirección de empresas', 'Análisis de requisitos', 'Comunicación con clientes', 'Gestión de proyectos y comercio electrónico'] },
      { title: 'Ciencia de datos', items: ['Python, NumPy y pandas', 'Aprendizaje automático con scikit-learn', 'Power BI y Tableau', 'Conexión entre datos y negocio'] },
    ] },
    contact: { intentions: [{ title: 'Incorporarme a tu equipo', description: 'Entrevistas y oportunidades de desarrollo web.', subject: 'Oportunidad profesional' }, { title: 'Desarrollar un proyecto', description: 'Aplicaciones, webs, integraciones y colaboración técnica.', subject: 'Proyecto o colaboración' }], eyebrow: 'Canal de comunicación', title: '¿Creamos algo juntos?', description: 'Cuéntame qué necesita tu equipo o qué problema quieres resolver. Podemos hablar de una oportunidad profesional, un proyecto o una colaboración.', location: 'Córdoba, España · Desarrollador web integral', email: 'Enviar mensaje', copy: 'Copiar correo', copied: 'Correo copiado', copyError: 'No se pudo copiar. Puedes usar el enlace de correo.', footer: 'Diseñado y desarrollado por mí mismo · Todos los derechos reservados.' },
  },
  en: {
    experience: { eyebrow: 'Activity log', title: 'From idea to delivery', description: 'Web development, design and digital product management. A process that connects client requirements with the final experience.', items: [
      { title: 'Understand', description: 'Client communication and requirements analysis to shape each project.' },
      { title: 'Build', description: 'Full Stack development, design decisions and attention to usability.' },
      { title: 'Deliver', description: 'Project delivery and product management for e-commerce platforms.' },
    ] },
    skills: { eyebrow: 'System modules', title: 'A hybrid profile', description: 'Web development, administration and Data Science: different perspectives to understand and solve the same problem.', groups: [
      { title: 'Web development', items: ['Django & FastAPI', 'Laravel & WordPress', 'React & Angular', 'Web & mobile applications'] },
      { title: 'Administration', items: ['Business administration & management', 'Requirements analysis', 'Client communication', 'Project & e-commerce management'] },
      { title: 'Data Science', items: ['Python, NumPy & pandas', 'Machine learning with scikit-learn', 'Power BI & Tableau', 'Connecting data and business'] },
    ] },
    contact: { intentions: [{ title: 'Bring me into your team', description: 'Interviews and web development opportunities.', subject: 'Professional opportunity' }, { title: 'Build a project', description: 'Applications, websites, integrations and technical collaboration.', subject: 'Project or collaboration' }], eyebrow: 'Communication channel', title: 'Let’s build something', description: 'Tell me what your team needs or what problem you want to solve. Let’s discuss a professional opportunity, a project or a collaboration.', location: 'Córdoba, Spain · Full Stack Web Developer', email: 'Send a message', copy: 'Copy email', copied: 'Email copied', copyError: 'Could not copy. Please use the email link.', footer: 'Designed and developed by me · All rights reserved.' },
  },
};
