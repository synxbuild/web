"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { nav } from "@/content/site";
import { cn } from "@/lib/cn";
import { Button } from "@/components/ui/button";
import { useSectionAt } from "./use-section-at";

export function Header() {
  const { theme, label } = useSectionAt(36);
  const [hidden, setHidden] = useState(false);
  const [open, setOpen] = useState(false);

  // Hide while scrolling down, come back on the way up.
  useEffect(() => {
    let last = window.scrollY;
    const onScroll = () => {
      const y = window.scrollY;
      if (Math.abs(y - last) < 6) return;
      setHidden(y > last && y > 160);
      last = y;
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.documentElement.style.overflow = open ? "hidden" : "";
  }, [open]);

  const isLight = theme === "light";

  return (
    <header
      data-theme={open ? "dark" : theme}
      className={cn(
        "fixed inset-x-0 top-0 z-50 bg-transparent! transition-transform duration-700 ease-[var(--ease-expo)]",
        hidden && !open && "-translate-y-[120%]",
      )}
    >
      <div className="container-site flex h-20 items-center justify-between gap-6">
        <a href="#inicio" aria-label="synx build, inicio" className="relative block h-6 w-[118px] shrink-0">
          <Image
            src="/brand/synxbuild-white.png"
            alt="synx build"
            width={446}
            height={91}
            priority
            className={cn("absolute inset-0 h-full w-auto transition-opacity duration-500", isLight && !open ? "opacity-0" : "opacity-100")}
          />
          <Image
            src="/brand/synxbuild-black.png"
            alt=""
            width={446}
            height={91}
            priority
            className={cn("absolute inset-0 h-full w-auto transition-opacity duration-500", isLight && !open ? "opacity-100" : "opacity-0")}
          />
        </a>

        <nav
          aria-label="Principal"
          className="hidden items-center gap-1 rounded-full border border-line bg-surface/70 p-1 backdrop-blur-xl transition-colors duration-500 lg:flex"
        >
          {nav.links.map((link) => {
            const active = link.label.toLowerCase() === label.toLowerCase();
            return (
              <a
                key={link.href}
                href={link.href}
                className={cn(
                  "relative rounded-full px-4 py-2 text-sm transition-colors duration-300",
                  active ? "bg-fg text-bg" : "text-muted hover:text-fg",
                )}
              >
                {link.label}
              </a>
            );
          })}
        </nav>

        <div className="flex items-center gap-3">
          <Button href={nav.cta.href} className="hidden sm:inline-flex">
            {nav.cta.label}
          </Button>
          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            aria-expanded={open}
            aria-controls="mobile-menu"
            aria-label={open ? "Cerrar menú" : "Abrir menú"}
            className="grid size-12 place-items-center rounded-full border border-line bg-surface/70 backdrop-blur-xl lg:hidden"
          >
            <span className="relative block h-3 w-5">
              <span className={cn("absolute left-0 top-0 h-px w-full bg-fg transition-transform duration-500", open && "translate-y-1.5 rotate-45")} />
              <span className={cn("absolute bottom-0 left-0 h-px w-full bg-fg transition-transform duration-500", open && "-translate-y-1.5 -rotate-45")} />
            </span>
          </button>
        </div>
      </div>

      <div
        id="mobile-menu"
        className={cn(
          "fixed inset-0 -z-10 flex flex-col justify-end bg-bg px-5 pb-10 pt-28 transition-[clip-path] duration-700 ease-[var(--ease-quart-in-out)] lg:hidden",
          open ? "[clip-path:inset(0_0_0_0)]" : "pointer-events-none [clip-path:inset(0_0_100%_0)]",
        )}
      >
        <div className="bg-grid pointer-events-none absolute inset-0 opacity-60" />
        <ul className="relative space-y-1">
          {nav.links.map((link, i) => (
            <li key={link.href} className="overflow-hidden border-b border-line">
              <a
                href={link.href}
                onClick={() => setOpen(false)}
                className={cn(
                  "text-display flex items-baseline justify-between py-4 text-4xl transition-transform duration-700 ease-[var(--ease-expo)]",
                  open ? "translate-y-0" : "translate-y-full",
                )}
                style={{ transitionDelay: open ? `${120 + i * 60}ms` : "0ms" }}
              >
                {link.label}
                <span className="pixel text-sm text-accent">0{i + 1}</span>
              </a>
            </li>
          ))}
        </ul>
        <div className="relative mt-8">
          <Button href={nav.cta.href} size="lg" magnetic={false}>
            {nav.cta.label}
          </Button>
        </div>
      </div>
    </header>
  );
}
