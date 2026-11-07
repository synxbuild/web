"use client";

import { useRef } from "react";
import { process } from "@/content/site";
import { gsap, useGSAP } from "@/lib/gsap";
import { Section } from "@/components/ui/section";
import { Eyebrow } from "@/components/ui/eyebrow";
import { Rich } from "@/components/ui/rich";

/*
 * Four steps joined by one cable. Scrolling charges the cable and each
 * step lights up when the signal reaches it.
 */
export function Process() {
  const root = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
      const steps = gsap.utils.toArray<HTMLElement>("[data-step]");
      const tl = gsap.timeline({
        defaults: { ease: "none" },
        scrollTrigger: { trigger: "[data-steps]", start: "top 75%", end: "bottom 55%", scrub: 0.6 },
      });
      const axis = window.matchMedia("(min-width: 64rem)").matches ? "scaleX" : "scaleY";
      tl.fromTo("[data-cable]", { [axis]: 0 }, { [axis]: 1, duration: 1 });
      steps.forEach((step, i) => {
        const at = i / steps.length;
        tl.fromTo(step.querySelector("[data-dot]"), { backgroundColor: "var(--surface)", color: "var(--muted)", boxShadow: "0 0 0 rgb(0 0 255 / 0)" }, { backgroundColor: "#0000ff", color: "#ffffff", boxShadow: "0 0 32px rgb(0 0 255 / 0.55)", duration: 0.08 }, at)
          .fromTo(step.querySelector("[data-body]"), { opacity: 0.3 }, { opacity: 1, duration: 0.12 }, at);
      });
    },
    { scope: root },
  );

  return (
    <Section id="proceso" theme="light" label="Proceso" className="pb-32 pt-28 lg:pb-44 lg:pt-36">
      <div ref={root} className="container-site">
        <div className="grid gap-8 lg:grid-cols-12 lg:items-end">
          <div className="lg:col-span-8">
            <Eyebrow index="08">{process.eyebrow}</Eyebrow>
            <h2 data-split className="text-display mt-6 text-[clamp(2.2rem,4.2vw,4rem)]">
              <Rich text={process.title} />
            </h2>
          </div>
        </div>

        <ol data-steps className="relative mt-20 grid gap-12 lg:grid-cols-4 lg:gap-6">
          {/* Cable: vertical on mobile, horizontal on desktop */}
          <span aria-hidden className="absolute bottom-0 left-6 top-0 w-px bg-line lg:inset-x-6 lg:bottom-auto lg:top-6 lg:h-px lg:w-auto" />
          <span
            aria-hidden
            data-cable
            className="absolute bottom-0 left-6 top-0 w-px origin-top bg-accent shadow-[0_0_10px_var(--accent)] lg:inset-x-6 lg:bottom-auto lg:top-6 lg:h-px lg:w-auto lg:origin-left"
          />
          {process.steps.map((step, i) => (
            <li key={step.title} data-step className="relative pl-20 lg:pl-0">
              <span
                data-dot
                className="pixel absolute left-0 top-0 grid size-12 place-items-center rounded-full border border-line bg-surface text-sm text-muted lg:relative"
              >
                0{i + 1}
              </span>
              <div data-body className="lg:mt-10 lg:pr-6">
                <h3 className="text-2xl font-semibold tracking-[-0.04em]">{step.title}</h3>
                <p className="mt-4 text-pretty leading-relaxed text-muted">{step.body}</p>
              </div>
            </li>
          ))}
        </ol>
      </div>
    </Section>
  );
}
