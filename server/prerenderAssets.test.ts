import path from "node:path";
import { createElement } from "react";
import { renderToString } from "react-dom/server";
import { createServer } from "vite";
import { describe, expect, it } from "vitest";
import { Router, type BaseLocationHook, type BaseSearchHook } from "wouter";

const githubBase = "/cg-site-check/";

describe("assets durante a pré-renderização de produção", () => {
  it("usa imagens locais prefixadas pelo subpath configurado do GitHub Pages", async () => {
    const vite = await createServer({
      configFile: path.resolve(process.cwd(), "vite.config.ts"),
      base: githubBase,
      mode: "production",
      optimizeDeps: { noDiscovery: true, include: [] },
      server: { middlewareMode: true },
      appType: "custom",
    });

    try {
      const { siteConfig } = await vite.ssrLoadModule(
        "/src/config/siteConfig.ts"
      );

      expect({
        wordmark: siteConfig.brand.wordmarkSrc,
        hero: siteConfig.hero.imageSrc,
        about: siteConfig.about.imageSrc,
      }).toEqual({
        wordmark: `${githubBase}images/cg-wordmark.png`,
        hero: `${githubBase}images/cg-hero.webp`,
        about: `${githubBase}images/cg-about-source.png`,
      });
    } finally {
      await vite.close();
    }
  });

  it("pré-renderiza a Home na raiz virtual do repositório GitHub Pages", async () => {
    const vite = await createServer({
      configFile: path.resolve(process.cwd(), "vite.config.ts"),
      base: githubBase,
      mode: "production",
      optimizeDeps: { noDiscovery: true, include: [] },
      server: { middlewareMode: true },
      appType: "custom",
    });

    try {
      const { default: App } = await vite.ssrLoadModule("/src/App.tsx");
      const { createStaticRouteElement } = await vite.ssrLoadModule(
        "/src/lib/prerenderRouter.tsx"
      );

      expect(renderToString(createStaticRouteElement(App))).toContain(
        "Olá, eu sou o CG."
      );
    } finally {
      await vite.close();
    }
  });

  it("resolve a Home quando o navegador abre o prefixo do projeto GitHub Pages", async () => {
    const vite = await createServer({
      configFile: path.resolve(process.cwd(), "vite.config.ts"),
      base: githubBase,
      mode: "production",
      optimizeDeps: { noDiscovery: true, include: [] },
      server: { middlewareMode: true },
      appType: "custom",
    });

    try {
      const { default: App } = await vite.ssrLoadModule("/src/App.tsx");
      const locationHook: BaseLocationHook = () => [
        githubBase,
        () => undefined,
      ];
      const searchHook: BaseSearchHook = () => "";
      const tree = createElement(
        Router,
        { hook: locationHook, searchHook, ssrPath: githubBase },
        createElement(App)
      );

      expect(renderToString(tree)).toContain("Olá, eu sou o CG.");
    } finally {
      await vite.close();
    }
  });

  it("não deixa espaços ASCII no fim de linha no markup da chuva Matrix", async () => {
    const vite = await createServer({
      configFile: path.resolve(process.cwd(), "vite.config.ts"),
      mode: "production",
      optimizeDeps: { noDiscovery: true, include: [] },
      server: { middlewareMode: true },
      appType: "custom",
    });

    try {
      const { default: BinaryRain } = await vite.ssrLoadModule(
        "/src/components/BinaryRain.tsx"
      );
      const markup = renderToString(createElement(BinaryRain));

      expect(markup).not.toMatch(/>[ \t]+\r?\n/);
    } finally {
      await vite.close();
    }
  });
});
