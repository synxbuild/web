"use client";

import { useEffect, useState } from "react";
import type { Theme } from "@/components/ui/section";

export type SectionState = { theme: Theme; label: string; index: number; progress: number };

/*
 * Tells which section sits under a horizontal line at `y` px from the top,
 * so fixed UI (header, side index) can match its theme.
 */
export function useSectionAt(y: number | "center", themeY?: (vh: number) => number) {
  const [state, setState] = useState<SectionState>({ theme: "dark", label: "", index: 0, progress: 0 });

  useEffect(() => {
    let frame = 0;
    const update = () => {
      frame = 0;
      const line = y === "center" ? window.innerHeight / 2 : y;
      const sections = Array.from(document.querySelectorAll<HTMLElement>("section[data-theme]"));
      // Theme can be read at a different line (where the fixed element actually sits).
      const themeLine = themeY ? themeY(window.innerHeight) : line;
      let current = 0;
      let themed = 0;
      sections.forEach((section, i) => {
        const top = section.getBoundingClientRect().top;
        if (top <= line) current = i;
        if (top <= themeLine) themed = i;
      });
      const el = sections[current];
      if (!el) return;
      const max = document.documentElement.scrollHeight - window.innerHeight;
      const next: SectionState = {
        theme: (sections[themed]?.dataset.theme as Theme) ?? "dark",
        label: el.dataset.section ?? "",
        index: current,
        progress: max > 0 ? window.scrollY / max : 0,
      };
      setState((prev) =>
        prev.theme === next.theme && prev.index === next.index && Math.abs(prev.progress - next.progress) < 0.002 ? prev : next,
      );
    };
    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(update);
    };
    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps -- themeY is a static mapper
  }, [y]);

  return state;
}
