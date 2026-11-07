import Image from "next/image";
import { finalCta } from "@/content/site";
import { Section } from "@/components/ui/section";
import { Eyebrow } from "@/components/ui/eyebrow";
import { Rich } from "@/components/ui/rich";
import { Button } from "@/components/ui/button";

export function FinalCta() {
  return (
    <Section id="contacto" theme="electric" label="Contacto" spotlight className="overflow-hidden pb-40 pt-32 lg:pb-52 lg:pt-44">
      {/* Electric atmosphere: light rising from the floor, grid, cursor glow */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_90%_70%_at_50%_120%,#0000ff_0%,#0000b5_35%,transparent_70%)]" />
        <div className="bg-grid absolute inset-0 [mask-image:linear-gradient(to_top,black,transparent_85%)]" />
        <div className="bg-crosses absolute inset-0 opacity-60 [mask-image:linear-gradient(to_top,black,transparent_70%)]" />
        <div className="absolute inset-0 [background:radial-gradient(320px_circle_at_var(--mx,50%)_var(--my,50%),rgb(188_198_255/0.14),transparent_70%)]" />
        <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-brand-300/60 to-transparent" />
      </div>

      <div className="container-site flex flex-col items-center text-center">
        <div data-fade className="relative mb-12">
          <span className="absolute inset-0 rounded-full bg-brand-500 blur-3xl" />
          <Image src="/brand/icono-vidrio-neon.png" alt="" width={234} height={234} className="relative size-24 sm:size-28" />
        </div>
        <Eyebrow className="justify-center">{finalCta.eyebrow}</Eyebrow>
        <h2 data-split className="text-display mt-8 max-w-5xl text-[clamp(2.5rem,6.4vw,6rem)]">
          <Rich text={finalCta.title} />
        </h2>
        <p data-fade className="mt-8 max-w-xl text-pretty text-lg leading-relaxed text-muted">
          {finalCta.body}
        </p>
        <div data-fade className="mt-12">
          <Button href={finalCta.cta.href} size="lg" className="bg-white! text-brand-950! shadow-[0_24px_80px_-20px_rgb(143_162_255/0.9)]!">
            {finalCta.cta.label}
          </Button>
        </div>
      </div>
    </Section>
  );
}
