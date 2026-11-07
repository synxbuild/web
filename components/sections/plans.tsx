import { plans } from "@/content/site";
import { cn } from "@/lib/cn";
import { Section } from "@/components/ui/section";
import { Eyebrow } from "@/components/ui/eyebrow";
import { Button } from "@/components/ui/button";

export function Plans() {
  return (
    <Section id="planes" theme="dark" label="Work with us" className="overflow-hidden pb-32 pt-28 lg:pb-44 lg:pt-36">
      <div className="bg-crosses pointer-events-none absolute inset-0 -z-10 opacity-50 [mask-image:radial-gradient(ellipse_60%_50%_at_70%_50%,black,transparent)]" />

      <div className="container-site">
        <div className="max-w-3xl">
          <Eyebrow index="07">{plans.eyebrow}</Eyebrow>
          <h2 data-split className="text-display mt-6 text-[clamp(2.2rem,4.2vw,4rem)]">
            {plans.title}
          </h2>
        </div>

        <div className="mt-16 grid gap-4 lg:grid-cols-2">
          {plans.items.map((plan, i) => (
            <article
              key={plan.name}
              data-fade
              data-spotlight
              className={cn(
                "card spotlight group flex flex-col overflow-hidden p-7 sm:p-10",
                plan.featured && "border-accent/50 shadow-[0_40px_120px_-40px_rgb(0_0_255/0.6)]",
              )}
            >
              {plan.featured && <div className="pointer-events-none absolute -right-20 -top-20 size-72 rounded-full bg-brand-500/30 blur-[90px]" />}

              <div className="relative flex items-center justify-between">
                <span className="eyebrow text-muted">Modalidad 0{i + 1}</span>
                <Versions count={plan.featured ? 4 : 1} />
              </div>

              <h3 className="text-display relative mt-10 text-[clamp(2rem,3.4vw,3rem)]">{plan.name}</h3>
              <p className="relative mt-3 text-lg tracking-[-0.03em] text-accent">{plan.tagline}</p>
              <p className="relative mt-6 max-w-lg text-pretty leading-relaxed text-muted">{plan.body}</p>

              <div className="relative mt-auto pt-10">
                <p className="border-t border-line pt-6 text-[0.9375rem] leading-relaxed text-fg/85">{plan.note}</p>
                <div className="mt-8">
                  <Button href={plan.cta.href} variant={plan.featured ? "primary" : "ghost"}>
                    {plan.cta.label}
                  </Button>
                </div>
              </div>
            </article>
          ))}
        </div>

        <p data-fade className="mt-10 text-center text-muted">
          {plans.footnote}
        </p>
      </div>
    </Section>
  );
}

/* Small stack of page thumbnails: 1 version vs. 4 (main + 3 variants). */
function Versions({ count }: { count: number }) {
  const labels = ["A", "B", "C", "D"].slice(0, count);
  return (
    <div className="flex items-center" aria-label={`${count} ${count === 1 ? "versión" : "versiones"}`}>
      {labels.map((label, i) => (
        <span
          key={label}
          className={cn(
            "pixel -ml-2 grid h-11 w-9 place-items-center rounded-md border bg-surface text-xs shadow-lg transition-transform duration-500 ease-[var(--ease-expo)] first:ml-0",
            i === 0 ? "border-accent text-accent" : "border-line text-muted",
            "group-hover:translate-x-[calc(var(--i)*6px)]",
          )}
          style={{ zIndex: 10 - i, ["--i" as string]: i }}
        >
          {label}
        </span>
      ))}
    </div>
  );
}
