import { useEffect, useState } from "react";
import { Menu, X } from "lucide-react";
import { siteConfig } from "@/config/siteConfig";

const navigation = [
  { label: "Início", href: "#home", id: "home" },
  { label: "Sobre mim", href: "#about", id: "about" },
  { label: "Projetos", href: "#projects", id: "projects" },
  { label: "Conteúdo", href: "#content", id: "content" },
  { label: "Redes", href: "#socials", id: "socials" },
  { label: "Contato", href: "#contact", id: "contact" },
];

export default function SiteHeader() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("home");
  const [brandImageFailed, setBrandImageFailed] = useState(false);

  useEffect(() => {
    const targets = navigation
      .map((item) => document.getElementById(item.id))
      .filter((target): target is HTMLElement => target !== null);
    if (!targets.length || !("IntersectionObserver" in window)) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const topEntry = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
        if (topEntry?.target instanceof HTMLElement) setActiveSection(topEntry.target.id);
      },
      { rootMargin: "-22% 0px -67% 0px", threshold: [0, 0.2, 0.45, 0.7] },
    );
    targets.forEach((target) => observer.observe(target));
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!menuOpen) return;
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setMenuOpen(false);
        document.querySelector<HTMLButtonElement>(".menu-toggle")?.focus();
      }
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [menuOpen]);

  const closeMenu = (id?: string) => {
    setMenuOpen(false);
    if (id) setActiveSection(id);
  };

  return (
    <header className="site-header">
      <div className="page-container header-inner">
        <a className="brand-lockup" href="#home" aria-label="Canal do CG — início" onClick={() => closeMenu("home")}>
          {brandImageFailed ? (
            <span className="brand-wordmark-fallback">
              <strong>CG<span>.</span></strong><small>OFICIAL</small>
            </span>
          ) : (
            <img
              className="brand-wordmark"
              src={siteConfig.brand.wordmarkSrc}
              alt={siteConfig.brand.displayName}
              width="418"
              height="71"
              onError={() => setBrandImageFailed(true)}
            />
          )}
        </a>

        <button
          className="menu-toggle"
          type="button"
          aria-label={menuOpen ? "Fechar menu" : "Abrir menu"}
          aria-expanded={menuOpen}
          aria-controls="site-navigation"
          onClick={() => setMenuOpen((open) => !open)}
        >
          {menuOpen ? <X size={21} aria-hidden="true" /> : <Menu size={21} aria-hidden="true" />}
        </button>

        <nav
          id="site-navigation"
          className={`site-navigation${menuOpen ? " is-open" : ""}`}
          aria-label="Navegação principal"
        >
          {navigation.map((item) => (
            <a
              key={item.href}
              href={item.href}
              className={activeSection === item.id ? "is-active" : undefined}
              aria-current={activeSection === item.id ? "location" : undefined}
              onClick={() => closeMenu(item.id)}
            >
              {item.label}
            </a>
          ))}
          <a className="header-contact-link" href="#contact" onClick={() => closeMenu("contact")}>
            Vamos conversar <span aria-hidden="true">↗</span>
          </a>
        </nav>
      </div>
    </header>
  );
}
