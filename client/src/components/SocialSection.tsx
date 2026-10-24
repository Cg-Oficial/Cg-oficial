import SectionHeading from "@/components/SectionHeading";
import SocialLinks from "@/components/SocialLinks";

export default function SocialSection() {
  return (
    <section className="content-section social-section" id="socials" aria-labelledby="socials-title" data-nav-section>
      <div className="page-container">
        <SectionHeading
          id="socials-title"
          index="06"
          label="ENCONTRE O CG"
          title="Conecte-se comigo."
          description="Acesse meus canais e acompanhe conteúdos, transmissões e novidades."
        />
        <SocialLinks />
      </div>
    </section>
  );
}
