/*
 * All website copy lives here, so it can change without touching components.
 *
 * Inline markup supported by <Rich />:
 *   *text*  → Geist Pixel accent (one per screen)
 *   ~text~  → brand gradient keyword
 */

/* TODO: final call to action is still pending (call, WhatsApp or form). */
export const CONTACT_HREF = "#contacto";
export const PROJECTS_HREF = "#proyectos";

export const nav = {
  links: [
    { label: "Inicio", href: "#inicio" },
    { label: "Expertise", href: "#expertise" },
    { label: "Proyectos", href: "#proyectos" },
    { label: "synx control", href: "#control" },
    { label: "Contacto", href: "#contacto" },
  ],
  cta: { label: "Iniciar un proyecto", href: CONTACT_HREF },
};

export const hero = {
  eyebrow: ["Design", "Development", "Performance"],
  titleLines: ["Tu marketing consigue el clic.", "Nosotros nos ocupamos de *lo que sigue.*"],
  body: "Diseñamos landing pages de alto impacto, conectamos la infraestructura de tus funnels y medimos cada etapa para que puedas captar, vender y mejorar tus lanzamientos con datos reales.",
  primary: { label: "Hablemos de tu lanzamiento", href: CONTACT_HREF },
  secondary: { label: "Explorar proyectos", href: PROJECTS_HREF },
};

export const problem = {
  eyebrow: "Beyond design",
  title: "Una gran oferta no debería perder valor en una landing ~genérica.~",
  body: [
    "Podés invertir en tráfico, tener una estrategia sólida y una excelente oferta. Pero si tu página no transmite ese valor, perdés oportunidades.",
    "Si las integraciones fallan, perdés registros. Y si no medís, no sabés qué mejorar.",
  ],
  closing: "En synx build unimos diseño, desarrollo y conversión para que cada parte de tu funnel funcione como debería.",
  /* Visual labels for the funnel health panel, taken from the body copy. */
  checks: [
    { stage: "Página", broken: "Perdés oportunidades", fixed: "Transmite el valor" },
    { stage: "Integraciones", broken: "Perdés registros", fixed: "Cada registro llega" },
    { stage: "Medición", broken: "No sabés qué mejorar", fixed: "Datos reales" },
  ],
};

export const proof = {
  eyebrow: "Trusted by digital leaders",
  title: "Referentes que confiaron en nuestro trabajo.",
  stat: { value: 50, prefix: "+", label: "lanzamientos digitales" },
  body: "Hemos participado en más de 50 lanzamientos digitales, colaborando con infoproductores, expertos y negocios que buscan llevar sus experiencias digitales a otro nivel.",
  names: ["Daniele Camero", "Manuela Zuluaga", "Pilar Sousa", "Santiago Gómez", "Aida Qui"],
  galleryPlaceholder: "Galería de fotografías o identidades de los referentes",
  testimonialsTitle: "Lo que dicen de trabajar con nosotros.",
  testimonialsPlaceholder: "Testimonios reales de clientes",
};

export const expertise = {
  eyebrow: "Our expertise",
  title: "Diseño, tecnología y conversión. *En un mismo equipo.*",
  services: [
    {
      title: "Landing Pages & Funnels",
      body: "Diseñamos experiencias de registro y venta adaptadas a cada objetivo.",
      details: [
        { label: "Captación", text: "lead magnets, listas de espera, webinars, eventos y agendamiento." },
        { label: "Ventas", text: "páginas evergreen, VSL, aperturas de carrito y ofertas especiales." },
      ],
      node: "Landing",
    },
    {
      title: "Development & Integrations",
      body: "Conectamos tus páginas con CRM, formularios, checkouts, pasarelas de pago y automatizaciones para que cada registro y cada compra sigan el recorrido correcto.",
      details: [],
      node: "Integraciones",
    },
    {
      title: "Tracking & Performance",
      body: "Implementamos medición para conocer visitas, registros y conversiones. También desarrollamos variantes de una misma landing para experimentar con distintos ángulos de comunicación.",
      details: [],
      node: "Medición",
    },
    {
      title: "Launch Support",
      body: "Te acompañamos técnicamente durante tu lanzamiento, supervisando el funcionamiento del funnel y realizando los ajustes contemplados en el servicio.",
      details: [],
      node: "Lanzamiento",
    },
  ],
};

export const work = {
  eyebrow: "Selected work",
  title: "No solo importa cómo se ve. Importa todo lo que *funciona detrás.*",
  body: "Conocé algunos de los proyectos que diseñamos, desarrollamos e implementamos para referentes y negocios digitales.",
  projects: ["Pilar Sousa", "Manuela Zuluaga", "Aida Qui", "Daniele Camero", "Santiago Gómez"],
  cta: { label: "Explorar proyectos", href: PROJECTS_HREF },
};

