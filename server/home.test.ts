import { describe, expect, it } from "vitest";
import {
  getVisibleLinks,
  resolveSiteAsset,
  siteAssetPaths,
  siteConfig,
} from "../client/src/config/siteConfig";

describe("CG Official site configuration", () => {
  it("uses local bundled images in development and published static output", () => {
    expect(siteConfig.brand.displayName).toBe("CANAL DO CG");
    expect(resolveSiteAsset("wordmark", "development")).toBe("/images/cg-wordmark.png");
    expect(resolveSiteAsset("wordmark", "published")).toBe("/images/cg-wordmark.png");
    expect(siteAssetPaths.hero.published).toBe("images/cg-hero.webp");
    expect(siteAssetPaths.about.published).toBe("images/cg-about-source.png");
  });

  it("keeps only configured safe HTTP(S) links in their original order", () => {
    const links = getVisibleLinks([
      { label: "Kick", href: "https://kick.com/CG-OFICIAL" },
      { label: "WhatsApp", href: "   " },
      { label: "Unsafe", href: "javascript:alert(1)" },
      { label: "Instagram", href: "https://instagram.com/cg_zn_" },
    ]);

    expect(links.map(({ label }) => label)).toEqual(["Kick", "Instagram"]);
  });
});
