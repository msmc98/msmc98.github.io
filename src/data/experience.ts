export interface Experience {
  employer: string;
  company: string;
  period: { es: string; en: string };
  role: { es: string; en: string };
  tasks: { es: string[]; en: string[] };
}

// Puestos del CV (21/06/2026) y experiencia freelance confirmada por Manuel (11/10/2026).
export const experience: Experience[] = [
  {
    company: 'AdGency Pixel',
    employer: 'adgency-pixel',
    period: { es: 'Sept. 2024 — actualidad', en: 'Sept. 2024 — present' },
    role: { es: 'Desarrollador web integral', en: 'Full Stack Web Developer' },
    tasks: {
      es: ['Responsable del departamento de desarrollo: liderazgo de equipos internos y becarios.', 'Desarrollo con WordPress, plugins a medida y despliegue y migración de sitios web.', 'Desarrollo integral y de servidor con Laravel y Django; interfaces con React y React Native.', 'Administración de servidores Linux con Plesk y cPanel, y gestión de bases de datos MySQL.', 'Creación de scripts a medida integrados con IA mediante Python.', 'Contacto con clientes, toma de requisitos, asistencia y explicación de casos de uso.'],
      en: ['Heading the development department: leading in-house teams and interns.', 'WordPress development, custom plugins, website deployment and migration.', 'Full Stack and Back-End development with Laravel and Django; Front-End with React and React Native.', 'Linux server administration with Plesk and cPanel, and MySQL database management.', 'Custom Python scripts integrated with AI.', 'Client communication, requirements gathering, support and explanation of use cases.'],
    },
  },
  {
    company: 'Soluciones Informáticas MJ',
    employer: 'simj',
    period: { es: 'Feb. 2024 — abr. 2024', en: 'Feb. 2024 — Apr. 2024' },
    role: { es: 'Desarrollador web integral', en: 'Full Stack Web Developer' },
    tasks: {
      es: ['Creación de funcionalidades para un ERP propio desarrollado con Laravel.', 'Desarrollo de módulos y formularios a medida.', 'Mantenimiento de bases de datos MySQL, corrección de errores y soporte técnico.', 'Mejora de procesos internos.'],
      en: ['Feature development for an in-house Laravel ERP.', 'Custom modules and forms.', 'MySQL database maintenance, bug fixes and technical support.', 'Internal process improvements.'],
    },
  },
  {
    company: 'TicTac Comunicación',
    employer: 'tictac',
    period: { es: 'Abr. 2023 — oct. 2023', en: 'Apr. 2023 — Oct. 2023' },
    role: { es: 'Desarrollador web integral', en: 'Full Stack Web Developer' },
    tasks: {
      es: ['Creación de API con Django REST Framework para Córdoba Embrujada.', 'Desarrollo personalizado en WordPress para proyectos como andaluciapie.es.', 'Maquetación, personalización de temas y ajustes de funcionalidades.', 'Mantenimiento técnico y resolución de incidencias.'],
      en: ['API development with Django REST Framework for Córdoba Embrujada.', 'Custom WordPress development for projects including andaluciapie.es.', 'Page layouts, theme customization and feature adjustments.', 'Technical maintenance and issue resolution.'],
    },
  },
  {
    company: 'WhiteKong Software S. L.',
    employer: 'whitekong',
    period: { es: 'Ene. 2023 — mar. 2023', en: 'Jan. 2023 — Mar. 2023' },
    role: { es: 'Desarrollador web y móvil', en: 'Web & Mobile Developer' },
    tasks: {
      es: ['Desarrollo de aplicaciones web y móviles con Angular e Ionic.', 'Creación y mantenimiento de módulos de Odoo.', 'Integración de servicios y adaptación de funcionalidades.', 'Pruebas funcionales y soporte sobre desarrollos a medida.'],
      en: ['Web and mobile application development with Angular and Ionic.', 'Odoo module development and maintenance.', 'Service integration and feature adaptation.', 'Functional testing and support for custom software.'],
    },
  },
  {
    company: 'Aventus Online, S. L. (Eccuo)',
    employer: 'eccuo',
    period: { es: 'Jun. 2022 — dic. 2022', en: 'June 2022 — Dec. 2022' },
    role: { es: 'Desarrollador web integral', en: 'Full Stack Web Developer' },
    tasks: {
      es: ['Desarrollo y mejora de la interfaz gráfica de la plataforma.', 'Implementación de funcionalidades y mantenimiento evolutivo.', 'Gestión básica de servidor y soporte técnico de la plataforma.', 'Optimización de rendimiento y resolución de incidencias.'],
      en: ['Platform interface development and improvements.', 'New features and ongoing platform maintenance.', 'Basic server management and platform technical support.', 'Performance optimization and issue resolution.'],
    },
  },
  {
    company: 'Aicor Consultores, S. L.',
    employer: 'aicor',
    period: { es: 'Mar. 2022 — jun. 2022', en: 'Mar. 2022 — June 2022' },
    role: { es: 'Desarrollador web y móvil', en: 'Web & Mobile Developer' },
    tasks: {
      es: ['Desarrollo de aplicaciones móviles con React Native y Expo.', 'Desarrollo web con Laravel y MySQL.', 'Integración de funcionalidades, pruebas y corrección de incidencias.', 'Apoyo en despliegue y mantenimiento técnico del proyecto.'],
      en: ['Mobile application development with React Native and Expo.', 'Web development with Laravel and MySQL.', 'Feature integration, testing and bug fixes.', 'Project deployment and technical maintenance support.'],
    },
  },
  {
    company: 'Freelance',
    employer: 'freelance',
    period: { es: '2022 — actualidad', en: '2022 — present' },
    role: { es: 'Desarrollador de proyectos a medida', en: 'Custom Application Developer' },
    tasks: {
      es: ['Desarrollo de proyectos a medida, principalmente con Django.', 'Despliegue de aplicaciones en PythonAnywhere.'],
      en: ['Custom project development, primarily with Django.', 'Application deployment on PythonAnywhere.'],
    },
  },
];
