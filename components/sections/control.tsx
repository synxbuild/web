import { control } from "@/content/site";
import { Section } from "@/components/ui/section";
import { Eyebrow } from "@/components/ui/eyebrow";
import { Rich } from "@/components/ui/rich";
import { Check } from "@/components/ui/icons";
import { ControlDashboard } from "./control-dashboard";

export function Control() {
  return (
    <Section id="control" theme="light" label="synx control" className="overflow-hidden pb-32 pt-28 lg:pb-44 lg:pt-36">
      <div className="bg-grid pointer-events-none absolute inset-0 -z-10 [mask-image:radial-gradient(ellipse_80%_60%_at_50%_70%,black,transparent)]" />
      <div className="pointer-events-none absolute bottom-0 left-1/2 -z-10 h-[50vh] w-[80vw] -translate-x-1/2 rounded-full bg-brand-400/20 blur-[120px]" />

      <div className="container-site">
        <div className="mx-auto max-w-4xl text-center">
          <Eyebrow index="06" className="justify-center">
            {control.eyebrow}
          </Eyebrow>
          <h2 data-split className="text-display mt-6 text-[clamp(2.2rem,4.6vw,4.5rem)]">
            <Rich text={control.title} />
          </h2>
          <p data-fade className="mx-auto mt-8 max-w-2xl text-pretty text-lg leading-relaxed text-muted">
            <span className="font-medium text-fg">{control.lead}</span> {control.body}
          </p>
        </div>

        <div className="mx-auto mt-16 max-w-6xl [perspective:1400px]">
          <ControlDashboard />
        </div>

        <div className="mx-auto mt-16 grid max-w-6xl gap-10 lg:grid-cols-12">
          <p data-fade className="text-lg font-medium tracking-[-0.03em] lg:col-span-4">
            {control.listIntro}
          </p>
          <ul className="grid gap-x-8 gap-y-4 sm:grid-cols-2 lg:col-span-8">
            {control.features.map((feature) => (
              <li key={feature} data-fade className="flex items-start gap-3 border-t border-line pt-4 text-muted">
                <span className="mt-0.5 grid size-5 shrink-0 place-items-center rounded-full bg-accent text-accent-fg">
                  <Check width={12} height={12} strokeWidth={2.4} />
                </span>
                {feature}
              </li>
            ))}
          </ul>
        </div>

        <p data-split className="text-display mx-auto mt-24 max-w-3xl text-center text-[clamp(1.6rem,2.8vw,2.5rem)]">
          {control.closing}
        </p>
      </div>
    </Section>
  );
}
