export const BRAND = {
  name: "Eureka",
  fullName: "Eureka Estudio Creativo",
  logo: "/eureka-logo-official.webp",
  website: "https://eurekaestudiocreativo.com",
  ctaUrl: "#agendar",
  ceo: {
    name: "Daniel Suárez Dávila",
    role: "CEO — Eureka Estudio Creativo",
    photo: "/daniel-suarez.jpg",
  },
} as const

export const COPY = {
  hero: {
    title: "Diseñamos tu próxima página web.",
    morphingTexts: ["agenda citas", "vende sola", "cierra clientes", "envía correos"],
    subtitle:
      "Eureka es la única agencia en Chile que te entrega una web con IA que ya trabaja desde el día 1, sin que tengas que entender cómo funciona la tecnología.",
    cta: "Quiero mi diagnóstico gratuito",
    ctaIntent: '{"intent":"cotizar","source":"hero_cta"}',
  },

  pillaresOverview: {
    badge: "Qué Incluye",
    title: "Todo lo que incluye tu Smart Landing",
    subtitle:
      "Por qué nuestro sistema vende mientras los otros solo informan.",
    pilares: [
      {
        num: "01",
        name: "Tu Página Web",
        description:
          "Landing pages diseñadas para convertir, no para decorar. Tu vendedor digital 24/7.",
      },
      {
        num: "02",
        name: "Tu Asistente IA",
        description:
          "Tu recepcionista digital que no duerme. Califica, filtra y agenda en tiempo real.",
      },
      {
        num: "03",
        name: "Tu Publicidad",
        description:
          "Publicidad con intención de compra. No buscamos clicks, buscamos clientes listos para pagar.",
      },
    ],
  },

  pilar1: {
    badge: "01 — Tu Página Web",
    title: "Smart Landing Pages",
    subtitle:
      "Por qué nuestro sistema vende y atrapa clientes, mientras los sitios tradicionales solo informan.",
    oldWay: {
      title: "Así trabaja una agencia tradicional",
      items: [
        "Template de WordPress personalizado",
        "Formulario genérico de contacto",
        "Diseño bonito pero sin estrategia de conversión",
        "Sin tracking real de comportamiento",
      ],
    },
    eurekaWay: {
      title: "Así lo hace Eureka",
      items: [
        "Landing construida para un solo objetivo: convertir",
        "Copy persuasivo basado en puntos de dolor reales",
        "Micro-interacciones que guían al usuario al CTA",
        "Tracking completo: scroll depth, clicks, heatmaps",
      ],
    },
    deliverables: [
      "Diseño premium orientado a resultados",
      "Propuesta de valor clara y accionable",
      "Automatización conectada a tu base de datos",
      "Agente IA integrado que atiende 24/7",
    ],
    stat: {
      value: "Agente IA",
      label:
        "Reacciona a cada clic. Inicia la conversación antes de que el usuario la pida.",
    },
  },

  pilar2: {
    badge: "02 — Tu Asistente IA",
    title: "Tu Asistente Virtual con IA",
    subtitle:
      "No vendemos chatbots. Vendemos un asistente de IA que maneja tu negocio con precisión y libera a tu equipo para lo que realmente importa: cerrar.",
    filterQuestions: [
      "¿Cuántos clientes nuevos necesitas generar al mes para que esto tenga sentido para ti?",
      "¿Ya tienes un proceso de ventas definido o tu equipo improvisa en cada conversación?",
      "Si te consigo 50 citas el próximo mes, ¿tienes capacidad de atenderlos?",
    ],
    automationFeatures: [
      {
        title: "Calificación 24/7",
        description: "Solo pasan los prospectos listos para pagar.",
      },
      {
        title: "Conocimiento del Negocio",
        description: "Responde precios, convenios y FAQs con precisión total.",
      },
      {
        title: "Derivación Inteligente",
        description: "Escala al humano cuando detecta un cierre o un reclamo.",
      },
      {
        title: "Agenda y CRM",
        description: "Registra leads y agenda citas. Sin intervención humana.",
      },
      {
        title: "Dashboard Analítico",
        description: "Detecta oportunidades y objeciones en cada conversación.",
      },
      {
        title: "Vendedor + Soporte",
        description: "Entrega links, catálogos y WhatsApp en el momento exacto.",
      },
    ],
    caseStudy: {
      client: "Clínica de Diagnóstico",
      quote:
        "El 80% de las solicitudes de radiografías —antes respondidas en 48 hrs por correo— ahora las resuelve la IA al instante.",
      description:
        "El agente recaba los datos del paciente, procesa la solicitud y responde de inmediato. También informa convenios, horarios y comparte el link de WhatsApp o agendamiento.",
    },
  },

  pilar3: {
    badge: "03 — Tu Publicidad",
    title: "Publicidad que Trae Clientes Reales",
    subtitle:
      "No vendemos clicks. Vendemos oportunidades reales de venta. Cada peso invertido tiene un propósito.",
    segments: [
      {
        title: "Meta Ads + Embudo de Ventas",
        description:
          "Campañas diseñadas como sistema: anuncio creativo que filtra + embudo que educa + landing que cierra.",
      },
      {
        title: "Google Search + Smart Landing",
        description:
          "Capturamos urgencia de búsqueda activa. El usuario ya quiere comprar — nuestra landing lo convence.",
      },
      {
        title: "Remarketing omnicanal",
        description:
          "Seguimos a tus visitantes en Google, Instagram y Facebook hasta que conviertan. Sin dejar escapar ninguna intención.",
      },
      {
        title: "Optimización basada en datos reales",
        description:
          "Reportamos Costo por Lead Calificado y ROAS — no likes ni alcance. Decisiones con data, no intuición.",
      },
    ],
    stat: {
      value: "900+",
      label:
        "pacientes calificados al mes. Resultado real combinando Google Ads y Smart Landing con estrategia de intención.",
    },
  },

  comparisonTable: {
    title: "La diferencia entre un Gasto y una Inversión",
    subtitle:
      "La diferencia entre contratar servicios separados y construir un sistema automatizado.",
    rows: [
      {
        feature: "El Activo Principal",
        traditional: "Web folleto que nadie entiende",
        eureka: "Web inteligente de alta conversión",
      },
      {
        feature: "Gestión de Leads",
        traditional: "Formularios fríos y horas de espera",
        eureka: "Asistente IA 24/7 con calificación y respuesta inmediata",
      },
      {
        feature: "Estrategia de Publicidad",
        traditional: "Métricas de vanidad (likes, visitas al perfil)",
        eureka: "Análisis de datos y publicidad con intención de compra real",
      },
    ],
  },

  pricing: {
    badge: "Planes",
    title: "Invierte en un sistema que vende por ti",
    subtitle: "Elige el nivel de automatización que necesita tu negocio.",
    plans: [
      {
        name: "Smart Landing Base",
        subtitle: "Tu web que trabaja sola",
        targetAudience: "Para negocios que quieren una web que convierte",
        price: 249990,
        features: [
          "Landing premium personalizada",
          "Copywriting estratégico incluido",
          "Diseño optimizado para anuncios",
          "Tracking y analytics completo",
          "Formulario conectado a Google Sheets",
          "Notificaciones automáticas al cliente y a ti",
        ],
        excluded: [
          "Agente de IA conversacional",
          "Gestión de tráfico pagado",
          "Dashboard de conversaciones",
        ],
        hook: "Tu web trabaja. Tú cierras.",
        buttonText: "Lo quiero",
        chatIntent: '{"intent":"plan_base","plan":"Smart Landing Base","precio":"$249.990"}',
        isPopular: false,
      },
      {
        name: "Pack Agente IA",
        subtitle: "Landing + IA que vende 24/7",
        targetAudience: "Para negocios que quieren calificar leads sin esfuerzo",
        price: 499990,
        features: [
          "Todo del Smart Landing Base",
          "Agente IA entrenado con tu negocio",
          "Calificación automática de leads",
          "Derivación inteligente al humano",
          "Agenda desde la conversación",
          "CRM integrado",
          "Dashboard con análisis de chats",
        ],
        excluded: [
          "Gestión de tráfico pagado",
          "Remarketing y A/B testing",
        ],
        hook: "Tu equipo solo habla con quien paga.",
        buttonText: "Lo quiero",
        chatIntent: '{"intent":"plan_agente","plan":"Pack Agente IA","precio":"$499.990"}',
        isPopular: true,
      },
      {
        name: "Ecosistema Growth",
        subtitle: "Landing + IA + Tráfico completo",
        targetAudience: "Para negocios listos para escalar con sistema integrado",
        price: 999990,
        features: [
          "Todo del Pack Agente IA",
          "Google Ads + Meta Ads gestionados",
          "Embudos de ventas en Meta",
          "Remarketing omnicanal",
          "A/B testing de landing y ads",
          "Reportes semanales (leads, ROAS, citas)",
        ],
        excluded: [],
        hook: "El sistema trae clientes. Tú los cierras.",
        buttonText: "Lo quiero",
        chatIntent: '{"intent":"plan_growth","plan":"Ecosistema Growth","precio":"$999.990"}',
        isPopular: false,
      },
    ],
  },

  caseStudies: {
    badge: "Casos de Éxito",
    title: "Resultados Auditados: El Sistema en Acción",
    subtitle:
      "No te contamos lo que 'podríamos' hacer. Te mostramos lo que ya hicimos en periodos anuales de gestión.",
    cases: [
      {
        id: "efficiency",
        client: "Clínica Yany",
        location: "Santiago, RM",
        badge: "Eficiencia & Rentabilidad",
        target: "Ideal para clientes que buscan Google Ads",
        challenge:
          "Un paciente que cuesta $10.000 CLP en atraer puede pagarte $500.000 en tratamientos. ¿Vale la pena? Este fue el resultado.",
        solutionTitle: "Smart Landing + Estrategia Ads",
        solution: [
          "Smart Landing Page diseñada para convertir tráfico frío en pacientes.",
          "Google Ads con filtrado estricto de intención de compra real.",
        ],
        resultsTitle: "Los Resultados (Gestión Anual)",
        results: [
          {
            metric: "Pacientes Calificados",
            description: "Promedio mensual sostenido durante toda la gestión.",
            highlight: "900+",
          },
          {
            metric: "Tasa de Agendamiento",
            description: "3x sobre el promedio del mercado (5–10%).",
            highlight: "30%",
          },
          {
            metric: "Cierre Real (Pagaron)",
            description: "De quienes agendaron, 8 de cada 10 pagaron.",
            highlight: "80%",
          },
        ],
        lesson:
          "Consistencia + Landing potente + Ads optimizados = resultados que escalan solos.",
      },
      {
        id: "volume",
        client: "Clínica El Buen Dentista",
        location: "Santiago, RM",
        badge: "Volumen & Escalamiento",
        target: "Ideal para negocios que buscan escalar mediante Meta Ads",
        challenge:
          "Clínica de salud dependiente del orgánico. Necesitaban un sistema predecible para atraer pacientes a WhatsApp.",
        solutionTitle: "Meta Ads directo a WhatsApp",
        solution: [
          "Anuncios en Meta altamente persuasivos apuntando al perfil ideal local.",
          "Gestión eficiente del presupuesto para maximizar el retorno.",
        ],
        results: [
          {
            metric: "Conversaciones Iniciadas",
            description: "Conversaciones WhatsApp generadas el año 2025.",
            highlight: "2.808",
          },
          {
            metric: "Costo por Conversación",
            description: "Costo de adquisición eficiente con presupuesto moderado.",
            highlight: "$791",
          },
          {
            metric: "Inversión Anual (CLP)",
            description: "Resultados masivos con inversión total controlada.",
            highlight: "$2.2M",
          },
        ],
        lesson:
          "A veces lo único que separa tu negocio del éxito es la exposición correcta a través de anuncios.",
      },
    ],
    closingText:
      "¿Quieres replicar estos números en tu negocio?",
    cta: "Lo quiero para mi negocio",
    ctaIntent: '{"intent":"auditoria","source":"case_studies_cta"}',
  },

  faq: {
    badge: "FAQ",
    title: "Resolvemos tus dudas",
    subtitle: "Las preguntas que todos hacen antes de decir sí.",
    items: [
      {
        q: "¿Cuánto cuesta?",
        a: "Los planes van desde $250.000 CLP (Smart Landing Base) hasta $1.000.000 CLP (Ecosistema Growth completo). Cada plan está diseñado para un momento distinto de tu negocio. Si no sabes por cuál empezar, nuestra auditoría gratuita te dice exactamente qué necesitas.",
      },
      {
        q: "¿En cuánto tiempo empiezo a ver resultados?",
        a: "Tu landing está operativa en 2–3 semanas. Los primeros leads calificados pueden llegar desde el día uno de encender el tráfico. Los resultados más sólidos se consolidan entre el mes 2 y 3, cuando el sistema está completamente optimizado.",
      },
      {
        q: "¿En qué se diferencia de contratar una agencia tradicional?",
        a: "Una agencia tradicional te vende partes sueltas: diseño aquí, ads allá, chatbot por otro lado. Nosotros construimos un sistema único donde landing, IA y tráfico trabajan juntos. El resultado es un sistema que se auto-alimenta, no una colección de herramientas desconectadas.",
      },
      {
        q: "¿Necesito conocimientos técnicos para usar esto?",
        a: "Cero. Te entregamos todo listo y funcionando. Tú recibes los leads calificados y las agendas llenas, sin tocar código, paneles de ads ni configuraciones de IA. Nuestro equipo gestiona la tecnología; tú gestionas tu negocio.",
      },
      {
        q: "¿Para qué tipo de negocio es esto?",
        a: "Para cualquier negocio que venda servicios o productos de ticket medio-alto: clínicas, consultorios, inmobiliarias, estudios profesionales, academias, B2B y más. Si tienes un proceso de venta que requiere calificación previa, esto es para ti.",
      },
      {
        q: "¿Puedo contratar solo la landing sin la IA ni el tráfico?",
        a: "Sí. El plan Smart Landing Base funciona como una unidad independiente y de alto rendimiento. Aunque el sistema completo multiplica los resultados, empezar con la landing ya es una inversión real que genera retorno desde el día uno.",
      },
      {
        q: "¿Qué pasa si no veo los resultados esperados?",
        a: "Reportamos semanalmente con métricas reales: costo por lead calificado, citas agendadas y ROAS. Si algo no funciona, lo detectamos y optimizamos antes de que sea un problema. Sin humo, sin excusas.",
      },
      {
        q: "¿Cómo es el proceso para empezar?",
        a: "Es simple: (1) Auditoría gratuita para diagnosticar tu situación actual → (2) Propuesta personalizada sin compromiso → (3) Onboarding en 48 hs → (4) Tu sistema live. Sin contratos eternos ni letra chica.",
      },
    ],
  },

  finalCta: {
    headline: "Tu competencia ya automatizó sus ventas. ¿Y tú?",
    intro: "Mientras lees esto, hay negocios con un sistema que responde, califica y agenda — solo.",
    bullets: [
      "Atención inmediata 24/7 con IA",
      "Solo leads listos para pagar",
      "Citas agendadas sin intervención humana",
    ],
    valueProposition: "Listo en 2–3 semanas.",
    priceTag: "Desde $250.000 CLP · Sin contratos eternos.",
    ctaPrimary: "Empezar ahora",
    trustBadges: [
      "Auditoría gratuita de 15 min",
      "Sin compromiso",
      "Resultados auditados",
    ],
    chatIntent: '{"intent":"consulta_general","source":"footer_cta"}',
    footer: {
      tagline:
        "Diseñamos páginas web inteligentes que atraen, califican y convierten clientes — solas.",
      navLinks: [
        { label: "Tu Página Web", href: "#infraestructura" },
        { label: "Tu Asistente IA", href: "#inteligencia" },
        { label: "Tu Publicidad", href: "#traccion" },
        { label: "Casos de Éxito", href: "#casos-exito" },
        { label: "FAQ", href: "#faq" },
      ],
      services: [
        "Creación de Contenido para RRSS",
        "Email Marketing",
        "Estrategias Comunicacionales",
        "Automatización de Procesos",
      ],
      legal: "Todos los derechos reservados.",
      location: "Providencia, Santiago, Chile",
      address: "Hernando de Aguirre 128, Providencia, RM",
      whatsapp: "+56 9 7286 5954",
      email: "info@eurekaestudiocreativo.com",
      website: "eurekaestudiocreativo.com",
    },
  },

  visualShowcase: {
    badge: "Portafolio",
    title: "Smart Landings que ya venden",
    subtitle: "Diseño con estrategia. Cada pieza construida para convertir, no solo para existir.",
    images: [
      {
        src: "https://eurekaestudiocreativo.com/wp-content/uploads/2026/02/1.1-1.webp",
        alt: "Smart Landing Page — Proyecto Eureka 1",
      },
      {
        src: "https://eurekaestudiocreativo.com/wp-content/uploads/2026/02/2.2.webp",
        alt: "Smart Landing Page — Proyecto Eureka 2",
      },
      {
        src: "https://eurekaestudiocreativo.com/wp-content/uploads/2026/02/3.3.webp",
        alt: "Smart Landing Page — Proyecto Eureka 3",
      },
      {
        src: "/HLM-proyect.webp",
        alt: "Smart Landing Page — Proyecto HLM",
      },
      {
        src: "https://eurekaestudiocreativo.com/wp-content/uploads/2026/02/5.5.webp",
        alt: "Smart Landing Page — Proyecto Eureka 5",
      },
      {
        src: "https://eurekaestudiocreativo.com/wp-content/uploads/2026/02/6.6.webp",
        alt: "Smart Landing Page — Proyecto Eureka 6",
      },
    ],
  },
} as const
