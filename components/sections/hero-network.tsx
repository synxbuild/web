import Image from "next/image";
import { Megaphone, Play, Mail, Users, CardIcon, Bolt, Check } from "@/components/ui/icons";

/*
 * The funnel as a circuit: traffic sources → landing (center) → tools.
 * Pure SVG + CSS: light pulses run along the cables with stroke-dashoffset,
 * so it costs nothing on the main thread and scales with the viewBox.
 */

const W = 1200;
const H = 520;
const C = { x: 600, y: 250, r: 104 };

const left = [
  { y: 96, label: "Anuncios", Icon: Megaphone },
  { y: 250, label: "Contenido", Icon: Play },
  { y: 404, label: "Email", Icon: Mail },
];
const right = [
  { y: 96, label: "CRM", Icon: Users },
  { y: 250, label: "Checkout", Icon: CardIcon },
  { y: 404, label: "Automatizaciones", Icon: Bolt },
];

const LX = 150;
const RX = 1050;
const NODE = 68;

const inPath = (y: number) => `M ${LX + NODE / 2} ${y} C ${LX + 220} ${y}, ${C.x - C.r - 160} ${C.y}, ${C.x - C.r} ${C.y}`;
const outPath = (y: number) => `M ${C.x + C.r} ${C.y} C ${C.x + C.r + 160} ${C.y}, ${RX - 220} ${y}, ${RX - NODE / 2} ${y}`;

const events = [
  { label: "Nuevo registro", x: "32%", y: "8%", delay: "0.9s" },
  { label: "Compra aprobada", x: "66%", y: "84%", delay: "3.1s" },
  { label: "Evento medido", x: "70%", y: "6%", delay: "5.3s" },
];

