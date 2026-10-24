import { readFileSync } from "node:fs";
import React from "react";
import postcss from "postcss";
import { renderToStaticMarkup } from "react-dom/server";
import { describe, expect, it } from "vitest";
import Home from "../client/src/pages/Home";
import { siteConfig } from "../client/src/config/siteConfig";
import { injectSiteSeoMetadata } from "../client/src/lib/prerenderHtml";

const renderHome = () => renderToStaticMarkup(React.createElement(Home));
const stylesheet = postcss.parse(
  readFileSync(new URL("../client/src/index.css", import.meta.url), "utf8"),
);
const initialHtml = readFileSync(new URL("../client/index.html", import.meta.url), "utf8");
const seoHtml = injectSiteSeoMetadata(
  initialHtml,
  siteConfig.seo,
  siteConfig.person.brandName,
  siteConfig.hero.imageAlt,
);

const suppliedSocialLinks = [
  "https://instagram.com/cg_zn_",
  "https://kick.com/CG-OFICIAL",
  "https://www.youtube.com/@CanalDoCg_Oficial",
  "https://www.twitch.tv/cg_original",
  "https://www.tiktok.com/@oficialcg",
  "https://github.com/sponsors/accounts",
  "https://discord.gg/GuxbfgUHEj",
  "https://rumble.com/user/canaldoCg/livestreams",
];

