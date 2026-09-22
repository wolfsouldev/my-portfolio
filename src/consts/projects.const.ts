export const PATH_ICON = "/icon/";

const Icons = {
  react: "react",
  typescript: "typescript",
  javascript: "javascript",
  tailwind: "tailwind",
  nest: "nest",
  next: "next",
  postgres: "postgres",
  mongodb: "mongodb",
  jest: "jest",
  framer: "framer-motion",
  express: "express",
  express_b: "express",
  astroWithe: "astroWithe",
  redux: "redux",
  redux_b: "redux",
  redis: "redis",
  sequelize: "sequelize",
  nodeJs: "nodejs",
  cli: "cli",
  aws: "aws",
  prisma: "prisma",
  typeOrm: "typeOrm",
  docker: "docker",
  kubernetes: "kubernetes",
  vscode: "vscode",
  go: "go",
  python: "python",
};

type Project = {
  imgURl: string[];
  title: string;
  desc: string;
  link?: string;
  demo?: string;
  tech: string[];
  active: boolean;
  role?: string;
  highlights?: string[];
  featured?: boolean;
};

export const PROJECT: Project[] = [
  // TuTike — Event and reservation platform
  {
    imgURl: [
      "/img/tutike/Captura desde 2026-09-21 14-33-20.webp",
      "/img/tutike/Captura desde 2026-09-21 14-33-31.webp",
      "/img/tutike/Captura desde 2026-09-21 14-34-14.webp",
      "/img/tutike/Captura desde 2026-09-21 14-30-10.webp",
      "/img/tutike/Captura desde 2026-09-21 14-30-53.webp",
      "/img/tutike/Captura desde 2026-09-21 14-31-02.webp",
      "/img/tutike/Captura desde 2026-09-21 14-31-20.webp",
      "/img/tutike/Captura desde 2026-09-21 14-32-55.webp",
    ],
    title: "TuTike · Eventos y reservas",
    desc: "Plataforma web integral para descubrir eventos, gestionar venues y restaurantes, y coordinar reservas desde un sistema interno. Incluye calendarios visuales de disponibilidad, gestión de mesas, múltiples procesadores de pago, integración con Google Business y herramientas para aumentar la visibilidad y las reservas de cada negocio.",
    demo: "https://tutike.com/es",
    tech: [
      Icons.react,
      Icons.typescript,
      Icons.tailwind,
      Icons.nest,
      Icons.postgres,
      Icons.redis,
    ],
    role: "Proyecto principal · Full stack · Reservas",
    highlights: [
      "Marketplace de eventos, restaurantes y lugares para visitar",
      "Calendario interno para disponibilidad, mesas y reservas",
      "Pagos, Google Business e integraciones orientadas a conversión",
    ],
    featured: true,
    active: true,
  },
  // sshh — Secure SSH Credential Manager
  {
    imgURl: ["/img/sshh/sshh-terminal.svg"],
    title: "sshh · Secure SSH Credential Manager",
    desc: "Herramienta CLI multiplataforma desarrollada en Go para centralizar credenciales SSH en un vault local cifrado. Protege contraseñas y llaves privadas con AES-256-GCM y Argon2id, y permite conectarse, buscar, gestionar, exportar e importar credenciales desde la terminal.",
    link: "https://github.com/wolfsouldev/ssh",
    tech: [Icons.go, Icons.cli],
    role: "Go · Seguridad · Open source",
    highlights: [
      "Cero almacenamiento de credenciales en texto plano",
      "Soporte para Linux, macOS y Windows",
      "Flujo interactivo y conexión directa con servidores SSH",
    ],
    active: true,
  },
  // logscope — Interactive Linux log analyzer
  {
    imgURl: ["/img/logscope/logscope-terminal.svg"],
    title: "logscope · Linux Log Analyzer",
    desc: "Analizador interactivo de logs de sistema para Linux, desarrollado en Python. Detecta archivos activos, rotados y comprimidos, calcula cobertura y consumo de disco, y genera diagnósticos accionables sobre retención y rotación para servicios como Squid, Nginx, Pi-hole, AdGuard Home y configuraciones personalizadas.",
    link: "https://github.com/wolfsouldev/logscope",
    tech: [Icons.python, Icons.cli],
    role: "Python · Observabilidad · Linux",
    highlights: [
      "Diagnósticos automáticos de retención, rotación y almacenamiento",
      "Arquitectura extensible basada en analizadores por servicio",
      "Interfaz de terminal legible con Rich y selección interactiva",
    ],
    active: true,
  },
  // Jerry's Pixel Icons
  {
    imgURl: ["/img/jerrys-pixel-icons/jerrys-pixel-icons_1.png"],
    title: "Jerry's Pixel Icons",
    desc: "“Jerry’s Pixel Icons es una extensión para Visual Studio Code que reemplaza los iconos del explorador de archivos por un set en estilo pixel-art, aportando un toque divertido y retro a tu editor. Fácil de activar y personalizar.",
    link: "https://github.com/wolfsouldev/jerrys-pixel-icons",
    demo: "https://marketplace.visualstudio.com/items?itemName=MelissaGutierrez.jerrys-pixel-icons&ssr=false#overview",
    tech: [Icons.typescript, Icons.javascript, Icons.vscode],
    active: true,
  },
  // Agency Go
  {
    imgURl: [
      "/img/agency-go/rental_1.webp",
      "/img/agency-go/rental_2.webp",
      "/img/agency-go/rental_3.webp",
      "/img/agency-go/rental_4.webp",
      "/img/agency-go/rental_5.webp",
      "/img/agency-go/rental_6.webp",
    ],
    title: "Agency Go",
    desc: "Agency Go es una plataforma de gestión de alquileres de habitaciones y autos para negocios turísticos. Incluye una aplicación administrativa para gestionar reservas y el estado de habitaciones y vehículos, mientras los clientes pueden iniciar sesión y hacer reservas en línea. La aplicación está contenedorizada con Docker y desplegada en AWS, aprovechando servicios como EC2 y RDS AWS Lambda para garantizar escalabilidad, alta disponibilidad y procesamiento eficiente.",
    link: "",
    demo: "",
    tech: [
      Icons.typescript,
      Icons.tailwind,
      Icons.framer,
      Icons.next,
      Icons.nest,
      Icons.postgres,
      Icons.docker,
      Icons.aws,
    ],
    active: true,
  },
  // Cajon de claves
  {
    imgURl: [
      "/img/cajon-de-claves/password_1.webp",
      "/img/cajon-de-claves/password_2.webp",
      "/img/cajon-de-claves/password_3.webp",
      "/img/cajon-de-claves/password_4.webp",
    ],
    title: "Cajon de claves",
    desc: "Cajón de Claves es una aplicación web diseñada para la gestión segura de contraseñas. Permite a los usuarios almacenar, organizar y acceder a sus contraseñas de manera fácil y segura desde cualquier dispositivo. La aplicación cuenta con funciones como cifrado de extremo a extremo, generación de contraseñas seguras, y categorización personalizada, asegurando que las contraseñas estén siempre protegidas y accesibles.",
    link: "",
    demo: "https://mypasswordweb.netlify.app/",
    tech: [
      Icons.next,
      Icons.react,
      Icons.typescript,
      Icons.tailwind,
      Icons.framer,
      Icons.mongodb,
    ],
    active: true,
  },
  // Guardi Yami
  {
    imgURl: ["/img/guardi-yami/Guarderia.jpg"],
    title: "Guardi Yami",
    desc: "Guardi Yami es un sistema integral de gestión y administración diseñado específicamente para una guardería infantil. El proyecto abarca tanto el diseño de la identidad visual como la creación de un sitio web interactivo y funcional. Mi responsabilidad principal en este proyecto incluyó el desarrollo completo del frontend y backend, asegurando una experiencia de usuario intuitiva y una gestión de datos eficiente.",
    link: "",
    demo: "https://guardy-yami.netlify.app",
    tech: [
      Icons.react,
      Icons.typescript,
      Icons.tailwind,
      Icons.nest,
      Icons.postgres,
      Icons.jest,
    ],
    active: true,
  },
  // Tv Tecopos
  {
    imgURl: ["/img/tv-tecopos/tv.webp"],
    title: "Tv Tecopos",
    desc: "Tv Tecopos es una plataforma web diseñada para televisores, que permite la promoción dinámica de productos a través de transiciones visualmente atractivas. Esta aplicación está vinculada a un sistema de administración web que facilita el control y la actualización de los contenidos mostrados en tiempo real. La solución está orientada a mejorar la experiencia de marketing visual en entornos de retail y otros espacios comerciales.",
    link: "",
    demo: "https://tv.tecopos.com/",
    tech: [
      Icons.react,
      Icons.framer,
      Icons.typescript,
      Icons.express,
      Icons.jest,
    ],
    active: true,
  },
  // Modulo Reservaciones
  {
    imgURl: [
      "/img/modulo-reservaciones/reservations.webp",
      "/img/modulo-reservaciones/reservations_4.webp",
      "/img/modulo-reservaciones/reservations_2.webp",
      "/img/modulo-reservaciones/reservations_3.webp",
    ],
    title: "Modulo Reservaciones",
    desc: "El Módulo de Reservaciones es una solución integral para la gestión de negocios, diseñada para administrar reservas de manera visual y eficiente. Esta herramienta permite a los usuarios programar y gestionar citas o eventos por fecha a través de una interfaz intuitiva y atractiva.Me encargue del desarrollado tanto del backend como del frontend de este módulo, asegurando una experiencia de usuario fluida y una administración robusta de los datos.",
    link: "",
    demo: "https://admin.tecopos.com/reservation/calendar",
    tech: [
      Icons.react,
      Icons.typescript,
      Icons.redux,
      Icons.express_b,
      Icons.postgres,
      Icons.redis,
      Icons.tailwind,
      Icons.framer,
    ],
    active: true,
  },
  // Modulo Facturación
  {
    imgURl: [
      "/img/modulo-facturacion/billing.webp",
      "/img/modulo-facturacion/billing_2.webp",
      "/img/modulo-facturacion/billing_3.webp",
    ],
    title: "Modulo Facturación",
    desc: "El Módulo de Facturación de Órdenes y Pedidos de Compra es una herramienta esencial para la gestión financiera de negocios, permitiendo un seguimiento preciso y eficiente de las transacciones comerciales. Este módulo facilita la creación, gestión y seguimiento de facturas, así como la administración de órdenes y pedidos de compra, proporcionando a los usuarios una visión clara y organizada de sus operaciones financieras. He desarrollado tanto el backend como el frontend de este módulo para asegurar una experiencia de usuario integrada y fluida.",
    link: "",
    demo: "https://admin.tecopos.com/billing/",
    tech: [
      Icons.react,
      Icons.typescript,
      Icons.redux,
      Icons.express_b,
      Icons.postgres,
      Icons.redis,
      Icons.tailwind,
    ],
    active: true,
  },
  // Space-X-Demo
  {
    imgURl: ["/img/spacex/spacex.jpg"],
    title: "Space-X-Demo",
    desc: "Space-X-Demo es una web demo desarrollada. Este proyecto tiene como objetivo probar las transiciones de vista (view transitions) y mostrar información en tiempo real sobre los lanzamientos de SpaceX, utilizando su API pública. La aplicación proporciona una experiencia de usuario fluida y atractiva, permitiendo explorar datos detallados sobre misiones espaciales, cohetes y fechas de lanzamiento.",
    link: "https://github.com/wolfsoul01/SpaceX_launches_ViewTransitions",
    demo: "https://spacex-view-transition.netlify.app/",
    tech: [Icons.astroWithe, Icons.tailwind, Icons.typescript],
    active: true,
  },
  // GitHub CLI Activity Viewer
  {
    imgURl: ["/img/github-cli/cli_1.webp", "/img/github-cli/cli_2.webp"],
    title: "GitHub CLI Activity Viewer",
    desc: "Una aplicación de línea de comandos (CLI) desarrollada en JavaScript que permite a los usuarios consultar información sobre perfiles de GitHub. Esta herramienta interactiva ofrece opciones para visualizar detalles del perfil, repositorios públicos, seguidores, seguidos, gists, y eventos recientes. Con un diseño enfocado en la simplicidad y la eficiencia, esta CLI facilita la gestión y visualización de datos directamente desde la terminal, utilizando una interfaz de usuario atractiva y fácil de usar.",
    link: "https://github.com/wolfsoul01/githbub-cli",
    tech: [Icons.nodeJs, Icons.javascript, Icons.cli],
    active: true,
  },
  // Tic Tac Toe
  {
    imgURl: ["/img/tic-tac-toe/0_X.jpg"],
    title: "Tic Tac Toe ",
    desc: "Este es un simple juego de Tic Tac Toe desarrollado en React. ¡Diviértete jugando con un amigo!",
    link: "https://github.com/wolfsoul01/Tic_Tac_Toe",
    demo: "https://tictactoexo2.netlify.app",
    tech: [Icons.react, Icons.typescript],
    active: true,
  },
];
