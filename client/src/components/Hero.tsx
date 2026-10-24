import { ArrowDown, ArrowUpRight } from "lucide-react";
import { getSocialById, siteConfig } from "@/config/siteConfig";
import ConfiguredImage from "@/components/ConfiguredImage";
import { PlatformIcon } from "@/components/IdentityIcon";

const binaryColumns = [
  "0\n1\n0\n0\n1\n0",
  "1\n0\n1\n1\n0\n1",
  "0\n0\n1\n0\n1\n1",
  "1\n1\n0\n1\n0\n0",
];

export default function Hero() {
  const quickSocials = siteConfig.hero.quickSocialIds
    .map((id) => getSocialById(id))
    .filter((social): social is NonNullable<typeof social> => Boolean(social));

  return (
    <section className="hero-section" aria-labelledby="hero-title">
      <div className="hero-binary hero-binary--left" aria-hidden="true">
        {binaryColumns.slice(0, 2).map((column, index) => (
          <span className={`binary-column binary-column--${index + 1}`} key={column}>{column}</span>
        ))}
      </div>
      <div className="hero-binary hero-binary--right" aria-hidden="true">
        {binaryColumns.slice(2).map((column, index) => (
          <span className={`binary-column binary-column--${index + 3}`} key={column}>{column}</span>
        ))}
      </div>

      <div className="page-container hero-layout">
        <div className="hero-copy">
          <p className="eyebrow">
            <span className="eyebrow-mark" aria-hidden="true" />
            {siteConfig.hero.eyebrow}
          </p>
          <h1 id="hero-title">{siteConfig.hero.greeting}</h1>
          <p className="hero-headline">{siteConfig.hero.headline}</p>
          <p className="hero-professional-title">{siteConfig.person.professionalTitle}</p>
          <p className="hero-description">{siteConfig.hero.description}</p>

          <div className="hero-actions">
            <a className="button button-primary" href="#projects">
              <span>Conheça meus projetos</span>
              <ArrowUpRight aria-hidden="true" size={17} strokeWidth={1.8} />
            </a>
            <a className="button button-secondary" href="#contact">Entre em contato</a>
          </div>

          <div className="hero-note">
            <span className="hero-note-line" aria-hidden="true" />
            <span>{siteConfig.person.tagline}</span>
          </div>

          <div className="hero-socials" aria-label="Acesso rápido às redes de CG">
            <span className="hero-socials-label">ME ENCONTRE</span>
            {quickSocials.map((social) => (
              <a
                className="hero-social-link"
                key={social.id}
                href={social.href!}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`Abrir ${social.platform} em nova aba`}
              >
                <PlatformIcon platformId={social.id} />
              </a>
            ))}
          </div>
        </div>

        <div className="hero-visual">
          <div className="portrait-orbit portrait-orbit--outer" aria-hidden="true" />
          <div className="portrait-orbit portrait-orbit--inner" aria-hidden="true" />
          <figure className="portrait-card">
            <ConfiguredImage
              src={siteConfig.hero.imageSrc}
              alt={siteConfig.hero.imageAlt}
              fallbackLabel="Área reservada para a foto principal de CG"
              className="hero-portrait"
              width={1174}
              height={1340}
              loading="eager"
              fetchPriority="high"
            />
            <figcaption>
              <span className="portrait-caption-dot" aria-hidden="true" />
              CONTEÚDO · TECNOLOGIA · PROJETOS
            </figcaption>
          </figure>
          <span className="visual-index" aria-hidden="true">CG / 01</span>
        </div>
      </div>

      <a className="scroll-cue" href="#about" aria-label="Descer para a seção Sobre mim">
        <span>DESLIZE PARA EXPLORAR</span>
        <ArrowDown size={15} strokeWidth={1.7} aria-hidden="true" />
      </a>
    </section>
  );
}
