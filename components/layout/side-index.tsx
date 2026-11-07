"use client";

import { cn } from "@/lib/cn";
import { useSectionAt } from "./use-section-at";

/*
 * Fixed index on the left edge (desktop): current section number,
 * its label and a progress rail for the whole page.
 */
export function SideIndex({ total }: { total: number }) {
  const { theme, label, index, progress } = useSectionAt("center", (vh) => vh - 80);

  return (
    <aside
      aria-hidden
      data-theme={theme}
      className="pointer-events-none fixed bottom-8 left-6 z-40 hidden bg-transparent! mix-blend-normal xl:block"
    >
      <div className="flex items-end gap-4">
        <div className="relative h-40 w-px overflow-hidden bg-line">
          <div className="absolute inset-x-0 top-0 bg-accent transition-[height] duration-300" style={{ height: `${progress * 100}%` }} />
        </div>
        <div className="flex flex-col gap-2">
          <span className="pixel text-2xl leading-none text-fg tabular-nums">
            {String(index + 1).padStart(2, "0")}
            <span className="text-muted">/{String(total).padStart(2, "0")}</span>
          </span>
          <span className={cn("eyebrow text-muted transition-opacity duration-300", !label && "opacity-0")}>{label}</span>
        </div>
      </div>
    </aside>
  );
}
