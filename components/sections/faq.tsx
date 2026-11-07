"use client";

import { useState } from "react";
import { faq, finalCta } from "@/content/site";
import { cn } from "@/lib/cn";
import { Section } from "@/components/ui/section";
import { Eyebrow } from "@/components/ui/eyebrow";
import { Plus } from "@/components/ui/icons";
import { Button } from "@/components/ui/button";

export function Faq() {
  const [open, setOpen] = useState<number | null>(0);

  return (
    <Section id="faq" theme="dark" label="FAQ" className="pb-32 pt-28 lg:pb-44 lg:pt-36">
      <div className="container-site grid gap-14 lg:grid-cols-12">
        <div className="lg:col-span-4">
          <div className="lg:sticky lg:top-28">
            <Eyebrow index="09">{faq.eyebrow}</Eyebrow>
            <h2 data-split className="text-display mt-6 text-[clamp(2.2rem,4.2vw,4rem)]">
              {faq.title}
            </h2>
            <div data-fade className="mt-10 hidden lg:block">
              <Button href={finalCta.cta.href} variant="ghost">
                {finalCta.cta.label}
              </Button>
            </div>
          </div>
        </div>

        <ul className="lg:col-span-8">
          {faq.items.map((item, i) => {
            const isOpen = open === i;
            return (
              <li key={item.q} data-fade className="border-t border-line last:border-b">
                <h3>
                  <button
                    type="button"
                    id={`faq-q-${i}`}
                    aria-expanded={isOpen}
                    aria-controls={`faq-a-${i}`}
                    onClick={() => setOpen(isOpen ? null : i)}
                    className="group flex w-full items-center justify-between gap-6 py-7 text-left"
                  >
                    <span className="flex items-baseline gap-5">
                      <span className="pixel text-sm text-accent">0{i + 1}</span>
                      <span className={cn("text-xl font-medium tracking-[-0.03em] transition-colors sm:text-2xl", isOpen ? "text-fg" : "text-fg/80 group-hover:text-fg")}>
                        {item.q}
                      </span>
                    </span>
                    <span
                      className={cn(
                        "grid size-10 shrink-0 place-items-center rounded-full border transition-all duration-500 ease-[var(--ease-expo)]",
                        isOpen ? "rotate-45 border-accent bg-accent text-accent-fg" : "border-line text-muted group-hover:border-accent/60",
                      )}
                    >
                      <Plus width={16} height={16} />
                    </span>
                  </button>
                </h3>
                <div
                  id={`faq-a-${i}`}
                  role="region"
                  aria-labelledby={`faq-q-${i}`}
                  className={cn("grid transition-[grid-template-rows] duration-700 ease-[var(--ease-expo)]", isOpen ? "grid-rows-[1fr]" : "grid-rows-[0fr]")}
                >
                  <div className="overflow-hidden">
                    <div className="space-y-3 pb-8 pl-0 text-pretty text-lg leading-relaxed text-muted sm:pl-10">
                      {item.a.map((p) => (
                        <p key={p}>{p}</p>
                      ))}
                    </div>
                  </div>
                </div>
              </li>
            );
          })}
        </ul>
      </div>
    </Section>
  );
}
