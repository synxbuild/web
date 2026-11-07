import { cn } from "@/lib/cn";

/* Visible slot for content we still need from the client (photos, testimonials…). */
export function Placeholder({ label, className, children }: { label: string; className?: string; children?: React.ReactNode }) {
  return (
    <div
      className={cn(
        "relative flex items-center justify-center overflow-hidden rounded-[var(--radius-card)] border border-dashed border-line bg-surface/40 p-6 text-center",
        className,
      )}
    >
      {children}
      <span className="eyebrow relative text-muted">[{label}]</span>
    </div>
  );
}
