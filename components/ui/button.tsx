"use client";

import { useRef } from "react";
import { gsap, useGSAP } from "@/lib/gsap";
import { cn } from "@/lib/cn";
import { ArrowRight } from "./icons";

type ButtonProps = {
  href: string;
  children: React.ReactNode;
  variant?: "primary" | "ghost";
  size?: "md" | "lg";
  className?: string;
  magnetic?: boolean;
};

/*
 * Pill button. The label rolls to a second copy on hover, the arrow turns,
 * and with `magnetic` the button follows the cursor a few pixels (fine pointers only).
 */
export function Button({ href, children, variant = "primary", size = "md", className, magnetic = true }: ButtonProps) {
  const ref = useRef<HTMLAnchorElement>(null);

  useGSAP(
    () => {
      const el = ref.current;
      if (!el || !magnetic || !window.matchMedia("(pointer: fine)").matches) return;
      const x = gsap.quickTo(el, "x", { duration: 0.6, ease: "power3.out" });
      const y = gsap.quickTo(el, "y", { duration: 0.6, ease: "power3.out" });
      const move = (e: PointerEvent) => {
        const r = el.getBoundingClientRect();
        x((e.clientX - (r.left + r.width / 2)) * 0.22);
        y((e.clientY - (r.top + r.height / 2)) * 0.32);
      };
      const leave = () => {
        x(0);
        y(0);
      };
      el.addEventListener("pointermove", move);
      el.addEventListener("pointerleave", leave);
      return () => {
        el.removeEventListener("pointermove", move);
        el.removeEventListener("pointerleave", leave);
      };
    },
    { dependencies: [magnetic] },
  );

  return (
    <a
      ref={ref}
      href={href}
      className={cn(
        "group relative inline-flex shrink-0 items-center gap-3 rounded-full font-medium tracking-[-0.01em] transition-[background-color,border-color,color,box-shadow] duration-500 ease-[var(--ease-expo)]",
        size === "lg" ? "h-14 pl-7 pr-2 text-base" : "h-12 pl-6 pr-1.5 text-[0.9375rem]",
        variant === "primary"
          ? "bg-accent text-accent-fg shadow-[0_18px_40px_-18px_var(--accent)] hover:shadow-[0_22px_60px_-12px_var(--accent)]"
          : "border border-line bg-surface/60 text-fg backdrop-blur-md hover:border-accent/60",
        className,
      )}
    >
      <span className="relative block overflow-hidden">
        <span className="block transition-transform duration-500 ease-[var(--ease-expo)] group-hover:-translate-y-full">{children}</span>
        <span
          aria-hidden
          className="absolute inset-0 block translate-y-full transition-transform duration-500 ease-[var(--ease-expo)] group-hover:translate-y-0"
        >
          {children}
        </span>
      </span>
      <span
        className={cn(
          "grid place-items-center rounded-full transition-transform duration-500 ease-[var(--ease-expo)] group-hover:-rotate-45",
          size === "lg" ? "size-10" : "size-9",
          variant === "primary" ? "bg-black/10" : "bg-accent text-accent-fg",
        )}
      >
        <ArrowRight width={16} height={16} />
      </span>
    </a>
  );
}
