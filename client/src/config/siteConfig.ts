export type ConfiguredLink = {
  label?: string;
  href?: string | null;
};

export type SiteAssetTarget = "development" | "published";
export type SiteAssetName = "wordmark" | "hero" | "about";

// Os arquivos publicados acompanham o repositório; BASE_URL também suporta o subpath do GitHub Pages.
export const siteAssetPaths = {
  wordmark: {
    development: "/images/cg-wordmark.png",
    published: "images/cg-wordmark.png",
  },
  hero: {
    development: "/images/cg-hero.webp",
    published: "images/cg-hero.webp",
  },
  about: {
    development: "/images/cg-about-source.png",
    published: "images/cg-about-source.png",
  },
} as const;

export function resolveSiteAsset(name: SiteAssetName, target: SiteAssetTarget): string {
  const assetPath = siteAssetPaths[name][target];
  return target === "published"
    ? `${import.meta.env.BASE_URL}${assetPath.replace(/^\/+/, "")}`
    : assetPath;
}

// Mantém somente destinos HTTP/HTTPS. Isso também oculta links vazios ou com esquemas inseguros.
export function getVisibleLinks<T extends ConfiguredLink>(links: readonly T[]): T[] {
  return links.filter((link) => {
    const href = link.href?.trim();
    if (!href) return false;

    try {
      const url = new URL(href);
      return url.protocol === "https:" || url.protocol === "http:";
    } catch {
      return false;
    }
  });
}

const assetTarget: SiteAssetTarget =
  import.meta.env.MODE === "production" ? "published" : "development";

