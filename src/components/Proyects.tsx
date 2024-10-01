import React, { useId, useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { CodeXml, Github, Icon, Link } from "lucide-react";
import { Button } from "./ui/button";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "./ui/carousel";

const PATH_ICON = "/icon/";

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
};

const PROJECT = [
  {
    imgURl: [
      "/img/rental_1.webp",
      "/img/rental_2.webp",
      "/img/rental_3.webp",
      "/img/rental_4.webp",
      "/img/rental_5.webp",
      "/img/rental_6.webp",
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
  },
  {
    imgURl: [
      "/img/password_1.webp",
      "/img/password_2.webp",
      "/img/password_3.webp",
      "/img/password_4.webp",
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
  },
  {
    imgURl: ["/img/Guarderia.jpg"],
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
  },
  {
    imgURl: ["/img/tv.webp"],
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
  },
  {
    imgURl: [
      "/img/reservations.webp",
      "/img/reservations_4.webp",
      "/img/reservations_2.webp",
      "/img/reservations_3.webp",
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
  },
  {
    imgURl: ["/img/billing.webp", "/img/billing_2.webp", "/img/billing_3.webp"],
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
  },
  {
    imgURl: ["/img/spacex.jpg"],
    title: "Space-X-Demo",
    desc: "Space-X-Demo es una web demo desarrollada. Este proyecto tiene como objetivo probar las transiciones de vista (view transitions) y mostrar información en tiempo real sobre los lanzamientos de SpaceX, utilizando su API pública. La aplicación proporciona una experiencia de usuario fluida y atractiva, permitiendo explorar datos detallados sobre misiones espaciales, cohetes y fechas de lanzamiento.",
    link: "https://github.com/wolfsoul01/SpaceX_launches_ViewTransitions",
    demo: "https://spacex-view-transition.netlify.app/",
    tech: [Icons.astroWithe, Icons.tailwind, Icons.typescript],
  },
  {
    imgURl: ["/img/cli_1.webp", "/img/cli_2.webp"],
    title: "GitHub CLI Activity Viewer",
    desc: "Una aplicación de línea de comandos (CLI) desarrollada en JavaScript que permite a los usuarios consultar información sobre perfiles de GitHub. Esta herramienta interactiva ofrece opciones para visualizar detalles del perfil, repositorios públicos, seguidores, seguidos, gists, y eventos recientes. Con un diseño enfocado en la simplicidad y la eficiencia, esta CLI facilita la gestión y visualización de datos directamente desde la terminal, utilizando una interfaz de usuario atractiva y fácil de usar.",
    link: "https://github.com/wolfsoul01/githbub-cli",
    tech: [Icons.nodeJs, Icons.javascript, Icons.cli],
  },
  {
    imgURl: ["/img/0_X.jpg"],
    title: "Tic Tac Toe ",
    desc: "Este es un simple juego de Tic Tac Toe desarrollado en React. ¡Diviértete jugando con un amigo!",
    link: "https://github.com/wolfsoul01/Tic_Tac_Toe",
    demo: "https://tictactoexo2.netlify.app",
    tech: [Icons.react, Icons.typescript],
  },
];

export const TextParallaxContentExample = () => {
  return (
    <div className="">
      <header>
        <h2 className="flex items-center mb-6 text-3xl font-semibold gap-x-3 text-black/80 dark:text-white ">
          <CodeXml className="size-8" />
          Proyectos
        </h2>
      </header>

      <section className="flex flex-col gap-y-10">
        {PROJECT.map((item) => (
          <article className="">
            <TextParallaxContent
              key={item.title}
              imgUrl={item.imgURl}
              techs={item.tech}
              heading={item.title}
            >
              <ProjectDesc
                desc={item.desc}
                subText={""}
                title={item.title}
                demo={item.demo}
                link={item.link}
              />
            </TextParallaxContent>
          </article>
        ))}
      </section>
    </div>
  );
};

const IMG_PADDING = 12;

interface TextParallaxContentProps {
  imgUrl: string[];
  techs: string[];
  heading: string;
  children: React.ReactElement;
}
const TextParallaxContent = ({
  imgUrl,
  techs,
  heading,
  children,
}: TextParallaxContentProps) => {
  return (
    <div
      style={{
        paddingLeft: IMG_PADDING,
        paddingRight: IMG_PADDING,
      }}
    >
      <div className="relative ">
        <StickyImage imgUrl={imgUrl} />
        <OverlayCopy heading={heading} techs={techs} />
      </div>
      {children}
    </div>
  );
};

const StickyImage = ({ imgUrl }: { imgUrl: string[] }) => {
  const targetRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: targetRef,
    offset: ["end end", "end start"],
  });

  const scale = useTransform(scrollYProgress, [0, 1], [1, 0.85]);
  const opacity = useTransform(scrollYProgress, [0, 1], [1, 0]);
  const isPaginated = imgUrl.length > 1;
  return (
    <Carousel
      opts={{
        align: "start",
      }}
    >
      <CarouselContent>
        {imgUrl.map((item) => {
          return (
            <CarouselItem className="">
              <motion.div
                style={{
                  backgroundImage: `url(${item})`,
                  backgroundSize: "cover",
                  backgroundPosition: "center",
                  height: `calc(100vh - ${IMG_PADDING * 2}px)`,
                  top: IMG_PADDING,
                  scale,
                }}
                ref={targetRef}
                className="sticky z-0 overflow-hidden rounded-3xl"
              >
                <motion.div
                  className="absolute inset-0 bg-neutral-950/70"
                  style={{
                    opacity,
                  }}
                />
              </motion.div>
            </CarouselItem>
          );
        })}
      </CarouselContent>
      {isPaginated && <CarouselPrevious />}
      {isPaginated && <CarouselNext />}
    </Carousel>
  );
};

const OverlayCopy = ({
  techs,
  heading,
}: {
  techs: string[];
  heading: string;
}) => {
  const targetRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: targetRef,
    offset: ["start end", "end start"],
  });

  const y = useTransform(scrollYProgress, [0, 1], [250, -250]);
  const opacity = useTransform(scrollYProgress, [0.25, 0.5, 0.75], [0, 1, 0]);

  return (
    <motion.div
      style={{
        y,
        opacity,
      }}
      ref={targetRef}
      className="absolute left-0 top-0 flex h-screen w-full flex-col items-center justify-center text-white"
    >
      <h3 className="text-center text-4xl font-bold md:text-7xl mb-5">
        {heading}
      </h3>
      <aside className="mb-2 text-center text-xl md:mb-4 md:text-3xl flex gap-x-2 flex-wrap max-w-full px-5">
        {techs.map((item) => {
          const key = useId();
          return (
            <img
              key={heading + key}
              className="w-10 md:w-12 hover:rotate-1"
              src={`${PATH_ICON}${item}.svg`}
            />
          );
        })}
      </aside>
    </motion.div>
  );
};

