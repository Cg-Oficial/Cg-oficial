import { ArrowUpRight } from "lucide-react";
import { getVisibleLinks, siteConfig } from "@/config/siteConfig";
import ConfiguredImage from "@/components/ConfiguredImage";
import SectionHeading from "@/components/SectionHeading";

export default function ProjectsSection() {
  const allProjectsLink = getVisibleLinks([
    { label: "Ver todos os projetos", href: siteConfig.projects.pageUrl },
  ])[0];

  return (
    <section className="content-section projects-section" id="projects" aria-labelledby="projects-title" data-nav-section>
      <div className="page-container">
        <SectionHeading
          id="projects-title"
          index="03"
          label="PORTFÓLIO"
          title="Projetos que estou construindo."
          description="Iniciativas em diferentes estágios, reunidas em um só lugar."
        />
        <div className="project-grid">
          {siteConfig.projects.items.map((project, index) => {
            const links = getVisibleLinks(project.links);
            return (
              <article className="project-card" key={project.id}>
                <div className="project-cover">
                  {project.imageSrc ? (
                    <ConfiguredImage
                      src={project.imageSrc}
                      alt={`Imagem do projeto ${project.name}`}
                      fallbackLabel={`Área reservada para imagem do projeto ${project.name}`}
                      width={720}
                      height={420}
                      className="project-cover-image"
                    />
                  ) : (
                    <div className="project-cover-placeholder" aria-hidden="true">
                      <span className="project-cover-index">0{index + 1} / 03</span>
                      <span className="project-cover-mark">{project.name}</span>
                      <span className="project-cover-code">0101 · CG</span>
                    </div>
                  )}
                  <span className="project-status">{project.status}</span>
                </div>
                <div className="project-card-content">
                  <p className="project-category">{project.category}</p>
                  <h3>{project.name}</h3>
                  <p className="project-description">{project.description}</p>
                  {project.technologies.length > 0 ? (
                    <ul className="project-tags" aria-label={`Tecnologias de ${project.name}`}>
                      {project.technologies.map((technology) => (
                        <li key={technology}>{technology}</li>
                      ))}
                    </ul>
                  ) : null}
                  {links.length > 0 ? (
                    <div className="project-links">
                      {links.map((link) => (
                        <a href={link.href!} key={link.href} target="_blank" rel="noopener noreferrer">
                          {link.label ?? "Conhecer projeto"}
                          <ArrowUpRight size={15} aria-hidden="true" />
                        </a>
                      ))}
                    </div>
                  ) : null}
                </div>
              </article>
            );
          })}
        </div>
        {allProjectsLink ? (
          <a className="project-all-link" href={allProjectsLink.href!} target="_blank" rel="noopener noreferrer">
            Ver todos os projetos <ArrowUpRight size={16} aria-hidden="true" />
          </a>
        ) : null}
      </div>
    </section>
  );
}
