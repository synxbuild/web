import Image from "next/image";
import { footer, nav } from "@/content/site";
import { Button } from "@/components/ui/button";
import { ArrowUp } from "@/components/ui/icons";

export function Footer() {
  return (
    <footer data-theme="dark" data-section="Footer" className="sheet relative overflow-hidden pb-10 pt-20">
      <div className="container-site">
        <div className="grid gap-12 border-b border-line pb-14 lg:grid-cols-12">
          <div className="lg:col-span-5">
            <Image src="/brand/synxbuild-white.png" alt="synx build" width={446} height={91} className="h-8 w-auto" />
            <p className="mt-6 text-lg font-medium tracking-[-0.03em]">{footer.tagline}</p>
            <p className="mt-3 max-w-sm text-pretty leading-relaxed text-muted">{footer.body}</p>
          </div>
          <nav aria-label="Pie de página" className="lg:col-span-3 lg:col-start-7">
            <p className="eyebrow text-muted">Navegación</p>
            <ul className="mt-5 space-y-3">
              {nav.links.map((link) => (
                <li key={link.href}>
                  <a href={link.href} className="group inline-flex items-center gap-2 text-fg/85 transition-colors hover:text-fg">
                    <span className="h-px w-0 bg-accent transition-all duration-500 group-hover:w-4" />
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>
          <div className="flex flex-col items-start gap-6 lg:col-span-3 lg:items-end">
            <Button href={footer.cta.href}>{footer.cta.label}</Button>
            <a href="#inicio" className="eyebrow group inline-flex items-center gap-2 text-muted transition-colors hover:text-fg">
              Volver arriba
              <span className="grid size-8 place-items-center rounded-full border border-line transition-transform duration-500 group-hover:-translate-y-1">
                <ArrowUp width={14} height={14} />
              </span>
            </a>
          </div>
        </div>

        {/* Oversized wordmark, cropped by the bottom edge */}
        <div aria-hidden className="pointer-events-none mt-10 select-none overflow-hidden">
          <p className="text-display translate-y-[18%] whitespace-nowrap text-center text-[clamp(4rem,19vw,19rem)] leading-[0.8] text-surface-2">
            synx <span className="font-light">build</span>
          </p>
        </div>

        <div className="mt-6 flex flex-col justify-between gap-3 text-sm text-muted sm:flex-row">
          <p>© {new Date().getFullYear()} synx build</p>
          <p className="eyebrow">Design & Technology for Digital Launches</p>
        </div>
      </div>
    </footer>
  );
}