export const control = {
  eyebrow: "Launch intelligence",
  title: "Cada visita, cada registro, cada conversión. ~Todo en un mismo lugar.~",
  lead: "Conocé synx control, nuestra plataforma para consultar el rendimiento de tus páginas y lanzamientos.",
  body: "Accedé a tus métricas en tiempo real, explorá el historial de tus proyectos y consultá la información de tu funnel sin depender de reportes manuales.",
  listIntro: "Según las integraciones y el servicio contratado, podés:",
  features: [
    "Monitorear visitas, registros y compras.",
    "Comparar diferentes variantes de una landing.",
    "Consultar tasas de conversión.",
    "Acceder a reportes de rendimiento.",
    "Exportar tus datos disponibles.",
  ],
  closing: "Más información para entender qué funciona y dónde mejorar.",
};

export const plans = {
  eyebrow: "Work with us",
  title: "Desde una landing puntual hasta un equipo técnico para tu lanzamiento.",
  items: [
    {
      name: "Landing a medida",
      tagline: "Una página. Un objetivo. Todo funcionando.",
      body: "Diseñamos y desarrollamos una landing personalizada, optimizada para captar o vender, conectada con las herramientas necesarias según el alcance acordado.",
      note: "Incluye acceso a synx control con funcionalidades básicas de seguimiento.",
      cta: { label: "Cotizar mi landing", href: CONTACT_HREF },
      featured: false,
    },
    {
      name: "Landing Performance",
      tagline: "Una landing. Cuatro versiones para probar diferentes enfoques.",
      body: "Desarrollamos tu página principal y tres variaciones para testear distintos ángulos de comunicación, titulares, contenidos y recursos visuales.",
      note: "Sumamos medición individual, synx control con analítica comparativa y acompañamiento técnico durante el lanzamiento.",
      cta: { label: "Quiero trabajar con synx build", href: CONTACT_HREF },
      featured: true,
    },
  ],
  footnote: "¿Necesitás un funnel completo o integraciones más avanzadas? También desarrollamos implementaciones a medida.",
};

export const process = {
  eyebrow: "From idea to launch",
  title: "Un proceso claro. De la idea a la *implementación.*",
  steps: [
    { title: "Briefing y dirección", body: "Entendemos tu oferta, tu audiencia y el objetivo que debe cumplir cada página." },
    { title: "Diseño y desarrollo", body: "Construimos una experiencia personalizada, aplicando criterios visuales, técnicos y de conversión." },
    { title: "Integraciones y lanzamiento", body: "Conectamos las herramientas necesarias, realizamos pruebas y dejamos todo preparado para recibir tráfico." },
    { title: "Medición y acompañamiento", body: "Accedés a synx control y, según el servicio, acompañamos el lanzamiento con seguimiento, ajustes y reportes." },
  ],
};

export const faq = {
  eyebrow: "FAQ",
  title: "Preguntas frecuentes",
  items: [
    {
      q: "¿Qué diferencia a synx build de un diseñador freelance?",
      a: [
        "Nuestra experiencia no se limita al diseño. Participamos en más de 50 lanzamientos, trabajando con desarrollo, integraciones, infraestructura y medición.",
        "Entendemos lo que sucede antes, durante y después de publicar una landing.",
      ],
    },
    {
      q: "¿Qué tipos de páginas desarrollan?",
      a: ["Principalmente páginas de registro y venta: listas de espera, lead magnets, webinars, VSL, evergreen, agendamiento y otras experiencias dentro de funnels digitales."],
    },
    {
      q: "¿Pueden trabajar con nuestras herramientas?",
      a: ["Sí. Integramos plataformas como GoHighLevel, MailerLite, Stripe y otros CRMs, herramientas de pago y automatización, según las necesidades técnicas de tu proyecto."],
    },
    {
      q: "¿Cuánto tiempo demora una landing?",
      a: ["Una landing individual de alcance estándar puede entregarse en hasta 72 horas, una vez aprobados el alcance y los materiales. Los proyectos más complejos tienen plazos definidos según su implementación."],
    },
    {
      q: "¿Podemos medir los resultados?",
      a: ["Sí. Todos nuestros clientes tienen acceso a synx control, con diferentes funcionalidades según el servicio contratado y los eventos configurados."],
    },
    {
      q: "¿Nos acompañan durante el lanzamiento?",
      a: ["Sí. Nuestra modalidad Performance contempla acompañamiento técnico durante una ventana acordada, además de seguimiento y análisis de resultados."],
    },
  ],
};

export const finalCta = {
  eyebrow: "Let's build",
  title: "Vos traés la estrategia. Nosotros construimos lo que la hace ~funcionar.~",
  body: "Diseño, desarrollo, integraciones y medición para tu próximo lanzamiento digital.",
  cta: { label: "Hablemos de tu proyecto", href: CONTACT_HREF },
};

export const footer = {
  tagline: "Design & Technology for Digital Launches.",
  body: "Diseñamos experiencias de alto impacto y construimos la tecnología detrás de grandes lanzamientos digitales.",
  cta: { label: "Iniciar un proyecto", href: CONTACT_HREF },
};
