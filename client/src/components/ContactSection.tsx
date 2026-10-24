import { ArrowUpRight, MessageCircle } from "lucide-react";
import { getSocialById, siteConfig } from "@/config/siteConfig";
import SectionHeading from "@/components/SectionHeading";

export default function ContactSection() {
  const channels = siteConfig.contact.channelIds
    .map((id) => getSocialById(id))
    .filter((social): social is NonNullable<typeof social> => Boolean(social));

  return (
    <section className="content-section contact-section" id="contact" aria-labelledby="contact-title" data-nav-section>
      <div className="page-container contact-layout">
        <div className="contact-copy">
          <SectionHeading
            id="contact-title"
            index="07"
            label="CONTATO"
            title={siteConfig.contact.title}
            description={siteConfig.contact.description}
          />
          <p className="contact-setup-note">{siteConfig.contact.setupNote}</p>
          <div className="contact-actions">
            {channels.map((channel) => (
              <a className="contact-channel-button" key={channel.id} href={channel.href!} target="_blank" rel="noopener noreferrer">
                <MessageCircle size={18} aria-hidden="true" />
                <span>{channel.id === "instagram" ? "Abrir Instagram" : `Abrir ${channel.platform}`}</span>
                <ArrowUpRight size={16} aria-hidden="true" />
              </a>
            ))}
          </div>
        </div>
        <div className="contact-side-card" aria-hidden="true">
          <span className="contact-code">010 / CG</span>
          <span className="contact-orbit contact-orbit--one" />
          <span className="contact-orbit contact-orbit--two" />
          <span className="contact-side-mark">CG<span>.</span></span>
          <span className="contact-side-caption">IDEIAS EM MOVIMENTO</span>
        </div>
      </div>
    </section>
  );
}
