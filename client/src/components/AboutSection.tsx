import { Download, MapPin } from "lucide-react";
import { getVisibleLinks, siteConfig } from "@/config/siteConfig";
import ConfiguredImage from "@/components/ConfiguredImage";
import SectionHeading from "@/components/SectionHeading";

const aboutDetails = [
  { label: "Localização", value: siteConfig.about.location },
  { label: "Experiência", value: siteConfig.about.experience.join(" · ") },
  { label: "Formação", value: siteConfig.about.education.join(" · ") },
  { label: "Competências", value: siteConfig.about.competencies.join(" · ") },
  { label: "Idiomas", value: siteConfig.about.languages.join(" · ") },
].filter((detail) => detail.value);

const resumeLink = getVisibleLinks([
  { label: "Baixar currículo", href: siteConfig.about.resumeUrl },
])[0];

export default function AboutSection() {
  return (
    <section className="content-section about-section" id="about" aria-labelledby="about-title" data-nav-section>
      <div className="page-container about-layout">
        <div className="about-copy">
          <SectionHeading id="about-title" index="01" label="SOBRE MIM" title={siteConfig.about.title} />
          <div className="about-prose">
            {siteConfig.about.paragraphs.map((paragraph) => (
              <p key={paragraph}>{paragraph}</p>
            ))}
          </div>

          <div className="interest-block">
            <p className="micro-label">O QUE ME MOVE</p>
            <ul className="interest-tags" aria-label="Áreas de interesse">
              {siteConfig.about.interests.map((interest) => (
                <li key={interest}>{interest}</li>
              ))}
            </ul>
          </div>

          {aboutDetails.length > 0 ? (
            <dl className="about-details">
              {aboutDetails.map(({ label, value }) => (
                <div key={label}>
                  <dt>{label}</dt>
                  <dd>{value}</dd>
                </div>
              ))}
            </dl>
          ) : null}

          {resumeLink ? (
            <a className="button button-secondary resume-button" href={resumeLink.href!} download>
              <Download size={16} aria-hidden="true" />
              Baixar currículo
            </a>
          ) : null}
        </div>

        <aside className="about-aside" aria-label="Interesses de CG">
          <figure className="about-photo-frame">
            <ConfiguredImage
              className="about-photo"
              src={siteConfig.about.imageSrc}
              alt={siteConfig.about.imageAlt}
              fallbackLabel="Área reservada para a foto secundária de CG"
              width={298}
              height={308}
            />
            <figcaption>
              <span className="about-photo-indicator" aria-hidden="true" />
              CARLOS GABRIEL <span aria-hidden="true">/</span> CG
            </figcaption>
          </figure>
          <div className="about-focus-card">
            <span className="micro-label">EM CONSTANTE EXPLORAÇÃO</span>
            <p>Ideias, ferramentas e projetos digitais — aprendendo e construindo na prática.</p>
            {siteConfig.about.location ? (
              <span className="location-line">
                <MapPin size={14} aria-hidden="true" /> {siteConfig.about.location}
              </span>
            ) : null}
          </div>
        </aside>
      </div>
    </section>
  );
}
