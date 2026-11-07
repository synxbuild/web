import type { Metadata, Viewport } from "next";
import { GeistSans } from "geist/font/sans";
import { GeistMono } from "geist/font/mono";
import { GeistPixelSquare } from "geist/font/pixel/square";
import { GeistPixelGrid } from "geist/font/pixel/grid";
import "lenis/dist/lenis.css";
import "./globals.css";
import { MotionProvider } from "@/components/motion/motion-provider";

export const metadata: Metadata = {
  metadataBase: new URL("https://synxbuild.com"),
  title: "synx build · Design & Technology for Digital Launches",
  description:
    "Diseñamos landing pages de alto impacto, conectamos la infraestructura de tus funnels y medimos cada etapa de tus lanzamientos.",
  openGraph: {
    title: "synx build",
    description: "Design & Technology for Digital Launches.",
    url: "https://synxbuild.com",
    siteName: "synx build",
    locale: "es_AR",
    type: "website",
  },
};

export const viewport: Viewport = {
  themeColor: "#010511",
};

const fonts = [GeistSans.variable, GeistMono.variable, GeistPixelSquare.variable, GeistPixelGrid.variable].join(" ");

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="es" className={`${fonts} antialiased`} data-theme="dark">
      <body className="min-h-dvh overflow-x-clip">
        <MotionProvider>{children}</MotionProvider>
      </body>
    </html>
  );
}
