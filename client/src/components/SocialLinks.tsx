import { ArrowUpRight } from "lucide-react";
import { getConfiguredSocials } from "@/config/siteConfig";
import { PlatformIcon } from "@/components/IdentityIcon";

type SocialProfile = ReturnType<typeof getConfiguredSocials>[number];

export function SocialCard({ social }: { social: SocialProfile }) {
  return (
    <a
      className="social-card"
      href={social.href!}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={`Abrir ${social.platform}${social.username ? ` ${social.username}` : ""} em nova aba`}
    >
      <span className="social-card-icon">
        <PlatformIcon platformId={social.id} />
      </span>
      <span className="social-card-copy">
        <span className="social-card-platform">{social.platform}</span>
        {social.username ? <span className="social-card-handle">{social.username}</span> : null}
        <span className="social-card-description">{social.description}</span>
      </span>
      <ArrowUpRight className="social-card-arrow" aria-hidden="true" size={17} />
    </a>
  );
}

export default function SocialLinks() {
  return (
    <div className="social-grid">
      {getConfiguredSocials().map((social) => (
        <SocialCard key={social.id} social={social} />
      ))}
    </div>
  );
}
