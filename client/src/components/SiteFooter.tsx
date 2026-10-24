import { getConfiguredSocials, getVisibleLinks, siteConfig } from "@/config/siteConfig";
import { PlatformIcon } from "@/components/IdentityIcon";

const footerLinks = [
  { label: "Início", href: "#home" },
  { label: "Projetos", href: "#projects" },
  { label: "Redes sociais", href: "#socials" },
  { label: "Contato", href: "#contact" },
];

export default function SiteFooter() {
  const year = new Date().getFullYear();
  const socials = getConfiguredSocials();
  const privacyLink = getVisibleLinks([
    { label: "Política de privacidade", href: siteConfig.legal.privacyUrl },
  ])[0];

  return (
    <footer className="site-footer">
      <div className="page-container footer-main">
        <a className="footer-brand" href="#home" aria-label="CG Oficial — voltar ao início">
          <span className="footer-brand-mark">CG<span>.</span></span>
          <span className="footer-brand-caption">OFICIAL</span>
        </a>
        <nav className="footer-navigation" aria-label="Navegação no rodapé">
          {footerLinks.map((link) => (
            <a href={link.href} key={link.href}>{link.label}</a>
          ))}
          {privacyLink ? <a href={privacyLink.href!}>Política de privacidade</a> : null}
        </nav>
        <ul className="footer-socials" aria-label="Redes sociais de CG">
          {socials.map((social) => (
            <li key={social.id}>
              <a
                href={social.href!}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`Abrir ${social.platform} em nova aba`}
              >
                <PlatformIcon platformId={social.id} />
              </a>
            </li>
          ))}
        </ul>
      </div>
      <div className="page-container footer-bottom">
        <span>© {year} {siteConfig.brand.name}. Todos os direitos reservados.</span>
        <span className="footer-signoff">IDEIAS EM MOVIMENTO <span aria-hidden="true">·</span> CG.</span>
      </div>
    </footer>
  );
}
