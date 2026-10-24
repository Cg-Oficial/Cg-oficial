import { ArrowUpRight, Radio } from "lucide-react";
import { getSocialById, siteConfig } from "@/config/siteConfig";
import SectionHeading from "@/components/SectionHeading";
import { PlatformIcon } from "@/components/IdentityIcon";
import { SocialCard } from "@/components/SocialLinks";

export default function ContentSection() {
  const featured = getSocialById(siteConfig.content.featuredSocialId);
  const platforms = siteConfig.content.platformIds
    .map((id) => getSocialById(id))
    .filter((social): social is NonNullable<typeof social> => Boolean(social));

  return (
    <section className="content-section content-hub-section" id="content" aria-labelledby="content-title" data-nav-section>
      <div className="page-container">
        <SectionHeading
          id="content-title"
          index="05"
          label="CONTEÚDO E TRANSMISSÕES"
          title={siteConfig.content.title}
          description={siteConfig.content.description}
        />

        {featured ? (
          <article className="featured-channel-card">
            <div className="channel-cover" aria-hidden="true">
              <span className="channel-cover-binary channel-cover-binary--left">0101<br />0010<br />1011<br />0100</span>
              <img src={siteConfig.brand.wordmarkSrc} alt="" width="418" height="71" />
              <span className="channel-cover-binary channel-cover-binary--right">1010<br />1100<br />0101<br />1010</span>
            </div>
            <div className="featured-channel-content">
            <div className="featured-channel-mark">
                <a
                  className="featured-platform-thumb"
                  href={featured.href!}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={`Abrir ${featured.platform} em nova aba`}
                >
                  <PlatformIcon platformId={featured.id} />
                </a>
                <span>CANAL EM DESTAQUE</span>
                <span className="live-channel-label">
                  <Radio className="live-channel-icon" size={15} aria-hidden="true" />
                  <span>CANAIS DE LIVE</span>
                </span>
              </div>
              <h3>{featured.platform}</h3>
              <p>{featured.description} Acesse o canal para conferir as transmissões e conteúdos disponíveis.</p>
              <a className="button button-primary channel-cta" href={featured.href!} target="_blank" rel="noopener noreferrer">
                Assistir às transmissões
                <ArrowUpRight size={17} aria-hidden="true" />
              </a>
            </div>
          </article>
        ) : null}

        <div className="platforms-heading">
          <p className="micro-label">OUTROS CANAIS</p>
          <span className="platforms-heading-line" aria-hidden="true" />
          <Radio size={16} aria-hidden="true" />
        </div>
        <div className="platform-mini-grid">
          {platforms
            .filter((social) => social.id !== siteConfig.content.featuredSocialId)
            .map((social) => <SocialCard key={social.id} social={social} />)}
        </div>
      </div>
    </section>
  );
}
