import { cn } from "@/lib/cn";

/* Mono label with the brand square marker: "■ 04 OUR EXPERTISE". */
export function Eyebrow({ children, index, className }: { children: React.ReactNode; index?: string; className?: string }) {
  return (
    <p className={cn("eyebrow flex items-center gap-3 text-muted", className)} data-fade>
      <span aria-hidden className="size-1.5 bg-accent" />
      {index ? <span className="text-accent">{index}</span> : null}
      <span>{children}</span>
    </p>
  );
}
