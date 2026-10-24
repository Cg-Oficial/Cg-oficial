import { siteConfig, getVisibleLinks } from "@/config/siteConfig";
import SectionHeading from "@/components/SectionHeading";
import { SpecialtyIcon } from "@/components/IdentityIcon";

export default function SpecialtiesSection() {
  return (
    <section
      className="content-section specialties-section"
      id="specialties"
      aria-labelledby="specialties-title"
      data-nav-section
    >
      <div className="page-container">
        <SectionHeading
          id="specialties-title"
          index="02"
          label="ÁREAS DE INTERESSE"
          title="O que faço e o que me interessa."
          description="Temas que acompanham minhas ideias, conteúdos e projetos digitais."
        />
        <div className="specialty-grid">
          {siteConfig.specialties.map((specialty, index) => {
            const links = getVisibleLinks(siteConfig.specialtyLinks[specialty.id] ?? []);
            return (
              <article className="specialty-card" key={specialty.id}>
                <div className="specialty-card-topline">
                  <span className="specialty-icon-wrap">
                    <SpecialtyIcon icon={specialty.icon} />
                  </span>
                  <span className="card-code" aria-hidden="true">
                    0{index + 1} / 06
                  </span>
                </div>
                <h3>{specialty.title}</h3>
                <p>{specialty.description}</p>
                {links.length > 0 ? (
                  <div className="specialty-links">
                    {links.map((link) => (
                      <a href={link.href!} key={link.href} target="_blank" rel="noopener noreferrer">
                        {link.label}
                      </a>
                    ))}
                  </div>
                ) : null}
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
