import AboutSection from "@/components/AboutSection";
import BinaryRain from "@/components/BinaryRain";
import ContactSection from "@/components/ContactSection";
import ContentSection from "@/components/ContentSection";
import Hero from "@/components/Hero";
import ProjectsSection from "@/components/ProjectsSection";
import SiteFooter from "@/components/SiteFooter";
import SiteHeader from "@/components/SiteHeader";
import SocialSection from "@/components/SocialSection";
import SpecialtiesSection from "@/components/SpecialtiesSection";
import StatisticsSection from "@/components/StatisticsSection";

export default function Home() {
  return (
    <div className="site-shell">
      <BinaryRain />
      <a className="skip-link" href="#main-content">
        Pular para o conteúdo
      </a>
      <SiteHeader />
      <main id="main-content">
        <div id="home" data-nav-section>
          <Hero />
        </div>
        <AboutSection />
        <SpecialtiesSection />
        <ProjectsSection />
        <StatisticsSection />
        <ContentSection />
        <SocialSection />
        <ContactSection />
      </main>
      <SiteFooter />
    </div>
  );
}
