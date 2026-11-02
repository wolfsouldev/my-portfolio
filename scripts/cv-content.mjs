/** Curated CV summaries and translations. Names, dates and stack come from Astro. */
export const LOCALES = {
  es: {
    language: 'es', label: 'Español', file: 'alejandro_fajardo.es.ts',
    title: 'CV - Experiencia y tecnologías', name: 'nombre', role: 'rol', profile: 'perfil',
    experience: 'experiencia', company: 'empresa', job: 'cargo', period: 'periodo', description: 'descripcion',
    contact: 'contacto', location: 'ubicacion', remote: 'Remoto',
    groupNames: ['backend_y_datos', 'frontend_y_movil', 'nube_y_entrega', 'otras_herramientas'],
    headline: 'Desarrollador backend y full-stack',
    summary: 'Construyo software sólido cuando el producto empieza a crecer. Backend, microservicios y cloud, con visión de producto de extremo a extremo.',
    roles: {
      'Principal Backend Engineer': 'Desarrollador backend principal',
      'Principal Software Engineer': 'Ingeniero de software principal',
      'Full-Stack Engineer': 'Desarrollador full-stack',
    },
    descriptions: {
      DynamiCore: 'Core financiero con microservicios y procesos serverless en AWS Lambda e integración bancaria. Modelado y optimización de bases de datos, consistencia y concurrencia. Procesamiento asíncrono y cargas masivas de usuarios y datos, con foco en rendimiento, trazabilidad y estabilidad.',
      'Cute Digital Media': 'Microservicios y sistemas multitenant con pagos Stripe, PayPal, Prospay y Fiserv. Automatización e IA para revisión de pull requests y flujos n8n. Arquitectura orientada a escalabilidad, seguridad, observabilidad y eficiencia operativa.',
      Tecopos: 'Modernización de sistemas legacy y migración progresiva a microservicios en frontend y backend. Entornos Docker, balanceadores de carga, optimización de bases de datos y despliegues automatizados con CI/CD.',
      'UNE Mtz': 'Sistema principal y evolución de arquitectura, automatización, integración continua y A/B testing. Liderazgo técnico de dos equipos: buenas prácticas, revisión de código y coordinación de entregas.',
    },
  },
  en: {
    language: 'en', label: 'English', file: 'alejandro_fajardo.en.ts',
    title: 'Resume - Experience and technologies', name: 'name', role: 'role', profile: 'profile',
    experience: 'experience', company: 'company', job: 'role', period: 'period', description: 'description',
    contact: 'contact', location: 'location', remote: 'Remote',
    groupNames: ['backend_and_data', 'frontend_and_mobile', 'cloud_and_delivery', 'other_tools'],
    headline: 'Backend & Full-stack Engineer',
    summary: 'I build software that stays reliable as products grow. Backend, microservices and cloud engineering, with an end-to-end product mindset.',
    roles: {
      'Principal Backend Engineer': 'Principal Backend Engineer',
      'Principal Software Engineer': 'Principal Software Engineer',
      'Full-Stack Engineer': 'Full-Stack Engineer',
    },
    descriptions: {
      DynamiCore: 'Financial core built with microservices and serverless workflows on AWS Lambda, integrating banking services. Database modeling and optimization, consistency and concurrency control. Asynchronous processing and bulk user and data workloads, focused on performance, traceability and reliability.',
      'Cute Digital Media': 'Microservices and multitenant platforms with Stripe, PayPal, Prospay and Fiserv payments. Automation and AI for pull request reviews and n8n workflows. Architecture focused on scalability, security, observability and operational efficiency.',
      Tecopos: 'Legacy system modernization and progressive migration to microservices across frontend and backend. Docker environments, load balancing, database optimization and automated CI/CD deployments.',
      'UNE Mtz': 'Core business system development and architecture evolution, automation, continuous integration and A/B testing. Technical leadership of two teams: engineering practices, code reviews and delivery coordination.',
    },
  },
};

const MONTHS_EN = {
  Enero: 'January', Febrero: 'February', Marzo: 'March', Abril: 'April', Mayo: 'May', Junio: 'June',
  Julio: 'July', Agosto: 'August', Septiembre: 'September', Octubre: 'October', Noviembre: 'November', Diciembre: 'December', Actualidad: 'Present',
};
export const normalize = (value) => String(value).replace(/[—–‑]/g, '-').replace(/[‘’]/g, "'").replace(/[“”]/g, '"');
export function translatePeriod(period, lang) {
  const normalized = normalize(period);
  return lang === 'en' ? normalized.replace(/\b(Enero|Febrero|Marzo|Abril|Mayo|Junio|Julio|Agosto|Septiembre|Octubre|Noviembre|Diciembre|Actualidad)\b/g, (word) => MONTHS_EN[word]) : normalized;
}
export function localizeCV(data, lang) {
  const locale = LOCALES[lang];
  if (!locale) throw new Error(`Unsupported CV language: ${lang}`);
  return {
    ...data, locale,
    experience: data.experience.map((job) => {
      const description = locale.descriptions[job.company];
      const title = locale.roles[job.title];
      if (!description || !title) throw new Error(`Add a reviewed ${lang} CV summary/role for ${job.company}: ${job.title}`);
      return { ...job, description, title, date: translatePeriod(job.date, lang) };
    }),
  };
}
