"use client";

import Image from "next/image";
import { useMemo, useRef, useState } from "react";
import { gsap, useGSAP } from "@/lib/gsap";
import { cn } from "@/lib/cn";

/*
 * Interactive mockup of synx control. All figures are sample data and the
 * mockup says so: it shows how the panel works, not client results.
 */

type Metric = "visitas" | "registros" | "compras";

const DAYS = ["L", "M", "X", "J", "V", "S", "D", "L", "M", "X", "J", "V", "S", "D"];

const SERIES: Record<Metric, number[]> = {
  visitas: [1200, 1350, 1280, 1620, 1900, 1750, 2100, 2350, 2200, 2680, 3050, 2900, 3400, 3820],
  registros: [210, 240, 228, 300, 365, 330, 410, 470, 445, 540, 610, 590, 700, 790],
  compras: [12, 15, 13, 19, 24, 21, 28, 33, 31, 39, 45, 43, 52, 60],
};

const TABS: { id: Metric; label: string }[] = [
  { id: "visitas", label: "Visitas" },
  { id: "registros", label: "Registros" },
  { id: "compras", label: "Compras" },
];

const VARIANTS = [
  { id: "A", rate: 18.4 },
  { id: "B", rate: 24.1 },
  { id: "C", rate: 15.7 },
  { id: "D", rate: 20.6 },
];

const CW = 560;
const CH = 200;

function toPath(values: number[]) {
  const max = Math.max(...values) * 1.1;
  const step = CW / (values.length - 1);
  const pts = values.map((v, i) => [i * step, CH - (v / max) * CH] as const);
  const line = pts.map(([x, y], i) => `${i ? "L" : "M"}${x.toFixed(1)} ${y.toFixed(1)}`).join(" ");
  return { line, area: `${line} L${CW} ${CH} L0 ${CH} Z`, pts };
}

const fmt = (n: number) => n.toLocaleString("es-AR");