export function HeroNetwork() {
  return (
    <div className="relative mx-auto aspect-[1200/520] w-full max-w-[1200px] select-none" aria-hidden>
      <svg viewBox={`0 0 ${W} ${H}`} className="absolute inset-0 h-full w-full overflow-visible">
        <defs>
          <linearGradient id="cable" x1="0" x2="1">
            <stop offset="0" stopColor="#1c2542" />
            <stop offset="0.5" stopColor="#2a3766" />
            <stop offset="1" stopColor="#1c2542" />
          </linearGradient>
          <radialGradient id="core" cx="50%" cy="40%" r="60%">
            <stop offset="0" stopColor="#0f1530" />
            <stop offset="1" stopColor="#030716" />
          </radialGradient>
          <filter id="glow" x="-50%" y="-50%" width="200%" height="200%">
            <feGaussianBlur stdDeviation="3" result="b" />
            <feMerge>
              <feMergeNode in="b" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>

        {/* Cables */}
        {left.map((n) => (
          <path key={`in-${n.y}`} d={inPath(n.y)} fill="none" stroke="url(#cable)" strokeWidth="1.5" />
        ))}
        {right.map((n) => (
          <path key={`out-${n.y}`} d={outPath(n.y)} fill="none" stroke="url(#cable)" strokeWidth="1.5" />
        ))}

        {/* Signals: inbound first, outbound picks up when the inbound one lands */}
        {left.map((n, i) => (
          <path
            key={`sig-in-${n.y}`}
            d={inPath(n.y)}
            pathLength={100}
            fill="none"
            stroke="#8fa2ff"
            strokeWidth="2"
            strokeLinecap="round"
            filter="url(#glow)"
            className="signal"
            style={{ animationDelay: `${i * 1.07}s` }}
          />
        ))}
        {right.map((n, i) => (
          <path
            key={`sig-out-${n.y}`}
            d={outPath(n.y)}
            pathLength={100}
            fill="none"
            stroke="#8fa2ff"
            strokeWidth="2"
            strokeLinecap="round"
            filter="url(#glow)"
            className="signal"
            style={{ animationDelay: `${1.6 + i * 1.07}s` }}
          />
        ))}

        {/* Ports */}
        {[...left.map((n) => [LX + NODE / 2 + 4, n.y]), ...right.map((n) => [RX - NODE / 2 - 4, n.y])].map(([x, y]) => (
          <rect key={`${x}-${y}`} x={x - 3} y={y - 6} width="6" height="12" rx="1.5" fill="#0f1530" stroke="#2a3766" />
        ))}
        <rect x={C.x - C.r - 5} y={C.y - 8} width="6" height="16" rx="1.5" fill="#0f1530" stroke="#2a3766" />
        <rect x={C.x + C.r - 1} y={C.y - 8} width="6" height="16" rx="1.5" fill="#0f1530" stroke="#2a3766" />

        {/* Core */}
        <circle cx={C.x} cy={C.y} r={C.r + 34} fill="none" stroke="#1c2542" strokeDasharray="2 6" />
        <circle cx={C.x} cy={C.y} r={C.r} fill="url(#core)" stroke="#1c2542" strokeWidth="1.5" />
        <g className="origin-center animate-spin-slow" style={{ transformOrigin: `${C.x}px ${C.y}px`, transformBox: "view-box" }}>
          <circle
            cx={C.x}
            cy={C.y}
            r={C.r + 1}
            fill="none"
            stroke="#5073ff"
            strokeWidth="2"
            strokeLinecap="round"
            strokeDasharray={`${C.r * 1.2} ${C.r * 6}`}
            filter="url(#glow)"
          />
        </g>
      </svg>

      {/* Nodes as HTML so labels stay crisp and readable at any size */}
      {[...left.map((n) => ({ ...n, x: LX })), ...right.map((n) => ({ ...n, x: RX }))].map(({ x, y, label, Icon }) => (
        <div
          key={label}
          className="absolute flex -translate-x-1/2 -translate-y-1/2 flex-col items-center gap-2"
          style={{ left: `${(x / W) * 100}%`, top: `${(y / H) * 100}%` }}
        >
          <div className="grid size-9 place-items-center rounded-[10px] border border-line bg-gradient-to-b from-surface-2 to-surface text-brand-200 shadow-[0_10px_30px_-10px_rgb(0_0_0/0.8),inset_0_1px_0_rgb(255_255_255/0.06)] sm:size-14 sm:rounded-[14px] lg:size-[68px]">
            <Icon className="size-4 sm:size-6" />
          </div>
          <span className="eyebrow hidden text-muted sm:block">{label}</span>
        </div>
      ))}

      {/* Landing core */}
      <div
        className="absolute flex -translate-x-1/2 -translate-y-1/2 flex-col items-center"
        style={{ left: `${(C.x / W) * 100}%`, top: `${(C.y / H) * 100}%` }}
      >
        <div className="relative grid place-items-center">
          <span className="absolute size-16 rounded-full bg-brand-500/40 blur-2xl sm:size-28" />
          <Image src="/brand/icono-vidrio-neon.png" alt="" width={234} height={234} priority className="relative size-12 sm:size-20 lg:size-24" />
        </div>
      </div>
      <span
        className="eyebrow absolute hidden -translate-x-1/2 text-brand-200 sm:block"
        style={{ left: "50%", top: `${((C.y + C.r + 52) / H) * 100}%` }}
      >
        Landing
      </span>

      {/* Live events */}
      {events.map((e) => (
        <div
          key={e.label}
          className="absolute flex items-center gap-2 rounded-full border border-line bg-surface/90 py-1.5 pl-1.5 pr-3 text-[11px] text-fg opacity-0 shadow-[0_12px_30px_-12px_rgb(0_0_0/0.9)] backdrop-blur-md sm:text-xs"
          style={{ left: e.x, top: e.y, animation: `pop 6.6s ${e.delay} var(--ease-expo) infinite` }}
        >
          <span className="grid size-4 place-items-center rounded-full bg-success/15 text-success sm:size-5">
            <Check width={11} height={11} strokeWidth={2.4} />
          </span>
          {e.label}
        </div>
      ))}
    </div>
  );
}
