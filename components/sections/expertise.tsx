"use client";

import { useRef, useState } from "react";
import { expertise } from "@/content/site";
import { ScrollTrigger, useGSAP } from "@/lib/gsap";
import { cn } from "@/lib/cn";
import { Section } from "@/components/ui/section";
import { Eyebrow } from "@/components/ui/eyebrow";
import { Rich } from "@/components/ui/rich";
import { Check } from "@/components/ui/icons";

/*
 * Editorial numbered list + sticky funnel panel. The service being read
 * drives the panel: its node lights up and its preview takes the stage.
 */
export function Expertise() {
  const root = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(0);

  useGSAP(
    () => {
      watchRows(root.current, setActive);
    },
    { scope: root },
  );

  return (
    <Section id="expertise" theme="light" label="Expertise" className="pb-32 pt-28 lg:pb-44 lg:pt-36">
      <div ref={root} className="container-site grid gap-16 lg:grid-cols-12 lg:gap-10">
        <div className="lg:col-span-5">
          <div className="lg:sticky lg:top-28">
            <Eyebrow index="04">{expertise.eyebrow}</Eyebrow>
            <h2 data-split className="text-display mt-6 text-[clamp(2.2rem,4.2vw,4rem)]">
              <Rich text={expertise.title} />
            </h2>
            <FunnelPanel active={active} />
          </div>
        </div>

        <ol className="lg:col-span-7">
          {expertise.services.map((service, i) => (
            <li
              key={service.title}
              data-row
              className={cn(
                "group border-t border-line py-10 transition-opacity duration-500 last:border-b lg:flex lg:min-h-[62vh] lg:flex-col lg:justify-center lg:py-16",
                active === i ? "lg:opacity-100" : "lg:opacity-35",
              )}
            >
              <div className="flex items-baseline gap-6">
                <span className="pixel text-xl text-accent">0{i + 1}</span>
                <h3 className="text-display text-[clamp(1.9rem,3.6vw,3.4rem)] transition-transform duration-700 ease-[var(--ease-expo)] group-hover:translate-x-2">
                  {service.title}
                </h3>
              </div>
              <div className="mt-6 pl-0 sm:pl-12">
                <p className="max-w-xl text-pretty text-lg leading-relaxed text-muted">{service.body}</p>
                {service.details.length > 0 && (
                  <dl className="mt-6 grid gap-3 sm:grid-cols-2">
                    {service.details.map((d) => (
                      <div key={d.label} className="rounded-[var(--radius-card)] border border-line bg-surface p-5">
                        <dt className="eyebrow text-accent">{d.label}</dt>
                        <dd className="mt-3 text-[0.9375rem] leading-relaxed text-muted">{d.text}</dd>
                      </div>
                    ))}
                  </dl>
                )}
              </div>
            </li>
          ))}
        </ol>
      </div>
    </Section>
  );
}

function watchRows(scope: HTMLElement | null, setActive: (i: number) => void) {
  if (!scope) return;
  scope.querySelectorAll<HTMLElement>("[data-row]").forEach((row, i) => {
    ScrollTrigger.create({
      trigger: row,
      start: "top 55%",
      end: "bottom 55%",
      onToggle: (self) => self.isActive && setActive(i),
    });
  });
}

/* ---------- Sticky panel ---------- */

function FunnelPanel({ active }: { active: number }) {
  const nodes = expertise.services.map((s) => s.node);
  return (
    <div data-theme="dark" className="card mt-12 hidden overflow-hidden p-6 lg:block">
      <div className="bg-grid absolute inset-0 opacity-70" />
      <div className="relative flex items-center justify-between">
        <span className="eyebrow text-muted">Funnel</span>
        <span className="eyebrow flex items-center gap-2 text-success">
          <span className="size-1.5 rounded-full bg-success" /> Online
        </span>
      </div>

      {/* Node rail */}
      <div className="relative mt-8 flex items-center justify-between">
        <div className="absolute inset-x-5 top-5 h-px bg-line" />
        <div
          className="absolute left-5 top-5 h-px bg-accent shadow-[0_0_12px_var(--accent)] transition-[width] duration-700 ease-[var(--ease-expo)]"
          style={{ width: `calc((100% - 2.5rem) * ${active / (nodes.length - 1)})` }}
        />
        {nodes.map((node, i) => (
          <div key={node} className="relative flex flex-col items-center gap-3">
            <span
              className={cn(
                "grid size-10 place-items-center rounded-full border text-xs transition-all duration-500",
                i <= active ? "border-accent bg-brand-500 text-white shadow-[0_0_24px_rgb(0_0_255/0.7)]" : "border-line bg-surface text-muted",
              )}
            >
              <span className="pixel">0{i + 1}</span>
            </span>
            <span className={cn("eyebrow transition-colors duration-500", i === active ? "text-fg" : "text-muted")}>{node}</span>
          </div>
        ))}
      </div>

      {/* Previews */}
      <div className="relative mt-8 h-52">
        {[LandingPreview, IntegrationsPreview, TrackingPreview, LaunchPreview].map((Preview, i) => (
          <div
            key={i}
            className={cn(
              "absolute inset-0 transition-all duration-700 ease-[var(--ease-expo)]",
              active === i ? "translate-y-0 opacity-100" : "pointer-events-none translate-y-4 opacity-0",
            )}
          >
            <Preview />
          </div>
        ))}
      </div>
    </div>
  );
}