export function ControlDashboard() {
  const root = useRef<HTMLDivElement>(null);
  const [metric, setMetric] = useState<Metric>("visitas");
  const [hover, setHover] = useState<number | null>(null);
  const { line, area, pts } = useMemo(() => toPath(SERIES[metric]), [metric]);

  const totals = {
    visitas: SERIES.visitas.reduce((a, b) => a + b, 0),
    registros: SERIES.registros.reduce((a, b) => a + b, 0),
    compras: SERIES.compras.reduce((a, b) => a + b, 0),
  };
  const conversion = ((totals.registros / totals.visitas) * 100).toFixed(1);

  // Enter animation: the panel assembles once it scrolls in.
  useGSAP(
    () => {
      if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
      const tl = gsap.timeline({ scrollTrigger: { trigger: root.current, start: "top 75%", once: true } });
      tl.from(root.current, { y: 80, rotateX: 14, opacity: 0, duration: 1.4, transformPerspective: 1400 })
        .from("[data-kpi]", { y: 20, opacity: 0, stagger: 0.08, duration: 0.8 }, "-=0.8")
        .from("[data-bar]", { scaleX: 0, stagger: 0.1, duration: 1.2, ease: "power3.out" }, "-=0.6")
        .from("[data-line]", { strokeDashoffset: 1, duration: 1.6, ease: "power3.inOut" }, 0.4);

      root.current?.querySelectorAll<HTMLElement>("[data-kpi-value]").forEach((el) => {
        const target = Number(el.dataset.kpiValue);
        const decimals = el.dataset.decimals ? Number(el.dataset.decimals) : 0;
        const state = { v: 0 };
        tl.to(state, { v: target, duration: 1.6, ease: "power3.out", onUpdate: () => (el.textContent = decimals ? state.v.toFixed(decimals) : fmt(Math.round(state.v))) }, 0.5);
      });
    },
    { scope: root },
  );

  // Redraw the line every time the metric changes (the first draw belongs to the enter animation).
  const mounted = useRef(false);
  useGSAP(
    () => {
      if (!mounted.current) {
        mounted.current = true;
        return;
      }
      gsap.fromTo("[data-line]", { strokeDashoffset: 1 }, { strokeDashoffset: 0, duration: 1.4, ease: "power3.inOut" });
      gsap.fromTo("[data-area]", { opacity: 0 }, { opacity: 1, duration: 1.2, delay: 0.3 });
    },
    { scope: root, dependencies: [metric] },
  );

  const onMove = (e: React.PointerEvent<SVGSVGElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * CW;
    setHover(Math.max(0, Math.min(pts.length - 1, Math.round(x / (CW / (pts.length - 1))))));
  };

  const best = VARIANTS.reduce((a, b) => (b.rate > a.rate ? b : a));

  return (
    <div ref={root} data-theme="dark" className="card overflow-hidden rounded-[28px] p-0 text-left will-change-transform">
      {/* Top bar */}
      <div className="flex items-center gap-4 border-b border-line px-5 py-4">
        <Image src="/brand/icono-vidrio-neon.png" alt="" width={234} height={234} className="size-7" />
        <span className="text-sm font-semibold tracking-[-0.03em]">
          synx <span className="font-light">control</span>
        </span>
        <span className="mx-2 hidden h-4 w-px bg-line sm:block" />
        <span className="hidden text-sm text-muted sm:block">Lanzamiento · Demo</span>
        <span className="eyebrow ml-auto flex items-center gap-2 text-success">
          <span className="relative flex size-1.5">
            <span className="absolute inset-0 rounded-full bg-success [animation:pulse-ring_2s_ease-out_infinite]" />
            <span className="relative size-1.5 rounded-full bg-success" />
          </span>
          En vivo
        </span>
      </div>

      <div className="grid gap-px bg-line lg:grid-cols-[1fr_300px]">
        {/* Main */}
        <div className="bg-surface p-5">
          <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
            {[
              { label: "Visitas", value: totals.visitas },
              { label: "Registros", value: totals.registros },
              { label: "Compras", value: totals.compras },
              { label: "Conversión", value: Number(conversion), suffix: "%", decimals: 1 },
            ].map((kpi) => (
              <div key={kpi.label} data-kpi className="rounded-[var(--radius-card)] border border-line bg-bg/60 p-4">
                <p className="eyebrow text-muted">{kpi.label}</p>
                <p className="mt-3 text-2xl font-semibold tabular-nums tracking-[-0.04em]">
                  <span data-kpi-value={kpi.value} data-decimals={kpi.decimals}>
                    {kpi.decimals ? kpi.value.toFixed(kpi.decimals) : fmt(kpi.value)}
                  </span>
                  {kpi.suffix}
                </p>
              </div>
            ))}
          </div>

          <div className="mt-5 flex flex-wrap items-center justify-between gap-3">
            <div role="tablist" aria-label="Métrica" className="flex rounded-full border border-line bg-bg/60 p-1">
              {TABS.map((tab) => (
                <button
                  key={tab.id}
                  role="tab"
                  aria-selected={metric === tab.id}
                  onClick={() => setMetric(tab.id)}
                  className={cn(
                    "rounded-full px-4 py-1.5 text-sm transition-colors duration-300",
                    metric === tab.id ? "bg-fg text-bg" : "text-muted hover:text-fg",
                  )}
                >
                  {tab.label}
                </button>
              ))}
            </div>
            <span className="eyebrow text-muted">Últimos 14 días</span>
          </div>

          <div className="relative mt-4">
            <svg
              viewBox={`0 0 ${CW} ${CH}`}
              className="h-48 w-full cursor-crosshair overflow-visible sm:h-56"
              preserveAspectRatio="none"
              onPointerMove={onMove}
              onPointerLeave={() => setHover(null)}
              role="img"
              aria-label={`Gráfico de ${metric}, datos de ejemplo`}
            >
              <defs>
                <linearGradient id="area" x1="0" x2="0" y1="0" y2="1">
                  <stop offset="0" stopColor="#0000ff" stopOpacity="0.45" />
                  <stop offset="1" stopColor="#0000ff" stopOpacity="0" />
                </linearGradient>
              </defs>
              {[0.25, 0.5, 0.75].map((f) => (
                <line key={f} x1="0" x2={CW} y1={CH * f} y2={CH * f} stroke="#1c2542" strokeDasharray="3 5" vectorEffect="non-scaling-stroke" />
              ))}
              <path data-area d={area} fill="url(#area)" />
              <path
                data-line
                d={line}
                fill="none"
                stroke="#5073ff"
                strokeWidth="2.5"
                pathLength={1}
                strokeDasharray="1"
                style={{ filter: "drop-shadow(0 0 6px rgb(80 115 255 / 0.8))" }}
              />
              {hover !== null && (
                <line x1={pts[hover][0]} x2={pts[hover][0]} y1="0" y2={CH} stroke="#8fa2ff" strokeOpacity="0.4" vectorEffect="non-scaling-stroke" />
              )}
            </svg>
            {hover !== null && (
              <div
                className="pointer-events-none absolute -translate-x-1/2 -translate-y-full rounded-lg border border-line bg-bg px-3 py-2 text-xs shadow-xl"
                style={{ left: `${(pts[hover][0] / CW) * 100}%`, top: `${(pts[hover][1] / CH) * 100}%`, marginTop: -12 }}
              >
                <span className="text-muted">Día {hover + 1} · </span>
                <span className="font-semibold tabular-nums">{fmt(SERIES[metric][hover])}</span>
              </div>
            )}
            {hover !== null && (
              <span
                className="pointer-events-none absolute size-3 -translate-x-1/2 -translate-y-1/2 rounded-full border-2 border-white bg-accent shadow-[0_0_14px_var(--accent)]"
                style={{ left: `${(pts[hover][0] / CW) * 100}%`, top: `${(pts[hover][1] / CH) * 100}%` }}
              />
            )}
            <div className="mt-2 flex justify-between px-0.5">
              {DAYS.map((d, i) => (
                <span key={i} className={cn("font-mono text-[10px]", hover === i ? "text-fg" : "text-muted/60")}>
                  {d}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* Variants */}
        <div className="bg-surface p-5">
          <p className="eyebrow text-muted">Variantes · Tasa de registro</p>
          <ul className="mt-5 space-y-4">
            {VARIANTS.map((v) => (
              <li key={v.id}>
                <div className="flex items-center justify-between text-sm">
                  <span className="flex items-center gap-2">
                    <span className={cn("pixel grid size-6 place-items-center rounded-md border text-xs", v === best ? "border-accent text-accent" : "border-line text-muted")}>
                      {v.id}
                    </span>
                    Variante {v.id}
                  </span>
                  <span className="tabular-nums text-muted">{v.rate.toFixed(1)}%</span>
                </div>
                <div className="mt-2 h-1.5 overflow-hidden rounded-full bg-bg">
                  <div
                    data-bar
                    className={cn("h-full origin-left rounded-full", v === best ? "bg-accent shadow-[0_0_12px_var(--accent)]" : "bg-line")}
                    style={{ width: `${(v.rate / 30) * 100}%` }}
                  />
                </div>
              </li>
            ))}
          </ul>
          <div className="mt-6 rounded-[var(--radius-card)] border border-accent/40 bg-brand-500/10 p-4">
            <p className="eyebrow text-accent">Mejor variante</p>
            <p className="mt-2 text-sm text-fg">
              Variante {best.id} · <span className="tabular-nums">{best.rate.toFixed(1)}%</span>
            </p>
          </div>
          <p className="eyebrow mt-6 text-muted/60">Datos de ejemplo</p>
        </div>
      </div>
    </div>
  );
}
