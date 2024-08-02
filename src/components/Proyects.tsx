import React, { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { CodeXml, Github, Icon, Link, TentIcon } from "lucide-react";
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
  tailwind: "tailwind",
  nest: "nest",
  postgres: "postgres",
  jest: "jest",
  framer: "framer-motion",
  express: "express",
  express_b: "express",
  astroWithe: "astroWithe",
  redux: "redux",
  redux_b: "redux",
  redis: "redis",
  sequelize: "sequelize",
};

const PROJECT = [
  {
    imgURl: ["/img/Guarderia.jpg"],
    title: "Guardi Yami",
    desc: "Guardi Yami es un sistema integral de gestión y administración diseñado específicamente para una guardería infantil. El proyecto abarca tanto el diseño de la identidad visual como la creación de un sitio web interactivo y funcional. Mi responsabilidad principal en este proyecto incluyó el desarrollo completo del frontend y backend, asegurando una experiencia de usuario intuitiva y una gestión de datos eficiente.",
    link: "",
    demo: "",
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
    imgURl: [
      "/img/billing.webp",
      "/img/billing_2.webp",
      "/img/billing_3.webp",
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
  },
  {
    imgURl: ["/img/spacex.jpg"],
    title: "Space-X-Demo",
    desc: "Space-X-Demo es una web demo desarrollada. Este proyecto tiene como objetivo probar las transiciones de vista (view transitions) y mostrar información en tiempo real sobre los lanzamientos de SpaceX, utilizando su API pública. La aplicación proporciona una experiencia de usuario fluida y atractiva, permitiendo explorar datos detallados sobre misiones espaciales, cohetes y fechas de lanzamiento.",
    link: "https://github.com/wolfsoul01/SpaceX_launches_ViewTransitions",
    demo: "",
    tech: [Icons.astroWithe, Icons.tailwind, Icons.typescript],
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
      <aside className="mb-2 text-center text-xl md:mb-4 md:text-3xl flex gap-x-2">
        {techs.map((item) => (
          <img
            key={item}
            className="w-12 hover:rotate-1"
            src={`${PATH_ICON}${item}.svg`}
          />
        ))}
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
  const opacity = useTransform(scrollYProgress, [0.25, 0.5, 0.75], [0, 1, 0]);

  return (
    <div className="mx-auto grid max-w-4xl grid-cols-1 gap-8 px-4  md:grid-cols-12">
      <span className="col-span-1 text-3xl font-bold md:col-span-4">
        <h2 className="col-span-1 text-3xl font-bold md:col-span-4">{title}</h2>

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
              <a href={demo}>
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
