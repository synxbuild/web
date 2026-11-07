"use client";

import { useEffect } from "react";
import Lenis from "lenis";
import { gsap, ScrollTrigger, SplitText } from "@/lib/gsap";

/*
 * Single motion engine for the whole site.
 * Sections stay server components and opt in with data attributes:
 *   data-split          → headline reveals line by line on scroll
 *   data-fade           → fades up when it enters (batched)
 *   data-count="50"     → number counts up when it enters
 *   data-parallax="0.2" → drifts while scrolling (positive = up)
 *   data-spotlight      → cursor spotlight (sets --mx / --my)
 */
export function MotionProvider({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    let lenis: Lenis | null = null;
    const raf = (time: number) => lenis?.raf(time * 1000);
    if (!reduce) {
      lenis = new Lenis({ lerp: 0.11, anchors: { offset: -24 } });
      lenis.on("scroll", ScrollTrigger.update);
      gsap.ticker.add(raf);
      gsap.ticker.lagSmoothing(0);
    }

    const onPointerMove = (event: PointerEvent) => {
      const target = (event.target as Element | null)?.closest?.<HTMLElement>("[data-spotlight]");
      if (!target) return;
      const rect = target.getBoundingClientRect();
      target.style.setProperty("--mx", `${event.clientX - rect.left}px`);
      target.style.setProperty("--my", `${event.clientY - rect.top}px`);
    };
    document.addEventListener("pointermove", onPointerMove, { passive: true });

    const splits: SplitText[] = [];
    const ctx = gsap.context(() => {
      if (reduce) return;

      document.querySelectorAll<HTMLElement>("[data-split]").forEach((el) => {
        splits.push(
          SplitText.create(el, {
            type: "lines",
            mask: "lines",
            autoSplit: true,
            onSplit: (self) =>
              gsap.from(self.lines, {
                yPercent: 110,
                duration: 1.2,
                stagger: 0.09,
                scrollTrigger: { trigger: el, start: "top 88%", once: true },
              }),
          }),
        );
      });

      gsap.set("[data-fade]", { autoAlpha: 0, y: 28 });
      ScrollTrigger.batch("[data-fade]", {
        start: "top 90%",
        once: true,
        onEnter: (batch) => gsap.to(batch, { autoAlpha: 1, y: 0, duration: 1.1, stagger: 0.08, overwrite: true }),
      });

      document.querySelectorAll<HTMLElement>("[data-count]").forEach((el) => {
        const target = Number(el.dataset.count ?? 0);
        const state = { value: 0 };
        el.textContent = "0";
        gsap.to(state, {
          value: target,
          duration: 2,
          ease: "power3.out",
          scrollTrigger: { trigger: el, start: "top 90%", once: true },
          onUpdate: () => {
            el.textContent = String(Math.round(state.value));
          },
        });
      });

      document.querySelectorAll<HTMLElement>("[data-parallax]").forEach((el) => {
        const speed = Number(el.dataset.parallax ?? 0.2);
        gsap.to(el, {
          yPercent: -speed * 100,
          ease: "none",
          scrollTrigger: { trigger: el, start: "top bottom", end: "bottom top", scrub: true },
        });
      });
    });

    // Fonts change line breaks: refresh trigger positions once they are in.
    document.fonts?.ready.then(() => ScrollTrigger.refresh());

    return () => {
      document.removeEventListener("pointermove", onPointerMove);
      splits.forEach((split) => split.revert());
      ctx.revert();
      gsap.ticker.remove(raf);
      lenis?.destroy();
    };
  }, []);

  return children;
}
