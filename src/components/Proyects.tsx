import { motion, useReducedMotion, type Variants } from "framer-motion";
import { ArrowUpRight, CodeXml, GithubIcon } from "lucide-react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "./ui/carousel";
import { PATH_ICON, PROJECT } from "@/consts/projects.const";

const listVariants: Variants = {
  hidden: {},
  visible: {
    transition: {
      delayChildren: 0.08,
      staggerChildren: 0.11,
    },
  },
};

const cardVariants: Variants = {
  hidden: { opacity: 0, y: 54, scale: 0.965 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 0.72, ease: [0.22, 1, 0.36, 1] },
  },
};

export const TextParallaxContentExample = () => {
  const reduceMotion = useReducedMotion();
  const projects = PROJECT.filter((item) => item.active);

  return (
    <div>
      <header className="mb-8 flex flex-col items-start justify-between gap-4 md:mb-10 md:flex-row md:items-end">
        <div>
          <span className="font-mono text-xs font-semibold uppercase tracking-[0.16em] text-orange-400">
            Selección de trabajo
          </span>
          <h2 className="mt-2 flex items-center gap-3 text-4xl font-bold tracking-[-0.045em] text-black/80 dark:text-white md:text-5xl">
            <CodeXml className="size-8" />
            Proyectos
          </h2>
        </div>
        <p className="max-w-lg leading-7 text-gray-600 dark:text-gray-300">
          Productos, herramientas y sistemas que he diseñado y construido de punta a punta.
        </p>
      </header>

      <motion.section
        className="grid grid-cols-1 items-start gap-6 lg:grid-cols-2"
        variants={reduceMotion ? undefined : listVariants}
        initial={reduceMotion ? false : "hidden"}
        whileInView={reduceMotion ? undefined : "visible"}
        viewport={{ once: true, amount: 0.04 }}
      >
        {projects.map((project, index) => (
          <motion.article
            key={project.title}
            variants={reduceMotion ? undefined : cardVariants}
            whileHover={reduceMotion ? undefined : { y: -8, scale: 1.006 }}
            transition={{ type: "spring", stiffness: 260, damping: 24 }}
            className="project-card group self-start overflow-hidden rounded-[1.6rem] border border-black/10 bg-white/75 shadow-[0_20px_60px_-46px_rgba(15,23,42,.55)] backdrop-blur-sm transition-[border-color,box-shadow] duration-300 hover:border-orange-400/40 hover:shadow-[0_28px_80px_-42px_rgba(249,115,22,.38)] dark:border-white/10 dark:bg-slate-950/75"
          >
            <ProjectGallery images={project.imgURl} title={project.title} />

            <div className="p-5 md:p-7">
              <div className="mb-4 flex items-start justify-between gap-4">
                <div>
                  <div className="flex flex-wrap items-center gap-2">
                    <span className="font-mono text-[11px] font-medium tracking-[.12em] text-orange-400">
                      PRJ / {String(index + 1).padStart(2, "0")}
                    </span>
                    {project.featured ? (
                      <span className="rounded-full border border-orange-400/35 bg-orange-400/10 px-2 py-0.5 font-mono text-[10px] font-semibold uppercase tracking-[.08em] text-orange-500 dark:text-orange-300">
                        Proyecto principal
                      </span>
                    ) : null}
                  </div>
                  <h3 className="mt-1 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
                    {project.title}
                  </h3>
                  {project.role ? (
                    <p className="mt-2 font-mono text-xs uppercase tracking-[.08em] text-gray-500 dark:text-gray-400">
                      {project.role}
                    </p>
                  ) : null}
                </div>
                <span className="mt-2 size-2 shrink-0 rounded-full bg-orange-400 shadow-[0_0_18px_rgba(251,146,60,.8)] transition-transform duration-300 group-hover:scale-150" />
              </div>

              <p className="project-description text-[.96rem] leading-7 text-gray-700 dark:text-gray-200">
                {project.desc.replace(/^“/, "")}
              </p>

              {project.highlights ? (
                <ul className="mt-5 grid gap-2 text-sm leading-6 text-gray-600 dark:text-gray-300">
                  {project.highlights.map((highlight) => (
                    <li key={highlight} className="flex gap-2">
                      <span className="mt-[.62rem] size-1.5 shrink-0 rounded-full bg-orange-400" />
                      <span>{highlight}</span>
                    </li>
                  ))}
                </ul>
              ) : null}

              <ul className="mt-6 flex flex-wrap gap-2" aria-label={`Tecnologías utilizadas en ${project.title}`}>
                {project.tech.map((tech) => (
                  <li
                    key={tech}
                    title={tech.replaceAll("-", " ")}
                    className="grid size-9 place-items-center rounded-xl border border-black/10 bg-black/[.025] transition-all duration-300 hover:-translate-y-1 hover:border-orange-400/40 hover:bg-orange-400/10 dark:border-white/10 dark:bg-white/[.05]"
                  >
                    <img
                      src={`${PATH_ICON}${tech}.svg`}
                      alt=""
                      loading="lazy"
                      className="size-5 object-contain"
                    />
                    <span className="sr-only">{tech.replaceAll("-", " ")}</span>
                  </li>
                ))}
              </ul>

              {(project.link || project.demo) ? (
                <div className="mt-7 flex flex-wrap gap-3 border-t border-black/10 pt-5 dark:border-white/10">
                  {project.link ? (
                    <ProjectLink href={project.link} label="Código" icon="github" />
                  ) : null}
                  {project.demo ? (
                    <ProjectLink href={project.demo} label="Ver proyecto" icon="external" />
                  ) : null}
                </div>
              ) : (
                <div className="mt-7 border-t border-black/10 pt-5 font-mono text-xs text-gray-500 dark:border-white/10 dark:text-gray-400">
                  Proyecto privado · vista previa no disponible
                </div>
              )}
            </div>
          </motion.article>
        ))}
      </motion.section>
    </div>
  );
};

