import React, { useId, useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { CodeXml, Github, Link } from "lucide-react";
import { Button } from "./ui/button";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "./ui/carousel";
import { PATH_ICON, PROJECT } from "@/consts/projects.const";

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
        {PROJECT.filter(item => item.active).map((item) => (
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
                  height: `calc(70vh - ${IMG_PADDING * 2}px)`,
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
  const opacity = useTransform(scrollYProgress, [0.1, 0.4, 0.8], [0, 1, 0]);

  return (
    <motion.div
      style={{
        y,
        opacity,
        top: IMG_PADDING,
        height: `calc(70vh - ${IMG_PADDING * 2}px)`,
      }}
      ref={targetRef}
      className="absolute inset-x-0 flex flex-col items-center justify-center text-white"
    >
      <h3 className="text-center text-4xl font-bold md:text-7xl mb-5">
        {heading}
      </h3>
      <aside className="mb-2 text-center text-xl md:mb-4 md:text-3xl flex gap-x-2 flex-wrap justify-center max-w-full px-5">
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
    <div className="mx-auto grid max-w-7xl grid-cols-1 gap-8 px-14  md:grid-cols-12">
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