function LandingPreview() {
  return (
    <div className="h-full rounded-[var(--radius-card)] border border-line bg-surface p-4">
      <div className="flex gap-1.5">
        <span className="size-2 rounded-full bg-line" />
        <span className="size-2 rounded-full bg-line" />
        <span className="size-2 rounded-full bg-line" />
      </div>
      <div className="mt-5 space-y-2.5">
        <div className="h-3 w-3/4 rounded bg-fg/80" />
        <div className="h-3 w-1/2 rounded bg-fg/80" />
        <div className="h-2 w-2/3 rounded bg-muted/40" />
        <div className="mt-4 h-7 w-28 rounded-full bg-accent" />
      </div>
      <div className="mt-5 grid grid-cols-3 gap-2">
        <div className="h-10 rounded-md bg-surface-2" />
        <div className="h-10 rounded-md bg-surface-2" />
        <div className="h-10 rounded-md bg-surface-2" />
      </div>
    </div>
  );
}

function IntegrationsPreview() {
  const tools = ["Formulario", "CRM", "Checkout", "Automatización"];
  return (
    <div className="relative grid h-full grid-cols-2 gap-3">
      {tools.map((tool, i) => (
        <div key={tool} className="flex items-center gap-3 rounded-[var(--radius-card)] border border-line bg-surface px-4">
          <span className="grid size-6 place-items-center rounded-full bg-success/15 text-success">
            <Check width={12} height={12} strokeWidth={2.4} />
          </span>
          <span className="text-sm">{tool}</span>
          <span className="ml-auto size-1.5 rounded-full bg-accent" style={{ animation: `pulse-ring 2s ${i * 0.3}s ease-out infinite` }} />
        </div>
      ))}
    </div>
  );
}

function TrackingPreview() {
  return (
    <div className="relative h-full rounded-[var(--radius-card)] border border-line bg-surface p-4">
      <div className="flex gap-2">
        {["A", "B", "C", "D"].map((v, i) => (
          <span key={v} className={cn("eyebrow rounded-full border px-2.5 py-1.5", i === 1 ? "border-accent text-accent" : "border-line text-muted")}>
            Variante {v}
          </span>
        ))}
      </div>
      <svg viewBox="0 0 300 110" className="mt-3 h-[calc(100%-2.5rem)] w-full" preserveAspectRatio="none" aria-hidden>
        <path d="M0 95 L40 80 L80 86 L120 60 L160 66 L200 40 L240 46 L300 14" fill="none" stroke="#5073ff" strokeWidth="2" vectorEffect="non-scaling-stroke" />
        <path d="M0 100 L40 92 L80 94 L120 82 L160 86 L200 74 L240 78 L300 64" fill="none" stroke="#2a3766" strokeWidth="2" vectorEffect="non-scaling-stroke" />
      </svg>
    </div>
  );
}

function LaunchPreview() {
  return (
    <div className="flex h-full flex-col justify-between rounded-[var(--radius-card)] border border-line bg-surface p-4">
      <div className="flex items-center justify-between">
        <span className="text-sm">Monitoreo del funnel</span>
        <span className="eyebrow flex items-center gap-2 text-success">
          <span className="relative flex size-1.5">
            <span className="absolute inset-0 rounded-full bg-success [animation:pulse-ring_2s_ease-out_infinite]" />
            <span className="relative size-1.5 rounded-full bg-success" />
          </span>
          En vivo
        </span>
      </div>
      <div className="flex h-20 items-end gap-1">
        {Array.from({ length: 36 }, (_, i) => (
          <span key={i} className="flex-1 rounded-sm bg-success/70" style={{ height: `${55 + ((i * 37) % 45)}%` }} />
        ))}
      </div>
    </div>
  );
}
