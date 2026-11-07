import Image from "next/image";

/* Portada provisoria: solo la marca, hasta cargar el copy de la web. */
export default function Home() {
  return (
    <main className="flex flex-1 items-center justify-center bg-ink-950 px-6">
      <Image src="/brand/synxbuild-white.png" alt="synx build" width={446} height={91} priority className="h-auto w-48" />
    </main>
  );
}
