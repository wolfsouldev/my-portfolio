import { motion, useReducedMotion } from "framer-motion";
import { useSyncExternalStore } from "react";
import { ArrowUpRight, Building2, CodeXml, GithubIcon, Star, UserRound } from "lucide-react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "./ui/carousel";
import { PATH_ICON, PROJECT, TECH_LABELS } from "@/consts/projects.const";

const desktopQuery = "(min-width: 1024px)";
const subscribeToDesktop = (onChange: () => void) => {
  const query = window.matchMedia(desktopQuery);
  query.addEventListener("change", onChange);
  return () => query.removeEventListener("change", onChange);
};

export const TextParallaxContentExample = () => {
  const reduceMotion = useReducedMotion();
  const isDesktop = useSyncExternalStore(
    subscribeToDesktop,
    () => window.matchMedia(desktopQuery).matches,
    () => false,
  );
  const projects = PROJECT.filter((item) => item.active).sort(
    (a, b) => Number(Boolean(b.featured)) - Number(Boolean(a.featured)),
  );
  // Independent columns on desktop; original DOM and keyboard order on mobile.
  const columns = isDesktop ? [0, 1] : [0];

  return (
    <div>
      <header className="cosmic-heading">
        <div>
          <span className="cosmic-kicker"><span className="cosmic-sector">04 /</span>Misiones construidas</span>
          <h2 className="cosmic-title"><CodeXml aria-hidden="true" />Proyectos</h2>
          <p className="cosmic-caption">Productos, herramientas y sistemas que he diseñado y construido de punta a punta.</p>
        </div>
        <div className="cosmic-heading-extra"><span className="cosmic-marker">SECTOR / 04</span></div>
      </header>

      <motion.section
        className="grid grid-cols-1 items-start gap-6 lg:grid-cols-2"
      >
        {columns.map((column) => (
          <div key={column} className={isDesktop ? "flex min-w-0 flex-col gap-6" : "contents"}>
            {projects.map((project, index) => index % columns.length === column ? (
              <motion.article
                key={project.title}
                style={{ order: index }}
                whileHover={reduceMotion ? undefined : { y: -4 }}
                transition={{ type: "spring", stiffness: 260, damping: 24 }}
                className="project-card cosmic-panel group flex w-full min-w-0 flex-col"
              >
                <ProjectGallery images={project.imgURl} title={project.title} />

                <div className="project-body flex flex-1 flex-col">
                  <div className="mb-4 flex items-start justify-between gap-4">
                    <div>
                      <div className="flex flex-wrap items-center gap-2">
                        <span className="font-mono text-[11px] font-medium tracking-[.12em] text-orange-700 dark:text-orange-400">
                          PRJ / {String(index + 1).padStart(2, "0")}
                        </span>
                        {project.featured ? (
                          <span className="inline-flex h-6 items-center justify-center gap-1.5 rounded-full border border-amber-500/35 bg-amber-400/15 px-2.5 font-mono text-[10px] font-semibold uppercase leading-none tracking-[.08em] text-amber-800 dark:text-amber-300">
                            <Star className="block size-3.5 shrink-0 fill-current" aria-hidden="true" />
                            <span>Proyecto principal</span>
                          </span>
                        ) : null}
                        <span
                          className={`project-category inline-flex h-6 items-center justify-center gap-1.5 rounded-full border px-2.5 align-middle font-mono text-[10px] font-semibold uppercase leading-none tracking-[.08em] ${
                            project.category === "empresa"
                              ? "border-sky-600/25 bg-sky-500/10 text-sky-700 dark:border-sky-400/30 dark:text-sky-300"
                              : "border-emerald-600/25 bg-emerald-500/10 text-emerald-700 dark:border-emerald-400/30 dark:text-emerald-300"
                          }`}
                          aria-label={`Tipo de proyecto: ${project.category === "empresa" ? "Empresa" : "Personal"}`}
                        >
                          {project.category === "empresa" ? (
                            <Building2 className="block size-3.5 shrink-0" aria-hidden="true" />
                          ) : (
                            <UserRound className="block size-3.5 shrink-0" aria-hidden="true" />
                          )}
                          <span className="inline-flex h-3.5 items-center leading-none">
                            {project.category === "empresa" ? "Empresa" : "Personal"}
                          </span>
                        </span>
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

                  <div className="project-stack mt-auto pt-6">
                    <p className="mb-3 font-mono text-[10px] font-semibold uppercase tracking-[.16em] text-gray-500 dark:text-gray-400">
                      Stack & herramientas
                    </p>
                    <ul className="flex flex-wrap gap-2" aria-label={`Tecnologías utilizadas en ${project.title}`}>
                      {project.tech.map((tech) => (
                        <li
                          key={tech}
                          title={TECH_LABELS[tech] ?? tech}
                          className="cosmic-chip project-tech"
                        >
                          <img
                            src={`${PATH_ICON}${tech}.svg`}
                            alt=""
                            loading="lazy"
                            className={`block size-4 shrink-0 object-contain ${tech === "shadcn" ? "dark:invert" : ""}`}
                          />
                          <span className="inline-flex h-4 items-center leading-none">{TECH_LABELS[tech] ?? tech}</span>
                        </li>
                      ))}
                    </ul>

                    {(project.link || project.site || project.demo) ? (
                      <div className="project-links mt-5 flex min-h-16 flex-wrap items-start gap-3 border-t border-black/10 pt-5 dark:border-white/10">
                        {project.link ? (
                          <ProjectLink href={project.link} label="Código" icon="github" />
                        ) : null}
                        {project.demo ? (
                          <ProjectLink href={project.demo} label={project.demoLabel ?? "Ver proyecto"} icon="external" />
                        ) : null}
                        {project.site ? (
                          <ProjectLink href={project.site} label="Ver página" icon="external" />
                        ) : null}
                      </div>
                    ) : (
                      <div className="project-links mt-5 min-h-16 border-t border-black/10 pt-5 font-mono text-xs text-gray-500 dark:border-white/10 dark:text-gray-400">
                        Proyecto privado · vista previa no disponible
                      </div>
                    )}
                  </div>
                </div>
              </motion.article>
            ) : null)}
          </div>
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
  <div className="project-media relative aspect-video w-full shrink-0 overflow-hidden border-b border-black/10 bg-slate-100 dark:border-white/10 dark:bg-slate-900">
    <img
      src={image}
      alt={`Captura ${index + 1} de ${title}`}
      loading={eager ? "eager" : "lazy"}
      className="absolute inset-0 block h-full w-full object-contain transition-transform duration-700 ease-out group-hover:scale-[1.035]"
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
    <Carousel opts={{ align: "start", loop: true }} className="project-carousel shrink-0" aria-label={`Capturas de ${title}`}>
      <CarouselContent>
        {images.map((image, index) => (
          <CarouselItem key={image} className="relative">
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
    className="cosmic-button project-action"
  >
    {icon === "github" ? <GithubIcon className="size-4" /> : <ArrowUpRight className="size-4" />}
    {label}
  </a>
);