interface ProjectGalleryProps {
  images: string[];
  title: string;
}

const ProjectImage = ({
  image,
  title,
  index,
  eager = false,
}: {
  image: string;
  title: string;
  index: number;
  eager?: boolean;
}) => (
  <div className="project-media relative overflow-hidden bg-slate-900">
    <img
      src={image}
      alt={`Captura ${index + 1} de ${title}`}
      loading={eager ? "eager" : "lazy"}
      className="block h-auto w-full object-contain transition-transform duration-700 ease-out group-hover:scale-[1.035]"
    />
    <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-slate-950/25 via-transparent to-transparent opacity-70 transition-opacity duration-300 group-hover:opacity-30" />
    <div className="pointer-events-none absolute inset-x-0 bottom-0 h-px origin-left scale-x-0 bg-gradient-to-r from-orange-400 via-amber-300 to-transparent transition-transform duration-500 group-hover:scale-x-100" />
  </div>
);

const ProjectGallery = ({ images, title }: ProjectGalleryProps) => {
  const isPaginated = images.length > 1;

  if (!isPaginated) {
    return <ProjectImage image={images[0]} title={title} index={0} eager={title === "Jerry's Pixel Icons"} />;
  }

  return (
    <Carousel opts={{ align: "start", loop: true }} className="project-carousel">
      <CarouselContent>
        {images.map((image, index) => (
          <CarouselItem key={image}>
            <ProjectImage image={image} title={title} index={index} />
            <span className="absolute bottom-4 left-8 rounded-full bg-black/60 px-3 py-1 font-mono text-[10px] text-white backdrop-blur-md">
              {String(index + 1).padStart(2, "0")} / {String(images.length).padStart(2, "0")}
            </span>
          </CarouselItem>
        ))}
      </CarouselContent>
      <CarouselPrevious className="left-4 top-1/2 z-10 size-10 border-white/20 bg-black/55 text-white opacity-90 backdrop-blur-md transition-all hover:scale-110 hover:bg-orange-500 hover:text-white group-hover:opacity-100" />
      <CarouselNext className="right-4 top-1/2 z-10 size-10 border-white/20 bg-black/55 text-white opacity-90 backdrop-blur-md transition-all hover:scale-110 hover:bg-orange-500 hover:text-white group-hover:opacity-100" />
    </Carousel>
  );
};

interface ProjectLinkProps {
  href: string;
  label: string;
  icon: "github" | "external";
}

const ProjectLink = ({ href, label, icon }: ProjectLinkProps) => (
  <a
    href={href}
    target="_blank"
    rel="noreferrer"
    className="inline-flex items-center gap-2 rounded-full border border-black/10 px-4 py-2 text-sm font-semibold text-gray-700 transition-all duration-300 hover:-translate-y-0.5 hover:border-orange-400/50 hover:bg-orange-400/10 hover:text-orange-600 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-orange-400 dark:border-white/10 dark:text-gray-200 dark:hover:text-orange-300"
  >
    {icon === "github" ? <GithubIcon className="size-4" /> : <ArrowUpRight className="size-4" />}
    {label}
  </a>
);
