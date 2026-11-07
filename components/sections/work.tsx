"use client";

import { useRef } from "react";
import { work } from "@/content/site";
import { gsap, useGSAP } from "@/lib/gsap";
import { Section } from "@/components/ui/section";
import { Eyebrow } from "@/components/ui/eyebrow";
import { Rich } from "@/components/ui/rich";
import { Button } from "@/components/ui/button";

/*
 * Horizontal gallery pinned to the scroll on desktop. Inside each browser
 * mockup the landing "assembles" itself: blocks snap into the grid as the
 * card crosses the screen. Mobile falls back to native swipe with snap.
 */
export function Work() {
  const root = useRef<HTMLDivElement>(null);
  const track = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add("(min-width: 64rem) and (prefers-reduced-motion: no-preference)", () => {
        const el = track.current!;
        const distance = () => el.scrollWidth - window.innerWidth;

        const scroll = gsap.to(el, {
          x: () => -distance(),
          ease: "none",
          scrollTrigger: {
            trigger: root.current,
            start: "top top",
            end: () => `+=${distance()}`,
            pin: true,
            scrub: 0.8,
            invalidateOnRefresh: true,
          },
        });

        gsap.utils.toArray<HTMLElement>("[data-project]").forEach((card) => {
          gsap.from(card.querySelectorAll("[data-block]"), {
            yPercent: 60,
            opacity: 0,
            stagger: 0.06,
            duration: 0.9,
            scrollTrigger: { trigger: card, containerAnimation: scroll, start: "left 85%", toggleActions: "play none none reverse" },
          });
        });
      });
    },
    { scope: root },
  );

  return (
    <Section id="proyectos" theme="dark" label="Proyectos" className="overflow-hidden">
      <div ref={root} className="flex min-h-dvh flex-col justify-center py-28 lg:py-0">
        <div className="pointer-events-none absolute inset-x-0 bottom-0 -z-10 h-1/2 bg-[radial-gradient(ellipse_50%_60%_at_50%_100%,rgb(0_0_255/0.22),transparent)]" />
        <div className="container-site grid gap-8 lg:grid-cols-12 lg:items-end">
          <div className="lg:col-span-7">
            <Eyebrow index="05">{work.eyebrow}</Eyebrow>
            <h2 data-split className="text-display mt-6 text-[clamp(2.2rem,4.2vw,4rem)]">
              <Rich text={work.title} />
            </h2>
          </div>
          <p data-fade className="max-w-md text-pretty text-lg leading-relaxed text-muted lg:col-span-5 lg:justify-self-end">
            {work.body}
          </p>
        </div>

        <div className="mt-14 overflow-x-auto [scrollbar-width:none] lg:overflow-visible">
          <div ref={track} className="flex w-max snap-x snap-mandatory gap-4 px-5 md:px-10 lg:snap-none lg:gap-6 xl:px-20">
            {work.projects.map((name, i) => (
              <ProjectCard key={name} name={name} index={i} />
            ))}
            <div className="flex w-[78vw] shrink-0 snap-start flex-col items-start justify-center gap-6 rounded-[var(--radius-shell)] border border-line p-8 sm:w-[46vw] lg:w-[26vw]">
              <span className="pixel text-5xl text-accent">→</span>
              <Button href={work.cta.href} variant="ghost">
                {work.cta.label}
              </Button>
            </div>
          </div>
        </div>
      </div>
    </Section>
  );
}

function ProjectCard({ name, index }: { name: string; index: number }) {
  const slug = name.toLowerCase().normalize("NFD").replace(/[̀-ͯ]/g, "").replace(/\s+/g, "");
  const layout = index % 3;

  return (
    <article data-project className="group w-[84vw] shrink-0 snap-start sm:w-[60vw] lg:w-[44vw] xl:w-[38vw]">
      <div className="card spotlight overflow-hidden p-2 transition-transform duration-700 ease-[var(--ease-expo)] group-hover:-translate-y-1.5" data-spotlight>
        {/* Browser chrome */}
        <div className="flex items-center gap-3 px-3 py-2.5">
          <span className="flex gap-1.5">
            <span className="size-2.5 rounded-full bg-line" />
            <span className="size-2.5 rounded-full bg-line" />
            <span className="size-2.5 rounded-full bg-line" />
          </span>
          <span className="eyebrow mx-auto truncate rounded-full bg-bg/80 px-4 py-1.5 normal-case tracking-normal text-muted">{slug}.com</span>
        </div>

        {/* Abstract landing that assembles itself (real screenshots pending) */}
        <div className="relative aspect-[16/10] overflow-hidden rounded-[var(--radius-card)] bg-bg">
          <div className="bg-grid absolute inset-0" />
          <div className="absolute left-1/2 top-0 h-2/3 w-2/3 -translate-x-1/2 rounded-full bg-brand-500/25 blur-3xl transition-opacity duration-700 group-hover:opacity-100 lg:opacity-60" />
          <div className="relative flex h-full flex-col p-[6%]">
            <div data-block className="flex items-center justify-between">
              <span className="h-2 w-16 rounded-full bg-fg/70" />
              <span className="h-5 w-16 rounded-full border border-line" />
            </div>
            <div className={layout === 1 ? "mt-[8%] grid flex-1 grid-cols-2 gap-[5%]" : "mt-[8%] flex flex-1 flex-col items-center text-center"}>
              <div className={layout === 1 ? "space-y-2.5" : "flex w-full flex-col items-center space-y-2.5"}>
                <span data-block className="eyebrow block text-accent">{name}</span>
                <span data-block className="block h-3.5 w-4/5 rounded bg-fg/85" />
                <span data-block className="block h-3.5 w-3/5 rounded bg-fg/85" />
                <span data-block className="block h-2 w-2/3 rounded bg-muted/40" />
                <span data-block className="mt-2 block h-7 w-28 rounded-full bg-accent" />
              </div>
              <div data-block className={layout === 1 ? "rounded-xl border border-line bg-surface-2/70" : "mt-[6%] grid w-full grid-cols-3 gap-2"}>
                {layout !== 1 && [0, 1, 2].map((k) => <span key={k} className="block h-14 rounded-lg border border-line bg-surface/80" />)}
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="mt-5 flex items-baseline justify-between px-2">
        <h3 className="text-xl font-medium tracking-[-0.03em]">{name}</h3>
        <span className="pixel text-sm text-muted">0{index + 1}</span>
      </div>
    </article>
  );
}
