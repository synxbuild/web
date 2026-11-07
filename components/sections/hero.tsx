import { hero } from "@/content/site";
import { Section } from "@/components/ui/section";
import { Button } from "@/components/ui/button";
import { Rich } from "@/components/ui/rich";
import { HeroNetwork } from "./hero-network";

export function Hero() {
  return (
    <Section id="inicio" theme="dark" label="Inicio" first spotlight className="overflow-hidden pb-24 pt-32 sm:pt-40 lg:pb-36">
      {/* Atmosphere: grid, brand crosses, cursor glow and a blue halo from the top */}
      <div className="absolute inset-0 -z-10">
        <div className="bg-grid absolute inset-0 [mask-image:radial-gradient(ellipse_70%_60%_at_50%_30%,black,transparent)]" />
        <div className="bg-crosses absolute inset-0 opacity-70 [mask-image:radial-gradient(ellipse_60%_50%_at_50%_30%,black,transparent)]" />
        <div className="absolute inset-0 [background:radial-gradient(260px_circle_at_var(--mx,50%)_var(--my,30%),rgb(80_115_255/0.12),transparent_70%)]" />
        <div className="absolute left-1/2 top-[-30%] h-[70vh] w-[90vw] -translate-x-1/2 rounded-full bg-brand-500/25 blur-[140px]" />
        <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-bg to-transparent" />
      </div>

      <div className="container-site text-center">
        <p className="eyebrow inline-flex items-center gap-3 rounded-full border border-line bg-surface/60 px-4 py-2.5 text-muted backdrop-blur-md [animation:fade-up_1s_var(--ease-expo)_both]">
          <span className="relative flex size-1.5">
            <span className="absolute inset-0 rounded-full bg-accent [animation:pulse-ring_2s_ease-out_infinite]" />
            <span className="relative size-1.5 rounded-full bg-accent" />
          </span>
          {hero.eyebrow.map((item, i) => (
            <span key={item} className="flex items-center gap-3">
              {i > 0 && <span className="text-line">·</span>}
              {item}
            </span>
          ))}
        </p>

        <h1 className="text-display mx-auto mt-8 max-w-[15ch] text-[clamp(2.6rem,7.4vw,6.75rem)] lg:max-w-none">
          {hero.titleLines.map((line, i) => (
            <span key={line} className="line-mask">
              <span style={{ animationDelay: `${0.12 + i * 0.12}s` }}>
                <Rich text={line} />
              </span>
            </span>
          ))}
        </h1>

        <p className="mx-auto mt-8 max-w-[38rem] text-pretty text-base leading-relaxed text-muted [animation:fade-up_1.2s_0.45s_var(--ease-expo)_both] sm:text-lg">
          {hero.body}
        </p>

        <div className="mt-10 flex flex-col items-center justify-center gap-3 [animation:fade-up_1.2s_0.6s_var(--ease-expo)_both] sm:flex-row">
          <Button href={hero.primary.href} size="lg">
            {hero.primary.label}
          </Button>
          <Button href={hero.secondary.href} size="lg" variant="ghost">
            {hero.secondary.label}
          </Button>
        </div>
      </div>

      <div className="container-site mt-16 sm:mt-20" data-parallax="0.12">
        <div className="[animation:fade-up_1.6s_0.8s_var(--ease-expo)_both]">
          <HeroNetwork />
        </div>
      </div>
    </Section>
  );
}