describe("public CG Oficial site content", () => {
  it("renders the supplied biography, specialty, project, content and contact sections", () => {
    const html = renderHome();

    for (const heading of [
      "Um pouco sobre mim.",
      "O que faço e o que me interessa.",
      "Projetos que estou construindo.",
      "Me acompanhe ao vivo.",
      "Conecte-se comigo.",
      "Vamos tirar uma ideia do papel?",
    ]) {
      expect(html).toContain(heading);
    }

    expect(html).toContain("Sou Carlos Gabriel, conhecido como CG.");
    expect(html).toContain("Almeida SoloMiner");
    expect(html).toContain("CG Tienda Online");
    expect(html).toContain("Minha identidade digital para transmissões");
  });

  it("renders the supplied professional title and tagline", () => {
    const html = renderHome();
    expect(html).toContain("Criador de Conteúdo | Desenvolvedor | Entusiasta de Tecnologia e Inteligência Artificial");
    expect(html).toContain("Transformando ideias em projetos, tecnologia e experiências digitais.");
  });

  it("includes a public share image in initial metadata without guessing the site's origin", () => {
    const shareImage = "https://gabrielcg98.github.io/Cg-oficial/images/cg-hero.webp";

    expect(siteConfig.seo.openGraphImageUrl).toBe(shareImage);
    expect(seoHtml).toContain(`property="og:image" content="${shareImage}"`);
    expect(seoHtml).toContain(`name="twitter:image" content="${shareImage}"`);
    expect(seoHtml).toContain('property="og:image:alt"');
    expect(seoHtml).toContain('name="keywords"');
    expect(seoHtml).not.toContain('rel="canonical"');
    expect(seoHtml).not.toContain('property="og:url"');
  });

  it("publishes only the supplied social destinations and keeps external links safe", () => {
    const html = renderHome();

    for (const url of suppliedSocialLinks) {
      expect(html).toContain(url);
    }

    expect(html).toContain('target="_blank"');
    expect(html).toContain('rel="noopener noreferrer"');
  });

  it("renders each platform logo inside the configured clickable social destination", () => {
    const html = renderHome();
    const platformIds = ["instagram", "kick", "youtube", "twitch", "tiktok", "github", "discord", "rumble"];

    for (const platformId of platformIds) {
      expect(html).toContain(`data-platform-logo="${platformId}"`);
    }

    expect(html).toMatch(/<a[^>]*href="https:\/\/rumble\.com\/user\/canaldoCg\/livestreams"[^>]*>[\s\S]*?data-platform-logo="rumble"/);
    expect(html).toMatch(/<a[^>]*href="https:\/\/www\.youtube\.com\/@CanalDoCg_Oficial"[^>]*>[\s\S]*?data-platform-logo="youtube"/);
  });

  it("marks the live-channel area in red without claiming that a stream is live now", () => {
    const html = renderHome();
    const liveRule = stylesheet.nodes?.find(
      (node) => node.type === "rule" && node.selectors?.includes(".live-channel-icon"),
    );
    let liveColor: string | undefined;

    if (liveRule?.type === "rule") {
      liveRule.walkDecls("color", (declaration) => {
        liveColor = declaration.value;
      });
    }

    expect(html).toContain("CANAIS DE LIVE");
    expect(html).toMatch(/class="[^"]*live-channel-icon/);
    expect(liveColor).toMatch(/#|live-red/i);
    expect(html).not.toMatch(/>\s*AO VIVO\s*</i);
  });

  it("does not imply an unverified live stream, invented metrics, résumé or message delivery", () => {
    const html = renderHome();

    expect(html).not.toMatch(/>\s*AO VIVO\s*</i);
    expect(html).not.toMatch(/seguidores|visualizações|anos de experiência/i);
    expect(html).not.toContain("Baixar meu currículo");
    expect(html).not.toContain("<form");
    expect(html).not.toContain("Mensagem enviada com sucesso");
    expect(html).toContain("o formulário próprio depende");
  });

  it("renders a denser decorative Matrix field globally behind the site content", () => {
    const html = renderHome();
    const matrixIndex = html.indexOf('class="matrix-rain"');
    const headerIndex = html.indexOf("<header");
    const mainIndex = html.indexOf("<main");
    const footerIndex = html.indexOf("<footer");
    const streamCount = (html.match(/class="matrix-stream\b/g) ?? []).length;
    const edgeStreamCount = (html.match(/class="[^"]*matrix-stream--edge\b/g) ?? []).length;

    expect(matrixIndex).toBeGreaterThanOrEqual(0);
    expect(matrixIndex).toBeLessThan(headerIndex);
    expect(matrixIndex).toBeLessThan(mainIndex);
    expect(matrixIndex).toBeLessThan(footerIndex);
    expect(streamCount).toBeGreaterThanOrEqual(30);
    expect(edgeStreamCount).toBeGreaterThanOrEqual(12);
    expect(html).toMatch(/class="matrix-rain"[^>]*aria-hidden="true"/);
    expect(html).toContain("0");
    expect(html).toContain("1");
  });

  it("renders far, mid and near Matrix layers and applies the scroll offset independently of drift", () => {
    const html = renderHome();
    const streamRule = stylesheet.nodes?.find(
      (node) => node.type === "rule" && node.selectors?.includes(".matrix-stream"),
    );
    let scrollTranslate: string | undefined;

    for (const layer of ["far", "mid", "near"]) {
      expect(html).toContain(`matrix-stream--${layer}`);
    }

    if (streamRule?.type === "rule") {
      streamRule.walkDecls("translate", (declaration) => {
        scrollTranslate = declaration.value;
      });
    }

    expect(scrollTranslate).toContain("--matrix-scroll-offset");
    expect(html).toMatch(/aria-hidden="true"/);
  });

  it("removes hover translations when reduced motion is requested", () => {
    const reducedMotion = stylesheet.nodes?.find(
      (node) =>
        node.type === "atrule" &&
        node.name === "media" &&
        node.params.includes("prefers-reduced-motion: reduce"),
    );
    const selectors = new Set<string>();

    if (reducedMotion?.type === "atrule") {
      reducedMotion.walkRules((rule) => {
        const disablesTransform = rule.nodes?.some(
          (node) =>
            node.type === "decl" &&
            node.prop === "transform" &&
            node.value === "none" &&
            node.important,
        );
        if (disablesTransform) rule.selectors?.forEach((selector) => selectors.add(selector));
      });
    }

    expect(selectors).toContain(".specialty-card:hover");
    expect(selectors).toContain(".project-card:hover");
    expect(selectors).toContain(".social-card:hover");
    expect(selectors).toContain(".button:hover");
  });
});
