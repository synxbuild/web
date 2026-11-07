import { proof } from "@/content/site";
import { Section } from "@/components/ui/section";
import { Eyebrow } from "@/components/ui/eyebrow";
import { Placeholder } from "@/components/ui/placeholder";

const initials = (name: string) =>
  name
    .split(" ")
    .map((w) => w[0])
    .join("");

export function Proof() {
  return (
    <Section id="referentes" theme="dark" label="Referentes" className="overflow-hidden pb-32 pt-28 lg:pb-44 lg:pt-36">
      <div className="pointer-events-none absolute right-[-10%] top-0 -z-10 h-[60vh] w-[60vw] rounded-full bg-brand-500/15 blur-[140px]" />

      <div className="container-site grid gap-12 lg:grid-cols-12 lg:items-end">
        <div className="lg:col-span-7">
          <Eyebrow index="03">{proof.eyebrow}</Eyebrow>
          <h2 data-split className="text-display mt-6 text-[clamp(2.2rem,4.6vw,4.25rem)]">
            {proof.title}
          </h2>
          <p data-fade className="mt-8 max-w-xl text-pretty text-lg leading-relaxed text-muted">
            {proof.body}
          </p>
        </div>
        <div data-fade className="lg:col-span-5 lg:text-right">
          <p className="font-pixel-grid tracking-[-0.04em] text-[clamp(6rem,16vw,13rem)] leading-[0.8] text-fg">
            <span className="text-accent">{proof.stat.prefix}</span>
            <span data-count={proof.stat.value}>{proof.stat.value}</span>
          </p>
          <p className="eyebrow mt-4 text-muted">{proof.stat.label}</p>
        </div>
      </div>

      {/* Names marquee */}
      <div className="group relative mt-20 border-y border-line py-7 [mask-image:linear-gradient(90deg,transparent,black_12%,black_88%,transparent)]">
        <div className="flex w-max animate-marquee group-hover:[animation-play-state:paused]">
          {[0, 1].map((copy) => (
            <ul key={copy} aria-hidden={copy === 1} className="flex shrink-0 items-center">
              {[...proof.names, ...proof.names].map((name, i) => (
                <li key={`${name}-${i}`} className="flex items-center">
                  <span className="pixel px-8 text-[clamp(1.75rem,3.4vw,3rem)] text-fg/90 transition-colors hover:text-accent">{name}</span>
                  <svg width="14" height="14" viewBox="0 0 14 14" className="text-accent" aria-hidden>
                    <path d="M1 1l12 12M13 1 1 13" stroke="currentColor" strokeWidth="1.5" />
                  </svg>
                </li>
              ))}
            </ul>
          ))}
        </div>
      </div>

      {/* Gallery slots: real photos / identities pending */}
      <div className="container-site mt-16">
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-5">
          {proof.names.map((name, i) => (
            <figure
              key={name}
              data-fade
              className="spotlight card group flex aspect-[4/5] flex-col justify-between overflow-hidden p-4"
              data-spotlight
              style={{ transitionDelay: `${i * 40}ms` }}
            >
              <div className="bg-grid absolute inset-0 opacity-60" />
              <span className="eyebrow relative text-muted">0{i + 1}</span>
              <span className="pixel relative self-center text-6xl text-line transition-colors duration-500 group-hover:text-accent">
                {initials(name)}
              </span>
              <figcaption className="relative text-sm font-medium">{name}</figcaption>
            </figure>
          ))}
        </div>
        <p className="eyebrow mt-4 text-muted/70">[{proof.galleryPlaceholder}]</p>
      </div>

      {/* Testimonials */}
      <div className="container-site mt-28 grid gap-10 lg:grid-cols-12">
        <h3 data-split className="text-display text-[clamp(1.9rem,3.4vw,3rem)] lg:col-span-5">
          {proof.testimonialsTitle}
        </h3>
        <div className="grid gap-3 sm:grid-cols-2 lg:col-span-7">
          {[0, 1].map((i) => (
            <Placeholder key={i} label={proof.testimonialsPlaceholder} className="min-h-56">
              <span aria-hidden className="pixel absolute left-5 top-3 text-7xl text-line">
                “
              </span>
            </Placeholder>
          ))}
        </div>
      </div>
    </Section>
  );
}
