import React, { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { CodeXml, GitBranchPlus, Github, Link, TentIcon } from "lucide-react";
import { Button } from "./ui/button";
import { GitHub } from "./icons/TechIcon";

const PATH_ICON = "/icon/";

const PROJECT = [
  {
    imgURl: "/img/Guarderia.jpg",
    title: "Guardi Yami",
    desc: "Guardi Yami es un sistema integral de gestión y administración diseñado específicamente para una guardería infantil. El proyecto abarca tanto el diseño de la identidad visual como la creación de un sitio web interactivo y funcional. Mi responsabilidad principal en este proyecto incluyó el desarrollo completo del frontend y backend, asegurando una experiencia de usuario intuitiva y una gestión de datos eficiente.",
    link: "",
    demo: "",
    tech: ["react", "typescript", "tailwind", "nest", "postgres",'jest'],
  },
  {
    imgURl: "/img/tv.webp",
    title: "Tv Tecopos",
    desc: "Tv Tecopos es una plataforma web diseñada para televisores, que permite la promoción dinámica de productos a través de transiciones visualmente atractivas. Esta aplicación está vinculada a un sistema de administración web que facilita el control y la actualización de los contenidos mostrados en tiempo real. La solución está orientada a mejorar la experiencia de marketing visual en entornos de retail y otros espacios comerciales.",
    link: "",
    demo: "https://tv.tecopos.com/",
    tech: ["react", "typescript","express"],
  },
  {
    imgURl: "/img/spacex.jpg",
    title: "Space-X-Demo",
    desc: "Space-X-Demo es una web demo desarrollada. Este proyecto tiene como objetivo probar las transiciones de vista (view transitions) y mostrar información en tiempo real sobre los lanzamientos de SpaceX, utilizando su API pública. La aplicación proporciona una experiencia de usuario fluida y atractiva, permitiendo explorar datos detallados sobre misiones espaciales, cohetes y fechas de lanzamiento.",
    link: "https://github.com/wolfsoul01/SpaceX_launches_ViewTransitions",
    demo: "",
    tech: ["astroWithe", "typescript", "tailwind"],
  },
  {
    imgURl: "/img/0_X.jpg",
    title: "Tic Tac Toe ",
    desc: "Este es un simple juego de Tic Tac Toe desarrollado en React. ¡Diviértete jugando con un amigo!",
    link: "https://github.com/wolfsoul01/Tic_Tac_Toe",
    demo: "",
    tech: ["react", "typescript"],
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
              subheading={item.tech}
              heading={item.title}
            >
              <ProjectDesc desc={item.desc} subText={""} title={item.title} demo={item.demo} link={item.link} />
            </TextParallaxContent>
          </article>
        ))}
      </section>
    </div>
  );
};

const IMG_PADDING = 12;

interface TextParallaxContentProps {
  imgUrl: string;
  subheading: string[];
  heading: string;
  children: React.ReactElement;
}
const TextParallaxContent = ({
  imgUrl,
  subheading,
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
        <OverlayCopy heading={heading} subheading={subheading} />
      </div>
      {children}
    </div>
  );
};

const StickyImage = ({ imgUrl }: { imgUrl: string }) => {
  const targetRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: targetRef,
    offset: ["end end", "end start"],
  });

  const scale = useTransform(scrollYProgress, [0, 1], [1, 0.85]);
  const opacity = useTransform(scrollYProgress, [0, 1], [1, 0]);

  return (
    <motion.div
      style={{
        backgroundImage: `url(${imgUrl})`,
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
  );
};

const OverlayCopy = ({
  subheading,
  heading,
}: {
  subheading: string[];
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
        {subheading.map((item) => (
          <img
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
}: ProjectDescProps) => (
  <div className="mx-auto grid max-w-4xl grid-cols-1 gap-8 px-4  md:grid-cols-12">
    <span className="col-span-1 text-3xl font-bold md:col-span-4">
      <h2 className="col-span-1 text-3xl font-bold md:col-span-4">{title}</h2>

      <aside className="mt-3 flex flex-col gap-y-2">
        {link && (
          <Button className="flex gap-x-2 hover:scale-105" asChild>
            <a href={link}>
              <Github />
              Code
            </a>
          </Button>
        )}
        {demo && (
          <Button className="flex gap-x-2 hover:scale-105" asChild>
            <a href={demo}>
              <Link />
              Preview
            </a>
          </Button>
        )}
      </aside>
    </span>
    <div className="col-span-1 md:col-span-8">
      <p className="mb-4 text-xl text-neutral-600 md:text-2xl">{desc}</p>
      <p className="mb-8 text-xl text-neutral-600 md:text-2xl">{subText}</p>
    </div>
  </div>
);
