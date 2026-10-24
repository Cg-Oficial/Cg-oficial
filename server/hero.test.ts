import React from "react";
import { renderToStaticMarkup } from "react-dom/server";
import { describe, expect, it } from "vitest";
import Hero from "../client/src/components/Hero";
import { siteConfig } from "../client/src/config/siteConfig";

describe("CG Official hero", () => {
  it("renders the channel identity, introduction, real portrait and section anchors", () => {
    const html = renderToStaticMarkup(React.createElement(Hero));

    expect(html).toContain("Olá, eu sou o CG.");
    expect(html).toContain("Criatividade, tecnologia e novas possibilidades.");
    expect(html).toContain('href="#projects"');
    expect(html).toContain('href="#contact"');
    expect(html).toContain(siteConfig.hero.imageSrc);
  });
});
