"use client";

import { useRef } from "react";
import { problem } from "@/content/site";
import { gsap, ScrollTrigger, SplitText, useGSAP } from "@/lib/gsap";
import { Section } from "@/components/ui/section";
import { Eyebrow } from "@/components/ui/eyebrow";
import { Rich } from "@/components/ui/rich";
import { Check, Cross } from "@/components/ui/icons";

/*
 * Pinned sequence: the copy lights up word by word, then each broken
 * stage of the funnel gets repaired, then the closing line lands.
 */
export function Problem() {
  const root = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
        gsap.set("[data-fixed]", { yPercent: 0 });
        gsap.set("[data-broken]", { yPercent: -100 });
        return;
      }

      const split = SplitText.create("[data-scrub]", { type: "words" });
      const mm = gsap.matchMedia();

      mm.add({ desktop: "(min-width: 64rem)", mobile: "(max-width: 63.98rem)" }, (context) => {
        const { desktop } = context.conditions as { desktop: boolean };

        const tl = gsap.timeline({
          defaults: { ease: "none" },
          scrollTrigger: desktop
            ? { trigger: root.current, start: "top top", end: "+=160%", pin: true, scrub: 0.6 }
            : { trigger: root.current, start: "top 70%", end: "bottom 70%", scrub: 0.6 },
        });

        tl.from(split.words, { opacity: 0.12, stagger: 0.04, duration: 0.3 });

        gsap.utils.toArray<HTMLElement>("[data-check]").forEach((row) => {
          tl.to(row.querySelector("[data-broken]"), { yPercent: -100, duration: 0.25, ease: "power2.inOut" }, ">-0.05")
            .to(row.querySelector("[data-fixed]"), { yPercent: 0, duration: 0.25, ease: "power2.inOut" }, "<")
            .to(row.querySelector("[data-bar]"), { scaleX: 1, duration: 0.3, ease: "power2.out" }, "<")
            .to(row, { borderColor: "var(--accent)", duration: 0.1 }, "<");
        });

        tl.from("[data-closing]", { opacity: 0, y: 24, duration: 0.3, ease: "power2.out" }, ">");
      });

      return () => {
        split.revert();
        ScrollTrigger.refresh();
      };
    },
    { scope: root },
  );

  return (
    <Section id="problema" theme="light" label="Beyond design">
      <div ref={root} className="flex min-h-dvh items-center overflow-hidden py-24 lg:py-0">
        <div className="bg-grid pointer-events-none absolute inset-0 -z-10 opacity-70 [mask-image:linear-gradient(to_bottom,black,transparent_80%)]" />
        <div className="container-site grid gap-14 lg:grid-cols-12 lg:gap-10">
          <div className="lg:col-span-7">
            <Eyebrow index="02">{problem.eyebrow}</Eyebrow>
            <h2 data-split className="text-display mt-6 text-[clamp(2.2rem,4.6vw,4.25rem)]">
              <Rich text={problem.title} />
            </h2>
            <div data-scrub className="mt-10 max-w-[36rem] space-y-5 text-xl leading-snug tracking-[-0.03em] sm:text-2xl">
              {problem.body.map((p) => (
                <p key={p}>{p}</p>
              ))}
            </div>
          </div>

          <div className="flex flex-col justify-center gap-6 lg:col-span-5">
            <div className="card overflow-hidden p-2">
              <div className="flex items-center justify-between px-4 pb-3 pt-3">
                <span className="eyebrow text-muted">Estado del funnel</span>
                <span className="flex gap-1.5" aria-hidden>
                  <span className="size-2 rounded-full bg-line" />
                  <span className="size-2 rounded-full bg-line" />
                  <span className="size-2 rounded-full bg-line" />
                </span>
              </div>
              <ul className="space-y-2">
                {problem.checks.map((check, i) => (
                  <li
                    key={check.stage}
                    data-check
                    className="relative overflow-hidden rounded-[var(--radius-card)] border border-line bg-bg/60 px-4 py-4"
                  >
                    <div className="flex items-center justify-between gap-4">
                      <div className="flex items-center gap-3">
                        <span className="pixel text-sm text-muted">0{i + 1}</span>
                        <span className="font-medium">{check.stage}</span>
                      </div>
                      <div className="relative h-7 overflow-hidden text-sm">
                        <span data-broken className="flex h-7 items-center gap-2 whitespace-nowrap rounded-full bg-danger/10 px-3 text-danger">
                          <Cross width={13} height={13} strokeWidth={2.2} />
                          {check.broken}
                        </span>
                        <span
                          data-fixed
                          style={{ transform: "translateY(100%)" }}
                          className="absolute inset-0 flex h-7 items-center justify-end gap-2 whitespace-nowrap rounded-full bg-success/15 px-3 text-[#13824f]"
                        >
                          <Check width={13} height={13} strokeWidth={2.2} />
                          {check.fixed}
                        </span>
                      </div>
                    </div>
                    <span data-bar className="absolute inset-x-0 bottom-0 h-0.5 origin-left scale-x-0 bg-accent" />
                  </li>
                ))}
              </ul>
            </div>
            <p data-closing className="text-pretty text-lg leading-snug tracking-[-0.02em] text-muted">
              {problem.closing.split("synx build").map((part, i) => (
                <span key={i}>
                  {i > 0 && <span className="font-semibold text-fg">synx build</span>}
                  {part}
                </span>
              ))}
            </p>
          </div>
        </div>
      </div>
    </Section>
  );
}