// Arquivo central para personalização. Campos vazios/null ficam ocultos na interface.
export const siteConfig = {
  person: {
    name: "Carlos Gabriel",
    displayName: "CG",
    brandName: "CG Oficial",
    professionalTitle:
      "Criador de Conteúdo | Desenvolvedor | Entusiasta de Tecnologia e Inteligência Artificial",
    tagline: "Transformando ideias em projetos, tecnologia e experiências digitais.",
    shortDescription:
      "Sou CG, criador de conteúdo e entusiasta de tecnologia, inteligência artificial, desenvolvimento de projetos digitais e entretenimento. Este é meu espaço oficial para apresentar meu trabalho, meus projetos, minhas redes sociais e minhas próximas ideias.",
  },
  brand: {
    name: "CG Oficial",
    displayName: "CANAL DO CG",
    monogram: "CG.",
    wordmarkSrc: resolveSiteAsset("wordmark", assetTarget),
    signatureColor: "#35D7B5",
  },
  hero: {
    eyebrow: "CRIADOR DIGITAL • TECNOLOGIA • PROJETOS",
    greeting: "Olá, eu sou o CG.",
    headline: "Criatividade, tecnologia e novas possibilidades.",
    description:
      "Compartilho ideias, crio projetos digitais, exploro novas tecnologias e transformo curiosidade em experiências. Conheça meu trabalho, acompanhe meus conteúdos e descubra o que estou construindo.",
    imageSrc: resolveSiteAsset("hero", assetTarget),
    imageAlt:
      "Retrato de CG em um ambiente de criação e tecnologia, usando boné azul e camiseta preta.",
    quickSocialIds: ["kick", "instagram", "youtube", "twitch"],
  },
  about: {
    title: "Um pouco sobre mim.",
    paragraphs: [
      "Sou Carlos Gabriel, conhecido como CG. Tenho interesse por criação de conteúdo, tecnologia, inteligência artificial, desenvolvimento de projetos e novas oportunidades no universo digital.",
      "Gosto de explorar ideias, experimentar ferramentas, aprender na prática e desenvolver projetos que possam se transformar em soluções úteis. Neste espaço, compartilho um pouco da minha trajetória, dos meus interesses e do que estou construindo.",
    ],
    imageSrc: resolveSiteAsset("about", assetTarget),
    imageAlt: "CG em uma foto pessoal diante do espelho.",
    interests: [
      "Criação de conteúdo",
      "Tecnologia",
      "Inteligência artificial",
      "Desenvolvimento de projetos",
      "Games e entretenimento",
    ],
    location: null as string | null,
    experience: [] as string[],
    education: [] as string[],
    competencies: [] as string[],
    languages: [] as string[],
    resumeUrl: null as string | null,
  },
  specialties: [
    {
      id: "conteudo",
      title: "Criação de conteúdo",
      description:
        "Apresentação dos meus canais, transmissões, vídeos e projetos de conteúdo digital.",
      icon: "video",
    },
    {
      id: "tecnologia-ia",
      title: "Tecnologia e inteligência artificial",
      description:
        "Exploração de ferramentas de IA, automações, assistentes digitais e novas tecnologias.",
      icon: "technology",
    },
    {
      id: "desenvolvimento",
      title: "Desenvolvimento de projetos",
      description: "Apresentação de aplicações, sites, experimentos e produtos digitais.",
      icon: "development",
    },
    {
      id: "games",
      title: "Games e entretenimento",
      description:
        "Conteúdos relacionados a jogos, transmissões ao vivo e comunidades digitais.",
      icon: "games",
    },
    {
      id: "independentes",
      title: "Projetos independentes",
      description:
        "Espaço para iniciativas pessoais, ideias em desenvolvimento e experimentos.",
      icon: "ideas",
    },
    {
      id: "empreendedorismo",
      title: "Empreendedorismo digital",
      description: "Projetos, produtos e iniciativas voltadas ao universo digital.",
      icon: "digital",
    },
  ],
  specialtyLinks: {
    conteudo: [] as ConfiguredLink[],
    "tecnologia-ia": [] as ConfiguredLink[],
    desenvolvimento: [] as ConfiguredLink[],
    games: [] as ConfiguredLink[],
    independentes: [] as ConfiguredLink[],
    empreendedorismo: [] as ConfiguredLink[],
  } as Record<string, ConfiguredLink[]>,
  projects: {
    pageUrl: null as string | null,
    items: [
      {
        id: "almeida-solominer",
        name: "Almeida SoloMiner",
        category: "Tecnologia e desenvolvimento",
        description:
          "Projeto de exploração de ferramentas e interfaces relacionadas à mineração de criptomoedas.",
        status: "Em desenvolvimento",
        imageSrc: null as string | null,
        technologies: [] as string[],
        links: [
          { label: "Site do projeto", href: null },
          { label: "GitHub", href: null },
          { label: "Demonstração", href: null },
        ],
      },
      {
        id: "cg-tienda-online",
        name: "CG Tienda Online",
        category: "Comércio digital",
        description: "Projeto de iniciativa comercial voltada ao universo digital.",
        status: "Planejamento",
        imageSrc: null as string | null,
        technologies: [] as string[],
        links: [
          { label: "Site do projeto", href: null },
          { label: "GitHub", href: null },
          { label: "Demonstração", href: null },
        ],
      },
      {
        id: "cg-oficial",
        name: "CG Oficial",
        category: "Criação de conteúdo",
        description:
          "Minha identidade digital para transmissões, conteúdos e presença nas redes sociais.",
        status: "Ativo",
        imageSrc: null as string | null,
        technologies: [] as string[],
        links: [
          { label: "Site do projeto", href: null },
          { label: "GitHub", href: null },
          { label: "Demonstração", href: null },
        ],
      },
    ],
  },
  content: {
    title: "Me acompanhe ao vivo.",
    description:
      "Acompanhe minhas transmissões e encontre os canais que compartilho em diferentes plataformas.",
    featuredSocialId: "kick",
    platformIds: ["kick", "twitch", "youtube", "instagram", "tiktok", "discord"],
    bannerSrc: null as string | null,
  },
  socials: [
    {
      id: "instagram",
      platform: "Instagram",
      username: "@cg_zn_",
      href: "https://instagram.com/cg_zn_",
      description: "Conteúdos e atualizações de CG.",
    },
    {
      id: "kick",
      platform: "Kick",
      username: "CG-OFICIAL",
      href: "https://kick.com/CG-OFICIAL",
      description: "Canal de CG na Kick.",
    },
    {
      id: "youtube",
      platform: "YouTube",
      username: "@CanalDoCg_Oficial",
      href: "https://www.youtube.com/@CanalDoCg_Oficial",
      description: "Canal do CG no YouTube.",
    },
    {
      id: "twitch",
      platform: "Twitch",
      username: "@cg_original",
      href: "https://www.twitch.tv/cg_original",
      description: "Canal de CG na Twitch.",
    },
    {
      id: "tiktok",
      platform: "TikTok",
      username: "@oficialcg",
      href: "https://www.tiktok.com/@oficialcg",
      description: "Perfil do CG no TikTok.",
    },
    {
      id: "github",
      platform: "GitHub Sponsors",
      username: null as string | null,
      href: "https://github.com/sponsors/accounts",
      description: "Link de apoio do GitHub informado no roteiro.",
    },
    {
      id: "discord",
      platform: "Discord",
      username: null as string | null,
      href: "https://discord.gg/GuxbfgUHEj",
      description: "Convite do Discord informado por CG.",
    },
    {
      id: "rumble",
      platform: "Rumble",
      username: "canaldoCg",
      href: "https://rumble.com/user/canaldoCg/livestreams",
      description: "Página de transmissões do CG no Rumble.",
    },
  ],
  // Sem números fornecidos: a seção permanece oculta até ser preenchida com dados reais.
  statistics: [] as { label: string; value: string }[],
  contact: {
    title: "Vamos tirar uma ideia do papel?",
    description:
      "Tem uma proposta, um projeto, uma colaboração ou simplesmente quer conversar? Entre em contato pelos canais disponíveis.",
    setupNote:
      "Por enquanto, o formulário próprio depende de um destinatário e de um serviço de envio configurados. Até lá, use os canais públicos disponíveis.",
    email: null as string | null,
    whatsapp: null as string | null,
    channelIds: ["instagram", "discord"],
  },
  seo: {
    title: "CG Oficial | Criador de Conteúdo e Projetos Digitais",
    description:
      "Conheça o trabalho de CG, seus projetos digitais, conteúdos, redes sociais e iniciativas relacionadas à tecnologia e à inteligência artificial.",
    keywords: [
      "CG Oficial",
      "criador de conteúdo",
      "tecnologia",
      "inteligência artificial",
      "projetos digitais",
    ],
    publicOrigin: null as string | null,
    openGraphImageUrl:
      "https://gabrielcg98.github.io/Cg-oficial/images/cg-hero.webp" as string | null,
  },
  legal: {
    privacyUrl: null as string | null,
  },
  matrix: {
    columns: 32,
    rowsPerColumn: 420,
  },
  theme: {
    background: "#11151B",
    surface: "#171D24",
    surfaceRaised: "#1D252D",
    border: "#29343C",
    text: "#F3F6F7",
    textMuted: "#A8B4BA",
    accent: "#35D7B5",
    accentSoft: "#55BDB8",
  },
} as const;

export type SocialId = (typeof siteConfig.socials)[number]["id"];

export function getConfiguredSocials() {
  return getVisibleLinks(siteConfig.socials);
}

export function getSocialById(id: string) {
  const social = siteConfig.socials.find((item) => item.id === id);
  return social && getVisibleLinks([social]).length > 0 ? social : null;
}