interface ProjectDescProps {
  desc: string;
  subText: string;
  title: string;
  link?: string;
  demo?: string;
}

const ProjectDesc = ({
  desc,
  subText,
  title,
  link,
  demo,
}: ProjectDescProps) => {
  const targetRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: targetRef,
    offset: ["start end", "end start"],
  });

  const y = useTransform(scrollYProgress, [0, 1], [250, -250]);
  const opacity = useTransform(
    scrollYProgress,
    [0.25, 0.5, 0.75],
    [0.1, 1, 0.1]
  );

  return (
    <div className="mx-auto grid max-w-4xl grid-cols-1 gap-8 px-4  md:grid-cols-12">
      <span className="col-span-1 text-3xl font-bold md:col-span-4">
        <h2 className="col-span-1 text-4xl font-bold md:col-span-4">{title}</h2>

        <aside className="mt-3 flex flex-col gap-y-2">
          {link && (
            <Button className="flex gap-x-2 hover:scale-105 group" asChild>
              <a href={link}>
                <Github />
                <p className="group-hover:underline">Code</p>
              </a>
            </Button>
          )}
          {demo && (
            <Button className="flex gap-x-2 hover:scale-105 group" asChild>
              <a href={demo} target="_blank">
                <Link />
                <p className="group-hover:underline">Preview</p>
              </a>
            </Button>
          )}
        </aside>
      </span>
      <div className="col-span-1 md:col-span-8">
        <motion.p
          ref={targetRef}
          style={{ opacity }}
          className={`mb-4 text-xl text-neutral-400/${y} md:text-2xl`}
          //transition={{ ease: true ,duration:200}}
        >
          {desc}
        </motion.p>
        <p className="mb-8 text-xl text-neutral-600 md:text-2xl">{subText}</p>
      </div>
    </div>
  );
};
