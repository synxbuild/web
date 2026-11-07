import { cn } from "@/lib/cn";

export type Theme = "dark" | "light" | "electric";

type SectionProps = {
  id: string;
  theme: Theme;
  /* Label shown in the side index. */
  label: string;
  className?: string;
  children: React.ReactNode;
  first?: boolean;
  /* Track the cursor (--mx / --my) for glow effects inside the section. */
  spotlight?: boolean;
};

export function Section({ id, theme, label, className, children, first, spotlight }: SectionProps) {
  return (
    <section
      id={id}
      data-theme={theme}
      data-section={label}
      data-spotlight={spotlight ? "" : undefined}
      className={cn(!first && "sheet", "relative isolate", className)}
    >
      {children}
    </section>
  );
}
